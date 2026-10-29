/**
 * GARDE-FOUS SEO (Phase 8) — contrôle bloquant du site de production local. Code de sortie ≠ 0 au moindre manquement.
 *   - un seul h1 ; title 30-62 caractères ; meta description 120-165 ; unicité des titles et des metas ;
 *   - canonical absolu auto-référent ; lang fr-FR ; robots cohérent avec le sitemap (jamais de noindex au sitemap) ;
 *   - JSON-LD valide et complet par type ; questions du FAQPage présentes dans le texte visible ;
 *   - aucun placeholder (TODO-SEO, [ville], [métier], [nom], Lorem, {{, undefined, NaN) ni charabia de compteur ;
 *   - aucune date future (lastmod, datePublished, dateModified) ;
 *   - aucun lien interne cassé (404) ni vers une redirection ; sitemap : toutes les URL en 200.
 * Usage : node scripts/seo/verifier-site.mjs [http://localhost:3100]   (npm run seo:check)
 */
const BASE = process.argv.find((a) => a.startsWith('http')) ?? 'http://localhost:3100'
const ORIGINE = 'https://stackup-agency.fr'
const aujourdhui = new Date().toISOString().slice(0, 10)
const erreurs = []
const err = (u, m) => erreurs.push(`${u} — ${m}`)

