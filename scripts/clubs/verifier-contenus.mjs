/**
 * VÉRIFICATEUR DES CONTENUS « CLUBS » — honnêteté (ADOC, FFT, SMS, chiffres), jetons de prix, liens, longueurs, unicité.
 * Usage : node --experimental-strip-types scripts/clubs/verifier-contenus.mjs <lot|--tous>
 * Lots : fonctionnalites-1 | fonctionnalites-2 | locales | faq | guides-1 | guides-2 | guides-3
 */
import fs from 'node:fs'
import path from 'node:path'
import matter from 'gray-matter'
import { jetons } from '../../src/lib/jetons.ts'
import { PRICING } from '../../src/data/offre-clubs/pricing.ts'

const RACINE = path.resolve(import.meta.dirname, '../..')
const FEATURES = ['site-modifiable-par-le-club', 'adhesions-reinscriptions-en-ligne', 'paiement-en-ligne-helloasso', 'import-export-adoc', 'ecole-de-tennis', 'challenge-interne-saisie-des-matchs', 'equipes-et-competitions', 'tournois-internes', 'espace-membre-et-parent', 'communication', 'ma-journee-et-automatisations', 'assistant-ia', 'reservation-de-courts', 'statistiques']
const LOCALES = ['centre-val-de-loire', 'indre-et-loire', 'cher', 'eure-et-loir', 'indre', 'loir-et-cher', 'loiret', 'padel', 'pickleball']
const GUIDES = {
  'guides-1': ['creer-le-site-de-son-club-de-tennis-guide-complet', 'reinscriptions-en-ligne-club-de-tennis', 'gerer-une-ecole-de-tennis-groupes-appel-annulations', 'exporter-importer-adherents-adoc'],
  'guides-2': ['encaisser-cotisations-en-ligne-helloasso-club', 'creer-un-challenge-interne-tennis', 'convoquer-ses-equipes-disponibilites-tennis', 'rgpd-club-de-tennis'],
  'guides-3': ['financer-le-numerique-de-son-club', 'ouvrir-section-padel-pickleball-gestion', 'choisir-logiciel-de-gestion-club-de-tennis', 'site-internet-club-sportif-erreurs-a-eviter'],
}
const TOUS_GUIDES = Object.values(GUIDES).flat()
const PAGES_FIXES = ['', '/tarifs', '/simulateur', '/site-internet', '/logiciel-de-gestion', '/demo', '/faq', '/guides']
const lotDemande = process.argv[2]
const aujourdhui = new Date().toISOString().slice(0, 10)

let erreurs = 0
const err = (qui, msg) => { erreurs++; console.log(`✗ ${qui} — ${msg}`) }
const mots = (t) => t.split(/\s+/).filter(Boolean).length

function lienValide(href) {
  const h = href.split('#')[0]
  if (/^\/contact(\?a=(appel|demo))?$/.test(h) || h === '/cgv-plateforme' || h === '/realisations/tennis-club-savigne-gizeux' || h === '/tarifs' || h === '/politique-confidentialite') return true
  const m = h.match(/^\/clubs-de-tennis(\/.*)?$/)
  if (!m) return false
  const reste = m[1] ?? ''
  if (PAGES_FIXES.includes(reste)) return true
  let x = reste.match(/^\/fonctionnalites\/([a-z0-9-]+)$/)
  if (x) return FEATURES.includes(x[1])
  x = reste.match(/^\/guides\/([a-z0-9-]+)$/)
  if (x) return TOUS_GUIDES.includes(x[1])
  x = reste.match(/^\/([a-z0-9-]+)$/)
  return !!x && LOCALES.includes(x[1])
}

