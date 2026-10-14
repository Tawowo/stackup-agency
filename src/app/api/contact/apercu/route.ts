/** Aperçu du gabarit d'e-mail (hors production) : la preuve visuelle, faute de clé Resend. */
import { NextResponse } from 'next/server'
import { gabaritAccuse, gabaritContact } from '@/lib/email'
import type { Contact } from '@/lib/contact'
import { encoder } from '@/domain/devis/etat'
import { HYDREAUX_SCAN } from '@/domain/devis/exemples'
import { blocInterne, fourchetteTexte, resumeTexte } from '@/domain/devis/resume'
import { calculer } from '@/domain/devis/calcul'

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
    configuration: `${resumeTexte(HYDREAUX_SCAN)}\nCréation ${fourchetteTexte(calculer(HYDREAUX_SCAN))}`,
    estimation: encoder({ cfg: HYDREAUX_SCAN, metier: '', etape: 10 }),
    action: 'demo',
    site_web: '',
  }
  const quel = new URL(req.url).searchParams.get('quel')
  const g = quel === 'accuse' ? gabaritAccuse(d, fourchetteTexte(calculer(HYDREAUX_SCAN))) : gabaritContact(d, { date: new Date('2026-10-13T10:00:00Z'), interne: blocInterne(HYDREAUX_SCAN) })
  return new NextResponse(g.html, { headers: { 'content-type': 'text/html; charset=utf-8' } })
}
