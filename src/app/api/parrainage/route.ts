/**
 * L'API de parrainage.
 *
 * Elle interpolait cinq champs du client directement dans le corps HTML d'un
 * e-mail, sans validation ni échappement. Moins exposée que `/api/contact`
 * (le destinataire était constant et aucun corps complet n'était accepté),
 * mais le même principe s'applique : rien de ce qui vient du navigateur
 * n'entre dans un gabarit sans être validé puis échappé.
 *
 * Le rappel de la récompense est désormais lu dans `SITE.parrainage`, source
 * unique : quatre versions de cette condition coexistaient sur le site
 * (1 mois Premium, −10 %, « 1 mois de maintenance », « 200 € » dans l'image
 * Open Graph).
 */
import { NextResponse } from 'next/server'
import { Resend } from 'resend'
import { z } from 'zod'
import { SITE } from '@/config/site'

const Corps = z.object({
  parrain_nom: z.string().min(1).max(120),
  parrain_email: z.string().email().max(200),
  filleul_nom: z.string().min(1).max(120),
  filleul_email: z.string().email().max(200),
  message: z.string().max(3000).optional().or(z.literal('')),
})

function echapper(v: string): string {
  return v
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

const FENETRE_MS = 60_000
const MAX_PAR_FENETRE = 3
const traces = new Map<string, number[]>()

function tropDeRequetes(ip: string): boolean {
  const maintenant = Date.now()
  const recentes = (traces.get(ip) ?? []).filter((t) => maintenant - t < FENETRE_MS)
  recentes.push(maintenant)
  traces.set(ip, recentes)
  if (traces.size > 500) {
    for (const [cle, ts] of traces) {
      if (!ts.some((t) => maintenant - t < FENETRE_MS)) traces.delete(cle)
    }
  }
  return recentes.length > MAX_PAR_FENETRE
}

export async function POST(req: Request) {
  const ip =
    req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
    req.headers.get('x-real-ip') ||
    'inconnue'
  if (tropDeRequetes(ip)) {
    return NextResponse.json(
      { error: 'Trop de demandes. Réessayez dans une minute.' },
      { status: 429 },
    )
  }

  let brut: unknown
  try {
    brut = await req.json()
  } catch {
    return NextResponse.json({ error: 'Corps de requête illisible.' }, { status: 400 })
  }

  const lu = Corps.safeParse(brut)
  if (!lu.success) {
    return NextResponse.json(
      {
        error: 'Données invalides.',
        details: lu.error.issues.map((i) => ({ champ: i.path.join('.'), message: i.message })),
      },
      { status: 400 },
    )
  }
  const d = lu.data

  const cle = process.env.RESEND_API_KEY
  if (!cle) {
    return NextResponse.json({ error: 'Service d’envoi non configuré.' }, { status: 503 })
  }
  const resend = new Resend(cle)

  const { error } = await resend.emails.send({
    from: 'Stackup Agency <contact@stackup-agency.fr>',
    to: 'contact@stackup-agency.fr',
    replyTo: d.parrain_email,
    subject: `Nouveau parrainage — ${d.parrain_nom} → ${d.filleul_nom}`.slice(0, 160),
    html: [
      '<h2 style="font-family:system-ui,sans-serif">Nouveau parrainage — stackup-agency.fr</h2>',
      '<h3>Parrain</h3>',
      `<p style="margin:0 0 8px"><strong>Nom :</strong> ${echapper(d.parrain_nom)}</p>`,
      `<p style="margin:0 0 8px"><strong>E-mail :</strong> ${echapper(d.parrain_email)}</p>`,
      '<h3>Filleul</h3>',
      `<p style="margin:0 0 8px"><strong>Nom :</strong> ${echapper(d.filleul_nom)}</p>`,
      `<p style="margin:0 0 8px"><strong>E-mail :</strong> ${echapper(d.filleul_email)}</p>`,
      d.message
        ? `<h3>Message</h3><p>${echapper(d.message).split(/\n+/).filter(Boolean).join('<br />')}</p>`
        : '',
      '<hr />',
      `<p><em>Rappel : le filleul bénéficie de −${SITE.parrainage.filleulRemise} % sur son projet ; le parrain reçoit ${echapper(SITE.parrainage.parrainRecompense)} à la signature.</em></p>`,
    ]
      .filter(Boolean)
      .join('\n'),
  })

  if (error) {
    return NextResponse.json({ error: 'Envoi impossible.' }, { status: 502 })
  }
  return NextResponse.json({ success: true })
}
