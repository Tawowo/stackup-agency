/**
 * Vérifie un lot de sections métier (src/data/enrichissements/metiers-prio-<N>.ts) : 5 sections par métier, longueur, interdits, doublons de phrases.
 * Usage : node scripts/seo/verifier-metiers-prio.mjs <N> […]   |   --tous
 */
import fs from 'node:fs'
import path from 'node:path'
const racine = path.resolve(import.meta.dirname, '../..')
const dossier = path.join(racine, 'src/data/enrichissements')
const valides = new Set(JSON.parse(fs.readFileSync(path.join(import.meta.dirname, 'lexique/metiers-prioritaires.json'), 'utf8')))
const args = process.argv.slice(2)
const lots = args.includes('--tous') ? fs.readdirSync(dossier).filter((f) => /^metiers-prio-\d+\.ts$/.test(f)).map((f) => f.match(/\d+/)[0]) : args
const INTERDITS = [
  [/\d[\d\s  .,]*\s?(€|euros?)\b/i, 'montant en chiffres'],
  [/\b(?:livr[ée]e?s?|livraison|délai)\b[^.\n]{0,40}\b\d+\s*(?:jours?|semaines?|mois)\b/i, 'délai chiffré'],
  [/fois moins cher/i, '× moins cher'],
  [/hébergé?e?s? en (France|Europe)|hébergement en (France|Europe)/i, 'hébergement France/Europe'],
  [/\bValéry\b|depuis 2018/i, 'mention interdite'],
  [/\[(ville|métier|nom|secteur)\]|TODO|Lorem/i, 'placeholder'],
  [/\*\*/, 'gras Markdown'],
]
let erreurs = 0
const phrases = new Map()
for (const n of lots) {
  const f = path.join(dossier, `metiers-prio-${n}.ts`)
  if (!fs.existsSync(f)) { console.log('✗ lot', n, 'introuvable'); erreurs++; continue }
  const src = fs.readFileSync(f, 'utf8')
  const blocs = [...src.matchAll(/^\s{2}'([a-z0-9-]+)': \[([\s\S]*?)^\s{2}\],?/gm)]
  if (!blocs.length) { console.log('✗ lot', n, 'aucun bloc reconnu'); erreurs++ }
  for (const [, slug, corps] of blocs) {
    const pb = []
    if (!valides.has(slug)) pb.push('slug hors liste')
    const sections = [...corps.matchAll(/titre: `([^`]*)`,\s*paragraphes: \[([\s\S]*?)\]\s*,?\s*\}/g)]
    if (sections.length !== 5) pb.push(`${sections.length} sections (≠ 5)`)
    let mots = 0
    for (const [, titre, ps] of sections) {
      const paras = [...ps.matchAll(/`([^`]*)`/g)].map((m) => m[1])
      if (paras.length < 2 || paras.length > 4) pb.push(`« ${titre.slice(0, 30)} » : ${paras.length} paragraphes`)
      for (const p of paras) {
        mots += p.split(/\s+/).length
        for (const [re, msg] of INTERDITS) if (re.test(p.replace(/\{\{[^}]+\}\}/g, ''))) pb.push(msg)
        for (const ph of p.split(/(?<=[.!?])\s+/).filter((x) => x.length > 60)) { if (phrases.has(ph) && phrases.get(ph) !== slug) pb.push(`phrase reprise de ${phrases.get(ph)}`); phrases.set(ph, slug) }
      }
    }
    if (mots < 650) pb.push(`${mots} mots (< 650)`)
    if (mots > 1400) pb.push(`${mots} mots (> 1400)`)
    console.log(pb.length ? '✗' : '✓', slug, mots + ' mots', [...new Set(pb)].join(' · '))
    erreurs += pb.length
  }
}
process.exit(erreurs ? 1 : 0)
