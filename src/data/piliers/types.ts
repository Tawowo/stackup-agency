/**
 * PAGE PILIER / COMPARATIF — une page de service (ou un comparatif) longue, rédigée à la main.
 * Les montants n'apparaissent JAMAIS en chiffres : jetons `{{prix:une-page}} €`, `{{prix:multi-pages}} €`, `{{prix:boutique}} €`,
 * `{{prix:outil}} €`, `{{abo:min}} €`, `{{carte:demo}} €`, `{{carte:visio}} €`, `{{tarif:heure}} €` (remplacés par le moteur de devis, donc par l'Excel).
 */
export interface SectionPilier {
  /** Ancre du sommaire (a-z, 0-9, tirets). */
  id: string
  /** Titre h2 : reprend une variante de grappe (« Combien coûte… », « Quelle différence entre… »). */
  titre: string
  paragraphes: string[]
  /** Liste à puces (facultative), affichée après les paragraphes. */
  liste?: string[]
  /** Sous-sections h3 (facultatives). */
  sous?: { titre: string; paragraphes: string[]; liste?: string[] }[]
}

export interface Pilier {
  slug: string
  /** Chemin public de la page (ex. « /services/creation-de-site-internet »). */
  chemin: string
  /** h1. */
  titre: string
  /** Libellé de l'étiquette en tête (ex. « Service · création de site »). */
  etiquette: string
  /** Réponse directe, 2 phrases, en tête de page (reprise telle quelle dans la meta description si besoin). */
  reponse: string
  /** <title> : 60 caractères maximum, requête principale en tête, SANS la marque (ajoutée à la fin automatiquement). */
  titleSeo: string
  /** Meta description : 155 caractères maximum, avec un bénéfice et une incitation. */
  descriptionSeo: string
  sections: SectionPilier[]
  /** Exemples types (cas FICTIFS annoncés comme « exemple type », jamais un client réel ni un chiffre client). */
  exemples: { titre: string; texte: string }[]
  /** Tableau comparatif (comparatifs surtout). */
  comparaison?: { titre: string; colonnes: [string, string]; lignes: { critere: string; a: string; b: string }[]; note?: string }
  /** 8 à 10 questions propres à la page. */
  faq: { q: string; a: string }[]
  /** Sources officielles citées (domaines autorisés : service-public.fr, entreprendre.service-public.fr, cnil.fr, impots.gouv.fr, economie.gouv.fr, legifrance.gouv.fr, developers.google.com/search, support.google.com/business, web.dev). */
  sources?: { nom: string; url: string }[]
  /** Pages filles et pages liées : liens internes (chemins existants du site). */
  liens: { href: string; nom: string; note?: string }[]
  /** Date de dernière mise à jour éditoriale (AAAA-MM-JJ). */
  maj: string
  /** Type : service, comparatif. */
  type: 'service' | 'comparatif'
}
