'use client'

/**
 * LE CONFIGURATEUR.
 *
 * Objectif commercial : transformer « je ne sais pas combien ça coûte » en
 * une demande de devis précise. Le visiteur construit son besoin, voit un
 * point de départ chiffré à partir des seuls tarifs publics, et transmet une
 * synthèse lisible au formulaire de devis.
 *
 * Ce qu'il ne fait jamais : annoncer un prix ferme. Le montant affiché est
 * étiqueté « à partir de », et toute option sans tarif public est signalée
 * comme restant à chiffrer.
 */

import { useMemo, useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, ArrowRight, Check, Info } from 'lucide-react'
import {
  BASES,
  CONFIGURATION_VIDE,
  ECHEANCES,
  estimer,
  optionsPour,
  resumer,
  type Configuration,
  type IdBase,
  type IdEcheance,
} from '@/lib/configurateur'

/** Clé de transmission vers le formulaire de devis. Lue puis effacée. */
export const CLE_TRANSMISSION = 'su:configurateur'

const ETAPES = ['Votre projet', 'Vos besoins', 'Votre échéance', 'Synthèse'] as const

export default function Configurateur() {
  const [etape, setEtape] = useState(0)
  const [config, setConfig] = useState<Configuration>(CONFIGURATION_VIDE)

  const options = useMemo(() => optionsPour(config.base), [config.base])
  const estimation = useMemo(() => estimer(config), [config])
  const synthese = useMemo(() => resumer(config), [config])

  const peutAvancer =
    (etape === 0 && config.base !== null) ||
    etape === 1 ||
    (etape === 2 && config.echeance !== null) ||
    etape === 3

  function choisirBase(id: IdBase) {
    setConfig((c) => ({
      ...c,
      base: id,
      // Les options ne sont pas toutes disponibles pour toutes les bases :
      // on retire silencieusement celles qui ne s'appliquent plus, sinon
      // l'estimation inclurait une option invisible à l'écran.
      options: c.options.filter((o) => optionsPour(id).some((p) => p.id === o)),
    }))
  }

  function basculerOption(id: string) {
    setConfig((c) => ({
      ...c,
      options: c.options.includes(id)
        ? c.options.filter((o) => o !== id)
        : [...c.options, id],
    }))
  }

  function transmettre() {
    try {
      sessionStorage.setItem(CLE_TRANSMISSION, synthese)
    } catch {
      // Navigation privée ou stockage refusé : le lien fonctionne quand même,
      // le visiteur aura simplement à décrire son besoin lui-même.
    }
  }

  return (
    <div className="su-strate su-strate--levee overflow-hidden">
      {/* ── Progression ── */}
      <ol className="flex border-b border-[#1E3A5F]/10 bg-[#FFFDF9]" aria-label="Étapes">
        {ETAPES.map((titre, i) => {
          const fait = i < etape
          const courante = i === etape
          return (
            <li key={titre} className="flex-1 min-w-0">
              <button
                type="button"
                onClick={() => i <= etape && setEtape(i)}
                disabled={i > etape}
                aria-current={courante ? 'step' : undefined}
                className={`w-full h-full px-2 sm:px-4 py-3.5 text-left border-b-2 transition-colors ${
                  courante
                    ? 'border-[#F59E0B] bg-white'
                    : fait
                      ? 'border-[#1E3A5F]/25 hover:bg-white'
                      : 'border-transparent cursor-default'
                }`}
              >
                <span
                  className={`block text-[10.5px] font-mono tracking-[0.12em] uppercase mb-0.5 ${
                    courante ? 'text-[#B45309]' : 'text-[#64748B]'
                  }`}
                >
                  Étape {i + 1}
                </span>
                <span
                  className={`block text-[13px] font-semibold truncate ${
                    courante || fait ? 'text-[#0C1626]' : 'text-[#64748B]'
                  }`}
                >
                  {titre}
                </span>
              </button>
            </li>
          )
        })}
      </ol>

      <div className="p-5 sm:p-7 min-h-[380px]">
        {/* ── Étape 1 : la base ── */}
        {etape === 0 && (
          <fieldset>
            <legend className="font-display font-bold text-[#0C1626] text-xl mb-1.5">
              Qu’est-ce qui ressemble le plus à votre projet ?
            </legend>
            <p className="text-[#64748B] text-sm mb-6">
              Si vous hésitez entre deux, choisissez le plus simple : nous
              affinerons ensemble.
            </p>
            <div className="grid sm:grid-cols-2 gap-3">
              {BASES.map((b) => {
                const actif = config.base === b.id
                return (
                  <button
                    key={b.id}
                    type="button"
                    onClick={() => choisirBase(b.id)}
                    aria-pressed={actif}
                    className={`text-left p-4 rounded-xl border transition-all ${
                      actif
                        ? 'border-[#F59E0B] bg-[#F59E0B]/[0.06] shadow-[0_0_0_1px_#F59E0B]'
                        : 'border-[#1E3A5F]/10 hover:border-[#1E3A5F]/30 bg-white'
                    }`}
                  >
                    <span className="flex items-start justify-between gap-3 mb-1.5">
                      <span className="font-semibold text-[#0C1626]">{b.titre}</span>
                      {actif && <Check size={16} className="text-[#B45309] shrink-0 mt-0.5" aria-hidden="true" />}
                    </span>
                    <span className="block text-[13.5px] text-[#475569] mb-3">{b.description}</span>
                    <span className="block text-[12.5px] font-mono text-[#64748B]">
                      à partir de <strong className="text-[#B45309]">{b.prix} €</strong> · {b.delai}
                    </span>
                  </button>
                )
              })}
            </div>
          </fieldset>
        )}

        {/* ── Étape 2 : les options ── */}
        {etape === 1 && (
          <fieldset>
            <legend className="font-display font-bold text-[#0C1626] text-xl mb-1.5">
              De quoi avez-vous besoin en plus ?
            </legend>
            <p className="text-[#64748B] text-sm mb-6">
              Tout est facultatif. Vous pouvez aussi ne rien cocher et passer à
              la suite.
            </p>
            <div className="space-y-2.5">
              {options.map((o) => {
                const actif = config.options.includes(o.id)
                return (
                  <label
                    key={o.id}
                    className={`flex items-start gap-3 p-3.5 rounded-xl border cursor-pointer transition-all ${
                      actif
                        ? 'border-[#F59E0B] bg-[#F59E0B]/[0.06]'
                        : 'border-[#1E3A5F]/10 hover:border-[#1E3A5F]/30 bg-white'
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={actif}
                      onChange={() => basculerOption(o.id)}
                      className="mt-1 w-4 h-4 accent-[#F59E0B] shrink-0"
                    />
                    <span className="min-w-0 flex-1">
                      <span className="flex flex-wrap items-baseline justify-between gap-x-3">
                        <span className="font-semibold text-[#0C1626] text-[15px]">{o.titre}</span>
                        <span className="text-[12.5px] font-mono whitespace-nowrap">
                          {o.prix !== null ? (
                            <span className="text-[#B45309] font-semibold">
                              {o.prix} {o.unite ?? '€'}
                            </span>
                          ) : (
                            <span className="text-[#64748B]">sur devis</span>
                          )}
                        </span>
                      </span>
                      <span className="block text-[13.5px] text-[#475569] mt-0.5">{o.detail}</span>
                    </span>
                  </label>
                )
              })}
            </div>
          </fieldset>
        )}

        {/* ── Étape 3 : l'échéance ── */}
        {etape === 2 && (
          <fieldset>
            <legend className="font-display font-bold text-[#0C1626] text-xl mb-1.5">
              Pour quand ?
            </legend>
            <p className="text-[#64748B] text-sm mb-6">
              Cela change la façon dont nous organisons le projet, pas son prix.
            </p>
            <div className="grid sm:grid-cols-3 gap-3 mb-6">
              {ECHEANCES.map((e) => {
                const actif = config.echeance === e.id
                return (
                  <button
                    key={e.id}
                    type="button"
                    onClick={() => setConfig((c) => ({ ...c, echeance: e.id as IdEcheance }))}
                    aria-pressed={actif}
                    className={`text-left p-4 rounded-xl border transition-all ${
                      actif
                        ? 'border-[#F59E0B] bg-[#F59E0B]/[0.06] shadow-[0_0_0_1px_#F59E0B]'
                        : 'border-[#1E3A5F]/10 hover:border-[#1E3A5F]/30 bg-white'
                    }`}
                  >
                    <span className="block font-semibold text-[#0C1626] mb-1">{e.titre}</span>
                    <span className="block text-[13px] text-[#475569]">{e.detail}</span>
                  </button>
                )
              })}
            </div>

            <label className="block">
              <span className="block text-sm font-semibold text-[#0C1626] mb-2">
                Un détail qui compte ? <span className="font-normal text-[#64748B]">(facultatif)</span>
              </span>
              <textarea
                value={config.contexte}
                onChange={(e) => setConfig((c) => ({ ...c, contexte: e.target.value }))}
                rows={3}
                maxLength={600}
                placeholder="Ex. : je dois pouvoir modifier mes tarifs moi-même, j’ai déjà un logo, mon agenda est sur Google…"
                className="w-full p-3 text-sm rounded-xl border border-[#1E3A5F]/15 bg-white text-[#0C1626] placeholder:text-[#64748B] focus:border-[#F59E0B] focus:outline-none resize-y"
              />
            </label>
          </fieldset>
        )}

        {/* ── Étape 4 : la synthèse ── */}
        {etape === 3 && (
          <div>
            <h3 className="font-display font-bold text-[#0C1626] text-xl mb-1.5">
              Voici ce que nous avons compris
            </h3>
            <p className="text-[#64748B] text-sm mb-6">
              Relisez, corrigez si besoin en revenant en arrière, puis transmettez.
            </p>

            <pre className="whitespace-pre-wrap font-sans text-[14px] leading-relaxed text-[#1E3A5F] bg-[#FFFDF9] border border-[#1E3A5F]/10 rounded-xl p-4 mb-5">
              {synthese || 'Rien n’a encore été sélectionné.'}
            </pre>

            <div className="flex items-start gap-2.5 p-3.5 rounded-xl bg-[#2D7DD2]/[0.07] border border-[#2D7DD2]/15 mb-6">
              <Info size={16} className="text-[#1B5A9E] shrink-0 mt-0.5" aria-hidden="true" />
              <p className="text-[13.5px] text-[#1E3A5F] leading-relaxed">
                Ce montant est un <strong>point de départ</strong> construit sur nos
                tarifs publics, pas un devis. Le prix final dépend de ce que nous
                découvrirons ensemble — il peut être identique, plus élevé si votre
                besoin est plus riche, ou plus bas si le périmètre se resserre.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <Link href="/devis" onClick={transmettre} className="su-action">
                Transmettre et demander mon devis
                <ArrowRight size={17} aria-hidden="true" />
              </Link>
              <button
                type="button"
                onClick={() => {
                  setConfig(CONFIGURATION_VIDE)
                  setEtape(0)
                }}
                className="su-action su-action--fantome"
              >
                Recommencer
              </button>
            </div>
          </div>
        )}
      </div>

      {/* ── Estimation persistante ── */}
      <div className="px-5 sm:px-7 py-4 border-t border-[#1E3A5F]/10 bg-[#1E3A5F] text-white">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-[10.5px] font-mono tracking-[0.14em] uppercase text-white/75 mb-1">
              Point de départ indicatif
            </p>
            <p className="font-display font-bold text-[1.6rem] leading-none tabular-nums">
              {estimation.planchePonctuel > 0 ? (
                <>
                  <span className="text-[0.62em] font-semibold text-white/80">à partir de </span>
                  <span className="text-[#FBBF24]">{estimation.planchePonctuel} €</span>
                </>
              ) : (
                <span className="text-white/75 text-[0.68em] font-semibold">
                  Choisissez un projet
                </span>
              )}
              {estimation.plancheMensuel > 0 && (
                <span className="text-[0.56em] font-semibold text-white/75">
                  {' '}+ {estimation.plancheMensuel} € / mois
                </span>
              )}
            </p>
            {estimation.surDevis.length > 0 && (
              <p className="text-[12px] text-white/75 mt-1.5">
                + {estimation.surDevis.length} élément
                {estimation.surDevis.length > 1 ? 's' : ''} à chiffrer ensemble
              </p>
            )}
          </div>

          <div className="flex gap-2.5 ml-auto">
            {etape > 0 && (
              <button
                type="button"
                onClick={() => setEtape((e) => e - 1)}
                className="inline-flex items-center gap-1.5 h-11 px-4 rounded-lg border border-white/25 text-white text-sm font-semibold hover:bg-white/10 transition-colors"
              >
                <ArrowLeft size={15} aria-hidden="true" /> Retour
              </button>
            )}
            {etape < 3 && (
              <button
                type="button"
                onClick={() => setEtape((e) => e + 1)}
                disabled={!peutAvancer}
                className="inline-flex items-center gap-1.5 h-11 px-5 rounded-lg bg-[#F59E0B] text-[#0C1626] text-sm font-bold hover:bg-[#FBBF24] disabled:opacity-35 disabled:cursor-not-allowed transition-colors"
              >
                Continuer <ArrowRight size={15} aria-hidden="true" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
