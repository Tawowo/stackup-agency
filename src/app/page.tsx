import type { Metadata } from 'next'
import { meta } from '@/lib/seo'
import Ouverture from '@/experiences/ouverture/Ouverture'
import Strates from '@/experiences/strates/Strates'
import Offre from '@/experiences/offre/Offre'
import Pellicule from '@/experiences/pellicule/Pellicule'
import SeuilNoyau from '@/experiences/seuil/SeuilNoyau'
import Machines from '@/experiences/machines/Machines'
import Prix from '@/experiences/prix/Prix'
import Methode from '@/experiences/methode/Methode'
import Atelier from '@/experiences/atelier/Atelier'
import Depart from '@/experiences/depart/Depart'
import ParcoursClient from '@/components/tarifs/ParcoursClient'
import Rail from '@/components/layout/Rail'
import { nombreFr } from '@/lib/jetons'
import { offre } from '@/config/site'

export const metadata: Metadata = meta({
  titre: `Création de site internet à partir de ${nombreFr(offre('une-page').aPartirDe)} € | Stackup Agency`,
  description: 'Création de site internet et d’outils de gestion sur mesure en Touraine et partout en France. Prix affichés, démo avant de signer, code et données à vous.',
  chemin: '',
})

export default function Accueil() {
  return (
    <>
      <main>
        <Ouverture />
        <Strates />
        <Offre />
        <Pellicule />
        <SeuilNoyau />
        <Machines />
        <Prix />
        <Methode />
        <ParcoursClient id="parcours" />
        <Atelier />
        <Depart />
      </main>
      <Rail />
    </>
  )
}
