'use client'

/**
 * HERO — L'OUVERTURE DU PASSAGE.
 *
 * Ce n'est plus « un titre à côté d'un objet 3D ». La composition est
 * construite sur trois plans de profondeur traversés par le regard :
 *
 *   plan −1  le nuage de particules (canvas fixe, derrière tout)
 *   plan  0  des plaques en parallaxe lente, derrière le texte
 *   plan  1  la typographie
 *   plan  2  des plaques en parallaxe rapide, DEVANT le texte
 *
 * Le titre lui-même est sculpté : trois niveaux typographiques très
 * différents plutôt qu'un bloc homogène, et le mot porteur arrive lettre par
 * lettre. Le contenu référençable est strictement identique à l'ancien hero.
 */

import { useEffect, useRef } from 'react'
import Link from 'next/link'
import dynamic from 'next/dynamic'
import { ArrowRight } from 'lucide-react'
import { SITE } from '@/config/site'
import CountUp from '@/components/ui/CountUp'
import BoutonMagnetique from '@/components/ui/BoutonMagnetique'

const Passage = dynamic(() => import('@/components/webgl/Passage'), { ssr: false })

const MOT = 'décoller'
const TITRE_COMPLET = 'Le site web qui fait décoller votre activité.'

/** Plaques de parallaxe. Déterministes : deux chargements donnent la même image. */
const PLAQUES_AVANT = [
  { x: -4, y: 30, l: 210, h: 15, r: -14, p: 0.55, o: 0.95 },
  { x: 86, y: 76, l: 260, h: 18, r: -16, p: 0.74, o: 0.9 },
  { x: 30, y: 94, l: 150, h: 13, r: -11, p: 0.44, o: 0.85 },
]

const CONFIANCE = [
  { valeur: 10, suffixe: ' j', libelle: "de l'idée à la mise en ligne", accent: true },
  { valeur: 100, suffixe: ' %', libelle: 'sur mesure — zéro template', accent: false },
  { valeur: 72, suffixe: ' h', libelle: 'réponse garantie', accent: true },
  { texte: 'Code livré', libelle: 'vous êtes propriétaire', accent: false },
] as const

function Plaques({
  liste,
  classe,
}: {
  liste: typeof PLAQUES_AVANT
  classe: string
}) {
  const hote = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = hote.current
    if (!el) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    let image = 0
    let attente = false
    const souris = { x: 0, y: 0 }
    const lisse = { x: 0, y: 0 }

    const peindre = () => {
      lisse.x += (souris.x - lisse.x) * 0.07
      lisse.y += (souris.y - lisse.y) * 0.07
      const y = window.scrollY
      el.style.setProperty('--su-par-y', String(y))
      el.style.setProperty('--su-par-mx', lisse.x.toFixed(3))
      el.style.setProperty('--su-par-my', lisse.y.toFixed(3))
      image = 0
    }

    const planifier = () => {
      if (attente) return
      attente = true
      requestAnimationFrame(() => {
        attente = false
        peindre()
      })
    }

    const surSouris = (e: PointerEvent) => {
      if (e.pointerType === 'touch') return
      souris.x = (e.clientX / window.innerWidth) * 2 - 1
      souris.y = (e.clientY / window.innerHeight) * 2 - 1
      planifier()
    }

    // Boucle continue tant que le lissage n'a pas convergé.
    const boucle = () => {
      peindre()
      image = requestAnimationFrame(boucle)
    }
    image = requestAnimationFrame(boucle)

    window.addEventListener('pointermove', surSouris, { passive: true })
    window.addEventListener('scroll', planifier, { passive: true })
    return () => {
      cancelAnimationFrame(image)
      window.removeEventListener('pointermove', surSouris)
      window.removeEventListener('scroll', planifier)
    }
  }, [])

  return (
    <div ref={hote} className={`su-plaques ${classe}`} aria-hidden="true">
      {liste.map((p, i) => (
        <span
          key={i}
          className="su-plaque"
          style={
            {
              '--x': `${p.x}%`,
              '--y': `${p.y}%`,
              '--l': `${p.l}px`,
              '--h': `${p.h}px`,
              '--r': `${p.r}deg`,
              '--p': p.p,
              '--o': p.o,
              '--i': i,
            } as React.CSSProperties
          }
        />
      ))}
    </div>
  )
}

