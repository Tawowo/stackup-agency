import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'

const resend = new Resend('re_fKNfkhxL_88xFyednhBqBy24b43Vh29xV')

export async function POST(req: NextRequest) {
  try {
    const { parrain_nom, parrain_email, filleul_nom, filleul_email, message } = await req.json()

    const { error } = await resend.emails.send({
      from: 'Stackup Agency <onboarding@resend.dev>',
      to: 'contact@stackup-agency.fr',
      subject: `Nouveau parrainage — ${parrain_nom} → ${filleul_nom}`,
      html: `
        <h2>Nouveau parrainage depuis stackup-agency.fr</h2>
        <h3>Parrain</h3>
        <p><strong>Nom :</strong> ${parrain_nom}</p>
        <p><strong>Email :</strong> ${parrain_email}</p>
        <h3>Filleul</h3>
        <p><strong>Nom :</strong> ${filleul_nom}</p>
        <p><strong>Email :</strong> ${filleul_email}</p>
        ${message ? `<h3>Message</h3><p>${message}</p>` : ''}
        <hr>
        <p><em>Rappel : le parrain reçoit 1 mois de maintenance offert, le filleul bénéficie de -10% sur son projet.</em></p>
      `,
    })

    if (error) {
      console.error('Resend error:', error)
      return NextResponse.json({ error: 'Email send failed' }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Parrainage API error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
