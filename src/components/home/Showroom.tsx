'use client'

/**
 * LA SALLE DE PROJECTION.
 *
 * Les réalisations ne sont plus une rangée d'onglets au-dessus d'une capture.
 * La section devient un îlot d'encre dans une page claire — une salle — et les
 * projets y défilent comme une pellicule : on avance verticalement, la bande
 * se déplace horizontalement.
 *
 * Trois partis pris :
 *
 *  1. L'ÎLOT EST AUTONOME. Son encre ne vient pas de `--su-nuit` : elle lui
 *     appartient. La traversée de la page reste au plein jour autour, ce qui
 *     fait de cette section une rupture franche plutôt qu'une étape de plus.
 *
 *  2. LE DÉFILEMENT EST LA SEULE SOURCE DE VÉRITÉ. Pas d'état « projet
 *     actif » dupliqué entre React et le défilement : la position de la page
 *     détermine tout. Les pastilles de navigation ne changent pas un état,
 *     elles déplacent la page — donc clavier, souris et défilement parlent la
 *     même langue et ne peuvent pas se contredire.
 *
 *  3. LA SALLE S'ÉCLAIRE À LA COULEUR DU PROJET. Un halo prend l'accent du
 *     projet au centre de l'écran. C'est ce qui fait qu'on change de monde en
 *     avançant, au lieu de changer d'image.
 *
 * Repli : sans JavaScript, et sous mouvement réduit, la bande redevient une
 * pile verticale, complète et lisible. Rien n'est conditionné à l'animation.
 *
 * Les projets, les URL et les captures sont ceux qui existent réellement.
 */

import { useCallback, useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ExternalLink } from 'lucide-react'
import { texteLisibleSur } from '@/lib/contraste'

interface Projet {
  nom: string
  type: string
  slug: string
  image: string
  accent: string
  url: string
  tags: string[]
  /** Ce que la démo met en œuvre — déduit du projet, rien d'inventé. */
  note: string
}

const PROJETS: Projet[] = [
  {
    nom: 'Cadence Studio',
    type: 'Vitrine + livraison client — Vidéaste',
    slug: 'demo-videaste',
    image: '/images/realisations/demo-videaste.webp',
    accent: '#E8B84B',
    url: 'https://demo-videaste-vitrine.vercel.app',
    tags: ['Vidéaste', 'Livraison', 'Timeline'],
    note: 'Espace de livraison client et lecture des rushes dans le navigateur.',
  },
  {
    nom: 'Château des Lumières',
    type: 'Site vitrine — Hôtel boutique',
    slug: 'chateau-lumieres',
    image: '/images/realisations/chateau-lumieres.webp',
    accent: '#5F8D6A',
    url: 'https://stackup-demos-e85v.vercel.app',
    tags: ['Hôtel', 'Réservation', 'Animations'],
    note: 'Parcours de réservation et mise en scène animée des chambres.',
  },
  {
    nom: 'Maison Élise',
    type: 'E-commerce — Mode',
    slug: 'maison-elise',
    image: '/images/realisations/maison-elise.webp',
    accent: '#D46A92',
    url: 'https://stackup-demos-tq9a.vercel.app',
    tags: ['Boutique', 'Panier', 'Mode'],
    note: 'Catalogue, fiches produit et panier complets.',
  },
  {
    nom: 'Au Pain Doré',
    type: 'Site vitrine — Boulangerie',
    slug: 'au-pain-dore',
    image: '/images/realisations/au-pain-dore.webp',
    accent: '#D89C4A',
    url: 'https://stackup-demos-u2go.vercel.app',
    tags: ['Artisan', 'Vitrine', 'Local'],
    note: 'Vitrine d’artisan : horaires, gamme et accès, sans superflu.',
  },
  {
    nom: 'L’Olivier — Dashboard',
    type: 'Système de gestion',
    slug: 'lolivier-dashboard',
    image: '/images/realisations/lolivier-dashboard.webp',
    accent: '#29C36A',
    url: 'https://stackup-demos-jxtr.vercel.app',
    tags: ['Dashboard', 'CRM', 'Restaurant'],
    note: 'Interface de gestion : réservations, salle et suivi du service.',
  },
]

