/* eslint-disable react/no-unescaped-entities */
'use client'
import { useState } from 'react'
import Link from 'next/link'
import { CheckCircle, ChevronRight, FileText, TrendingUp, Clock, RefreshCw, CalculatorIcon } from 'lucide-react'
import { SITE } from '@/config/site'
import Breadcrumb from '@/components/ui/Breadcrumb'

// ── Schema.org (injected via dangerouslySetInnerHTML below) ──
const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Rédaction blog SEO',
  provider: { '@type': 'Organization', name: SITE.name, url: SITE.url },
  url: `${SITE.url}/services/redaction-blog-seo`,
  description: 'Rédaction d\'articles de blog optimisés pour le référencement naturel. Articles à l\'unité ou en packs mensuels. Relecture et personnalisation humaines garanties.',
  offers: [
    { '@type': 'Offer', name: 'Article à l\'unité', priceCurrency: 'EUR', price: 25 },
    { '@type': 'Offer', name: 'Pack Visibilité', priceCurrency: 'EUR', price: 89, description: '4 articles par mois, 2 optimisations content-refresh incluses' },
    { '@type': 'Offer', name: 'Pack Autorité', priceCurrency: 'EUR', price: 159, description: '8 articles par mois, 2 optimisations content-refresh/mois incluses' },
  ],
}

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    { '@type': 'Question', name: 'Qui rédige les articles ?', acceptedAnswer: { '@type': 'Answer', text: 'Les articles sont rédigés par l\'équipe Stackup Agency, assistée d\'outils modernes pour la recherche de mots-clés et la structure. Chaque texte passe par une relecture et une personnalisation humaines avant livraison — aucun contenu brut généré automatiquement n\'est publié tel quel.' } },
    { '@type': 'Question', name: 'Puis-je valider l\'article avant publication ?', acceptedAnswer: { '@type': 'Answer', text: 'Oui. Chaque article vous est soumis en version finale avant publication. Vous disposez d\'un aller-retour de corrections inclus dans chaque prestation.' } },
    { '@type': 'Question', name: 'Rédigez-vous des articles pour des sites tiers (sites clients, guest posting) ?', acceptedAnswer: { '@type': 'Answer', text: 'Oui. La prestation s\'applique à tout site : votre propre blog, un site partenaire pour du netlinking, ou un site de client si vous êtes une agence. Le tarif est identique.' } },
    { '@type': 'Question', name: 'Les images sont-elles fournies avec l\'article ?', acceptedAnswer: { '@type': 'Answer', text: 'Non. Nous livrons le texte structuré (H1/H2/H3, méta-titre, meta description, alt d\'images suggérés). La sélection et l\'insertion des images restent à votre charge, ou peuvent faire l\'objet d\'une prestation complémentaire.' } },
    { '@type': 'Question', name: 'Combien coûte un article de blog SEO ?', acceptedAnswer: { '@type': 'Answer', text: 'Un article de blog SEO coûte 25€ à l\'unité chez Stackup Agency. Les packs mensuels offrent un meilleur rapport : Pack Visibilité à 89€/mois (4 articles) et Pack Autorité à 159€/mois (8 articles + 2 content-refresh).' } },
    { '@type': 'Question', name: 'Mon site n\'a pas de blog. Est-ce un problème ?', acceptedAnswer: { '@type': 'Answer', text: 'Non. Si votre site n\'a pas encore de section blog, nous proposons une prestation d\'accès technique à 49€ pour l\'installer et le configurer. Cette prestation est réalisée une seule fois.' } },
    { '@type': 'Question', name: 'En combien de temps verrai-je des résultats ?', acceptedAnswer: { '@type': 'Answer', text: 'Les premiers effets SEO sont visibles entre 3 et 6 mois selon votre secteur et la concurrence. La publication régulière d\'articles de qualité est la clé : chaque mois, votre autorité se renforce et vos positions s\'améliorent progressivement.' } },
    { '@type': 'Question', name: 'Qu\'est-ce que le content refresh ?', acceptedAnswer: { '@type': 'Answer', text: 'Le content refresh consiste à mettre à jour et optimiser vos anciens articles pour regagner des positions perdues. C\'est inclus à raison de 2 optimisations par mois dans le Pack Autorité (159€/mois).' } },
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
    contentRefresh: false,
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
    contentRefresh: false,
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
      '2 content-refresh/mois inclus',
    ],
    highlight: false,
    cta: 'Choisir Pack Autorité',
    contentRefresh: true,
  },
]

