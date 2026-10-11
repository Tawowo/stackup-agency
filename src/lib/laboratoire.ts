/**
 * LE LABORATOIRE — logique métier.
 *
 * Séparée de l'interface pour une raison précise : c'est ce qui permet de
 * prouver que les calculs sont justes. Un test peut appeler ces fonctions
 * sans navigateur. Une démonstration dont les totaux sont faux ne démontre
 * rien — elle démontre le contraire.
 *
 * ────────────────────────────────────────────────────────────────────────
 * AVERTISSEMENT SUR LES DONNÉES
 * Les enregistrements ci-dessous sont entièrement fictifs et servent
 * uniquement de jeu d'essai. Aucun n'est un client réel de Stackup Agency.
 * Les noms sont volontairement génériques pour qu'aucune confusion ne soit
 * possible. Aucune API n'est appelée : tout se passe dans le navigateur.
 * ────────────────────────────────────────────────────────────────────────
 */

export type Statut = 'brouillon' | 'envoye' | 'accepte' | 'planifie' | 'termine'

export interface Ligne {
  designation: string
  quantite: number
  /** Prix unitaire hors taxes, en centimes : aucun flottant dans les montants. */
  prixUnitaireHT: number
}

export interface Intervention {
  id: string
  client: string
  commune: string
  statut: Statut
  /** Format ISO court, trié lexicographiquement sans conversion. */
  date: string
  lignes: Ligne[]
}

export const TVA = 0.2

export const LIBELLES_STATUT: Record<Statut, string> = {
  brouillon: 'Brouillon',
  envoye: 'Devis envoyé',
  accepte: 'Accepté',
  planifie: 'Planifié',
  termine: 'Terminé',
}

/** Ordre du cycle de vie. Sert aussi au bouton « étape suivante ». */
export const CYCLE: Statut[] = ['brouillon', 'envoye', 'accepte', 'planifie', 'termine']

export function statutSuivant(statut: Statut): Statut {
  const i = CYCLE.indexOf(statut)
  return CYCLE[Math.min(i + 1, CYCLE.length - 1)]
}

// ── Calculs ────────────────────────────────────────────────────────────────
// Tout est en centimes entiers. Un montant en euros flottants finit toujours
// par produire un total faux d'un centime, et c'est exactement le genre de
// détail qui décrédibilise une démonstration de logiciel de gestion.

export function totalLigneHT(ligne: Ligne): number {
  return Math.round(ligne.quantite * ligne.prixUnitaireHT)
}

export function totalHT(intervention: Intervention): number {
  return intervention.lignes.reduce((somme, l) => somme + totalLigneHT(l), 0)
}

export function totalTVA(intervention: Intervention): number {
  return Math.round(totalHT(intervention) * TVA)
}

export function totalTTC(intervention: Intervention): number {
  return totalHT(intervention) + totalTVA(intervention)
}

export function formaterEuros(centimes: number): string {
  return new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: 'EUR',
    minimumFractionDigits: 2,
  }).format(centimes / 100)
}

export function formaterDate(iso: string): string {
  const [a, m, j] = iso.split('-')
  return `${j}/${m}/${a}`
}

// ── Filtrage et tri ────────────────────────────────────────────────────────

export type Tri = 'date-desc' | 'date-asc' | 'montant-desc' | 'montant-asc' | 'client-asc'

export interface Criteres {
  recherche: string
  statuts: Statut[]
  tri: Tri
}

function sansAccents(texte: string): string {
  return texte.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '')
}

export function filtrerEtTrier(
  interventions: Intervention[],
  criteres: Criteres,
): Intervention[] {
  const q = sansAccents(criteres.recherche.trim())

  const retenues = interventions.filter((i) => {
    if (criteres.statuts.length > 0 && !criteres.statuts.includes(i.statut)) return false
    if (!q) return true
    // La recherche porte aussi sur les désignations de lignes : chercher
    // « plomberie » doit trouver l'intervention qui en contient une.
    const champs = sansAccents(
      `${i.client} ${i.commune} ${i.id} ${i.lignes.map((l) => l.designation).join(' ')}`,
    )
    return champs.includes(q)
  })

  const trie = [...retenues]
  switch (criteres.tri) {
    case 'date-asc':
      trie.sort((a, b) => a.date.localeCompare(b.date))
      break
    case 'date-desc':
      trie.sort((a, b) => b.date.localeCompare(a.date))
      break
    case 'montant-asc':
      trie.sort((a, b) => totalTTC(a) - totalTTC(b))
      break
    case 'montant-desc':
      trie.sort((a, b) => totalTTC(b) - totalTTC(a))
      break
    case 'client-asc':
      trie.sort((a, b) => a.client.localeCompare(b.client, 'fr'))
      break
  }
  return trie
}

export interface Synthese {
  nombre: number
  totalHT: number
  totalTTC: number
  /** Montant TTC des interventions acceptées, planifiées ou terminées. */
  engage: number
  /** Montant TTC encore au stade devis. */
  enAttente: number
  panierMoyen: number
}

/** La synthèse porte sur l'ensemble filtré, pas sur toutes les données :
 *  c'est ce qui rend les filtres réellement utiles plutôt que décoratifs. */
export function synthetiser(interventions: Intervention[]): Synthese {
  const ht = interventions.reduce((s, i) => s + totalHT(i), 0)
  const ttc = interventions.reduce((s, i) => s + totalTTC(i), 0)
  const engage = interventions
    .filter((i) => i.statut === 'accepte' || i.statut === 'planifie' || i.statut === 'termine')
    .reduce((s, i) => s + totalTTC(i), 0)

  return {
    nombre: interventions.length,
    totalHT: ht,
    totalTTC: ttc,
    engage,
    enAttente: ttc - engage,
    panierMoyen: interventions.length ? Math.round(ttc / interventions.length) : 0,
  }
}

