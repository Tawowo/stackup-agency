import Hero from '@/components/sections/Hero'
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
