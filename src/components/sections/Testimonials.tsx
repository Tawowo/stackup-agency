'use client'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { useRef, useState } from 'react'
import { Star, MessageSquare, X } from 'lucide-react'
import { useLanguage } from '@/contexts/LanguageContext'

function StarRating({ value, onChange }: { value: number; onChange: (v: number) => void }) {
  const [hovered, setHovered] = useState(0)
  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map(s => (
        <button
          key={s}
          type="button"
          onClick={() => onChange(s)}
          onMouseEnter={() => setHovered(s)}
          onMouseLeave={() => setHovered(0)}
          className="transition-transform hover:scale-110"
        >
          <Star
            size={28}
            className={(hovered || value) >= s ? 'text-gold fill-gold' : 'text-gray-300 dark:text-white/20'}
          />
        </button>
      ))}
    </div>
  )
}

export default function Testimonials() {
  const { t } = useLanguage()
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const [open, setOpen] = useState(false)
  const [rating, setRating] = useState(0)
  const [sending, setSending] = useState(false)
  const [sent, setSent] = useState(false)
  const [form, setForm] = useState({ name: '', company: '', projectType: '', text: '' })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!rating) return
    setSending(true)
    try {
      await fetch('/api/testimonials', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, rating }),
      })
      setSent(true)
    } catch {
      // silently ignore
    } finally {
      setSending(false)
    }
  }

  const close = () => {
    setOpen(false)
    setSent(false)
    setRating(0)
    setForm({ name: '', company: '', projectType: '', text: '' })
  }

  return (
    <section id="temoignages" className="py-24 lg:py-32 bg-[#F8FAFC] dark:bg-[#0A0F1C]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-gold/10 text-gold text-sm font-semibold mb-4">
            Avis clients
          </span>
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            {t.testimonials.title}
          </h2>
          <p className="text-gray-600 dark:text-white/60 text-lg">{t.testimonials.subtitle}</p>
        </motion.div>

        {/* Placeholder cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[1, 2, 3].map(i => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="bg-white dark:bg-white/5 rounded-2xl p-6 border border-dashed border-gray-200 dark:border-white/20 flex flex-col items-center justify-center text-center min-h-[200px] gap-4"
            >
              <div className="w-12 h-12 rounded-full bg-gray-100 dark:bg-white/10 flex items-center justify-center">
                <MessageSquare size={20} className="text-gray-300 dark:text-white/30" />
              </div>
              <div className="flex gap-1">
                {[1,2,3,4,5].map(s => (
                  <Star key={s} size={16} className="text-gold/30" />
                ))}
              </div>
              <p className="text-gray-400 dark:text-white/30 text-sm italic">
                Votre avis arrive bientôt...
              </p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.6 }}
          className="text-center mt-12 space-y-4"
        >
          <p className="text-gray-400 dark:text-white/40 text-sm">{t.testimonials.placeholder}</p>
          <button
            onClick={() => setOpen(true)}
            className="inline-flex items-center gap-2 px-6 py-3 bg-electric hover:bg-electric/90 text-white rounded-xl text-sm font-semibold transition-all hover:-translate-y-0.5 shadow-lg shadow-electric/20"
          >
            <Star size={16} />
            Laisser un avis
          </button>
        </motion.div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
            onClick={e => e.target === e.currentTarget && close()}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 20 }}
              transition={{ duration: 0.25 }}
              className="bg-white dark:bg-[#0F1829] rounded-2xl p-8 w-full max-w-lg shadow-2xl relative"
            >
              <button onClick={close} className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-700 dark:hover:text-white transition-colors">
                <X size={20} />
              </button>

              {sent ? (
                <div className="text-center py-8">
                  <div className="w-16 h-16 rounded-full bg-electric/10 flex items-center justify-center mx-auto mb-4">
                    <Star size={28} className="text-electric fill-electric" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Merci pour votre avis !</h3>
                  <p className="text-gray-500 dark:text-white/60 text-sm">Votre témoignage sera publié après validation.</p>
                  <button onClick={close} className="mt-6 px-6 py-2.5 bg-electric text-white rounded-xl text-sm font-semibold">Fermer</button>
                </div>
              ) : (
                <>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">Partagez votre expérience</h3>
                  <p className="text-gray-500 dark:text-white/50 text-sm mb-6">Votre avis aide les autres entrepreneurs à nous faire confiance.</p>

                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-gray-700 dark:text-white/70 mb-1.5">Nom *</label>
                        <input
                          required
                          value={form.name}
                          onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                          placeholder="Jean Dupont"
                          className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-white/5 text-gray-900 dark:text-white text-sm focus:outline-none focus:border-electric"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-gray-700 dark:text-white/70 mb-1.5">Entreprise</label>
                        <input
                          value={form.company}
                          onChange={e => setForm(f => ({ ...f, company: e.target.value }))}
                          placeholder="Mon Commerce"
                          className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-white/5 text-gray-900 dark:text-white text-sm focus:outline-none focus:border-electric"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-gray-700 dark:text-white/70 mb-1.5">Type de projet</label>
                      <select
                        value={form.projectType}
                        onChange={e => setForm(f => ({ ...f, projectType: e.target.value }))}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-white/5 text-gray-900 dark:text-white text-sm focus:outline-none focus:border-electric"
                      >
                        <option value="">Sélectionner...</option>
                        <option>Site vitrine</option>
                        <option>Site e-commerce</option>
                        <option>Système de gestion</option>
                        <option>Application web</option>
                        <option>Design & Branding</option>
                        <option>Marketing digital</option>
                        <option>Maintenance</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-gray-700 dark:text-white/70 mb-2">Note *</label>
                      <StarRating value={rating} onChange={setRating} />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-gray-700 dark:text-white/70 mb-1.5">Votre témoignage *</label>
                      <textarea
                        required
                        rows={4}
                        value={form.text}
                        onChange={e => setForm(f => ({ ...f, text: e.target.value }))}
                        placeholder="Décrivez votre expérience avec Stackup Agency..."
                        className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-white/5 text-gray-900 dark:text-white text-sm focus:outline-none focus:border-electric resize-none"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={sending || !rating}
                      className="w-full py-3.5 bg-electric hover:bg-electric/90 disabled:opacity-50 text-white font-semibold rounded-xl text-sm transition-all"
                    >
                      {sending ? 'Envoi en cours...' : 'Envoyer mon avis'}
                    </button>
                  </form>
                </>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
