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

export default function MiniHero({ title, subtitle, breadcrumb, children, marker }: Props) {
  return (
    <div className="relative bg-[#070B16] pt-24 pb-16 overflow-hidden scanline-section">
      {/* Perspective grid */}
      <div className="persp-grid absolute inset-0 opacity-60" aria-hidden="true" />

      {/* Halo radial */}
      <div className="pointer-events-none absolute top-0 right-1/4 w-96 h-48 rounded-full"
        aria-hidden="true"
        style={{ background: 'radial-gradient(ellipse, rgba(45,125,210,0.07) 0%, transparent 70%)' }} />

      {/* Bottom border */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-electric/20 to-transparent" aria-hidden="true" />

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6">
        {breadcrumb && <Breadcrumb items={breadcrumb} />}
        {marker && <div className="section-marker mb-2 mt-1" aria-hidden="true">{marker}</div>}
        <h1 className="reveal-item font-display text-white mt-2">{title}</h1>
        {subtitle && (
          <p className="reveal-item text-white/60 text-lg max-w-2xl mt-3" style={{ animationDelay: '80ms' }}>{subtitle}</p>
        )}
        {children}
      </div>
    </div>
  )
}
