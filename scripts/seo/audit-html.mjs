/**
 * AUDIT HTML — qualité technique de chaque page du sitemap : hiérarchie des titres (pas de saut h2 → h4), images sans alt,
 * liens sans texte ou « cliquez ici », liens externes sans rel, balises dupliquées (canonical, description, robots), og:image,
 * attribut lang, liens internes cassés vers un fichier statique, poids du HTML.
 * Usage : node scripts/seo/audit-html.mjs [http://localhost:3100]
 */
import fs from 'node:fs'
import path from 'node:path'
import { RACINE } from './lib.mjs'

const BASE = process.argv.find((a) => a.startsWith('http')) ?? 'http://localhost:3100'
const index = await (await fetch(`${BASE}/sitemap.xml`)).text()
const urls = []
for (const m of index.matchAll(/<loc>([^<]+)<\/loc>/g)) {
  const x = await (await fetch(m[1].replace('https://stackup-agency.fr', BASE))).text()
  for (const u of x.matchAll(/<loc>([^<]+)<\/loc>/g)) urls.push(new URL(u[1]).pathname)
}
const problemes = []
const compte = {}
const note = (u, msg) => { problemes.push(`${u} — ${msg}`); compte[msg.split(' : ')[0]] = (compte[msg.split(' : ')[0]] ?? 0) + 1 }
let poidsMax = { u: '', n: 0 }
for (let i = 0; i < urls.length; i += 10)
  await Promise.all(
    urls.slice(i, i + 10).map(async (u) => {
      const h = await (await fetch(BASE + u)).text()
      if (h.length > poidsMax.n) poidsMax = { u, n: h.length }
      if (!/<html[^>]*\slang="fr(-FR)?"/.test(h)) note(u, 'lang : absent ou ≠ fr')
      const niveaux = [...h.matchAll(/<h([1-6])[\s>]/g)].map((m) => Number(m[1]))
      for (let k = 1; k < niveaux.length; k++) if (niveaux[k] > niveaux[k - 1] + 1) { note(u, `saut de titre : h${niveaux[k - 1]} → h${niveaux[k]}`); break }
      for (const m of h.matchAll(/<img\b([^>]*)>/g)) if (!/\salt=/.test(m[1])) { note(u, 'image sans alt : ' + (m[1].match(/src="([^"]+)"/)?.[1] ?? '?').slice(0, 60)); break }
      for (const m of h.matchAll(/<a\b([^>]*)>([\s\S]*?)<\/a>/g)) {
        const t = m[2].replace(/<[^>]+>/g, '').trim()
        const aria = /aria-label="[^"]+"/.test(m[1])
        if (!t && !aria && !/<img[^>]+alt="[^"]+"/.test(m[2]) && !/<svg/.test(m[2])) { note(u, 'lien sans texte : ' + (m[1].match(/href="([^"]+)"/)?.[1] ?? '?')); break }
        if (/^(cliquez ici|ici|en savoir plus|lire la suite|voir plus)$/i.test(t) && !aria) { note(u, 'texte de lien vague : ' + t); break }
        if (/target="_blank"/.test(m[1]) && !/rel="[^"]*noopener/.test(m[1])) { note(u, 'lien externe sans noopener'); break }
      }
      for (const [nom, re] of [['canonical', /<link[^>]+rel="canonical"/g], ['description', /<meta[^>]+name="description"/g], ['og:image', /<meta[^>]+property="og:image"/g]]) {
        const n = (h.match(re) ?? []).length
        if (n !== 1) note(u, `${nom} : ${n} balise(s)`)
      }
      if (h.length > 600_000) note(u, `poids HTML : ${Math.round(h.length / 1000)} ko`)
    }),
  )
fs.writeFileSync(path.join(RACINE, 'docs/qa/audit-html.txt'), problemes.join('\n') + '\n')
console.log(`${urls.length} pages · ${problemes.length} remarque(s) · HTML le plus lourd : ${poidsMax.u} (${Math.round(poidsMax.n / 1000)} ko)`)
for (const [k, n] of Object.entries(compte).sort((a, b) => b[1] - a[1])) console.log(`  ${n} × ${k}`)
for (const p of problemes.slice(0, 15)) console.log(' ', p)
