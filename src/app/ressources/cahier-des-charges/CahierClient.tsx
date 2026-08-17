/* eslint-disable react/no-unescaped-entities */
'use client'
import { useState } from 'react'
import Link from 'next/link'
import { CheckCircle, ChevronRight, ChevronLeft, Download, Copy, Check } from 'lucide-react'

// ─── Form Steps ──────────────────────────────────────────────────────────────

interface FormData {
  // Étape 1 — Activité
  secteur: string
  activite: string
  cible: string
  concurrents: string
  // Étape 2 — Objectifs
  objectifs: string[]
  resultatAttendu: string
  // Étape 3 — Fonctionnalités
  fonctionnalites: string[]
  pagesSpeciales: string
  // Étape 4 — Charte
  logo: string
  couleurs: string
  inspiration: string
  style: string
  // Étape 5 — Contenus & budget
  textesFournis: string
  photosFournies: string
  budget: string
  dateVoulue: string
}

const INIT: FormData = {
  secteur: '', activite: '', cible: '', concurrents: '',
  objectifs: [], resultatAttendu: '',
  fonctionnalites: [], pagesSpeciales: '',
  logo: '', couleurs: '', inspiration: '', style: '',
  textesFournis: '', photosFournies: '', budget: '', dateVoulue: '',
}

const OBJECTIFS_LIST = [
  'Générer des leads / contacts',
  'Vendre en ligne (e-commerce)',
  'Présenter mon activité / vitrine',
  'Recruter',
  'Informer / fidéliser',
  'Gagner en crédibilité',
  'Référencement local (SEO)',
]

const FONCT_LIST = [
  'Formulaire de contact',
  'Blog / actualités',
  'Galerie photos ou portfolio',
  'Prise de rendez-vous',
  'Boutique / paiement en ligne',
  'Espace client / membres',
  'FAQ interactive',
  'Chat / assistant',
  'Carte interactive (Google Maps)',
  'Multilangue',
]

const STYLES = [
  { id: 'moderne', label: 'Moderne & épuré', emoji: '✦' },
  { id: 'chaleureux', label: 'Chaleureux & humain', emoji: '🌿' },
  { id: 'premium', label: 'Premium & luxe', emoji: '⬛' },
  { id: 'dynamique', label: 'Dynamique & bold', emoji: '⚡' },
  { id: 'classique', label: 'Classique & rassurant', emoji: '🏛️' },
]

const BUDGETS = ['< 500€', '500 – 1 000€', '1 000 – 2 000€', '2 000 – 5 000€', '> 5 000€', 'À définir ensemble']

