/**
 * LE PASSAGE — moteur de scène.
 *
 * Un seul nuage de particules persiste sur toute la page d'accueil et change
 * de forme en fonction de la section traversée. Le défilement ne déclenche
 * pas des animations séparées : il déplace un curseur le long d'une
 * narration continue.
 *
 * L'ambiance (jour ↔ encre) est publiée sur `--su-nuit` à la racine du
 * document. Le fond de la page est donc piloté en CSS, pas par le canvas :
 * sans WebGL, la traversée jour → nuit → jour existe quand même.
 */

import {
  AdditiveBlending,
  BufferAttribute,
  BufferGeometry,
  Color,
  NormalBlending,
  PerspectiveCamera,
  Points,
  Scene,
  ShaderMaterial,
  Vector3,
  WebGLRenderer,
} from 'three'

import { nuageFragment, nuageVertex } from './nuage.glsl'
import { demonterScene, Nettoyage } from './lifecycle'

export interface EtatScene {
  /** Valeur de `data-scene` qui active cet état. */
  cle: string
  /** Décalage du nuage dans le cadre, en unités monde. */
  decalage: [number, number, number]
  /** Indice de forme dans le shader. */
  forme: number
  /** Position de la caméra. */
  camera: [number, number, number]
  /** Point visé. */
  vise: [number, number, number]
  /** 0 = plein jour, 1 = encre. */
  nuit: number
  /** Amplitude de la turbulence au repos. */
  turbulence: number
  /** Taille de base des particules. */
  taille: number
  /** Rotation continue du nuage, en tours par seconde. */
  rotation: number
}

export const ETATS: EtatScene[] = [
  {
    // L'OUVERTURE — pleine nuit.
    //
    // Les particules ne sont belles qu'en émission. Sur de l'ivoire elles
    // lisent comme de la poussière ; sur de l'encre elles lisent comme de
    // la lumière. La page s'ouvre donc dans le noir, là où le spectaculaire
    // a le droit d'exister, et ira chercher le plein jour pour les sections
    // où c'est la lisibilité qui compte.
    cle: 'ouverture',
    forme: 1,
    // L'empilement se tient dans la colonne LIBRE de droite, au-dessus de la
    // ligne de données. Avant : il chevauchait le mot porteur et se faisait
    // couper par le filet du bas.
    decalage: [5.6, 0.9, 0],
    camera: [0, 0.35, 17.6],
    vise: [0, -0.3, 0],
    nuit: 1,
    turbulence: 0.1,
    taille: 2.15,
    rotation: 0.024,
  },
  {
    // LE SEUIL — le franchissement.
    //
    // « Une structure devient une interface » : le monolithe se défait et
    // se reforme en maquette de site. C'est la métamorphose porteuse, et
    // elle se joue exactement là où la page bascule de la nuit au jour,
    // dans une zone volontairement dépourvue de texte courant.
    cle: 'seuil',
    forme: 2,
    decalage: [0, 0.4, 0],
    camera: [0, 0.2, 16.8],
    vise: [0, -0.1, 0],
    nuit: 0.5,
    turbulence: 0.07,
    taille: 2.6,
    rotation: 0.005,
  },
  {
    // LE PLEIN JOUR — la scène se retire en filigrane.
    //
    // De jour, le nuage n'est plus le sujet : il devient une trame pâle
    // derrière le contenu. Il ne cherche pas à rivaliser avec le texte.
    cle: 'preuve',
    forme: 2,
    decalage: [0, 0.2, 0],
    camera: [1.4, 0.6, 15.4],
    vise: [0, -0.1, 0],
    nuit: 0,
    turbulence: 0.09,
    taille: 2.2,
    rotation: 0.012,
  },
  {
    cle: 'noyau',
    forme: 3,
    decalage: [-3.4, 0, 0],
    camera: [0, 0.5, 13.6],
    vise: [0, 0, 0],
    nuit: 0,
    turbulence: 0.16,
    taille: 2.1,
    rotation: 0.04,
  },
  {
    cle: 'flux',
    forme: 4,
    decalage: [3.2, 0.4, 0],
    camera: [0.8, 2.0, 15.2],
    vise: [0, 0, 0],
    nuit: 0,
    turbulence: 0.22,
    taille: 2.0,
    rotation: 0.03,
  },
  {
    // LA SORTIE — la nuit revient, et l'objet du début avec elle.
    //
    // On referme sur la forme rencontrée à l'ouverture : la traversée a
    // un début et une fin, pas seulement une suite d'états.
    cle: 'sortie',
    forme: 1,
    decalage: [0, -0.1, 0],
    camera: [0, 0.6, 17.8],
    vise: [0, -0.2, 0],
    nuit: 1,
    turbulence: 0.14,
    taille: 2.5,
    rotation: 0.02,
  },
]

