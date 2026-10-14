import { configDe } from './config.ts'

/** Colonnes C, D, E de l'onglet Simulateur. */
export const HYDREAUX_SCAN = configDe({
  accueil: 'Immersif',
  pages: { Animé: 23, Signature: 6 },
  portee: 'Essentiel',
  options: { F02: 1, F03: 1, F08: 1 },
  abonnement: { actif: true, publications: 4, articles: 0, suivi: 'Aucun', suiviIA: false, liens: 0, ficheGoogle: false, rapport: false, heuresModifs: 0, annuel: false },
})

export const TOUTOUBIEN = configDe({
  accueil: 'Signature',
  pages: { Classique: 22, Animé: 10, Signature: 3 },
  portee: 'Local',
  options: { F03: 1, F06: 1, F07: 1, F08: 1 },
  abonnement: { actif: true, publications: 4, articles: 0, suivi: 'Local', suiviIA: false, liens: 0, ficheGoogle: true, rapport: false, heuresModifs: 0, annuel: false },
})

export const VITRINE_CLASSIQUE = configDe({ accueil: 'Classique', demoPayee: true, visioPayee: true })
