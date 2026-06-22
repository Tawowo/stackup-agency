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

function GithubIcon() {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
      <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/>
    </svg>
  )
}

export default function Footer() {
  const { t } = useLanguage()

  const links = [
    { href: '#services', label: t.nav.services },
    { href: '#tarifs', label: t.nav.pricing },
    { href: '#realisations', label: t.nav.portfolio },
    { href: '#apropos', label: t.nav.about },
    { href: '#blog', label: t.nav.blog },
    { href: '#contact', label: t.nav.contact },
  ]

  return (
    <footer className="bg-[#060D1A] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 mb-12">
          <div className="md:col-span-2">
            <div className="mb-5 flex items-center gap-3">
              <Image
                src="/logo-icon.png"
                alt="Stackup"
                width={40}
                height={40}
                quality={100}
                className="object-contain brightness-0 invert"
              />
              <div className="flex flex-col leading-tight">
                <span className="font-bold text-lg text-white">Stackup</span>
                <span className="font-light text-xs tracking-[0.2em] uppercase text-white/70">Agency</span>
              </div>
            </div>
            <p className="text-white/50 text-sm mb-6 max-w-xs leading-relaxed">{t.footer.tagline}</p>
            <div className="flex gap-3">
              {[
                { Icon: LinkedinIcon, href: '#', label: 'LinkedIn' },
                { Icon: InstagramIcon, href: '#', label: 'Instagram' },
                { Icon: GithubIcon, href: '#', label: 'GitHub' },
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
                  <a href={link.href} className="text-white/50 hover:text-white text-sm transition-colors">{link.label}</a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-sm mb-5 text-white/80">{t.footer.legal}</h3>
            <ul className="space-y-3">
              <li><a href="/mentions-legales" className="text-white/50 hover:text-white text-sm transition-colors">{t.footer.mentions}</a></li>
              <li><a href="/politique-confidentialite" className="text-white/50 hover:text-white text-sm transition-colors">{t.footer.privacy}</a></li>
              <li><a href="mailto:contact@stackup.agency" className="text-white/50 hover:text-white text-sm transition-colors">contact@stackup.agency</a></li>
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
