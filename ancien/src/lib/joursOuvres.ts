/**
 * LES JOURS OUVRÉS, ET LES JOURS FÉRIÉS FRANÇAIS.
 *
 * Pourquoi ce fichier existe : le site promet une livraison « en 10 jours
 * ouvrés », et le dossier (§10.8) demande que la méthode soit posée sur un
 * CALENDRIER RÉEL — les dates de chaque étape calculées à partir
 * d'aujourd'hui. Une frise datée est une promesse vérifiable ; une frise
 * « J+1, J+3, J+10 » n'engage à rien et ne se projette pas.
 *
 * POURQUOI LES FÉRIÉS SONT CALCULÉS ET NON LISTÉS. Une liste écrite à la
 * main se périme au 1er janvier, et personne ne s'en aperçoit avant qu'un
 * client ne compte sur une date fausse. Les onze fériés français se
 * déduisent : huit sont à date fixe, trois dépendent de Pâques (lundi de
 * Pâques, Ascension, lundi de Pentecôte). Pâques se calcule par l'algorithme
 * de Meeus/Jones/Butcher, qui est exact pour le calendrier grégorien.
 *
 * CE QUE CE FICHIER NE FAIT PAS. Il ne tient pas compte des congés de
 * l'atelier, qui ne sont pas publics. Une date calculée ici est donc une
 * PROJECTION, et le composant qui l'affiche doit le dire — c'est la règle
 * d'honnêteté (§15.3) : rien n'est présenté comme un engagement qui n'en est
 * pas un.
 *
 * ALSACE-MOSELLE. Le Vendredi saint et la Saint-Étienne y sont fériés en
 * plus. Ils ne sont pas inclus : l'atelier est en Indre-et-Loire, et ajouter
 * deux jours non chômés localement décalerait les dates à tort.
 */

/**
 * Le dimanche de Pâques d'une année donnée (calendrier grégorien).
 *
 * Algorithme de Meeus/Jones/Butcher. Les noms de variables sont ceux de
 * l'algorithme : les renommer en français le rendrait impossible à
 * comparer à sa source.
 */
function dimanchePaques(annee: number): Date {
  const a = annee % 19
  const b = Math.floor(annee / 100)
  const c = annee % 100
  const d = Math.floor(b / 4)
  const e = b % 4
  const f = Math.floor((b + 8) / 25)
  const g = Math.floor((b - f + 1) / 3)
  const h = (19 * a + b - d - g + 15) % 30
  const i = Math.floor(c / 4)
  const k = c % 4
  const l = (32 + 2 * e + 2 * i - h - k) % 7
  const m = Math.floor((a + 11 * h + 22 * l) / 451)
  const mois = Math.floor((h + l - 7 * m + 114) / 31) // 3 = mars, 4 = avril
  const jour = ((h + l - 7 * m + 114) % 31) + 1
  return new Date(annee, mois - 1, jour)
}

/** Clé « AAAA-MM-JJ » en heure locale — `toISOString` passerait en UTC. */
function cle(d: Date): string {
  const m = String(d.getMonth() + 1).padStart(2, '0')
  const j = String(d.getDate()).padStart(2, '0')
  return `${d.getFullYear()}-${m}-${j}`
}

function ajouterJours(d: Date, n: number): Date {
  const r = new Date(d)
  r.setDate(r.getDate() + n)
  return r
}

/** Les onze jours fériés français d'une année, en clés « AAAA-MM-JJ ». */
export function joursFeries(annee: number): Set<string> {
  const paques = dimanchePaques(annee)
  const dates = [
    new Date(annee, 0, 1), // Jour de l'an
    ajouterJours(paques, 1), // Lundi de Pâques
    new Date(annee, 4, 1), // Fête du Travail
    new Date(annee, 4, 8), // Victoire 1945
    ajouterJours(paques, 39), // Ascension
    ajouterJours(paques, 50), // Lundi de Pentecôte
    new Date(annee, 6, 14), // Fête nationale
    new Date(annee, 7, 15), // Assomption
    new Date(annee, 10, 1), // Toussaint
    new Date(annee, 10, 11), // Armistice 1918
    new Date(annee, 11, 25), // Noël
  ]
  return new Set(dates.map(cle))
}

/** Un jour ouvré : ni samedi, ni dimanche, ni férié. */
export function estOuvre(d: Date, feries: Set<string>): boolean {
  const j = d.getDay()
  if (j === 0 || j === 6) return false
  return !feries.has(cle(d))
}

/**
 * La date obtenue en ajoutant `n` jours OUVRÉS à `depart`.
 *
 * `n = 0` rend le premier jour ouvré à partir de `depart` inclus : si l'on
 * part un samedi, on commence le lundi. C'est le comportement attendu d'un
 * « on démarre aujourd'hui » prononcé un week-end.
 */
export function ajouterJoursOuvres(depart: Date, n: number): Date {
  // Les fériés de l'année de départ ET de la suivante : un délai de dix
  // jours ouvrés démarré le 20 décembre franchit le 1er janvier.
  const feries = new Set([
    ...joursFeries(depart.getFullYear()),
    ...joursFeries(depart.getFullYear() + 1),
  ])

  const d = new Date(depart)
  d.setHours(12, 0, 0, 0) // midi : à l'abri des bascules d'heure d'été
  while (!estOuvre(d, feries)) d.setDate(d.getDate() + 1)

  let restants = n
  while (restants > 0) {
    d.setDate(d.getDate() + 1)
    if (estOuvre(d, feries)) restants--
  }
  return d
}

/** « lundi 13 octobre » — sans l'année, qui alourdit une frise. */
export function formaterJour(d: Date): string {
  return d.toLocaleDateString('fr-FR', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
  })
}

/** « 13 oct. » — pour les colonnes étroites du portrait. */
export function formaterCourt(d: Date): string {
  return d.toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' })
}
