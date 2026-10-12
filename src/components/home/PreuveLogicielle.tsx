'use client'

/**
 * Section d'accueil : la démonstration logicielle.
 *
 * Le pari est simple : sur une page d'accueil d'agence, un outil qui
 * fonctionne vraiment convainc plus qu'un paragraphe qui affirme savoir en
 * faire. C'est donc le composant réel du laboratoire qui est monté ici, pas
 * une capture ni une maquette.
 *
 * Il est chargé à la demande et sous la ligne de flottaison : il n'entre ni
 * dans le bundle initial ni dans le chemin critique du LCP.
 */

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import dynamic from 'next/dynamic'
import { ArrowRight } from 'lucide-react'

const Laboratoire = dynamic(() => import('@/components/laboratoire/Laboratoire'), {
  // Réserve exactement la hauteur du composant monté : sans cela, son arrivée
  // décalerait tout ce qui suit et ferait remonter le CLS.
  loading: () => <div className="min-h-[640px] rounded-xl bg-white border border-[#1E3A5F]/10" />,
})

export default function PreuveLogicielle() {
  const section = useRef<HTMLElement>(null)
  const [charger, setCharger] = useState(false)

  // Le laboratoire n'est monté qu'à l'approche de la section. Un visiteur qui
  // ne descend jamais jusqu'ici ne paie rien pour lui.
  useEffect(() => {
    const element = section.current
    if (!element) return
    if (typeof IntersectionObserver === 'undefined') {
      setCharger(true)
      return
    }
    const vigie = new IntersectionObserver(
      ([entree]) => {
        if (entree.isIntersecting) {
          setCharger(true)
          vigie.disconnect()
        }
      },
      { rootMargin: '400px' },
    )
    vigie.observe(element)
    return () => vigie.disconnect()
  }, [])

  return (
    <section ref={section} id="laboratoire" className="py-20 lg:py-28 su-ambiance ">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="max-w-2xl mb-10">
          <p className="su-surtitre mb-5">La preuve</p>
          <h2 className="font-display font-bold text-[#0C1626] text-[clamp(1.75rem,4vw,2.75rem)] leading-[1.1] tracking-[-0.02em] mb-5">
            Nous ne faisons pas que des sites.<br />
            Voici un logiciel — manipulez-le.
          </h2>
          <p className="text-[#475569] text-lg leading-relaxed">
            Ci-dessous, un outil de gestion d’interventions qui fonctionne
            réellement dans votre navigateur. Filtrez, triez, dépliez une ligne,
            faites avancer un dossier : les totaux se recalculent à chaque
            changement. Rien n’est simulé.
          </p>
        </div>

        <div className="min-h-[640px]">{charger && <Laboratoire />}</div>

        <div className="flex flex-wrap items-center gap-3 mt-8">
          <Link href="/laboratoire" className="su-action su-action--fantome">
            Comprendre ce que cette démonstration prouve
            <ArrowRight size={16} aria-hidden="true" />
          </Link>
          <Link href="/configurateur" className="su-action">
            Configurer mon projet
            <ArrowRight size={16} aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  )
}
