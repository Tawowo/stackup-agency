/** Un layout = pour chaque instance, position, rotation (Euler XYZ), échelle, groupe. */
export interface LayoutData {
  pos: Float32Array
  rot: Float32Array
  scale: Float32Array
  group: Float32Array
  /** Profondeur (z local) du mur qui reçoit l'ombre, derrière la forme. */
  mur: number
}

export function allocate(n: number): LayoutData {
  return {
    pos: new Float32Array(n * 3),
    rot: new Float32Array(n * 3),
    scale: new Float32Array(n),
    group: new Float32Array(n),
    mur: -0.3,
  }
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
) {
  d.pos[i * 3] = x
  d.pos[i * 3 + 1] = y
  d.pos[i * 3 + 2] = z
  d.rot[i * 3] = rx
  d.rot[i * 3 + 1] = ry
  d.rot[i * 3 + 2] = rz
  d.scale[i] = s
  d.group[i] = g
}
