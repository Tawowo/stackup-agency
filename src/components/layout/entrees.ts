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
  { href: '/ressources/cahier-des-charges', nom: 'Cahier des charges', ligne: 'Décrivez votre projet en détail, étape par étape' },
  { href: '/blog', nom: 'Le journal', ligne: '300 articles pour créer son site, être trouvé, vendre' },
  { href: '/outils', nom: 'Outils gratuits', ligne: 'Audit de site, estimateur de prix, cahier des charges' },
  { href: '/faq', nom: 'Questions fréquentes', ligne: 'Prix, propriété du code, hébergement, suivi' },
  { href: '/zones-intervention', nom: 'Zones d’intervention', ligne: 'Tours, la région, et toute la France à distance' },
  { href: '/parrainage', nom: 'Parrainage', ligne: 'Recommandez-nous, vous y gagnez aussi' },
] as const
