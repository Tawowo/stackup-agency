/**
 * LE CONFIGURATEUR — logique de calcul (reprise de l'ancien site, adaptée à la
 * source unique `src/config/site.ts`).
 *
 * Règle absolue : aucun prix n'est inventé ici. Les montants proviennent
 * exclusivement de `SITE`, et sont toujours présentés comme un point de départ
 * (« à partir de »), jamais comme un devis. Aucune durée de livraison.
 *
 * Les options sans tarif public (intégrations, reprise de données, formation)
 * n'affichent aucun montant : elles sont marquées « sur devis ».
 */
import { SITE, formatAPartirDe, type IdOffre } from '@/config/site'

export interface Option {
  id: string
  titre: string
  detail: string
  /** Montant public, ou null = sur devis. */
  prix: number | null
  /** Unité d'affichage (« €/mois » pour les abonnements), sinon euros ponctuels. */
  unite?: string
  pour: IdOffre[]
}

const TOUTES: IdOffre[] = ['une-page', 'multi-pages', 'boutique', 'outil']
const SITES: IdOffre[] = ['une-page', 'multi-pages', 'boutique']

export const OPTIONS: Option[] = [
  { id: 'formulaire', titre: 'Formulaire avancé', detail: 'Demande de devis, prise de contact qualifiée.', prix: null, pour: SITES },
  { id: 'galerie', titre: 'Galerie / portfolio', detail: 'Vos réalisations, en grand.', prix: null, pour: ['une-page', 'multi-pages'] },
  { id: 'blog', titre: 'Blog', detail: 'Des articles pour être trouvé.', prix: null, pour: ['multi-pages'] },
  { id: 'rdv', titre: 'Prise de rendez-vous', detail: 'Vos créneaux, réservés en ligne.', prix: null, pour: TOUTES },
  { id: 'paiement', titre: 'Paiement en ligne', detail: 'Encaisser sur le site.', prix: null, pour: ['boutique', 'outil'] },
  { id: 'espace-client', titre: 'Espace client', detail: 'Documents, suivi, historique.', prix: null, pour: ['multi-pages', 'boutique', 'outil'] },
  { id: 'devis-factures', titre: 'Devis et factures', detail: 'Édition, envoi, relances.', prix: null, pour: ['outil'] },
  { id: 'pages', titre: 'Page supplémentaire', detail: 'Au-delà des pages incluses.', prix: SITE.supplements.pageSupplementaire, pour: ['multi-pages'] },
  { id: 'maintenance-starter', titre: `Maintenance ${SITE.maintenance[0].nom}`, detail: 'Mises à jour, sauvegardes, surveillance.', prix: SITE.maintenance[0].prix, unite: '€/mois', pour: TOUTES },
  { id: 'maintenance-pro', titre: `Maintenance ${SITE.maintenance[1].nom}`, detail: 'Starter + modifications de contenu.', prix: SITE.maintenance[1].prix, unite: '€/mois', pour: TOUTES },
  { id: 'maintenance-premium', titre: `Maintenance ${SITE.maintenance[2].nom}`, detail: 'Pro + évolutions et priorité.', prix: SITE.maintenance[2].prix, unite: '€/mois', pour: TOUTES },
  { id: 'redaction', titre: 'Rédaction d’articles', detail: 'Un article optimisé pour votre métier.', prix: SITE.redaction.article, unite: '€/article', pour: ['multi-pages'] },
  { id: 'retrait-mention', titre: 'Retrait de la mention « Réalisé par »', detail: 'Le site sans notre signature.', prix: SITE.supplements.retraitMention, pour: SITES },
  { id: 'integrations', titre: 'Intégrations (caisse, agenda, compta)', detail: 'Connecter vos outils existants.', prix: null, pour: TOUTES },
  { id: 'reprise', titre: 'Reprise de données', detail: 'Vos clients, produits, historiques.', prix: null, pour: ['boutique', 'outil'] },
]

export interface Configuration {
  base: IdOffre | null
  options: string[]
  /** Texte libre du prospect. */
  contexte: string
}

export const CONFIGURATION_VIDE: Configuration = { base: null, options: [], contexte: '' }

export interface Estimation {
  /** Somme des montants publics ponctuels, en euros. */
  planchePonctuel: number
  /** Somme des montants publics mensuels, en euros. */
  plancheMensuel: number
  /** Options retenues sans tarif public : elles empêchent tout total ferme. */
  surDevis: Option[]
}

/**
 * Produit un **plancher**, jamais un prix : toujours présenté « à partir de »,
 * et dès qu'une option sans tarif public est retenue, elle est listée.
 */
export function estimer(config: Configuration): Estimation {
  const base = SITE.offres.find((o) => o.id === config.base) ?? null
  const retenues = OPTIONS.filter((o) => config.options.includes(o.id))
  const mensuelles = retenues.filter((o) => o.unite?.includes('mois'))
  const ponctuelles = retenues.filter((o) => o.prix !== null && !o.unite?.includes('mois'))
  return {
    planchePonctuel: (base?.aPartirDe ?? 0) + ponctuelles.reduce((s, o) => s + (o.prix ?? 0), 0),
    plancheMensuel: mensuelles.reduce((s, o) => s + (o.prix ?? 0), 0),
    surDevis: retenues.filter((o) => o.prix === null),
  }
}

export function optionsPour(base: IdOffre | null): Option[] {
  if (!base) return []
  return OPTIONS.filter((o) => o.pour.includes(base))
}

/** Synthèse lisible transmise au formulaire de contact : un humain la lira. */
export function resumer(config: Configuration): string {
  const base = SITE.offres.find((o) => o.id === config.base)
  const retenues = OPTIONS.filter((o) => config.options.includes(o.id))
  const estimation = estimer(config)
  const lignes: string[] = []
  if (base) lignes.push(`Projet : ${base.nom} (${formatAPartirDe(base)})`)
  if (retenues.length) {
    lignes.push('Options souhaitées :')
    for (const o of retenues) lignes.push(`  — ${o.titre}${o.prix !== null ? ` (${o.prix} ${o.unite ?? '€'})` : ' (sur devis)'}`)
  }
  if (estimation.planchePonctuel > 0) lignes.push(`Plancher indicatif : ${formatAPartirDe(estimation.planchePonctuel)}`)
  if (estimation.plancheMensuel > 0) lignes.push(`Abonnements : ${estimation.plancheMensuel} €/mois`)
  if (estimation.surDevis.length) lignes.push(`Sur devis : ${estimation.surDevis.map((o) => o.titre).join(', ')}`)
  if (config.contexte.trim()) lignes.push(`Contexte : ${config.contexte.trim()}`)
  return lignes.join('\n')
}
