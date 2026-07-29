'use client'
import Link from 'next/link'
import { useCallback } from 'react'
import { SITE } from '@/config/site'

const SERVICES = [
  { titre: 'Site vitrine', prix: SITE.pricing.vitrine, delai: SITE.delais.vitrine, desc: 'Présence professionnelle en ligne, SEO local, formulaire de contact.', href: '/services/site-vitrine' },
  { titre: 'Site multi-pages', prix: SITE.pricing.multipages, delai: SITE.delais.multipages, desc: 'Site complet avec blog, galerie, pages service et formulaires.', href: '/services/site-multi-pages' },
  { titre: 'Boutique en ligne', prix: SITE.pricing.ecommerce, delai: SITE.delais.ecommerce, desc: 'E-commerce avec paiement sécurisé et gestion des stocks.', href: '/services/site-ecommerce' },
  { titre: 'Système de gestion', prix: SITE.pricing.gestion, delai: '4 semaines', desc: 'Logiciel sur mesure : caisse, RDV, CRM, commandes.', href: '/services/systeme-gestion' },
  { titre: 'Site association', prix: SITE.pricing.association, delai: SITE.delais.association, desc: 'Site association loi 1901 avec adhésion et événements.', href: '/services/site-association' },
  { titre: 'Maintenance', prix: SITE.pricing.maintenanceStarter, delai: '/mois', desc: 'Hébergement, sauvegardes, mises à jour et support continu.', href: '/tarifs' },
  { titre: 'Blog SEO', prix: 25, delai: '/article', desc: 'Articles optimisés SEO pour booster votre référencement naturel.', href: '/services/redaction-blog-seo' },
]

function SpotlightCard({ s }: { s: typeof SERVICES[0] }) {
  const onMove = useCallback((e: React.MouseEvent<HTMLAnchorElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width) * 100
    const y = ((e.clientY - rect.top) / rect.height) * 100
    e.currentTarget.style.setProperty('--x', `${x}%`)
    e.currentTarget.style.setProperty('--y', `${y}%`)
  }, [])

  return (
    <Link href={s.href} onMouseMove={onMove}
      className="spotlight-card group p-5 rounded-2xl border border-navy/20 dark:border-white/10 hover:border-blue-500/40 hover:-translate-y-1 hover:shadow-lg hover:shadow-electric/10 transition-all duration-300 reveal-item">
      <div className="relative z-10">
        <div className="flex items-start justify-between mb-3">
          <h3 className="font-semibold text-foreground dark:text-white group-hover:text-blue-400 transition-colors">{s.titre}</h3>
          <span className="text-amber-500 font-bold text-sm ml-2 flex-shrink-0">{s.prix}€{(s.delai === '/mois' || s.delai === '/article') ? s.delai : ''}</span>
        </div>
        <p className="text-foreground/60 dark:text-white/60 text-sm mb-3">{s.desc}</p>
        <span className="text-xs text-blue-400">{s.delai !== '/mois' && s.delai !== '/article' ? `Livraison : ${s.delai}` : s.delai === '/article' ? 'À l\'unité ou en pack' : 'Mensuel'}</span>
      </div>
    </Link>
  )
}

export default function ServiceCards() {
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-8">
      {SERVICES.map(s => <SpotlightCard key={s.titre} s={s} />)}
    </div>
  )
}
