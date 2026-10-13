/**
 * ÉTAT DE LA SCÈNE — lu par le ticker, écrit par les pages.
 *
 * Aucun composant ne s'abonne à ce store pour re-rendre la 3D : le moteur lit
 * `useScene.getState()` une fois par trame. Les pages déclarent ce qu'elles
 * veulent (layout cible, nuit, accent, boîte d'ancrage) ; le moteur fait.
 */
import { create } from 'zustand'
import type { LayoutName } from './layouts'

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
}

export interface SceneParams extends PileParams {
  epaisseur: number
  arc: number
  retard: number
  /** 1 = orthographique, 0 = perspective. */
  projection: number
  ambiant: number
  cle: number
  fresnel: number
  arete: number
  halo: number
  ombre: number
  mur: number
  grain: number
  plaques: number
}

export const PARAMS_DEFAUT: SceneParams = {
  epaisseur: 1,
  arc: 0.6,
  retard: 0.25,
  projection: 1,
  parNiveau: 3,
  ecart: 0.14,
  torsion: 0.12,
  rayon: 0.42,
  chantier: 0.12,
  echelle: 0.5,
  hauteur: 3.4,
  ambiant: 0.32,
  cle: 0.95,
  fresnel: 0.3,
  arete: 0.9,
  halo: 0.16,
  ombre: 0.6,
  mur: 1,
  grain: 1,
  plaques: 1,
}

interface SceneState {
  layout: LayoutName
  morph: number
  nuit: number
  accent: string
  frame: Frame | null
  tier: Tier
  mode: '3d' | '2d'
  active: boolean
  still: boolean
  reduced: boolean
  isolate: number
  spin: number
  tilt: number
  dragging: boolean
  fps: number
  params: SceneParams
  ready: boolean
  setLayout: (l: LayoutName) => void
  setMorph: (m: number) => void
  setNuit: (n: number) => void
  setAccent: (a: string) => void
  setFrame: (f: Frame | null) => void
  setTier: (t: Tier) => void
  setMode: (m: '3d' | '2d') => void
  setActive: (a: boolean) => void
  setStill: (s: boolean) => void
  setReduced: (r: boolean) => void
  setIsolate: (i: number) => void
  setSpin: (spin: number, tilt: number, dragging: boolean) => void
  setFps: (f: number) => void
  setParams: (p: Partial<SceneParams>) => void
  setReady: (r: boolean) => void
}

export const useScene = create<SceneState>((set) => ({
  layout: 'logo',
  morph: 0,
  nuit: 1,
  accent: '#F69106',
  frame: null,
  tier: 'high',
  mode: '3d',
  active: true,
  still: false,
  reduced: false,
  isolate: -1,
  spin: 0,
  tilt: 0,
  dragging: false,
  fps: 0,
  params: PARAMS_DEFAUT,
  ready: false,
  setLayout: (layout) => set({ layout }),
  setMorph: (morph) => set({ morph }),
  setNuit: (nuit) => set({ nuit }),
  setAccent: (accent) => set({ accent }),
  setFrame: (frame) => set({ frame }),
  setTier: (tier) => set({ tier }),
  setMode: (mode) => set({ mode }),
  setActive: (active) => set({ active }),
  setStill: (still) => set({ still }),
  setReduced: (reduced) => set({ reduced }),
  setIsolate: (isolate) => set({ isolate }),
  setSpin: (spin, tilt, dragging) => set({ spin, tilt, dragging }),
  setFps: (fps) => set({ fps }),
  setParams: (p) => set((s) => ({ params: { ...s.params, ...p } })),
  setReady: (ready) => set({ ready }),
}))
