/**
 * LA FENÊTRE DE NAVIGATEUR — le cadre de toutes les maquettes : trois points,
 * une barre d'adresse (avec cadenas), un corps. Tout est en cqw : la fenêtre
 * se met à l'échelle de son conteneur.
 */
import type { CSSProperties, ReactNode } from 'react'
import { Picto } from './illustrations'
import './maquettes.css'

export default function Navigateur({
  url = 'menuiserie-aubert.fr',
  ratio = '16 / 10',
  cadenas = true,
  children,
  corpsRef,
  className = '',
  pret = true,
  style,
}: {
  url?: string
  ratio?: string
  cadenas?: boolean
  children?: ReactNode
  corpsRef?: React.Ref<HTMLDivElement>
  className?: string
  /** `false` : les blocs sont encore des dalles (métamorphose en cours). */
  pret?: boolean
  style?: CSSProperties
}) {
  return (
    <div className={`mq ${className}`} data-pret={pret ? '1' : '0'} style={{ '--mq-ratio': ratio, ...style } as CSSProperties}>
      <div className="mq__fen" aria-hidden="true">
        <div className="mq__barre">
          <span className="mq__point" />
          <span className="mq__point" />
          <span className="mq__point" />
          <span className="mq__adresse">
            {cadenas && (
              <span className="mq__cadenas">
                <Picto nom="cadenas" />
              </span>
            )}
            {url}
          </span>
        </div>
        <div className="mq__corps" ref={corpsRef}>
          {children}
        </div>
      </div>
    </div>
  )
}
