/**
 * AUDIT DES ARTICLES — pour chacun des articles existants : longueur, sujet (grappe la plus proche), cannibalisation avec un autre
 * article (titres et mots-clés trop proches), et décision : garder, enrichir, fusionner (301 vers l'article gardé), retirer (301 vers le rayon).
 * Écrit docs/seo/audit-articles.csv. Usage : node scripts/seo/audit-articles.mjs [--appliquer]
 */
import fs from 'node:fs'
import path from 'node:path'
import { RACINE, chargerArticles, chargerCommunes37, chargerMetiers, detecteurLieu, detecteurMetier, PROCHE, jetons, jaccard, lireCsv, csv } from './lib.mjs'

const NOUVEAUX = new Set(fs.readdirSync(path.join(RACINE, 'scripts/seo/briefs')).filter((f) => f.endsWith('.json')).map((f) => f.slice(0, -5)))
const articles = chargerArticles()
const [h, ...b] = lireCsv(fs.readFileSync(path.join(RACINE, 'docs/seo/grappes.csv'), 'utf8'))
const grappes = b.filter((r) => r.length > 3).map((r) => Object.fromEntries(h.map((c, i) => [c, r[i] ?? ''])))
const gt = grappes.map((g) => ({ g, t: new Set(jetons([g.requete_principale, ...g.variantes.split(' | ')].join(' '))) }))
const VIDES = new Set(['site', 'web', 'internet', 'creer', 'guide', 'complet', '2026', '2027', 'pme', 'tpe', 'entreprise', 'petit', 'artisan', 'commercant', 'conseil', 'astuce', 'exemple', 'faire', 'avoir', 'tout', 'savoir', 'pourquoi', 'quoi'])
const T = (a) => new Set([...jetons(a.titre), ...a.motsCles.flatMap((k) => jetons(k))].filter((x) => !VIDES.has(x)))
const gardes = articles.filter((a) => NOUVEAUX.has(a.slug)) // les 60 articles écrits par cette mission
const anciens = articles.filter((a) => !NOUVEAUX.has(a.slug))

