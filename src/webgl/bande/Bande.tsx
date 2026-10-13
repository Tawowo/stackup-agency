'use client'

/**
 * LA BANDE — l'objet unique du site.
 *
 * Deux maillages, un par brin du ruban, partageant la même règle : la
 * géométrie est construite une seule fois à épaisseur 1, et l'épaisseur
 * réelle passe par `scale.z` (voir `geometrie.ts`).
 *
 * MATIÈRE. Le contrat de direction artistique (9.3) demande « papier et
 * encre », « précis et mat, jamais brillant », avec un grain fin. D'où un
 * `meshStandardMaterial` à forte rugosité et métallicité nulle : une surface
 * qui absorbe plutôt qu'elle ne réfléchit. Le grain est appliqué par la
 * lumière et le fond, pas par une texture : une texture de bruit coûterait
 * un téléchargement et de la mémoire pour un effet que l'éclairage rasant
 * donne déjà.
 *
 * LUMIÈRE À −18°. La constante est partagée avec le CSS (`--su-angle-lumiere`)
 * pour que l'ombre portée réelle de la bande et les ombres des plaques HTML
 * tombent dans la même direction. C'est la cohérence que le dossier appelle
 * « ombres à −18° partagées entre CSS et 3D ».
 */
import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Group, Color, MathUtils } from 'three'
import { useBande } from '@/store/bande'
import { creerGeometriesBande, HAUTEUR_MONDE } from './geometrie'
import { hauteurVisible } from '../cadrage'

/** Couleurs du logo, identiques à `LogoMarque.tsx`. */
const NAVY = '#0D2C4C'
const AMBRE = '#F69106'

/** Épaisseur maximale, en fraction de la largeur de la bande (fiche 11.1). */
const EPAISSEUR_MAX = 0.12
/** Une épaisseur nulle rendrait les normales indéfinies : on garde un epsilon. */
const EPAISSEUR_MIN = 0.0008

