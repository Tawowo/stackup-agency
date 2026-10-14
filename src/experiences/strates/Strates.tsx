'use client'
/**
 * MOMENT 01 — LES STRATES. Mécanisme : VUE ÉCLATÉE.
 * « Un site, c'est cinq couches. » Comme une vue éclatée d'iPhone : cinq
 * calques superposés en perspective, chacun montrant ce qu'il est (la maquette
 * colorée, les textes et photos, de vraies lignes de code, un tableau de
 * clients, l'adresse et le serveur). Épinglé : les calques se séparent, chacun
 * s'allume quand son titre est actif, puis ils se compressent en un seul
 * écran, le site fini, net, dans une fenêtre de navigateur. Clic (ou 1-5) sur
 * un calque : il sort de la pile et se présente de face.
 */
import { useEffect, useRef, useState } from 'react'
import { useScene } from '@/webgl/store'
import { gsap, ScrollTrigger, SplitText, initGsap } from '@/lib/gsap'
import { CalqueCode, CalqueContenu, CalqueDesign, CalqueDonnees, CalqueHebergement } from './calques'
import './strates.css'

export const COUCHES = [
  { num: '01', nom: 'Design', court: 'Design', ligne: 'Ce que vos clients voient.', texte: 'Une mise en page dessinée pour votre métier, pas un thème acheté. Vos couleurs, vos photos, votre ton.' },
  { num: '02', nom: 'Contenu', court: 'Contenu', ligne: 'Ce qu’ils lisent.', texte: 'Les textes et les pages qui répondent aux questions de vos clients, écrits avec vous, pensés pour les moteurs de recherche.' },
  { num: '03', nom: 'Code', court: 'Code', ligne: 'Ce qui fait tout tenir.', texte: 'Le site est construit à la main, sans extension ni abonnement. Il est rapide, et il vous appartient.' },
  { num: '04', nom: 'Données', court: 'Données', ligne: 'Vos clients, vos commandes, vos rendez-vous.', texte: 'Formulaires, commandes, rendez-vous : vos informations restent chez vous, exportables à tout moment.' },
  { num: '05', nom: 'Hébergement et nom de domaine', court: 'Hébergement', ligne: 'Ce qui le rend accessible.', texte: 'Mise en ligne, nom de domaine, certificat, sauvegardes : douze mois inclus, puis vous décidez.' },
]

const lisse = (a: number, b: number, x: number) => {
  const t = Math.min(1, Math.max(0, (x - a) / (b - a)))
  return t * t * (3 - 2 * t)
}

function Calque({ k, uid }: { k: number; uid: string }) {
  if (k === 0) return <CalqueDesign uid={uid} />
  if (k === 1) return <CalqueContenu uid={uid} />
  if (k === 2) return <CalqueCode />
  if (k === 3) return <CalqueDonnees />
  return <CalqueHebergement />
}

