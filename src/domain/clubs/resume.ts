/**
 * RÉCAPITULATIF D'UNE SIMULATION — texte lisible (e-mail au club, e-mail interne, devis prérempli, lien d'appel).
 * Pur : aucune dépendance d'interface.
 */
import { OPTIONS, PRICING } from '../../data/offre-clubs/pricing.ts'
import type { Club } from './etat.ts'
import type { EntreeSimulation, ResultatSimulation } from './simulation.ts'

const fr = new Intl.NumberFormat('fr-FR', { minimumFractionDigits: 0, maximumFractionDigits: 2 })
export const euros = (n: number) => `${fr.format(n).replace(/[  ]/g, ' ')} €`
const NOMS = { site: 'Le site du club', logiciel: 'Le logiciel du bureau', pack: 'Site + logiciel' } as const

export interface LigneRecap {
  cle: string
  valeur: string
}

export function lignesRecap(club: Club, e: EntreeSimulation, r: ResultatSimulation): LigneRecap[] {
  const l: LigneRecap[] = []
  if (club.nom) l.push({ cle: 'Club', valeur: [club.nom, club.commune, club.departement].filter(Boolean).join(' · ') })
  const saisons = [e.licencies.courante, e.licencies.precedente, e.licencies.avantDerniere].filter((n) => n !== null).join(' / ')
  l.push({ cle: 'Licenciés (saison en cours / précédentes)', valeur: `${saisons} — catégorie ${r.categorie.nom}${r.baisse ? ' (baisse : justificatif demandé)' : ''}` })
  l.push({ cle: 'Formule', valeur: NOMS[e.formule] + (r.economiePack.mois ? ` (économie de ${euros(r.economiePack.miseEnPlace)} sur la mise en place et ${euros(r.economiePack.mois)} par mois)` : '') })
  const opts = r.lignes.slice(1).map((x) => x.libelle)
  l.push({ cle: 'Options et accompagnement', valeur: opts.length ? opts.join(', ') : 'Aucune' })
  l.push({ cle: 'Heures d’accompagnement', valeur: `${fr.format(r.heures.incluses)} h incluses${r.heures.supplementaires ? `, ${fr.format(r.heures.supplementaires)} h en plus (${euros(r.heures.cout)})` : ''}` })
  l.push({ cle: 'Mise en place', valeur: `${euros(r.miseEnPlace.total)}${r.miseEnPlace.echeances.length > 1 ? ` — en ${r.miseEnPlace.echeances.length} fois : ${r.miseEnPlace.echeances.map(euros).join(' + ')}` : ' — en une fois'}` })
  l.push({ cle: 'Abonnement', valeur: r.abonnement.annuel !== null ? `${euros(r.abonnement.annuel)} par an (−${Math.round(PRICING.annualDiscount * 100)} %, soit ${euros(r.abonnement.economieAnnuelle)} d’économie)` : `${euros(r.abonnement.mensuel)} par mois` })
  l.push({ cle: 'Les 3 premiers mois', valeur: r.troisPremiersMois.map((m) => `mois ${m.mois} : ${euros(m.total)}`).join(' · ') })
  l.push({ cle: 'Première année', valeur: euros(r.premiereAnnee) })
  l.push({ cle: 'Années suivantes', valeur: `${euros(r.anneesSuivantes)} par an` })
  l.push({ cle: 'Coût par licencié et par an', valeur: `environ ${euros(r.coutParLicencieAn)}` })
  l.push({ cle: 'Premier rendez-vous', valeur: r.deplacement === 'visio' ? 'En visio' : r.deplacement === 'gratuit' ? `Au club, gratuit (moins de ${PRICING.premierRdvGratuitKm} km)` : `Au-delà de ${PRICING.premierRdvGratuitKm} km : en visio, ou indemnité de déplacement sur devis` })
  if (r.surDevis.length) l.push({ cle: 'Sur devis', valeur: r.surDevis.join(' ; ') })
  if (r.optionsIgnorees.length) l.push({ cle: 'Options non retenues (condition non remplie)', valeur: r.optionsIgnorees.map((id) => OPTIONS.find((o) => o.id === id)?.nom ?? id).join(', ') })
  return l
}

export function texteRecap(club: Club, e: EntreeSimulation, r: ResultatSimulation): string {
  return lignesRecap(club, e, r)
    .map((x) => `${x.cle} : ${x.valeur}`)
    .join('\n')
}
