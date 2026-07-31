/* eslint-disable react/no-unescaped-entities */
import Link from 'next/link'
import { SITE } from '@/config/site'
import { VILLES } from '@/data/villes'
import { METIERS } from '@/data/metiers'
import { SOLUTIONS } from '@/data/solutions'

export const metadata = {
  title: 'Plan du site',
  description: 'Toutes les pages de Stackup Agency : services, tarifs, réalisations, blog, villes et métiers desservis.',
  alternates: { canonical: `${SITE.url}/plan-du-site` },
  robots: { index: false },
}

const SERVICES = [
  { href: '/services', label: 'Tous nos services' },
  { href: '/services/site-vitrine', label: 'Site vitrine' },
  { href: '/services/site-multi-pages', label: 'Site multi-pages' },
  { href: '/services/site-ecommerce', label: 'Site e-commerce' },
  { href: '/services/systeme-gestion', label: 'Système de gestion' },
  { href: '/services/marketing-digital', label: 'Marketing digital' },
  { href: '/services/maintenance-support', label: 'Maintenance & support' },
  { href: '/services/site-association', label: 'Site association' },
]

const SERVICES_LOCAUX = [
  { href: '/services-locaux/creation-site-restaurant', label: 'Création site restaurant' },
  { href: '/services-locaux/creation-site-artisan', label: 'Création site artisan' },
  { href: '/services-locaux/creation-site-commerce', label: 'Création site commerce' },
  { href: '/services-locaux/creation-boutique-en-ligne', label: 'Boutique en ligne' },
  { href: '/services-locaux/developpement-application-metier', label: 'Application métier' },
  { href: '/services-locaux/referencement-local-seo', label: 'Référencement local SEO' },
]

const TARIFS = [
  { href: '/tarifs', label: 'Tous nos tarifs' },
  { href: '/tarifs/starter', label: 'Offre Starter' },
  { href: '/tarifs/pro', label: 'Offre Pro' },
  { href: '/tarifs/premium', label: 'Offre Premium' },
]

const REALISATIONS = [
  { href: '/realisations', label: 'Toutes les réalisations' },
  { href: '/realisations/chateau-lumieres', label: 'Château Lumières (démo)' },
  { href: '/realisations/maison-elise', label: 'Maison Élise (démo)' },
  { href: '/realisations/au-pain-dore', label: 'Au Pain Doré (démo)' },
  { href: '/realisations/prestige-immo', label: 'Prestige Immo (démo)' },
  { href: '/realisations/lolivier-dashboard', label: "L'Olivier Dashboard (démo)" },
  { href: '/realisations/chateau-fleury', label: 'Château Fleury (démo)' },
]

const BLOG_CATS = [
  { href: '/blog/categorie/seo', label: 'SEO & Référencement' },
  { href: '/blog/categorie/creation-sites', label: 'Création de sites' },
  { href: '/blog/categorie/applications-metier', label: 'Applications métier' },
  { href: '/blog/categorie/strategie', label: 'Stratégie digitale' },
  { href: '/blog/categorie/restaurants', label: 'Restauration' },
  { href: '/blog/categorie/artisans', label: 'Artisans & commerce' },
]

const LEGALES = [
  { href: '/mentions-legales', label: 'Mentions légales' },
  { href: '/politique-confidentialite', label: 'Politique de confidentialité' },
  { href: '/cookies', label: 'Gestion des cookies' },
  { href: '/cgv', label: 'Conditions générales de vente' },
]

function Section({ title, links }: { title: string; links: { href: string; label: string }[] }) {
  return (
    <div>
      <h2 className="text-lg font-bold text-foreground dark:text-white mb-3 pb-2 border-b border-white/10">{title}</h2>
      <ul className="space-y-1.5">
        {links.map(l => (
          <li key={l.href}>
            <Link href={l.href} className="text-sm text-foreground/70 dark:text-white/70 hover:text-electric transition-colors">
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default function PlanDuSitePage() {
  const villesLinks = VILLES.map(v => ({ href: `/agence-web/${v.slug}`, label: v.ville }))
  const metiersLinks = METIERS.map(m => ({ href: `/creation-site-internet/${m.slug}`, label: m.metier.charAt(0).toUpperCase() + m.metier.slice(1) }))
  const solutionsLinks = SOLUTIONS.map(s => ({ href: `/solutions/${s.slug}`, label: s.nom }))

  return (
    <div className="min-h-screen bg-background dark:bg-[#0A0F1C]">
      <div className="bg-gradient-to-b from-[#060D1A] to-[#0A0F1C] pt-24 pb-12">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <h1 className="text-3xl lg:text-4xl font-bold text-white mb-4">Plan du site</h1>
          <p className="text-white/60">Vue d'ensemble de toutes les pages de Stackup Agency.</p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-16 grid gap-12 sm:grid-cols-2 lg:grid-cols-3">
        <Section title="Pages principales" links={[
          { href: '/', label: 'Accueil' },
          { href: '/agence-web', label: 'Agence web' },
          { href: '/creation-site-internet', label: 'Création site internet' },
          { href: '/solutions', label: 'Solutions métier' },
          { href: '/a-propos', label: 'À propos' },
          { href: '/contact', label: 'Contact' },
          { href: '/faq', label: 'FAQ' },
          { href: '/parrainage', label: 'Parrainage' },
          { href: '/ressources/documents', label: 'Ressources & documents' },
        ]} />

        <Section title="Services" links={SERVICES} />
        <Section title="Services locaux" links={SERVICES_LOCAUX} />
        <Section title="Tarifs" links={TARIFS} />
        <Section title="Réalisations" links={REALISATIONS} />

        <Section title="Blog" links={[
          { href: '/blog', label: 'Tous les articles' },
          ...BLOG_CATS,
        ]} />

        <Section title="Villes desservies" links={villesLinks} />

        <div className="sm:col-span-2 lg:col-span-2">
          <h2 className="text-lg font-bold text-foreground dark:text-white mb-3 pb-2 border-b border-white/10">Métiers ({METIERS.length})</h2>
          <ul className="grid grid-cols-2 gap-x-6 gap-y-1.5">
            {metiersLinks.map(l => (
              <li key={l.href}>
                <Link href={l.href} className="text-sm text-foreground/70 dark:text-white/70 hover:text-electric transition-colors">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <Section title={`Solutions (${SOLUTIONS.length})`} links={solutionsLinks} />

        <Section title="Pages légales" links={LEGALES} />
      </div>
    </div>
  )
}
