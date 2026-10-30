/**
 * LE CALCUL DE L'OFFRE CLUBS — pur, sans E/S : même résultat dans le navigateur, dans l'e-mail et dans les tests.
 * Tous les prix viennent de data/offre-clubs/pricing.ts ; rien n'est écrit en dur ici.
 */
import { PRICING, categorieDe, optionDe, type Categorie, type CategorieId } from '../../data/offre-clubs/pricing.ts'
import type { Formule, LigneChiffree, Resultat, Simulation } from './types.ts'

const arrondiDizaine = (n: number) => Math.round(n / 10) * 10
const arrondiEuro = (n: number) => Math.round(n)

export function categoriePour(licencies: number): Categorie {
  const n = Math.max(1, Math.floor(licencies))
  return PRICING.categories.find((c) => n >= c.licencies.min && (c.licencies.max === null || n <= c.licencies.max))!
}

/** Prix du pack site + logiciel : somme des deux, moins la remise du pack (dizaine pour la mise en place, euro pour l'abonnement). */
export function prixPack(c: Categorie): { miseEnPlace: number; mensuel: number } {
  const k = 1 - PRICING.packDiscount
  return { miseEnPlace: arrondiDizaine((c.site.miseEnPlace + c.logiciel.miseEnPlace) * k), mensuel: arrondiEuro((c.site.mensuel + c.logiciel.mensuel) * k) }
}

export function prixFormule(c: Categorie, f: Formule): { miseEnPlace: number; mensuel: number } {
  if (f === 'site') return { ...c.site }
  if (f === 'logiciel') return { ...c.logiciel }
  return prixPack(c)
}

export const heuresIncluses = (c: Categorie, f: Formule) => c.heures[f]

/** Une option est-elle disponible avec cette formule et ces autres options ? */
export function optionDisponible(id: string, formule: Formule, choisies: Record<string, number>): { ok: boolean; raison?: string } {
  const opt = optionDe(id)
  if (!opt) return { ok: false, raison: 'Option inconnue.' }
  if (opt.requiert === 'site' && formule === 'logiciel') return { ok: false, raison: 'Cette option nécessite le site.' }
  if (opt.requiert === 'logiciel' && formule === 'site') return { ok: false, raison: 'Cette option nécessite le logiciel.' }
  if (opt.requiertOption && !((choisies[opt.requiertOption] ?? 0) > 0)) return { ok: false, raison: `Cette option nécessite « ${optionDe(opt.requiertOption)?.nom ?? opt.requiertOption} ».` }
  return { ok: true }
}

/** Échéances de la mise en place : réparties en N fois, la dernière absorbe l'arrondi. */
export function echeances(total: number, fois: number): number[] {
  if (fois <= 1 || total <= 0) return [total]
  const part = Math.floor(total / fois)
  const liste = Array.from({ length: fois }, () => part)
  liste[fois - 1] = total - part * (fois - 1)
  return liste
}

const demiHeureSuperieure = (h: number) => Math.ceil(Math.max(0, h) * (60 / PRICING.heureSupplementaire.trancheMinutes)) / (60 / PRICING.heureSupplementaire.trancheMinutes)

