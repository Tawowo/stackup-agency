import { logo } from './logo.ts'
import { pile } from './pile.ts'
import { strates } from './strates.ts'
import { boutique, logiciel, multi, pageLayout } from './offres.ts'
import { pellicule } from './pellicule.ts'
import { noyau } from './noyau.ts'
import { machines } from './machines.ts'
import { cadran } from './cadran.ts'
import { methode } from './methode.ts'
import { configurateur } from './configurateur.ts'
import { formulaire } from './formulaire.ts'
import type { LayoutData } from './types.ts'

export type LayoutName = 'logo' | 'pile' | 'strates' | 'page' | 'multi' | 'boutique' | 'logiciel' | 'pellicule' | 'noyau' | 'machines' | 'cadran' | 'methode' | 'configurateur' | 'formulaire'

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
  aiguille: number
  etape: number
  modules: number
  type: number
  fonctions: number
  champs: number
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
  machines: (n, p) => machines(n, p.modules, p.portrait > 0.5),
  cadran: (n, p) => cadran(n, p.aiguille),
  methode: (n, p) => methode(n, p.etape),
  configurateur: (n, p) => configurateur(n, p.type, p.fonctions, p.portrait > 0.5),
  formulaire: (n, p) => formulaire(n, p.champs),
}

/** Clés de `params` dont le changement recalcule le layout courant. */
export const CLES_LAYOUT: (keyof LayoutParams)[] = ['parNiveau', 'ecart', 'torsion', 'rayon', 'chantier', 'echelle', 'hauteur', 'ouverture', 'glisse', 'portrait', 'aiguille', 'etape', 'modules', 'type', 'fonctions', 'champs']

export const NOMS_LAYOUTS = Object.keys(LAYOUTS) as LayoutName[]
export type { LayoutData } from './types.ts'
export { logo, pile, strates, pageLayout, multi, boutique, logiciel, pellicule, noyau, machines, cadran, methode, configurateur, formulaire }
