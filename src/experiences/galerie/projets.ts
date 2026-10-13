/** Les projets exposés : données de src/data/realisations.ts, toutes étiquetées « Démo ». */
import { realisations } from '@/data/realisations'
import { conforme, conformeListe } from '@/lib/conformite'

export interface Projet {
  slug: string
  nom: string
  type: string
  accent: string
  url: string
  capture: string
  description: string
  tags: string[]
  fonctionnalites: string[]
  filtre: string
  contexte?: string
  construit?: string[]
  tester?: string[]
  acces?: { motDePasse?: string; note?: string }
}

type Brut = (typeof realisations)[number] & {
  caseStudy?: { contexte: string; construit: string[]; tester: string[] }
  demoAccess?: { password?: string; note?: string }
}

// Le hall s'ouvre sur la démo la plus lumineuse (la boulangerie) ; l'ordre des autres est conservé.
const OUVERTURE = 'au-pain-dore'
const ordonnees = [...(realisations as Brut[])].sort((a, b) => Number(b.slug === OUVERTURE) - Number(a.slug === OUVERTURE))

export const PROJETS: Projet[] = ordonnees.map((r) => ({
  slug: r.slug,
  nom: r.nom,
  type: r.type,
  accent: r.accent,
  url: r.url,
  capture: `/realisations/${r.slug}/desktop.avif`,
  description: conforme(r.description),
  tags: [...r.tags],
  fonctionnalites: conformeListe(r.fonctionnalites),
  filtre: r.filterType,
  contexte: r.caseStudy ? conforme(r.caseStudy.contexte) : undefined,
  construit: r.caseStudy ? conformeListe(r.caseStudy.construit) : undefined,
  tester: r.caseStudy ? conformeListe(r.caseStudy.tester) : undefined,
  acces: r.demoAccess ? { motDePasse: r.demoAccess.password, note: r.demoAccess.note } : undefined,
}))

export const projetDe = (slug: string) => PROJETS.find((p) => p.slug === slug)
