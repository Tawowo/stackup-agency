/**
 * /desinscription — opposition à la prospection par e-mail : une adresse, un bouton, la demande part à Mathéo.
 */
import Link from 'next/link'
import Document from '@/gabarits/document/Document'
import Desinscription from './Desinscription'
import { meta } from '@/lib/seo'
import { SITE } from '@/config/site'

export const metadata = meta({
  titre: 'Ne plus recevoir nos e-mails',
  description: 'Vous ne souhaitez plus recevoir d’e-mails de présentation de Stackup Agency ? Indiquez votre adresse : elle est ajoutée à notre liste d’opposition.',
  chemin: '/desinscription',
  noindex: true,
})

export default async function Page({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const q = await searchParams
  const email = typeof q.email === 'string' ? q.email.slice(0, 200) : ''
  return (
    <Document moment="doc-desinscription" etiquette="Désinscription" titre="Ne plus recevoir nos e-mails" chapo="Indiquez l’adresse qui a reçu notre message. Elle est ajoutée à notre liste d’opposition : vous ne recevrez plus d’e-mail de présentation de notre part.">
      <Desinscription email={email} />
      <p>
        Vous pouvez aussi écrire à <a href={`mailto:${SITE.email}?subject=Opposition`}>{SITE.email}</a>. Ce que nous faisons de ces adresses est expliqué dans la <Link href="/politique-confidentialite#prospection">politique de confidentialité</Link>.
      </p>
    </Document>
  )
}
