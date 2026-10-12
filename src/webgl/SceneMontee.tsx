'use client'

/**
 * Le point de montage client de la scène.
 *
 * Next 15 interdit `next/dynamic` avec `ssr: false` dans un composant
 * serveur, et le layout racine en est un. Ce fichier n'existe que pour
 * porter la directive `'use client'` : il n'ajoute aucune logique.
 *
 * `ssr: false` compte : la scène n'a rien à faire dans le HTML envoyé. Le
 * plus grand élément affiché doit être le titre, pas le canvas (budget 16.3,
 * LCP ≤ 2,5 s sur mobile throttlé).
 */
import dynamic from 'next/dynamic'

const Scene = dynamic(() => import('./Scene'), { ssr: false })

export default function SceneMontee() {
  return <Scene />
}
