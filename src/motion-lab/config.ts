/**
 * ─────────────────────────────────────────────────────────────
 *  STACKUP MOTION LAB — CONFIGURATION CENTRALE
 * ─────────────────────────────────────────────────────────────
 *  Tout le "feeling" du site vit ici. Les durées et décalages
 *  font 80% de la sensation : ajustez-les ici, pas dans les scènes.
 *  Chaque scène lit ce fichier — aucune valeur magique ailleurs.
 * ─────────────────────────────────────────────────────────────
 */

/** Charte graphique Stackup Agency. */
export const COLORS = {
  navy: '#1E3A5F',
  navyDeep: '#0B1A2E',
  electric: '#2D7DD2',
  gold: '#F59E0B',
  light: '#F8FAFC',
  ink: '#0B1A2E',
} as const;

/** Les mêmes couleurs en vecteurs normalisés pour les shaders WebGL. */
export const COLORS_VEC = {
  navy: [0.118, 0.227, 0.373] as [number, number, number],
  navyDeep: [0.043, 0.102, 0.18] as [number, number, number],
  electric: [0.176, 0.49, 0.824] as [number, number, number],
  gold: [0.961, 0.62, 0.043] as [number, number, number],
  light: [0.973, 0.98, 0.988] as [number, number, number],
};

/**
 * Bibliothèque d'easings custom — réutilisée PARTOUT.
 * Jamais de linear, jamais d'ease par défaut. La micro-physique
 * du site (spring / élastique) rend chaque retour organique.
 */
export const EASE = {
  /** Sortie douce mais franche — l'easing "par défaut" du site. */
  smooth: 'power3.out',
  /** Entrée/sortie équilibrée pour les longues interpolations de scroll. */
  glide: 'power2.inOut',
  /** Rebond élastique contrôlé — retours d'éléments interactifs. */
  spring: 'elastic.out(1, 0.55)',
  /** Spring plus vif pour le curseur et le magnétisme. */
  snap: 'back.out(2.2)',
  /** Expo pour les révélations théâtrales (masques, lettres). */
  reveal: 'expo.out',
  /** Anticipation légère avant l'envol (désintégration). */
  anticipate: 'back.in(1.4)',
} as const;

/**
 * Coefficients de lerp (interpolation image par image).
 * Plus la valeur est basse, plus le suivi est "lourd" / retardé.
 */
export const LERP = {
  cursorDot: 0.9,
  cursorRing: 0.16,
  velocity: 0.1,
  spotlight: 0.14,
  magnet: 0.22,
  skew: 0.1,
} as const;

/** Réglages du smooth scroll Lenis. */
export const SMOOTH = {
  lerp: 0.09,
  wheelMultiplier: 1,
  touchMultiplier: 1.6,
  duration: 1.15,
} as const;

/** Scène 0 — Preloader cinématique. */
export const PRELOADER = {
  /** Durée mini du compteur même si les assets sont déjà prêts (s). */
  minCount: 1.4,
  /** Durée de la déchirure en colonnes (s). */
  tearDuration: 0.9,
  /** Nombre de colonnes verticales de la déchirure. */
  columns: 12,
  /** Décalage entre colonnes (s). */
  tearStagger: 0.045,
} as const;

/** Scène 1 — Héro WebGL. */
export const HERO = {
  /** Décalage d'arrivée entre chaque lettre de STACKUP (s). */
  letterStagger: 0.09,
  /** Durée d'entrée d'une lettre (s). */
  letterDuration: 1.1,
  /** Amplitude de la respiration des lettres (scale). */
  breathAmount: 0.03,
  /** Durée d'un cycle de respiration (s). */
  breathDuration: 3.4,
  /** Force de la distorsion du fluide à la souris. */
  fluidMouseForce: 0.85,
} as const;

/** Scène 2 — Manifeste épinglé. */
export const MANIFESTO = {
  lines: ['On ne fait pas des sites.', 'On fabrique des expériences.', 'Scrollez.'],
  /** Longueur du pin en multiples de hauteur d'écran. */
  pinScreens: 3,
  /** Durée d'assemblage depuis le flou (s). */
  assembleDuration: 0.9,
  /** Force d'envol des caractères désintégrés. */
  scatterForce: 260,
} as const;

