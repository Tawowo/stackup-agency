/**
 * LA TABLE DE CORRESPONDANCE DES OFFRES.
 *
 * Le même objet commercial portait TROIS identifiants différents selon
 * l'endroit du code :
 *
 *   store de la scène   vitrine · multipages · boutique  · gestion · association
 *   configurateur       vitrine · multipages · ecommerce · gestion · association
 *   formulaire de devis site-vitrine · site-multi-pages · site-ecommerce ·
 *                       systeme-gestion · site-association
 *
 * Conséquence mesurée : le configurateur ne pouvait pas transmettre le type
 * de projet au devis, qui le redemandait à sa première étape. Un visiteur
 * répondait donc deux fois à la même question, alors que le critère
 * d'acceptation §17.7 n° 6 exige un parcours « sans ressaisie ».
 *
 * Trois vocabulaires pour une seule notion, c'est la même maladie que les
 * trois versions de l'acompte : une divergence qui n'apparaît qu'au moment
 * où il faut relier deux morceaux. Plutôt que de renommer dans trois
 * fichiers — et de casser les liens déjà publiés qui portent `?base=` —
 * cette table traduit, et elle est le seul endroit où la correspondance
 * existe.
 */

/** L'identifiant de référence : celui du configurateur. */
export type IdOffre = 'vitrine' | 'multipages' | 'ecommerce' | 'gestion' | 'association'

/**
 * Ce que le formulaire de devis attend.
 *
 * Typé par ses valeurs littérales (`as const`) et non en `string` : le
 * formulaire déclare son champ comme une union fermée, et une table en
 * `string` l'obligerait à un cast. Un cast ici masquerait la seule erreur
 * qui compte — un identifiant mal recopié — jusqu'à l'exécution.
 */
export const VERS_DEVIS = {
  vitrine: 'site-vitrine',
  multipages: 'site-multi-pages',
  ecommerce: 'site-ecommerce',
  gestion: 'systeme-gestion',
  association: 'site-association',
} as const satisfies Record<IdOffre, string>

/** Ce que le store de la scène emploie. */
export const VERS_SCENE = {
  vitrine: 'vitrine',
  multipages: 'multipages',
  ecommerce: 'boutique',
  gestion: 'gestion',
  association: 'association',
} as const satisfies Record<IdOffre, string>

/**
 * Ramène n'importe lequel des trois vocabulaires à l'identifiant de
 * référence, ou `null` si la valeur n'en est d'aucun.
 *
 * Tolérant par construction : cette fonction lit des paramètres d'URL, donc
 * des valeurs que n'importe qui peut écrire. Une valeur inconnue ne doit
 * rien casser — elle ne préremplit simplement rien.
 */
export function normaliserOffre(valeur: string | null | undefined): IdOffre | null {
  if (!valeur) return null
  const v = valeur.trim().toLowerCase()

  const direct: Record<string, IdOffre> = {
    // Vocabulaire du configurateur (la référence).
    vitrine: 'vitrine',
    multipages: 'multipages',
    ecommerce: 'ecommerce',
    gestion: 'gestion',
    association: 'association',
    // Vocabulaire du store de la scène.
    boutique: 'ecommerce',
    // Vocabulaire du formulaire de devis.
    'site-vitrine': 'vitrine',
    'site-multi-pages': 'multipages',
    'site-ecommerce': 'ecommerce',
    'systeme-gestion': 'gestion',
    'site-association': 'association',
  }
  return direct[v] ?? null
}