// ─── Progress Bar ─────────────────────────────────────────────────────────────
function ProgressBar({ step, total }: { step: number; total: number }) {
  return (
    <div className="mb-12">
      <div className="flex justify-between text-xs text-white/30 mb-3">
        <span>Étape {step}/{total}</span>
        <span>{Math.round((step / total) * 100)}% complété</span>
      </div>
      <div className="h-1 bg-white/5 rounded-full overflow-hidden">
        <div className="h-full bg-gradient-to-r from-electric to-gold rounded-full transition-all duration-500 ease-out"
          style={{ width: `${(step / total) * 100}%` }} />
      </div>
      <div className="flex justify-between mt-3">
        {['Activité', 'Objectifs', 'Fonctionnalités', 'Charte', 'Budget'].map((s, i) => (
          <div key={s} className={`text-xs transition-colors duration-200 ${i < step ? 'text-electric' : i === step - 1 ? 'text-white font-medium' : 'text-white/20'}`}>
            {i < step - 1 ? '✓' : ''} <span className="hidden sm:inline">{s}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

// ─── Toggle chip ──────────────────────────────────────────────────────────────
function Chip({ label, selected, onToggle }: { label: string; selected: boolean; onToggle: () => void }) {
  return (
    <button type="button" onClick={onToggle}
      className={`px-4 py-2 rounded-xl text-sm font-medium border transition-all duration-200 ${
        selected
          ? 'bg-electric/20 border-electric text-white'
          : 'bg-white/[0.03] border-white/10 text-white/50 hover:border-white/30 hover:text-white'
      }`}>
      {selected && <CheckCircle size={12} className="inline mr-1.5 text-electric" />}
      {label}
    </button>
  )
}

// ─── Export text generator ─────────────────────────────────────────────────────
function generateText(d: FormData): string {
  return `CAHIER DES CHARGES — PROJET WEB
═══════════════════════════════════════

1. PRÉSENTATION DE L'ACTIVITÉ
Secteur : ${d.secteur || '—'}
Activité / Offre : ${d.activite || '—'}
Cible client : ${d.cible || '—'}
Concurrents / Références : ${d.concurrents || '—'}

2. OBJECTIFS DU SITE
${d.objectifs.length ? d.objectifs.map(o => '• ' + o).join('\n') : '—'}
Résultat attendu dans 6 mois : ${d.resultatAttendu || '—'}

3. FONCTIONNALITÉS
${d.fonctionnalites.length ? d.fonctionnalites.map(f => '• ' + f).join('\n') : '—'}
Pages / sections spéciales : ${d.pagesSpeciales || '—'}

4. CHARTE GRAPHIQUE
Logo existant : ${d.logo || '—'}
Couleurs : ${d.couleurs || '—'}
Sites d'inspiration : ${d.inspiration || '—'}
Style visuel : ${d.style || '—'}

5. CONTENUS & BUDGET
Textes fournis : ${d.textesFournis || '—'}
Photos / visuels fournis : ${d.photosFournies || '—'}
Budget indicatif : ${d.budget || '—'}
Date souhaitée de mise en ligne : ${d.dateVoulue || '—'}
`
}

// ─── Main ─────────────────────────────────────────────────────────────────────
export default function CahierClient() {
  const [step, setStep] = useState(1)
  const [data, setData] = useState<FormData>(INIT)
  const [done, setDone] = useState(false)
  const [copied, setCopied] = useState(false)

  const total = 5
  const set = (k: keyof FormData, v: string) => setData(d => ({ ...d, [k]: v }))
  const toggleArr = (k: 'objectifs' | 'fonctionnalites', v: string) =>
    setData(d => ({ ...d, [k]: d[k].includes(v) ? d[k].filter(x => x !== v) : [...d[k], v] }))

  const copy = async () => {
    await navigator.clipboard.writeText(generateText(data))
    setCopied(true)
    setTimeout(() => setCopied(false), 2500)
  }

  const download = () => {
    const blob = new Blob([generateText(data)], { type: 'text/plain;charset=utf-8' })
    const a = document.createElement('a')
    a.href = URL.createObjectURL(blob)
    a.download = 'cahier-des-charges-stackup.txt'
    a.click()
  }

  if (done) {
    return (
      <div className="max-w-2xl mx-auto px-4 sm:px-6 py-16">
        <div className="text-center mb-10">
          <div className="w-16 h-16 rounded-full bg-success/20 flex items-center justify-center mx-auto mb-4 success-icon-anim">
            <CheckCircle size={28} className="text-success" />
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">Cahier des charges complété !</h2>
          <p className="text-white/50 text-sm">Exportez-le ou copiez-le pour l'envoyer avec votre demande de devis.</p>
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-6 mb-6">
          <pre className="text-xs text-white/60 font-mono whitespace-pre-wrap leading-relaxed overflow-auto max-h-80">
            {generateText(data)}
          </pre>
        </div>

        <div className="flex flex-wrap gap-3 justify-center mb-8">
          <button onClick={copy}
            className="flex items-center gap-2 px-6 py-3 bg-white/10 hover:bg-white/15 text-white rounded-xl text-sm font-medium transition-all">
            {copied ? <Check size={15} className="text-success" /> : <Copy size={15} />}
            {copied ? 'Copié !' : 'Copier le texte'}
          </button>
          <button onClick={download}
            className="flex items-center gap-2 px-6 py-3 bg-electric hover:bg-electric/90 text-white rounded-xl text-sm font-bold transition-all">
            <Download size={15} /> Télécharger (.txt)
          </button>
        </div>

        <div className="text-center">
          <p className="text-white/40 text-sm mb-4">Prêt à démarrer votre projet ?</p>
          <Link href="/devis"
            className="inline-flex items-center gap-2 px-8 py-3 bg-gold hover:bg-gold/90 text-ink font-bold rounded-xl transition-all hover:-translate-y-0.5 text-sm">
            Demander un devis → <ChevronRight size={14} />
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 py-12">
      <ProgressBar step={step} total={total} />

      <div className="wizard-step-enter">
        {/* ÉTAPE 1 — Activité */}
        {step === 1 && (
          <div className="space-y-6">
            <h2 className="text-xl font-bold text-white">Votre activité</h2>
            <div className="space-y-4">
              {[
                { k: 'secteur', label: 'Secteur d\'activité', ph: 'Restauration, immobilier, santé, artisanat…' },
                { k: 'activite', label: 'Décrivez votre offre', ph: 'Plombier à Tours, boulangerie artisanale, coach sportif…' },
                { k: 'cible', label: 'Votre client idéal', ph: 'Particuliers 30-55 ans, PME locales, jeunes actifs…' },
                { k: 'concurrents', label: 'Sites de référence (concurrents ou inspirations)', ph: 'example.fr, autresite.com…' },
              ].map(f => (
                <div key={f.k} className="float-field relative">
                  <input
                    type="text"
                    placeholder=" "
                    value={data[f.k as keyof FormData] as string}
                    onChange={e => set(f.k as keyof FormData, e.target.value)}
                    className="w-full px-4 pt-6 pb-3 rounded-xl border border-white/10 bg-white/[0.04] text-white placeholder:text-transparent focus:outline-none focus:border-electric/60 text-sm transition-colors"
                  />
                  <label className="absolute left-4 top-4 text-white/40 text-sm pointer-events-none transition-all duration-200">
                    {f.label}
                  </label>
                  <p className="text-xs text-white/20 mt-1 pl-1">{f.ph}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ÉTAPE 2 — Objectifs */}
        {step === 2 && (
          <div className="space-y-6">
            <h2 className="text-xl font-bold text-white">Objectifs du site</h2>
            <div>
              <p className="text-sm text-white/50 mb-3">Que doit accomplir votre site ? (plusieurs choix)</p>
              <div className="flex flex-wrap gap-2">
                {OBJECTIFS_LIST.map(o => (
                  <Chip key={o} label={o} selected={data.objectifs.includes(o)} onToggle={() => toggleArr('objectifs', o)} />
                ))}
              </div>
            </div>
            <div className="float-field relative">
              <textarea
                placeholder=" "
                rows={3}
                value={data.resultatAttendu}
                onChange={e => set('resultatAttendu', e.target.value)}
                className="w-full px-4 pt-6 pb-3 rounded-xl border border-white/10 bg-white/[0.04] text-white placeholder:text-transparent focus:outline-none focus:border-electric/60 text-sm resize-none transition-colors"
              />
              <label className="absolute left-4 top-4 text-white/40 text-sm pointer-events-none transition-all duration-200">
                Résultat attendu dans 6 mois
              </label>
            </div>
          </div>
        )}

        {/* ÉTAPE 3 — Fonctionnalités */}
        {step === 3 && (
          <div className="space-y-6">
            <h2 className="text-xl font-bold text-white">Fonctionnalités requises</h2>
            <div>
              <p className="text-sm text-white/50 mb-3">Cochez ce dont vous avez besoin</p>
              <div className="flex flex-wrap gap-2">
                {FONCT_LIST.map(f => (
                  <Chip key={f} label={f} selected={data.fonctionnalites.includes(f)} onToggle={() => toggleArr('fonctionnalites', f)} />
                ))}
              </div>
            </div>
            <div className="float-field relative">
              <textarea
                placeholder=" "
                rows={3}
                value={data.pagesSpeciales}
                onChange={e => set('pagesSpeciales', e.target.value)}
                className="w-full px-4 pt-6 pb-3 rounded-xl border border-white/10 bg-white/[0.04] text-white placeholder:text-transparent focus:outline-none focus:border-electric/60 text-sm resize-none transition-colors"
              />
              <label className="absolute left-4 top-4 text-white/40 text-sm pointer-events-none transition-all duration-200">
                Pages ou sections spéciales à prévoir
              </label>
            </div>
          </div>
        )}

        {/* ÉTAPE 4 — Charte */}
        {step === 4 && (
          <div className="space-y-6">
            <h2 className="text-xl font-bold text-white">Charte graphique</h2>
            <div className="space-y-4">
              {[
                { k: 'logo', label: 'Logo existant ?', ph: 'Oui / Non / En cours' },
                { k: 'couleurs', label: 'Couleurs souhaitées', ph: 'Bleu marine + or, vert forêt + blanc…' },
                { k: 'inspiration', label: 'Sites que vous aimez', ph: 'apple.com, airbnb.fr…' },
              ].map(f => (
                <div key={f.k} className="float-field relative">
                  <input type="text" placeholder=" "
                    value={data[f.k as keyof FormData] as string}
                    onChange={e => set(f.k as keyof FormData, e.target.value)}
                    className="w-full px-4 pt-6 pb-3 rounded-xl border border-white/10 bg-white/[0.04] text-white placeholder:text-transparent focus:outline-none focus:border-electric/60 text-sm transition-colors"
                  />
                  <label className="absolute left-4 top-4 text-white/40 text-sm pointer-events-none transition-all duration-200">{f.label}</label>
                  <p className="text-xs text-white/20 mt-1 pl-1">{f.ph}</p>
                </div>
              ))}
            </div>
            <div>
              <p className="text-sm text-white/50 mb-3">Style visuel</p>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {STYLES.map(s => (
                  <button key={s.id} type="button"
                    onClick={() => set('style', s.id)}
                    className={`p-4 rounded-xl border text-left transition-all duration-200 ${
                      data.style === s.id
                        ? 'border-electric bg-electric/10 text-white'
                        : 'border-white/10 bg-white/[0.02] text-white/50 hover:border-white/25'
                    }`}>
                    <div className="text-xl mb-1">{s.emoji}</div>
                    <div className="text-xs font-medium">{s.label}</div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ÉTAPE 5 — Contenus & Budget */}
        {step === 5 && (
          <div className="space-y-6">
            <h2 className="text-xl font-bold text-white">Contenus & Budget</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {[
                { k: 'textesFournis', label: 'Textes fournis par vous', ph: 'Oui / Partiellement / Non' },
                { k: 'photosFournies', label: 'Photos / visuels fournis', ph: 'Oui / Non / À créer' },
              ].map(f => (
                <div key={f.k} className="float-field relative">
                  <input type="text" placeholder=" "
                    value={data[f.k as keyof FormData] as string}
                    onChange={e => set(f.k as keyof FormData, e.target.value)}
                    className="w-full px-4 pt-6 pb-3 rounded-xl border border-white/10 bg-white/[0.04] text-white placeholder:text-transparent focus:outline-none focus:border-electric/60 text-sm transition-colors"
                  />
                  <label className="absolute left-4 top-4 text-white/40 text-sm pointer-events-none transition-all duration-200">{f.label}</label>
                  <p className="text-xs text-white/20 mt-1 pl-1">{f.ph}</p>
                </div>
              ))}
            </div>
            <div>
              <p className="text-sm text-white/50 mb-3">Budget indicatif</p>
              <div className="flex flex-wrap gap-2">
                {BUDGETS.map(b => (
                  <button key={b} type="button"
                    onClick={() => set('budget', b)}
                    className={`px-4 py-2 rounded-xl text-sm border transition-all ${
                      data.budget === b
                        ? 'border-electric bg-electric/15 text-white font-medium'
                        : 'border-white/10 text-white/50 hover:border-white/25'
                    }`}>{b}</button>
                ))}
              </div>
            </div>
            <div className="float-field relative">
              <input type="text" placeholder=" "
                value={data.dateVoulue}
                onChange={e => set('dateVoulue', e.target.value)}
                className="w-full px-4 pt-6 pb-3 rounded-xl border border-white/10 bg-white/[0.04] text-white placeholder:text-transparent focus:outline-none focus:border-electric/60 text-sm transition-colors"
              />
              <label className="absolute left-4 top-4 text-white/40 text-sm pointer-events-none transition-all duration-200">
                Date souhaitée de mise en ligne
              </label>
              <p className="text-xs text-white/20 mt-1 pl-1">Ex : Avant le 1er septembre, pas de contrainte…</p>
            </div>
          </div>
        )}
      </div>

      {/* Navigation */}
      <div className="flex justify-between mt-10 pt-6 border-t border-white/5">
        {step > 1 ? (
          <button onClick={() => setStep(s => s - 1)}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl border border-white/10 text-white/60 hover:text-white hover:border-white/25 text-sm transition-all">
            <ChevronLeft size={14} /> Précédent
          </button>
        ) : <div />}

        {step < total ? (
          <button onClick={() => setStep(s => s + 1)}
            className="flex items-center gap-2 px-6 py-2.5 bg-electric hover:bg-electric/90 text-white font-semibold rounded-xl text-sm transition-all hover:-translate-y-0.5"
            style={{ boxShadow: '0 0 16px rgba(45,125,210,0.3)' }}>
            Suivant <ChevronRight size={14} />
          </button>
        ) : (
          <button onClick={() => setDone(true)}
            className="flex items-center gap-2 px-6 py-2.5 bg-gold hover:bg-gold/90 text-ink font-bold rounded-xl text-sm transition-all hover:-translate-y-0.5">
            Générer le cahier des charges <CheckCircle size={14} />
          </button>
        )}
      </div>
    </div>
  )
}
