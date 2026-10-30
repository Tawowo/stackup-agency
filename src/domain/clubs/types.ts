import type { CategorieId } from '../../data/offre-clubs/pricing.ts'

export type Formule = 'site' | 'logiciel' | 'pack'
export type Rdv = 'presentiel' | 'visio'
export type ModeAbonnement = 'mensuel' | 'annuel'
export type ModeMiseEnPlace = 'une-fois' | 'trois-fois'

/** Ce que le visiteur a saisi : tout l'état du simulateur (sérialisé dans l'URL). */
export interface Simulation {
  club: { nom: string; commune: string; departement: string }
  /** Licenciés FFT de la saison en cours, puis des deux saisons précédentes (0 = non renseigné). */
  licencies: { actuelle: number; precedente: number; avantPrecedente: number }
  formule: Formule
  /** Identifiant d'option → quantité (1 pour un forfait, N pour les pages). */
  options: Record<string, number>
  accompagnement: { heures: number; rdv: Rdv; distanceKm: number }
  paiement: { abonnement: ModeAbonnement; miseEnPlace: ModeMiseEnPlace }
  /** Besoins hors catalogue cochés : tout besoin coché fait passer la demande en devis sur mesure. */
  horsCatalogue: string[]
}

export interface LigneChiffree {
  id: string
  libelle: string
  miseEnPlace: number
  mensuel: number
}

export interface Resultat {
  categorie: { id: CategorieId; nom: string; licenciesMin: number; licenciesMax: number | null }
  licencies: number
  moyenneLicencies: number | null
  /** La saison en cours est sous 90 % de la moyenne des trois saisons : un justificatif sera demandé. */
  baisseSensible: boolean
  formule: Formule
  lignes: LigneChiffree[]
  miseEnPlace: { base: number; options: number; accompagnementSupp: number; total: number; echeances: number[] }
  accompagnement: { incluses: number; prevues: number; supplementaires: number; coutSupplementaire: number }
  abonnement: { mensuel: number; annuel: number; mensuelEquivalentAnnuel: number; economieAnnuelle: number; mode: ModeAbonnement }
  /** Montant à payer chacun des trois premiers mois. */
  premiersMois: [number, number, number]
  premiereAnnee: number
  anneesSuivantes: number
  /** Abonnement annuel ÷ licenciés de la saison en cours. */
  coutParLicencieAn: number
  coutParLicenciePremiereAnnee: number
  stockageGo: number
  /** Mises en garde sur les options (conditions non remplies, options retirées). */
  avertissements: string[]
  devis: { requis: boolean; raisons: string[] }
  deplacement: { gratuit: boolean; message: string }
}
