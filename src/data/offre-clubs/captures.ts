/**
 * CAPTURES DE LA DÉMO — vraies captures du club fictif « Grand Chelem Tennis Club », prises par
 * scripts/clubs-captures.mjs sur la démo en ligne (ordinateur et téléphone, mêmes ratios que les réalisations).
 * Chaque identifiant donne un écran d'ordinateur et un écran de téléphone pour les appareils (`Duo`).
 */
import type { Ecran } from '@/experiences/galerie/projets'
import { CAPTURES_CLUBS } from '@/config/captures-clubs.generated'

export const IDS_CAPTURES = [
  'site-accueil',
  'site-adhesion',
  'site-challenge',
  'site-reserver',
  'site-ecole',
  'bureau-journee',
  'bureau-adherents',
  'bureau-adhesions',
  'bureau-licences',
  'bureau-ecole',
  'bureau-challenge',
  'bureau-equipes',
  'bureau-tournois',
  'bureau-communication',
  'bureau-tresorerie',
  'bureau-statistiques',
  'bureau-automatisations',
  'bureau-assistant',
  'editeur',
  'espace-parent',
  'espace-jeu',
] as const
export type IdCapture = (typeof IDS_CAPTURES)[number]

/** Ce que montre chaque capture (texte alternatif et légende). */
export const LEGENDES: Record<IdCapture, string> = {
  'site-accueil': 'Le site du club : la page d’accueil',
  'site-adhesion': 'Le site du club : l’adhésion familiale en ligne',
  'site-challenge': 'Le site du club : le tableau du Challenge interne',
  'site-reserver': 'Le site du club : la réservation d’un court',
  'site-ecole': 'Le site du club : la page de l’école de tennis',
  'bureau-journee': 'Le logiciel du bureau : « Ma journée » de la présidente',
  'bureau-adherents': 'Le logiciel du bureau : les adhérents et les familles',
  'bureau-adhesions': 'Le logiciel du bureau : le suivi des dossiers d’adhésion',
  'bureau-licences': 'Le logiciel du bureau : les licences et les fichiers ADOC',
  'bureau-ecole': 'Le logiciel du bureau : l’école de tennis',
  'bureau-challenge': 'Le logiciel du bureau : le classement du Challenge',
  'bureau-equipes': 'Le logiciel du bureau : les équipes et les compositions',
  'bureau-tournois': 'Le logiciel du bureau : les tournois internes',
  'bureau-communication': 'Le logiciel du bureau : la communication',
  'bureau-tresorerie': 'Le logiciel du bureau : la trésorerie',
  'bureau-statistiques': 'Le logiciel du bureau : les statistiques',
  'bureau-automatisations': 'Le logiciel du bureau : les automatisations',
  'bureau-assistant': 'Le logiciel du bureau : l’assistant du club',
  editeur: 'L’éditeur du site : modifier une page en place',
  'espace-parent': 'L’espace parent : le planning des enfants',
  'espace-jeu': 'L’espace membre : saisir et confirmer un match',
}

const ecran = (id: IdCapture, famille: 'bureau' | 'mobile'): Ecran => {
  const c = (CAPTURES_CLUBS.captures as Record<string, { bureau: { fichier: string; largeur: number; hauteur: number } | null; mobile: { fichier: string; largeur: number; hauteur: number } | null }>)[id]?.[famille]
  return c ? { manquant: false, bande: null, images: [{ ...c, legende: LEGENDES[id] }] } : { manquant: true, bande: null, images: [] }
}

/** Écrans d'une capture, pour `Duo`, `Portable` ou `Telephone`. */
export function captureDemo(id: IdCapture) {
  return { nom: 'Démo Grand Chelem Tennis Club', bureau: ecran(id, 'bureau'), mobile: ecran(id, 'mobile') }
}

/** Plusieurs captures enchaînées sur le même appareil (défilement de haut en bas). */
export function suiteDemo(ids: { bureau: IdCapture[]; mobile: IdCapture[] }) {
  const unir = (liste: IdCapture[], f: 'bureau' | 'mobile'): Ecran => {
    const images = liste.flatMap((id) => ecran(id, f).images)
    return { manquant: images.length === 0, bande: null, images }
  }
  return { nom: 'Démo Grand Chelem Tennis Club', bureau: unir(ids.bureau, 'bureau'), mobile: unir(ids.mobile, 'mobile') }
}
