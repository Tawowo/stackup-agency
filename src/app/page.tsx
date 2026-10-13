import StackFrame from '@/webgl/StackFrame'

/* Phase 0 : la pile au repos, calée à gauche sur la grille. Le hero (moment 00)
   arrive en phase 1 ; rien de l'ancien contenu n'est migré ici. */
export default function Accueil() {
  return (
    <main className="mx-auto grid min-h-svh max-w-[1440px] grid-cols-12 gap-x-6 px-6">
      <StackFrame className="col-span-12 my-[6vh] min-h-[48svh] md:col-span-6 md:min-h-[60svh]" />
      <section className="col-span-12 flex flex-col justify-end pb-[10vh] md:col-span-6 md:col-start-7">
        <p className="su-mono" style={{ color: 'var(--su-texte-doux)' }}>
          00 — Chantier · phase 0
        </p>
        <h1 className="su-display mt-4" style={{ fontSize: 'clamp(2.75rem, 7vw, 6rem)' }}>
          Sites et outils
          <br />
          sur mesure.
        </h1>
      </section>
    </main>
  )
}
