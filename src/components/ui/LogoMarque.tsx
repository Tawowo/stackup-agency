/**
 * La marque Stackup, en SVG inline.
 *
 * Remplace `logo-icon.png` (63 958 octets, chargé en priorité sur chaque
 * page). Ce PNG avait un canal alpha mais un fond blanc opaque incrusté —
 * vérifié en lisant le pixel de coin : RVBA (254, 254, 255, 255). Sur la
 * barre de navigation ivoire, il dessinait donc un carré blanc visible
 * autour de la marque.
 *
 * En SVG inline : aucune requête supplémentaire, net à toute résolution,
 * fond réellement transparent, et les couleurs peuvent être pilotées par
 * le contexte — c'est ce qui permet au pied de page sombre d'afficher la
 * marque en blanc sans filtre `brightness-0 invert`.
 *
 * La géométrie est reprise de `public/logo.svg`, qui fait foi.
 */

export default function LogoMarque({
  taille = 40,
  haut = '#1E3A5F',
  bas = '#F59E0B',
  className = '',
}: {
  taille?: number
  /** Couleur du chevron supérieur. */
  haut?: string
  /** Couleur du chevron inférieur. */
  bas?: string
  className?: string
}) {
  return (
    <svg
      width={taille}
      height={taille}
      viewBox="0 0 100 120"
      fill="none"
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      <polygon points="6,6 94,6 94,54 30,54" fill={haut} />
      <polygon points="6,66 70,66 94,114 6,114" fill={bas} />
    </svg>
  )
}
