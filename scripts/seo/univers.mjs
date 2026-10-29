/**
 * UNIVERS DE MOTS-CLÉS — construit docs/seo/univers-mots-cles.csv.
 *
 * Sources, dans l'ordre :
 *   1. requêtes réelles de la Search Console (docs/seo/sources/gsc-requetes.csv) ;
 *   2. (Keyword Planner : non fourni, aucune ligne) ;
 *   3. combinaisons systématiques : besoins × services × métiers × lieux (150 métiers, 272 communes d'Indre-et-Loire, villes cibles) ;
 *   4. questions réelles (scripts/seo/lexique/questions-*.json) + gabarits de questions par métier ;
 *   5. requêtes « pas encore conscient » (problèmes de gestion, de clients, d'organisation, d'obligations).
 * Le volume n'est renseigné que si une source le donne (aucune : colonne vide) ; la difficulté est ESTIMÉE par règles.
 *
 * Usage : node scripts/seo/univers.mjs   (puis node scripts/seo/grappes.mjs)
 */
import fs from 'node:fs'
import path from 'node:path'
import { etendre } from './extensions.mjs'
import { RACINE, chargerMetiers, chargerCommunes37, detecteurMetier, detecteurLieu, VILLES_PAGES, DEPARTEMENTS, PROCHE, EPCI, sansAccent, minuscule, csv, lireCsv } from './lib.mjs'

const metiers = chargerMetiers()
const communes = chargerCommunes37()
const metierDe = detecteurMetier(metiers)
const lieuDe = detecteurLieu(communes)
const parSlug = Object.fromEntries(metiers.map((m) => [m.slug, m]))

const lignes = new Map() // clé normalisée → ligne
function ajouter(q, extra) {
  const requete = minuscule(q).replace(/\s+\?$/, '').replace(/^[-–•\s]+/, '')
  if (requete.length < 3 || requete.split(' ').length > 16) return
  const cle = sansAccent(requete).replace(/[^a-z0-9 ]/g, ' ').replace(/\s+/g, ' ').trim()
  if (lignes.has(cle)) {
    const l = lignes.get(cle)
    if (extra.source === 'gsc') Object.assign(l, { impressions_gsc: extra.impressions_gsc, position_gsc: extra.position_gsc, source: 'gsc' })
    return
  }
  lignes.set(cle, { requete, ...extra })
}

/* ───────── 1. Search Console ───────── */
const gscChemin = path.join(RACINE, 'docs/seo/sources/gsc-requetes.csv')
let nbGsc = 0
for (const [i, l] of lireCsv(fs.readFileSync(gscChemin, 'utf8')).entries()) {
  if (i === 0 || !l[0]) continue
  ajouter(l[0], { source: 'gsc', impressions_gsc: Number(l[2]) || 0, position_gsc: Number(String(l[4]).replace(',', '.')) || '' })
  nbGsc++
}

/* ───────── 3. Combinaisons systématiques ───────── */
// Services : formes nominales courtes tapées dans Google.
const SERVICES = {
  'création site': ['création de site internet', 'création site web', 'création site vitrine', 'création de site vitrine', 'site internet professionnel', 'agence web', 'agence de création de site internet', 'agence digitale', 'développeur web', 'développeur web freelance', 'web designer', 'faire créer son site internet', 'créer un site internet'],
  refonte: ['refonte site internet', 'refonte de site web', 'refaire son site internet', 'moderniser son site internet', 'refonte site vitrine'],
  référencement: ['référencement naturel', 'agence seo', 'consultant seo', 'référencement site internet', 'optimisation seo', 'améliorer son référencement'],
  'référencement local': ['référencement local', 'seo local', 'fiche google business', 'optimiser sa fiche google', 'visibilité google maps'],
  'e-commerce': ['création boutique en ligne', 'site e-commerce', 'créer une boutique en ligne', 'agence e-commerce', 'boutique en ligne sur mesure'],
  'logiciel de gestion': ['logiciel de gestion sur mesure', 'application métier sur mesure', 'développement application web', 'logiciel de devis et facturation', 'logiciel de prise de rendez-vous', 'application de gestion sur mesure'],
  'IA et automatisation': ['automatisation des tâches administratives', 'automatisation entreprise', 'automatisation des devis'],
  'facture électronique': ['logiciel facture électronique', 'facturation électronique conforme'],
  'maintenance et sécurité': ['maintenance site internet', 'maintenance de site web', 'tma site web'],
}
// Villes principales : toutes les formes. Communes : trois formes seulement.
const LIEUX_PRINCIPAUX = [...VILLES_PAGES.map((v) => v.nom), 'Savigné-sur-Lathan', 'La Flèche', 'Poitiers', 'Azay-le-Rideau', 'Amboise', 'Montbazon', 'Château-Renault', 'Loches']
const LIEUX_DEPT = DEPARTEMENTS.map((d) => d.nom)
const THEME_DIFF = (nb, grande) => (grande ? 'élevée' : nb <= 2 ? 'moyenne' : 'faible')

