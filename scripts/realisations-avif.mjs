/**
 * CAPTURES DES DÉMOS → AVIF ≤ 120 ko dans public/realisations/<slug>/.
 * Les URL de démo sont injoignables depuis ce conteneur (réseau sortant
 * filtré) : on part des captures existantes de l'ancien site, et on le note.
 */
import sharp from 'sharp'
import { mkdirSync, statSync } from 'node:fs'

const PROJETS = ['demo-videaste', 'chateau-lumieres', 'maison-elise', 'au-pain-dore', 'prestige-immo', 'lolivier-dashboard', 'chateau-fleury']
for (const slug of PROJETS) {
  const src = `public/images/realisations/${slug}.webp`
  const dir = `public/realisations/${slug}`
  mkdirSync(dir, { recursive: true })
  let q = 62
  let taille = Infinity
  while (q >= 30) {
    await sharp(src).resize({ width: 1440, withoutEnlargement: true }).avif({ quality: q, effort: 6 }).toFile(`${dir}/desktop.avif`)
    taille = statSync(`${dir}/desktop.avif`).size
    if (taille <= 120 * 1024) break
    q -= 8
  }
  const meta = await sharp(src).metadata()
  console.log(slug, `${meta.width}×${meta.height}`, `→ ${(taille / 1024).toFixed(0)} ko (q${q})`)
}
