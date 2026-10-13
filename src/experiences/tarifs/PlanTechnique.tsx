'use client'
/**
 * LE PLAN TECHNIQUE — derrière le configurateur, le plan du futur site se
 * dessine trait par trait en lumière : la page d'accueil, les pages que le
 * type implique, puis un module par fonction cochée, chacun relié à l'accueil.
 * Un trait nouveau se trace (dash), un trait retiré s'efface : le plan suit
 * exactement la configuration. Décoratif (aria-hidden) : le contenu réel est
 * dans le configurateur.
 */
import { FONCTIONS, type Configuration } from '@/lib/configuration'

const PAGES: Record<string, string[]> = {
  'une-page': ['Accueil', 'Mentions'],
  'multi-pages': ['Accueil', 'Prestations', 'À propos', 'Blog', 'Contact'],
  boutique: ['Accueil', 'Catalogue', 'Fiche produit', 'Panier', 'Compte'],
  outil: ['Tableau de bord', 'Clients', 'Paramètres'],
}

export default function PlanTechnique({ c }: { c: Configuration }) {
  const pages = c.type ? PAGES[c.type]! : []
  const fonctions = FONCTIONS.filter((f) => c.fonctions.includes(f.id))
  const W = 600
  const lp = 92
  const xPage = (i: number) => 40 + i * ((W - 80 - lp) / Math.max(1, pages.length - 1 || 1))
  const yPages = 120
  const yFonctions = 300
  const xF = (i: number) => 40 + i * ((W - 80 - lp) / Math.max(1, fonctions.length - 1 || 1))
  return (
    <svg className="su-plan" viewBox={`0 0 ${W} 420`} aria-hidden="true">
      <g className="su-plan__grille">
        {Array.from({ length: 13 }, (_, i) => (
          <line key={`v${i}`} x1={i * 50} y1={0} x2={i * 50} y2={420} />
        ))}
        {Array.from({ length: 9 }, (_, i) => (
          <line key={`h${i}`} x1={0} y1={i * 50 + 10} x2={W} y2={i * 50 + 10} />
        ))}
      </g>
      {c.type && (
        <g key={c.type}>
          <text className="su-plan__cote" x={40} y={60}>
            {`plan · ${c.type} · ${pages.length} écran${pages.length > 1 ? 's' : ''}`}
          </text>
          {pages.map((p, i) => (
            <g key={p} className="su-plan__trait" style={{ '--i': i } as React.CSSProperties}>
              {i > 0 && <path d={`M${xPage(0) + lp / 2} ${yPages + 56} C ${xPage(0) + lp / 2} ${yPages + 90}, ${xPage(i) + lp / 2} ${yPages + 70}, ${xPage(i) + lp / 2} ${yPages + 56}`} pathLength={1} />}
              <rect x={xPage(i)} y={yPages} width={lp} height={56} rx={3} pathLength={1} />
              <line x1={xPage(i) + 8} y1={yPages + 14} x2={xPage(i) + lp - 8} y2={yPages + 14} pathLength={1} />
              <text x={xPage(i) + 8} y={yPages + 40}>
                {p}
              </text>
            </g>
          ))}
        </g>
      )}
      {fonctions.map((f, i) => (
        <g key={f.id} className="su-plan__trait su-plan__trait--module" style={{ '--i': i } as React.CSSProperties}>
          <path d={`M${xPage(0) + lp / 2} ${yPages + 56} L ${xF(i) + lp / 2} ${yFonctions}`} pathLength={1} />
          <rect x={xF(i)} y={yFonctions} width={lp} height={46} rx={3} pathLength={1} />
          <text x={xF(i) + 8} y={yFonctions + 28}>
            {f.nom}
          </text>
        </g>
      ))}
    </svg>
  )
}
