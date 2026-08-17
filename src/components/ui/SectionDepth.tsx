/**
 * SECTION DEPTH — Système de décor de profondeur V4
 * Halos dérivants + grille filigrane + formes géométriques douces
 * Usage : <SectionDepth variant="warm" /> dans toute section claire
 */

type Variant = 'warm' | 'cool' | 'neutral' | 'electric' | 'gold'

const CONFIGS: Record<Variant, { halos: string[]; grid: string }> = {
  warm: {
    halos: [
      'radial-gradient(ellipse 600px 400px at 80% 10%, rgba(245,158,11,0.09) 0%, transparent 70%)',
      'radial-gradient(ellipse 400px 300px at 10% 80%, rgba(245,158,11,0.06) 0%, transparent 70%)',
      'radial-gradient(ellipse 300px 200px at 50% 50%, rgba(251,191,36,0.04) 0%, transparent 70%)',
    ],
    grid: 'rgba(30,58,95,0.025)',
  },
  cool: {
    halos: [
      'radial-gradient(ellipse 600px 400px at 20% 20%, rgba(45,125,210,0.09) 0%, transparent 70%)',
      'radial-gradient(ellipse 400px 300px at 85% 70%, rgba(45,125,210,0.06) 0%, transparent 70%)',
      'radial-gradient(ellipse 350px 250px at 50% 90%, rgba(30,58,95,0.05) 0%, transparent 70%)',
    ],
    grid: 'rgba(45,125,210,0.025)',
  },
  neutral: {
    halos: [
      'radial-gradient(ellipse 500px 350px at 75% 15%, rgba(245,158,11,0.06) 0%, transparent 70%)',
      'radial-gradient(ellipse 400px 300px at 20% 75%, rgba(45,125,210,0.06) 0%, transparent 70%)',
    ],
    grid: 'rgba(30,58,95,0.02)',
  },
  electric: {
    halos: [
      'radial-gradient(ellipse 700px 500px at 60% 0%, rgba(45,125,210,0.1) 0%, transparent 65%)',
      'radial-gradient(ellipse 400px 300px at 5% 90%, rgba(124,58,237,0.06) 0%, transparent 70%)',
    ],
    grid: 'rgba(45,125,210,0.03)',
  },
  gold: {
    halos: [
      'radial-gradient(ellipse 800px 500px at 50% 0%, rgba(245,158,11,0.1) 0%, transparent 65%)',
      'radial-gradient(ellipse 400px 300px at 90% 90%, rgba(245,158,11,0.06) 0%, transparent 70%)',
      'radial-gradient(ellipse 300px 200px at 10% 50%, rgba(251,191,36,0.05) 0%, transparent 70%)',
    ],
    grid: 'rgba(245,158,11,0.025)',
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
      {/* Halos dégradés */}
      {cfg.halos.map((bg, i) => (
        <div
          key={i}
          className="absolute inset-0"
          style={{ background: bg }}
        />
      ))}
      {/* Grille en filigrane */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `linear-gradient(${cfg.grid} 1px, transparent 1px), linear-gradient(90deg, ${cfg.grid} 1px, transparent 1px)`,
          backgroundSize: '40px 40px',
        }}
      />
    </div>
  )
}
