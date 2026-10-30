/**
 * VALIDATION DE LA GRILLE DES CLUBS — schéma zod de src/data/offre-clubs/pricing.ts, appliqué par `npm test`
 * (tests/clubs.test.mjs). Séparé de la grille pour que zod ne parte pas dans le JavaScript du navigateur.
 */
import { z } from 'zod'
import { OPTION_IDS } from './pricing.ts'

const Tarif = z.object({ miseEnPlace: z.number().int().positive(), mois: z.number().int().positive() })

const Categorie = z.object({
  id: z.enum(['mini', 'petit', 'moyen', 'grand', 'tres-grand']),
  nom: z.string().min(1),
  min: z.number().int().positive(),
  max: z.number().int().positive().nullable(),
  clubType: z.number().int().positive(),
  site: Tarif,
  logiciel: Tarif,
  heures: z.object({ site: z.number().int().nonnegative(), logiciel: z.number().int().nonnegative(), pack: z.number().int().nonnegative() }),
  stockageGo: z.number().int().positive(),
})

const Option = z.object({
  id: z.enum(OPTION_IDS),
  nom: z.string().min(1),
  description: z.string().min(1),
  miseEnPlace: z.number().int().nonnegative(),
  mois: z.number().int().nonnegative(),
  unite: z.enum(['fixe', 'page']),
  requiert: z.enum(['site', 'logiciel', 'assistant-ia']).nullable(),
  condition: z.string(),
  simulateur: z.boolean(),
  groupe: z.enum(['fonctions', 'visibilite', 'mise-en-place', 'depart']),
})

export const PricingSchema = z
  .object({
    packDiscount: z.number().min(0).max(0.5),
    annualDiscount: z.number().min(0).max(0.5),
    installments: z.number().int().min(1),
    engagementMois: z.number().int().positive(),
    heureSupplementaire: z.number().int().positive(),
    trancheMinutes: z.number().int().positive(),
    heureDeveloppement: z.number().int().positive(),
    premierRdvGratuitKm: z.number().int().positive(),
    pagesIncluses: z.number().int().positive(),
    supportJoursOuvres: z.number().int().positive(),
    seuilBaisse: z.number().min(0).max(1),
    categories: z.array(Categorie).length(5),
    options: z.array(Option),
  })
  .superRefine((p, ctx) => {
    // Catégories contiguës, sans trou ni chevauchement ; la dernière est ouverte.
    p.categories.forEach((c, i) => {
      const suivante = p.categories[i + 1]
      if (suivante && (c.max === null || suivante.min !== c.max + 1)) ctx.addIssue({ code: 'custom', message: `catégories non contiguës après ${c.id}` })
      if (!suivante && c.max !== null) ctx.addIssue({ code: 'custom', message: 'la dernière catégorie doit être ouverte (max: null)' })
      if (c.clubType < c.min || (c.max !== null && c.clubType > c.max)) ctx.addIssue({ code: 'custom', message: `club type hors de la catégorie ${c.id}` })
    })
    // Chaque option une seule fois, toutes présentes.
    const ids = p.options.map((o) => o.id)
    if (new Set(ids).size !== ids.length || ids.length !== OPTION_IDS.length) ctx.addIssue({ code: 'custom', message: 'options manquantes ou en double' })
  })
