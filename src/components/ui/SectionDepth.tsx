/**
 * SECTION DEPTH V4.3 — Décor de profondeur visible
 * Opacités 15-25 % (vs 4-9 % avant), tailles généreuses
 * Usage : <SectionDepth variant="warm" /> dans toute section
 */

type Variant = 'warm' | 'cool' | 'neutral' | 'electric' | 'gold'

const CONFIGS: Record<Variant, { halos: string[]; grid: string }> = {
  warm: {
    halos: [
      'radial-gradient(ellipse 700px 450px at 85% 5%, rgba(245,158,11,0.18) 0%, transparent 65%)',
      'radial-gradient(ellipse 500px 350px at 8% 85%, rgba(245,158,11,0.12) 0%, transparent 65%)',
      'radial-gradient(ellipse 350px 250px at 50% 50%, rgba(251,191,36,0.07) 0%, transparent 60%)',
    ],
    grid: 'rgba(30,58,95,0.045)',
  },
  cool: {
    halos: [
      'radial-gradient(ellipse 700px 450px at 15% 10%, rgba(45,125,210,0.18) 0%, transparent 65%)',
      'radial-gradient(ellipse 500px 350px at 88% 75%, rgba(45,125,210,0.12) 0%, transparent 65%)',
      'radial-gradient(ellipse 400px 280px at 50% 95%, rgba(30,58,95,0.09) 0%, transparent 65%)',
    ],
    grid: 'rgba(45,125,210,0.045)',
  },
  neutral: {
    halos: [
      'radial-gradient(ellipse 600px 400px at 78% 10%, rgba(245,158,11,0.13) 0%, transparent 65%)',
      'radial-gradient(ellipse 500px 350px at 15% 80%, rgba(45,125,210,0.11) 0%, transparent 65%)',
    ],
    grid: 'rgba(30,58,95,0.038)',
  },
  electric: {
    halos: [
      'radial-gradient(ellipse 800px 550px at 65% 0%, rgba(45,125,210,0.20) 0%, transparent 60%)',
      'radial-gradient(ellipse 450px 300px at 3% 90%, rgba(124,58,237,0.13) 0%, transparent 65%)',
    ],
    grid: 'rgba(45,125,210,0.05)',
  },
  gold: {
    halos: [
      'radial-gradient(ellipse 900px 550px at 50% -5%, rgba(245,158,11,0.20) 0%, transparent 60%)',
      'radial-gradient(ellipse 500px 350px at 92% 92%, rgba(245,158,11,0.13) 0%, transparent 65%)',
      'radial-gradient(ellipse 350px 250px at 8% 55%, rgba(251,191,36,0.10) 0%, transparent 65%)',
    ],
    grid: 'rgba(245,158,11,0.045)',
  },
}

interface Props {
  variant?: Variant
  className?: string
}

export default function SectionDepth({ variant = 'neutral', className = '' }: Props) {
  const cfg = CONFIGS[variant]
  return (
    <div className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`} aria-hidden="true">
      {cfg.halos.map((bg, i) => (
        <div key={i} className="absolute inset-0" style={{ background: bg }} />
      ))}
      {/* Grille filigrane visible */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `linear-gradient(${cfg.grid} 1px, transparent 1px), linear-gradient(90deg, ${cfg.grid} 1px, transparent 1px)`,
          backgroundSize: '44px 44px',
        }}
      />
    </div>
  )
}
