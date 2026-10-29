/**
 * /api/clubs — estimation reçue par e-mail et demande de devis de l'offre « clubs de tennis ».
 * Validation zod, pot de miel, durée minimale (robots), limitation de débit par IP. Le prix est recalculé ici à
 * partir de l'état de la simulation. Le club reçoit son récapitulatif, Mathéo reçoit toutes les réponses.
 * Chaque demande est aussi écrite dans les journaux du serveur (ligne JSON « demande_club ») : voir docs/offre-clubs/README.md.
 */
import { NextResponse, type NextRequest } from 'next/server'
import { DemandeClubSchema, gabaritInterneClub, gabaritRecapClub } from '@/lib/clubs-demande'
import { creerLimite, envoyer } from '@/lib/limite'
import { SITE } from '@/config/site'
import { lireEtat, ecrireEtat } from '@/domain/clubs/etat'
import { simuler } from '@/domain/clubs/simulation'
import { lignesRecap } from '@/domain/clubs/resume'

const limite = creerLimite(5, 10 * 60 * 1000)

export async function POST(req: NextRequest) {
  const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'inconnue'
  if (limite(ip)) return NextResponse.json({ ok: false, erreur: 'Trop de demandes en peu de temps. Réessayez dans quelques minutes.' }, { status: 429 })
  let corps: unknown
  try {
    corps = await req.json()
  } catch {
    return NextResponse.json({ ok: false, erreur: 'Requête illisible.' }, { status: 400 })
  }
  const r = DemandeClubSchema.safeParse(corps)
  if (!r.success) {
    const champs: Record<string, string> = {}
    for (const issue of r.error.issues) {
      const k = String(issue.path[0] ?? '')
      if (k && !champs[k]) champs[k] = issue.message
    }
    return NextResponse.json({ ok: false, champs }, { status: 422 })
  }
  const d = r.data
  // Robot probable (rempli en moins de 2 secondes) : réponse normale, rien n'est envoyé.
  if (d.duree > 0 && d.duree < 2000) return NextResponse.json({ ok: true, envoye: false })

  const etat = lireEtat(new URLSearchParams(d.simulation))
  const resultat = simuler(etat.entree)
  const recap = lignesRecap(etat.club, etat.entree, resultat)
  const lien = `${SITE.url}/clubs-de-tennis/simulateur?${ecrireEtat(etat)}`
  const date = new Date()
  const club = gabaritRecapClub(d, recap, lien)
  const interne = gabaritInterneClub(d, recap, lien, { date, ip })
  console.info(JSON.stringify({ demande_club: d.type, club: etat.club.nom || undefined, categorie: resultat.categorie.id, formule: etat.entree.formule, email: d.email, date: date.toISOString() }))

  try {
    const destinataire = process.env.CONTACT_TO || SITE.email
    const envoye = await envoyer([
      { to: destinataire, subject: interne.sujet, html: interne.html, text: interne.texte, replyTo: d.email },
      { to: d.email, subject: club.sujet, html: club.html, text: club.texte },
    ])
    if (!envoye) {
      const apercu = process.env.NODE_ENV !== 'production' ? { apercu: { sujet: interne.sujet, texte: interne.texte, club: club.texte } } : {}
      return NextResponse.json({ ok: true, envoye: false, ...apercu }, { status: 202 })
    }
    return NextResponse.json({ ok: true, envoye: true })
  } catch (e) {
    console.error('[clubs] envoi impossible', e)
    return NextResponse.json({ ok: false, erreur: `L’envoi a échoué de notre côté. Écrivez-nous directement à ${SITE.email}` }, { status: 502 })
  }
}
