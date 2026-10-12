/* eslint-disable react/no-unescaped-entities */
import { SOLUTIONS, getSolution } from '@/data/solutions'
import { METIERS } from '@/data/metiers'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ChevronRight, CheckCircle, AlertCircle, Star } from 'lucide-react'
import { SITE } from '@/config/site'
import MiniHero from '@/components/ui/MiniHero'

export async function generateStaticParams() {
  return SOLUTIONS.map(s => ({ slug: s.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const parametres = await params
  const s = getSolution(parametres.slug)
  if (!s) return {}
  const url = `${SITE.url}/solutions/${s.slug}`
  const suffix = ' | Stackup Agency'
  const maxBase = 65 - suffix.length
  const rawTitle = s.nom
  const seoTitle = rawTitle.length > maxBase
    ? rawTitle.slice(0, rawTitle.lastIndexOf(' ', maxBase - 1) || maxBase) + '…' + suffix
    : rawTitle + suffix
  const description = s.intro.length > 165 ? s.intro.slice(0, s.intro.lastIndexOf(' ', 162) || 162) + '…' : s.intro
  return {
    title: { absolute: seoTitle },
    description,
    alternates: { canonical: url },
    openGraph: { url, title: s.nom, description, type: 'website' },
  }
}

export default async function SolutionPage({ params }: { params: Promise<{ slug: string }> }) {
  const parametres = await params
  const s = getSolution(parametres.slug)
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
    <div className="min-h-screen bg-[#FFFDF9]">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <MiniHero
        signature="trace"
        breadcrumb={[{ name: 'Solutions', href: '/solutions' }, { name: s.nom }]}
        title={`${s.nom} sur mesure`}
        subtitle={s.intro}
      >
        <div className="su-sig__actions">
          <Link href="/contact" className="px-6 py-3 bg-gold hover:bg-gold/80 text-ink font-semibold rounded-xl transition-all hover:-translate-y-0.5">
            Demander un devis →
          </Link>
          <Link href="/services/systeme-gestion" className="px-6 py-3 border border-navy/25 text-navy hover:bg-navy/5 hover:border-navy/40 font-semibold rounded-xl transition-all">
            Voir l&apos;offre Système de gestion
          </Link>
        </div>
      </MiniHero>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-16 space-y-16">

        <section>
          <h2 className="text-2xl font-bold text-foreground mb-6">
            Les problèmes que cette solution résout
          </h2>
          <div className="space-y-3">
            {s.problemes.map(item => (
              <div key={item} className="flex items-start gap-3">
                <AlertCircle size={17} className="text-red-400 mt-0.5 flex-shrink-0" />
                <span className="text-foreground/80">{item}</span>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-foreground mb-6">
            Ce que comprend la solution
          </h2>
          <div className="grid sm:grid-cols-2 gap-3">
            {s.fonctionnalites.map(item => (
              <div key={item} className="flex items-start gap-3">
                <CheckCircle size={17} className="text-success mt-0.5 flex-shrink-0" />
                <span className="text-foreground/80">{item}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-2xl p-6 lg:p-8 bg-blue-500/5 border border-electric/20">
          <h2 className="text-xl font-bold text-foreground mb-5">Exemple concret</h2>
          <div className="space-y-5">
            <div>
              <p className="text-xs text-red-400 font-semibold mb-2 uppercase tracking-wider">Situation actuelle</p>
              <p className="text-foreground/80">{s.exempleContexte}</p>
            </div>
            <div>
              <p className="text-xs text-success font-semibold mb-2 uppercase tracking-wider">Avec la solution sur mesure</p>
              <p className="text-foreground/80">{s.exempleFonctionnement}</p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-foreground mb-6">
            Pourquoi une solution sur mesure plutôt qu'un SaaS ?
          </h2>
          <div className="grid sm:grid-cols-2 gap-3 mb-5">
            {s.avantages.map(item => (
              <div key={item} className="flex items-start gap-3">
                <CheckCircle size={17} className="text-success mt-0.5 flex-shrink-0" />
                <span className="text-foreground/80">{item}</span>
              </div>
            ))}
          </div>
          <div className="p-5 rounded-xl bg-gold/10 border border-amber-500/20">
            <div className="flex items-start gap-3">
              <Star size={18} className="text-[#B45309] mt-0.5 flex-shrink-0" />
              <p className="text-foreground/80 text-sm">
                <strong className="text-foreground">Prix à partir de {SITE.pricing.gestion}€</strong> — à comparer avec 50 à 300€/mois d'abonnement SaaS. La solution est amortie en 6 à 18 mois selon votre volume d'activité.
              </p>
            </div>
          </div>
        </section>

        {metiersLies.length > 0 && (
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              Secteurs concernés par cette solution
            </h2>
            <div className="flex flex-wrap gap-3">
              {metiersLies.map(m => (
                <Link key={m.slug} href={`/creation-site-internet/${m.slug}`}
                  className="px-4 py-2 rounded-xl border border-white/10 hover:border-blue-400/40 text-sm text-foreground/70 hover:text-electric transition-colors capitalize">
                  {m.metier}
                </Link>
              ))}
            </div>
          </section>
        )}

        <section>
          <h2 className="text-2xl font-bold text-foreground mb-6">
            Questions fréquentes
          </h2>
          <div className="space-y-3">
            {s.faq.map(faq => (
              <details key={faq.q} className="group rounded-xl border border-navy/20 overflow-hidden">
                <summary className="flex items-center justify-between p-4 cursor-pointer font-medium text-foreground list-none">
                  {faq.q}
                  <ChevronRight size={16} className="text-[#64748B] group-open:rotate-90 transition-transform flex-shrink-0" />
                </summary>
                <div className="px-4 pb-4 text-foreground/70 text-sm leading-relaxed">{faq.a}</div>
              </details>
            ))}
          </div>
        </section>

        <section>
          <h3 className="text-lg font-semibold text-foreground mb-3">Recherches associées</h3>
          <div className="flex flex-wrap gap-2">
            {s.variantes.map(v => (
              <span key={v} className="px-3 py-1.5 rounded-full text-xs border border-white/10 text-[#475569]">{v}</span>
            ))}
          </div>
        </section>

        <div className="rounded-2xl p-6 bg-gradient-to-br from-navy to-electric text-center">
          <h3 className="text-white font-bold text-xl mb-2">Discutons de votre projet</h3>
          <p className="text-white/70 mb-4">Devis gratuit sous 72h. Premier rendez-vous sans engagement.</p>
          <Link href="/contact" className="inline-block px-6 py-3 bg-gold hover:bg-gold/80 text-ink font-semibold rounded-xl transition-all hover:-translate-y-0.5">
            Demander un devis gratuit →
          </Link>
        </div>
      </div>
    </div>
  )
}
