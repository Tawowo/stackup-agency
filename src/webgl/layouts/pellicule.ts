import { allocate, horsChamp, rangee, setInstance, type LayoutData } from './types.ts'

export interface PelliculeOptions {
  /** Décalage horizontal du cadre (glissement entre deux projets). */
  glisse: number
}

const S = 0.1
const PX = 0.158

/**
 * PELLICULE — un cadre 16:9 fait de plaques, derrière la capture du projet.
 * Le changement de projet morphe depuis un cadre décalé (`glisse`) : les
 * plaques glissent, la lumière avec elles.
 */
export function pellicule(n: number, o: PelliculeOptions = { glisse: 0 }): LayoutData {
  const d = allocate(n)
  d.mur = -0.8
  horsChamp(d, 0)
  horsChamp(d, 1)
  const W = 2.5
  const H = 1.4
  const gx = o.glisse
  let i = 3
  const nx = Math.round(W / PX)
  const ny = Math.round(H / (PX * 0.9))
  // Haut et bas.
  i = rangee(d, i, nx, gx, H / 2, 0, PX, S, { g: 0, delay: 0, miroir: true })
  i = rangee(d, i, nx, gx, -H / 2, 0, PX, S, { g: 0, delay: 0.1, miroir: true })
  // Côtés (plaques tournées de 90°).
  for (let k = 1; k < ny; k++) {
    const y = -H / 2 + (k * H) / ny
    if (i + 1 >= n) break
    setInstance(d, i++, gx - W / 2, y, 0, 0, 0, Math.PI / 2, S, 0, 0.2 + k * 0.02)
    setInstance(d, i++, gx + W / 2, y, 0, 0, 0, Math.PI / 2, S, 0, 0.25 + k * 0.02)
  }
  // Perforations : une seconde rangée plus petite au-dessus et au-dessous.
  i = rangee(d, i, nx - 1, gx, H / 2 + 0.16, -0.02, PX, S * 0.5, { g: 1, delay: 0.4 })
  i = rangee(d, i, nx - 1, gx, -H / 2 - 0.16, -0.02, PX, S * 0.5, { g: 1, delay: 0.45 })
  // La plaque ambre : le repère du projet, coin bas-droit.
  setInstance(d, 2, gx + W / 2 + 0.12, -H / 2 - 0.12, 0.04, 0, 0, 0, S * 1.5, 2, 0.6)
  for (; i < n; i++) horsChamp(d, i)
  return d
}
