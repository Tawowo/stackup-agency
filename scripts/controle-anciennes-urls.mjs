/**
 * CONTRÔLE DES ANCIENNES URL — reconstitue les URL de l'ancien site (dossier ancien/ : données, articles, routes) puis
 * suit chacune sur le serveur de production local : elle doit répondre 200, ou mener en UNE seule redirection (301/308)
 * à une page qui répond 200. Variantes testées : barre finale, www, majuscules ignorées.
 * Usage : node scripts/controle-anciennes-urls.mjs [http://localhost:3000] [export-search-console-pages.csv]
 */
import { readdirSync, readFileSync, writeFileSync } from 'node:fs'
import http from 'node:http'

const BASE = process.argv[2] ?? 'http://localhost:3000'
const slugs = (f) => [...readFileSync(f, 'utf8').matchAll(/^\s{2,6}slug:\s*['"]([a-z0-9-]+)['"]/gm)].map((m) => m[1])
const urls = new Set(['/', '/a-propos', '/contact', '/faq', '/tarifs', '/realisations', '/services', '/solutions', '/blog', '/outils', '/outils/audit-site', '/outils/studio-de-style', '/ressources', '/ressources/documents', '/ressources/cahier-des-charges', '/configurateur', '/devis', '/laboratoire', '/mentions-legales', '/cgv', '/politique-confidentialite', '/cookies', '/plan-du-site', '/parrainage', '/zones-intervention', '/agence-web', '/creation-site-internet', '/comparatif/wix-wordpress-sur-mesure', '/feed.xml'])
for (const s of slugs('ancien/src/data/villes.ts')) urls.add(`/agence-web/${s}`)
for (const s of slugs('ancien/src/data/departements.ts')) urls.add(`/agence-web/departement/${s}`)
for (const s of slugs('ancien/src/data/metiers.ts')) urls.add(`/creation-site-internet/${s}`)
for (const s of slugs('ancien/src/data/solutions.ts')) urls.add(`/solutions/${s}`)
for (const f of readdirSync('ancien/src/content/blog')) if (f.endsWith('.md')) urls.add(`/blog/${f.slice(0, -3)}`)
for (const s of ['site-vitrine', 'site-multi-pages', 'site-ecommerce', 'systeme-gestion', 'marketing-digital', 'maintenance-support', 'redaction-blog-seo', 'site-association', 'referencement']) urls.add(`/services/${s}`)
for (const s of ['creation-site-restaurant', 'creation-site-artisan', 'creation-site-commerce', 'creation-boutique-en-ligne', 'developpement-application-metier', 'referencement-local-seo']) urls.add(`/services-locaux/${s}`)
for (const s of ['demo-videaste', 'chateau-lumieres', 'maison-elise', 'au-pain-dore', 'prestige-immo', 'lolivier-dashboard', 'chateau-fleury']) urls.add(`/realisations/${s}`)
for (const s of ['starter', 'pro', 'premium']) urls.add(`/tarifs/${s}`)
for (const s of ['seo', 'creation-sites', 'applications-metier', 'strategie', 'restaurants', 'artisans', 'ecommerce', 'marketing', 'ia', 'digital', 'technique', 'commerce', 'juridique', 'associations', 'redaction', 'entrepreneuriat', 'professions-liberales', 'creation', 'design', 'performance', 'seo-local']) urls.add(`/blog/categorie/${s}`)
// Articles de blog redirigés par l'ancien site vers des pages locales : on reprend aussi leurs sources.
const ancienNext = readFileSync('ancien/next.config.mjs', 'utf8')
for (const m of ancienNext.matchAll(/source:\s*'([^':*]+)'/g)) urls.add(m[1])

// URL vues par Google (export Search Console « Pages », colonne 1) : chacune doit répondre 200 ou mener en une redirection à un 200.
const csv = process.argv[3]
if (csv)
  for (const l of readFileSync(csv, 'utf8').split('\n').slice(1)) {
    const u = l.split(',')[0]?.trim()
    if (u?.startsWith('https://stackup-agency.fr')) urls.add(u.slice('https://stackup-agency.fr'.length) || '/')
  }
const liste = [...urls]
const variantes = (u) => [u, ...(u !== '/' ? [u + '/'] : [])]
const resultats = []
/** fetch ne permet pas de changer l'en-tête Host : on passe par node:http pour simuler www. */
function requete(chemin, hote) {
  const u = new URL(BASE + chemin)
  return new Promise((ok, ko) => {
    const r = http.request({ host: u.hostname, port: u.port, path: u.pathname + u.search, headers: hote ? { host: hote } : {} }, (res) => {
      res.resume()
      ok({ status: res.statusCode, location: res.headers.location })
    })
    r.on('error', ko)
    r.end()
  })
}
async function suivre(chemin, hote0) {
  let hote = hote0
  let courant = chemin
  const sauts = []
  for (let i = 0; i < 6; i++) {
    const r = await requete(courant, hote)
    if (r.status >= 300 && r.status < 400) {
      const loc = r.location ?? ''
      sauts.push(`${r.status} ${loc}`)
      if (/^https?:\/\//.test(loc)) hote = undefined // la redirection mène au domaine principal : on le suit sur le serveur local
      courant = loc.replace(/^https?:\/\/[^/]+/, '') || '/'
      continue
    }
    return { statut: r.status, sauts, final: courant }
  }
  return { statut: 0, sauts, final: courant }
}
let i = 0
async function travail() {
  while (liste.length) {
    const u = liste.shift()
    for (const v of variantes(u)) {
      if (v.includes('?') && v.endsWith('/')) continue
      const r = await suivre(v)
      resultats.push({ url: v, ...r })
    }
    if (++i % 150 === 0) console.log(`… ${i}`)
  }
}
await Promise.all(Array.from({ length: 6 }, travail))
// www (hôte simulé) sur un échantillon
for (const u of ['/', '/tarifs', '/blog/site-vitrine-inclus', '/agence-web/tours']) for (const v of variantes(u)) resultats.push({ url: `www ${v}`, ...(await suivre(v, 'www.stackup-agency.fr')) })

// Les articles programmés (publishAt dans le futur) n'existent pas encore : leur 404 est normale, on les met à part.
const futurs = new Set(
  readdirSync('src/content/blog')
    .filter((f) => /^publishAt:\s*"?(\d{4}-\d{2}-\d{2})/m.test(readFileSync(`src/content/blog/${f}`, 'utf8')) && readFileSync(`src/content/blog/${f}`, 'utf8').match(/^publishAt:\s*"?(\d{4}-\d{2}-\d{2})/m)[1] > new Date().toISOString().slice(0, 10))
    .map((f) => `/blog/${f.slice(0, -3)}`),
)
const attendus404 = resultats.filter((r) => r.statut === 404 && futurs.has(r.url.replace(/\/$/, '')))
const mauvais = resultats.filter((r) => !attendus404.includes(r)).filter((r) => r.statut !== 200 || r.sauts.length > 1 || (r.sauts.length === 0 && r.url.endsWith('/') && r.url !== '/'))
writeFileSync('docs/qa/controle-anciennes-urls.json', JSON.stringify({ date: new Date().toISOString(), testees: resultats.length, articlesProgrammes404Normaux: attendus404.length, mauvais }, null, 1))
for (const m of mauvais.slice(0, 60)) console.log('✗', m.url, '→', m.statut, m.sauts.join(' | '))
console.log(`${resultats.length} URL testées (anciennes + variantes) · ${attendus404.length} articles programmés pas encore publiés (404 normale) · ${mauvais.length} problème(s)`)
process.exit(mauvais.length ? 1 : 0)
