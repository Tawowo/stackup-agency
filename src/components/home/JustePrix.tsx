'use client'

/**
 * MOMENT 06 — LE JUSTE PRIX.
 *
 * Spécification : dossier §10.7.
 *
 * CE QUE ÇA REMPLACE, ET POURQUOI C'ÉTAIT À REMPLACER.
 *
 * Le comparateur précédent mettait en avant un rapport entre nos prix et
 * ceux d'une agence, calculé sur des fourchettes codées en dur. Ces nombres
 * ne venaient de nulle part : aucune étude, aucun relevé, aucune note de bas
 * de page. Le composant qui l'affichait était même commenté « avec sa
 * fourchette de marché déclarée en légende » — une légende qui n'existait
 * pas.
 *
 * Le dossier l'interdit deux fois : §15.3 (« comparaisons de prix uniquement
 * avec sources, sinon retirées ») et §10.7. Le commanditaire a tranché : le
 * comparateur part, le coût sur cinq ans reste.
 *
 * CE QUI LE REMPLACE EST SOURCÉ.
 *
 * La seule comparaison que ce site peut tenir est celle qu'il a lui-même
 * publiée et détaillée : l'article « Logiciel sur mesure vs SaaS par
 * abonnement : le calcul sur 5 ans », qui nomme quatre outils réels, leur
 * prix mensuel et leur total. 105 €/mois, soit environ 6 300 € sur cinq ans.
 * Le lien vers l'article est à côté du chiffre, pas en bas de page : une
 * source qu'on ne peut pas atteindre n'est pas une source.
 *
 * CE QUE LA COMPARAISON NE PRÉTEND PAS ÊTRE. Elle oppose un empilement
 * d'abonnements à un outil acheté une fois. Elle ne dit pas que le SaaS est
 * un mauvais choix — l'article dit le contraire pour une activité qui
 * débute — et le texte le reprend. Une comparaison honnête nomme les cas où
 * elle ne joue pas.
 */

import { useMemo, useState } from 'react'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { SITE } from '@/config/site'
import { useBande } from '@/store/bande'
import Cadran from './Cadran'

/* LES RELEVÉS SOURCÉS, ET SEULEMENT CEUX QUI SONT EN LIGNE.
 *
 * Première version de ce bloc : un chiffre unique de 6 300 € repris de
 * l'article « Logiciel sur mesure vs SaaS : le calcul sur 5 ans ». Le lien
 * rendait 404 — l'article a une date de publication au 19 novembre et
 * n'était donc pas encore servi. Citer une source qui ne résout pas est pire
 * que ne pas en citer : le lecteur qui va vérifier trouve une page d'erreur,
 * et c'est toute la comparaison qui devient douteuse.
 *
 * Les deux relevés ci-dessous viennent d'articles DÉJÀ PUBLIÉS, vérifiés en
 * réponse 200, et leurs chiffres y sont détaillés avec les plateformes
 * nommées. `scripts/verifier-sources.mjs` revérifie les liens à chaque
 * passage : une date de publication peut bouger, un article peut être
 * renommé, et personne ne s'en apercevrait autrement.
 *
 * Ce sont des FOURCHETTES, pas des nombres ronds, parce que les sources
 * donnent des fourchettes. Les resserrer en un chiffre unique serait
 * inventer une précision que l'article ne porte pas.
 */
interface Releve {
  /** Ce à quoi on se compare, nommé. */
  nom: string
  mensuelBas: number
  mensuelHaut: number
  cinqAnsBas: number
  cinqAnsHaut: number
  article: string
  libelleArticle: string
}

/** Pour les offres de site : les constructeurs par abonnement. */
const CONSTRUCTEUR: Releve = {
  nom: 'Un constructeur de site par abonnement',
  mensuelBas: 17,
  mensuelHaut: 40,
  cinqAnsBas: 1000,
  cinqAnsHaut: 2400,
  article: '/blog/site-internet-gratuit-cout-cache',
  libelleArticle: 'notre relevé des formules Wix, Jimdo et SiteW',
}

/** Pour le système de gestion : les SaaS métier génériques. */
const SAAS_METIER: Releve = {
  nom: 'Un SaaS métier générique',
  mensuelBas: 30,
  mensuelHaut: 150,
  cinqAnsBas: 1800,
  cinqAnsHaut: 9000,
  article: '/blog/prix-logiciel-sur-mesure',
  libelleArticle: 'notre calcul face aux abonnements',
}

