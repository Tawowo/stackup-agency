import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'

export async function POST(req: NextRequest) {
  const resend = new Resend(process.env.RESEND_API_KEY!)
  try {
    const { parrain_nom, parrain_email, filleul_nom, filleul_email, message } = await req.json()

    const { error } = await resend.emails.send({
      from: 'Stackup Agency <contact@stackup-agency.fr>',
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
        <p><em>Rappel : à la signature du projet du filleul, le parrain choisit sa récompense — 1 mois d'abonnement Premium (89 €) offert ou −10 % sur sa propre prestation non encore signée. Le filleul bénéficie de −10 % sur son projet.</em></p>
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
