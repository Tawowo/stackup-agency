'use client'

/**
 * L'ATELIER DES STRATES.
 *
 * L'audit avait relevé le pire défaut du site : sur /services, chaque carte
 * affichait un titre, un prix, deux boutons — et un grand vide au centre.
 * Aucune démonstration de ce que l'agence sait faire.
 *
 * Ce composant comble ce vide par un schéma : la même métaphore de strates
 * que le hero, mais une morphologie différente pour chaque offre. Un site
 * vitrine est une pile courte et large ; un outil de gestion est une pile
 * profonde avec des liaisons latérales ; une boutique est un flux qui
 * traverse les couches.
 *
 * En SVG et non en WebGL : six scènes 3D sur une même page coûteraient six
 * contextes GL pour un gain nul. Le SVG est net à toute résolution, pèse
 * quelques centaines d'octets et s'anime sans JavaScript.
 */

import { useEffect, useRef, useState } from 'react'

export type Morphologie =
  | 'socle'      // vitrine : peu de couches, larges, stables
  | 'etage'      // multi-pages : plusieurs couches, ramifications
  | 'flux'       // e-commerce : un flux traverse les couches
  | 'profond'    // gestion : pile profonde, liaisons latérales
  | 'compact'    // association : minimal, resserré
  | 'cycle'      // maintenance / rédaction : boucle qui revient

interface Plaque {
  /** Largeur relative, 0 → 1. */
  l: number
  /** Décalage horizontal relatif, -1 → 1. */
  dx: number
}

/** Chaque morphologie est un profil de pile. Déterministe, donc comparable
 *  d'un rendu à l'autre et d'une capture à l'autre. */
const PROFILS: Record<Morphologie, Plaque[]> = {
  socle:   [{ l: 1, dx: 0 }, { l: 0.92, dx: 0.02 }, { l: 0.84, dx: -0.01 }],
  etage:   [{ l: 0.96, dx: 0 }, { l: 0.72, dx: -0.12 }, { l: 0.72, dx: 0.14 }, { l: 0.88, dx: 0.01 }, { l: 0.66, dx: -0.06 }],
  flux:    [{ l: 0.9, dx: 0 }, { l: 0.78, dx: 0.06 }, { l: 0.86, dx: -0.04 }, { l: 0.7, dx: 0.09 }],
  profond: [{ l: 0.82, dx: 0 }, { l: 0.9, dx: 0.04 }, { l: 0.74, dx: -0.05 }, { l: 0.88, dx: 0.02 }, { l: 0.68, dx: -0.08 }, { l: 0.8, dx: 0.05 }],
  compact: [{ l: 0.78, dx: 0 }, { l: 0.66, dx: 0.03 }],
  cycle:   [{ l: 0.86, dx: 0 }, { l: 0.74, dx: 0.05 }, { l: 0.86, dx: -0.03 }],
}

const L = 260
const H = 150
/** Profondeur de la face supérieure : donne l'inclinaison isométrique. */
const PROF = 13
const EPAISSEUR = 9

