'use client'
/**
 * MOMENT 02 — L'OFFRE. Mécanisme : MÉTAMORPHOSE. La lumière s'allume (ivoire).
 * Quatre offres, chacune une vraie mini-maquette dans une fenêtre de navigateur :
 * une page d'accueil d'artisan, trois pages en éventail, une boutique dont le
 * panier se remplit, un tableau de bord. Les mêmes dix dalles de matière glissent
 * d'une maquette à l'autre, puis s'ouvrent sur l'interface réelle (découpe).
 * Sélecteur clavier / tap ; rotation automatique jusqu'à la première interaction.
 */
import { useEffect, useRef, useState } from 'react'
import { gsap, initGsap } from '@/lib/gsap'
import Action from '@/components/ui/Action'
import Cadran from '@/components/ui/Cadran'
import Fiche from '@/components/ui/Fiche'
import Morph from '@/components/maquettes/Morph'
import { useScene } from '@/webgl/store'
import { EMPLACEMENTS, EMPLACEMENT_VIDE, URLS } from './emplacements'
import { OFFRES_SCENE, offreDe } from './offres'
import './offre.css'

export default function Offre() {
  const section = useRef<HTMLElement>(null)
  const [actif, setActif] = useState(0)
  const [interagi, setInteragi] = useState(false)
  const [visible, setVisible] = useState(false)
  const [prete, setPrete] = useState('')
  const [pan, setPan] = useState({ cle: '', n: 0 })
  const tabs = useRef<(HTMLButtonElement | null)[]>([])
  const o = OFFRES_SCENE[actif]!
  const offre = offreDe(o.id)
  // La clé d'un état « posé » : changer d'offre ou sortir du champ referme les dalles.
  const cle = `${actif}-${visible ? 1 : 0}`
  const pret = visible && prete === cle
  const panier = pan.cle === cle ? pan.n : 0

  useEffect(() => {
    initGsap()
    const el = section.current
    if (!el) return
    const io = new IntersectionObserver(([e]) => setVisible(!!e?.isIntersecting && (e?.intersectionRatio ?? 0) > 0.3), { threshold: [0, 0.3, 0.6] })
    io.observe(el)
    const st = useScene.getState()
    const prise = () => st.setMoment('02')
    prise()
    return () => io.disconnect()
  }, [])

  // Les dalles prennent leur place, puis s'ouvrent sur l'interface (découpe).
  useEffect(() => {
    if (!visible) return
    const reduit = useScene.getState().reduced
    const d = gsap.delayedCall(reduit ? 0 : 1, () => setPrete(cle))
    return () => {
      d.kill()
    }
  }, [cle, visible])

  // La boutique : le panier se remplit, article après article, puis se vide.
  useEffect(() => {
    if (!pret || o.maquette !== 'boutique') return
    let n = 0
    const d = gsap.delayedCall(1, function suite() {
      n = n >= 5 ? 0 : n + 1
      setPan({ cle, n })
      d.restart(true).duration(n === 5 ? 2.6 : 1.1)
    })
    return () => {
      d.kill()
    }
  }, [pret, o.maquette, cle])

  // Rotation automatique tant que personne n'a interagi.
  useEffect(() => {
    if (interagi || !pret) return
    const d = gsap.delayedCall(o.maquette === 'boutique' ? 9 : 6, () => setActif((a) => (a + 1) % OFFRES_SCENE.length))
    return () => {
      d.kill()
    }
  }, [actif, interagi, pret, o.maquette])

  const choisir = (k: number) => {
    setInteragi(true)
    setActif(k)
  }
  const clavier = (e: React.KeyboardEvent) => {
    const n = OFFRES_SCENE.length
    if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
      e.preventDefault()
      const k = (actif + 1) % n
      choisir(k)
      tabs.current[k]?.focus()
    }
    if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
      e.preventDefault()
      const k = (actif - 1 + n) % n
      choisir(k)
      tabs.current[k]?.focus()
    }
  }

  return (
    <section ref={section} className="su-off" data-moment="02" data-nuit="0" data-titre="L’offre" id="offre" aria-labelledby="su-off-titre">
      <div className="su-off__grille">
        <header className="su-off__tete">
          <p className="su-mono su-off__etiquette">02 — L’offre</p>
          <h2 id="su-off-titre" className="su-display su-off__titre">
            Ce qu’on
            <br />
            fabrique.
          </h2>
        </header>
        <div className="su-off__selecteur" role="tablist" aria-label="Les offres" aria-orientation="vertical" onKeyDown={clavier}>
          {OFFRES_SCENE.map((s, k) => {
            const of = offreDe(s.id)
            return (
              <button
                key={s.id}
                ref={(r) => {
                  tabs.current[k] = r
                }}
                type="button"
                role="tab"
                id={`su-off-tab-${s.id}`}
                aria-selected={k === actif}
                aria-controls="su-off-panneau"
                tabIndex={k === actif ? 0 : -1}
                className="su-plaque su-off__onglet"
                data-actif={k === actif ? '1' : '0'}
                onClick={() => choisir(k)}
              >
                <span className="su-mono su-off__num">0{k + 1}</span>
                <span className="su-off__nom">{of.nom}</span>
              </button>
            )
          })}
        </div>
        <div className="su-off__scene" aria-hidden="true">
          <Morph emplacements={visible ? EMPLACEMENTS[o.maquette] : EMPLACEMENT_VIDE} pret={pret} url={URLS[o.maquette]} ctx={{ panier, uid: 'off' }} className="su-off__fenetre" />
        </div>
        <div className="su-off__panneau" id="su-off-panneau" role="tabpanel" aria-labelledby={`su-off-tab-${o.id}`}>
          <p className="su-off__prix">
            <Cadran valeur={offre.aPartirDe} prefixe="à partir de" suffixe="€" className="su-off__cadran" />
          </p>
          <Fiche lignes={o.fiche} className="su-off__fiche" />
          <Action href={`/tarifs#${o.id}`} mot="Détailler">
            Détailler cette offre
          </Action>
        </div>
      </div>
    </section>
  )
}
