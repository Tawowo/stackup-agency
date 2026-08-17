/* eslint-disable react/no-unescaped-entities */
'use client'
import { useState } from 'react'
import Link from 'next/link'
import { Gift, Users, Check, ChevronRight, FileText } from 'lucide-react'
import DecorProfondeur from '@/components/ui/DecorProfondeur'
import MiniHero from '@/components/ui/MiniHero'

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Quelle est la récompense du parrain ?',
      acceptedAnswer: { '@type': 'Answer', text: 'À la signature du projet de votre filleul, vous choisissez votre récompense : 1 mois d\'abonnement Premium (89 €) offert OU −10 % sur votre propre prestation non encore signée. Une récompense par filleul signé, cumulable sur plusieurs filleuls.' },
    },
    {
      '@type': 'Question',
      name: 'Quelle est la réduction du filleul ?',
      acceptedAnswer: { '@type': 'Answer', text: 'Le filleul bénéficie de −10 % sur son premier projet, à condition que la mise en relation soit signalée avant la signature de son devis. Le filleul doit être un nouveau client. La réduction s\'applique au montant HT du projet.' },
    },
    {
      '@type': 'Question',
      name: 'Le parrainage est-il cumulable ?',
      acceptedAnswer: { '@type': 'Answer', text: 'Oui pour le parrain : une récompense par filleul signé, cumulable sur plusieurs filleuls. L\'avantage filleul (−10 %) n\'est en revanche pas cumulable avec d\'autres offres promotionnelles.' },
    },
    {
      '@type': 'Question',
      name: 'Quand la récompense est-elle activée ?',
      acceptedAnswer: { '@type': 'Answer', text: 'La mise en relation doit être signalée AVANT la signature du devis du filleul. La récompense est activée à la signature de son projet. La réduction de −10 % s\'applique uniquement à une prestation non encore signée ni payée du parrain — si vous avez déjà tout réglé, la récompense est le mois Premium offert.' },
    },
    {
      '@type': 'Question',
      name: 'Où trouver les conditions complètes du parrainage ?',
      acceptedAnswer: { '@type': 'Answer', text: 'Le parrainage est régi par l\'article 23 des Conditions Générales de Vente de Stackup Agency, disponibles à l\'adresse stackup-agency.fr/cgv.' },
    },
  ],
}

