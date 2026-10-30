/**
 * /api/clubs/estimation — envoie l'estimation du simulateur des clubs : au club (récapitulatif) et à l'agence (toutes les réponses).
 * Le prix est RECALCULÉ ici à partir de l'état de la simulation : il ne vient jamais du navigateur. Validation zod, pot de miel,
 * limitation de débit par IP. Sans RESEND_API_KEY (preview, dev) : journalisé côté serveur, réponse 202 (envoye: false).
 */
import { NextResponse, type NextRequest } from 'next/server'
import { z } from 'zod'
import { SITE } from '@/config/site'
import { calculer } from '@/domain/clubs/calcul'
import { decoder } from '@/domain/clubs/etat'
import { gabaritEstimationClub, gabaritEstimationInterne } from '@/lib/email-clubs'

const Schema = z.object({
  email: z.email('Cette adresse ne semble pas valide.').max(200),
  nom: z.string().trim().max(120).default(''),
  consentement: z.literal(true, { message: 'Il faut accepter que nous utilisions votre adresse pour vous envoyer l’estimation.' }),
  simulation: z.string().max(1500),
  site_web: z.string().max(0).default(''),
})

const FENETRE_MS = 10 * 60 * 1000
const MAX = 5
const compteurs = new Map<string, number[]>()
function limite(ip: string): boolean {
  const now = Date.now()
  const liste = (compteurs.get(ip) ?? []).filter((t) => now - t < FENETRE_MS)
  if (liste.length >= MAX) return true
  liste.push(now)
  compteurs.set(ip, liste)
  if (compteurs.size > 5000) compteurs.clear()
  return false
}

export async function POST(req: NextRequest) {
  const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'inconnue'
  if (limite(ip)) return NextResponse.json({ ok: false, erreur: 'Trop d’envois en peu de temps. Réessayez dans quelques minutes.' }, { status: 429 })
  let corps: unknown
  try {
    corps = await req.json()
  } catch {
    return NextResponse.json({ ok: false, erreur: 'Requête illisible.' }, { status: 400 })
  }
  const r = Schema.safeParse(corps)
  if (!r.success) {
    const champs: Record<string, string> = {}
    for (const issue of r.error.issues) {
      const k = String(issue.path[0] ?? '')
      if (k && !champs[k]) champs[k] = issue.message
    }
    return NextResponse.json({ ok: false, champs }, { status: 422 })
  }
  const d = r.data
  const sim = decoder(d.simulation)
  if (!sim.licencies.actuelle) return NextResponse.json({ ok: false, erreur: 'Indiquez d’abord le nombre de licenciés de la saison en cours.' }, { status: 422 })
  const res = calculer(sim)
  const lien = `${SITE.url}/clubs-de-tennis/simulateur?${d.simulation}`
  const club = gabaritEstimationClub(sim, res, { nom: d.nom, lien })
  const interne = gabaritEstimationInterne(sim, res, { nom: d.nom, email: d.email, lien, date: new Date(), ip })

  const cle = process.env.RESEND_API_KEY
  const destinataire = process.env.CONTACT_TO || SITE.email
  if (!cle) {
    console.info('[clubs] estimation reçue (Resend non configuré)', { sujet: interne.sujet, email: d.email })
    const apercu = process.env.NODE_ENV !== 'production' ? { apercu: { sujet: interne.sujet, texte: interne.texte, club: club.texte } } : {}
    return NextResponse.json({ ok: true, envoye: false, ...apercu }, { status: 202 })
  }
  try {
    const { Resend } = await import('resend')
    const resend = new Resend(cle)
    const expediteur = process.env.CONTACT_FROM || `${SITE.nom} <contact@stackup-agency.fr>`
    await resend.emails.send({ from: expediteur, to: destinataire, replyTo: d.email, subject: interne.sujet, html: interne.html, text: interne.texte })
    await resend.emails.send({ from: expediteur, to: d.email, replyTo: SITE.email, subject: club.sujet, html: club.html, text: club.texte })
    return NextResponse.json({ ok: true, envoye: true })
  } catch (e) {
    console.error('[clubs] envoi impossible', e)
    return NextResponse.json({ ok: false, erreur: 'L’envoi a échoué de notre côté. Écrivez-nous directement à ' + SITE.email }, { status: 502 })
  }
}
