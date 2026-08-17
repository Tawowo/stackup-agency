type Item = { text: string; highlight: boolean }

const ITEMS_FWD: Item[] = [
  { text: 'Stratégie rigoureuse', highlight: false },
  { text: '·', highlight: false },
  { text: 'Design soigné', highlight: false },
  { text: '·', highlight: false },
  { text: 'Performance', highlight: true },
  { text: '·', highlight: false },
  { text: 'Code sur mesure', highlight: false },
  { text: '·', highlight: false },
  { text: 'Livraison garantie', highlight: false },
  { text: '·', highlight: false },
]

const ITEMS_REV: Item[] = [
  { text: 'SEO natif', highlight: false },
  { text: '·', highlight: false },
  { text: 'Next.js', highlight: true },
  { text: '·', highlight: false },
  { text: 'TypeScript', highlight: false },
  { text: '·', highlight: false },
  { text: 'Mobile-first', highlight: false },
  { text: '·', highlight: false },
  { text: '10 jours ouvrés', highlight: true },
  { text: '·', highlight: false },
]

function Row({ items, cls }: { items: Item[]; cls: string }) {
  const content = (
    <>
      {items.map((item, i) => (
        <span
          key={i}
          className={`mx-5 text-sm font-medium tracking-wide select-none whitespace-nowrap ${
            item.highlight ? 'marquee-keyword gradient-sig' : 'text-foreground/40 dark:text-white/25'
          }`}
        >
          {item.text}
        </span>
      ))}
    </>
  )
  return (
    <div className="overflow-hidden">
      <div className={`marquee-wrap flex ${cls}`} style={{ width: 'max-content' }}>
        <span className="flex">{content}</span>
        <span className="flex" aria-hidden>{content}</span>
        <span className="flex" aria-hidden>{content}</span>
        <span className="flex" aria-hidden>{content}</span>
      </div>
    </div>
  )
}

export default function MarqueeSeparator() {
  return (
    <div
      className="py-4 dark:bg-[#0C1222] bg-background border-y border-navy/8 dark:border-white/5 scanline-section space-y-2 overflow-hidden"
      aria-hidden="true"
    >
      <Row items={ITEMS_FWD} cls="marquee-track" />
      <Row items={ITEMS_REV} cls="marquee-track-rev" />
    </div>
  )
}