export default function StrateService({
  morphologie,
  className = '',
}: {
  morphologie: Morphologie
  className?: string
}) {
  // Le composant observe sa propre visibilité plutôt que de dépendre d'un
  // observateur global : six schémas qui s'animent hors écran pendant que le
  // visiteur lit le haut de la page sont six animations perdues.
  const svg = useRef<SVGSVGElement>(null)
  const [vu, setVu] = useState(false)

  useEffect(() => {
    const element = svg.current
    if (!element) return
    // Sans IntersectionObserver (navigateur ancien), on montre tout de suite :
    // mieux vaut une animation manquée qu'un schéma qui ne s'affiche jamais.
    if (typeof IntersectionObserver === 'undefined') {
      setVu(true)
      return
    }
    const vigie = new IntersectionObserver(
      ([entree]) => {
        if (entree.isIntersecting) {
          setVu(true)
          vigie.disconnect()
        }
      },
      { threshold: 0.25 },
    )
    vigie.observe(element)
    return () => vigie.disconnect()
  }, [])

  const plaques = PROFILS[morphologie]
  const n = plaques.length
  // La pile est centrée verticalement quel que soit le nombre de plaques :
  // sinon une morphologie à 6 couches déborde là où une à 2 flotte en haut.
  const pas = Math.min(22, (H - PROF - EPAISSEUR - 24) / Math.max(n - 1, 1))
  const hauteurTotale = pas * (n - 1)
  const baseY = (H + hauteurTotale) / 2 - 8

  return (
    <svg
      ref={svg}
      viewBox={`0 0 ${L} ${H}`}
      className={`su-strate-svg ${vu ? 'su-vu' : ''} ${className}`}
      role="img"
      aria-label="Schéma : la structure de cette offre, couche par couche"
      preserveAspectRatio="xMidYMid meet"
    >
      <defs>
        <linearGradient id={`su-g-${morphologie}`} x1="0" y1="0" x2="1" y2="0.35">
          <stop offset="0%" stopColor="#2a4d7a" />
          <stop offset="100%" stopColor="#17304f" />
        </linearGradient>
      </defs>

      {/* Les plaques sont dessinées du bas vers le haut : l'ordre du document
          fait le recouvrement, sans avoir à gérer un z-index. */}
      {plaques.map((p, i) => {
        const largeur = p.l * (L - 70)
        const cx = L / 2 + p.dx * 58
        const y = baseY - i * pas
        const x = cx - largeur / 2

        // Face supérieure en parallélogramme : même langage visuel que les
        // plaques du monolithe, qu'on voit aussi par le dessus.
        const dessus = `${x},${y} ${x + largeur},${y} ${x + largeur - PROF},${y - PROF} ${x - PROF},${y - PROF}`

        return (
          <g
            key={i}
            className="su-strate-svg__plaque"
            style={{ '--i': i } as React.CSSProperties}
          >
            <rect
              x={x}
              y={y}
              width={largeur}
              height={EPAISSEUR}
              rx="1.5"
              fill={`url(#su-g-${morphologie})`}
            />
            <polygon points={dessus} fill="#34598a" />
            {/* Arête éclairée : la lumière rasante du site, en 2D. */}
            <line
              x1={x - PROF}
              y1={y - PROF}
              x2={x + largeur - PROF}
              y2={y - PROF}
              stroke="#F59E0B"
              strokeWidth="1.4"
              className="su-strate-svg__arete"
            />
          </g>
        )
      })}

      {/* ── Signes propres à chaque morphologie ── */}

      {morphologie === 'flux' && (
        // Un trait qui traverse toutes les couches : la commande qui descend
        // du catalogue au paiement.
        <path
          d={`M ${L / 2 - 52} ${baseY + 6} C ${L / 2 - 10} ${baseY - 20}, ${L / 2 + 14} ${baseY - hauteurTotale + 4}, ${L / 2 + 54} ${baseY - hauteurTotale - 16}`}
          fill="none"
          stroke="#F59E0B"
          strokeWidth="2"
          strokeLinecap="round"
          className="su-strate-svg__flux"
        />
      )}

      {morphologie === 'profond' &&
        // Liaisons latérales : les couches se parlent, c'est exactement ce qui
        // distingue un logiciel métier d'un site.
        [1, 3].map((i) => {
          const y = baseY - i * pas - PROF / 2
          return (
            <path
              key={i}
              d={`M ${L / 2 - 86} ${y} q -14 ${-pas} 0 ${-pas * 2}`}
              fill="none"
              stroke="#2D7DD2"
              strokeWidth="1.8"
              strokeLinecap="round"
              className="su-strate-svg__liaison"
              style={{ '--i': i } as React.CSSProperties}
            />
          )
        })}

      {morphologie === 'etage' &&
        // Ramifications : les pages qui se déploient depuis le tronc commun.
        [1, 2].map((i) => (
          <line
            key={i}
            x1={L / 2}
            y1={baseY - pas * 0.5}
            x2={L / 2 + (i === 1 ? -62 : 70)}
            y2={baseY - pas * 1.5}
            stroke="#2D7DD2"
            strokeWidth="1.5"
            strokeLinecap="round"
            className="su-strate-svg__liaison"
            style={{ '--i': i } as React.CSSProperties}
          />
        ))}

      {morphologie === 'cycle' && (
        // Boucle de retour : ce qui est livré revient en entretien.
        <path
          d={`M ${L / 2 + 74} ${baseY - 2} a 34 ${hauteurTotale / 2 + 16} 0 1 0 0 ${-hauteurTotale - 10}`}
          fill="none"
          stroke="#F59E0B"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeDasharray="4 4"
          className="su-strate-svg__cycle"
        />
      )}

      {morphologie === 'compact' && (
        // Socle marqué : peu de couches, mais posées.
        <line
          x1={L / 2 - 58}
          y1={baseY + EPAISSEUR + 7}
          x2={L / 2 + 58}
          y2={baseY + EPAISSEUR + 7}
          stroke="#2D7DD2"
          strokeWidth="1.5"
          strokeLinecap="round"
          opacity="0.5"
        />
      )}
    </svg>
  )
}
