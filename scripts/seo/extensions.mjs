/**
 * EXTENSIONS DE L'UNIVERS — formulations supplémentaires, par familles, ajoutées à docs/seo/univers-mots-cles.csv.
 *
 * Honnêteté : ce sont des FORMULATIONS PLAUSIBLES (combinaisons de besoins, de métiers, de lieux, de questions-types) et
 * non des requêtes mesurées. Elles servent de carte de couverture : quelle page répond à quoi, et où il manque une page.
 * Elles ne donnent jamais lieu à une page par combinaison (règle C.0 : une page excellente par intention).
 *
 * Familles : mots courts (têtes de requête), lexique (c'est quoi X), service × modificateur, métier × besoin,
 * commune × service, métier × commune, questions-racines × cadrage, comparatifs d'outils, obligations × métier,
 * problèmes × métier.
 */
import fs from 'node:fs'
import path from 'node:path'

const RACINE = path.resolve(import.meta.dirname, '../..')
const termes = JSON.parse(fs.readFileSync(path.join(RACINE, 'scripts/seo/lexique/termes.json'), 'utf8'))

/** Têtes de requête (1 à 3 mots) : [formulation, thème, page cible]. */
const TETES = [
  ['site web', 'création site', '/services/creation-de-site-internet'], ['site internet', 'création site', '/services/creation-de-site-internet'], ['création site', 'création site', '/services/creation-de-site-internet'],
  ['création de site', 'création site', '/services/creation-de-site-internet'], ['créer un site', 'création site', '/services/creation-de-site-internet'], ['site vitrine', 'création site', '/services/site-vitrine'],
  ['site pro', 'création site', '/services/creation-de-site-internet'], ['site professionnel', 'création site', '/services/creation-de-site-internet'], ['agence web', 'création site', '/services/creation-de-site-internet'],
  ['webmaster', 'création site', '/services/creation-de-site-internet'], ['développeur web', 'création site', '/services/creation-de-site-internet'], ['freelance web', 'création site', '/services/creation-de-site-internet'],
  ['web designer', 'création site', '/services/creation-de-site-internet'], ['webdesigner', 'création site', '/services/creation-de-site-internet'], ['site sur mesure', 'création site', '/services/creation-de-site-internet'],
  ['refonte', 'refonte', '/services/refonte-de-site-internet'], ['refonte site', 'refonte', '/services/refonte-de-site-internet'], ['refaire site', 'refonte', '/services/refonte-de-site-internet'],
  ['seo', 'référencement', '/services/referencement'], ['référencement', 'référencement', '/services/referencement'], ['référencement naturel', 'référencement', '/services/referencement'], ['agence seo', 'référencement', '/services/referencement'],
  ['consultant seo', 'référencement', '/services/referencement'], ['audit seo', 'référencement', '/outils/audit-site'], ['audit site', 'référencement', '/outils/audit-site'], ['seo local', 'référencement local', '/services/referencement-local'],
  ['référencement local', 'référencement local', '/services/referencement-local'], ['google business', 'Google Business', '/services/referencement-local'], ['fiche google', 'Google Business', '/services/referencement-local'],
  ['google maps', 'Google Business', '/services/referencement-local'], ['avis google', 'Google Business', '/services/referencement-local'], ['boutique en ligne', 'e-commerce', '/services/site-ecommerce'],
  ['e-commerce', 'e-commerce', '/services/site-ecommerce'], ['site e-commerce', 'e-commerce', '/services/site-ecommerce'], ['vendre en ligne', 'e-commerce', '/services/site-ecommerce'], ['click and collect', 'e-commerce', '/services/site-ecommerce'],
  ['logiciel de gestion', 'logiciel de gestion', '/services/logiciel-de-gestion'], ['application métier', 'logiciel de gestion', '/services/logiciel-de-gestion'], ['logiciel sur mesure', 'logiciel de gestion', '/services/logiciel-de-gestion'],
  ['logiciel devis', 'logiciel de gestion', '/services/logiciel-de-gestion'], ['logiciel facture', 'logiciel de gestion', '/services/logiciel-de-gestion'], ['logiciel planning', 'logiciel de gestion', '/services/logiciel-de-gestion'],
  ['logiciel rendez-vous', 'logiciel de gestion', '/services/logiciel-de-gestion'], ['logiciel artisan', 'logiciel de gestion', '/services/logiciel-de-gestion'], ['crm artisan', 'logiciel de gestion', '/services/logiciel-de-gestion'],
  ['automatisation', 'IA et automatisation', '/services/ia-et-automatisation'], ['automatiser', 'IA et automatisation', '/services/ia-et-automatisation'], ['ia entreprise', 'IA et automatisation', '/services/ia-et-automatisation'],
  ['ia tpe', 'IA et automatisation', '/services/ia-et-automatisation'], ['chatgpt entreprise', 'IA et automatisation', '/services/ia-et-automatisation'], ['facture électronique', 'facture électronique', '/services/facture-electronique'],
  ['facturation électronique', 'facture électronique', '/services/facture-electronique'], ['maintenance site', 'maintenance et sécurité', '/services/maintenance'], ['maintenance web', 'maintenance et sécurité', '/services/maintenance'],
  ['tarif site', 'prix et devis', '/tarifs'], ['prix site', 'prix et devis', '/tarifs'], ['devis site', 'prix et devis', '/tarifs'], ['devis web', 'prix et devis', '/tarifs'], ['tarif agence web', 'prix et devis', '/tarifs'],
  ['mentions légales', 'obligations légales', '/outils/generateur-mentions-legales'], ['générateur mentions légales', 'obligations légales', '/outils/generateur-mentions-legales'], ['modèle de devis', 'logiciel de gestion', '/outils/modele-devis'],
  ['modèle devis', 'logiciel de gestion', '/outils/modele-devis'], ['devis artisan', 'logiciel de gestion', '/outils/modele-devis'], ['cahier des charges site', 'création site', '/ressources/cahier-des-charges'],
  ['cahier des charges', 'création site', '/ressources/cahier-des-charges'], ['wix', 'création site', '/comparatif/wix-wordpress-sur-mesure'], ['wordpress', 'création site', '/comparatif/wix-wordpress-sur-mesure'],
  ['shopify', 'e-commerce', '/comparatif/shopify-ou-boutique-sur-mesure'], ['obat', 'logiciel de gestion', '/comparatif/obat-tolteck-logiciel-sur-mesure'], ['tolteck', 'logiciel de gestion', '/comparatif/obat-tolteck-logiciel-sur-mesure'],
  ['stackup', 'création site', '/'], ['stackup agency', 'création site', '/'], ['agence web tours', 'création site', '/agence-web/tours'], ['agence web touraine', 'création site', '/zones-intervention'],
  ['agence web indre-et-loire', 'création site', '/agence-web/departement/indre-et-loire'], ['agence web 37', 'création site', '/agence-web/departement/indre-et-loire'], ['site internet tours', 'création site', '/agence-web/tours'],
  ['webmaster tours', 'création site', '/agence-web/tours'], ['développeur web tours', 'création site', '/agence-web/tours'], ['freelance web tours', 'création site', '/agence-web/tours'], ['seo tours', 'référencement local', '/agence-web/tours'],
]
const MODIF_TETE = ['', 'prix', 'tarif', 'avis', 'gratuit', 'pas cher', 'devis', 'exemple', 'modèle', 'tuto', '2026', 'pour artisan', 'pour commerçant', 'pour tpe', 'pour restaurant', 'pour indépendant', 'tours', 'touraine', 'indre-et-loire', 'près de chez moi', 'freelance', 'agence', 'professionnel', 'sur mesure', 'comparatif', 'alternative', 'c\'est quoi', 'définition', 'comment faire', 'conseils']