const STEPS = [
  {
    Icon: Users,
    num: '01',
    titre: 'Vous nous signalez la mise en relation',
    desc: 'Parlez de Stackup Agency à un professionnel qui a besoin d\'un site ou d\'une application, et signalez-nous la mise en relation AVANT la signature de son devis (formulaire ci-dessous).',
  },
  {
    Icon: Check,
    num: '02',
    titre: 'Votre filleul signe son projet',
    desc: 'Votre filleul — un nouveau client — signe son devis avec Stackup Agency. C\'est la signature qui déclenche votre récompense.',
  },
  {
    Icon: Gift,
    num: '03',
    titre: 'Vous choisissez votre récompense',
    desc: '1 mois d\'abonnement Premium (89 €) offert OU −10 % sur votre propre prestation non encore signée. Une récompense par filleul, cumulable sur plusieurs filleuls.',
  },
]

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
    <main className="min-h-screen bg-[#FFFDF9] relative overflow-hidden">
      <DecorProfondeur variant="gold" seed={1} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <MiniHero
        breadcrumb={[{ name: 'Parrainage', href: '/parrainage' }]}
        title="Parrainez un professionnel, choisissez votre récompense"
        subtitle="À la signature de son projet : 1 mois d'abonnement Premium (89 €) offert OU −10 % sur votre propre prestation. Cumulable sur plusieurs filleuls."
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-16 space-y-16">

        {/* 3 étapes */}
        <section>
          <h2 className="text-2xl font-bold text-foreground dark:text-white mb-8">Comment ça fonctionne</h2>
          <div className="grid sm:grid-cols-3 gap-6">
            {STEPS.map(({ Icon, num, titre, desc }, i) => (
              <div key={num} className="reveal-item relative p-6 rounded-2xl border border-navy/10 dark:border-white/10 bg-white dark:bg-[#0D1626] hover:border-gold/30 hover:-translate-y-0.5 transition-all duration-200"
                style={{ animationDelay: `${i * 80}ms` }}>
                <div className="absolute -top-3 -left-3 w-8 h-8 rounded-full bg-gold flex items-center justify-center text-ink font-bold text-xs shadow-md shadow-gold/30">
                  {num}
                </div>
                <div className="w-10 h-10 rounded-xl bg-gold/10 flex items-center justify-center mb-4 group-hover:bg-gold/20 transition-colors">
                  <Icon size={20} className="text-gold" />
                </div>
                <h3 className="font-bold text-foreground dark:text-white mb-2">{titre}</h3>
                <p className="text-sm text-foreground/60 dark:text-white/60 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Cartes récompenses */}
        <section>
          <h2 className="text-2xl font-bold text-foreground dark:text-white mb-6">Vos récompenses</h2>
          <div className="grid sm:grid-cols-2 gap-6">
            {/* Parrain */}
            <div className="rounded-2xl border border-gold/30 bg-gradient-to-br from-navy to-[#0F172A] p-8 text-white">
              <div className="text-xs font-semibold text-gold/70 uppercase tracking-widest mb-4">Pour vous — le parrain, au choix</div>
              <div className="flex items-baseline gap-2 mb-1">
                <span className="font-display font-bold text-3xl text-gold">1 mois Premium (89 €)</span>
              </div>
              <div className="text-white/60 text-base mb-1">offert sur votre abonnement</div>
              <div className="text-white/50 text-sm mb-4">
                <span className="text-gold font-semibold">OU −10 %</span> sur votre propre prestation non encore signée
              </div>
              <ul className="space-y-2 text-sm">
                {[
                  'Mise en relation signalée avant la signature du devis du filleul',
                  'Une récompense par filleul signé — cumulable sur plusieurs filleuls',
                  'Si tout est déjà réglé de votre côté : le mois Premium offert',
                ].map(item => (
                  <li key={item} className="flex items-start gap-2 text-white/70">
                    <Check size={14} className="text-gold flex-shrink-0 mt-0.5" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Filleul */}
            <div className="rounded-2xl border border-electric/20 bg-white dark:bg-[#0D1626] p-8">
              <div className="text-xs font-semibold text-electric-ink dark:text-electric uppercase tracking-widest mb-4">Pour votre filleul</div>
              <div className="flex items-baseline gap-2 mb-1">
                <span className="font-display font-bold text-5xl text-navy dark:text-gold">−10%</span>
                <span className="text-foreground/60 dark:text-white/60 text-lg">premier projet</span>
              </div>
              <div className="text-foreground/60 dark:text-white/60 text-sm mb-6">Sur tous nos services, HT, à la signature</div>
              <ul className="space-y-2 text-sm">
                {[
                  'Valable sur site vitrine, e-commerce, gestion…',
                  'Mention du parrain obligatoire au devis',
                  'Non cumulable avec d\'autres offres',
                ].map(item => (
                  <li key={item} className="flex items-start gap-2 text-foreground/70 dark:text-white/60">
                    <Check size={14} className="text-green-500 flex-shrink-0 mt-0.5" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Formulaire */}
        <section id="formulaire">
          <h2 className="text-2xl font-bold text-foreground dark:text-white mb-2">Soumettre un parrainage</h2>
          <p className="text-foreground/60 dark:text-white/60 text-sm mb-8">
            Remplissez vos coordonnées et celles de votre filleul. Nous lui enverrons une confirmation avec le code de réduction.
          </p>
          <div className="bg-white dark:bg-[#0D1626] rounded-2xl border border-navy/10 dark:border-white/10 p-8">
            {status === 'success' ? (
              <div className="text-center py-8">
                <div className="w-16 h-16 rounded-full bg-green-500/10 flex items-center justify-center mx-auto mb-4">
                  <Check size={32} className="text-green-500" />
                </div>
                <h3 className="text-xl font-bold text-foreground dark:text-white mb-2">Parrainage enregistré !</h3>
                <p className="text-foreground/60 dark:text-white/60 mb-6">
                  Nous revenons vers vous et votre filleul sous 72h pour confirmer le parrainage.
                </p>
                <Link href="/services" className="inline-flex items-center gap-2 text-electric-ink dark:text-electric font-medium text-sm">
                  Explorer nos services <ChevronRight size={14} />
                </Link>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-semibold text-foreground dark:text-white mb-4 text-xs uppercase tracking-wide">Vos informations (parrain)</h3>
                    <div className="space-y-3">
                      <input
                        type="text"
                        required
                        placeholder="Votre nom"
                        value={form.parrain_nom}
                        onChange={e => setForm(f => ({ ...f, parrain_nom: e.target.value }))}
                        className="w-full px-4 py-3 rounded-xl border border-navy/20 dark:border-white/10 bg-background dark:bg-white/5 text-foreground dark:text-white placeholder-foreground/30 dark:placeholder-white/30 focus:outline-none focus:border-electric transition-colors text-sm"
                      />
                      <input
                        type="email"
                        required
                        placeholder="Votre email"
                        value={form.parrain_email}
                        onChange={e => setForm(f => ({ ...f, parrain_email: e.target.value }))}
                        className="w-full px-4 py-3 rounded-xl border border-navy/20 dark:border-white/10 bg-background dark:bg-white/5 text-foreground dark:text-white placeholder-foreground/30 dark:placeholder-white/30 focus:outline-none focus:border-electric transition-colors text-sm"
                      />
                    </div>
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground dark:text-white mb-4 text-xs uppercase tracking-wide">Votre filleul</h3>
                    <div className="space-y-3">
                      <input
                        type="text"
                        required
                        placeholder="Son nom"
                        value={form.filleul_nom}
                        onChange={e => setForm(f => ({ ...f, filleul_nom: e.target.value }))}
                        className="w-full px-4 py-3 rounded-xl border border-navy/20 dark:border-white/10 bg-background dark:bg-white/5 text-foreground dark:text-white placeholder-foreground/30 dark:placeholder-white/30 focus:outline-none focus:border-electric transition-colors text-sm"
                      />
                      <input
                        type="email"
                        required
                        placeholder="Son email"
                        value={form.filleul_email}
                        onChange={e => setForm(f => ({ ...f, filleul_email: e.target.value }))}
                        className="w-full px-4 py-3 rounded-xl border border-navy/20 dark:border-white/10 bg-background dark:bg-white/5 text-foreground dark:text-white placeholder-foreground/30 dark:placeholder-white/30 focus:outline-none focus:border-electric transition-colors text-sm"
                      />
                    </div>
                  </div>
                </div>
                <textarea
                  rows={3}
                  placeholder="Message optionnel (contexte du projet de votre filleul…)"
                  value={form.message}
                  onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                  className="w-full px-4 py-3 rounded-xl border border-navy/20 dark:border-white/10 bg-background dark:bg-white/5 text-foreground dark:text-white placeholder-foreground/30 dark:placeholder-white/30 focus:outline-none focus:border-electric transition-colors text-sm resize-none"
                />
                {status === 'error' && (
                  <p className="text-red-500 text-sm">Une erreur est survenue. Réessayez ou contactez-nous à contact@stackup-agency.fr.</p>
                )}
                <button
                  type="submit"
                  disabled={status === 'sending'}
                  className="w-full py-3.5 bg-gold hover:bg-gold/80 disabled:opacity-60 text-ink font-semibold rounded-xl transition-all text-sm"
                >
                  {status === 'sending' ? 'Envoi en cours…' : 'Envoyer le parrainage →'}
                </button>
              </form>
            )}
          </div>
        </section>

        {/* FAQ */}
        <section>
          <h2 className="text-2xl font-bold text-foreground dark:text-white mb-6">Questions fréquentes</h2>
          <div className="space-y-3">
            {faqSchema.mainEntity.map(item => (
              <details key={item.name} className="group rounded-xl border border-navy/20 dark:border-white/10 overflow-hidden">
                <summary className="flex items-center justify-between p-4 cursor-pointer font-medium text-foreground dark:text-white list-none">
                  {item.name}
                  <ChevronRight size={16} className="text-foreground/30 dark:text-white/30 group-open:rotate-90 transition-transform flex-shrink-0" />
                </summary>
                <div className="px-4 pb-4 text-foreground/70 dark:text-white/70 text-sm leading-relaxed">
                  {item.acceptedAnswer.text}
                </div>
              </details>
            ))}
          </div>
          <div className="mt-5 flex items-center gap-2 text-sm text-foreground/70 dark:text-white/60">
            <FileText size={14} />
            <Link href="/cgv" className="underline hover:text-electric transition-colors">
              Conditions complètes — CGV Stackup Agency, art. 23
            </Link>
          </div>
        </section>

        {/* CTA vers tarifs */}
        <section className="rounded-2xl border border-gold/20 bg-gradient-to-br from-navy/5 to-gold/5 dark:from-navy/30 dark:to-gold/10 p-8 text-center">
          <h3 className="font-bold text-foreground dark:text-white text-xl mb-2">
            Pas encore client ? Découvrez nos offres
          </h3>
          <p className="text-foreground/60 dark:text-white/60 text-sm mb-6">
            Demandez votre devis gratuit sous 72h. Premier site vitrine à partir de 449€.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/tarifs" className="px-6 py-3 bg-navy hover:bg-electric text-white font-semibold rounded-xl transition-colors text-sm">
              Voir les tarifs
            </Link>
            <Link href="/contact" className="px-6 py-3 border border-navy/20 dark:border-white/20 text-foreground dark:text-white hover:bg-navy/5 dark:hover:bg-white/5 font-semibold rounded-xl transition-colors text-sm">
              Demander un devis
            </Link>
          </div>
        </section>

      </div>
    </main>
  )
}
