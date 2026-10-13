/**
 * LA GÉOMÉTRIE DE LA BANDE.
 *
 * L'objet 3D du site n'est pas un objet inventé : c'est le ruban du logo,
 * extrudé. Les deux tracés ci-dessous viennent de `LogoMarque.tsx`, où ils
 * ont été relevés sur `public/Logo_Stackup-Agency.png` par balayage ligne à
 * ligne puis ajustement par régression, avec une erreur inférieure au pixel
 * sur une largeur de 145. Ce ne sont pas des courbes redessinées à la main :
 * c'est un décalque.
 *
 * La règle 4.2 §4 du dossier est stricte : « Toute déformation de l'objet 3D
 * doit pouvoir revenir à la silhouette exacte du logo (état de repos =
 * silhouette du décalque, vue de face, en projection orthographique). »
 * D'où trois décisions :
 *
 *  1. AUCUN BISEAU. Un biseau élargit la silhouette de sa propre largeur :
 *     la superposition au PNG d'origine échouerait. Le contrat de direction
 *     artistique demande d'ailleurs des « bords nets » (9.3).
 *
 *  2. L'ÉPAISSEUR EST UNE ÉCHELLE, PAS UNE GÉOMÉTRIE. L'extrusion est
 *     construite UNE FOIS à profondeur 1, et l'épaisseur se pilote par
 *     `scale.z`. Reconstruire la géométrie à chaque image du défilement
 *     coûterait une re-triangulation complète par trame ; et à `scale.z`
 *     proche de zéro, les faces latérales ont une aire nulle : il ne reste
 *     que la face avant, donc exactement la silhouette plate.
 *
 *  3. LE REPÈRE EST CELUI DU SVG, RETOURNÉ. Le Y d'un SVG descend, celui de
 *     Three monte. Sans ce retournement le ruban est à l'envers — et comme
 *     la forme est presque symétrique, c'est le genre d'erreur qui ne se
 *     voit qu'en superposant.
 */
import { Shape, ExtrudeGeometry, type BufferGeometry } from 'three'

/* Relevés sur le fichier d'origine, ramenés à un repère de 146 × 229.
   Les deux chemins se partagent l'arête (87,148) → (144,171) : c'est le pli
   où le brin ambre passe sous le brin navy. */
export const RUBAN_NAVY = 'M144 1 L144 49 L50 88 L145 125 L144 171 L87 148 L1 115 L0 68 L4 60 Z'
export const RUBAN_AMBRE = 'M87 148 L144 171 L144 173 L1 228 L1 181 Z'

/** Le cadre du tracé d'origine, en unités SVG. */
export const CADRE = { largeur: 146, hauteur: 229 }

/**
 * Hauteur de la bande dans la scène, en unités monde. Toute la composition
 * (caméra, ombre, écartement des lamelles) se cale dessus : une seule
 * constante à bouger si l'échelle doit changer.
 */
export const HAUTEUR_MONDE = 4


/**
 * Lit un tracé composé uniquement de `M`, `L` et `Z`.
 *
 * Les deux chemins du logo sont des polygones : aucune courbe, aucun arc.
 * Un analyseur complet de `d` serait du code mort à 90 %, et chaque ligne
 * d'un analyseur non utilisé est une ligne qui peut mentir. Celui-ci échoue
 * bruyamment si un jour une commande inattendue apparaît.
 */
