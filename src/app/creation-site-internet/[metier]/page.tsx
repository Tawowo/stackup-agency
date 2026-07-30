/* eslint-disable react/no-unescaped-entities */
import { METIERS, getMetier, CATEGORIES_METIERS } from '@/data/metiers'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ChevronRight, Home, CheckCircle, AlertCircle, Zap, Shield, Users, ArrowRight } from 'lucide-react'
import { SITE } from '@/config/site'

export async function generateStaticParams() {
  return METIERS.map(m => ({ metier: m.slug }))
}

export async function generateMetadata({ params }: { params: { metier: string } }) {
  const m = getMetier(params.metier)
  if (!m) return {}
  const url = `${SITE.url}/creation-site-internet/${m.slug}`
  const titre = `Site internet ${m.metier} — Création à partir de ${SITE.pricing.vitrine}€ | Stackup Agency`
  const description = `Création de site internet pour ${m.metier} : ${m.intro.slice(0, 120)}... Devis gratuit sous 72h, livraison en ${m.serviceLie === 'site-ecommerce' ? SITE.delais.ecommerce : m.serviceLie === 'site-multi-pages' ? SITE.delais.multipages : SITE.delais.vitrine}.`
  return {
    title: titre,
    description,
    alternates: { canonical: url },
    openGraph: { url, title: titre, description, type: 'website' },
  }
}

const SERVICE_LABELS: Record<string, { label: string; prix: number; href: string }> = {
  'site-vitrine': { label: 'Site vitrine', prix: SITE.pricing.vitrine, href: '/services/site-vitrine' },
  'site-multi-pages': { label: 'Site multi-pages', prix: SITE.pricing.multipages, href: '/services/site-multi-pages' },
  'site-ecommerce': { label: 'Boutique en ligne', prix: SITE.pricing.ecommerce, href: '/services/site-ecommerce' },
  'systeme-gestion': { label: 'Système de gestion', prix: SITE.pricing.gestion, href: '/services/systeme-gestion' },
}

const PROBLEMES_SANS_SITE = (metier: string) => [
  `Vos concurrents ${metier}s apparaissent en premier sur Google, même s'ils sont moins bons que vous`,
  `Des clients potentiels ne vous trouvent pas et appellent quelqu'un d'autre faute de vous trouver en ligne`,
  `Votre réputation repose sur le bouche-à-oreille seul — fragile et non scalable`,
  `Vous n'avez aucune présence la nuit et le week-end quand vos prospects cherchent`,
  `Sans site, vous ne captez pas les avis clients qui rassurent les nouveaux prospects`,
]

const AVANTAGES_STACKUP = [
  { icon: Zap, titre: 'Livraison garantie', desc: 'Délais tenus, toujours. Votre site est livré à la date convenue ou nous vous remboursons.' },
  { icon: Shield, titre: 'Sans abonnement caché', desc: 'Hébergement inclus 12 mois, puis tarif transparent. Aucune surprise dans votre facture.' },
  { icon: Users, titre: 'Fondateur accessible', desc: 'Vous parlez directement au développeur, pas à un commercial. Réponse sous 24h garantie.' },
  { icon: CheckCircle, titre: 'SEO local intégré', desc: 'Chaque site est optimisé pour votre ville et votre métier dès la mise en ligne.' },
]

