/** Un layout = pour chaque instance, position, rotation (Euler XYZ), échelle, groupe, retard. */
export interface LayoutData {
  pos: Float32Array
  rot: Float32Array
  scale: Float32Array
  group: Float32Array
  /** Ordre d'arrivée (0 → 1) : multiplié par uDelay dans le shader. */
  delay: Float32Array
  /** Profondeur (z local) du mur qui reçoit l'ombre, derrière la forme. */
  mur: number
}

export function allocate(n: number): LayoutData {
  const d = {
    pos: new Float32Array(n * 3),
    rot: new Float32Array(n * 3),
    scale: new Float32Array(n),
    group: new Float32Array(n),
    delay: new Float32Array(n),
    mur: -0.3,
  }
  for (let i = 0; i < n; i++) d.delay[i] = seed(i, 11)
  return d
}

/** Pseudo-aléa déterministe tiré du rang : deux rendus = deux formes identiques. */
export function seed(i: number, salt = 0): number {
  let x = (i + 1) * 374761393 + salt * 668265263
  x = (x ^ (x >>> 13)) * 1274126177
  x = x ^ (x >>> 16)
  return (x >>> 0) / 4294967296
}

export function setInstance(
  d: LayoutData,
  i: number,
  x: number,
  y: number,
  z: number,
  rx: number,
  ry: number,
  rz: number,
  s: number,
  g = 0,
  delay?: number,
) {
  d.pos[i * 3] = x
  d.pos[i * 3 + 1] = y
  d.pos[i * 3 + 2] = z
  d.rot[i * 3] = rx
  d.rot[i * 3 + 1] = ry
  d.rot[i * 3 + 2] = rz
  d.scale[i] = s
  d.group[i] = g
  if (delay !== undefined) d.delay[i] = delay
}

/** Instance dissoute hors champ, derrière, dispersée (elle arrivera de l'arrière-plan). */
export function horsChamp(d: LayoutData, i: number) {
  const a = seed(i) * Math.PI * 2
  const r = 1.5 + seed(i, 1) * 3
  setInstance(d, i, Math.cos(a) * r, Math.sin(a) * r * 0.6 + 1.5, -4 - seed(i, 2) * 4, 0, a, 0, 0, 0)
}

/** Une rangée de plaques le long de x, centrée en (cx, y, z). */
export function rangee(
  d: LayoutData,
  start: number,
  n: number,
  cx: number,
  y: number,
  z: number,
  pas: number,
  s: number,
  o: { rx?: number; ry?: number; rz?: number; g?: number; delay?: number; miroir?: boolean } = {},
): number {
  const x0 = cx - ((n - 1) * pas) / 2
  for (let k = 0; k < n; k++) {
    const i = start + k
    if (i >= d.scale.length) return i
    const ry = (o.ry ?? 0) + (o.miroir && k % 2 ? Math.PI : 0)
    setInstance(d, i, x0 + k * pas, y, z, o.rx ?? 0, ry, o.rz ?? 0, s, o.g ?? 0, o.delay)
  }
  return start + n
}
