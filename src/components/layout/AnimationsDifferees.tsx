'use client'
/** Charge la couche d'animation globale en différé, côté client seulement. */
import dynamic from 'next/dynamic'

const Animations = dynamic(() => import('./Animations'), { ssr: false })

export default function AnimationsDifferees() {
  return <Animations />
}
