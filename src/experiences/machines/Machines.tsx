'use client'
/**
 * MOMENT 05 — LES MODULES. Mécanisme : COMPOSITION.
 * « Votre outil, composé des modules dont vous avez besoin. » Au centre, une
 * fenêtre d'application de gestion ; autour, huit modules en cartes lisibles
 * (trois essentiels, cinq qui font la différence : devis et factures automatiques,
 * facture électronique, commande vocale, automatisations, assistant IA).
 * Clic (ou Entrée) sur une carte : elle vole vers l'application, une impulsion de
 * données court le long du lien, le module s'intègre et montre ce qu'il fait.
 * Tant que personne n'a cliqué, un module s'ajoute tout seul. Les écrans sont des
 * maquettes (règle 7) ; la vraie démo est celle du logiciel réel (lien « Tester la démo »).
 */
import { useEffect, useRef, useState } from 'react'
import Navigateur from '@/components/maquettes/Navigateur'
import { Picto } from '@/components/maquettes/illustrations'
import { useScene } from '@/webgl/store'
import { gsap, initGsap } from '@/lib/gsap'
import Action from '@/components/ui/Action'
import { PROJETS } from '@/experiences/galerie/projets'
import { ICONES, MAQUETTES, MODULES } from './modules'
import './machines.css'

const DEPART = [0, 3]
/** Ordre dans lequel les modules s'ajoutent tout seuls : d'abord ceux qui font la différence. */
const ORDRE_AUTO = [5, 7, 4, 6, 1, 2]
const DEMO = PROJETS.find((p) => p.slug === 'logiciel-gestion-artisans')!.url

/** La commande vocale : une onde sonore, puis la phrase dictée devient un devis. */
function EcranVoix() {
  return (
    <div className="mq-app__ecran" key="voix">
      <div className="mq-app__titre">
        <Picto nom="micro" />
        <b>Commande vocale</b>
        <em data-s="1">Écoute</em>
      </div>
      <div className="mq-voix__onde" aria-hidden="true">
        {Array.from({ length: 28 }, (_, i) => (
          <span key={i} style={{ '--i': i } as React.CSSProperties} />
        ))}
      </div>
      <p className="mq-voix__phrase">« J’ai vu M. Martin, trois fenêtres PVC, pose comprise. »</p>
      <div className="mq-voix__devis">
        <p className="mq-voix__etiquette">Devis créé · prêt à relire</p>
        <ul>
          <li>Client : M. Martin</li>
          <li>3 fenêtres PVC, pose comprise</li>
          <li>Total : calculé avec vos prix habituels</li>
        </ul>
      </div>
    </div>
  )
}

/** L'assistant IA : une carte de conseil qui apparaît sans qu'on lui demande. */
function EcranIA() {
  return (
    <div className="mq-app__ecran" key="ia">
      <div className="mq-app__titre">
        <Picto nom="etincelle" />
        <b>Assistant IA métier</b>
        <em data-s="1">Nouveau conseil</em>
      </div>
      <div className="mq-ia__carte">
        <p className="mq-ia__etiquette">Conseil du jour</p>
        <p className="mq-ia__texte">Vous êtes 30 % en avance sur votre objectif du mois.</p>
        <div className="mq-ia__jauge" aria-hidden="true">
          <span />
        </div>
      </div>
      <div className="mq-ia__carte mq-ia__carte--2">
        <p className="mq-ia__etiquette">À ne pas oublier</p>
        <p className="mq-ia__texte">Le devis Dupont expire demain : voulez-vous le relancer ?</p>
      </div>
    </div>
  )
}

/** La facture électronique : trois étapes, le statut avance jusqu'à « Transmise ». */
function EcranFacture({ statut }: { statut: number }) {
  const etapes = ['Prête', 'Envoyée', 'Transmise']
  const k = statut % etapes.length
  return (
    <div className="mq-app__ecran" key="facture">
      <div className="mq-app__titre">
        <Picto nom="enveloppe" />
        <b>Facture électronique</b>
        <em data-s={k}>{etapes[k]}</em>
      </div>
      <p className="mq-fe__ligne">Facture 2026-118 · Garage Martin</p>
      <ol className="mq-fe__etapes" aria-label="Étapes de la facture">
        {etapes.map((e, i) => (
          <li key={e} data-fait={i <= k ? '1' : '0'}>
            <span>{i <= k ? '✓' : i + 1}</span>
            {e}
          </li>
        ))}
      </ol>
      <p className="mq-fe__note">Envoi et réception par une plateforme agréée. La réforme française s’applique par étapes, à partir de 2026-2027.</p>
    </div>
  )
}

