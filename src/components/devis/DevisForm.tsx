/* eslint-disable react/no-unescaped-entities */
'use client'
import { useState, useEffect, useRef, useCallback, Suspense } from 'react'

import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import {
  ChevronRight, ChevronLeft, Loader2, Check,
  Monitor, Layers, ShoppingCart, Heart, Settings2,
} from 'lucide-react'
import { SITE } from '@/config/site'

// ─── Types ────────────────────────────────────────────────────────────────────

type Projet = 'site-vitrine' | 'site-multi-pages' | 'site-ecommerce' | 'systeme-gestion' | 'site-association' | ''

interface FormState {
  projet: Projet
  metier: string
  options: string[]
  fonctionnalites: string[]
  maintenance: string
  offreRentree: boolean
  nom: string
  email: string
  telephone: string
  message: string
  rgpd: boolean
  src: string
}

const INITIAL: FormState = {
  projet: '', metier: '', options: [], fonctionnalites: [],
  maintenance: '', offreRentree: false,
  nom: '', email: '', telephone: '', message: '', rgpd: false, src: '',
}

// ─── Config ───────────────────────────────────────────────────────────────────

type LucideIcon = React.ElementType

type ProjetDef = {
  id: string
  label: string
  icon: LucideIcon
  prix: number | null
  delai: string
  desc: string
}

const PROJETS: ProjetDef[] = [
  { id: 'site-vitrine',     label: 'Site vitrine',       icon: Monitor,      prix: SITE.pricing.vitrine,    delai: SITE.delais.vitrine,    desc: 'Présence pro, SEO local, formulaire contact' },
  { id: 'site-multi-pages', label: 'Site multi-pages',   icon: Layers,       prix: SITE.pricing.multipages, delai: SITE.delais.multipages, desc: "Jusqu'à 10 pages, blog, galerie" },
  { id: 'site-ecommerce',   label: 'Boutique en ligne',  icon: ShoppingCart, prix: SITE.pricing.ecommerce,  delai: SITE.delais.ecommerce,  desc: 'Catalogue, paiement Stripe, commandes' },
  { id: 'site-association', label: 'Site association',   icon: Heart,        prix: SITE.pricing.association, delai: SITE.delais.association, desc: 'Loi 1901, adhésion, agenda' },
  { id: 'systeme-gestion',  label: 'Système de gestion', icon: Settings2,    prix: null,                     delai: SITE.delais.gestion,    desc: 'CRM, RDV, caisse, planning — sur devis' },
]

const OPTIONS_CONTENU = [
  { id: 'blog',        label: 'Blog / Actualités',     prix: 0    },
  { id: 'galerie',     label: 'Galerie photos/vidéos', prix: 0    },
  { id: 'multilingue', label: 'Version multilingue',   prix: null },
  { id: 'animation',   label: 'Animations avancées',   prix: null },
]

const FONCTIONNALITES = [
  { id: 'rdv',          label: 'Prise de rendez-vous en ligne' },
  { id: 'clickcollect', label: 'Click & Collect'               },
  { id: 'crm',          label: 'CRM / base clients'            },
  { id: 'chatbot',      label: 'Chat / assistant IA'           },
  { id: 'stock',        label: 'Gestion des stocks'            },
  { id: 'planning',     label: 'Planning / agenda'             },
]

const MAINTENANCES = [
  { id: '',        label: "Aucune maintenance pour l'instant", prix: 0,                              desc: '' },
  { id: 'starter', label: 'Starter',                          prix: SITE.pricing.maintenanceStarter, desc: 'Mises à jour + sauvegarde' },
  { id: 'pro',     label: 'Pro',                              prix: SITE.pricing.maintenancePro,     desc: 'Starter + support prioritaire' },
  { id: 'premium', label: 'Premium',                          prix: SITE.pricing.maintenancePremium, desc: 'Pro + modifications mensuelles' },
]

// ─── Prix ─────────────────────────────────────────────────────────────────────

function calcPrix(state: FormState): { base: number | null; surDevis: boolean; mensuel: number } {
  const projet = PROJETS.find(p => p.id === state.projet)
  const fonctionsSurDevis = state.fonctionnalites.length > 0
  const optionsSurDevis = state.options.some(o => OPTIONS_CONTENU.find(x => x.id === o)?.prix === null)
  const surDevis = !projet || projet.prix === null || fonctionsSurDevis || optionsSurDevis
  const base = surDevis ? null : (projet?.prix ?? null)
  const maintenance = MAINTENANCES.find(m => m.id === state.maintenance)
  return { base, surDevis, mensuel: maintenance?.prix ?? 0 }
}

// ─── CountUp (RAF, 400 ms ease-out-quart) ─────────────────────────────────────