const index = await (await fetch(`${BASE}/sitemap.xml`)).text()
const entrees = []
for (const m of index.matchAll(/<loc>([^<]+)<\/loc>/g)) {
  const r = await fetch(m[1].replace(ORIGINE, BASE))
  if (r.status !== 200) { err(m[1], `sitemap en ${r.status}`); continue }
  for (const b of (await r.text()).matchAll(/<url>([\s\S]*?)<\/url>/g)) {
    const loc = b[1].match(/<loc>([^<]+)<\/loc>/)?.[1]
    const lastmod = b[1].match(/<lastmod>([^<]+)<\/lastmod>/)?.[1]
    if (loc) entrees.push({ chemin: new URL(loc).pathname || '/', lastmod })
  }
}
const REQUIS = {
  ProfessionalService: ['name', 'url', 'telephone', 'address', 'areaServed'],
  WebSite: ['name', 'url'],
  Person: ['name'],
  BreadcrumbList: ['itemListElement'],
  Service: ['name', 'provider', 'offers'],
  FAQPage: ['mainEntity'],
  BlogPosting: ['headline', 'datePublished', 'dateModified', 'author', 'publisher', 'mainEntityOfPage'],
  CreativeWork: ['name'],
  SoftwareApplication: ['name', 'applicationCategory', 'offers'],
  WebApplication: ['name', 'applicationCategory'],
  DefinedTerm: ['name', 'description'],
  DefinedTermSet: ['name', 'hasDefinedTerm'],
  HowTo: ['name', 'step'],
  Article: ['headline'],
}
const PLACEHOLDER = /TODO-SEO|\[ville\]|\[métier\]|\[metier\]|\[nom\]|\[secteur\]|\[département\]|Lorem|\{\{|\bundefined\b|\bNaN\b|0123456789012/
const texte = (h) => h.replace(/<script[\s\S]*?<\/script>|<style[\s\S]*?<\/style>|<[^>]+>/g, ' ').replace(/&nbsp;/g, ' ').replace(/&#x([0-9a-f]+);/gi, (_, x) => String.fromCodePoint(parseInt(x, 16))).replace(/&#(\d+);/g, (_, n) => String.fromCodePoint(Number(n))).replace(/&amp;/g, '&').replace(/&quot;/g, '"').replace(/\s+/g, ' ')
const titres = new Map(), metas = new Map(), liens = new Map()

for (let i = 0; i < entrees.length; i += 10) {
  await Promise.all(
    entrees.slice(i, i + 10).map(async ({ chemin, lastmod }) => {
      const r = await fetch(BASE + chemin, { redirect: 'manual' })
      if (r.status !== 200) return err(chemin, `statut ${r.status}`)
      const h = await r.text()
      const t = (h.match(/<title>([\s\S]*?)<\/title>/)?.[1] ?? '').replace(/&amp;/g, '&').replace(/&#x27;/g, "'")
      const d = (h.match(/<meta name="description" content="([^"]*)"/)?.[1] ?? '').replace(/&amp;/g, '&').replace(/&#x27;/g, "'")
      const nbH1 = (h.match(/<h1[\s>]/g) ?? []).length
      if (nbH1 !== 1) err(chemin, `${nbH1} h1`)
      if (t.length < 30 || t.length > 62) err(chemin, `title ${t.length} caractères : « ${t} »`)
      if (d.length < 120 || d.length > 165) err(chemin, `meta description ${d.length} caractères`)
      titres.set(t, [...(titres.get(t) ?? []), chemin])
      metas.set(d, [...(metas.get(d) ?? []), chemin])
      const canon = h.match(/<link rel="canonical" href="([^"]*)"/)?.[1]
      const attendu = ORIGINE + (chemin === '/' ? '' : chemin)
      if (canon !== attendu) err(chemin, `canonical « ${canon} » ≠ « ${attendu} »`)
      if (!/<html[^>]*\slang="fr-FR"/.test(h)) err(chemin, 'html lang ≠ fr-FR')
      if (/<meta name="robots" content="[^"]*noindex/.test(h)) err(chemin, 'noindex mais présente au sitemap')
      const brut = texte(h)
      const ph = brut.match(PLACEHOLDER) ?? t.match(PLACEHOLDER) ?? d.match(PLACEHOLDER)
      if (ph) err(chemin, `placeholder « ${ph[0]} »`)
      if (lastmod && lastmod.slice(0, 10) > aujourdhui) err(chemin, `lastmod futur ${lastmod}`)
      const noeuds = []
      for (const m of h.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)) {
        try {
          for (const o of [JSON.parse(m[1])].flat()) noeuds.push(...(o['@graph'] ?? [o]))
        } catch { err(chemin, 'JSON-LD illisible') }
      }
      if (!noeuds.length) err(chemin, 'aucun JSON-LD')
      for (const n of noeuds) {
        for (const ty of [n['@type']].flat()) {
          for (const c of REQUIS[ty] ?? []) if (n[c] === undefined || n[c] === '' || (Array.isArray(n[c]) && !n[c].length)) err(chemin, `JSON-LD ${ty} sans « ${c} »`)
          for (const dt of ['datePublished', 'dateModified']) if (typeof n[dt] === 'string' && n[dt].slice(0, 10) > aujourdhui) err(chemin, `JSON-LD ${ty}.${dt} futur`)
          if (ty === 'FAQPage') for (const q of n.mainEntity ?? []) { const nom = String(q.name ?? '').replace(/\s+/g, ' ').trim(); if (!nom || !q.acceptedAnswer?.text) err(chemin, 'FAQPage incomplète'); else if (!brut.includes(nom.slice(0, 40))) err(chemin, `FAQPage : question absente du texte visible « ${nom.slice(0, 50)} »`) }
        }
      }
      for (const m of h.matchAll(/<a\b[^>]*\shref="(\/[^"#?]*)/g)) {
        const l = m[1].replace(/\/$/, '') || '/'
        if (!/\.(png|jpe?g|webp|avif|svg|pdf|xml|txt|ico|css|js|mp4)$/i.test(l)) liens.set(l, (liens.get(l) ?? new Set()).add(chemin))
      }
    }),
  )
}
for (const [t, l] of titres) if (l.length > 1) err(l.join(', '), `title en double : « ${t} »`)
for (const [d, l] of metas) if (l.length > 1) err(l.join(', '), 'meta description en double')
// Liens internes : 404 ou redirection.
const aVerifier = [...liens.keys()]
for (let i = 0; i < aVerifier.length; i += 15)
  await Promise.all(
    aVerifier.slice(i, i + 15).map(async (l) => {
      const r = await fetch(BASE + l, { redirect: 'manual' })
      if (r.status >= 400) err([...liens.get(l)].slice(0, 3).join(', '), `lien interne cassé ${l} (${r.status})`)
      else if (r.status >= 300) err([...liens.get(l)].slice(0, 3).join(', '), `lien interne vers une redirection ${l} → ${r.headers.get('location')}`)
    }),
  )
console.log(`${entrees.length} URL contrôlées · ${aVerifier.length} liens internes distincts · ${erreurs.length} manquement(s)`)
for (const e of erreurs.slice(0, 80)) console.log('✗', e)
if (erreurs.length > 80) console.log(`… et ${erreurs.length - 80} autres`)
process.exit(erreurs.length ? 1 : 0)