function Ecran({ k, statut }: { k: number; statut: number }) {
  const mod = MODULES[k]!
  if (mod.slug === 'commande-vocale') return <EcranVoix />
  if (mod.slug === 'assistant-ia') return <EcranIA />
  if (mod.slug === 'facture-electronique') return <EcranFacture statut={statut} />
  const m = MAQUETTES[mod.slug]!
  return (
    <div className="mq-app__ecran" key={mod.slug}>
      <div className="mq-app__titre">
        <Picto nom={ICONES[mod.slug] ?? 'dossier'} />
        <b>{mod.nom}</b>
        <em data-s={statut % m.statuts.length}>{m.statuts[statut % m.statuts.length]}</em>
      </div>
      <p className="mq-app__kpi">
        <b>{m.chiffre}</b>
        <span>{m.unite}</span>
      </p>
      <ul className="mq-app__lignes">
        {m.lignes.map((l, i) => (
          <li key={l} style={{ '--k': i } as React.CSSProperties}>
            <span className="mq-app__puce" data-on={i === statut % m.lignes.length ? '1' : '0'} />
            {l}
          </li>
        ))}
      </ul>
      <ul className="mq-app__fonctions" aria-hidden="true">
        {mod.fonctions.map((f) => (
          <li key={f}>{f}</li>
        ))}
      </ul>
    </div>
  )
}

/** Une impulsion de données : un tracé qui se dessine de la carte à la fenêtre, un point en tête. */
function impulsion(de: DOMRect, vers: DOMRect) {
  const ns = 'http://www.w3.org/2000/svg'
  const svg = document.createElementNS(ns, 'svg')
  svg.setAttribute('class', 'su-mac__fil')
  svg.setAttribute('width', String(window.innerWidth))
  svg.setAttribute('height', String(window.innerHeight))
  const x0 = de.left + de.width / 2
  const y0 = de.top + de.height / 2
  const x1 = vers.left + vers.width / 2
  const y1 = vers.top + vers.height / 2
  const path = document.createElementNS(ns, 'path')
  path.setAttribute('d', `M${x0} ${y0} C ${x0 + (x1 - x0) * 0.5} ${y0}, ${x0 + (x1 - x0) * 0.5} ${y1}, ${x1} ${y1}`)
  path.setAttribute('fill', 'none')
  path.setAttribute('stroke', '#FFB84D')
  path.setAttribute('stroke-width', '2')
  path.setAttribute('stroke-linecap', 'round')
  path.setAttribute('pathLength', '1')
  path.setAttribute('stroke-dasharray', '1')
  path.setAttribute('stroke-dashoffset', '1')
  const point = document.createElementNS(ns, 'circle')
  point.setAttribute('r', '6')
  point.setAttribute('fill', '#FFFDF9')
  svg.append(path, point)
  document.body.appendChild(svg)
  const longueur = path.getTotalLength()
  const etat = { p: 0 }
  gsap.to(etat, {
    p: 1,
    duration: 0.9,
    ease: 'power2.inOut',
    onUpdate: () => {
      path.setAttribute('stroke-dashoffset', String(1 - etat.p))
      const pt = path.getPointAtLength(longueur * etat.p)
      point.setAttribute('cx', String(pt.x))
      point.setAttribute('cy', String(pt.y))
    },
    onComplete: () => svg.remove(),
  })
}

