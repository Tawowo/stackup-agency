/**
 * LE STACK ENGINE — uniforms partagés par référence entre tous les matériaux.
 * Un seul objet, créé une fois ; le ticker l'écrit, les shaders le lisent.
 */
import { Color, Vector2, Vector3, Vector4 } from 'three'

export const PLAQUES_PAR_PALIER = { ultra: 1200, high: 800, medium: 450, low: 220 } as const

/** Angle de la lumière (−18°), partagé avec `--su-lumiere-angle`. */
export const LUMIERE_ANGLE = (-18 * Math.PI) / 180
/** Longueur des ombres : décalage par unité de profondeur. */
export const LUMIERE_RASANT = 0.55

export function directionLumiere(): Vector3 {
  return new Vector3(
    Math.cos(LUMIERE_ANGLE) * LUMIERE_RASANT,
    Math.sin(LUMIERE_ANGLE) * LUMIERE_RASANT,
    -1,
  ).normalize()
}

export function createStackUniforms() {
  return {
    uTime: { value: 0 },
    uMorph: { value: 0 },
    uScan: { value: 0 },
    uPointer: { value: new Vector3() },
    uPointerActive: { value: 0 },
    uLight: { value: directionLumiere() },
    uNuit: { value: 1 },
    uAccent: { value: new Color('#F69106') },
    uIsolate: { value: -1 },
    /** Isolation : écart latéral des autres (unités locales) et assombrissement (0-1). */
    uIsoPush: { value: 0.35 },
    uIsoDim: { value: 0.65 },
    /** 1 = orthographique : les plaques du logo ne respirent qu'en profondeur. */
    uOrtho: { value: 1 },
    uArc: { value: 0.6 },
    uDelay: { value: 0.25 },
    uEpaisseur: { value: 1 },
    uBreath: { value: 1 },
    /** Boîte verticale de la pile (y min, y max) pour le balayage lumineux. */
    uBox: { value: new Vector2(-1.2, 1.2) },
    uResolution: { value: new Vector2(1, 1) },
    /** Mur récepteur d'ombre : z monde. */
    uWallZ: { value: -1 },
    /** Centre et rayon du halo sur le mur (monde). */
    uStack: { value: new Vector4(0, 0, 1, 1) },
    uAmbient: { value: 0.32 },
    uKey: { value: 0.95 },
    uFresnel: { value: 0.45 },
    uEdge: { value: 0.9 },
    uHalo: { value: 0.16 },
    uShadow: { value: 0.6 },
    uWall: { value: 1 },
    uGrain: { value: 1 },
    /** Rectangle d'exclusion (repère local) : minX, minY, maxX, maxY. */
    uExclu: { value: new Vector4(0, 0, 0, 0) },
    uExcluActive: { value: 0 },
  }
}

export type StackUniforms = ReturnType<typeof createStackUniforms>

let partage: StackUniforms | null = null
/** Le singleton : tout le site partage ces uniforms. */
export function stackUniforms(): StackUniforms {
  if (!partage) partage = createStackUniforms()
  return partage
}
