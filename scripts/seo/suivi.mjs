/**
 * SUIVI DES 100 REQUÊTES PRIORITAIRES — docs/seo/suivi.csv, à compléter chaque mois depuis la Search Console
 * (Performance → Requêtes, filtre sur la requête : position moyenne, clics, impressions).
 * Sélection : 30 requêtes réelles de la Search Console (impressions, positions 5 à 60 d'abord), puis les requêtes principales
 * des grappes à plus fort potentiel de chaque famille de pages (services, zones, métiers, ressources), sans doublon de page.
 */
import fs from 'node:fs'
import path from 'node:path'
import { RACINE, lireCsv, csv } from './lib.mjs'

const lire = (f) => {
  const [h, ...b] = lireCsv(fs.readFileSync(path.join(RACINE, f), 'utf8'))
  return b.filter((r) => r.length > 3).map((r) => Object.fromEntries(h.map((c, i) => [c, r[i] ?? ''])))
}
const univers = lire('docs/seo/univers-mots-cles.csv')
const grappes = lire('docs/seo/grappes.csv')
const pageDe = new Map()
for (const g of grappes) for (const q of [g.requete_principale, ...g.variantes.split(' | ')]) if (q && !pageDe.has(q)) pageDe.set(q, g.page_cible)
const choisies = []
const vues = new Set()
const ajouter = (requete, page, source, imp = '', pos = '') => {
  if (vues.has(requete) || choisies.length >= 100) return
  vues.add(requete)
  choisies.push({ requete, page_cible: page, source, impressions_gsc_depart: imp, position_depart: pos, objectif: pos && Number(pos) > 10 ? 'entrer dans le top 10' : 'rester dans le top 5' })
}
// 1. Search Console : proches d'une première page d'abord (positions 5 à 60), triées par impressions.
const gsc = univers.filter((r) => r.source === 'gsc' && Number(r.impressions_gsc) > 0).sort((a, b) => Number(b.impressions_gsc) - Number(a.impressions_gsc))
for (const r of gsc.filter((x) => Number(x.position_gsc) >= 5 && Number(x.position_gsc) <= 60).slice(0, 30)) ajouter(r.requete, r.page_cible || pageDe.get(r.requete) || '(à rattacher)', 'Search Console', r.impressions_gsc, r.position_gsc)
// 2. Grappes à fort potentiel, une requête principale par page cible.
const pagesVues = new Set()
for (const g of [...grappes].sort((a, b) => Number(b.potentiel) - Number(a.potentiel))) {
  if (pagesVues.has(g.page_cible) || g.page_cible === '/') continue
  pagesVues.add(g.page_cible)
  ajouter(g.requete_principale, g.page_cible, 'grappe', g.impressions_gsc, '')
}
const mois = ['2026-11', '2026-12', '2027-01', '2027-02', '2027-03', '2027-04', '2027-05', '2027-06', '2027-07', '2027-08', '2027-09', '2027-10']
const lignes = choisies.map((c, i) => ({ n: i + 1, ...c, ...Object.fromEntries(mois.map((m) => ['pos_' + m, ''])) }))
fs.writeFileSync(path.join(RACINE, 'docs/seo/suivi.csv'), csv(lignes, ['n', 'requete', 'page_cible', 'source', 'impressions_gsc_depart', 'position_depart', 'objectif', ...mois.map((m) => 'pos_' + m)]))
console.log(lignes.length, 'requêtes suivies')
