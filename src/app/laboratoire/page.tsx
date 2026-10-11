import type { Metadata } from 'next'
import Link from 'next/link'
import dynamic from 'next/dynamic'
import { ArrowRight, Calculator, Filter, KeyRound, Layers } from 'lucide-react'
import { SITE } from '@/config/site'

const Laboratoire = dynamic(() => import('@/components/laboratoire/Laboratoire'))

export const metadata: Metadata = {
  title: 'Le laboratoire — une démonstration de logiciel métier',
  description:
    'Une interface de gestion réellement fonctionnelle, manipulable dans votre navigateur : filtres, tris et calculs réels. La démonstration que Stackup Agency développe des logiciels, pas seulement des sites.',
  alternates: { canonical: `${SITE.url}/laboratoire` },
  openGraph: {
    url: `${SITE.url}/laboratoire`,
    title: 'Le laboratoire — démonstration de logiciel métier',
    description:
      'Une interface de gestion réellement fonctionnelle, manipulable directement dans votre navigateur.',
    type: 'website',
  },
}

const PREUVES = [
  {
    icone: Filter,
    titre: 'Les filtres filtrent réellement',
    texte:
      'Cumulez les statuts, tapez un nom de commune ou une prestation : la liste se recompose, et la synthèse du haut se recalcule sur l’ensemble filtré — pas sur le total figé.',
  },
  {
    icone: Calculator,
    titre: 'Les calculs sont justes',
    texte:
      'Tous les montants sont stockés en centimes entiers. Aucun arrondi flottant, donc aucun total faux d’un centime. Dépliez une ligne pour vérifier le détail HT, la TVA et le TTC.',
  },
  {
    icone: Layers,
    titre: 'L’état est cohérent',
    texte:
      'Faire avancer une intervention dans son cycle modifie une seule source de vérité. La liste, les compteurs par statut et la synthèse en découlent — ils ne peuvent pas se contredire.',
  },
  {
    icone: KeyRound,
    titre: 'Ce que ce n’est pas',
    texte:
      'Aucune base de données, aucun appel réseau, aucun client réel. Tout vit dans l’onglet et disparaît au rechargement. Une vraie mise en production ajouterait persistance, comptes et droits.',
  },
]

export default function PageLaboratoire() {
  return (
    <main className="page-transition bg-[#FFFDF9]">
      <section className="max-w-6xl mx-auto px-4 sm:px-6 pt-32 pb-12">
        <p className="su-surtitre mb-6">Le laboratoire</p>
        <h1 className="font-display font-bold text-[#0C1626] text-[clamp(2.1rem,5.2vw,3.4rem)] leading-[1.08] tracking-[-0.02em] max-w-3xl mb-6">
          Un logiciel qui fonctionne vaut mieux qu’une capture d’écran
        </h1>
        <p className="text-[#475569] text-lg leading-relaxed max-w-2xl">
          La plupart des agences montrent des images de logiciels. Voici un outil
          de gestion d’interventions que vous pouvez manipuler tout de suite :
          filtrez, triez, dépliez une ligne, faites avancer un dossier. Tout
          réagit, parce que tout est réellement calculé.
        </p>
      </section>

      <section className="max-w-6xl mx-auto px-4 sm:px-6 pb-16" aria-label="Démonstration interactive">
        <Laboratoire />
      </section>

      <section className="max-w-6xl mx-auto px-4 sm:px-6 pb-20">
        <h2 className="font-display font-bold text-[#0C1626] text-[clamp(1.6rem,3.4vw,2.3rem)] mb-3">
          Ce que cette démonstration prouve — et ce qu’elle ne prouve pas
        </h2>
        <p className="text-[#64748B] mb-9 max-w-2xl">
          Une démonstration honnête dit aussi ses limites. Voici les deux.
        </p>

        <div className="grid sm:grid-cols-2 gap-4">
          {PREUVES.map(({ icone: Icone, titre, texte }) => (
            <div key={titre} className="su-strate su-strate--aretee su-strate--interactive p-6">
              <Icone size={20} aria-hidden="true" className="text-[#B45309] mb-4" />
              <h3 className="font-semibold text-[#0C1626] mb-2 text-[1.05rem]">{titre}</h3>
              <p className="text-[#475569] text-[14.5px] leading-relaxed">{texte}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 sm:px-6 pb-24">
        <div className="su-strate su-strate--levee su-rasante p-8 sm:p-10 text-center">
          <h2 className="font-display font-bold text-[#0C1626] text-[clamp(1.5rem,3.2vw,2.1rem)] mb-3">
            Votre métier a ses propres règles
          </h2>
          <p className="text-[#475569] max-w-xl mx-auto mb-8">
            Planning, stock, devis, suivi de chantier, adhérents, réservations :
            un outil sur mesure suit vos règles au lieu de vous imposer les siennes.
            Dites-nous comment vous travaillez, nous vous dirons ce que cela
            représente.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link href="/configurateur" className="su-action">
              Configurer mon projet <ArrowRight size={17} aria-hidden="true" />
            </Link>
            <Link href="/services/application-sur-mesure" className="su-action su-action--fantome">
              Applications sur mesure
            </Link>
          </div>
          <p className="text-[13px] text-[#64748B] mt-6">
            Devis gratuit sous 72 h · échange sans engagement
          </p>
        </div>
      </section>
    </main>
  )
}
