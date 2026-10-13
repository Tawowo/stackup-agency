import { BufferGeometry, Float32BufferAttribute } from 'three'
import { PLAQUE } from './logo-geometry'

/**
 * LA PLAQUE — un parallélogramme à extrémités verticales, extrudé.
 * Faces planes (normales par face) : les arêtes doivent rester nettes.
 * Le repère local : x le long de la plaque, y vers le haut, z vers le
 * spectateur. L'épaisseur réelle est appliquée par `uEpaisseur` au rendu.
 */
export function plaqueGeometry(): BufferGeometry {
  const W = PLAQUE.largeur / 2
  const H = PLAQUE.hauteur / 2
  const k = Math.tan(PLAQUE.pente)
  const T = PLAQUE.epaisseur / 2
  // Quatre coins (sens trigonométrique) : bas-gauche, bas-droit, haut-droit, haut-gauche.
  const c = [
    [-W, -k * W - H],
    [W, k * W - H],
    [W, k * W + H],
    [-W, -k * W + H],
  ]
  const pos: number[] = []
  const nor: number[] = []
  const uv: number[] = []
  const idx: number[] = []
  const quad = (a: number[], b: number[], cc: number[], d: number[], n: number[]) => {
    const start = pos.length / 3
    for (const p of [a, b, cc, d]) {
      pos.push(p[0]!, p[1]!, p[2]!)
      nor.push(n[0]!, n[1]!, n[2]!)
    }
    uv.push(0, 0, 1, 0, 1, 1, 0, 1)
    idx.push(start, start + 1, start + 2, start, start + 2, start + 3)
  }
  const f = (i: number, z: number) => [c[i]![0]!, c[i]![1]!, z]
  // Avant (+z) et arrière (−z)
  quad(f(0, T), f(1, T), f(2, T), f(3, T), [0, 0, 1])
  quad(f(1, -T), f(0, -T), f(3, -T), f(2, -T), [0, 0, -1])
  // Extrémités (verticales)
  quad(f(1, T), f(1, -T), f(2, -T), f(2, T), [1, 0, 0])
  quad(f(0, -T), f(0, T), f(3, T), f(3, -T), [-1, 0, 0])
  // Arêtes longues : normale perpendiculaire à la pente
  const len = Math.hypot(k, 1)
  quad(f(3, T), f(2, T), f(2, -T), f(3, -T), [-k / len, 1 / len, 0])
  quad(f(0, -T), f(1, -T), f(1, T), f(0, T), [k / len, -1 / len, 0])

  const g = new BufferGeometry()
  g.setAttribute('position', new Float32BufferAttribute(pos, 3))
  g.setAttribute('normal', new Float32BufferAttribute(nor, 3))
  g.setAttribute('uv', new Float32BufferAttribute(uv, 2))
  g.setIndex(idx)
  return g
}
