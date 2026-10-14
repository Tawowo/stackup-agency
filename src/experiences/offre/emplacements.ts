import { VIDE, type Emplacement } from '@/components/maquettes/Morph'

/**
 * Les quatre maquettes de l'offre, en emplacements de dalles (cqw, fenêtre
 * 100 × 56,3). Même dix dalles pour les quatre : le passage de l'une à l'autre
 * est une métamorphose, pas un changement de vue.
 */
const v = (n: number): Emplacement[] => Array.from({ length: n }, () => VIDE)

export const EMPLACEMENTS: Record<'page' | 'multi' | 'boutique' | 'logiciel', Emplacement[]> = {
  // Une vraie page d'accueil d'artisan : photo, titre, bouton « Demander un devis ».
  page: [
    { role: 'nav', x: 0, y: 0, w: 100, h: 6.5 },
    { role: 'hero', x: 4, y: 10, w: 48, h: 34 },
    { role: 'photo', x: 56, y: 9.5, w: 40, h: 35 },
    { role: 'carte-0', x: 4, y: 47, w: 29, h: 7.6 },
    { role: 'carte-1', x: 35.5, y: 47, w: 29, h: 7.6 },
    { role: 'carte-2', x: 67, y: 47, w: 29, h: 7.6 },
    ...v(4),
  ],
  // Trois fenêtres en éventail sous un même menu : accueil, réalisations, contact.
  multi: [
    { role: 'menu', x: 0, y: 0, w: 100, h: 6.5 },
    { role: 'fen-accueil', x: 2.5, y: 12, w: 35, h: 40, rot: -7, z: 1 },
    { role: 'fen-contact', x: 62.5, y: 12, w: 35, h: 40, rot: 7, z: 2 },
    { role: 'fen-realisations', x: 32, y: 9, w: 36, h: 44.5, rot: 0, z: 3 },
    ...v(6),
  ],
  // Une boutique : grille de produits avec prix, panier qui se remplit.
  boutique: [
    { role: 'bout-entete', x: 0, y: 0, w: 100, h: 7 },
    { role: 'produit-0', x: 3, y: 9.5, w: 22.6, h: 21.6 },
    { role: 'produit-1', x: 27.2, y: 9.5, w: 22.6, h: 21.6 },
    { role: 'produit-2', x: 51.4, y: 9.5, w: 22.6, h: 21.6 },
    { role: 'produit-3', x: 3, y: 32.6, w: 22.6, h: 21.6 },
    { role: 'produit-4', x: 27.2, y: 32.6, w: 22.6, h: 21.6 },
    { role: 'produit-5', x: 51.4, y: 32.6, w: 22.6, h: 21.6 },
    { role: 'panier', x: 76, y: 9.5, w: 21, h: 44.7 },
    ...v(2),
  ],
  // Un tableau de bord : menu, chiffres, planning, graphique, liste.
  logiciel: [
    { role: 'dash-menu', x: 0, y: 0, w: 16.5, h: 56.3 },
    { role: 'dash-haut', x: 16.5, y: 0, w: 83.5, h: 6 },
    { role: 'kpi-0', x: 18.5, y: 8, w: 25.5, h: 11.5 },
    { role: 'kpi-1', x: 46, y: 8, w: 25.5, h: 11.5 },
    { role: 'kpi-2', x: 73.5, y: 8, w: 24.5, h: 11.5 },
    { role: 'planning', x: 18.5, y: 21.5, w: 49, h: 33.5 },
    { role: 'graphique', x: 69.5, y: 21.5, w: 28.5, h: 16 },
    { role: 'liste', x: 69.5, y: 39, w: 28.5, h: 16 },
    ...v(2),
  ],
}

export const URLS: Record<'page' | 'multi' | 'boutique' | 'logiciel', string> = {
  page: 'menuiserie-aubert.fr',
  multi: 'menuiserie-aubert.fr/realisations',
  boutique: 'atelier-du-bois.fr/boutique',
  logiciel: 'gestion.menuiserie-aubert.fr',
}

export const EMPLACEMENT_VIDE = Array.from({ length: 10 }, () => VIDE)