const PALIERS = {
  haute: { particules: 56000, dprMax: 1.75 },
  moyenne: { particules: 26000, dprMax: 1.4 },
  basse: { particules: 9000, dprMax: 1 },
} as const

type Palier = keyof typeof PALIERS

export interface ControlePassage {
  /** Progression globale, pilotée par le défilement de la page. */
  majDefilement: () => void
  setActif: (actif: boolean) => void
  palier: () => Palier
  tempsTrame: () => number
  etatCourant: () => string
  detruire: () => void
}

function palierInitial(): Palier {
  // Dérogation d'observation : `?qualite=haute` fige le palier et neutralise
  // la dégradation adaptative. Indispensable pour juger le rendu réel depuis
  // un navigateur sans GPU — SwiftShader descend toujours au palier bas, et
  // on finirait par corriger l'image d'un matériel que personne n'a.
  //
  // Réservé à l'inspection : un visiteur qui forcerait le palier haut sur une
  // machine lente ne casserait rien d'autre que sa propre cadence.
  const force = new URLSearchParams(location.search).get('qualite')
  if (force === 'haute' || force === 'moyenne' || force === 'basse') return force

  const nav = navigator as Navigator & { deviceMemory?: number; connection?: { saveData?: boolean } }
  if (nav.connection?.saveData) return 'basse'
  const coeurs = navigator.hardwareConcurrency ?? 4
  const memoire = nav.deviceMemory ?? 4
  const etroit = window.innerWidth < 900
  if (coeurs <= 4 || memoire <= 4) return etroit ? 'basse' : 'moyenne'
  return etroit ? 'moyenne' : 'haute'
}

/** Interpolation douce, sans à-coup aux extrémités. */
function adoucir(t: number): number {
  return t * t * (3 - 2 * t)
}

function melanger(a: number, b: number, t: number): number {
  return a + (b - a) * t
}

