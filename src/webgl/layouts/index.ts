import { logo } from './logo.ts'
import { pile } from './pile.ts'
import { strates } from './strates.ts'
import { boutique, logiciel, multi, pageLayout } from './offres.ts'
import { pellicule } from './pellicule.ts'
import { noyau } from './noyau.ts'
import type { LayoutData } from './types.ts'

export type LayoutName = 'logo' | 'pile' | 'strates' | 'page' | 'multi' | 'boutique' | 'logiciel' | 'pellicule' | 'noyau'

/** Paramètres que les layouts lisent dans le store (`params`). */
export interface LayoutParams {
  parNiveau: number
  ecart: number
  torsion: number
  rayon: number
  chantier: number
  echelle: number
  hauteur: number
  ouverture: number
  glisse: number
  portrait: number
}

export const LAYOUTS: Record<LayoutName, (n: number, p: LayoutParams) => LayoutData> = {
  logo: (n) => logo(n),
  pile: (n, p) => pile(n, p),
  strates: (n, p) => strates(n, { ouverture: p.ouverture }),
  page: (n) => pageLayout(n),
  multi: (n, p) => multi(n, p.portrait > 0.5),
  boutique: (n) => boutique(n),
  logiciel: (n) => logiciel(n),
  pellicule: (n, p) => pellicule(n, { glisse: p.glisse }),
  noyau: (n) => noyau(n),
}

/** Clés de `params` dont le changement recalcule le layout courant. */
export const CLES_LAYOUT: (keyof LayoutParams)[] = ['parNiveau', 'ecart', 'torsion', 'rayon', 'chantier', 'echelle', 'hauteur', 'ouverture', 'glisse', 'portrait']

export const NOMS_LAYOUTS = Object.keys(LAYOUTS) as LayoutName[]
export type { LayoutData } from './types.ts'
export { logo, pile, strates, pageLayout, multi, boutique, logiciel, pellicule, noyau }
