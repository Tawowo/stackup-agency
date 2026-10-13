import Ouverture from '@/experiences/ouverture/Ouverture'
import Strates from '@/experiences/strates/Strates'
import Offre from '@/experiences/offre/Offre'
import Pellicule from '@/experiences/pellicule/Pellicule'
import SeuilNoyau from '@/experiences/seuil/SeuilNoyau'
import ScrollRefresh from '@/components/layout/ScrollRefresh'

export default function Accueil() {
  return (
    <main>
      <Ouverture />
      <Strates />
      <Offre />
      <Pellicule />
      <SeuilNoyau />
      {/* Les moments 05 à 09 arrivent en phase 3. Cette section réserve la place. */}
      <section id="machines" className="mx-auto flex min-h-[60svh] max-w-[1440px] items-end px-6 pb-[12vh]" aria-label="Suite">
        <p className="su-mono" style={{ color: 'var(--su-texte-doux)' }}>
          05 — La salle des machines · phase 3
        </p>
      </section>
      <ScrollRefresh />
    </main>
  )
}
