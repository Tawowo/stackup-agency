/**
 * BLOCS DE L'OFFRE CLUBS — composants serveur partagés par la grande page, les formules, la page tarifs et les pages locales.
 * Tous les montants sont lus dans pricing.ts (jamais écrits ici).
 */
import Link from 'next/link'
import type { ReactNode } from 'react'
import Action from '@/components/ui/Action'
import Lie from '@/components/editorial/Lie'
import Accordeon from '@/components/editorial/Accordeon'
import { DEMO, MENTION_FFT, REFERENCE, CLUBS } from '@/config/offre-clubs'
import { PRICING } from '@/data/offre-clubs/pricing'
import { ABONNEMENT_INCLUS, ABONNEMENT_NON_INCLUS, HORS_CATALOGUE, MENTION_PRIX_INDICATIFS, conditionsAbonnement } from '@/data/offre-clubs/inclus'
import { prixPack } from '@/domain/clubs/calcul'
import { eur } from '@/domain/clubs/resume'
import { jetons } from '@/lib/jetons'
import type { QR } from '@/data/offre-clubs/types'
import './clubs.css'

export const j = jetons

export function Section({ id, etiquette, titre, intro, children, variante = 'clair' }: { id: string; etiquette?: string; titre: string; intro?: string; children?: ReactNode; variante?: 'clair' | 'creuse' }) {
  return (
    <section className="cl-sec" data-variante={variante} id={id} aria-labelledby={`${id}-t`}>
      {etiquette && <p className="su-mono cl-sec__etiquette">{j(etiquette)}</p>}
      <h2 id={`${id}-t`} className="su-display cl-sec__titre">
        {j(titre)}
      </h2>
      {intro && (
        <p className="cl-sec__intro">
          <Lie t={j(intro)} />
        </p>
      )}
      {children}
    </section>
  )
}

/** Les trois boutons de démo, très visibles. */
export function BoutonsDemo({ variante = 'ligne' }: { variante?: 'ligne' | 'colonne' }) {
  return (
    <div className="cl-demo" data-variante={variante}>
      <Action href={DEMO.site} evt="clubs_clic_demo">
        Voir le site d’un club
      </Action>
      <Action href={DEMO.bureau} variante="contour" evt="clubs_clic_demo">
        Ouvrir le logiciel du bureau
      </Action>
      <Action href={DEMO.roles} variante="contour" evt="clubs_clic_demo">
        Essayer en tant que parent
      </Action>
    </div>
  )
}

export function MentionFft() {
  return <p className="cl-mention">{MENTION_FFT}</p>
}

export const BoutonsPrincipaux = () => (
  <p className="cl-hero__actions">
    <Action href={`${CLUBS}/demo`} evt="clubs_clic_demo">
      Voir la démo
    </Action>
    <Action href={`${CLUBS}/simulateur`} variante="contour">
      Estimer le prix pour mon club
    </Action>
  </p>
)

export function CartesCategories() {
  return (
    <div className="cl-cats">
      {PRICING.categories.map((c) => {
        const p = prixPack(c)
        return (
          <article className="cl-cat su-plaque su-plaque--ivoire" key={c.id}>
            <header>
              <h3>{c.nom}</h3>
              <p className="su-mono">
                {c.licencies.min}
                {c.licencies.max ? ` à ${c.licencies.max}` : ' et plus'} licenciés
              </p>
            </header>
            <dl>
              <div>
                <dt>Site</dt>
                <dd>
                  {eur(c.site.miseEnPlace)} <span>+ {eur(c.site.mensuel)}/mois</span>
                </dd>
              </div>
              <div>
                <dt>Logiciel</dt>
                <dd>
                  {eur(c.logiciel.miseEnPlace)} <span>+ {eur(c.logiciel.mensuel)}/mois</span>
                </dd>
              </div>
              <div data-pack="1">
                <dt>Site + logiciel</dt>
                <dd>
                  {eur(p.miseEnPlace)} <span>+ {eur(p.mensuel)}/mois</span>
                </dd>
              </div>
            </dl>
            <p className="cl-cat__note">
              {c.heures.pack} h d’accompagnement avec le pack ({c.heures.site} h pour le site, {c.heures.logiciel} h pour le logiciel) · {c.stockageGo} Go de stockage
            </p>
          </article>
        )
      })}
      <article className="cl-cat cl-cat--devis">
        <header>
          <h3>Une situation particulière ?</h3>
          <p className="su-mono">Club omnisport, plusieurs sections</p>
        </header>
        <p>Une fonction absente, une reprise depuis un autre logiciel, un club omnisport : cela se chiffre sur devis, avant tout engagement.</p>
        <Action href="/contact?a=appel" variante="contour">
          Demander un devis
        </Action>
      </article>
    </div>
  )
}

