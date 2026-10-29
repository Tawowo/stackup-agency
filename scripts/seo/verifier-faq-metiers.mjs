/**
 * Vérifie un lot de FAQ métiers (src/data/enrichissements/metiers-faq-<N>.ts) : 7 questions par métier, longueurs, interdits, doublons.
 * Usage : node scripts/seo/verifier-faq-metiers.mjs <N> [<N> …]   |   --tous
 */
import fs from 'node:fs'
import path from 'node:path'

const racine = path.resolve(import.meta.dirname, '../..')
const dossier = path.join(racine, 'src/data/enrichissements')
const valides = new Set(JSON.parse(fs.readFileSync(path.join(import.meta.dirname, 'lexique/metiers-pages.json'), 'utf8')))
const args = process.argv.slice(2)
const lots = args.includes('--tous') ? fs.readdirSync(dossier).filter((f) => /^metiers-faq-\d+\.ts$/.test(f)).map((f) => f.match(/\d+/)[0]) : args
const INTERDITS = [
  [/\d[\d\s  .,]*\s?(€|euros?)\b/i, 'montant en chiffres'],
  [/\b(?:livr[ée]e?s?|livraison|délai)\b[^.\n]{0,40}\b\d+\s*(?:jours?|semaines?|mois)\b/i, 'délai chiffré'],
  [/fois moins cher/i, '× moins cher'],
  [/hébergé?e?s? en (France|Europe)|hébergement en (France|Europe)/i, 'hébergement France/Europe'],
  [/\bValéry\b|depuis 2018/i, 'mention interdite'],
  [/\]\(|\*\*/, 'Markdown'],
]
let erreurs = 0
const phrases = new Map()
for (const n of lots) {
  const f = path.join(dossier, `metiers-faq-${n}.ts`)
  if (!fs.existsSync(f)) { console.log('✗ lot', n, 'introuvable'); erreurs++; continue }
  const src = fs.readFileSync(f, 'utf8')
  const blocs = [...src.matchAll(/^\s{2}'([a-z0-9-]+)': \[([\s\S]*?)^\s{2}\],?/gm)]
  for (const [, slug, corps] of blocs) {
    const pb = []
    if (!valides.has(slug)) pb.push('slug inconnu')
    const qs = [...corps.matchAll(/q: `([^`]*)`,\s*a: `([^`]*)`/g)]
    if (qs.length !== 7) pb.push(`${qs.length} questions (≠ 7)`)
    for (const [, q, a] of qs) {
      const mq = q.split(/\s+/).length
      const ma = a.split(/\s+/).length
      if (mq < 5 || mq > 18) pb.push(`question de ${mq} mots`)
      if (ma < 55 || ma > 120) pb.push(`réponse de ${ma} mots`)
      for (const [re, msg] of INTERDITS) if (re.test(q + ' ' + a)) pb.push(msg)
      for (const ph of a.split(/(?<=[.!?])\s+/).filter((x) => x.length > 60)) {
        if (phrases.has(ph) && phrases.get(ph) !== slug) pb.push(`phrase déjà dans ${phrases.get(ph)}`)
        phrases.set(ph, slug)
      }
    }
    console.log(pb.length ? '✗' : '✓', slug, pb.join(' · '))
    erreurs += pb.length
  }
  if (!blocs.length) { console.log('✗ lot', n, 'aucun bloc reconnu'); erreurs++ }
}
process.exit(erreurs ? 1 : 0)
