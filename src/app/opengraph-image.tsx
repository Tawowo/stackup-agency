import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt = 'Stackup Agency — Votre vision. Notre code.'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: 'linear-gradient(135deg, #0F172A 0%, #1E3A5F 50%, #0A0F1C 100%)',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '60px',
          fontFamily: 'system-ui, sans-serif',
        }}
      >
        {/* Logo S mark */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '32px' }}>
          <div
            style={{
              width: '64px',
              height: '64px',
              borderRadius: '16px',
              background: 'linear-gradient(135deg, #2D7DD2, #1E3A5F)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '36px',
              fontWeight: 900,
              color: '#fff',
            }}
          >
            S
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span style={{ fontSize: '48px', fontWeight: 800, color: '#FFFFFF', lineHeight: 1 }}>
              Stackup Agency
            </span>
          </div>
        </div>

        <div
          style={{
            fontSize: '36px',
            fontWeight: 700,
            color: '#F59E0B',
            marginBottom: '24px',
            letterSpacing: '-0.5px',
          }}
        >
          Votre vision. Notre code.
        </div>

        <div
          style={{
            fontSize: '22px',
            color: 'rgba(148, 163, 184, 0.9)',
            textAlign: 'center',
            maxWidth: '700px',
            lineHeight: 1.5,
          }}
        >
          Création de sites web · Applications · Systèmes de gestion sur mesure
        </div>

        {/* Bottom bar */}
        <div
          style={{
            position: 'absolute',
            bottom: '40px',
            display: 'flex',
            gap: '32px',
            color: 'rgba(255,255,255,0.4)',
            fontSize: '16px',
          }}
        >
          <span>Devis gratuit 24h</span>
          <span>·</span>
          <span>À partir de 490€</span>
          <span>·</span>
          <span>contact@stackup-agency.fr</span>
        </div>
      </div>
    ),
    { ...size }
  )
}