/** Scène 3 — Galerie horizontale WebGL. */
export const GALLERY = {
  projects: [
    { title: 'NEBULA', tag: 'Direction artistique', hue: 0.62 },
    { title: 'FLUX', tag: 'E-commerce immersif', hue: 0.55 },
    { title: 'AURORE', tag: 'Identité de marque', hue: 0.72 },
    { title: 'ORBIT', tag: 'Produit SaaS', hue: 0.08 },
    { title: 'PRISME', tag: 'Expérience événementielle', hue: 0.5 },
  ],
  /** Intensité de la courbure des cartes selon la vélocité. */
  bendStrength: 2.6,
  /** Assombrissement des cartes non survolées (0-1). */
  dimAmount: 0.55,
  /** Zoom interne de la texture au survol. */
  hoverZoom: 1.12,
} as const;

/** Scène 4 — Le chiffre 400. */
export const NUMBER = {
  value: 400,
  /** Durée du tracé du contour SVG au scroll (fraction du pin). */
  strokeFraction: 0.55,
  /** Nombre EXACT de particules (une par appel du fondateur). */
  particles: 400,
  /** Durée de convergence des particules (s). */
  convergeDuration: 1.6,
  caption: 'appels pour lancer cette agence.',
} as const;

/** Scène 5 — Tunnel de texte (vortex). */
export const TUNNEL = {
  phrase: 'STACKUP — ON FABRIQUE DES EXPÉRIENCES —',
  /** Vitesses de base des 3 lignes (px/frame à vélocité nulle). */
  baseSpeeds: [0.6, -1.1, 0.85],
  /** Multiplicateur de la vélocité de scroll sur la vitesse. */
  velocityBoost: 14,
  /** Inclinaison max du tunnel (deg). */
  maxTilt: 34,
} as const;

/** Scène 6 — Grille magnétique. */
export const GRID = {
  services: [
    { title: 'Direction créative', desc: 'Concepts qui marquent, systèmes qui durent.' },
    { title: 'WebGL & Shaders', desc: 'Le rendu temps réel au service du récit.' },
    { title: 'Motion Design', desc: 'Chaque transition raconte quelque chose.' },
    { title: 'Développement', desc: 'Front artisanal, 60fps non négociable.' },
    { title: 'Stratégie de marque', desc: 'De la promesse au pixel.' },
    { title: 'Expériences 3D', desc: 'Des mondes navigables au scroll.' },
  ],
  /** Force d'attraction magnétique de la carte vers le curseur (px). */
  magnetStrength: 26,
  /** Rayon du spotlight (px). */
  spotlightRadius: 340,
} as const;

/** Scène 7 — Le final. */
export const FINAL = {
  headline: 'Prêt à construire ?',
  letterStagger: 0.055,
  email: 'contact@stackup-agency.fr',
  /** Nombre de particules dans l'anneau orbital du CTA. */
  orbitParticles: 60,
} as const;

/** Transitions de couleur de fond orchestrées sur tout le parcours. */
export const BG_JOURNEY: { at: number; color: string }[] = [
  { at: 0.0, color: COLORS.light }, // héro
  { at: 0.18, color: COLORS.light }, // manifeste (début)
  { at: 0.3, color: COLORS.navyDeep }, // manifeste bascule vers navy
  { at: 0.45, color: COLORS.navy }, // galerie
  { at: 0.58, color: COLORS.navyDeep }, // le chiffre
  { at: 0.72, color: COLORS.navy }, // tunnel
  { at: 0.85, color: COLORS.light }, // grille (retour lumière)
  { at: 1.0, color: COLORS.navyDeep }, // final (navy profond + or)
];

/** Point de bascule responsive (px). Sous ce seuil : mode tactile. */
export const MOBILE_BREAKPOINT = 820;

/** Résolution réduite du shader sur mobile (multiplicateur de DPR). */
export const MOBILE_SHADER_SCALE = 0.6;
