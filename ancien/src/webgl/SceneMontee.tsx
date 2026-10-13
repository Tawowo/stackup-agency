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
import { useEffect, useState } from 'react'
import dynamic from 'next/dynamic'
import { usePathname } from 'next/navigation'
import { useBande } from '@/store/bande'

const Scene = dynamic(() => import('./Scene'), { ssr: false })

export default function SceneMontee() {
  const chemin = usePathname()

  /* LA SCÈNE ATTEND QUE LA PAGE SOIT POSÉE.
   *
   * `ssr: false` empêchait le canvas d'entrer dans le HTML, mais pas son
   * code d'être récupéré et exécuté pendant l'hydratation — c'est-à-dire
   * exactement pendant que le navigateur essaie d'afficher le titre.
   *
   * Mesuré avec les budgets du dossier (§16.3) : LCP de 3 270 ms en moyenne
   * sur cinq routes, pour un plafond de 2 500 ms, et un TBT au-dessus des
   * 200 ms sur trois d'entre elles. Le plus grand élément affiché doit être
   * le titre, pas le canvas — le dossier en fait une règle.
   *
   * `requestIdleCallback` laisse passer le rendu initial et monte la scène
   * dans le premier temps mort. Le repli à 1,2 s couvre Safari, qui ne
   * connaît pas cette fonction ; un onglet qui n'a jamais de temps mort
   * obtient donc la scène quand même, un peu plus tard.
   */
  const [pretPourScene, setPretPourScene] = useState(false)

  /* ET SURTOUT : AUCUNE PAGE NE PAIE POUR UNE SCÈNE QU'ELLE NE DEMANDE PAS.
   *
   * Mesuré sur /blog, qui ne demandait rien à ce moment-là : les mêmes
   * 238 ko de morceaux three/R3F y étaient téléchargés que sur l'accueil.
   * Un visiteur venu lire un article payait le moteur 3D en entier pour un
   * canvas qui ne dessine rien.
   *
   * La scène n'est donc montée qu'à partir du moment où une page DÉCLARE un
   * état — et elle le reste ensuite, parce que c'est tout l'intérêt du
   * canvas persistant : une fois créé, le contexte WebGL traverse les pages
   * au lieu d'être recréé à chaque navigation.
   *
   * Les deux conditions se cumulent : il faut un temps mort ET une demande.
   */
  const [dejaDemandee, setDejaDemandee] = useState(false)
  useEffect(() => {
    if (useBande.getState().etat !== 'absent') {
      setDejaDemandee(true)
      return
    }
    return useBande.subscribe(
      (s) => s.etat,
      (etat) => {
        if (etat !== 'absent') setDejaDemandee(true)
      },
    )
  }, [])

  useEffect(() => {
    const w = window as unknown as {
      requestIdleCallback?: (cb: () => void, o?: { timeout: number }) => number
      cancelIdleCallback?: (id: number) => void
    }
    if (typeof w.requestIdleCallback === 'function') {
      const id = w.requestIdleCallback(() => setPretPourScene(true), { timeout: 2000 })
      return () => w.cancelIdleCallback?.(id)
    }
    const t = window.setTimeout(() => setPretPourScene(true), 1200)
    return () => window.clearTimeout(t)
  }, [])

  useEffect(() => {
    const { setEtat, setAncrage, setProgression, setAccent } = useBande.getState()
    setEtat('absent')
    setAncrage(null)
    setProgression(0)
    setAccent(null)
  }, [chemin])

  return pretPourScene && dejaDemandee ? <Scene /> : null
}
