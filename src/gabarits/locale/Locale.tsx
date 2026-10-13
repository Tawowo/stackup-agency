/**
 * LE GABARIT SIGNÉ DES PAGES LOCALES — villes, départements, métiers, services
 * locaux. Une même ossature reconnaissable : le relevé (étiquette mono, titre,
 * repère), la pile qui prend la forme du métier ou de l'offre, l'économie
 * locale, ce qu'on fabrique ici (prix « à partir de » depuis SITE), les
 * communes (filtrables), les liens voisins, la FAQ, l'appel. Rendu serveur ;
 * seuls la scène et le filtre des communes sont des îlots client.
 */
import Link from 'next/link'
import type { LayoutName } from '@/webgl/layouts'
import StackFrame from '@/webgl/StackFrame'
import ScenePage from '@/components/ScenePage'
import Action from '@/components/ui/Action'
import Cadran from '@/components/ui/Cadran'
import Accordeon from '@/components/editorial/Accordeon'
import { SITE } from '@/config/site'
import Communes from './Communes'
import './locale.css'

export interface Lien {
  href: string
  nom: string
  note?: string
}

export interface PropsLocale {
  moment: string
  ariane: Lien[]
  etiquette: string
  titre: string
  intro: string
  forme?: LayoutName
  economie?: { titre: string; texte: string; secteurs?: string[] }
  besoins?: { titre: string; items: { nom: string; detail: string }[] }
  points?: { titre: string; items: string[] }
  fonctions?: { titre: string; items: { nom: string; detail?: string }[] }
  communes?: { titre: string; groupes: { epci: string; communes: string[] }[] }
  liens?: { titre: string; items: Lien[] }
  faq?: { q: string; a: string }[]
  appel?: string
  offres?: boolean
}

export default function Locale(p: PropsLocale) {
  return (
    <main id="contenu">
      <article className="su-loc">
        <ScenePage moment={p.moment} forme={p.forme ?? 'empile'} projection={0.35} pose={{ x: 0.1, y: -0.3 }} />
        <header className="su-loc__hero" data-moment={p.moment} data-nuit="1">
          <div className="su-loc__hero-grille">
            <div className="su-loc__texte">
              <nav className="su-mono su-loc__ariane" aria-label="Fil d’Ariane">
                {p.ariane.map((l, i) => (
                  <span key={l.href}>
                    {i > 0 && <span aria-hidden="true"> / </span>}
                    {i < p.ariane.length - 1 ? <Link href={l.href}>{l.nom}</Link> : <span>{l.nom}</span>}
                  </span>
                ))}
              </nav>
              <p className="su-mono su-loc__etiquette">{p.etiquette}</p>
              <h1 className="su-display su-loc__titre">{p.titre}</h1>
              <p className="su-loc__intro">{p.intro}</p>
              <div className="su-loc__actions">
                <Action href="/contact">{p.appel ?? 'Parler de votre projet'}</Action>
                <Action href="/realisations" variante="contour">
                  Voir les démos
                </Action>
              </div>
            </div>
            <div className="su-loc__scene" aria-hidden="true">
              <StackFrame className="su-loc__cadre" />
              <span className="su-mono su-loc__repere">
                {SITE.ville} · {p.etiquette}
              </span>
            </div>
          </div>
        </header>
        <div className="su-loc__corps" data-moment={`${p.moment}-corps`} data-nuit="0">
          {p.economie && (
            <section className="su-loc__bloc">
              <h2 className="su-loc__h2">{p.economie.titre}</h2>
              <p className="su-loc__long">{p.economie.texte}</p>
              {p.economie.secteurs && (
                <ul className="su-loc__puces">
                  {p.economie.secteurs.map((s) => (
                    <li key={s}>{s}</li>
                  ))}
                </ul>
              )}
            </section>
          )}
          {p.points && (
            <section className="su-loc__bloc">
              <h2 className="su-loc__h2">{p.points.titre}</h2>
              <ul className="su-loc__barres">
                {p.points.items.map((s) => (
                  <li key={s}>{s}</li>
                ))}
              </ul>
            </section>
          )}
          {p.besoins && (
            <section className="su-loc__bloc su-loc__bloc--large">
              <h2 className="su-loc__h2">{p.besoins.titre}</h2>
              <ul className="su-loc__grille">
                {p.besoins.items.map((b) => (
                  <li key={b.nom} className="su-plaque su-plaque--ivoire">
                    <strong>{b.nom}</strong>
                    <span>{b.detail}</span>
                  </li>
                ))}
              </ul>
            </section>
          )}
          {p.fonctions && (
            <section className="su-loc__bloc su-loc__bloc--large">
              <h2 className="su-loc__h2">{p.fonctions.titre}</h2>
              <ul className="su-loc__grille">
                {p.fonctions.items.map((b, i) => (
                  <li key={b.nom} className="su-plaque su-plaque--ivoire">
                    <span className="su-mono">{String(i + 1).padStart(2, '0')}</span>
                    <strong>{b.nom}</strong>
                    {b.detail && <span>{b.detail}</span>}
                  </li>
                ))}
              </ul>
            </section>
          )}
          {p.offres !== false && (
            <section className="su-loc__bloc su-loc__bloc--large" aria-labelledby={`${p.moment}-offres`}>
              <h2 id={`${p.moment}-offres`} className="su-loc__h2">
                Ce qu’on fabrique, aux mêmes prix partout
              </h2>
              <ul className="su-loc__offres">
                {SITE.offres.map((o) => (
                  <li key={o.id} className="su-plaque su-plaque--ivoire">
                    <span className="su-loc__offre-nom">{o.nom}</span>
                    <Cadran valeur={o.aPartirDe} prefixe="à partir de" suffixe="€" className="su-loc__cadran" />
                    <Link href={`/tarifs#${o.id}`}>Le détail</Link>
                  </li>
                ))}
              </ul>
            </section>
          )}
          {p.communes && p.communes.groupes.length > 0 && <Communes titre={p.communes.titre} groupes={p.communes.groupes} />}
          {p.liens && p.liens.items.length > 0 && (
            <section className="su-loc__bloc su-loc__bloc--large">
              <h2 className="su-loc__h2">{p.liens.titre}</h2>
              <ul className="su-loc__liens">
                {p.liens.items.map((l) => (
                  <li key={l.href}>
                    <Link href={l.href}>
                      {l.nom}
                      {l.note && <span className="su-mono"> · {l.note}</span>}
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          )}
          {p.faq && p.faq.length > 0 && (
            <section className="su-loc__bloc su-loc__bloc--large su-loc__faq">
              <h2 className="su-loc__h2">Questions fréquentes</h2>
              <Accordeon questions={p.faq.map((f) => ({ q: f.q, r: f.a }))} />
            </section>
          )}
          <section className="su-loc__fin su-plaque su-plaque--encre">
            <p className="su-display">Une démo avant de signer.</p>
            <p>Racontez votre métier en quelques lignes : on vous montre une première version de votre site avant tout engagement.</p>
            <Action href="/contact?objet=demo">Demander ma démo</Action>
          </section>
        </div>
      </article>
    </main>
  )
}