export default function Bande() {
  const groupe = useRef<Group>(null)
  /* Deux groupes imbriqués, et pas un seul : le PORTEUR applique la
     position et l'échelle dictées par la boîte d'ancrage HTML, le groupe
     intérieur garde la rotation et l'épaisseur. Tout mettre sur un seul
     groupe ferait que chaque relecture de l'ancrage écraserait la rotation
     en cours. */
  const porteur = useRef<Group>(null)
  const { navy, ambre } = useMemo(() => creerGeometriesBande(), [])

  // La pellicule teinte le brin navy par l'accent du projet courant. Une
  // seule instance réutilisée : allouer une couleur par image remplirait le
  // ramasse-miettes pour rien.
  const cible = useMemo(() => new Color(), [])

  const pointeur = useRef({ x: 0, y: 0 })
  const inclinaison = useRef({ x: 0, y: 0 })

  useFrame((etatTrois, delta) => {
    const g = groupe.current
    const pr = porteur.current
    if (!g || !pr) return
    const { progression, etat, mouvement, accent } = useBande.getState()

    /* Une seule forme à la fois. Quand la section de l'offre prend la main,
       c'est la version en cent vingt plaques qui s'affiche : les deux se
       superposeraient sinon, et on verrait deux rubans.

       Et rien du tout quand la page ne demande rien ('absent') : sans cette
       ligne, la bande s'affichait par-dessus le contenu des pages qui ne
       déclarent aucune scène. */
    const cache = etat === 'offre' || etat === 'absent'
    pr.visible = !cache
    if (cache) return

    const fige = mouvement === 'aucun'
    const p = etat === 'logo' ? Math.min(1, progression / 0.25) : 1

    /* ── Épaisseur ────────────────────────────────────────────────────────
       Elle monte entre p = 0,1 et p = 0,5 (fiche 11.1). Avant 0,1 la bande
       est rigoureusement plate : c'est la fenêtre où la superposition au
       logo doit être exacte. */
    const e = MathUtils.smoothstep(p, 0.1, 0.5)
    const epaisseur = MathUtils.lerp(EPAISSEUR_MIN, EPAISSEUR_MAX, e)
    g.scale.z = epaisseur

    /* ── Rotation ─────────────────────────────────────────────────────────
       0 → 35° sur Y et 0 → −8° sur X entre p = 0,4 et p = 1. Sous mouvement
       réduit, la bande ne tourne pas du tout. */
    const r = fige ? 0 : MathUtils.smoothstep(p, 0.4, 1)
    const baseY = MathUtils.degToRad(35) * r
    const baseX = MathUtils.degToRad(-8) * r

    /* ── Inclinaison au pointeur ──────────────────────────────────────────
       Agrément seulement, ± 4°, amortie. Jamais plus : au-delà, l'objet
       « colle » au curseur et devient un gadget. */
    if (!fige) {
      pointeur.current.x = etatTrois.pointer.x
      pointeur.current.y = etatTrois.pointer.y
    }
    const k = 1 - Math.exp(-delta * 4)
    inclinaison.current.x += (pointeur.current.y * -0.07 - inclinaison.current.x) * k
    inclinaison.current.y += (pointeur.current.x * 0.07 - inclinaison.current.y) * k

    g.rotation.y = baseY + (fige ? 0 : inclinaison.current.y)
    g.rotation.x = baseX + (fige ? 0 : inclinaison.current.x)

    /* ── Respiration ──────────────────────────────────────────────────────
       Au repos, un souffle de 1 % toutes les 4 secondes. Elle s'arrête dès
       le niveau « léger » : le dossier interdit toute boucle de plus de 5 s
       sans possibilité d'arrêt. */
    if (mouvement === 'plein' && p < 0.05) {
      const souffle = 1 + Math.sin(etatTrois.clock.elapsedTime * (Math.PI * 2) / 4) * 0.006
      g.scale.x = souffle
      g.scale.y = souffle
    } else {
      g.scale.x = 1
      g.scale.y = 1
    }

    /* ── Ancrage sur la mise en page ───────────────────────────────────────
       La page déclare une boîte ; la bande s'y place. La conversion est
       directe parce que la caméra regarde l'origine et que la hauteur
       visible au plan z = 0 est connue : une fraction d'écran devient une
       fraction de cette hauteur. Sans ancrage (pages sans hero), la bande
       reste centrée. */
    const anc = useBande.getState().ancrage
    if (anc) {
      /* La hauteur visible vient du cadrage partagé, PAS de
         `state.viewport` : la projection de cette scène est une matrice
         mélangée ortho/perspective, et `viewport` la calcule comme si
         c'était une perspective ordinaire. Il renvoyait donc une valeur
         fausse, et la bande se plaçait hors du cadre — le premier rendu du
         hero montrait un trou à la place du ruban. */
      const portrait = etatTrois.size.width < 900
      const hauteurVue = hauteurVisible(portrait)
      const largeurVue = hauteurVue * (etatTrois.size.width / Math.max(1, etatTrois.size.height))
      pr.position.x = (anc.cx - 0.5) * largeurVue
      pr.position.y = (0.5 - anc.cy) * hauteurVue
      const e = (anc.hauteur * hauteurVue) / HAUTEUR_MONDE
      pr.scale.setScalar(e)
    } else {
      pr.position.set(0, 0, 0)
      pr.scale.setScalar(1)
    }

    /* ── Teinte d'accent ──────────────────────────────────────────────────
       Seul le brin navy prend l'accent du projet : l'ambre du logo ne change
       jamais de teinte au-delà de ses deux valeurs (règle 4.2 §2). */
    const mailles = g.children as { material?: { color?: Color } }[]
    const matNavy = mailles[0]?.material
    if (matNavy?.color) {
      cible.set(accent ?? NAVY)
      matNavy.color.lerp(cible, 1 - Math.exp(-delta * 3))
    }
  })

  return (
    <group ref={porteur}>
      <group ref={groupe}>
        <mesh geometry={navy} castShadow receiveShadow>
          <meshStandardMaterial color={NAVY} roughness={0.92} metalness={0} />
        </mesh>
        <mesh geometry={ambre} castShadow receiveShadow>
          <meshStandardMaterial color={AMBRE} roughness={0.86} metalness={0} />
        </mesh>
      </group>
    </group>
  )
}
