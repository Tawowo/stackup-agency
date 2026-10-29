/**
 * /api/mesure — reçoit les événements anonymes de lib/mesure.ts et les écrit dans les journaux du serveur (une ligne JSON).
 * Rien n'est stocké ailleurs, ni adresse IP, ni agent utilisateur, ni cookie. Se lit dans les journaux Vercel (filtre « mesure »).
 */
import { NextResponse, type NextRequest } from 'next/server'
import { z } from 'zod'

const Schema = z.object({
  e: z.enum(['vue', 'estimation_lancee', 'contact_envoye', 'clic_telephone', 'clic_email', 'clic_demo', 'clic_appel', 'telechargement', 'clubs_demo', 'clubs_simulateur_commence', 'clubs_simulateur_termine', 'clubs_devis']),
  p: z.string().max(200).regex(/^\/[A-Za-z0-9\-_/.]*$/),
  o: z.string().max(80).regex(/^[a-z0-9.-]*$/i).optional(),
  x: z.string().max(60).optional(),
  /** Page d'entrée de la session. */
  l: z.string().max(200).regex(/^(\/[A-Za-z0-9\-_/.]*)?$/).optional(),
  /** Campagne : « utm_source|utm_medium|utm_campaign » (lettres, chiffres, . _ -). */
  u: z.string().max(130).regex(/^[\w.-]*\|[\w.-]*\|[\w.-]*$/).optional(),
})

export async function POST(req: NextRequest) {
  try {
    const r = Schema.safeParse(JSON.parse(await req.text()))
    if (r.success) console.log(JSON.stringify({ mesure: r.data.e, page: r.data.p, origine: r.data.o || undefined, detail: r.data.x || undefined, entree: r.data.l || undefined, campagne: r.data.u || undefined, date: new Date().toISOString().slice(0, 10) }))
  } catch {}
  return new NextResponse(null, { status: 204 })
}
