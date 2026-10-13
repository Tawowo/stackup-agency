'use client'

/**
 * MOMENT 02 — L'OFFRE.
 *
 * Spécification : dossier §10.3, fiche d'animation 11.3.
 *
 * CE QUE ÇA REMPLACE. L'ancienne section « Atelier » présentait sept
 * services par une grille de vignettes et vingt-cinq fondus-translations.
 * Elle annonçait « Survolez chaque service » alors qu'elle ne réagissait
 * qu'au clic, et sur mobile son aperçu collait au-dessus de la liste en
 * masquant la moitié de l'écran.
 *
 * CE QUE ÇA FAIT. Cinq onglets typographiques, et la bande qui prend la
 * configuration de l'offre choisie : une strate pour la vitrine, cinq pour
 * le multi-pages, une grille de plaques pour la boutique, des modules reliés
 * pour le système de gestion, une page et un formulaire pour l'association.
 * L'objet explique l'offre au lieu de l'illustrer.
 *
 * TOUT CHIFFRE VIENT DE `site.ts`. Prix, délais, révisions, support : la
 * source unique. Le dossier en fait une règle (§3.5) après avoir relevé
 * jusqu'à trois versions de la même condition selon l'endroit du site.
 *
 * ACCESSIBILITÉ. Les onglets sont de vrais boutons dans un `role="tablist"`,
 * navigables aux flèches comme le veut la grammaire d'interaction (§12.1),
 * et l'état courant est annoncé en clair : le canvas est `aria-hidden`, donc
 * sans cette ligne un lecteur d'écran ne saurait pas que l'objet a changé.
 */

import { useCallback, useEffect, useRef } from 'react'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { SITE } from '@/config/site'
import { useBande, type Offre as NomOffre } from '@/store/bande'
import Cadran from './Cadran'

interface Fiche {
  id: NomOffre
  nom: string
  prix: number
  prefixe?: string
  delai: string
  perimetre: string
  lien: string
}

const OFFRES: Fiche[] = [
  {
    id: 'association',
    nom: 'Site association',
    prix: SITE.pricing.association,
    delai: SITE.delais.association,
    perimetre: 'Design associatif, adhésion en ligne, calendrier, hébergement 12 mois, SSL, formation.',
    lien: '/services/site-association',
  },
  {
    id: 'vitrine',
    nom: 'Site vitrine',
    prix: SITE.pricing.vitrine,
    delai: SITE.delais.vitrine,
    perimetre: 'Une page principale, design sur mesure, SEO local, formulaire, hébergement 12 mois, SSL.',
    lien: '/services/site-vitrine',
  },
  {
    id: 'multipages',
    nom: 'Site multi-pages',
    prix: SITE.pricing.multipages,
    delai: SITE.delais.multipages,
    perimetre: "Jusqu'à 10 pages, blog et galerie, formulaires avancés, statistiques de fréquentation.",
    lien: '/services/site-multi-pages',
  },
  {
    id: 'boutique',
    nom: 'Boutique en ligne',
    prix: SITE.pricing.ecommerce,
    delai: SITE.delais.ecommerce,
    perimetre: 'Catalogue, paiement, stocks, e-mails automatiques, retrait en magasin.',
    lien: '/services/site-ecommerce',
  },
  {
    id: 'gestion',
    nom: 'Système de gestion',
    prix: SITE.pricing.gestion,
    prefixe: 'à partir de',
    delai: SITE.delais.gestion,
    perimetre: 'Développement sur mesure, administration, formation, données en Europe, sans abonnement.',
    lien: '/services/systeme-gestion',
  },
]