for (const [theme, formes] of Object.entries(SERVICES)) {
  for (const f of formes) {
    for (const lieu of [...new Set(LIEUX_PRINCIPAUX)]) ajouter(`${f} ${lieu}`, { source: 'combinaison', theme, patron: 'service×lieu' })
    for (const d of LIEUX_DEPT) ajouter(`${f} ${d}`, { source: 'combinaison', theme, patron: 'service×département' })
    ajouter(`${f} touraine`, { source: 'combinaison', theme, patron: 'service×lieu' })
    ajouter(`${f} centre-val de loire`, { source: 'combinaison', theme, patron: 'service×lieu' })
    ajouter(`${f} pays de la loire`, { source: 'combinaison', theme, patron: 'service×lieu' })
    ajouter(f, { source: 'combinaison', theme, patron: 'service' })
    ajouter(`${f} pas cher`, { source: 'combinaison', theme, patron: 'service×besoin' })
    ajouter(`${f} prix`, { source: 'combinaison', theme, patron: 'service×besoin' })
    ajouter(`${f} devis`, { source: 'combinaison', theme, patron: 'service×besoin' })
    ajouter(`${f} avis`, { source: 'combinaison', theme, patron: 'service×besoin' })
    ajouter(`${f} sur mesure`, { source: 'combinaison', theme, patron: 'service×besoin' })
    ajouter(`${f} artisan`, { source: 'combinaison', theme, patron: 'service×besoin' })
    ajouter(`${f} commerçant`, { source: 'combinaison', theme, patron: 'service×besoin' })
    ajouter(`${f} tpe`, { source: 'combinaison', theme, patron: 'service×besoin' })
    ajouter(`${f} près de chez moi`, { source: 'combinaison', theme, patron: 'service×besoin' })
  }
}
// Toutes les communes d'Indre-et-Loire : trois formes locales chacune.
for (const c of communes) {
  ajouter(`création site internet ${c.nom}`, { source: 'combinaison', theme: 'création site', patron: 'service×commune' })
  ajouter(`agence web ${c.nom}`, { source: 'combinaison', theme: 'création site', patron: 'service×commune' })
  ajouter(`site internet artisan ${c.nom}`, { source: 'combinaison', theme: 'création site', patron: 'service×commune' })
  ajouter(`développeur web près de ${c.nom}`, { source: 'combinaison', theme: 'création site', patron: 'service×commune' })
}

// Métier × service.
const FORMES_METIER = (m) => {
  const n = m.nom
  const pour = `pour ${m.article} ${n}`
  return [
    [`site internet ${n}`, 'création site'], [`site web ${n}`, 'création site'], [`création site internet ${n}`, 'création site'], [`créer un site internet ${pour}`, 'création site'], [`site vitrine ${n}`, 'création site'],
    [`site internet ${pour}`, 'création site'], [`refonte site ${n}`, 'refonte'], [`refaire le site internet ${pour}`, 'refonte'], [`référencement ${n}`, 'référencement'], [`seo ${n}`, 'référencement'],
    [`fiche google ${n}`, 'Google Business'], [`avis google ${n}`, 'Google Business'], [`logiciel ${n}`, 'logiciel de gestion'], [`logiciel de gestion ${n}`, 'logiciel de gestion'], [`application ${n}`, 'logiciel de gestion'],
    [`logiciel de devis ${n}`, 'logiciel de gestion'], [`logiciel de facturation ${n}`, 'logiciel de gestion'], [`prise de rendez-vous en ligne ${n}`, 'logiciel de gestion'],
    [`prix site internet ${n}`, 'prix et devis'], [`tarif site web ${pour}`, 'prix et devis'], [`site internet ${n} pas cher`, 'prix et devis'], [`agence web ${n}`, 'création site'],
    [`facture électronique ${n}`, 'facture électronique'], [`automatisation ${n}`, 'IA et automatisation'],
  ]
}
for (const m of metiers) for (const [q, theme] of FORMES_METIER(m)) ajouter(q, { source: 'combinaison', theme, metier: m.slug, patron: 'métier×service' })