const NEG = /\b(pas|non|sans|aucun|aucune|jamais|ne\b|n’|n')/i
function controleTexte(qui, brut) {
  // Les jetons doivent tous se résoudre.
  const resolu = jetons(brut)
  const reste = resolu.match(/\{\{[^}]*\}\}/g)
  if (reste) err(qui, `jeton inconnu ${reste[0]}`)
  const sansJeton = brut.replace(/\{\{[^}]*\}\}/g, '§')
  if (/\d[\d\s  .,]*\s?(€|euros?)\b/i.test(sansJeton)) err(qui, 'montant écrit en chiffres : utiliser un jeton {{club:…}}')
  if (/\d+\s?%/.test(sansJeton)) err(qui, 'pourcentage écrit en chiffres (statistique ou remise) : utiliser un jeton ou retirer')
  const interdits = [
    [/connecté(e|s)? (directement )?(à|avec) ADOC|synchronis\w+ (avec|à) ADOC|relié(e)? (directement )?à ADOC|lien (direct|automatique) avec ADOC|intégration (avec|d’) ?ADOC/i, 'ADOC : écrire « Import et export des fichiers ADOC »'],
    [/partenaire (officiel )?de la FFT|agréé(e)? (par la )?FFT|(solution|logiciel) (officiel|certifié|homologué)|officiellement reconnu|recommandé par la F\.?F\.?T/i, 'affirmation de partenariat ou d’agrément FFT'],
    [/hébergé?e?s? en (France|Europe)|hébergement en (France|Europe)|données? en France/i, 'localisation des données'],
    [/Valéry|depuis 2018/i, 'mention interdite'],
    [/Kalisport|AssoConnect|Sportsregions|Sport ?n ?Co|Clubspot|Anybuddy|Balle ?Jaune|HelloAsso Pro/i, 'nom de concurrent'],
    [/\d+\s?(clubs?|licenciés?|adhérents?)\b(?! ?(?:du|de la|au|maximum|ou))/i, 'chiffre de clubs ou de licenciés (aucune statistique sans source)'],
    [/(en|sous|dans|de) \d+\s?(jours?(?! ouvrés)|semaines?|mois)\b/i, 'durée chiffrée'],
    [/garanti(e|s)? (de|le|la|votre|des) (positionnement|résultat|délai|classement)|première page de Google|N° ?1/i, 'promesse de résultat'],
  ]
  for (const [re, msg] of interdits) { const m = sansJeton.match(re); if (m) err(qui, `${msg} (« ${m[0]} »)`) }
  for (const phrase of sansJeton.split(/(?<=[.!?\n])\s+/)) {
    if (/\bSMS\b/.test(phrase) && !NEG.test(phrase)) err(qui, `SMS annoncé : « ${phrase.slice(0, 80)} »`)
    if (/(codes?|serrures?|badges?|accès physiques?).{0,40}(courts?|portail)|(courts?).{0,40}(codes?|serrures?|accès physique)/i.test(phrase) && !NEG.test(phrase)) err(qui, `accès physiques aux courts annoncés : « ${phrase.slice(0, 80)} »`)
  }
  for (const m of brut.matchAll(/\]\(([^)\s]+)\)/g)) if (!lienValide(m[1])) err(qui, `lien interne inexistant ${m[1]}`)
}

const textesDe = (o) => (typeof o === 'string' ? [o] : Array.isArray(o) ? o.flatMap(textesDe) : o && typeof o === 'object' ? Object.values(o).flatMap(textesDe) : [])
const shingles = (t) => { const w = t.toLowerCase().replace(/[^a-zà-ÿ0-9 ]/g, ' ').split(/\s+/).filter(Boolean); const s = new Set(); for (let i = 0; i + 5 <= w.length; i++) s.add(w.slice(i, i + 5).join(' ')); return s }
const jac = (a, b) => { let i = 0; for (const x of a) if (b.has(x)) i++; return i / (a.size + b.size - i || 1) }

