'use client'

/**
 * LES STRATES — la bande se coupe en cinq lamelles.
 *
 * Fiche 11.2. « Un site, c'est cinq couches », montré plutôt que dit.
 *
 * POURQUOI DES PLANS DE COUPE ET NON CINQ GÉOMÉTRIES DÉCOUPÉES.
 *
 * La solution évidente serait de découper les tracés 2D du ruban en cinq
 * bandes horizontales avant extrusion, une géométrie par lamelle. Elle est
 * fausse ici, et la forme du logo dit pourquoi : le brin navy est un
 * chevron. Coupé par une bande horizontale au-dessus ou au-dessous de sa
 * pointe, il donne DEUX morceaux disjoints — un par branche. Les algorithmes
 * de découpe de polygone habituels (Sutherland-Hodgman) rendent alors un
 * polygone unique, les deux morceaux étant reliés par un filet dégénéré le
 * long de la ligne de coupe. On verrait un pont là où il doit y avoir un
 * vide.
 *
 * Un plan de coupe, lui, travaille au fragment : il n'a pas d'opinion sur la
 * topologie et laisse les morceaux disjoints disjoints. C'est exact par
 * construction, et gratuit.
 *
 * CONSÉQUENCE : LA TRANCHE EST CREUSE. Le plan coupe la coque extrudée sans
 * la refermer ; la lamelle est donc un U vu de côté. D'où `side: DoubleSide`
 * — on voit la paroi intérieure, ce qui se lit justement comme une coupe,
 * et c'est l'image recherchée : du papier tranché, pas un bloc plein.
 *
 * LES PLANS SUIVENT LA LAMELLE. Un plan de coupe vit dans l'espace monde ;
 * les lamelles, elles, s'écartent et la pile s'incline. Les plans sont donc
 * recalculés à chaque image depuis leur définition locale et la matrice
 * monde du groupe. Sans ça, les lamelles traverseraient leurs propres
 * coupes en s'écartant.
 */
import { useEffect, useMemo, useRef } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { Group, Plane, Vector3, MathUtils, Color } from 'three'
import { useBande } from '@/store/bande'
import { creerGeometriesBande, HAUTEUR_MONDE } from './geometrie'
import { hauteurVisible } from '../cadrage'

const NAVY = '#0D2C4C'
const AMBRE = '#F69106'

/** Cinq couches, de la structure au référencement. */
export const NB_LAMELLES = 5

/* ÉCART ENTRE LAMELLES.

   Première valeur essayée : 0,18 / 0,22. En capture, la pile se lisait
   comme trois bandes et non cinq — les lamelles navy, de teinte identique
   et jointives à l'écran, fusionnaient visuellement. Donner une nuance
   différente à chacune était exclu : le logo n'a que ses deux couleurs
   (règle 4.2 §2). Restait à les écarter assez pour qu'on voie le fond
   entre elles. */
const ECART_Y = 0.3
const ECART_Z = 0.3

/** Épaisseur des lamelles. Plus fine que la bande pleine : c'est du papier. */
const EPAISSEUR = 0.09

