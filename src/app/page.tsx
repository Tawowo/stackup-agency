import Ouverture from '@/experiences/ouverture/Ouverture'

export default function Accueil() {
  return (
    <main>
      <Ouverture />
      {/* Les moments 01 à 09 arrivent en phases 2 et 3. Cette section réserve la place. */}
      <section id="strates" className="mx-auto flex min-h-[80svh] max-w-[1440px] items-end px-6 pb-[12vh]" aria-label="Suite">
        <p className="su-mono" style={{ color: 'var(--su-texte-doux)' }}>
          01 — Les strates · phase 2
        </p>
      </section>
    </main>
  )
}
