import Link from 'next/link'

export const metadata = {
  title: '404 — Page introuvable',
  description: 'Cette page n\'existe pas ou a été déplacée.',
}

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#060D1A] via-[#0A1525] to-[#060D1A] flex flex-col items-center justify-center px-4 text-center relative overflow-hidden">

      {/* Background halos */}
      <div className="pointer-events-none absolute top-1/4 left-1/4 w-96 h-96 rounded-full"
        aria-hidden="true"
        style={{ background: 'radial-gradient(ellipse, rgba(45,125,210,0.08) 0%, transparent 70%)' }} />
      <div className="pointer-events-none absolute bottom-1/4 right-1/4 w-72 h-72 rounded-full"
        aria-hidden="true"
        style={{ background: 'radial-gradient(ellipse, rgba(245,158,11,0.06) 0%, transparent 70%)' }} />

      {/* Big 404 */}
      <div className="flex items-center justify-center gap-2 sm:gap-4 mb-8 select-none" aria-hidden="true">
        <span
          className="not-found-4 font-display font-black leading-none"
          style={{ fontSize: 'clamp(5rem, 20vw, 11rem)', color: '#2D7DD2', opacity: 0.9, letterSpacing: '-0.05em' }}
        >4</span>
        <span
          className="not-found-0 font-display font-black leading-none"
          style={{ fontSize: 'clamp(5rem, 20vw, 11rem)', background: 'linear-gradient(135deg, #F59E0B, #2D7DD2)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', letterSpacing: '-0.05em' }}
        >0</span>
        <span
          className="not-found-4b font-display font-black leading-none"
          style={{ fontSize: 'clamp(5rem, 20vw, 11rem)', color: '#F59E0B', opacity: 0.9, letterSpacing: '-0.05em' }}
        >4</span>
      </div>

      {/* Text */}
      <h1 className="text-xl sm:text-2xl font-bold text-white mb-3">
        Cette page s&apos;est évaporée dans les internets.
      </h1>
      <p className="text-white/50 text-sm max-w-sm mb-10">
        Peut-être une faute de frappe, un lien expiré, ou simplement la magie du web.<br />
        On vous ramène sur quelque chose de solide.
      </p>

      {/* CTAs */}
      <div className="flex flex-col sm:flex-row gap-3 mb-12">
        <Link
          href="/"
          className="px-6 py-3 bg-electric hover:bg-electric-ink text-white font-semibold rounded-xl transition-all hover:-translate-y-0.5 shadow-lg shadow-electric/25"
        >
          ← Retour à l&apos;accueil
        </Link>
        <Link
          href="/contact"
          className="px-6 py-3 border border-white/15 hover:border-white/30 text-white/70 hover:text-white font-medium rounded-xl transition-all hover:-translate-y-0.5"
        >
          Nous contacter
        </Link>
      </div>

      {/* Quick links */}
      <div className="flex flex-wrap items-center justify-center gap-4 text-sm text-white/40">
        <Link href="/services" className="hover:text-electric transition-colors">Services</Link>
        <span>·</span>
        <Link href="/tarifs" className="hover:text-electric transition-colors">Tarifs</Link>
        <span>·</span>
        <Link href="/realisations" className="hover:text-electric transition-colors">Réalisations</Link>
        <span>·</span>
        <Link href="/blog" className="hover:text-electric transition-colors">Blog</Link>
        <span>·</span>
        <Link href="/faq" className="hover:text-electric transition-colors">FAQ</Link>
      </div>
    </div>
  )
}
