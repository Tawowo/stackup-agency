/** Page de chantier : la route existe, le gabarit arrive à la phase indiquée. Pas de contenu inventé. */
import StackFrame from '@/webgl/StackFrame'

export default function Chantier({ titre, phase }: { titre: string; phase: number }) {
  return (
    <main className="mx-auto grid min-h-svh max-w-[1440px] grid-cols-12 gap-x-6 px-6 pt-28">
      <StackFrame className="col-span-12 min-h-[40svh] md:col-span-4" />
      <section className="col-span-12 self-end pb-[12vh] md:col-span-7 md:col-start-6">
        <p className="su-mono" style={{ color: 'var(--su-texte-doux)' }}>
          Chantier · phase {phase}
        </p>
        <h1 className="su-display mt-4" style={{ fontSize: 'clamp(2.4rem, 4.5vw, 4rem)' }}>
          {titre}
        </h1>
        <p className="mt-6 max-w-[48ch]" style={{ color: 'var(--su-texte-doux)' }}>
          Cette page est en construction. Elle sera livrée à la phase {phase} de la refonte.
        </p>
      </section>
    </main>
  )
}
