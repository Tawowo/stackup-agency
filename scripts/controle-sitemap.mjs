/**
 * CONTRÔLE DU SITEMAP — parcourt TOUTES les URL du sitemap sur un serveur de production et vérifie, une par une :
 *   - statut 200 sans redirection ;
 *   - une seule balise canonical, absolue, qui pointe vers la page elle-même (https://stackup-agency.fr + chemin) ;
 *   - pas de noindex ;
 *   - un seul h1 non vide ;
 *   - title et meta description présents et UNIQUES dans tout le site ;
 *   - aucun chiffre parasite dans le texte (« 0123456789… », suites de chiffres démesurées) et chaque « à partir de » suivi d'un prix propre ;
 *   - le texte des balises meta (title, description, og, twitter, canonical) absent du contenu visible (hors <head>) ;
 *   - sitemap : aucune URL en double, aucune URL qui redirige.
 * Un robot (user-agent Googlebot) puis un navigateur sont testés sur un échantillon.
 *
 * Usage : npm run build && npm run start (autre terminal) puis
 *         node scripts/controle-sitemap.mjs [BASE=http://localhost:3000] [--rapide]
 * Sortie : docs/qa/controle-sitemap.json ; code de sortie 1 s'il reste une erreur.
 */
import { writeFileSync } from 'node:fs'

const BASE = process.argv.find((a) => a.startsWith('http')) ?? process.env.BASE ?? 'http://localhost:3000'
const ORIGINE = 'https://stackup-agency.fr'
const UA_ROBOT = 'Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)'
const UA_NAV = 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130 Safari/537.36'
const entites = (s) => s.replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&#x27;|&#39;/g, "'").replace(/&nbsp;|&#160;/g, ' ')

const xml = await (await fetch(`${BASE}/sitemap.xml`)).text()
const locs = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => entites(m[1]))
const erreurs = []
const err = (url, msg) => erreurs.push({ url, msg })
if (new Set(locs).size !== locs.length) err('/sitemap.xml', 'URL en double dans le sitemap')
for (const l of locs) if (!l.startsWith(ORIGINE)) err(l, 'URL du sitemap hors de https://stackup-agency.fr')
for (const l of locs) if (l.length > ORIGINE.length + 1 && l.endsWith('/')) err(l, 'barre finale dans le sitemap')

const chemins = locs.map((l) => l.slice(ORIGINE.length) || '/')
const titres = new Map()
const descriptions = new Map()
const resultats = []

