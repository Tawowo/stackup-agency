'use client'

/**
 * MOMENT 09 — LE DÉPART.
 *
 * Spécification : dossier §10.10. « Convertir, sans étoiles ni confettis. »
 *
 * CE QUE ÇA REMPLACE. La clôture précédente était un fond encre avec trente
 * étoiles clignotantes positionnées une par une, un halo qui respire et un
 * bouton à lueur. Le dossier écarte nommément les étoiles : elles sont de la
 * décoration empruntée à un autre métier, elles tournent en continu sans
 * qu'on puisse les arrêter, et elles ne disent rien de ce que fait
 * l'agence. Trente éléments animés en permanence au bas d'une page, c'est
 * aussi du travail que le navigateur fait pour rien.
 *
 * CE QUI LES REMPLACE. La bande revient au centre, grande, et se replie en
 * logo exact. Le site s'ouvre sur le logo qui devient un objet et se ferme
 * sur l'objet qui redevient le logo : la boucle est bouclée, et c'est la
 * seule chose à regarder. La projection repasse en orthographique, donc ce
 * qu'on voit à la fin est rigoureusement le logo — la même contrainte que
 * la règle 4.2 impose au repos du hero.
 *
 * LE REPLIEMENT NE BOUCLE PAS. Il se joue une fois, en 1 100 ms, quand la
 * section entre à l'écran, puis s'arrête. Une animation de fin qui
 * recommence sans fin est exactement ce que le dossier appelle une boucle
 * sans possibilité d'arrêt.
 *
 * LE « PROCHAIN CRÉNEAU » N'EST PAS CALCULÉ. Il s'affiche s'il est saisi
 * dans `site.ts`, et rien sinon. Le dossier en fait une règle (§15.3) :
 * une disponibilité déduite d'un calcul est une urgence fabriquée.
 */

import { useEffect, useRef } from 'react'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { SITE, aPartirDe } from '@/config/site'
import { useBande } from '@/store/bande'

/** Durée du repliement, celle de la fiche 11.1 relue à l'envers. */
const DUREE = 1100

export default function Depart() {
  const section = useRef<HTMLElement>(null)
  const ancre = useRef<HTMLDivElement>(null)
  const joue = useRef(false)

  useEffect(() => {
    const el = section.current
    const boite = ancre.current
    if (!el || !boite) return

    const { setEtat, setProgression, setAncrage } = useBande.getState()

    const relever = () => {
      const r = boite.getBoundingClientRect()
      setAncrage({
        cx: (r.left + r.width / 2) / window.innerWidth,
        cy: (r.top + r.height / 2) / window.innerHeight,
        hauteur: r.height / window.innerHeight,
      })
    }

    let image = 0
    let enAttente = false
    const auDefilement = () => {
      if (enAttente) return
      enAttente = true
      image = requestAnimationFrame(() => {
        enAttente = false
        if (useBande.getState().etat === 'depart') relever()
      })
    }

    let repli = 0
    const replier = () => {
      /* Mouvement réduit : la bande est posée à plat d'emblée. On retire
         l'animation, on ne la remplace pas. */
      if (useBande.getState().mouvement === 'aucun') {
        setProgression(0)
        return
      }
      const t0 = performance.now()
      const pas = (t: number) => {
        const e = Math.min(1, (t - t0) / DUREE)
        const k = e * e * (3 - 2 * e)
        setProgression(1 - k)
        if (e < 1) repli = requestAnimationFrame(pas)
      }
      repli = requestAnimationFrame(pas)
    }

    const vigie = new IntersectionObserver(
      ([e]) => {
        /* L'encre est portée par le body, pas par la section : un fond de
           section opaque passerait par-dessus le canvas et la bande
           deviendrait invisible. Voir le commentaire du bloc §34. */
        document.documentElement.dataset.fin = e.isIntersecting ? 'oui' : 'non'
        if (!e.isIntersecting) return
        setEtat('depart')
        relever()
        // Une seule fois : une clôture qui se rejoue à chaque passage
        // deviendrait une boucle.
        if (!joue.current) {
          joue.current = true
          setProgression(1)
          replier()
        }
      },
      { threshold: 0.45 },
    )
    vigie.observe(el)
    window.addEventListener('scroll', auDefilement, { passive: true })
    window.addEventListener('resize', auDefilement)
    return () => {
      delete document.documentElement.dataset.fin
      cancelAnimationFrame(image)
      cancelAnimationFrame(repli)
      vigie.disconnect()
      window.removeEventListener('scroll', auDefilement)
      window.removeEventListener('resize', auDefilement)
    }
  }, [])

  const cotes = [
    { valeur: aPartirDe(SITE.pricing.vitrine), note: 'tout inclus' },
    { valeur: SITE.delais.vitrine, note: 'de l’idée à la mise en ligne' },
    { valeur: '72 h', note: 'délai de réponse' },
    { valeur: '100 %', note: 'le code est à vous' },
  ]

  return (
    <section ref={section} className="su-depart" aria-labelledby="su-depart-titre">
      {/* La place de la bande. Vide : c'est une place, pas un contenu. */}
      <div ref={ancre} className="su-depart__scene" aria-hidden="true" />

      <div className="su-depart__corps">
        <p className="su-surtitre su-surtitre--nuit">09 — Démarrons</p>
        <h2 id="su-depart-titre" className="su-depart__titre">
          Votre site vous attend.
        </h2>

        {/* Les trois voies. L'ambre n'est portée que par la première : une
            seule couleur d'action, donc un seul geste mis en avant. */}
        <div className="su-depart__voies">
          <Link href="/realisations" className="su-depart__voie su-depart__voie--eclat">
            Voir une démo offerte
            <ArrowRight size={16} aria-hidden="true" />
          </Link>
          <Link href="/configurateur" className="su-depart__voie">
            Configurer mon projet
          </Link>
          <Link href="/contact" className="su-depart__voie">
            Poser une question
          </Link>
        </div>

        <dl className="su-depart__cotes">
          {cotes.map((c) => (
            <div key={c.note}>
              <dt>{c.valeur}</dt>
              <dd>{c.note}</dd>
            </div>
          ))}
        </dl>

        {/* Saisi à la main dans `site.ts`, ou rien du tout. */}
        {SITE.prochainCreneau ? (
          <p className="su-depart__creneau">
            Prochain créneau de démarrage : {SITE.prochainCreneau}
          </p>
        ) : null}
      </div>
    </section>
  )
}
