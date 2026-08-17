'use client'
/**
 * CONTACT FORM V4 — avec encouragements par champ
 * Chaque champ rempli → message positif animé
 */
import { useState } from 'react'
import { Send, CheckCircle, AlertCircle, Smile } from 'lucide-react'

const ENCOURAGEMENTS: Record<string, string[]> = {
  name: ['Super !', 'Enchanté·e !', 'Beau prénom !', 'On vous attendait !'],
  email: ['Parfait, on vous répondra ici.', 'Votre boîte mail est entre de bonnes mains.', 'Top, on y envoie le devis !'],
  phone: ['On peut vous rappeler si besoin.', 'Pratique pour un échange rapide !', 'Super, merci !'],
  project: ['Excellent choix !', 'On adore ce type de projet.', 'On a hâte de commencer !', 'Beau projet en vue !'],
  message: ['Merci pour ces détails, ça nous aide vraiment.', 'Plus c\'est précis, plus le devis est juste.', 'Parfait, on a tout ce qu\'il faut !'],
}

function getEncouragement(field: string, value: string) {
  if (!value.trim()) return null
  const list = ENCOURAGEMENTS[field] || []
  // Deterministic from value length
  return list[value.length % list.length]
}

interface FieldProps {
  id: string
  label: string
  value: string
  onChange: (v: string) => void
  type?: string
  required?: boolean
  as?: 'input' | 'textarea' | 'select'
  options?: { value: string; label: string }[]
  placeholder?: string
}

