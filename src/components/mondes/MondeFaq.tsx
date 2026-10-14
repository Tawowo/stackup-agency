'use client'
/**
 * LE MONDE DE LA FAQ — une vraie conversation : la question d'un artisan
 * s'écrit dans une bulle, trois points « en train d'écrire », puis la réponse
 * de Mathéo, courte. Les couples question / réponse défilent en boucle ; un
 * clic sur une puce passe au suivant. Les réponses viennent de la FAQ.
 */
import { useEffect, useRef, useState } from 'react'
import { gsap, initGsap } from '@/lib/gsap'
import './mondes.css'

export interface Echange {
  q: string
  r: string
}

type Etape = 0 | 1 | 2 | 3 // rien · question · écrit… · réponse

export default function MondeFaq({ echanges, qui }: { echanges: Echange[]; qui: string }) {
  const [k, setK] = useState(0)
  const [etape, setEtape] = useState<Etape>(3)
  const [visible, setVisible] = useState(false)
  const racine = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = racine.current
    if (!el) return
    const io = new IntersectionObserver(([e]) => setVisible(!!e?.isIntersecting), { threshold: 0.3 })
    io.observe(el)
    return () => io.disconnect()
  }, [])

  useEffect(() => {
    initGsap()
    if (!visible) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      const d = gsap.delayedCall(0, () => setEtape(3))
      return () => {
        d.kill()
      }
    }
    const tl = gsap.timeline()
    tl.call(() => setEtape(1), [], 0.15)
    tl.call(() => setEtape(2), [], 1.3)
    tl.call(() => setEtape(3), [], 2.4)
    tl.call(() => setK((x) => (x + 1) % echanges.length), [], 8.6)
    tl.call(() => setEtape(0), [], 8.6)
    tl.repeat(-1)
    return () => {
      tl.kill()
    }
  }, [visible, echanges.length])

  const e = echanges[k]!
  return (
    <div ref={racine} className="mw-faq" role="group" aria-label="Exemple d’échange : une question, sa réponse">
      <div className="mw-faq__fenetre">
        <div className="mw-faq__entete">
          <span className="mw-faq__pastille" aria-hidden="true">
            S
          </span>
          <span>
            <b>{qui}</b>
            <small>répond lui-même</small>
          </span>
        </div>
        <div className="mw-faq__fil">
          {etape >= 1 && (
            <p key={`q${k}`} className="mw-bulle mw-bulle--q">
              {e.q}
            </p>
          )}
          {etape === 2 && (
            <p key={`p${k}`} className="mw-bulle mw-bulle--r mw-bulle--points" aria-label="En train d’écrire">
              <i />
              <i />
              <i />
            </p>
          )}
          {etape >= 3 && (
            <p key={`r${k}`} className="mw-bulle mw-bulle--r">
              {e.r}
            </p>
          )}
        </div>
      </div>
      <div className="mw-faq__puces" role="tablist" aria-label="Choisir une question">
        {echanges.map((x, i) => (
          <button
            key={x.q}
            type="button"
            role="tab"
            aria-selected={i === k}
            aria-label={`Question ${i + 1}`}
            data-on={i === k ? '1' : '0'}
            onClick={() => {
              setK(i)
              setEtape(3)
            }}
          />
        ))}
      </div>
    </div>
  )
}
