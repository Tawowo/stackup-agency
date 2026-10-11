'use client'

/**
 * LA PALETTE — navigation clavier ⌘K / Ctrl+K.
 *
 * Écrite sur mesure, sans dépendance. Les bibliothèques de palette courantes
 * (cmdk, kbar) pèsent plus que l'intégralité de ce composant et imposent leur
 * propre modèle d'accessibilité ; ici le motif ARIA combobox est appliqué
 * directement et reste vérifiable.
 *
 * L'index et la recherche sont dans `@/lib/palette`, chargés par `import()`
 * à la première ouverture : tant que personne n'appuie sur ⌘K, ce composant
 * ne coûte que son écouteur clavier.
 */

import { useCallback, useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Search, CornerDownLeft, ArrowUp, ArrowDown } from 'lucide-react'
import type { EntreePalette } from '@/lib/palette'

export default function Palette() {
  const [ouverte, setOuverte] = useState(false)
  const [requete, setRequete] = useState('')
  const [resultats, setResultats] = useState<EntreePalette[]>([])
  const [actif, setActif] = useState(0)

  const champ = useRef<HTMLInputElement>(null)
  const liste = useRef<HTMLUListElement>(null)
  const chercher = useRef<typeof import('@/lib/palette').chercher | null>(null)
  const focusAvant = useRef<HTMLElement | null>(null)
  const router = useRouter()

  // ---- Raccourci global ----------------------------------------------------
  useEffect(() => {
    function surTouche(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault()
        setOuverte((o) => !o)
      }
    }
    // Un raccourci clavier que personne ne connaît n'existe pas : le bouton
    // de la barre de navigation ouvre la palette par cet événement.
    function surDemande() {
      setOuverte(true)
    }

    window.addEventListener('keydown', surTouche)
    window.addEventListener('su:palette', surDemande)
    return () => {
      window.removeEventListener('keydown', surTouche)
      window.removeEventListener('su:palette', surDemande)
    }
  }, [])

  // ---- Chargement de l'index à la première ouverture -----------------------
  useEffect(() => {
    if (!ouverte) return
    let annule = false

    // Mémorise le focus pour le rendre à la fermeture : sans cela, un
    // utilisateur au clavier repart en haut du document.
    focusAvant.current = document.activeElement as HTMLElement | null

    import('@/lib/palette').then((mod) => {
      if (annule) return
      chercher.current = mod.chercher
      setResultats(mod.chercher(''))
    })

    // Verrouille le défilement de l'arrière-plan sans décalage de mise en page.
    const largeurBarre = window.innerWidth - document.documentElement.clientWidth
    const overflowAvant = document.body.style.overflow
    const paddingAvant = document.body.style.paddingRight
    document.body.style.overflow = 'hidden'
    if (largeurBarre > 0) document.body.style.paddingRight = `${largeurBarre}px`

    return () => {
      annule = true
      document.body.style.overflow = overflowAvant
      document.body.style.paddingRight = paddingAvant
      focusAvant.current?.focus?.()
    }
  }, [ouverte])

  useEffect(() => {
    if (ouverte) champ.current?.focus()
    else {
      setRequete('')
      setActif(0)
    }
  }, [ouverte])

  const surSaisie = useCallback((valeur: string) => {
    setRequete(valeur)
    setActif(0)
    if (chercher.current) setResultats(chercher.current(valeur))
  }, [])

  const naviguer = useCallback(
    (entree: EntreePalette | undefined) => {
      if (!entree) return
      setOuverte(false)
      router.push(entree.href)
    },
    [router],
  )

  function surToucheChamp(e: React.KeyboardEvent) {
    if (e.key === 'Escape') {
      e.preventDefault()
      setOuverte(false)
    } else if (e.key === 'ArrowDown') {
      e.preventDefault()
      setActif((i) => (i + 1) % Math.max(resultats.length, 1))
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setActif((i) => (i - 1 + resultats.length) % Math.max(resultats.length, 1))
    } else if (e.key === 'Enter') {
      e.preventDefault()
      naviguer(resultats[actif])
    } else if (e.key === 'Home') {
      e.preventDefault()
      setActif(0)
    } else if (e.key === 'End') {
      e.preventDefault()
      setActif(Math.max(resultats.length - 1, 0))
    }
  }

  // Garde l'élément actif visible quand on parcourt au clavier.
  useEffect(() => {
    liste.current?.children[actif]?.scrollIntoView({ block: 'nearest' })
  }, [actif])

  if (!ouverte) return null

  return (
    <div
      className="su-palette"
      role="presentation"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) setOuverte(false)
      }}
    >
      <div
        className="su-palette__boite"
        role="dialog"
        aria-modal="true"
        aria-label="Recherche rapide dans le site"
      >
        <div className="su-palette__champ">
          <Search size={18} aria-hidden="true" className="text-[#64748B] shrink-0" />
          <input
            ref={champ}
            type="text"
            value={requete}
            onChange={(e) => surSaisie(e.target.value)}
            onKeyDown={surToucheChamp}
            placeholder="Rechercher une page, un service, une ville…"
            aria-label="Rechercher"
            aria-autocomplete="list"
            aria-controls="su-palette-liste"
            aria-activedescendant={resultats[actif] ? `su-palette-${actif}` : undefined}
            role="combobox"
            aria-expanded="true"
            autoComplete="off"
            spellCheck={false}
          />
          <kbd className="su-palette__kbd">esc</kbd>
        </div>

        <ul
          ref={liste}
          id="su-palette-liste"
          role="listbox"
          aria-label="Résultats"
          className="su-palette__liste"
        >
          {resultats.length === 0 && (
            <li className="su-palette__vide" role="presentation">
              Aucun résultat pour « {requete} »
            </li>
          )}
          {resultats.map((entree, i) => (
            <li
              key={entree.href}
              id={`su-palette-${i}`}
              role="option"
              aria-selected={i === actif}
              className={`su-palette__item ${i === actif ? 'est-actif' : ''}`}
              onMouseEnter={() => setActif(i)}
              onMouseDown={(e) => {
                e.preventDefault()
                naviguer(entree)
              }}
            >
              <span className="su-palette__titre">{entree.titre}</span>
              <span className="su-palette__cat">{entree.categorie}</span>
            </li>
          ))}
        </ul>

        <div className="su-palette__pied">
          <span><ArrowUp size={11} aria-hidden="true" /><ArrowDown size={11} aria-hidden="true" /> naviguer</span>
          <span><CornerDownLeft size={11} aria-hidden="true" /> ouvrir</span>
          <span>esc fermer</span>
        </div>
      </div>
    </div>
  )
}