async function fonctionnalites(lot, attendus) {
  const mod = await import(`../../src/data/offre-clubs/${lot}.ts`)
  const liste = mod[lot.toUpperCase().replace('-', '_')]
  if (!Array.isArray(liste)) return err(lot, `export ${lot.toUpperCase().replace('-', '_')} absent`)
  for (const slug of attendus) if (!liste.find((f) => f.slug === slug)) err(lot, `fonctionnalité absente : ${slug}`)
  for (const f of liste) {
    const q = `${f.slug}`
    if (!attendus.includes(f.slug)) err(q, 'slug hors lot')
    if (!['site', 'logiciel', 'site-et-logiciel'].includes(f.formule)) err(q, 'formule invalide')
    if (f.optionId && !PRICING.options.find((o) => o.id === f.optionId)) err(q, 'optionId inconnu')
    if (!['site', 'bureau', 'roles'].includes(f.ecran)) err(q, 'écran de démo invalide')
    if (jetons(f.titleSeo).length > 60 || f.titleSeo.length < 25) err(q, `titleSeo ${jetons(f.titleSeo).length} caractères (25-60)`)
    const d = jetons(f.descriptionSeo).length
    if (d < 120 || d > 155) err(q, `descriptionSeo ${d} caractères (120-155)`)
    if (!f.etapes || f.etapes.length < 4 || f.etapes.length > 6) err(q, 'étapes : 4 à 6')
    if (!f.apercu || f.apercu.lignes.length < 4 || f.apercu.lignes.length > 6) err(q, 'aperçu : 4 à 6 lignes')
    if (!f.faq || f.faq.length < 4) err(q, 'FAQ : 4 questions au moins')
    if (!f.sections || f.sections.length < 3 || f.sections.length > 5) err(q, 'sections : 3 à 5')
    const corps = mots(textesDe(f.sections).join(' '))
    if (corps < 600) err(q, `sections ${corps} mots (600 au moins)`)
    if (!f.voisines || f.voisines.length < 2 || f.voisines.some((v) => !FEATURES.includes(v) || v === f.slug)) err(q, 'voisines : 2 à 4 slugs valides, autres que la page')
    if (!f.mots || f.mots.length < 5) err(q, 'mots : 5 requêtes au moins')
    if (!/^\d{4}-\d\d-\d\d$/.test(f.maj) || f.maj > aujourdhui) err(q, 'maj invalide ou future')
    for (const s of f.sections) if (!/^[a-z0-9-]+$/.test(s.id)) err(q, `ancre invalide ${s.id}`)
    const tout = textesDe({ ...f, mots: undefined }).join('\n')
    controleTexte(q, tout)
    const liens = [...tout.matchAll(/\]\(\/[^)]*\)/g)].length
    if (liens < 4) err(q, `${liens} lien(s) interne(s) dans le texte (4 au moins)`)
    console.log(`  ${f.slug} : ${corps} mots, ${liens} liens`)
  }
}

async function locales() {
  const mod = await import('../../src/data/offre-clubs/locales.ts')
  const liste = mod.PAGES_LOCALES
  if (!Array.isArray(liste)) return err('locales', 'export PAGES_LOCALES absent')
  const mini = { 'indre-et-loire': 1000, 'centre-val-de-loire': 900 }
  const formes = new Map()
  for (const slug of LOCALES) if (!liste.find((p) => p.slug === slug)) err('locales', `page absente : ${slug}`)
  for (const p of liste) {
    const q = p.slug
    if (!LOCALES.includes(p.slug)) err(q, 'slug inattendu')
    const corps = mots(textesDe(p.sections).join(' '))
    if (corps < (mini[p.slug] ?? 700)) err(q, `${corps} mots (${mini[p.slug] ?? 700} au moins)`)
    if (jetons(p.titleSeo).length > 60 || p.titleSeo.length < 25) err(q, `titleSeo ${jetons(p.titleSeo).length} caractères`)
    const d = jetons(p.descriptionSeo).length
    if (d < 120 || d > 155) err(q, `descriptionSeo ${d} caractères`)
    if (p.type === 'departement' && (!p.communes || p.communes.length < (p.slug === 'indre-et-loire' ? 12 : 6))) err(q, 'communes principales insuffisantes')
    if (!p.faq || p.faq.length < 4) err(q, 'FAQ : 4 questions au moins')
    if (!p.voisines || p.voisines.length < 2 || p.voisines.some((v) => !LOCALES.includes(v) || v === p.slug)) err(q, 'voisines invalides')
    if (!/^\d{4}-\d\d-\d\d$/.test(p.maj) || p.maj > aujourdhui) err(q, 'maj invalide ou future')
    const tout = textesDe(p).join('\n')
    controleTexte(q, tout)
    if (p.slug === 'indre-et-loire' && !/Savigné-Gizeux|TCSG/.test(tout)) err(q, 'la référence TCSG doit apparaître')
    if (p.slug === 'indre-et-loire' && !/présentiel/.test(tout)) err(q, 'le rendez-vous en présentiel doit apparaître')
    formes.set(p.slug, shingles(textesDe(p.sections).join(' ')))
    console.log(`  ${p.slug} : ${corps} mots`)
  }
  const cles = [...formes.keys()]
  for (let i = 0; i < cles.length; i++) for (let j = i + 1; j < cles.length; j++) { const s = jac(formes.get(cles[i]), formes.get(cles[j])); if (s > 0.12) err(`${cles[i]} / ${cles[j]}`, `contenu trop proche (${Math.round(s * 100)} % de segments communs, 12 % maximum)`) }
}

