/* eslint-disable react/no-unescaped-entities */
'use client'
import { useState, useEffect, useRef, useCallback, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { CheckCircle, ChevronRight, ChevronLeft, Loader2 } from 'lucide-react'
import { SITE } from '@/config/site'

// ─── Types ────────────────────────────────────────────────────────────────────

type Projet = 'site-vitrine' | 'site-multi-pages' | 'site-ecommerce' | 'systeme-gestion' | 'site-association' | ''

interface FormState {
  // É1
  projet: Projet
  metier: string
  // É2
  options: string[]
  // É3
  fonctionnalites: string[]
  // É4
  maintenance: string
  offreRentree: boolean
  // É5
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

const PROJETS = [
  { id: 'site-vitrine',      label: 'Site vitrine',       prix: SITE.pricing.vitrine,    delai: SITE.delais.vitrine,    desc: 'Présence pro, SEO local, formulaire contact' },
  { id: 'site-multi-pages',  label: 'Site multi-pages',   prix: SITE.pricing.multipages,  delai: SITE.delais.multipages, desc: 'Jusqu\'à 10 pages, blog, galerie' },
  { id: 'site-ecommerce',    label: 'Boutique en ligne',  prix: SITE.pricing.ecommerce,   delai: SITE.delais.ecommerce,  desc: 'Catalogue, paiement Stripe, commandes' },
  { id: 'site-association',  label: 'Site association',   prix: SITE.pricing.association, delai: SITE.delais.association, desc: 'Loi 1901, adhésion, agenda' },
  { id: 'systeme-gestion',   label: 'Système de gestion', prix: null,                     delai: SITE.delais.gestion,    desc: 'CRM, RDV, caisse, planning — sur devis' },
]

const OPTIONS_CONTENU = [
  { id: 'blog',           label: 'Blog / Actualités',        prix: 0 },
  { id: 'galerie',        label: 'Galerie photos/vidéos',    prix: 0 },
  { id: 'multilingue',    label: 'Version multilingue',      prix: null },
  { id: 'animation',      label: 'Animations avancées',      prix: null },
]

const FONCTIONNALITES = [
  { id: 'rdv',            label: 'Prise de rendez-vous en ligne',  group: 'Fonctionnalités' },
  { id: 'clickcollect',   label: 'Click & Collect',                group: 'Fonctionnalités' },
  { id: 'crm',            label: 'CRM / base clients',             group: 'Fonctionnalités' },
  { id: 'chatbot',        label: 'Chat / assistant IA',            group: 'Fonctionnalités' },
  { id: 'stock',          label: 'Gestion des stocks',             group: 'Fonctionnalités' },
  { id: 'planning',       label: 'Planning / agenda',              group: 'Fonctionnalités' },
]

const MAINTENANCES = [
  { id: '',          label: 'Aucune maintenance pour l\'instant', prix: 0 },
  { id: 'starter',   label: `Starter — ${SITE.pricing.maintenanceStarter}€/mois`, prix: SITE.pricing.maintenanceStarter },
  { id: 'pro',       label: `Pro — ${SITE.pricing.maintenancePro}€/mois`,         prix: SITE.pricing.maintenancePro },
  { id: 'premium',   label: `Premium — ${SITE.pricing.maintenancePremium}€/mois`, prix: SITE.pricing.maintenancePremium },
]

// ─── Prix récap ───────────────────────────────────────────────────────────────

function calcPrix(state: FormState): { base: number | null; surDevis: boolean; mensuel: number } {
  const projet = PROJETS.find(p => p.id === state.projet)
  const fonctionsSurDevis = state.fonctionnalites.length > 0
  const optionsSurDevis = state.options.some(o => OPTIONS_CONTENU.find(x => x.id === o)?.prix === null)
  const surDevis = !projet || projet.prix === null || fonctionsSurDevis || optionsSurDevis
  const base = surDevis ? null : (projet?.prix ?? null)
  const maintenance = MAINTENANCES.find(m => m.id === state.maintenance)
  return { base, surDevis, mensuel: maintenance?.prix ?? 0 }
}

// ─── Récap sticky ─────────────────────────────────────────────────────────────

function RecapSticky({ state, step }: { state: FormState; step: number }) {
  const { base, surDevis, mensuel } = calcPrix(state)
  const projet = PROJETS.find(p => p.id === state.projet)
  if (!projet || step < 2) return null

  return (
    <div className="hidden lg:block w-72 flex-shrink-0">
      <div className="sticky top-24 rounded-2xl border border-navy/20 dark:border-white/10 p-5 bg-white dark:bg-[#0D1626] shadow-sm">
        <div className="text-xs font-semibold text-foreground/40 dark:text-white/40 uppercase tracking-wider mb-3">Récapitulatif</div>
        <div className="font-semibold text-foreground dark:text-white mb-1">{projet.label}</div>
        {state.metier && <div className="text-xs text-foreground/50 dark:text-white/50 mb-3">{state.metier}</div>}
        <div className="border-t border-navy/10 dark:border-white/10 pt-3 mt-2">
          {surDevis ? (
            <div className="text-2xl font-bold text-navy dark:text-gold">Sur devis</div>
          ) : (
            <div className="text-2xl font-bold text-navy dark:text-gold">{base?.toLocaleString('fr-FR')} €</div>
          )}
          {mensuel > 0 && <div className="text-xs text-foreground/60 dark:text-white/50 mt-1">+ {mensuel} €/mois (maintenance)</div>}
          {projet.prix !== null && <div className="text-xs text-foreground/40 dark:text-white/30 mt-1">Livraison : {projet.delai}</div>}
        </div>
        {(state.fonctionnalites.length > 0 || state.options.length > 0) && (
          <div className="mt-3 space-y-1">
            {state.options.map(o => {
              const opt = OPTIONS_CONTENU.find(x => x.id === o)
              return opt ? <div key={o} className="text-xs text-foreground/60 dark:text-white/50">+ {opt.label}{opt.prix === null ? ' (sur devis)' : ''}</div> : null
            })}
            {state.fonctionnalites.map(f => {
              const fn = FONCTIONNALITES.find(x => x.id === f)
              return fn ? <div key={f} className="text-xs text-foreground/60 dark:text-white/50">+ {fn.label} (sur devis)</div> : null
            })}
          </div>
        )}
        {state.offreRentree && (
          <div className="mt-3 text-xs text-gold font-medium">🎒 Maquette offerte (offre rentrée)</div>
        )}
      </div>
    </div>
  )
}

// ─── Étapes ───────────────────────────────────────────────────────────────────

function Etape1({ state, set }: { state: FormState; set: (k: keyof FormState, v: unknown) => void }) {
  return (
    <div>
      <h2 className="text-xl font-bold text-foreground dark:text-white mb-6">Quel type de site souhaitez-vous ?</h2>
      <div className="grid sm:grid-cols-2 gap-3 mb-6">
        {PROJETS.map(p => (
          <button
            key={p.id}
            type="button"
            onClick={() => set('projet', p.id)}
            className={`text-left p-4 rounded-xl border-2 transition-all ${
              state.projet === p.id
                ? 'border-electric bg-electric/5 dark:bg-electric/10'
                : 'border-navy/15 dark:border-white/10 hover:border-electric/40'
            }`}
          >
            <div className="font-semibold text-foreground dark:text-white text-sm mb-0.5">{p.label}</div>
            <div className="text-xs text-foreground/50 dark:text-white/50 mb-1">{p.desc}</div>
            <div className="text-sm font-bold text-navy dark:text-gold">
              {p.prix !== null ? `${p.prix.toLocaleString('fr-FR')} €` : 'Sur devis'}
            </div>
          </button>
        ))}
      </div>
      <div>
        <label className="block text-sm font-medium text-foreground dark:text-white mb-1.5">
          Votre secteur / métier <span className="text-foreground/40 dark:text-white/40 font-normal">(optionnel)</span>
        </label>
        <input
          type="text"
          value={state.metier}
          onChange={e => set('metier', e.target.value)}
          placeholder="ex. restaurant, plombier, coach sportif…"
          className="w-full px-4 py-2.5 rounded-xl border border-navy/20 dark:border-white/10 bg-white dark:bg-white/5 text-foreground dark:text-white placeholder:text-foreground/30 dark:placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-electric/40 text-sm"
        />
      </div>
    </div>
  )
}

function Etape2({ state, set }: { state: FormState; set: (k: keyof FormState, v: unknown) => void }) {
  const toggle = (id: string) => {
    const next = state.options.includes(id) ? state.options.filter(o => o !== id) : [...state.options, id]
    set('options', next)
  }
  return (
    <div>
      <h2 className="text-xl font-bold text-foreground dark:text-white mb-2">Contenus supplémentaires</h2>
      <p className="text-sm text-foreground/60 dark:text-white/60 mb-6">Cochez ce dont vous avez besoin. Vous pouvez tout décocher si non concerné.</p>
      <div className="space-y-2">
        {OPTIONS_CONTENU.map(opt => (
          <label key={opt.id} className={`flex items-center gap-3 p-4 rounded-xl border cursor-pointer transition-all ${
            state.options.includes(opt.id)
              ? 'border-electric bg-electric/5 dark:bg-electric/10'
              : 'border-navy/15 dark:border-white/10 hover:border-electric/30'
          }`}>
            <input
              type="checkbox"
              checked={state.options.includes(opt.id)}
              onChange={() => toggle(opt.id)}
              className="w-4 h-4 accent-electric"
            />
            <span className="flex-1 text-sm text-foreground dark:text-white">{opt.label}</span>
            <span className="text-xs font-medium text-foreground/50 dark:text-white/40">
              {opt.prix === null ? 'Sur devis' : opt.prix === 0 ? 'Inclus' : `+${opt.prix} €`}
            </span>
          </label>
        ))}
      </div>
    </div>
  )
}

function Etape3({ state, set }: { state: FormState; set: (k: keyof FormState, v: unknown) => void }) {
  const toggle = (id: string) => {
    const next = state.fonctionnalites.includes(id)
      ? state.fonctionnalites.filter(f => f !== id)
      : [...state.fonctionnalites, id]
    set('fonctionnalites', next)
  }
  return (
    <div>
      <h2 className="text-xl font-bold text-foreground dark:text-white mb-2">Fonctionnalités métier</h2>
      <p className="text-sm text-foreground/60 dark:text-white/60 mb-6">Ces fonctionnalités sont tarifées sur devis selon la complexité de votre projet. Nous vous recontactons pour affiner.</p>
      <div className="space-y-2">
        {FONCTIONNALITES.map(fn => (
          <label key={fn.id} className={`flex items-center gap-3 p-4 rounded-xl border cursor-pointer transition-all ${
            state.fonctionnalites.includes(fn.id)
              ? 'border-electric bg-electric/5 dark:bg-electric/10'
              : 'border-navy/15 dark:border-white/10 hover:border-electric/30'
          }`}>
            <input
              type="checkbox"
              checked={state.fonctionnalites.includes(fn.id)}
              onChange={() => toggle(fn.id)}
              className="w-4 h-4 accent-electric"
            />
            <span className="flex-1 text-sm text-foreground dark:text-white">{fn.label}</span>
            <span className="text-xs font-medium text-foreground/40 dark:text-white/30">Sur devis — <Link href="/solutions" className="text-electric hover:underline">voir /solutions</Link></span>
          </label>
        ))}
      </div>
    </div>
  )
}

function Etape4({ state, set, rentreeActive }: { state: FormState; set: (k: keyof FormState, v: unknown) => void; rentreeActive: boolean }) {
  return (
    <div>
      <h2 className="text-xl font-bold text-foreground dark:text-white mb-6">Accompagnement après livraison</h2>
      <div className="space-y-2 mb-6">
        {MAINTENANCES.map(m => (
          <label key={m.id} className={`flex items-center gap-3 p-4 rounded-xl border cursor-pointer transition-all ${
            state.maintenance === m.id
              ? 'border-electric bg-electric/5 dark:bg-electric/10'
              : 'border-navy/15 dark:border-white/10 hover:border-electric/30'
          }`}>
            <input
              type="radio"
              name="maintenance"
              checked={state.maintenance === m.id}
              onChange={() => set('maintenance', m.id)}
              className="w-4 h-4 accent-electric"
            />
            <span className="text-sm text-foreground dark:text-white">{m.label}</span>
          </label>
        ))}
      </div>

      {rentreeActive && (
        <label className={`flex items-center gap-3 p-4 rounded-xl border cursor-pointer transition-all ${
          state.offreRentree
            ? 'border-gold bg-gold/5 dark:bg-gold/10'
            : 'border-gold/30 hover:border-gold/60'
        }`}>
          <input
            type="checkbox"
            checked={state.offreRentree}
            onChange={e => set('offreRentree', e.target.checked)}
            className="w-4 h-4 accent-electric"
          />
          <span className="text-sm text-foreground dark:text-white">
            🎒 <strong>Offre rentrée</strong> — maquette offerte (valable jusqu'au 13 sept. 2026)
          </span>
        </label>
      )}
    </div>
  )
}

function Etape5({ state, set }: { state: FormState; set: (k: keyof FormState, v: unknown) => void }) {
  return (
    <div>
      <h2 className="text-xl font-bold text-foreground dark:text-white mb-6">Vos coordonnées</h2>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-foreground dark:text-white mb-1.5">Nom et prénom *</label>
          <input
            type="text"
            value={state.nom}
            onChange={e => set('nom', e.target.value)}
            required
            className="w-full px-4 py-2.5 rounded-xl border border-navy/20 dark:border-white/10 bg-white dark:bg-white/5 text-foreground dark:text-white placeholder:text-foreground/30 dark:placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-electric/40 text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-foreground dark:text-white mb-1.5">Email *</label>
          <input
            type="email"
            value={state.email}
            onChange={e => set('email', e.target.value)}
            required
            className="w-full px-4 py-2.5 rounded-xl border border-navy/20 dark:border-white/10 bg-white dark:bg-white/5 text-foreground dark:text-white placeholder:text-foreground/30 dark:placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-electric/40 text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-foreground dark:text-white mb-1.5">Téléphone <span className="text-foreground/40 dark:text-white/40 font-normal">(optionnel)</span></label>
          <input
            type="tel"
            value={state.telephone}
            onChange={e => set('telephone', e.target.value)}
            className="w-full px-4 py-2.5 rounded-xl border border-navy/20 dark:border-white/10 bg-white dark:bg-white/5 text-foreground dark:text-white placeholder:text-foreground/30 dark:placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-electric/40 text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-foreground dark:text-white mb-1.5">Précisions sur votre projet <span className="text-foreground/40 dark:text-white/40 font-normal">(optionnel)</span></label>
          <textarea
            value={state.message}
            onChange={e => set('message', e.target.value)}
            rows={3}
            placeholder="Délai souhaité, budget, site existant à refondre…"
            className="w-full px-4 py-2.5 rounded-xl border border-navy/20 dark:border-white/10 bg-white dark:bg-white/5 text-foreground dark:text-white placeholder:text-foreground/30 dark:placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-electric/40 text-sm resize-none"
          />
        </div>
        <label className="flex items-start gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={state.rgpd}
            onChange={e => set('rgpd', e.target.checked)}
            className="mt-0.5 w-4 h-4 accent-electric flex-shrink-0"
          />
          <span className="text-xs text-foreground/60 dark:text-white/50">
            J'accepte que mes données soient traitées pour répondre à ma demande. Voir notre{' '}
            <Link href="/mentions-legales" className="text-electric hover:underline">politique de confidentialité</Link>.
          </span>
        </label>
      </div>
    </div>
  )
}

// ─── Confirmation ─────────────────────────────────────────────────────────────

function Confirmation({ email }: { email: string }) {
  return (
    <div className="text-center py-12">
      <div className="w-16 h-16 rounded-full bg-success/10 flex items-center justify-center mx-auto mb-6">
        <CheckCircle size={32} className="text-success" />
      </div>
      <h2 className="text-2xl font-bold text-foreground dark:text-white mb-3">Devis bien reçu !</h2>
      <p className="text-foreground/70 dark:text-white/60 mb-2">
        Nous avons reçu votre demande et vous répondrons sous 72h à <strong>{email}</strong>.
      </p>
      <p className="text-sm text-foreground/50 dark:text-white/40 mb-8">
        Un email de confirmation vous a été envoyé.
      </p>
      <div className="flex flex-wrap justify-center gap-3">
        <Link href="/" className="px-6 py-2.5 bg-navy text-white rounded-xl text-sm font-semibold hover:bg-electric transition-colors">
          Retour à l'accueil
        </Link>
        <Link href="/faq" className="px-6 py-2.5 border border-navy/20 dark:border-white/15 text-foreground dark:text-white rounded-xl text-sm font-semibold hover:bg-foreground/5 dark:hover:bg-white/5 transition-colors">
          Questions fréquentes
        </Link>
      </div>
    </div>
  )
}

// ─── Composant principal ──────────────────────────────────────────────────────

function DevisFormInner() {
  const searchParams = useSearchParams()
  const [state, setState] = useState<FormState>(() => {
    if (typeof window !== 'undefined') {
      const saved = sessionStorage.getItem('devis_state')
      if (saved) return { ...INITIAL, ...JSON.parse(saved) }
    }
    return INITIAL
  })
  const [step, setStep] = useState(1)
  const wrapperRef = useRef<HTMLDivElement>(null)
  const stepTitleRef = useRef<HTMLHeadingElement>(null)
  const goToStep = useCallback((next: number) => {
    setStep(next)
    setTimeout(() => {
      wrapperRef.current?.scrollIntoView({ block: 'start', behavior: 'smooth' })
      stepTitleRef.current?.focus({ preventScroll: true })
    }, 50)
  }, [])
  const [sending, setSending] = useState(false)
  const [sent, setSent] = useState(false)
  const [error, setError] = useState('')
  const [rentreeActive, setRentreeActive] = useState(false)

  // Pré-remplissage via ?projet= et ?metier=
  useEffect(() => {
    const projet = searchParams.get('projet') as Projet
    const metier = searchParams.get('metier') || ''
    const src = searchParams.get('src') || ''
    const offreRentree = searchParams.get('offre') === 'rentree'
    if (projet || metier || src || offreRentree) {
      setState(s => ({ ...s, ...(projet ? { projet } : {}), ...(metier ? { metier } : {}), ...(src ? { src } : {}), ...(offreRentree ? { offreRentree: true } : {}) }))
    }
  }, [searchParams])

  // Vérif offre rentrée côté client
  useEffect(() => {
    setRentreeActive(Date.now() < new Date('2026-09-15T21:59:59Z').getTime())
  }, [])

  // Persistence sessionStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      sessionStorage.setItem('devis_state', JSON.stringify(state))
    }
  }, [state])

  const set = (k: keyof FormState, v: unknown) => setState(s => ({ ...s, [k]: v }))

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
    // Événement funnel
    if (typeof window !== 'undefined' && 'gtag' in window) {
      // @ts-expect-error gtag
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
      setSent(true)
    } catch {
      setError('Une erreur est survenue. Veuillez réessayer ou nous écrire directement.')
    } finally {
      setSending(false)
    }
  }

  const STEPS = ['Projet', 'Contenus', 'Fonctions', 'Accompagnement', 'Coordonnées']

  if (sent) {
    return (
      <div className="max-w-2xl mx-auto px-4 sm:px-6 py-10">
        <Confirmation email={state.email} />
      </div>
    )
  }

  return (
    <div ref={wrapperRef} className="max-w-5xl mx-auto px-4 sm:px-6 py-10 flex gap-8 items-start" style={{ scrollMarginTop: '5rem' }}>
      {/* Formulaire */}
      <div className="flex-1 min-w-0">
        {/* Focus target for scroll discipline */}
        <span ref={stepTitleRef} tabIndex={-1} className="sr-only" aria-live="polite">
          Étape {step} : {STEPS[step - 1]}
        </span>

        {/* Barre de progression */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-3">
            {STEPS.map((s, i) => (
              <div key={s} className="flex items-center gap-2">
                <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 transition-colors ${
                  i + 1 < step ? 'bg-electric text-white' :
                  i + 1 === step ? 'bg-electric text-white ring-4 ring-electric/20' :
                  'bg-navy/10 dark:bg-white/10 text-foreground/40 dark:text-white/30'
                }`}>
                  {i + 1 < step ? <CheckCircle size={14} /> : i + 1}
                </div>
                <span className={`text-xs hidden sm:block ${i + 1 === step ? 'text-foreground dark:text-white font-medium' : 'text-foreground/40 dark:text-white/30'}`}>{s}</span>
                {i < STEPS.length - 1 && <div className={`h-px w-4 sm:w-8 flex-shrink-0 ${i + 1 < step ? 'bg-electric' : 'bg-navy/15 dark:bg-white/10'}`} />}
              </div>
            ))}
          </div>
          <div className="h-1 bg-navy/10 dark:bg-white/10 rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-electric to-gold rounded-full transition-all duration-300" style={{ width: `${(step / STEPS.length) * 100}%` }} />
          </div>
        </div>

        {/* Contenu étape */}
        <div className="min-h-[280px]">
          {step === 1 && <Etape1 state={state} set={set} />}
          {step === 2 && <Etape2 state={state} set={set} />}
          {step === 3 && <Etape3 state={state} set={set} />}
          {step === 4 && <Etape4 state={state} set={set} rentreeActive={rentreeActive} />}
          {step === 5 && <Etape5 state={state} set={set} />}
        </div>

        {error && <p className="text-red-500 text-sm mt-4">{error}</p>}

        {/* Navigation */}
        <div className="flex items-center justify-between mt-8 pt-6 border-t border-navy/10 dark:border-white/10">
          <button
            type="button"
            onClick={() => goToStep(step - 1)}
            disabled={step === 1}
            className="flex items-center gap-1 px-4 py-2.5 text-sm text-foreground/60 dark:text-white/50 disabled:opacity-30 hover:text-foreground dark:hover:text-white transition-colors"
          >
            <ChevronLeft size={16} /> Précédent
          </button>

          {step < STEPS.length ? (
            <button
              type="button"
              onClick={() => { if (canNext()) goToStep(step + 1) }}
              disabled={!canNext()}
              className="flex items-center gap-1 px-6 py-2.5 bg-navy hover:bg-electric text-white text-sm font-semibold rounded-xl transition-colors disabled:opacity-40"
            >
              Suivant <ChevronRight size={16} />
            </button>
          ) : (
            <button
              type="button"
              onClick={submit}
              disabled={!canNext() || sending}
              className="flex items-center gap-2 px-6 py-2.5 bg-gold hover:bg-gold/90 text-ink text-sm font-bold rounded-xl transition-colors disabled:opacity-40"
            >
              {sending ? <><Loader2 size={16} className="animate-spin" /> Envoi…</> : 'Envoyer ma demande →'}
            </button>
          )}
        </div>
      </div>

      {/* Récap sticky */}
      <RecapSticky state={state} step={step} />
    </div>
  )
}

export default function DevisForm() {
  return (
    <Suspense fallback={<div className="max-w-2xl mx-auto px-4 py-20 text-center text-foreground/50 dark:text-white/30">Chargement…</div>}>
      <DevisFormInner />
    </Suspense>
  )
}
