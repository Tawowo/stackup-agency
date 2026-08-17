import Breadcrumb from '@/components/ui/Breadcrumb'

interface BreadcrumbItem {
  name: string
  href?: string
}

interface Props {
  title: string
  subtitle?: string
  breadcrumb?: BreadcrumbItem[]
  children?: React.ReactNode
  marker?: string  // e.g. "[ 01 / SERVICES ]"
}

/**
 * V4 — MiniHero clair lumineux.
 * Fond ivoire chaud, halo or subtil, texte navy.
 * Utilisé sur 100+ pages intérieures.
 */
export default function MiniHero({ title, subtitle, breadcrumb, children, marker }: Props) {
  return (
    <div className="relative bg-[#FFFDF9] pt-24 pb-14 overflow-hidden">
      {/* Halo or doux en haut à droite */}
      <div className="pointer-events-none absolute top-0 right-0 w-[500px] h-64 rounded-full" aria-hidden="true"
        style={{ background: 'radial-gradient(ellipse at 80% 0%, rgba(245,158,11,0.08) 0%, transparent 70%)' }} />
      {/* Halo bleu doux à gauche */}
      <div className="pointer-events-none absolute bottom-0 left-0 w-72 h-48 rounded-full" aria-hidden="true"
        style={{ background: 'radial-gradient(ellipse, rgba(45,125,210,0.05) 0%, transparent 70%)' }} />

      {/* Bordure basse subtile */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent" aria-hidden="true" />

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6">
        {breadcrumb && <Breadcrumb items={breadcrumb} />}
        {marker && <div className="section-marker mb-2 mt-1" aria-hidden="true">{marker}</div>}
        <h1 className="reveal-item font-display text-navy mt-2">{title}</h1>
        {subtitle && (
          <p className="reveal-item text-navy/55 text-lg max-w-2xl mt-3" style={{ animationDelay: '80ms' }}>{subtitle}</p>
        )}
        {children}
      </div>
    </div>
  )
}
