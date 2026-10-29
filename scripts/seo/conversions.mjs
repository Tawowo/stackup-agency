/**
 * RAPPORT DE CONVERSIONS PAR PAGE D'ENTRÉE — lit des lignes de journal du serveur contenant {"mesure":…} (export Vercel, `vercel logs`, fichier texte).
 * Compte, pour chaque page d'entrée de session, les vues et les conversions (contact_envoye, clic_telephone, clic_email, clic_demo, clic_appel, estimation_lancee, telechargement).
 * Sortie : tableau console + seo/conversions.csv.
 * Usage : node scripts/seo/conversions.mjs journal.log [autre.log …]
 */
import fs from 'node:fs'
import path from 'node:path'
import { RACINE, csv } from './lib.mjs'

const fichiers = process.argv.slice(2).filter((a) => !a.startsWith('-'))
if (!fichiers.length) {
  console.error('Usage : node scripts/seo/conversions.mjs journal.log [...]')
  process.exit(2)
}
const CONVERSIONS = ['contact_envoye', 'clic_telephone', 'clic_email', 'clic_demo', 'clic_appel', 'estimation_lancee', 'telechargement']
const parEntree = new Map()
const ligne = (cle) => (parEntree.has(cle) || parEntree.set(cle, { entree: cle, vues: 0, ...Object.fromEntries(CONVERSIONS.map((c) => [c, 0])) }), parEntree.get(cle))
let n = 0
for (const f of fichiers) {
  for (const l of fs.readFileSync(f, 'utf8').split('\n')) {
    const m = l.match(/\{"mesure":.*\}/)
    if (!m) continue
    let o
    try { o = JSON.parse(m[0]) } catch { continue }
    n++
    const r = ligne(o.entree || o.page || '(inconnue)')
    if (o.mesure === 'vue') r.vues++
    else if (CONVERSIONS.includes(o.mesure)) r[o.mesure]++
  }
}
const lignes = [...parEntree.values()]
  .map((r) => ({ ...r, conversions: CONVERSIONS.reduce((s, c) => s + r[c], 0) }))
  .sort((a, b) => b.conversions - a.conversions || b.vues - a.vues)
fs.writeFileSync(path.join(RACINE, 'seo/conversions.csv'), csv(lignes, ['entree', 'vues', 'conversions', ...CONVERSIONS]))
console.log(`${n} événements · ${lignes.length} pages d'entrée → seo/conversions.csv`)
for (const r of lignes.slice(0, 15)) console.log(String(r.conversions).padStart(4), String(r.vues).padStart(6), r.entree)