// Métier × ville principale.
const VILLES_METIER = ['Tours', 'Joué-lès-Tours', 'Saint-Cyr-sur-Loire', 'Amboise', 'Chinon', 'Loches', 'Langeais', 'Bourgueil', 'Château-la-Vallière', 'Saumur', 'Angers', 'Le Mans', 'Blois', 'Châtellerault', 'Vendôme', 'Indre-et-Loire', 'Savigné-sur-Lathan']
for (const m of metiers) {
  for (const v of VILLES_METIER) {
    ajouter(`site internet ${m.nom} ${v}`, { source: 'combinaison', theme: 'création site', metier: m.slug, patron: 'métier×ville' })
    ajouter(`création site web ${m.nom} ${v}`, { source: 'combinaison', theme: 'création site', metier: m.slug, patron: 'métier×ville' })
  }
}

/* ───────── 4 & 5. Questions réelles + gabarits par métier ───────── */
const THEMES = new Set(['création site', 'refonte', 'référencement', 'référencement local', 'e-commerce', 'logiciel de gestion', 'IA et automatisation', 'facture électronique', 'Google Business', 'maintenance et sécurité', 'obligations légales', 'visibilité et clients', 'gestion d\'entreprise', 'prix et devis'])
const ETAPES = new Set(['pas encore conscient', 'problème', 'solution', 'achat'])
const INTENTIONS = new Set(['information', 'comparaison', 'achat', 'local', 'navigation'])
let nbQuestions = 0
const dossierLex = path.join(RACINE, 'scripts/seo/lexique')
for (const f of fs.readdirSync(dossierLex).filter((x) => /^questions-.*\.json$/.test(x))) {
  const tab = JSON.parse(fs.readFileSync(path.join(dossierLex, f), 'utf8'))
  for (const e of tab) {
    if (!e.q) continue
    const source = e.etape === 'pas encore conscient' ? 'pas-encore-conscient' : 'question'
    ajouter(e.q, { source, theme: THEMES.has(e.theme) ? e.theme : '', etape_src: ETAPES.has(e.etape) ? e.etape : '', intention_src: INTENTIONS.has(e.intention) ? e.intention : '', metier: parSlug[e.metier]?.slug ?? '' })
    nbQuestions++
  }
}
// Gabarits par métier, selon le groupe.
const PROBLEMES = {
  'artisanat-btp': ['comment avoir plus de chantiers quand on est {m}', 'comment faire des devis plus vite quand on est {m}', 'comment relancer un devis non signé {m}', 'comment gérer son planning de chantiers {m}', 'client qui ne paie pas {m} que faire', 'comment trouver des clients particuliers {m}'],
  restauration: ['comment remplir son restaurant en semaine {m}', 'comment gérer les réservations {m}', 'comment avoir de bons avis google {m}', 'comment répondre à un avis négatif {m}', 'comment se faire connaître quand on ouvre {m}', 'comment réduire les no-show {m}'],
  commerce: ['comment vendre en ligne quand on est {m}', 'comment attirer plus de clients en boutique {m}', 'comment faire du click and collect {m}', 'comment fidéliser ses clients {m}', 'comment gérer son stock {m}', 'comment faire connaître sa boutique {m}'],
  'santé-bien-être': ['comment réduire les rendez-vous non honorés {m}', 'comment gérer sa prise de rendez-vous {m}', 'comment trouver de nouveaux patients ou clients {m}', 'comment réduire le secrétariat {m}', 'comment apparaître sur google maps {m}', 'comment répondre aux avis {m}'],
  services: ['comment trouver de nouveaux clients {m}', 'comment faire des devis plus vite {m}', 'comment se démarquer de la concurrence {m}', 'comment gérer ses dossiers clients {m}', 'comment relancer ses prospects {m}', 'comment apparaître en premier sur google {m}'],
  tourisme: ['comment remplir son établissement hors saison {m}', 'comment éviter les commissions des plateformes {m}', 'comment gérer les réservations {m}', 'comment avoir plus d’avis {m}', 'comment se faire connaître localement {m}', 'comment vendre en direct {m}'],
  agriculture: ['comment vendre en direct aux particuliers {m}', 'comment faire connaître ses produits {m}', 'comment gérer les commandes {m}', 'comment trouver des clients locaux {m}', 'comment faire un site pour vendre ses produits {m}', 'comment organiser la livraison {m}'],
  créatifs: ['comment trouver des clients {m}', 'comment présenter son portfolio {m}', 'comment fixer ses tarifs {m}', 'comment se faire connaître localement {m}', 'comment gérer ses devis et factures {m}', 'comment livrer ses fichiers aux clients {m}'],
  artisanat: ['comment vendre ses créations en ligne {m}', 'comment se faire connaître {m}', 'comment fixer ses prix {m}', 'comment gérer ses commandes sur mesure {m}', 'comment trouver des clients locaux {m}', 'comment faire des devis {m}'],
}
for (const m of metiers) {
  const base = [
    `faut-il un site internet pour ${m.article} ${m.nom}`, `combien coûte un site internet pour ${m.article} ${m.nom}`, `comment avoir plus de clients quand on est ${m.nom}`, `quel logiciel de gestion pour ${m.article} ${m.nom}`,
    `pourquoi un ${m.nom} doit avoir un site internet`.replace('un ' + m.nom, m.article + ' ' + m.nom), `quelles sont les obligations légales du site internet ${m.nom}`, `que doit contenir le site internet ${m.article} ${m.nom}`, `comment apparaître sur google quand on est ${m.nom}`,
    `quelle est la différence entre un site vitrine et un site complet pour ${m.article} ${m.nom}`, `${m.nom} comment automatiser son administratif`,
  ]
  for (const q of base) ajouter(q, { source: 'question', metier: m.slug, patron: 'question×métier' })
  for (const t of PROBLEMES[m.groupe] ?? PROBLEMES.services) ajouter(t.replace('{m}', m.nom), { source: 'pas-encore-conscient', metier: m.slug, patron: 'problème×métier', etape_src: 'pas encore conscient' })
}

