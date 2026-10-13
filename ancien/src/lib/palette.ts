/**
 * Index de recherche de LA PALETTE.
 *
 * Construit à partir des données réelles du site (services, solutions,
 * métiers, villes, pages fixes) — rien n'est inventé, chaque entrée pointe
 * vers une URL qui existe réellement dans les 435 pages générées.
 *
 * L'index est volontairement construit à la demande, dans le module chargé
 * par `import()` au premier Ctrl+K : il ne pèse rien tant que personne
 * n'ouvre la palette.
 */

import { SOLUTIONS } from '@/data/solutions'
import { METIERS } from '@/data/metiers'
import { VILLES } from '@/data/villes'

export interface EntreePalette {
  titre: string
  href: string
  categorie: string
  /** Mots supplémentaires qui doivent faire remonter l'entrée. */
  motsCles?: string
}

const PAGES: EntreePalette[] = [
  { titre: 'Accueil', href: '/', categorie: 'Navigation' },
  { titre: 'Nos services', href: '/services', categorie: 'Navigation', motsCles: 'prestations offres' },
  { titre: 'Tarifs', href: '/tarifs', categorie: 'Navigation', motsCles: 'prix combien coût budget' },
  { titre: 'Réalisations', href: '/realisations', categorie: 'Navigation', motsCles: 'portfolio projets exemples' },
  { titre: 'Blog', href: '/blog', categorie: 'Navigation', motsCles: 'articles conseils guides' },
  { titre: 'À propos', href: '/a-propos', categorie: 'Navigation', motsCles: 'qui sommes-nous équipe histoire' },
  { titre: 'Contact', href: '/contact', categorie: 'Navigation', motsCles: 'joindre téléphone email écrire' },
  { titre: 'Demander un devis', href: '/devis', categorie: 'Action', motsCles: 'estimation chiffrage gratuit' },
  { titre: 'Parrainage', href: '/parrainage', categorie: 'Action', motsCles: 'recommander filleul prime' },
  { titre: 'Zones d’intervention', href: '/zones-intervention', categorie: 'Navigation', motsCles: 'où secteur géographique' },
  { titre: 'Ressources', href: '/ressources', categorie: 'Navigation', motsCles: 'documents modèles' },
  { titre: 'Cahier des charges', href: '/ressources/cahier-des-charges', categorie: 'Ressource', motsCles: 'modèle gratuit brief' },
  { titre: 'Le laboratoire', href: '/laboratoire', categorie: 'Démonstration', motsCles: 'démo logiciel métier interface outil essai' },
  { titre: 'Configurer mon projet', href: '/configurateur', categorie: 'Action', motsCles: 'estimer besoin assistant simulateur budget' },
  { titre: 'Audit gratuit de votre site', href: '/outils/audit-site', categorie: 'Action', motsCles: 'analyser performance vitesse seo' },
  { titre: 'Studio de style', href: '/outils/studio-de-style', categorie: 'Démonstration', motsCles: 'charte couleurs typographie identité' },
  { titre: 'Comparatif', href: '/comparatif', categorie: 'Navigation', motsCles: 'wordpress wix shopify versus' },
  { titre: 'FAQ', href: '/faq', categorie: 'Navigation', motsCles: 'questions réponses' },
  { titre: 'Plan du site', href: '/plan-du-site', categorie: 'Navigation', motsCles: 'toutes les pages' },
]

const SERVICES: EntreePalette[] = [
  { titre: 'Site vitrine', href: '/services/site-vitrine', categorie: 'Service' },
  { titre: 'Site multi-pages', href: '/services/site-multi-pages', categorie: 'Service' },
  { titre: 'Site e-commerce', href: '/services/site-ecommerce', categorie: 'Service', motsCles: 'boutique en ligne vente' },
  { titre: 'Application sur mesure', href: '/services/application-sur-mesure', categorie: 'Service', motsCles: 'logiciel saas outil interne' },
  { titre: 'Refonte de site', href: '/services/refonte-site', categorie: 'Service', motsCles: 'moderniser relooker' },
  { titre: 'Maintenance', href: '/services/maintenance', categorie: 'Service', motsCles: 'suivi mises à jour' },
  { titre: 'Rédaction blog SEO', href: '/services/redaction-blog-seo', categorie: 'Service', motsCles: 'contenu articles référencement' },
  { titre: 'Site d’association', href: '/services/site-association', categorie: 'Service' },
]

let cache: EntreePalette[] | null = null

export function construireIndex(): EntreePalette[] {
  if (cache) return cache

  cache = [
    ...PAGES,
    ...SERVICES,
    ...SOLUTIONS.map((s) => ({
      titre: s.nom,
      href: `/solutions/${s.slug}`,
      categorie: 'Solution',
      motsCles: `${s.requetePrincipale} ${s.variantes.join(' ')}`,
    })),
    ...METIERS.map((m) => ({
      titre: `Site pour ${m.metier}`,
      href: `/creation-site-internet/${m.slug}`,
      categorie: 'Métier',
      motsCles: `${m.categorie} ${m.requetePrincipale}`,
    })),
    ...VILLES.map((v) => ({
      titre: `Agence web ${v.ville}`,
      href: `/agence-web/${v.slug}`,
      categorie: 'Ville',
      motsCles: `${v.departement} ${v.region}`,
    })),
  ]

  return cache
}

/** Retire accents et casse : « référencement » doit se trouver en tapant « referencement ». */
function normaliser(texte: string): string {
  return texte
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
}

/**
 * Recherche par sous-séquence, comme les palettes d'éditeurs de code :
 * « sve » trouve « Site VitrinE ». Un simple `includes` obligerait à taper
 * le début exact et rendrait la palette frustrante.
 *
 * Le score privilégie, dans l'ordre : le début du titre, les caractères
 * consécutifs, puis la position dans le texte.
 */
function scorer(requete: string, entree: EntreePalette): number {
  const titre = normaliser(entree.titre)
  const complet = normaliser(`${entree.titre} ${entree.categorie} ${entree.motsCles ?? ''}`)

  if (titre.startsWith(requete)) return 1000 - titre.length
  if (titre.includes(requete)) return 700 - titre.indexOf(requete)

  let i = 0
  let score = 0
  let consecutifs = 0
  for (let j = 0; j < complet.length && i < requete.length; j++) {
    if (complet[j] === requete[i]) {
      consecutifs++
      score += 10 + consecutifs * 4
      i++
    } else {
      consecutifs = 0
    }
  }
  // Toutes les lettres de la requête doivent avoir été trouvées, dans l'ordre.
  return i === requete.length ? score : -1
}

export function chercher(requete: string, limite = 9): EntreePalette[] {
  const index = construireIndex()
  const q = normaliser(requete.trim())

  if (!q) {
    // Sans saisie, on propose les actions et la navigation principale plutôt
    // qu'une liste arbitraire : c'est ce que le visiteur cherche neuf fois sur dix.
    return index.filter((e) => e.categorie === 'Action' || e.categorie === 'Démonstration')
      .concat(index.filter((e) => e.categorie === 'Navigation').slice(0, 5))
      .slice(0, limite)
  }

  return index
    .map((entree) => ({ entree, score: scorer(q, entree) }))
    .filter((r) => r.score >= 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limite)
    .map((r) => r.entree)
}
