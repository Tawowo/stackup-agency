import type { Metadata } from 'next'
import Hero from '@/components/sections/Hero'
import Services from '@/components/sections/Services'
import Pricing from '@/components/sections/Pricing'
import Portfolio from '@/components/sections/Portfolio'
import About from '@/components/sections/About'
import Blog from '@/components/sections/Blog'
import FAQ from '@/components/sections/FAQ'
import Contact from '@/components/sections/Contact'
import PageLoader from '@/components/ui/PageLoader'

export const metadata: Metadata = {
  title: 'Agence Web Tours — Création Site Internet | Stackup Agency',
  description: 'Stackup Agency crée votre site web en 10 jours à partir de 449€. Agence digitale à Tours : site vitrine, e-commerce, applications sur mesure. Devis gratuit sous 72h.',
  alternates: {
    canonical: 'https://stackup-agency.fr',
  },
  openGraph: {
    url: 'https://stackup-agency.fr',
    title: 'Agence Web Tours — Création Site Internet | Stackup Agency',
    description: 'Stackup Agency crée votre site web en 10 jours à partir de 449€. Devis gratuit sous 72h.',
    type: 'website',
  },
}

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    { '@type': 'Question', name: 'Quels sont les délais de création ?', acceptedAnswer: { '@type': 'Answer', text: 'Un site vitrine est livré en 10 jours ouvrés, un site multi-pages en 17 jours ouvrés, un e-commerce ou système de gestion en 21 jours ouvrés, un site association en 7 jours ouvrés.' } },
    { '@type': 'Question', name: 'Comment se passe le processus de création ?', acceptedAnswer: { '@type': 'Answer', text: "Premier RDV → cahier des charges → maquette → développement → retours → mise en ligne. Vous êtes impliqué à chaque étape." } },
    { '@type': 'Question', name: 'Quels modes de paiement acceptez-vous ?', acceptedAnswer: { '@type': 'Answer', text: 'Virement bancaire, PayPal ou carte bancaire via Stripe. Pour les projets, un acompte de 30% au démarrage, le solde à la livraison.' } },
    { '@type': 'Question', name: "Qu'est-ce qui est inclus dans la maintenance ?", acceptedAnswer: { '@type': 'Answer', text: "Selon votre plan : hébergement, nom de domaine, mises à jour sécurité, sauvegardes, support et modifications." } },
    { '@type': 'Question', name: 'Est-ce que je suis propriétaire du code ?', acceptedAnswer: { '@type': 'Answer', text: "Oui, à 100%. Une fois le projet livré et payé, le code vous appartient entièrement." } },
    { '@type': 'Question', name: "Pourquoi vous plutôt qu'une agence classique ?", acceptedAnswer: { '@type': 'Answer', text: "Prix 3 à 5x inférieurs aux agences classiques pour une qualité équivalente. Interlocuteur unique, réactif et passionné." } },
  ],
}

export default function Home() {
  return (
    <>
      <PageLoader />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <main>
        <Hero />
        <Services />
        <Pricing />
        <Portfolio />
        <About />
        <Blog />
        <FAQ />
        <Contact />
      </main>
    </>
  )
}
