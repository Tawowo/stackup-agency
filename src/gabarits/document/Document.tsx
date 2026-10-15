/**
 * LE GABARIT DOCUMENT — pages de texte (légal, FAQ, comparatif, ressources,
 * parrainage, plan du site). Un relevé de nuit (étiquette, titre, chapô, la
 * pile au repos à droite, une cote de mise à jour), puis le document sur
 * ivoire, en colonne de lecture, avec un sommaire en marge quand il est long.
 * Rendu serveur ; la scène est un îlot client.
 */
import Link from 'next/link'
import type { ReactNode } from 'react'
import type { LayoutName } from '@/webgl/layouts'
import StackFrame from '@/webgl/StackFrame'
import ScenePage from '@/components/ScenePage'
import '@/components/editorial/editorial.css'
import './document.css'

export interface PropsDocument {
  moment: string
  ariane?: { href: string; nom: string }[]
  etiquette: string
  titre: string
  chapo?: string
  maj?: string
  forme?: LayoutName
  sommaire?: { id: string; titre: string }[]
  /** Contenu libre sous le titre (actions, outil interactif). */
  entete?: ReactNode
  children: ReactNode
  large?: boolean
  /** Le monde de la page (maquette, scène…) : remplace la pile à droite de l'en-tête. */
  monde?: ReactNode
}

export default function Document(p: PropsDocument) {
  return (
    <main id="contenu" className="su-doc" data-lecture="1">
      <ScenePage moment={p.moment} forme={p.monde ? 'logo' : (p.forme ?? 'logo')} projection={0.5} pose={{ x: 0.08, y: -0.22 }} />
      <header className="su-doc__tete" data-moment={p.moment} data-nuit="1">
        <div className="su-doc__tete-grille">
          <div className="su-doc__texte" data-large={p.monde ? '1' : '0'}>
            {p.ariane && (
              <nav className="su-mono su-doc__ariane" aria-label="Fil d’Ariane">
                {p.ariane.map((l, i) => (
                  <span key={l.href}>
                    {i > 0 && <span aria-hidden="true"> / </span>}
                    {i < p.ariane!.length - 1 ? <Link href={l.href}>{l.nom}</Link> : <span>{l.nom}</span>}
                  </span>
                ))}
              </nav>
            )}
            <p className="su-mono su-doc__etiquette">{p.etiquette}</p>
            <h1 className="su-display su-doc__titre">{p.titre}</h1>
            {p.chapo && <p className="su-doc__chapo">{p.chapo}</p>}
            {p.entete}
          </div>
          {p.monde ? (
            <div className="su-doc__monde">{p.monde}</div>
          ) : (
            <div className="su-doc__scene" aria-hidden="true">
              <StackFrame className="su-doc__cadre" />
              {p.maj && <span className="su-mono su-doc__maj">Mis à jour le {p.maj}</span>}
            </div>
          )}
        </div>
      </header>
      <div className="su-doc__corps" data-moment={`${p.moment}-corps`} data-nuit="0">
        <div className={`su-doc__grille${p.sommaire && p.sommaire.length > 2 ? ' su-doc__grille--marge' : ''}`}>
          {p.sommaire && p.sommaire.length > 2 && (
            <nav className="su-doc__sommaire" aria-label="Sommaire">
              <p className="su-mono">Sommaire</p>
              <ol>
                {p.sommaire.map((s) => (
                  <li key={s.id}>
                    <a href={`#${s.id}`}>{s.titre}</a>
                  </li>
                ))}
              </ol>
            </nav>
          )}
          <div className={p.large ? 'su-doc__large' : 'su-prose su-doc__prose'}>{p.children}</div>
        </div>
      </div>
    </main>
  )
}