/** Mots du lexique : tournures de définition et d'usage. */
const TOURNURES_TERME = ['{t}', '{t} définition', 'c\'est quoi {t}', '{t} c\'est quoi', 'qu\'est-ce que {t}', '{t} signification', '{t} à quoi ça sert', 'définition {t}', '{t} exemple', '{t} exemple concret',
  '{t} pour les nuls', '{t} expliqué simplement', '{t} comment ça marche', '{t} avantages et inconvénients', '{t} gratuit', '{t} obligatoire', '{t} pour un artisan', '{t} pour un commerçant', '{t} pour une tpe',
  '{t} en 2026', '{t} tuto', '{t} comment faire', '{t} erreurs', '{t} alternative']

const SERVICE_MODIF = ['2026', 'gratuit', 'comparatif', 'meilleur', 'classement', 'freelance', 'indépendant', 'professionnel', 'tpe', 'pme', 'petite entreprise', 'auto-entrepreneur', 'micro-entreprise', 'local', 'français', 'à distance',
  'visio', 'modèle', 'exemple', 'tuto', 'formation', 'guide', 'checklist', 'erreurs à éviter', 'questions à poser', 'avantages', 'inconvénients', 'processus', 'étapes', 'contrat', 'garantie', 'accompagnement', 'comment choisir', 'avis clients', 'tarifs 2026',
  'combien ça coûte', 'qui contacter', 'devis gratuit', 'pas de commission', 'sans abonnement', 'abonnement', 'rapide', 'simple', 'conforme', 'sécurisé']

