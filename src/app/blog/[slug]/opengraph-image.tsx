import { ImageResponse } from 'next/og'
import { getAllPosts } from '@/lib/blog'

export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export function generateImageMetadata({ params }: { params: { slug: string } }) {
  const posts = getAllPosts()
  const post = posts.find(p => p.slug === params.slug)
  return [{ id: params.slug, alt: post?.title ?? 'Article Stackup Agency' }]
}

export default function Image({ params }: { params: { slug: string } }) {
  const posts = getAllPosts()
  const post = posts.find(p => p.slug === params.slug)
  const title = post?.title ?? 'Blog Stackup Agency'
  const tag = post?.tag ?? 'Blog'

  return new ImageResponse(
    (
      <div
        style={{
          background: 'linear-gradient(135deg, #0F172A 0%, #1E3A5F 55%, #0A0F1C 100%)',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          padding: '60px',
          fontFamily: 'system-ui, sans-serif',
        }}
      >
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '48px' }}>
          <div
            style={{
              width: '48px',
              height: '48px',
              borderRadius: '12px',
              background: 'linear-gradient(135deg, #2D7DD2, #1E3A5F)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '28px',
              fontWeight: 900,
              color: '#fff',
            }}
          >
            S
          </div>
          <span style={{ fontSize: '24px', fontWeight: 700, color: 'rgba(255,255,255,0.7)' }}>
            Stackup Agency
          </span>
          <div
            style={{
              marginLeft: '16px',
              padding: '4px 14px',
              background: 'rgba(45, 125, 210, 0.25)',
              border: '1px solid rgba(45, 125, 210, 0.5)',
              borderRadius: '20px',
              fontSize: '14px',
              color: '#7DB8F0',
              fontWeight: 600,
            }}
          >
            {tag}
          </div>
        </div>

        {/* Title */}
        <div
          style={{
            flex: 1,
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <div
            style={{
              fontSize: title.length > 60 ? '42px' : '52px',
              fontWeight: 800,
              color: '#FFFFFF',
              lineHeight: 1.2,
              maxWidth: '960px',
            }}
          >
            {title}
          </div>
        </div>

        {/* Footer */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            borderTop: '1px solid rgba(255,255,255,0.1)',
            paddingTop: '24px',
          }}
        >
          <span style={{ fontSize: '18px', color: 'rgba(255,255,255,0.4)' }}>
            stackup-agency.fr/blog
          </span>
          <span style={{ fontSize: '16px', color: '#F59E0B', fontWeight: 600 }}>
            Agence web à Tours — à partir de 449€
          </span>
        </div>
      </div>
    ),
    { ...size }
  )
}
