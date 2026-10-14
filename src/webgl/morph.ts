/**
 * LE MORPH — l'uniform `uMorph` (0 → 1) partagé par référence. Module sans
 * three : les expériences l'écrivent au scroll sans tirer le moteur 3D dans
 * le chargement initial ; `engine.ts` le branche tel quel dans ses uniforms.
 */
export const MORPH: { value: number } = { value: 0 }
