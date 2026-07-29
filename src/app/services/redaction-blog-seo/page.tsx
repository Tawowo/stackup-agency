/* eslint-disable react/no-unescaped-entities */
import type { Metadata } from 'next'
import Link from 'next/link'
import { CheckCircle, ChevronRight, FileText, TrendingUp, Clock } from 'lucide-react'
import { SITE } from '@/config/site'
import Breadcrumb from '@/components/ui/Breadcrumb'

export const metadata: Metadata = {
  title: 'Rédaction blog SEO — Articles optimisés à partir de 25€ | Stackup Agency',
  description: 'Des articles de blog optimisés SEO rédigés par des professionnels du web. À partir de 25€ l\'article. Packs mensuels 89€ et 159€. Boostez votre référencement naturel.',
  alternates: { canonical: `${SITE.url}/services/redaction-blog-seo` },
  openGraph: {
    url: `${SITE.url}/services/redaction-blog-seo`,
    title: 'Rédaction blog SEO — Stackup Agency',
    description: 'Articles optimisés SEO à partir de 25€. Packs mensuels pour les TPE et PME.',
    type: 'website',
  },
}

const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Rédaction blog SEO',
  provider: {
    '@type': 'Organization',
    name: SITE.name,
    url: SITE.url,
  },
  url: `${SITE.url}/services/redaction-blog-seo`,
  description: 'Rédaction d\'articles de blog optimisés pour le référencement naturel. Articles à l\'unité ou en packs mensuels.',
  offers: [
    { '@type': 'Offer', name: 'Article à l\'unité', priceCurrency: 'EUR', price: 25 },
    { '@type': 'Offer', name: 'Pack Visibilité', priceCurrency: 'EUR', price: 89, description: '4 articles par mois' },
    { '@type': 'Offer', name: 'Pack Autorité', priceCurrency: 'EUR', price: 159, description: '8 articles par mois' },
    { '@type': 'Offer', name: 'Accès technique blog', priceCurrency: 'EUR', price: 49, description: 'Installation du blog sur votre site existant' },
  ],
}

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Combien coûte un article de blog SEO ?',
      acceptedAnswer: { '@type': 'Answer', text: 'Un article de blog SEO coûte 25€ à l\'unité chez Stackup Agency. Nous proposons également des packs mensuels : Pack Visibilité à 89€/mois pour 4 articles, et Pack Autorité à 159€/mois pour 8 articles.' },
    },
    {
      '@type': 'Question',
      name: 'Comment fonctionnent les articles SEO pour un site existant ?',
      acceptedAnswer: { '@type': 'Answer', text: 'Si votre site n\'a pas encore de blog, nous proposons une prestation d\'accès technique à 49€ pour installer et configurer le module blog sur votre site existant. Ensuite, les articles sont rédigés et publiés chaque mois selon le pack choisi.' },
    },
    {
      '@type': 'Question',
      name: 'En combien de temps verrai-je des résultats SEO ?',
      acceptedAnswer: { '@type': 'Answer', text: 'Les premiers effets sur votre référencement naturel sont généralement visibles entre 3 et 6 mois après la publication régulière d\'articles. La constance est clé : un blog alimenté chaque mois progresse continuellement dans Google.' },
    },
  ],
}