function Calculator() {
  const [articles, setArticles] = useState(4)
  const [siteExterne, setSiteExterne] = useState(false)

  const unitaire = articles * 25
  let recommandation: { nom: string; prix: number; detail: string } | null = null
  if (articles >= 8) recommandation = { nom: 'Pack Autorité', prix: 159, detail: '8 articles/mois' }
  else if (articles >= 4) recommandation = { nom: 'Pack Visibilité', prix: 89, detail: '4 articles/mois' }

  const prixFinal = recommandation ? recommandation.prix + (siteExterne ? 0 : 0) : unitaire
  const coutParArticle = recommandation
    ? (recommandation.prix / (articles <= 4 ? 4 : 8)).toFixed(0)
    : '25'

  return (
    <div className="rounded-2xl border border-electric/20 bg-blue-500/5 p-6 lg:p-8">
      <div className="flex items-center gap-2 mb-6">
        <CalculatorIcon size={20} className="text-electric" />
        <h3 className="font-bold text-foreground dark:text-white text-lg">Estimez votre formule</h3>
      </div>

      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-foreground dark:text-white mb-2">
            Articles par mois : <span className="text-electric font-bold">{articles}</span>
          </label>
          <input
            type="range"
            min={1}
            max={10}
            value={articles}
            onChange={e => setArticles(Number(e.target.value))}
            className="w-full accent-electric"
          />
          <div className="flex justify-between text-xs text-foreground/40 dark:text-white/30 mt-1">
            <span>1</span><span>5</span><span>10</span>
          </div>
        </div>

        <label className="flex items-center gap-3 cursor-pointer">
          <input
            type="checkbox"
            checked={siteExterne}
            onChange={e => setSiteExterne(e.target.checked)}
            className="w-4 h-4 accent-electric"
          />
          <span className="text-sm text-foreground/80 dark:text-white/80">
            Article(s) pour un site tiers (guest posting, client)
          </span>
        </label>

        <div className="rounded-xl bg-white dark:bg-[#0D1626] border border-navy/10 dark:border-white/10 p-5">
          {recommandation ? (
            <>
              <div className="text-xs text-electric-ink dark:text-electric font-semibold uppercase tracking-wide mb-1">
                Formule recommandée
              </div>
              <div className="text-2xl font-bold text-foreground dark:text-white mb-0.5">
                {recommandation.nom}
              </div>
              <div className="text-electric text-sm mb-3">{recommandation.detail}</div>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-bold text-navy dark:text-gold">{prixFinal}€</span>
                <span className="text-foreground/50 dark:text-white/40 text-sm">/mois</span>
              </div>
              <div className="text-xs text-foreground/50 dark:text-white/40 mt-1">
                soit {coutParArticle}€/article — économie vs à l'unité
              </div>
            </>
          ) : (
            <>
              <div className="text-xs text-foreground/50 dark:text-white/40 uppercase tracking-wide mb-1">
                Estimation
              </div>
              <div className="text-3xl font-bold text-navy dark:text-gold">{unitaire}€</div>
              <div className="text-sm text-foreground/50 dark:text-white/40 mt-1">{articles} article{articles > 1 ? 's' : ''} × 25€</div>
            </>
          )}
          <Link
            href="/contact?projet=redaction"
            className="mt-4 inline-flex items-center gap-2 px-5 py-2.5 bg-electric hover:bg-navy text-white text-sm font-semibold rounded-xl transition-colors"
          >
            Obtenir mon devis →
          </Link>
        </div>
      </div>
    </div>
  )
}

