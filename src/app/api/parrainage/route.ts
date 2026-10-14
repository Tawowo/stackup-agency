/**
 * /api/parrainage — validation zod, limitation de débit par IP, gabarit
 * échappé, envoi via Resend à l'agence. Sans RESEND_API_KEY (preview, dev) :
 * la demande est journalisée côté serveur et la réponse le dit (202,
 * envoye: false). Un envoi de formulaire classique (sans JS) est accepté et
 * renvoyé vers /parrainage avec le résultat dans l'URL.
 */
import { NextResponse, type NextRequest } from 'next/server'
import { ParrainageSchema, type Parrainage } from '@/lib/parrainage'
import { echapper } from '@/lib/email'
import { SITE } from '@/config/site'

const FENETRE_MS = 10 * 60 * 1000
const MAX_PAR_FENETRE = 3
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

const ligne = (cle: string, valeur: string) =>
  valeur
    ? `<tr><td style="padding:8px 12px;color:#64748B;font:12px/1.4 ui-monospace,monospace;text-transform:uppercase;letter-spacing:.08em;vertical-align:top">${echapper(cle)}</td><td style="padding:8px 12px;color:#0D2C4C;font:15px/1.5 Inter,system-ui,sans-serif;white-space:pre-wrap">${echapper(valeur)}</td></tr>`
    : ''

function gabarit(d: Parrainage, date: Date) {
  const sujet = `[${SITE.nom}] Parrainage — ${d.parrainNom} → ${d.filleulNom}`.slice(0, 160)
  const html = `<!doctype html><html lang="fr"><body style="margin:0;background:#F3EFE6;padding:32px 16px">
<table role="presentation" width="100%" style="max-width:640px;margin:0 auto;background:#FFFDF9;border-radius:4px">
<tr><td style="padding:24px 28px 8px;border-bottom:3px solid #F69106">
<p style="margin:0;font:600 11px/1.4 ui-monospace,monospace;color:#B45309;text-transform:uppercase;letter-spacing:.08em">Nouveau parrainage · ${echapper(date.toLocaleString('fr-FR', { timeZone: 'Europe/Paris' }))}</p>
<h1 style="margin:8px 0 0;font:700 22px/1.2 Poppins,Inter,system-ui,sans-serif;color:#0D2C4C">${echapper(d.parrainNom)} recommande ${echapper(d.filleulNom)}</h1>
</td></tr>
<tr><td style="padding:12px 16px"><table role="presentation" width="100%" style="border-collapse:collapse">
${ligne('Parrain', d.parrainNom)}${ligne('E-mail parrain', d.parrainEmail)}${ligne('Filleul', d.filleulNom)}${ligne('E-mail filleul', d.filleulEmail)}${ligne('Message', d.message)}${ligne('Accord du filleul', 'Confirmé par le parrain')}
</table></td></tr>
<tr><td style="padding:12px 28px 24px;font:12px/1.5 Inter,system-ui,sans-serif;color:#64748B">Envoyé depuis ${echapper(SITE.url)}/parrainage. Répondre à ce message écrit au parrain.</td></tr>
</table></body></html>`
  const texte = [`Parrainage — ${d.parrainNom} recommande ${d.filleulNom}`, `Parrain : ${d.parrainNom} <${d.parrainEmail}>`, `Filleul : ${d.filleulNom} <${d.filleulEmail}>`, d.message && `Message :\n${d.message}`, 'Accord du filleul : confirmé par le parrain']
    .filter(Boolean)
    .join('\n\n')
  return { sujet, html, texte }
}

export async function POST(req: NextRequest) {
  const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || req.headers.get('x-real-ip') || 'inconnue'
  // Sans JS, le navigateur poste le formulaire tel quel : on répond par une redirection.
  const classique = !(req.headers.get('content-type') ?? '').includes('application/json')
  const retour = (etat: 'merci' | 'erreur') => NextResponse.redirect(new URL(`/parrainage?${etat}=1#formulaire`, req.url), 303)
  if (limite(ip)) return classique ? retour('erreur') : NextResponse.json({ ok: false, erreur: 'Trop de demandes en peu de temps. Réessayez dans quelques minutes.' }, { status: 429 })

  let corps: unknown
  try {
    if (classique) {
      const f = await req.formData()
      const t = (k: string) => String(f.get(k) ?? '')
      corps = { parrainNom: t('parrainNom'), parrainEmail: t('parrainEmail'), filleulNom: t('filleulNom'), filleulEmail: t('filleulEmail'), message: t('message'), accord: f.get('accord') === 'on', site_web: t('site_web') }
    } else corps = await req.json()
  } catch {
    return classique ? retour('erreur') : NextResponse.json({ ok: false, erreur: 'Requête illisible.' }, { status: 400 })
  }
  const r = ParrainageSchema.safeParse(corps)
  if (!r.success) {
    if (classique) return retour('erreur')
    const champs: Record<string, string> = {}
    for (const issue of r.error.issues) {
      const k = String(issue.path[0] ?? '')
      if (k && !champs[k]) champs[k] = issue.message
    }
    return NextResponse.json({ ok: false, champs }, { status: 422 })
  }
  const d = r.data
  const m = gabarit(d, new Date())

  const cle = process.env.RESEND_API_KEY
  if (!cle) {
    console.info('[parrainage] demande reçue (Resend non configuré)', { sujet: m.sujet, parrain: d.parrainEmail })
    if (classique) return retour('merci')
    return NextResponse.json({ ok: true, envoye: false }, { status: 202 })
  }
  try {
    const { Resend } = await import('resend')
    const resend = new Resend(cle)
    const expediteur = process.env.CONTACT_FROM || `${SITE.nom} <contact@stackup-agency.fr>`
    const destinataire = process.env.CONTACT_TO || SITE.email
    const { error } = await resend.emails.send({ from: expediteur, to: destinataire, replyTo: d.parrainEmail, subject: m.sujet, html: m.html, text: m.texte })
    if (error) throw error
    if (classique) return retour('merci')
    return NextResponse.json({ ok: true, envoye: true })
  } catch (e) {
    console.error('[parrainage] envoi impossible', e)
    if (classique) return retour('erreur')
    return NextResponse.json({ ok: false, erreur: 'L’envoi a échoué de notre côté. Écrivez-nous directement à ' + SITE.email }, { status: 502 })
  }
}