function analyser(chemin, html, ua) {
  const tete = (html.match(/<head[\s\S]*?<\/head>/i) ?? [''])[0]
  // Metadata de Next : en-tête, ou conteneur caché dans le body (streaming) → on cherche dans tout le document les balises meta.
  const tout = html
  const canoniques = [...tout.matchAll(/<link[^>]+rel="canonical"[^>]*>/gi)].map((m) => (m[0].match(/href="([^"]*)"/) ?? [])[1])
  const attendu = `${ORIGINE}${chemin === '/' ? '' : chemin}`
  if (canoniques.length !== 1) err(chemin, `${canoniques.length} balise(s) canonical (attendu 1) [${ua}]`)
  else {
    const c = entites(canoniques[0])
    if (!/^https:\/\//.test(c)) err(chemin, `canonical non absolue : ${c}`)
    else if (c !== attendu && c !== attendu + '/') err(chemin, `canonical ≠ page : ${c} (attendu ${attendu})`)
  }
  const robots = [...tout.matchAll(/<meta[^>]+name="robots"[^>]*>/gi)].map((m) => m[0])
  if (robots.some((r) => /noindex/i.test(r))) err(chemin, 'noindex')
  const titre = entites((tout.match(/<title[^>]*>([\s\S]*?)<\/title>/i) ?? [])[1] ?? '').trim()
  const descTag = (tout.match(/<meta[^>]+name="description"[^>]*>/i) ?? [''])[0]
  const description = entites((descTag.match(/content="([^"]*)"/) ?? [])[1] ?? '').trim()
  if (!titre) err(chemin, 'title absent')
  if (!description) err(chemin, 'meta description absente')
  // Corps visible : on retire scripts, styles, templates, noscript, svg, et les conteneurs `hidden` de métadonnées.
  let corps = tout.replace(/<head[\s\S]*?<\/head>/i, '')
  const metasDansCorps = (corps.match(/<(title|meta|link)\b[^>]*>/gi) ?? []).length
  corps = corps
    .replace(/<script[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style[\s\S]*?<\/style>/gi, ' ')
    .replace(/<template[\s\S]*?<\/template>/gi, ' ')
    .replace(/<noscript[\s\S]*?<\/noscript>/gi, ' ')
    .replace(/<svg[\s\S]*?<\/svg>/gi, ' ')
    // Les exemples de code d'un article (<pre>/<code>) montrent des balises meta ou des numéros : ce n'est pas du texte parasite.
    .replace(/<pre[\s\S]*?<\/pre>/gi, ' ')
    .replace(/<code[\s\S]*?<\/code>/gi, ' ')
    .replace(/<div hidden[^>]*>[\s\S]*?<\/div>/gi, ' ')
  const h1 = [...corps.matchAll(/<h1\b[^>]*>([\s\S]*?)<\/h1>/gi)].map((m) => entites(m[1].replace(/<[^>]+>/g, '')).trim())
  if (h1.length !== 1) err(chemin, `${h1.length} h1 (attendu 1)`)
  else if (!h1[0]) err(chemin, 'h1 vide')
  const texte = entites(corps.replace(/<[^>]+>/g, ' ')).replace(/\s+/g, ' ')
  // Chiffres parasites des roues du cadran : « 0123456789 » ou 10 chiffres et plus collés.
  if (/0123456789|(?:\d{10,})/.test(texte.replace(/(\d)[   ](?=\d{3}\b)/g, '$1'))) {
    const m = texte.match(/.{0,30}(?:0123456789|\d{10,}).{0,20}/)
    err(chemin, `chiffres parasites : « ${m?.[0]} »`)
  }
  // Les articles de blog citent parfois des prix de tiers (« à partir de 5,75 € ») : on ne contrôle le format que sur les pages du site.
  if (!chemin.startsWith('/blog/')) for (const m of texte.matchAll(/à partir de\s*([^\s€]*[\s  ]?[^\s€]*)\s*€/gi)) {
    if (!/^\d{1,3}([   ]\d{3})*$/.test(m[1].trim())) err(chemin, `« à partir de » mal formé : « ${m[0]} »`)
  }
  // Un prix « à partir de X € » ne doit pas être répété deux fois d'affilée (roue + texte caché).
  if (/(à partir de\s*\d[\d   ]*€)\s*\1/i.test(texte)) err(chemin, 'prix répété deux fois de suite')
  // Les textes meta ne doivent pas apparaître dans le contenu visible.
  if (/rel="canonical"|property="og:|name="twitter:/.test(texte) || /&lt;meta|<meta/.test(texte)) err(chemin, 'texte de balise meta dans le contenu visible')
  // Information seulement : une description qui reprend mot pour mot le chapô de la page est légitime.
  const recopiee = description.length > 60 && texte.includes(description)
  return { titre, description, h1: h1[0] ?? '', metasDansCorps, mots: texte.split(' ').length, recopiee }
}

async function lire(chemin, ua) {
  const r = await fetch(BASE + chemin, { redirect: 'manual', headers: { 'user-agent': ua } })
  return { r, html: r.status === 200 ? await r.text() : '' }
}

const rapide = process.argv.includes('--rapide')
const aTester = rapide ? chemins.filter((_, i) => i % 6 === 0) : chemins
let fait = 0
async function travail() {
  while (aTester.length) {
    const chemin = aTester.shift()
    try {
      const { r, html } = await lire(chemin, UA_ROBOT)
      if (r.status !== 200) {
        err(chemin, `statut ${r.status}${r.headers.get('location') ? ' → ' + r.headers.get('location') : ''}`)
        continue
      }
      const a = analyser(chemin, html, 'robot')
      resultats.push({ chemin, ...a })
      if (a.titre) titres.set(a.titre, [...(titres.get(a.titre) ?? []), chemin])
      if (a.description) descriptions.set(a.description, [...(descriptions.get(a.description) ?? []), chemin])
    } catch (e) {
      err(chemin, `requête impossible : ${e.message}`)
    }
    if (++fait % 100 === 0) console.log(`… ${fait}/${locs.length}`)
  }
}
await Promise.all(Array.from({ length: 6 }, travail))

for (const [t, l] of titres) if (l.length > 1) err(l.join(' · '), `title identique : « ${t.slice(0, 70)} »`)
for (const [d, l] of descriptions) if (l.length > 1) err(l.join(' · '), `description identique : « ${d.slice(0, 70)} »`)

// Même contrôle avec un navigateur sur un échantillon (la metadata en streaming peut différer selon l'agent).
for (const chemin of ['/', '/tarifs', '/solutions', '/agence-web/tours', ...chemins.filter((c) => c.startsWith('/creation-site-internet/')).slice(0, 4), ...chemins.filter((c) => c.startsWith('/blog/')).slice(0, 3)]) {
  const { r, html } = await lire(chemin, UA_NAV)
  if (r.status !== 200) err(chemin, `statut ${r.status} (navigateur)`)
  else analyser(chemin, html, 'navigateur')
}

const uniques = new Map()
for (const e of erreurs) uniques.set(e.url + '|' + e.msg, e)
const liste = [...uniques.values()]
writeFileSync('docs/qa/controle-sitemap.json', JSON.stringify({ date: new Date().toISOString(), base: BASE, urls: locs.length, testees: resultats.length, descriptionsRepriseesDuChapo: resultats.filter((r) => r.recopiee).length, erreurs: liste }, null, 1))
for (const e of liste.slice(0, 80)) console.log('✗', e.url, '—', e.msg)
console.log(liste.length ? `${liste.length} erreur(s) sur ${locs.length} URL` : `${locs.length} URL du sitemap contrôlées : zéro erreur`)
process.exit(liste.length ? 1 : 0)
