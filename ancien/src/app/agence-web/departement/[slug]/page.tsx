import { DEPARTEMENTS, getDepartement, getArticles } from '@/data/departements'
import { COMMUNES_PAR_DEPARTEMENT, getCommunesTotal } from '@/data/communes-groupes'
import { VILLES } from '@/data/villes'
import { SITE } from '@/config/site'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ArrowRight, MapPin } from 'lucide-react'
import MiniHero from '@/components/ui/MiniHero'

export function generateStaticParams() {
  return DEPARTEMENTS.map(d => ({ slug: d.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const parametres = await params
  const d = getDepartement(parametres.slug)
  if (!d) return {}
  const art = getArticles(d.slug)
  return {
    title: { absolute: `Agence web ${d.nom} (${d.code}) — Création de site internet | Stackup` },
    description: `Création de sites internet dans ${art.dans}${d.nom} : ${d.communesPrincipales.slice(0, 4).join(', ')}… Site vitrine dès ${SITE.pricing.vitrine} €, livré en 10 jours ouvrés. Devis gratuit sous 72 h.`,
    alternates: { canonical: `${SITE.url}/agence-web/departement/${d.slug}` },
    openGraph: {
      url: `${SITE.url}/agence-web/departement/${d.slug}`,
      title: `Agence web ${d.nom} (${d.code}) — Stackup Agency`,
      description: d.intro,
      type: 'website',
    },
  }
}

export default async function DepartementPage({ params }: { params: Promise<{ slug: string }> }) {
  const parametres = await params
  const d = getDepartement(parametres.slug)
  if (!d) notFound()
  const art = getArticles(d.slug)

  const villesAvecPage = VILLES.filter(v => d.communesPrincipales.some(c =>
    c.localeCompare(v.ville, 'fr', { sensitivity: 'base' }) === 0))

  const groupes = COMMUNES_PAR_DEPARTEMENT[d.slug] || []
  const totalCommunes = getCommunesTotal(d.slug)

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Accueil', item: SITE.url },
      { '@type': 'ListItem', position: 2, name: 'Zones d’intervention', item: `${SITE.url}/zones-intervention` },
      { '@type': 'ListItem', position: 3, name: d.nom, item: `${SITE.url}/agence-web/departement/${d.slug}` },
    ],
  }

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: d.faq.map(f => ({
      '@type': 'Question', name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  }

  return (
    <div className="min-h-screen bg-[#FFFDF9]">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      {/* Hero */}
      <MiniHero
        signature="maillage"
        breadcrumb={[{ name: 'Zones d’intervention', href: '/zones-intervention' }, { name: d.nom }]}
        marker={`${d.region} · ${d.code}`}
        title={`Agence web ${d.nom}`}
      >
        {/* Réponse directe (format IA) */}
        <p className="su-sig__chapo">
          Stackup Agency crée des sites internet pour les entreprises {art.de}{d.nom} — site vitrine à partir de {SITE.pricing.vitrine} €, livré en 10 jours ouvrés, devis gratuit sous 72 h. Basée à Tours, l’agence travaille à distance ou en rendez-vous selon la proximité.
        </p>
      </MiniHero>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-16 space-y-16">

        {/* Intro + économie */}
        <section>
          <p className="text-navy/75 leading-relaxed mb-5">{d.intro}</p>
          <h2 className="text-2xl font-bold text-navy mb-4">Le tissu économique {art.de}{d.nom}</h2>
          <p className="text-navy/75 leading-relaxed">{d.economie}</p>
        </section>

        {/* Métiers phares */}
        <section>
          <h2 className="text-2xl font-bold text-navy mb-6">Les besoins web par métier dans le {d.code}</h2>
          <div className="grid sm:grid-cols-2 gap-3">
            {d.metiersPhares.map(m => (
              <div key={m.metier} className="p-4 rounded-xl bg-white border border-gray-100">
                <div className="font-bold text-navy text-sm mb-1">{m.metier}</div>
                <div className="text-[#475569] text-sm">{m.besoin}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Villes principales avec pages */}
        {villesAvecPage.length > 0 && (
          <section>
            <h2 className="text-2xl font-bold text-navy mb-4">Nos pages villes dans le {d.code}</h2>
            <div className="flex flex-wrap gap-2">
              {villesAvecPage.map(v => (
                <Link key={v.slug} href={`/agence-web/${v.slug}`}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white border border-gray-200 text-navy text-sm font-medium hover:border-gold/40 hover:-translate-y-0.5 transition-all">
                  <MapPin size={13} className="text-[#B45309]" /> {v.ville}
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Toutes les communes, organisées par intercommunalité */}
        <section>
          <h2 className="text-2xl font-bold text-navy mb-3">
            Les {totalCommunes > 0 ? totalCommunes.toLocaleString('fr-FR') : ''} communes couvertes en {d.nom} ({d.code})
          </h2>
          <p className="text-[#475569] text-sm mb-8 max-w-2xl">
            Nous créons des sites internet pour les entreprises de {art.de}{d.nom} entier, quelle que soit la taille de la commune —
            de {d.chefLieu} au plus petit village. Liste complète, organisée par intercommunalité :
          </p>
          {groupes.length > 0 ? (
            <div className="space-y-6">
              {groupes.map(g => (
                <div key={g.epci}>
                  <h3 className="text-sm font-bold text-navy mb-2 flex items-center gap-2">
                    <MapPin size={13} className="text-[#B45309] flex-shrink-0" />
                    Autour de {g.epci} — {g.communes.length} commune{g.communes.length > 1 ? 's' : ''}
                  </h3>
                  <p className="text-[#475569] text-[13px] leading-relaxed pl-5">
                    {g.communes.join(' · ')}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-navy/70 text-sm leading-relaxed columns-2 sm:columns-3 gap-6">
              {d.communes.join(' · ')}
            </p>
          )}
          <p className="text-[#64748B] text-xs mt-6">
            Votre commune n’apparaît pas ou vous avez un doute ? Nous intervenons partout dans le {d.code} — la création de site se fait à distance, aux mêmes tarifs.
          </p>
        </section>

        {/* Offres */}
        <section>
          <h2 className="text-2xl font-bold text-navy mb-6">Nos offres pour les entreprises du {d.code}</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {[
              { nom: 'Site vitrine', prix: SITE.pricing.vitrine, href: '/services/site-vitrine', delai: '10 j ouvrés' },
              { nom: 'Site multi-pages', prix: SITE.pricing.multipages, href: '/services/site-multi-pages', delai: '17 j ouvrés' },
              { nom: 'Boutique en ligne', prix: SITE.pricing.ecommerce, href: '/services/site-ecommerce', delai: '21 j ouvrés' },
              { nom: 'Système de gestion', prix: SITE.pricing.gestion, href: '/services/systeme-gestion', delai: 'sur mesure' },
            ].map(o => (
              <Link key={o.nom} href={o.href} className="p-4 rounded-xl bg-white border border-gray-100 hover:border-gold/40 hover:-translate-y-0.5 transition-all block">
                <div className="font-bold text-navy text-sm mb-1">{o.nom}</div>
                <div className="text-[#B45309] font-bold">à partir de {o.prix.toLocaleString('fr-FR')} €</div>
                <div className="text-[#64748B] text-xs mt-1">à partir de {o.delai}</div>
              </Link>
            ))}
          </div>
        </section>

        {/* FAQ */}
        <section>
          <h2 className="text-2xl font-bold text-navy mb-6">Questions fréquentes — {d.nom}</h2>
          <div className="space-y-3">
            {d.faq.map(f => (
              <details key={f.q} className="group rounded-xl border border-gray-200 bg-white overflow-hidden">
                <summary className="flex items-center justify-between p-4 cursor-pointer font-medium text-navy list-none">
                  {f.q}
                  <ArrowRight size={14} className="text-[#64748B] group-open:rotate-90 transition-transform flex-shrink-0" />
                </summary>
                <div className="px-4 pb-4 text-navy/75 text-sm leading-relaxed">{f.a}</div>
              </details>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="rounded-2xl p-8 bg-gradient-to-br from-navy to-electric text-center">
          <h2 className="text-white font-bold text-xl mb-2">Un projet dans le {d.code} ?</h2>
          <p className="text-white/70 text-sm mb-6">Devis gratuit sous 72 h · premier rendez-vous offert · sans engagement</p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link href="/devis" className="px-6 py-3 bg-gold hover:bg-gold/90 text-ink font-bold rounded-xl transition-all hover:-translate-y-0.5 text-sm">
              Démarrer mon devis
            </Link>
            <Link href="/realisations" className="px-6 py-3 border border-white/25 text-white hover:bg-white/10 font-semibold rounded-xl transition-all text-sm">
              Voir nos démonstrations
            </Link>
          </div>
        </section>

        {/* Maillage */}
        <div className="flex flex-wrap gap-4 text-sm pt-4 border-t border-navy/10">
          <Link href="/zones-intervention" className="text-electric hover:underline">Toutes nos zones d’intervention →</Link>
          <Link href="/creation-site-internet" className="text-electric hover:underline">Sites par métier →</Link>
          <Link href="/tarifs" className="text-electric hover:underline">Tarifs →</Link>
        </div>
      </div>
    </div>
  )
}