// ── Jeu d'essai ────────────────────────────────────────────────────────────
// Entièrement fictif. Communes réelles d'Indre-et-Loire (information publique),
// raisons sociales inventées et génériques.

export const JEU_DESSAI: Intervention[] = [
  {
    id: 'INT-0142',
    client: 'Menuiserie des Deux Rives',
    commune: 'Tours',
    statut: 'planifie',
    date: '2026-10-18',
    lignes: [
      { designation: 'Pose de fenêtres bois-alu', quantite: 6, prixUnitaireHT: 48000 },
      { designation: 'Dépose et évacuation anciens châssis', quantite: 1, prixUnitaireHT: 32000 },
      { designation: 'Déplacement', quantite: 2, prixUnitaireHT: 4500 },
    ],
  },
  {
    id: 'INT-0141',
    client: 'Boulangerie du Marché',
    commune: 'Joué-lès-Tours',
    statut: 'envoye',
    date: '2026-10-16',
    lignes: [
      { designation: 'Remise aux normes tableau électrique', quantite: 1, prixUnitaireHT: 118000 },
      { designation: 'Éclairage LED vitrine', quantite: 8, prixUnitaireHT: 6200 },
    ],
  },
  {
    id: 'INT-0140',
    client: 'Cabinet dentaire Pasteur',
    commune: 'Saint-Cyr-sur-Loire',
    statut: 'accepte',
    date: '2026-10-14',
    lignes: [
      { designation: 'Climatisation réversible 2 salles', quantite: 2, prixUnitaireHT: 139000 },
      { designation: 'Contrat de maintenance annuel', quantite: 1, prixUnitaireHT: 28000 },
    ],
  },
  {
    id: 'INT-0139',
    client: 'Garage Central',
    commune: 'Chambray-lès-Tours',
    statut: 'termine',
    date: '2026-10-09',
    lignes: [
      { designation: 'Réfection sol atelier résine', quantite: 120, prixUnitaireHT: 4200 },
      { designation: 'Marquage au sol', quantite: 1, prixUnitaireHT: 54000 },
    ],
  },
  {
    id: 'INT-0138',
    client: 'Fleuriste Les Trois Saisons',
    commune: 'Tours',
    statut: 'brouillon',
    date: '2026-10-08',
    lignes: [
      { designation: 'Chambre froide positive', quantite: 1, prixUnitaireHT: 286000 },
    ],
  },
  {
    id: 'INT-0137',
    client: 'Restaurant Le Quai Neuf',
    commune: 'Amboise',
    statut: 'planifie',
    date: '2026-10-22',
    lignes: [
      { designation: 'Hotte professionnelle + extraction', quantite: 1, prixUnitaireHT: 412000 },
      { designation: 'Plomberie cuisine', quantite: 1, prixUnitaireHT: 96000 },
      { designation: 'Déplacement', quantite: 3, prixUnitaireHT: 4500 },
    ],
  },
  {
    id: 'INT-0136',
    client: 'Cabinet d’ostéopathie Vinci',
    commune: 'Tours',
    statut: 'accepte',
    date: '2026-10-06',
    lignes: [
      { designation: 'Isolation phonique cabinet', quantite: 2, prixUnitaireHT: 74000 },
    ],
  },
  {
    id: 'INT-0135',
    client: 'Épicerie fine Val de Loire',
    commune: 'Vouvray',
    statut: 'termine',
    date: '2026-09-29',
    lignes: [
      { designation: 'Agencement rayonnages sur mesure', quantite: 1, prixUnitaireHT: 218000 },
      { designation: 'Comptoir caisse', quantite: 1, prixUnitaireHT: 134000 },
    ],
  },
  {
    id: 'INT-0134',
    client: 'Auto-école de la Gare',
    commune: 'Saint-Pierre-des-Corps',
    statut: 'envoye',
    date: '2026-10-02',
    lignes: [
      { designation: 'Rénovation salle de code', quantite: 1, prixUnitaireHT: 164000 },
      { designation: 'Vidéoprojecteur + écran', quantite: 1, prixUnitaireHT: 52000 },
    ],
  },
  {
    id: 'INT-0133',
    client: 'Salon de coiffure Atelier 37',
    commune: 'Tours',
    statut: 'termine',
    date: '2026-09-24',
    lignes: [
      { designation: 'Bacs de lavage', quantite: 3, prixUnitaireHT: 89000 },
      { designation: 'Plomberie et raccordements', quantite: 1, prixUnitaireHT: 72000 },
      { designation: 'Déplacement', quantite: 1, prixUnitaireHT: 4500 },
    ],
  },
  {
    id: 'INT-0132',
    client: 'Pépinières du Plessis',
    commune: 'La Riche',
    statut: 'brouillon',
    date: '2026-10-11',
    lignes: [
      { designation: 'Serre tunnel 120 m²', quantite: 1, prixUnitaireHT: 348000 },
      { designation: 'Système d’irrigation', quantite: 1, prixUnitaireHT: 127000 },
    ],
  },
  {
    id: 'INT-0131',
    client: 'Cave coopérative Saint-Martin',
    commune: 'Montlouis-sur-Loire',
    statut: 'accepte',
    date: '2026-10-04',
    lignes: [
      { designation: 'Groupe froid cuverie', quantite: 1, prixUnitaireHT: 524000 },
      { designation: 'Mise en service et formation', quantite: 1, prixUnitaireHT: 68000 },
    ],
  },
]
