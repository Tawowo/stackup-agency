/**
 * LE CADRAGE PARTAGÉ.
 *
 * La caméra et la bande doivent s'accorder sur une seule valeur : la hauteur
 * du monde visible au plan z = 0. Tant qu'elle vivait dans `CameraRig`, la
 * bande devait la deviner — et elle la devinait par `state.viewport` de
 * React Three Fiber, qui la calcule à partir du `fov` et de la position de la
 * caméra.
 *
 * Ça ne pouvait pas marcher ici : la projection de cette scène n'est PAS
 * celle d'une caméra perspective ordinaire, c'est une matrice mélangée entre
 * orthographique et perspective (voir `CameraRig`). `viewport` renvoyait donc
 * une hauteur qui ne correspondait à rien, et la bande se plaçait hors du
 * cadre — le premier rendu du hero montrait le lettrage seul, avec un trou à
 * la place du ruban.
 *
 * La valeur est donc définie ici, une fois, et les deux la lisent.
 */
import { HAUTEUR_MONDE } from './bande/geometrie'

/**
 * La bande occupe 62 % de la hauteur visible en paysage.
 *
 * En portrait, elle vit dans une zone dédiée du haut d'écran (§14.3) : le
 * monde visible est plus grand, donc la bande y occupe une part plus petite.
 */
export const FRACTION_PAYSAGE = 0.62
export const FRACTION_PORTRAIT = 0.62 / 1.25

export function hauteurVisible(portrait: boolean): number {
  return HAUTEUR_MONDE / (portrait ? FRACTION_PORTRAIT : FRACTION_PAYSAGE)
}

/** Champ de vision de la projection perspective, en degrés (fiche 11.1). */
export const FOV = 38

/** Distance caméra qui donne cette hauteur visible au plan z = 0. */
export function distanceCamera(portrait: boolean): number {
  return hauteurVisible(portrait) / 2 / Math.tan((FOV * Math.PI) / 360)
}
