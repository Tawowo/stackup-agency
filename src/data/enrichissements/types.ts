/** Contenu propre à une page locale (ville ou métier) : s'ajoute au gabarit pour que chaque page ait son texte. */
export interface ContenuLocal {
  /** Sections de texte (titre + paragraphes), propres à la page. */
  sections: { titre: string; paragraphes: string[] }[]
  /** Questions fréquentes propres à la page (différentes de celles du gabarit). */
  faq: { q: string; a: string }[]
}
export type Enrichissements = Record<string, ContenuLocal>
