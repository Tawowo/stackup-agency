/* eslint-disable react/no-unescaped-entities */
import type { Metadata } from 'next'
import Link from 'next/link'
import { CheckCircle } from 'lucide-react'
import HomeFaq from '@/components/home/HomeFaq'
import { SITE } from '@/config/site'
import dynamic from 'next/dynamic'
import Ouverture from '@/components/home/Ouverture'

// Sections sous la fold — code-splitting pour étaler l'hydratation (TBT)
const Offre = dynamic(() => import('@/components/home/Offre'))
const Verdict = dynamic(() => import('@/components/home/Verdict'))
const Showroom = dynamic(() => import('@/components/home/Showroom'))
const LaRoute = dynamic(() => import('@/components/home/LaRoute'))
const RaisonDetre = dynamic(() => import('@/components/home/RaisonDetre'))
const PreuveLogicielle = dynamic(() => import('@/components/home/PreuveLogicielle'))
const Seuil = dynamic(() => import('@/components/home/Seuil'))
const Anatomie = dynamic(() => import('@/components/home/Anatomie'))

export const metadata: Metadata = {
  title: "Agence web Tours — Site internet en 10 jours",
  description: `Stackup Agency crée votre site internet en ${SITE.delais.vitrine} à partir de ${SITE.pricing.vitrine}€. Site vitrine, e-commerce, système de gestion sur mesure. Devis gratuit sous 72h.`,
  alternates: { canonical: SITE.url },
  openGraph: {
    url: SITE.url,
    title: "Agence web Tours — Site internet livré en 10 jours dès 449€",
    description: `Stackup Agency crée votre site internet en ${SITE.delais.vitrine} à partir de ${SITE.pricing.vitrine}€.`,
    type: 'website',
  },
}

const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: SITE.name,
  url: SITE.url,
  potentialAction: {
    '@type': 'SearchAction',
    target: `${SITE.url}/blog?q={search_term_string}`,
    'query-input': 'required name=search_term_string',
  },
}

const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  '@id': `${SITE.url}/#organization`,
  name: SITE.name,
  url: SITE.url,
  email: SITE.email,
  description: `Agence web basée à Tours. Création de sites internet professionnels pour TPE et artisans, livrés en ${SITE.delais.vitrine} à partir de ${SITE.pricing.vitrine}€.`,
  address: {
    '@type': 'PostalAddress',
    addressLocality: SITE.address.locality,
    addressRegion: SITE.address.region,
    postalCode: SITE.address.departmentCode,
    addressCountry: SITE.address.country,
  },
  priceRange: `À partir de ${SITE.pricing.vitrine}€`,
  areaServed: { '@type': 'Country', name: 'France' },
  sameAs: [SITE.social.linkedin, SITE.social.instagram, SITE.social.facebook],
}

