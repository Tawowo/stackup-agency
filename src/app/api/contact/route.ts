/**
 * /api/contact — validation zod, limitation de débit par IP, gabarit serveur,
 * envoi via Resend. Sans RESEND_API_KEY (preview, dev) : le message est
 * journalisé côté serveur et la réponse le dit (202, envoye: false).
 */
import { NextResponse, type NextRequest } from 'next/server'
import { ContactSchema } from '@/lib/contact'
import { gabaritAccuse, gabaritContact } from '@/lib/email'
import { SITE } from '@/config/site'

const FENETRE_MS = 10 * 60 * 1000
const MAX_PAR_FENETRE = 5
const compteurs = new Map<string, number[]>()

function limite(ip: string): boolean {
  const now = Date.now()
  const liste = (compteurs.get(ip) ?? []).filter((t) => now - t < FENETRE_MS)
  if (liste.length >= MAX_PAR_FENETRE) return true
  liste.push(now)
  compteurs.set(ip, liste)
  if (compteurs.size > 5000) compteurs.clear()
  return false
}

export async function POST(req: NextRequest) {
  const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'inconnue'
  if (limite(ip)) return NextResponse.json({ ok: false, erreur: 'Trop de messages en peu de temps. Réessayez dans quelques minutes.' }, { status: 429 })

  let corps: unknown
  try {
    corps = await req.json()
  } catch {
    return NextResponse.json({ ok: false, erreur: 'Requête illisible.' }, { status: 400 })
  }
  const r = ContactSchema.safeParse(corps)
  if (!r.success) {
    const champs: Record<string, string> = {}
    for (const issue of r.error.issues) {
      const k = String(issue.path[0] ?? '')
      if (k && !champs[k]) champs[k] = issue.message
    }
    return NextResponse.json({ ok: false, champs }, { status: 422 })
  }
  const d = r.data
  const date = new Date()
  const demande = gabaritContact(d, { date, ip })
  const accuse = gabaritAccuse(d)

  const cle = process.env.RESEND_API_KEY
  const destinataire = process.env.CONTACT_TO || SITE.email
  if (!cle) {
    console.info('[contact] message reçu (Resend non configuré)', { sujet: demande.sujet, email: d.email })
    return NextResponse.json({ ok: true, envoye: false }, { status: 202 })
  }
  try {
    const { Resend } = await import('resend')
    const resend = new Resend(cle)
    const expediteur = process.env.CONTACT_FROM || `${SITE.nom} <contact@stackup-agency.fr>`
    await resend.emails.send({ from: expediteur, to: destinataire, replyTo: d.email, subject: demande.sujet, html: demande.html, text: demande.texte })
    await resend.emails.send({ from: expediteur, to: d.email, subject: accuse.sujet, html: accuse.html, text: accuse.texte })
    return NextResponse.json({ ok: true, envoye: true })
  } catch (e) {
    console.error('[contact] envoi impossible', e)
    return NextResponse.json({ ok: false, erreur: 'L’envoi a échoué de notre côté. Écrivez-nous directement à ' + SITE.email }, { status: 502 })
  }
}
