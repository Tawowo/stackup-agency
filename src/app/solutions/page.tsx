import type { Metadata } from 'next'
import Tableau from '@/experiences/tableau/Tableau'
import { meta, filAriane, JsonLd } from '@/lib/seo'

export const metadata: Metadata = meta({
  titre: 'Outils de gestion sur mesure — devis, rendez-vous, stocks, caisse | Stackup Agency',
  description: 'Assemblez votre outil : devis et factures, prise de rendez-vous, planning, stocks, caisse, fidélité. Développement sur mesure à partir de 1 447 €, sans abonnement obligatoire.',
  chemin: '/solutions',
})

export default function Page() {
  return (
    <main>
      <JsonLd data={filAriane([{ nom: 'Accueil', chemin: '/' }, { nom: 'Outils de gestion', chemin: '/solutions' }])} />
      <Tableau />
    </main>
  )
}
