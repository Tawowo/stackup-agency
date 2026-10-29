/**
 * SIMULATION « CLUBS DE TENNIS » — calcul pur (aucun React, aucune horloge), lu par le simulateur, ses tests
 * et l'e-mail de récapitulatif. Toutes les valeurs viennent de src/data/offre-clubs/pricing.ts.
 *
 * Règles :
 * - la catégorie suit les licenciés de la SAISON EN COURS ; la moyenne des trois saisons ne sert qu'à prévenir
 *   qu'un justificatif sera demandé si la saison en cours est sous 90 % de la moyenne ;
 * - le pack site + logiciel est déjà remisé (pricing.ts) ; les options ne sont pas remisées par le pack ;
 * - la remise annuelle porte sur tout l'abonnement (formule + options) ;
 * - la mise en place comprend la formule, la mise en place des options et les heures d'accompagnement au-delà
 *   des heures incluses (par tranches de 30 minutes) ; elle se paie en une fois ou en trois fois sans frais.
 */
import { PRICING, OPTIONS, categorieDe, coutParLicencieAn, heuresIncluses, tarif, type Categorie, type Formule, type OptionId } from '../../data/offre-clubs/pricing.ts'

export const BESOINS_SUR_DEVIS = [
  { id: 'fonction-absente', libelle: 'Une fonction qui n’existe ni dans les formules ni dans les options' },
  { id: 'developpement-club', libelle: 'Un développement propre à notre club' },
  { id: 'design-unique', libelle: 'Un design entièrement unique' },
  { id: 'connexion-logiciel', libelle: 'Une connexion à un autre logiciel (comptabilité, Ten’Up au-delà des liens…)' },
  { id: 'reprise-logiciel', libelle: 'Une reprise depuis un autre logiciel de gestion' },
  { id: 'omnisport', libelle: 'Un club omnisport complet' },
  { id: 'traduction', libelle: 'Une traduction du site' },
  { id: 'application-stores', libelle: 'Une application publiée sur l’App Store et Google Play' },
] as const
export type BesoinId = (typeof BESOINS_SUR_DEVIS)[number]['id']

export interface EntreeSimulation {
  licencies: { courante: number; precedente: number | null; avantDerniere: number | null }
  formule: Formule
  /** Options cochées, avec la quantité (pages) ; 1 pour une option fixe. */
  options: Partial<Record<OptionId, number>>
  /** Heures d'accompagnement prévues au total (heures incluses comprises). */
  heuresPrevues: number
  premierRdv: 'presentiel' | 'visio'
  /** Distance du club à Savigné-sur-Lathan, en km (premier rendez-vous en présentiel). */
  distanceKm: number | null
  abonnement: 'mensuel' | 'annuel'
  miseEnPlace: 'une-fois' | 'trois-fois'
  besoins: BesoinId[]
}

export interface Ligne {
  libelle: string
  miseEnPlace: number
  mois: number
}

export interface ResultatSimulation {
  categorie: Categorie
  moyenneLicencies: number
  /** La saison en cours est sous le seuil de la moyenne : un justificatif sera demandé. */
  baisse: boolean
  lignes: Ligne[]
  /** Options retirées parce que leur condition n'est pas remplie (le simulateur les grise ; le calcul les ignore). */
  optionsIgnorees: OptionId[]
  heures: { incluses: number; prevues: number; supplementaires: number; cout: number }
  miseEnPlace: { total: number; echeances: number[] }
  abonnement: { mensuel: number; annuel: number | null; economieAnnuelle: number }
  /** Ce que le club paie les trois premiers mois, mois par mois. */
  troisPremiersMois: { mois: number; miseEnPlace: number; abonnement: number; total: number }[]
  premiereAnnee: number
  anneesSuivantes: number
  coutParLicencieAn: number
  /** Économie du pack sur la mise en place et l'abonnement (0 hors pack). */
  economiePack: { miseEnPlace: number; mois: number }
  deplacement: 'visio' | 'gratuit' | 'visio-ou-devis'
  /** Raisons pour lesquelles la demande passe en devis sur mesure (vide = dans le cadre). */
  surDevis: string[]
}

const avecSite = (f: Formule) => f === 'site' || f === 'pack'
const avecLogiciel = (f: Formule) => f === 'logiciel' || f === 'pack'

/** Une option est-elle disponible avec cette formule et ces options ? */
export function optionDisponible(id: OptionId, formule: Formule, options: Partial<Record<OptionId, number>>): boolean {
  const o = OPTIONS.find((x) => x.id === id)
  if (!o || !o.simulateur) return false
  if (o.requiert === 'site') return avecSite(formule)
  if (o.requiert === 'logiciel') return avecLogiciel(formule)
  if (o.requiert === 'assistant-ia') return avecLogiciel(formule) && (options['assistant-ia'] ?? 0) > 0
  return true
}

/** Montants en euros arrondis au centime (échéances). */
const centimes = (n: number) => Math.round(n * 100) / 100

