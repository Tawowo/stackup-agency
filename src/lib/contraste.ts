/**
 * Choix automatique d'une couleur de texte lisible sur un fond donné.
 *
 * Nécessaire parce que certaines couleurs sont des données, pas des choix de
 * mise en page : l'accent de chaque projet du showroom vient de la fiche du
 * projet. Écrire « texte blanc » en dur fonctionne sur un accent sombre et
 * échoue sur un accent clair — axe-core a relevé 1,84:1 sur l'accent doré
 * #E8B84B, très loin du seuil de 4,5:1.
 *
 * Calculer évite d'avoir à se souvenir de vérifier à chaque nouvel accent.
 */

/** Luminance relative, formule WCAG 2.x. */
function luminance(hex: string): number {
  const propre = hex.replace('#', '')
  const n = parseInt(
    propre.length === 3
      ? propre.split('').map((c) => c + c).join('')
      : propre,
    16,
  )
  const canal = (v: number) => {
    const c = v / 255
    return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4)
  }
  return 0.2126 * canal((n >> 16) & 255) + 0.7152 * canal((n >> 8) & 255) + 0.0722 * canal(n & 255)
}

export function contraste(a: string, b: string): number {
  const l1 = luminance(a)
  const l2 = luminance(b)
  return (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05)
}

const ENCRE = '#0C1626'
const BLANC = '#FFFFFF'

/**
 * Retourne celle des deux couleurs de texte qui contraste le mieux avec le
 * fond. On ne choisit pas « la plus jolie » mais la plus lisible : sur un
 * fond intermédiaire, le meilleur des deux peut rester sous 4,5:1, et c'est
 * alors le fond qu'il faut corriger — `contrasteSuffisant` permet de le voir.
 */
export function texteLisibleSur(fond: string): string {
  return contraste(ENCRE, fond) >= contraste(BLANC, fond) ? ENCRE : BLANC
}

export function contrasteSuffisant(fond: string, seuil = 4.5): boolean {
  return contraste(texteLisibleSur(fond), fond) >= seuil
}

/**
 * Assombrit une couleur jusqu'à ce qu'elle atteigne le seuil de contraste
 * demandé sur un fond donné.
 *
 * Utile quand la couleur est une donnée : l'accent d'un projet vient de sa
 * fiche, pas d'un choix de mise en page. L'accent doré #E8B84B ne donne que
 * 1,78:1 sur ivoire ; plutôt que de corriger chaque fiche à la main — et
 * d'oublier la suivante —, on dérive une variante lisible de l'accent en
 * conservant sa teinte, donc l'identité visuelle du projet.
 *
 * Le facteur 0,94 par pas fait converger en une trentaine d'itérations au
 * pire, et la boucle est bornée pour ne jamais tourner indéfiniment si la
 * couleur ne peut pas atteindre le seuil.
 */
export function assombrirJusquAu(
  couleur: string,
  fond: string,
  seuil = 4.5,
): string {
  const propre = couleur.replace('#', '')
  const base = propre.length === 3 ? propre.split('').map((c) => c + c).join('') : propre
  const n = parseInt(base, 16)
  let r = (n >> 16) & 255
  let v = (n >> 8) & 255
  let b = n & 255

  for (let i = 0; i < 40; i++) {
    const hex = '#' + [r, v, b].map((c) => Math.round(c).toString(16).padStart(2, '0')).join('')
    if (contraste(hex, fond) >= seuil) return hex
    r *= 0.94
    v *= 0.94
    b *= 0.94
    if (r < 1 && v < 1 && b < 1) break
  }
  return '#0C1626'
}

/** Le fond clair de référence du site. */
export const IVOIRE = '#FFFDF9'
