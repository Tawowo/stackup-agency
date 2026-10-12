'use client'

/**
 * HERO — LE MONOLITHE.
 *
 * Remplace l'éditeur de code animé. L'audit a relevé que cet effet, très
 * répandu, ne démontrait aucune capacité réelle : du faux code qui se tape
 * dans une fausse fenêtre. La scène 3D, elle, est exécutée par le navigateur
 * du visiteur — c'est la démonstration qui remplace la promesse.
 *
 * Conséquence de performance recherchée : plus aucune image dans le hero.
 * Le LCP n'est plus un fichier de 100 ko à télécharger mais le titre lui-même,
 * déjà présent dans le HTML servi.
 *
 * Tout le contenu commercial et référençable de l'ancien hero est conservé à
 * l'identique : titre, accroche, deux appels à l'action, mention tarifaire,
 * barre de confiance.
 */

import Link from 'next/link'
import dynamic from 'next/dynamic'
import { ArrowRight } from 'lucide-react'
import { SITE } from '@/config/site'
import CountUp from '@/components/ui/CountUp'

// `ssr: false` : la scène n'a aucun rendu serveur utile, et ce découpage
// garantit que `three` reste hors du bundle de la page.
const Monolithe = dynamic(() => import('@/components/webgl/Monolithe'), {
  ssr: false,
})

const TITRE = ['Le site web qui fait', 'décoller votre activité.']

const CONFIANCE = [
  { valeur: 10, suffixe: ' j', libelle: "de l'idée à la mise en ligne", accent: true },
  { valeur: 100, suffixe: ' %', libelle: 'sur mesure — zéro template', accent: false },
  { valeur: 72, suffixe: ' h', libelle: 'réponse garantie', accent: true },
  { texte: 'Code livré', libelle: 'vous êtes propriétaire', accent: false },
] as const

export default function HeroSection() {
  return (
    <section className="su-hero min-h-[100svh] flex items-center">
      <div className="relative z-[3] w-full max-w-6xl mx-auto px-4 sm:px-6 pt-32 pb-16 lg:py-32">
        <div className="max-w-xl">
          <p className="su-surtitre mb-7">Agence web — Tours</p>

          <h1 className="font-display font-bold text-[#0C1626] mb-6 text-[clamp(2.3rem,6.2vw,4.1rem)] leading-[1.04] tracking-[-0.03em]">
            {TITRE.map((ligne, i) => (
              <span key={ligne} className="su-ligne-masque">
                <span className="su-ligne-interne">
                  {i === 1 ? (
                    <>
                      <span className="text-[#B45309]">décoller</span> votre activité.
                    </>
                  ) : (
                    ligne
                  )}
                </span>
              </span>
            ))}
          </h1>

          <p className="text-[#475569] text-lg leading-relaxed mb-9 max-w-lg">
            Sites vitrines, e-commerce et applications sur mesure — conçus,
            développés et mis en ligne en {SITE.delais.vitrine}.
          </p>

          <div className="flex flex-wrap gap-3.5 mb-5">
            <Link href="/contact" className="su-action">
              Obtenir mon devis gratuit
              <ArrowRight size={17} aria-hidden="true" />
            </Link>
            <Link href="/services" className="su-action su-action--fantome">
              Découvrir nos services
            </Link>
          </div>

          <p className="text-[13px] text-[#64748B]">
            À partir de {SITE.pricing.vitrine} € · Devis gratuit sous 72 h
          </p>
        </div>

        {/* LE MONOLITHE.
            Sur grand écran il occupe la moitié droite, derrière le contenu.
            Sur mobile il prend sa propre bande dans le flux, à pleine
            intensité : une capture à 390 px a montré qu'en fond atténué il
            ressemblait à une bavure grise plutôt qu'à un objet voulu.
            La hauteur est fixe dans les deux cas, donc rien ne se décale. */}
        <div className="su-hero__scene relative h-[300px] -mx-4 sm:-mx-6 mt-10 lg:mt-0 lg:mx-0 lg:h-auto">
          <Monolithe />
        </div>

        <div className="su-groupe grid grid-cols-2 lg:grid-cols-4 gap-3 mt-14 lg:mt-20 max-w-3xl">
          {CONFIANCE.map((item) => (
            <div
              key={item.libelle}
              className="su-strate su-strate--aretee px-4 py-3.5 su-pose-active"
            >
              <div
                className={`text-[1.55rem] font-display font-bold leading-none mb-1.5 ${
                  item.accent ? 'text-[#B45309]' : 'text-[#1E3A5F]'
                }`}
              >
                {'valeur' in item ? (
                  <CountUp target={item.valeur} suffix={item.suffixe} duration={1200} />
                ) : (
                  item.texte
                )}
              </div>
              <div className="text-[12.5px] text-[#64748B] leading-snug">{item.libelle}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
