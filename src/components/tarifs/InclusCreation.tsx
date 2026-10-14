import { auDela, inclusCreation } from '@/domain/devis/inclus'
import './tarifs-blocs.css'

/** Ce qui est inclus dans chaque création — affiché clairement, tiré de l'Excel. */
export default function InclusCreation({ titre = 'Inclus dans chaque création', className = '' }: { titre?: string; className?: string }) {
  return (
    <section className={`su-tg su-tg--inclus ${className}`} aria-labelledby="su-inclus-t" data-nuit="0">
      <div className="su-tg__enveloppe">
        <h2 id="su-inclus-t" className="su-display su-tg__titre">
          {titre}
        </h2>
        <ul className="su-tg__coches">
          {inclusCreation().map((i) => (
            <li key={i.id}>{i.texte}</li>
          ))}
        </ul>
        {auDela() && <p className="su-tg__note">{auDela()}</p>}
      </div>
    </section>
  )
}
