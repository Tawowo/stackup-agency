const TEXT = 'Stratégie · Design · Performance · Code sur mesure · '

export default function MarqueeSeparator() {
  const repeated = TEXT.repeat(8)
  return (
    <div className="py-6 overflow-hidden bg-background dark:bg-[#0A0F1C]" aria-hidden="true">
      <div className="marquee-track text-foreground/70 dark:text-white/30 text-sm font-medium tracking-wide select-none">
        <span>{repeated}</span>
        <span>{repeated}</span>
      </div>
    </div>
  )
}
