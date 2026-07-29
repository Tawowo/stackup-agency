/* eslint-disable react/no-unescaped-entities */
import { SOLUTIONS, getSolution } from '@/data/solutions'
import { METIERS } from '@/data/metiers'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ChevronRight, CheckCircle, AlertCircle, Star } from 'lucide-react'
import { SITE } from '@/config/site'
import Breadcrumb from '@/components/ui/Breadcrumb'

export async function generateStaticParams() {
  return SOLUTIONS.map(s => ({ slug: s.slug }))
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const s = getSolution(params.slug)
  if (!s) return {}
  const url = `${SITE.url}/solutions/${s.slug}`
  const title = `${s.nom} sur mesure — Solution digitale pour TPE et artisans | Stackup Agency`
  const description = s.intro.length > 160 ? s.intro.slice(0, 157) + '...' : s.intro
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: { url, title, description, type: 'website' },
  }
}

export default function SolutionPage({ params }: { params: { slug: string } }) {
  const s = getSolution(params.slug)
  if (!s) notFound()

  const url = `${SITE.url}/solutions/${s.slug}`
  const metiersLies = METIERS.filter(m => s.metiersCibles.includes(m.slug))

  const softwareSchema = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: s.nom,
    applicationCategory: 'BusinessApplication',
    description: s.intro,
    url,
    offers: {
      '@type': 'Offer',
      priceCurrency: 'EUR',
      price: `${SITE.pricing.gestion}`,
      seller: { '@type': 'Organization', '@id': `${SITE.url}/#organization`, name: SITE.name },
    },
  }

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: s.faq.map(f => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  }

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Accueil', item: SITE.url },
      { '@type': 'ListItem', position: 2, name: 'Solutions', item: `${SITE.url}/solutions` },
      { '@type': 'ListItem', position: 3, name: s.nom, item: url },
    ],
  }

  return (
    <div className="min-h-screen bg-background dark:bg-[#0A0F1C]">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <div className="bg-gradient-to-b from-[#060D1A] to-[#0A0F1C] pt-24 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <Breadcrumb items={[{ name: 'Solutions', href: '/solutions' }, { name: s.nom }]} />
          <h1 className="text-3xl lg:text-5xl font-bold text-white leading-tight mb-6">
            {s.nom} sur mesure
          </h1>
          <p className="text-white/70 text-lg mb-8 max-w-2xl">{s.intro}</p>
          <div className="flex flex-wrap gap-4">
            <Link href="/contact" className="px-6 py-3 bg-amber-500 hover:bg-amber-400 text-white font-semibold rounded-xl transition-all hover:-translate-y-0.5">
              Demander un devis →
            </Link>
            <Link href="/services/systeme-gestion" className="px-6 py-3 border border-white/20 text-white hover:bg-white/10 rounded-xl transition-all">
              Voir l'offre Système de gestion
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-16 space-y-16">

        <section>
          <h2 className="text-2xl font-bold text-foreground dark:text-white mb-6">
            Les problèmes que cette solution résout
          </h2>
          <div className="space-y-3">
            {s.problemes.map(item => (
              <div key={item} className="flex items-start gap-3">
                <AlertCircle size={17} className="text-red-400 mt-0.5 flex-shrink-0" />
                <span className="text-foreground/80 dark:text-white/80">{item}</span>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-foreground dark:text-white mb-6">
            Ce que comprend la solution
          </h2>
          <div className="grid sm:grid-cols-2 gap-3">
            {s.fonctionnalites.map(item => (
              <div key={item} className="flex items-start gap-3">
                <CheckCircle size={17} className="text-green-400 mt-0.5 flex-shrink-0" />
                <span className="text-foreground/80 dark:text-white/80">{item}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-2xl p-6 lg:p-8 bg-blue-500/5 border border-blue-500/20">
          <h2 className="text-xl font-bold text-foreground dark:text-white mb-5">Exemple concret</h2>
          <div className="space-y-5">
            <div>
              <p className="text-xs text-red-400 font-semibold mb-2 uppercase tracking-wider">Situation actuelle</p>
              <p className="text-foreground/80 dark:text-white/80">{s.exempleContexte}</p>
            </div>
            <div>
              <p className="text-xs text-green-400 font-semibold mb-2 uppercase tracking-wider">Avec la solution sur mesure</p>
              <p className="text-foreground/80 dark:text-white/80">{s.exempleFonctionnement}</p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-foreground dark:text-white mb-6">
            Pourquoi une solution sur mesure plutôt qu'un SaaS ?
          </h2>
          <div className="grid sm:grid-cols-2 gap-3 mb-5">
            {s.avantages.map(item => (
              <div key={item} className="flex items-start gap-3">
                <CheckCircle size={17} className="text-green-400 mt-0.5 flex-shrink-0" />
                <span className="text-foreground/80 dark:text-white/80">{item}</span>
              </div>
            ))}
          </div>
          <div className="p-5 rounded-xl bg-amber-500/10 border border-amber-500/20">
            <div className="flex items-start gap-3">
              <Star size={18} className="text-amber-500 mt-0.5 flex-shrink-0" />
              <p className="text-foreground/80 dark:text-white/80 text-sm">
                <strong className="text-foreground dark:text-white">Prix à partir de {SITE.pricing.gestion}€</strong> — à comparer avec 50 à 300€/mois d'abonnement SaaS. La solution est amortie en 6 à 18 mois selon votre volume d'activité.
              </p>
            </div>
          </div>
        </section>

        {metiersLies.length > 0 && (
          <section>
            <h2 className="text-2xl font-bold text-foreground dark:text-white mb-4">
              Secteurs concernés par cette solution
            </h2>
            <div className="flex flex-wrap gap-3">
              {metiersLies.map(m => (
                <Link key={m.slug} href={`/creation-site-internet/${m.slug}`}
                  className="px-4 py-2 rounded-xl border border-white/10 hover:border-blue-400/40 text-sm text-foreground/70 dark:text-white/70 hover:text-blue-400 transition-colors capitalize">
                  {m.metier}
                </Link>
              ))}
            </div>
          </section>
        )}

        <section>
          <h2 className="text-2xl font-bold text-foreground dark:text-white mb-6">
            Questions fréquentes
          </h2>
          <div className="space-y-3">
            {s.faq.map(faq => (
              <details key={faq.q} className="group rounded-xl border border-navy/20 dark:border-white/10 overflow-hidden">
                <summary className="flex items-center justify-between p-4 cursor-pointer font-medium text-foreground dark:text-white list-none">
                  {faq.q}
                  <ChevronRight size={16} className="text-white/40 group-open:rotate-90 transition-transform flex-shrink-0" />
                </summary>
                <div className="px-4 pb-4 text-foreground/70 dark:text-white/70 text-sm leading-relaxed">{faq.a}</div>
              </details>
            ))}
          </div>
        </section>

        <section>
          <h3 className="text-lg font-semibold text-foreground dark:text-white mb-3">Recherches associées</h3>
          <div className="flex flex-wrap gap-2">
            {s.variantes.map(v => (
              <span key={v} className="px-3 py-1.5 rounded-full text-xs border border-white/10 text-foreground/60 dark:text-white/60">{v}</span>
            ))}
          </div>
        </section>

        <div className="rounded-2xl p-6 bg-gradient-to-br from-navy to-electric text-center">
          <h3 className="text-white font-bold text-xl mb-2">Discutons de votre projet</h3>
          <p className="text-white/70 mb-4">Devis gratuit sous 72h. Premier rendez-vous sans engagement.</p>
          <Link href="/contact" className="inline-block px-6 py-3 bg-amber-500 hover:bg-amber-400 text-white font-semibold rounded-xl transition-all hover:-translate-y-0.5">
            Demander un devis gratuit →
          </Link>
        </div>
      </div>
    </div>
  )
}
