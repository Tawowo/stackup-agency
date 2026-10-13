'use client'

/**
 * LES MODULES BRANCHABLES, et l'encart qui dit ce que la démonstration n'est
 * pas.
 *
 * Spécification : dossier §10.6 (moment 05, la Salle des machines).
 *
 * POURQUOI LES DEUX VONT ENSEMBLE. Au-dessus, un logiciel qui fonctionne
 * vraiment dans le navigateur. C'est convaincant, et c'est précisément le
 * moment où il faut être le plus net sur ses limites : un visiteur qui vient
 * de manipuler un outil réel peut croire qu'il vient de voir le produit fini
 * qu'on lui livrera. L'encart le détrompe avant qu'il ne se fasse son idée,
 * pas dans une note de bas de page.
 *
 * Le dossier demande les deux dans la même section, et c'est la bonne
 * lecture : la liste des modules répond à « et pour mon métier ? », question
 * que la démonstration fait naître et à laquelle elle ne répond pas.
 *
 * TOUT VIENT DE `data/solutions.ts`. Les noms, les liens : la source unique.
 * Une liste recopiée ici divergerait, comme celle des réalisations l'avait
 * fait dans la salle de projection.
 */

import { useState } from 'react'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { SOLUTIONS } from '@/data/solutions'

/* Les modules de priorité P1 et P2 : ceux qui sont spécifiés assez finement
   pour être chiffrés. Le filtre est explicite plutôt qu'une coupe arbitraire
   des N premiers, et le compte s'affiche dans le titre — le dossier parle de
   quinze modules, la source en donne quatorze à ce niveau de priorité, et
   c'est la source qui a raison. */
const MODULES = SOLUTIONS.filter((s) => s.priorite !== 'P3')

export default function Modules() {
  const [ouvert, setOuvert] = useState<string | null>(null)

  return (
    <div className="su-modules">
      {/* ── Ce que c'est, ce que ce n'est pas ─────────────────────────── */}
      <div className="su-modules__cadre">
        <h3 className="su-modules__titre">Ce que vous venez de manipuler</h3>
        <dl className="su-modules__net">
          <div>
            <dt>C’est</dt>
            <dd>
              Du code réel, exécuté dans votre navigateur. Les filtres
              filtrent, les totaux se recalculent, la TVA est juste. C’est la
              même technique que les outils que nous livrons.
            </dd>
          </div>
          <div>
            <dt>Ce n’est pas</dt>
            <dd>
              Un produit fini que vous recevriez tel quel. Il n’y a ni base de
              données, ni comptes, ni sauvegarde : tout disparaît si vous
              rechargez la page. Les douze interventions sont inventées, et
              aucun client n’existe derrière.
            </dd>
          </div>
        </dl>
      </div>

      {/* ── Les modules ───────────────────────────────────────────────── */}
      <div className="su-modules__liste-cadre">
        <h3 className="su-modules__titre">
          Et pour votre métier&nbsp;?
          <span className="su-modules__compte">{MODULES.length} modules</span>
        </h3>
        <p className="su-modules__chapo">
          Un outil de gestion se compose. Chacun de ces modules se branche sur
          les autres, et chacun a sa page détaillée.
        </p>

        <ul className="su-modules__liste">
          {MODULES.map((m) => (
            <li key={m.slug}>
              {/* L'aperçu s'ouvre au CLIC, jamais au survol : la règle 16
                  l'impose et un écran tactile n'a pas de survol. */}
              <button
                type="button"
                className="su-modules__module"
                aria-expanded={ouvert === m.slug}
                onClick={() => setOuvert(ouvert === m.slug ? null : m.slug)}
              >
                {m.nom}
              </button>
              {ouvert === m.slug ? (
                <div className="su-modules__apercu">
                  {/* La PREMIÈRE PHRASE de l'intro, pas `requetePrincipale`.

                      La première version affichait ce dernier champ, qui est
                      une requête de référencement — « création site
                      e-commerce click and collect ». Vu en capture : ça se
                      lit comme de la donnée brute échappée dans l'interface,
                      et ça donne l'impression d'un site écrit pour un moteur
                      plutôt que pour un lecteur. L'intro est rédigée. */}
                  <p>{m.intro.split(/(?<=\.)\s/)[0]}</p>
                  <Link href={`/solutions/${m.slug}`}>
                    Voir le module
                    <ArrowRight size={13} aria-hidden="true" />
                  </Link>
                </div>
              ) : null}
            </li>
          ))}
        </ul>

        <Link href="/solutions" className="su-lien-trace su-modules__tous">
          Tous les modules
        </Link>
      </div>
    </div>
  )
}
