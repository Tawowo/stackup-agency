/**
 * LA CONFIGURATION — ce que le visiteur choisit d'empiler sur /tarifs, et qui
 * voyage jusqu'à /contact dans l'URL (`?c=`) SANS ressaisie.
 * Validation zod des deux côtés ; sérialisation compacte et lisible.
 */
import { z } from 'zod'
import { SITE, formatAPartirDe, type IdOffre } from "../config/site.ts"

export const TYPES: IdOffre[] = ['une-page', 'multi-pages', 'boutique', 'outil']

export interface Fonction {
  id: string
  nom: string
  detail: string
  pour: IdOffre[]
}

const SITES: IdOffre[] = ['une-page', 'multi-pages', 'boutique']
const TOUS: IdOffre[] = [...SITES, 'outil']

/** Les fonctions que l'on peut empiler. Aucun prix public : elles précisent le devis. */
export const FONCTIONS: Fonction[] = [
  { id: 'formulaire', nom: 'Formulaire', detail: 'Contact, demande de devis, réservation simple.', pour: SITES },
  { id: 'galerie', nom: 'Galerie', detail: 'Vos réalisations, vos produits, en grand.', pour: ['une-page', 'multi-pages'] },
  { id: 'blog', nom: 'Blog', detail: 'Des articles pour être trouvé.', pour: ['multi-pages'] },
  { id: 'rdv', nom: 'Prise de rendez-vous', detail: 'Vos créneaux, réservés en ligne.', pour: TOUS },
  { id: 'paiement', nom: 'Paiement en ligne', detail: 'Encaisser sur le site.', pour: ['boutique', 'outil'] },
  { id: 'espace-client', nom: 'Espace client', detail: 'Documents, suivi, historique.', pour: ['multi-pages', 'boutique', 'outil'] },
  { id: 'devis-factures', nom: 'Devis et factures', detail: 'Édition, envoi, relances.', pour: ['outil'] },
  { id: 'planning', nom: 'Planning', detail: 'Équipe, créneaux, absences.', pour: ['outil'] },
  { id: 'stocks', nom: 'Stocks', detail: 'Articles, seuils, commandes.', pour: ['boutique', 'outil'] },
  { id: 'multilingue', nom: 'Seconde langue', detail: 'Le site dans une autre langue.', pour: SITES },
]

export const MAINTENANCES = ['starter', 'pro', 'premium'] as const
export type IdMaintenance = (typeof MAINTENANCES)[number]

export const PACKS_REDACTION = [0, 4, 8] as const

export const ConfigurationSchema = z.object({
  type: z.enum(['une-page', 'multi-pages', 'boutique', 'outil']).nullable().default(null),
  fonctions: z.array(z.string()).default([]),
  maintenance: z.enum(MAINTENANCES).nullable().default(null),
  redaction: z.union([z.literal(0), z.literal(4), z.literal(8)]).default(0),
})
export type Configuration = z.infer<typeof ConfigurationSchema>

export const CONFIGURATION_VIDE: Configuration = { type: null, fonctions: [], maintenance: null, redaction: 0 }

/** Fonctions compatibles avec le type choisi. */
export function fonctionsPour(type: IdOffre | null): Fonction[] {
  if (!type) return []
  return FONCTIONS.filter((f) => f.pour.includes(type))
}

/** Nettoie une configuration : type valide, fonctions compatibles, sans doublon. */
export function normaliser(c: Partial<Configuration>): Configuration {
  const r = ConfigurationSchema.safeParse(c)
  const v = r.success ? r.data : { ...CONFIGURATION_VIDE }
  const ok = new Set(fonctionsPour(v.type).map((f) => f.id))
  v.fonctions = [...new Set(v.fonctions.filter((f) => ok.has(f)))]
  return v
}

/** `t=outil;f=rdv,devis-factures;m=pro;r=4` — lisible dans l'URL, court. */
export function serialiser(c: Configuration): string {
  const parts: string[] = []
  if (c.type) parts.push(`t=${c.type}`)
  if (c.fonctions.length) parts.push(`f=${c.fonctions.join(',')}`)
  if (c.maintenance) parts.push(`m=${c.maintenance}`)
  if (c.redaction) parts.push(`r=${c.redaction}`)
  return parts.join(';')
}

export function deserialiser(s: string | null | undefined): Configuration {
  if (!s) return { ...CONFIGURATION_VIDE }
  const brut: Record<string, string> = {}
  for (const p of s.split(';')) {
    const i = p.indexOf('=')
    if (i > 0) brut[p.slice(0, i)] = p.slice(i + 1)
  }
  return normaliser({
    type: (brut.t as IdOffre) ?? null,
    fonctions: brut.f ? brut.f.split(',') : [],
    maintenance: (brut.m as IdMaintenance) ?? null,
    redaction: brut.r ? (Number(brut.r) as 0 | 4 | 8) : 0,
  })
}

export interface Estimation {
  /** Plancher ponctuel (offre + rédaction), en euros. */
  ponctuel: number
  /** Abonnement mensuel (maintenance), en euros. */
  mensuel: number
  /** Fonctions retenues : elles précisent le devis, sans prix public. */
  surDevis: Fonction[]
  /** Position de l'aiguille (0 → 1) : plancher / offre la plus chère. */
  jauge: number
}

/** Un PLANCHER, jamais un prix : toujours « à partir de ». Aucune durée. */
export function estimer(c: Configuration): Estimation {
  const offre = SITE.offres.find((o) => o.id === c.type)
  const redaction = c.redaction === 4 ? SITE.redaction.pack4 : c.redaction === 8 ? SITE.redaction.pack8 : 0
  const maintenance = c.maintenance ? SITE.maintenance.find((m) => m.id === c.maintenance)!.prix : 0
  const ponctuel = (offre?.aPartirDe ?? 0) + redaction
  const max = Math.max(...SITE.offres.map((o) => o.aPartirDe)) + SITE.redaction.pack8
  return {
    ponctuel,
    mensuel: maintenance,
    surDevis: FONCTIONS.filter((f) => c.fonctions.includes(f.id)),
    jauge: Math.min(1, ponctuel / max),
  }
}

/** Lignes de Fiche : la configuration telle qu'un humain la lit. */
export function lignesFiche(c: Configuration): { cle: string; valeur: string }[] {
  const offre = SITE.offres.find((o) => o.id === c.type)
  const e = estimer(c)
  const l: { cle: string; valeur: string }[] = []
  l.push({ cle: 'Type', valeur: offre ? offre.nom : 'À définir ensemble' })
  if (e.surDevis.length) l.push({ cle: 'Fonctions', valeur: e.surDevis.map((f) => f.nom).join(', ') })
  if (c.maintenance) l.push({ cle: 'Maintenance', valeur: `${SITE.maintenance.find((m) => m.id === c.maintenance)!.nom}, ${e.mensuel} €/mois` })
  if (c.redaction) l.push({ cle: 'Rédaction', valeur: `Pack de ${c.redaction} articles` })
  if (offre) l.push({ cle: 'Plancher', valeur: formatAPartirDe(e.ponctuel) })
  return l
}

/** Résumé texte pour l'e-mail et le champ caché du formulaire. */
export function resumer(c: Configuration): string {
  return lignesFiche(c)
    .map((x) => `${x.cle} : ${x.valeur}`)
    .join('\n')
}
