'use client'
/**
 * MOMENT 01 — LES STRATES. Mécanisme : DÉCOUPE.
 * « Un site, c'est cinq couches. » Épinglé sur 250 vh : la pile se découpe en
 * cinq lamelles qui s'écartent une à une (retard par lamelle), étiquetées à
 * gauche ; clic / tap / touches 1-5 isolent une strate ; à la fin les lamelles
 * se referment en une seule plaque épaisse.
 */
import { useEffect, useRef, useState } from 'react'
import StackFrame from '@/webgl/StackFrame'
import { stackUniforms } from '@/webgl/engine'
import { useScene } from '@/webgl/store'
import { gsap, ScrollTrigger, SplitText, initGsap } from '@/lib/gsap'
import './strates.css'

export const COUCHES = [
  { num: '01', nom: 'Design', ligne: 'Ce que vos clients voient.', texte: 'Une mise en page dessinée pour votre métier, pas un thème acheté. Vos couleurs, vos photos, votre ton.' },
  { num: '02', nom: 'Contenu', ligne: 'Ce qu’ils lisent.', texte: 'Les textes et les pages qui répondent aux questions de vos clients, écrits avec vous, pensés pour les moteurs de recherche.' },
  { num: '03', nom: 'Code', ligne: 'Ce qui fait tout tenir.', texte: 'Le site est construit à la main, sans extension ni abonnement. Il est rapide, et il vous appartient.' },
  { num: '04', nom: 'Données', ligne: 'Vos clients, vos commandes, vos rendez-vous.', texte: 'Formulaires, commandes, rendez-vous : vos informations restent chez vous, exportables à tout moment.' },
  { num: '05', nom: 'Hébergement et nom de domaine', ligne: 'Ce qui le rend accessible.', texte: 'Mise en ligne, nom de domaine, certificat, sauvegardes : douze mois inclus, puis vous décidez.' },
]

export default function Strates() {
  const section = useRef<HTMLElement>(null)
  const scene = useRef<HTMLDivElement>(null)
  const titre = useRef<HTMLHeadingElement>(null)
  const [isole, setIsole] = useState(-1)
  const [p, setP] = useState(0)

  useEffect(() => {
    initGsap()
    const el = section.current
    const st = scene.current
    const h2 = titre.current
    if (!el || !st || !h2) return
    const u = stackUniforms()
    const reduit = useScene.getState().reduced
    const mobile = window.innerWidth < 768

    const split = new SplitText(h2, { type: 'words', wordsClass: 'su-str__mot' })
    const ctx = gsap.context(() => {
      if (!reduit) {
        gsap.set(split.words, { rotateX: -90, transformOrigin: '50% 100%' })
        gsap.to(split.words, {
          rotateX: 0,
          duration: 0.62,
          ease: 'power3.out',
          stagger: 0.07,
          scrollTrigger: { trigger: h2, start: 'top 85%' },
        })
      }
      // La scène : pile → strates ouvertes (une à une), puis ouvertes → refermées.
      let phase: 'ouvre' | 'ferme' | null = null
      const poser = (ph: 'ouvre' | 'ferme') => {
        const s = useScene.getState()
        if (phase === ph && s.moment === '01') return
        phase = ph
        s.setMoment('01')
        if (reduit) return
        s.setPose({ x: 0.5, y: -0.22 })
        s.setProjection(0.5)
        s.setNuit(1)
        s.setScrub(true)
        if (ph === 'ouvre') s.setPair('pile', 'strates', { b: { ouverture: 1 } })
        else s.setPair('strates', 'strates', { a: { ouverture: 1 }, b: { ouverture: 0 } })
      }
      // La phase ne dépend que de la progression : l'ordre des rappels
      // (onEnter / onUpdate) n'a pas d'importance, même sur un saut.
      const appliquer = (q: number) => {
        setP(q)
        el.style.setProperty('--su-p', q.toFixed(4))
        if (reduit) {
          poser('ouvre')
          return
        }
        if (q < 0.8) {
          poser('ouvre')
          u.uMorph.value = Math.min(1, q / 0.6)
        } else {
          poser('ferme')
          u.uMorph.value = (q - 0.8) / 0.2
        }
      }
      if (reduit) {
        // Mouvement réduit : pas d'épinglage, tout est posé ; la section ne
        // fait que prendre la main sur la scène (logo figé) en entrant.
        appliquer(1)
        ScrollTrigger.create({ trigger: el, start: 'top 60%', end: 'bottom 40%', onEnter: () => poser('ouvre'), onEnterBack: () => poser('ouvre') })
        return
      }
      ScrollTrigger.create({
        trigger: el,
        start: 'top top',
        end: () => `+=${Math.round(window.innerHeight * (mobile ? 1.5 : 2.5))}`,
        pin: st,
        scrub: 0.6,
        onEnter: (self) => appliquer(self.progress),
        onEnterBack: (self) => appliquer(self.progress),
        onUpdate: (self) => appliquer(self.progress),
      })
    }, el)

    // Clavier : 1-5 isole, Échap revient. Désactivé dans les champs.
    const key = (e: KeyboardEvent) => {
      const t = e.target as HTMLElement | null
      if (t && (t.tagName === 'INPUT' || t.tagName === 'TEXTAREA' || t.isContentEditable)) return
      const r = el.getBoundingClientRect()
      if (r.bottom < 0 || r.top > window.innerHeight) return
      if (e.key >= '1' && e.key <= '5') setIsole(Number(e.key) - 1)
      if (e.key === 'Escape') setIsole(-1)
    }
    window.addEventListener('keydown', key)
    return () => {
      window.removeEventListener('keydown', key)
      ctx.revert()
      split.revert()
      useScene.getState().setIsolate(-1)
    }
  }, [])

  useEffect(() => {
    useScene.getState().setIsolate(isole)
  }, [isole])

  const choisir = (k: number) => setIsole((cur) => (cur === k ? -1 : k))

  return (
    <section ref={section} className="su-str" data-moment="01" id="strates" aria-labelledby="su-str-titre">
      <div ref={scene} className="su-str__scene">
        <div className="su-str__grille">
          <header className="su-str__tete">
            <p className="su-mono su-str__etiquette">01 — Les strates</p>
            <h2 ref={titre} id="su-str-titre" className="su-display su-str__titre">
              Un site, c’est cinq couches.
            </h2>
          </header>
          <div className="su-str__cadre-zone">
            <StackFrame className="su-str__cadre" />
          </div>
          <ol className="su-str__liste" aria-label="Les cinq couches">
            {COUCHES.map((c, k) => (
              <li key={c.num} className="su-str__couche" data-isole={isole === k ? '1' : isole === -1 ? '' : '0'} data-ouverte={p > 0.08 + k * 0.11 ? '1' : '0'}>
                <button type="button" className="su-str__bouton" aria-pressed={isole === k} onClick={() => choisir(k)} data-curseur="Isoler">
                  <span className="su-mono su-str__num">{c.num}</span>
                  <span className="su-str__nom">{c.nom}</span>
                  <span className="su-str__ligne">{c.ligne}</span>
                </button>
                <p className="su-str__texte">{c.texte}</p>
              </li>
            ))}
          </ol>
          <p className="su-str__fin" data-visible={p > 0.86 ? '1' : '0'}>
            <span className="su-display">Nous fabriquons les cinq.</span>
            <span className="su-str__fin-ligne">Vous êtes propriétaire des cinq.</span>
          </p>
        </div>
      </div>
    </section>
  )
}