export function creerPassage(conteneur: HTMLElement): ControlePassage | null {
  const nettoyage = new Nettoyage()

  let renderer: WebGLRenderer
  try {
    renderer = new WebGLRenderer({
      alpha: true,
      antialias: false, // inutile pour des points ; coûteux
      powerPreference: 'high-performance',
      preserveDrawingBuffer: false,
    })
  } catch {
    return null
  }

  let palier: Palier = palierInitial()
  const scene = new Scene()
  const camera = new PerspectiveCamera(46, 1, 0.1, 200)

  renderer.setClearAlpha(0)
  renderer.domElement.setAttribute('aria-hidden', 'true')
  conteneur.appendChild(renderer.domElement)

  // ── Géométrie ────────────────────────────────────────────────────────────
  // Aucune position n'est stockée : seules une graine et un rang par
  // particule. Les formes sont calculées dans le vertex shader.
  const geometrie = new BufferGeometry()

  function remplir(nombre: number) {
    const graines = new Float32Array(nombre * 3)
    const rangs = new Float32Array(nombre)
    // Suite de Van der Corput : une répartition sans grumeaux, et surtout
    // reproductible — deux chargements donnent la même image.
    for (let i = 0; i < nombre; i++) {
      let bits = i
      let vdc = 0
      let denom = 1
      for (let k = 0; k < 16; k++) {
        denom *= 2
        vdc += (bits & 1) / denom
        bits >>= 1
      }
      graines[i * 3] = vdc
      graines[i * 3 + 1] = ((i * 2654435761) % 10007) / 10007
      graines[i * 3 + 2] = ((i * 40503) % 7919) / 7919
      rangs[i] = i
    }
    geometrie.setAttribute('position', new BufferAttribute(new Float32Array(nombre * 3), 3))
    geometrie.setAttribute('aGraine', new BufferAttribute(graines, 3))
    geometrie.setAttribute('aRang', new BufferAttribute(rangs, 1))
    geometrie.setDrawRange(0, nombre)
  }

  remplir(PALIERS[palier].particules)

  const materiau = new ShaderMaterial({
    vertexShader: nuageVertex,
    fragmentShader: nuageFragment,
    transparent: true,
    depthWrite: false,
    depthTest: false,
    blending: NormalBlending,
    uniforms: {
      uTemps: { value: 0 },
      uTotal: { value: PALIERS[palier].particules },
      uFormeA: { value: 0 },
      uFormeB: { value: 0 },
      uMorph: { value: 0 },
      uAssemblage: { value: 0 },
      uPointeur: { value: new Vector3(999, 999, 999) },
      uForcePointeur: { value: 0 },
      uTurbulence: { value: 0.5 },
      uTaille: { value: 2 },
      uDpr: { value: 1 },
      uEclat: { value: 0 },
      uMatiere: { value: new Color('#1e3a5f') },
      uAccent: { value: new Color('#b45309') },
      uLumiere: { value: new Color('#f59e0b') },
      uNuit: { value: 0 },
      uOpacite: { value: 0.85 },
    },
  })

  const nuage = new Points(geometrie, materiau)
  nuage.frustumCulled = false
  scene.add(nuage)

  // ── Couleurs par ambiance ────────────────────────────────────────────────
  // DE JOUR, LA SCÈNE SE RETIRE PRESQUE ENTIÈREMENT.
  //
  // Elle a d'abord été réglée à 0,3 : une trame pâle derrière tout le
  // contenu. Regardé section par section, c'était une erreur — le même
  // nuage traînait derrière l'anatomie, le réseau, les réalisations et la
  // méthode, et ramenait à une seule texture quatre sections conçues pour
  // être radicalement différentes. Le fond commun annulait la diversité
  // qu'on venait de construire.
  //
  // La scène appartient donc à la nuit : l'ouverture, les deux seuils, la
  // clôture. De jour, chaque section porte son propre mécanisme, et il ne
  // reste du nuage qu'un souffle — assez pour que les entrées et sorties de
  // nuit ne soient pas des coupures, pas assez pour teinter quoi que ce soit.
  const JOUR = {
    matiere: new Color('#9fb4cd'),
    accent: new Color('#d9a441'),
    lumiere: new Color('#f3d6a0'),
    opacite: 0.06,
  }
  // De nuit, elle émet : bleu froid lumineux ponctué d'or, en additif.
  const NUIT = {
    matiere: new Color('#8fc4ff'),
    accent: new Color('#ffc857'),
    lumiere: new Color('#fff6e2'),
    opacite: 1,
  }
  const tmpCouleur = new Color()

  // ── Dimensionnement ──────────────────────────────────────────────────────
  function dimensionner() {
    const l = conteneur.clientWidth || 1
    const h = conteneur.clientHeight || 1
    const dpr = Math.min(window.devicePixelRatio || 1, PALIERS[palier].dprMax)
    renderer.setPixelRatio(dpr)
    renderer.setSize(l, h, false)
    materiau.uniforms.uDpr.value = dpr
    camera.aspect = l / h
    camera.updateProjectionMatrix()
  }
  dimensionner()

  const observateurTaille = new ResizeObserver(dimensionner)
  observateurTaille.observe(conteneur)
  nettoyage.ajouter(() => observateurTaille.disconnect())

  // ── Progression le long de la narration ──────────────────────────────────
  // Les ancres sont les sections portant `data-scene`. On cherche la paire
  // qui encadre le défilement courant et on interpole entre leurs états.
  let ancres: { cle: string; centre: number }[] = []

  function releverAncres() {
    const els = Array.from(document.querySelectorAll<HTMLElement>('[data-scene]'))
    ancres = els
      .map((el) => {
        const r = el.getBoundingClientRect()
        return {
          cle: el.dataset.scene ?? 'ouverture',
          centre: r.top + window.scrollY + r.height / 2 - window.innerHeight / 2,
        }
      })
      .sort((a, b) => a.centre - b.centre)
  }

  releverAncres()
  const observateurPage = new ResizeObserver(releverAncres)
  observateurPage.observe(document.body)
  nettoyage.ajouter(() => observateurPage.disconnect())

  function etatPour(cle: string): EtatScene {
    return ETATS.find((e) => e.cle === cle) ?? ETATS[0]
  }

  // État courant interpolé
  let formeA = 0
  let formeB = 0
  let morphCible = 0
  let nuitCible = 0
  let turbulenceCible = 0.5
  let tailleCible = 2
  let rotationCible = 0.012
  const cameraCible = new Vector3(0, 0.9, 15.5)
  const viseCible = new Vector3(0, -0.2, 0)
  const decalageCible = new Vector3(4.4, -0.2, 0)
  let cleCourante = 'ouverture'

  function majDefilement() {
    if (ancres.length === 0) return
    const y = window.scrollY

    let i = 0
    while (i < ancres.length - 1 && y >= ancres[i + 1].centre) i++

    const a = ancres[i]
    const b = ancres[Math.min(i + 1, ancres.length - 1)]
    const span = Math.max(b.centre - a.centre, 1)
    const t = adoucir(Math.min(Math.max((y - a.centre) / span, 0), 1))

    const ea = etatPour(a.cle)
    const eb = etatPour(b.cle)

    formeA = ea.forme
    formeB = eb.forme
    morphCible = ea.forme === eb.forme ? 0 : t
    cleCourante = t < 0.5 ? a.cle : b.cle

    nuitCible = melanger(ea.nuit, eb.nuit, t)
    turbulenceCible = melanger(ea.turbulence, eb.turbulence, t)
    tailleCible = melanger(ea.taille, eb.taille, t)
    rotationCible = melanger(ea.rotation, eb.rotation, t)

    cameraCible.set(
      melanger(ea.camera[0], eb.camera[0], t),
      melanger(ea.camera[1], eb.camera[1], t),
      melanger(ea.camera[2], eb.camera[2], t),
    )
    viseCible.set(
      melanger(ea.vise[0], eb.vise[0], t),
      melanger(ea.vise[1], eb.vise[1], t),
      melanger(ea.vise[2], eb.vise[2], t),
    )
    decalageCible.set(
      melanger(ea.decalage[0], eb.decalage[0], t),
      melanger(ea.decalage[1], eb.decalage[1], t),
      melanger(ea.decalage[2], eb.decalage[2], t),
    )
  }

  // ── Pointeur ─────────────────────────────────────────────────────────────
  const pointeurEcran = { x: 0, y: 0, actif: false }
  const pointeurMonde = new Vector3(999, 999, 999)
  let forcePointeur = 0
  let eclat = 0

  function surPointeur(e: PointerEvent) {
    if (e.pointerType === 'touch') return
    pointeurEcran.x = (e.clientX / window.innerWidth) * 2 - 1
    pointeurEcran.y = -((e.clientY / window.innerHeight) * 2 - 1)
    pointeurEcran.actif = true
  }
  function surSortie() {
    pointeurEcran.actif = false
  }
  function surClic(e: PointerEvent) {
    if (e.pointerType === 'touch') return
    // Une impulsion qui part du point cliqué et retombe.
    eclat = 1
  }

  window.addEventListener('pointermove', surPointeur, { passive: true })
  window.addEventListener('pointerleave', surSortie)
  window.addEventListener('pointerdown', surClic, { passive: true })
  nettoyage.ajouter(() => {
    window.removeEventListener('pointermove', surPointeur)
    window.removeEventListener('pointerleave', surSortie)
    window.removeEventListener('pointerdown', surClic)
  })

  // ── Boucle ───────────────────────────────────────────────────────────────
  let image = 0
  let actif = true
  let dernier = performance.now()
  let moyenne = 16.7
  let assemblage = 0

  // Valeurs lissées
  let morph = 0
  let nuit = 0
  let turbulence = 0.5
  let taille = 2
  let rotation = 0.012
  const camPos = new Vector3(0, 0.9, 15.5)
  const camVise = new Vector3(0, -0.2, 0)
  const decalage = new Vector3(4.4, -0.2, 0)
  let angle = 0

  // Dégradation automatique si la cadence s'effondre durablement.
  let fenetre: number[] = []
  let derniereDecision = 0

  // Un palier forcé à la main ne doit pas être repris par la dégradation
  // automatique : sinon l'inspection retombe immédiatement au palier bas et
  // la dérogation ne sert à rien.
  const palierFige =
    typeof location !== 'undefined' && new URLSearchParams(location.search).has('qualite')

  function degrader(maintenant: number) {
    if (palierFige) return
    const ordre: Palier[] = ['haute', 'moyenne', 'basse']
    const i = ordre.indexOf(palier)
    if (i >= ordre.length - 1) return
    palier = ordre[i + 1]
    remplir(PALIERS[palier].particules)
    materiau.uniforms.uTotal.value = PALIERS[palier].particules
    dimensionner()
    derniereDecision = maintenant
    fenetre = []
  }

  function boucle(maintenant: number) {
    image = requestAnimationFrame(boucle)
    if (!actif) return

    const dt = Math.min(maintenant - dernier, 100)
    dernier = maintenant
    const k = dt / 1000

    moyenne += (dt - moyenne) * 0.06
    fenetre.push(dt)
    if (fenetre.length > 90) {
      fenetre.shift()
      const moy = fenetre.reduce((s, v) => s + v, 0) / fenetre.length
      if (moy > 30 && maintenant - derniereDecision > 2500) degrader(maintenant)
    }

    assemblage = Math.min(1, assemblage + dt / 2200)

    // Lissage exponentiel normalisé au temps : identique à 30 ou 120 images/s.
    const f = 1 - Math.pow(0.0015, k)
    morph += (morphCible - morph) * f
    nuit += (nuitCible - nuit) * f
    turbulence += (turbulenceCible - turbulence) * f
    taille += (tailleCible - taille) * f
    rotation += (rotationCible - rotation) * f
    camPos.lerp(cameraCible, f)
    camVise.lerp(viseCible, f)
    decalage.lerp(decalageCible, f)
    nuage.position.copy(decalage)

    // Pointeur : projeté sur le plan z = 0, puis lissé.
    if (pointeurEcran.actif) {
      const cible = new Vector3(pointeurEcran.x, pointeurEcran.y, 0.5).unproject(camera)
      const dir = cible.sub(camPos).normalize()
      const distance = -camPos.z / (dir.z || -1)
      pointeurMonde.lerp(camPos.clone().add(dir.multiplyScalar(distance)), 1 - Math.pow(0.002, k))
      forcePointeur += (1 - forcePointeur) * f
    } else {
      forcePointeur += (0 - forcePointeur) * f * 0.6
    }

    eclat *= Math.pow(0.08, k)

    angle += rotation * k * Math.PI * 2
    nuage.rotation.y = angle
    // Légère inclinaison pilotée par le pointeur : la scène a une inertie.
    nuage.rotation.x = pointeurEcran.y * 0.09
    nuage.rotation.z = pointeurEcran.x * 0.03

    camera.position.copy(camPos)
    camera.lookAt(camVise)

    const u = materiau.uniforms
    u.uTemps.value = maintenant / 1000
    u.uFormeA.value = formeA
    u.uFormeB.value = formeB
    u.uMorph.value = morph
    u.uAssemblage.value = assemblage
    u.uTurbulence.value = turbulence
    u.uTaille.value = taille
    u.uNuit.value = nuit
    u.uPointeur.value.copy(pointeurMonde)
    u.uForcePointeur.value = forcePointeur
    u.uEclat.value = eclat

    u.uMatiere.value.copy(tmpCouleur.copy(JOUR.matiere).lerp(NUIT.matiere, nuit))
    u.uAccent.value.copy(tmpCouleur.copy(JOUR.accent).lerp(NUIT.accent, nuit))
    u.uLumiere.value.copy(tmpCouleur.copy(JOUR.lumiere).lerp(NUIT.lumiere, nuit))
    u.uOpacite.value = melanger(JOUR.opacite, NUIT.opacite, nuit)

    // De nuit, les particules s'additionnent : elles rayonnent au lieu de
    // se recouvrir. De jour, ce mode délaverait tout sur l'ivoire.
    const voulu = nuit > 0.55 ? AdditiveBlending : NormalBlending
    if (materiau.blending !== voulu) {
      materiau.blending = voulu
      materiau.needsUpdate = true
    }

    // Publie l'ambiance pour que le DOM suive la même traversée.
    document.documentElement.style.setProperty('--su-nuit', nuit.toFixed(3))

    renderer.render(scene, camera)
  }

  image = requestAnimationFrame(boucle)
  nettoyage.ajouter(() => cancelAnimationFrame(image))

  // ── Défilement ───────────────────────────────────────────────────────────
  let enAttente = false
  function surDefilement() {
    if (enAttente) return
    enAttente = true
    requestAnimationFrame(() => {
      enAttente = false
      majDefilement()
    })
  }
  window.addEventListener('scroll', surDefilement, { passive: true })
  window.addEventListener('resize', releverAncres)
  nettoyage.ajouter(() => {
    window.removeEventListener('scroll', surDefilement)
    window.removeEventListener('resize', releverAncres)
  })
  majDefilement()

  // ── Veille et perte de contexte ──────────────────────────────────────────
  function surVisibilite() {
    actif = !document.hidden
    dernier = performance.now()
  }
  document.addEventListener('visibilitychange', surVisibilite)
  nettoyage.ajouter(() => document.removeEventListener('visibilitychange', surVisibilite))

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
    majDefilement,
    setActif: (v) => {
      actif = v && !document.hidden
      dernier = performance.now()
    },
    palier: () => palier,
    tempsTrame: () => moyenne,
    etatCourant: () => cleCourante,
    detruire: () => {
      nettoyage.executer()
      document.documentElement.style.removeProperty('--su-nuit')
      geometrie.dispose()
      materiau.dispose()
      demonterScene(renderer, scene)
    },
  }
}