// Décisions, de la plus nette à la plus fine.
const communes = chargerCommunes37()
const lieuDe = detecteurLieu(communes)
const metierDe = detecteurMetier(chargerMetiers())
const nouveaux = gardes.map((a) => ({ a, t: T(a) }))
const lignes = []
const score = (a) => a.mots + (a.publieLe ? 0 : 400) + (a.maj ? 100 : 0)
const gardeurs = []
for (const a of [...anciens].sort((x, y) => score(y) - score(x))) {
  const t = T(a)
  let meilleureG = { s: 0, g: null }
  for (const x of gt) {
    const s = jaccard(t, x.t)
    if (s > meilleureG.s) meilleureG = { s, g: x.g }
  }
  let proche = { s: 0, n: null }
  for (const n of nouveaux) {
    const s = jaccard(t, n.t)
    if (s > proche.s) proche = { s, n: n.a }
  }
  let concurrent = { s: 0, k: null }
  for (const k of gardeurs) {
    const s = jaccard(t, k.t)
    if (s > concurrent.s) concurrent = { s, k: k.a }
  }
  const lieu = lieuDe(a.titre + ' ' + a.slug.replace(/-/g, ' '))
  const metier = metierDe(a.titre)
  let decision = 'garder'
  let cible = ''
  let raison = ''
  if (a.categorie === 'associations') { decision = 'retirer'; cible = '/blog'; raison = 'hors cible : aucune offre ni grappe « association »' }
  else if (lieu?.type === 'hors-zone') { decision = 'retirer'; cible = '/zones-intervention'; raison = `ville hors zone (${lieu.nom}) : page satellite` }
  else if (lieu && lieu.type === 'ville') { decision = 'fusionner'; cible = `/agence-web/${lieu.slug}`; raison = `article local (${lieu.nom}) : la page de zone porte ce sujet` }
  else if (proche.s >= 0.4) { decision = 'fusionner'; cible = `/blog/${proche.n.slug}`; raison = `même sujet que l'article refait « ${proche.n.slug} » (${proche.s.toFixed(2)})` }
  else if (concurrent.s >= 0.4) { decision = 'fusionner'; cible = `/blog/${concurrent.k.slug}`; raison = `cannibalise « ${concurrent.k.slug} » (${concurrent.s.toFixed(2)})` }
  else if (metier && a.mots < 1200) {
    const m = chargerMetiers().find((x) => x.slug === metier)
    decision = 'fusionner'
    cible = `/creation-site-internet/${m?.existant ? metier : PROCHE[metier] ?? ''}`.replace(/\/$/, '') || '/creation-site-internet'
    raison = `article de métier court (${a.mots} mots) : la page métier porte ce sujet`
  }
  else if (a.mots < 900) { decision = 'enrichir'; raison = `${a.mots} mots : trop court` }
  else raison = `sujet distinct (grappe la plus proche : ${meilleureG.s.toFixed(2)})`
  if (decision === 'garder' || decision === 'enrichir') gardeurs.push({ a, t })
  lignes.push({ slug: a.slug, titre: a.titre, mots: a.mots, statut: a.publieLe ? `programmé ${a.publieLe}` : 'publié', categorie: a.categorie, grappe_proche: meilleureG.g?.requete_principale ?? '', score_grappe: meilleureG.s.toFixed(2), decision, cible, raison })
}
fs.writeFileSync(path.join(RACINE, 'docs/seo/audit-articles.csv'), csv(lignes, ['slug', 'titre', 'mots', 'statut', 'categorie', 'grappe_proche', 'score_grappe', 'decision', 'cible', 'raison']))
const n = (d) => lignes.filter((l) => l.decision === d).length
console.log(`${lignes.length} articles anciens : garder ${n('garder')} · enrichir ${n('enrichir')} · fusionner ${n('fusionner')} · retirer ${n('retirer')} · (+ ${gardes.length} articles refaits par cette mission)`)

if (process.argv.includes('--appliquer')) {
  const dossier = path.join(RACINE, 'src/content/blog')
  const aSupprimer = lignes.filter((l) => l.decision === 'fusionner' || l.decision === 'retirer')
  const publies = new Set(anciens.filter((a) => !a.publieLe).map((a) => a.slug))
  const cibles = Object.fromEntries(aSupprimer.map((l) => [l.slug, l.cible || '/blog']))
  // Les cibles qui sont elles-mêmes supprimées sont résolues (une seule redirection, jamais de chaîne).
  const resolu = (s, n = 0) => (cibles[s.replace(/^\/blog\//, '')] && s.startsWith('/blog/') && n < 5 ? resolu(cibles[s.replace(/^\/blog\//, '')], n + 1) : s)
  const redirections = aSupprimer.filter((l) => publies.has(l.slug)).map((l) => ({ source: `/blog/${l.slug}`, destination: resolu(l.cible || '/blog'), permanent: true }))
  // Liens internes vers un article supprimé : on pointe directement vers la destination.
  for (const f of fs.readdirSync(dossier).filter((x) => x.endsWith('.md'))) {
    const slug = f.slice(0, -3)
    if (cibles[slug]) continue
    const p = path.join(dossier, f)
    const t = fs.readFileSync(p, 'utf8')
    const r = t.replace(/\]\(\/blog\/([a-z0-9-]+)\/?\)/g, (m, s) => (cibles[s] ? `](${resolu(cibles[s])})` : m))
    if (r !== t) fs.writeFileSync(p, r)
  }
  for (const l of aSupprimer) fs.rmSync(path.join(dossier, l.slug + '.md'), { force: true })
  fs.writeFileSync(path.join(RACINE, 'src/config/redirections-articles.json'), JSON.stringify(redirections, null, 1))
  console.log(`appliqué : ${aSupprimer.length} fichiers supprimés, ${redirections.length} redirections 301 écrites (src/config/redirections-articles.json)`)
}
