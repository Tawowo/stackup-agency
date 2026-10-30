/** Les cinq entrées de la navigation (nav, menu mobile, footer, palette). */
export const ENTREES = [
  { href: '/realisations', nom: 'Réalisations' },
  { href: '/services', nom: 'Services' },
  { href: '/solutions', nom: 'Outils de gestion' },
  { href: '/tarifs', nom: 'Tarifs' },
  { href: '/a-propos', nom: 'À propos' },
] as const

/** Le menu « Ressources » (nav) : tout ce qui n'est pas une page principale, une porte chacun. */
export const RESSOURCES = [
  { href: '/clubs-de-tennis', nom: 'Clubs de tennis', ligne: 'Le site et le logiciel du club, connectés en direct' },
  { href: '/ressources/cahier-des-charges', nom: 'Cahier des charges', ligne: 'Décrivez votre projet en détail, étape par étape' },
  { href: '/blog', nom: 'Le journal', ligne: 'Guides, réponses précises et comparatifs' },
  { href: '/outils', nom: 'Outils gratuits', ligne: 'Audit, mentions légales, devis, checklist facture électronique' },
  { href: '/lexique', nom: 'Lexique', ligne: 'Les mots du web, du SEO et de la gestion, expliqués simplement' },
  { href: '/faq', nom: 'Questions fréquentes', ligne: 'Prix, propriété du code, hébergement, suivi' },
  { href: '/zones-intervention', nom: 'Zones d’intervention', ligne: 'Touraine, 11 communautés de communes, visio partout' },
  { href: '/parrainage', nom: 'Parrainage', ligne: 'Recommandez-nous, vous y gagnez aussi' },
] as const
