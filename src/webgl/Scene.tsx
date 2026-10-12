'use client'

/**
 * LA SCÈNE PERSISTANTE.
 *
 * Un seul canvas, monté dans le layout racine, jamais démonté. C'est le
 * patron de `pmndrs/react-three-next` que le dossier retient (6.7 §1) : la
 * navigation entre pages ne détruit pas le contexte WebGL, donc elle ne
 * recrée ni le renderer, ni les géométries, ni les matériaux — et la bande
 * peut traverser les pages au lieu de réapparaître à chaque fois.
 *
 * POURQUOI UN PORTAIL VERS LE BODY. Le conteneur de page porte une
 * animation d'entrée dont le `transform` subsiste après la fin (mode de
 * remplissage `both`). Un élément transformé devient un bloc conteneur pour
 * ses descendants en `position: fixed` : le canvas, au lieu de couvrir la
 * fenêtre, prenait la hauteur du document — mesuré à 10 239 px au lieu de
 * 900. Le portail le sort de cette chaîne.
 *
 * POURQUOI `pointer-events: none`. Le canvas couvre tout l'écran. S'il
 * captait les événements, plus aucun lien ne serait cliquable. Le pointeur
 * est donc écouté sur le `<body>` (`eventSource`), et le canvas ne reçoit
 * rien.
 *
 * ACCESSIBILITÉ. `aria-hidden` sur le conteneur : tout ce que la scène
 * montre est répété en clair dans le DOM (règle 16.4). Un lecteur d'écran
 * n'a rien à faire d'un canvas.
 */
import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { Canvas } from '@react-three/fiber'
import { useBande } from '@/store/bande'
import CameraRig from './CameraRig'
import Bande from './bande/Bande'

/** Angle de la lumière, partagé avec le CSS (`--su-angle-lumiere`). */
const ANGLE_LUMIERE = -18

function contenuScene(mobile: boolean) {
  const a = (ANGLE_LUMIERE * Math.PI) / 180
  return (
    <>
      <CameraRig cadrageMobile={mobile} />
      {/* Lumière rasante à −18°, la même direction que les ombres CSS. */}
      <directionalLight
        position={[Math.sin(a) * -6, Math.cos(a) * 6, 7]}
        intensity={2.1}
        castShadow={!mobile}
        shadow-mapSize={mobile ? 512 : 1024}
      />
      <ambientLight intensity={0.55} />
      {/* Une seconde source, faible et opposée, pour que les faces dans
          l'ombre ne soient pas des aplats noirs : le papier a toujours un
          peu de lumière rebondie. */}
      <directionalLight position={[4, -3, -5]} intensity={0.4} />
      <Bande mobile={mobile} />
    </>
  )
}

export default function Scene() {
  const [montable, setMontable] = useState(false)
  const [mobile, setMobile] = useState(false)
  const hote = useRef<HTMLDivElement | null>(null)
  const setPrete = useBande((s) => s.setPrete)
  const setRepli = useBande((s) => s.setRepli)

  useEffect(() => {
    // WebGL absent : on bascule sur le repli SVG sans monter de canvas.
    try {
      const essai = document.createElement('canvas')
      const ok = !!(essai.getContext('webgl2') || essai.getContext('webgl'))
      if (!ok) {
        setRepli(true)
        return
      }
    } catch {
      setRepli(true)
      return
    }
    const mq = window.matchMedia('(max-width: 899px)')
    const suivre = () => setMobile(mq.matches)
    suivre()
    mq.addEventListener('change', suivre)
    setMontable(true)
    return () => mq.removeEventListener('change', suivre)
  }, [setRepli])

  if (!montable) return null

  const canvas = (
    <div
      ref={hote}
      aria-hidden="true"
      className="su-scene"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 0,
        pointerEvents: 'none',
      }}
    >
      <Canvas
        dpr={[1, mobile ? 1.5 : 1.75]}
        shadows={!mobile}
        gl={{ alpha: true, antialias: true, powerPreference: 'high-performance' }}
        eventSource={typeof document !== 'undefined' ? document.body : undefined}
        eventPrefix="client"
        onCreated={({ gl }) => {
          gl.domElement.addEventListener(
            'webglcontextlost',
            (e) => {
              e.preventDefault()
              setRepli(true)
            },
            { passive: false },
          )
          setPrete(true)
        }}
      >
        {contenuScene(mobile)}
      </Canvas>
    </div>
  )

  return createPortal(canvas, document.body)
}
