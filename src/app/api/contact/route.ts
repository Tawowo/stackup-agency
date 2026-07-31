import { Resend } from 'resend'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  const resend = new Resend(process.env.RESEND_API_KEY!)
  try {
    const body = await req.json()

    const { name, email, phone, project, message, subject, html, confirmHtml, src } = body

    // Email interne (équipe)
    const internalHtml = html || `
      <h2>Nouveau message depuis stackup-agency.fr</h2>
      <p><strong>Nom :</strong> ${name}</p>
      <p><strong>Email :</strong> ${email}</p>
      <p><strong>Téléphone :</strong> ${phone || 'Non renseigné'}</p>
      <p><strong>Type de projet :</strong> ${project || 'Non précisé'}</p>
      <p><strong>Message :</strong><br>${message}</p>
      ${src ? `<p><strong>Source :</strong> ${src}</p>` : ''}
    `

    const { error } = await resend.emails.send({
      from: 'Stackup Agency <contact@stackup-agency.fr>',
      to: 'contact@stackup-agency.fr',
      replyTo: email,
      subject: subject || `Nouveau contact — ${project || 'Non précisé'} — ${name}`,
      html: internalHtml,
    })

    if (error) {
      return NextResponse.json({ error }, { status: 400 })
    }

    // Email de confirmation au prospect
    if (email && confirmHtml) {
      await resend.emails.send({
        from: 'Stackup Agency <contact@stackup-agency.fr>',
        to: email,
        subject: 'Votre demande a bien été reçue — Stackup Agency',
        html: confirmHtml,
      }).catch(() => { /* non bloquant */ })
    }

    return NextResponse.json({ ok: true })
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 })
  }
}
