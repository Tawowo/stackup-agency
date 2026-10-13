'use client'
/**
 * NOTRE RAISON D'ÊTRE — V5.1
 * Portrait gauche volet + texte ligne masquée + trait orange sous "accessibles à tous"
 */
import { useRef, useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { SITE } from '@/config/site'

const PARAGRAPHS = [
  `Stackup Agency est née d'un constat simple : les indépendants et les petites entreprises méritent le même niveau de site web que les grands groupes — mais les tarifs des agences classiques les en excluent presque toujours.`,
  `Nous avons donc construit l'agence autrement : des prix pensés pour les auto-entrepreneurs, les artisans, les commerçants et toutes les structures qui n'ont pas les moyens d'une multinationale. Sans jamais toucher à la qualité — le prix bas n'est pas une concession, c'est le projet.`,
  `Parce qu'entre petites entreprises, on se doit ce soutien-là. Certaines n'existeraient plus sans un site qui travaille pour elles. Et ce qui est un droit d'accès pour les petites structures devient, pour les plus grandes, un avantage économique évident.`,
]

export default function RaisonDetre() {
  const sectionRef = useRef<HTMLElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = sectionRef.current
    if (!el) return
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setVisible(true); obs.disconnect() }
    }, { threshold: 0.15 })
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  return (
    <section ref={sectionRef} id="raison-detre" className="py-24 su-ambiance relative overflow-hidden">
      {/* Halo doux */}
      <div className="pointer-events-none absolute top-0 right-0 w-[500px] h-[400px]" aria-hidden="true"
        style={{ background: 'radial-gradient(ellipse at 80% 0%, rgba(245,158,11,0.06) 0%, transparent 70%)' }} />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">

          {/* ── Portrait gauche — volet reveal ── */}
          <div className="relative order-2 lg:order-1">
            <div
              className="rd-portrait relative rounded-2xl overflow-hidden shadow-[0_24px_64px_rgba(30,58,95,0.14)]"
              style={{
                clipPath: visible ? 'inset(0 0% 0 0)' : 'inset(0 100% 0 0)',
                transition: 'clip-path 0.9s cubic-bezier(0.22,1,0.36,1)',
              }}
            >
              <Image
                src="/images/portrait-fondateur.webp"
                alt="Fondateur de Stackup Agency"
                width={600}
                height={750}
                className="w-full h-auto object-cover"
                style={{ filter: 'grayscale(1) contrast(1.05)' }}
              />
              {/* Overlay sobre */}
              <div className="absolute inset-0 bg-gradient-to-t from-navy/20 via-transparent to-transparent" />
            </div>
            {/* Halo portrait */}
            <div className="pointer-events-none absolute -bottom-6 -left-6 w-40 h-40 rounded-full" aria-hidden="true"
              style={{ background: 'radial-gradient(circle, rgba(245,158,11,0.10) 0%, transparent 70%)' }} />
          </div>

          {/* ── Texte droit ── */}
          <div className="order-1 lg:order-2">
            {/* Surtitre */}
            <p
              className="su-surtitre mb-5 su-decoupe"
              data-posee={visible}
            >
              08 — Notre raison d&apos;être
            </p>

            {/* Titre avec trait dessiné sous "accessibles à tous" */}
            <div
              className="mb-8 su-decoupe"
              data-posee={visible}
            >
              <h2 className="text-3xl lg:text-4xl font-bold text-navy" style={{ lineHeight: 1.2 }}>
                Des sites d&apos;exception,{' '}
                <span className="relative inline-block">
                  accessibles à tous
                  {/* Trait orange dessiné */}
                  <span
                    className="absolute bottom-0 left-0 h-[3px] bg-gold rounded-full"
                    aria-hidden="true"
                    style={{
                      width: visible ? '100%' : '0%',
                      transition: 'width 0.8s cubic-bezier(0.22,1,0.36,1) 0.7s',
                    }}
                  />
                </span>
                .
              </h2>
            </div>

            {/* Paragraphes en révélation décalée */}
            <div className="space-y-5 mb-8">
              {PARAGRAPHS.map((p, i) => (
                <p
                  key={i}
                  className="text-navy/75 leading-relaxed text-[15px] su-decoupe"
                  data-posee={visible}
                  style={{ transitionDelay: `${0.2 + i * 0.12}s` }}
                >
                  {p}
                </p>
              ))}
            </div>

            {/* CTA */}
            <div className="su-decoupe" data-posee={visible}>
              <Link
                href="/a-propos"
                className="inline-flex items-center gap-2 text-navy font-semibold text-sm border-b border-navy/25 hover:border-gold hover:text-[#B45309] transition-all duration-200 pb-0.5"
              >
                Notre histoire <ArrowRight size={14} />
              </Link>
            </div>
          </div>

        </div>

        {/* LES TROIS ENGAGEMENTS VÉRIFIABLES (dossier §10.9).

            « Vérifiable » est le mot qui compte : chacun des trois peut être
            contrôlé par le lecteur sans nous croire sur parole. Le premier
            est dans les CGV, le deuxième se constate en parcourant le site,
            le troisième mène aux douze documents contractuels, en ligne et
            téléchargeables. Un engagement qu'on ne peut pas vérifier est un
            argument, pas un engagement.

            Le deuxième n'est devenu vrai qu'en supprimant six témoignages
            inventés qui figuraient encore sur les pages de services locaux.
            Il n'aurait pas pu être écrit avant. */}
        <ul className="su-engagements">
          <li>
            <h3>Le code vous appartient</h3>
            <p>
              {SITE.conditions.propriete} C’est à l’article des conditions
              générales, pas une promesse orale.
            </p>
            <Link href="/cgv">Lire les CGV</Link>
          </li>
          <li>
            <h3>Aucun témoignage inventé</h3>
            <p>
              Pas de citation attribuée à un client anonyme, pas de
              pourcentage de performance sans source. Les démonstrations sont
              annoncées comme telles sur chaque fiche.
            </p>
            <Link href="/realisations">Voir les démonstrations</Link>
          </li>
          <li>
            <h3>Les documents sont publics</h3>
            <p>
              Contrat de prestation, bon de commande, procès-verbal de
              livraison, cession de droits : les douze documents sont en ligne
              avant que vous ne signiez quoi que ce soit.
            </p>
            <Link href="/ressources/documents">Les douze documents</Link>
          </li>
        </ul>
      </div>
    </section>
  )
}
