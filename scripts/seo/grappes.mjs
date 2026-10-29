/**
 * GRAPPES D'INTENTION — regroupe docs/seo/univers-mots-cles.csv et produit :
 *   docs/seo/grappes.csv          une grappe par ligne (requête principale, variantes, nombre, page cible, statut)
 *   docs/seo/pages-cibles.csv     une page cible par ligne (grappes portées, requêtes, potentiel, statut)
 *   docs/seo/plan-publication.csv 12 mois, 2 contenus par semaine, classés par potentiel
 *
 * MÉTHODE (honnête) : regroupement SÉMANTIQUE LEXICAL (synonymes métier, lemmatisation légère, mêmes métier et même zone,
 * différences limitées aux mots génériques) — pas de recouvrement de résultats Google, que le conteneur ne peut pas interroger.
 * À confirmer avec la Search Console (requêtes réellement rattachées à chaque page) dans 2 à 3 mois.
 */
import fs from 'node:fs'
import path from 'node:path'
import { SUJETS } from './topics.mjs'
import { RACINE, chargerArticles, jetons, jaccard, slugifier, sansAccent, minuscule, csv, lireCsv } from './lib.mjs'

const [entete, ...brut] = lireCsv(fs.readFileSync(path.join(RACINE, 'docs/seo/univers-mots-cles.csv'), 'utf8'))
const rows = brut.filter((r) => r.length > 3).map((r) => Object.fromEntries(entete.map((c, i) => [c, r[i] ?? ''])))

const jetonsNom = (s) => new Set(jetons(s))
const lieuGroupe = (r) => (r.lieu_type === 'commune' || r.lieu_type === 'epci' ? r.epci : r.lieu_slug)
for (const r of rows) {
  const retrait = jetonsNom(`${r.lieu} ${r.metier}`)
  r.coeur = new Set(jetons(r.requete).filter((t) => !retrait.has(t)))
  r.poids = (1 + (Number(r.impressions_gsc) || 0) / 10) * ({ achat: 1.5, comparaison: 1.2, local: 1.3, information: 1, navigation: 0.5 }[r.intention] ?? 1) * ({ solution: 1.2, achat: 1.2, problème: 1.1, 'pas encore conscient': 0.9 }[r.etape] ?? 1) * ({ faible: 1.3, moyenne: 1, élevée: 0.6 }[r.difficulte] ?? 1)
}

