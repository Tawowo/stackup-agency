'use client'

/**
 * LA BASCULE DE PROJECTION — orthographique → perspective.
 *
 * C'est le geste de la RÉVÉLATION (fiche 11.1) : le logo plat devient un
 * objet. Il repose sur une contrainte précise du dossier (4.2 §4) : à l'état
 * de repos, ce que l'on voit doit être EXACTEMENT le logo, vérifiable par
 * superposition pixel à pixel avec le PNG d'origine.
 *
 * POURQUOI INTERPOLER LA MATRICE ET NON LE CHAMP DE VISION.
 *
 * Première idée, celle qu'on a spontanément : garder une caméra perspective
 * et faire descendre son `fov` vers une petite valeur pour approcher
 * l'orthographie. Ça ne marche pas pour ce qu'on veut ici. Une perspective à
 * petit angle N'EST PAS une orthographie : il y reste une fuite, faible mais
 * non nulle, et la silhouette ne se superpose donc jamais exactement. Pire,
 * la distance nécessaire pour garder la même taille apparente tend vers
 * l'infini quand l'angle tend vers zéro — la précision des flottants se
 * dégrade bien avant d'y arriver.
 *
 * Deuxième idée : deux caméras et un échange à mi-parcours. Ça donne un saut
 * visible à l'instant de l'échange, et le dossier l'interdit explicitement
 * (« à toute valeur de p, la scène est cohérente, pas de saut »).
 *
 * Ce qui est fait ici : UNE caméra dont la matrice de projection est la
 * moyenne pondérée des deux matrices. À p = 0 on obtient la matrice
 * orthographique au bit près — donc la silhouette exacte. À p = 1, la
 * matrice perspective exacte. Entre les deux, une interpolation terme à
 * terme : ce n'est pas une projection physiquement « juste », mais c'est une
 * matrice valide, continue et sans saut, et c'est précisément ce que le
 * dossier décrit (« par interpolation de la matrice de projection »).
 *
 * Le cadrage est calculé pour que la bande occupe la même fraction de
 * hauteur dans les deux projections : sans ça, la bascule ferait aussi un
 * zoom, et on ne lirait plus le passage du plat au volume.
 */
import { useEffect, useMemo, useRef } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { PerspectiveCamera, OrthographicCamera, Matrix4 } from 'three'
import { useBande } from '@/store/bande'
import { FOV, hauteurVisible, distanceCamera } from './cadrage'

export default function CameraRig({ cadrageMobile = false }: { cadrageMobile?: boolean }) {
  const { camera, size } = useThree()
  const ortho = useRef(new OrthographicCamera())
  const persp = useRef(new PerspectiveCamera())
  const melange = useRef(new Matrix4())
  const progressionLissee = useRef(0)

  const hauteurVue = hauteurVisible(cadrageMobile)
  const distance = useMemo(() => distanceCamera(cadrageMobile), [cadrageMobile])

  useEffect(() => {
    const aspect = size.width / Math.max(1, size.height)
    const demiH = hauteurVue / 2
    const demiL = demiH * aspect

    const o = ortho.current
    o.left = -demiL
    o.right = demiL
    o.top = demiH
    o.bottom = -demiH
    o.near = 0.1
    o.far = 100
    o.updateProjectionMatrix()

    const p = persp.current
    p.fov = FOV
    p.aspect = aspect
    p.near = 0.1
    p.far = 100
    p.updateProjectionMatrix()

    camera.position.set(0, 0, distance)
    camera.lookAt(0, 0, 0)
  }, [camera, size.width, size.height, distance, hauteurVue])

  useFrame((_, delta) => {
    const { progression, etat, mouvement } = useBande.getState()

    /* Les états qui ne sont pas une révélation restent en volume. Deux la
       traversent : l'ouverture (du plat au volume) et le départ (du volume
       au plat), aux deux bouts de la page. */
    const cible =
      etat === 'logo' ? Math.min(1, progression / 0.25) : etat === 'depart' ? progression : 1

    // Un amortissement indépendant de la cadence : sans lui, la bascule est
    // saccadée quand le défilement arrive par à-coups. Sous « mouvement
    // réduit », la bascule est une coupe nette (le dossier le demande).
    if (mouvement === 'aucun') {
      progressionLissee.current = cible < 0.5 ? 0 : 1
    } else {
      const k = 1 - Math.exp(-delta * 7.5)
      progressionLissee.current += (cible - progressionLissee.current) * k
    }
    const t = progressionLissee.current

    const a = ortho.current.projectionMatrix.elements
    const b = persp.current.projectionMatrix.elements
    const m = melange.current.elements
    for (let i = 0; i < 16; i++) m[i] = a[i] + (b[i] - a[i]) * t

    camera.projectionMatrix.copy(melange.current)
    camera.projectionMatrixInverse.copy(melange.current).invert()
  })

  return null
}
