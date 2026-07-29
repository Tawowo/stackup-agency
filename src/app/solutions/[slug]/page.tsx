/* eslint-disable react/no-unescaped-entities */
import { SOLUTIONS, getSolution } from '@/data/solutions'
import { METIERS } from '@/data/metiers'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ChevronRight, Home, CheckCircle } from 'lucide-react'
import { SITE } from '@/config/site'

export async function generateStaticParams() {
  return SOLUTIONS.map(s => ({ slug: s.slug }))
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const s = getSolution(params.slug)
  if (!s) return {}
  const url = `${SITE.url}/solutions/${s.slug}`
  const title = `${s.nom} — Solution sur mesure pour TPE et artisans`
  const description = `${s.requetePrincipale.charAt(0).toUpperCase() + s.requetePrincipale.slice(1)}. ${s.variantes[0]}. Stackup Agency développe des solutions digitales sur mesure.`
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

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Accueil', item: SITE.url },
      { '@type': 'ListItem', position: 2, name: 'Solutions', item: `${SITE.url}/solutions` },
      { '@type': 'ListItem', position: 3, name: s.nom, item: url },
    ],
  }

  const softwareSchema = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: s.nom,
    applicationCategory: 'BusinessApplication',
    description: `${s.nom} sur mesure développé par Stackup Agency pour TPE et artisans.`,
    offers: { '@type': 'Offer', priceCurrency: 'EUR', price: `${SITE.pricing.gestion}`, seller: { '@type': 'Organization', name: SITE.name, url: SITE.url } },
  }

  return (
    <div className="min-h-screen bg-background dark:bg-[#0A0F1C]">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }} />

      <div className="bg-gradient-to-b from-[#060D1A] to-[#0A0F1C] pt-24 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <nav className="flex items-center gap-1.5 text-white/40 text-xs mb-6" aria-label="Fil d'Ariane">
            <Link href="/" className="hover:text-white transition-colors flex items-center gap-1"><Home size={11} /> Accueil</Link>
            <ChevronRight size={11} />
            <Link href="/solutions" className="hover:text-white transition-colors">Solutions</Link>
            <ChevronRight size={11} />
            <span className="text-white/60">{s.nom}</span>
          </nav>

          <h1 className="text-3xl lg:text-5xl font-bold text-white leading-tight mb-6">
            {s.nom} sur mesure
          </h1>
          <p className="text-white/70 text-lg mb-8 max-w-2xl">
            {s.requetePrincipale.charAt(0).toUpperCase() + s.requetePrincipale.slice(1)} pour votre entreprise.
            {s.variantes[0] ? ` ${s.variantes[0].charAt(0).toUpperCase() + s.variantes[0].slice(1)},` : ''}
            développé sur mesure par Stackup Agency.
          </p>

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
            Pourquoi un système {s.nom.toLowerCase()} sur mesure ?
          </h2>
          <div className="space-y-3">
            {[
              'Solution adaptée à vos processus, pas l\'inverse',
              'Pas d\'abonnement mensuel à des outils SaaS étrangers',
              'Données hébergées en France, vous en êtes propriétaire',
              'Interface simple, formation incluse',
              'Évolutions possibles selon vos besoins futurs',
              `À partir de ${SITE.pricing.gestion}€ — coût amorti en quelques mois`,
            ].map(item => (
              <div key={item} className="flex items-start gap-3">
                <CheckCircle size={18} className="text-green-400 mt-0.5 flex-shrink-0" />
                <span className="text-foreground/80 dark:text-white/80">{item}</span>
              </div>
            ))}
          </div>
        </section>

        {metiersLies.length > 0 && (
          <section>
            <h2 className="text-2xl font-bold text-foreground dark:text-white mb-4">
              Secteurs concernés par cette solution
            </h2>
            <div className="flex flex-wrap gap-3">
              {metiersLies.map(m => (
                <Link key={m.slug} href={`/creation-site-internet/${m.slug}`} className="px-4 py-2 rounded-xl border border-white/10 hover:border-blue-400/40 text-sm text-foreground/70 dark:text-white/70 hover:text-blue-400 transition-colors capitalize">
                  {m.metier}
                </Link>
              ))}
            </div>
          </section>
        )}

        <section>
          <h3 className="text-lg font-semibold text-foreground dark:text-white mb-3">Recherches associées</h3>
          <div className="flex flex-wrap gap-2">
            {s.variantes.map(v => (
              <span key={v} className="px-3 py-1.5 rounded-full text-xs border border-white/10 text-foreground/60 dark:text-white/60">{v}</span>
            ))}
          </div>
        </section>

        <div className="rounded-2xl p-6 bg-gradient-to-br from-navy to-electric text-center">
          <h3 className="text-white font-bold text-xl mb-2">Discutons de votre projet {s.nom.toLowerCase()}</h3>
          <p className="text-white/70 mb-4">Devis gratuit sous 72h. Premier rendez-vous sans engagement.</p>
          <Link href="/contact" className="inline-block px-6 py-3 bg-amber-500 hover:bg-amber-400 text-white font-semibold rounded-xl transition-all hover:-translate-y-0.5">
            Demander un devis →
          </Link>
        </div>
      </div>
    </div>
  )
}
