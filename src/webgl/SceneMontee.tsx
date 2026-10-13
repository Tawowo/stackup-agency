'use client'

/**
 * Le point de montage client de la scène, et la remise à zéro au changement
 * de page.
 *
 * Next 15 interdit `next/dynamic` avec `ssr: false` dans un composant
 * serveur, et le layout racine en est un. Ce fichier porte donc la directive
 * `'use client'`.
 *
 * `ssr: false` compte : la scène n'a rien à faire dans le HTML envoyé. Le
 * plus grand élément affiché doit être le titre, pas le canvas (budget 16.3,
 * LCP ≤ 2,5 s sur mobile throttlé).
 *
 * POURQUOI UNE REMISE À ZÉRO ICI. Le canvas est persistant : il survit à la
 * navigation, c'est tout son intérêt. Mais l'état qu'il lit survit aussi. En
 * quittant l'accueil — qui déclare 'logo' puis 'offre' — pour une page qui ne
 * déclare rien, la bande gardait le dernier état et continuait de s'afficher
 * par-dessus le contenu. Vu en capture : le ruban barrait le texte d'une
 * section entière.
 *
 * La remise à zéro rend la règle vraie dans les deux sens : une page obtient
 * la scène si et seulement si elle la demande. Les sections qui la demandent
 * le font depuis un `IntersectionObserver` qui se redéclenche au montage, et
 * reprennent donc la main dans la même image.
 */
import { useEffect } from 'react'
import dynamic from 'next/dynamic'
import { usePathname } from 'next/navigation'
import { useBande } from '@/store/bande'

const Scene = dynamic(() => import('./Scene'), { ssr: false })

export default function SceneMontee() {
  const chemin = usePathname()

  useEffect(() => {
    const { setEtat, setAncrage, setProgression, setAccent } = useBande.getState()
    setEtat('absent')
    setAncrage(null)
    setProgression(0)
    setAccent(null)
  }, [chemin])

  return <Scene />
}
