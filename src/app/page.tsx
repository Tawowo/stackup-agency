/* eslint-disable react/no-unescaped-entities */
import type { Metadata } from 'next'
import HomeFaq from '@/components/home/HomeFaq'
import { SITE, aPartirDe } from '@/config/site'
import dynamic from 'next/dynamic'
import Ouverture from '@/components/home/Ouverture'
import Strates from '@/components/home/Strates'
import Depart from '@/components/home/Depart'
const JustePrix = dynamic(() => import('@/components/home/JustePrix'))

// Sections sous la fold — code-splitting pour étaler l'hydratation (TBT)
const Offre = dynamic(() => import('@/components/home/Offre'))
const Showroom = dynamic(() => import('@/components/home/Showroom'))
const LaRoute = dynamic(() => import('@/components/home/LaRoute'))
const RaisonDetre = dynamic(() => import('@/components/home/RaisonDetre'))
const PreuveLogicielle = dynamic(() => import('@/components/home/PreuveLogicielle'))
const Seuil = dynamic(() => import('@/components/home/Seuil'))

export const metadata: Metadata = {
  title: "Agence web Tours — Site internet en 10 jours",
  description: `Stackup Agency crée votre site internet en ${SITE.delais.vitrine} ${aPartirDe(SITE.pricing.vitrine)}. Site vitrine, e-commerce, système de gestion sur mesure. Devis gratuit sous 72h.`,
  alternates: { canonical: SITE.url },
  openGraph: {
    url: SITE.url,
    title: "Agence web Tours — Site internet livré en 10 jours à partir de 449€",
    description: `Stackup Agency crée votre site internet en ${SITE.delais.vitrine} ${aPartirDe(SITE.pricing.vitrine)}.`,
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
  description: `Agence web basée à Tours. Création de sites internet professionnels pour TPE et artisans, livrés en ${SITE.delais.vitrine} ${aPartirDe(SITE.pricing.vitrine)}.`,
  address: {
    '@type': 'PostalAddress',
    addressLocality: SITE.address.locality,
    addressRegion: SITE.address.region,
    postalCode: SITE.address.departmentCode,
    addressCountry: SITE.address.country,
  },
  priceRange: `${aPartirDe(SITE.pricing.vitrine)}`,
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
 *    Annoncer un écart de prix avant d'avoir montré le travail, c'est
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

        {/* 01 — LES STRATES. La bande se coupe en cinq lamelles et la
            maquette se construit, une couche à la fois.

            CE QUE ÇA REMPLACE : « l'Anatomie », qui racontait déjà « un site
            a cinq couches » avec des plans HTML en perspective. Garder les
            deux aurait donné deux versions du même geste, ce que le dossier
            interdit (§17.6 règle 3 : une expérience = un mécanisme nommé).
            Le propos est conservé ; c'est la bande — l'objet du site — qui
            le porte désormais, au lieu d'un décor sans rapport avec elle. */}
        <Strates />

        {/* 02 — L'OFFRE. Cinq onglets, et la bande prend la configuration
            de l'offre choisie. Remplace « l'Atelier » : une grille de sept
            vignettes et vingt-cinq fondus-translations, qui annonçait
            « survolez » alors qu'elle ne réagissait qu'au clic. */}
        <Offre />

        {/* 04 — LE SEUIL. Il était en deuxième position, quand l'ouverture
            se jouait en pleine nuit et qu'il fallait en sortir. L'ouverture
            est claire depuis la refonte du hero : le seuil n'a plus de nuit
            à quitter et reprend sa place de l'ordre prévu (§10.5), entre
            l'offre et les preuves. */}
        <Seuil
          scene="seuil"
          nuit={0.5}
          mots={['Une structure', 'devient', 'une interface.']}
          intitule="Transition : d’une structure à une interface"
        />

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

        {/* 06 — LE JUSTE PRIX : le prix, une fois le travail montré.

            CE QUE ÇA REMPLACE : « le verdict », dont le comparateur mettait
            en avant un rapport entre nos prix et ceux d'une agence, calculé
            sur des fourchettes codées en dur qui ne venaient de nulle part.
            Supprimé sur décision du commanditaire. Ne subsiste que le coût
            sur cinq ans, sourcé par nos propres articles publiés. */}
        <JustePrix />

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

        {/* 09 — LE DÉPART. La bande revient au centre et se replie en
            logo exact : le site s'ouvre sur le logo qui devient un objet et
            se ferme sur l'objet qui redevient le logo.

            CE QUE ÇA REMPLACE : trente étoiles clignotantes positionnées une
            par une, un halo qui respire et un bouton à lueur. Le dossier les
            écarte nommément (§10.10 : « sans étoiles ni confettis ») — c'est
            de la décoration empruntée à un autre métier, qui tourne en
            continu sans qu'on puisse l'arrêter et ne dit rien du travail. */}
        <Depart />

      </div>
    </>
  )
}
