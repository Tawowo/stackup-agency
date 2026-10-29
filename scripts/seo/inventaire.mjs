/**
 * INVENTAIRE SEO (Phase 0, lecture seule) — explore le site de production local (sitemaps + liens internes découverts) et écrit :
 *   seo/inventory.csv     une ligne par URL : type, title (+ longueur), meta description (+ longueur), h1 (+ nombre), hiérarchie des Hn,
 *                         mots du contenu principal, canonical, robots, types JSON-LD, liens internes entrants / sortants, date, images sans alt
 *   seo/audit-data.json   agrégats et anomalies pour le rapport : doublons, pages minces, orphelines, liens cassés, quasi-doublons (shingles),
 *                         balises vides, placeholders, charabia de compteurs, dates futures, sitemap vs pages découvertes.
 * Usage : node scripts/seo/inventaire.mjs [http://localhost:3100]
 */
import fs from 'node:fs'
import path from 'node:path'
import { RACINE, csv } from './lib.mjs'

const BASE = process.argv.find((a) => a.startsWith('http')) ?? 'http://localhost:3100'
const ORIGINE = 'https://stackup-agency.fr'
const SORTIE = path.join(RACINE, 'seo')
fs.mkdirSync(SORTIE, { recursive: true })

const get = async (u, opts = {}) => fetch(u.startsWith('http') ? u : BASE + u, { redirect: 'manual', ...opts })

/* ───────── 1. URL du sitemap (avec lastmod) ───────── */
const index = await (await get('/sitemap.xml')).text()
const sitemaps = [...index.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1])
const dansSitemap = new Map() // chemin → lastmod
for (const sm of sitemaps) {
  const x = await (await get(sm.replace(ORIGINE, BASE))).text()
  for (const b of x.matchAll(/<url>([\s\S]*?)<\/url>/g)) {
    const loc = b[1].match(/<loc>([^<]+)<\/loc>/)?.[1]
    if (loc) dansSitemap.set(new URL(loc).pathname || '/', b[1].match(/<lastmod>([^<]+)<\/lastmod>/)?.[1] ?? '')
  }
}

