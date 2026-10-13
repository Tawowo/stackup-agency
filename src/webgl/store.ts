/**
 * ÉTAT DE LA SCÈNE — lu par le ticker, écrit par les pages.
 *
 * Aucun composant ne s'abonne à ce store pour re-rendre la 3D : le moteur lit
 * `useScene.getState()` une fois par trame. Les pages déclarent ce qu'elles
 * veulent (layout cible, nuit, accent, boîte d'ancrage) ; le moteur fait.
 */
import { create } from 'zustand'
import type { LayoutName, LayoutParams } from './layouts'

export type Tier = 'ultra' | 'high' | 'medium' | 'low'

export interface Frame {
  /** Boîte en pixels CSS, relative au viewport. */
  x: number
  y: number
  w: number
  h: number
}

export interface PileParams {
  parNiveau: number
  ecart: number
  torsion: number
  rayon: number
  chantier: number
  echelle: number
  hauteur: number
  ouverture: number
  glisse: number
  /** Pellicule : largeur d'un écran en unités locales (un projet par écran). */
  largeur: number
  /** 1 = largeur < 768 px : variantes compactes des layouts. */
  portrait: number
  aiguille: number
  etape: number
  modules: number
  type: number
  fonctions: number
  champs: number
}

export interface SceneParams extends PileParams {
  epaisseur: number
  arc: number
  retard: number
  ambiant: number
  cle: number
  fresnel: number
  arete: number
  halo: number
  ombre: number
  mur: number
  grain: number
  plaques: number
  isoPush: number
  isoDim: number
  /* ── La Fabrique ── */
  /** Inclinaison de la caméra (degrés) : 0 = de face (logo exact), 8 = on voit le sol. */
  tangage: number
  /** Monde : 1 = sol, flux, code, lampe, poussière rendus. */
  sol: number
  flux: number
  code: number
  lampe: number
  /** Hauteur du sol sous le bas de la forme (unités locales). */
  solMarge: number
  /** Intensité des flux (0 → 1). */
  fluxIntensite: number
  /** Opacité du code vivant (0 → 0.4). */
  codeOpacite: number
}

export const PARAMS_DEFAUT: SceneParams = {
  epaisseur: 1,
  arc: 0.6,
  retard: 0.25,
  parNiveau: 3,
  ecart: 0.14,
  torsion: 0.12,
  rayon: 0.42,
  chantier: 0.12,
  echelle: 0.5,
  hauteur: 3.4,
  ouverture: 1,
  glisse: 0,
  largeur: 6,
  portrait: 0,
  aiguille: 0,
  etape: 5,
  modules: 12,
  type: 0,
  fonctions: 0,
  champs: 0,
  ambiant: 0.32,
  cle: 0.95,
  fresnel: 0.3,
  arete: 0.9,
  halo: 0.16,
  ombre: 0.6,
  mur: 1,
  grain: 1,
  plaques: 1,
  isoPush: 0.35,
  isoDim: 0.65,
  tangage: 8,
  sol: 1,
  flux: 1,
  code: 1,
  lampe: 1,
  solMarge: 0.22,
  fluxIntensite: 0.8,
  codeOpacite: 0.16,
}

export interface Pose {
  x: number
  y: number
}