export default function Offre() {
  const section = useRef<HTMLElement>(null)
  const ancre = useRef<HTMLDivElement>(null)
  const offre = useBande((s) => s.offre)
  const setOffre = useBande((s) => s.setOffre)
  const setEtat = useBande((s) => s.setEtat)
  const setAncrage = useBande((s) => s.setAncrage)

  const active = OFFRES.find((o) => o.id === offre) ?? OFFRES[1]

  /* AVANCE AUTOMATIQUE, ET SON VERROU DE HUIT SECONDES.

     La fiche 11.3 demande que la section fasse défiler les offres d'elle-même
     — sans quoi un visiteur qui ne clique pas ne voit qu'une des cinq formes
     et le propos de la section lui échappe — mais qu'elle se taise dès qu'il
     prend la main, pendant huit secondes.

     Sans ce verrou, le comportement est hostile : on clique « Boutique », on
     commence à lire, et la section passe à « Système de gestion » sous les
     yeux. Le verrou se réarme à chaque interaction. */
  const derniereInteraction = useRef(0)

  const choisir = useCallback(
    (id: NomOffre) => {
      derniereInteraction.current = Date.now()
      setOffre(id)
    },
    [setOffre],
  )

  useEffect(() => {
    /* Le mouvement réduit coupe l'avance : une section qui change seule est
       exactement ce que ce réglage demande d'éviter. */
    if (typeof window === 'undefined') return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const horloge = window.setInterval(() => {
      if (useBande.getState().etat !== 'offre') return
      if (Date.now() - derniereInteraction.current < 8000) return
      if (document.hidden) return
      const i = OFFRES.findIndex((o) => o.id === useBande.getState().offre)
      useBande.getState().setOffre(OFFRES[(i + 1) % OFFRES.length].id)
    }, 4200)
    return () => window.clearInterval(horloge)
  }, [])

  /* La section prend la main sur l'état de la bande quand elle entre à
     l'écran, et la rend quand elle sort. C'est le principe du canvas
     persistant : les pages et les sections DÉCLARENT ce qu'elles veulent,
     la scène obéit. */
  useEffect(() => {
    const el = section.current
    const boite = ancre.current
    if (!el || !boite) return

    const relever = () => {
      const r = boite.getBoundingClientRect()
      setAncrage({
        cx: (r.left + r.width / 2) / window.innerWidth,
        cy: (r.top + r.height / 2) / window.innerHeight,
        hauteur: r.height / window.innerHeight,
      })
    }

    let image = 0
    let enAttente = false
    const auDefilement = () => {
      if (enAttente) return
      enAttente = true
      image = requestAnimationFrame(() => {
        enAttente = false
        if (useBande.getState().etat === 'offre') relever()
      })
    }

    const vigie = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setEtat('offre')
          relever()
        }
      },
      { threshold: 0.4 },
    )
    vigie.observe(el)
    window.addEventListener('scroll', auDefilement, { passive: true })
    window.addEventListener('resize', auDefilement)
    return () => {
      cancelAnimationFrame(image)
      vigie.disconnect()
      window.removeEventListener('scroll', auDefilement)
      window.removeEventListener('resize', auDefilement)
    }
  }, [setEtat, setAncrage])

  /* Flèches haut/bas et chiffres 1 à 5, comme le prescrit la grammaire
     d'interaction. Sans ça, un onglet n'est qu'un bouton de plus. */
  const auClavier = useCallback(
    (e: React.KeyboardEvent) => {
      const i = OFFRES.findIndex((o) => o.id === offre)
      if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
        e.preventDefault()
        choisir(OFFRES[(i + 1) % OFFRES.length].id)
      } else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
        e.preventDefault()
        choisir(OFFRES[(i - 1 + OFFRES.length) % OFFRES.length].id)
      } else if (/^[1-5]$/.test(e.key)) {
        e.preventDefault()
        choisir(OFFRES[Number(e.key) - 1].id)
      }
    },
    [offre, choisir],
  )

  return (
    <section ref={section} className="su-offre" aria-labelledby="su-offre-titre">
      <div className="su-offre__corps">
        <header className="su-offre__entete">
          <p className="su-surtitre">02 — L’offre</p>
          <h2 id="su-offre-titre" className="su-offre__titre">
            Cinq façons de commencer.
          </h2>
        </header>

        <div
          className="su-offre__onglets"
          role="tablist"
          aria-label="Type de projet"
          onKeyDown={auClavier}
        >
          {OFFRES.map((o, i) => (
            <button
              key={o.id}
              role="tab"
              type="button"
              aria-selected={o.id === offre}
              tabIndex={o.id === offre ? 0 : -1}
              className="su-offre__onglet"
              onClick={() => choisir(o.id)}
            >
              <span className="su-offre__onglet-nom">{o.nom}</span>
              <span className="su-offre__onglet-prix">
                {o.prefixe ? <i>{o.prefixe} </i> : null}
                {o.prix.toLocaleString('fr-FR')} €
              </span>
              <span className="su-offre__onglet-rang" aria-hidden="true">
                {i + 1}
              </span>
            </button>
          ))}
        </div>

        {/* La boîte que la bande vient occuper. Vide : c'est une place, pas
            un contenu. Tout ce que l'objet montre est répété en clair dans
            la fiche à côté. */}
        <div ref={ancre} className="su-offre__scene" aria-hidden="true" />

        <div className="su-offre__fiche">
          <h3>{active.nom}</h3>
          <p className="su-offre__perimetre">{active.perimetre}</p>
          <dl className="su-offre__donnees">
            <div>
              <dt>Prix</dt>
              <dd>
                {active.prefixe ? `${active.prefixe} ` : ''}
                <Cadran valeur={active.prix} suffixe="€" />
              </dd>
            </div>
            <div>
              <dt>Délai</dt>
              <dd>{active.delai}</dd>
            </div>
            <div>
              <dt>Révisions</dt>
              <dd>{SITE.conditions.revisionsIncluses} comprises</dd>
            </div>
            <div>
              <dt>Support</dt>
              <dd>{SITE.conditions.supportJours} jours après mise en ligne</dd>
            </div>
          </dl>
          <div className="su-offre__actions">
            <Link href={`/configurateur?base=${active.id}`} className="su-action su-action--eclat">
              Configurer mon projet
              <ArrowRight size={16} aria-hidden="true" />
            </Link>
            <Link href={active.lien} className="su-lien-trace">
              Tout le détail
            </Link>
          </div>
          <p className="su-offre__mention">{SITE.conditions.tva}</p>
        </div>
      </div>

      <p className="sr-only" aria-live="polite">
        Offre sélectionnée : {active.nom}, {active.prix} euros, livré en {active.delai}.
      </p>
    </section>
  )
}
