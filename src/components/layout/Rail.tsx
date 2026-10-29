'use client'
/**
 * LE RAIL DE PROFONDEUR — la descente d'un coup d'œil : un repère vertical
 * fixe à gauche (≥ 1360 px) qui liste les moments de l'accueil, marque celui
 * qui occupe le centre du viewport (IntersectionObserver, bande −45 % / −50 %)
 * et y emmène au clic (défilement natif) ou au clavier. Les moments sont lus dans le DOM
 * (`[data-moment][data-titre]`) : rien à maintenir à deux endroits.
 */
import { useEffect, useState } from 'react'

interface Etage {
  id: string
  num: string
  titre: string
}

export default function Rail() {
  const [etages, setEtages] = useState<Etage[]>([])
  const [actif, setActif] = useState('00')

  useEffect(() => {
    const els = Array.from(document.querySelectorAll<HTMLElement>('[data-moment][data-titre]'))
    const liste = els.map((el) => ({ id: el.dataset.moment!, num: el.dataset.moment!, titre: el.dataset.titre! }))
    // Posé une fois, après le montage des moments (ils sont rendus avant le rail).
    const t = setTimeout(() => setEtages(liste), 0)
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setActif((e.target as HTMLElement).dataset.moment ?? '00')
      },
      { rootMargin: '-45% 0px -50% 0px', threshold: 0 },
    )
    els.forEach((el) => io.observe(el))
    return () => {
      clearTimeout(t)
      io.disconnect()
    }
  }, [])

  const aller = (id: string) => {
    const el = document.querySelector<HTMLElement>(`[data-moment="${id}"]`)
    if (!el) return
    el.scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth', block: 'start' })
  }

  if (!etages.length) return null
  return (
    <nav className="su-rail" aria-label="Les moments de la page">
      <ol className="su-rail__liste">
        {etages.map((e) => (
          <li key={e.id} className="su-rail__etage" data-actif={e.id === actif ? '1' : '0'}>
            <button type="button" className="su-rail__bouton" onClick={() => aller(e.id)} aria-current={e.id === actif ? 'true' : undefined}>
              <span className="su-rail__cran" aria-hidden="true" />
              <span className="su-mono su-rail__num">{e.num}</span>
              <span className="su-rail__titre">{e.titre}</span>
            </button>
          </li>
        ))}
      </ol>
    </nav>
  )
}
