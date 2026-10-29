import { ENRICHISSEMENTS as villes } from './villes'
import { ENRICHISSEMENTS as m1 } from './metiers-1'
import { ENRICHISSEMENTS as m2 } from './metiers-2'
import { ENRICHISSEMENTS as m3 } from './metiers-3'
import { ENRICHISSEMENTS as m4 } from './metiers-4'
import { ENRICHISSEMENTS_A } from './villes-nouvelles-a'
import { ENRICHISSEMENTS_B } from './villes-nouvelles-b'
import { jetonsProfond } from '@/lib/jetons'
import type { ContenuLocal } from './types'

export const CONTENU_VILLES: Record<string, ContenuLocal> = jetonsProfond({ ...villes, ...ENRICHISSEMENTS_A, ...ENRICHISSEMENTS_B })
export const CONTENU_METIERS: Record<string, ContenuLocal> = jetonsProfond({ ...m1, ...m2, ...m3, ...m4 })
