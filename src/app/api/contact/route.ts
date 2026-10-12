/**
 * L'API de contact et de devis.
 *
 * CE QU'ELLE FAISAIT AVANT, ET POURQUOI C'ÉTAIT GRAVE.
 *
 * Elle acceptait trois champs du client et les relayait tels quels à Resend :
 * `html` (le corps de l'e-mail interne), `confirmHtml` (le corps de l'e-mail
 * envoyé au prospect) et `subject`. N'importe qui pouvant envoyer une requête
 * POST — c'est-à-dire n'importe qui — pouvait donc faire partir, DEPUIS
 * `contact@stackup-agency.fr`, un e-mail au contenu et au sujet de son choix,
 * vers une adresse de son choix (le champ `email` servait de destinataire de
 * la confirmation). C'est un relais ouvert signé par le domaine de l'agence :
 * de quoi faire classer ce domaine en expéditeur de hameçonnage.
 *
 * CE QU'ELLE FAIT MAINTENANT.
 *
 * Elle reçoit des DONNÉES, jamais du balisage, les valide avec zod, et
 * compose les deux e-mails ici, côté serveur, à partir de gabarits fixes.
 * Toute valeur insérée passe par `echapper()`. Le destinataire interne est
 * constant ; la confirmation ne part que vers l'adresse validée du
 * formulaire.
 *
 * Une limitation de débit simple en mémoire complète le dispositif : elle ne
 * survit pas à un redémarrage de la fonction et ne prétend pas être une
 * protection sérieuse contre un attaquant distribué, mais elle arrête le cas
 * courant — une boucle depuis une seule adresse.
 */
import { Resend } from 'resend'
import { NextResponse } from 'next/server'
import { z } from 'zod'
import { SITE } from '@/config/site'

/** Un couple étiquette/valeur du récapitulatif de devis. Texte seul. */
const Ligne = z.object({
  label: z.string().min(1).max(80),
  valeur: z.string().max(600),
})

const Corps = z.object({
  name: z.string().min(1, 'Nom requis').max(120),
  email: z.string().email('Adresse e-mail invalide').max(200),
  phone: z.string().max(40).optional().or(z.literal('')),
  project: z.string().max(120).optional().or(z.literal('')),
  message: z.string().max(5000).optional().or(z.literal('')),
  /** D'où vient le prospect (page, outil). Jamais affiché au prospect. */
  src: z.string().max(200).optional().or(z.literal('')),
  /** Type de demande : décide du gabarit, pas le client du contenu. */
  type: z.enum(['contact', 'devis']).default('contact'),
  /** Récapitulatif structuré d'un devis. Remplace l'ancien `html`. */
  recapitulatif: z.array(Ligne).max(30).optional(),
  rgpd: z.boolean().optional(),
})

/** Échappe tout ce qui entre dans un gabarit HTML. */
function echapper(v: string): string {
  return v
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

/** Les sauts de ligne d'un message libre, une fois le texte échappé. */
function paragraphes(v: string): string {
  return echapper(v).split(/\n+/).filter(Boolean).join('<br />')
}

function ligne(label: string, valeur: string): string {
  return `<p style="margin:0 0 8px"><strong>${echapper(label)} :</strong> ${echapper(valeur)}</p>`
}

/* ── Limitation de débit, en mémoire ─────────────────────────────────────── */

const FENETRE_MS = 60_000
const MAX_PAR_FENETRE = 5
const traces = new Map<string, number[]>()

function tropDeRequetes(ip: string): boolean {
  const maintenant = Date.now()
  const recentes = (traces.get(ip) ?? []).filter((t) => maintenant - t < FENETRE_MS)
  recentes.push(maintenant)
  traces.set(ip, recentes)
  // Purge : sans elle, la table grossit indéfiniment sur une fonction longue.
  if (traces.size > 500) {
    for (const [cle, ts] of traces) {
      if (!ts.some((t) => maintenant - t < FENETRE_MS)) traces.delete(cle)
    }
  }
  return recentes.length > MAX_PAR_FENETRE
}

/* ── Gabarits, côté serveur uniquement ───────────────────────────────────── */

function courrielInterne(d: z.infer<typeof Corps>): { sujet: string; html: string } {
  const titre = d.type === 'devis' ? 'Nouveau devis express' : 'Nouveau message'
  const corps = [
    `<h2 style="font-family:system-ui,sans-serif">${titre} — stackup-agency.fr</h2>`,
    ligne('Nom', d.name),
    ligne('E-mail', d.email),
    ligne('Téléphone', d.phone || 'non renseigné'),
    d.project ? ligne('Type de projet', d.project) : '',
    ...(d.recapitulatif?.length
      ? ['<hr />', ...d.recapitulatif.map((l) => ligne(l.label, l.valeur))]
      : []),
    d.message ? `<hr /><p style="margin:0 0 8px"><strong>Message :</strong><br />${paragraphes(d.message)}</p>` : '',
    d.src ? `<hr />${ligne('Source', d.src)}` : '',
  ]
  return {
    sujet: `${titre} — ${d.project || 'sans type'} — ${d.name}`.slice(0, 160),
    html: corps.filter(Boolean).join('\n'),
  }
}

function courrielConfirmation(d: z.infer<typeof Corps>): { sujet: string; html: string } {
  const quoi =
    d.type === 'devis'
      ? `votre demande de devis${d.project ? ` pour un ${echapper(d.project)}` : ''}`
      : 'votre message'
  return {
    sujet: 'Votre demande a bien été reçue — Stackup Agency',
    html: [
      '<h2 style="font-family:system-ui,sans-serif">Bien reçu</h2>',
      `<p>Bonjour ${echapper(d.name)},</p>`,
      `<p>Nous avons bien reçu ${quoi}.</p>`,
      '<p>Nous vous répondrons sous <strong>72 heures</strong>.</p>',
      '<p>En attendant, vous pouvez consulter nos <a href="https://stackup-agency.fr/realisations">réalisations</a> ou la <a href="https://stackup-agency.fr/faq">foire aux questions</a>.</p>',
      `<p>Cordialement,<br />${echapper(SITE.signature)}</p>`,
    ].join('\n'),
  }
}

/* ── La route ────────────────────────────────────────────────────────────── */

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
    // Mieux vaut un 503 explicite qu'un échec silencieux côté Resend.
    return NextResponse.json({ error: 'Service d’envoi non configuré.' }, { status: 503 })
  }
  const resend = new Resend(cle)

  const interne = courrielInterne(d)
  const { error } = await resend.emails.send({
    from: 'Stackup Agency <contact@stackup-agency.fr>',
    to: 'contact@stackup-agency.fr',
    replyTo: d.email,
    subject: interne.sujet,
    html: interne.html,
  })

  if (error) {
    return NextResponse.json({ error: 'Envoi impossible.' }, { status: 502 })
  }

  const confirmation = courrielConfirmation(d)
  await resend.emails
    .send({
      from: 'Stackup Agency <contact@stackup-agency.fr>',
      to: d.email,
      subject: confirmation.sujet,
      html: confirmation.html,
    })
    .catch(() => {
      /* La confirmation au prospect n'est pas bloquante : le message interne
         est parti, la demande ne sera pas perdue. */
    })

  return NextResponse.json({ ok: true })
}