export default function Strates() {
  const racine = useRef<Group>(null)
  const lamelles = useRef<(Group | null)[]>([])
  const { navy, ambre } = useMemo(() => creerGeometriesBande(), [])
  const gl = useThree((s) => s.gl)

  /* Le découpage local : la bande va de −HAUTEUR_MONDE/2 à +HAUTEUR_MONDE/2
     sur Y. Cinq tranches d'égale hauteur. Les plans sont définis UNE fois en
     espace local, puis transportés chaque image. */
  const { plansLocaux, plansMonde } = useMemo(() => {
    const h = HAUTEUR_MONDE / NB_LAMELLES
    const locaux: [Plane, Plane][] = []
    const monde: [Plane, Plane][] = []
    for (let i = 0; i < NB_LAMELLES; i++) {
      const haut = HAUTEUR_MONDE / 2 - i * h
      const bas = haut - h
      // Normale vers le bas : garde ce qui est SOUS `haut`.
      locaux.push([
        new Plane(new Vector3(0, -1, 0), haut),
        new Plane(new Vector3(0, 1, 0), -bas),
      ])
      monde.push([new Plane(), new Plane()])
    }
    return { plansLocaux: locaux, plansMonde: monde }
  }, [])

  /* Le découpage local est activé à la création du renderer (voir
     `Scene.tsx`) : l'activer ici, après coup, ne recompilait pas les
     programmes et les lamelles montraient chacune le ruban entier.

     Il reste à forcer une recompilation au premier montage, parce que les
     matériaux de cette pile peuvent avoir été compilés avant que leurs
     plans ne leur soient attribués. */
  useEffect(() => {
    const r = racine.current
    if (!r) return
    r.traverse((o) => {
      const m = (o as { material?: { needsUpdate: boolean } }).material
      if (m) m.needsUpdate = true
    })
  }, [gl])

  const teinte = useMemo(() => new Color(), [])

  useFrame((etatTrois, delta) => {
    const r = racine.current
    if (!r) return
    const { etat, progression, mouvement, ancrage, isolee } = useBande.getState()

    if (etat !== 'strates') {
      r.visible = false
      return
    }
    r.visible = true

    const fige = mouvement === 'aucun'
    const p = progression

    /* ── Écartement ───────────────────────────────────────────────────────
       0 → 0,2 : les lamelles sont jointives, seule la coupe se dessine.
       0,2 → 0,8 : elles s'écartent. Au-delà : stables, les légendes
       s'écrivent. */
    const e = MathUtils.smoothstep(p, 0.2, 0.8)

    for (let i = 0; i < NB_LAMELLES; i++) {
      const g = lamelles.current[i]
      if (!g) continue
      const centre = (NB_LAMELLES - 1) / 2
      g.position.y = (i - centre) * ECART_Y * e
      g.position.z = (i - centre) * ECART_Z * e

      // Les plans suivent la lamelle : voir l'en-tête.
      g.updateWorldMatrix(true, false)
      plansMonde[i][0].copy(plansLocaux[i][0]).applyMatrix4(g.matrixWorld)
      plansMonde[i][1].copy(plansLocaux[i][1]).applyMatrix4(g.matrixWorld)

      /* Isolement : la couche désignée garde sa densité, les autres
         s'effacent. C'est la seule façon de lire une pile de cinq — sans
         elle, on ne distingue pas « interface » de « contenus ». */
      const viseeAilleurs = isolee !== null && isolee !== i
      const opacite = viseeAilleurs ? 0.3 : 1
      g.traverse((o) => {
        const m = (o as { material?: { opacity: number; transparent: boolean; wireframe?: boolean } }).material
        if (!m) return
        m.transparent = true
        m.opacity += (opacite - m.opacity) * (1 - Math.exp(-delta * 9))
        if (m.wireframe !== undefined) m.wireframe = viseeAilleurs
      })
    }

    /* ── Rotation de la pile ──────────────────────────────────────────────
       54° → 44° sur X pendant l'écartement : la pile s'ouvre vers le
       lecteur au lieu de rester à plat. */
    const rx = MathUtils.degToRad(MathUtils.lerp(54, 44, e))
    r.rotation.x = rx

    // Inclinaison au pointeur, ± 5°, amortie. Agrément seulement.
    if (!fige) {
      const k = 1 - Math.exp(-delta * 4)
      r.rotation.y += (etatTrois.pointer.x * MathUtils.degToRad(5) - r.rotation.y) * k
      r.rotation.z += (etatTrois.pointer.y * MathUtils.degToRad(2.5) - r.rotation.z) * k
    } else {
      r.rotation.y = 0
      r.rotation.z = 0
    }

    /* ── Ancrage ──────────────────────────────────────────────────────────
       Comme partout : la page déclare une boîte, l'objet s'y place. */
    if (ancrage) {
      const portrait = etatTrois.size.width < 900
      const hv = hauteurVisible(portrait)
      const lv = hv * (etatTrois.size.width / Math.max(1, etatTrois.size.height))
      r.position.x = (ancrage.cx - 0.5) * lv
      r.position.y = (0.5 - ancrage.cy) * hv
      r.scale.setScalar((ancrage.hauteur * hv) / HAUTEUR_MONDE)
    }

    teinte.set(NAVY)
  })

  return (
    <group ref={racine} visible={false}>
      {Array.from({ length: NB_LAMELLES }, (_, i) => (
        <group
          key={i}
          ref={(g) => {
            lamelles.current[i] = g
          }}
          scale-z={EPAISSEUR}
        >
          <mesh geometry={navy} castShadow receiveShadow>
            <meshStandardMaterial
              color={NAVY}
              roughness={0.92}
              metalness={0}
              side={2 /* DoubleSide : la tranche est creuse, voir l'en-tête */}
              clippingPlanes={plansMonde[i]}
              clipShadows
            />
          </mesh>
          <mesh geometry={ambre} castShadow receiveShadow>
            <meshStandardMaterial
              color={AMBRE}
              roughness={0.86}
              metalness={0}
              side={2}
              clippingPlanes={plansMonde[i]}
              clipShadows
            />
          </mesh>
        </group>
      ))}
    </group>
  )
}