/**
 * L'ORDRE DE LA PAGE.
 *
 * Il a été refait, pas réarrangé. L'ancien enchaînement posait quatre
 * sections de « preuve » avant de montrer un seul vrai site livré, et
 * répétait cinq fois les mêmes quatre chiffres.
 *
 * Le nouvel ordre suit les questions du lecteur, dans l'ordre où il se les
 * pose : qu'est-ce que vous faites, montrez-moi, savez-vous faire plus qu'une
 * jolie page, pourquoi vous plutôt qu'une autre, comment ça se passe, qui
 * êtes-vous, et mes questions.
 *
 * Trois déplacements, chacun pour une raison :
 *  - LES SERVICES remontent après l'anatomie. L'anatomie ouvre un site ; les
 *    services disent lesquels on construit. C'est la suite logique, et c'est
 *    la première chose qu'un visiteur cherche.
 *  - LES RÉALISATIONS remontent de la 8e à la 5e place. Le travail réellement
 *    livré est la preuve la plus forte de la page : il ne peut pas arriver
 *    quatrième dans une file de démonstrations. Tout ce qui le précédait
 *    argumentait à sa place.
 *  - LE VERDICT (le prix) descend après les réalisations et le logiciel.
 *    Annoncer « huit fois moins cher » avant d'avoir montré le travail, c'est
 *    une affirmation ; après, c'est une conclusion.
 *
 * Trois suppressions, chacune parce qu'elle répétait :
 *  - LE BANDEAU DÉFILANT : dix adjectifs qui glissaient, `aria-hidden`, sans
 *    une information que la page ne porte pas ailleurs. Sa seule donnée
 *    propre — la pile technique — est déplacée dans les légendes de
 *    l'anatomie, où elle est lisible et rattachée à la couche concernée.
 *  - LES PASTILLES DE CHIFFRES : cinq cartes identiques à la teinte près.
 *    Leurs cinq chiffres sont tous redits ailleurs, et le « 80 % moins cher »
 *    est même CALCULÉ par le comparateur à partir des tarifs réels, ce qui
 *    vaut mieux qu'une valeur écrite à la main.
 *  - « LA PREUVE PAR 3 » : deux de ses trois onglets doublaient le seuil,
 *    l'anatomie et la méthode. Seul le comparateur survit, dans « Le verdict ».
 *
 * ANCRAGE DE LA TRAVERSÉE. Le moteur interpole entre les ancres
 * `data-scene` dans l'ordre du document. La suite doit donc rester
 * monotone — ouverture, seuil, preuve, noyau, flux, sortie — quel que soit
 * le composant posé dedans. Et toute section de plein jour porte
 * `data-nuit="0"` : sans cette ancre, l'ambiance interpole vers le seuil
 * suivant EN TRAVERSANT le contenu, et le fond s'assombrit sous des textes
 * dont les couleurs sont figées en mode jour (mesuré à 2,13:1 par axe-core).
 */
