/**
 * BRIQUES COMMUNES DES PAGES « CLUBS DE TENNIS » — rendu serveur, contenu complet sans JavaScript.
 * Boutons de démo, étapes, carte de prix, appel final, pied d'offre (mentions FFT et prix indicatifs).
 */
import Link from 'next/link'
import Action from '@/components/ui/Action'
import Lie from '@/components/editorial/Lie'
import { BOUTONS_DEMO, MENTIONS_CLUBS, PRODUCT_NAME, RACINE_CLUBS } from '@/config/offre-clubs'
import { CATEGORIES, option, tarif, type Formule, type OptionId } from '@/data/offre-clubs/pricing'
import { jetons } from '@/lib/jetons'
import { SITE } from '@/config/site'
import './clubs.css'

const fr = new Intl.NumberFormat('fr-FR', { maximumFractionDigits: 0 })
export const eur = (n: number) => `${fr.format(n).replace(/ /g, ' ')} €`

/** Les trois boutons de démo (site, logiciel du bureau, parent), ou une sélection. */
export function BoutonsDemo({ ids = ['site', 'bureau', 'parent'], avecTexte = false }: { ids?: ('site' | 'bureau' | 'parent')[]; avecTexte?: boolean }) {
  const boutons = BOUTONS_DEMO.filter((b) => ids.includes(b.id))
  if (!avecTexte) {
    return (
      <p className="cl-demo-boutons">
        {boutons.map((b, i) => (
          <Action key={b.id} href={b.url} variante={i === 0 ? 'plein' : 'contour'}>
            {b.libelle}
          </Action>
        ))}
      </p>
    )
  }
  return (
    <ul className="cl-demo-cartes">
      {boutons.map((b, i) => (
        <li key={b.id} className="su-plaque su-plaque--ivoire">
          <span className="su-mono cl-num">{String(i + 1).padStart(2, '0')}</span>
          <h3>{b.titre}</h3>
          <p>{b.decouverte}</p>
          <Action href={b.url} variante={b.id === 'bureau' ? 'plein' : 'contour'}>
            {b.libelle}
          </Action>
        </li>
      ))}
    </ul>
  )
}

/** Liste d'étapes numérotées (« comment ça marche »). */
export function Etapes({ etapes, id = 'comment-ca-marche', titre = 'Comment ça marche' }: { etapes: { titre: string; texte: string }[]; id?: string; titre?: string }) {
  return (
    <section id={id} aria-labelledby={`${id}-t`} className="cl-bloc">
      <h2 id={`${id}-t`}>{titre}</h2>
      <ol className="cl-etapes">
        {etapes.map((e, i) => (
          <li key={e.titre}>
            <span className="su-mono cl-num" aria-hidden="true">
              {String(i + 1).padStart(2, '0')}
            </span>
            <div>
              <h3>{jetons(e.titre)}</h3>
              <p>
                <Lie t={jetons(e.texte)} />
              </p>
            </div>
          </li>
        ))}
      </ol>
    </section>
  )
}

/** Ce que coûte une formule ou une option : « à partir de », lu dans pricing.ts. */
export function CarteTarif({ formule, optionId, texte }: { formule?: Formule; optionId?: OptionId; texte?: string }) {
  const c = CATEGORIES[0]!
  const t = formule ? tarif(c, formule) : null
  const o = optionId ? option(optionId) : null
  return (
    <aside className="cl-tarif su-plaque su-plaque--ivoire" aria-label="Ce que ça coûte">
      <p className="su-mono cl-tarif__etiquette">Ce que ça coûte</p>
      {t && (
        <p className="cl-tarif__prix">
          <span>à partir de</span> <strong>{eur(t.mois)}</strong> <span>par mois</span>
          <small>
            + mise en place à partir de {eur(t.miseEnPlace)}, payable en 3 fois sans frais ({formule === 'pack' ? 'site + logiciel' : formule === 'site' ? 'le site' : 'le logiciel'}, catégorie {c.nom})
          </small>
        </p>
      )}
      {o && (
        <p className="cl-tarif__prix">
          <span>option</span> <strong>{eur(o.miseEnPlace)}</strong> <span>{o.unite === 'page' ? 'par page' : 'à la mise en place'}</span>
          {o.mois > 0 && <small>+ {eur(o.mois)} par mois · {o.condition}</small>}
          {o.mois === 0 && <small>{o.condition}</small>}
        </p>
      )}
      {texte && (
        <p className="cl-tarif__texte">
          <Lie t={jetons(texte)} />
        </p>
      )}
      <p className="cl-tarif__actions">
        <Action href={`${RACINE_CLUBS}/simulateur`}>Estimer le prix pour mon club</Action>
        <Action href={`${RACINE_CLUBS}/tarifs`} variante="lien">
          Tous les tarifs
        </Action>
      </p>
    </aside>
  )
}

/** Appel final : réserver un appel, demander un devis, écrire. */
export function AppelFinal({ titre = 'Parlons de votre club.' }: { titre?: string }) {
  return (
    <section className="cl-fin" aria-labelledby="cl-fin-t">
      <h2 id="cl-fin-t" className="su-display">
        {titre}
      </h2>
      <p>
        Un appel de 30 minutes, gratuit, avec {SITE.fondateur} : vos licenciés, vos outils actuels, ce qui vous prend du temps. Le premier rendez-vous peut aussi se faire au club, en Touraine.
      </p>
      <p className="cl-fin__actions">
        <Action href="/contact?a=appel&objet=Club%20de%20tennis">Réserver un appel</Action>
        <Action href={`${RACINE_CLUBS}/simulateur#devis`} variante="contour">
          Demander un devis
        </Action>
        <Action href={`mailto:${SITE.email}?subject=${encodeURIComponent(`${PRODUCT_NAME} — notre club`)}`} variante="lien">
          Écrire à {SITE.email}
        </Action>
      </p>
    </section>
  )
}

/** Pied de chaque page de l'offre : prix indicatifs, non-affiliation FFT, CGV de la plateforme. */
export function PiedOffre() {
  return (
    <aside className="cl-pied" aria-label="Mentions de l’offre">
      <p>{MENTIONS_CLUBS.prix}</p>
      <p>{MENTIONS_CLUBS.fft}</p>
      <p>
        Conditions : <Link href="/cgv-plateforme">CGV de la plateforme {PRODUCT_NAME}</Link> · {SITE.mentions.tva}.
      </p>
    </aside>
  )
}

/** Grille de liens vers d'autres pages de l'offre. */
export function GrilleLiens({ titre, liens, id }: { titre: string; id: string; liens: { href: string; nom: string; note?: string }[] }) {
  return (
    <section id={id} aria-labelledby={`${id}-t`} className="cl-bloc">
      <h2 id={`${id}-t`}>{titre}</h2>
      <ul className="cl-liens">
        {liens.map((l) => (
          <li key={l.href}>
            <Link href={l.href}>
              <b>{l.nom}</b>
              {l.note && <span>{jetons(l.note)}</span>}
            </Link>
          </li>
        ))}
      </ul>
    </section>
  )
}
