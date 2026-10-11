/**
 * LE MONOLITHE — scène du hero.
 *
 * Volontairement séparée de React : la scène est une fonction qui reçoit un
 * conteneur et rend un objet de contrôle. Elle peut donc être instanciée dans
 * un test ou un banc de mesure sans monter un arbre de composants.
 *
 * Imports sélectifs depuis `three` : seules les classes utilisées entrent dans
 * le bundle (voir docs/STACKUP_OPEN_SOURCE_RESEARCH.md §5).
 */

import {
  BoxGeometry,
  Color,
  FrontSide,
  DynamicDrawUsage,
  InstancedBufferAttribute,
  InstancedMesh,
  MathUtils,
  Matrix4,
  PerspectiveCamera,
  Quaternion,
  Scene,
  ShaderMaterial,
  Vector2,
  Vector3,
  WebGLRenderer,
} from 'three'

import { monolitheFragment, monolitheVertex } from './monolithe.glsl'
import { demonterScene, Nettoyage } from './lifecycle'
import {
  MoniteurQualite,
  palierInitial,
  reglagesPour,
  type ReglagesQualite,
} from './quality'

export interface ControleMonolithe {
  /** Progression du désassemblage, 0 → 1. Pilotée par le défilement. */
  setDesassemblage: (valeur: number) => void
  /** Active ou suspend la boucle de rendu. */
  setActif: (actif: boolean) => void
  /** Palier de qualité courant, pour instrumentation et tests. */
  palier: () => string
  /** Temps de trame moyen mesuré, en ms. */
  tempsTrame: () => number
  detruire: () => void
}

/** L'angle unique du site, en radians. Miroir de `--su-angle-lumiere`. */
const ANGLE_LUMIERE = (-18 * Math.PI) / 180

const HAUTEUR_PILE = 7.6

/**
 * Silhouette de la pile. Deux sinus de périodes premières entre elles : le
 * profil ne se répète pas visiblement sur la hauteur, contrairement à un sinus
 * unique dont la périodicité se lit immédiatement.
 */
function largeurAuNiveau(t: number): number {
  return 1.62 + 0.26 * Math.sin(t * 5.1 + 0.6) + 0.11 * Math.sin(t * 12.7)
}

