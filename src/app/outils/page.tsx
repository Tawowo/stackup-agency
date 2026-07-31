import { SITE } from '@/config/site'
import Link from 'next/link'
import Breadcrumb from '@/components/ui/Breadcrumb'
import { Search, Palette, FileText, BarChart3 } from 'lucide-react'

export const metadata = {
  title: { absolute: 'Outils gratuits — Audit, studio de style, documents | Stackup' },
  description: 'Outils gratuits pour votre projet web : audit de site (PageSpeed), studio de style, générateur de cahier des charges, comparatif Wix / WordPress / sur-mesure.',
  alternates: { canonical: `${SITE.url}/outils` },
  openGraph: {
    url: `${SITE.url}/outils`,
    title: 'Outils gratuits pour votre site internet',
    description: 'Audit, studio de style, cahier des charges, comparatif. Gratuit et sans inscription.',
    type: 'website',
  },
}

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Accueil', item: SITE.url },
    { '@type': 'ListItem', position: 2, name: 'Outils', item: `${SITE.url}/outils` },
  ],
}

const OUTILS = [
  {
    icon: Search,
    title: 'Audit de site gratuit',
    desc: 'Analysez les performances, le SEO et l\'accessibilité de votre site en quelques secondes. Résultats réels via Google PageSpeed Insights.',
    href: '/outils/audit-site',
    badge: 'Gratuit',
    color: 'text-electric',
    bg: 'bg-electric/10',
  },
  {
    icon: Palette,
    title: 'Studio de style',
    desc: 'Explorez 5 univers visuels et trouvez l\'identité graphique qui correspond à votre activité. Aperçu en direct.',
    href: '/outils/studio-de-style',
    badge: 'Gratuit',
    color: 'text-gold',
    bg: 'bg-gold/10',
  },
  {
    icon: FileText,
    title: 'Cahier des charges',
    desc: 'Téléchargez notre modèle de cahier des charges pour bien cadrer votre projet avant de nous contacter.',
    href: '/ressources/cahier-des-charges',
    badge: 'PDF',
    color: 'text-success',
    bg: 'bg-success/10',
  },
  {
    icon: BarChart3,
    title: 'Comparatif solutions',
    desc: 'Wix, WordPress ou site sur-mesure ? Comparaison honnête des avantages et limites pour décider en connaissance de cause.',
    href: '/comparatif/wix-wordpress-sur-mesure',
    badge: 'Guide',
    color: 'text-muted',
    bg: 'bg-muted/10',
  },
]

export default function OutilsPage() {
  return (
    <div className="min-h-screen bg-background dark:bg-[#0A0F1C]">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <div className="bg-gradient-to-b from-[#060D1A] to-[#0A0F1C] pt-24 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <Breadcrumb items={[{ name: 'Outils' }]} />
          <h1 className="text-3xl lg:text-5xl font-bold text-white mb-4">Outils gratuits</h1>
          <p className="text-white/60 text-lg max-w-xl">
            Testez, comparez, préparez votre projet. Tous nos outils sont gratuits et sans inscription.
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-16">
        <div className="grid sm:grid-cols-2 gap-6 mb-16">
          {OUTILS.map(o => {
            const Icon = o.icon
            return (
              <Link
                key={o.href}
                href={o.href}
                className="group rounded-2xl border border-navy/20 dark:border-white/10 p-6 hover:border-electric/40 transition-all hover:shadow-lg hover:shadow-electric/5 bg-white dark:bg-[#0D1626]"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className={`w-11 h-11 rounded-xl ${o.bg} flex items-center justify-center`}>
                    <Icon size={20} className={o.color} />
                  </div>
                  <span className="text-xs font-semibold px-2.5 py-1 bg-navy/5 dark:bg-white/5 text-foreground/50 dark:text-white/40 rounded-full">{o.badge}</span>
                </div>
                <h2 className="font-bold text-foreground dark:text-white mb-2 group-hover:text-electric transition-colors">{o.title}</h2>
                <p className="text-sm text-foreground/60 dark:text-white/50 leading-relaxed">{o.desc}</p>
              </Link>
            )
          })}
        </div>

        {/* CTA */}
        <div className="rounded-2xl p-6 bg-gradient-to-br from-navy to-electric text-center">
          <h2 className="text-white font-bold text-xl mb-2">Prêt à lancer votre projet ?</h2>
          <p className="text-white/70 text-sm mb-4">Devis express en 5 minutes. Réponse sous 72h.</p>
          <Link href="/devis" className="inline-block px-8 py-3 bg-gold hover:bg-gold/90 text-ink font-bold rounded-xl transition-all hover:-translate-y-0.5">
            Démarrer mon devis →
          </Link>
        </div>

        <div className="mt-8 flex flex-wrap gap-4 text-sm pt-4 border-t border-navy/10 dark:border-white/10">
          <Link href="/services" className="text-electric hover:underline">Nos services →</Link>
          <Link href="/tarifs" className="text-electric hover:underline">Tarifs →</Link>
          <Link href="/faq" className="text-electric hover:underline">FAQ →</Link>
          <Link href="/blog" className="text-electric hover:underline">Blog →</Link>
        </div>
      </div>
    </div>
  )
}