const BESOINS_METIER = [
  'site internet {m} exemple', '{m} comment créer son site internet', '{m} nom de domaine', '{m} photos pour son site', '{m} mentions légales site', '{m} avis clients en ligne', '{m} réseaux sociaux', '{m} instagram',
  '{m} devis en ligne', '{m} modèle de devis', '{m} modèle de facture', '{m} logiciel de planning', '{m} application mobile', '{m} réservation en ligne', '{m} paiement en ligne', '{m} google maps', '{m} fiche google business',
  '{m} comment avoir plus de clients', '{m} publicité facebook', '{m} google ads', '{m} newsletter', '{m} seo local', '{m} concurrence en ligne', '{m} site internet obligatoire', '{m} site web gratuit ou payant',
  '{m} wix ou wordpress', '{m} prix d\'un site internet', '{m} site internet pas cher', '{m} budget site web', '{m} délai de création site', '{m} site vitrine ou boutique', '{m} cahier des charges site',
  '{m} refonte de site internet', '{m} site internet qui ne marche pas', '{m} site non visible sur google', '{m} agence web ou freelance', '{m} maintenance du site', '{m} nom de domaine et adresse mail pro',
  '{m} formulaire de contact', '{m} galerie photos site', '{m} catalogue en ligne', '{m} prise de commande en ligne', '{m} facture électronique', '{m} automatiser les relances', '{m} gérer ses clients',
  '{m} gestion des devis et factures', '{m} tableau de bord', '{m} logiciel sur mesure', '{m} excel ou logiciel', '{m} chatgpt', '{m} ia pour gagner du temps', '{m} rgpd site internet', '{m} cookies site internet',
  '{m} cgv site internet', '{m} accessibilité site', '{m} site rapide', '{m} site sécurisé', '{m} sauvegarde du site', '{m} google analytics', '{m} search console', '{m} backlinks', '{m} annuaires en ligne',
]
const OBLIGATIONS_METIER = ['{m} obligations légales', '{m} assurance obligatoire', '{m} statut juridique', '{m} mentions obligatoires devis', '{m} mentions obligatoires facture', '{m} tva', '{m} micro-entreprise', '{m} comptabilité', '{m} contrat client modèle', '{m} cgv modèle']
const PROBLEMES_METIER = [
  'pas assez de clients {m}', '{m} comment se faire connaître localement', '{m} client qui ne répond pas au devis', '{m} perdre du temps sur l\'administratif', '{m} trop de rendez-vous manqués', '{m} comment fidéliser',
  '{m} comment fixer ses prix', '{m} avis négatif que faire', '{m} comment gérer les impayés', '{m} comment recruter', '{m} saisonnalité que faire', '{m} comment se différencier',
]
const SERVICE_COMMUNE = ['création site internet vitrine {c}', 'boutique en ligne {c}', 'référencement local {c}', 'seo {c}', 'webmaster {c}', 'freelance web {c}', 'développeur web {c}', 'informatique pro {c}', 'site web commerçant {c}', 'devis site internet {c}', 'logiciel de gestion {c}', 'refonte site internet {c}']
const VILLES_BESOINS = ['Tours', 'Joué-lès-Tours', 'Saint-Cyr-sur-Loire', 'Saint-Pierre-des-Corps', 'Chambray-lès-Tours', 'La Riche', 'Saint-Avertin', 'Fondettes', 'Ballan-Miré', 'Montlouis-sur-Loire', 'Amboise', 'Loches', 'Chinon', 'Langeais', 'Bourgueil', 'Château-la-Vallière', 'Château-Renault', 'Bléré', 'Montbazon', 'Savigné-sur-Lathan', 'Azay-le-Rideau', 'Sainte-Maure-de-Touraine', 'Preuilly-sur-Claise', 'Richelieu', 'Neuillé-Pont-Pierre', 'Vouvray', 'Luynes', 'Saint-Paterne-Racan', 'Cinq-Mars-la-Pile', 'Villandry']

