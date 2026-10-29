/**
 * DEMANDES DE L'OFFRE « CLUBS DE TENNIS » — estimation reçue par e-mail, demande de devis, désinscription.
 * Schémas zod partagés client / serveur et gabarits d'e-mail (échappés). Le prix est TOUJOURS recalculé côté
 * serveur à partir de l'état de la simulation (jamais repris du navigateur).
 */
import { z } from 'zod'
import { echapper } from './email.ts'
import { SITE } from '../config/site.ts'
import { COMPANY } from '../config/company.ts'
import { MENTIONS_CLUBS, PRODUCT_NAME } from '../config/offre-clubs.ts'
import type { LigneRecap } from '../domain/clubs/resume.ts'

export const ROLES_CLUB = ['Président ou présidente', 'Trésorier ou trésorière', 'Secrétaire', 'Enseignant ou enseignante', 'Membre du bureau', 'Autre'] as const

export const DemandeClubSchema = z.object({
  type: z.enum(['estimation', 'devis']),
  prenom: z.string().trim().max(80).default(''),
  nom: z.string({ message: 'Votre nom est nécessaire.' }).trim().min(1, 'Votre nom est nécessaire.').max(80),
  email: z.email('Cette adresse ne semble pas valide.').max(200),
  telephone: z
    .string()
    .trim()
    .max(30)
    .regex(/^[+\d][\d\s().-]{5,}$|^$/, 'Ce numéro ne semble pas valide.')
    .default(''),
  role: z.string().trim().max(60).default(''),
  message: z.string().trim().max(3000).default(''),
  /** État de la simulation (paramètres d'adresse du simulateur). */
  simulation: z.string().max(1500),
  rgpd: z.literal(true, { message: 'Il faut accepter que nous gardions votre demande pour vous répondre.' }),
  /** Pot de miel : doit rester vide. */
  site_web: z.string().max(0).default(''),
  /** Millisecondes passées sur le formulaire : un robot répond en moins de 2 secondes. */
  duree: z.number().int().min(0).max(86_400_000).default(0),
})
export type DemandeClub = z.output<typeof DemandeClubSchema>

export const DesinscriptionSchema = z.object({
  email: z.email('Cette adresse ne semble pas valide.').max(200),
  site_web: z.string().max(0).default(''),
})

const ligne = (cle: string, valeur: string) =>
  valeur
    ? `<tr><td style="padding:8px 12px;color:#64748B;font:12px/1.4 ui-monospace,monospace;text-transform:uppercase;letter-spacing:.08em;vertical-align:top">${echapper(cle)}</td><td style="padding:8px 12px;color:#0D2C4C;font:15px/1.5 Inter,system-ui,sans-serif;white-space:pre-wrap">${echapper(valeur)}</td></tr>`
    : ''

const cadre = (titre: string, surtitre: string, corps: string, pied: string) => `<!doctype html><html lang="fr"><body style="margin:0;background:#F3EFE6;padding:32px 16px">
<table role="presentation" width="100%" style="max-width:640px;margin:0 auto;background:#FFFDF9;border-radius:4px;box-shadow:13px -4px 0 rgba(6,11,20,.18)">
<tr><td style="padding:24px 28px 8px;border-bottom:3px solid #F69106">
<p style="margin:0;font:600 11px/1.4 ui-monospace,monospace;color:#B45309;text-transform:uppercase;letter-spacing:.08em">${echapper(surtitre)}</p>
<h1 style="margin:8px 0 0;font:700 22px/1.2 Poppins,Inter,system-ui,sans-serif;color:#0D2C4C">${echapper(titre)}</h1>
</td></tr>
${corps}
<tr><td style="padding:12px 28px 24px;font:12px/1.5 Inter,system-ui,sans-serif;color:#64748B">${pied}</td></tr>
</table></body></html>`

