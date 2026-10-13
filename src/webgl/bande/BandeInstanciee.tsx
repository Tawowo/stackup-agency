'use client'

/**
 * LA BANDE EN CENT VINGT PLAQUES.
 *
 * Fiche 11.3. La même matière prend cinq configurations ; changer d'offre
 * fait passer l'objet de l'une à l'autre.
 *
 * POURQUOI DES INSTANCES ET NON CINQ MODÈLES. Un `InstancedMesh` dessine les
 * 120 plaques en UN appel de rendu. Cinq géométries distinctes qu'on ferait
 * apparaître et disparaître coûteraient cinq fois plus et, surtout, ne
 * pourraient pas se transformer l'une EN l'autre : on verrait un fondu, pas
 * une métamorphose. Ici chaque plaque garde son identité et voyage de sa
 * position de départ à sa position d'arrivée.
 *
 * POURQUOI UN RETARD PAR PLAQUE. Sans lui, les 120 plaques partent et
 * arrivent ensemble : le mouvement se lit comme un seul bloc qui glisse.
 * Avec un retard tiré du rang, la forme se défait puis se refait, et c'est
 * ce qu'on veut raconter. La fenêtre utile est de 65 % de la durée, le reste
 * étant mangé par les retards.
 *
 * POURQUOI UN ARC. Une interpolation droite fait passer les plaques les unes
 * à travers les autres par le plus court chemin, ce qui se voit. Un léger
 * arc en Z les écarte pendant le trajet.
 */
