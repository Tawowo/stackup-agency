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
import { ENTREES, RESSOURCES } from './entrees'


export default function Nav() {
  const panneau = useRef<HTMLDivElement>(null)
  const bouton = useRef<HTMLButtonElement>(null)
  const ress = useRef<HTMLDivElement>(null)
  const [ressEtat, setRessEtat] = useState({ chemin: '', ouvert: false })
  const chemin = usePathname()
  // L'état d'ouverture est lié à la route : naviguer referme le menu sans effet.
  const [etat, setEtat] = useState({ chemin, ouvert: false })
  const ouvert = etat.chemin === chemin && etat.ouvert
  // Le menu Ressources se referme quand la route change.
  const ressOuvert = ressEtat.chemin === chemin && ressEtat.ouvert
  const setRessOuvert = (f: boolean | ((o: boolean) => boolean)) => setRessEtat((e) => ({ chemin, ouvert: typeof f === 'function' ? f(e.chemin === chemin && e.ouvert) : f }))
  const setOuvert = (f: boolean | ((o: boolean) => boolean)) =>
    setEtat((e) => ({ chemin, ouvert: typeof f === 'function' ? f(e.chemin === chemin && e.ouvert) : f }))

  // Menu Ressources : Échap et clic à l'extérieur le referment.
  useEffect(() => {
    if (!ressOuvert) return
    const echap = (e: KeyboardEvent) => e.key === 'Escape' && setRessEtat((x) => ({ ...x, ouvert: false }))
    const dehors = (e: MouseEvent) => {
      if (ress.current && !ress.current.contains(e.target as Node)) setRessEtat((x) => ({ ...x, ouvert: false }))
    }
    document.addEventListener('keydown', echap)
    document.addEventListener('mousedown', dehors)
    return () => {
      document.removeEventListener('keydown', echap)
      document.removeEventListener('mousedown', dehors)
    }
  }, [ressOuvert])

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

  // Dès qu'on a quitté le haut de page, la barre pose un voile du fond courant
  // derrière elle : le texte qui défile ne passe jamais sous le logo ni le menu.
  const nav = useRef<HTMLElement>(null)
  useEffect(() => {
    const el = nav.current
    if (!el) return
    const lire = () => (el.dataset.defile = window.scrollY > 40 ? '1' : '0')
    lire()
    window.addEventListener('scroll', lire, { passive: true })
    return () => window.removeEventListener('scroll', lire)
  }, [chemin])

  return (
    <header ref={nav} className="su-nav" data-ouvert={ouvert ? '1' : '0'}>
      <div className="su-nav__barre">
        <Link href="/" className="su-nav__logo su-logo-plaque" aria-label="Stackup Agency, accueil">
          <LogoMarque taille={34} />
        </Link>
        <nav className="su-nav__entrees" aria-label="Navigation principale">
          {ENTREES.map((e) => (
            <Link key={e.href} href={e.href} className="su-nav__lien" aria-current={chemin === e.href ? 'page' : undefined}>
              {e.nom}
            </Link>
          ))}
          <div className="su-nav__ress" ref={ress} onBlur={(e) => !e.currentTarget.contains(e.relatedTarget) && setRessOuvert(false)}>
            <button
              type="button"
              className="su-nav__lien su-nav__ress-bouton"
              aria-expanded={ressOuvert}
              aria-controls="su-ress"
              data-actif={RESSOURCES.some((r) => chemin.startsWith(r.href)) ? '1' : '0'}
              onClick={() => setRessOuvert((o) => !o)}
            >
              Ressources
              <svg viewBox="0 0 10 6" width="10" height="6" aria-hidden="true">
                <path d="M1 1l4 4 4-4" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <ul id="su-ress" className="su-nav__ress-liste" inert={!ressOuvert}>
              {RESSOURCES.map((r, i) => (
                <li key={r.href} style={{ '--i': i } as React.CSSProperties}>
                  <Link href={r.href} className="su-nav__ress-lien" onClick={() => setRessOuvert(false)}>
                    <b>{r.nom}</b>
                    <span>{r.ligne}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
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
          {[...ENTREES, ...RESSOURCES, { href: '/contact', nom: 'Parler de votre projet' }].map((e, i) => (
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
