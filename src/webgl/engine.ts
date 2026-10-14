/**
 * LE STACK ENGINE — uniforms partagés par référence entre tous les matériaux.
 * Un seul objet, créé une fois ; le ticker l'écrit, les shaders le lisent.
 */
import { Color, Vector2, Vector3, Vector4 } from 'three'
import { MORPH } from './morph'

export const PLAQUES_PAR_PALIER = { ultra: 1200, high: 800, medium: 450, low: 220 } as const

/** Angle de la lumière (−18°), partagé avec `--su-lumiere-angle`. */
export const LUMIERE_ANGLE = (-18 * Math.PI) / 180
/** Longueur des ombres : décalage par unité de profondeur. */
export const LUMIERE_RASANT = 0.55

/** La lampe : en haut à gauche, devant ; l'ombre part vers la droite et le bas, sur le sol. */
export function directionLumiere(): Vector3 {
  return new Vector3(0.42, -0.75, -0.6).normalize()
}

export function createStackUniforms() {
  return {
    uTime: { value: 0 },
    uMorph: MORPH,
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
    uHalo: { value: 0.24 },
    uShadow: { value: 0.6 },
    uWall: { value: 1 },
    uGrain: { value: 1 },
    /** Rectangle d'exclusion (repère local) : minX, minY, maxX, maxY. */
    uExclu: { value: new Vector4(0, 0, 0, 0) },
    uExcluActive: { value: 0 },
    /* ── La Fabrique ── */
    /** Torche : impact du pointeur sur le sol (monde) et à la profondeur de la pile. */
    uProbe: { value: new Vector3() },
    uProbeDeep: { value: new Vector3() },
    uProbeRadius: { value: 1.6 },
    uProbeActive: { value: 0 },
    /** Dissolution du sol pendant une traversée (0 = plein, 1 = retiré). */
    uDissolve: { value: 0 },
    /** Hauteur du sol (monde) et centre de la pile (monde x, y, échelle). */
    uSolY: { value: -2 },
    /** Temps cumulé des flux (vitesse pilotée par le scroll). */
    uFlowTime: { value: 0 },
    /** Vitesse de scroll normalisée (0 → 1), pour les flux. */
    uVitesse: { value: 0 },
    /** Étage courant (continu) : pour le défilement du code vivant. */
    uEtage: { value: 0 },
    /** Position de la lampe (monde) et sa couleur-intensité. */
    uLampe: { value: new Vector3(-2, 3, 2) },
    uLampeForce: { value: 1 },
    /** Intensité des flux et opacité du code. */
    uFlux: { value: 0.8 },
    uCode: { value: 0.16 },
    /** Palette des plaques sur fond sombre : 1 = plaques claires (logo blanc + ambre). */
    uClair: { value: 0 },
    /** Liseré ivoire des arêtes sur fond sombre (0 → 1). */
    uRim: { value: 1 },
    /** Mot écrit par les flux : index (ligne de la texture) et intensité. */
    uMot: { value: 0 },
    uForme: { value: 0 },
    /** Où et à quelle taille le mot s'écrit (monde) : x, y, z, demi-largeur. */
    uMotCadre: { value: new Vector4(2, 0, 0.8, 2) },
    /** Mise au point : 0 = sur la pile (code flou), 1 = sur le fond (code net, pendant les traversées). */
    uFocus: { value: 0 },
    /** Onde au clic sur le sol : x, z (monde), instant du clic, intensité. */
    uOnde: { value: new Vector4(0, 0, -100, 0) },
    /** Allumage des couches qui se posent (hero « impression ») : 0 hors du hero. */
    uFlash: { value: 0 },
    /** Centre de la pile à l'écran : x, y (px, origine en bas à gauche), échelle (px par unité locale). */
    uStackEcran: { value: new Vector3(720, 450, 100) },
  }
}

export type StackUniforms = ReturnType<typeof createStackUniforms>

let partage: StackUniforms | null = null
/** Le singleton : tout le site partage ces uniforms. */
export function stackUniforms(): StackUniforms {
  if (!partage) partage = createStackUniforms()
  return partage
}
