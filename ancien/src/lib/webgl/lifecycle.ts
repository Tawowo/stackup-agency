/**
 * Cycle de vie d'une scène three.js.
 *
 * Une fuite WebGL ne se voit pas en développement : la page est rechargée
 * avant que ça n'ait d'importance. En navigation client Next.js, en revanche,
 * monter et démonter une scène dix fois sans libérer finit par épuiser le
 * plafond de contextes WebGL du navigateur — la scène cesse simplement de
 * s'afficher, sans erreur explicite.
 *
 * Ce module rend la libération systématique et vérifiable.
 */

import type {
  Material,
  Object3D,
  Scene,
  Texture,
  WebGLRenderer,
} from 'three'

interface AvecDispose {
  dispose?: () => void
}

/** Les textures attachées à un matériau, quel que soit son type. */
function texturesDe(materiau: Material): Texture[] {
  const sortie: Texture[] = []
  for (const valeur of Object.values(materiau as unknown as Record<string, unknown>)) {
    if (valeur && typeof valeur === 'object' && 'isTexture' in valeur) {
      sortie.push(valeur as Texture)
    }
  }
  return sortie
}

/**
 * Parcourt un graphe et libère géométries, matériaux et textures.
 * Retourne le décompte, ce qui permet de l'affirmer dans un test
 * plutôt que de le supposer.
 */
export function libererGraphe(racine: Object3D): {
  geometries: number
  materiaux: number
  textures: number
} {
  let geometries = 0
  let materiaux = 0
  let textures = 0

  racine.traverse((objet) => {
    const porteur = objet as Object3D & {
      geometry?: AvecDispose
      material?: Material | Material[]
    }

    if (porteur.geometry?.dispose) {
      porteur.geometry.dispose()
      geometries++
    }

    if (porteur.material) {
      const liste = Array.isArray(porteur.material) ? porteur.material : [porteur.material]
      for (const materiau of liste) {
        for (const texture of texturesDe(materiau)) {
          texture.dispose()
          textures++
        }
        materiau.dispose()
        materiaux++
      }
    }
  })

  return { geometries, materiaux, textures }
}

/**
 * Démontage complet : graphe, renderer, contexte GL et canvas.
 *
 * `forceContextLoss()` est volontaire et non redondant avec `dispose()` :
 * `dispose()` libère les objets GL, `forceContextLoss()` rend le contexte
 * lui-même, qui est la ressource réellement plafonnée.
 */
export function demonterScene(
  renderer: WebGLRenderer | null,
  scene: Scene | null,
): void {
  if (scene) {
    libererGraphe(scene)
    scene.clear()
  }

  if (renderer) {
    renderer.dispose()
    renderer.forceContextLoss()
    const canvas = renderer.domElement
    canvas.parentNode?.removeChild(canvas)
  }
}

/**
 * Collecteur de nettoyages. Permet d'écrire le démontage à côté du montage,
 * au lieu de le reconstruire de mémoire en bas du `useEffect` — c'est là que
 * les oublis se produisent.
 */
export class Nettoyage {
  private readonly taches: Array<() => void> = []

  ajouter(tache: () => void): void {
    this.taches.push(tache)
  }

  /** Les tâches s'exécutent en ordre inverse d'ajout, comme une pile. */
  executer(): void {
    for (let i = this.taches.length - 1; i >= 0; i--) {
      try {
        this.taches[i]()
      } catch {
        // Un nettoyage qui échoue ne doit jamais empêcher les suivants :
        // c'est précisément comme ça qu'une fuite partielle devient totale.
      }
    }
    this.taches.length = 0
  }
}
