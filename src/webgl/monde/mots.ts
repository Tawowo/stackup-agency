/**
 * LES MOTS DES FLUX — à l'entrée de chaque moment, les particules quittent
 * brièvement leurs chemins pour écrire un mot, puis reprennent leur flux.
 * Index = ligne de la texture des formes. Le premier (0) est vide.
 */
export const MOTS = ['', 'COUCHES', 'OFFRES', 'DÉMOS', 'PAS QUE', 'MODULES', 'À PARTIR DE', 'MÉTHODE', 'ATELIER', 'À VOUS'] as const

/** Le mot de chaque moment de l'accueil (data-moment → index dans MOTS). */
export const MOT_DU_MOMENT: Record<string, number> = { '01': 1, '02': 2, '03': 3, '04': 4, '05': 5, '06': 6, '07': 7, '08': 8, '09': 9 }

/** Échantillonne `n` points dans le texte, rendu sur un canvas : coordonnées dans [-1, 1] × [-r, r]. */
export function pointsDuMot(mot: string, n: number): Float32Array {
  const out = new Float32Array(n * 2)
  if (!mot || typeof document === 'undefined') return out
  const W = 512
  const H = 96
  const c = document.createElement('canvas')
  c.width = W
  c.height = H
  const ctx = c.getContext('2d')
  if (!ctx) return out
  ctx.fillStyle = '#fff'
  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'
  let taille = 84
  ctx.font = `700 ${taille}px Poppins, system-ui, sans-serif`
  while (ctx.measureText(mot).width > W * 0.94 && taille > 20) {
    taille -= 4
    ctx.font = `700 ${taille}px Poppins, system-ui, sans-serif`
  }
  ctx.fillText(mot, W / 2, H / 2 + 4)
  const data = ctx.getImageData(0, 0, W, H).data
  const pleins: number[] = []
  for (let y = 0; y < H; y += 2) for (let x = 0; x < W; x += 2) if (data[(y * W + x) * 4 + 3]! > 128) pleins.push(x, y)
  const k = pleins.length / 2
  if (!k) return out
  for (let i = 0; i < n; i++) {
    // Répartition régulière dans les pixels pleins (déterministe).
    const j = Math.floor(((i * 0.6180339887) % 1) * k)
    out[i * 2] = (pleins[j * 2]! / W) * 2 - 1
    out[i * 2 + 1] = -((pleins[j * 2 + 1]! / H) * 2 - 1) * (H / W)
  }
  return out
}
