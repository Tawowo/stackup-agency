/**
 * 404 — L'ÉBOULIS. La pile garde ses deux plaques navy ; l'ambre est tombée au
 * sol, avec quelques plaques libres. Le texte est rendu serveur, complet sans
 * JS : le chiffre se découpe, les portes de sortie se déplient une à une (CSS
 * seul, instantané en mouvement réduit). La scène est un îlot client.
 */
import type { Metadata } from 'next'
import Link from 'next/link'
import StackFrame from '@/webgl/StackFrame'
import ScenePage from '@/components/ScenePage'
import SolEboulis from '@/experiences/eboulis/SolEboulis'
import { SITE, formatAPartirDe, offre } from '@/config/site'
import '@/experiences/eboulis/eboulis.css'

export const metadata: Metadata = {
  title: 'Page introuvable — Stackup Agency',
  description: 'Cette page n’existe pas (ou plus). Reprenez par l’accueil, les réalisations, les tarifs ou le plan du site.',
  robots: { index: false, follow: true },
}

const PORTES = [
  { href: '/', nom: 'Accueil', note: 'Le point de départ.' },
  { href: '/realisations', nom: 'Réalisations', note: 'Les démos, en grand.' },
  { href: '/tarifs', nom: 'Tarifs', note: `Les offres, ${formatAPartirDe(offre('une-page'))}.` },
  { href: '/plan-du-site', nom: 'Plan du site', note: 'Toutes les pages, sur une seule.' },
  { href: '/contact', nom: 'Contact', note: `Un projet, une question : ${SITE.fondateur} vous répond.` },
]

export default function Introuvable() {
  return (
    <main id="contenu" className="su-404" data-moment="404" data-nuit="1">
      <ScenePage moment="404" forme="eboulis" projection={0.35} pose={{ x: 0.2, y: -0.32 }} />
      <SolEboulis />
      <div className="su-404__grille">
        <div className="su-404__texte">
          <p className="su-mono su-404__etiquette">Erreur 404 · une plaque manquante</p>
          <p className="su-display su-404__chiffre" aria-hidden="true">
            404
          </p>
          <h1 className="su-display su-404__titre">Cette page n’existe pas (ou plus).</h1>
          <p className="su-404__chapo">
            L’adresse a peut-être changé, ou le lien a été mal recopié. Il manque une plaque ici, mais le reste de l’atelier tient debout : reprenez par l’une de ces portes.
          </p>
          <nav aria-label="Reprendre la visite">
            <ol className="su-404__portes">
              {PORTES.map((p, i) => (
                <li key={p.href} className="su-404__porte" style={{ '--i': i } as React.CSSProperties}>
                  <Link href={p.href} className="su-404__lien">
                    <span className="su-mono su-404__num">0{i + 1}</span>
                    <span className="su-404__nom">{p.nom}</span>
                    <span className="su-404__note">{p.note}</span>
                  </Link>
                </li>
              ))}
            </ol>
          </nav>
        </div>
        <div className="su-404__scene" aria-hidden="true">
          <StackFrame className="su-404__cadre" />
        </div>
      </div>
    </main>
  )
}
