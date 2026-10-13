/**
 * MAQUETTE HTML — par-dessus la 3D, les cadres de la page s'assemblent par
 * découpe autour des plaques : mêmes blocs, mêmes coordonnées (projection
 * orthographique). La boîte de la maquette reproduit la boîte du logo
 * (146 × 229) que la scène ajuste dans le cadre ; les positions sont en %.
 */
'use client'
import { blocsDe, boiteBloc } from '@/webgl/layouts/offres'
import { useScene } from '@/webgl/store'
import { LOGO_VIEW, SVG_PAR_UNITE } from '@/webgl/logo-geometry'
import type { OffreScene } from './offres'

const W = LOGO_VIEW.w / SVG_PAR_UNITE // 1.46
const H = LOGO_VIEW.h / SVG_PAR_UNITE // 2.29

export default function Maquette({ offre }: { offre: OffreScene }) {
  const portrait = useScene((s) => s.params.portrait) > 0.5
  const blocs = blocsDe(offre.maquette, portrait)
  return (
    <div className="su-maq" data-maquette={offre.maquette} aria-hidden="true">
      <div className="su-maq__boite">
        {blocs.map((b, k) => {
          const r = boiteBloc(b)
          const marge = b.s * 0.35
          const left = ((r.x - marge + W / 2) / W) * 100
          const top = ((H / 2 - (r.y + marge)) / H) * 100
          const width = ((r.w + marge * 2) / W) * 100
          const height = ((r.h + marge * 2) / H) * 100
          return (
            <div
              key={k}
              className={`su-maq__bloc su-maq__bloc--${b.role}`}
              style={{ left: `${left}%`, top: `${top}%`, width: `${width}%`, height: `${height}%`, '--k': b.delay * 10 } as React.CSSProperties}
            />
          )
        })}
      </div>
    </div>
  )
}
