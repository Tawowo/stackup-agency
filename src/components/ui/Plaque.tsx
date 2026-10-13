import { createElement, type ElementType, type ReactNode } from 'react'

/**
 * PLAQUE — surface à angles 4 px, ombre posée à −18°. Remplace toute carte.
 * Variantes : encre (sur ivoire ou sur encre-2), ivoire-creuse (fiches, champs).
 */
export default function Plaque({
  as: Tag = 'div',
  variante = 'ivoire',
  className = '',
  children,
  ...rest
}: {
  as?: ElementType
  variante?: 'encre' | 'ivoire'
  className?: string
  children: ReactNode
} & Record<string, unknown>) {
  return createElement(Tag, { className: `su-plaque su-plaque--${variante} ${className}`, ...rest }, children)
}
