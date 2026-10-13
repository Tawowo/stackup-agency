/**
 * REPLI 2D — le logo en SVG : les trois plaques exactes (quads du décalque) et,
 * derrière, des plaques fantômes qui se déploient vers le haut avec `--su-p`
 * (la même timeline de scroll que la 3D). Sans WebGL, en mouvement réduit
 * (figé) et au palier `low`. Tout est en CSS : zéro JS par trame.
 */
import { LOGO_QUADS, LOGO_VIEW } from './logo-geometry'

const FANTOMES = 7

export default function Fallback2D() {
  const haut = LOGO_QUADS[0]
  const milieu = LOGO_QUADS[1]
  const bas = LOGO_QUADS[2]
  return (
    <svg className="su-repli__svg" viewBox={`0 0 ${LOGO_VIEW.w} ${LOGO_VIEW.h}`} overflow="visible" aria-hidden="true" focusable="false">
      <g className="su-repli__fantomes">
        {Array.from({ length: FANTOMES }, (_, i) => (
          <polygon
            key={i}
            points={i % 2 ? milieu.points : haut.points}
            className="su-repli__fantome"
            style={{ '--i': i + 1 } as React.CSSProperties}
          />
        ))}
      </g>
      <polygon points={haut.points} className="su-repli__plaque su-repli__plaque--haut" />
      <polygon points={bas.points} className="su-repli__plaque su-repli__plaque--ambre" />
      <polygon points={milieu.points} className="su-repli__plaque su-repli__plaque--milieu" />
    </svg>
  )
}
