/**
 * COUVERTURE — pour chaque grappe d'intention, la page cible parle-t-elle des mêmes mots ?
 * Lit docs/seo/grappes.csv, charge chaque page cible sur le serveur de production et mesure :
 *   - couverture : part des mots significatifs de la requête principale (lemmes) présents dans la page ;
 *   - title / h1 / titres : la requête principale (ou ses mots clés) figure-t-elle dans le titre, le h1, un h2/h3 ?
 * Sortie : docs/seo/couverture.csv (une ligne par grappe) + résumé console : pages à enrichir et grappes sans page (404).
 * Un écart n'appelle JAMAIS une page de plus par formulation : on enrichit la page cible (un h2, une réponse de FAQ).
 *
 * Usage : node scripts/seo/couverture.mjs [http://localhost:3100]
 */
import fs from 'node:fs'
import path from 'node:path'
import { RACINE, jetons, csv, lireCsv } from './lib.mjs'

const BASE = process.argv.find((a) => a.startsWith('http')) ?? 'http://localhost:3100'
const [entete, ...brut] = lireCsv(fs.readFileSync(path.join(RACINE, 'docs/seo/grappes.csv'), 'utf8'))
const grappes = brut.filter((r) => r.length > 3).map((r) => Object.fromEntries(entete.map((c, i) => [c, r[i] ?? ''])))

const texteDe = (h) => h.replace(/<script[\s\S]*?<\/script>|<style[\s\S]*?<\/style>|<[^>]+>/g, ' ').replace(/&[a-z#0-9]+;/g, ' ')
const extraire = (h, re) => [...h.matchAll(re)].map((m) => texteDe(m[1]))
const pages = new Map()
async function charger(url) {
  if (pages.has(url)) return pages.get(url)
  let p = null
  try {
    const r = await fetch(BASE + url, { redirect: 'manual' })
    if (r.status === 200) {
      const h = await r.text()
      p = {
        corps: new Set(jetons(texteDe(h))),
        title: new Set(jetons(extraire(h, /<title>([\s\S]*?)<\/title>/g).join(' '))),
        h1: new Set(jetons(extraire(h, /<h1[^>]*>([\s\S]*?)<\/h1>/g).join(' '))),
        titres: new Set(jetons(extraire(h, /<h[23][^>]*>([\s\S]*?)<\/h[23]>/g).join(' '))),
      }
    }
  } catch { /* page absente */ }
  pages.set(url, p)
  return p
}

const urls = [...new Set(grappes.map((g) => g.page_cible).filter(Boolean))]
for (let i = 0; i < urls.length; i += 8) await Promise.all(urls.slice(i, i + 8).map(charger))

const lignes = []
for (const g of grappes) {
  const p = pages.get(g.page_cible)
  const mots = [...new Set(jetons(g.requete_principale))]
  if (!p || !mots.length) {
    lignes.push({ ...pick(g), couverture: p ? '' : 0, dans_title: '', dans_h1: '', dans_titres: '', etat: p ? 'sans mots' : 'page absente' })
    continue
  }
  const part = (ens) => mots.filter((m) => ens.has(m)).length / mots.length
  const couverture = Math.round(part(p.corps) * 100)
  lignes.push({
    ...pick(g), couverture, dans_title: Math.round(part(p.title) * 100), dans_h1: Math.round(part(p.h1) * 100), dans_titres: Math.round(part(p.titres) * 100),
    etat: couverture >= 80 ? 'couverte' : couverture >= 50 ? 'partielle' : 'à enrichir',
  })
}
function pick(g) {
  return { grappe_id: g.grappe_id, requete_principale: g.requete_principale, nb_requetes: g.nb_requetes, theme: g.theme, page_cible: g.page_cible, potentiel: g.potentiel }
}
fs.writeFileSync(path.join(RACINE, 'docs/seo/couverture.csv'), csv(lignes, ['grappe_id', 'requete_principale', 'nb_requetes', 'theme', 'page_cible', 'potentiel', 'couverture', 'dans_title', 'dans_h1', 'dans_titres', 'etat']))

const compte = (k) => Object.entries(lignes.reduce((a, r) => ((a[r[k]] = (a[r[k]] ?? 0) + 1), a), {})).map(([x, n]) => `${x}:${n}`).join('  ')
console.log(`${lignes.length} grappes · ${pages.size} pages chargées · ${compte('etat')}`)
const absentes = [...new Set(lignes.filter((l) => l.etat === 'page absente').map((l) => l.page_cible))]
if (absentes.length) console.log(`${absentes.length} page(s) cibles absentes (404) :`, absentes.slice(0, 15).join(' '), absentes.length > 15 ? '…' : '')
// Pages dont le plus de potentiel est mal couvert.
const parPage = new Map()
for (const l of lignes.filter((x) => x.etat === 'à enrichir' || x.etat === 'partielle')) parPage.set(l.page_cible, (parPage.get(l.page_cible) ?? 0) + Number(l.potentiel))
console.log('pages à enrichir en priorité :')
for (const [u, pot] of [...parPage].sort((a, b) => b[1] - a[1]).slice(0, 15)) console.log(' ', Math.round(pot), u)
