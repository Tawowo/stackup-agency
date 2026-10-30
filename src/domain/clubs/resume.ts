/** Mise en forme du résultat : euros à la française et lignes de récapitulatif (écran, e-mail, impression, devis prérempli). */
import { PRICING, optionDe } from '../../data/offre-clubs/pricing.ts'
import type { Resultat, Simulation } from './types.ts'

const f0 = new Intl.NumberFormat('fr-FR', { maximumFractionDigits: 0 })
const f2 = new Intl.NumberFormat('fr-FR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
const nb = (s: string) => s.replace(/[  ]/g, ' ')

export const eur = (n: number) => `${nb(f0.format(n))} €`
export const eurCents = (n: number) => `${nb(f2.format(n))} €`

export const LIBELLE_FORMULE = { site: 'Site internet du club', logiciel: 'Logiciel de gestion du club', pack: 'Site + logiciel' } as const

export interface LigneResume {
  cle: string
  valeur: string
}

export function lignesResume(s: Simulation, r: Resultat): LigneResume[] {
  const l: LigneResume[] = []
  const club = [s.club.nom, s.club.commune, s.club.departement].filter(Boolean).join(', ')
  if (club) l.push({ cle: 'Club', valeur: club })
  l.push({ cle: 'Licenciés (saison en cours)', valeur: String(r.licencies) })
  if (s.licencies.precedente || s.licencies.avantPrecedente) l.push({ cle: 'Saisons précédentes', valeur: [s.licencies.precedente, s.licencies.avantPrecedente].filter(Boolean).join(' et ') })
  l.push({ cle: 'Catégorie', valeur: `${r.categorie.nom} (${r.categorie.licenciesMin}${r.categorie.licenciesMax ? ` à ${r.categorie.licenciesMax}` : ' et plus'} licenciés)` })
  l.push({ cle: 'Formule', valeur: LIBELLE_FORMULE[s.formule] })
  const opts = r.lignes.slice(1)
  if (opts.length) l.push({ cle: 'Options', valeur: opts.map((o) => o.libelle).join(' ; ') })
  l.push({ cle: 'Mise en place', valeur: eur(r.miseEnPlace.total) + (r.miseEnPlace.echeances.length > 1 ? ` en ${r.miseEnPlace.echeances.length} fois (${r.miseEnPlace.echeances.map(eur).join(' + ')})` : ' en une fois') })
  l.push({ cle: 'Abonnement', valeur: s.paiement.abonnement === 'annuel' ? `${eur(r.abonnement.annuel)} par an (soit ${eurCents(r.abonnement.mensuelEquivalentAnnuel)} par mois)` : `${eur(r.abonnement.mensuel)} par mois` })
  l.push({ cle: 'Trois premiers mois', valeur: r.premiersMois.map((m, i) => `mois ${i + 1} : ${eur(m)}`).join(' · ') })
  l.push({ cle: 'Première année', valeur: eur(r.premiereAnnee) })
  l.push({ cle: 'Années suivantes', valeur: `${eur(r.anneesSuivantes)} par an` })
  l.push({ cle: 'Abonnement par licencié et par an', valeur: eurCents(r.coutParLicencieAn) })
  l.push({ cle: 'Accompagnement', valeur: `${r.accompagnement.incluses} h incluses, ${r.accompagnement.prevues} h prévues${r.accompagnement.supplementaires ? ` (${r.accompagnement.supplementaires} h supplémentaires à ${PRICING.heureSupplementaire.prix} € de l’heure)` : ''}` })
  l.push({ cle: 'Premier rendez-vous', valeur: s.accompagnement.rdv === 'visio' ? 'En visio' : `En présentiel, à ${s.accompagnement.distanceKm || 0} km` })
  if (r.devis.requis) l.push({ cle: 'Devis sur mesure', valeur: r.devis.raisons.join(' ') })
  return l
}

/** Texte prérempli du formulaire de devis (le visiteur le relit et le complète). */
export function texteDevis(s: Simulation, r: Resultat, lien: string): string {
  return [
    'Bonjour,',
    '',
    'Voici la simulation de notre club (estimation indicative) :',
    ...lignesResume(s, r).map((x) => `- ${x.cle} : ${x.valeur}`),
    '',
    `Lien de la simulation : ${lien}`,
    '',
    'Pouvez-vous m’établir un devis ?',
  ].join('\n')
}

export const optionsChoisies = (s: Simulation) => Object.entries(s.options).filter(([, n]) => n > 0).map(([id, n]) => ({ id, nom: optionDe(id)?.nom ?? id, quantite: n }))
