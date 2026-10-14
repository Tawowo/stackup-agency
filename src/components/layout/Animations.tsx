'use client'
/**
 * LA COUCHE D'ANIMATION GLOBALE — défilement (Lenis), lumière, rafraîchissement
 * des ScrollTriggers, traversée. Chargée après l'hydratation (budget § 10 :
 * GSAP et Lenis hors du chemin critique ; le contenu est déjà là sans elle).
 */
import Defilement from './Defilement'
import Lumiere from '@/experiences/lumiere'
import ScrollRefresh from './ScrollRefresh'
import Traversee from '@/experiences/traversee/Traversee'

export default function Animations() {
  return (
    <>
      <Defilement />
      <Lumiere />
      <ScrollRefresh />
      <Traversee />
    </>
  )
}
