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
}

export default function MiniHero({ title, subtitle, breadcrumb, children }: Props) {
  return (
    <div className="relative bg-gradient-to-b from-[#060D1A] to-[#0A0F1C] pt-24 pb-16 overflow-hidden">
      {/* Veine dorée décorative */}
      <svg
        aria-hidden="true"
        className="gold-vein absolute bottom-0 left-0 w-full"
        style={{ height: '120px' }}
        viewBox="0 0 1440 120"
        preserveAspectRatio="none"
      >
        <path
          d="M0,120 C240,80 480,30 720,60 C960,90 1200,30 1440,50"
          strokeWidth="1.5"
          style={{ opacity: 0.25 }}
        />
        <path
          d="M0,120 C360,70 700,50 1000,80 C1200,100 1360,60 1440,70"
          strokeWidth="1"
          style={{ opacity: 0.15 }}
        />
      </svg>

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6">
        {breadcrumb && <Breadcrumb items={breadcrumb} />}
        <h1 className="font-display text-white mt-2">{title}</h1>
        {subtitle && (
          <p className="text-white/70 text-lg max-w-2xl mt-3">{subtitle}</p>
        )}
        {children}
      </div>
    </div>
  )
}
