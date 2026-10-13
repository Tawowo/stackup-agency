'use client'
/** Les communes d'un département, par intercommunalité, filtrables à la frappe. */
import { useMemo, useState } from 'react'

const norme = (s: string) => s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[’'-]/g, ' ')

export default function Communes({ titre, groupes }: { titre: string; groupes: { epci: string; communes: string[] }[] }) {
  const [q, setQ] = useState('')
  const total = groupes.reduce((n, g) => n + g.communes.length, 0)
  const filtres = useMemo(() => {
    const t = norme(q.trim())
    return groupes.map((g) => ({ ...g, communes: t ? g.communes.filter((c) => norme(c).includes(t)) : g.communes })).filter((g) => g.communes.length)
  }, [q, groupes])
  return (
    <section className="su-loc__bloc su-loc__bloc--large su-loc__communes">
      <h2 className="su-loc__h2">{titre}</h2>
      <label className="su-loc__filtre">
        <span className="su-mono">Votre commune</span>
        <input type="search" value={q} onChange={(e) => setQ(e.target.value)} placeholder={`${total} communes`} />
      </label>
      <p className="su-mono su-loc__compte" aria-live="polite">
        {q ? `${filtres.reduce((n, g) => n + g.communes.length, 0)} commune(s) trouvée(s) — même accompagnement, mêmes prix.` : `${total} communes, mêmes prix partout.`}
      </p>
      <div className="su-loc__epcis">
        {filtres.map((g) => (
          <div key={g.epci}>
            <h3 className="su-mono">{g.epci}</h3>
            <p>{g.communes.join(' · ')}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
