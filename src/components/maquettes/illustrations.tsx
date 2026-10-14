/**
 * Illustrations des maquettes — dessinées en SVG, sans fichier externe : les
 * « photos » d'un atelier de menuiserie fictif (Menuiserie Aubert) et les six
 * objets de sa boutique, plus les pictogrammes de l'interface.
 */

/** La photo d'en-tête : un escalier en chêne dans la lumière d'une verrière. */
export function PhotoEscalier({ id = 'esc' }: { id?: string }) {
  return (
    <svg viewBox="0 0 200 240" preserveAspectRatio="xMidYMid slice" role="img" aria-label="Escalier en chêne dans la lumière d’une verrière">
      <defs>
        <linearGradient id={`${id}-fond`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#f1e3c8" />
          <stop offset="1" stopColor="#c99a68" />
        </linearGradient>
        <linearGradient id={`${id}-jour`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#fff7e0" stopOpacity="0.95" />
          <stop offset="1" stopColor="#fff7e0" stopOpacity="0" />
        </linearGradient>
        <pattern id={`${id}-fil`} width="6" height="6" patternUnits="userSpaceOnUse" patternTransform="rotate(8)">
          <path d="M0 3h6" stroke="#6b3f17" strokeOpacity="0.12" strokeWidth="0.6" />
        </pattern>
      </defs>
      <rect width="200" height="240" fill={`url(#${id}-fond)`} />
      <polygon points="120,0 200,0 200,120 70,240 40,240" fill={`url(#${id}-jour)`} opacity="0.55" />
      <g>
        <rect x="118" y="26" width="64" height="72" rx="3" fill="#fff8e6" opacity="0.9" />
        <path d="M150 26v72M118 62h64" stroke="#b78c5d" strokeWidth="2.4" />
      </g>
      {[0, 1, 2, 3, 4, 5].map((i) => (
        <g key={i}>
          <polygon points={`${14 + i * 24},${224 - i * 26} ${58 + i * 24},${224 - i * 26} ${58 + i * 24},${236 - i * 26} ${14 + i * 24},${236 - i * 26}`} fill="#7c4a1d" />
          <polygon points={`${14 + i * 24},${224 - i * 26} ${58 + i * 24},${224 - i * 26} ${70 + i * 24},${216 - i * 26} ${26 + i * 24},${216 - i * 26}`} fill="#d7a066" />
          <polygon points={`${14 + i * 24},${224 - i * 26} ${58 + i * 24},${224 - i * 26} ${58 + i * 24},${236 - i * 26} ${14 + i * 24},${236 - i * 26}`} fill={`url(#${id}-fil)`} />
        </g>
      ))}
      <rect x="0" y="228" width="200" height="12" fill="#5b3412" opacity="0.28" />
    </svg>
  )
}

/** Six objets de la boutique « Atelier du bois ». */
export function Objet({ type }: { type: 'planche' | 'plateau' | 'tabouret' | 'etagere' | 'lampe' | 'bol' }) {
  const bois = '#b87a3e'
  const boisFonce = '#8a5426'
  return (
    <svg viewBox="0 0 100 100" preserveAspectRatio="xMidYMid meet" aria-hidden="true">
      {type === 'planche' && (
        <g>
          <rect x="14" y="40" width="62" height="26" rx="9" fill={bois} transform="rotate(-14 45 53)" />
          <circle cx="24" cy="50" r="3.4" fill="#efe4d2" transform="rotate(-14 45 53)" />
          <path d="M34 50h30M34 56h26" stroke={boisFonce} strokeOpacity="0.4" strokeWidth="1.2" transform="rotate(-14 45 53)" />
        </g>
      )}
      {type === 'plateau' && (
        <g>
          <ellipse cx="50" cy="56" rx="38" ry="14" fill={boisFonce} />
          <ellipse cx="50" cy="52" rx="38" ry="14" fill={bois} />
          <ellipse cx="50" cy="52" rx="29" ry="9" fill="none" stroke={boisFonce} strokeOpacity="0.4" strokeWidth="1.2" />
        </g>
      )}
      {type === 'tabouret' && (
        <g>
          <ellipse cx="50" cy="38" rx="26" ry="8" fill={bois} />
          <rect x="24" y="38" width="52" height="7" fill={boisFonce} />
          <path d="M32 45 24 84M68 45 76 84M50 45v40" stroke={boisFonce} strokeWidth="5" strokeLinecap="round" />
        </g>
      )}
      {type === 'etagere' && (
        <g>
          <rect x="22" y="18" width="56" height="66" rx="3" fill="none" stroke={boisFonce} strokeWidth="5" />
          <rect x="22" y="48" width="56" height="5" fill={boisFonce} />
          <rect x="30" y="28" width="7" height="20" fill="#2f6f5e" />
          <rect x="40" y="31" width="7" height="17" fill="#d9701c" />
          <rect x="50" y="26" width="7" height="22" fill="#c99a68" />
          <circle cx="62" cy="68" r="7" fill="#efe4d2" />
        </g>
      )}
      {type === 'lampe' && (
        <g>
          <polygon points="34,22 66,22 74,50 26,50" fill="#f6d9a3" />
          <rect x="48" y="50" width="4" height="26" fill={boisFonce} />
          <ellipse cx="50" cy="80" rx="16" ry="5" fill={bois} />
          <ellipse cx="50" cy="50" rx="24" ry="4" fill="#fff3d0" opacity="0.8" />
        </g>
      )}
      {type === 'bol' && (
        <g>
          <path d="M18 44h64c0 22-14 36-32 36S18 66 18 44z" fill={bois} />
          <ellipse cx="50" cy="44" rx="32" ry="7" fill={boisFonce} />
          <path d="M26 56c10 4 38 4 48 0" stroke="#efe4d2" strokeOpacity="0.5" strokeWidth="1.4" fill="none" />
        </g>
      )}
    </svg>
  )
}

type Pictos = 'dossier' | 'calendrier' | 'horloge' | 'sac' | 'personnes' | 'cube' | 'caisse' | 'etoile' | 'carte' | 'couvert' | 'qr' | 'graphique' | 'marteau' | 'escalier' | 'armoire' | 'loupe' | 'panier' | 'cadenas' | 'coche' | 'accueil' | 'engrenage'

/** Pictogrammes à trait (24 × 24). */
export function Picto({ nom, className }: { nom: Pictos; className?: string }) {
  const p: Record<Pictos, React.ReactNode> = {
    dossier: <path d="M6 3h8l4 4v14H6zM14 3v4h4M9 12h6M9 16h6" />,
    calendrier: <path d="M4 6h16v14H4zM4 10h16M8 3v4M16 3v4M8 14h2M12 14h2M8 17h2" />,
    horloge: <><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></>,
    sac: <path d="M5 8h14l-1 12H6zM9 8V6a3 3 0 0 1 6 0v2" />,
    personnes: <><circle cx="9" cy="9" r="3.2" /><path d="M3 20c0-3.5 2.7-6 6-6s6 2.5 6 6M16 6.5a3 3 0 0 1 0 5.8M18 14.4c2 .8 3 2.8 3 5.6" /></>,
    cube: <path d="M12 3 20 7.5v9L12 21l-8-4.5v-9zM4 7.5 12 12l8-4.5M12 12v9" />,
    caisse: <path d="M5 4h14v6H5zM4 10h16v10H4zM8 14h2M12 14h2M16 14h0M8 17h8" />,
    etoile: <path d="m12 3 2.7 5.7 6.3.8-4.6 4.3 1.2 6.2L12 17l-5.6 3 1.2-6.2L3 9.5l6.3-.8z" />,
    carte: <><rect x="3" y="6" width="18" height="12" rx="2" /><path d="M3 10h18M7 15h4" /></>,
    couvert: <path d="M7 3v8M5 3v5a2 2 0 0 0 4 0V3M7 11v10M17 3c-2 2-3 5-3 8h3v10" />,
    qr: <path d="M4 4h6v6H4zM14 4h6v6h-6zM4 14h6v6H4zM14 14h2v2h-2zM18 14h2v6h-4M14 18h2" />,
    graphique: <path d="M4 20V4M4 20h16M8 16v-4M12 16V8M16 16v-6" />,
    marteau: <path d="m14 4 6 6-3 3-6-6zM12 9 4 17l3 3 8-8" />,
    escalier: <path d="M3 20h5v-4h5v-4h5V8h3" />,
    armoire: <path d="M5 3h14v18H5zM12 3v18M9 12v2M15 12v2" />,
    loupe: <><circle cx="10.5" cy="10.5" r="6" /><path d="m15 15 6 6" /></>,
    panier: <path d="M3 4h3l2.4 10h9.4L20 7H7M10 19.5h.01M17 19.5h.01" />,
    cadenas: <><rect x="5" y="11" width="14" height="10" rx="2" /><path d="M8 11V8a4 4 0 0 1 8 0v3" /></>,
    coche: <path d="m5 12.5 4.5 4.5L19 7" />,
    accueil: <path d="M4 11 12 4l8 7v9h-5v-6H9v6H4z" />,
    engrenage: <><circle cx="12" cy="12" r="3.2" /><path d="M12 3v3M12 18v3M3 12h3M18 12h3M5.6 5.6l2.1 2.1M16.3 16.3l2.1 2.1M18.4 5.6l-2.1 2.1M7.7 16.3l-2.1 2.1" /></>,
  }
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {p[nom]}
    </svg>
  )
}
