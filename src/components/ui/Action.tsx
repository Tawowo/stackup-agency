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
  mot,
  className = '',
  type,
  onClick,
}: {
  href?: string
  variante?: Variante
  children: ReactNode
  /** Conservé pour compatibilité (l'ancien curseur l'affichait) ; sans effet. */
  mot?: string
  className?: string
  type?: 'submit' | 'button'
  onClick?: (e: React.MouseEvent<HTMLAnchorElement & HTMLButtonElement>) => void
}) {
  void mot
  const cls = `su-action su-action--${variante} ${className}`
  if (href && /^https?:\/\//.test(href)) {
    return (
      <a href={href} className={cls} target="_blank" rel="noopener noreferrer" onClick={onClick}>
        <span className="su-action__texte">{children}</span>
        <span className="sr-only"> (nouvel onglet)</span>
      </a>
    )
  }
  if (href) {
    return (
      <Link href={href} className={cls} onClick={onClick}>
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
