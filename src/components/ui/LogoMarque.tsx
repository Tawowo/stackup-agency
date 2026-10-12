/**
 * LE LOGO STACKUP AGENCY.
 *
 * Deux parties, traitées différemment parce qu'elles n'ont pas les mêmes
 * contraintes :
 *
 *  1. LA MARQUE — un ruban plié en zigzag, deux brins navy et un brin ambre.
 *     Elle est redessinée ici en SVG, à partir des coordonnées RELEVÉES sur
 *     `public/Logo_Stackup-Agency.png` : chaque arête du fichier d'origine a
 *     été scannée ligne par ligne puis ajustée par régression, avec une
 *     erreur inférieure au pixel sur une largeur de 145. Ce n'est pas une
 *     réinterprétation, c'est un décalque. En vectoriel, elle reste nette à
 *     toute taille et ses couleurs se pilotent — indispensable, puisque le
 *     site traverse le jour et la nuit.
 *
 *  2. LE LETTRAGE — « Stackup » et « AGENCY », dans la fonte du logo
 *     d'origine (un sans géométrique à `a` d'un seul étage, de la famille de
 *     Poppins), que le site ne charge pas.
 *     Plutôt que d'ajouter une fonte entière pour sept lettres, ou de
 *     retracer des courbes à la main — deux façons de s'éloigner de
 *     l'original — le lettrage est extrait du fichier de marque en MASQUE
 *     ALPHA. Les lettres sont donc exactement celles du logo, et la couleur
 *     reste libre : le masque laisse passer `currentColor`.
 *
 * Pourquoi pas le PNG directement : il est en RGB sans canal alpha, sur un
 * fond #FEFEFE opaque. Posé sur l'encre, il affiche un rectangle blanc ; et
 * détouré, son navy devient illisible sur fond sombre. Mesuré avant de
 * choisir cette solution.
 */

type Teinte = 'auto' | 'navy' | 'clair'

interface Props {
  /** Afficher le lettrage à côté de la marque. */
  avecTexte?: boolean
  /** Hauteur de la marque, en pixels. Le lettrage suit. */
  taille?: number
  /**
   * `auto` suit `currentColor` pour le lettrage et garde les couleurs de la
   * marque — c'est le cas normal. `navy` et `clair` forcent une version
   * monochrome, pour les fonds qui ne laissent pas le choix.
   */
  teinte?: Teinte
  className?: string
}

/* Coordonnées relevées sur le fichier d'origine, ramenées à un repère de
   146 × 229. Les deux chemins se partagent l'arête (87,148) → (144,171) :
   c'est le pli où le brin ambre passe sous le brin navy. */
const RUBAN_NAVY = 'M144 1 L144 49 L50 88 L145 125 L144 171 L87 148 L1 115 L0 68 L4 60 Z'
const RUBAN_AMBRE = 'M87 148 L144 171 L144 173 L1 228 L1 181 Z'

export default function LogoMarque({
  avecTexte = true,
  taille = 34,
  teinte = 'auto',
  className = '',
}: Props) {
  /* `taille = 0` : le dimensionnement vient du CSS, pas de la prop. C'est
     ce qu'il faut dans le hero, où la marque doit remplir une boîte fluide
     dont la hauteur est en `vh`. On retire alors width/height du SVG et on
     laisse le viewBox et le CSS s'en charger. */
  const auto = taille === 0
  const largeurMarque = Math.round((taille * 146) / 229)
  // Les brins passent par des variables CSS : le navy d'origine (#0D2C4C)
  // disparaît sur l'encre de l'accueil nocturne — mesuré, la marque y était
  // invisible. `--su-logo-brin` suit donc la traversée jour/nuit, tandis que
  // l'ambre, lisible des deux côtés, ne bouge pas.
  const brin = teinte === 'clair' ? 'currentColor' : 'var(--su-logo-brin, #0D2C4C)'
  const ambre = teinte === 'clair' ? 'var(--su-logo-ambre, #FBBF24)' : 'var(--su-logo-ambre, #F69106)'

  return (
    <span className={`su-logo ${className}`} data-teinte={teinte}>
      <svg
        className="su-logo__marque"
        {...(auto ? {} : { width: largeurMarque, height: taille })}
        viewBox="0 0 146 229"
        fill="none"
        aria-hidden="true"
        focusable="false"
      >
        <path d={RUBAN_AMBRE} fill={ambre} />
        <path d={RUBAN_NAVY} fill={brin} />
      </svg>

      {avecTexte && (
        <span
          className="su-logo__mot"
          {...(auto ? {} : { style: { height: taille * 0.74 } })}
          aria-hidden="true"
        />
      )}

      {/* Le nom lisible est porté par le texte, pas par l'image : le masque
          et le SVG sont décoratifs. */}
      <span className="sr-only">Stackup Agency</span>
    </span>
  )
}
