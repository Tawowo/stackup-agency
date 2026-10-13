/**
 * LES WIDGETS DU TABLEAU DE BORD VIVANT — ce que chaque module ajoute au
 * tableau, avec des chiffres FICTIFS (affichés comme tels) qui s'animent.
 * Les connexions entre deux modules voisins ouvrent un indicateur croisé.
 */
export interface Widget {
  slug: string
  court: string
  kpi: { libelle: string; valeur: number; unite: string }
  serie: number[]
  type: 'courbe' | 'barres'
}

export const WIDGETS: Widget[] = [
  { slug: 'gestion-devis-factures', court: 'Devis & factures', kpi: { libelle: 'Facturé ce mois', valeur: 8420, unite: '€' }, serie: [3, 5, 4, 7, 6, 9, 8, 11], type: 'courbe' },
  { slug: 'prise-rendez-vous-en-ligne', court: 'Rendez-vous', kpi: { libelle: 'Rendez-vous cette semaine', valeur: 46, unite: '' }, serie: [6, 9, 7, 10, 8, 4, 2], type: 'barres' },
  { slug: 'planning-employes', court: 'Planning', kpi: { libelle: 'Créneaux couverts', valeur: 94, unite: '%' }, serie: [80, 86, 90, 88, 94, 92, 94], type: 'courbe' },
  { slug: 'gestion-stocks', court: 'Stocks', kpi: { libelle: 'Articles sous le seuil', valeur: 3, unite: '' }, serie: [12, 9, 11, 7, 5, 6, 3], type: 'barres' },
  { slug: 'crm-sur-mesure', court: 'Clients', kpi: { libelle: 'Clients actifs', valeur: 312, unite: '' }, serie: [220, 236, 251, 262, 280, 297, 312], type: 'courbe' },
  { slug: 'caisse-enregistreuse', court: 'Caisse', kpi: { libelle: 'Tickets du jour', valeur: 68, unite: '' }, serie: [4, 7, 12, 9, 15, 11, 10], type: 'barres' },
  { slug: 'click-and-collect', court: 'Click & collect', kpi: { libelle: 'Commandes à préparer', valeur: 7, unite: '' }, serie: [2, 3, 5, 4, 6, 8, 7], type: 'barres' },
  { slug: 'programme-fidelite', court: 'Fidélité', kpi: { libelle: 'Clients revenus', valeur: 41, unite: '%' }, serie: [28, 30, 33, 35, 36, 39, 41], type: 'courbe' },
]

/** Indicateurs croisés : quand deux modules sont reliés, leurs données se répondent. */
export const CROISES: Record<string, string> = {
  'gestion-devis-factures|crm-sur-mesure': 'Chaque facture rattachée à sa fiche client',
  'gestion-devis-factures|prise-rendez-vous-en-ligne': 'Un rendez-vous honoré devient un devis en un clic',
  'gestion-devis-factures|planning-employes': 'Les heures du planning remplissent la facture',
  'gestion-stocks|caisse-enregistreuse': 'Chaque vente décompte le stock en direct',
  'gestion-stocks|click-and-collect': 'Une commande en ligne réserve l’article',
  'crm-sur-mesure|programme-fidelite': 'Les points de fidélité sur la fiche client',
  'prise-rendez-vous-en-ligne|planning-employes': 'Les rendez-vous tombent dans le planning de chacun',
  'caisse-enregistreuse|programme-fidelite': 'La caisse crédite les points au passage',
  'click-and-collect|crm-sur-mesure': 'Les commandes en ligne dans l’historique client',
}

export function croise(a: string, b: string): string | undefined {
  return CROISES[`${a}|${b}`] ?? CROISES[`${b}|${a}`]
}
