/** Recompresse en place les PNG de captures (palette 256 couleurs) : ×3 plus légers, lisibles. */
import sharp from 'sharp'
import { readdirSync, statSync, renameSync } from 'node:fs'
import { join } from 'node:path'
export async function compresser(fichier) {
  const tmp = `${fichier}.tmp`
  await sharp(fichier).png({ palette: true, colours: 256, compressionLevel: 9, effort: 7 }).toFile(tmp)
  renameSync(tmp, fichier)
}
function* marcher(dir) {
  for (const f of readdirSync(dir)) {
    const p = join(dir, f)
    if (statSync(p).isDirectory()) yield* marcher(p)
    else if (p.endsWith('.png')) yield p
  }
}
if (import.meta.url === `file://${process.argv[1]}`) {
  const racine = process.argv[2] ?? 'docs/qa/shots'
  for (const f of marcher(racine)) await compresser(f)
  console.log('ok')
}
