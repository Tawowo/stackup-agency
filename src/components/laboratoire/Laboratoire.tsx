'use client'

/**
 * LE LABORATOIRE — interface de démonstration.
 *
 * C'est un logiciel qui fonctionne, pas une image de logiciel. Les filtres
 * filtrent, les tris trient, les totaux sont recalculés à chaque changement,
 * et faire avancer une intervention modifie réellement l'état.
 *
 * Ce qu'il ne fait pas, et qui est dit explicitement à l'écran :
 * aucune requête réseau, aucune base de données, aucun client réel. Tout vit
 * dans la mémoire de l'onglet et disparaît au rechargement.
 */

import { useMemo, useReducer, useState } from 'react'
import { ChevronDown, RotateCcw, Search, ArrowRight } from 'lucide-react'
import {
  CYCLE,
  JEU_DESSAI,
  LIBELLES_STATUT,
  filtrerEtTrier,
  formaterDate,
  formaterEuros,
  statutSuivant,
  synthetiser,
  totalHT,
  totalLigneHT,
  totalTTC,
  totalTVA,
  type Criteres,
  type Intervention,
  type Statut,
  type Tri,
} from '@/lib/laboratoire'

type Action =
  | { type: 'avancer'; id: string }
  | { type: 'reinitialiser' }

function reducteur(etat: Intervention[], action: Action): Intervention[] {
  switch (action.type) {
    case 'avancer':
      return etat.map((i) =>
        i.id === action.id ? { ...i, statut: statutSuivant(i.statut) } : i,
      )
    case 'reinitialiser':
      return JEU_DESSAI
  }
}

const TRIS: { valeur: Tri; libelle: string }[] = [
  { valeur: 'date-desc', libelle: 'Date — plus récente' },
  { valeur: 'date-asc', libelle: 'Date — plus ancienne' },
  { valeur: 'montant-desc', libelle: 'Montant — décroissant' },
  { valeur: 'montant-asc', libelle: 'Montant — croissant' },
  { valeur: 'client-asc', libelle: 'Client — A → Z' },
]

const COULEUR_STATUT: Record<Statut, string> = {
  brouillon: 'bg-[#64748B]/10 text-[#475569]',
  envoye: 'bg-[#2D7DD2]/10 text-[#1B5A9E]',
  accepte: 'bg-[#F59E0B]/15 text-[#92400E]',
  planifie: 'bg-[#8B5CF6]/10 text-[#6D28D9]',
  termine: 'bg-[#10B981]/15 text-[#047857]',
}

