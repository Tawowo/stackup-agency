/**
 * SOURCE UNIQUE du contenu commercial (PROMPT-REFONTE § 12).
 * Prix toujours « à partir de ». Aucune durée, aucun comparatif, aucun
 * « hébergement France », aucune offre association.
 */
export type IdOffre = 'une-page' | 'multi-pages' | 'boutique' | 'outil'

export interface Offre {
  id: IdOffre
  nom: string
  aPartirDe: number
  inclus: readonly string[]
}

export const SITE = {
  nom: 'Stackup Agency',
  url: 'https://stackup-agency.fr',
  fondateur: 'Mathéo Reboul',
  ville: 'Tours',
  departement: 'Indre-et-Loire',
  email: 'contact@stackup-agency.fr',
  telephone: '',
  social: {
    linkedin: 'https://www.linkedin.com/in/stackup-agency-5756943aa/',
    instagram: 'https://www.instagram.com/stackup.agency/',
    facebook: 'https://www.facebook.com/profile.php?id=61588724591496',
  },
  offres: [
    {
      id: 'une-page',
      nom: 'Site une page',
      aPartirDe: 449,
      inclus: [
        'Design sur mesure',
        'Page unique + mentions légales',
        'Formulaire de contact',
        'Référencement local',
        'Hébergement 12 mois et SSL',
        'Nom de domaine offert la 1re année',
        'Code propriétaire',
      ],
    },
    {
      id: 'multi-pages',
      nom: 'Site multi-pages',
      aPartirDe: 749,
      inclus: [
        "Jusqu'à 10 pages",
        'Blog et galerie',
        'Formulaires avancés',
        'Statistiques',
        'Hébergement 12 mois et SSL',
        'Nom de domaine offert la 1re année',
        'Code propriétaire',
      ],
    },
    {
      id: 'boutique',
      nom: 'Boutique en ligne',
      aPartirDe: 1647,
      inclus: [
        'Catalogue et paiement',
        'Gestion des stocks',
        'E-mails automatiques',
        'Click & Collect',
        'Hébergement 12 mois et SSL',
        'Code propriétaire',
      ],
    },
    {
      id: 'outil',
      nom: 'Outil de gestion sur mesure',
      aPartirDe: 1447,
      inclus: [
        'Développement sur mesure',
        "Espace d'administration",
        'Formation',
        'Vos données vous appartiennent',
        'Sans abonnement obligatoire',
      ],
    },
  ] as const satisfies readonly Offre[],
  maintenance: [
    { id: 'starter', nom: 'Starter', prix: 29 },
    { id: 'pro', nom: 'Pro', prix: 44 },
    { id: 'premium', nom: 'Premium', prix: 89 },
  ] as const,
  redaction: { article: 25, pack4: 89, pack8: 159 },
  supplements: { revision: '25 à 35 €', pageSupplementaire: 60, retraitMention: 100 },
  mentions: { tva: 'TVA non applicable, art. 293 B du CGI', devisValable: '30 jours' },
} as const

export function offre(id: IdOffre): Offre {
  return SITE.offres.find((o) => o.id === id)!
}

const euros = new Intl.NumberFormat('fr-FR', { maximumFractionDigits: 0 })

/** Toute mention de prix dans l'interface passe ici : « à partir de 449 € ». */
export function formatAPartirDe(o: Offre | number): string {
  const n = typeof o === 'number' ? o : o.aPartirDe
  return `à partir de ${euros.format(n)} €`
}