/* ───────── 2. Exploration ───────── */
const texte = (h) => h.replace(/<script[\s\S]*?<\/script>|<style[\s\S]*?<\/style>|<[^>]+>/g, ' ').replace(/&nbsp;/g, ' ').replace(/&amp;/g, '&').replace(/&#x27;|&#39;/g, "'").replace(/&quot;/g, '"').replace(/&[a-z#0-9]+;/g, ' ').replace(/\s+/g, ' ').trim()
const pages = new Map()
const file = [...dansSitemap.keys()]
const vus = new Set(file)
const statuts = new Map()
async function visiter(chemin) {
  const r = await get(chemin)
  statuts.set(chemin, r.status)
  if (r.status >= 300 && r.status < 400) return { chemin, statut: r.status, redirige: r.headers.get('location') ?? '' }
  const h = await r.text()
  if (r.status !== 200) return { chemin, statut: r.status }
  const balise = (re) => h.match(re)?.[1]?.replace(/&amp;/g, '&').replace(/&#x27;/g, "'").replace(/&quot;/g, '"') ?? ''
  const main = h.match(/<main[\s\S]*?<\/main>/)?.[0] ?? h
  const mainTexte = texte(main)
  const hn = [...h.matchAll(/<h([1-6])[\s>][\s\S]*?<\/h\1>/g)].map((m) => ({ n: Number(m[1]), t: texte(m[0]) }))
  const liens = new Set()
  for (const m of h.matchAll(/<a\b[^>]*\shref="([^"#?]*)(?:[?#][^"]*)?"/g)) {
    const href = m[1]
    if (href.startsWith('/') && !href.startsWith('//') && !/\.(png|jpe?g|webp|avif|svg|pdf|xml|txt|ico|css|js)$/i.test(href)) liens.add(href.replace(/\/$/, '') || '/')
    else if (href.startsWith(ORIGINE)) liens.add(new URL(href).pathname.replace(/\/$/, '') || '/')
  }
  const liensMain = new Set()
  for (const m of main.matchAll(/<a\b[^>]*\shref="(\/[^"#?]*)/g)) liensMain.add(m[1].replace(/\/$/, '') || '/')
  const jsonld = [...h.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].flatMap((m) => {
    try {
      const j = JSON.parse(m[1])
      return (Array.isArray(j) ? j : [j]).flatMap((o) => (o['@graph'] ?? [o]).map((x) => x['@type']).flat())
    } catch { return ['INVALIDE'] }
  })
  const imgs = [...h.matchAll(/<img\b([^>]*)>/g)].map((m) => m[1])
  return {
    chemin, statut: 200, h,
    title: balise(/<title>([\s\S]*?)<\/title>/), description: balise(/<meta name="description" content="([^"]*)"/),
    canonical: balise(/<link rel="canonical" href="([^"]*)"/), robots: balise(/<meta name="robots" content="([^"]*)"/), lang: balise(/<html[^>]*\slang="([^"]*)"/),
    h1s: hn.filter((x) => x.n === 1).map((x) => x.t), hn, mots: mainTexte.split(' ').filter(Boolean).length, texteMain: mainTexte,
    liens: [...liens], liensMain: [...liensMain], jsonld, sansAlt: imgs.filter((a) => !/\salt=/.test(a)).length, altVide: imgs.filter((a) => /\salt=""/.test(a)).length, nbImages: imgs.length,
    ogImage: balise(/<meta property="og:image" content="([^"]*)"/), datePublication: balise(/"datePublished":"([^"]*)"/), dateModification: balise(/"dateModified":"([^"]*)"/),
  }
}
let i = 0
while (i < file.length) {
  const lot = file.slice(i, i + 12)
  i += lot.length
  const res = await Promise.all(lot.map(visiter))
  for (const p of res) {
    pages.set(p.chemin, p)
    for (const l of p.liens ?? []) if (!vus.has(l)) { vus.add(l); file.push(l) }
  }
}

/* ───────── 3. Graphe de liens ───────── */
const entrants = new Map()
for (const p of pages.values()) for (const l of new Set(p.liens ?? [])) if (l !== p.chemin) entrants.set(l, (entrants.get(l) ?? new Set()).add(p.chemin))
const entrantsMain = new Map()
for (const p of pages.values()) for (const l of new Set(p.liensMain ?? [])) if (l !== p.chemin) entrantsMain.set(l, (entrantsMain.get(l) ?? new Set()).add(p.chemin))

/* ───────── 4. Type de page, dates ───────── */
const typeDe = (c) =>
  c === '/' ? 'accueil'
  : c.startsWith('/blog/categorie') ? 'blog-rayon' : c === '/blog' ? 'blog-index' : c.startsWith('/blog/') ? 'article'
  : c.startsWith('/lexique/') ? 'lexique-terme' : c === '/lexique' ? 'lexique-hub'
  : c.startsWith('/creation-site-internet/') ? 'metier' : c === '/creation-site-internet' ? 'metiers-hub'
  : c.startsWith('/agence-web/departement/') ? 'departement' : c.startsWith('/agence-web/') ? 'ville' : c === '/agence-web' ? 'villes-hub'
  : c.startsWith('/zones-intervention/') ? 'zone' : c === '/zones-intervention' ? 'zones-hub'
  : c.startsWith('/services-locaux/') ? 'service-local' : c.startsWith('/services/') ? 'service' : c === '/services' ? 'services-hub'
  : c.startsWith('/solutions/') ? 'solution' : c === '/solutions' ? 'solutions-hub'
  : c.startsWith('/realisations/') ? 'realisation' : c === '/realisations' ? 'realisations-hub'
  : c.startsWith('/comparatif/') ? 'comparatif' : c.startsWith('/outils') ? 'outil' : c.startsWith('/ressources') ? 'ressource'
  : /^\/(mentions-legales|cgv|cookies|politique-confidentialite|plan-du-site)$/.test(c) ? 'legal' : 'page'

/* ───────── 5. Quasi-doublons (shingles de 5 mots) par famille ───────── */
const hash = (s) => { let h = 5381; for (let k = 0; k < s.length; k++) h = ((h << 5) + h + s.charCodeAt(k)) | 0; return h }
const shingles = (t) => { const m = t.toLowerCase().replace(/[^\p{L}\p{N}\s]/gu, ' ').split(/\s+/).filter(Boolean); const s = new Set(); for (let k = 0; k + 5 <= m.length; k++) s.add(hash(m.slice(k, k + 5).join(' '))); return s }
const FAMILLES = ['article', 'metier', 'ville', 'zone', 'lexique-terme', 'service', 'solution', 'service-local', 'departement']
const similarites = []
for (const f of FAMILLES) {
  const liste = [...pages.values()].filter((p) => p.statut === 200 && typeDe(p.chemin) === f && p.mots > 80).map((p) => ({ c: p.chemin, s: shingles(p.texteMain) }))
  for (let a = 0; a < liste.length; a++)
    for (let b = a + 1; b < liste.length; b++) {
      const A = liste[a].s, B = liste[b].s
      const [pt, gr] = A.size < B.size ? [A, B] : [B, A]
      let inter = 0
      for (const x of pt) if (gr.has(x)) inter++
      const j = inter / (A.size + B.size - inter || 1)
      if (j >= 0.15) similarites.push({ famille: f, a: liste[a].c, b: liste[b].c, jaccard: Math.round(j * 1000) / 10 })
    }
}
similarites.sort((x, y) => y.jaccard - x.jaccard)

/* ───────── 6. Lignes d'inventaire et anomalies ───────── */
const aujourdhui = new Date().toISOString().slice(0, 10)
const lignes = []
const anomalies = { titreDouble: [], descDouble: [], titreLong: [], titreCourt: [], descLongueur: [], sansH1: [], plusieursH1: [], mince: [], orphelines: [], peuDeLiens: [], sansCanonical: [], canonicalDiff: [], noindex: [], sansJsonLd: [], sansAlt: [], placeholders: [], compteurs: [], datesFutures: [], sautsTitres: [], hors_sitemap: [], redirections: [], erreurs: [], liensCasses: [] }
const titres = new Map(), descs = new Map()
for (const p of pages.values()) if (p.statut === 200) {
  titres.set(p.title, [...(titres.get(p.title) ?? []), p.chemin])
  descs.set(p.description, [...(descs.get(p.description) ?? []), p.chemin])
}
const PLACEHOLDER = /\[ville\]|\[métier\]|\[nom\]|\[metier\]|TODO|undefined|\bNaN\b|\bnull\b|Lorem|\{\{|XXX|\[… à compléter\]|à compléter\]/
for (const [c, p] of pages) {
  if (p.statut !== 200) {
    lignes.push({ url: c, type: typeDe(c), statut: p.statut, redirige: p.redirige ?? '' })
    if (p.statut >= 300 && p.statut < 400) anomalies.redirections.push(`${c} → ${p.redirige}`)
    else anomalies.erreurs.push(`${c} (${p.statut})`)
    continue
  }
  const type = typeDe(c)
  const ent = entrants.get(c)?.size ?? 0
  const entMain = entrantsMain.get(c)?.size ?? 0
  const maj = dansSitemap.get(c) ?? ''
  const hier = p.hn.reduce((acc, x) => { const k = `h${x.n}`; acc[k] = (acc[k] ?? 0) + 1; return acc }, {})
  const saut = p.hn.some((x, k) => k > 0 && x.n > p.hn[k - 1].n + 1)
  const idxJsonLd = [...new Set(p.jsonld)].join('|')
  lignes.push({
    url: c, type, statut: 200, title: p.title, title_len: p.title.length, description: p.description, description_len: p.description.length, h1: p.h1s[0] ?? '', nb_h1: p.h1s.length,
    hierarchie: Object.entries(hier).map(([k, v]) => `${k}×${v}`).join(' '), saut_titres: saut ? 'oui' : '', mots_contenu: p.mots, canonical: p.canonical, robots: p.robots, lang: p.lang,
    jsonld: idxJsonLd, liens_entrants: ent, liens_entrants_contenu: entMain, liens_sortants: p.liens.length, liens_sortants_contenu: p.liensMain.length, date_sitemap: maj, date_publication: p.datePublication, date_modification: p.dateModification,
    images: p.nbImages, images_sans_alt: p.sansAlt, dans_sitemap: dansSitemap.has(c) ? 'oui' : 'non',
  })
  if ((titres.get(p.title) ?? []).length > 1) anomalies.titreDouble.push(`${c} = ${p.title}`)
  if ((descs.get(p.description) ?? []).length > 1) anomalies.descDouble.push(`${c} = ${p.description.slice(0, 60)}`)
  if (p.title.length > 62) anomalies.titreLong.push(`${c} (${p.title.length})`)
  if (p.title.length < 30) anomalies.titreCourt.push(`${c} (${p.title.length})`)
  if (p.description.length < 120 || p.description.length > 165) anomalies.descLongueur.push(`${c} (${p.description.length})`)
  if (p.h1s.length === 0) anomalies.sansH1.push(c)
  if (p.h1s.length > 1) anomalies.plusieursH1.push(`${c} (${p.h1s.length})`)
  if (p.mots < 400 && !/^(legal|outil|ressource|page|blog-index|blog-rayon|realisations-hub)$/.test(type)) anomalies.mince.push(`${c} [${type}] ${p.mots} mots`)
  if (ent === 0 && c !== '/') anomalies.orphelines.push(c)
  else if (ent < 3 && c !== '/' && dansSitemap.has(c)) anomalies.peuDeLiens.push(`${c} (${ent})`)
  if (!p.canonical) anomalies.sansCanonical.push(c)
  else if (new URL(p.canonical).pathname.replace(/\/$/, '') !== (c === '/' ? '' : c)) anomalies.canonicalDiff.push(`${c} → ${p.canonical}`)
  if (/noindex/i.test(p.robots)) anomalies.noindex.push(`${c} (${p.robots})${dansSitemap.has(c) ? ' ← DANS LE SITEMAP' : ''}`)
  if (!p.jsonld.length) anomalies.sansJsonLd.push(c)
  if (p.sansAlt) anomalies.sansAlt.push(`${c} (${p.sansAlt})`)
  const m = p.texteMain.match(PLACEHOLDER) ?? p.title.match(PLACEHOLDER) ?? p.description.match(PLACEHOLDER)
  if (m) anomalies.placeholders.push(`${c} : « ${m[0]} » dans « ${p.texteMain.slice(Math.max(0, p.texteMain.search(PLACEHOLDER) - 30), p.texteMain.search(PLACEHOLDER) + 40)} »`)
  if (/partir de\s*0123456789/.test(p.texteMain) || /0123456789012345678/.test(p.texteMain)) anomalies.compteurs.push(c)
  for (const d of [maj, p.datePublication, p.dateModification]) if (d && d.slice(0, 10) > aujourdhui) { anomalies.datesFutures.push(`${c} (${d})`); break }
  if (saut) anomalies.sautsTitres.push(c)
  if (!dansSitemap.has(c) && !/noindex/i.test(p.robots)) anomalies.hors_sitemap.push(c)
  for (const l of p.liens) if (statuts.has(l) && statuts.get(l) >= 400) anomalies.liensCasses.push(`${c} → ${l} (${statuts.get(l)})`)
}
const COL = ['url', 'type', 'statut', 'redirige', 'title', 'title_len', 'description', 'description_len', 'h1', 'nb_h1', 'hierarchie', 'saut_titres', 'mots_contenu', 'canonical', 'robots', 'lang', 'jsonld', 'liens_entrants', 'liens_entrants_contenu', 'liens_sortants', 'liens_sortants_contenu', 'date_sitemap', 'date_publication', 'date_modification', 'images', 'images_sans_alt', 'dans_sitemap']
lignes.sort((a, b) => a.type.localeCompare(b.type) || a.url.localeCompare(b.url))
fs.writeFileSync(path.join(SORTIE, 'inventory.csv'), csv(lignes, COL))

const parType = {}
for (const l of lignes.filter((x) => x.statut === 200)) {
  const t = (parType[l.type] ??= { pages: 0, mots: [], liensEnt: [] })
  t.pages++; t.mots.push(l.mots_contenu); t.liensEnt.push(l.liens_entrants)
}
const med = (a) => [...a].sort((x, y) => x - y)[Math.floor(a.length / 2)] ?? 0
const resume = Object.fromEntries(Object.entries(parType).map(([k, v]) => [k, { pages: v.pages, mots_mediane: med(v.mots), mots_min: Math.min(...v.mots), mots_max: Math.max(...v.mots), entrants_mediane: med(v.liensEnt) }]))
fs.writeFileSync(path.join(SORTIE, 'audit-data.json'), JSON.stringify({ genere: aujourdhui, urlsSitemap: dansSitemap.size, pagesExplorees: pages.size, parType: resume, anomalies, similarites: similarites.slice(0, 400), nbSimilarites: similarites.length }, null, 1))
console.log(`${pages.size} pages explorées (${dansSitemap.size} au sitemap) → seo/inventory.csv`)
for (const [k, v] of Object.entries(anomalies)) console.log(`  ${k.padEnd(14)} ${v.length}`)
console.log(`  quasi-doublons ≥15 % de shingles : ${similarites.length} (max ${similarites[0]?.jaccard ?? 0} %)`)
