'use client'
/**
 * LA CARTE EN RELIEF — la région vue en perspective : un terrain en courbes de
 * niveau, les villes en épingles à leurs vraies positions relatives, et celle
 * dont on parle qui s'allume (pilier ambre, onde). Les voisines sont des
 * liens. Le relief est un décor (aucune prétention topographique) ; seules les
 * positions des villes sont exactes. Tout est en HTML/CSS : lisible, cliquable.
 */
import Link from 'next/link'
import { useEffect, useMemo, useRef } from 'react'
import './carte.css'

import type { Epingle } from './epingles'
export type { Epingle } from './epingles'

/** Un bruit de valeur à 2 octaves, déterministe, pour le relief. */
function hauteur(x: number, y: number): number {
  const h = (i: number, j: number) => {
    const s = Math.sin(i * 127.1 + j * 311.7) * 43758.5453
    return s - Math.floor(s)
  }
  const bruit = (px: number, py: number) => {
    const i = Math.floor(px)
    const j = Math.floor(py)
    const fx = px - i
    const fy = py - j
    const u = fx * fx * (3 - 2 * fx)
    const v = fy * fy * (3 - 2 * fy)
    return h(i, j) * (1 - u) * (1 - v) + h(i + 1, j) * u * (1 - v) + h(i, j + 1) * (1 - u) * v + h(i + 1, j + 1) * u * v
  }
  return bruit(x * 3.2, y * 3.2) * 0.62 + bruit(x * 7.1 + 9, y * 7.1 + 4) * 0.28 + bruit(x * 15 + 3, y * 15 + 8) * 0.1
}

function dessinerRelief(c: HTMLCanvasElement) {
  const W = c.width
  const H = c.height
  const g = c.getContext('2d')!
  const N = 150
  const champ = new Float32Array((N + 1) * (N + 1))
  for (let j = 0; j <= N; j++) for (let i = 0; i <= N; i++) champ[j * (N + 1) + i] = hauteur(i / N, j / N)
  // Aplats : de la nuit profonde aux hauteurs.
  const img = g.createImageData(W, H)
  for (let y = 0; y < H; y++)
    for (let x = 0; x < W; x++) {
      const fx = (x / W) * N
      const fy = (y / H) * N
      const i = Math.min(N - 1, Math.floor(fx))
      const j = Math.min(N - 1, Math.floor(fy))
      const a = champ[j * (N + 1) + i]!
      const dx = champ[j * (N + 1) + i + 1]! - a
      const dy = champ[(j + 1) * (N + 1) + i]! - a
      const ombre = Math.max(0, Math.min(1, 0.5 - (dx * 1.0 + dy * 1.4) * 14))
      const t = a
      const o = (y * W + x) * 4
      img.data[o] = 12 + t * 34 + ombre * 20
      img.data[o + 1] = 34 + t * 56 + ombre * 26
      img.data[o + 2] = 62 + t * 78 + ombre * 30
      img.data[o + 3] = 255
    }
  g.putImageData(img, 0, 0)
  // Courbes de niveau (marching squares simplifié : segments par cellule).
  const niveaux = 14
  g.lineWidth = 1
  for (let k = 1; k < niveaux; k++) {
    const s = k / niveaux
    g.strokeStyle = k % 4 === 0 ? 'rgba(140, 190, 235, 0.38)' : 'rgba(110, 160, 210, 0.17)'
    g.beginPath()
    for (let j = 0; j < N; j++)
      for (let i = 0; i < N; i++) {
        const v00 = champ[j * (N + 1) + i]!
        const v10 = champ[j * (N + 1) + i + 1]!
        const v01 = champ[(j + 1) * (N + 1) + i]!
        const v11 = champ[(j + 1) * (N + 1) + i + 1]!
        const pts: [number, number][] = []
        const bord = (a: number, b: number, x0: number, y0: number, x1: number, y1: number) => {
          if ((a < s) !== (b < s)) {
            const t = (s - a) / (b - a)
            pts.push([x0 + (x1 - x0) * t, y0 + (y1 - y0) * t])
          }
        }
        bord(v00, v10, i, j, i + 1, j)
        bord(v10, v11, i + 1, j, i + 1, j + 1)
        bord(v01, v11, i, j + 1, i + 1, j + 1)
        bord(v00, v01, i, j, i, j + 1)
        if (pts.length >= 2) {
          g.moveTo((pts[0]![0] / N) * W, (pts[0]![1] / N) * H)
          g.lineTo((pts[1]![0] / N) * W, (pts[1]![1] / N) * H)
        }
      }
    g.stroke()
  }
  // Graticule fin.
  g.strokeStyle = 'rgba(255, 255, 255, 0.05)'
  g.lineWidth = 1
  g.beginPath()
  for (let i = 0; i <= 12; i++) {
    g.moveTo((i / 12) * W, 0)
    g.lineTo((i / 12) * W, H)
    g.moveTo(0, (i / 12) * H)
    g.lineTo(W, (i / 12) * H)
  }
  g.stroke()
}