import { useEffect, useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { InstancedMesh, Object3D, Color, MathUtils, Euler, Vector3 } from 'three'
import { useBande, type Offre } from '@/store/bande'
import { LAYOUTS, NB_PLAQUES, retardPlaque, segmentsGestion, type NomLayout } from './layouts'
import { hauteurVisible } from '../cadrage'

const NAVY = '#0D2C4C'
const AMBRE = '#F69106'
/** Durée du morph, en secondes (fiche 11.3 : 1 100 ms). */
const DUREE = 1.1

/** L'offre du store correspond un pour un à une configuration. */
const VERS_LAYOUT: Record<Offre, NomLayout> = {
  vitrine: 'vitrine',
  multipages: 'multipages',
  boutique: 'boutique',
  gestion: 'gestion',
}

export default function BandeInstanciee() {
  const maille = useRef<InstancedMesh>(null)
  const liaisons = useRef<import('three').LineSegments>(null)
  const positionsLiaisons = useMemo(() => segmentsGestion(), [])
  const jeton = useMemo(() => new Object3D(), [])
  const depart = useRef<NomLayout>('vitrine')
  const arrivee = useRef<NomLayout>('vitrine')
  const t = useRef(1)

  /* Une plaque sur SEPT est ambrée. Sept, et pas six : la configuration
     « vitrine » est une grille de douze colonnes, et six divise douze — les
     plaques ambrées retombaient toutes sur les deux mêmes colonnes et
     dessinaient deux rayures verticales, vu sur capture. Sept est premier
     avec 12, 10, 8 et 3, les quatre largeurs de grille utilisées : l'accent
     dérive au lieu de s'aligner. L'ambre reste rare, comme le veut le
     contrat de direction artistique — une seule couleur d'action. */
  const couleurs = useMemo(() => {
    const c = new Color()
    const tableau = new Float32Array(NB_PLAQUES * 3)
    for (let i = 0; i < NB_PLAQUES; i++) {
      c.set(i % 7 === 3 ? AMBRE : NAVY)
      tableau[i * 3] = c.r
      tableau[i * 3 + 1] = c.g
      tableau[i * 3 + 2] = c.b
    }
    return tableau
  }, [])

  // Le changement d'offre déclenche un morph : on retient d'où l'on part.
  useEffect(() => {
    return useBande.subscribe(
      (s) => s.offre,
      (offre) => {
        const cible = VERS_LAYOUT[offre]
        if (cible === arrivee.current) return
        depart.current = arrivee.current
        arrivee.current = cible
        t.current = 0
      },
    )
  }, [])

  const tmpA = useMemo(() => new Vector3(), [])
  const tmpB = useMemo(() => new Vector3(), [])
  const tmpE = useMemo(() => new Euler(), [])

  useFrame((etatTrois, delta) => {
    const m = maille.current
    if (!m) return
    const { mouvement, ancrage, etat } = useBande.getState()

    // La section n'est pas à l'écran (y compris 'absent') : rien à calculer.
    if (etat !== 'offre') {
      m.visible = false
      return
    }
    m.visible = true

    if (t.current < 1) {
      t.current = Math.min(1, t.current + delta / (mouvement === 'aucun' ? 0.001 : DUREE))
    }

    const A = LAYOUTS[depart.current]
    const B = LAYOUTS[arrivee.current]

    for (let i = 0; i < NB_PLAQUES; i++) {
      const retard = retardPlaque(i)
      // Fenêtre de 65 % : chaque plaque a son propre départ et sa propre
      // arrivée dans la durée totale.
      const local = MathUtils.clamp((t.current - retard) / 0.65, 0, 1)
      const e = local * local * (3 - 2 * local)

      const a = A[i]
      const b = B[i]
      tmpA.set(a.p[0], a.p[1], a.p[2])
      tmpB.set(b.p[0], b.p[1], b.p[2])
      tmpA.lerp(tmpB, e)
      // L'arc : les plaques s'écartent du plan pendant le trajet, et y
      // reviennent. Nul aux deux extrémités, donc sans effet sur les formes.
      tmpA.z += Math.sin(e * Math.PI) * 0.5

      tmpE.set(
        MathUtils.lerp(a.r[0], b.r[0], e),
        MathUtils.lerp(a.r[1], b.r[1], e),
        MathUtils.lerp(a.r[2], b.r[2], e),
      )

      jeton.position.copy(tmpA)
      jeton.rotation.copy(tmpE)
      jeton.scale.set(
        MathUtils.lerp(a.e[0], b.e[0], e),
        MathUtils.lerp(a.e[1], b.e[1], e),
        MathUtils.lerp(a.e[2], b.e[2], e),
      )
      jeton.updateMatrix()
      m.setMatrixAt(i, jeton.matrix)
    }
    m.instanceMatrix.needsUpdate = true

    /* Les liaisons n'existent que pour « système de gestion », et elles
       apparaissent avec lui : visibles à proportion de la part de la forme
       d'arrivée (ou de départ) qui est « gestion ». Sans cette pondération,
       elles surgiraient d'un coup au milieu du morph. */
    const l = liaisons.current
    if (l) {
      const versGestion = arrivee.current === 'gestion' ? t.current : 0
      const depuisGestion = depart.current === 'gestion' ? 1 - t.current : 0
      const force = Math.max(versGestion, depuisGestion)
      l.visible = force > 0.02
      const mat = l.material as { opacity: number; transparent: boolean }
      mat.transparent = true
      mat.opacity = force * 0.45
      l.position.copy(m.position)
      l.scale.copy(m.scale)
      l.rotation.copy(m.rotation)
    }

    /* L'ancrage, comme pour la bande continue : la page déclare une boîte,
       l'objet s'y place. */
    if (ancrage) {
      const portrait = etatTrois.size.width < 900
      const hv = hauteurVisible(portrait)
      const lv = hv * (etatTrois.size.width / Math.max(1, etatTrois.size.height))
      m.position.x = (ancrage.cx - 0.5) * lv
      m.position.y = (0.5 - ancrage.cy) * hv
      m.scale.setScalar((ancrage.hauteur * hv) / 4)
    }

    // Une rotation lente, seulement en mouvement plein.
    if (mouvement === 'plein') {
      m.rotation.y = Math.sin(etatTrois.clock.elapsedTime * 0.22) * 0.18
    } else {
      m.rotation.y = 0
    }
  })

  return (
    <>
    <instancedMesh
      ref={maille}
      args={[undefined, undefined, NB_PLAQUES]}
      castShadow
      receiveShadow
      visible={false}
    >
      <boxGeometry args={[1, 1, 1]}>
        <instancedBufferAttribute attach="attributes-color" args={[couleurs, 3]} />
      </boxGeometry>
      <meshStandardMaterial vertexColors roughness={0.9} metalness={0} />
    </instancedMesh>
    {/* Les liaisons entre modules — voir `segmentsGestion`. */}
    <lineSegments ref={liaisons} visible={false}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positionsLiaisons, 3]}
        />
      </bufferGeometry>
      <lineBasicMaterial color={NAVY} transparent opacity={0} />
    </lineSegments>
    </>
  )
}
