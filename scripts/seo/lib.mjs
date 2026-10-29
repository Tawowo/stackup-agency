/**
 * Outils communs de l'univers de mots-clés : chargement des lexiques, normalisation sémantique, détection du métier et du lieu.
 */
import fs from 'node:fs'
import path from 'node:path'
import matter from 'gray-matter'

export const RACINE = path.resolve(import.meta.dirname, '../..')
const lex = (f) => path.join(RACINE, 'scripts/seo/lexique', f)

export const sansAccent = (s) => s.normalize('NFD').replace(/[̀-ͯ]/g, '')
export const minuscule = (s) => s.toLowerCase().replace(/[’']/g, "'").replace(/\s+/g, ' ').trim()
export const slugifier = (s) =>
  sansAccent(s.toLowerCase())
    .replace(/[’']/g, ' ')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')

/* ───────────── Métiers ───────────── */
export function chargerMetiers() {
  return fs
    .readFileSync(lex('metiers-150.txt'), 'utf8')
    .split('\n')
    .filter((l) => l && !l.startsWith('#'))
    .map((l) => {
      const [slug, nom, article, groupe, existant] = l.split('|')
      return { slug, nom, article, groupe, existant: existant === '1' }
    })
}

/** Page métier existante la plus proche pour les métiers sans page propre. */
export const PROCHE = {
  plaquiste: 'peintre-decorateur', 'installateur-panneaux-solaires': 'electricien', 'installateur-pompe-a-chaleur': 'chauffagiste-climatisation', zingueur: 'couvreur-charpentier', etancheur: 'couvreur-charpentier',
  metallier: 'serrurier-depannage', 'ferronnier-art': 'menuisier-ebeniste', 'tailleur-de-pierre': 'macon-renovateur', 'installateur-volets-roulants': 'menuisier-ebeniste', 'isolation-thermique': 'macon-renovateur', domoticien: 'electricien', antenniste: 'electricien',
  'geometre-expert': 'architecte', 'bureau-etudes': 'architecte', carrossier: 'garage-automobile', 'mecanicien-moto': 'garage-automobile', 'centre-controle-technique': 'garage-automobile', demenageur: 'agence-evenementielle',
  'entreprise-nettoyage': 'agence-evenementielle', pressing: 'boutique-mode', cordonnier: 'boutique-mode', 'couturiere-retoucheuse': 'boutique-mode', tapissier: 'menuisier-ebeniste', luthier: 'menuisier-ebeniste', imprimeur: 'photographe',
  graphiste: 'photographe', 'consultant-independant': 'expert-comptable', 'coach-professionnel': 'organisme-formation', 'formateur-independant': 'organisme-formation', traducteur: 'expert-comptable', 'redacteur-web': 'photographe',
  'community-manager': 'photographe', 'wedding-planner': 'agence-evenementielle', 'dj-animateur': 'agence-evenementielle', 'location-materiel': 'agence-evenementielle', 'location-salle': 'gite-location-saisonniere',
  'infirmier-liberal': 'kinesitherapeute', 'sage-femme': 'kinesitherapeute', orthophoniste: 'kinesitherapeute', podologue: 'kinesitherapeute', dieteticien: 'naturopathe', acupuncteur: 'osteopathe', 'coach-sportif': 'salle-de-sport',
  'praticien-bien-etre': 'sophrologue', barbier: 'salon-coiffure', onglerie: 'institut-beaute', 'coiffeur-domicile': 'salon-coiffure', 'taxi-vtc': 'garage-automobile', ambulancier: 'cabinet-medical', 'aide-a-domicile': 'organisme-formation',
  'micro-creche': 'organisme-formation', elagueur: 'paysagiste-jardinier', apiculteur: 'epicerie-fine', viticulteur: 'cave-vins-spiritueux', 'brasseur-artisanal': 'cave-vins-spiritueux', 'producteur-vente-ferme': 'epicerie-fine', maraicher: 'primeur',
  'magasin-bio': 'epicerie-fine', 'chambre-d-hotes': 'gite-location-saisonniere', 'hotel-independant': 'gite-location-saisonniere', 'guide-touristique': 'gite-location-saisonniere', 'loueur-velos': 'camping', 'centre-equestre': 'camping',
  'antiquaire-brocanteur': 'boutique-decoration', 'galerie-art': 'boutique-decoration', 'potier-ceramiste': 'boutique-decoration', 'createur-bijoux': 'bijouterie-horlogerie', 'createur-mode': 'boutique-mode', 'pompes-funebres': 'notaire',
  'syndic-copropriete': 'agence-immobiliere', 'conseiller-patrimoine': 'courtier-credit', 'agent-assurance': 'courtier-credit', 'commissaire-justice': 'notaire', 'expert-automobile': 'garage-automobile',
}

/** Formes sous lesquelles un métier est cité dans une requête (pour classer les requêtes libres). */
const SYN = {
  videaste: ['vidéaste', 'videaste'], 'agence-immobiliere': ['agent immobilier', 'agence immobilière', 'immobilier'], restaurant: ['restaurateur', 'restaurant', 'resto'], pizzeria: ['pizzeria', 'pizzaïolo', 'pizzaiolo'],
  'boulangerie-patisserie': ['boulanger', 'boulangerie', 'pâtissier', 'patissier', 'pâtisserie', 'patisserie'], plombier: ['plombier', 'plomberie'], electricien: ['électricien', 'electricien', 'électricité'],
  'salon-coiffure': ['coiffeur', 'coiffeuse', 'salon de coiffure', 'coiffure'], avocat: ['avocat'], 'expert-comptable': ['expert-comptable', 'expert comptable', 'comptable'], 'garage-automobile': ['garagiste', 'garage'],
  'chauffagiste-climatisation': ['chauffagiste', 'climatisation', 'climaticien'], 'paysagiste-jardinier': ['paysagiste', 'jardinier'], osteopathe: ['ostéopathe', 'osteopathe'], 'institut-beaute': ['esthéticienne', 'estheticienne', 'institut de beauté', 'institut de beaute'],
  photographe: ['photographe'], fleuriste: ['fleuriste'], 'gite-location-saisonniere': ['gîte', 'gite', 'location saisonnière', 'location saisonniere'], 'food-truck': ['food truck', 'foodtruck'], 'brasserie-bar': ['bar', 'brasserie'],
  'traiteur-evenementiel': ['traiteur'], 'boucherie-charcuterie': ['boucher', 'boucherie', 'charcutier'], chocolatier: ['chocolatier'], glacier: ['glacier'], 'epicerie-fine': ['épicerie', 'epicerie', 'épicier'], 'cave-vins-spiritueux': ['caviste', 'cave à vin'],
  fromager: ['fromager', 'fromagerie'], primeur: ['primeur'], poissonnier: ['poissonnier', 'poissonnerie'], 'librairie-papeterie': ['libraire', 'librairie'], 'tabac-presse': ['buraliste', 'tabac'], opticien: ['opticien'], 'bijouterie-horlogerie': ['bijoutier', 'bijouterie', 'horloger'],
  'macon-renovateur': ['maçon', 'macon', 'maçonnerie'], 'couvreur-charpentier': ['couvreur', 'charpentier', 'toiture'], 'menuisier-ebeniste': ['menuisier', 'ébéniste', 'ebeniste', 'menuiserie'], 'peintre-decorateur': ['peintre en bâtiment', 'peintre', 'décorateur'],
  'carreleur-sol': ['carreleur'], 'serrurier-depannage': ['serrurier', 'serrurerie'], cuisiniste: ['cuisiniste'], pisciniste: ['pisciniste'], vitrier: ['vitrier'], ramoneur: ['ramoneur'], facadier: ['façadier', 'facadier'], terrassier: ['terrassier'],
  'cabinet-medical': ['médecin', 'medecin', 'cabinet médical'], kinesitherapeute: ['kiné', 'kine', 'kinésithérapeute', 'kinesitherapeute'], dentiste: ['dentiste', 'cabinet dentaire'], 'pharmacie-parapharmacie': ['pharmacien', 'pharmacie'], veterinaire: ['vétérinaire', 'veterinaire'],
  psychologue: ['psychologue'], sophrologue: ['sophrologue'], naturopathe: ['naturopathe'], 'salle-de-sport': ['salle de sport'], notaire: ['notaire'], architecte: ['architecte'], 'courtier-credit': ['courtier'], 'diagnostiqueur-immobilier': ['diagnostiqueur'],
  'organisme-formation': ['organisme de formation'], 'auto-ecole': ['auto-école', 'auto ecole', 'autoécole'], camping: ['camping'], tatoueur: ['tatoueur', 'tatoueuse'], toiletteur: ['toiletteur', 'toilettage'], plaquiste: ['plaquiste'], 'infirmier-liberal': ['infirmier', 'infirmière', 'infirmiere'],
  'coach-sportif': ['coach sportif'], barbier: ['barbier'], onglerie: ['onglerie', 'prothésiste ongulaire'], graphiste: ['graphiste'], 'community-manager': ['community manager'], 'taxi-vtc': ['taxi', 'vtc'], 'chambre-d-hotes': ["chambre d'hôtes", "chambres d'hôtes"],
  viticulteur: ['viticulteur', 'vigneron'], apiculteur: ['apiculteur'], maraicher: ['maraîcher', 'maraicher'], 'magasin-bio': ['magasin bio'], 'pompes-funebres': ['pompes funèbres'], 'agent-assurance': ["agent d'assurance", 'assureur'], 'wedding-planner': ['wedding planner'],
  'dj-animateur': ['dj'], 'entreprise-nettoyage': ['entreprise de nettoyage'], demenageur: ['déménageur', 'demenageur'], carrossier: ['carrossier'], 'mecanicien-moto': ['mécanicien moto'], elagueur: ['élagueur', 'elagueur'], imprimeur: ['imprimeur'],
  'formateur-independant': ['formateur'], 'coach-professionnel': ['coach'], 'consultant-independant': ['consultant'], traducteur: ['traducteur'], dieteticien: ['diététicien', 'dieteticien', 'nutritionniste'], podologue: ['podologue'], orthophoniste: ['orthophoniste'],
  'sage-femme': ['sage-femme'], 'location-salle': ['salle de réception'], pressing: ['pressing'], cordonnier: ['cordonnier'], luthier: ['luthier'], 'potier-ceramiste': ['céramiste', 'ceramiste', 'potier'], 'syndic-copropriete': ['syndic'], 'commissaire-justice': ['huissier', 'commissaire de justice'],
}

export function detecteurMetier(metiers) {
  const regles = []
  for (const m of metiers) {
    const formes = new Set([...(SYN[m.slug] ?? []), m.nom])
    for (const f of formes) regles.push({ slug: m.slug, motif: sansAccent(minuscule(f)) })
  }
  regles.sort((a, b) => b.motif.length - a.motif.length)
  return (q) => {
    const t = ' ' + sansAccent(minuscule(q)).replace(/[^a-z0-9' -]/g, ' ') + ' '
    for (const r of regles) {
      const i = t.indexOf(' ' + r.motif)
      if (i >= 0) {
        const fin = t[i + 1 + r.motif.length]
        if (fin === ' ' || fin === 's' || fin === "'" || fin === '-' || fin === 'e' || fin === 'x') return r.slug
      }
    }
    return ''
  }
}

/* ───────────── Lieux ───────────── */
export const EPCI = [
  { nom: 'Tours Métropole Val de Loire', court: 'Tours Métropole', slug: 'tours-metropole-val-de-loire', source: 'Tours Métropole Val de Loire' },
  { nom: 'Communauté de communes Touraine Vallée de l’Indre', court: 'Touraine Vallée de l’Indre', slug: 'touraine-vallee-de-l-indre', source: 'CC Touraine Vallée de l’Indre' },
  { nom: 'Communauté de communes Loches Sud Touraine', court: 'Loches Sud Touraine', slug: 'loches-sud-touraine', source: 'CC Loches Sud Touraine' },
  { nom: 'Communauté de communes Touraine-Est Vallées', court: 'Touraine-Est Vallées', slug: 'touraine-est-vallees', source: 'CC Touraine-Est Vallées' },
  { nom: 'Communauté de communes Touraine Ouest Val de Loire', court: 'Touraine Ouest Val de Loire', slug: 'touraine-ouest-val-de-loire', source: 'CC Touraine Ouest Val de Loire' },
  { nom: 'Communauté de communes du Val d’Amboise', court: 'Val d’Amboise', slug: 'val-d-amboise', source: 'CC du Val d’Amboise' },
  { nom: 'Communauté de communes Touraine Val de Vienne', court: 'Touraine Val de Vienne', slug: 'touraine-val-de-vienne', source: 'CC Touraine Val de Vienne' },
  { nom: 'Communauté de communes Chinon, Vienne et Loire', court: 'Chinon Vienne et Loire', slug: 'chinon-vienne-et-loire', source: 'CC Chinon, Vienne et Loire' },
  { nom: 'Communauté de communes Gâtine et Choisilles – Pays de Racan', court: 'Gâtine-Racan', slug: 'gatine-racan', source: 'CC de Gâtine-Racan' },
  { nom: 'Communauté de communes Autour de Chenonceaux – Bléré Val de Cher', court: 'Bléré Val de Cher', slug: 'blere-val-de-cher', source: 'CC Autour de Chenonceaux Bléré-Val de Cher' },
  { nom: 'Communauté de communes du Castelrenaudais', court: 'Castelrenaudais', slug: 'castelrenaudais', source: 'CC du Castelrenaudais' },
]

export function chargerCommunes37() {
  const t = fs.readFileSync(path.join(RACINE, 'src/data/communes-groupes.ts'), 'utf8')
  const debut = t.indexOf("'indre-et-loire': [")
  const fin = t.indexOf('\n  ],', debut)
  // Littéral de tableau TypeScript → JSON (clés non quotées, apostrophes simples, virgules finales), sans évaluer de code.
  const brut = t.slice(debut + "'indre-et-loire': ".length, fin + 4).replace(/(\bepci|\bcommunes):/g, '"$1":').replace(/'/g, '"').replace(/,(\s*[\]}])/g, '$1').replace(/,\s*$/, '')
  const tableau = JSON.parse(brut)
  const sortie = []
  for (const g of tableau) {
    const e = EPCI.find((x) => x.source === g.epci)
    if (!e) throw new Error('EPCI inconnue : ' + g.epci)
    for (const c of g.communes) sortie.push({ nom: c, epci: e.slug, slug: slugifier(c) })
  }
  return sortie
}

/** Villes ayant (ou devant avoir) leur page « agence web ». */
export const VILLES_PAGES = [
  ['tours', 'Tours'], ['joue-les-tours', 'Joué-lès-Tours'], ['saint-cyr-sur-loire', 'Saint-Cyr-sur-Loire'], ['saint-pierre-des-corps', 'Saint-Pierre-des-Corps'], ['chambray-les-tours', 'Chambray-lès-Tours'],
  ['amboise', 'Amboise'], ['chinon', 'Chinon'], ['loches', 'Loches'], ['langeais', 'Langeais'], ['bourgueil', 'Bourgueil'], ['chateau-la-valliere', 'Château-la-Vallière'], ['saumur', 'Saumur'], ['angers', 'Angers'],
  ['le-mans', 'Le Mans'], ['blois', 'Blois'], ['chatellerault', 'Châtellerault'], ['vendome', 'Vendôme'],
].map(([slug, nom]) => ({ slug, nom }))

export const DEPARTEMENTS = [
  { slug: 'indre-et-loire', nom: 'Indre-et-Loire', alias: ['37'] }, { slug: 'maine-et-loire', nom: 'Maine-et-Loire', alias: ['49'] }, { slug: 'sarthe', nom: 'Sarthe', alias: ['72'] },
  { slug: 'loir-et-cher', nom: 'Loir-et-Cher', alias: ['41'] }, { slug: 'vienne', nom: 'Vienne', alias: ['86'] }, { slug: 'indre', nom: 'Indre', alias: ['36'] },
]
/** Villes hors zone d'intervention sur place : les requêtes qui les citent mènent à la page des zones (visio possible). */
export const HORS_ZONE = ['Chartres', 'Dreux', 'Orléans', 'Bourges', 'Vierzon', 'Nantes', 'Laval', 'Caen', 'Rouen', 'Évreux', 'Alençon', 'Lisieux', 'Rambouillet', 'Anet', 'Vernouillet', 'Nogent-le-Rotrou', 'Châteaudun', 'Paris', 'Lyon', 'Marseille', 'Bordeaux', 'Toulouse', 'Lille', 'Strasbourg', 'Montpellier', 'Nice', 'Rennes', 'Nancy', 'Dijon', 'Grenoble', 'Reims', 'Le Havre', 'Brest', 'Limoges', 'Clermont-Ferrand', 'Perpignan', 'Metz', 'Besançon', 'Orléans', 'Auxerre', 'Nevers', 'Moulins', 'Guéret', 'Alençon', 'Cholet', 'La Roche-sur-Yon', 'Niort', 'Saint-Nazaire', 'Versailles', 'Rueil-Malmaison', 'Évry', 'Pontoise', 'Cergy']
export const AUTRES_LIEUX = ['La Flèche', 'Poitiers', 'Châteauroux', 'Orléans', 'Cholet', 'Château-du-Loir', 'Azay-le-Rideau', 'Sablé-sur-Sarthe']

export function detecteurLieu(communes) {
  const regles = []
  const ajouter = (motif, valeur) => regles.push({ motif: sansAccent(minuscule(motif)), valeur })
  for (const v of VILLES_PAGES) ajouter(v.nom, { type: 'ville', slug: v.slug, nom: v.nom })
  for (const c of communes) if (!VILLES_PAGES.some((v) => v.slug === c.slug)) ajouter(c.nom, { type: 'commune', slug: c.slug, nom: c.nom, epci: c.epci })
  for (const c of communes) if (VILLES_PAGES.some((v) => v.slug === c.slug)) {
    const v = VILLES_PAGES.find((x) => x.slug === c.slug)
    const idx = regles.findIndex((r) => r.valeur.slug === v.slug)
    regles[idx].valeur.epci = c.epci
  }
  for (const d of DEPARTEMENTS) {
    ajouter(d.nom, { type: 'departement', slug: d.slug, nom: d.nom })
    ajouter('en ' + d.nom, { type: 'departement', slug: d.slug, nom: d.nom })
  }
  for (const h of HORS_ZONE) ajouter(h, { type: 'hors-zone', slug: slugifier(h), nom: h })
  ajouter('touraine', { type: 'region', slug: 'touraine', nom: 'Touraine' })
  ajouter('centre-val de loire', { type: 'region', slug: 'centre-val-de-loire', nom: 'Centre-Val de Loire' })
  ajouter('pays de la loire', { type: 'region', slug: 'pays-de-la-loire', nom: 'Pays de la Loire' })
  for (const e of EPCI) ajouter(e.court, { type: 'epci', slug: e.slug, nom: e.court, epci: e.slug })
  regles.sort((a, b) => b.motif.length - a.motif.length)
  return (q) => {
    const t = ' ' + sansAccent(minuscule(q)).replace(/[^a-z0-9' -]/g, ' ') + ' '
    for (const r of regles) {
      const i = t.indexOf(' ' + r.motif + ' ')
      if (i >= 0) return r.valeur
    }
    return null
  }
}

/* ───────────── Normalisation sémantique ───────────── */
const STOP = new Set(
  'le la les un une des du de d l et ou a au aux en pour sur par avec sans dans mon ma mes son sa ses ce cet cette ces qui que quoi est sont ai je tu il elle on nous vous ils se s y ne quand quel quelle quels quelles comment pourquoi faut falloir peut puis dois doit faire fait faites votre vos notre nos leur leurs plus tout tous toute toutes si c qu n m t j mon ton très tres pas'.split(' '),
)
const SYNONYMES = [
  [/pas cher|bon march[eé]|low cost|abordable|[eé]conomique|moins cher/g, ' economique '],
  [/combien (co[uû]te|ca co[uû]te|cela co[uû]te|coute)|co[uû]ts?\b|tarifs?|prix|budget|montant|combien/g, ' prix '],
  [/cr[eé]er|cr[eé]ation|r[eé]aliser|fabriquer|construire|monter|d[eé]velopper|concevoir|mettre en place|lancer/g, ' creer '],
  [/site (internet|web)|siteweb|site vitrine|site pro(fessionnel)?|\bsite\b/g, ' site '],
  [/refonte|refaire|moderniser|relooker|redesign|r[eé]nover|rafra[iî]chir/g, ' refonte '],
  [/r[eé]f[eé]rencement|r[eé]f[eé]rencer|referencement|\bseo\b|appara[iî]tre|positionner|classement|bien class[eé]|1[eè]re page|premi[eè]re page|visibilit[eé]|visible|trouv[eé]/g, ' seo '],
  [/agence|prestataire|soci[eé]t[eé]|freelance|ind[eé]pendant|d[eé]veloppeur|web ?designer|webmaster|professionnel du web/g, ' prestataire '],
  [/logiciel|application|appli\b|\bapp\b|outil|plateforme|solution|programme/g, ' logiciel '],
  [/g[eé]n[eé]rateur|mod[eè]le|template|exemple|trame|gabarit/g, ' modele '],
  [/gratuit(ement)?|free/g, ' gratuit '],
  [/avis|retours? d'exp[eé]rience|t[eé]moignages?/g, ' avis '],
  [/fiche google|google business( profile)?|google my business|gmb|google maps|google map/g, ' fichegoogle '],
  [/facture [eé]lectronique|facturation [eé]lectronique|e-?facture|factur-?x/g, ' facturelec '],
  [/obligatoire|obligation|l[eé]gal|loi\b|r[eé]glementation/g, ' obligation '],
  [/pirat[eé]|hack[eé]|malware|virus|infect[eé]/g, ' pirate '],
  [/auto-?entrepreneur|micro-?entrepreneur|micro-?entreprise|\bei\b|ind[eé]pendant/g, ' microentreprise '],
  [/clients?|client[eè]le|prospects?/g, ' client '],
]
export function jetons(q) {
  let t = ' ' + sansAccent(minuscule(q)).replace(/[’]/g, "'") + ' '
  const refs = SYNONYMES.map(([re, rep]) => [new RegExp(sansAccent(re.source), re.flags), rep])
  for (const [re, rep] of refs) t = t.replace(re, rep)
  const sortie = []
  for (let w of t.replace(/[^a-z0-9 ]/g, ' ').split(' ')) {
    if (!w || STOP.has(w)) continue
    if (w.length > 3 && /[sx]$/.test(w) && !/(ss|us)$/.test(w)) w = w.slice(0, -1)
    if (w.length < 3 && !['ia', 'ai', 'ei'].includes(w)) continue
    sortie.push(w)
  }
  return [...new Set(sortie)]
}
export const jaccard = (a, b) => {
  let i = 0
  for (const x of a) if (b.has(x)) i++
  return i / (a.size + b.size - i || 1)
}

/* ───────────── Articles existants ───────────── */
export function chargerArticles() {
  const dossier = path.join(RACINE, 'src/content/blog')
  return fs
    .readdirSync(dossier)
    .filter((f) => f.endsWith('.md'))
    .map((f) => {
      const brut = fs.readFileSync(path.join(dossier, f), 'utf8')
      const { data, content } = matter(brut)
      const mots = content.split(/\s+/).filter(Boolean).length
      return { slug: f.slice(0, -3), titre: String(data.title ?? ''), extrait: String(data.excerpt ?? ''), categorie: String(data.category ?? ''), motsCles: Array.isArray(data.keywords) ? data.keywords : [], publieLe: data.publishAt ? String(data.publishAt) : '', date: String(data.date ?? ''), mots }
    })
}

/* ───────────── CSV ───────────── */
export const csv = (lignes, colonnes) => {
  const ech = (v) => {
    const s = v === undefined || v === null ? '' : String(v)
    return /[",\n;]/.test(s) ? '"' + s.replace(/"/g, '""') + '"' : s
  }
  return colonnes.join(',') + '\n' + lignes.map((l) => colonnes.map((c) => ech(l[c])).join(',')).join('\n') + '\n'
}
export function lireCsv(texte) {
  const lignes = []
  let champ = '', ligne = [], guillemets = false
  for (let i = 0; i < texte.length; i++) {
    const c = texte[i]
    if (guillemets) {
      if (c === '"') { if (texte[i + 1] === '"') { champ += '"'; i++ } else guillemets = false } else champ += c
    } else if (c === '"') guillemets = true
    else if (c === ',') { ligne.push(champ); champ = '' }
    else if (c === '\n') { ligne.push(champ); lignes.push(ligne); ligne = []; champ = '' }
    else if (c !== '\r') champ += c
  }
  if (champ || ligne.length) { ligne.push(champ); lignes.push(ligne) }
  return lignes
}
