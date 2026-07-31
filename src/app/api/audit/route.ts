import { NextResponse } from 'next/server'

// PAGESPEED_API_KEY est lue côté serveur UNIQUEMENT — jamais envoyée au client
const API_KEY = process.env.PAGESPEED_API_KEY

export async function POST(req: Request) {
  try {
    const { url } = await req.json()

    if (!url || typeof url !== 'string') {
      return NextResponse.json({ error: 'URL manquante' }, { status: 400 })
    }

    // Validation basique de l'URL
    let parsedUrl: URL
    try {
      parsedUrl = new URL(url.startsWith('http') ? url : `https://${url}`)
    } catch {
      return NextResponse.json({ error: 'URL invalide' }, { status: 400 })
    }

    if (!API_KEY) {
      return NextResponse.json({ error: 'Service temporairement indisponible' }, { status: 503 })
    }

    const psiUrl = `https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=${encodeURIComponent(parsedUrl.href)}&strategy=mobile&category=performance&category=accessibility&category=seo&key=${API_KEY}`

    const psiRes = await fetch(psiUrl, { next: { revalidate: 0 } })

    if (!psiRes.ok) {
      if (psiRes.status === 400) return NextResponse.json({ error: 'URL inaccessible ou introuvable' }, { status: 400 })
      if (psiRes.status === 429) return NextResponse.json({ error: 'Limite d\'appels atteinte, réessayez dans quelques minutes' }, { status: 429 })
      return NextResponse.json({ error: `Erreur PageSpeed (${psiRes.status})` }, { status: 500 })
    }

    const data = await psiRes.json()

    const cats = data.lighthouseResult?.categories ?? {}
    const audits = data.lighthouseResult?.audits ?? {}

    const score = (key: string) => Math.round((cats[key]?.score ?? 0) * 100)

    // Opportunités triées par économie potentielle
    const opportunities = Object.values(audits)
      .filter((a: unknown) => {
        const audit = a as { details?: { type?: string }; score?: number | null }
        return audit?.details?.type === 'opportunity' && audit.score !== null && (audit.score as number) < 1
      })
      .map((a: unknown) => {
        const audit = a as { id: string; title: string; description: string; displayValue?: string; details?: { overallSavingsMs?: number } }
        return {
          id: audit.id,
          title: audit.title,
          description: audit.description,
          displayValue: audit.displayValue ?? '',
          savings: audit.details?.overallSavingsMs ?? 0,
        }
      })
      .sort((a, b) => b.savings - a.savings)
      .slice(0, 6)

    // LCP, FID/INP, CLS
    const lcp = audits['largest-contentful-paint']?.displayValue ?? null
    const cls = audits['cumulative-layout-shift']?.displayValue ?? null
    const tbt = audits['total-blocking-time']?.displayValue ?? null

    return NextResponse.json({
      url: parsedUrl.href,
      scores: {
        performance: score('performance'),
        accessibility: score('accessibility'),
        seo: score('seo'),
      },
      metrics: { lcp, cls, tbt },
      opportunities,
    })
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 })
  }
}
