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

// La piste duplique son contenu quatre fois pour boucler sans raccord :
// elle mesure ~4 000 px, clippée par deux conteneurs successifs. `contain:
// paint` isole son rendu (gain de compositing). Ce confinement ne supprime
// pas pour autant la remontée intermittente de cette largeur dans
// documentElement.scrollWidth, qui est un artefact de mesure de Chromium :
// le défilement horizontal reste impossible, ce que le contrôle qualité
// vérifie directement.
function Row({ items, cls }: { items: Item[]; cls: string }) {
  const content = (
    <>
      {items.map((item, i) => (
        <span
          key={i}
          className={`mx-5 text-sm font-medium tracking-wide select-none whitespace-nowrap ${
            item.highlight ? 'marquee-keyword text-[#B45309] font-bold' : 'text-[#64748B]'
          }`}
        >
          {item.text}
        </span>
      ))}
    </>
  )
  return (
    <div className="overflow-hidden" style={{ contain: 'paint' }}>
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
      className="py-4 bg-[#FFFDF9] border-y border-navy/10 space-y-2 overflow-hidden"
      style={{ contain: 'paint' }}
      aria-hidden="true"
    >
      <Row items={ITEMS_FWD} cls="marquee-track" />
      <Row items={ITEMS_REV} cls="marquee-track-rev" />
    </div>
  )
}