export default function Home() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }} />
      <div className="page-transition">

        {/* 01 — L'OUVERTURE, en pleine nuit.
            « Le plan habité » : une grille de construction visible, des
            cotes aux valeurs réelles, et une seule chose à regarder. */}
        <Ouverture />

        {/* 02 — LE SEUIL : on sort de la nuit.
            Le franchissement se joue ici, dans une section volontairement
            sans corps de texte : le fond et le texte ne se croisent donc sur
            aucun contenu, et le contraste ne s'effondre jamais. */}
        <Seuil
          scene="seuil"
          nuit={0.5}
          mots={['Une structure', 'devient', 'une interface.']}
          intitule="Transition : d’une structure à une interface"
        />

        {/* 03 — L'ANATOMIE : le seuil vient de promettre qu'une structure
            devient une interface. Cette section le démontre, en ouvrant un
            site en cinq couches. Mécanisme volontairement sans rapport avec
            les particules : de vrais plans HTML en perspective. */}
        <div data-scene="preuve" data-nuit="0">
          <Anatomie />
        </div>

        {/* 02 — L'OFFRE. Cinq onglets, et la bande prend la configuration
            de l'offre choisie. Remplace « l'Atelier » : une grille de sept
            vignettes et vingt-cinq fondus-translations, qui annonçait
            « survolez » alors qu'elle ne réagissait qu'au clic. */}
        <Offre />

        {/* 05 — LES RÉALISATIONS : îlot sombre autonome, indépendant de la
            traversée globale. Une salle de projection à l'intérieur d'une
            page claire. Remontée de la 8e place : c'est la preuve la plus
            forte, elle passe devant les démonstrations. */}
        <div data-scene="preuve" data-nuit="0">
          <Showroom />
        </div>

        {/* 06 — LA SALLE DES MACHINES : l'escalade après le portfolio. Les
            sites sont montrés ; voici ce qu'on fait au-delà. */}
        <div data-scene="noyau" data-nuit="0">
          <PreuveLogicielle />
        </div>

        {/* 07 — LE VERDICT : le prix, une fois le travail montré. */}
        <div data-scene="noyau" data-nuit="0">
          <Verdict />
        </div>

        {/* 08 — LA MÉTHODE. Unique chronologie de la page, désormais : la
            seconde, de J1 à J10, est supprimée avec « la preuve par 3 ». */}
        <div data-scene="flux" data-nuit="0">
          <LaRoute />
        </div>

        {/* 09 — LA RAISON D'ÊTRE */}
        <div data-scene="flux" data-nuit="0">
          <RaisonDetre />
        </div>

        {/* 10 — LES QUESTIONS */}
        <div data-scene="flux" data-nuit="0">
          <HomeFaq />
          <div className="section-divider" aria-hidden="true" />
        </div>

        {/* LE SEUIL DE CLÔTURE : la nuit revient.
            Il n'est pas décoratif : il fait tenir ensemble le fond clair de
            la FAQ et l'encre de l'appel final, qui se touchaient jusqu'ici
            par une couture franche. */}
        <Seuil
          scene="sortie"
          nuit={1}
          mots={['Il reste', 'une chose', 'à faire.']}
          intitule="Transition : vers le premier contact"
        />

        {/* 11 — LE PREMIER CONTACT.
            La redite des quatre repères est ici assumée : à la clôture, un
            rappel est un argument de conversion, pas une répétition. C'est
            le seul endroit de la page où ils reviennent. */}
        <section className="py-28 bg-[#070B16] relative overflow-hidden">
          <div className="star-field" aria-hidden="true">
            {[
              [8,12,3.1,0.5],[17,67,2.8,1.2],[23,34,4.2,0.0],[31,89,3.7,2.1],[42,21,2.5,1.8],
              [51,55,3.9,0.3],[63,78,2.2,2.5],[72,43,4.8,0.8],[81,11,3.3,1.5],[91,66,2.7,0.1],
              [6,82,4.1,2.8],[15,47,3.5,0.6],[26,93,2.9,1.9],[35,28,4.5,0.9],[47,71,3.2,2.3],
              [56,16,2.6,1.1],[68,60,4.0,0.4],[76,85,3.8,2.0],[86,37,2.4,1.6],[95,52,4.6,0.7],
              [4,29,3.0,2.9],[19,74,2.3,0.2],[29,48,4.3,1.4],[39,91,3.6,2.6],[49,13,2.8,0.0],
              [59,57,4.7,1.7],[69,32,3.1,2.4],[79,77,2.5,0.5],[88,22,4.4,1.3],[97,68,3.9,2.2],
            ].map(([left, top, dur, delay], i) => (
              <div key={i} className="star" style={{
                left: `${left}%`,
                top: `${top}%`,
                '--dur': `${dur}s`,
                '--delay': `${delay}s`,
              } as React.CSSProperties} />
            ))}
          </div>
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center" aria-hidden="true">
            <div className="halo-breathe w-[600px] h-[600px] rounded-full"
              style={{ background: 'radial-gradient(ellipse, rgba(45,125,210,0.15) 0%, rgba(245,158,11,0.05) 40%, transparent 70%)' }} />
          </div>
          <div className="relative max-w-3xl mx-auto px-4 sm:px-6 text-center">
            <p className="su-surtitre su-surtitre--nuit mb-4">11 — Démarrons</p>
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
              Votre site internet vous attend
            </h2>
            <p className="text-white/70 text-lg mb-10">
              Devis gratuit sous 72 h. Premier rendez-vous sans engagement.
              Livraison garantie en {SITE.delais.vitrine}.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/contact" className="btn-magnetic cta-glow relative overflow-hidden px-8 py-4 bg-gold hover:bg-gold/90 text-ink font-bold rounded-xl shadow-lg shadow-amber-500/30 transition-all hover:-translate-y-0.5">
                Démarrer mon projet <span className="arrow-slide ml-1">→</span>
              </Link>
              <Link href="/tarifs" className="px-8 py-4 border border-white/25 text-white hover:bg-white/10 hover:border-white/40 font-semibold rounded-xl transition-all">
                Voir les tarifs
              </Link>
            </div>
            <div className="mt-10 flex flex-wrap justify-center gap-6">
              {[
                `${SITE.pricing.vitrine} € tout inclus`,
                `Livraison en ${SITE.delais.vitrine}`,
                'Code 100 % propriétaire',
                'Hébergement France',
              ].map(item => (
                <div key={item} className="flex items-center gap-1.5 text-white/60 text-sm">
                  <CheckCircle size={14} className="text-success" />
                  {item}
                </div>
              ))}
            </div>
          </div>
        </section>

      </div>
    </>
  )
}
