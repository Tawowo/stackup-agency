/** LE FORMULAIRE DE CONTACT — schéma zod partagé client / serveur. */
import { z } from 'zod'

export const OBJETS = ['Site', 'Outil sur mesure', 'Maintenance', 'Autre'] as const

export const ContactSchema = z.object({
  prenom: z.string({ message: 'Votre prénom est nécessaire.' }).trim().min(1, 'Votre prénom est nécessaire.').max(80),
  nom: z.string({ message: 'Votre nom est nécessaire.' }).trim().min(1, 'Votre nom est nécessaire.').max(80),
  entreprise: z.string().trim().max(120).default(''),
  metier: z.string().trim().max(120).default(''),
  objet: z.enum(OBJETS, { message: 'Choisissez un objet.' }),
  projet: z.string({ message: 'Dites-nous en au moins une phrase.' }).trim().min(12, 'Dites-nous en au moins une phrase.').max(3000),
  email: z.email('Cette adresse ne semble pas valide.').max(200),
  telephone: z
    .string()
    .trim()
    .max(30)
    .regex(/^[+\d][\d\s().-]{5,}$|^$/, 'Ce numéro ne semble pas valide.')
    .default(''),
  preference: z.enum(['email', 'telephone']).default('email'),
  rgpd: z.literal(true, { message: 'Il faut accepter que nous gardions votre message pour vous répondre.' }),
  /** Résumé lisible de l'estimation venue de /tarifs. */
  configuration: z.string().max(2500).default(''),
  /** Jeton d'estimation (même format que `?e=` de /tarifs) : le serveur recalcule le prix exact. */
  estimation: z.string().max(2400).default(''),
  /** Ce que le visiteur demande : l'appel gratuit ou la démo. */
  action: z.enum(['appel', 'demo', '']).default(''),
  /** Pot de miel : doit rester vide. */
  site_web: z.string().max(0).default(''),
})

export type ContactEntree = z.input<typeof ContactSchema>
export type Contact = z.output<typeof ContactSchema>

export const CHAMPS_ORDRE = ['prenom', 'nom', 'entreprise', 'metier', 'objet', 'projet', 'email', 'telephone', 'rgpd'] as const
