import Link from 'next/link'
import Image from 'next/image'
import { SITE } from '@/config/site'

function LinkedinIcon() {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
      <rect x="2" y="9" width="4" height="12"/>
      <circle cx="4" cy="4" r="2"/>
    </svg>
  )
}

function InstagramIcon() {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
    </svg>
  )
}

function FacebookIcon() {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
    </svg>
  )
}

const VILLES_PRINCIPALES = [
  { href: '/agence-web/tours', label: 'Tours' },
  { href: '/agence-web/orleans', label: 'Orléans' },
  { href: '/agence-web/blois', label: 'Blois' },
  { href: '/agence-web/chartres', label: 'Chartres' },
  { href: '/agence-web/le-mans', label: 'Le Mans' },
  { href: '/agence-web/angers', label: 'Angers' },
  { href: '/agence-web/nantes', label: 'Nantes' },
  { href: '/agence-web/rouen', label: 'Rouen' },
]

export default function Footer() {
  return (
    <footer className="bg-[#060D1A] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-10 mb-12">

          {/* Col 1 — Marque */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <Image src="/logo-icon.png" alt="Stackup Agency" width={36} height={36} quality={100} className="object-contain brightness-0 invert" />
              <span className="font-bold text-white">Stackup Agency</span>
            </Link>
            <p className="text-white/50 text-sm mb-5 leading-relaxed">
              Agence web à Tours. Sites internet professionnels pour TPE et artisans, livrés en 10 jours.
            </p>
            <div className="flex gap-3">
              {[
                { Icon: LinkedinIcon, href: SITE.social.linkedin, label: 'LinkedIn' },
                { Icon: InstagramIcon, href: SITE.social.instagram, label: 'Instagram' },
                { Icon: FacebookIcon, href: SITE.social.facebook, label: 'Facebook' },
              ].map(({ Icon, href, label }) => (
                <a key={label} href={href} aria-label={label} target="_blank" rel="noopener noreferrer"
                  className="w-9 h-9 rounded-xl bg-white/10 hover:bg-blue-600 flex items-center justify-center transition-colors">
                  <Icon />
                </a>
              ))}
            </div>
          </div>

          {/* Col 2 — Services */}
          <div>
            <h3 className="font-semibold text-sm mb-4 text-white/80">Services</h3>
            <ul className="space-y-2.5">
              {[
                { href: '/services/site-vitrine', label: 'Site vitrine' },
                { href: '/services/site-multi-pages', label: 'Site multi-pages' },
                { href: '/services/site-ecommerce', label: 'Boutique en ligne' },
                { href: '/services/systeme-gestion', label: 'Système de gestion' },
                { href: '/services/site-association', label: 'Site association' },
                { href: '/services', label: 'Tous les services' },
                { href: '/tarifs', label: 'Tarifs' },
              ].map(l => (
                <li key={l.href}>
                  <Link href={l.href} className="text-white/50 hover:text-white text-sm transition-colors block py-0.5">{l.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3 — Solutions & Métiers */}
          <div>
            <h3 className="font-semibold text-sm mb-4 text-white/80">Solutions & Métiers</h3>
            <ul className="space-y-2.5">
              {[
                { href: '/solutions', label: 'Toutes les solutions' },
                { href: '/solutions/logiciel-gestion-stocks', label: 'Gestion des stocks' },
                { href: '/solutions/systeme-reservation', label: 'Réservation en ligne' },
                { href: '/solutions/caisse-enregistreuse', label: 'Caisse enregistreuse' },
                { href: '/creation-site-internet', label: 'Par métier' },
                { href: '/creation-site-internet/restaurant', label: 'Site restaurant' },
                { href: '/creation-site-internet/artisan', label: 'Site artisan' },
              ].map(l => (
                <li key={l.href}>
                  <Link href={l.href} className="text-white/50 hover:text-white text-sm transition-colors block py-0.5">{l.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4 — Villes */}
          <div>
            <h3 className="font-semibold text-sm mb-4 text-white/80">Agence web par ville</h3>
            <ul className="space-y-2.5">
              {VILLES_PRINCIPALES.map(l => (
                <li key={l.href}>
                  <Link href={l.href} className="text-white/50 hover:text-white text-sm transition-colors block py-0.5">
                    Agence web {l.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/agence-web" className="text-blue-400 hover:text-blue-300 text-sm transition-colors block py-0.5 font-medium">Toutes les villes →</Link>
              </li>
            </ul>
          </div>

          {/* Col 5 — Ressources */}
          <div>
            <h3 className="font-semibold text-sm mb-4 text-white/80">Ressources</h3>
            <ul className="space-y-2.5">
              {[
                { href: '/blog', label: 'Blog' },
                { href: '/realisations', label: 'Réalisations' },
                { href: '/a-propos', label: 'À propos' },
                { href: '/faq', label: 'FAQ' },
                { href: '/contact', label: 'Contact' },
                { href: '/parrainage', label: 'Parrainage' },
                { href: '/plan-du-site', label: 'Plan du site' },
              ].map(l => (
                <li key={l.href}>
                  <Link href={l.href} className="text-white/50 hover:text-white text-sm transition-colors block py-0.5">{l.label}</Link>
                </li>
              ))}
              <li className="pt-1 border-t border-white/10 mt-2">
                <Link href="/mentions-legales" className="text-white/40 hover:text-white/60 text-xs transition-colors block py-0.5">Mentions légales</Link>
              </li>
              <li>
                <Link href="/politique-confidentialite" className="text-white/40 hover:text-white/60 text-xs transition-colors block py-0.5">Confidentialité</Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-white/30 text-xs">
            © {new Date().getFullYear()} Stackup Agency — Tours (37), France
          </p>
          <p className="text-white/20 text-xs">
            Agence web à Tours — devis gratuit sous 72h
          </p>
        </div>
      </div>
    </footer>
  )
}
