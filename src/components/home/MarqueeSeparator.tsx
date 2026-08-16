type Item = { text: string; highlight: boolean }

const ITEMS: Item[] = [
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

function MarqueeContent() {
  return (
    <>
      {ITEMS.map((item, i) => (
        <span
          key={i}
          className={`mx-4 text-sm font-medium tracking-wide select-none ${
            item.highlight ? 'marquee-keyword' : 'text-foreground/50 dark:text-white/30'
          }`}
        >
          {item.text}
        </span>
      ))}
    </>
  )
}

export default function MarqueeSeparator() {
  return (
    <div className="py-5 overflow-hidden bg-background dark:bg-[#0A0F1C] border-y border-navy/8 dark:border-white/5" aria-hidden="true">
      <div className="marquee-track">
        <span><MarqueeContent /></span>
        <span><MarqueeContent /></span>
        <span><MarqueeContent /></span>
        <span><MarqueeContent /></span>
      </div>
    </div>
  )
}
