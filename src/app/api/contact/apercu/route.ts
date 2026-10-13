/** Aperçu du gabarit d'e-mail (hors production) : la preuve visuelle, faute de clé Resend. */
import { NextResponse } from 'next/server'
import { gabaritAccuse, gabaritContact } from '@/lib/email'
import type { Contact } from '@/lib/contact'

export async function GET(req: Request) {
  if (process.env.NODE_ENV === 'production' && process.env.VERCEL_ENV === 'production') return new NextResponse('Indisponible', { status: 404 })
  const d: Contact = {
    prenom: 'Camille',
    nom: 'Durand',
    entreprise: 'Menuiserie Durand',
    metier: 'Menuisier',
    objet: 'Site',
    projet: 'Un site pour mon atelier de menuiserie à Tours, avec une galerie de réalisations et un formulaire de devis.',
    email: 'camille@exemple.fr',
    telephone: '06 12 34 56 78',
    preference: 'telephone',
    rgpd: true,
    configuration: 'Type : Site multi-pages\nFonctions : Formulaire, Galerie, Prise de rendez-vous\nMaintenance : Pro, 44 €/mois\nPlancher : à partir de 749 €',
    site_web: '',
  }
  const quel = new URL(req.url).searchParams.get('quel')
  const g = quel === 'accuse' ? gabaritAccuse(d) : gabaritContact(d, { date: new Date('2026-10-13T10:00:00Z') })
  return new NextResponse(g.html, { headers: { 'content-type': 'text/html; charset=utf-8' } })
}
