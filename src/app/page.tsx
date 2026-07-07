import type { Metadata } from 'next'
import Hero from '@/components/sections/Hero'

export const metadata: Metadata = {
  title: 'Agence Web Tours — Création Site Internet | Stackup Agency',
  description: 'Stackup Agency crée votre site web en 10 jours à partir de 449€. Agence digitale à Tours : site vitrine, e-commerce, applications sur mesure. Devis gratuit sous 72h.',
  alternates: { canonical: 'https://stackup-agency.fr' },
  openGraph: {
    url: 'https://stackup-agency.fr',
    title: 'Agence Web Tours — Création Site Internet | Stackup Agency',
    description: 'Stackup Agency crée votre site web en 10 jours à partir de 449€. Devis gratuit sous 72h.',
    type: 'website',
  },
}
import Services from '@/components/sections/Services'
import Pricing from '@/components/sections/Pricing'
import Portfolio from '@/components/sections/Portfolio'
import About from '@/components/sections/About'
import Blog from '@/components/sections/Blog'
import FAQ from '@/components/sections/FAQ'
import Contact from '@/components/sections/Contact'
import PageLoader from '@/components/ui/PageLoader'

export default function Home() {
  return (
    <>
      <PageLoader />
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
