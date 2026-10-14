import type { ConfigDevis } from './types.ts'

/** Configuration neutre : aucun site, aucun module. */
export function configVide(): ConfigDevis {
  return {
    accueil: 'Aucun',
    pages: {},
    pagesSerie: 0,
    portee: 'Aucun',
    ia: 'Aucune',
    options: {},
    boutique: { active: false, produits: 0, import: false, variantes: 0, categories: 0 },
    outil: { actif: false, utilisateurs: 1 },
    demoPayee: false,
    visioPayee: false,
    rdvSupplementaires: 0,
    kmAuDela: 0,
    urgence: false,
    remise: 0,
    abonnement: { actif: false, publications: 0, articles: 0, suivi: 'Aucun', suiviIA: false, liens: 0, ficheGoogle: false, rapport: false, heuresModifs: 0, annuel: false },
  }
}

/** Fusion profonde partielle : `configDe({ accueil: 'Animé' })`. */
export function configDe(partiel: Partial<ConfigDevis>): ConfigDevis {
  const base = configVide()
  return {
    ...base,
    ...partiel,
    pages: { ...base.pages, ...partiel.pages },
    options: { ...base.options, ...partiel.options },
    boutique: { ...base.boutique, ...partiel.boutique },
    outil: { ...base.outil, ...partiel.outil },
    abonnement: { ...base.abonnement, ...partiel.abonnement },
  }
}
