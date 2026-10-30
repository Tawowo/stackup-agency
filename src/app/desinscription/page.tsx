import Link from 'next/link'
import Document from '@/gabarits/document/Document'
import Desinscription from '@/experiences/clubs/Desinscription'
import { JsonLd, filAriane, meta } from '@/lib/seo'

export const metadata = meta({
  titre: 'Ne plus recevoir de messages de prospection',
  description: 'Indiquez votre adresse e-mail pour ne plus recevoir de message de présentation de Stackup Agency : votre demande est prise en compte et vous recevez une confirmation.',
  chemin: '/desinscription',
  noindex: true,
})

export default function Page() {
  return (
    <>
      <JsonLd data={filAriane([{ nom: 'Accueil', chemin: '/' }, { nom: 'Désinscription', chemin: '/desinscription' }])} />
      <Document
        moment="doc-desinscription"
        ariane={[
          { href: '/', nom: 'Accueil' },
          { href: '/desinscription', nom: 'Désinscription' },
        ]}
        etiquette="Prospection"
        titre="Ne plus recevoir nos messages"
        chapo="Vous avez reçu un message de présentation de Stackup Agency et vous ne souhaitez pas en recevoir d’autres ? Indiquez votre adresse : c’est immédiat, gratuit et sans justification."
        maj="30 octobre 2026"
      >
        <Desinscription />
        <p>
          Votre adresse est conservée uniquement pour ne plus vous solliciter. Pour en savoir plus, voir la section « Prospection » de la <Link href="/politique-confidentialite#prospection">politique de confidentialité</Link>.
        </p>
      </Document>
    </>
  )
}