/** Questions-racines (sans cadrage) : chaque racine reçoit plusieurs cadrages. */
const RACINES_QUESTIONS = [
  'comment créer un site internet', 'combien coûte un site internet', 'comment choisir son nom de domaine', 'comment apparaître sur google', 'comment être premier sur google', 'comment avoir plus de clients grâce à internet',
  'faut-il un site internet', 'faut-il une fiche google business', 'comment obtenir des avis google', 'comment répondre à un avis négatif', 'comment faire un devis', 'comment faire une facture', 'comment relancer un client',
  'comment créer une boutique en ligne', 'comment vendre sur internet', 'comment accepter les paiements en ligne', 'comment gérer ses rendez-vous en ligne', 'comment mettre en place la facture électronique', 'comment choisir un logiciel de gestion',
  'comment automatiser son administratif', 'comment utiliser chatgpt dans son entreprise', 'comment faire des mentions légales', 'comment être conforme au rgpd', 'comment gérer les cookies', 'comment rédiger des cgv',
  'comment choisir une agence web', 'comment choisir un freelance web', 'comment refaire son site internet', 'comment migrer son site wix', 'comment sécuriser son site internet', 'comment sauvegarder son site',
  'comment accélérer son site internet', 'comment améliorer son référencement', 'comment trouver des mots-clés', 'comment rédiger un article de blog', 'comment faire un site internet gratuitement', 'comment faire un site vitrine',
  'comment créer une adresse mail professionnelle', 'comment mettre son site en ligne', 'comment suivre les visites de son site', 'comment lire google analytics', 'comment utiliser la search console', 'comment faire une newsletter',
  'comment faire un site accessible', 'comment protéger son site contre le spam', 'comment choisir ses photos pour son site', 'comment présenter ses tarifs en ligne', 'comment mettre un formulaire de contact', 'comment faire une page à propos',
  'quelle est la différence entre wix et wordpress', 'quelle est la différence entre un site vitrine et une boutique', 'quel logiciel de facturation choisir', 'quel hébergeur choisir', 'quel cms choisir', 'quelle agence web choisir',
  'pourquoi mon site n\'apparaît pas sur google', 'pourquoi mon site est lent', 'pourquoi mon site a été piraté', 'pourquoi mes clients ne trouvent pas mon site', 'pourquoi avoir un site internet', 'pourquoi faire appel à une agence web',
  'est-ce que un site internet est obligatoire', 'est-ce que les mentions légales sont obligatoires', 'est-ce que le rgpd concerne les petites entreprises', 'est-ce que la facture électronique est obligatoire', 'est-ce que google ads est rentable',
  'combien de temps pour être bien référencé', 'combien coûte le référencement', 'combien coûte une boutique en ligne', 'combien coûte un logiciel sur mesure', 'combien coûte la maintenance d\'un site', 'combien coûte un nom de domaine',
  'combien coûte un hébergement web', 'combien coûte une refonte de site', 'combien coûte un community manager', 'combien de pages pour un site vitrine', 'combien de mots par page pour le seo',
  'que faire si mon site est piraté', 'que faire si je n\'ai pas de site', 'que mettre sur un site vitrine', 'que mettre dans des mentions légales', 'que doit contenir un devis', 'que doit contenir une facture',
  'peut-on faire son site soi-même', 'peut-on avoir un site sans abonnement', 'peut-on récupérer le code de son site', 'peut-on changer d\'agence web', 'quand refaire son site internet', 'quand passer à la facture électronique',
]
const CADRAGES = ['', 'en 2026', 'pour une petite entreprise', 'pour un artisan', 'pour un commerçant', 'pour un indépendant', 'étape par étape', 'sans agence', 'soi-même', 'gratuitement', 'rapidement', 'sans compétences techniques', 'pas cher', 'en Touraine', 'à Tours', 'quand on débute', 'exemple', 'conseils']

const OUTILS = ['wix', 'wordpress', 'shopify', 'squarespace', 'webflow', 'jimdo', 'prestashop', 'woocommerce', 'ovh', 'o2switch', 'ionos', 'gandi', 'hostinger', 'godaddy', 'planity', 'zenchef', 'thefork', 'doctolib', 'obat', 'tolteck', 'henrri', 'facture.net', 'zoho', 'sumup', 'lydia', 'canva', 'mailchimp', 'brevo', 'google workspace', 'notion', 'airtable', 'zapier', 'make', 'chatgpt', 'gemini', 'mistral', 'copilot']
const FORMES_OUTIL = ['{o} avis', '{o} prix', '{o} tarif', '{o} alternative', '{o} gratuit', '{o} pour artisan', '{o} pour commerçant', '{o} ou site sur mesure', '{o} inconvénients', '{o} limites', '{o} abonnement', '{o} commission', '{o} migration', '{o} quitter', '{o} tuto', '{o} seo']
const COMPARAISONS = [['wix', 'wordpress'], ['wix', 'shopify'], ['wordpress', 'shopify'], ['woocommerce', 'shopify'], ['prestashop', 'shopify'], ['squarespace', 'wix'], ['webflow', 'wordpress'], ['obat', 'tolteck'], ['obat', 'logiciel sur mesure'], ['tolteck', 'logiciel sur mesure'], ['planity', 'site sur mesure'], ['doctolib', 'site sur mesure'], ['thefork', 'réservation sur son site'], ['ovh', 'o2switch'], ['ionos', 'ovh'], ['chatgpt', 'gemini'], ['zapier', 'make'], ['excel', 'logiciel de gestion'], ['freelance', 'agence web'], ['site vitrine', 'boutique en ligne'], ['site sur mesure', 'cms'], ['wix', 'site sur mesure'], ['wordpress', 'site sur mesure'], ['shopify', 'site sur mesure']]