function lirePolygone(d: string): [number, number][] {
  /* Découpe en JETONS, pas en mots séparés par des espaces.
     Première version : `d.split(/[\s,]+/)`. Elle échouait dès le premier
     caractère, parce qu'un `d` SVG colle la commande à sa première
     coordonnée : « M144 1 » donne le jeton « M144 », pas « M » puis « 144 ».
     L'erreur est tombée au premier chargement de la scène — l'analyseur
     criait, c'est ce qu'on lui demandait. */
  const jetons = d.match(/[MLZmlz]|-?\d*\.?\d+/g) ?? []
  const points: [number, number][] = []
  let i = 0
  while (i < jetons.length) {
    const commande = jetons[i]
    if (commande === 'M' || commande === 'L' || commande === 'm' || commande === 'l') {
      const x = Number(jetons[i + 1])
      const y = Number(jetons[i + 2])
      if (!Number.isFinite(x) || !Number.isFinite(y)) {
        throw new Error(
          `Tracé du ruban illisible près de « ${commande} ${jetons[i + 1]} ${jetons[i + 2]} »`,
        )
      }
      if (commande === 'm' || commande === 'l') {
        // Les deux tracés du logo sont en absolu ; le relatif est géré par
        // sécurité plutôt que rejeté, mais il n'a jamais servi ici.
        const [px, py] = points[points.length - 1] ?? [0, 0]
        points.push([px + x, py + y])
      } else {
        points.push([x, y])
      }
      i += 3
    } else if (commande === 'Z' || commande === 'z') {
      i += 1
    } else {
      throw new Error(
        `Commande « ${commande} » inattendue dans le tracé du ruban : cet analyseur ne lit que M, L et Z.`,
      )
    }
  }
  if (points.length < 3) {
    throw new Error(`Tracé du ruban dégénéré : ${points.length} point(s).`)
  }
  return points
}

/**
 * Convertit un tracé en `Shape`, centré sur l'origine et à l'échelle monde.
 *
 * Le centrage se fait sur le cadre COMMUN aux deux brins, pas sur le cadre
 * de chacun : sinon les deux morceaux du ruban se recentreraient séparément
 * et le pli ne tomberait plus en face.
 */
/**
 * La boîte englobante RÉELLE des deux tracés réunis.
 *
 * Le viewBox nominal est 146 × 229, mais les points vont en fait de x = 0 à
 * x = 145 et de y = 1 à y = 228. Se caler sur le viewBox plutôt que sur les
 * points introduit un décalage d'un pixel sur chaque bord — invisible à
 * l'œil, mesurable à la superposition. On normalise donc sur ce que les
 * tracés occupent vraiment, pas sur le cadre qu'on leur a donné.
 */
const ETENDUE = (() => {
  const tous = [...lirePolygone(RUBAN_NAVY), ...lirePolygone(RUBAN_AMBRE)]
  const xs = tous.map((p) => p[0])
  const ys = tous.map((p) => p[1])
  const x0 = Math.min(...xs)
  const x1 = Math.max(...xs)
  const y0 = Math.min(...ys)
  const y1 = Math.max(...ys)
  return { x0, y0, largeur: x1 - x0, hauteur: y1 - y0 }
})()

function versForme(d: string): Shape {
  const points = lirePolygone(d)
  const forme = new Shape()
  const echelle = HAUTEUR_MONDE / ETENDUE.hauteur
  points.forEach(([x, y], index) => {
    const mx = (x - ETENDUE.x0 - ETENDUE.largeur / 2) * echelle
    // Y retourné : le repère SVG descend, celui de Three monte.
    const my = (ETENDUE.y0 + ETENDUE.hauteur / 2 - y) * echelle
    if (index === 0) forme.moveTo(mx, my)
    else forme.lineTo(mx, my)
  })
  forme.closePath()
  return forme
}

const OPTIONS = {
  // Profondeur 1 : l'épaisseur réelle est appliquée par `scale.z`. Voir §2.
  depth: 1,
  bevelEnabled: false,
  curveSegments: 1,
  steps: 1,
} as const

/** Les deux brins, en géométries extrudées prêtes à l'emploi. */
export function creerGeometriesBande(): { navy: BufferGeometry; ambre: BufferGeometry } {
  const navy = new ExtrudeGeometry(versForme(RUBAN_NAVY), OPTIONS)
  const ambre = new ExtrudeGeometry(versForme(RUBAN_AMBRE), OPTIONS)
  // L'extrusion part de z = 0 vers z = +1. On la recentre pour que l'objet
  // s'épaississe des deux côtés du plan du logo et non vers l'avant : sans
  // ça, la silhouette glisse à l'écran quand l'épaisseur monte.
  navy.translate(0, 0, -0.5)
  ambre.translate(0, 0, -0.5)
  navy.computeVertexNormals()
  ambre.computeVertexNormals()
  return { navy, ambre }
}

/** Largeur de la bande en unités monde, utile au cadrage de la caméra. */
export const LARGEUR_MONDE = (ETENDUE.largeur / ETENDUE.hauteur) * HAUTEUR_MONDE