export default function MetierPage({ params }: { params: { metier: string } }) {
  const m = getMetier(params.metier)
  if (!m) notFound()

  const url = `${SITE.url}/creation-site-internet/${m.slug}`
  const service = SERVICE_LABELS[m.serviceLie] ?? SERVICE_LABELS['site-vitrine']
  const categorieLbl = CATEGORIES_METIERS[m.categorie] ?? m.categorie
  const delai = m.serviceLie === 'site-ecommerce' ? SITE.delais.ecommerce : m.serviceLie === 'site-multi-pages' ? SITE.delais.multipages : SITE.delais.vitrine

  // Autres métiers de la même catégorie (max 6)
  const metiersMemeCategorie = METIERS.filter(mi => mi.categorie === m.categorie && mi.slug !== m.slug).slice(0, 6)

  const faqAll = [
    {
      q: `Quel est le prix d'un site internet pour ${m.metier} ?`,
      a: `Un ${service.label.toLowerCase()} pour ${m.metier} coûte à partir de ${service.prix}€ chez Stackup Agency. Le devis est personnalisé et rendu gratuitement sous 72h selon vos besoins spécifiques.`,
    },
    {
      q: `Combien de temps pour créer mon site de ${m.metier} ?`,
      a: `Votre ${service.label.toLowerCase()} est livré en ${delai} à compter de la validation du brief et du paiement de l'acompte. Nous garantissons le respect de ce délai.`,
    },
    ...m.faq,
    {
      q: `Stackup Agency peut-elle créer un site pour ${m.metier} partout en France ?`,
      a: `Oui, nous travaillons à distance avec des ${m.metier}s partout en France. Les échanges se font par visioconférence et email — ce qui nous permet de tenir des délais courts et des tarifs compétitifs.`,
    },
  ]

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqAll.map(faq => ({
      '@type': 'Question',
      name: faq.q,
      acceptedAnswer: { '@type': 'Answer', text: faq.a },
    })),
  }

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Accueil', item: SITE.url },
      { '@type': 'ListItem', position: 2, name: 'Création site internet', item: `${SITE.url}/creation-site-internet` },
      { '@type': 'ListItem', position: 3, name: `Site internet ${m.metier}`, item: url },
    ],
  }

  return (
    <div className="min-h-screen bg-background dark:bg-[#0A0F1C]">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      {/* Hero */}
      <div className="bg-gradient-to-b from-[#060D1A] to-[#0A0F1C] pt-24 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <nav className="flex items-center gap-1.5 text-white/40 text-xs mb-6" aria-label="Fil d'Ariane">
            <Link href="/" className="hover:text-white transition-colors flex items-center gap-1"><Home size={11} /> Accueil</Link>
            <ChevronRight size={11} />
            <Link href="/creation-site-internet" className="hover:text-white transition-colors">Création site internet</Link>
            <ChevronRight size={11} />
            <span className="text-white/60 capitalize">{m.metier}</span>
          </nav>

          <div className="inline-block px-3 py-1 bg-blue-500/20 text-electric text-xs font-medium rounded-full mb-4">{categorieLbl}</div>

          <h1 className="text-3xl lg:text-5xl font-bold text-white leading-tight mb-4">
            Site internet pour {m.metier}
          </h1>
          <p className="text-white/80 text-lg mb-6 max-w-2xl leading-relaxed">
            {m.intro}
          </p>

          <div className="flex flex-wrap gap-3 mb-8 text-sm text-white/60">
            <span className="flex items-center gap-1.5"><CheckCircle size={14} className="text-green-400" /> À partir de {service.prix}€</span>
            <span className="flex items-center gap-1.5"><CheckCircle size={14} className="text-green-400" /> Livraison en {delai}</span>
            <span className="flex items-center gap-1.5"><CheckCircle size={14} className="text-green-400" /> Devis gratuit sous 72h</span>
          </div>

          <div className="flex flex-wrap gap-4">
            <Link href="/contact" className="px-6 py-3 bg-gold hover:bg-gold/80 text-ink font-semibold rounded-xl transition-all hover:-translate-y-0.5">
              Devis gratuit sous 72h →
            </Link>
            <Link href={service.href} className="px-6 py-3 border border-white/20 text-white hover:bg-white/10 rounded-xl transition-all">
              Voir l'offre {service.label}
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-16 space-y-16">

        {/* Problèmes sans site */}
        <section>
          <h2 className="text-2xl font-bold text-foreground dark:text-white mb-2">
            Sans site internet professionnel, vous perdez des clients chaque jour
          </h2>
          <p className="text-foreground/60 dark:text-white/60 mb-6">
            En 2026, 76% des consommateurs cherchent un prestataire en ligne avant de prendre contact. Voici ce que vous laissez à vos concurrents :
          </p>
          <div className="space-y-3">
            {PROBLEMES_SANS_SITE(m.metier).map((pb, i) => (
              <div key={i} className="flex items-start gap-3 p-4 rounded-xl bg-red-950/20 border border-red-900/30">
                <AlertCircle size={18} className="text-red-400 mt-0.5 flex-shrink-0" />
                <span className="text-foreground/80 dark:text-white/80 text-sm">{pb}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Offre recommandée */}
        <section>
          <h2 className="text-2xl font-bold text-foreground dark:text-white mb-6">
            Notre recommandation pour un {m.metier}
          </h2>
          <div className="p-6 rounded-2xl border border-electric/30 bg-blue-500/5">
            <div className="flex items-start justify-between mb-3">
              <div>
                <h3 className="text-xl font-bold text-foreground dark:text-white">{service.label}</h3>
                <p className="text-electric text-sm mt-0.5">Solution recommandée pour les {m.metier}s</p>
              </div>
              <span className="text-2xl font-bold text-navy dark:text-gold">{service.prix}€</span>
            </div>
            <p className="text-foreground/70 dark:text-white/70 mb-5">
              Solution adaptée à la grande majorité des {m.metier}s. Inclut SEO local optimisé pour votre ville,
              formulaire de contact, design responsive mobile et hébergement haute disponibilité 12 mois inclus.
            </p>
            <div className="grid sm:grid-cols-3 gap-3 text-sm">
              {[
                `✓ Livraison : ${delai}`,
                '✓ Hébergement inclus 12 mois',
                '✓ SSL + Google Analytics inclus',
                '✓ SEO local optimisé',
                '✓ Compatible mobile & tablette',
                '✓ Formulaire de contact intégré',
              ].map(f => (
                <span key={f} className="text-foreground/70 dark:text-white/60">{f}</span>
              ))}
            </div>
          </div>
        </section>

        {/* Ce qu'inclut votre site — fonctionnalités métier-spécifiques */}
        <section>
          <h2 className="text-2xl font-bold text-foreground dark:text-white mb-2">
            Ce qu'inclut votre site de {m.metier}
          </h2>
          <p className="text-foreground/60 dark:text-white/60 mb-6">
            En plus des fonctionnalités communes à tous nos sites (SEO, mobile, hébergement), votre site inclut des éléments spécifiques à votre métier :
          </p>
          <div className="grid sm:grid-cols-2 gap-3">
            {[
              `Page d'accueil optimisée pour "${m.requetePrincipale}"`,
              'Présentation de vos services avec photos professionnelles',
              'Formulaire de contact et localisation Google Maps',
              'Optimisation SEO local pour votre ville et département',
              ...m.inclus,
            ].map(item => (
              <div key={item} className="flex items-start gap-3 p-3 rounded-xl bg-green-950/20 border border-green-900/20">
                <CheckCircle size={16} className="text-green-400 mt-0.5 flex-shrink-0" />
                <span className="text-foreground/80 dark:text-white/80 text-sm">{item}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Pourquoi Stackup */}
        <section>
          <h2 className="text-2xl font-bold text-foreground dark:text-white mb-6">
            Pourquoi choisir Stackup Agency pour votre site de {m.metier} ?
          </h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {AVANTAGES_STACKUP.map(({ icon: Icon, titre, desc }) => (
              <div key={titre} className="flex items-start gap-4 p-4 rounded-xl border border-white/10 bg-white/5">
                <div className="w-10 h-10 rounded-xl bg-blue-500/20 flex items-center justify-center flex-shrink-0">
                  <Icon size={20} className="text-electric" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground dark:text-white mb-1">{titre}</h3>
                  <p className="text-foreground/60 dark:text-white/60 text-sm">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Jugez sur pièce */}
        <section className="rounded-2xl p-6 bg-gradient-to-br from-navy/20 to-blue-950/20 border border-white/10">
          <h3 className="font-bold text-white mb-2">Jugez sur pièce</h3>
          <p className="text-white/70 text-sm mb-4">Toutes nos démonstrations sont des projets complets, construits par nos soins et consultables en ligne. Ce que vous voyez est exactement ce que nous livrons.</p>
          <Link href="/realisations" className="inline-flex items-center gap-2 text-electric text-sm font-medium hover:text-electric/80 transition-colors">
            Explorer nos démonstrations <ArrowRight size={14} />
          </Link>
        </section>

        {/* Encart blog SEO */}
        <section className="rounded-2xl border border-electric/20 bg-blue-950/20 p-6">
          <div className="flex items-start justify-between gap-4 mb-3">
            <div>
              <h3 className="font-bold text-white">Rendez votre site encore plus visible avec un blog SEO</h3>
              <p className="text-electric text-xs font-medium mt-0.5">À partir de 25€ l'article</p>
            </div>
            <span className="text-gold font-bold text-xl flex-shrink-0">25€</span>
          </div>
          <p className="text-white/70 text-sm mb-4">
            Un site web seul ne suffit pas toujours à dominer Google. Des articles de blog optimisés SEO
            publiés régulièrement renforcent votre autorité, attirent du trafic qualifié et convertissent
            vos lecteurs en clients — sans publicité payante.
          </p>
          <Link href="/services/redaction-blog-seo" className="inline-flex items-center gap-2 text-electric text-sm font-medium hover:text-electric/80 transition-colors">
            Découvrir nos packs rédaction blog <ArrowRight size={14} />
          </Link>
        </section>

        {/* Processus en 4 étapes */}
        <section>
          <h2 className="text-2xl font-bold text-foreground dark:text-white mb-6">
            Comment se passe la création de votre site ?
          </h2>
          <div className="space-y-4">
            {[
              { n: '01', titre: 'Devis en 72h', desc: 'Vous décrivez votre activité, vos besoins et votre secteur. Nous vous envoyons un devis précis sous 72h, sans engagement.' },
              { n: '02', titre: 'Brief & contenu', desc: 'Après validation, nous recueillons vos textes, photos et préférences de design. Un formulaire simple guide ce processus.' },
              { n: '03', titre: 'Développement & validation', desc: `En ${delai}, votre site est développé. Vous validez sur un lien de prévisualisation avant la mise en ligne.` },
              { n: '04', titre: 'Mise en ligne', desc: 'Nous gérons le nom de domaine, l\'hébergement et la mise en production. Votre site est en ligne, référencé, optimisé.' },
            ].map(step => (
              <div key={step.n} className="flex items-start gap-4 p-4 rounded-xl border border-white/10">
                <span className="text-2xl font-bold text-electric/40 font-mono flex-shrink-0 w-10">{step.n}</span>
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
          <h2 className="text-2xl font-bold text-foreground dark:text-white mb-6">
            Questions fréquentes — site internet pour {m.metier}
          </h2>
          <div className="space-y-3">
            {faqAll.map(faq => (
              <details key={faq.q} className="group rounded-xl border border-navy/20 dark:border-white/10 overflow-hidden">
                <summary className="flex items-center justify-between p-4 cursor-pointer font-medium text-foreground dark:text-white list-none">
                  {faq.q}
                  <ChevronRight size={16} className="text-white/40 group-open:rotate-90 transition-transform flex-shrink-0 ml-3" />
                </summary>
                <div className="px-4 pb-4 text-foreground/70 dark:text-white/70 text-sm leading-relaxed">{faq.a}</div>
              </details>
            ))}
          </div>
        </section>

        {/* Autres métiers de la même catégorie */}
        {metiersMemeCategorie.length > 0 && (
          <section>
            <h2 className="text-xl font-bold text-foreground dark:text-white mb-4">
              Autres métiers dans {categorieLbl}
            </h2>
            <div className="flex flex-wrap gap-3">
              {metiersMemeCategorie.map(mi => (
                <Link key={mi.slug} href={`/creation-site-internet/${mi.slug}`} className="px-4 py-2 rounded-xl border border-white/10 hover:border-blue-400/40 text-sm text-foreground/70 dark:text-white/70 hover:text-electric transition-colors">
                  Site internet {mi.metier}
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Mots-clés associés */}
        <section>
          <h3 className="text-lg font-semibold text-foreground dark:text-white mb-3">Recherches associées</h3>
          <div className="flex flex-wrap gap-2">
            {m.variantes.map(v => (
              <span key={v} className="px-3 py-1.5 rounded-full text-xs border border-white/10 text-foreground/60 dark:text-white/60">
                {v}
              </span>
            ))}
          </div>
        </section>

        {/* CTA */}
        <div className="rounded-2xl p-8 bg-gradient-to-br from-navy to-electric text-center">
          <h3 className="text-white font-bold text-2xl mb-2">Prêt à créer votre site de {m.metier} ?</h3>
          <p className="text-white/70 mb-2">Premier RDV gratuit, devis sous 72h, livraison garantie en {delai}.</p>
          <p className="text-white/50 text-sm mb-6">Pas d'abonnement, pas de commission, pas de frais cachés.</p>
          <Link href="/contact" className="inline-block px-8 py-3 bg-gold hover:bg-gold/80 text-ink font-semibold rounded-xl transition-all hover:-translate-y-0.5">
            Demander un devis gratuit →
          </Link>
        </div>
      </div>
    </div>
  )
}