/* ───────── Regroupement ───────── */
// A. requêtes à page directe (métier, lieu, service générique) : grappes par page et par thème, variantes proches fusionnées.
// B. requêtes de contenu (questions, problèmes, Search Console sans page directe) : grappes par thème, au plus proche voisin
//    pondéré (cosinus IDF entre la requête et le centre de la grappe) — des dizaines de formulations pour UNE page.
const grappes = []
const directes = rows.filter((r) => r.page_cible)
const contenu = rows.filter((r) => !r.page_cible)
const df = new Map()
for (const r of rows) for (const t of r.coeur) df.set(t, (df.get(t) ?? 0) + 1)
const idf = (t) => Math.log(1 + rows.length / (1 + (df.get(t) ?? 0)))
const SEUIL = Number(process.argv.find((x) => x.startsWith('--seuil='))?.slice(8) ?? 0.22)
const TAILLE_MAX = Number(process.argv.find((x) => x.startsWith('--taille='))?.slice(9) ?? 30)
const SEUIL_DIRECT = Number(process.argv.find((x) => x.startsWith('--seuil-direct='))?.slice(15) ?? 0.3)
/** Leader-follower : chaque requête rejoint la grappe dont le centre pondéré (IDF) lui ressemble le plus, sinon en ouvre une. */
function grouper(liste, seuil, cle, taille = TAILLE_MAX) {
  liste.sort((a, b) => b.poids - a.poids || a.requete.length - b.requete.length)
  const locales = []
  const index = new Map()
  const lier = (g, jt) => {
    for (const t of jt) {
      if (!index.has(t)) index.set(t, new Set())
      index.get(t).add(g)
    }
  }
  for (const r of liste) {
    const jt = [...r.coeur].filter((t) => idf(t) > 0.2)
    const cand = new Set()
    for (const t of jt) for (const g of index.get(t) ?? []) cand.add(g)
    const nr = Math.sqrt(jt.reduce((a, t) => a + idf(t) ** 2, 0)) || 1
    let meilleur = null
    let s = 0
    for (const g of cand) {
      let dot = 0
      for (const t of jt) dot += idf(t) * (g.vec.get(t) ?? 0)
      const v = dot / (nr * g.norme)
      if (v > s) { s = v; meilleur = g }
    }
    if (meilleur && s >= seuil && meilleur.membres.length < taille) {
      meilleur.membres.push(r)
      for (const t of jt) meilleur.vec.set(t, (meilleur.vec.get(t) ?? 0) + idf(t))
      meilleur.norme = Math.sqrt([...meilleur.vec.values()].reduce((a, x) => a + x * x, 0))
      lier(meilleur, jt)
    } else {
      const g = { cle, coeur: r.coeur, membres: [r], vec: new Map(jt.map((t) => [t, idf(t)])), norme: nr }
      locales.push(g)
      lier(g, jt)
    }
  }
  // Rattachement des grappes minuscules (1 ou 2 requêtes) à la grappe voisine la plus proche du même sujet.
  const grosses = locales.filter((g) => g.membres.length > 2)
  if (!grosses.length) return locales
  const petites = locales.filter((g) => g.membres.length <= 2)
  for (const p of petites) {
    let meilleur = grosses[0]
    let s = -1
    for (const g of grosses) {
      let dot = 0
      for (const [t, w] of p.vec) dot += w * (g.vec.get(t) ?? 0)
      const v = dot / ((p.norme || 1) * (g.norme || 1))
      if (v > s) { s = v; meilleur = g }
    }
    meilleur.membres.push(...p.membres)
    for (const [t, w] of p.vec) meilleur.vec.set(t, (meilleur.vec.get(t) ?? 0) + w)
  }
  return grosses
}
const seaux = new Map()
for (const r of directes) {
  const cle = [r.page_cible, r.theme].join('|')
  if (!seaux.has(cle)) seaux.set(cle, [])
  seaux.get(cle).push(r)
}
for (const [cle, liste] of seaux) grappes.push(...grouper(liste, SEUIL_DIRECT, cle, 80))
// B. Requêtes de contenu → sujet (taxonomie `topics.mjs`, première règle qui correspond), puis grappes dans chaque sujet.
const DEFAUT_THEME = {
  'création site': 'creation-site-internet-guide-complet-petite-entreprise', refonte: 'refaire-son-site-internet-quand-et-comment', référencement: 'referencement-naturel-seo-par-ou-commencer', 'référencement local': 'seo-local-referencement-local-commerce-artisan',
  'e-commerce': 'creer-sa-boutique-en-ligne-guide-petit-commerce', 'logiciel de gestion': 'logiciel-de-gestion-petite-entreprise-guide', 'IA et automatisation': 'que-peut-on-automatiser-dans-une-petite-entreprise',
  'facture électronique': 'facture-electronique-calendrier-2026-2027', 'maintenance et sécurité': 'site-en-erreur-page-blanche-erreur-500-404', 'obligations légales': 'obligations-legales-artisan-commercant-site',
  'visibilité et clients': 'visibilite-en-ligne-petite-entreprise-par-ou-commencer', "gestion d'entreprise": 'perdre-des-heures-sur-l-administratif-que-faire', 'prix et devis': 'combien-coute-un-site-internet-2026', 'Google Business': 'fiche-google-business-tout-savoir',
}
const sujets = SUJETS.map(([slug, titre, theme, type, motif, page]) => ({ slug, titre, theme, type, re: new RegExp(motif), page }))
const sujetDe = (r) => {
  const t = sansAccent(minuscule(r.requete))
  return sujets.find((x) => x.re.test(t)) ?? sujets.find((x) => x.slug === DEFAUT_THEME[r.theme]) ?? sujets.at(-1)
}
const parSujet = new Map()
for (const r of contenu) {
  const x = sujetDe(r)
  r.sujet = x.slug
  if (!parSujet.has(x.slug)) parSujet.set(x.slug, [])
  parSujet.get(x.slug).push(r)
}
for (const [slug, liste] of parSujet) {
  const x = sujets.find((y) => y.slug === slug)
  const gs = grouper(liste, SEUIL, slug)
  for (const g of gs) { g.sujet = x }
  grappes.push(...gs)
}

