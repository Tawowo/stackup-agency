/**
 * AUDIT DE QUALITÉ EN MASSE — pour les familles de pages produites en série (villes, départements, métiers, articles,
 * services locaux, solutions) : longueur du texte propre à la page, part de texte COMMUN avec les pages sœurs
 * (séquences de 6 mots présentes sur au moins la moitié de la famille), ressemblance maximale avec une sœur
 * (Jaccard sur ces séquences), nombre de liens internes reçus. Classe chaque page : à enrichir, à fusionner, ou correcte.
 *
 * Usage : node scripts/audit-pages.mjs [http://localhost:3000]   → docs/qa/audit-pages.json + tableau en console.
 */
import { lireSitemapXml } from './lib-sitemap.mjs'
import { writeFileSync } from 'node:fs'

const BASE = process.argv[2] ?? 'http://localhost:3000'
const xml = await lireSitemapXml(BASE)
const chemins = [...xml.matchAll(/<loc>https:\/\/stackup-agency\.fr([^<]*)<\/loc>/g)].map((m) => m[1] || '/')
const famille = (c) => {
  if (c.startsWith('/agence-web/departement/')) return 'départements'
  if (c.startsWith('/agence-web/')) return c === '/agence-web' ? null : 'villes'
  if (c.startsWith('/creation-site-internet/')) return 'métiers'
  if (c.startsWith('/blog/categorie/')) return 'rubriques'
  if (c.startsWith('/blog/')) return 'articles'
  if (c.startsWith('/services-locaux/')) return 'services-locaux'
  if (c.startsWith('/solutions/')) return 'solutions'
  return null
}
const entites = (s) => s.replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&#x27;|&#39;/g, "'").replace(/&nbsp;/g, ' ')

const pages = new Map()
const recus = new Map()
async function lire(chemin) {
  const r = await fetch(BASE + chemin)
  const html = await r.text()
  const main = (html.match(/<main[\s\S]*?<\/main>/i) ?? [html])[0]
  const corps = main
    .replace(/<script[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style[\s\S]*?<\/style>/gi, ' ')
    .replace(/<svg[\s\S]*?<\/svg>/gi, ' ')
  const texte = entites(corps.replace(/<[^>]+>/g, ' ')).replace(/\s+/g, ' ').trim().toLowerCase()
  const mots = texte.split(' ').filter(Boolean)
  const liens = new Set([...html.matchAll(/href="(\/[^"#?]*)"/g)].map((m) => m[1].replace(/\/$/, '') || '/'))
  for (const l of liens) if (l !== chemin) recus.set(l, (recus.get(l) ?? 0) + 1)
  pages.set(chemin, { mots })
}
const file = [...chemins]
await Promise.all(
  Array.from({ length: 6 }, async () => {
    while (file.length) await lire(file.shift())
  }),
)

const N = 6
const shingles = (mots) => {
  const s = new Set()
  for (let i = 0; i + N <= mots.length; i++) s.add(mots.slice(i, i + N).join(' '))
  return s
}
const familles = new Map()
for (const c of chemins) {
  const f = famille(c)
  if (!f) continue
  familles.set(f, [...(familles.get(f) ?? []), c])
}
const sortie = []
for (const [f, liste] of familles) {
  if (liste.length < 2) continue
  const sh = new Map(liste.map((c) => [c, shingles(pages.get(c).mots)]))
  // Séquences communes : présentes sur au moins la moitié des pages de la famille (gabarit, boilerplate).
  const compte = new Map()
  for (const s of sh.values()) for (const x of s) compte.set(x, (compte.get(x) ?? 0) + 1)
  const seuil = Math.max(2, Math.ceil(liste.length / 2))
  for (const c of liste) {
    const s = sh.get(c)
    const communs = [...s].filter((x) => compte.get(x) >= seuil).length
    const part = s.size ? communs / s.size : 1
    const propres = s.size - communs
    // Ressemblance maximale avec une page sœur.
    let max = 0
    let jumelle = ''
    if (liste.length <= 120) {
      for (const d of liste) {
        if (d === c) continue
        const t = sh.get(d)
        let inter = 0
        for (const x of s) if (t.has(x)) inter++
        const j = inter / (s.size + t.size - inter || 1)
        if (j > max) {
          max = j
          jumelle = d
        }
      }
    }
    const mots = pages.get(c).mots.length
    let verdict = 'correcte'
    if (f !== 'rubriques' && f !== 'articles') {
      if (max >= 0.6) verdict = 'fusionner ou différencier'
      else if (part >= 0.6 || propres < 250) verdict = 'enrichir'
    } else if (f === 'articles') {
      if (mots < 700) verdict = 'enrichir'
    } else if (mots < 150) verdict = 'enrichir'
    sortie.push({ famille: f, chemin: c, mots, motsPropres: propres, partCommune: Math.round(part * 100), ressembleA: jumelle, jaccard: Math.round(max * 100), liensRecus: recus.get(c) ?? 0, verdict })
  }
}
writeFileSync('docs/qa/audit-pages.json', JSON.stringify(sortie, null, 1))
for (const [f, liste] of familles) {
  const l = sortie.filter((s) => s.famille === f)
  const moy = (k) => Math.round(l.reduce((a, s) => a + s[k], 0) / l.length)
  const faibles = l.filter((s) => s.verdict !== 'correcte')
  console.log(`\n${f} : ${l.length} pages · ${moy('mots')} mots en moyenne · ${moy('partCommune')} % de texte commun · ${moy('liensRecus')} liens reçus en moyenne · à traiter : ${faibles.length}`)
  for (const s of [...l].sort((a, b) => b.jaccard - a.jaccard || a.motsPropres - b.motsPropres).slice(0, 5)) console.log(`   ${s.chemin}  ${s.mots} mots · ${s.partCommune} % commun · ${s.jaccard} % ≈ ${s.ressembleA.split('/').pop()} · ${s.liensRecus} liens · ${s.verdict}`)
}
const sansLien = sortie.filter((s) => s.liensRecus <= 1)
console.log(`\nPages avec 1 lien interne reçu ou moins : ${sansLien.length}`)
