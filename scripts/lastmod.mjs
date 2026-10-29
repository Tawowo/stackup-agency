/**
 * DATES DE MISE À JOUR RÉELLES (lastmod du sitemap) — pour chaque famille de pages (src/config/lastmod-regles.json),
 * la date du dernier commit qui a touché les fichiers qui font son contenu. Les articles de blog gardent leur propre
 * date (`updated` ou `date`). Écrit src/config/lastmod.generated.ts. À relancer avant de commiter : `npm run lastmod`.
 */
import { execSync } from 'node:child_process'
import { readFileSync, writeFileSync, existsSync } from 'node:fs'

const regles = JSON.parse(readFileSync('src/config/lastmod-regles.json', 'utf8'))
const dates = {}
for (const r of regles) {
  const chemins = r.chemins.filter((c) => existsSync(c))
  // Fichiers modifiés non commités : on prend la date du jour pour ne jamais mentir par défaut.
  const sale = execSync(`git status --porcelain -- ${chemins.map((c) => `"${c}"`).join(' ')}`, { encoding: 'utf8' }).trim()
  const d = execSync(`git log -1 --format=%cs -- ${chemins.map((c) => `"${c}"`).join(' ')}`, { encoding: 'utf8' }).trim()
  dates[r.cle] = sale ? new Date().toISOString().slice(0, 10) : d || new Date().toISOString().slice(0, 10)
}
writeFileSync('src/config/lastmod.generated.ts', `// FICHIER GÉNÉRÉ par scripts/lastmod.mjs (npm run lastmod). Ne pas modifier.\n\nexport const LASTMOD: Record<string, string> = ${JSON.stringify(dates, null, 2)}\n`)
console.log(dates)
