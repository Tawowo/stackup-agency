import { LOGO_POSES } from '../logo-geometry.ts'
import { allocate, horsChamp, rangee, setInstance, type LayoutData } from './types.ts'

const S = 0.1
const PX = 0.158

/** Une rangée de plaques le long d'un segment (x0, y0) → (x1, y1), tournée selon sa pente. */
function trait(d: LayoutData, i: number, x0: number, y0: number, x1: number, y1: number, g: number, delay: number): number {
  const L = Math.hypot(x1 - x0, y1 - y0)
  const k = Math.max(1, Math.round(L / PX))
  const a = Math.atan2(y1 - y0, x1 - x0)
  for (let j = 0; j < k && i < d.scale.length; j++) {
    const t = (j + 0.5) / k
    setInstance(d, i++, x0 + (x1 - x0) * t, y0 + (y1 - y0) * t, 0.01, 0, j % 2 ? Math.PI : 0, a, S, g, delay + t * 0.2)
  }
  return i
}

/**
 * ENVELOPPE — le final de /contact : la demande envoyée, la pile se plie en
 * enveloppe (bords, rabat en V, plis du bas) et le logo réduit la scelle au
 * centre, comme un cachet. Le paramètre `fuite` l'emporte ensuite au fond.
 */
export function enveloppe(n: number): LayoutData {
  const d = allocate(n)
  d.mur = -0.5
  const W = 1.74
  const H = 1.08
  const cy = 0.05
  const haut = cy + H / 2
  const bas = cy - H / 2
  let i = 3
  const nx = Math.round(W / PX)
  i = rangee(d, i, nx, 0, bas, 0, PX, S, { g: 0, delay: 0, miroir: true })
  const ny = Math.round(H / (PX * 0.9))
  for (let k = 1; k < ny; k++) {
    const y = haut - (k * H) / ny
    setInstance(d, i++, -W / 2, y, 0, 0, 0, Math.PI / 2, S, 0, 0.1 + (1 - k / ny) * 0.2)
    setInstance(d, i++, W / 2, y, 0, 0, 0, Math.PI / 2, S, 0, 0.1 + (1 - k / ny) * 0.2)
  }
  i = rangee(d, i, nx, 0, haut, 0, PX, S, { g: 1, delay: 0.35, miroir: true })
  // Plis du bas, puis le rabat qui se referme (en dernier).
  i = trait(d, i, -W / 2, bas, -0.12, cy + 0.02, 2, 0.4)
  i = trait(d, i, W / 2, bas, 0.12, cy + 0.02, 2, 0.4)
  i = trait(d, i, -W / 2, haut, 0, cy - 0.1, 3, 0.65)
  i = trait(d, i, W / 2, haut, 0, cy - 0.1, 3, 0.65)
  // Le cachet : le logo à 32 %, posé sur la pointe du rabat.
  LOGO_POSES.forEach((p, j) => {
    setInstance(d, j, p.x * 0.32, cy - 0.12 + p.y * 0.32, 0.06, 0, p.rotY, p.rotZ, 0.32, 4, 0.92)
  })
  for (; i < n; i++) horsChamp(d, i)
  return d
}