/* ───────── 6. Extensions : têtes de requête, lexique, modificateurs, métiers, communes, comparatifs ───────── */
const nbExtensions = etendre(ajouter, { metiers, communes, SERVICES })

/* ───────── Classement : thème, étape, intention, type, difficulté, page cible ───────── */
const TH = [
  ['facture électronique', /facture electronique|facturelec|factur-x|e-?reporting|plateforme agreee|pdp|\bpa\b.*facture/],
  ['Google Business', /fiche google|google business|google my business|avis google|google maps|google map|maps/],
  ['référencement local', /seo local|referencement local|referencement.*(tours|ville|local)|visibilite locale|annuaire|citation locale/],
  ['maintenance et sécurité', /maintenance|pirat|hack|securite|ssl|certificat|sauvegarde|hebergement|nom de domaine|domaine|mise a jour|plugin|spam|page blanche|erreur 500|e-?mail pro|messagerie/],
  ['IA et automatisation', /\bia\b|intelligence artificielle|chatgpt|automatis|chatbot|zapier|\bmake\b|n8n|robot|agent ia/],
  ['obligations légales', /mentions legales|rgpd|cookie|cnil|cgv|mediateur|obligatoire|obligation|accessibilite|rgaa|legal|siret|siren|microentreprise|auto-entrepreneur|tva|293 b|statut|assurance|decennale/],
  ['e-commerce', /boutique|e-?commerce|vendre en ligne|shopify|woocommerce|prestashop|click and collect|panier|paiement|marketplace|etsy|vinted/],
  ['logiciel de gestion', /logiciel|application|devis|facturation|factures?\b|planning|stock|crm|rendez-vous|reservation|agenda|caisse|obat|tolteck|excel|pointage|chantier/],
  ['refonte', /refonte|refaire|moderniser|ancien site|vieux site|migrer|migration|quitter wix|quitter wordpress/],
  ['référencement', /referencement|\bseo\b|google.*(premier|page|position|apparait)|apparait|indexation|search console|mot-cle|backlink|balise|sitemap|visible sur google|pas.*google/],
  ['prix et devis', /prix|tarif|combien|cout|devis|budget|pas cher|economique|abordable/],
  ['visibilité et clients', /plus de clients|trouver des clients|nouveaux clients|se faire connaitre|visibilite|attirer|fideliser|concurren|bouche a oreille|prospect/],
  ['création site', /site|agence|web|developpeur|freelance|vitrine|wix|wordpress|jimdo|webflow|squarespace/],
  ["gestion d'entreprise", /./],
]
const detecterTheme = (q) => {
  const t = sansAccent(minuscule(q))
  return TH.find(([, re]) => re.test(t))[0]
}
const ETAPE_RE = {
  achat: /prix|tarif|devis|combien|pas cher|agence|prestataire|freelance|commander|acheter|avis|meilleur|comparatif|offre|abordable/,
  solution: /comment|creer|faire|logiciel|outil|modele|exemple|solution|automatis|installer|mettre en place|optimiser|ameliorer|apparaitre|resoudre/,
  probleme: /pourquoi|probleme|erreur|ne marche|pas de client|trop|difficile|impossible|perdre|perte|pirate|bloque|lent|impayes|retard|sans/,
}
function etapeDe(q, src) {
  if (src) return src
  const t = sansAccent(minuscule(q))
  if (ETAPE_RE.achat.test(t)) return 'achat'
  if (/^(pourquoi|que faire|quoi faire)|probleme|erreur|ne marche|\btrop\b|impossible|lent|pirate/.test(t)) return 'problème'
  if (ETAPE_RE.solution.test(t)) return 'solution'
  if (ETAPE_RE.probleme.test(t)) return 'problème'
  return 'pas encore conscient'
}
function intentionDe(q, lieu, src, marque) {
  if (marque) return 'navigation'
  if (src) return src
  const t = sansAccent(minuscule(q))
  if (/ vs |\bversus\b|comparatif|alternative|\bou\b.*\bou\b|meilleur|difference entre| ou /.test(t)) return 'comparaison'
  if (lieu) return 'local'
  if (/prix|tarif|devis|agence|prestataire|freelance|pas cher|commander|acheter|developpeur|web designer/.test(t)) return 'achat'
  return 'information'
}
const MOTS_INTERRO = /^(comment|combien|pourquoi|est-ce|faut-il|quel|quelle|quels|quelles|que |qu'|quand|ou |peut-on|puis-je|doit-on|dois-je|a-t-on|y a-t-il|c'est quoi|qu est)/
function typeDe(q) {
  const n = q.split(' ').length
  if (MOTS_INTERRO.test(minuscule(q)) || q.endsWith('?')) return 'question'
  return n <= 2 ? 'courte' : n <= 4 ? 'moyenne' : 'longue traîne'
}
function difficulteDe(type, lieu, q, metier) {
  const t = sansAccent(q)
  if (type === 'courte') return 'élevée'
  if (lieu) {
    if (/tours\b|angers|le mans|blois|poitiers|indre-et-loire|touraine/.test(t) && type !== 'longue traîne') return 'élevée'
    if (lieu.type === 'commune' || lieu.type === 'epci') return 'faible'
    return 'moyenne'
  }
  if (type === 'question' || type === 'longue traîne') return metier ? 'faible' : 'moyenne'
  return metier ? 'moyenne' : 'élevée'
}