export function calculer(s: Simulation): Resultat {
  const licencies = Math.max(1, Math.floor(s.licencies.actuelle || 1))
  const cat = categoriePour(licencies)
  const avertissements: string[] = []

  // Moyenne des trois saisons (seulement les saisons renseignées) : sert à repérer une baisse récente.
  const saisons = [s.licencies.actuelle, s.licencies.precedente, s.licencies.avantPrecedente].filter((n) => n > 0)
  const moyenne = saisons.length >= 2 ? saisons.reduce((a, b) => a + b, 0) / saisons.length : null
  const baisseSensible = moyenne !== null && s.licencies.actuelle > 0 && s.licencies.actuelle < 0.9 * moyenne

  const base = prixFormule(cat, s.formule)
  const lignes: LigneChiffree[] = [
    { id: `formule-${s.formule}`, libelle: s.formule === 'pack' ? 'Site + logiciel (−' + Math.round(PRICING.packDiscount * 100) + ' %)' : s.formule === 'site' ? 'Site internet du club' : 'Logiciel de gestion du club', miseEnPlace: base.miseEnPlace, mensuel: base.mensuel },
  ]

  // Options : dans l'ordre du catalogue (un pré-requis précède toujours son option). On écarte celles qui ne sont pas disponibles
  // avec cette formule, celles dont le pré-requis manque et celles qui s'excluent (la première l'emporte).
  const retenues: Record<string, number> = {}
  for (const opt of PRICING.options) {
    const q = s.options[opt.id] ?? 0
    if (!(q > 0)) continue
    const d = optionDisponible(opt.id, s.formule, retenues)
    if (!d.ok) {
      avertissements.push(`« ${opt.nom} » retirée : ${(d.raison ?? 'indisponible').charAt(0).toLowerCase()}${(d.raison ?? 'indisponible').slice(1)}`)
      continue
    }
    const conflit = opt.exclusifAvec.find((x) => retenues[x])
    if (conflit) {
      avertissements.push(`« ${opt.nom} » retirée : elle exclut « ${optionDe(conflit)?.nom} », déjà choisie.`)
      continue
    }
    retenues[opt.id] = opt.unite === 'forfait' ? 1 : Math.min(Math.floor(q), opt.quantiteMax ?? 100)
  }
  for (const [id, q] of Object.entries(retenues)) {
    const opt = optionDe(id)!
    lignes.push({ id, libelle: q > 1 ? `${opt.nom} × ${q}` : opt.nom, miseEnPlace: (opt.miseEnPlace ?? 0) * q, mensuel: (opt.mensuel ?? 0) * q })
  }

  const optionsMiseEnPlace = lignes.slice(1).reduce((a, l) => a + l.miseEnPlace, 0)

  // Accompagnement : heures comprises, puis le reste facturé à l'heure (par tranche de 30 minutes).
  const incluses = heuresIncluses(cat, s.formule)
  const prevues = Math.max(0, s.accompagnement.heures || 0)
  const supp = demiHeureSuperieure(Math.max(0, prevues - incluses))
  const coutSupp = Math.round(supp * PRICING.heureSupplementaire.prix)

  const total = base.miseEnPlace + optionsMiseEnPlace + coutSupp
  const ech = echeances(total, s.paiement.miseEnPlace === 'trois-fois' ? PRICING.miseEnPlaceEnFois : 1)

  const mensuel = lignes.reduce((a, l) => a + l.mensuel, 0)
  const annuel = arrondiEuro(mensuel * 12 * (1 - PRICING.annualDiscount))
  const recurrentAn = s.paiement.abonnement === 'annuel' ? annuel : mensuel * 12

  // Les trois premiers mois, mois par mois.
  const premiers: [number, number, number] = [0, 0, 0]
  for (let i = 0; i < 3; i++) premiers[i] = ech[i] ?? 0
  if (s.paiement.abonnement === 'annuel') premiers[0] = (premiers[0] ?? 0) + annuel
  else for (let i = 0; i < 3; i++) premiers[i] = (premiers[i] ?? 0) + mensuel

  // Hors catalogue, déplacement, devis.
  const raisons: string[] = []
  if (s.horsCatalogue.length) raisons.push('Une demande sort du catalogue : ' + s.horsCatalogue.join(', ') + '.')
  const gratuit = s.accompagnement.rdv === 'visio' || s.accompagnement.distanceKm <= PRICING.deplacementGratuitKm
  if (!gratuit) raisons.push(`Le premier rendez-vous en présentiel est gratuit jusqu’à ${PRICING.deplacementGratuitKm} km : au-delà, rendez-vous en visio ou indemnité de déplacement sur devis.`)
  const deplacement = {
    gratuit,
    message:
      s.accompagnement.rdv === 'visio'
        ? 'Premier rendez-vous en visio : aucun déplacement.'
        : gratuit
          ? `Premier rendez-vous en présentiel gratuit (moins de ${PRICING.deplacementGratuitKm} km de Savigné-sur-Lathan).`
          : `Au-delà de ${PRICING.deplacementGratuitKm} km : visio, ou indemnité de déplacement chiffrée sur devis.`,
  }

  return {
    categorie: { id: cat.id, nom: cat.nom, licenciesMin: cat.licencies.min, licenciesMax: cat.licencies.max },
    licencies,
    moyenneLicencies: moyenne === null ? null : Math.round(moyenne),
    baisseSensible,
    formule: s.formule,
    lignes,
    miseEnPlace: { base: base.miseEnPlace, options: optionsMiseEnPlace, accompagnementSupp: coutSupp, total, echeances: ech },
    accompagnement: { incluses, prevues, supplementaires: supp, coutSupplementaire: coutSupp },
    abonnement: { mensuel, annuel, mensuelEquivalentAnnuel: Math.round((annuel / 12) * 100) / 100, economieAnnuelle: mensuel * 12 - annuel, mode: s.paiement.abonnement },
    premiersMois: premiers,
    premiereAnnee: total + recurrentAn,
    anneesSuivantes: recurrentAn,
    coutParLicencieAn: Math.round((recurrentAn / licencies) * 100) / 100,
    coutParLicenciePremiereAnnee: Math.round(((total + recurrentAn) / licencies) * 100) / 100,
    stockageGo: cat.stockageGo,
    avertissements,
    devis: { requis: raisons.length > 0, raisons },
    deplacement,
  }
}

export const categorieParId = (id: CategorieId) => categorieDe(id)

/** Simulation de départ : aucun licencié saisi, formule site + logiciel, paiements simples. */
export function simulationVide(): Simulation {
  return {
    club: { nom: '', commune: '', departement: '' },
    licencies: { actuelle: 0, precedente: 0, avantPrecedente: 0 },
    formule: 'pack',
    options: {},
    accompagnement: { heures: 0, rdv: 'presentiel', distanceKm: 0 },
    paiement: { abonnement: 'mensuel', miseEnPlace: 'une-fois' },
    horsCatalogue: [],
  }
}
