'use client'
/**
 * LA MÉTAMORPHOSE — dix emplacements de dalles (plaques) dans une fenêtre de
 * navigateur. Chaque maquette décrit où va chaque emplacement ; passer d'une
 * maquette à l'autre, c'est glisser et redimensionner les mêmes dalles (CSS
 * transition), puis les ouvrir sur l'interface réelle par découpe. Les
 * emplacements inutilisés se réduisent à rien au centre.
 */
import type { CSSProperties } from 'react'
import Navigateur from './Navigateur'
import { Contenu, type ContexteBloc, type Role } from './blocs'

export interface Emplacement {
  role: Role
  x: number
  y: number
  w: number
  h: number
  rot?: number
  z?: number
}

export const PLAQUES = ['#173b63', '#235a91', '#f69106', '#1c4a78', '#c76f05', '#2a6aa6', '#163a62', '#f69106', '#235a91', '#1c4a78']

export const VIDE: Emplacement = { role: 'vide', x: 50, y: 28, w: 0, h: 0 }

export default function Morph({
  emplacements,
  pret,
  url,
  ctx,
  className = '',
}: {
  emplacements: Emplacement[]
  pret: boolean
  url: string
  ctx?: ContexteBloc
  className?: string
}) {
  return (
    <Navigateur url={url} pret={pret} className={className}>
      {Array.from({ length: PLAQUES.length }, (_, i) => {
        const e = emplacements[i] ?? VIDE
        return (
          <div
            key={i}
            className="mq-b"
            data-vide={e.role === 'vide' ? '1' : '0'}
            style={{ '--x': e.x, '--y': e.y, '--w': e.w, '--h': e.h, '--rot': e.rot ?? 0, '--z': e.z ?? 1, '--plaque': PLAQUES[i] } as CSSProperties}
          >
            <div className="mq-b__c">
              <Contenu role={e.role} ctx={ctx} />
            </div>
          </div>
        )
      })}
    </Navigateur>
  )
}
