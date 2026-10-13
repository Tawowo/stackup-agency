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
import Footer from '@/components/layout/Footer'
import ScrollRefresh from '@/components/layout/ScrollRefresh'
import Rail from '@/components/layout/Rail'
import Lumiere from '@/experiences/lumiere'

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
        <Atelier />
        <Depart />
      </main>
      <Footer />
      <Rail />
      <Lumiere />
      <ScrollRefresh />
    </>
  )
}
