'use client'

/**
 * LA MÉTHODE — une séquence ÉDITORIALE.
 *
 * Volontairement dans un autre langage visuel que le reste de la page. Après
 * la salle de projection, reprendre une mise en scène serait redondant : ici
 * il n'y a ni encre, ni profondeur, ni épinglage. Une page imprimée, plutôt :
 * filets, chiffres en marge, colonnes dissymétriques, un encadré au milieu du
 * flux comme dans un document.
 *
 * Le seul mouvement est un BALAYAGE : chaque étape se découvre de la gauche
 * vers la droite quand elle entre dans le cadre, comme un texte qu'on révèle
 * à la règle. Le filet vertical se dessine au fil du défilement.
 *
 * Le contenu est celui de la version précédente, à l'identique : aucune
 * promesse nouvelle n'est introduite.
 */

import { useEffect, useMemo, useRef, useState } from 'react'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { SITE } from '@/config/site'
import { useRevelation } from '@/lib/useRevelation'
import { ajouterJoursOuvres, formaterJour } from '@/lib/joursOuvres'

/* LE CALENDRIER RÉEL (dossier §10.8).
 *
 * Chaque étape porte son décalage en JOURS OUVRÉS depuis le premier contact.
 * `null` signifie délibérément « pas de date » : les étapes qui dépendent de
 * vous ne peuvent pas être datées par nous, et leur en coller une serait une
 * pression inventée. Le dossier interdit exactement ça (§15.3 : aucune
 * disponibilité calculée pour fabriquer de l'urgence).
 *
 * Les décalages ne sont pas choisis : ils découlent des engagements déjà
 * écrits ailleurs sur le site — devis sous 72 h, livraison en 10 jours
 * ouvrés, support de 30 jours — et le libellé dit « au plus tard ». */
const ETAPES = [
  {
    num: '01',
    titre: 'Démo offerte',
    texte: 'On vous montre avant de vous vendre — une démo réelle de votre futur site.',
    marge: 'Vous ne signez rien à ce stade.',
    ouvres: 0,
  },
  {
    num: '02',
    titre: 'Devis sur mesure',
    texte: 'Devis détaillé sous 72 h. Prix fixe, planning précis, aucune surprise.',
    marge: 'Le prix annoncé est le prix payé.',
    ouvres: 3,
  },
  {
    num: '03',
    titre: 'Signature',
    texte: 'Rien ne démarre avant votre accord. Vous validez chaque étape.',
    marge: null,
    // Pas de date : c'est vous qui la fixez.
    ouvres: null,
  },
  {
    num: '04',
    titre: 'Développement & livraison',
    texte: 'Code propre, performant, livré en 10 jours ouvrés avec formation.',
    marge: 'Le code vous appartient.',
    ouvres: 13,
  },
  {
    num: '05',
    titre: 'Ajustements inclus',
    texte: 'Support 30 jours post-livraison. Les retouches sont dans le prix.',
    marge: null,
    ouvres: 14,
  },
  {
    num: '06',
    titre: 'Croissance',
    texte: 'Blog SEO, maintenance mensuelle et suivi pour faire grandir votre activité.',
    marge: null,
    ouvres: null,
  },
] as const

/** L'encadré, posé dans le flux après la troisième étape — comme en presse. */
function Encadre() {
  return (
    <aside className="su-methode__encadre">
      <p className="su-methode__encadre-titre">Ce que vous faites, vous</p>
      <ol className="su-methode__encadre-liste">
        <li>Regarder la démo et dire ce qui vous plaît</li>
        <li>Fournir vos textes et vos photos</li>
        <li>Valider le devis</li>
      </ol>
      <p className="su-methode__encadre-note">
        Le reste — conception, développement, mise en ligne, hébergement — est
        de notre côté.
      </p>
    </aside>
  )
}

