import { LIGNES } from '@/config/tarifs.generated'

/** Un module du catalogue de l'outil (code de l'Excel pour les nouveaux). */
const ligne = (code: string) => LIGNES.find((l) => l.code === code)!

/** Pictogramme de chaque module (voir components/maquettes/illustrations). */
export const ICONES: Record<string, 'dossier' | 'calendrier' | 'horloge' | 'personnes' | 'micro' | 'eclair' | 'etincelle' | 'enveloppe'> = {
  'planning-employes': 'calendrier',
  'crm-sur-mesure': 'personnes',
  'prise-rendez-vous-en-ligne': 'horloge',
  'devis-factures-auto': 'dossier',
  'facture-electronique': 'enveloppe',
  'commande-vocale': 'micro',
  automatisations: 'eclair',
  'assistant-ia': 'etincelle',
}

/**
 * Les huit modules de la section d'accueil : trois essentiels que tout le monde comprend,
 * cinq qui font la différence (codes O31 à O35 de l'Excel : noms et descriptions viennent de là).
 */
const essentiel = (slug: string, nom: string, court: string, fonctions: string[]) => ({ slug, nom, court, fonctions })
const sur_mesure = (slug: string, code: string, court: string, fonctions: string[]) => {
  const l = ligne(code)
  return { slug, nom: l.libelle, court, fonctions, description: l.description }
}
export const MODULES: { slug: string; nom: string; court: string; fonctions: string[]; description?: string }[] = [
  essentiel('planning-employes', 'Planning', 'Planning', ['Semaine et journée', 'Équipe et chantiers', 'Conflits repérés']),
  essentiel('crm-sur-mesure', 'Clients', 'Clients', ['Fiches clients', 'Historique des échanges', 'Relances à faire']),
  essentiel('prise-rendez-vous-en-ligne', 'Rendez-vous', 'Rendez-vous', ['Prise en ligne', 'Rappel automatique', 'Agenda partagé']),
  sur_mesure('devis-factures-auto', 'O31', 'Devis & factures auto', ['Vos prix habituels', 'Facture au bon moment']),
  sur_mesure('facture-electronique', 'O32', 'Facture électronique', ['Plateforme agréée', 'Envoi et réception']),
  sur_mesure('commande-vocale', 'O33', 'Commande vocale', ['Vous dictez', 'L’outil crée le devis']),
  sur_mesure('automatisations', 'O34', 'Automatisations', ['Relances', 'Rappels']),
  sur_mesure('assistant-ia', 'O35', 'Assistant IA métier', ['Connaît vos prix', 'Conseille sans qu’on demande']),
]

/** Maquette : quelques lignes et un statut qui change tout seul, par module. */
export const MAQUETTES: Record<string, { lignes: string[]; statuts: string[]; chiffre: number | string; unite: string }> = {
  'planning-employes': { lignes: ['Lundi · 3 personnes', 'Mardi · 4 personnes', 'Mercredi · 2 personnes'], statuts: ['À compléter', 'Publié', 'Validé'], chiffre: 38, unite: 'h cette semaine' },
  'crm-sur-mesure': { lignes: ['Appel · Boulangerie Petit', 'Relance · Cabinet Roux', 'Visite · Atelier Blanc'], statuts: ['À faire', 'En cours', 'Fait'], chiffre: 5, unite: 'relances cette semaine' },
  'prise-rendez-vous-en-ligne': { lignes: ['09:00 · Consultation', '10:30 · Suivi', '14:00 · Première visite'], statuts: ['Demandé', 'Confirmé', 'Rappel envoyé'], chiffre: 11, unite: 'rendez-vous demain' },
  'devis-factures-auto': { lignes: ['Devis 2026-041 · Dupont · prix habituels repris', 'Chantier terminé · Garage Martin', 'Facture 2026-118 · prête à partir'], statuts: ['Brouillon', 'Envoyé', 'Accepté', 'Payé'], chiffre: 3, unite: 'documents faits sans ressaisie' },
  'facture-electronique': { lignes: ['Facture 2026-118 · Garage Martin', 'Facture reçue · Fournisseur Durand', 'Facture 2026-119 · Mairie'], statuts: ['Prête', 'Envoyée', 'Transmise'], chiffre: 'Transmise', unite: 'via une plateforme agréée' },
  'commande-vocale': { lignes: [], statuts: ['Écoute', 'Devis créé'], chiffre: 0, unite: '' },
  automatisations: { lignes: ['Relance du devis Dupont · J+7', 'Rappel de rendez-vous · la veille', 'Facture impayée · relance douce'], statuts: ['Programmée', 'Envoyée'], chiffre: 3, unite: 'tâches faites toutes seules' },
  'assistant-ia': { lignes: [], statuts: ['Nouveau conseil'], chiffre: 0, unite: '' },
}