/* ───────── Pages existantes et prévues ───────── */
const articles = chargerArticles()
const motsArticle = articles.map((a) => ({ a, t: new Set([...jetons(a.titre), ...a.motsCles.flatMap((k) => jetons(k)), ...jetons(a.slug.replace(/-/g, ' '))]) }))
const sitemapChemin = process.argv.find((x) => x.startsWith('--sitemap='))?.slice(10)
const existantes = new Set(sitemapChemin ? fs.readFileSync(sitemapChemin, 'utf8').split('\n').map((l) => l.trim()).filter(Boolean) : [])
/** Pages créées par cette mission (liste maintenue avec les gabarits : voir src/config/pages-seo.ts quand il existera). */
const PAGES_MISSION = new Set(JSON.parse(fs.readFileSync(path.join(RACINE, 'scripts/seo/lexique/pages-mission.json'), 'utf8')))

const REGLES = [
  [/cahier des charges/, '/ressources/cahier-des-charges'],
  [/audit.*site|site.*(audit|apparait|visible).*google|mon site.*google/, '/outils/audit-site'],
  [/mentions legales.*(generateur|modele|creer|faire)|generateur.*mentions/, '/outils/generateur-mentions-legales'],
  [/(modele|exemple|gratuit).*devis|devis.*(modele|gratuit|word|excel)/, '/outils/modele-devis'],
  [/clients? perd|perdre.*client|manque a gagner/, '/outils/calculateur-clients-perdus'],
  [/checklist.*facture|facture.*checklist/, '/outils/checklist-facture-electronique'],
  [/wix.*(wordpress|sur mesure)|wordpress.*(wix|sur mesure)|sur mesure.*(wix|wordpress)/, '/comparatif/wix-wordpress-sur-mesure'],
  [/shopify.*(sur mesure|boutique)|boutique.*shopify/, '/comparatif/shopify-ou-boutique-sur-mesure'],
  [/obat|tolteck|batappli/, '/comparatif/obat-tolteck-logiciel-sur-mesure'],
]
const resumePages = new Map()
const slugsPris = new Set()
function resoudrePage(g) {
  if (g.cible) return g.cible
  const x = g.sujet
  if (x.page) return x.page
  // Article existant correspondant au sujet (titre du sujet ≈ titre/mots-clés de l'article).
  const T = new Set(jetons(x.titre + ' ' + x.slug.replace(/-/g, ' ')))
  let meilleur = null
  let score = 0
  for (const m of motsArticle) {
    const v = jaccard(T, m.t)
    if (v > score) { score = v; meilleur = m.a }
  }
  if (meilleur && score >= 0.45) return `/blog/${meilleur.slug}`
  return `/blog/${x.slug}`
}

