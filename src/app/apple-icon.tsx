import { ImageResponse } from 'next/og'

export const size = { width: 180, height: 180 }
export const contentType = 'image/png'

export default function AppleIcon() {
  return new ImageResponse(
    <div style={{
      background: '#1E3A5F',
      width: '100%',
      height: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: '36px',
    }}>
      <div style={{
        color: '#F59E0B',
        fontSize: 110,
        fontWeight: 'bold',
      }}>S</div>
    </div>
  )
}
