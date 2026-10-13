/**
 * /api/audit — mesure Google PageSpeed Insights d'une adresse (voir
 * src/lib/audit.ts). Validation zod, limitation de débit par IP pour ménager
 * le quota Google. La clé PAGESPEED_API_KEY ne quitte jamais le serveur.
 */
import { NextResponse, type NextRequest } from 'next/server'
import { z } from 'zod'
import { auditer } from '@/lib/audit'

export const maxDuration = 60

const Corps = z.object({ url: z.string().trim().min(3).max(500) })

const FENETRE_MS = 10 * 60 * 1000
const MAX_PAR_FENETRE = 8
const compteurs = new Map<string, number[]>()

function limite(ip: string): boolean {
  const now = Date.now()
  const liste = (compteurs.get(ip) ?? []).filter((t) => now - t < FENETRE_MS)
  if (liste.length >= MAX_PAR_FENETRE) return true
  liste.push(now)
  compteurs.set(ip, liste)
  if (compteurs.size > 5000) compteurs.clear()
  return false
}

export async function POST(req: NextRequest) {
  const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'inconnue'
  if (limite(ip)) return NextResponse.json({ ok: false, statut: 429, erreur: 'Beaucoup de mesures en peu de temps. Réessayez dans quelques minutes.' }, { status: 429 })

  const r = Corps.safeParse(await req.json().catch(() => null))
  if (!r.success) return NextResponse.json({ ok: false, statut: 400, erreur: 'Indiquez l’adresse du site à mesurer. Exemple : mon-site.fr' }, { status: 400 })

  const reponse = await auditer(r.data.url)
  return NextResponse.json(reponse, { status: reponse.ok ? 200 : reponse.statut })
}
