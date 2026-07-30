'use client'
import { motion, useInView } from 'framer-motion'
import { useRef, useState } from 'react'
import { Send, Mail, CheckCircle, AlertCircle } from 'lucide-react'
import { useLanguage } from '@/contexts/LanguageContext'

export default function Contact() {
  const { t } = useLanguage()
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
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
    setTimeout(() => setStatus('idle'), 5000)
  }

  const inputClass = "w-full px-4 py-3 rounded-xl bg-white dark:bg-gray-800 border border-navy/20 dark:border-white/20 text-foreground dark:text-white placeholder:text-foreground/40 dark:placeholder:text-white/30 focus:outline-none focus:border-electric focus:ring-2 focus:ring-electric/20 transition-all text-sm"

  return (
    <section id="contact" className="py-24 lg:py-32 bg-white dark:bg-[#060D1A]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-bold text-foreground dark:text-white mb-4">
            {t.contact.title}
          </h2>
          <p className="text-foreground/60 dark:text-white/60 text-lg">{t.contact.subtitle}</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="lg:col-span-3"
          >
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input
                  type="text"
                  required
                  value={form.name}
                  onChange={e => setForm({ ...form, name: e.target.value })}
                  placeholder={t.contact.form.name}
                  className={inputClass}
                />
                <input
                  type="email"
                  required
                  value={form.email}
                  onChange={e => setForm({ ...form, email: e.target.value })}
                  placeholder={t.contact.form.email}
                  className={inputClass}
                />
              </div>
              <input
                type="tel"
                value={form.phone}
                onChange={e => setForm({ ...form, phone: e.target.value })}
                placeholder={t.contact.form.phone}
                className={inputClass}
              />
              <select
                value={form.project}
                onChange={e => setForm({ ...form, project: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-white dark:bg-gray-800 border border-navy/20 dark:border-white/20 text-foreground dark:text-white placeholder:text-foreground/40 dark:placeholder:text-white/30 focus:outline-none focus:border-electric focus:ring-2 focus:ring-electric/20 transition-all text-sm"
              >
                <option value="">{t.contact.form.project}</option>
                {t.contact.form.projectOptions.map(opt => (
                  <option key={opt} value={opt}>{opt}</option>
                ))}
              </select>
              <textarea
                rows={5}
                required
                value={form.message}
                onChange={e => setForm({ ...form, message: e.target.value })}
                placeholder={t.contact.form.message}
                className={inputClass + ' resize-none'}
              />

              {status === 'success' && (
                <div className="flex items-center gap-2 text-success text-sm">
                  <CheckCircle size={16} />
                  {t.contact.form.success}
                </div>
              )}
              {status === 'error' && (
                <div className="flex items-center gap-2 text-red-500 text-sm">
                  <AlertCircle size={16} />
                  {t.contact.form.error}
                </div>
              )}

              <button
                type="submit"
                disabled={status === 'sending'}
                className="w-full flex items-center justify-center gap-2 py-4 bg-gradient-to-r from-navy to-electric hover:from-electric hover:to-navy text-white font-semibold rounded-xl shadow-lg shadow-navy/20 hover:shadow-electric/30 transition-all hover:-translate-y-0.5 disabled:opacity-60 disabled:cursor-not-allowed"
              >
                <Send size={18} />
                {status === 'sending' ? t.contact.form.sending : t.contact.form.send}
              </button>
            </form>
          </motion.div>

          {/* Info sidebar */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="lg:col-span-2"
          >
            <div className="glass dark:bg-white/5 rounded-2xl p-6 border border-navy/10 dark:border-white/10">
              <div className="w-10 h-10 rounded-xl bg-electric/10 flex items-center justify-center mb-4">
                <Mail size={20} className="text-electric" />
              </div>
              <h3 className="font-bold text-foreground dark:text-white mb-3">Nous contacter</h3>
              <ul className="space-y-3 text-sm text-foreground/70 dark:text-white/60">
                <li className="flex items-center gap-2">
                  <span className="text-base">📧</span>
                  <a href="mailto:contact@stackup-agency.fr" className="text-electric hover:underline font-medium">contact@stackup-agency.fr</a>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-base">⏱</span>
                  <span>Réponse sous 72h garantie</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-base mt-0.5">📅</span>
                  <span>Pour planifier un échange, précisez vos disponibilités dans votre message.</span>
                </li>
              </ul>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