/** Le cadre navigateur, posé autour de la capture réelle. */
function Ecran({ projet, actif }: { projet: Projet; actif: boolean }) {
  return (
    <div className="su-salle__ecran">
      <div className="su-salle__chrome">
        <span className="su-salle__pastilles" aria-hidden="true">
          <i />
          <i />
          <i />
        </span>
        <span className="su-salle__url">
          <span
            className="su-salle__point"
            style={{ background: projet.accent }}
            aria-hidden="true"
          />
          {projet.url.replace('https://', '')}
        </span>
        <ExternalLink size={12} aria-hidden="true" />
      </div>
      <div className="su-salle__vue">
        <Image
          src={projet.image}
          alt={`Capture du site ${projet.nom}`}
          fill
          quality={88}
          className="object-cover object-top"
          sizes="(max-width: 900px) 92vw, 920px"
          /* Seule la première capture est prioritaire : les autres n'ont
             aucune raison de disputer la bande passante au contenu visible. */
          priority={actif && projet.slug === PROJETS[0].slug}
        />
      </div>
    </div>
  )
}

/** Le même site vu sur un téléphone — la preuve que le responsive est fait. */
function Telephone({ projet }: { projet: Projet }) {
  return (
    <div className="su-salle__tel" aria-hidden="true">
      <span className="su-salle__encoche" />
      <Image
        src={projet.image}
        alt=""
        fill
        quality={70}
        className="object-cover object-top"
        sizes="200px"
      />
      <span className="su-salle__barre" />
    </div>
  )
}

