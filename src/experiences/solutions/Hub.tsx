'use client'
/**
 * /solutions — LE HUB DES OUTILS DE GESTION, construit autour du logiciel réel (Artibox, en
 * développement) : ce qu'il fait aujourd'hui, la démo à tester, puis le catalogue des modules qu'on
 * peut y ajouter sur mesure (automatisation et IA en tête), les métiers et le prix « à partir de »
 * calculé par le moteur. Aucune maquette inventée : les captures sont celles du vrai logiciel.
 */
import { useEffect } from 'react'
import Link from 'next/link'
import { useScene } from '@/webgl/store'
import Action from '@/components/ui/Action'
import Cadran from '@/components/ui/Cadran'
import { Duo } from '@/components/appareils/Appareils'
import { PROJETS } from '@/experiences/galerie/projets'
import './hub.css'

interface Groupe {
  titre: string
  modules: { code: string; libelle: string; description: string; fiche: string | null }[]
}

const ARTIBOX = PROJETS.find((p) => p.slug === 'logiciel-gestion-artisans')!

export default function Hub({ groupes, metiers, prix, total }: { groupes: Groupe[]; metiers: { slug: string; nom: string }[]; prix: number; total: number }) {
  useEffect(() => {
    const s = useScene.getState()
    s.setMoment('solutions')
    s.setMonde('fabrique')
    s.setNuit(1)
    s.setScrub(false)
    s.setParams({ retard: 0.25, flash: 0, arc: 0.6, glisse: 0, largeur: 30 })
    s.setProjection(0.6)
    s.setPose({ x: 0.12, y: -0.1 })
    if (!s.reduced) s.setLayout('logo')
  }, [])

  return (
    <article className="su-hub" data-moment="solutions" data-nuit="1">
      <header className="su-hub__tete">
        <p className="su-mono su-hub__etiquette">Outils de gestion</p>
        <h1 className="su-display su-hub__titre">Un logiciel de gestion, fait pour votre métier.</h1>
        <p className="su-hub__ligne">
          Artibox est le logiciel de gestion que Stackup fabrique : devis, factures, chantiers, planning et statistiques dans un seul outil. Il est en cours de développement et sa démo est en ligne. Pour votre activité, on l’adapte : on retire ce qui ne vous sert pas, on ajoute les modules dont vous avez besoin.
        </p>
        <div className="su-hub__actions">
          <Action href={ARTIBOX.url}>Tester la démo</Action>
          <Action href="/contact?objet=Outil%20sur%20mesure" variante="contour">
            Parler de votre outil
          </Action>
        </div>
      </header>
      <div className="su-hub__visuel">
        <Duo projet={ARTIBOX} prioritaire />
      </div>
      <p className="su-hub__note">Les données affichées dans la démo (clients, montants, chantiers) sont fictives. Le logiciel est en cours de développement.</p>

      <section className="su-hub__bloc" aria-labelledby="su-hub-auj">
        <h2 id="su-hub-auj" className="su-hub__h2">
          Ce qu’il fait aujourd’hui
        </h2>
        <ul className="su-hub__fonctions">
          {ARTIBOX.fonctionnalites.map((f, i) => (
            <li key={f} className="su-plaque">
              <span className="su-mono">{String(i + 1).padStart(2, '0')}</span>
              {f}
            </li>
          ))}
        </ul>
      </section>

      <section className="su-hub__bloc" aria-labelledby="su-hub-add">
        <h2 id="su-hub-add" className="su-hub__h2">
          Ce qu’on peut y ajouter, sur mesure
        </h2>
        <p className="su-hub__intro">
          Le catalogue compte {total} modules. On compose votre outil avec ceux dont vous avez besoin, ni plus ni moins. En tête, ce qui fait gagner le plus de temps : l’automatisation et l’intelligence artificielle.
        </p>
        {groupes.map((g) => (
          <div key={g.titre} className="su-hub__groupe">
            <h3 className="su-hub__h3">{g.titre}</h3>
            <ul className="su-hub__modules">
              {g.modules.map((m) => (
                <li key={m.code}>
                  <span className="su-mono">{m.code}</span>
                  <b>{m.libelle}</b>
                  {m.description && <span className="su-hub__desc">{m.description}</span>}
                  {m.fiche && (
                    <Link href={`/solutions/${m.fiche}`} className="su-hub__fiche">
                      Voir la fiche
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </section>

      <section className="su-hub__bloc" aria-labelledby="su-hub-metiers">
        <h2 id="su-hub-metiers" className="su-hub__h2">
          Pour quels métiers
        </h2>
        <p className="su-hub__intro">Artisans du bâtiment, commerces, restaurants, cabinets, associations : un outil de gestion s’adapte à toute activité qui fait des devis, des rendez-vous, des commandes ou des plannings.</p>
        <ul className="su-hub__metiers">
          {metiers.map((m) => (
            <li key={m.slug}>
              <Link href={`/creation-site-internet/${m.slug}`}>{m.nom}</Link>
            </li>
          ))}
        </ul>
      </section>

      <section className="su-hub__bloc su-hub__prix" aria-labelledby="su-hub-prix">
        <h2 id="su-hub-prix" className="su-hub__h2">
          Combien ça coûte
        </h2>
        <p className="su-hub__cadran">
          <Cadran valeur={prix} prefixe="à partir de" suffixe="€" className="su-hub__chiffre" />
        </p>
        <p className="su-hub__intro">
          C’est le prix du socle (connexion sécurisée, base de données, tableau de bord, export de vos données) avec un premier module. Chaque module ajouté s’ajoute au prix. L’estimateur vous donne une fourchette en quelques minutes ; le devis écrit fixe le montant avant que vous vous engagiez.
        </p>
        <div className="su-hub__actions">
          <Action href="/tarifs#estimer">Estimer mon outil</Action>
        </div>
      </section>

      <section className="su-hub__fin" aria-labelledby="su-hub-fin">
        <h2 id="su-hub-fin" className="su-display su-hub__titre-fin">
          Parlons de votre activité.
        </h2>
        <p className="su-hub__ligne">Un appel gratuit de 30 minutes pour comprendre ce que vous faites à la main aujourd’hui. Vous testez la démo avant si vous le souhaitez.</p>
        <div className="su-hub__actions">
          <Action href="/contact?a=appel">Réserver mon appel gratuit</Action>
          <Action href={ARTIBOX.url} variante="contour">
            Tester la démo
          </Action>
        </div>
      </section>
    </article>
  )
}
