'use client'
/**
 * LE JOURNAL — /blog. Une mise en page de magazine : l'article à la une en
 * grand, les rayons en sommaire, puis toutes les feuilles. Interaction propre :
 * la recherche instantanée, qui filtre les 300 articles à la frappe ; les
 * rayons se choisissent comme des onglets. Tout le contenu est rendu côté
 * serveur (la liste complète est dans le DOM) ; le filtre ne fait que masquer.
 */
import { useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import StackFrame from '@/webgl/StackFrame'
import { useScene } from '@/webgl/store'
import type { Article } from '@/lib/blog'
import './journal.css'

export interface Rayon {
  id: string
  nom: string
  ligne: string
  categories: string[]
}

const dateFr = (d: string) => new Date(d).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })

export default function Kiosque({ articles, rayons, rayonInitial = '', titre = 'Le journal de l’atelier', intro }: { articles: Article[]; rayons: Rayon[]; rayonInitial?: string; titre?: string; intro?: string }) {
  const [q, setQ] = useState('')
  const [rayon, setRayon] = useState(rayonInitial)
  useEffect(() => {
    const s = useScene.getState()
    s.setMoment('journal')
    s.setMonde('fabrique')
    s.setScrub(false)
    s.setParams({ retard: 0.25, flash: 0, arc: 0.6 })
    s.setProjection(0.4)
    s.setPose({ x: 0.1, y: -0.25 })
    if (!s.reduced) s.setLayout('empile')
  }, [])
  const filtre = useMemo(() => {
    const t = q
      .toLowerCase()
      .normalize('NFD')
      .replace(/[̀-ͯ]/g, '')
      .trim()
    const r = rayons.find((x) => x.id === rayon)
    return articles.filter((a) => {
      if (r && !r.categories.includes(a.categorie)) return false
      if (!t) return true
      const h = `${a.titre} ${a.extrait} ${a.etiquette} ${a.motsCles.join(' ')}`.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '')
      return t.split(/\s+/).every((m) => h.includes(m))
    })
  }, [q, rayon, articles, rayons])
  const une = filtre[0]
  const reste = filtre.slice(1)
  return (
    <div className="su-jou">
      <section className="su-jou__tete" data-moment="journal" data-nuit="1" aria-labelledby="su-jou-titre">
        <div className="su-jou__tete-grille">
          <div>
            <p className="su-mono su-jou__etiquette">Blog · {articles.length} articles</p>
            <h1 id="su-jou-titre" className="su-display su-jou__titre">
              {titre}
            </h1>
            <p className="su-jou__intro">{intro ?? 'Créer son site, être trouvé sur Google, vendre en ligne, gagner du temps avec ses outils : des guides écrits pour les artisans, commerçants et petites entreprises.'}</p>
            <label className="su-jou__recherche">
              <span className="sr-only">Rechercher un article</span>
              <input type="search" placeholder="Chercher : devis, Google, boutique, restaurant…" value={q} onChange={(e) => setQ(e.target.value)} />
              <span className="su-mono su-jou__compte" aria-live="polite">
                {filtre.length} résultat{filtre.length > 1 ? 's' : ''}
              </span>
            </label>
          </div>
          <div className="su-jou__pile" aria-hidden="true">
            <StackFrame className="su-jou__cadre" />
          </div>
        </div>
      </section>
      <section className="su-jou__corps" data-moment="journal-corps" data-nuit="0" aria-label="Articles">
        <nav className="su-jou__rayons" aria-label="Rayons">
          <button type="button" aria-pressed={!rayon} onClick={() => setRayon('')}>
            Tout
          </button>
          {rayons.map((r) => (
            <button key={r.id} type="button" aria-pressed={rayon === r.id} onClick={() => setRayon(r.id)}>
              {r.nom}
            </button>
          ))}
        </nav>
        {une && (
          <Link href={`/blog/${une.slug}`} className="su-jou__une">
            <span className="su-mono su-jou__meta">
              À la une · {une.etiquette} · {une.lecture} min
            </span>
            <span className="su-display su-jou__une-titre">{une.titre}</span>
            <span className="su-jou__une-extrait">{une.extrait}</span>
            <span className="su-jou__lire">Lire l’article →</span>
          </Link>
        )}
        <ul className="su-jou__liste">
          {reste.map((a, i) => (
            <li key={a.slug} className={i % 7 === 0 ? 'su-jou__item su-jou__item--large' : 'su-jou__item'}>
              <Link href={`/blog/${a.slug}`}>
                <span className="su-mono su-jou__meta">
                  {a.etiquette} · {dateFr(a.maj ?? a.date)} · {a.lecture} min
                </span>
                <span className="su-jou__item-titre">{a.titre}</span>
                <span className="su-jou__item-extrait">{a.extrait}</span>
              </Link>
            </li>
          ))}
        </ul>
        {!filtre.length && <p className="su-jou__vide">Aucun article ne correspond. Essayez un autre mot, ou écrivez-nous : on répond aux questions qui ne sont pas encore dans le journal.</p>}
      </section>
    </div>
  )
}