export function ListeCoches({ items, signe = 'oui' }: { items: string[]; signe?: 'oui' | 'non' | 'devis' }) {
  return (
    <ul className="cl-liste" data-signe={signe}>
      {items.map((x) => (
        <li key={x}>
          <Lie t={j(x)} />
        </li>
      ))}
    </ul>
  )
}

/** Inclus dans l'abonnement / non inclus / sur devis. */
export function InclusNonInclus() {
  return (
    <div className="cl-trois">
      <div className="cl-trois__col">
        <h3>Inclus dans l’abonnement</h3>
        <ListeCoches items={ABONNEMENT_INCLUS} signe="oui" />
      </div>
      <div className="cl-trois__col">
        <h3>Non inclus</h3>
        <ListeCoches items={ABONNEMENT_NON_INCLUS} signe="non" />
      </div>
      <div className="cl-trois__col">
        <h3>Sur devis sur mesure</h3>
        <ListeCoches items={HORS_CATALOGUE.map((h) => h.libelle.charAt(0).toUpperCase() + h.libelle.slice(1))} signe="devis" />
        <p className="cl-aide">Un développement propre à un seul club est chiffré avant ({PRICING.developpementSurMesureHeure} € de l’heure).</p>
        <Action href="/contact?a=appel" variante="contour">
          Demander un devis
        </Action>
      </div>
    </div>
  )
}

export function ConditionsListe() {
  return <ListeCoches items={conditionsAbonnement()} signe="oui" />
}

export function MentionPrix() {
  return <p className="cl-mention">{MENTION_PRIX_INDICATIFS}</p>
}

export function Faq({ questions, id = 'faq' }: { questions: QR[]; id?: string }) {
  return <Accordeon groupe={id} questions={questions.map((q) => ({ q: j(q.q), r: j(q.a) }))} />
}

export function Reference() {
  const t = REFERENCE.temoignage
  return (
    <div className="cl-ref su-plaque su-plaque--ivoire">
      <p className="su-mono cl-ref__etiquette">Référence réelle</p>
      <h3>{REFERENCE.nom} utilise la solution</h3>
      <p>
        Le club de tennis de Savigné-sur-Lathan, Gizeux et Cléré-les-Pins fait vivre son site avec cette plateforme. Par transparence : {REFERENCE.lien} Vous voyez donc la solution telle qu’un bureau de bénévoles la vit au quotidien, avec ses réussites et ses points à améliorer.
      </p>
      {t && (
        <blockquote className="cl-ref__citation">
          <p>« {t.citation} »</p>
          <footer>
            {t.auteur}, {t.role}
          </footer>
        </blockquote>
      )}
      <p className="cl-ref__liens">
        <Link href={REFERENCE.fiche}>Voir le site du club en réalisation</Link> · <a href={REFERENCE.siteUrl} rel="noopener noreferrer" target="_blank">Visiter le site du club</a>
      </p>
    </div>
  )
}

