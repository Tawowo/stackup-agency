/**
 * Vérifie des articles Markdown (src/content/blog) contre les règles éditoriales : front matter, longueurs, FAQ, interdits.
 * Usage : node scripts/seo/verifier-article.mjs slug1 slug2 …   |   --tous
 */
import fs from 'node:fs'
import path from 'node:path'
import matter from 'gray-matter'
const dossier = path.resolve(import.meta.dirname, '../../src/content/blog')
const args = process.argv.slice(2)
const slugs = args.includes('--tous') ? fs.readdirSync(dossier).filter((f) => f.endsWith('.md')).map((f) => f.slice(0, -3)) : args
const CATS = new Set(['creation', 'seo', 'seo-local', 'ecommerce', 'applications-metier', 'ia', 'artisans', 'juridique', 'strategie', 'marketing', 'technique', 'commerce', 'restaurants', 'professions-liberales'])
const INTERDITS = [
  [/\d[\d\s  .,]*\s?(€|euros?)\b/i, 'montant en chiffres (utiliser un jeton {{prix:…}})'],
  [/\b(?:livr[ée]e?s?|livraison|délai)\b[^.\n]{0,40}\b\d+\s*(?:jours?|semaines?|mois)\b/i, 'délai de livraison chiffré'],
  [/fois moins cher/i, 'comparatif « × moins cher »'],
  [/hébergé?e?s? en (France|Europe)|hébergement en (France|Europe)/i, 'hébergement France/Europe'],
  [/\bValéry\b|depuis 2018/i, 'mention interdite'],
  [/site association|site pour association/i, 'offre association'],
  [/dans cet article,? nous (allons|verrons)/i, 'formule creuse'],
]
let erreurs = 0
for (const slug of slugs) {
  const f = path.join(dossier, slug + '.md')
  if (!fs.existsSync(f)) { console.log('✗', slug, 'introuvable'); erreurs++; continue }
  const { data, content } = matter(fs.readFileSync(f, 'utf8'))
  const mots = content.split(/\s+/).filter(Boolean).length
  const pb = []
  for (const c of ['title', 'seoTitle', 'excerpt', 'date', 'updated', 'category', 'type', 'keywords']) if (!data[c]) pb.push('champ manquant : ' + c)
  if (data.seoTitle && String(data.seoTitle).length > 60) pb.push(`seoTitle ${String(data.seoTitle).length} car. (> 60)`)
  if (data.excerpt && String(data.excerpt).length > 155) pb.push(`excerpt ${String(data.excerpt).length} car. (> 155)`)
  if (data.category && !CATS.has(data.category)) pb.push('catégorie inconnue : ' + data.category)
  if (!['question', 'guide', 'reglementation'].includes(data.type)) pb.push('type invalide')
  const mini = data.type === 'guide' ? 1700 : 1000
  if (mots < mini) pb.push(`${mots} mots (< ${mini})`)
  if (!/^\*\*[^*]{40,}\*\*/.test(content.trim())) pb.push('réponse directe en gras absente en tête')
  const faq = content.match(/##\s*Questions fréquentes[\s\S]*$/i)?.[0] ?? ''
  const nq = (faq.match(/^\*\*.+\?\*\*\s*$/gm) ?? []).length
  if (nq < 3) pb.push(`FAQ : ${nq} question(s) (< 3)`)
  for (const [re, msg] of INTERDITS) if (re.test(content.replace(/\{\{[^}]+\}\}/g, ''))) pb.push(msg)
  for (const m of content.matchAll(/\]\((\/[^)\s]*)\)/g)) if (m[1].startsWith('/blog/') && !fs.existsSync(path.join(dossier, m[1].slice(6).replace(/\/$/, '') + '.md'))) pb.push('lien vers un article inexistant : ' + m[1])
  console.log(pb.length ? '✗' : '✓', slug, mots + ' mots', pb.join(' · '))
  erreurs += pb.length
}
process.exit(erreurs ? 1 : 0)