export default function RedactionBlogSEOPage() {
  return (
    <div className="min-h-screen bg-[#FFFDF9]">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <div className="bg-gradient-to-b from-[#060D1A] to-[#0A0F1C] pt-24 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <Breadcrumb items={[{ name: 'Services', href: '/services' }, { name: 'Rédaction blog SEO' }]} />
          <div className="inline-block px-3 py-1 bg-blue-500/20 text-electric text-xs font-medium rounded-full mb-4">
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
            <span className="flex items-center gap-1.5"><CheckCircle size={14} className="text-success" /> Dès 25€ l'article</span>
            <span className="flex items-center gap-1.5"><CheckCircle size={14} className="text-success" /> Livraison sous 5 jours ouvrés</span>
            <span className="flex items-center gap-1.5"><CheckCircle size={14} className="text-success" /> Relecture humaine systématique</span>
          </div>
          <div className="flex flex-wrap gap-4">
            <Link href="/contact?projet=redaction" className="px-6 py-3 bg-gold hover:bg-gold/80 text-ink font-semibold rounded-xl transition-all hover:-translate-y-0.5">
              Démarrer mon blog →
            </Link>
            <Link href="#packs" className="px-6 py-3 border border-white/20 text-white hover:bg-white/10 rounded-xl transition-all">
              Voir les packs
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-16 space-y-16">

        {/* H2 — Rédacteur web, externalisation, plume d'entreprise */}
        <section>
          <h2 className="text-2xl font-bold text-foreground dark:text-white mb-4">
            Rédacteur web, externalisation, plume d'entreprise : la même mission bien faite
          </h2>
          <div className="prose dark:prose-invert prose-sm max-w-none text-foreground/70 dark:text-white/70 space-y-4">
            <p>
              Que vous cherchiez un rédacteur web freelance, une agence de contenu ou simplement quelqu'un
              pour tenir votre blog à votre place, vous posez la même question : comment produire des articles
              utiles, bien écrits et visibles sur Google, sans y passer vos soirées ?
            </p>
            <p>
              Chez Stackup Agency, nous prenons en charge toute la chaîne : identification des mots-clés sur
              lesquels vous avez une chance réelle de vous positionner, rédaction d'un article structuré qui
              répond à la question de votre prospect, et intégration directe dans votre blog. Pas de contenu
              générique produit à la chaîne : chaque texte est personnalisé à votre secteur, à votre ton et
              à vos offres. Rédaction externalisée ou plume d'entreprise, la mission est identique — décharger
              le dirigeant de la production éditoriale tout en renforçant son autorité en ligne.
            </p>
          </div>
        </section>

        {/* H2 — Méthode */}
        <section>
          <h2 className="text-2xl font-bold text-foreground dark:text-white mb-6">Notre méthode, étape par étape</h2>
          <div className="space-y-4">
            {[
              { n: '01', titre: 'Brief SEO', Icon: FileText, desc: 'Analyse de votre secteur, de vos concurrents et des requêtes de vos clients. Nous identifions les sujets à fort potentiel et construisons un plan éditorial ciblé.' },
              { n: '02', titre: 'Rédaction assistée par outils modernes', Icon: TrendingUp, desc: 'Nous utilisons des outils de recherche sémantique pour structurer le champ lexical de chaque article et maximiser la couverture des requêtes associées. La rédaction reste humaine — les outils guident, ils n\'écrivent pas.' },
              { n: '03', titre: 'Relecture et personnalisation humaines', Icon: CheckCircle, desc: 'Chaque article est relu et ajusté à votre voix avant livraison. Vous recevez un texte qui vous ressemble, pas un copier-coller de formules génériques. Un aller-retour de corrections est inclus.' },
              { n: '04', titre: 'Intégration et maillage', Icon: Clock, desc: 'En pack, nous publions directement sur votre site et ajoutons les liens internes vers vos pages de service. Le maillage interne est un levier SEO souvent négligé — nous l\'intégrons dès la rédaction.' },
            ].map(step => (
              <div key={step.n} className="flex items-start gap-4 p-5 rounded-xl border border-navy/10 dark:border-white/8 bg-white dark:bg-[#0D1626]">
                <div className="w-9 h-9 rounded-full bg-navy flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                  {step.n}
                </div>
                <div>
                  <h3 className="font-semibold text-foreground dark:text-white mb-1">{step.titre}</h3>
                  <p className="text-foreground/60 dark:text-white/60 text-sm leading-relaxed">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* H2 — Content refresh */}
        <section className="rounded-2xl border border-amber-500/20 bg-amber-50/30 dark:bg-amber-500/5 p-6 lg:p-8">
          <div className="flex items-start gap-3 mb-4">
            <RefreshCw size={20} className="text-amber-600 dark:text-gold mt-0.5 flex-shrink-0" />
            <h2 className="text-xl font-bold text-foreground dark:text-white">
              Content refresh : vos anciens articles valent de l'or
            </h2>
          </div>
          <p className="text-foreground/70 dark:text-white/70 text-sm leading-relaxed mb-4">
            Un article publié il y a 18 mois qui a perdu ses positions n'est pas mort — il est en attente
            de mise à jour. Le content refresh (ou optimisation d'articles existants) consiste à actualiser
            les informations, enrichir le champ sémantique et améliorer la structure pour regagner les
            premières pages de Google. C'est souvent plus rapide que de rédiger un article de zéro.
          </p>
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-amber-500/15 text-amber-700 dark:text-gold rounded-xl text-sm font-semibold">
            <CheckCircle size={14} />
            2 optimisations content-refresh/mois incluses dans le Pack Autorité (159€/mois)
          </div>
        </section>

        {/* H2 — Au forfait ou à l'article + tableau comparatif */}
        <section id="packs">
          <h2 className="text-2xl font-bold text-foreground dark:text-white mb-2">
            Au forfait ou à l'article ?
          </h2>
          <p className="text-foreground/60 dark:text-white/60 text-sm mb-8">
            Si vous publiez moins de 3 articles par mois, l'unité est plus souple. Au-delà, le forfait
            devient systématiquement moins cher et vous garantit une fréquence régulière.
          </p>

          {/* Comparison table */}
          <div className="overflow-x-auto mb-10">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="border-b border-navy/10 dark:border-white/10">
                  <th className="text-left py-3 pr-4 text-foreground/60 dark:text-white/50 font-medium"></th>
                  <th className="py-3 px-4 text-center text-foreground dark:text-white font-semibold">À l'unité</th>
                  <th className="py-3 px-4 text-center text-foreground dark:text-white font-semibold bg-gold/5 rounded-t-xl">Pack Visibilité</th>
                  <th className="py-3 px-4 text-center text-foreground dark:text-white font-semibold">Pack Autorité</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-navy/5 dark:divide-white/5">
                {[
                  ['Prix', '25€', '89€/mois', '159€/mois'],
                  ['Articles/mois', '1 à la fois', '4', '8'],
                  ['Coût par article', '25€', '22,25€', '19,88€'],
                  ['Calendrier éditorial', '✗', '✓', '✓'],
                  ['Rapport de positions', '✗', '✓', '✓'],
                  ['Content refresh inclus', '✗', '✗', '2/mois'],
                  ['Cocon sémantique', '✗', '✗', '✓'],
                  ['Engagement', 'Aucun', 'Mensuel', 'Mensuel'],
                ].map(([label, col1, col2, col3]) => (
                  <tr key={label}>
                    <td className="py-3 pr-4 text-foreground/70 dark:text-white/60">{label}</td>
                    <td className="py-3 px-4 text-center text-foreground/70 dark:text-white/60">{col1}</td>
                    <td className="py-3 px-4 text-center text-foreground dark:text-white bg-gold/5 font-medium">{col2}</td>
                    <td className="py-3 px-4 text-center text-foreground/70 dark:text-white/60">{col3}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pack cards */}
          <div className="grid sm:grid-cols-3 gap-5">
            {PACKS.map(p => (
              <div key={p.nom} className={`rounded-2xl border p-6 flex flex-col ${p.highlight ? 'border-amber-500/40 bg-gold/5' : 'border-navy/20 dark:border-white/10 bg-white dark:bg-[#0D1626]'}`}>
                {p.highlight && (
                  <div className="text-xs font-semibold text-navy dark:text-gold mb-3 uppercase tracking-wide">Le plus populaire</div>
                )}
                <h3 className="text-lg font-bold text-foreground dark:text-white mb-1">{p.nom}</h3>
                {'detail' in p && p.detail && (
                  <div className="text-electric-ink dark:text-electric text-xs font-medium mb-2">{p.detail}</div>
                )}
                <div className="mb-3">
                  <span className="text-3xl font-bold text-navy dark:text-gold">{p.prix}€</span>
                  <span className="text-foreground/60 dark:text-white/50 text-sm ml-1">{p.unite}</span>
                </div>
                <p className="text-sm text-foreground/60 dark:text-white/60 mb-4">{p.desc}</p>
                <ul className="space-y-2 mb-6 flex-1">
                  {p.inclus.map(item => (
                    <li key={item} className="flex items-start gap-2">
                      <CheckCircle size={14} className={`mt-0.5 flex-shrink-0 text-success'}`} />
                      <span className="text-sm text-foreground/70 dark:text-white/70">{item}</span>
                    </li>
                  ))}
                </ul>
                <Link href="/contact?projet=redaction" className={`flex items-center justify-center gap-1 px-4 py-2.5 rounded-xl text-sm font-semibold transition-colors ${p.highlight ? 'bg-gold hover:bg-gold/80 text-ink' : 'bg-navy hover:bg-electric text-white'}`}>
                  {p.cta} <ChevronRight size={14} />
                </Link>
              </div>
            ))}
          </div>
        </section>

        {/* Calculateur */}
        <section>
          <Calculator />
        </section>

        {/* Accès technique */}
        <section className="rounded-2xl border border-electric/20 bg-blue-500/5 p-6">
          <div className="flex items-start justify-between gap-4 mb-3">
            <div>
              <h3 className="text-lg font-bold text-foreground dark:text-white">Accès technique blog</h3>
              <p className="text-electric-ink dark:text-electric text-sm mt-0.5">Pour les sites existants sans blog</p>
            </div>
            <div className="text-right flex-shrink-0">
              <span className="text-2xl font-bold text-navy dark:text-gold">49€</span>
              <div className="text-xs text-foreground/60 dark:text-white/50">une fois</div>
            </div>
          </div>
          <p className="text-foreground/70 dark:text-white/70 text-sm mb-4">
            Vous avez déjà un site web mais pas de section blog ? Nous installons et configurons le module blog
            sur votre site existant. Prêt à recevoir vos premiers articles.
          </p>
          <div className="grid sm:grid-cols-2 gap-2 mb-4">
            {['Installation du module blog', 'Configuration SEO de base', 'Mise en page intégrée au design', 'Test et validation fonctionnelle'].map(f => (
              <div key={f} className="flex items-center gap-2">
                <CheckCircle size={13} className="text-success flex-shrink-0" />
                <span className="text-sm text-foreground/70 dark:text-white/70">{f}</span>
              </div>
            ))}
          </div>
          <Link href="/contact?projet=redaction" className="inline-flex items-center gap-1 text-electric-ink dark:text-electric hover:text-electric font-medium text-sm transition-colors">
            Demander l'accès technique <ChevronRight size={14} />
          </Link>
        </section>

        {/* FAQ — 8 questions */}
        <section>
          <h2 className="text-2xl font-bold text-foreground dark:text-white mb-6">Questions fréquentes</h2>
          <div className="space-y-3">
            {faqSchema.mainEntity.map(faq => (
              <details key={faq.name} className="group rounded-xl border border-navy/20 dark:border-white/10 overflow-hidden">
                <summary className="flex items-center justify-between p-4 cursor-pointer font-medium text-foreground dark:text-white list-none">
                  {faq.name}
                  <ChevronRight size={16} className="text-white/40 group-open:rotate-90 transition-transform flex-shrink-0" />
                </summary>
                <div className="px-4 pb-4 text-foreground/70 dark:text-white/70 text-sm leading-relaxed">{faq.acceptedAnswer.text}</div>
              </details>
            ))}
          </div>
          <div className="mt-4">
            <Link href="/cgv" className="text-xs text-foreground/40 dark:text-white/30 hover:text-electric transition-colors">
              Voir nos CGV complètes →
            </Link>
          </div>
        </section>

        {/* Articles liés */}
        <section>
          <h2 className="text-xl font-bold text-foreground dark:text-white mb-4">Pour aller plus loin</h2>
          <div className="grid sm:grid-cols-2 gap-3">
            {[
              { href: '/blog/redacteur-web-freelance-ou-agence', titre: 'Rédacteur web freelance ou agence : que choisir ?' },
              { href: '/blog/externaliser-redaction-blog-guide', titre: 'Externaliser la rédaction de son blog : le guide complet' },
              { href: '/blog/articles-blog-ia-seo-2026', titre: 'Articles de blog générés par IA et SEO en 2026 : ce qu\'il faut savoir' },
              { href: '/blog/content-refresh-anciens-articles', titre: 'Content refresh : comment redonner vie à vos anciens articles' },
            ].map(a => (
              <Link key={a.href} href={a.href}
                className="flex items-center gap-3 p-4 rounded-xl border border-navy/10 dark:border-white/10 hover:border-electric/30 transition-colors group">
                <FileText size={14} className="text-electric flex-shrink-0" />
                <span className="text-sm text-foreground/80 dark:text-white/70 group-hover:text-electric transition-colors">{a.titre}</span>
              </Link>
            ))}
          </div>
        </section>

        <div className="rounded-2xl p-6 bg-gradient-to-br from-navy to-electric text-center">
          <h2 className="text-white font-bold text-xl mb-2">Prêt à booster votre référencement ?</h2>
          <p className="text-white/70 mb-4">Devis gratuit sous 72h. Premier article livré en 5 jours ouvrés.</p>
          <Link href="/contact?projet=redaction" className="inline-block px-6 py-3 bg-gold hover:bg-gold/80 text-ink font-semibold rounded-xl transition-all hover:-translate-y-0.5">
            Démarrer mon blog SEO →
          </Link>
        </div>
      </div>
    </div>
  )
}
