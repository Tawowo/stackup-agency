'use client'
/**
 * ACCORDÉON — pour les FAQ. Le seul endroit (avec le blog) où le fondu est
 * toléré : le texte courant apparaît en fondu + 8 px. Tout le contenu est dans
 * le DOM, ouvert sans JS (details/summary natif).
 */
import Lie from './Lie'
import './editorial.css'

export interface Question {
  q: string
  r: string
}

export default function Accordeon({ questions, className = '', groupe = 'su-acc' }: { questions: Question[]; className?: string; groupe?: string }) {
  return (
    <div className={`su-acc ${className}`}>
      {questions.map((x, i) => (
        <details key={x.q} className="su-acc__item" name={groupe} open={i === 0}>
          <summary className="su-acc__q">
            <span className="su-mono su-acc__num">{String(i + 1).padStart(2, "0")}</span>
            {x.q}
          </summary>
          <p className="su-acc__r"><Lie t={x.r} /></p>
        </details>
      ))}
    </div>
  )
}