const PLANS = [
  { cle: 'aucun', nom: 'Sans maintenance', mensuel: 0 },
  { cle: 'starter', nom: 'Starter', mensuel: SITE.pricing.maintenanceStarter },
  { cle: 'pro', nom: 'Pro', mensuel: SITE.pricing.maintenancePro },
  { cle: 'premium', nom: 'Premium', mensuel: SITE.pricing.maintenancePremium },
] as const

const PRIX: Record<string, { nom: string; prix: number }> = {
  vitrine: { nom: 'Site vitrine', prix: SITE.pricing.vitrine },
  multipages: { nom: 'Site multi-pages', prix: SITE.pricing.multipages },
  boutique: { nom: 'Boutique en ligne', prix: SITE.pricing.ecommerce },
  gestion: { nom: 'Système de gestion', prix: SITE.pricing.gestion },
}

export default function JustePrix() {
  /* L'offre choisie au moment 02 est reprise ici : le visiteur a déjà dit ce
     qui l'intéresse, le lui redemander serait le faire travailler deux fois.
     C'est ce que le dossier appelle « l'offre mémorisée dans le store ». */
  const offre = useBande((s) => s.offre)
  const [plan, setPlan] = useState<string>('starter')

  const base = PRIX[offre] ?? PRIX.vitrine
  /* On ne compare pas un site à un logiciel de gestion : le relevé suit
     l'offre, et chacun pointe vers l'article qui le détaille. */
  const releve = offre === 'gestion' ? SAAS_METIER : CONSTRUCTEUR
  const planActif = PLANS.find((p) => p.cle === plan) ?? PLANS[1]

  /* La première année de maintenance est incluse à la livraison : la
     facturer dans le total à cinq ans gonflerait le chiffre de notre côté.
     Quatre années payantes, donc, et c'est écrit sous le total. */
  const cinqAns = useMemo(
    () => base.prix + planActif.mensuel * 12 * 4,
    [base.prix, planActif.mensuel],
  )

  /* L'écart est lui aussi une fourchette : comparer un nombre exact à une
     fourchette et n'en retenir qu'une borne serait choisir celle qui
     arrange. */
  const ecartBas = releve.cinqAnsBas - cinqAns
  const ecartHaut = releve.cinqAnsHaut - cinqAns

  return (
    <section id="prix" className="su-prix" aria-labelledby="su-prix-titre">
      <div className="su-prix__corps">
        <header className="su-prix__entete">
          <p className="su-surtitre">06 — Le juste prix</p>
          <h2 id="su-prix-titre" className="su-prix__titre">
            Le même cahier des charges.
            <br />
            <span className="su-prix__accent">Une facture lisible.</span>
          </h2>
        </header>

        {/* ── Ce que vous payez ─────────────────────────────────────────── */}
        <div className="su-prix__colonne">
          <h3 className="su-prix__sous">{base.nom}</h3>
          <dl className="su-prix__lignes">
            <div>
              <dt>À la commande</dt>
              <dd>
                <i>à partir de </i>
                <Cadran
                  valeur={Math.round((base.prix * SITE.conditions.acomptePourcent) / 100)}
                  suffixe="€"
                />
                <span className="su-prix__detail">
                  {' '}
                  soit {SITE.conditions.acomptePourcent} %
                </span>
              </dd>
            </div>
            <div>
              <dt>À la livraison</dt>
              <dd>
                <i>à partir de </i>
                <Cadran
                  valeur={Math.round((base.prix * SITE.conditions.soldePourcent) / 100)}
                  suffixe="€"
                />
                <span className="su-prix__detail">
                  {' '}
                  soit {SITE.conditions.soldePourcent} %
                </span>
              </dd>
            </div>
            <div>
              <dt>Total</dt>
              {/* « À partir de » sur toutes les offres : aucun de ces
                  montants n'est un prix ferme. */}
              <dd className="su-prix__total">
                <i>à partir de </i>
                <Cadran valeur={base.prix} suffixe="€" />
              </dd>
            </div>
          </dl>
          <p className="su-prix__mention">
            Paiement en trois fois possible au-delà de{' '}
            {SITE.conditions.paiementTroisFoisDes} €. {SITE.conditions.tva}
          </p>
        </div>

        {/* ── Ce que ça comprend, et ce que ça ne comprend pas ──────────── */}
        <div className="su-prix__colonne">
          <h3 className="su-prix__sous">Compris dans le prix</h3>
          <ul className="su-prix__liste">
            <li>{SITE.conditions.revisionsIncluses} séries de retours</li>
            <li>{SITE.conditions.supportJours} jours de support après mise en ligne</li>
            <li>Hébergement 12 mois et certificat SSL</li>
            <li>Formation à la prise en main</li>
            <li>{SITE.conditions.propriete}</li>
          </ul>
          <h3 className="su-prix__sous su-prix__sous--contre">Non compris</h3>
          <ul className="su-prix__liste su-prix__liste--contre">
            <li>Le nom de domaine ({SITE.conditions.nomDomaine})</li>
            <li>La rédaction des textes et les photographies, sauf devis</li>
            <li>La maintenance au-delà de la première année</li>
          </ul>
        </div>

        {/* ── Le coût à cinq ans, et sa source ──────────────────────────── */}
        <div className="su-prix__cinq">
          <h3 className="su-prix__sous">Sur cinq ans</h3>

          <div
            className="su-prix__plans"
            role="radiogroup"
            aria-label="Plan de maintenance"
          >
            {PLANS.map((p) => (
              <button
                key={p.cle}
                type="button"
                role="radio"
                aria-checked={p.cle === plan}
                className="su-prix__plan"
                onClick={() => setPlan(p.cle)}
              >
                {p.nom}
                {p.mensuel > 0 ? <span> · {p.mensuel} €/mois</span> : null}
              </button>
            ))}
          </div>

          <div className="su-prix__balance">
            <div className="su-prix__face">
              <p className="su-prix__face-nom">Votre {base.nom.toLowerCase()}</p>
              <p className="su-prix__face-chiffre">
                <Cadran valeur={cinqAns} suffixe="€" />
              </p>
              <p className="su-prix__face-note">
                Création{planActif.mensuel > 0 ? ` + ${planActif.nom} pendant 4 ans` : ''}.
                La première année de maintenance est incluse à la livraison.
              </p>
            </div>

            <div className="su-prix__face su-prix__face--contre">
              <p className="su-prix__face-nom">{releve.nom}</p>
              <p className="su-prix__face-chiffre">
                {releve.cinqAnsBas.toLocaleString('fr-FR')} à{' '}
                {releve.cinqAnsHaut.toLocaleString('fr-FR')} €
              </p>
              <p className="su-prix__face-note">
                {releve.mensuelBas} à {releve.mensuelHaut} €/mois, pour
                toujours, et sans rien posséder au bout. Plateformes nommées et
                chiffres détaillés dans{' '}
                <Link href={releve.article} className="su-prix__source">
                  {releve.libelleArticle}
                </Link>
                .
              </p>
            </div>
          </div>

          {/* L'écart est affiché comme une soustraction, pas comme un
              multiplicateur : un rapport impressionne et ne se vérifie pas,
              une différence en euros se recalcule de tête. */}
          <p className="su-prix__ecart">
            {ecartBas > 0 ? (
              <>
                Sur cinq ans, l’écart va de{' '}
                <strong>{ecartBas.toLocaleString('fr-FR')} €</strong> à{' '}
                <strong>{ecartHaut.toLocaleString('fr-FR')} €</strong> en votre
                faveur, selon la formule à laquelle vous comparez.
              </>
            ) : ecartHaut > 0 ? (
              <>
                Sur cinq ans, cette combinaison se situe entre{' '}
                <strong>{Math.abs(ecartBas).toLocaleString('fr-FR')} €</strong>{' '}
                de plus et{' '}
                <strong>{ecartHaut.toLocaleString('fr-FR')} €</strong> de moins
                que l’abonnement. Le croisement dépend de la formule comparée.
              </>
            ) : (
              <>
                Sur cinq ans, cette combinaison revient plus cher que
                l’abonnement — entre{' '}
                <strong>{Math.abs(ecartHaut).toLocaleString('fr-FR')} €</strong>{' '}
                et{' '}
                <strong>{Math.abs(ecartBas).toLocaleString('fr-FR')} €</strong>.
                C’est écrit aussi.
              </>
            )}
          </p>

          {/* Une comparaison honnête nomme les cas où elle ne joue pas. */}
          <p className="su-prix__nuance">
            Ce n’est pas vrai dans tous les cas : pour une activité qui débute,
            qui cherche encore ses outils ou dont le besoin est saisonnier,
            l’abonnement reste le bon choix — notre article le dit aussi.
          </p>

          <div className="su-prix__actions">
            <Link
              href={`/devis?base=${offre}&maintenance=${plan}`}
              className="su-action su-action--eclat"
            >
              Obtenir ce devis
              <ArrowRight size={16} aria-hidden="true" />
            </Link>
            <Link href="/tarifs" className="su-lien-trace">
              Le détail des tarifs
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
