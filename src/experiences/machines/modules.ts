import { SOLUTIONS } from '@/data/solutions'

/** Noms courts pour les étiquettes du réseau. */
const COURT: Record<string, string> = {
  'gestion-devis-factures': 'Devis & factures',
  'planning-employes': 'Planning',
  'prise-rendez-vous-en-ligne': 'Rendez-vous',
  'click-and-collect': 'Click & collect',
  'portail-client': 'Espace client',
  'gestion-stocks': 'Stocks',
  'caisse-enregistreuse': 'Caisse',
  'programme-fidelite': 'Fidélité',
  'crm-sur-mesure': 'CRM',
  'reservation-restaurant': 'Réservation',
  'menu-qr-code': 'Menu QR',
  'tableau-de-bord': 'Tableau de bord',
}

/** Pictogramme de chaque module (voir components/maquettes/illustrations). */
export const ICONES: Record<string, 'dossier' | 'calendrier' | 'horloge' | 'sac' | 'personnes' | 'cube' | 'caisse' | 'etoile' | 'carte' | 'couvert' | 'qr' | 'graphique'> = {
  'gestion-devis-factures': 'dossier',
  'planning-employes': 'calendrier',
  'prise-rendez-vous-en-ligne': 'horloge',
  'click-and-collect': 'sac',
  'portail-client': 'personnes',
  'gestion-stocks': 'cube',
  'caisse-enregistreuse': 'caisse',
  'programme-fidelite': 'etoile',
  'crm-sur-mesure': 'carte',
  'reservation-restaurant': 'couvert',
  'menu-qr-code': 'qr',
  'tableau-de-bord': 'graphique',
}

/** Les douze modules de la Salle des machines : des solutions réelles du catalogue. */
export const MODULES = [
  'gestion-devis-factures',
  'planning-employes',
  'prise-rendez-vous-en-ligne',
  'click-and-collect',
  'portail-client',
  'gestion-stocks',
  'caisse-enregistreuse',
  'programme-fidelite',
  'crm-sur-mesure',
  'reservation-restaurant',
  'menu-qr-code',
  'tableau-de-bord',
].map((slug) => {
  const s = SOLUTIONS.find((x) => x.slug === slug)!
  return { slug, nom: s.nom, court: COURT[slug] ?? s.nom, fonctions: s.fonctionnalites.slice(0, 4) }
})

/** Maquette : quelques lignes et un statut qui change tout seul, par module. */
export const MAQUETTES: Record<string, { lignes: string[]; statuts: string[]; chiffre: number; unite: string }> = {
  'gestion-devis-factures': { lignes: ['Devis 2026-041 · Dupont', 'Facture 2026-118 · Garage Martin', 'Devis 2026-042 · Mairie'], statuts: ['Brouillon', 'Envoyé', 'Accepté', 'Payé'], chiffre: 3, unite: 'à relancer' },
  'planning-employes': { lignes: ['Lundi · 3 personnes', 'Mardi · 4 personnes', 'Mercredi · 2 personnes'], statuts: ['À compléter', 'Publié', 'Validé'], chiffre: 38, unite: 'h cette semaine' },
  'prise-rendez-vous-en-ligne': { lignes: ['09:00 · Consultation', '10:30 · Suivi', '14:00 · Première visite'], statuts: ['Demandé', 'Confirmé', 'Rappel envoyé'], chiffre: 11, unite: 'rendez-vous demain' },
  'click-and-collect': { lignes: ['Commande 214 · 12:15', 'Commande 215 · 12:30', 'Commande 216 · 12:45'], statuts: ['Reçue', 'En préparation', 'Prête', 'Retirée'], chiffre: 7, unite: 'à préparer' },
  'portail-client': { lignes: ['Documents partagés · 4', 'Message · « Merci pour le devis »', 'Validation attendue'], statuts: ['En attente', 'Lu', 'Signé'], chiffre: 2, unite: 'validations' },
  'gestion-stocks': { lignes: ['Vis 4 × 40 · 120', 'Peinture blanche · 6', 'Tube cuivre 16 · 14'], statuts: ['OK', 'Seuil bas', 'Commandé'], chiffre: 3, unite: 'articles sous le seuil' },
  'caisse-enregistreuse': { lignes: ['Ticket 1 204 · 18,50 €', 'Ticket 1 205 · 7,00 €', 'Ticket 1 206 · 42,90 €'], statuts: ['Ouvert', 'Encaissé', 'Clôturé'], chiffre: 68, unite: 'tickets aujourd’hui' },
  'programme-fidelite': { lignes: ['Carte 0412 · 8 points', 'Carte 0519 · 10 points', 'Carte 0088 · 3 points'], statuts: ['Actif', 'Récompense due', 'Offerte'], chiffre: 4, unite: 'récompenses à offrir' },
  'crm-sur-mesure': { lignes: ['Appel · Boulangerie Petit', 'Relance · Cabinet Roux', 'Visite · Atelier Blanc'], statuts: ['À faire', 'En cours', 'Fait'], chiffre: 5, unite: 'relances cette semaine' },
  'reservation-restaurant': { lignes: ['12:30 · 4 couverts', '13:00 · 2 couverts', '20:00 · 6 couverts'], statuts: ['Demandée', 'Confirmée', 'Installée'], chiffre: 24, unite: 'couverts ce soir' },
  'menu-qr-code': { lignes: ['Plat du jour · 14,50 €', 'Dessert maison · 6,00 €', 'Carte des vins · 23 réf.'], statuts: ['Brouillon', 'Publié', 'Épuisé'], chiffre: 1, unite: 'plat épuisé' },
  'tableau-de-bord': { lignes: ['Chiffre du mois', 'Encours client', 'Commandes en cours'], statuts: ['À jour', 'Synchronisé'], chiffre: 12, unite: 'indicateurs' },
}