/** E-mail reçu par le club : son récapitulatif, le lien pour retrouver la simulation, les mentions. */
export function gabaritRecapClub(d: DemandeClub, recap: LigneRecap[], lien: string) {
  const sujet = `Votre estimation ${PRODUCT_NAME}${recap[0]?.cle === 'Club' ? ` — ${recap[0].valeur.split(' · ')[0]}` : ''}`
  const corps = `<tr><td style="padding:16px 28px 0;font:15px/1.55 Inter,system-ui,sans-serif;color:#0D2C4C"><p style="margin:0 0 12px">Bonjour ${echapper(d.prenom || d.nom)},</p><p style="margin:0 0 12px">Voici l’estimation faite sur notre simulateur. ${echapper(SITE.fondateur)} ${d.type === 'devis' ? 'prépare votre devis et vous recontacte personnellement.' : 'reste à votre disposition pour en parler.'}</p></td></tr>
<tr><td style="padding:4px 16px"><table role="presentation" width="100%" style="border-collapse:collapse">${recap.map((l) => ligne(l.cle, l.valeur)).join('')}</table></td></tr>
<tr><td style="padding:12px 28px;font:15px/1.55 Inter,system-ui,sans-serif"><a href="${echapper(lien)}" style="color:#B45309;font-weight:600">Retrouver ou modifier cette simulation</a></td></tr>`
  const pied = `${echapper(MENTIONS_CLUBS.prix)}<br>${echapper(MENTIONS_CLUBS.fft)}<br>${echapper(COMPANY.denomination)} · ${echapper(COMPANY.nomCommercial)} · SIRET ${echapper(COMPANY.siret)} · ${echapper(COMPANY.tva)} · ${echapper(SITE.email)}`
  const html = cadre(d.type === 'devis' ? 'Votre demande de devis' : 'Votre estimation', `Estimation indicative · ${PRODUCT_NAME}`, corps, pied)
  const texte = [`Bonjour ${d.prenom || d.nom},`, '', 'Voici l’estimation faite sur notre simulateur.', '', ...recap.map((l) => `${l.cle} : ${l.valeur}`), '', `Retrouver la simulation : ${lien}`, '', MENTIONS_CLUBS.prix, MENTIONS_CLUBS.fft, `${COMPANY.denomination} · SIRET ${COMPANY.siret} · ${SITE.email}`].join('\n')
  return { sujet, html, texte }
}

/** E-mail interne : toutes les réponses, la simulation recalculée, la page d'entrée. */
export function gabaritInterneClub(d: DemandeClub, recap: LigneRecap[], lien: string, meta: { date: Date; ip?: string }) {
  const club = recap[0]?.cle === 'Club' ? recap[0].valeur : 'club non nommé'
  const sujet = `[${PRODUCT_NAME}] ${d.type === 'devis' ? 'Devis demandé' : 'Estimation envoyée'} — ${club} — ${d.prenom} ${d.nom}`.replace(/\s+/g, ' ')
  const contact = [ligne('Nom', `${d.prenom} ${d.nom}`.trim()), ligne('Rôle au club', d.role), ligne('E-mail', d.email), ligne('Téléphone', d.telephone), ligne('Message', d.message)].join('')
  const corps = `<tr><td style="padding:12px 16px"><table role="presentation" width="100%" style="border-collapse:collapse">${contact}</table></td></tr>
<tr><td style="padding:4px 16px 12px"><table role="presentation" width="100%" style="border-collapse:collapse;background:#FFF4DF;border-left:4px solid #F69106">${recap.map((l) => ligne(l.cle, l.valeur)).join('')}</table></td></tr>
<tr><td style="padding:0 28px 8px;font:14px/1.5 Inter,system-ui,sans-serif"><a href="${echapper(lien)}" style="color:#B45309">Ouvrir la simulation</a></td></tr>`
  const html = cadre(sujet, `Nouvelle demande · ${meta.date.toLocaleString('fr-FR', { timeZone: 'Europe/Paris' })}`, corps, `Depuis ${echapper(SITE.url)}/clubs-de-tennis/simulateur${meta.ip ? ` · IP ${echapper(meta.ip)}` : ''}. Répondre à ce message écrit à ${echapper(d.email)}.`)
  const texte = [sujet, '', `Nom : ${d.prenom} ${d.nom}`, d.role && `Rôle : ${d.role}`, `E-mail : ${d.email}`, d.telephone && `Téléphone : ${d.telephone}`, d.message && `Message :\n${d.message}`, '', ...recap.map((l) => `${l.cle} : ${l.valeur}`), '', lien].filter((x): x is string => typeof x === 'string').join('\n')
  return { sujet, html, texte }
}
