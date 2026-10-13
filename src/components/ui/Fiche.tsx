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
    <dl className={`su-fiche ${className}`} aria-label={titre}>
      <div className="su-fiche__titre">{titre}</div>
      {lignes.map((l) => (
        <div key={l.cle} className="su-fiche__ligne">
          <dt>{l.cle}</dt>
          <dd>{l.valeur}</dd>
        </div>
      ))}
    </dl>
  )
}
