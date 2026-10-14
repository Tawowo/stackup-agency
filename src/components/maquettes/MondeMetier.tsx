'use client'
/**
 * LE MONDE D'UN MÉTIER — d'abord l'OUTIL du métier : des dalles de matière
 * s'assemblent en tableau de bord (devis, planning, chiffres) ; puis les
 * mêmes dalles se métamorphosent en MAQUETTE DU SITE de ce métier, dans une
 * fenêtre de navigateur. Le cycle recommence tant que la page est en vue.
 */
import { useEffect, useState } from 'react'
import { gsap, initGsap } from '@/lib/gsap'
import Morph, { VIDE } from './Morph'
import { EMPLACEMENTS } from '@/experiences/offre/emplacements'
import type { MetierBloc } from './blocs'
import { useRef } from 'react'

type Phase = 'attente' | 'outil' | 'outil-pret' | 'site' | 'site-pret'

export default function MondeMetier({ metier }: { metier: MetierBloc }) {
  const racine = useRef<HTMLDivElement>(null)
  const [phase, setPhase] = useState<Phase>('attente')
  const [visible, setVisible] = useState(false)

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
    const reduit = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduit) {
      const d = gsap.delayedCall(0, () => setPhase('site-pret'))
      return () => {
        d.kill()
      }
    }
    // outil (dalles) → outil (interface) → site (dalles en route) → site (interface) → pause → boucle
    const tl = gsap.timeline({ repeat: -1, repeatDelay: 0 })
    tl.call(() => setPhase('outil'), [], 0.2)
    tl.call(() => setPhase('outil-pret'), [], 1.4)
    tl.call(() => setPhase('site'), [], 4.6)
    tl.call(() => setPhase('site-pret'), [], 5.8)
    tl.call(() => setPhase('attente'), [], 11.5)
    return () => {
      tl.kill()
    }
  }, [visible])

  const enOutil = phase === 'outil' || phase === 'outil-pret'
  const emplacements = phase === 'attente' ? Array.from({ length: 10 }, () => VIDE) : enOutil ? EMPLACEMENTS.logiciel : EMPLACEMENTS.page
  const pret = phase === 'outil-pret' || phase === 'site-pret'
  const url = enOutil ? `gestion.${slugDomaine(metier.nom)}.fr` : `${slugDomaine(metier.nom)}.fr`
  return (
    <div ref={racine} className="mq-monde" role="img" aria-label={`Maquette : l’outil de gestion d’un ${metier.nom.toLowerCase()}, puis son site`}>
      <Morph emplacements={emplacements} pret={pret} url={url} ctx={{ uid: 'mm', metier }} />
      <p className="mq-monde__legende su-mono" aria-hidden="true">
        {enOutil ? 'L’outil du métier' : phase === 'attente' ? '…' : 'Le site du métier'}
      </p>
    </div>
  )
}

function slugDomaine(nom: string) {
  return nom
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
}
