import { LOGO_POSES } from '../logo-geometry.ts'
import { allocate, horsChamp, rangee, setInstance, type LayoutData } from './types.ts'

const S = 0.1
const PX = 0.158

/**
 * CADRE — un cadre de plaques autour d'un portrait (rapport 4:5), qui remplit
 * la boîte du logo (1,46 × 2,29). Le logo, réduit, sert de tampon au coin
 * bas-droit. Ordre d'arrivée : le haut, puis les côtés, puis le bas (le
 * cadre se construit comme on monte une baguette d'encadreur).
 */
export function cadre(n: number): LayoutData {
  const d = allocate(n)
  d.mur = -0.5
  const W = 1.3
  const H = 1.62
  const cy = 0.1
  let i = 3
  const nx = Math.round(W / PX)
  i = rangee(d, i, nx, 0, cy + H / 2, 0, PX, S, { g: 0, delay: 0, miroir: true })
  const ny = Math.round(H / (PX * 0.9))
  for (let k = 1; k < ny; k++) {
    const y = cy + H / 2 - (k * H) / ny
    setInstance(d, i++, -W / 2, y, 0, 0, 0, Math.PI / 2, S, 1, 0.15 + (k / ny) * 0.4)
    setInstance(d, i++, W / 2, y, 0, 0, 0, Math.PI / 2, S, 1, 0.15 + (k / ny) * 0.4)
  }
  i = rangee(d, i, nx, 0, cy - H / 2, 0, PX, S, { g: 2, delay: 0.6, miroir: true })
  // Le tampon : le logo à 30 %, au coin bas-droit, devant le cadre.
  LOGO_POSES.forEach((p, j) => {
    setInstance(d, j, W / 2 - 0.05 + p.x * 0.3, cy - H / 2 - 0.08 + p.y * 0.3, 0.06, 0, p.rotY, p.rotZ, 0.3, 3, 0.85)
  })
  for (; i < n; i++) horsChamp(d, i)
  return d
}
