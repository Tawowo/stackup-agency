import { allocate, horsChamp, rangee, setInstance, type LayoutData } from './types.ts'

/**
 * OFFRES — quatre formes construites à partir de BLOCS déclaratifs. La même
 * liste sert à la 3D (plaques) et à la maquette HTML (cadres découpés), qui
 * se superposent donc exactement en projection orthographique.
 */
export interface Bloc {
  /** Centre, unités monde. */
  x: number
  y: number
  /** Profondeur (0 = plan de la maquette). */
  z?: number
  /** Rangées de plaques : largeur de chaque rangée (nombre de plaques). */
  rangees: number[]
  /** Échelle des plaques. */
  s: number
  g: number
  delay: number
  /** La plaque ambre (index 2) occupe seule ce bloc. */
  ambre?: boolean
  /** Rôle, pour la maquette HTML. */
  role: 'entete' | 'titre' | 'image' | 'texte' | 'bouton' | 'produit' | 'prix' | 'panier' | 'module' | 'hub'
}

export const S = 0.1
export const PX = 0.158
export const LIGNE = 0.62 // interligne, en multiples de s

/** Boîte englobante d'un bloc (unités monde). */
export function boiteBloc(b: Bloc): { x: number; y: number; w: number; h: number } {
  const pas = PX * (b.s / S)
  const cols = Math.max(...b.rangees)
  const w = cols * pas
  const h = b.rangees.length * (b.s * LIGNE) + b.s * 0.5
  return { x: b.x - w / 2, y: b.y + h / 2, w, h }
}

function page(cx: number, cy: number, echelle: number, delay: number, ambre: boolean, z = 0): Bloc[] {
  const s = S * echelle
  const g = (dx: number) => cx + dx * echelle
  const h = (dy: number) => cy + dy * echelle
  const col = (x: number, d: number): Bloc => ({ x: g(x), y: h(0.08), z, rangees: [4, 4, 4, 3], s, g: 2, delay: delay + d, role: 'texte' })
  return [
    { x: cx, y: h(0.95), z, rangees: [9], s, g: 0, delay, role: 'entete' },
    { x: g(-0.3), y: h(0.56), z, rangees: [5, 4], s: s * 1.25, g: 1, delay: delay + 0.08, role: 'titre' },
    { x: g(0.38), y: h(0.56), z, rangees: [3, 3], s, g: 1, delay: delay + 0.12, role: 'image' },
    col(-0.38, 0.16),
    col(0.3, 0.2),
    { x: g(-0.42), y: h(-0.62), z, rangees: [1], s: s * 1.6, g: 3, delay: delay + 0.3, role: 'bouton', ambre },
  ]
}

/** MULTI en portrait : trois pages empilées verticalement (la principale au
 *  milieu, deux plus petites en retrait au-dessus et au-dessous), rien ne
 *  dépasse la boîte 1,46 × 2,29. */
const MULTI_PORTRAIT: Bloc[] = [
  ...page(-0.12, 0.72, 0.4, 0.2, false, -0.3),
  ...page(0, 0, 0.62, 0, true),
  ...page(0.12, -0.74, 0.4, 0.4, false, -0.3),
]

export const BLOCS: Record<'page' | 'multi' | 'boutique' | 'logiciel', Bloc[]> = {
  page: page(0, 0, 1, 0, true),
  multi: [...page(-0.86, -0.14, 0.54, 0.2, false), ...page(0, 0.05, 0.8, 0, true), ...page(0.86, -0.14, 0.54, 0.4, false)],
  boutique: (() => {
    const b: Bloc[] = [{ x: -0.08, y: 1.0, rangees: [8], s: S, g: 0, delay: 0, role: 'entete' }]
    let k = 0
    for (let r = 0; r < 3; r++)
      for (let c = 0; c < 4; c++) {
        const cx = (c - 1.5) * 0.42
        const cy = 0.5 - r * 0.52
        b.push({ x: cx, y: cy + 0.06, rangees: [2, 2], s: S * 1.15, g: 1, delay: 0.1 + k * 0.05, role: 'produit' })
        b.push({ x: cx, y: cy - 0.19, rangees: [2], s: S * 0.7, g: 2, delay: 0.13 + k * 0.05, role: 'prix' })
        k++
      }
    b.push({ x: 0.74, y: 1.0, rangees: [1], s: S * 1.7, g: 3, delay: 0.75, role: 'panier', ambre: true })
    return b
  })(),
  logiciel: (() => {
    const b: Bloc[] = []
    for (let m = 0; m < 8; m++) {
      const a = (m / 8) * Math.PI * 2 + Math.PI / 8
      b.push({ x: Math.cos(a) * 0.92, y: Math.sin(a) * 0.72, rangees: [3, 3, 3], s: S * 0.9, g: m + 1, delay: 0.15 + m * 0.06, role: 'module' })
    }
    b.push({ x: 0, y: 0, rangees: [1], s: S * 2.2, g: 9, delay: 0.5, role: 'hub', ambre: true })
    return b
  })(),
}

