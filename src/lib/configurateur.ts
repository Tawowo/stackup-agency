/**
 * LE CONFIGURATEUR — logique.
 *
 * Règle absolue : aucun prix n'est inventé ici. Les montants proviennent
 * exclusivement de `SITE.pricing`, source unique du site, et sont toujours
 * présentés comme un point de départ (« à partir de »), jamais comme un devis.
 *
 * Les options sans tarif public (intégrations, reprise de données, formation)
 * n'affichent aucun montant : elles sont marquées « sur devis ». Afficher un
 * chiffre plausible mais inventé serait un mensonge commercial, et le
 * prospect le découvrirait au premier échange.
 */

import { SITE } from '@/config/site'

export type IdBase = 'vitrine' | 'multipages' | 'ecommerce' | 'gestion' | 'association'

export interface Base {
  id: IdBase
  titre: string
  description: string
  /** Prix public de départ, en euros. Issu de SITE.pricing. */
  prix: number
  delai: string
  href: string
}

export const BASES: Base[] = [
  {
    id: 'vitrine',
    titre: 'Site vitrine',
    description: 'Vous présenter, être trouvé localement, être contacté.',
    prix: SITE.pricing.vitrine,
    delai: SITE.delais.vitrine,
    href: '/services/site-vitrine',
  },
  {
    id: 'multipages',
    titre: 'Site multi-pages',
    description: 'Plusieurs offres à détailler, un blog, des pages par service.',
    prix: SITE.pricing.multipages,
    delai: SITE.delais.multipages,
    href: '/services/site-multi-pages',
  },
  {
    id: 'ecommerce',
    titre: 'Boutique en ligne',
    description: 'Vendre en ligne, gérer un catalogue, encaisser.',
    prix: SITE.pricing.ecommerce,
    delai: SITE.delais.ecommerce,
    href: '/services/site-ecommerce',
  },
  {
    id: 'gestion',
    titre: 'Outil de gestion sur mesure',
    description: 'Planning, devis, stock, suivi : un logiciel à vos règles.',
    prix: SITE.pricing.gestion,
    delai: SITE.delais.gestion,
    href: '/services/application-sur-mesure',
  },
]

export interface Option {
  id: string
  titre: string
  detail: string
  /** Montant public en euros, ou `null` quand il n'existe pas de tarif public. */
  prix: number | null
  /** Bases auxquelles l'option s'applique. */
  pour: IdBase[]
  /** Suffixe d'unité pour les prix récurrents ou unitaires. */
  unite?: string
}

export const OPTIONS: Option[] = [
  {
    id: 'maintenance-starter',
    titre: 'Maintenance Starter',
    detail: 'Mises à jour, sauvegardes, surveillance. Sans engagement.',
    prix: SITE.pricing.maintenanceStarter,
    unite: '€ / mois',
    pour: ['vitrine', 'multipages', 'association'],
  },
  {
    id: 'maintenance-pro',
    titre: 'Maintenance Pro',
    detail: 'Starter + modifications de contenu incluses chaque mois.',
    prix: SITE.pricing.maintenancePro,
    unite: '€ / mois',
    pour: ['vitrine', 'multipages', 'ecommerce', 'gestion', 'association'],
  },
  {
    id: 'maintenance-premium',
    titre: 'Maintenance Premium',
    detail: 'Pro + interventions prioritaires et évolutions régulières.',
    prix: SITE.pricing.maintenancePremium,
    unite: '€ / mois',
    pour: ['ecommerce', 'gestion'],
  },
  {
    id: 'redaction',
    titre: 'Rédaction d’articles SEO',
    detail: 'Articles optimisés pour vos requêtes, rédigés et publiés.',
    prix: SITE.pricing.redactionArticle,
    unite: '€ / article',
    pour: ['vitrine', 'multipages', 'ecommerce', 'association'],
  },
  {
    id: 'integrations',
    titre: 'Connexion à vos outils existants',
    detail: 'Agenda, caisse, comptabilité, CRM. Dépend entièrement de vos outils.',
    prix: null,
    pour: ['ecommerce', 'gestion', 'multipages'],
  },
  {
    id: 'reprise',
    titre: 'Reprise de vos données actuelles',
    detail: 'Import de votre catalogue, de vos fiches ou de votre historique.',
    prix: null,
    pour: ['ecommerce', 'gestion'],
  },
  {
    id: 'formation',
    titre: 'Formation de votre équipe',
    detail: 'Prise en main de l’outil, en visio ou sur place.',
    prix: null,
    pour: ['ecommerce', 'gestion', 'multipages'],
  },
  {
    id: 'multilingue',
    titre: 'Version multilingue',
    detail: 'Une seconde langue, avec le référencement associé.',
    prix: null,
    pour: ['vitrine', 'multipages', 'ecommerce'],
  },
]

