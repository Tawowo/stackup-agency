/** GABARITS D'E-MAIL — rendus côté serveur, échappés. Resend n'envoie que ça. */
import type { Contact } from './contact'
import { SITE } from '@/config/site'

export function echapper(s: string): string {
  return s.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]!)
}

const ligne = (cle: string, valeur: string) =>
  valeur
    ? `<tr><td style="padding:8px 12px;color:#64748B;font:12px/1.4 ui-monospace,monospace;text-transform:uppercase;letter-spacing:.08em;vertical-align:top">${echapper(cle)}</td><td style="padding:8px 12px;color:#0D2C4C;font:15px/1.5 Inter,system-ui,sans-serif;white-space:pre-wrap">${echapper(valeur)}</td></tr>`
    : ''

export function gabaritContact(d: Contact, meta: { date: Date; ip?: string }) {
  const sujet = `[${SITE.nom}] ${d.objet} — ${d.prenom} ${d.nom}${d.entreprise ? ` (${d.entreprise})` : ''}`
  const html = `<!doctype html><html lang="fr"><body style="margin:0;background:#F3EFE6;padding:32px 16px">
<table role="presentation" width="100%" style="max-width:640px;margin:0 auto;background:#FFFDF9;border-radius:4px;box-shadow:13px -4px 0 rgba(6,11,20,.18)">
<tr><td style="padding:24px 28px 8px;border-bottom:3px solid #F69106">
<p style="margin:0;font:600 11px/1.4 ui-monospace,monospace;color:#B45309;text-transform:uppercase;letter-spacing:.08em">Nouvelle demande · ${echapper(meta.date.toLocaleString('fr-FR', { timeZone: 'Europe/Paris' }))}</p>
<h1 style="margin:8px 0 0;font:700 22px/1.2 Poppins,Inter,system-ui,sans-serif;color:#0D2C4C">${echapper(d.objet)} — ${echapper(d.prenom)} ${echapper(d.nom)}</h1>
</td></tr>
<tr><td style="padding:12px 16px"><table role="presentation" width="100%" style="border-collapse:collapse">
${ligne('Entreprise', d.entreprise)}${ligne('Métier', d.metier)}${ligne('Projet', d.projet)}${ligne('Configuration', d.configuration)}${ligne('E-mail', d.email)}${ligne('Téléphone', d.telephone)}${ligne('Préférence', d.preference === 'telephone' ? 'Par téléphone' : 'Par e-mail')}
</table></td></tr>
<tr><td style="padding:12px 28px 24px;font:12px/1.5 Inter,system-ui,sans-serif;color:#64748B">Envoyé depuis ${echapper(SITE.url)}/contact${meta.ip ? ` · IP ${echapper(meta.ip)}` : ''}. Répondre à ce message écrit directement à ${echapper(d.email)}.</td></tr>
</table></body></html>`
  const texte = [
    `${d.objet} — ${d.prenom} ${d.nom}`,
    d.entreprise && `Entreprise : ${d.entreprise}`,
    d.metier && `Métier : ${d.metier}`,
    `Projet :\n${d.projet}`,
    d.configuration && `Configuration :\n${d.configuration}`,
    `E-mail : ${d.email}`,
    d.telephone && `Téléphone : ${d.telephone}`,
    `Préférence : ${d.preference}`,
  ]
    .filter(Boolean)
    .join('\n\n')
  return { sujet, html, texte }
}

export function gabaritAccuse(d: Contact) {
  const sujet = `Bien reçu — ${SITE.nom}`
  const html = `<!doctype html><html lang="fr"><body style="margin:0;background:#F3EFE6;padding:32px 16px">
<table role="presentation" width="100%" style="max-width:560px;margin:0 auto;background:#FFFDF9;border-radius:4px;box-shadow:13px -4px 0 rgba(6,11,20,.18)">
<tr><td style="padding:28px;border-top:3px solid #F69106;font:15px/1.55 Inter,system-ui,sans-serif;color:#0D2C4C">
<h1 style="margin:0 0 16px;font:700 22px/1.2 Poppins,Inter,system-ui,sans-serif">Bonjour ${echapper(d.prenom)},</h1>
<p style="margin:0 0 12px">Votre message est bien arrivé. ${echapper(SITE.fondateur)} vous répond personnellement, ${d.preference === 'telephone' ? 'par téléphone' : 'par e-mail'}.</p>
<p style="margin:0 0 12px">Pour mémoire, ce que vous nous avez écrit :</p>
<blockquote style="margin:0 0 16px;padding:12px 16px;border-left:3px solid #F69106;background:#F3EFE6;white-space:pre-wrap">${echapper(d.projet)}</blockquote>
<p style="margin:0;color:#64748B;font-size:13px">${echapper(SITE.nom)} · ${echapper(SITE.ville)}, ${echapper(SITE.departement)} · ${echapper(SITE.email)}</p>
</td></tr></table></body></html>`
  return { sujet, html, texte: `Bonjour ${d.prenom},\n\nVotre message est bien arrivé. ${SITE.fondateur} vous répond personnellement.\n\n${d.projet}\n\n${SITE.nom} · ${SITE.email}` }
}
