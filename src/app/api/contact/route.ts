import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'

const resend = new Resend('re_fKNfkhxL_88xFyednhBqBy24b43Vh29xV')

export async function POST(req: NextRequest) {
  try {
    const { name, email, phone, project, message } = await req.json()

    const { error } = await resend.emails.send({
      from: 'Stackup Agency <contact@stackup-agency.fr>',
      to: 'contact@stackup-agency.fr',
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
      console.error('Resend error:', error)
      return NextResponse.json({ error: 'Email send failed' }, { status: 500 })
    }

    console.log(`Contact email sent: ${name} <${email}> — ${project}`)
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Contact API error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
