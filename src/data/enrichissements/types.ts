/** Contenu propre à une page locale (ville ou métier) : s'ajoute au gabarit pour que chaque page ait son texte. */
export interface ContenuLocal {
  /** Sections de texte (titre + paragraphes), propres à la page. */
  sections: { titre: string; paragraphes: string[] }[]
  /** Questions fréquentes propres à la page (différentes de celles du gabarit). */
  faq: { q: string; a: string }[]
}
export type Enrichissements = Record<string, ContenuLocal>

/** Page de zone : une communauté de communes (ou métropole) d'Indre-et-Loire, avec toutes ses communes citées dans le texte. */
export interface ContenuZone {
  /** h1, ex. « Agence web en Touraine Ouest Val de Loire ». */
  titreH1: string
  /** <title> : 60 caractères maximum, sans la marque. */
  titleSeo: string
  /** Meta description : 155 caractères maximum. */
  descriptionSeo: string
  /** Chapô : 2 phrases, la réponse directe (Stackup intervient-il ici, comment). */
  intro: string
  /** Ville-centre (ou chef-lieu) de la communauté, pour le repère de distance. */
  centre: string
  sections: { titre: string; paragraphes: string[] }[]
  faq: { q: string; a: string }[]
  /** Slugs des zones voisines (parmi les 11 slugs d'EPCI). */
  voisines: string[]
}
export type Zones = Record<string, ContenuZone>
