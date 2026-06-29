import { Resend } from 'resend'
import { NextResponse } from 'next/server'

const resend = new Resend('re_fKNfkhxL_88xFyednhBqBy24b43Vh29xV')

export async function POST(req: Request) {
  try {
    const body = await req.json()
    console.log('Body reçu:', JSON.stringify(body))

    const { name, email, phone, project, message } = body

    const { data, error } = await resend.emails.send({
      from: 'Stackup Agency <contact@stackup-agency.fr>',
      to: 'contact@stackup-agency.fr',
      replyTo: email,
      subject: `Nouveau contact — ${project || 'Non précisé'} — ${name}`,
      html: `
        <h2>Nouveau message depuis stackup-agency.fr</h2>
        <p><strong>Nom :</strong> ${name}</p>
        <p><strong>Email :</strong> ${email}</p>
        <p><strong>Téléphone :</strong> ${phone || 'Non renseigné'}</p>
        <p><strong>Type de projet :</strong> ${project || 'Non précisé'}</p>
        <p><strong>Message :</strong><br>${message}</p>
      `,
    })

    if (error) {
      console.error('Resend error détaillé:', JSON.stringify(error))
      return NextResponse.json({ error }, { status: 400 })
    }

    console.log('Email envoyé avec succès, id:', data?.id)
    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('Contact error (catch):', String(err))
    return NextResponse.json({ error: String(err) }, { status: 500 })
  }
}
