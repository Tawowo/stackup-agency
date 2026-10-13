'use client'

/**
 * LE RÉSEAU — l'architecture d'un système de gestion, en mouvement.
 *
 * Troisième mécanisme de la page, volontairement distinct des deux autres :
 *
 *   le hero          → des points lumineux, discrets, en 3D
 *   l'anatomie       → des plans plats en perspective, du vrai HTML
 *   le réseau        → des TRAITS, continus, en Canvas 2D
 *
 * Une matière différente, pas le même effet reteinté. Un nuage de particules
 * ne dit rien d'un logiciel ; un graphe de modules reliés, où une donnée
 * circule d'un bout à l'autre, le dit littéralement.
 *
 * Ce qui est montré est une ARCHITECTURE, pas des résultats : des modules
 * métier et leurs liaisons. Aucun chiffre d'activité, aucun client, aucune
 * mesure de performance n'y figure — il n'y aurait rien de vrai à y mettre.
 *
 * Interactions :
 *  - le pointeur repousse les nœuds, qui reviennent à leur place par ressort ;
 *  - survoler ou focaliser un module éclaire son sous-graphe ;
 *  - la liste sous le canvas est la commande accessible : chaque module y est
 *    un bouton, et le canvas n'est qu'une illustration.
 *
 * Replis : sans script, la liste des modules et leurs liaisons restent
 * lisibles en clair. Sous mouvement réduit, le graphe est dessiné une fois,
 * sans circulation ni ressort.
 */

import { useEffect, useRef, useState } from 'react'

interface Module {
  cle: string
  nom: string
  /** Position de repos, en coordonnées relatives 0–1. */
  x: number
  y: number
  role: string
}

const MODULES: Module[] = [
  { cle: 'devis', nom: 'Devis', x: 0.16, y: 0.28, role: 'Édition, envoi, relance, acceptation.' },
  { cle: 'clients', nom: 'Clients', x: 0.3, y: 0.08, role: 'Fiches, historique, coordonnées.' },
  { cle: 'planning', nom: 'Planning', x: 0.52, y: 0.2, role: 'Interventions, disponibilités, rappels.' },
  { cle: 'interventions', nom: 'Interventions', x: 0.5, y: 0.56, role: 'Suivi de terrain, pièces jointes, statuts.' },
  { cle: 'factures', nom: 'Factures', x: 0.74, y: 0.42, role: 'Émission, échéances, règlements.' },
  { cle: 'stock', nom: 'Stock', x: 0.26, y: 0.72, role: 'Entrées, sorties, seuils d’alerte.' },
  { cle: 'documents', nom: 'Documents', x: 0.83, y: 0.7, role: 'Modèles, archives, export comptable.' },
  { cle: 'tableau', nom: 'Tableau de bord', x: 0.68, y: 0.88, role: 'Vue d’ensemble, filtres, recherche.' },
]

/** Liaisons réelles entre modules : ce qui circule, et dans quel sens. */
const LIENS: [string, string][] = [
  ['clients', 'devis'],
  ['devis', 'planning'],
  ['planning', 'interventions'],
  ['interventions', 'factures'],
  ['interventions', 'stock'],
  ['factures', 'documents'],
  ['clients', 'planning'],
  ['stock', 'interventions'],
  ['factures', 'tableau'],
  ['interventions', 'tableau'],
  ['devis', 'factures'],
  ['documents', 'tableau'],
]

interface Noeud extends Module {
  px: number
  py: number
  vx: number
  vy: number
}

interface Paquet {
  lien: number
  t: number
  vitesse: number
}

