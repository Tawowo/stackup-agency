/* eslint-disable react/no-unescaped-entities */
import { SITE } from '@/config/site'
import Link from 'next/link'
import Breadcrumb from '@/components/ui/Breadcrumb'
import { CheckCircle, XCircle, Minus } from 'lucide-react'

export const metadata = {
  title: { absolute: 'Wix vs WordPress vs sur-mesure — Comparatif | Stackup Agency' },
  description: 'Comparatif Wix, WordPress et site sur-mesure : coût total, performances, SEO, liberté, maintenance. Guide honnête pour choisir sans regrets.',
  alternates: { canonical: `${SITE.url}/comparatif/wix-wordpress-sur-mesure` },
  openGraph: {
    url: `${SITE.url}/comparatif/wix-wordpress-sur-mesure`,
    title: 'Wix vs WordPress vs sur-mesure — Lequel choisir ?',
    description: 'Comparatif honnête des 3 solutions pour votre site internet. Coût total, SEO, performances, liberté.',
    type: 'article',
  },
}

type Val = 'oui' | 'non' | 'partiel'
const Check = ({ v }: { v: Val }) =>
  v === 'oui' ? <CheckCircle size={16} className="text-success mx-auto" /> :
  v === 'non' ? <XCircle size={16} className="text-red-500 mx-auto" /> :
  <Minus size={16} className="text-gold mx-auto" />

const ROWS: { label: string; wix: Val; wp: Val; mesure: Val; note?: string }[] = [
  { label: 'Facilité de démarrage', wix: 'oui', wp: 'partiel', mesure: 'partiel', note: 'Wix est le plus simple à prendre en main seul' },
  { label: 'Performances (Core Web Vitals)', wix: 'non', wp: 'partiel', mesure: 'oui', note: 'Les sites Next.js atteignent 90+ en Lighthouse' },
  { label: 'SEO technique complet', wix: 'partiel', wp: 'partiel', mesure: 'oui', note: 'Wix a progressé mais reste limité sur le technique' },
  { label: 'Propriété du code', wix: 'non', wp: 'oui', mesure: 'oui', note: 'Wix : vous êtes locataire de la plateforme' },
  { label: 'Sans abonnement mensuel obligatoire', wix: 'non', wp: 'partiel', mesure: 'oui', note: 'Wix facture 17-35€/mois en plus du tarif initial' },
  { label: 'Design 100 % sur mesure', wix: 'non', wp: 'partiel', mesure: 'oui', note: 'Wix et WP imposent des contraintes de templates' },
  { label: 'Vitesse de création', wix: 'oui', wp: 'oui', mesure: 'partiel', note: 'Le sur-mesure prend 10-21 jours selon le type' },
  { label: 'Sécurité et mises à jour', wix: 'oui', wp: 'non', mesure: 'oui', note: 'WP est souvent ciblé par les pirates (plugins)' },
  { label: 'Migration possible vers autre solution', wix: 'non', wp: 'oui', mesure: 'oui', note: 'Wix bloque l\'export du site complet' },
  { label: 'Coût total sur 3 ans', wix: 'non', wp: 'partiel', mesure: 'oui', note: 'Wix coûte ~900-1800€ sur 3 ans d\'abonnement seul' },
]

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Accueil', item: SITE.url },
    { '@type': 'ListItem', position: 2, name: 'Comparatif', item: `${SITE.url}/comparatif` },
    { '@type': 'ListItem', position: 3, name: 'Wix vs WordPress vs sur-mesure', item: `${SITE.url}/comparatif/wix-wordpress-sur-mesure` },
  ],
}