/* Page cible (hors question : la page de grappe est précisée par grappes.mjs) */
const PILIERS = {
  'création site': '/services/creation-de-site-internet', refonte: '/services/refonte-de-site-internet', référencement: '/services/referencement', 'référencement local': '/services/referencement-local', 'Google Business': '/services/referencement-local',
  'e-commerce': '/services/site-ecommerce', 'logiciel de gestion': '/services/logiciel-de-gestion', 'IA et automatisation': '/services/ia-et-automatisation', 'facture électronique': '/services/facture-electronique', 'maintenance et sécurité': '/services/maintenance',
  'prix et devis': '/tarifs', 'obligations légales': '', 'visibilité et clients': '', "gestion d'entreprise": '',
}
const lienLieu = (lieu) => {
  if (!lieu) return ''
  if (lieu.type === 'ville') return `/agence-web/${lieu.slug}`
  if (lieu.type === 'departement') return `/agence-web/departement/${lieu.slug}`
  if (lieu.type === 'commune' || lieu.type === 'epci') return `/zones-intervention/${lieu.epci}`
  return '/zones-intervention'
}
function pageCible(q, theme, metier, lieu, type, marque, source) {
  if (marque) return '/'
  // Les obligations légales et la facture électronique restent des sujets transversaux, même citées avec un métier.
  const transversal = type === 'question' && /facture électronique|obligations légales/.test(theme)
  if (metier && !transversal) {
    const slug = parSlug[metier]?.existant ? metier : PROCHE[metier] ?? ''
    if (slug) return `/creation-site-internet/${slug}`
  }
  if (lieu) return lienLieu(lieu)
  if (source === 'combinaison') return PILIERS[theme] || '/services'
  return null // à résoudre par grappe (article existant ou à créer)
}

