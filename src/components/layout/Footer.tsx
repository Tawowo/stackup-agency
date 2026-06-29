'use client'
import Image from 'next/image'
import { useLanguage } from '@/contexts/LanguageContext'

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

function TiktokIcon() {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.78 1.52V6.74a4.85 4.85 0 0 1-1.01-.05z"/>
    </svg>
  )
}

export default function Footer() {
  const { t } = useLanguage()

  const links = [
    { href: '#services', label: t.nav.services },
    { href: '#realisations', label: t.nav.portfolio },
    { href: '#apropos', label: t.nav.about },
    { href: '/blog', label: t.nav.blog },
    { href: '#contact', label: t.nav.contact },
  ]

  return (
    <footer className="bg-[#060D1A] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 mb-12">
          <div className="md:col-span-2">
            <div className="mb-5">
              <Image
                src="/logo-icon.png"
                alt="Stackup Agency"
                width={40}
                height={40}
                quality={100}
                className="object-contain brightness-0 invert"
              />
            </div>
            <p className="text-white/50 text-sm mb-6 max-w-xs leading-relaxed">{t.footer.tagline}</p>
            <div className="flex gap-3">
              {[
                { Icon: LinkedinIcon, href: 'https://linkedin.com/in/matheo-reboul', label: 'LinkedIn' },
                { Icon: InstagramIcon, href: 'https://instagram.com/stackup.agency', label: 'Instagram' },
                { Icon: TiktokIcon, href: 'https://tiktok.com/@stackupagency', label: 'TikTok' },
              ].map(({ Icon, href, label }) => (
                <a key={label} href={href} aria-label={label}
                  className="w-10 h-10 rounded-xl bg-white/10 hover:bg-electric flex items-center justify-center transition-colors">
                  <Icon />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-sm mb-5 text-white/80">{t.footer.links}</h3>
            <ul className="space-y-3">
              {links.map(link => (
                <li key={link.href}>
                  <a href={link.href} className="text-white/50 hover:text-white text-sm transition-colors block py-1">{link.label}</a>
                </li>
              ))}
              <li>
                <a href="/parrainage" className="text-white/50 hover:text-white text-sm transition-colors block py-1">Parrainage</a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-sm mb-5 text-white/80">{t.footer.legal}</h3>
            <ul className="space-y-3">
              <li><a href="/mentions-legales" className="text-white/50 hover:text-white text-sm transition-colors">{t.footer.mentions}</a></li>
              <li><a href="/politique-confidentialite" className="text-white/50 hover:text-white text-sm transition-colors">{t.footer.privacy}</a></li>
              <li><a href="/cookies" className="text-white/50 hover:text-white text-sm transition-colors">Politique de cookies</a></li>
              <li><a href="mailto:contact@stackup-agency.fr" className="text-white/50 hover:text-white text-sm transition-colors">contact@stackup-agency.fr</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8">
          <p className="text-white/30 text-xs text-center">{t.footer.copyright}</p>
        </div>
      </div>
    </footer>
  )
}