export default function ComparatifPage() {
  return (
    <div className="min-h-screen bg-background dark:bg-[#0A0F1C]">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <div className="bg-gradient-to-b from-[#060D1A] to-[#0A0F1C] pt-24 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <Breadcrumb items={[{ name: 'Outils', href: '/outils' }, { name: 'Comparatif' }]} />
          <h1 className="text-3xl lg:text-4xl font-bold text-white mb-4">Wix vs WordPress vs sur-mesure</h1>
          <p className="text-white/60 text-lg">Comparaison honnête pour choisir sans regrets.</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-16 space-y-12">

        {/* Tableau */}
        <div className="overflow-x-auto rounded-xl border border-navy/20 dark:border-white/10">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-navy/10 dark:border-white/10 bg-navy/5 dark:bg-white/5">
                <th className="text-left py-3 px-4 text-foreground/60 dark:text-white/50 font-medium">Critère</th>
                <th className="text-center py-3 px-4 text-foreground dark:text-white font-semibold w-24">Wix</th>
                <th className="text-center py-3 px-4 text-foreground dark:text-white font-semibold w-28">WordPress</th>
                <th className="text-center py-3 px-4 text-electric font-semibold w-28">Sur-mesure</th>
              </tr>
            </thead>
            <tbody>
              {ROWS.map((row, i) => (
                <tr key={row.label} className={`border-b border-navy/5 dark:border-white/5 ${i % 2 === 0 ? '' : 'bg-navy/2 dark:bg-white/2'}`}>
                  <td className="py-3 px-4">
                    <div className="font-medium text-foreground dark:text-white text-sm">{row.label}</div>
                    {row.note && <div className="text-xs text-foreground/40 dark:text-white/30 mt-0.5">{row.note}</div>}
                  </td>
                  <td className="py-3 px-4 text-center"><Check v={row.wix} /></td>
                  <td className="py-3 px-4 text-center"><Check v={row.wp} /></td>
                  <td className="py-3 px-4 text-center"><Check v={row.mesure} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex gap-4 text-xs flex-wrap">
          <span className="flex items-center gap-1"><CheckCircle size={12} className="text-success" /> Oui / Bien</span>
          <span className="flex items-center gap-1"><Minus size={12} className="text-gold" /> Partiel / Limité</span>
          <span className="flex items-center gap-1"><XCircle size={12} className="text-red-500" /> Non / Mauvais</span>
        </div>

        <section>
          <h2 className="text-2xl font-bold text-foreground dark:text-white mb-4">Notre avis honnête</h2>
          <div className="space-y-4 text-foreground/70 dark:text-white/70 text-sm leading-relaxed">
            <p><strong className="text-foreground dark:text-white">Wix</strong> est idéal si vous voulez gérer vous-même un site simple sans budget initial. Mais les abonnements s'accumulent (17-35€/mois), vous ne possédez pas votre site, et les performances SEO restent inférieures à un site bien construit.</p>
            <p><strong className="text-foreground dark:text-white">WordPress</strong> offre plus de liberté mais exige une maintenance régulière (mises à jour, plugins, sécurité). Les performances dépendent entièrement du thème et des extensions choisis. Beaucoup de sites WordPress sont lents et vulnérables.</p>
            <p><strong className="text-foreground dark:text-white">Sur-mesure (Next.js)</strong> est la meilleure option sur 2-3 ans pour un professionnel : performances Lighthouse 90+, code propriétaire, pas d'abonnement plateforme, SEO technique complet. Le coût initial est plus élevé mais le coût total sur 3 ans est souvent inférieur à Wix.</p>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-foreground dark:text-white mb-4">Quand choisir quoi ?</h2>
          <div className="grid sm:grid-cols-3 gap-4">
            {[
              { title: 'Wix', when: 'Site personnel, hobby, test rapide. Budget zéro et pas besoin de performances poussées.', color: 'border-navy/20' },
              { title: 'WordPress', when: 'Blog avec beaucoup de contenu, site géré par une équipe non-technique avec accès CMS simple.', color: 'border-navy/20' },
              { title: 'Sur-mesure', when: `Activité professionnelle, commerce, restaurant, artisan. Dès ${SITE.pricing.vitrine}€ chez Stackup Agency.`, color: 'border-electric/30' },
            ].map(c => (
              <div key={c.title} className={`rounded-xl border ${c.color} p-4`}>
                <div className="font-bold text-foreground dark:text-white mb-2">{c.title}</div>
                <div className="text-sm text-foreground/60 dark:text-white/50">{c.when}</div>
              </div>
            ))}
          </div>
        </section>

        <div className="rounded-2xl p-6 bg-gradient-to-br from-navy to-electric text-center">
          <h2 className="text-white font-bold text-lg mb-2">Vous avez choisi le sur-mesure ?</h2>
          <p className="text-white/70 text-sm mb-4">Devis express en 5 min. Réponse sous 72h.</p>
          <Link href="/devis" className="inline-block px-8 py-3 bg-gold hover:bg-gold/90 text-ink font-bold rounded-xl transition-all hover:-translate-y-0.5 text-sm">
            Démarrer mon devis →
          </Link>
        </div>

        <div className="flex flex-wrap gap-4 text-sm border-t border-navy/10 dark:border-white/10 pt-6">
          <Link href="/outils" className="text-electric hover:underline">Nos outils gratuits →</Link>
          <Link href="/ressources/cahier-des-charges" className="text-electric hover:underline">Cahier des charges →</Link>
          <Link href="/tarifs" className="text-electric hover:underline">Voir les tarifs →</Link>
        </div>
      </div>
    </div>
  )
}