const PACKS = [
  {
    nom: 'Article à l\'unité',
    prix: 25,
    unite: '/article',
    desc: 'Pour tester ou compléter ponctuellement votre contenu.',
    inclus: [
      'Article de 800 à 1 200 mots',
      'Recherche de mots-clés ciblés',
      'Structure Hn optimisée',
      'Méta-titre et meta description',
      'Liens internes vers vos services',
      'Livraison en 5 jours ouvrés',
    ],
    highlight: false,
    cta: 'Commander un article',
  },
  {
    nom: 'Pack Visibilité',
    prix: 89,
    unite: '/mois',
    detail: '4 articles par mois',
    desc: 'Alimentez votre blog régulièrement et gagnez en visibilité sur Google.',
    inclus: [
      '4 articles de 800 à 1 500 mots',
      'Calendrier éditorial mensuel',
      'Recherche de mots-clés',
      'Optimisation SEO on-page',
      'Maillage interne vers vos pages',
      'Rapport mensuel positions',
    ],
    highlight: true,
    cta: 'Choisir Pack Visibilité',
  },
  {
    nom: 'Pack Autorité',
    prix: 159,
    unite: '/mois',
    detail: '8 articles par mois',
    desc: 'Devenez la référence de votre secteur avec un flux de contenu soutenu.',
    inclus: [
      '8 articles de 1 000 à 2 000 mots',
      'Stratégie de contenu sur 3 mois',
      'Recherche de mots-clés longue traîne',
      'Optimisation SEO on-page complète',
      'Cocon sémantique structuré',
      'Rapport mensuel détaillé',
    ],
    highlight: false,
    cta: 'Choisir Pack Autorité',
  },
]