export default function HeroSection() {
  // Aucune bascule d'état ici, volontairement.
  //
  // L'ouverture était auparavant déclenchée par un `useState` posé après le
  // montage. Mesuré au navigateur : quand le fil principal sature, ce rendu
  // n'arrive pas, et l'intégralité du hero reste invisible. Les révélations
  // sont désormais purement CSS, sous `.su-js` : elles partent au parse et
  // se jouent sur le compositeur, hors de portée d'un JavaScript en retard.
  return (
    <section
      data-scene="ouverture"
      data-nuit="1"
      className="su-hero-passage su-ambiance"
    >
      <Passage />

      <div className="su-scene-devant w-full max-w-6xl mx-auto px-4 sm:px-6 pt-28 pb-16 lg:pt-32 lg:pb-24">
        <p className="su-surtitre su-ouverture su-ouverture--1 mb-6 lg:mb-8">
          Agence web — Tours
        </p>

        {/* Le libellé accessible porte la phrase entière : les lettres
            séparées ne sont lues ni épelées. */}
        <h1 className="su-titre-sculpte" aria-label={TITRE_COMPLET}>
          <span className="su-titre__amorce su-ouverture su-ouverture--2">
            Le site web qui fait
          </span>

          <span className="sr-only"> </span>
          <span className="su-titre__mot">
            {MOT.split('').map((lettre, i) => (
              <span
                key={i}
                className="su-lettre"
                style={{ '--i': i, '--n': MOT.length } as React.CSSProperties}
              >
                {lettre}
              </span>
            ))}
          </span>

          <span className="sr-only"> </span>
          <span className="su-titre__chute su-ouverture su-ouverture--3">
            votre activité.
          </span>
        </h1>

        <p className="su-doux su-accroche su-ouverture su-ouverture--4">
          <span>Sites vitrines,</span> <span>e-commerce</span> <span>et applications</span>{' '}
          <span>sur mesure</span> <span>— conçus,</span> <span>développés</span>{' '}
          <span>et mis en ligne</span> <span>en {SITE.delais.vitrine}.</span>
        </p>

        <div className="flex flex-wrap items-center gap-3.5 mb-5 su-ouverture su-ouverture--5">
          <BoutonMagnetique href="/contact" className="su-action su-action--eclat">
            Obtenir mon devis gratuit
            <ArrowRight size={17} aria-hidden="true" />
          </BoutonMagnetique>
          <Link href="/services" className="su-lien-trace">
            Découvrir nos services
          </Link>
        </div>

        <p className="text-[13px] su-doux su-ouverture su-ouverture--6">
          À partir de {SITE.pricing.vitrine} € · Devis gratuit sous 72 h
        </p>

        <div className="su-confiance su-ouverture su-ouverture--7">
          {CONFIANCE.map((item, i) => (
            <div
              key={item.libelle}
              className="su-carte-ambiance su-confiance__item"
              style={{ '--i': i } as React.CSSProperties}
            >
              <div className={`su-confiance__valeur ${item.accent ? 'su-accent' : ''}`}>
                {'valeur' in item ? (
                  <CountUp target={item.valeur} suffix={item.suffixe} duration={1400} />
                ) : (
                  item.texte
                )}
              </div>
              <div className="su-confiance__libelle su-doux">{item.libelle}</div>
            </div>
          ))}
        </div>

        <div className="su-defiler su-ouverture su-ouverture--8" aria-hidden="true">
          <span className="su-defiler__mot">Descendre</span>
          <span className="su-defiler__rail">
            <span className="su-defiler__curseur" />
          </span>
        </div>
      </div>

      <Plaques liste={PLAQUES_AVANT} classe="su-plaques--avant" />
    </section>
  )
}
