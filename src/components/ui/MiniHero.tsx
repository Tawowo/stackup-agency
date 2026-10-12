import Breadcrumb from '@/components/ui/Breadcrumb'

interface BreadcrumbItem {
  name: string
  href?: string
}

/**
 * Les signatures d'ouverture.
 *
 * Chacune est un MÉCANISME différent, pas une variante de couleur :
 *
 *   trace        un schéma qui se dessine, trait par trait (SVG, stroke-dashoffset)
 *   masque       le titre découpé dans une trame en mouvement (background-clip)
 *   echelle      un axe gradué qui se construit de gauche à droite
 *   chronologie  des crans qui se remplissent le long d'une ligne de temps
 *   signal       des ondes concentriques émises depuis un point
 *   colonne      des lignes de texte qui se composent, de la gauche vers la droite
 *   maillage     une couverture qui gagne du terrain, point par point
 *   sobre        aucun ornement — pour les pages où il n'aurait rien à dire
 *
 * Toutes sont décoratives : aucune ne porte d'information, toutes sont en
 * `aria-hidden`, et le titre reste peint sans elles.
 *
 * `colonne` et `maillage` ont été ajoutées pour remplacer la bande sombre
 * que VINGT-QUATRE pages intérieures copiaient à l'identique — même dégradé,
 * même `pt-24 pb-16`, même fil d'Ariane, même titre blanc. Les six pages
 * commerciales avaient déjà leur signature ; les autres n'avaient rien.
 */
export type Signature =
  | 'trace'
  | 'masque'
  | 'echelle'
  | 'chronologie'
  | 'signal'
  | 'colonne'
  | 'maillage'
  | 'sobre'

interface Props {
  title: string
  subtitle?: string
  breadcrumb?: BreadcrumbItem[]
  children?: React.ReactNode
  marker?: string
  /** Mécanique d'ouverture. Par défaut : `sobre`. */
  signature?: Signature
}

/* ── Les ornements ──────────────────────────────────────────────────────── */

/** Un schéma de site qui se câble : blocs reliés par des traits qui se tracent. */
function Trace() {
  return (
    <svg className="su-sig__trace" viewBox="0 0 420 190" fill="none" aria-hidden="true">
      <g className="su-sig__trace-blocs">
        <rect x="12" y="20" width="96" height="26" rx="4" />
        <rect x="12" y="68" width="96" height="58" rx="4" />
        <rect x="156" y="36" width="108" height="42" rx="4" />
        <rect x="156" y="104" width="108" height="42" rx="4" />
        <rect x="312" y="62" width="92" height="62" rx="4" />
      </g>
      <g className="su-sig__trace-liens">
        <path d="M108 33 H132 V57 H156" />
        <path d="M108 97 H132 V125 H156" />
        <path d="M264 57 H288 V93 H312" />
        <path d="M264 125 H288 V93" />
      </g>
      <g className="su-sig__trace-points">
        <circle cx="132" cy="33" r="3" />
        <circle cx="132" cy="125" r="3" />
        <circle cx="288" cy="93" r="3.5" />
      </g>
    </svg>
  )
}

/** Un axe gradué qui se construit : l'échelle des offres. */
function Echelle() {
  return (
    <div className="su-sig__echelle" aria-hidden="true">
      <span className="su-sig__echelle-axe" />
      {Array.from({ length: 24 }, (_, i) => (
        <span
          key={i}
          className="su-sig__echelle-cran"
          style={{ '--i': i, '--n': 24 } as React.CSSProperties}
        />
      ))}
    </div>
  )
}

/** Une ligne de temps dont les crans se remplissent. */
function Chronologie() {
  return (
    <div className="su-sig__chrono" aria-hidden="true">
      <span className="su-sig__chrono-ligne" />
      {Array.from({ length: 5 }, (_, i) => (
        <span
          key={i}
          className="su-sig__chrono-cran"
          style={{ '--i': i } as React.CSSProperties}
        />
      ))}
    </div>
  )
}

