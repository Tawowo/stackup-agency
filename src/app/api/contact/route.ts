import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const { name, email, phone, project, message } = await req.json()

    const accountSid = process.env.TWILIO_ACCOUNT_SID
    const authToken = process.env.TWILIO_AUTH_TOKEN
    const fromNumber = process.env.TWILIO_PHONE_NUMBER
    const toNumber = '+33764020898'

    const smsBody = `🔔 Nouveau contact Stackup Agency\n\nNom: ${name}\nEmail: ${email}\nTél: ${phone || 'Non renseigné'}\nProjet: ${project || 'Non précisé'}\n\nMessage: ${message}`

    if (accountSid && authToken && fromNumber) {
      const twilioUrl = `https://api.twilio.com/2010-04-01/Accounts/${accountSid}/Messages.json`
      const credentials = Buffer.from(`${accountSid}:${authToken}`).toString('base64')

      const twilioRes = await fetch(twilioUrl, {
        method: 'POST',
        headers: {
          'Authorization': `Basic ${credentials}`,
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
          From: fromNumber,
          To: toNumber,
          Body: smsBody,
        }),
      })

      if (!twilioRes.ok) {
        const err = await twilioRes.text()
        console.error('Twilio error:', err)
      }
    } else {
      console.log('Twilio not configured. Would send SMS:', smsBody)
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Contact API error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
