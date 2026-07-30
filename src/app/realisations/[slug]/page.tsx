import { notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowLeft, ExternalLink, Check, ArrowRight, Mail } from 'lucide-react'
import { realisations } from '@/lib/realisations'

export function generateStaticParams() {
  return realisations.map(r => ({ slug: r.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const r = realisations.find(r => r.slug === slug)
  if (!r) return {}
  const url = `https://stackup-agency.fr/realisations/${slug}`
  return {
    title: `${r.nom} — Démonstration Stackup Agency | Stackup Agency`,
    description: r.description,
    alternates: { canonical: url },
    openGraph: {
      url,
      title: `${r.nom} — Démonstration Stackup Agency`,
      description: r.description,
      type: 'website',
    },
  }
}

export default async function RealisationPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const r = realisations.find(r => r.slug === slug)
  if (!r) notFound()

  const url = `https://stackup-agency.fr/realisations/${slug}`
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Accueil', item: 'https://stackup-agency.fr' },
      { '@type': 'ListItem', position: 2, name: 'Réalisations', item: 'https://stackup-agency.fr/realisations' },
      { '@type': 'ListItem', position: 3, name: r.nom, item: url },
    ],
  }

  return (
    <div className="min-h-screen bg-white dark:bg-[#0A0F1C]">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      {/* Hero */}
      <div className="relative pt-24 pb-20 px-4 overflow-hidden" style={{ background: r.couleur }}>
        {'image' in r && r.image && (
          <Image
            src={(r as { image: string }).image}
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover object-top opacity-20"
          />
        )}
        <div
          className="absolute inset-0 opacity-25"
          style={{ background: `radial-gradient(ellipse at 70% 30%, ${r.accent}, transparent 60%)` }}
        />
        <div className="relative z-10 max-w-4xl mx-auto">
          <Link
            href="/#realisations"
            className="inline-flex items-center gap-2 text-white/50 hover:text-white text-sm mb-10 transition-colors"
          >
            <ArrowLeft size={14} /> Retour aux réalisations
          </Link>

          <div className="flex flex-wrap gap-2 mb-5">
            {r.tags.map(tag => (
              <span
                key={tag}
                className="px-3 py-1 rounded-full text-xs font-semibold"
                style={{ background: `${r.accent}30`, color: r.accent, border: `1px solid ${r.accent}50` }}
              >
                {tag}
              </span>
            ))}
          </div>

          {r.projectType === 'demo' && (
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gold/20 border border-amber-500/40 rounded-full text-amber-300 text-sm font-medium mb-5">
              <span>⚡</span> Projet de démonstration — ce que nous pouvons construire pour vous
            </div>
          )}

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-3 leading-tight">
            {r.nom}
          </h1>
          <p className="text-white/60 text-lg mb-8">{r.type}</p>
          <p className="text-white/80 text-xl leading-relaxed max-w-2xl mb-10">
            {r.description}
          </p>

          <a
            href={r.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-4 text-white font-semibold rounded-lg transition-all hover:scale-105 shadow-lg min-h-[52px]"
            style={{ background: r.accent }}
          >
            <ExternalLink size={18} />
            Voir la démo en live
          </a>
        </div>
      </div>

      {/* Services */}
      <section className="py-16 px-4 bg-gray-50 dark:bg-white/5">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Services fournis</h2>
          <div className="flex flex-wrap gap-3">
            {r.services.map(s => (
              <span
                key={s}
                className="px-4 py-2 rounded-xl text-sm font-semibold text-white"
                style={{ background: r.couleur, border: `1px solid ${r.accent}40` }}
              >
                {s}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Fonctionnalités */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">
            Fonctionnalités développées
          </h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {r.fonctionnalites.map((f, i) => (
              <div key={i} className="flex items-start gap-3 p-4 rounded-xl bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/10">
                <div
                  className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                  style={{ background: `${r.accent}20` }}
                >
                  <Check size={13} style={{ color: r.accent }} />
                </div>
                <span className="text-gray-700 dark:text-white/80 text-sm leading-relaxed">{f}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4" style={{ background: r.couleur }}>
        <div
          className="absolute inset-0 opacity-10"
          style={{ background: `radial-gradient(ellipse at 30% 70%, ${r.accent}, transparent 60%)` }}
        />
        <div className="max-w-3xl mx-auto text-center relative">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ce que nous pouvons faire pour vous
          </h2>
          <p className="text-white/70 text-lg mb-8 leading-relaxed">
            Un projet similaire à {r.nom} ? Nous pouvons créer quelque chose d&apos;unique pour votre activité,
            livré en 10 jours avec le même niveau d&apos;exigence.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="mailto:contact@stackup-agency.fr"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 text-white font-semibold rounded-xl transition-all hover:scale-105 min-h-[52px]"
              style={{ background: r.accent }}
            >
              <Mail size={18} />
              Démarrer mon projet
            </a>
            <Link
              href="/#realisations"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white/10 text-white font-semibold rounded-xl border border-white/20 hover:bg-white/20 transition-all min-h-[52px]"
            >
              Voir toutes les réalisations
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
