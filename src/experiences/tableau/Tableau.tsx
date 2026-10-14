'use client'
/**
 * /solutions — LE TABLEAU DE BORD VIVANT. Les modules sont des blocs qu'on
 * glisse sur un plan de travail (ou qu'on pose au clavier / au tap) ; ils
 * s'aimantent à une grille de six emplacements. Deux modules voisins se
 * connectent : des données circulent entre eux (flux en pointillés, boucle
 * d'ambiance) et un indicateur croisé s'ouvre. Chaque module ajoute au tableau
 * de bord son compteur (Cadran) et son graphique, tracé à la pose.
 * Les chiffres sont fictifs et affichés comme tels.
 */
import { offre } from '@/config/site'
import { useEffect, useMemo, useRef, useState } from 'react'
import Link from 'next/link'
import { useDrag } from '@use-gesture/react'
import StackFrame from '@/webgl/StackFrame'
import { useScene } from '@/webgl/store'
import Cadran from '@/components/ui/Cadran'
import Action from '@/components/ui/Action'
import { SOLUTIONS } from '@/data/solutions'
import { WIDGETS, croise, type Widget } from './widgets'
import './tableau.css'

const EMPLACEMENTS = 6
const COLS = 3

function Graphique({ w }: { w: Widget }) {
  const max = Math.max(...w.serie)
  const min = w.type === 'courbe' ? Math.min(...w.serie) * 0.9 : 0
  const pts = w.serie.map((v, i) => [(i / (w.serie.length - 1)) * 100, 36 - ((v - min) / (max - min || 1)) * 32])
  if (w.type === 'barres')
    return (
      <svg viewBox="0 0 100 40" className="su-tab__graph" aria-hidden="true">
        {pts.map(([x, y], i) => (
          <rect key={i} x={x! * 0.9 + 1} y={y} width={100 / w.serie.length - 4} height={40 - y!} className="su-tab__barre" style={{ '--i': i } as React.CSSProperties} />
        ))}
      </svg>
    )
  const d = pts.map(([x, y], i) => `${i ? 'L' : 'M'}${x!.toFixed(1)} ${y!.toFixed(1)}`).join(' ')
  return (
    <svg viewBox="0 0 100 40" className="su-tab__graph" aria-hidden="true">
      <path d={`${d} L100 40 L0 40 Z`} className="su-tab__aire" />
      <path d={d} className="su-tab__courbe" pathLength={1} />
    </svg>
  )
}

function Bloc({ w, onPoser, place }: { w: Widget; onPoser: (slug: string, x: number, y: number) => void; place: boolean }) {
  const ref = useRef<HTMLButtonElement>(null)
  const [d, setD] = useState({ x: 0, y: 0, actif: false })
  const bind = useDrag(
    ({ movement: [mx, my], active, xy: [x, y], tap }) => {
      if (tap) return
      setD({ x: active ? mx : 0, y: active ? my : 0, actif: active })
      if (!active) onPoser(w.slug, x, y)
    },
    { filterTaps: true, pointer: { touch: true } },
  )
  return (
    <button
      ref={ref}
      type="button"
      {...bind()}
      className="su-tab__bloc su-plaque"
      data-place={place ? '1' : '0'}
      data-glisse={d.actif ? '1' : '0'}
      style={{ transform: `translate(${d.x}px, ${d.y}px)` }}
      onClick={() => onPoser(w.slug, -1, -1)}
      aria-pressed={place}
    >
      <span className="su-mono">{place ? 'posé' : 'glisser ou toucher'}</span>
      {w.court}
    </button>
  )
}

