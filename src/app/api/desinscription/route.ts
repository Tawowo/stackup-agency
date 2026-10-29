/**
 * /api/desinscription — demande d'opposition à la prospection par e-mail. L'adresse est transmise à Mathéo (e-mail)
 * et écrite dans les journaux du serveur (ligne JSON « opposition »), pour être ajoutée à la liste d'opposition.
 */
import { NextResponse, type NextRequest } from 'next/server'
import { DesinscriptionSchema } from '@/lib/clubs-demande'
import { echapper } from '@/lib/email'
import { creerLimite, envoyer } from '@/lib/limite'
import { SITE } from '@/config/site'

const limite = creerLimite(5, 10 * 60 * 1000)

export async function POST(req: NextRequest) {
  const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'inconnue'
  if (limite(ip)) return NextResponse.json({ ok: false, erreur: 'Trop de demandes. Réessayez dans quelques minutes.' }, { status: 429 })
  let corps: unknown
  try {
    corps = await req.json()
  } catch {
    return NextResponse.json({ ok: false, erreur: 'Requête illisible.' }, { status: 400 })
  }
  const r = DesinscriptionSchema.safeParse(corps)
  if (!r.success) return NextResponse.json({ ok: false, champs: { email: r.error.issues[0]?.message ?? 'Adresse invalide.' } }, { status: 422 })
  const date = new Date().toISOString()
  console.info(JSON.stringify({ opposition: r.data.email.toLowerCase(), date }))
  try {
    await envoyer([
      {
        to: process.env.CONTACT_TO || SITE.email,
        subject: `[Opposition] ${r.data.email} ne souhaite plus recevoir d’e-mails`,
        html: `<p>Demande d’opposition à la prospection reçue le ${echapper(new Date().toLocaleString('fr-FR', { timeZone: 'Europe/Paris' }))} :</p><p><strong>${echapper(r.data.email)}</strong></p><p>À ajouter à la liste d’opposition et à retirer de tout envoi.</p>`,
        text: `Demande d’opposition à la prospection : ${r.data.email} (${date}). À ajouter à la liste d’opposition.`,
      },
    ])
  } catch (e) {
    console.error('[desinscription] envoi impossible', e)
  }
  // La demande est enregistrée dans les journaux même si l'e-mail n'a pas pu partir.
  return NextResponse.json({ ok: true })
}