for (const g of grappes) {
  const poidsPar = (k) => {
    const acc = {}
    for (const m of g.membres) acc[m[k]] = (acc[m[k]] ?? 0) + m.poids
    return Object.entries(acc).sort((a, b) => b[1] - a[1])[0]?.[0] ?? ''
  }
  g.theme = poidsPar('theme')
  g.etape = poidsPar('etape')
  g.intention = poidsPar('intention')
  // Requête principale : la plus demandée (Search Console) ; sinon la plus centrale de la grappe (cosinus au centre).
  const centrale = (m) => {
    if (!g.vec) return 0
    const jt = [...m.coeur].filter((t) => idf(t) > 0.2)
    const nr = Math.sqrt(jt.reduce((a, t) => a + idf(t) ** 2, 0)) || 1
    return jt.reduce((a, t) => a + idf(t) * (g.vec.get(t) ?? 0), 0) / (nr * (g.norme || 1)) - (m.lieu_slug ? 0.05 : 0) - m.requete.length / 2000
  }
  g.principale = [...g.membres].sort((x, y) => (Number(y.impressions_gsc) || 0) - (Number(x.impressions_gsc) || 0) || centrale(y) - centrale(x))[0].requete
  g.metier = g.membres[0].metier
  g.lieu = g.membres[0].lieu_slug ? (g.membres.find((m) => m.lieu_slug)?.lieu ?? '') : ''
  g.lieuGroupe = lieuGroupe(g.membres[0])
  g.cible = g.membres.find((m) => m.page_cible)?.page_cible ?? ''
  g.score = g.membres.reduce((a, m) => a + m.poids, 0)
  g.imp = g.membres.reduce((a, m) => a + (Number(m.impressions_gsc) || 0), 0)
}
const sujetParUrl = new Map()
for (const g of grappes) {
  if (!g.sujet) continue
  const page = resoudrePage(g)
  g.cible = page
  g.nouvelle = page === `/blog/${g.sujet.slug}`
  sujetParUrl.set(page, g.sujet)
}

/* ───────── Pages cibles : potentiel et statut ───────── */
const pages = new Map()
for (const g of grappes) {
  if (!pages.has(g.cible)) pages.set(g.cible, { url: g.cible, grappes: 0, requetes: 0, score: 0, imp: 0, theme: g.theme, nouvelle: !!g.nouvelle, principale: g.principale })
  const p = pages.get(g.cible)
  p.grappes++
  p.requetes += g.membres.length
  p.score += g.score
  p.imp += g.imp
  if (g.score > (p.meilleur ?? 0)) { p.meilleur = g.score; p.principale = g.principale }
}
const familleDe = (u) => (u === '/' ? 'accueil' : u.startsWith('/blog/') ? 'article' : u.startsWith('/creation-site-internet') ? 'métier' : u.startsWith('/agence-web') ? 'ville/département' : u.startsWith('/zones-intervention') ? 'zone' : u.startsWith('/services') ? 'pilier' : u.startsWith('/outils') ? 'outil' : u.startsWith('/comparatif') ? 'comparatif' : 'autre')
for (const p of pages.values()) { const x = sujetParUrl.get(p.url); if (x && p.url.startsWith('/blog/')) p.principale = x.titre }
const classees = [...pages.values()].sort((a, b) => b.score - a.score)
const LOT1 = Number(process.argv.find((x) => x.startsWith('--lot1='))?.slice(7) ?? 60)
let rangNouveau = 0
for (const p of classees) {
  p.famille = familleDe(p.url)
  const slugArticle = p.url.startsWith('/blog/') ? p.url.slice(6) : ''
  const existeArticle = slugArticle && articles.some((a) => a.slug === slugArticle)
  if (p.nouvelle) {
    rangNouveau++
    p.statut = rangNouveau <= LOT1 ? 'à créer — lot 1 (cette mission)' : 'planifiée (calendrier 12 mois)'
    p.rang = rangNouveau
  } else if (existeArticle || existantes.has(p.url) || p.famille === 'métier' || p.famille === 'ville/département') p.statut = 'existante'
  else if (PAGES_MISSION.has(p.url)) p.statut = 'créée par cette mission'
  else p.statut = 'existante'
}
for (const g of grappes) g.statut = pages.get(g.cible).statut

