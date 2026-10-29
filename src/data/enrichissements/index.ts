import { ENRICHISSEMENTS as villes } from './villes'
import { ENRICHISSEMENTS as m1 } from './metiers-1'
import { ENRICHISSEMENTS as m2 } from './metiers-2'
import { ENRICHISSEMENTS as m3 } from './metiers-3'
import { ENRICHISSEMENTS as m4 } from './metiers-4'
import { ENRICHISSEMENTS_A } from './villes-nouvelles-a'
import { ENRICHISSEMENTS_B } from './villes-nouvelles-b'
import { FAQ_METIERS as f1 } from './metiers-faq-1'
import { FAQ_METIERS as f2 } from './metiers-faq-2'
import { FAQ_METIERS as f3 } from './metiers-faq-3'
import { FAQ_METIERS as f4 } from './metiers-faq-4'
import { FAQ_METIERS as f5 } from './metiers-faq-5'
import { FAQ_METIERS as f6 } from './metiers-faq-6'
import { FAQ_METIERS as f7 } from './metiers-faq-7'
import { jetonsProfond } from '@/lib/jetons'
import type { ContenuLocal } from './types'

export const CONTENU_VILLES: Record<string, ContenuLocal> = jetonsProfond({ ...villes, ...ENRICHISSEMENTS_A, ...ENRICHISSEMENTS_B })
const FAQ_PAR_METIER: Record<string, ContenuLocal['faq']> = { ...f1, ...f2, ...f3, ...f4, ...f5, ...f6, ...f7 }
const METIERS_BRUT: Record<string, ContenuLocal> = { ...m1, ...m2, ...m3, ...m4 }
/** Contenu propre à chaque page métier : sections et questions d'origine, puis 7 questions par métier (Google Maps, domaine et e-mail, devis, relances, photos, visibilité, obligations). */
export const CONTENU_METIERS: Record<string, ContenuLocal> = jetonsProfond(
  Object.fromEntries(
    [...new Set([...Object.keys(METIERS_BRUT), ...Object.keys(FAQ_PAR_METIER)])].map((slug) => [
      slug,
      { sections: METIERS_BRUT[slug]?.sections ?? [], faq: [...(METIERS_BRUT[slug]?.faq ?? []), ...(FAQ_PAR_METIER[slug] ?? [])] },
    ]),
  ),
)