export const ECHEANCES = [
  { id: 'urgent', titre: 'Le plus vite possible', detail: 'Vous avez une échéance proche.' },
  { id: 'trimestre', titre: 'Dans les 3 mois', detail: 'Le projet est décidé, pas encore lancé.' },
  { id: 'explore', titre: 'Je me renseigne', detail: 'Vous comparez avant de vous engager.' },
] as const

export type IdEcheance = (typeof ECHEANCES)[number]['id']

export interface Configuration {
  base: IdBase | null
  options: string[]
  echeance: IdEcheance | null
  /** Texte libre du prospect. */
  contexte: string
}

export const CONFIGURATION_VIDE: Configuration = {
  base: null,
  options: [],
  echeance: null,
  contexte: '',
}

export interface Estimation {
  /** Somme des montants publics ponctuels, en euros. */
  planchePonctuel: number
  /** Somme des montants publics mensuels, en euros. */
  plancheMensuel: number
  /** Options retenues sans tarif public : elles empêchent tout total ferme. */
  surDevis: Option[]
  delai: string | null
}

/**
 * Produit un **plancher**, jamais un prix. Deux garde-fous :
 *  - le résultat est toujours présenté avec « à partir de » ;
 *  - dès qu'une option sans tarif public est retenue, elle est listée
 *    explicitement pour que le visiteur sache que le total n'est pas complet.
 */
export function estimer(config: Configuration): Estimation {
  const base = BASES.find((b) => b.id === config.base) ?? null
  const retenues = OPTIONS.filter((o) => config.options.includes(o.id))

  const mensuelles = retenues.filter((o) => o.unite?.includes('mois'))
  const ponctuelles = retenues.filter((o) => o.prix !== null && !o.unite?.includes('mois'))

  return {
    planchePonctuel:
      (base?.prix ?? 0) + ponctuelles.reduce((s, o) => s + (o.prix ?? 0), 0),
    plancheMensuel: mensuelles.reduce((s, o) => s + (o.prix ?? 0), 0),
    surDevis: retenues.filter((o) => o.prix === null),
    delai: base?.delai ?? null,
  }
}

export function optionsPour(base: IdBase | null): Option[] {
  if (!base) return []
  return OPTIONS.filter((o) => o.pour.includes(base))
}

/**
 * Synthèse transmise au formulaire de devis.
 *
 * Écrite en texte lisible plutôt qu'en identifiants : c'est un humain qui la
 * lira à l'arrivée, et le prospect doit pouvoir la relire avant d'envoyer.
 */
export function resumer(config: Configuration): string {
  const base = BASES.find((b) => b.id === config.base)
  const retenues = OPTIONS.filter((o) => config.options.includes(o.id))
  const echeance = ECHEANCES.find((e) => e.id === config.echeance)
  const estimation = estimer(config)

  const lignes: string[] = []
  if (base) lignes.push(`Projet : ${base.titre} (à partir de ${base.prix} €, ${base.delai})`)
  if (retenues.length) {
    lignes.push('Options souhaitées :')
    for (const o of retenues) {
      lignes.push(
        `  — ${o.titre}${o.prix !== null ? ` (${o.prix} ${o.unite ?? '€'})` : ' (sur devis)'}`,
      )
    }
  }
  if (echeance) lignes.push(`Échéance : ${echeance.titre}`)

  if (estimation.planchePonctuel > 0) {
    lignes.push(`Point de départ indicatif : à partir de ${estimation.planchePonctuel} €`)
  }
  if (estimation.plancheMensuel > 0) {
    lignes.push(`Récurrent : à partir de ${estimation.plancheMensuel} € / mois`)
  }
  if (estimation.surDevis.length) {
    lignes.push(
      `À chiffrer ensemble : ${estimation.surDevis.map((o) => o.titre).join(', ')}`,
    )
  }
  if (config.contexte.trim()) {
    lignes.push('', 'Contexte précisé :', config.contexte.trim())
  }

  return lignes.join('\n')
}
