/**
 * Qualité adaptative fondée sur le temps de trame réellement mesuré.
 *
 * Pourquoi pas `detect-gpu` (956 kB) : cette bibliothèque devine la puissance
 * depuis une liste de noms de GPU, qui ne dit rien de la charge réelle de
 * l'onglet, de la batterie, de la thermique ou du nombre de calques composités.
 * Mesurer le temps de trame coûte 0 kB et répond à la seule question utile :
 * « est-ce que ça rame maintenant, sur cette machine, dans cet onglet ? »
 *
 * Référence : docs/STACKUP_OPEN_SOURCE_RESEARCH.md §5
 */

export type Palier = 'haute' | 'moyenne' | 'basse'

export interface ReglagesQualite {
  palier: Palier
  /** Densité de pixels du rendu. Plafonnée : au-delà de 2 le gain est invisible. */
  pixelRatio: number
  /** Nombre d'instances dans la scène. */
  instances: number
  antialias: boolean
  /** Effets facultatifs (grain, lueur) actifs ou non. */
  effets: boolean
}

const PALIERS: Record<Palier, Omit<ReglagesQualite, 'pixelRatio'>> = {
  haute: { palier: 'haute', instances: 190, antialias: true, effets: true },
  moyenne: { palier: 'moyenne', instances: 120, antialias: true, effets: false },
  basse: { palier: 'basse', instances: 70, antialias: false, effets: false },
}

const ORDRE: Palier[] = ['haute', 'moyenne', 'basse']

/** Budget de temps de trame avant dégradation (ms). 60 fps = 16,7 ms. */
const SEUIL_DEGRADATION = 24
/** Il faut être nettement sous le budget pour remonter : évite l'oscillation. */
const SEUIL_AMELIORATION = 13

export function reglagesPour(palier: Palier, dpr: number): ReglagesQualite {
  return { ...PALIERS[palier], pixelRatio: Math.min(dpr, palier === 'haute' ? 2 : 1.5) }
}

/**
 * Palier de départ : déduit de signaux bon marché et fiables, sans sonder le GPU.
 * Volontairement prudent — le moniteur remontera si la machine suit.
 */
export function palierInitial(): Palier {
  if (typeof window === 'undefined') return 'basse'

  const nav = navigator as Navigator & {
    deviceMemory?: number
    connection?: { saveData?: boolean }
  }

  // Mode économie de données : l'utilisateur a demandé la sobriété, on obéit.
  if (nav.connection?.saveData) return 'basse'

  const coeurs = navigator.hardwareConcurrency ?? 4
  const memoire = nav.deviceMemory ?? 4
  const petitEcran = window.innerWidth < 768

  if (coeurs <= 4 || memoire <= 4) return petitEcran ? 'basse' : 'moyenne'
  if (petitEcran) return 'moyenne'
  return 'haute'
}

/**
 * Moniteur à moyenne glissante avec hystérésis.
 *
 * Une seule trame lente ne dégrade rien (un ramasse-miettes, un onglet voisin,
 * une notification système provoquent des pics isolés). Il faut une moyenne
 * durablement mauvaise sur une fenêtre complète pour déclencher un changement.
 */
export class MoniteurQualite {
  private readonly fenetre: number[] = []
  private readonly taille = 60
  private index = 0
  private palierCourant: Palier
  private derniereDecision = 0
  /** Délai de garde après un changement : laisse la scène se stabiliser. */
  private readonly repos = 1800

  constructor(
    palierDepart: Palier,
    private readonly onChangement: (reglages: ReglagesQualite) => void,
  ) {
    this.palierCourant = palierDepart
  }

  get palier(): Palier {
    return this.palierCourant
  }

  /** À appeler une fois par trame avec le delta en millisecondes. */
  echantillonner(dt: number, maintenant: number): void {
    // Au-delà de 200 ms, ce n'est pas une trame lente : l'onglet était en
    // arrière-plan ou le thread était bloqué ailleurs. Ne pas polluer la moyenne.
    if (dt > 200) return

    this.fenetre[this.index] = dt
    this.index = (this.index + 1) % this.taille

    if (this.fenetre.length < this.taille) return
    if (maintenant - this.derniereDecision < this.repos) return

    const moyenne = this.fenetre.reduce((a, b) => a + b, 0) / this.fenetre.length
    const rang = ORDRE.indexOf(this.palierCourant)

    if (moyenne > SEUIL_DEGRADATION && rang < ORDRE.length - 1) {
      this.appliquer(ORDRE[rang + 1], maintenant)
    } else if (moyenne < SEUIL_AMELIORATION && rang > 0) {
      this.appliquer(ORDRE[rang - 1], maintenant)
    }
  }

  private appliquer(palier: Palier, maintenant: number): void {
    this.palierCourant = palier
    this.derniereDecision = maintenant
    this.fenetre.length = 0
    this.index = 0
    const dpr = typeof window === 'undefined' ? 1 : window.devicePixelRatio || 1
    this.onChangement(reglagesPour(palier, dpr))
  }
}

/**
 * Support WebGL réel : on tente la création d'un contexte et on le libère
 * immédiatement. Tester `'WebGLRenderingContext' in window` ne suffit pas —
 * la classe existe sur des machines où la création échoue (pilote sur liste
 * noire, accélération désactivée, trop de contextes déjà ouverts).
 */
export function webglDisponible(): boolean {
  if (typeof window === 'undefined') return false
  try {
    const canvas = document.createElement('canvas')
    const gl = canvas.getContext('webgl2') ?? canvas.getContext('webgl')
    if (!gl) return false
    // Libération explicite : sans cela, le contexte compte dans le plafond
    // du navigateur (~16) et peut faire échouer la vraie scène plus tard.
    const perte = gl.getExtension('WEBGL_lose_context')
    perte?.loseContext()
    return true
  } catch {
    return false
  }
}

/** L'utilisateur a-t-il demandé la réduction des animations ? */
export function mouvementReduit(): boolean {
  if (typeof window === 'undefined') return false
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}
