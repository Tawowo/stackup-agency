/**
 * MÉTIERS VOISINS — écrit src/data/metiers-voisins.ts : pour chaque page métier existante, les métiers du catalogue (150)
 * qui n'ont pas leur propre page et s'y rattachent (PROCHE). La page les nomme : « votre activité est voisine ».
 * Usage : node scripts/seo/voisins.mjs
 */
import fs from 'node:fs'
import path from 'node:path'
import { RACINE, chargerMetiers, PROCHE } from './lib.mjs'

const metiers = chargerMetiers()
const nom = Object.fromEntries(metiers.map((m) => [m.slug, m.nom]))
const voisins = {}
for (const [slug, page] of Object.entries(PROCHE)) {
  if (!nom[slug]) continue
  ;(voisins[page] ??= []).push(nom[slug])
}
for (const k of Object.keys(voisins)) voisins[k].sort((a, b) => a.localeCompare(b, 'fr'))
const ts = `/**
 * Métiers sans page propre rattachés à une page métier (généré par scripts/seo/voisins.mjs — ne pas éditer à la main).
 */
export const METIERS_VOISINS: Record<string, string[]> = ${JSON.stringify(voisins, null, 2)}
`
fs.writeFileSync(path.join(RACINE, 'src/data/metiers-voisins.ts'), ts)
console.log(Object.keys(voisins).length, 'pages métier avec des métiers voisins ;', Object.values(voisins).flat().length, 'métiers rattachés')