function useCountUp(target: number | null, duration = 400): number {
  const [display, setDisplay] = useState(target ?? 0)
  const displayRef = useRef(target ?? 0)
  const rafRef     = useRef<number | undefined>(undefined)
  const t0Ref      = useRef<number | null>(null)

  useEffect(() => {
    if (target === null) {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
      return
    }
    const from = displayRef.current
    t0Ref.current = null
    if (rafRef.current) cancelAnimationFrame(rafRef.current)
    const tick = (ts: number) => {
      if (t0Ref.current === null) t0Ref.current = ts
      const p = Math.min((ts - t0Ref.current) / duration, 1)
      const e = 1 - Math.pow(1 - p, 4)            // ease-out-quart
      const v = Math.round(from + (target - from) * e)
      displayRef.current = v
      setDisplay(v)
      if (p < 1) rafRef.current = requestAnimationFrame(tick)
    }
    rafRef.current = requestAnimationFrame(tick)
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current) }
  }, [target, duration])

  return display
}

// ─── Progress bar ─────────────────────────────────────────────────────────────

const STEP_LABELS = ['Projet', 'Contenus', 'Fonctions', 'Accompagnement', 'Coordonnées']

function ProgressBar({ step }: { step: number }) {
  return (
    <div className="mb-10">
      <div className="flex items-start">
        {STEP_LABELS.map((label, i) => {
          const n = i + 1
          const done   = n < step
          const active = n === step
          return (
            <div key={label} className="flex items-center flex-1 last:flex-none">
              {/* Circle */}
              <div className="flex flex-col items-center gap-1.5 flex-shrink-0">
                <div className={[
                  'w-9 h-9 rounded-full flex items-center justify-center font-bold text-sm border-2 transition-all duration-300 flex-shrink-0',
                  done   ? 'bg-electric border-electric text-white shadow-[0_0_14px_rgba(45,125,210,0.45)]'
                         : active ? 'bg-white dark:bg-[#0D1626] border-electric text-electric ring-4 ring-electric/15'
                         : 'bg-white dark:bg-[#0D1626] border-navy/20 dark:border-white/10 text-foreground/30 dark:text-white/25',
                ].join(' ')}>
                  {done ? <Check size={15} strokeWidth={3} /> : n}
                </div>
                <span className={[
                  'text-[10px] font-semibold tracking-wider uppercase hidden sm:block transition-colors',
                  active ? 'text-electric' : done ? 'text-foreground/45 dark:text-white/35' : 'text-foreground/22 dark:text-white/18',
                ].join(' ')}>{label}</span>
              </div>
              {/* Connector */}
              {i < STEP_LABELS.length - 1 && (
                <div className="flex-1 mx-2 mb-5 sm:mb-6">
                  <div className="h-0.5 bg-navy/10 dark:bg-white/8 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-electric to-gold transition-all duration-500 ease-out"
                      style={{ width: done ? '100%' : '0%' }}
                    />
                  </div>
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}

// ─── Live price counter ───────────────────────────────────────────────────────

function LivePrice({ state }: { state: FormState }) {
  const { base, surDevis, mensuel } = calcPrix(state)
  const animated = useCountUp(surDevis ? null : base, 400)
  const projet   = PROJETS.find(p => p.id === state.projet)

  return (
    <div className="flex items-center justify-between pt-5 border-t border-navy/10 dark:border-white/8 mt-8">
      <div>
        <div className="text-[10px] font-semibold text-foreground/38 dark:text-white/32 uppercase tracking-widest mb-0.5">
          Estimation
        </div>
        {surDevis ? (
          <div className="text-2xl font-bold text-gold" style={{ fontFamily: 'var(--font-space, system-ui)' }}>
            Sur devis
          </div>
        ) : (
          <div className="text-2xl font-bold text-gold tabular-nums" style={{ fontFamily: 'var(--font-space, system-ui)', fontVariantNumeric: 'tabular-nums' }}>
            {animated.toLocaleString('fr-FR')} €
            {mensuel > 0 && (
              <span className="text-sm font-normal text-foreground/38 dark:text-white/30 ml-2">
                + {mensuel} €/mois
              </span>
            )}
          </div>
        )}
      </div>
      {projet?.delai && (
        <div className="hidden sm:block text-right">
          <div className="text-[10px] text-foreground/35 dark:text-white/28 uppercase tracking-wider mb-0.5">Livraison</div>
          <div className="text-xs font-medium text-foreground/55 dark:text-white/45">{projet.delai}</div>
        </div>
      )}
    </div>
  )
}

// ─── Étape 1 ─────────────────────────────────────────────────────────────────

function Etape1({
  state, set, onSelect,
}: {
  state: FormState
  set: (k: keyof FormState, v: unknown) => void
  onSelect: () => void
}) {
  const handlePick = (id: string) => {
    set('projet', id)
    setTimeout(onSelect, 200)
  }

  return (
    <div>
      <h2 className="text-2xl font-bold text-foreground dark:text-white mb-2">
        Quel type de site souhaitez-vous ?
      </h2>
      <p className="text-sm text-foreground/52 dark:text-white/42 mb-8">
        Sélectionnez votre projet — vous passerez automatiquement à l'étape suivante.
      </p>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        {PROJETS.map(p => {
          const Icon     = p.icon
          const selected = state.projet === p.id
          return (
            <button
              key={p.id}
              type="button"
              onClick={() => handlePick(p.id)}
              className={[
                'relative text-left p-5 rounded-2xl border-2 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-electric',
                selected
                  ? 'border-electric bg-electric/[0.06] dark:bg-electric/[0.09] scale-[1.025] shadow-[0_0_0_4px_rgba(45,125,210,0.13)]'
                  : 'border-navy/14 dark:border-white/8 bg-white dark:bg-white/[0.02] hover:border-electric/45 hover:scale-[1.01]',
              ].join(' ')}
            >
              {/* Checkmark badge */}
              {selected && (
                <span className="absolute top-3 right-3 w-6 h-6 rounded-full bg-electric flex items-center justify-center shadow-[0_2px_8px_rgba(45,125,210,0.45)]">
                  <Check size={12} strokeWidth={3} className="text-white" />
                </span>
              )}

              {/* Icon chip */}
              <div className={[
                'w-11 h-11 rounded-xl flex items-center justify-center mb-3 transition-colors duration-200',
                selected ? 'bg-electric text-white' : 'bg-navy/[0.06] dark:bg-white/[0.06] text-navy dark:text-white/65',
              ].join(' ')}>
                <Icon size={22} />
              </div>

              <div className="font-bold text-foreground dark:text-white text-sm leading-snug mb-1">{p.label}</div>
              <div className="text-xs text-foreground/48 dark:text-white/38 mb-3 leading-relaxed">{p.desc}</div>
              <div className={['text-base font-bold transition-colors', selected ? 'text-electric' : 'text-navy dark:text-gold'].join(' ')}>
                {p.prix !== null ? `${p.prix.toLocaleString('fr-FR')} €` : 'Sur devis'}
              </div>
            </button>
          )
        })}
      </div>

      <div>
        <label className="block text-sm font-medium text-foreground dark:text-white mb-2">
          Votre secteur / métier{' '}
          <span className="text-foreground/35 dark:text-white/28 font-normal">(optionnel)</span>
        </label>
        <input
          type="text"
          value={state.metier}
          onChange={e => set('metier', e.target.value)}
          placeholder="ex. restaurant, plombier, coach sportif…"
          className="w-full px-4 py-3 rounded-xl border border-navy/18 dark:border-white/10 bg-white dark:bg-white/[0.03] text-foreground dark:text-white placeholder:text-foreground/24 dark:placeholder:text-white/22 focus:outline-none focus:ring-2 focus:ring-electric/40 focus:border-electric/50 text-sm transition-all"
        />
      </div>
    </div>
  )
}

// ─── Étape 2 ─────────────────────────────────────────────────────────────────

function Etape2({ state, set }: { state: FormState; set: (k: keyof FormState, v: unknown) => void }) {
  const toggle = (id: string) => {
    const next = state.options.includes(id)
      ? state.options.filter(o => o !== id)
      : [...state.options, id]
    set('options', next)
  }

  return (
    <div>
      <h2 className="text-2xl font-bold text-foreground dark:text-white mb-2">Contenus supplémentaires</h2>
      <p className="text-sm text-foreground/52 dark:text-white/42 mb-8">
        Cochez ce dont vous avez besoin. Vous pouvez tout décocher si non concerné.
      </p>
      <div className="space-y-3">
        {OPTIONS_CONTENU.map(opt => {
          const on = state.options.includes(opt.id)
          return (
            <label
              key={opt.id}
              className={[
                'flex items-center gap-4 p-5 rounded-2xl border-2 cursor-pointer transition-all duration-200 group',
                on
                  ? 'border-electric bg-electric/[0.06] dark:bg-electric/[0.09]'
                  : 'border-navy/12 dark:border-white/8 hover:border-electric/38 hover:bg-navy/[0.015] dark:hover:bg-white/[0.015]',
              ].join(' ')}
            >
              <div className={[
                'w-5 h-5 rounded-md border-2 flex items-center justify-center flex-shrink-0 transition-all duration-200',
                on ? 'bg-electric border-electric' : 'border-navy/24 dark:border-white/18 group-hover:border-electric/48',
              ].join(' ')}>
                {on && <Check size={11} strokeWidth={3} className="text-white" />}
              </div>
              <input type="checkbox" checked={on} onChange={() => toggle(opt.id)} className="sr-only" />
              <span className="flex-1 text-sm font-semibold text-foreground dark:text-white">{opt.label}</span>
              <span className={[
                'text-xs font-semibold px-2.5 py-1 rounded-full flex-shrink-0',
                opt.prix === null
                  ? 'bg-gold/12 text-amber-600 dark:text-gold dark:bg-gold/14'
                  : 'bg-navy/[0.06] dark:bg-white/[0.06] text-foreground/45 dark:text-white/38',
              ].join(' ')}>
                {opt.prix === null ? 'Sur devis' : opt.prix === 0 ? 'Inclus' : `+${opt.prix} €`}
              </span>
            </label>
          )
        })}
      </div>
    </div>
  )
}

// ─── Étape 3 ─────────────────────────────────────────────────────────────────

function Etape3({ state, set }: { state: FormState; set: (k: keyof FormState, v: unknown) => void }) {
  const toggle = (id: string) => {
    const next = state.fonctionnalites.includes(id)
      ? state.fonctionnalites.filter(f => f !== id)
      : [...state.fonctionnalites, id]
    set('fonctionnalites', next)
  }

  return (
    <div>
      <h2 className="text-2xl font-bold text-foreground dark:text-white mb-2">Fonctionnalités métier</h2>
      <p className="text-sm text-foreground/52 dark:text-white/42 mb-8">
        Ces fonctionnalités sont tarifées sur devis selon la complexité de votre projet. Nous vous recontactons pour affiner.
      </p>
      <div className="flex flex-wrap gap-3">
        {FONCTIONNALITES.map(fn => {
          const on = state.fonctionnalites.includes(fn.id)
          return (
            <button
              key={fn.id}
              type="button"
              onClick={() => toggle(fn.id)}
              className={[
                'flex items-center gap-2 px-4 py-2.5 rounded-full border-2 text-sm font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-electric',
                on
                  ? 'border-electric bg-electric text-white shadow-[0_2px_14px_rgba(45,125,210,0.38)]'
                  : 'border-navy/14 dark:border-white/10 bg-white dark:bg-white/[0.03] text-foreground/65 dark:text-white/55 hover:border-electric/45 hover:text-foreground dark:hover:text-white',
              ].join(' ')}
            >
              {on && <Check size={13} strokeWidth={3} />}
              {fn.label}
            </button>
          )
        })}
      </div>
      {state.fonctionnalites.length > 0 && (
        <p className="mt-6 text-xs text-foreground/42 dark:text-white/32 flex items-center gap-1.5">
          <span className="inline-flex w-4 h-4 rounded-full bg-gold/15 items-center justify-center text-gold text-[10px] font-bold flex-shrink-0">i</span>
          Ces fonctionnalités entraîneront un devis personnalisé —{' '}
          <Link href="/solutions" className="text-electric hover:underline">en savoir plus</Link>
        </p>
      )}
    </div>
  )
}

// ─── Étape 4 ─────────────────────────────────────────────────────────────────

function Etape4({
  state, set, rentreeActive,
}: {
  state: FormState
  set: (k: keyof FormState, v: unknown) => void
  rentreeActive: boolean
}) {
  return (
    <div>
      <h2 className="text-2xl font-bold text-foreground dark:text-white mb-2">Accompagnement après livraison</h2>
      <p className="text-sm text-foreground/52 dark:text-white/42 mb-8">
        Choisissez votre formule de maintenance mensuelle.
      </p>
      <div className="space-y-3 mb-6">
        {MAINTENANCES.map(m => {
          const on = state.maintenance === m.id
          return (
            <label
              key={m.id}
              className={[
                'flex items-center gap-4 p-5 rounded-2xl border-2 cursor-pointer transition-all duration-200 group',
                on
                  ? 'border-electric bg-electric/[0.06] dark:bg-electric/[0.09] shadow-[0_0_0_3px_rgba(45,125,210,0.10)]'
                  : 'border-navy/12 dark:border-white/8 hover:border-electric/38',
              ].join(' ')}
            >
              {/* Custom radio */}
              <div className={[
                'w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-all duration-200',
                on ? 'border-electric' : 'border-navy/24 dark:border-white/18 group-hover:border-electric/48',
              ].join(' ')}>
                {on && <div className="w-2.5 h-2.5 rounded-full bg-electric" />}
              </div>
              <input type="radio" name="maintenance" checked={on} onChange={() => set('maintenance', m.id)} className="sr-only" />
              <div className="flex-1">
                <div className="text-sm font-bold text-foreground dark:text-white">{m.label}</div>
                {m.desc && <div className="text-xs text-foreground/42 dark:text-white/32 mt-0.5">{m.desc}</div>}
              </div>
              {m.prix > 0 && (
                <div className="text-right flex-shrink-0">
                  <div className={['text-base font-bold', on ? 'text-electric' : 'text-navy dark:text-gold'].join(' ')}>{m.prix} €</div>
                  <div className="text-[10px] text-foreground/38 dark:text-white/28">/mois</div>
                </div>
              )}
            </label>
          )
        })}
      </div>

      {rentreeActive && (
        <label className={[
          'flex items-center gap-4 p-5 rounded-2xl border-2 cursor-pointer transition-all duration-200',
          state.offreRentree ? 'border-gold bg-gold/[0.07] dark:bg-gold/[0.10]' : 'border-gold/28 hover:border-gold/55',
        ].join(' ')}>
          <div className={[
            'w-5 h-5 rounded-md border-2 flex items-center justify-center flex-shrink-0 transition-colors',
            state.offreRentree ? 'bg-gold border-gold' : 'border-gold/38',
          ].join(' ')}>
            {state.offreRentree && <Check size={11} strokeWidth={3} className="text-white" />}
          </div>
          <input type="checkbox" checked={state.offreRentree} onChange={e => set('offreRentree', e.target.checked)} className="sr-only" />
          <span className="text-sm text-foreground dark:text-white">
            🎒 <strong>Offre rentrée</strong> — maquette offerte (valable jusqu'au 13 sept. 2026)
          </span>
        </label>
      )}
    </div>
  )
}

// ─── Étape 5 ─────────────────────────────────────────────────────────────────

function Etape5({ state, set }: { state: FormState; set: (k: keyof FormState, v: unknown) => void }) {
  return (
    <div>
      <h2 className="text-2xl font-bold text-foreground dark:text-white mb-2">Vos coordonnées</h2>
      <p className="text-sm text-foreground/52 dark:text-white/42 mb-8">
        Nous vous enverrons votre devis personnalisé sous 72 h.
      </p>
      <div className="space-y-5">
        <div className="float-field">
          <input type="text"  id="dv-nom"   value={state.nom}       onChange={e => set('nom', e.target.value)}       required placeholder=" " />
          <label htmlFor="dv-nom">Nom et prénom *</label>
        </div>
        <div className="float-field">
          <input type="email" id="dv-email" value={state.email}     onChange={e => set('email', e.target.value)}     required placeholder=" " />
          <label htmlFor="dv-email">Email *</label>
        </div>
        <div className="float-field">
          <input type="tel"   id="dv-tel"   value={state.telephone} onChange={e => set('telephone', e.target.value)} placeholder=" " />
          <label htmlFor="dv-tel">Téléphone (optionnel)</label>
        </div>
        <div className="float-field">
          <textarea id="dv-msg" value={state.message} onChange={e => set('message', e.target.value)} rows={3} placeholder=" " />
          <label htmlFor="dv-msg">Précisions sur votre projet (optionnel)</label>
        </div>
        <label className="flex items-start gap-3 cursor-pointer group">
          <div className={[
            'mt-0.5 w-5 h-5 rounded-md border-2 flex items-center justify-center flex-shrink-0 transition-colors',
            state.rgpd ? 'bg-electric border-electric' : 'border-navy/24 dark:border-white/18 group-hover:border-electric/48',
          ].join(' ')}>
            {state.rgpd && <Check size={11} strokeWidth={3} className="text-white" />}
          </div>
          <input type="checkbox" checked={state.rgpd} onChange={e => set('rgpd', e.target.checked)} className="sr-only" />
          <span className="text-xs text-foreground/52 dark:text-white/42 leading-relaxed">
            J'accepte que mes données soient traitées pour répondre à ma demande. Voir notre{' '}
            <Link href="/mentions-legales" className="text-electric hover:underline">politique de confidentialité</Link>.
          </span>
        </label>
      </div>
    </div>
  )
}

// ─── Recap view ───────────────────────────────────────────────────────────────

function RecapView({
  state, onBack, onSubmit, sending, error,
}: {
  state: FormState
  onBack: () => void
  onSubmit: () => void
  sending: boolean
  error: string
}) {
  const { base, surDevis, mensuel } = calcPrix(state)
  const animated = useCountUp(surDevis ? null : base, 400)
  const projet   = PROJETS.find(p => p.id === state.projet)
  const selOpts  = state.options.map(o => OPTIONS_CONTENU.find(x => x.id === o)).filter(Boolean)
  const selFns   = state.fonctionnalites.map(f => FONCTIONNALITES.find(x => x.id === f)).filter(Boolean)
  const maint    = MAINTENANCES.find(m => m.id === state.maintenance)

  return (
    <div className="max-w-2xl mx-auto">
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-electric/60 mb-3">
          <span className="w-8 h-px bg-electric/35 block" />
          Récapitulatif
          <span className="w-8 h-px bg-electric/35 block" />
        </div>
        <h2 className="text-2xl font-bold text-foreground dark:text-white">Votre demande de devis</h2>
        <p className="text-sm text-foreground/45 dark:text-white/38 mt-1">Vérifiez vos informations avant d'envoyer</p>
      </div>

      <div className="rounded-2xl border border-navy/12 dark:border-white/8 overflow-hidden shadow-lift">
        {/* Price header */}
        <div className="bg-gradient-to-br from-navy to-[#0B1A2E] px-6 py-6 text-white">
          <div className="flex items-center justify-between gap-4">
            <div>
              <div className="text-[10px] font-bold uppercase tracking-widest opacity-45 mb-1">Estimation totale</div>
              <div className="text-4xl font-bold text-gold tabular-nums" style={{ fontFamily: 'var(--font-space, system-ui)' }}>
                {surDevis ? 'Sur devis' : `${animated.toLocaleString('fr-FR')} €`}
              </div>
              {mensuel > 0 && <div className="text-sm opacity-45 mt-1">+ {mensuel} €/mois (maintenance)</div>}
            </div>
            {projet?.delai && (
              <div className="text-right flex-shrink-0">
                <div className="text-[10px] uppercase tracking-wider opacity-40 mb-0.5">Livraison</div>
                <div className="text-sm font-semibold opacity-75">{projet.delai}</div>
              </div>
            )}
          </div>
        </div>

        {/* Rows */}
        <div className="divide-y divide-navy/7 dark:divide-white/5 checks-visible">
          <div className="px-6 py-4 check-item flex items-center justify-between">
            <span className="text-[10px] font-bold uppercase tracking-wider text-foreground/38 dark:text-white/28">Projet</span>
            <span className="text-sm font-semibold text-foreground dark:text-white">{projet?.label}</span>
          </div>

          {state.metier && (
            <div className="px-6 py-4 check-item flex items-center justify-between">
              <span className="text-[10px] font-bold uppercase tracking-wider text-foreground/38 dark:text-white/28">Secteur</span>
              <span className="text-sm text-foreground/65 dark:text-white/55">{state.metier}</span>
            </div>
          )}

          {selOpts.length > 0 && (
            <div className="px-6 py-4 check-item">
              <div className="text-[10px] font-bold uppercase tracking-wider text-foreground/38 dark:text-white/28 mb-2">Contenus</div>
              <div className="flex flex-wrap gap-2">
                {selOpts.map(o => o && (
                  <span key={o.id} className="text-xs px-2.5 py-1 rounded-full bg-electric/10 text-electric font-semibold">{o.label}</span>
                ))}
              </div>
            </div>
          )}

          {selFns.length > 0 && (
            <div className="px-6 py-4 check-item">
              <div className="text-[10px] font-bold uppercase tracking-wider text-foreground/38 dark:text-white/28 mb-2">Fonctionnalités</div>
              <div className="flex flex-wrap gap-2">
                {selFns.map(f => f && (
                  <span key={f.id} className="text-xs px-2.5 py-1 rounded-full bg-gold/12 text-amber-600 dark:text-gold font-semibold">{f.label}</span>
                ))}
              </div>
            </div>
          )}

          {maint && maint.id && (
            <div className="px-6 py-4 check-item flex items-center justify-between">
              <span className="text-[10px] font-bold uppercase tracking-wider text-foreground/38 dark:text-white/28">Maintenance</span>
              <span className="text-sm font-semibold text-foreground dark:text-white">
                {maint.label} — {maint.prix} €/mois
              </span>
            </div>
          )}

          {state.offreRentree && (
            <div className="px-6 py-4 check-item flex items-center gap-2">
              <span>🎒</span>
              <span className="text-sm font-medium text-gold">Offre rentrée — maquette offerte</span>
            </div>
          )}

          <div className="px-6 py-4 check-item">
            <div className="text-[10px] font-bold uppercase tracking-wider text-foreground/38 dark:text-white/28 mb-1.5">Contact</div>
            <div className="text-sm font-semibold text-foreground dark:text-white">{state.nom}</div>
            <div className="text-sm text-foreground/58 dark:text-white/48">{state.email}</div>
            {state.telephone && <div className="text-sm text-foreground/58 dark:text-white/48">{state.telephone}</div>}
          </div>
        </div>
      </div>

      {error && <p className="text-red-500 text-sm mt-4 text-center">{error}</p>}

      <div className="flex items-center justify-between mt-8">
        <button
          type="button"
          onClick={onBack}
          className="flex items-center gap-1.5 px-4 py-2.5 text-sm font-medium text-foreground/48 dark:text-white/38 hover:text-foreground dark:hover:text-white transition-colors rounded-xl hover:bg-navy/[0.04] dark:hover:bg-white/[0.04]"
        >
          <ChevronLeft size={16} /> Modifier
        </button>
        <button
          type="button"
          onClick={onSubmit}
          disabled={sending}
          className="flex items-center gap-2 px-8 py-3.5 bg-gold hover:bg-amber-400 text-ink text-sm font-bold rounded-2xl transition-all shadow-[0_4px_22px_rgba(245,158,11,0.32)] hover:shadow-[0_6px_30px_rgba(245,158,11,0.42)] disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {sending ? (
            <><Loader2 size={16} className="animate-spin" /> Envoi en cours…</>
          ) : (
            <>Envoyer ma demande <ChevronRight size={16} /></>
          )}
        </button>
      </div>
    </div>
  )
}

// ─── Success view ─────────────────────────────────────────────────────────────

function SuccessView({ email }: { email: string }) {
  return (
    <div className="text-center py-12 max-w-lg mx-auto">
      {/* Animated SVG checkmark */}
      <div className="flex items-center justify-center mb-8">
        <svg className="w-20 h-20" viewBox="0 0 80 80" fill="none" aria-hidden="true">
          <circle cx="40" cy="40" r="36" stroke="currentColor" className="text-electric/15" strokeWidth="3" />
          <circle
            cx="40" cy="40" r="36"
            stroke="currentColor" strokeWidth="3" strokeLinecap="round"
            className="text-electric devis-success-circle"
            style={{ strokeDasharray: 226, strokeDashoffset: 226 }}
          />
          <path
            d="M25 40 L35 50 L55 30"
            stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round"
            className="text-electric devis-success-check"
            style={{ strokeDasharray: 55, strokeDashoffset: 55 }}
          />
        </svg>
      </div>

      <h2 className="text-2xl font-bold text-foreground dark:text-white mb-3">Devis bien reçu !</h2>
      <p className="text-foreground/62 dark:text-white/52 mb-2">
        Nous avons reçu votre demande et vous répondrons sous 72 h à <strong>{email}</strong>.
      </p>
      <p className="text-sm text-foreground/38 dark:text-white/32 mb-10">
        Un email de confirmation vous a été envoyé.
      </p>
      <div className="flex flex-wrap justify-center gap-3">
        <Link href="/" className="px-6 py-3 bg-navy text-white rounded-xl text-sm font-semibold hover:bg-electric transition-colors">
          Retour à l'accueil
        </Link>
        <Link href="/faq" className="px-6 py-3 border border-navy/20 dark:border-white/12 text-foreground dark:text-white rounded-xl text-sm font-semibold hover:bg-foreground/[0.04] dark:hover:bg-white/[0.04] transition-colors">
          Questions fréquentes
        </Link>
      </div>
    </div>
  )
}

// ─── Main component ───────────────────────────────────────────────────────────

type View = 'form' | 'recap' | 'success'

function DevisFormInner() {
  const searchParams = useSearchParams()

  const [state, setState] = useState<FormState>(() => {
    if (typeof window !== 'undefined') {
      const saved = sessionStorage.getItem('devis_state')
      if (saved) return { ...INITIAL, ...JSON.parse(saved) }
    }
    return INITIAL
  })

  const [step,      setStep]      = useState(1)
  const [slideDir,  setSlideDir]  = useState<1 | -1>(1)
  const [slideKey,  setSlideKey]  = useState(0)
  const [view,      setView]      = useState<View>('form')
  const [sending,   setSending]   = useState(false)
  const [error,     setError]     = useState('')
  const [rentreeActive, setRentreeActive] = useState(false)

  const wrapperRef = useRef<HTMLDivElement>(null)

  const scrollTop = useCallback(() => {
    setTimeout(() => wrapperRef.current?.scrollIntoView({ block: 'start', behavior: 'smooth' }), 50)
  }, [])

  const goToStep = useCallback((next: number, dir?: 1 | -1) => {
    setSlideDir(dir ?? (next > step ? 1 : -1))
    setStep(next)
    setSlideKey(k => k + 1)
    scrollTop()
  }, [step, scrollTop])

  // Prefill from URL params
  useEffect(() => {
    const projet      = searchParams.get('projet') as Projet
    const metier      = searchParams.get('metier') || ''
    const src         = searchParams.get('src') || ''
    const offreRentree = searchParams.get('offre') === 'rentree'
    if (projet || metier || src || offreRentree) {
      setState(s => ({
        ...s,
        ...(projet       ? { projet }           : {}),
        ...(metier       ? { metier }            : {}),
        ...(src          ? { src }               : {}),
        ...(offreRentree ? { offreRentree: true } : {}),
      }))
    }
  }, [searchParams])

  useEffect(() => {
    setRentreeActive(Date.now() < new Date('2026-09-15T21:59:59Z').getTime())
  }, [])

  // Persist state in sessionStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      sessionStorage.setItem('devis_state', JSON.stringify(state))
    }
  }, [state])

  const set = (k: keyof FormState, v: unknown) =>
    setState(s => ({ ...s, [k]: v }))

  const canNext = () => {
    if (step === 1) return !!state.projet
    if (step === 5) return !!state.nom && !!state.email && state.rgpd
    return true
  }

  const buildEmailHtml = () => {
    const projet = PROJETS.find(p => p.id === state.projet)
    const { base, surDevis, mensuel } = calcPrix(state)
    const maintenance = MAINTENANCES.find(m => m.id === state.maintenance)
    return `
      <h2>Nouveau devis express — stackup-agency.fr</h2>
      <p><strong>Nom :</strong> ${state.nom}</p>
      <p><strong>Email :</strong> ${state.email}</p>
      <p><strong>Téléphone :</strong> ${state.telephone || 'Non renseigné'}</p>
      <hr />
      <p><strong>Type de site :</strong> ${projet?.label || state.projet}</p>
      ${state.metier ? `<p><strong>Secteur / métier :</strong> ${state.metier}</p>` : ''}
      <p><strong>Contenus :</strong> ${state.options.length ? state.options.join(', ') : 'Aucun'}</p>
      <p><strong>Fonctionnalités :</strong> ${state.fonctionnalites.length ? state.fonctionnalites.join(', ') + ' (sur devis)' : 'Aucune'}</p>
      <p><strong>Maintenance :</strong> ${maintenance?.label || 'Aucune'}</p>
      <p><strong>Offre rentrée :</strong> ${state.offreRentree ? 'Oui' : 'Non'}</p>
      <p><strong>Estimation :</strong> ${surDevis ? 'Sur devis' : `${base?.toLocaleString('fr-FR')} €`}${mensuel ? ` + ${mensuel} €/mois` : ''}</p>
      ${state.message ? `<p><strong>Message :</strong><br>${state.message}</p>` : ''}
      ${state.src ? `<p><strong>Source :</strong> ${state.src}</p>` : ''}
    `
  }

  const buildConfirmHtml = () => {
    const projet = PROJETS.find(p => p.id === state.projet)
    return `
      <h2>Votre demande de devis a bien été reçue</h2>
      <p>Bonjour ${state.nom},</p>
      <p>Nous avons bien reçu votre demande de devis pour un <strong>${projet?.label || state.projet}</strong>${state.metier ? ` (${state.metier})` : ''}.</p>
      <p>Nous vous répondrons sous <strong>72h</strong> avec un devis personnalisé.</p>
      ${state.offreRentree ? '<p>🎒 <strong>Offre rentrée notée</strong> : votre maquette sera offerte avec votre projet.</p>' : ''}
      <p>En attendant, n'hésitez pas à consulter notre <a href="https://stackup-agency.fr/faq">FAQ</a> ou nos <a href="https://stackup-agency.fr/realisations">réalisations</a>.</p>
      <p>Cordialement,<br>${SITE.signature}</p>
    `
  }

  const submit = async () => {
    setSending(true)
    setError('')
    if (typeof window !== 'undefined' && 'gtag' in window) {
      // @ts-expect-error gtag global
      window.gtag('event', 'devis_submitted', { projet: state.projet, sur_devis: calcPrix(state).surDevis })
    }
    try {
      const projet = PROJETS.find(p => p.id === state.projet)
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: state.nom,
          email: state.email,
          phone: state.telephone,
          project: projet?.label || state.projet,
          message: state.message,
          subject: `Devis express — ${projet?.label || state.projet} — ${state.nom}`,
          html: buildEmailHtml(),
          confirmHtml: buildConfirmHtml(),
          src: state.src,
        }),
      })
      if (!res.ok) throw new Error('Erreur réseau')
      sessionStorage.removeItem('devis_state')
      setView('success')
    } catch {
      setError('Une erreur est survenue. Veuillez réessayer ou nous écrire directement.')
    } finally {
      setSending(false)
    }
  }

  // ── Success ──
  if (view === 'success') {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-8 py-12">
        <SuccessView email={state.email} />
      </div>
    )
  }

  // ── Recap ──
  if (view === 'recap') {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-8 py-12">
        <RecapView
          state={state}
          onBack={() => { setView('form'); setStep(5) }}
          onSubmit={submit}
          sending={sending}
          error={error}
        />
      </div>
    )
  }

  // ── Wizard ──
  return (
    <div ref={wrapperRef} className="max-w-4xl mx-auto px-4 sm:px-8 py-12" style={{ scrollMarginTop: '5rem' }}>
      <span aria-live="polite" className="sr-only">
        Étape {step} sur {STEP_LABELS.length} : {STEP_LABELS[step - 1]}
      </span>

      <ProgressBar step={step} />

      {/* Slide container */}
      <div className="overflow-hidden">
        <div key={slideKey} className={slideDir > 0 ? 'devis-enter-right' : 'devis-enter-left'}>
          {step === 1 && (
            <Etape1
              state={state}
              set={set}
              onSelect={() => goToStep(2, 1)}
            />
          )}
          {step === 2 && <Etape2 state={state} set={set} />}
          {step === 3 && <Etape3 state={state} set={set} />}
          {step === 4 && <Etape4 state={state} set={set} rentreeActive={rentreeActive} />}
          {step === 5 && <Etape5 state={state} set={set} />}
        </div>
      </div>

      {/* Live price */}
      <LivePrice state={state} />

      {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

      {/* Nav */}
      <div className="flex items-center justify-between mt-6">
        <button
          type="button"
          onClick={() => goToStep(step - 1, -1)}
          disabled={step === 1}
          className="flex items-center gap-1.5 px-4 py-2.5 text-sm font-medium text-foreground/48 dark:text-white/38 disabled:opacity-20 hover:text-foreground dark:hover:text-white transition-colors rounded-xl hover:bg-navy/[0.04] dark:hover:bg-white/[0.04]"
        >
          <ChevronLeft size={16} /> Précédent
        </button>

        {step < 5 ? (
          <button
            type="button"
            onClick={() => { if (canNext()) goToStep(step + 1, 1) }}
            disabled={!canNext()}
            className="flex items-center gap-2 px-7 py-3 bg-navy hover:bg-electric text-white text-sm font-bold rounded-2xl transition-all duration-200 disabled:opacity-35 shadow-[0_4px_18px_rgba(30,58,95,0.22)] hover:shadow-[0_4px_22px_rgba(45,125,210,0.32)]"
          >
            Suivant <ChevronRight size={16} />
          </button>
        ) : (
          <button
            type="button"
            onClick={() => { if (canNext()) { scrollTop(); setView('recap') } }}
            disabled={!canNext()}
            className="flex items-center gap-2 px-7 py-3 bg-gradient-to-r from-navy to-electric text-white text-sm font-bold rounded-2xl transition-all duration-200 disabled:opacity-35 shadow-[0_4px_18px_rgba(30,58,95,0.22)] hover:shadow-[0_4px_24px_rgba(45,125,210,0.36)] hover:opacity-90"
          >
            Voir le récapitulatif <ChevronRight size={16} />
          </button>
        )}
      </div>
    </div>
  )
}

export default function DevisForm() {
  return (
    <Suspense fallback={
      <div className="max-w-2xl mx-auto px-4 py-20 text-center text-foreground/45 dark:text-white/28">
        Chargement…
      </div>
    }>
      <DevisFormInner />
    </Suspense>
  )
}