/** Des ondes concentriques, émises depuis un point. */
function Signal() {
  return (
    <div className="su-sig__signal" aria-hidden="true">
      {Array.from({ length: 4 }, (_, i) => (
        <span key={i} style={{ '--i': i } as React.CSSProperties} />
      ))}
    </div>
  )
}

/**
 * Des lignes de texte qui se composent — pour l'éditorial.
 *
 * Les longueurs ne sont pas aléatoires à chaque rendu : elles viennent d'une
 * table fixe. Un `Math.random()` ici donnerait un balisage différent sur le
 * serveur et dans le navigateur, donc une erreur d'hydratation.
 */
const LIGNES = [96, 72, 88, 54, 92, 66, 81, 44, 90, 70, 86, 58]

function Colonne() {
  return (
    <div className="su-sig__colonne" aria-hidden="true">
      {LIGNES.map((l, i) => (
        <span
          key={i}
          style={{ '--l': `${l}%`, '--i': i, '--n': LIGNES.length } as React.CSSProperties}
        />
      ))}
    </div>
  )
}

/**
 * Une couverture qui gagne du terrain — pour les pages de territoire.
 *
 * Le décalage de chaque point suit sa DISTANCE au foyer, pas son indice :
 * l'allumage se propage en onde depuis un coin, au lieu de balayer la grille
 * ligne par ligne. C'est ce qui le distingue de `echelle`, qui est un
 * décalage linéaire.
 */
const MAILLE = { colonnes: 14, rangs: 7 }

function Maillage() {
  const points = []
  for (let r = 0; r < MAILLE.rangs; r++) {
    for (let c = 0; c < MAILLE.colonnes; c++) {
      const d = Math.sqrt(c * c + r * r * 2.4)
      points.push({ c, r, d })
    }
  }
  const dMax = Math.max(...points.map((p) => p.d))
  return (
    <div className="su-sig__maillage" aria-hidden="true">
      {points.map((p, i) => (
        <span
          key={i}
          style={
            {
              '--c': p.c,
              '--r': p.r,
              '--cols': MAILLE.colonnes,
              '--rangs': MAILLE.rangs,
              '--d': (p.d / dMax).toFixed(3),
            } as React.CSSProperties
          }
        />
      ))}
    </div>
  )
}

const ORNEMENTS: Partial<Record<Signature, () => JSX.Element>> = {
  trace: Trace,
  echelle: Echelle,
  chronologie: Chronologie,
  signal: Signal,
  colonne: Colonne,
  maillage: Maillage,
}

/* ── L'en-tête ──────────────────────────────────────────────────────────── */

export default function MiniHero({
  title,
  subtitle,
  breadcrumb,
  children,
  marker,
  signature = 'sobre',
}: Props) {
  const Ornement = ORNEMENTS[signature]

  return (
    <div className="su-sig" data-signature={signature}>
      {Ornement && (
        <div className="su-sig__ornement" aria-hidden="true">
          <Ornement />
        </div>
      )}

      <div className="su-sig__contenu">
        {breadcrumb && <Breadcrumb items={breadcrumb} />}
        {/* Le repère passe sur `.su-surtitre`, la grammaire unique de la page
            d'accueil. Il utilisait `.section-marker` : #2D7DD2 à 70 %
            d'opacité, soit environ 2,6:1 sur l'ivoire — sous le seuil AA pour
            du petit texte, et invisible à l'œil sur la capture qui me l'a fait
            voir. `.su-surtitre` est en #B45309, mesuré à 4,94:1. */}
        {marker && (
          <p className="su-surtitre mb-3 mt-1" aria-hidden="true">
            {marker}
          </p>
        )}

        {/* Le titre est toujours peint. Les signatures n'agissent que sur sa
            mise en scène, jamais sur sa présence : sans script, sans
            animation et sous mouvement réduit, il est là, en entier. */}
        <h1 className="su-sig__titre font-display">
          {signature === 'masque' ? (
            <span className="su-sig__titre-masque" data-texte={title}>
              {title}
            </span>
          ) : (
            title
          )}
        </h1>

        {subtitle && <p className="su-sig__chapo">{subtitle}</p>}
        {children}
      </div>
    </div>
  )
}