export default function Strates() {
  const section = useRef<HTMLElement>(null)
  const scene = useRef<HTMLDivElement>(null)
  const titre = useRef<HTMLHeadingElement>(null)
  const vue = useRef<HTMLDivElement>(null)
  const [isole, setIsole] = useState(-1)
  const [actifScroll, setActifScroll] = useState(-1)
  const [fini, setFini] = useState(false)

  useEffect(() => {
    initGsap()
    const el = section.current
    const st = scene.current
    const h2 = titre.current
    const v = vue.current
    if (!el || !st || !h2 || !v) return
    const reduit = useScene.getState().reduced
    const mobile = window.innerWidth < 768

    const split = new SplitText(h2, { type: 'words', wordsClass: 'su-str__mot', aria: 'none' })
    let dernierActif = -2
    let dernierFini = false
    const appliquer = (q: number) => {
      // Séparation (0,03 → 0,45), calques allumés un à un (0,1 → 0,82), fusion en un écran (0,84 → 0,98).
      const sep = lisse(0.03, 0.45, q)
      const fusion = lisse(0.84, 0.98, q)
      v.style.setProperty('--sep', sep.toFixed(4))
      v.style.setProperty('--face', fusion.toFixed(4))
      v.style.setProperty('--merge', fusion.toFixed(4))
      const k = q < 0.1 || q > 0.82 ? -1 : Math.min(4, Math.floor((q - 0.1) / 0.144))
      if (k !== dernierActif) {
        dernierActif = k
        setActifScroll(k)
      }
      const f = q > 0.9
      if (f !== dernierFini) {
        dernierFini = f
        setFini(f)
      }
    }
    const ctx = gsap.context(() => {
      if (!reduit) {
        gsap.set(split.words, { rotateX: -90, transformOrigin: '50% 100%' })
        gsap.to(split.words, {
          rotateX: 0,
          ease: 'power3.out',
          stagger: 0.12,
          scrollTrigger: { trigger: el, start: 'top 90%', end: 'top 30%', scrub: true },
        })
      }
      if (reduit) {
        // Mouvement réduit : la vue éclatée reste posée, aucun épinglage.
        appliquer(0.5)
        return
      }
      ScrollTrigger.create({
        trigger: el,
        start: 'top top',
        end: () => `+=${Math.round(window.innerHeight * (mobile ? 2 : 3))}`,
        pin: st,
        scrub: true,
        onEnter: (self) => appliquer(self.progress),
        onEnterBack: (self) => appliquer(self.progress),
        onUpdate: (self) => appliquer(self.progress),
      })
      ScrollTrigger.create({
        trigger: el,
        start: 'top 60%',
        end: 'bottom 40%',
        onEnter: () => useScene.getState().setMoment('01'),
        onEnterBack: () => useScene.getState().setMoment('01'),
      })
    }, el)

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
    }
  }, [])

  const choisir = (k: number) => setIsole((cur) => (cur === k ? -1 : k))
  const actif = isole >= 0 ? isole : actifScroll

  return (
    <section ref={section} className="su-str" data-moment="01" data-nuit="1" data-titre="Les strates" id="strates" aria-labelledby="su-str-titre">
      <div ref={scene} className="su-str__scene">
        <div className="su-str__grille">
          <header className="su-str__tete">
            <p className="su-mono su-str__etiquette">01 — Les strates</p>
            <h2 ref={titre} id="su-str-titre" className="su-display su-str__titre">
              Un site, c’est cinq couches.
            </h2>
          </header>
          <div ref={vue} className="su-ecl" data-actif={actif} data-isole={isole >= 0 ? '1' : '0'} data-fini={fini ? '1' : '0'}>
            <div className="su-ecl__stage" aria-hidden="true" inert>
              {COUCHES.map((c, k) => (
                <div key={c.num} className="su-ecl__calque" style={{ '--i': k } as React.CSSProperties} data-on={actif === k ? '1' : actif === -1 ? '' : '0'} onClick={() => choisir(k)}>
                  <Calque k={k} uid={`ec${k}`} />
                  <span className="su-ecl__tag su-mono">
                    {c.num} · {c.court}
                  </span>
                </div>
              ))}
              <span className="su-ecl__axe su-ecl__axe--a" />
              <span className="su-ecl__axe su-ecl__axe--b" />
              <span className="su-ecl__axe su-ecl__axe--c" />
              <span className="su-ecl__axe su-ecl__axe--d" />
            </div>
            {isole >= 0 && (
              <div className="su-ecl__devant" key={isole} aria-hidden="true" onClick={() => setIsole(-1)}>
                <div className="su-ecl__devant-fen">
                  <Calque k={isole} uid="ecd" />
                </div>
                <p className="su-ecl__devant-leg su-mono">
                  {COUCHES[isole]!.num} · {COUCHES[isole]!.court} — toucher pour la remettre dans la pile
                </p>
              </div>
            )}
            <p className="su-ecl__fini su-display" data-visible={fini ? '1' : '0'}>
              Le site fini, en une seule pièce.
            </p>
          </div>
          <ol className="su-str__liste" aria-label="Les cinq couches">
            {COUCHES.map((c, k) => (
              <li key={c.num} className="su-str__couche" data-actif={actif === k ? '1' : '0'} data-ouverte={actif >= 0 && k <= Math.max(actif, actifScroll) ? '1' : '0'}>
                <button type="button" className="su-str__bouton" aria-pressed={isole === k} onClick={() => choisir(k)}>
                  <span className="su-mono su-str__num">{c.num}</span>
                  <span className="su-str__nom">{c.nom}</span>
                  <span className="su-str__ligne">{c.ligne}</span>
                </button>
                <p className="su-str__texte">{c.texte}</p>
              </li>
            ))}
          </ol>
          <p className="su-str__fin">
            <span className="su-display">Nous fabriquons les cinq.</span>
            <span className="su-str__fin-ligne">Vous êtes propriétaire des cinq.</span>
          </p>
        </div>
      </div>
    </section>
  )
}
