/**
 * /api/desinscription — enregistre une opposition à la prospection : l'adresse e-mail est journalisée côté serveur
 * (ligne JSON « desinscription ») et transmise à l'agence par e-mail (Resend). Aucune base de données : la liste de suppression
 * se tient à partir de ces e-mails (voir docs/offre-clubs/README.md). Sans RESEND_API_KEY : journalisé uniquement (202).
 */
import { NextResponse, type NextRequest } from 'next/server'
import { z } from 'zod'
import { SITE } from '@/config/site'
import { echapper } from '@/lib/email'

const Schema = z.object({
  email: z.email('Cette adresse ne semble pas valide.').max(200),
  club: z.string().trim().max(120).default(''),
  site_web: z.string().max(0).default(''),
})

const compteurs = new Map<string, number[]>()
function limite(ip: string) {
  const now = Date.now()
  const liste = (compteurs.get(ip) ?? []).filter((t) => now - t < 10 * 60 * 1000)
  if (liste.length >= 5) return true
  liste.push(now)
  compteurs.set(ip, liste)
  if (compteurs.size > 5000) compteurs.clear()
  return false
}

export async function POST(req: NextRequest) {
  const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'inconnue'
  if (limite(ip)) return NextResponse.json({ ok: false, erreur: 'Trop de demandes en peu de temps. Réessayez dans quelques minutes.' }, { status: 429 })
  let corps: unknown
  try {
    corps = await req.json()
  } catch {
    return NextResponse.json({ ok: false, erreur: 'Requête illisible.' }, { status: 400 })
  }
  const r = Schema.safeParse(corps)
  if (!r.success) return NextResponse.json({ ok: false, champs: { email: r.error.issues[0]?.message ?? 'Adresse invalide.' } }, { status: 422 })
  const { email, club } = r.data
  const date = new Date().toISOString()
  console.log(JSON.stringify({ desinscription: email.toLowerCase(), club: club || undefined, date }))
  const cle = process.env.RESEND_API_KEY
  if (!cle) return NextResponse.json({ ok: true, envoye: false }, { status: 202 })
  try {
    const { Resend } = await import('resend')
    const resend = new Resend(cle)
    const expediteur = process.env.CONTACT_FROM || `${SITE.nom} <contact@stackup-agency.fr>`
    await resend.emails.send({
      from: expediteur,
      to: process.env.CONTACT_TO || SITE.email,
      replyTo: email,
      subject: `[${SITE.nom}] Opposition à la prospection — ${email}`,
      html: `<p>Demande d’opposition à la prospection reçue le ${echapper(date)}.</p><p>Adresse : <strong>${echapper(email)}</strong>${club ? `<br>Club : ${echapper(club)}` : ''}</p><p>À ajouter à la liste de suppression : ne plus jamais écrire à cette adresse.</p>`,
      text: `Opposition à la prospection\nAdresse : ${email}\nClub : ${club || '(non précisé)'}\nDate : ${date}\nÀ ajouter à la liste de suppression.`,
    })
    await resend.emails.send({
      from: expediteur,
      to: email,
      subject: 'Votre demande est bien prise en compte',
      html: `<p>Bonjour,</p><p>Votre demande est enregistrée : l’adresse ${echapper(email)} ne recevra plus de message de prospection de ${echapper(SITE.nom)}.</p><p>${echapper(SITE.nom)}</p>`,
      text: `Bonjour,\n\nVotre demande est enregistrée : l’adresse ${email} ne recevra plus de message de prospection de ${SITE.nom}.\n\n${SITE.nom}`,
    })
    return NextResponse.json({ ok: true, envoye: true })
  } catch (e) {
    console.error('[desinscription] envoi impossible', e)
    // La demande est journalisée ci-dessus : on ne la perd pas.
    return NextResponse.json({ ok: true, envoye: false }, { status: 202 })
  }
}