export default function CarteRelief({ epingles, libelle }: { epingles: Epingle[]; libelle: string }) {
  const toile = useRef<HTMLCanvasElement>(null)
  const racine = useRef<HTMLDivElement>(null)

  // Cadre : boîte englobante des épingles, marge, rapport 4:3 en corrigeant cos(lat).
  const cadre = useMemo(() => {
    const lats = epingles.map((e) => e.lat)
    const lons = epingles.map((e) => e.lon)
    const lat0 = (Math.min(...lats) + Math.max(...lats)) / 2
    const k = Math.cos((lat0 * Math.PI) / 180)
    const w = Math.max(0.9, (Math.max(...lons) - Math.min(...lons)) * k)
    const h = Math.max(0.6, Math.max(...lats) - Math.min(...lats))
    const ratio = 1.34
    let LW = w * 1.45
    let LH = h * 1.55
    if (LW / LH > ratio) LH = LW / ratio
    else LW = LH * ratio
    const cx = (Math.min(...lons) + Math.max(...lons)) / 2
    const cy = lat0
    // Arrondi à 3 décimales : le serveur et le navigateur calculent cos() à un ulp près (sinon : hydratation différente).
    const arr = (v: number) => Math.round(v * 1000) / 1000
    const pos = (lat: number, lon: number) => ({ x: arr(50 + (((lon - cx) * k) / LW) * 100), y: arr(50 - ((lat - cy) / LH) * 100) })
    return { pos }
  }, [epingles])

  useEffect(() => {
    if (toile.current) dessinerRelief(toile.current)
  }, [])

  // Le tilt suit le scroll (scrub pur) : la carte se redresse à mesure qu'on descend.
  useEffect(() => {
    const el = racine.current
    if (!el) return
    let vivant = true
    import('@/lib/gsap').then(({ ScrollTrigger, initGsap }) => {
      if (!vivant) return
      initGsap()
      const st = ScrollTrigger.create({
        trigger: el,
        start: 'top 80%',
        end: 'bottom 10%',
        scrub: true,
        onUpdate: (self) => el.style.setProperty('--carte-p', self.progress.toFixed(4)),
      })
      ;(el as unknown as { __st?: { kill: () => void } }).__st = st
    })
    return () => {
      vivant = false
      ;(el as unknown as { __st?: { kill: () => void } }).__st?.kill()
    }
  }, [])

  const cible = epingles.find((e) => e.role === 'cible')
  const c = cible ? cadre.pos(cible.lat, cible.lon) : { x: 50, y: 50 }
  return (
    <div ref={racine} className="su-carte" role="group" aria-label={libelle}>
      <div className="su-carte__scene">
        <div className="su-carte__plan">
          <canvas ref={toile} width={720} height={540} className="su-carte__relief" aria-hidden="true" />
          <svg className="su-carte__liens" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
            {epingles
              .filter((e) => e.role === 'voisin')
              .map((e, i) => {
                const p = cadre.pos(e.lat, e.lon)
                return <path key={e.id} d={`M${c.x} ${c.y} L${p.x} ${p.y}`} pathLength={1} className="su-carte__lien" style={{ '--i': i } as React.CSSProperties} vectorEffect="non-scaling-stroke" />
              })}
          </svg>
          {epingles.map((e, i) => {
            const p = cadre.pos(e.lat, e.lon)
            const contenu = (
              <>
                <span className="su-carte__pilier" />
                <span className="su-carte__point" />
                <span className="su-carte__nom">{e.nom}</span>
              </>
            )
            const style = { left: `${p.x}%`, top: `${p.y}%`, '--i': i } as React.CSSProperties
            return e.href && e.role !== 'cible' ? (
              <Link key={e.id} href={e.href} className="su-carte__ville" data-role={e.role} style={style}>
                {contenu}
              </Link>
            ) : (
              <span key={e.id} className="su-carte__ville" data-role={e.role} style={style}>
                {e.role === 'cible' && <span className="su-carte__onde" />}
                {contenu}
              </span>
            )
          })}
        </div>
      </div>
    </div>
  )
}