export default function LaRoute() {
  const section = useRef<HTMLElement>(null)
  const filet = useRef<HTMLSpanElement>(null)

  /* LES DATES SE CALCULENT DANS LE NAVIGATEUR, PAS À LA CONSTRUCTION.

     Cette page est générée statiquement : une date calculée au build serait
     celle du jour du déploiement et vieillirait en silence. Un visiteur de
     décembre lirait les dates d'octobre, ce qui est pire que pas de date du
     tout. D'où le calcul au montage, et `null` tant qu'il n'a pas eu lieu —
     sans JavaScript, la frise s'affiche sans dates, ce qui reste juste. */
  const [aujourdhui, setAujourdhui] = useState<Date | null>(null)
  useEffect(() => setAujourdhui(new Date()), [])

  const dates = useMemo(() => {
    if (!aujourdhui) return null
    return ETAPES.map((e) =>
      e.ouvres === null ? null : ajouterJoursOuvres(aujourdhui, e.ouvres),
    )
  }, [aujourdhui])

  // La révélation passe par la primitive partagée : l'état masqué n'existe
  // que si JavaScript peut le lever, et une temporisation de secours garantit
  // que le texte apparaît même si l'observateur ne se déclenche jamais.
  const revelation = useRevelation({ nombre: ETAPES.length, marge: '0px 0px -18% 0px' })

  // Le filet se dessine au fil du défilement. Manipulation directe de la
  // hauteur : pas de transition CSS, pour que le trait suive la main.
  useEffect(() => {
    const el = section.current
    const trait = filet.current
    if (!el || !trait) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      trait.style.height = '100%'
      return
    }

    let attente = false
    const maj = () => {
      attente = false
      const r = el.getBoundingClientRect()
      const h = window.innerHeight
      const debut = r.top - h * 0.8
      const fin = r.bottom - h * 0.25
      const p = Math.min(Math.max(-debut / Math.max(fin - debut, 1), 0), 1)
      trait.style.height = `${(p * 100).toFixed(2)}%`
    }
    const surDefilement = () => {
      if (attente) return
      attente = true
      requestAnimationFrame(maj)
    }

    window.addEventListener('scroll', surDefilement, { passive: true })
    window.addEventListener('resize', surDefilement)
    maj()
    return () => {
      window.removeEventListener('scroll', surDefilement)
      window.removeEventListener('resize', surDefilement)
    }
  }, [])

  return (
    <section ref={section} id="methode" className="su-methode su-ambiance">
      <div className="su-methode__cadre">
        <header className="su-methode__entete">
          <p className="su-surtitre">07 — Notre méthode</p>
          <h2 className="su-methode__titre">Comment ça se passe ?</h2>
          <p className="su-methode__chapo su-doux">
            Six étapes claires. Aucune mauvaise surprise — de la démo à la
            croissance.
          </p>
          {/* Ce que ces dates sont, et ce qu'elles ne sont pas. Sans cette
              ligne, une frise datée se lit comme un engagement contractuel
              alors que c'est une projection à partir d'aujourd'hui. */}
          {aujourdhui && (
            <p className="su-methode__projection">
              Dates calculées en jours ouvrés depuis aujourd’hui, jours fériés
              français déduits. Projection, pas engagement : le départ réel est
              fixé à la signature.
            </p>
          )}
          <p className="su-methode__duree">
            <span className="su-methode__duree-chiffre su-accent">
              {SITE.delais.vitrine.split(' ')[0]}
            </span>
            <span className="su-methode__duree-unite su-doux">
              {SITE.delais.vitrine.split(' ').slice(1).join(' ')} de bout en bout
            </span>
          </p>
        </header>

        <div className="su-methode__sequence">
          {/* Le filet de marge : rail gris, trait d'avancement par-dessus. */}
          <div className="su-methode__filet" aria-hidden="true">
            <span ref={filet} className="su-methode__filet-trace" />
          </div>

          <ol className="su-methode__etapes">
            {ETAPES.map((etape, i) => (
              <li key={etape.num}>
                <article
                  {...revelation.props(i)}
                  className={`su-methode__etape ${revelation.props(i).className}`}
                  style={{ '--i': i } as React.CSSProperties}
                >
                  <p className="su-methode__num" aria-hidden="true">
                    {etape.num}
                  </p>
                  <div className="su-methode__corps">
                    <h3 className="su-methode__etape-titre">{etape.titre}</h3>
                    {/* La date réelle, quand elle existe. Les étapes qui
                        dépendent du client n'en ont pas, et c'est écrit. */}
                    {dates?.[i] ? (
                      <p className="su-methode__date">
                        <time dateTime={dates[i]!.toISOString().slice(0, 10)}>
                          {formaterJour(dates[i]!)}
                        </time>
                        <span className="su-methode__date-mention"> au plus tard</span>
                      </p>
                    ) : etape.ouvres === null ? (
                      <p className="su-methode__date su-methode__date--libre">
                        Quand vous le décidez
                      </p>
                    ) : null}
                    <p className="su-methode__texte su-doux">{etape.texte}</p>
                  </div>
                  {etape.marge && (
                    <p className="su-methode__marge su-doux">{etape.marge}</p>
                  )}
                </article>

                {/* L'encadré s'insère dans la séquence, pas à côté d'elle. */}
                {i === 2 && <Encadre />}
              </li>
            ))}
          </ol>
        </div>

        <footer className="su-methode__pied">
          <Link href="/contact" className="su-methode__action">
            Commencer par la démo offerte
            <ArrowRight size={16} aria-hidden="true" />
          </Link>
          <p className="su-methode__mention su-doux">
            Sans engagement · Devis sous 72 h
          </p>
        </footer>
      </div>
    </section>
  )
}