export default function Machines() {
  const section = useRef<HTMLElement>(null)
  const appRef = useRef<HTMLDivElement>(null)
  const cartes = useRef<(HTMLButtonElement | null)[]>([])
  const [installes, setInstalles] = useState<number[]>(DEPART)
  const [actif, setActif] = useState(3)
  const [interagi, setInteragi] = useState(false)
  const [visible, setVisible] = useState(false)
  const [statut, setStatut] = useState(0)
  const enVol = useRef(false)

  useEffect(() => {
    initGsap()
    const el = section.current
    if (!el) return
    const io = new IntersectionObserver(
      ([e]) => {
        const v = !!e?.isIntersecting && (e?.intersectionRatio ?? 0) > 0.35
        setVisible(v)
        // Le moment se prend à l'entrée seulement (jamais au montage : le hero garde la main).
        if (v) useScene.getState().setMoment('05')
      },
      { threshold: [0, 0.35, 0.7] },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  // Le statut des lignes de l'écran change tout seul, lentement.
  useEffect(() => {
    if (!visible) return
    const d = gsap.delayedCall(2.4, function boucle() {
      setStatut((s) => s + 1)
      d.restart(true)
    })
    return () => {
      d.kill()
    }
  }, [visible])

  const integrer = (k: number) => {
    if (installes.includes(k)) {
      setActif(k)
      return
    }
    const carte = cartes.current[k]
    const app = appRef.current
    const fin = () => {
      setInstalles((l) => (l.includes(k) ? l : [...l, k]))
      setActif(k)
      enVol.current = false
    }
    if (!carte || !app || useScene.getState().reduced) return fin()
    if (enVol.current) return
    enVol.current = true
    const de = carte.getBoundingClientRect()
    const cible = app.querySelector('.mq-app__menu')?.getBoundingClientRect() ?? app.getBoundingClientRect()
    // La carte s'envole (une copie) vers le menu de l'application, une impulsion de données la suit.
    const vol = carte.cloneNode(true) as HTMLElement
    vol.classList.add('su-mac__vol')
    Object.assign(vol.style, { left: `${de.left}px`, top: `${de.top}px`, width: `${de.width}px`, height: `${de.height}px` })
    document.body.appendChild(vol)
    impulsion(de, app.getBoundingClientRect())
    gsap.to(vol, {
      x: cible.left + cible.width / 2 - (de.left + de.width / 2),
      y: cible.top + cible.height * 0.7 - (de.top + de.height / 2),
      scale: 0.35,
      rotate: de.left < cible.left ? 6 : -6,
      duration: 0.85,
      ease: 'power3.inOut',
      onComplete: () => {
        vol.remove()
        fin()
      },
    })
  }

  const choisir = (k: number) => {
    setInteragi(true)
    integrer(k)
  }

  // Tant que personne n'a cliqué : un module s'ajoute tout seul, jusqu'aux huit.
  useEffect(() => {
    if (interagi || !visible || installes.length >= MODULES.length) return
    const d = gsap.delayedCall(3.2, () => {
      const k = ORDRE_AUTO.find((i) => !installes.includes(i)) ?? MODULES.findIndex((_, i) => !installes.includes(i))
      if (k >= 0) integrer(k)
    })
    return () => {
      d.kill()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [interagi, visible, installes])

  const recomposer = () => {
    setInteragi(true)
    setInstalles(DEPART)
    setActif(3)
  }

  const carte = (k: number) => {
    const m = MODULES[k]!
    const dedans = installes.includes(k)
    return (
      <li key={m.slug}>
        <button
          ref={(r) => {
            cartes.current[k] = r
          }}
          type="button"
          className="su-mac__carte"
          data-dedans={dedans ? '1' : '0'}
          data-actif={actif === k ? '1' : '0'}
          aria-pressed={dedans}
          onClick={() => choisir(k)}
        >
          <span className="su-mac__pic">
            <Picto nom={ICONES[m.slug] ?? 'dossier'} />
          </span>
          <span className="su-mac__nom">{m.court}</span>
          <span className="su-mac__etat su-mono">{dedans ? 'Intégré' : 'Ajouter'}</span>
          <span className="sr-only">{dedans ? `Afficher le module ${m.nom}` : `Intégrer le module ${m.nom} à votre application`}</span>
        </button>
      </li>
    )
  }

  return (
    <section ref={section} className="su-mac" data-moment="05" data-nuit="1" data-titre="Les modules" id="machines" aria-labelledby="su-mac-titre">
      <div className="su-mac__grille">
        <header className="su-mac__tete">
          <p className="su-mono su-mac__etiquette">05 — Les modules</p>
          <h2 id="su-mac-titre" className="su-display su-mac__titre">
            Votre outil, composé des modules dont vous avez besoin.
          </h2>
          <p className="su-mac__ligne">
            Chaque carte est un module. Cliquez-en une : elle s’intègre à votre application et montre ce qu’elle fait. Vos données restent à vous.
          </p>
          <div className="su-mac__actions">
            <Action href={DEMO} mot="Tester">
              Tester la démo
            </Action>
            <Action href="/contact?objet=Outil%20sur%20mesure" variante="contour" mot="Écrire">
              Parler de votre outil
            </Action>
            <button type="button" className="su-mac__reset su-mono" onClick={recomposer}>
              Recomposer
            </button>
          </div>
        </header>
        <ul className="su-mac__cartes su-mac__cartes--g" aria-label="Modules, première moitié">
          {MODULES.slice(0, 4).map((_, k) => carte(k))}
        </ul>
        <div ref={appRef} className="su-mac__app" role="group" aria-label="Application de gestion, maquette">
          <Navigateur url="mon-outil.exemple.fr" ratio="16 / 11" className="su-mac__fen">
            <div className="mq-app">
              <div className="mq-app__menu">
                <b>Mon outil</b>
                {installes.map((k) => (
                  <span key={k} className="mq-app__onglet" data-on={actif === k ? '1' : '0'}>
                    <Picto nom={ICONES[MODULES[k]!.slug] ?? 'dossier'} />
                    {MODULES[k]!.court}
                  </span>
                ))}
                <span className="mq-app__vide">+ un module</span>
              </div>
              <Ecran k={actif} statut={statut} />
            </div>
          </Navigateur>
          <p className="sr-only" aria-live="polite">
            Module affiché : {MODULES[actif]!.nom}
          </p>
        </div>
        <ul className="su-mac__cartes su-mac__cartes--d" aria-label="Modules, seconde moitié">
          {MODULES.slice(4).map((_, k) => carte(k + 4))}
        </ul>
      </div>
    </section>
  )
}