function Field({ id, label, value, onChange, type = 'text', required, as = 'input', options, placeholder }: FieldProps) {
  const [focused, setFocused] = useState(false)
  const encouragement = getEncouragement(id, value)
  const showEncouragement = encouragement && value.trim().length > 0 && !focused

  return (
    <div className="relative">
      <label htmlFor={id} className="block text-xs font-bold text-navy/50 uppercase tracking-wider mb-1.5">
        {label}{required && <span className="text-gold ml-1">*</span>}
      </label>

      {as === 'textarea' ? (
        <textarea
          id={id}
          value={value}
          onChange={e => onChange(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          rows={4}
          placeholder={placeholder}
          required={required}
          className={`w-full px-4 py-3 rounded-xl border text-navy text-sm bg-white transition-all duration-200 resize-none outline-none ${
            focused ? 'border-electric shadow-[0_0_0_3px_rgba(45,125,210,0.12)]' : value ? 'border-gold/40' : 'border-gray-200'
          }`}
        />
      ) : as === 'select' ? (
        <select
          id={id}
          value={value}
          onChange={e => onChange(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          required={required}
          className={`w-full px-4 py-3 rounded-xl border text-navy text-sm bg-white transition-all duration-200 outline-none appearance-none ${
            focused ? 'border-electric shadow-[0_0_0_3px_rgba(45,125,210,0.12)]' : value ? 'border-gold/40' : 'border-gray-200'
          }`}
        >
          {options?.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
        </select>
      ) : (
        <input
          id={id}
          type={type}
          value={value}
          onChange={e => onChange(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          placeholder={placeholder}
          required={required}
          className={`w-full px-4 py-3 rounded-xl border text-navy text-sm bg-white transition-all duration-200 outline-none ${
            focused ? 'border-electric shadow-[0_0_0_3px_rgba(45,125,210,0.12)]' : value ? 'border-gold/40' : 'border-gray-200'
          }`}
        />
      )}

      {/* Encouragement bubble */}
      <div
        className={`flex items-center gap-1.5 mt-1.5 transition-all duration-300 ${
          showEncouragement ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-1 pointer-events-none'
        }`}
      >
        <Smile size={12} className="text-gold flex-shrink-0" />
        <span className="text-xs text-gold font-medium">{encouragement}</span>
      </div>
    </div>
  )
}

export default function ContactFormV4() {
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle')
  const [form, setForm] = useState({ name: '', email: '', phone: '', project: '', message: '' })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('sending')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (res.ok) {
        setStatus('success')
        setForm({ name: '', email: '', phone: '', project: '', message: '' })
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
    setTimeout(() => setStatus('idle'), 6000)
  }

  const filledCount = Object.values(form).filter(v => v.trim()).length
  const progress = Math.round((filledCount / 5) * 100)

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-[0_8px_48px_rgba(30,58,95,0.08)] p-6 sm:p-8">
      {/* Header with progress */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <div className="text-sm font-bold text-navy">Votre demande</div>
          <div className="text-xs font-bold text-navy/40 data-mono">{filledCount}/5 champs</div>
        </div>
        <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
          <div
            className="h-full rounded-full bg-gradient-to-r from-electric to-gold transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
        {progress === 100 && (
          <div className="flex items-center gap-1.5 mt-2 text-xs text-gold font-bold">
            <CheckCircle size={12} /> Parfait, vous êtes prêt·e à envoyer !
          </div>
        )}
      </div>

      {status === 'success' ? (
        <div className="text-center py-10">
          <div className="text-5xl mb-4">🎉</div>
          <h3 className="font-bold text-navy text-xl mb-2">Message envoyé !</h3>
          <p className="text-navy/55">On vous répond dans les 72h. En attendant, consultez nos réalisations.</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4" noValidate>
          <div className="grid sm:grid-cols-2 gap-4">
            <Field id="name" label="Votre prénom" value={form.name} onChange={v => setForm({ ...form, name: v })} required placeholder="Marie" />
            <Field id="email" label="Email" type="email" value={form.email} onChange={v => setForm({ ...form, email: v })} required placeholder="marie@example.fr" />
          </div>

          <Field id="phone" label="Téléphone" type="tel" value={form.phone} onChange={v => setForm({ ...form, phone: v })} placeholder="06 12 34 56 78" />

          <Field
            id="project"
            label="Type de projet"
            as="select"
            value={form.project}
            onChange={v => setForm({ ...form, project: v })}
            required
            options={[
              { value: '', label: 'Choisissez...' },
              { value: 'Site vitrine', label: 'Site vitrine' },
              { value: 'Site multi-pages', label: 'Site multi-pages' },
              { value: 'E-commerce', label: 'Boutique en ligne' },
              { value: 'Système de gestion', label: 'Système de gestion' },
              { value: 'Site association', label: 'Site association' },
              { value: 'Blog SEO', label: 'Blog & référencement' },
              { value: 'Marketing digital', label: 'Marketing digital' },
              { value: 'Autre', label: 'Autre / Je ne sais pas encore' },
            ]}
          />

          <Field id="message" label="Décrivez votre projet" as="textarea" value={form.message} onChange={v => setForm({ ...form, message: v })} required placeholder="Parlez-nous de votre activité, votre cible, vos objectifs..." />

          {status === 'error' && (
            <div className="flex items-center gap-2 text-red-600 text-sm bg-red-50 rounded-xl px-4 py-3">
              <AlertCircle size={16} /> Une erreur est survenue. Réessayez ou écrivez-nous directement.
            </div>
          )}

          <button
            type="submit"
            disabled={status === 'sending'}
            className="w-full flex items-center justify-center gap-2 bg-gold hover:bg-gold/90 text-ink font-bold py-3.5 rounded-xl transition-all hover:-translate-y-0.5 shadow-md shadow-gold/20 disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {status === 'sending' ? (
              <>
                <div className="w-4 h-4 border-2 border-ink/30 border-t-ink rounded-full animate-spin" />
                Envoi en cours...
              </>
            ) : (
              <>
                <Send size={16} /> Envoyer ma demande de devis
              </>
            )}
          </button>

          <p className="text-xs text-navy/35 text-center">Devis gratuit · Réponse sous 72h · Sans engagement</p>
        </form>
      )}
    </div>
  )
}
