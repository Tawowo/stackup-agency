/**
 * IDENTITÉ DE L'ENTREPRISE — la seule source des informations légales (mentions légales, CGV, devis, PDF, JSON-LD, pied de page,
 * e-mails). `config/site.ts` (SITE.entreprise) en dérive : pour changer une information, ne la modifier qu'ici.
 * Source : avis d'immatriculation au Registre national des entreprises (RNE), 19 octobre 2026.
 */
export const COMPANY = {
  /** Nom légal du titulaire. */
  exploitant: 'Mathéo REBOUL',
  /** Forme juridique : la mention « EI » est obligatoire à côté du nom. */
  formeJuridique: 'Entrepreneur individuel (EI)',
  /** Dénomination à afficher : nom + mention « EI ». */
  denomination: 'Mathéo REBOUL EI',
  /** Nom commercial (écrit « Stackup-Agency » au registre). */
  nomCommercial: 'Stackup Agency',
  nomCommercialRegistre: 'Stackup-Agency',
  siren: '131637431',
  sirenAffiche: '131 637 431',
  /** SIRET de l'établissement principal. */
  siret: '13163743100019',
  siretAffiche: '131 637 431 00019',
  ape: '62.01Z',
  apeLibelle: 'Programmation informatique',
  immatriculation: { registre: 'Registre national des entreprises (RNE)', date: '2026-10-19', dateAffichee: '19 octobre 2026' },
  adresse: { rue: '706 rue des Cormiers', codePostal: '37340', commune: 'Savigné-sur-Lathan', pays: 'France', region: 'Centre-Val de Loire', departement: 'Indre-et-Loire' },
  /**
   * TVA : franchise en base (art. 293 B du CGI).
   * TODO à confirmer : le propriétaire doit vérifier ce régime (déclaration de début d'activité, seuils, option éventuelle)
   * avant l'envoi des premiers devis et des premières factures ; la mention disparaît de tous les documents si le régime change.
   */
  tva: { mention: 'TVA non applicable, art. 293 B du CGI', regime: 'franchise en base' },
} as const

export const adresseComplete = `${COMPANY.adresse.rue}, ${COMPANY.adresse.codePostal} ${COMPANY.adresse.commune}, ${COMPANY.adresse.pays}`
export const adresseCourte = `${COMPANY.adresse.rue}, ${COMPANY.adresse.codePostal} ${COMPANY.adresse.commune}`
