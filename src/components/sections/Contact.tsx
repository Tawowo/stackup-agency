'use client'
import { useRef, useState } from 'react'
import Link from 'next/link'
import { Send, Mail, CheckCircle, AlertCircle, Gift } from 'lucide-react'
import { useLanguage } from '@/contexts/LanguageContext'

export default function Contact() {
  const { t } = useLanguage()
  const ref = useRef<HTMLElement>(null)
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

  return (
    <section id="contact" ref={ref} className="py-20 lg:py-28 bg-[#070B16] scanline-section relative overflow-hidden">
      {/* persp-grid background */}
      <div className="persp-grid absolute inset-0 opacity-50" aria-hidden="true" />
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-[13px] font-semibold text-gold uppercase tracking-[0.18em] mb-4">Contact</p>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 lg:gap-16">

          {/* ── Formulaire ── */}
          <div className="lg:col-span-3 reveal-item">
            <form onSubmit={handleSubmit} className="space-y-4" noValidate>

              {/* Ligne Nom / Email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="float-field">
                  <input
                    type="text"
                    id="contact-name"
                    required
                    placeholder=" "
                    value={form.name}
                    onChange={e => setForm({ ...form, name: e.target.value })}
                    autoComplete="name"
                  />
                  <label htmlFor="contact-name">{t.contact.form.name}</label>
                </div>
                <div className="float-field">
                  <input
                    type="email"
                    id="contact-email"
                    required
                    placeholder=" "
                    value={form.email}
                    onChange={e => setForm({ ...form, email: e.target.value })}
                    autoComplete="email"
                  />
                  <label htmlFor="contact-email">{t.contact.form.email}</label>
                </div>
              </div>

              {/* Téléphone */}
              <div className="float-field">
                <input
                  type="tel"
                  id="contact-phone"
                  placeholder=" "
                  value={form.phone}
                  onChange={e => setForm({ ...form, phone: e.target.value })}
                  autoComplete="tel"
                />
                <label htmlFor="contact-phone">{t.contact.form.phone}</label>
              </div>

              {/* Select projet — label flottant custom */}
              <div className="float-field">
                <select
                  id="contact-project"
                  value={form.project}
                  onChange={e => setForm({ ...form, project: e.target.value })}
                  style={{ color: form.project ? undefined : 'transparent' }}
                >
                  <option value="" disabled hidden></option>
                  {t.contact.form.projectOptions.map(opt => (
                    <option key={opt} value={opt} style={{ color: '#1E3A5F' }}>{opt}</option>
                  ))}
                </select>
                <label
                  htmlFor="contact-project"
                  className={form.project ? 'text-electric' : ''}
                  style={form.project ? { top: '0.45rem', fontSize: '0.65rem', letterSpacing: '0.03em' } : { top: '50%', transform: 'translateY(-50%)', fontSize: '0.875rem' }}
                >
                  {t.contact.form.project}
                </label>
              </div>

              {/* Message */}
              <div className="float-field">
                <textarea
                  id="contact-message"
                  rows={5}
                  required
                  placeholder=" "
                  value={form.message}
                  onChange={e => setForm({ ...form, message: e.target.value })}
                />
                <label htmlFor="contact-message">{t.contact.form.message}</label>
              </div>

              {/* Feedback */}
              {status === 'success' && (
                <div className="space-y-3 reveal-item">
                  <div className="flex items-center gap-2 text-success text-sm font-medium">
                    <CheckCircle size={16} className="success-icon-anim flex-shrink-0" />
                    {t.contact.form.success}
                  </div>
                  <div className="flex items-start gap-3 p-4 rounded-xl bg-gold/8 border border-gold/20">
                    <Gift size={16} className="text-gold flex-shrink-0 mt-0.5" />
                    <p className="text-xs text-foreground/70 dark:text-white/70">
                      Déjà client Stackup ?{' '}
                      <Link href="/parrainage" className="font-semibold text-gold hover:underline">
                        Recommandez-nous
                      </Link>{' '}
                      et gagnez 1 mois de maintenance offert.
                    </p>
                  </div>
                </div>
              )}
              {status === 'error' && (
                <div className="flex items-center gap-2 text-red-500 text-sm">
                  <AlertCircle size={16} className="flex-shrink-0" />
                  {t.contact.form.error}
                </div>
              )}

              {/* Submit */}
              <button
                type="submit"
                disabled={status === 'sending'}
                className="w-full flex items-center justify-center gap-2.5 py-4 bg-gradient-to-r from-navy to-electric hover:from-electric hover:to-navy text-white font-semibold rounded-xl shadow-lg shadow-navy/20 hover:shadow-electric/30 transition-all duration-300 hover:-translate-y-0.5 disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {status === 'sending' ? (
                  <>
                    <span className="btn-spinner" aria-hidden="true" />
                    {t.contact.form.sending}
                  </>
                ) : (
                  <>
                    <Send size={16} />
                    {t.contact.form.send}
                  </>
                )}
              </button>
            </form>
          </div>

          {/* ── Sidebar info — glass panel ── */}
          <div className="lg:col-span-2 reveal-item" style={{ animationDelay: '120ms' }}>
            <div className="glass-panel rounded-2xl p-6 sticky top-28 circuit-h">
              <div className="w-10 h-10 rounded-xl bg-electric/10 border border-electric/20 flex items-center justify-center mb-5">
                <Mail size={20} className="text-electric" />
              </div>
              <h3 className="font-bold text-white mb-4">Nous contacter</h3>
              <ul className="space-y-4 text-sm text-white/60">
                <li className="flex items-center gap-3">
                  <span className="text-lg">📧</span>
                  <a href="mailto:contact@stackup-agency.fr" className="text-electric hover:underline font-medium">
                    contact@stackup-agency.fr
                  </a>
                </li>
                <li className="flex items-center gap-3">
                  <span className="text-lg">⏱</span>
                  <span>Réponse sous 72h garantie</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-lg mt-0.5">📅</span>
                  <span>Pour planifier un échange, précisez vos disponibilités dans votre message.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-lg mt-0.5">📍</span>
                  <span>Tours (37), Toute la France</span>
                </li>
              </ul>

              {/* Mini trust */}
              <div className="mt-6 pt-5 border-t border-white/[0.06] space-y-2">
                {['Devis 100% gratuit', 'Sans engagement', 'Code vous appartient'].map(item => (
                  <div key={item} className="flex items-center gap-2 text-xs text-white/60">
                    <CheckCircle size={12} className="text-electric flex-shrink-0" />
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
