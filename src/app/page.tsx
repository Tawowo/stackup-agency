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
