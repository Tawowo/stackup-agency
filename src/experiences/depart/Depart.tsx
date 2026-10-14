'use client'
/**
 * MOMENT 09 — LE DÉPART (CTA). « Il reste une chose à faire. »
 * Un seul champ (« Votre projet en une phrase ») et une action « Recevoir une
 * démo ». À l'envoi : redirection vers /contact avec le champ pré-rempli. En
 * arrière-plan, la pile se replie en logo : la page se termine comme elle a
 * commencé.
 */
import { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import StackFrame from '@/webgl/StackFrame'
import { useScene } from '@/webgl/store'
import { SplitText, gsap, initGsap } from '@/lib/gsap'
import { arriverParScroll } from '../arrivee'
import Action from '@/components/ui/Action'
import './depart.css'

export default function Depart() {
  const section = useRef<HTMLElement>(null)
  const titre = useRef<HTMLHeadingElement>(null)
  const [projet, setProjet] = useState('')
  const router = useRouter()

  useEffect(() => {
    initGsap()
    const el = section.current
    const h2 = titre.current
    if (!el || !h2) return
    const reduit = useScene.getState().reduced
    const split = new SplitText(h2, { type: 'words', wordsClass: 'su-dep__mot', aria: 'none' })
    const ctx = gsap.context(() => {
      if (!reduit) {
        gsap.set(split.words, { rotateX: -90, transformOrigin: '50% 100%' })
        gsap.to(split.words, { rotateX: 0, ease: 'power3.out', stagger: 0.12, scrollTrigger: { trigger: h2, start: 'top 95%', end: 'top 55%', scrub: true } })
      }
    }, el)
    const arret = arriverParScroll(el, { moment: '09', layout: 'logo', pose: { x: 0, y: 0 }, projection: 1, fin: 'top 50%' })
    return () => {
      ctx.revert()
      split.revert()
      arret()
    }
  }, [])

  const envoyer = (e: React.FormEvent) => {
    e.preventDefault()
    router.push(`/contact?projet=${encodeURIComponent(projet.trim())}`)
  }

  return (
    <section ref={section} className="su-dep" data-moment="09" data-nuit="1" data-titre="Le départ" id="depart" aria-labelledby="su-dep-titre">
      <div className="su-dep__grille">
        <div className="su-dep__scene" aria-hidden="true">
          <StackFrame className="su-dep__cadre" />
        </div>
        <div className="su-dep__texte">
          <p className="su-mono su-dep__etiquette">09 — Le départ</p>
          <h2 ref={titre} id="su-dep-titre" className="su-display su-dep__titre">
            Il reste une chose à faire.
          </h2>
          <form className="su-dep__form" onSubmit={envoyer} action="/contact" method="get">
            <label className="su-mono su-dep__label" htmlFor="su-dep-projet">
              Votre projet en une phrase
            </label>
            <input
              id="su-dep-projet"
              name="projet"
              className="su-dep__champ"
              type="text"
              value={projet}
              onChange={(e) => setProjet(e.target.value)}
              placeholder="Un site pour mon atelier de menuiserie à Tours"
              autoComplete="off"
              maxLength={200}
            />
            <Action type="submit" mot="Envoyer">
              Recevoir une démo
            </Action>
          </form>
        </div>
      </div>
    </section>
  )
}
