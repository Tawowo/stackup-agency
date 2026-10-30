/** GABARITS D'E-MAIL de l'offre clubs : l'estimation envoyée au club, et la copie interne avec toutes les réponses. Rendus côté serveur, échappés. */
import { SITE } from '../config/site.ts'
import { PRODUCT_NAME, DEMO, MENTION_FFT } from '../config/offre-clubs.ts'
import { MENTION_PRIX_INDICATIFS, SITE_INCLUS, LOGICIEL_INCLUS, ABONNEMENT_INCLUS } from '../data/offre-clubs/inclus.ts'
import { echapper } from './email.ts'
import { lignesResume } from '../domain/clubs/resume.ts'
import type { Resultat, Simulation } from '../domain/clubs/types.ts'

const tr = (cle: string, valeur: string, interne = false) =>
  `<tr><td style="padding:7px 12px;color:${interne ? '#B45309' : '#64748B'};font:12px/1.4 ui-monospace,monospace;text-transform:uppercase;letter-spacing:.06em;vertical-align:top;width:34%">${echapper(cle)}</td><td style="padding:7px 12px;color:#0D2C4C;font:14px/1.5 Inter,system-ui,sans-serif">${echapper(valeur)}</td></tr>`

const cadre = (titre: string, corps: string, pied: string) => `<!doctype html><html lang="fr"><body style="margin:0;background:#F3EFE6;padding:32px 16px">
<table role="presentation" width="100%" style="max-width:640px;margin:0 auto;background:#FFFDF9;border-radius:4px;box-shadow:13px -4px 0 rgba(6,11,20,.18)">
<tr><td style="padding:24px 28px 8px;border-bottom:3px solid #F69106"><h1 style="margin:0;font:700 22px/1.2 Poppins,Inter,system-ui,sans-serif;color:#0D2C4C">${echapper(titre)}</h1></td></tr>
<tr><td style="padding:12px 16px">${corps}</td></tr>
<tr><td style="padding:12px 28px 24px;font:12px/1.5 Inter,system-ui,sans-serif;color:#64748B">${pied}</td></tr>
</table></body></html>`

export function gabaritEstimationClub(s: Simulation, r: Resultat, o: { nom: string; lien: string }) {
  const lignes = lignesResume(s, r)
  const inclus = [...(s.formule !== 'logiciel' ? SITE_INCLUS : []), ...(s.formule !== 'site' ? LOGICIEL_INCLUS : [])].map((x) => x.titre)
  const sujet = `Votre estimation ${PRODUCT_NAME}${s.club.nom ? ` — ${s.club.nom}` : ''}`
  const corps = `<p style="margin:8px 12px;font:15px/1.55 Inter,system-ui,sans-serif;color:#0D2C4C">Bonjour${o.nom ? ` ${echapper(o.nom)}` : ''},<br>voici l’estimation de votre simulation. ${echapper(MENTION_PRIX_INDICATIFS)}</p>
<table role="presentation" width="100%" style="border-collapse:collapse">${lignes.map((l) => tr(l.cle, l.valeur)).join('')}</table>
<p style="margin:12px;font:14px/1.55 Inter,system-ui,sans-serif;color:#0D2C4C"><strong>Inclus avec votre formule :</strong> ${echapper(inclus.join(' · '))}.</p>
<p style="margin:12px;font:14px/1.55 Inter,system-ui,sans-serif;color:#0D2C4C"><strong>Inclus dans l’abonnement :</strong> ${echapper(ABONNEMENT_INCLUS.join(' '))}</p>
<p style="margin:12px;font:14px/1.55 Inter,system-ui,sans-serif"><a href="${echapper(o.lien)}" style="color:#B45309">Retrouver et partager cette simulation</a> · <a href="${echapper(DEMO.roles)}" style="color:#B45309">Voir la démo</a> · <a href="${echapper(SITE.url)}/contact?a=appel" style="color:#B45309">Réserver un appel gratuit</a></p>`
  const pied = `${echapper(MENTION_FFT)}<br>${echapper(SITE.nom)} · ${echapper(SITE.ville)}, ${echapper(SITE.departement)} · ${echapper(SITE.email)} · ${echapper(SITE.telephone)}`
  const texte = [`Bonjour${o.nom ? ` ${o.nom}` : ''},`, '', 'Voici l’estimation de votre simulation.', MENTION_PRIX_INDICATIFS, '', ...lignes.map((l) => `${l.cle} : ${l.valeur}`), '', `Retrouver et partager cette simulation : ${o.lien}`, `Voir la démo : ${DEMO.roles}`, `Réserver un appel gratuit : ${SITE.url}/contact?a=appel`, '', MENTION_FFT].join('\n')
  return { sujet, html: cadre(`Votre estimation ${PRODUCT_NAME}`, corps, pied), texte }
}

export function gabaritEstimationInterne(s: Simulation, r: Resultat, o: { nom: string; email: string; lien: string; date: Date; ip?: string }) {
  const lignes = lignesResume(s, r)
  const brut = [
    ['Contact', `${o.nom || '(nom non renseigné)'} <${o.email}>`],
    ['Date', o.date.toLocaleString('fr-FR', { timeZone: 'Europe/Paris' })],
    ...(r.avertissements.length ? [['Avertissements', r.avertissements.join(' ')]] : []),
    ...(r.baisseSensible ? [['Licenciés', 'Baisse sensible : justificatif à demander (saison en cours sous 90 % de la moyenne).']] : []),
    ['Options (identifiants)', Object.entries(s.options).map(([k, n]) => `${k}${n > 1 ? ` ×${n}` : ''}`).join(', ') || 'aucune'],
    ['Hors catalogue', s.horsCatalogue.join(', ') || 'aucun'],
  ]
  const sujet = `[${SITE.nom}] Simulation ${PRODUCT_NAME} — ${s.club.nom || 'club sans nom'} (${r.categorie.nom}, ${r.licencies} licenciés)`
  const corps = `<table role="presentation" width="100%" style="border-collapse:collapse">${brut.map(([k, v]) => tr(k!, v!, true)).join('')}${lignes.map((l) => tr(l.cle, l.valeur)).join('')}</table>`
  const pied = `Simulation envoyée depuis ${echapper(SITE.url)}/clubs-de-tennis/simulateur${o.ip ? ` · IP ${echapper(o.ip)}` : ''}. <a href="${echapper(o.lien)}" style="color:#B45309">Rouvrir la simulation</a>. Répondre à ce message écrit au club.`
  const texte = [...brut.map(([k, v]) => `${k} : ${v}`), '', ...lignes.map((l) => `${l.cle} : ${l.valeur}`), '', `Simulation : ${o.lien}`].join('\n')
  return { sujet, html: cadre('Nouvelle simulation de club', corps, pied), texte }
}