/** Blocs d'une maquette, selon l'orientation. */
export function blocsDe(nom: keyof typeof BLOCS, portrait: boolean): Bloc[] {
  return nom === 'multi' && portrait ? MULTI_PORTRAIT : BLOCS[nom]
}

function poserBloc(d: LayoutData, i: number, b: Bloc): number {
  const pas = PX * (b.s / S)
  const z = b.z ?? 0
  if (b.ambre) {
    setInstance(d, 2, b.x, b.y, z + 0.03, 0, 0, 0, b.s, b.g, b.delay)
    return i
  }
  const boite = boiteBloc(b)
  let k = i
  b.rangees.forEach((n, r) => {
    const y = boite.y - b.s * 0.25 - r * (b.s * LIGNE) - b.s * 0.25
    const cx = boite.x + (n * pas) / 2
    k = rangee(d, k, n, cx, y, z, pas, b.s, { g: b.g, delay: b.delay + r * 0.02, miroir: b.role === 'entete' })
  })
  return k
}

function depuisBlocs(n: number, blocs: Bloc[], mur: number): LayoutData {
  const d = allocate(n)
  d.mur = mur
  horsChamp(d, 0)
  horsChamp(d, 1)
  let i = 3
  for (const b of blocs) i = poserBloc(d, i, b)
  return finir(d, i, n)
}
function finir(d: LayoutData, i: number, n: number): LayoutData {
  for (; i < n; i++) horsChamp(d, i)
  return d
}

export function pageLayout(n: number): LayoutData {
  return depuisBlocs(n, BLOCS.page, -0.7)
}
export function multi(n: number, portrait = false): LayoutData {
  return depuisBlocs(n, blocsDe('multi', portrait), -0.9)
}
export function boutique(n: number): LayoutData {
  return depuisBlocs(n, BLOCS.boutique, -0.7)
}
/** OFFRE « outil sur mesure » : réseau de 8 modules reliés par des chapelets, un hub ambre. */
export function logiciel(n: number): LayoutData {
  const d = allocate(n)
  d.mur = -0.9
  horsChamp(d, 0)
  horsChamp(d, 1)
  let i = 3
  for (const b of BLOCS.logiciel) i = poserBloc(d, i, b)
  const modules = BLOCS.logiciel.filter((b) => b.role === 'module')
  const arete = (ax: number, ay: number, bx: number, by: number, delay: number) => {
    const L = Math.hypot(bx - ax, by - ay)
    const nb = Math.max(2, Math.round(L / 0.09) - 2)
    const ang = Math.atan2(by - ay, bx - ax)
    for (let t = 1; t <= nb; t++) {
      if (i >= n) return
      const f = t / (nb + 1)
      setInstance(d, i, ax + (bx - ax) * f, ay + (by - ay) * f, -0.04, 0, 0, ang, S * 0.42, 0, delay + f * 0.1)
      i++
    }
  }
  modules.forEach((m, k) => {
    const suivant = modules[(k + 1) % modules.length]!
    arete(m.x, m.y, suivant.x, suivant.y, 0.6 + k * 0.03)
    arete(m.x, m.y, 0, 0, 0.7 + k * 0.03)
  })
  return finir(d, i, n)
}
