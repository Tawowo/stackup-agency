/**
 * IDENTITÉ LÉGALE DE L'ENTREPRISE — la seule source. Mentions légales, CGV (agence et plateforme), politique de
 * confidentialité, pied de page, données structurées, devis, factures et documents PDF (`npm run documents`) la lisent,
 * directement ou à travers `SITE.entreprise` (src/config/site.ts). Un changement se fait ici, une seule fois.
 */
export const COMPANY = {
  /** Nom de l'exploitant, tel qu'au registre. */
  nom: 'Mathéo REBOUL',
  prenom: 'Mathéo',
  nomFamille: 'REBOUL',
  /** Dénomination de l'entrepreneur individuel : la mention « EI » est obligatoire (art. L. 526-22 du Code de commerce). */
  denomination: 'Mathéo REBOUL EI',
  forme: 'Entrepreneur individuel (EI)',
  /** Nom commercial, tel qu'affiché sur le site. */
  nomCommercial: 'Stackup Agency',
  /** Nom commercial tel qu'inscrit au registre. */
  nomCommercialRegistre: 'Stackup-Agency',
  siren: '131 637 431',
  siret: '131 637 431 00019',
  ape: '62.01Z',
  apeLibelle: 'Programmation informatique',
  immatriculation: {
    registre: 'Registre national des entreprises (RNE)',
    date: '19/10/2026',
    /** Même date au format ISO (données structurées). */
    dateIso: '2026-10-19',
  },
  adresse: {
    rue: '706 rue des Cormiers',
    codePostal: '37340',
    commune: 'Savigné-sur-Lathan',
    pays: 'France',
  },
  /**
   * TODO à confirmer : régime de TVA (franchise en base, art. 293 B du CGI). À vérifier par le propriétaire avant
   * le premier contrat ; si la TVA devient applicable, remplacer ce texte et adapter les prix « HT / TTC ».
   */
  tva: 'TVA non applicable, art. 293 B du CGI',
} as const

/** « 706 rue des Cormiers, 37340 Savigné-sur-Lathan, France » */
export const adresseComplete = (avecPays = true) =>
  `${COMPANY.adresse.rue}, ${COMPANY.adresse.codePostal} ${COMPANY.adresse.commune}${avecPays ? `, ${COMPANY.adresse.pays}` : ''}`

/** « Mathéo REBOUL EI — Stackup Agency » : l'en-tête des devis, factures et contrats. */
export const enteteLegal = `${COMPANY.denomination} — ${COMPANY.nomCommercial}`

/** Ligne de pied de page légal : dénomination, SIRET, adresse, TVA. */
export const ligneLegale = `${COMPANY.denomination} · SIRET ${COMPANY.siret} · ${adresseComplete(false)} · ${COMPANY.tva}`
