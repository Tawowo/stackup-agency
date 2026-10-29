/**
 * Contenu rédigé des fiches /solutions/<slug> : sections propres à chaque module et questions supplémentaires.
 * Trois fichiers (solutions-contenu-1 à 3) fusionnés ici ; les prix y passent par des jetons {{prix:…}}.
 */
import { jetonsProfond } from '../lib/jetons'
import { CONTENU_SOLUTIONS_1 } from './solutions-contenu-1'
import { CONTENU_SOLUTIONS_2 } from './solutions-contenu-2'
import { CONTENU_SOLUTIONS_3 } from './solutions-contenu-3'

export interface ContenuSolution {
  sections: { titre: string; paragraphes: string[] }[]
  faq: { q: string; a: string }[]
}

export const CONTENU_SOLUTIONS: Record<string, ContenuSolution> = jetonsProfond({ ...CONTENU_SOLUTIONS_1, ...CONTENU_SOLUTIONS_2, ...CONTENU_SOLUTIONS_3 })
