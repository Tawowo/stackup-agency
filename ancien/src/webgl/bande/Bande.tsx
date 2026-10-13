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

/* LA VARIANTE CLAIRE, pour les fonds sombres.
 *
 * Ce ne sont pas des couleurs inventées : ce sont exactement celles que
 * `LogoMarque` applique déjà quand on lui demande sa teinte « clair ».
 * Le dossier impose des variantes claire et sombre définies (§4.2), et en
 * avoir deux jeux qui divergent serait la même faute que deux versions d'une
 * condition commerciale.
 *
 * Le besoin s'est vu en capture sur LE DÉPART : le ruban y était bien
 * dessiné — le compteur du renderer annonçait ses 96 triangles — mais
 * invisible, parce que son brin #0D2C4C se pose sur un fond #070B16. Un
 * objet correctement rendu et illisible reste un objet absent. */
const NAVY_CLAIR = '#F5F3EE'
const AMBRE_CLAIR = '#FBBF24'

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
    const cache = etat === 'offre' || etat === 'absent' || etat === 'strates'
    pr.visible = !cache
    if (cache) return

    /* REPOS et PLAN sont immobiles par nature, pas seulement sous mouvement
       réduit : une bande qui respire en haut d'un article de blog ferait
       concurrence au texte, qui est la seule chose à lire sur ces pages. */
    const fige = mouvement === 'aucun' || etat === 'repos' || etat === 'plan'
    /* Au DÉPART, la progression descend de 1 à 0 : la bande part du volume
       et se replie jusqu'à la silhouette exacte du logo. C'est la même
       mécanique que la RÉVÉLATION du hero, jouée à l'envers — et c'est
       voulu : le site s'ouvre sur le logo qui devient un objet et se ferme
       sur l'objet qui redevient le logo. */
    const p =
      etat === 'logo'
        ? Math.min(1, progression / 0.25)
        : etat === 'depart'
          ? progression
          : /* REPOS : la silhouette exacte du logo, à plat — c'est la même
               contrainte qu'au repos du hero, appliquée aux pages
               éditoriales. PLAN : à plat aussi, mais vue de dessus et cotée
               par la page (dossier §11.6). */
            etat === 'repos' || etat === 'plan'
            ? 0
            : 1

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
    /* SANS BOÎTE D'ANCRAGE, le repos se place lui-même.

       Les pages éditoriales n'ont pas de place réservée pour la bande : le
       dossier la veut « petite, en haut à droite, immobile » (§11.6). C'est
       le seul état qui se positionne sans que la page le lui demande, parce
       que c'est le seul qui ne fait pas partie de la mise en page — il
       signe, il ne compose pas. */
    if (!anc && etat === 'repos') {
      const portrait = etatTrois.size.width < 900
      const hv = hauteurVisible(portrait)
      const lv = hv * (etatTrois.size.width / Math.max(1, etatTrois.size.height))
      /* La fraction de hauteur d'écran que doit occuper la signature. La
         conversion est la même que pour une boîte d'ancrage : fraction
         d'écran × hauteur visible ÷ hauteur de l'objet. La première version
         portait un facteur 4 de trop et rendait un ruban à 36 % de l'écran,
         rogné par le bord droit — vu en capture. */
      const part = portrait ? 0.07 : 0.085
      pr.scale.setScalar((part * hv) / HAUTEUR_MONDE)
      /* Placée d'après sa taille réelle, pour qu'elle ne touche jamais le
         bord : demi-largeur de l'objet plus une gouttière. */
      const demiLargeur = (part * hv) / 2
      pr.position.x = lv / 2 - demiLargeur - lv * 0.045
      pr.position.y = hv / 2 - (part * hv) / 2 - hv * 0.08
      return
    }
    /* UN ÉTAT QUI COMPOSE N'EXISTE PAS SANS PLACE.

       Les états `plan` et `ombre` font partie d'une mise en page : la page
       doit leur réserver une boîte. Sans elle, ils retombaient sur le cas
       par défaut — centre de l'écran, échelle 1 — et le ruban couvrait le
       titre et les tarifs sur /tarifs, le titre et le texte sur une fiche
       projet. Vu en capture aux deux endroits.

       C'est la même leçon que l'état « absent » : le silence d'une page vaut
       « je ne demande rien », jamais « place-toi où tu veux ». Un état qui a
       besoin d'une place et n'en a pas ne peint pas. */
    if (!anc && (etat === 'plan' || etat === 'ombre')) {
      pr.visible = false
      return
    }
    pr.visible = true

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
    const surFonce = etat === 'depart'
    const matNavy = mailles[0]?.material
    if (matNavy?.color) {
      cible.set(accent ?? (surFonce ? NAVY_CLAIR : NAVY))
      matNavy.color.lerp(cible, 1 - Math.exp(-delta * 3))
    }
    const matAmbre = mailles[1]?.material
    if (matAmbre?.color) {
      cible.set(surFonce ? AMBRE_CLAIR : AMBRE)
      matAmbre.color.lerp(cible, 1 - Math.exp(-delta * 3))
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