/* ───────── Écriture ───────── */
const sortieG = grappes
  .sort((a, b) => b.score - a.score)
  .map((g, i) => ({
    grappe_id: 'G' + String(i + 1).padStart(5, '0'), requete_principale: g.principale, variantes: g.membres.slice(1, 9).map((m) => m.requete).join(' | '), nb_requetes: g.membres.length, theme: g.theme, etape: g.etape, intention: g.intention,
    metier: g.metier, lieu: g.lieu, page_cible: g.cible, statut_page: g.statut, impressions_gsc: g.imp || '', potentiel: Math.round(g.score * 10) / 10,
  }))
fs.writeFileSync(path.join(RACINE, 'docs/seo/grappes.csv'), csv(sortieG, ['grappe_id', 'requete_principale', 'variantes', 'nb_requetes', 'theme', 'etape', 'intention', 'metier', 'lieu', 'page_cible', 'statut_page', 'impressions_gsc', 'potentiel']))
fs.writeFileSync(
  path.join(RACINE, 'docs/seo/pages-cibles.csv'),
  csv(classees.map((p) => ({ url: p.url, famille: p.famille, statut: p.statut, rang_nouveaute: p.rang ?? '', grappes: p.grappes, requetes: p.requetes, potentiel: Math.round(p.score), impressions_gsc: p.imp || '', requete_principale: p.principale })), ['url', 'famille', 'statut', 'rang_nouveaute', 'grappes', 'requetes', 'potentiel', 'impressions_gsc', 'requete_principale']),
)
// Plan de publication : 2 contenus par semaine pendant 12 mois (104 créneaux), du plus fort potentiel au plus faible :
// 1. les sujets planifiés ; 2. les grappes volumineuses des sujets « fourre-tout » (un article dédié par grappe) ;
// 3. les guides par métier des métiers les plus demandés.
const planifiees = classees.filter((p) => p.statut.startsWith('planifiée')).map((p) => ({ url: p.url, type: 'article', theme: p.theme, requete: p.principale, grappes: p.grappes, potentiel: Math.round(p.score) }))
const dediees = grappes
  .filter((g) => g.cible.startsWith('/blog/') && g.membres.length >= 8 && g.statut !== 'planifiée (calendrier 12 mois)')
  .sort((a, b) => b.score - a.score)
  .slice(0, 80)
  .map((g) => ({ url: `/blog/${slugifier(g.principale).split('-').slice(0, 9).join('-')}`, type: 'article (grappe dédiée)', theme: g.theme, requete: g.principale, grappes: 1, potentiel: Math.round(g.score) }))
const guidesMetier = classees
  .filter((p) => p.famille === 'métier')
  .slice(0, 20)
  .map((p) => ({ url: `/blog/guide-site-internet-${p.url.split('/').pop()}`, type: 'guide métier', theme: 'création site', requete: `guide du site internet : ${p.url.split('/').pop().replace(/-/g, ' ')}`, grappes: p.grappes, potentiel: Math.round(p.score / 2) }))
const file = [...planifiees, ...dediees, ...guidesMetier].sort((a, b) => b.potentiel - a.potentiel).slice(0, 104)
const debut = new Date('2026-11-09T00:00:00Z')
const plan = file.map((p, i) => {
  const semaine = Math.floor(i / 2)
  const jour = i % 2 === 0 ? 1 : 4 // mardi puis vendredi
  const d = new Date(debut.getTime() + (semaine * 7 + jour) * 86400000)
  return { date: d.toISOString().slice(0, 10), url: p.url, type: p.type, theme: p.theme, requete_principale: p.requete, grappes: p.grappes, potentiel: p.potentiel }
})
fs.writeFileSync(path.join(RACINE, 'docs/seo/plan-publication.csv'), csv(plan, ['date', 'url', 'type', 'theme', 'requete_principale', 'grappes', 'potentiel']))
const par = (k) => Object.entries(classees.reduce((a, p) => ((a[p[k]] = (a[p[k]] ?? 0) + 1), a), {})).map(([x, n]) => `${x}:${n}`).join('  ')
console.log(`${rows.length} requêtes → ${grappes.length} grappes → ${classees.length} pages cibles`)
console.log('pages par famille :', par('famille'))
console.log('pages par statut  :', par('statut'))
