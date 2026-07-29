export interface Solution {
  slug: string
  nom: string
  priorite: 'P1' | 'P2' | 'P3'
  requetePrincipale: string
  variantes: string[]
  metiersCibles: string[]
}

export const SOLUTIONS: Solution[] = [
  { slug: 'prise-rendez-vous-en-ligne', nom: 'Prise de rendez-vous en ligne', priorite: 'P1', requetePrincipale: 'prise de rendez-vous automatisée', variantes: ['application prise de rdv', 'gestionnaire de rendez-vous', 'agenda en ligne professionnel', 'logiciel rdv sur mesure'], metiersCibles: ['osteopathe', 'salon-coiffure', 'institut-beaute', 'garage-automobile', 'auto-ecole', 'cabinet-medical'] },
  { slug: 'gestion-devis-factures', nom: 'Gestion des devis & factures', priorite: 'P1', requetePrincipale: 'gestion des devis automatisée', variantes: ['logiciel devis factures sur mesure', 'devis en ligne artisan', 'facturation automatisée tpe'], metiersCibles: ['plombier', 'electricien', 'macon-renovateur', 'paysagiste-jardinier'] },
  { slug: 'click-and-collect', nom: 'Click & Collect', priorite: 'P1', requetePrincipale: 'création site e-commerce click and collect', variantes: ['click and collect sans commission', 'module click and collect commerce'], metiersCibles: ['boulangerie-patisserie', 'boucherie-charcuterie', 'fleuriste', 'pharmacie-parapharmacie'] },
  { slug: 'reservation-restaurant', nom: 'Réservation de restaurant', priorite: 'P1', requetePrincipale: 'système de réservation restaurant', variantes: ['réservation en ligne sans commission', 'alternative module réservation', 'réduire les no-shows'], metiersCibles: ['restaurant', 'pizzeria', 'brasserie-bar', 'restaurant-gastronomique'] },
  { slug: 'commande-en-ligne-livraison', nom: 'Commande en ligne & livraison', priorite: 'P1', requetePrincipale: 'commande en ligne restaurant', variantes: ['application livraison interne', 'commande à emporter en ligne', 'alternative plateformes livraison'], metiersCibles: ['pizzeria', 'kebab-fast-food', 'restaurant', 'food-truck'] },
  { slug: 'programme-fidelite', nom: 'Programme de fidélité digital', priorite: 'P2', requetePrincipale: 'application fidélité sur mesure', variantes: ['carte de fidélité digitale', 'programme fidélité restaurant', 'fidélisation commerce local'], metiersCibles: ['restaurant', 'salon-coiffure', 'boulangerie-patisserie', 'institut-beaute'] },
  { slug: 'caisse-enregistreuse', nom: 'Caisse & encaissement sur mesure', priorite: 'P2', requetePrincipale: 'logiciel de caisse sur mesure', variantes: ['système caisse restaurant', 'caisse tactile commerce', 'logiciel encaissement certifié'], metiersCibles: ['restaurant', 'boutique-mode', 'epicerie-fine'] },
  { slug: 'gestion-stocks', nom: 'Gestion des stocks', priorite: 'P2', requetePrincipale: 'logiciel gestion de stock sur mesure', variantes: ['gestion stock restaurant', 'gestion stocks commerce', 'inventaire digital'], metiersCibles: ['restaurant', 'epicerie-fine', 'cave-vins-spiritueux', 'magasin-sport'] },
  { slug: 'crm-sur-mesure', nom: 'CRM sur mesure', priorite: 'P2', requetePrincipale: 'crm sur mesure pme', variantes: ['crm simple tpe', 'logiciel suivi clients artisan'], metiersCibles: ['avocat', 'expert-comptable', 'courtier-credit', 'organisme-formation'] },
  { slug: 'portail-client', nom: 'Portail client & extranet', priorite: 'P2', requetePrincipale: 'portail client sur mesure', variantes: ['extranet entreprise', 'espace client sécurisé'], metiersCibles: ['expert-comptable', 'avocat', 'architecte', 'organisme-formation'] },
  { slug: 'planning-employes', nom: 'Planning des employés', priorite: 'P2', requetePrincipale: 'logiciel gestion planning employés', variantes: ['planning équipes restaurant', 'gestion des plannings sur mesure'], metiersCibles: ['restaurant', 'salle-de-sport', 'institut-beaute'] },
  { slug: 'menu-qr-code', nom: 'Menu digital & QR code', priorite: 'P2', requetePrincipale: 'carte qr code restaurant', variantes: ['menu digital restaurant', 'menu qr code gratuit ou payant'], metiersCibles: ['restaurant', 'brasserie-bar', 'cafe-salon-the'] },
  { slug: 'tableau-de-bord', nom: 'Tableau de bord dirigeant', priorite: 'P3', requetePrincipale: 'tableau de bord entreprise sur mesure', variantes: ['dashboard dirigeant pme', 'reporting automatisé tpe'], metiersCibles: ['restaurant', 'boutique-mode', 'organisme-formation'] },
  { slug: 'reservation-location', nom: 'Réservation de location', priorite: 'P2', requetePrincipale: 'application réservation location', variantes: ['location matériel en ligne', 'réservation location véhicules', 'planning locations'], metiersCibles: ['gite-location-saisonniere', 'camping', 'magasin-sport'] },
]

export function getSolution(slug: string): Solution | undefined {
  return SOLUTIONS.find(s => s.slug === slug)
}