export function creerMonolithe(conteneur: HTMLElement): ControleMonolithe | null {
  const nettoyage = new Nettoyage()

  let renderer: WebGLRenderer
  try {
    renderer = new WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
      // La scène n'est jamais capturée ni lue en pixels : ne pas conserver
      // le tampon de dessin économise de la bande passante mémoire.
      preserveDrawingBuffer: false,
    })
  } catch {
    // Création refusée (pilote, plafond de contextes, GPU désactivé).
    // L'appelant affichera le repli CSS.
    return null
  }

  const scene = new Scene()
  const camera = new PerspectiveCamera(42, 1, 0.1, 100)

  let reglages: ReglagesQualite = reglagesPour(
    palierInitial(),
    typeof window === 'undefined' ? 1 : window.devicePixelRatio || 1,
  )

  renderer.setPixelRatio(reglages.pixelRatio)
  renderer.setClearAlpha(0)
  renderer.domElement.setAttribute('aria-hidden', 'true')
  conteneur.appendChild(renderer.domElement)

  // ---- Géométrie : une plaque, réutilisée par toutes les instances --------
  // Une BoxGeometry de 12 triangles par strate. 150 instances = 1 800
  // triangles pour toute la scène : le coût réel est dans les pixels, pas
  // dans la géométrie, ce qui laisse de la marge sur mobile.
  const plaque = new BoxGeometry(1, 1, 1)

  const materiau = new ShaderMaterial({
    vertexShader: monolitheVertex,
    fragmentShader: monolitheFragment,
    transparent: true,
    // Écrire la profondeur est indispensable : sans cela les ~190 plaques se
    // mélangent par transparence et la pile devient une bouillie brune au lieu
    // d'un volume lisible. Le coût est un léger défaut de tri pendant les
    // 1,8 s d'assemblage — très largement préférable.
    depthWrite: true,
    // FrontSide, pas DoubleSide : les faces arrière doublaient inutilement le
    // coût de fragment et ajoutaient des bords parasites sur fond clair.
    side: FrontSide,
    uniforms: {
      uTemps: { value: 0 },
      uAssemblage: { value: 0 },
      uDesassemblage: { value: 0 },
      uPointeur: { value: new Vector2(0, 0) },
      uMatiere: { value: new Color('#2a4d7a') },
      uOmbre: { value: new Color('#17304f') },
      uLumiere: { value: new Color('#fbbf24') },
      uRim: { value: new Color('#2d7dd2') },
      uAngleLumiere: { value: ANGLE_LUMIERE },
      uEffets: { value: reglages.effets ? 1 : 0 },
    },
  })

  let maillage: InstancedMesh | null = null

  /** (Re)construit le maillage pour un nombre d'instances donné. */
  function construire(nombre: number) {
    if (maillage) {
      scene.remove(maillage)
      maillage.dispose()
    }

    maillage = new InstancedMesh(plaque, materiau, nombre)
    maillage.instanceMatrix.setUsage(DynamicDrawUsage)
    maillage.frustumCulled = false

    const matrice = new Matrix4()
    const position = new Vector3()
    const rotation = new Quaternion()
    const echelle = new Vector3()
    const axeY = new Vector3(0, 1, 0)

    const phases = new Float32Array(nombre)
    const niveaux = new Float32Array(nombre)

    const epaisseur = (HAUTEUR_PILE / nombre) * 0.74

    for (let i = 0; i < nombre; i++) {
      const t = i / (nombre - 1)
      const largeur = largeurAuNiveau(t)

      position.set(0, t * HAUTEUR_PILE - HAUTEUR_PILE / 2, 0)
      // Torsion lente et constante : la pile se visse sur sa hauteur. C'est ce
      // qui distingue le monolithe d'un simple empilement de boîtes.
      rotation.setFromAxisAngle(axeY, t * 1.35)
      echelle.set(largeur, epaisseur, largeur * 0.64)

      matrice.compose(position, rotation, echelle)
      maillage.setMatrixAt(i, matrice)

      // Phase déterministe, pas aléatoire : le rendu est reproductible d'un
      // chargement à l'autre, ce qui rend les captures comparables.
      phases[i] = (i * 0.618034) % 1
      niveaux[i] = t
    }

    maillage.instanceMatrix.needsUpdate = true
    plaque.setAttribute('aPhase', new InstancedBufferAttribute(phases, 1))
    plaque.setAttribute('aNiveau', new InstancedBufferAttribute(niveaux, 1))

    scene.add(maillage)
  }

  construire(reglages.instances)

  // ---- Dimensionnement ----------------------------------------------------
  function dimensionner() {
    const l = conteneur.clientWidth || 1
    const h = conteneur.clientHeight || 1
    renderer.setSize(l, h, false)
    camera.aspect = l / h
    // Sur écran étroit, on recule pour que la pile tienne dans le cadre sans
    // la rétrécir — un monolithe minuscule perd tout son effet monumental.
    const etroit = l / h < 1
    // Caméra placée au-dessus du centre de la pile et inclinée vers le bas :
    // c'est la seule position d'où les faces supérieures des plaques sont
    // visibles. Sans ce tangage, l'éclairage des arêtes ne se voit pas et la
    // pile redevient un volume torsadé indifférencié.
    camera.position.set(etroit ? 0 : 0.95, 1.55, etroit ? 9.2 : 7.4)
    camera.lookAt(0, -0.45, 0)
    camera.updateProjectionMatrix()
  }

  dimensionner()

  const observateurTaille = new ResizeObserver(dimensionner)
  observateurTaille.observe(conteneur)
  nettoyage.ajouter(() => observateurTaille.disconnect())

  // ---- Pointeur -----------------------------------------------------------
  const pointeurCible = new Vector2(0, 0)
  const pointeurLisse = new Vector2(0, 0)

  function surPointeur(e: PointerEvent) {
    // Les événements tactiles ne pilotent pas la parallaxe : sur mobile le
    // doigt est sur le contenu, pas en survol.
    if (e.pointerType === 'touch') return
    const rect = conteneur.getBoundingClientRect()
    pointeurCible.set(
      ((e.clientX - rect.left) / rect.width) * 2 - 1,
      -(((e.clientY - rect.top) / rect.height) * 2 - 1),
    )
  }

  window.addEventListener('pointermove', surPointeur, { passive: true })
  nettoyage.ajouter(() => window.removeEventListener('pointermove', surPointeur))

  // ---- Qualité adaptative -------------------------------------------------
  const moniteur = new MoniteurQualite(reglages.palier, (nouveaux) => {
    reglages = nouveaux
    renderer.setPixelRatio(nouveaux.pixelRatio)
    materiau.uniforms.uEffets.value = nouveaux.effets ? 1 : 0
    construire(nouveaux.instances)
    dimensionner()
  })

  // ---- Boucle -------------------------------------------------------------
  let image = 0
  let actif = true
  let dernier = performance.now()
  let moyenne = 16.7
  let assemblage = 0
  let desassemblage = 0

  function boucle(maintenant: number) {
    image = requestAnimationFrame(boucle)
    if (!actif) return

    const dt = maintenant - dernier
    dernier = maintenant

    moyenne += (Math.min(dt, 200) - moyenne) * 0.08
    moniteur.echantillonner(dt, maintenant)

    // Assemblage : progression en temps réel, indépendante du nombre de trames,
    // pour que l'animation dure 1,8 s quelle que soit la cadence.
    assemblage = Math.min(1, assemblage + dt / 1800)

    // Lissage exponentiel du pointeur, normalisé au temps écoulé : identique
    // à 30 et à 120 fps.
    const facteur = 1 - Math.pow(0.0012, dt / 1000)
    pointeurLisse.lerp(pointeurCible, facteur)

    const u = materiau.uniforms
    u.uTemps.value = maintenant / 1000
    u.uAssemblage.value = assemblage
    u.uDesassemblage.value = desassemblage
    u.uPointeur.value.copy(pointeurLisse)

    renderer.render(scene, camera)
  }

  image = requestAnimationFrame(boucle)
  nettoyage.ajouter(() => cancelAnimationFrame(image))

  // Onglet masqué : inutile de brûler du GPU et de la batterie.
  function surVisibilite() {
    actif = !document.hidden
    dernier = performance.now()
  }
  document.addEventListener('visibilitychange', surVisibilite)
  nettoyage.ajouter(() => document.removeEventListener('visibilitychange', surVisibilite))

  // Perte de contexte GL (veille, changement de GPU, pression mémoire) :
  // sans ce gestionnaire, le navigateur affiche un canvas noir définitif.
  function surPerte(e: Event) {
    e.preventDefault()
    actif = false
  }
  function surRestauration() {
    dernier = performance.now()
    actif = !document.hidden
  }
  renderer.domElement.addEventListener('webglcontextlost', surPerte)
  renderer.domElement.addEventListener('webglcontextrestored', surRestauration)
  nettoyage.ajouter(() => {
    renderer.domElement.removeEventListener('webglcontextlost', surPerte)
    renderer.domElement.removeEventListener('webglcontextrestored', surRestauration)
  })

  return {
    setDesassemblage: (valeur) => {
      desassemblage = MathUtils.clamp(valeur, 0, 1)
    },
    setActif: (valeur) => {
      actif = valeur && !document.hidden
      dernier = performance.now()
    },
    palier: () => moniteur.palier,
    tempsTrame: () => moyenne,
    detruire: () => {
      nettoyage.executer()
      plaque.dispose()
      materiau.dispose()
      demonterScene(renderer, scene)
      maillage = null
    },
  }
}