interface SceneState {
  layout: LayoutName
  morph: number
  /** 1 = orthographique, 0 = perspective. */
  projection: number
  /** Orientation de base de la pile, imposée par l'expérience (radians). */
  pose: Pose
  /** Le scroll écrit uMorph lui-même : aucun tween au changement de layout. */
  scrub: boolean
  /** Cible de morph pilotée par l'expérience : A = layout, B = target, uMorph écrit par le scroll. */
  target: LayoutName | null
  /** Surcharges de paramètres par côté de la paire (ex. strates ouvertes → fermées). */
  pairParams: { a?: Partial<LayoutParams>; b?: Partial<LayoutParams> }
  /** Le moment (expérience) qui possède la scène : les autres n'écrivent pas. */
  moment: string
  nuit: number
  /** Diagnostic (`?fond=ivoire`) : la nuit forcée l'emporte sur les expériences. */
  nuitForcee: number | null
  accent: string
  frame: Frame | null
  /** Zone HTML (titre) que les plaques en vol contournent, en pixels CSS. */
  exclusion: Frame | null
  tier: Tier
  mode: '3d' | '2d'
  active: boolean
  still: boolean
  /** Pile à l'arrêt : ni respiration ni dérive, l'ombre longue seule. */
  calme: boolean
  reduced: boolean
  isolate: number
  spin: number
  tilt: number
  dragging: boolean
  fps: number
  params: SceneParams
  ready: boolean
  /** Vitesse de scroll normalisée (0 → 1) : accélère les flux. */
  vitesse: number
  /** Étage courant, continu (scroll / hauteur de viewport) : fait défiler le code vivant. */
  etage: number
  /** Dissolution du sol imposée par une expérience (traversée), en plus du glissement. */
  dissolve: number
  /** Inclinaison du téléphone (−1 → 1) : déplace la lampe. */
  inclinaison: { x: number; y: number }
  setLayout: (l: LayoutName) => void
  setMorph: (m: number) => void
  setProjection: (p: number) => void
  setPose: (p: Pose) => void
  setScrub: (s: boolean) => void
  setTarget: (t: LayoutName | null) => void
  setPair: (a: LayoutName, b: LayoutName | null, pairParams?: { a?: Partial<LayoutParams>; b?: Partial<LayoutParams> }) => void
  setMoment: (m: string) => void
  setNuit: (n: number) => void
  forcerNuit: (n: number | null) => void
  setAccent: (a: string) => void
  setFrame: (f: Frame | null) => void
  setExclusion: (f: Frame | null) => void
  setTier: (t: Tier) => void
  setMode: (m: '3d' | '2d') => void
  setActive: (a: boolean) => void
  setStill: (s: boolean) => void
  setCalme: (c: boolean) => void
  setReduced: (r: boolean) => void
  setIsolate: (i: number) => void
  setSpin: (spin: number, tilt: number, dragging: boolean) => void
  setFps: (f: number) => void
  setParams: (p: Partial<SceneParams>) => void
  setReady: (r: boolean) => void
  setVitesse: (v: number) => void
  setEtage: (e: number) => void
  setDissolve: (d: number) => void
  setInclinaison: (x: number, y: number) => void
}

export const useScene = create<SceneState>((set) => ({
  layout: 'logo',
  morph: 0,
  projection: 1,
  pose: { x: 0, y: 0 },
  scrub: false,
  target: null,
  pairParams: {},
  moment: '00',
  nuit: 1,
  nuitForcee: null,
  accent: '#F69106',
  frame: null,
  exclusion: null,
  tier: 'high',
  mode: '3d',
  active: true,
  still: false,
  calme: false,
  reduced: false,
  isolate: -1,
  spin: 0,
  tilt: 0,
  dragging: false,
  fps: 0,
  params: PARAMS_DEFAUT,
  ready: false,
  vitesse: 0,
  etage: 0,
  dissolve: 0,
  inclinaison: { x: 0, y: 0 },
  setLayout: (layout) => set({ layout }),
  setMorph: (morph) => set({ morph }),
  setProjection: (projection) => set({ projection }),
  setPose: (pose) => set({ pose }),
  setScrub: (scrub) => set({ scrub }),
  setTarget: (target) => set({ target, pairParams: {} }),
  setPair: (layout, target, pairParams = {}) => set({ layout, target, pairParams }),
  setMoment: (moment) => set({ moment }),
  setNuit: (nuit) => set((st) => ({ nuit: st.nuitForcee ?? nuit })),
  forcerNuit: (nuitForcee) => set((st) => ({ nuitForcee, nuit: nuitForcee ?? st.nuit })),
  setAccent: (accent) => set({ accent }),
  setFrame: (frame) => set({ frame }),
  setExclusion: (exclusion) => set({ exclusion }),
  setTier: (tier) => set({ tier }),
  setMode: (mode) => set({ mode }),
  setActive: (active) => set({ active }),
  setStill: (still) => set({ still }),
  setCalme: (calme) => set({ calme }),
  setReduced: (reduced) => set({ reduced }),
  setIsolate: (isolate) => set({ isolate }),
  setSpin: (spin, tilt, dragging) => set({ spin, tilt, dragging }),
  setFps: (fps) => set({ fps }),
  setParams: (p) => set((s) => ({ params: { ...s.params, ...p } })),
  setReady: (ready) => set({ ready }),
  setVitesse: (vitesse) => set({ vitesse }),
  setEtage: (etage) => set({ etage }),
  setDissolve: (dissolve) => set({ dissolve }),
  setInclinaison: (x, y) => set({ inclinaison: { x, y } }),
}))
