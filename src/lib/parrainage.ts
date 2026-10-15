/** LE FORMULAIRE DE PARRAINAGE — schéma zod partagé client / serveur. */
import { z } from 'zod'

/** Les quatre formules au choix du parrain (montants : SITE.parrainage). */
export const FORMULES = ['argent', 'credit', 'abonnement', 'partage'] as const
export type Formule = (typeof FORMULES)[number]
export const LIBELLE_FORMULE: Record<Formule, string> = {
  argent: 'Récompense en argent',
  credit: 'Crédit Stackup',
  abonnement: 'Mois d’abonnement offerts',
  partage: 'Partage avec mon filleul',
}

export const ParrainageSchema = z
  .object({
    parrainNom: z.string({ message: 'Votre nom est nécessaire.' }).trim().min(1, 'Votre nom est nécessaire.').max(120),
    parrainEmail: z.email('Cette adresse ne semble pas valide.').max(200),
    filleulNom: z.string({ message: 'Le nom de votre filleul est nécessaire.' }).trim().min(1, 'Le nom de votre filleul est nécessaire.').max(120),
    filleulEmail: z.email('Cette adresse ne semble pas valide.').max(200),
    formule: z.enum(FORMULES, { message: 'Choisissez une formule.' }),
    message: z.string().trim().max(2000).default(''),
    accord: z.literal(true, { message: 'Il faut confirmer que votre filleul accepte d’être contacté.' }),
    /** Pot de miel : doit rester vide. */
    site_web: z.string().max(0).default(''),
  })
  .refine((d) => d.parrainEmail.toLowerCase() !== d.filleulEmail.toLowerCase(), { message: 'L’adresse du filleul doit être différente de la vôtre.', path: ['filleulEmail'] })

export type ParrainageEntree = z.input<typeof ParrainageSchema>
export type Parrainage = z.output<typeof ParrainageSchema>