export function etendre(ajouter, ctx) {
  const { metiers, communes } = ctx
  let n = 0
  const add = (q, extra) => { ajouter(q, { source: 'combinaison', ...extra }); n++ }

  // 1. Têtes de requête × modificateurs.
  for (const [t, theme, page] of TETES) {
    for (const mod of MODIF_TETE) {
      if (/^(prix|tarif|devis|pas cher|avis|gratuit)$/.test(mod) && /^(stackup|stackup agency|wix|wordpress|shopify|obat|tolteck)$/.test(t) && mod !== 'avis' && mod !== 'prix' && mod !== 'gratuit') continue
      add(mod ? `${t} ${mod}` : t, { theme, page, patron: 'tête×modificateur' })
    }
  }
  // 2. Lexique : tournures de définition et d'usage → page du lexique.
  for (const { slug, terme, categorie } of termes) {
    const t = terme.replace(/\s*\(.*\)/, '').toLowerCase()
    const theme = { web: 'création site', seo: 'référencement', legal: 'obligations légales', gestion: 'logiciel de gestion' }[categorie]
    for (const f of TOURNURES_TERME) add(f.replace('{t}', t), { theme, page: `/lexique/${slug}`, patron: 'lexique' })
  }
  // 3. Services (formes existantes de SERVICES, passées par ctx) × modificateurs étendus.
  for (const [theme, formes] of Object.entries(ctx.SERVICES)) for (const f of formes) for (const m of SERVICE_MODIF) add(`${f} ${m}`, { theme, patron: 'service×modificateur' })
  // 4. Métiers × besoins, obligations, problèmes.
  for (const m of metiers) {
    for (const f of BESOINS_METIER) add(f.replace('{m}', m.nom).replace('site internet ' + m.nom + ' exemple', `site internet ${m.nom} exemple`), { metier: m.slug, patron: 'métier×besoin' })
    for (const f of OBLIGATIONS_METIER) add(f.replace('{m}', m.nom), { metier: m.slug, theme: 'obligations légales', patron: 'métier×obligation' })
    for (const f of PROBLEMES_METIER) add(f.replace('{m}', m.nom), { metier: m.slug, source: 'pas-encore-conscient', etape_src: 'pas encore conscient', patron: 'métier×problème' })
  }
  // 5. Toutes les communes × services locaux.
  for (const c of communes) for (const f of SERVICE_COMMUNE) add(f.replace('{c}', c.nom), { theme: 'création site', patron: 'service×commune' })
  // 6. Métier × commune importante.
  for (const m of metiers) for (const v of VILLES_BESOINS) { add(`site internet ${m.nom} ${v}`, { metier: m.slug, theme: 'création site', patron: 'métier×ville' }); add(`${m.nom} ${v} visibilité en ligne`, { metier: m.slug, theme: 'référencement local', patron: 'métier×ville' }) }
  // 7. Questions-racines × cadrages.
  for (const r of RACINES_QUESTIONS) for (const c of CADRAGES) add(c ? `${r} ${c}` : r, { source: 'question', patron: 'question×cadrage' })
  // 8. Outils et comparatifs.
  for (const o of OUTILS) for (const f of FORMES_OUTIL) add(f.replace('{o}', o), { source: 'question', patron: 'outil×forme' })
  for (const [a, b] of COMPARAISONS) for (const f of ['{a} ou {b}', '{a} vs {b}', '{a} ou {b} pour un artisan', '{a} ou {b} quel est le meilleur', 'différence entre {a} et {b}', '{a} ou {b} avis', '{a} {b} comparatif', '{a} ou {b} pour une petite entreprise', 'faut-il choisir {a} ou {b}', '{a} contre {b}']) add(f.replaceAll('{a}', a).replaceAll('{b}', b), { source: 'question', patron: 'comparatif', intention_src: 'comparaison' })
  return n
}
