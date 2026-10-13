'use client'
/**
 * NAV — logo exact à gauche, cinq entrées, action. Suit `--su-nuit`.
 * Menu mobile : panneau en strates (chaque entrée une lamelle qui se déplie),
 * `inert` quand fermé, focus piégé, Échap pour fermer.
 */
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import LogoMarque from '@/components/ui/LogoMarque'
import Action from '@/components/ui/Action'

export const ENTREES = [
  { href: '/realisations', nom: 'Réalisations' },
  { href: '/services', nom: 'Services' },
  { href: '/solutions', nom: 'Outils de gestion' },
  { href: '/tarifs', nom: 'Tarifs' },
  { href: '/a-propos', nom: 'À propos' },
]

export default function Nav() {
  const panneau = useRef<HTMLDivElement>(null)
  const bouton = useRef<HTMLButtonElement>(null)
  const chemin = usePathname()
  // L'état d'ouverture est lié à la route : naviguer referme le menu sans effet.
  const [etat, setEtat] = useState({ chemin, ouvert: false })
  const ouvert = etat.chemin === chemin && etat.ouvert
  const setOuvert = (f: boolean | ((o: boolean) => boolean)) =>
    setEtat((e) => ({ chemin, ouvert: typeof f === 'function' ? f(e.chemin === chemin && e.ouvert) : f }))

  // Focus piégé + Échap.
  useEffect(() => {
    if (!ouvert) return
    const el = panneau.current
    if (!el) return
    const focusables = () => Array.from(el.querySelectorAll<HTMLElement>('a, button'))
    focusables()[0]?.focus()
    const key = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setEtat((et) => ({ ...et, ouvert: false }))
        bouton.current?.focus()
      }
      if (e.key === 'Tab') {
        const f = focusables()
        const premier = f[0]
        const dernier = f[f.length - 1]
        if (!premier || !dernier) return
        if (e.shiftKey && document.activeElement === premier) {
          e.preventDefault()
          dernier.focus()
        } else if (!e.shiftKey && document.activeElement === dernier) {
          e.preventDefault()
          premier.focus()
        }
      }
    }
    document.addEventListener('keydown', key)
    return () => document.removeEventListener('keydown', key)
  }, [ouvert])

  return (
    <header className="su-nav" data-ouvert={ouvert ? '1' : '0'}>
      <div className="su-nav__barre">
        <Link href="/" className="su-nav__logo" aria-label="Stackup Agency, accueil" data-curseur="Accueil">
          <LogoMarque taille={34} />
        </Link>
        <nav className="su-nav__entrees" aria-label="Navigation principale">
          {ENTREES.map((e) => (
            <Link key={e.href} href={e.href} className="su-nav__lien" aria-current={chemin === e.href ? 'page' : undefined} data-curseur="Voir">
              {e.nom}
            </Link>
          ))}
        </nav>
        <div className="su-nav__action">
          <Action href="/contact" variante="contour" mot="Écrire">
            Parler de votre projet
          </Action>
        </div>
        <button
          ref={bouton}
          type="button"
          className="su-nav__menu su-mono"
          aria-expanded={ouvert}
          aria-controls="su-menu"
          onClick={() => setOuvert((o) => !o)}
        >
          {ouvert ? 'Fermer' : 'Menu'}
        </button>
      </div>
      <div id="su-menu" ref={panneau} className="su-nav__panneau" inert={!ouvert}>
        <ul className="su-nav__strates">
          {[...ENTREES, { href: '/contact', nom: 'Parler de votre projet' }].map((e, i) => (
            <li key={e.href} className="su-nav__strate" style={{ '--i': i } as React.CSSProperties}>
              <Link href={e.href} className="su-display su-nav__strate-lien" aria-current={chemin === e.href ? 'page' : undefined}>
                <span className="su-mono su-nav__num">0{i + 1}</span>
                {e.nom}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </header>
  )
}
