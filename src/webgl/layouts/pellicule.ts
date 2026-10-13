import { allocate, horsChamp, rangee, setInstance, type LayoutData } from './types.ts'

export interface PelliculeOptions {
  /** Index continu du projet affiché (0 → n−1) : 1,5 = à mi-chemin entre le 2e et le 3e. */
  glisse: number
  /** Largeur d'un écran en unités locales : les cadres sont espacés d'un écran. */
  largeur: number
  /** Portrait : cadre plus petit (0,7), qui ne traverse pas le texte sous la capture. */
  portrait?: boolean
}

const S = 0.1
const PX = 0.158

/** Un cadre 16:9 de plaques (haut, bas, côtés, perforations) centré en gx. */
function cadre(d: LayoutData, i: number, n: number, gx: number, parite: number, e: number): number {
  const W = 2.5 * e
  const H = 1.4 * e
  const px = PX * e
  const sc = S * e
  const nx = Math.round(W / px)
  const ny = Math.round(H / (px * 0.9))
  i = rangee(d, i, nx, gx, H / 2, 0, px, sc, { g: parite, delay: 0, miroir: true })
  i = rangee(d, i, nx, gx, -H / 2, 0, px, sc, { g: parite, delay: 0.1, miroir: true })
  for (let k = 1; k < ny; k++) {
    const y = -H / 2 + (k * H) / ny
    if (i + 1 >= n) break
    setInstance(d, i++, gx - W / 2, y, 0, 0, 0, Math.PI / 2, sc, parite, 0.2 + k * 0.02)
    setInstance(d, i++, gx + W / 2, y, 0, 0, 0, Math.PI / 2, sc, parite, 0.25 + k * 0.02)
  }
  i = rangee(d, i, nx - 1, gx, H / 2 + 0.16 * e, -0.02, px, sc * 0.5, { g: parite, delay: 0.4 })
  i = rangee(d, i, nx - 1, gx, -H / 2 - 0.16 * e, -0.02, px, sc * 0.5, { g: parite, delay: 0.45 })
  return i
}

/**
 * PELLICULE — une bande de cadres de plaques, un par projet, espacés d'un
 * écran, qui glisse avec la piste HTML : `glisse` est l'index continu. Deux
 * cadres sont posés (celui d'avant et celui d'après la position courante),
 * dans deux lots d'instances alternés par parité : un cadre ne change de
 * place que lorsqu'il est à un écran du centre, hors du champ.
 */
export function pellicule(n: number, o: PelliculeOptions = { glisse: 0, largeur: 6 }): LayoutData {
  const d = allocate(n)
  d.mur = -0.8
  horsChamp(d, 0)
  horsChamp(d, 1)
  const e = o.portrait ? 0.6 : 1
  const f = o.glisse
  const k0 = Math.floor(f)
  const cadres = [k0, k0 + 1]
  const moitie = Math.floor((n - 3) / 2)
  for (const k of cadres) {
    const parite = ((k % 2) + 2) % 2
    const debut = 3 + parite * moitie
    const fin = debut + moitie
    const gx = (k - f) * o.largeur
    const i = cadre(d, debut, fin, gx, parite, e)
    for (let j = i; j < fin; j++) horsChamp(d, j)
  }
  // La plaque ambre : le repère du projet le plus proche, coin bas-droit.
  const proche = Math.round(f)
  setInstance(d, 2, (proche - f) * o.largeur + (1.25 + 0.12) * e, -(0.7 + 0.12) * e, 0.04, 0, 0, 0, S * 1.5 * e, 2, 0.6)
  for (let i = 3 + 2 * moitie; i < n; i++) horsChamp(d, i)
  return d
}
