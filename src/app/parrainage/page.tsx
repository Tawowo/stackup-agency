'use client'
import { useState } from 'react'
import { Gift, Users, Star, Check } from 'lucide-react'

export default function ParrainagePage() {
  const [form, setForm] = useState({
    parrain_nom: '',
    parrain_email: '',
    filleul_nom: '',
    filleul_email: '',
    message: '',
  })
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setStatus('sending')
    try {
      const res = await fetch('/api/parrainage', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (res.ok) {
        setStatus('success')
        setForm({ parrain_nom: '', parrain_email: '', filleul_nom: '', filleul_email: '', message: '' })
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  return (
    <main className="min-h-screen bg-[#F8FAFC] dark:bg-[#0A0F1C]">
      {/* Hero */}
      <section className="bg-gradient-to-b from-[#1E3A5F] to-[#0F172A] py-24 pt-32 text-center">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#F59E0B]/20 text-[#F59E0B] text-sm font-semibold mb-6">
            <Gift size={16} />
            Programme de parrainage
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-white mb-4">
            Parrainez un ami,<br />profitez ensemble 🎁
          </h1>
          <p className="text-white/70 text-lg max-w-xl mx-auto">
            Recommandez Stackup Agency à votre entourage et bénéficiez tous les deux d&apos;avantages exclusifs.
          </p>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-16 space-y-16">
        {/* Comment ça marche */}
        <section>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white text-center mb-10">Comment ça marche</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { icon: Users, step: '1', title: 'Vous recommandez', desc: 'Parlez de Stackup Agency à un proche qui a besoin d\'un site web ou d\'une application.' },
              { icon: Check, step: '2', title: 'Il signe avec nous', desc: 'Votre filleul signe un projet avec Stackup Agency en mentionnant votre parrainage.' },
              { icon: Gift, step: '3', title: 'Vous profitez tous les deux', desc: 'Vous recevez 1 mois de maintenance gratuit. Votre filleul bénéficie de -10% sur son projet.' },
            ].map(({ icon: Icon, step, title, desc }) => (
              <div key={step} className="bg-white dark:bg-white/5 rounded-2xl p-7 border border-gray-100 dark:border-white/10 text-center">
                <div className="w-12 h-12 rounded-full bg-[#1E3A5F] flex items-center justify-center mx-auto mb-4">
                  <Icon size={22} className="text-[#F59E0B]" />
                </div>
                <div className="text-[#F59E0B] font-bold text-sm mb-2">Étape {step}</div>
                <h3 className="font-bold text-gray-900 dark:text-white mb-2">{title}</h3>
                <p className="text-gray-500 dark:text-white/60 text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Avantages */}
        <section className="grid md:grid-cols-2 gap-6">
          <div className="bg-gradient-to-br from-[#1E3A5F] to-[#0F172A] rounded-2xl p-8 text-white">
            <Star size={28} className="text-[#F59E0B] mb-4" />
            <h3 className="text-xl font-bold mb-3">Pour vous (parrain)</h3>
            <ul className="space-y-2 text-white/80 text-sm">
              <li className="flex items-center gap-2"><Check size={16} className="text-[#F59E0B] flex-shrink-0" />1 mois de maintenance offert</li>
              <li className="flex items-center gap-2"><Check size={16} className="text-[#F59E0B] flex-shrink-0" />Valeur jusqu&apos;à 89€ selon votre plan</li>
              <li className="flex items-center gap-2"><Check size={16} className="text-[#F59E0B] flex-shrink-0" />Cumulable (1 mois par filleul signé)</li>
            </ul>
          </div>
          <div className="bg-white dark:bg-white/5 rounded-2xl p-8 border border-gray-100 dark:border-white/10">
            <Gift size={28} className="text-[#1E3A5F] dark:text-[#F59E0B] mb-4" />
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Pour votre filleul</h3>
            <ul className="space-y-2 text-ink/70 dark:text-white/70 text-sm">
              <li className="flex items-center gap-2"><Check size={16} className="text-green-500 flex-shrink-0" />-10% sur son premier projet</li>
              <li className="flex items-center gap-2"><Check size={16} className="text-green-500 flex-shrink-0" />Valable sur tous nos services</li>
              <li className="flex items-center gap-2"><Check size={16} className="text-green-500 flex-shrink-0" />Sans minimum de commande</li>
            </ul>
          </div>
        </section>

        {/* Formulaire */}
        <section>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">Soumettre un parrainage</h2>
          <div className="bg-white dark:bg-white/5 rounded-2xl p-8 border border-gray-100 dark:border-white/10">
            {status === 'success' ? (
              <div className="text-center py-8">
                <div className="w-16 h-16 rounded-full bg-green-500/10 flex items-center justify-center mx-auto mb-4">
                  <Check size={32} className="text-green-500" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Parrainage enregistré !</h3>
                <p className="text-gray-500 dark:text-white/60">Nous revenons vers vous sous 72h pour confirmer votre parrainage.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-4 text-sm uppercase tracking-wide">Vos informations</h3>
                    <div className="space-y-4">
                      <input
                        type="text"
                        required
                        placeholder="Votre nom"
                        value={form.parrain_nom}
                        onChange={e => setForm(f => ({ ...f, parrain_nom: e.target.value }))}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-white/5 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-white/30 focus:outline-none focus:border-[#2D7DD2] transition-colors text-sm"
                      />
                      <input
                        type="email"
                        required
                        placeholder="Votre email"
                        value={form.parrain_email}
                        onChange={e => setForm(f => ({ ...f, parrain_email: e.target.value }))}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-white/5 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-white/30 focus:outline-none focus:border-[#2D7DD2] transition-colors text-sm"
                      />
                    </div>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-4 text-sm uppercase tracking-wide">Votre filleul</h3>
                    <div className="space-y-4">
                      <input
                        type="text"
                        required
                        placeholder="Son nom"
                        value={form.filleul_nom}
                        onChange={e => setForm(f => ({ ...f, filleul_nom: e.target.value }))}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-white/5 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-white/30 focus:outline-none focus:border-[#2D7DD2] transition-colors text-sm"
                      />
                      <input
                        type="email"
                        required
                        placeholder="Son email"
                        value={form.filleul_email}
                        onChange={e => setForm(f => ({ ...f, filleul_email: e.target.value }))}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-white/5 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-white/30 focus:outline-none focus:border-[#2D7DD2] transition-colors text-sm"
                      />
                    </div>
                  </div>
                </div>
                <textarea
                  rows={3}
                  placeholder="Message optionnel (contexte, projet envisagé...)"
                  value={form.message}
                  onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-white/5 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-white/30 focus:outline-none focus:border-[#2D7DD2] transition-colors text-sm resize-none"
                />
                {status === 'error' && (
                  <p className="text-red-500 text-sm">Une erreur est survenue. Réessayez ou contactez-nous à contact@stackup-agency.fr.</p>
                )}
                <button
                  type="submit"
                  disabled={status === 'sending'}
                  className="w-full py-3 bg-[#F59E0B] hover:bg-gold disabled:opacity-60 text-ink font-semibold rounded-xl transition-all text-sm"
                >
                  {status === 'sending' ? 'Envoi en cours...' : 'Envoyer le parrainage'}
                </button>
              </form>
            )}
          </div>
        </section>
      </div>
    </main>
  )
}
