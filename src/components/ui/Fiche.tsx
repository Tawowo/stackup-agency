/**
 * FICHE DE FABRICATION — bloc mono avec étiquettes. Une par offre, par
 * réalisation, par solution. Jamais décorative : chaque ligne est une donnée.
 */
export interface LigneFiche {
  cle: string
  valeur: string
}

export default function Fiche({ lignes, titre = 'Fiche de fabrication', className = '' }: { lignes: LigneFiche[]; titre?: string; className?: string }) {
  return (
    <div className={`su-fiche ${className}`} role="group" aria-label={titre}>
      <p className="su-fiche__titre">{titre}</p>
      <dl className="su-fiche__lignes">
        {lignes.map((l) => (
          <div key={l.cle} className="su-fiche__ligne">
            <dt>{l.cle}</dt>
            <dd>{l.valeur}</dd>
          </div>
        ))}
      </dl>
    </div>
  )
}