export default function Laboratoire() {
  const [interventions, envoyer] = useReducer(reducteur, JEU_DESSAI)
  const [criteres, setCriteres] = useState<Criteres>({
    recherche: '',
    statuts: [],
    tri: 'date-desc',
  })
  const [deplie, setDeplie] = useState<string | null>(null)

  // Recalculé à chaque rendu depuis l'état courant : il n'existe aucune copie
  // des totaux quelque part, donc aucun moyen qu'ils se désynchronisent.
  const visibles = useMemo(
    () => filtrerEtTrier(interventions, criteres),
    [interventions, criteres],
  )
  const synthese = useMemo(() => synthetiser(visibles), [visibles])

  function basculerStatut(statut: Statut) {
    setCriteres((c) => ({
      ...c,
      statuts: c.statuts.includes(statut)
        ? c.statuts.filter((s) => s !== statut)
        : [...c.statuts, statut],
    }))
  }

  const filtreActif =
    criteres.recherche.trim() !== '' || criteres.statuts.length > 0

  return (
    <div className="su-strate su-strate--levee overflow-hidden">
      {/* ── Bandeau d'avertissement, non dissimulable ── */}
      <div className="flex flex-wrap items-center gap-x-3 gap-y-1 px-4 sm:px-5 py-2.5 bg-[#1E3A5F] text-white/90 text-[12.5px]">
        <span className="font-mono text-[10.5px] tracking-[0.14em] uppercase px-2 py-0.5 rounded bg-[#F59E0B] text-[#0C1626] font-bold">
          Démonstration
        </span>
        <span>
          Données fictives · aucun client réel · aucune connexion réseau · état
          perdu au rechargement
        </span>
      </div>

      {/* ── Synthèse ── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-[#1E3A5F]/10">
        {[
          { cle: 'Interventions', valeur: String(synthese.nombre) },
          { cle: 'Total TTC', valeur: formaterEuros(synthese.totalTTC) },
          { cle: 'Engagé', valeur: formaterEuros(synthese.engage), accent: true },
          { cle: 'Panier moyen', valeur: formaterEuros(synthese.panierMoyen) },
        ].map((k) => (
          <div key={k.cle} className="bg-white px-4 sm:px-5 py-4">
            <div className="text-[11px] font-mono uppercase tracking-[0.12em] text-[#64748B] mb-1.5">
              {k.cle}
            </div>
            <div
              className={`text-[1.3rem] font-display font-bold tabular-nums leading-none ${
                k.accent ? 'text-[#B45309]' : 'text-[#1E3A5F]'
              }`}
            >
              {k.valeur}
            </div>
          </div>
        ))}
      </div>

      {/* ── Contrôles ── */}
      <div className="px-4 sm:px-5 py-4 border-y border-[#1E3A5F]/10 bg-[#FFFDF9] space-y-3">
        <div className="flex flex-wrap gap-3">
          <div className="relative flex-1 min-w-[200px]">
            <Search
              size={15}
              aria-hidden="true"
              className="absolute left-3 top-1/2 -translate-y-1/2 text-[#64748B]"
            />
            <input
              type="search"
              value={criteres.recherche}
              onChange={(e) => setCriteres((c) => ({ ...c, recherche: e.target.value }))}
              placeholder="Client, commune, prestation…"
              aria-label="Rechercher une intervention"
              className="w-full h-10 pl-9 pr-3 text-sm rounded-lg border border-[#1E3A5F]/15 bg-white text-[#0C1626] placeholder:text-[#94A3B8] focus:border-[#F59E0B] focus:outline-none"
            />
          </div>

          <label className="flex items-center gap-2 text-sm">
            <span className="text-[#64748B] whitespace-nowrap">Trier par</span>
            <select
              value={criteres.tri}
              onChange={(e) => setCriteres((c) => ({ ...c, tri: e.target.value as Tri }))}
              aria-label="Critère de tri"
              className="h-10 px-3 text-sm rounded-lg border border-[#1E3A5F]/15 bg-white text-[#0C1626] focus:border-[#F59E0B] focus:outline-none"
            >
              {TRIS.map((t) => (
                <option key={t.valeur} value={t.valeur}>
                  {t.libelle}
                </option>
              ))}
            </select>
          </label>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <span className="text-[11px] font-mono uppercase tracking-[0.12em] text-[#64748B] mr-1">
            Statut
          </span>
          {CYCLE.map((statut) => {
            const actif = criteres.statuts.includes(statut)
            const compte = interventions.filter((i) => i.statut === statut).length
            return (
              <button
                key={statut}
                type="button"
                onClick={() => basculerStatut(statut)}
                aria-pressed={actif}
                data-filtre-statut={statut}
                className={`inline-flex items-center gap-1.5 px-3 h-8 rounded-full text-[12.5px] font-medium border transition-colors ${
                  actif
                    ? 'bg-[#1E3A5F] text-white border-[#1E3A5F]'
                    : 'bg-white text-[#475569] border-[#1E3A5F]/15 hover:border-[#1E3A5F]/35'
                }`}
              >
                {LIBELLES_STATUT[statut]}
                <span className={actif ? 'text-white/55' : 'text-[#94A3B8]'}>{compte}</span>
              </button>
            )
          })}
          {filtreActif && (
            <button
              type="button"
              onClick={() => setCriteres({ recherche: '', statuts: [], tri: criteres.tri })}
              className="inline-flex items-center gap-1.5 px-3 h-8 rounded-full text-[12.5px] text-[#B45309] hover:bg-[#F59E0B]/10"
            >
              <RotateCcw size={13} aria-hidden="true" /> Effacer les filtres
            </button>
          )}
        </div>
      </div>

      {/* ── Liste ── */}
      <div role="region" aria-live="polite" aria-label="Résultats">
        {visibles.length === 0 ? (
          <p className="px-5 py-14 text-center text-[#64748B] text-sm">
            Aucune intervention ne correspond à ces critères.
          </p>
        ) : (
          <ul className="divide-y divide-[#1E3A5F]/10">
            {visibles.map((i) => {
              const ouvert = deplie === i.id
              return (
                <li key={i.id}>
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-2 px-4 sm:px-5 py-3.5 hover:bg-[#FFFDF9]">
                    <button
                      type="button"
                      onClick={() => setDeplie(ouvert ? null : i.id)}
                      aria-expanded={ouvert}
                      aria-controls={`detail-${i.id}`}
                      className="flex items-center gap-2.5 flex-1 min-w-[190px] text-left"
                    >
                      <ChevronDown
                        size={15}
                        aria-hidden="true"
                        className={`text-[#94A3B8] shrink-0 transition-transform duration-200 ${
                          ouvert ? 'rotate-180' : ''
                        }`}
                      />
                      <span className="min-w-0">
                        <span className="block text-[14.5px] font-semibold text-[#0C1626] truncate">
                          {i.client}
                        </span>
                        <span className="block text-[12px] text-[#64748B]">
                          {i.id} · {i.commune} · {formaterDate(i.date)}
                        </span>
                      </span>
                    </button>

                    <span
                      className={`px-2.5 py-1 rounded-full text-[11.5px] font-semibold ${COULEUR_STATUT[i.statut]}`}
                    >
                      {LIBELLES_STATUT[i.statut]}
                    </span>

                    <span className="text-[14.5px] font-semibold tabular-nums text-[#1E3A5F] w-[108px] text-right">
                      {formaterEuros(totalTTC(i))}
                    </span>

                    <button
                      type="button"
                      onClick={() => envoyer({ type: 'avancer', id: i.id })}
                      disabled={i.statut === 'termine'}
                      className="inline-flex items-center gap-1.5 h-8 px-3 rounded-lg text-[12.5px] font-semibold border border-[#1E3A5F]/15 text-[#1E3A5F] hover:border-[#F59E0B] hover:text-[#B45309] disabled:opacity-35 disabled:hover:border-[#1E3A5F]/15 disabled:hover:text-[#1E3A5F] disabled:cursor-not-allowed transition-colors"
                    >
                      {i.statut === 'termine' ? 'Clôturée' : LIBELLES_STATUT[statutSuivant(i.statut)]}
                      {i.statut !== 'termine' && <ArrowRight size={13} aria-hidden="true" />}
                    </button>
                  </div>

                  {ouvert && (
                    <div id={`detail-${i.id}`} className="px-4 sm:px-5 pb-5 bg-[#FFFDF9]">
                      <table className="w-full text-[13px]">
                        <caption className="sr-only">
                          Détail des lignes de l’intervention {i.id}
                        </caption>
                        <thead>
                          <tr className="text-[11px] font-mono uppercase tracking-[0.1em] text-[#64748B]">
                            <th scope="col" className="text-left font-normal py-2">Désignation</th>
                            <th scope="col" className="text-right font-normal py-2 w-16">Qté</th>
                            <th scope="col" className="text-right font-normal py-2 w-28">P.U. HT</th>
                            <th scope="col" className="text-right font-normal py-2 w-28">Total HT</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-[#1E3A5F]/10">
                          {i.lignes.map((l, k) => (
                            <tr key={k}>
                              <td className="py-2 text-[#0C1626]">{l.designation}</td>
                              <td className="py-2 text-right tabular-nums text-[#475569]">{l.quantite}</td>
                              <td className="py-2 text-right tabular-nums text-[#475569]">
                                {formaterEuros(l.prixUnitaireHT)}
                              </td>
                              <td className="py-2 text-right tabular-nums font-medium text-[#1E3A5F]">
                                {formaterEuros(totalLigneHT(l))}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                        <tfoot className="text-[13px]">
                          <tr>
                            <td colSpan={3} className="pt-3 text-right text-[#64748B]">Total HT</td>
                            <td className="pt-3 text-right tabular-nums text-[#1E3A5F]">
                              {formaterEuros(totalHT(i))}
                            </td>
                          </tr>
                          <tr>
                            <td colSpan={3} className="py-1 text-right text-[#64748B]">TVA 20 %</td>
                            <td className="py-1 text-right tabular-nums text-[#1E3A5F]">
                              {formaterEuros(totalTVA(i))}
                            </td>
                          </tr>
                          <tr>
                            <td colSpan={3} className="text-right font-semibold text-[#0C1626]">Total TTC</td>
                            <td className="text-right tabular-nums font-bold text-[#B45309]">
                              {formaterEuros(totalTTC(i))}
                            </td>
                          </tr>
                        </tfoot>
                      </table>
                    </div>
                  )}
                </li>
              )
            })}
          </ul>
        )}
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3 px-4 sm:px-5 py-3 border-t border-[#1E3A5F]/10 bg-[#FFFDF9] text-[12.5px] text-[#64748B]">
        <span>
          {visibles.length} sur {interventions.length} intervention
          {interventions.length > 1 ? 's' : ''} · dont {formaterEuros(synthese.enAttente)} encore
          au stade devis
        </span>
        <button
          type="button"
          onClick={() => envoyer({ type: 'reinitialiser' })}
          className="inline-flex items-center gap-1.5 text-[#1E3A5F] hover:text-[#B45309] font-medium"
        >
          <RotateCcw size={13} aria-hidden="true" /> Réinitialiser la démonstration
        </button>
      </div>
    </div>
  )
}