const sortie = []
for (const l of lignes.values()) {
  const marque = /stackup|matheo reboul|mathéo reboul|stack up agency/.test(sansAccent(l.requete))
  const lieu = lieuDe(l.requete)
  const metier = l.metier || metierDe(l.requete)
  const theme = l.theme || detecterTheme(l.requete)
  const type = typeDe(l.requete)
  // Les combinaisons systématiques cherchent un prestataire (avec un lieu) ou une solution (sans lieu) : jamais « pas encore conscient ».
  const etape = etapeDe(l.requete, l.etape_src || (l.source === 'combinaison' ? (lieu || /prix|devis|agence|avis/.test(l.requete) ? 'achat' : 'solution') : ''))
  const intention = intentionDe(l.requete, lieu, l.intention_src, marque)
  sortie.push({
    requete: l.requete, intention, etape, theme, metier: metier ? parSlug[metier]?.nom ?? metier : '', metier_slug: metier, lieu: lieu?.nom ?? '', lieu_type: lieu?.type ?? '', lieu_slug: lieu?.slug ?? '', epci: lieu?.epci ?? '',
    type, volume: '', difficulte: difficulteDe(type, lieu, l.requete, metier), page_cible: l.page ?? pageCible(l.requete, theme, metier, lieu, type, marque, l.source) ?? '', source: l.source,
    impressions_gsc: l.impressions_gsc ?? '', position_gsc: l.position_gsc ?? '', patron: l.patron ?? '',
  })
}

// La page des tarifs d'abord, puis par thème.
sortie.sort((a, b) => (b.impressions_gsc || 0) - (a.impressions_gsc || 0) || a.theme.localeCompare(b.theme, 'fr') || a.requete.localeCompare(b.requete, 'fr'))
fs.mkdirSync(path.join(RACINE, 'docs/seo'), { recursive: true })
const COL = ['requete', 'intention', 'etape', 'theme', 'metier', 'lieu', 'type', 'volume', 'difficulte', 'page_cible', 'source', 'impressions_gsc', 'position_gsc', 'metier_slug', 'lieu_type', 'lieu_slug', 'epci', 'patron']
fs.writeFileSync(path.join(RACINE, 'docs/seo/univers-mots-cles.csv'), csv(sortie, COL))
const compte = (k) => Object.entries(sortie.reduce((a, r) => ((a[r[k]] = (a[r[k]] ?? 0) + 1), a), {})).sort((a, b) => b[1] - a[1]).map(([x, n]) => `${x || '∅'}:${n}`).join('  ')
console.log(`${sortie.length} requêtes (GSC ${nbGsc}, questions/pas-encore-conscient ${nbQuestions} + gabarits, ${nbExtensions} formulations d'extension générées avant dédoublonnage)`)
for (const k of ['source', 'intention', 'etape', 'type', 'difficulte', 'theme']) console.log(k.padEnd(10), compte(k))
console.log('avec page cible directe :', sortie.filter((r) => r.page_cible).length, '· à résoudre par grappe :', sortie.filter((r) => !r.page_cible).length)