export default function Tableau() {
  const [slots, setSlots] = useState<(string | null)[]>(() => ['gestion-devis-factures', 'crm-sur-mesure', null, null, null, null])
  const plan = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const s = useScene.getState()
    s.setMoment('solutions')
    s.setMonde('fabrique')
    s.setNuit(1)
    s.setScrub(false)
    s.setParams({ retard: 0.25, flash: 0, arc: 0.6, modules: 12, isoPush: 0, isoDim: 0.42 })
    s.setProjection(0.6)
    s.setPose({ x: 0.12, y: -0.1 })
    if (!s.reduced) s.setLayout('machines')
    return () => useScene.getState().setIsolate(-1)
  }, [])

  const poser = (slug: string, x: number, y: number) => {
    setSlots((cur) => {
      const deja = cur.indexOf(slug)
      const next = [...cur]
      // Toucher un module posé le retire ; toucher un module libre le pose au premier emplacement libre.
      if (x < 0) {
        if (deja >= 0) next[deja] = null
        else {
          const libre = next.indexOf(null)
          if (libre >= 0) next[libre] = slug
        }
        return next
      }
      // Glissé : l'emplacement le plus proche du point de lâcher (aimant).
      const cases = plan.current?.querySelectorAll<HTMLElement>('[data-case]')
      if (!cases) return cur
      let best = -1
      let bestD = Infinity
      cases.forEach((c, i) => {
        const r = c.getBoundingClientRect()
        const dd = Math.hypot(r.left + r.width / 2 - x, r.top + r.height / 2 - y)
        if (dd < bestD) {
          bestD = dd
          best = i
        }
      })
      if (best < 0 || bestD > 260) return cur
      if (deja >= 0) next[deja] = next[best] ?? null
      next[best] = slug
      return next
    })
  }

  // Connexions : voisins horizontaux et verticaux sur la grille 3 × 2.
  const liens = useMemo(() => {
    const out: { a: number; b: number; texte?: string }[] = []
    for (let i = 0; i < EMPLACEMENTS; i++) {
      const voisins = [i % COLS < COLS - 1 ? i + 1 : -1, i + COLS < EMPLACEMENTS ? i + COLS : -1]
      for (const j of voisins) if (j >= 0 && slots[i] && slots[j]) out.push({ a: i, b: j, texte: croise(slots[i]!, slots[j]!) })
    }
    return out
  }, [slots])

  const poses = slots.filter(Boolean).length
  const centre = (i: number) => ({ x: ((i % COLS) + 0.5) * (100 / COLS), y: (Math.floor(i / COLS) + 0.5) * 50 })

  return (
    <>
      <section className="su-tab" data-moment="solutions" data-nuit="1" aria-labelledby="su-tab-titre">
        <div className="su-tab__grille">
          <header className="su-tab__tete">
            <p className="su-mono su-tab__etiquette">Outils de gestion</p>
            <h1 id="su-tab-titre" className="su-display su-tab__titre">
              Assemblez votre
              <br />
              tableau de bord.
            </h1>
            <p className="su-tab__ligne">
              Glissez les modules sur le plan de travail. Deux modules voisins se branchent : leurs données circulent, votre tableau de bord se construit. C’est exactement comme ça qu’on fabrique votre outil.
            </p>
          </header>
          <div className="su-tab__palette" role="group" aria-label="Modules disponibles">
            {WIDGETS.map((w) => (
              <Bloc key={w.slug} w={w} place={slots.includes(w.slug)} onPoser={poser} />
            ))}
          </div>
          <div ref={plan} className="su-tab__plan" aria-label="Plan de travail : six emplacements">
            <svg className="su-tab__flux" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
              {liens.map((l) => {
                const a = centre(l.a)
                const b = centre(l.b)
                return <line key={`${l.a}-${l.b}`} x1={a.x} y1={a.y} x2={b.x} y2={b.y} className="su-tab__lien" />
              })}
            </svg>
            {slots.map((slug, i) => {
              const w = WIDGETS.find((x) => x.slug === slug)
              return (
                <div key={i} className="su-tab__case" data-case={i} data-pleine={w ? '1' : '0'}>
                  {w ? (
                    <div className="su-tab__module" key={w.slug}>
                      <p className="su-mono su-tab__mod-nom">{w.court}</p>
                      <p className="su-tab__kpi">
                        <Cadran valeur={w.kpi.valeur} suffixe={w.kpi.unite} className="su-tab__cadran" />
                      </p>
                      <p className="su-tab__libelle">{w.kpi.libelle}</p>
                      <Graphique w={w} />
                      <button type="button" className="su-tab__retirer" onClick={() => poser(w.slug, -1, -1)} aria-label={`Retirer ${w.court}`}>
                        ×
                      </button>
                    </div>
                  ) : (
                    <span className="su-mono su-tab__vide">emplacement libre</span>
                  )}
                </div>
              )
            })}
          </div>
          <div className="su-tab__bilan" aria-live="polite">
            <p className="su-mono">
              {poses} module{poses > 1 ? 's' : ''} · {liens.length} connexion{liens.length > 1 ? 's' : ''} · données fictives
            </p>
            <ul>
              {liens
                .filter((l) => l.texte)
                .map((l) => (
                  <li key={`${l.a}-${l.b}`}>{l.texte}</li>
                ))}
            </ul>
            <Action href={`/contact?objet=${encodeURIComponent('Outil de gestion : ' + slots.filter(Boolean).map((s) => WIDGETS.find((w) => w.slug === s)!.court).join(', '))}`}>
              Demander cet outil
            </Action>
          </div>
          <div className="su-tab__pile" aria-hidden="true">
            <StackFrame className="su-tab__cadre" />
          </div>
        </div>
      </section>
      <section className="su-tab__catalogue" data-moment="solutions-catalogue" data-nuit="0" aria-labelledby="su-tab-cat">
        <h2 id="su-tab-cat" className="su-display su-tab__cat-titre">
          Les quinze outils du catalogue
        </h2>
        <p className="su-tab__ligne">Chacun se fabrique seul ou se branche aux autres. Développement à partir de {offre('outil').aPartirDe.toLocaleString('fr-FR')} €, abonnement facultatif.</p>
        <ul className="su-tab__liste">
          {SOLUTIONS.map((s) => (
            <li key={s.slug}>
              <Link href={`/solutions/${s.slug}`} className="su-plaque su-tab__fiche">
                <span className="su-display">{s.nom}</span>
                <span>{s.intro.split('. ')[0]}.</span>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </>
  )
}
