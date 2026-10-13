'use client'
/**
 * MAQUETTE ANIMÉE d'un module : un écran stylisé (liste, chiffre en cadran,
 * statut qui change tout seul en boucle lente). Ce n'est pas un logiciel :
 * rien n'est saisissable, rien n'est calculé. Assemblée par découpe.
 */
import { useEffect, useState } from 'react'
import Cadran from '@/components/ui/Cadran'
import { gsap } from '@/lib/gsap'
import { MAQUETTES, MODULES } from './modules'

export default function MaquetteModule({ slug }: { slug: string }) {
  const m = MAQUETTES[slug]!
  const mod = MODULES.find((x) => x.slug === slug)!
  // Le composant est re-monté par `key={slug}` : le statut repart de 0 sans effet.
  const [statut, setStatut] = useState(0)
  useEffect(() => {
    const d = gsap.delayedCall(2.4, function boucle() {
      setStatut((s) => (s + 1) % m.statuts.length)
      d.restart(true)
    })
    return () => {
      d.kill()
    }
  }, [slug, m.statuts.length])
  return (
    <div className="su-mac__ecran" key={slug} aria-label={`Maquette du module ${mod.nom}`}>
      <div className="su-mac__barre" style={{ '--k': 0 } as React.CSSProperties}>
        <span className="su-mono">{mod.court}</span>
        <span className="su-mac__statut su-mono" data-statut={statut}>
          {m.statuts[statut]}
        </span>
      </div>
      <p className="su-mac__chiffre" style={{ '--k': 1 } as React.CSSProperties}>
        <Cadran valeur={m.chiffre} className="su-mac__cadran" />
        <span className="su-mac__unite">{m.unite}</span>
      </p>
      <ul className="su-mac__liste">
        {m.lignes.map((l, i) => (
          <li key={l} style={{ '--k': 2 + i } as React.CSSProperties}>
            <span className="su-mac__puce" data-on={i === statut % m.lignes.length ? '1' : '0'} />
            {l}
          </li>
        ))}
      </ul>
      <ul className="su-mac__fonctions" aria-label="Fonctions">
        {mod.fonctions.map((f, i) => (
          <li key={f} className="su-mono" style={{ '--k': 5 + i } as React.CSSProperties}>
            {f}
          </li>
        ))}
      </ul>
    </div>
  )
}
