import Link from 'next/link'
import type { ReactNode } from 'react'

type Variante = 'plein' | 'contour' | 'lien'

/**
 * ACTION — bouton ambre plein avec reflet à −18°, secondaire contour, tertiaire
 * lien tracé. Jamais plus de deux côte à côte.
 */
export default function Action({
  href,
  variante = 'plein',
  children,
  mot = 'Voir',
  className = '',
  type,
  onClick,
}: {
  href?: string
  variante?: Variante
  children: ReactNode
  /** Mot affiché par le curseur au survol. */
  mot?: string
  className?: string
  type?: 'submit' | 'button'
  onClick?: () => void
}) {
  const cls = `su-action su-action--${variante} ${className}`
  if (href) {
    return (
      <Link href={href} className={cls}>
        <span className="su-action__texte">{children}</span>
      </Link>
    )
  }
  return (
    <button type={type ?? 'button'} className={cls} onClick={onClick}>
      <span className="su-action__texte">{children}</span>
    </button>
  )
}