export function AppelFinal({ titre, texte }: { titre: string; texte: string }) {
  return (
    <section className="cl-final su-plaque su-plaque--encre" id="contact" aria-labelledby="cl-final-t">
      <h2 id="cl-final-t" className="su-display">
        {j(titre)}
      </h2>
      <p>{j(texte)}</p>
      <div className="cl-final__actions">
        <Action href="/contact?a=appel">Réserver un appel gratuit</Action>
        <Action href={`${CLUBS}/simulateur`} variante="contour">
          Estimer mon prix
        </Action>
        <Action href="/contact?a=demo" variante="contour">
          Demander un devis
        </Action>
      </div>
      <p className="cl-final__ligne">
        Ou écrivez-nous : <a href="mailto:contact@stackup-agency.fr">contact@stackup-agency.fr</a> · <a href="tel:+33764020898">07 64 02 08 98</a>
      </p>
    </section>
  )
}

/** Fil de liens vers les autres pages de l'offre (maillage interne en bas de page). */
export function LiensOffre({ titre = 'Aller plus loin' }: { titre?: string }) {
  const liens = [
    { href: `${CLUBS}`, nom: 'L’offre complète pour les clubs' },
    { href: `${CLUBS}/tarifs`, nom: 'Les tarifs détaillés' },
    { href: `${CLUBS}/simulateur`, nom: 'Le simulateur de prix' },
    { href: `${CLUBS}/demo`, nom: 'La démo' },
    { href: `${CLUBS}/fonctionnalites`, nom: 'Toutes les fonctionnalités' },
    { href: `${CLUBS}/faq`, nom: 'Les questions fréquentes' },
    { href: `${CLUBS}/guides`, nom: 'Les guides pour clubs' },
    { href: `${CLUBS}/indre-et-loire`, nom: 'Clubs d’Indre-et-Loire' },
  ]
  return (
    <nav className="cl-liens" aria-label={titre}>
      <p className="su-mono">{titre}</p>
      <ul>
        {liens.map((l) => (
          <li key={l.href}>
            <Link href={l.href}>{l.nom}</Link>
          </li>
        ))}
      </ul>
    </nav>
  )
}

const GROUPES_OPTIONS = [
  { id: 'fonction', titre: 'Fonctions en option' },
  { id: 'visibilite', titre: 'Être trouvé sur Internet' },
  { id: 'contenu', titre: 'Pages et contenus' },
  { id: 'service', titre: 'Services' },
] as const

/** Toutes les options, par famille, avec leurs prix (lus dans pricing.ts) et leurs conditions. */
export function OptionsGrille() {
  return (
    <div className="cl-options">
      {GROUPES_OPTIONS.map((g) => (
        <div key={g.id}>
          <h3>{g.titre}</h3>
          <ul className="cl-options__liste">
            {PRICING.options
              .filter((o) => o.groupe === g.id)
              .map((o) => (
                <li key={o.id} id={`option-${o.id}`}>
                  <div>
                    <strong>{o.nom}</strong>
                    <p>
                      {o.description}
                      {o.condition ? ` ${o.condition}` : ''}
                    </p>
                  </div>
                  <p className="cl-options__prix">
                    {o.miseEnPlace !== null && (
                      <span>
                        {eur(o.miseEnPlace)}
                        {o.unite === 'page' ? ' par page' : ''} <small>mise en place</small>
                      </span>
                    )}
                    {o.mensuel ? (
                      <span>
                        {eur(o.mensuel)} <small>par mois</small>
                      </span>
                    ) : null}
                  </p>
                </li>
              ))}
            {g.id === 'service' && (
            <li id="option-heure-supplementaire">
              <div>
                <strong>Heure d’accompagnement supplémentaire</strong>
                <p>Visio, appel ou présentiel, par tranche de {PRICING.heureSupplementaire.trancheMinutes} minutes.</p>
              </div>
              <p className="cl-options__prix">
                <span>
                  {eur(PRICING.heureSupplementaire.prix)} <small>de l’heure</small>
                </span>
              </p>
            </li>
            )}
          </ul>
        </div>
      ))}
    </div>
  )
}