export default function Showroom() {
  const section = useRef<HTMLElement>(null)
  const scene = useRef<HTMLDivElement>(null)
  const [defile, setDefile] = useState(false)
  const [courant, setCourant] = useState(0)
  const [avancement, setAvancement] = useState(0)
  const [position, setPosition] = useState(0)

  /** Position de défilement qui met le projet `i` au centre de l'écran. */
  const positionDe = useCallback((i: number) => {
    const el = section.current
    if (!el) return 0
    const haut = el.offsetTop
    const course = el.offsetHeight - window.innerHeight
    return haut + (course * i) / Math.max(PROJETS.length - 1, 1)
  }, [])

  useEffect(() => {
    const el = section.current
    if (!el) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    // Pas de bande horizontale sous 900 px.
    //
    // Deux raisons, l'une mesurée, l'autre d'usage. Mesurée : les vignettes
    // mises en bande sont déplacées par `transform`, et le chargement
    // paresseux des images se fonde sur la position de MISE EN PAGE — sur
    // mobile, les captures des projets 2 à 5 ne se chargeaient jamais et on
    // ne voyait que des cadres vides. D'usage : détourner le défilement
    // vertical sur un téléphone est désagréable. La pile verticale, qui est
    // déjà l'état de repli, est ici le meilleur état.
    if (!window.matchMedia('(min-width: 900px)').matches) return

    // La bande ne se met en place qu'ici : si ce code ne tourne pas, le CSS
    // laisse la pile verticale en place et la section reste complète.
    setDefile(true)

    let attente = false
    const maj = () => {
      attente = false
      const haut = el.offsetTop
      const course = Math.max(el.offsetHeight - window.innerHeight, 1)
      const p = Math.min(Math.max((window.scrollY - haut) / course, 0), 1)
      setAvancement(p)

      // La bande MARQUE un arrêt sur chaque projet.
      //
      // Une translation continue paraissait juste sur le papier et était
      // fausse à l'écran : la fiche est à droite de son écran, donc à
      // mi-course on lisait la fiche d'un projet à côté de la capture du
      // suivant. Chaque projet tient maintenant 55 % de son segment immobile,
      // puis glisse vers le suivant sur les 45 % restants. On lit toujours un
      // projet, jamais deux moitiés.
      const segment = p * (PROJETS.length - 1)
      const base = Math.min(Math.floor(segment), PROJETS.length - 2)
      const f = Math.min(Math.max(segment - base, 0), 1)
      const t = f < 0.55 ? 0 : (f - 0.55) / 0.45
      const doux = t * t * (3 - 2 * t)
      const pos = base + doux
      setPosition(pos)
      setCourant(Math.round(pos))
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

  const p = PROJETS[courant]

  return (
    <section
      ref={section}
      id="realisations"
      className="su-salle"
      data-defile={defile ? 'oui' : undefined}
      style={
        {
          '--n': PROJETS.length,
          '--p': avancement.toFixed(4),
          '--pos': position.toFixed(4),
          '--accent': p.accent,
        } as React.CSSProperties
      }
      aria-label="Nos réalisations"
    >
      {/* La lumière de la salle prend la couleur du projet au centre. */}
      <div className="su-salle__lumiere" aria-hidden="true" />

      <div ref={scene} className="su-salle__scene">
        <header className="su-salle__entete">
          <p className="su-salle__surtitre">Nos réalisations</p>
          <h2 className="su-salle__titre">
            Cinq sites complets,
            <br />
            <span className="su-salle__titre-accent">consultables en ligne.</span>
          </h2>
          <p className="su-salle__intro">
            Ce ne sont pas des aperçus. Chaque adresse ouvre un site de
            démonstration entier — c&rsquo;est exactement ce que nous livrons.
          </p>
        </header>

        {/* La pellicule. En pile verticale tant que `data-defile` est absent. */}
        <div className="su-salle__bande">
          {PROJETS.map((projet, i) => (
            <article
              key={projet.slug}
              className="su-salle__vignette"
              style={{ '--i': i, '--accent': projet.accent } as React.CSSProperties}
              aria-current={i === courant ? 'true' : undefined}
            >
              <div className="su-salle__supports">
                <Ecran projet={projet} actif={i === courant} />
                <Telephone projet={projet} />
              </div>

              <div className="su-salle__fiche">
                <div className="su-salle__identite">
                  <p className="su-salle__rang" aria-hidden="true">
                    {String(i + 1).padStart(2, '0')}
                    <span>/{String(PROJETS.length).padStart(2, '0')}</span>
                  </p>
                  <h3 className="su-salle__nom">{projet.nom}</h3>
                  <p className="su-salle__type">{projet.type}</p>
                  <p className="su-salle__note">{projet.note}</p>
                  <ul className="su-salle__tags">
                    {projet.tags.map((t) => (
                      <li key={t}>{t}</li>
                    ))}
                  </ul>
                </div>

                <div className="su-salle__actions">
                  <a
                    href={projet.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="su-salle__visiter"
                    style={{
                      background: projet.accent,
                      color: texteLisibleSur(projet.accent),
                    }}
                  >
                    <ExternalLink size={15} aria-hidden="true" />
                    Visiter la démo
                    <span className="sr-only"> {projet.nom} (nouvel onglet)</span>
                  </a>
                  <Link href={`/realisations/${projet.slug}`} className="su-salle__fiche-lien">
                    Fiche projet
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Le rail : repère de position ET navigation. Il ne pilote pas un
            état séparé — il déplace la page, donc tout reste cohérent. */}
        <nav className="su-salle__rail" aria-label="Choisir une réalisation">
          {PROJETS.map((projet, i) => (
            <button
              key={projet.slug}
              type="button"
              className="su-salle__jalon"
              aria-current={i === courant ? 'true' : undefined}
              style={{ '--accent': projet.accent } as React.CSSProperties}
              onClick={() =>
                window.scrollTo({
                  top: positionDe(i),
                  behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches
                    ? 'instant'
                    : 'smooth',
                })
              }
            >
              <span className="su-salle__jalon-trait" aria-hidden="true" />
              <span className="su-salle__jalon-nom">{projet.nom}</span>
            </button>
          ))}
        </nav>
      </div>
    </section>
  )
}