export default function Reseau() {
  const hote = useRef<HTMLDivElement>(null)
  const toile = useRef<HTMLCanvasElement>(null)
  const [actif, setActif] = useState<string | null>(null)
  const actifRef = useRef<string | null>(null)
  actifRef.current = actif

  useEffect(() => {
    const canvas = toile.current
    const boite = hote.current
    if (!canvas || !boite) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const reduit = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const noeuds: Noeud[] = MODULES.map((m) => ({ ...m, px: 0, py: 0, vx: 0, vy: 0 }))
    const index = new Map(noeuds.map((n, i) => [n.cle, i]))
    const liens = LIENS.map(([a, b]) => [index.get(a)!, index.get(b)!] as const)
    const paquets: Paquet[] = liens.map((_, i) => ({
      lien: i,
      // Décalage initial réparti : sans lui, tous les paquets partent
      // ensemble et le réseau pulse au lieu de circuler.
      t: (i * 0.37) % 1,
      vitesse: 0.10 + ((i * 7) % 5) * 0.022,
    }))

    let l = 0
    let h = 0
    let dpr = 1

    function dimensionner() {
      const r = boite!.getBoundingClientRect()
      l = Math.max(r.width, 1)
      h = Math.max(r.height, 1)
      dpr = Math.min(window.devicePixelRatio || 1, 2)
      canvas!.width = Math.round(l * dpr)
      canvas!.height = Math.round(h * dpr)
      canvas!.style.width = `${l}px`
      canvas!.style.height = `${h}px`
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0)
      for (const n of noeuds) {
        // Marge intérieure : les étiquettes ne doivent pas sortir du cadre.
        n.px = 40 + n.x * (l - 80)
        n.py = 26 + n.y * (h - 52)
      }
    }
    dimensionner()
    const observateurTaille = new ResizeObserver(dimensionner)
    observateurTaille.observe(boite)

    const pointeur = { x: -9999, y: -9999, dedans: false }
    const surPointeur = (e: PointerEvent) => {
      if (e.pointerType === 'touch') return
      const r = canvas!.getBoundingClientRect()
      pointeur.x = e.clientX - r.left
      pointeur.y = e.clientY - r.top
      pointeur.dedans = true
    }
    const surSortie = () => {
      pointeur.dedans = false
      pointeur.x = -9999
      pointeur.y = -9999
    }
    boite.addEventListener('pointermove', surPointeur, { passive: true })
    boite.addEventListener('pointerleave', surSortie)

    // On ne dessine que quand la section est à l'écran : une boucle de rendu
    // qui tourne sous le pli consomme sans rien montrer.
    let visible = false
    const vigie = new IntersectionObserver(
      ([e]) => {
        visible = e.isIntersecting
      },
      { rootMargin: '120px' },
    )
    vigie.observe(boite)

    const OR = '245, 158, 11'
    const NAVY = '30, 58, 95'

    function relieA(i: number, cle: string | null) {
      if (!cle) return false
      const j = index.get(cle)
      if (j === undefined) return false
      if (i === j) return true
      return liens.some(([a, b]) => (a === i && b === j) || (b === i && a === j))
    }

    function peindre(dt: number) {
      const cle = actifRef.current
      ctx!.clearRect(0, 0, l, h)

      // ── Ressort vers la position de repos + répulsion au pointeur ──────
      if (!reduit) {
        for (const n of noeuds) {
          const cx = 40 + n.x * (l - 80)
          const cy = 26 + n.y * (h - 52)
          n.vx += (cx - n.px) * 0.0055
          n.vy += (cy - n.py) * 0.0055

          if (pointeur.dedans) {
            const dx = n.px - pointeur.x
            const dy = n.py - pointeur.y
            const d2 = dx * dx + dy * dy
            if (d2 < 26000 && d2 > 1) {
              const f = (1 - d2 / 26000) * 0.9
              const d = Math.sqrt(d2)
              n.vx += (dx / d) * f
              n.vy += (dy / d) * f
            }
          }
          n.vx *= 0.9
          n.vy *= 0.9
          n.px += n.vx * dt * 60
          n.py += n.vy * dt * 60
        }
      }

      // ── Les liaisons ──────────────────────────────────────────────────
      for (let i = 0; i < liens.length; i++) {
        const [a, b] = liens[i]
        const na = noeuds[a]
        const nb = noeuds[b]
        const eclaire = cle ? relieA(a, cle) && relieA(b, cle) : false
        ctx!.beginPath()
        ctx!.moveTo(na.px, na.py)
        // Courbe légère : des droites donnent un schéma, des courbes donnent
        // un système.
        const mx = (na.px + nb.px) / 2
        const my = (na.py + nb.py) / 2
        const ox = -(nb.py - na.py) * 0.12
        const oy = (nb.px - na.px) * 0.12
        ctx!.quadraticCurveTo(mx + ox, my + oy, nb.px, nb.py)
        ctx!.strokeStyle = eclaire
          ? `rgba(${OR}, 0.85)`
          : `rgba(${NAVY}, ${cle ? 0.1 : 0.3})`
        ctx!.lineWidth = eclaire ? 2 : 1.15
        ctx!.stroke()
      }

      // ── Les paquets qui circulent ─────────────────────────────────────
      if (!reduit) {
        for (const p of paquets) {
          p.t += p.vitesse * dt
          if (p.t > 1) p.t -= 1
          const [a, b] = liens[p.lien]
          const na = noeuds[a]
          const nb = noeuds[b]
          const mx = (na.px + nb.px) / 2 - (nb.py - na.py) * 0.12
          const my = (na.py + nb.py) / 2 + (nb.px - na.px) * 0.12
          // Une traînée : trois positions successives sur la courbe, de
          // plus en plus pâles. C'est elle qui donne la sensation de flux.
          for (let k = 0; k < 4; k++) {
            const t = Math.max(p.t - k * 0.035, 0)
            const u = 1 - t
            const x = u * u * na.px + 2 * u * t * mx + t * t * nb.px
            const y = u * u * na.py + 2 * u * t * my + t * t * nb.py
            const eclaire = cle ? relieA(a, cle) && relieA(b, cle) : false
            ctx!.beginPath()
            ctx!.arc(x, y, 3.2 - k * 0.6, 0, Math.PI * 2)
            ctx!.fillStyle = eclaire
              ? `rgba(${OR}, ${0.95 - k * 0.22})`
              : `rgba(${NAVY}, ${(cle ? 0.22 : 0.68) - k * 0.14})`
            ctx!.fill()
          }
        }
      }

      // ── Les nœuds ─────────────────────────────────────────────────────
      ctx!.font =
        '600 11px ui-monospace, SFMono-Regular, Menlo, monospace'
      ctx!.textAlign = 'center'
      ctx!.textBaseline = 'middle'
      for (let i = 0; i < noeuds.length; i++) {
        const n = noeuds[i]
        const vif = cle === n.cle
        const lie = relieA(i, cle)
        const r = vif ? 9 : 6

        ctx!.beginPath()
        ctx!.arc(n.px, n.py, r, 0, Math.PI * 2)
        ctx!.fillStyle = vif
          ? `rgba(${OR}, 1)`
          : lie
            ? `rgba(${OR}, 0.55)`
            : `rgba(${NAVY}, ${cle ? 0.2 : 0.6})`
        ctx!.fill()

        if (vif) {
          ctx!.beginPath()
          ctx!.arc(n.px, n.py, r + 7, 0, Math.PI * 2)
          ctx!.strokeStyle = `rgba(${OR}, 0.4)`
          ctx!.lineWidth = 1.2
          ctx!.stroke()
        }

        ctx!.fillStyle = vif
          ? `rgba(12, 22, 38, 1)`
          : `rgba(12, 22, 38, ${cle && !lie ? 0.25 : 0.72})`
        ctx!.fillText(n.nom, n.px, n.py - r - 11)
      }
    }

    // ── Pas FIXE avec accumulateur ──────────────────────────────────────
    //
    // Les ressorts étaient intégrés à `dt` variable. Sur une image longue —
    // un onglet qui revient au premier plan, un appareil qui rame — un pas
    // trop grand fait diverger l'intégration et les nœuds partent à
    // l'infini. Le défaut vient de la lecture de react-three-rapier, qui
    // borne le delta puis le consomme par tranches constantes.
    //
    // 1/120 s : deux sous-pas par image à 60 Hz, assez fin pour que le
    // ressort reste stable sans coûter de calcul visible sur huit nœuds.
    const PAS = 1 / 120
    let accumulateur = 0
    let image = 0
    let dernier = performance.now()
    function boucle(maintenant: number) {
      image = requestAnimationFrame(boucle)
      const brut = (maintenant - dernier) / 1000
      dernier = maintenant
      if (!visible) {
        // On ne laisse pas l'accumulateur gonfler hors écran : au retour,
        // il rattraperait des centaines de pas d'un coup.
        accumulateur = 0
        return
      }
      accumulateur += Math.min(brut, 0.25)
      let sous = 0
      while (accumulateur >= PAS && sous < 12) {
        peindre(PAS)
        accumulateur -= PAS
        sous++
      }
      if (sous === 0) peindre(0)
    }

    if (reduit) {
      // Une seule image : le schéma, sans circulation ni ressort.
      peindre(0)
    } else {
      image = requestAnimationFrame(boucle)
    }

    return () => {
      cancelAnimationFrame(image)
      vigie.disconnect()
      observateurTaille.disconnect()
      boite.removeEventListener('pointermove', surPointeur)
      boite.removeEventListener('pointerleave', surSortie)
    }
  }, [])

  return (
    <div className="su-reseau">
      <div ref={hote} className="su-reseau__scene">
        <canvas ref={toile} aria-hidden="true" />
      </div>

      {/* La commande accessible. Le canvas illustre ; c'est cette liste qui
          porte le contenu et qui se parcourt au clavier. */}
      <ul
        className="su-reseau__modules"
        onPointerLeave={() => {
          const el = document.activeElement
          if (!el?.classList.contains('su-reseau__module')) setActif(null)
        }}
        onKeyDown={(e) => {
          if (e.key === 'Escape') setActif(null)
        }}
      >
        {MODULES.map((m) => (
          <li key={m.cle}>
            <button
              type="button"
              className="su-reseau__module"
              aria-pressed={actif === m.cle}
              onPointerEnter={() => setActif(m.cle)}
              onFocus={() => setActif(m.cle)}
              onClick={() => setActif(m.cle)}
            >
              <span className="su-reseau__module-nom">{m.nom}</span>
              <span className="su-reseau__module-role">{m.role}</span>
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}