/** Répartit un montant en N échéances au centime ; la dernière absorbe l'arrondi. */
export function echeances(total: number, n: number): number[] {
  if (n <= 1) return [total]
  const base = Math.floor((total / n) * 100) / 100
  const liste = Array.from({ length: n - 1 }, () => base)
  liste.push(centimes(total - base * (n - 1)))
  return liste
}

export function simuler(e: EntreeSimulation): ResultatSimulation {
  const courante = Math.max(1, Math.floor(e.licencies.courante || 1))
  const saisons = [courante, e.licencies.precedente, e.licencies.avantDerniere].filter((n): n is number => typeof n === 'number' && n > 0)
  const moyenne = saisons.reduce((a, b) => a + b, 0) / saisons.length
  const categorie = categorieDe(courante)
  const baisse = saisons.length > 1 && courante < moyenne * PRICING.seuilBaisse

  const base = tarif(categorie, e.formule)
  const nomFormule = e.formule === 'pack' ? 'Site + logiciel' : e.formule === 'site' ? 'Site du club' : 'Logiciel de gestion'
  const lignes: Ligne[] = [{ libelle: `${nomFormule} — catégorie ${categorie.nom}`, miseEnPlace: base.miseEnPlace, mois: base.mois }]

  // Les options se valident dans l'ordre : la commande vocale suit l'assistant IA.
  const retenues: Partial<Record<OptionId, number>> = {}
  const ignorees: OptionId[] = []
  for (const o of OPTIONS) {
    const q = Math.max(0, Math.floor(e.options[o.id] ?? 0))
    if (!q) continue
    if (!optionDisponible(o.id, e.formule, retenues)) {
      ignorees.push(o.id)
      continue
    }
    retenues[o.id] = o.unite === 'page' ? q : 1
    const quantite = o.unite === 'page' ? q : 1
    lignes.push({ libelle: o.unite === 'page' ? `${o.nom} × ${quantite}` : o.nom, miseEnPlace: o.miseEnPlace * quantite, mois: o.mois })
  }

  const incluses = heuresIncluses(categorie, e.formule)
  const prevues = Math.max(0, e.heuresPrevues)
  const tranche = PRICING.trancheMinutes / 60
  const supplementaires = Math.ceil(Math.max(0, prevues - incluses) / tranche) * tranche
  const coutHeures = Math.round(supplementaires * PRICING.heureSupplementaire)
  if (coutHeures > 0) lignes.push({ libelle: `Accompagnement supplémentaire (${supplementaires.toLocaleString('fr-FR')} h)`, miseEnPlace: coutHeures, mois: 0 })

  const totalMiseEnPlace = lignes.reduce((a, l) => a + l.miseEnPlace, 0)
  const mensuel = lignes.reduce((a, l) => a + l.mois, 0)
  const annuel = e.abonnement === 'annuel' ? Math.round(mensuel * 12 * (1 - PRICING.annualDiscount)) : null
  const parAn = annuel ?? mensuel * 12
  const n = e.miseEnPlace === 'trois-fois' ? PRICING.installments : 1
  const ech = echeances(totalMiseEnPlace, n)

  const troisPremiersMois = [1, 2, 3].map((m) => {
    const mise = ech[m - 1] ?? 0
    const abo = annuel !== null ? (m === 1 ? annuel : 0) : mensuel
    return { mois: m, miseEnPlace: mise, abonnement: abo, total: centimes(mise + abo) }
  })

  const deplacement = e.premierRdv === 'visio' ? 'visio' : e.distanceKm !== null && e.distanceKm > PRICING.premierRdvGratuitKm ? 'visio-ou-devis' : 'gratuit'
  const surDevis: string[] = e.besoins.flatMap((b) => BESOINS_SUR_DEVIS.filter((x) => x.id === b).map((x) => x.libelle as string))

  const pack = e.formule === 'pack' ? { miseEnPlace: categorie.site.miseEnPlace + categorie.logiciel.miseEnPlace - base.miseEnPlace, mois: categorie.site.mois + categorie.logiciel.mois - base.mois } : { miseEnPlace: 0, mois: 0 }

  return {
    categorie,
    moyenneLicencies: Math.round(moyenne),
    baisse,
    lignes,
    optionsIgnorees: ignorees,
    heures: { incluses, prevues, supplementaires, cout: coutHeures },
    miseEnPlace: { total: totalMiseEnPlace, echeances: ech },
    abonnement: { mensuel, annuel, economieAnnuelle: annuel !== null ? mensuel * 12 - annuel : 0 },
    troisPremiersMois,
    premiereAnnee: totalMiseEnPlace + parAn,
    anneesSuivantes: parAn,
    coutParLicencieAn: coutParLicencieAn(parAn / 12, courante),
    economiePack: pack,
    deplacement,
    surDevis,
  }
}

/** Valeurs de départ du simulateur : un club « Moyen » type, site + logiciel, sans option. */
export const SIMULATION_DEFAUT: EntreeSimulation = {
  licencies: { courante: 220, precedente: null, avantDerniere: null },
  formule: 'pack',
  options: {},
  heuresPrevues: 0,
  premierRdv: 'presentiel',
  distanceKm: null,
  abonnement: 'mensuel',
  miseEnPlace: 'trois-fois',
  besoins: [],
}
