/** Vérifie un lot de contenus solutions (src/data/solutions-contenu-<N>.ts) : 6 sections, 3 FAQ, longueur, interdits, doublons de phrases. */
import fs from 'node:fs'
import path from 'node:path'
const racine = path.resolve(import.meta.dirname, '../..')
const dossier = path.join(racine, 'src/data')
const SLUGS = new Set(['prise-rendez-vous-en-ligne', 'gestion-devis-factures', 'click-and-collect', 'reservation-restaurant', 'programme-fidelite', 'caisse-enregistreuse', 'gestion-stocks', 'crm-sur-mesure', 'portail-client', 'planning-employes', 'menu-qr-code', 'tableau-de-bord', 'reservation-location'])
const args = process.argv.slice(2)
const lots = args.includes('--tous') ? ['1', '2', '3'] : args
const INTERDITS = [
  [/\d[\d\s  .,]*\s?(€|euros?)\b/i, 'montant en chiffres'],
  [/\b(?:livr[ée]e?s?|livraison|délai)\b[^.\n]{0,40}\b\d+\s*(?:jours?|semaines?|mois)\b/i, 'délai chiffré'],
  [/fois moins cher/i, '× moins cher'],
  [/hébergé?e?s? en (France|Europe)|hébergement en (France|Europe)/i, 'hébergement France/Europe'],
  [/\bValéry\b|depuis 2018/i, 'mention interdite'],
  [/\[(ville|métier|nom|secteur)\]|TODO|Lorem/i, 'placeholder'],
]
let erreurs = 0
const phrases = new Map()
for (const n of lots) {
  const f = path.join(dossier, `solutions-contenu-${n}.ts`)
  const src = fs.existsSync(f) ? fs.readFileSync(f, 'utf8') : ''
  const blocs = [...src.matchAll(/^\s{2}'([a-z0-9-]+)': \{([\s\S]*?)^\s{2}\},?/gm)]
  if (!blocs.length) { console.log('✗ lot', n, 'aucun bloc reconnu'); erreurs++ }
  for (const [, slug, corps] of blocs) {
    const pb = []
    if (!SLUGS.has(slug)) pb.push('slug inconnu')
    const [part1, part2] = corps.split(/faq:\s*\[/)
    const sections = [...part1.matchAll(/titre: `([^`]*)`,\s*paragraphes: \[([\s\S]*?)\]\s*,?\s*\}/g)]
    const qs = [...(part2 ?? '').matchAll(/q: `([^`]*)`,\s*a: `([^`]*)`/g)]
    if (sections.length !== 6) pb.push(`${sections.length} sections (≠ 6)`)
    if (qs.length !== 3) pb.push(`${qs.length} questions (≠ 3)`)
    let mots = 0
    const textes = [...sections.flatMap(([, , ps]) => [...ps.matchAll(/`([^`]*)`/g)].map((m) => m[1])), ...qs.flatMap(([, q, a]) => [q, a])]
    for (const t of textes) {
      mots += t.split(/\s+/).length
      for (const [re, msg] of INTERDITS) if (re.test(t.replace(/\{\{[^}]+\}\}/g, ''))) pb.push(msg)
      for (const ph of t.split(/(?<=[.!?])\s+/).filter((x) => x.length > 60)) { if (phrases.has(ph) && phrases.get(ph) !== slug) pb.push(`phrase reprise de ${phrases.get(ph)}`); phrases.set(ph, slug) }
    }
    if (mots < 850) pb.push(`${mots} mots (< 850)`)
    if (mots > 1700) pb.push(`${mots} mots (> 1700)`)
    if (!/\/outils\/calculateur-abonnement-saas/.test(corps)) pb.push('lien vers le calculateur absent')
    console.log(pb.length ? '✗' : '✓', slug, mots + ' mots', [...new Set(pb)].join(' · '))
    erreurs += pb.length
  }
}
process.exit(erreurs ? 1 : 0)
