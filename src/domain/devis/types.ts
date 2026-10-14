/** Configuration d'un projet. Les identifiants de niveaux viennent de l'Excel (Classique, Animé…). */
export interface ConfigDevis {
  /** « Aucun » si pas de site. */
  accueil: string
  /** Nombre d'autres pages par niveau visuel. */
  pages: Record<string, number>
  /** Pages en série (villes, métiers, produits…). */
  pagesSerie: number
  portee: string
  ia: string
  /** Quantités par code de catalogue : F, E, C, S, B05+, O01+, OP. */
  options: Record<string, number>
  boutique: { active: boolean; produits: number; import: boolean; variantes: number; categories: number }
  outil: { actif: boolean; utilisateurs: number }
  demoPayee: boolean
  visioPayee: boolean
  rdvSupplementaires: number
  kmAuDela: number
  urgence: boolean
  /** Remise commerciale, 0 à 1. */
  remise: number
  abonnement: {
    actif: boolean
    publications: number
    articles: number
    /** Aucun · Local · Régional · National */
    suivi: string
    suiviIA: boolean
    liens: number
    ficheGoogle: boolean
    rapport: boolean
    heuresModifs: number
    annuel: boolean
  }
}

export interface Bloc {
  id: string
  libelle: string
  montant: number
}

export interface ResultatDevis {
  blocs: Bloc[]
  totalBrut: number
  apresCoefficient: number
  /** Prix du devis, arrondi. */
  total: number
  deduction: number
  reste: number
  acompte: number
  fourchette: { bas: number; haut: number }
  paiementEn4Fois: boolean
  heures: number
  tauxHoraire: number
  delaiSemaines: { min: number; max: number }
  pagesReferencees: number
  coefficientDegressivite: number
  abonnement: { hebergement: number; maintenance: number; contenus: number; mensuel: number; annuelTotal: number }
  /** Nombre de modules d'outil choisis. */
  modules: number
}
