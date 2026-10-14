/**
 * LES « À PARTIR DE » DU SITE — chaque offre est une configuration minimale passée
 * dans le moteur. Aucun montant n'est écrit ici : tout vient de l'Excel.
 */
import { calculer } from './calcul.ts'
import { configDe } from './config.ts'
import type { ConfigDevis, ResultatDevis } from './types.ts'

export type IdOffreDevis = 'une-page' | 'multi-pages' | 'boutique' | 'outil'

/** Configuration minimale de chaque offre. */
export const CONFIGS_OFFRES: Record<IdOffreDevis, ConfigDevis> = {
  'une-page': configDe({ accueil: 'Classique' }),
  'multi-pages': configDe({ accueil: 'Classique', pages: { Classique: 4 } }),
  boutique: configDe({ accueil: 'Classique', pages: { Classique: 3 }, boutique: { active: true, produits: 10, import: false, variantes: 0, categories: 0 } }),
  outil: configDe({ outil: { actif: true, utilisateurs: 1 }, options: { O01: 1 } }),
}

export function aPartirDe(id: IdOffreDevis): number {
  return calculer(CONFIGS_OFFRES[id]).total
}

/** Prix d'un site vitrine d'une page : la référence « à partir de » du site. */
export const PRIX_PLANCHER = (): number => aPartirDe('une-page')

const abo = (a: Partial<ConfigDevis['abonnement']>): ConfigDevis['abonnement'] => ({
  actif: true, publications: 0, articles: 0, suivi: 'Aucun', suiviIA: false, liens: 0, ficheGoogle: false, rapport: false, heuresModifs: 0, annuel: false, ...a,
})

export interface ExempleAbonnement {
  id: string
  titre: string
  detail: string
  config: ConfigDevis
  mensuel: number
}

/** Trois abonnements composés, calculés par le moteur. */
export function exemplesAbonnement(): ExempleAbonnement[] {
  const defs: Omit<ExempleAbonnement, 'mensuel'>[] = [
    { id: 'discret', titre: 'Votre site, tenu à jour', detail: 'Site d’une page : hébergement, sécurité, sauvegardes, petites retouches.', config: configDe({ accueil: 'Classique', abonnement: abo({}) }) },
    { id: 'present', titre: 'Votre site, et de la présence', detail: 'Site de 10 pages, 4 publications par mois, fiche Google suivie.', config: configDe({ accueil: 'Animé', pages: { Animé: 9 }, abonnement: abo({ publications: 4, ficheGoogle: true }) }) },
    { id: 'visible', titre: 'Votre boutique, et de la visibilité', detail: 'Boutique, 4 publications et 1 article par mois, suivi du référencement local, rapport mensuel.', config: configDe({ accueil: 'Animé', pages: { Classique: 3 }, boutique: { active: true, produits: 20, import: false, variantes: 0, categories: 0 }, abonnement: abo({ publications: 4, articles: 1, suivi: 'Local', rapport: true }) }) },
  ]
  return defs.map((d) => ({ ...d, mensuel: calculer(d.config).abonnement.mensuel }))
}

/** Résultat prêt à l'emploi pour une offre. */
export function resultatOffre(id: IdOffreDevis): ResultatDevis {
  return calculer(CONFIGS_OFFRES[id])
}