async function faq() {
  const mod = await import('../../src/data/offre-clubs/faq.ts')
  const liste = mod.FAQ_CLUBS
  if (!Array.isArray(liste)) return err('faq', 'export FAQ_CLUBS absent')
  const themes = ['offre', 'prix', 'adoc-fft', 'donnees', 'mise-en-place', 'fonctionnement', 'padel-pickleball']
  if (liste.length < 40) err('faq', `${liste.length} questions (40 au moins)`)
  const ids = new Set()
  for (const x of liste) {
    if (ids.has(x.id)) err(x.id, 'identifiant en double'); ids.add(x.id)
    if (!themes.includes(x.theme)) err(x.id, 'thème invalide')
    if (mots(x.a) < 25) err(x.id, 'réponse trop courte (25 mots au moins)')
    if (!x.q.trim().endsWith('?')) err(x.id, 'la question doit finir par ?')
    controleTexte(x.id, `${x.q}\n${x.a}`)
  }
  for (const t of themes) if (liste.filter((x) => x.theme === t).length < 3) err('faq', `thème « ${t} » : 3 questions au moins`)
  const courte = mod.FAQ_COURTE_IDS
  if (!Array.isArray(courte) || courte.length !== 8 || courte.some((i) => !ids.has(i))) err('faq', 'FAQ_COURTE_IDS : 8 identifiants valides attendus')
  console.log(`  ${liste.length} questions`)
}

function guides(lot) {
  const dossier = path.join(RACINE, 'src/content/clubs-guides')
  for (const slug of GUIDES[lot]) {
    const f = path.join(dossier, `${slug}.md`)
    if (!fs.existsSync(f)) { err(slug, 'fichier absent'); continue }
    const { data, content } = matter(fs.readFileSync(f, 'utf8'))
    const q = slug
    for (const c of ['title', 'seoTitle', 'excerpt', 'date', 'updated', 'readTime', 'keywords']) if (data[c] === undefined) err(q, `front matter : ${c} manquant`)
    const st = jetons(String(data.seoTitle ?? ''))
    if (st.length < 30 || st.length > 60) err(q, `seoTitle ${st.length} caractères (30-60)`)
    const ex = jetons(String(data.excerpt ?? '')).length
    if (ex < 125 || ex > 160) err(q, `excerpt ${ex} caractères (125-160)`)
    if (!Array.isArray(data.keywords) || data.keywords.length < 5) err(q, 'keywords : 5 au moins')
    if (String(data.date) > aujourdhui || String(data.updated) > aujourdhui) err(q, 'date future')
    const n = mots(content)
    if (n < 1100) err(q, `${n} mots (1 100 au moins)`)
    if ((content.match(/^## /gm) ?? []).length < 5) err(q, '5 h2 au moins')
    if (/^# /m.test(content)) err(q, 'pas de h1 dans le corps (le titre vient du front matter)')
    const liens = [...content.matchAll(/\]\(\/[^)]*\)/g)].length
    if (liens < 5) err(q, `${liens} liens internes (5 au moins)`)
    if (!/\]\(\/clubs-de-tennis\/(simulateur|tarifs)\)/.test(content)) err(q, 'un lien vers le simulateur ou les tarifs est attendu')
    if ((content.match(/^\*\*[^*\n]+\?\*\*/gm) ?? []).length < 3) err(q, 'FAQ finale : 3 questions en gras (**Question ?**) au moins')
    controleTexte(q, `${data.title}\n${data.excerpt}\n${content}`)
    console.log(`  ${slug} : ${n} mots, ${liens} liens`)
  }
}

const lots = lotDemande === '--tous' ? ['fonctionnalites-1', 'fonctionnalites-2', 'locales', 'faq', 'guides-1', 'guides-2', 'guides-3'] : [lotDemande]
for (const lot of lots) {
  console.log(`# ${lot}`)
  if (lot === 'fonctionnalites-1') await fonctionnalites('fonctionnalites-1', FEATURES.slice(0, 7))
  else if (lot === 'fonctionnalites-2') await fonctionnalites('fonctionnalites-2', FEATURES.slice(7))
  else if (lot === 'locales') await locales()
  else if (lot === 'faq') await faq()
  else if (GUIDES[lot]) guides(lot)
  else err(lot, 'lot inconnu')
}
console.log(erreurs ? `\n${erreurs} manquement(s)` : '\n✓ tout est conforme')
process.exit(erreurs ? 1 : 0)
