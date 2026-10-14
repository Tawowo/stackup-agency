'use client'
/**
 * LE MONDE D'UN SERVICE LOCAL — la maquette de l'offre (page, pages, boutique,
 * outil) dont les dalles se posent puis s'ouvrent sur l'interface, comme sur
 * l'accueil. La boutique remplit son panier.
 */
import { useEffect, useRef, useState } from 'react'
import { gsap, initGsap } from '@/lib/gsap'
import Morph, { VIDE } from '@/components/maquettes/Morph'
import { EMPLACEMENTS, URLS } from '@/experiences/offre/emplacements'

type Cle = 'page' | 'multi' | 'boutique' | 'logiciel'

export default function MondeService({ maquette }: { maquette: Cle }) {
  const racine = useRef<HTMLDivElement>(null)
  const [pose, setPose] = useState(false)
  const [pret, setPret] = useState(false)
  const [panier, setPanier] = useState(0)

  useEffect(() => {
    const el = racine.current
    if (!el) return
    const io = new IntersectionObserver(([e]) => {
      const v = !!e?.isIntersecting
      setPose(v)
      if (!v) setPret(false)
    }, { threshold: 0.3 })
    io.observe(el)
    return () => io.disconnect()
  }, [])

  useEffect(() => {
    initGsap()
    if (!pose) return
    const reduit = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const d = gsap.delayedCall(reduit ? 0 : 1.1, () => setPret(true))
    return () => {
      d.kill()
    }
  }, [pose])

  useEffect(() => {
    if (!pret || maquette !== 'boutique') return
    let n = 0
    const d = gsap.delayedCall(1, function suite() {
      n = n >= 5 ? 0 : n + 1
      setPanier(n)
      d.restart(true).duration(n === 5 ? 2.6 : 1.1)
    })
    return () => {
      d.kill()
    }
  }, [pret, maquette])

  const vide = Array.from({ length: 10 }, () => VIDE)
  return (
    <div ref={racine} role="img" aria-label="Maquette du site ou de l’outil">
      <Morph emplacements={pose ? EMPLACEMENTS[maquette] : vide} pret={pret} url={URLS[maquette]} ctx={{ uid: 'ms', panier }} />
    </div>
  )
}