export default function RedactionBlogSEOPage() {
  return (
    <div className="min-h-screen bg-background dark:bg-[#0A0F1C]">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <div className="bg-gradient-to-b from-[#060D1A] to-[#0A0F1C] pt-24 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <Breadcrumb items={[{ name: 'Services', href: '/services' }, { name: 'Rédaction blog SEO' }]} />
          <div className="inline-block px-3 py-1 bg-blue-500/20 text-blue-400 text-xs font-medium rounded-full mb-4">
            Contenu & Référencement
          </div>
          <h1 className="text-3xl lg:text-5xl font-bold text-white leading-tight mb-4">
            Rédaction blog SEO
          </h1>
          <p className="text-white/80 text-lg mb-6 max-w-2xl leading-relaxed">
            Des articles de blog optimisés pour Google, rédigés par des professionnels du web.
            Gagnez en visibilité sans écrire une ligne — à partir de 25€ l'article.
          </p>
          <div className="flex flex-wrap gap-3 mb-8 text-sm text-white/60">
            <span className="flex items-center gap-1.5"><CheckCircle size={14} className="text-green-400" /> Dès 25€ l'article</span>
            <span className="flex items-center gap-1.5"><CheckCircle size={14} className="text-green-400" /> Livraison sous 5 jours ouvrés</span>
            <span className="flex items-center gap-1.5"><CheckCircle size={14} className="text-green-400" /> Optimisation SEO incluse</span>
          </div>
          <div className="flex flex-wrap gap-4">
            <Link href="/contact" className="px-6 py-3 bg-amber-500 hover:bg-amber-400 text-amber-950 font-semibold rounded-xl transition-all hover:-translate-y-0.5">
              Démarrer mon blog →
            </Link>
            <Link href="#packs" className="px-6 py-3 border border-white/20 text-white hover:bg-white/10 rounded-xl transition-all">
              Voir les packs
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-16 space-y-16">

        {/* Pourquoi un blog */}
        <section>
          <h2 className="text-2xl font-bold text-foreground dark:text-white mb-6">
            Pourquoi un blog SEO change tout pour votre activité
          </h2>
          <div className="grid sm:grid-cols-3 gap-5">
            {[
              {
                Icon: TrendingUp,
                titre: 'Visibilité durable',
                desc: 'Un article bien positionné génère du trafic pendant des années, sans publicité payante.',
              },
              {
                Icon: FileText,
                titre: 'Crédibilité secteur',
                desc: 'Partager votre expertise établit votre autorité et rassure vos prospects avant même qu\'ils vous contactent.',
              },
              {
                Icon: Clock,
                titre: 'Trafic passif',
                desc: 'Vos articles travaillent pour vous 24h/24. Chaque publication est un commercial supplémentaire.',
              },
            ].map(({ Icon, titre, desc }) => (
              <div key={titre} className="p-5 rounded-2xl border border-navy/20 dark:border-white/10 bg-white/2">
                <div className="w-10 h-10 rounded-xl bg-blue-500/20 flex items-center justify-center mb-4">
                  <Icon size={20} className="text-blue-400" />
                </div>
                <h3 className="font-semibold text-foreground dark:text-white mb-2">{titre}</h3>
                <p className="text-foreground/60 dark:text-white/60 text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Packs */}
        <section id="packs">
          <h2 className="text-2xl font-bold text-foreground dark:text-white mb-6">Nos packs de rédaction</h2>
          <div className="grid sm:grid-cols-3 gap-5">
            {PACKS.map(p => (
              <div key={p.nom} className={`rounded-2xl border p-6 flex flex-col ${p.highlight ? 'border-amber-500/40 bg-amber-500/5' : 'border-navy/20 dark:border-white/10'}`}>
                {p.highlight && (
                  <div className="text-xs font-semibold text-amber-700 dark:text-amber-500 mb-3 uppercase tracking-wide">Le plus populaire</div>
                )}
                <h3 className="text-lg font-bold text-foreground dark:text-white mb-1">{p.nom}</h3>
                {'detail' in p && p.detail && (
                  <div className="text-blue-700 dark:text-blue-400 text-xs font-medium mb-2">{p.detail}</div>
                )}
                <div className="mb-3">
                  <span className="text-3xl font-bold text-amber-700 dark:text-amber-500">{p.prix}€</span>
                  <span className="text-foreground/60 dark:text-white/50 text-sm ml-1">{p.unite}</span>
                </div>
                <p className="text-sm text-foreground/60 dark:text-white/60 mb-4">{p.desc}</p>
                <ul className="space-y-2 mb-6 flex-1">
                  {p.inclus.map(item => (
                    <li key={item} className="flex items-start gap-2">
                      <CheckCircle size={14} className="text-green-400 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-foreground/70 dark:text-white/70">{item}</span>
                    </li>
                  ))}
                </ul>
                <Link href="/contact" className={`flex items-center justify-center gap-1 px-4 py-2.5 rounded-xl text-sm font-semibold transition-colors ${p.highlight ? 'bg-amber-500 hover:bg-amber-400 text-amber-950' : 'bg-blue-600 hover:bg-blue-500 text-white'}`}>
                  {p.cta} <ChevronRight size={14} />
                </Link>
              </div>
            ))}
          </div>
        </section>

        {/* Accès technique */}
        <section className="rounded-2xl border border-blue-500/20 bg-blue-500/5 p-6">
          <div className="flex items-start justify-between gap-4 mb-3">
            <div>
              <h3 className="text-lg font-bold text-foreground dark:text-white">Accès technique blog</h3>
              <p className="text-blue-600 dark:text-blue-400 text-sm mt-0.5">Pour les sites existants sans blog</p>
            </div>
            <div className="text-right flex-shrink-0">
              <span className="text-2xl font-bold text-amber-700 dark:text-amber-500">49€</span>
              <div className="text-xs text-foreground/60 dark:text-white/50">une fois</div>
            </div>
          </div>
          <p className="text-foreground/70 dark:text-white/70 text-sm mb-4">
            Vous avez déjà un site web mais pas de section blog ? Nous installons et configurons le module blog
            sur votre site existant, quel que soit le CMS ou le framework utilisé. Prêt à recevoir vos premiers articles.
          </p>
          <div className="grid sm:grid-cols-2 gap-2 mb-4">
            {['Installation du module blog', 'Configuration SEO de base', 'Mise en page intégrée au design', 'Test et validation fonctionnelle'].map(f => (
              <div key={f} className="flex items-center gap-2">
                <CheckCircle size={13} className="text-green-400 flex-shrink-0" />
                <span className="text-sm text-foreground/70 dark:text-white/70">{f}</span>
              </div>
            ))}
          </div>
          <Link href="/contact" className="inline-flex items-center gap-1 text-blue-600 dark:text-blue-400 hover:text-blue-500 dark:hover:text-blue-300 font-medium text-sm transition-colors">
            Demander l'accès technique <ChevronRight size={14} />
          </Link>
        </section>

        {/* Process */}
        <section>
          <h2 className="text-2xl font-bold text-foreground dark:text-white mb-6">Comment ça marche ?</h2>
          <div className="space-y-4">
            {[
              { n: '01', titre: 'Brief initial', desc: 'Vous nous partagez votre secteur, vos services et vos objectifs. Nous définissons ensemble les sujets à traiter.' },
              { n: '02', titre: 'Recherche de mots-clés', desc: 'Nous identifions les requêtes que vos clients tapent sur Google et construisons un plan éditorial ciblé.' },
              { n: '03', titre: 'Rédaction & optimisation', desc: 'Chaque article est rédigé avec une structure Hn claire, des mots-clés intégrés naturellement et un appel à l\'action vers vos services.' },
              { n: '04', titre: 'Livraison & publication', desc: 'Vous recevez l\'article finalisé sous 5 jours ouvrés. En pack, nous gérons la publication directement sur votre site.' },
            ].map(step => (
              <div key={step.n} className="flex items-start gap-4 p-4 rounded-xl border border-white/5 bg-white/2">
                <div className="w-9 h-9 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                  {step.n}
                </div>
                <div>
                  <h3 className="font-semibold text-foreground dark:text-white mb-1">{step.titre}</h3>
                  <p className="text-foreground/60 dark:text-white/60 text-sm">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* FAQ */}
        <section>
          <h2 className="text-2xl font-bold text-foreground dark:text-white mb-6">Questions fréquentes</h2>
          <div className="space-y-3">
            {[
              { q: 'Combien coûte un article de blog SEO ?', a: 'Un article de blog SEO coûte 25€ à l\'unité. Nos packs mensuels offrent un meilleur rapport : Pack Visibilité à 89€/mois (4 articles) et Pack Autorité à 159€/mois (8 articles).' },
              { q: 'Mon site n\'a pas de blog. Est-ce un problème ?', a: 'Non. Si votre site n\'a pas encore de section blog, nous proposons une prestation d\'accès technique à 49€ pour l\'installer et le configurer. Cette prestation est réalisée une seule fois.' },
              { q: 'En combien de temps verrai-je des résultats ?', a: 'Les premiers effets SEO sont visibles entre 3 et 6 mois. La publication régulière d\'articles de qualité est la clé : chaque mois, votre autorité se renforce et vos positions s\'améliorent.' },
              { q: 'Puis-je choisir les sujets des articles ?', a: 'Oui, nous travaillons ensemble sur le calendrier éditorial. Vous pouvez nous soumettre vos idées et nous les validons sur le plan SEO, ou nous proposons des sujets basés sur notre analyse de mots-clés.' },
              { q: 'Les articles sont-ils uniques ?', a: 'Oui, chaque article est rédigé intégralement pour vous, adapté à votre secteur et à votre voix. Aucun contenu générique ou dupliqué : Google pénalise sévèrement le copier-coller.' },
            ].map(faq => (
              <details key={faq.q} className="group rounded-xl border border-navy/20 dark:border-white/10 overflow-hidden">
                <summary className="flex items-center justify-between p-4 cursor-pointer font-medium text-foreground dark:text-white list-none">
                  {faq.q}
                  <ChevronRight size={16} className="text-white/40 group-open:rotate-90 transition-transform flex-shrink-0" />
                </summary>
                <div className="px-4 pb-4 text-foreground/70 dark:text-white/70 text-sm">{faq.a}</div>
              </details>
            ))}
          </div>
        </section>

        <div className="rounded-2xl p-6 bg-gradient-to-br from-navy to-electric text-center">
          <h2 className="text-white font-bold text-xl mb-2">Prêt à booster votre référencement ?</h2>
          <p className="text-white/70 mb-4">Devis gratuit sous 72h. Premier article livré en 5 jours ouvrés.</p>
          <Link href="/contact" className="inline-block px-6 py-3 bg-amber-500 hover:bg-amber-400 text-amber-950 font-semibold rounded-xl transition-all hover:-translate-y-0.5">
            Démarrer mon blog SEO →
          </Link>
        </div>
      </div>
    </div>
  )
}
