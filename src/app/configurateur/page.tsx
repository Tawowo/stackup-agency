import type { Metadata } from 'next'
import dynamic from 'next/dynamic'
import { SITE, aPartirDe } from '@/config/site'

const Configurateur = dynamic(() => import('@/components/configurateur/Configurateur'))

export const metadata: Metadata = {
  title: 'Configurer mon projet — estimation en 4 étapes',
  description: `Construisez votre projet en quatre questions et obtenez un point de départ chiffré à partir de nos tarifs publics (${aPartirDe(SITE.pricing.vitrine)}). Sans inscription, sans engagement.`,
  alternates: { canonical: `${SITE.url}/configurateur` },
  openGraph: {
    url: `${SITE.url}/configurateur`,
    title: 'Configurer mon projet — Stackup Agency',
    description:
      'Quatre questions, un point de départ chiffré, une demande de devis déjà remplie.',
    type: 'website',
  },
}

export default function PageConfigurateur() {
  return (
    <div className="page-transition bg-[#FFFDF9]">
      <section className="max-w-4xl mx-auto px-4 sm:px-6 pt-32 pb-10">
        <p className="su-surtitre mb-6">Configurateur</p>
        <h1 className="font-display font-bold text-[#0C1626] text-[clamp(2.1rem,5.2vw,3.4rem)] leading-[1.08] tracking-[-0.02em] mb-6">
          Quatre questions, et vous saurez où vous mettez les pieds
        </h1>
        <p className="text-[#475569] text-lg leading-relaxed max-w-2xl">
          « Combien ça coûte ? » n’a pas de réponse unique, mais elle a une
          fourchette de départ. Répondez à quatre questions : vous obtenez un
          montant construit sur nos tarifs publics, et une demande de devis déjà
          rédigée que vous n’avez plus qu’à envoyer.
        </p>
      </section>

      <section className="max-w-4xl mx-auto px-4 sm:px-6 pb-24" aria-labelledby="titre-configurateur">
        <h2 id="titre-configurateur" className="sr-only">
          Configurateur de projet en quatre étapes
        </h2>
        <Configurateur />
        <p className="text-[13px] text-[#64748B] mt-5 text-center">
          Aucune inscription, aucune donnée transmise tant que vous n’envoyez pas
          le formulaire de devis.
        </p>
      </section>
    </div>
  )
}
