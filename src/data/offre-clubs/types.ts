/**
 * PAGES DE L'OFFRE « CLUBS DE TENNIS » — le type commun des pages rédigées (formules, fonctionnalités, pages
 * locales, padel et pickleball, guides). Rendu par src/gabarits/clubs/PageClub.tsx.
 *
 * Règles de rédaction (voir docs/offre-clubs/DECISIONS.md) :
 * - aucun montant écrit en chiffres : jetons {{club:…}} (src/lib/jetons.ts) ; nom du produit : {{produit}} ;
 * - aucun chiffre inventé (clubs, licenciés, statistiques) ; aucune promesse de résultat de référencement ;
 * - jamais « connecté à ADOC » ni « partenaire de la FFT » : « Import et export des fichiers ADOC » ;
 * - vouvoiement, phrases simples, pour des présidents et trésoriers bénévoles ;
 * - liens internes en `[texte](/chemin)`, gras en `**texte**` (composant Lie).
 */
import type { SectionPilier } from '@/data/piliers/types'
import type { Formule, OptionId } from './pricing'
import type { IdCapture } from './captures'

export type FamillePageClub = 'formule' | 'fonctionnalite' | 'local' | 'sport' | 'guide'

export interface PageClub {
  /** Dernier segment de l'adresse. */
  slug: string
  /** Adresse complète (ex. « /clubs-de-tennis/fonctionnalites/ecole-de-tennis »). */
  chemin: string
  famille: FamillePageClub
  /** h1. */
  titre: string
  /** Étiquette au-dessus du titre (ex. « Fonctionnalité · École de tennis »). */
  etiquette: string
  /** Réponse directe en 2 ou 3 phrases (chapô). */
  reponse: string
  /** <title> : 60 caractères au plus, requête principale en tête, sans la marque. */
  titleSeo: string
  /** Meta description : 155 caractères au plus. */
  descriptionSeo: string
  /** Requête principale visée (une seule page par intention : voir docs/offre-clubs/SEO.md). */
  motCle: string
  /** Variantes et questions couvertes par la page. */
  motsCles: string[]
  /** Capture de la démo affichée en tête (ordinateur + téléphone). */
  capture?: IdCapture
  /** Liens directs vers l'écran correspondant de la démo. */
  demo?: { libelle: string; url: string }[]
  /** Ce que ça coûte : formule et/ou option concernée, et une phrase (jetons de prix). */
  tarif?: { formule?: Formule; option?: OptionId; texte: string }
  /** « Comment ça marche » : étapes (HowTo). */
  etapes?: { titre: string; texte: string }[]
  sections: SectionPilier[]
  /** 5 à 10 questions propres à la page. */
  faq: { q: string; a: string }[]
  /** Pages voisines (chemins existants). */
  liens: { href: string; nom: string; note?: string }[]
  /** Sources officielles (facultatif). */
  sources?: { nom: string; url: string }[]
  /** AAAA-MM-JJ. */
  maj: string
}
