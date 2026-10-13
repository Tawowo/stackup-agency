'use client'

/**
 * LE DÉCLARATEUR, pour les pages rendues côté serveur.
 *
 * `useEtatBande` est un hook, donc client. La plupart des pages du site sont
 * des composants serveur — et doivent le rester : leur contenu est statique,
 * référencé, et n'a aucune raison d'être hydraté.
 *
 * Ce composant n'existe que pour porter la déclaration. Il ne rend rien, ne
 * mesure rien, n'écoute rien : une ligne dans le JSX d'une page serveur, et
 * la scène sait ce que cette page veut.
 *
 *     <DeclareScene etat="plan" />
 *
 * C'est volontairement plus verbeux qu'un `setEtat` global appelé quelque
 * part : la déclaration est VISIBLE dans la page qui la fait, et se supprime
 * en supprimant une ligne.
 */

import { useEtatBande } from './useEtatBande'
import type { EtatBande } from '@/store/bande'

export default function DeclareScene({
  etat,
  accent = null,
}: {
  etat: EtatBande
  accent?: string | null
}) {
  useEtatBande(etat, { accent })
  return null
}
