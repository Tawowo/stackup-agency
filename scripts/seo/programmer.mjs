/**
 * PROGRAMMER — fixe la date de parution (publishAt) des articles écrits pour le plan de publication.
 * Un article programmé n'est ni dans le sitemap ni lié tant que sa date n'est pas venue (src/lib/blog.ts) ; il paraît
 * tout seul (revalidation toutes les 12 h) : rythme régulier, mardi et vendredi, du plus fort potentiel au plus faible.
 *
 * Usage : node scripts/seo/programmer.mjs [--debut=2026-11-10]    (idempotent : recalcule toutes les dates des articles listés)
 */
import fs from 'node:fs'
import path from 'node:path'
import matter from 'gray-matter'
import { RACINE, lireCsv } from './lib.mjs'

const debut = new Date(`${process.argv.find((a) => a.startsWith('--debut='))?.slice(8) ?? '2026-11-10'}T00:00:00Z`)
const liste = JSON.parse(fs.readFileSync(path.join(RACINE, 'scripts/seo/briefs-a-ecrire.json'), 'utf8'))
const [e, ...rows] = lireCsv(fs.readFileSync(path.join(RACINE, 'docs/seo/pages-cibles.csv'), 'utf8'))
const pot = new Map(rows.filter((r) => r.length > 3).map((r) => [r[e.indexOf('url')], Number(r[e.indexOf('potentiel')]) || 0]))
const existants = liste.filter((s) => !s.startsWith('guide-site-internet-') && fs.existsSync(path.join(RACINE, 'src/content/blog', `${s}.md`)))
existants.sort((a, b) => (pot.get(`/blog/${b}`) ?? 0) - (pot.get(`/blog/${a}`) ?? 0))
existants.forEach((slug, i) => {
  const f = path.join(RACINE, 'src/content/blog', `${slug}.md`)
  const { data, content } = matter(fs.readFileSync(f, 'utf8'))
  const d = new Date(debut.getTime() + (Math.floor(i / 2) * 7 + (i % 2 === 0 ? 0 : 3)) * 86400000).toISOString().slice(0, 10)
  data.date = d
  data.updated = d
  data.publishAt = d
  fs.writeFileSync(f, matter.stringify(content, data))
})
console.log(`${existants.length} articles programmés du ${debut.toISOString().slice(0, 10)} (mardi, vendredi)`)
