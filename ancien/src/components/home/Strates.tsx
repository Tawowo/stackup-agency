'use client'

/**
 * MOMENT 01 — LES STRATES.
 *
 * Spécification : dossier §10.2, fiche d'animation 11.2.
 *
 * CE QUE ÇA DIT. « Un site, c'est cinq couches », montré plutôt qu'affirmé.
 * La bande se coupe en cinq lamelles qui s'écartent ; à mesure qu'elles
 * s'écartent, la maquette à droite se construit, une couche à la fois.
 *
 * CE QUI EST DU HTML ET POURQUOI. La maquette n'est PAS dessinée dans le
 * canvas. C'est du HTML réel : sélectionnable, traduisible, lisible par un
 * lecteur d'écran, présent sans JavaScript. Le canvas ne porte que ce qui ne
 * peut pas être du HTML — les lamelles en volume. C'est la règle 16.4 (tout
 * ce que la scène montre est répété en clair) appliquée à l'envers : on ne
 * répète pas, on met le texte où il doit être dès le départ.
 *
 * L'ÉPINGLAGE SANS BIBLIOTHÈQUE. La section fait 250 vh et son contenu est
 * `position: sticky`. Pas de ScrollTrigger : le pin de GSAP mesure, fige et
 * compense en JavaScript, ce qui donne un second ticker en concurrence avec
 * celui de R3F — le dossier l'interdit (§17.6 règle 18). `sticky` fait la
 * même chose dans le compositeur, gratuitement, et ne casse pas si le
 * JavaScript tombe.
 *
 * VISIBLE SANS JAVASCRIPT. La règle 17 interdit l'état masqué par défaut.
 * La maquette est donc écrite entièrement révélée (`--su-pose: 1` dans le
 * CSS) ; c'est le JavaScript qui la REPLIE au montage avant de la dérouler
 * au défilement. Sans JavaScript, on obtient la maquette finie — le contenu,
 * qui est ce qui compte.
 */

import { useCallback, useEffect, useRef, useState } from 'react'
import { SITE } from '@/config/site'
import { useBande } from '@/store/bande'

interface Couche {
  cle: string
  nom: string
  legende: string
  /** La pile réellement utilisée. Aucun nom qui ne soit pas dans le projet. */
  technique: string
}

const COUCHES: Couche[] = [
  {
    cle: 'structure',
    nom: 'Structure',
    legende: `Le code, l'hébergement et le certificat. ${SITE.hebergement.court}, HTTPS sur toutes les pages.`,
    technique: 'Next.js · TypeScript · Vercel',
  },
  {
    cle: 'interface',
    nom: 'Interface',
    legende: 'Le dessin : grille, typographie, couleurs. Pensé pour le téléphone autant que pour l’écran large.',
    technique: 'Tailwind · CSS natif',
  },
  {
    cle: 'interactions',
    nom: 'Interactions',
    legende: 'Ce qui répond : formulaires, prise de rendez-vous, paiement, espace client.',
    technique: 'React · Zod · Resend',
  },
  {
    cle: 'contenus',
    nom: 'Contenus',
    legende: 'Les textes, les photos et le blog — rédigés et optimisés, pas remplis de faux texte.',
    technique: 'Markdown · images AVIF/WebP',
  },
  {
    cle: 'referencement',
    nom: 'Référencement',
    legende: 'Ce qui vous rend trouvable : balises, données structurées, fiche Google Business.',
    technique: 'JSON-LD · sitemap · Search Console',
  },
]

export default function Strates() {
  const section = useRef<HTMLElement>(null)
  const ancre = useRef<HTMLDivElement>(null)
  const [p, setP] = useState(1) // 1 = tout posé : l'état sans JavaScript
  const isolee = useBande((s) => s.isolee)
  const setIsolee = useBande((s) => s.setIsolee)

  /* Au montage seulement : on replie. Avant cet instant, et si le
     JavaScript ne s'exécute jamais, la maquette reste entière. */
  useEffect(() => {
    setP(0)
  }, [])

  useEffect(() => {
    const el = section.current
    const boite = ancre.current
    if (!el || !boite) return

    const { setEtat, setProgression, setAncrage } = useBande.getState()
    let image = 0
    let enAttente = false

    const relever = () => {
      const r = el.getBoundingClientRect()
      const course = Math.max(1, r.height - window.innerHeight)
      /* La progression court sur la partie épinglée : 0 quand le haut de la
         section touche le haut de l'écran, 1 quand son bas y arrive. */
      const prog = Math.min(1, Math.max(0, -r.top / course))
      setP(prog)
      setProgression(prog)

      const b = boite.getBoundingClientRect()
      setAncrage({
        cx: (b.left + b.width / 2) / window.innerWidth,
        cy: (b.top + b.height / 2) / window.innerHeight,
        hauteur: b.height / window.innerHeight,
      })
    }

    const auDefilement = () => {
      if (enAttente) return
      enAttente = true
      image = requestAnimationFrame(() => {
        enAttente = false
        if (useBande.getState().etat === 'strates') relever()
      })
    }

    const vigie = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setEtat('strates')
          relever()
        }
      },
      { threshold: 0.01 },
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
  }, [])

  /* Échap annule l'isolement. Sans cette sortie, un visiteur au clavier qui
     a isolé une couche ne peut plus revoir les autres. */
  useEffect(() => {
    if (isolee === null) return
    const f = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsolee(null)
    }
    window.addEventListener('keydown', f)
    return () => window.removeEventListener('keydown', f)
  }, [isolee, setIsolee])

  useEffect(() => () => setIsolee(null), [setIsolee])

  const basculer = useCallback(
    (i: number) => setIsolee(isolee === i ? null : i),
    [isolee, setIsolee],
  )

  /* Chaque couche se pose à son tour, entre p = 0,2 et p = 0,8, décalée de
     0,12 — la cadence de la fiche 11.2. */
  const pose = (i: number) => {
    const debut = 0.2 + i * 0.12
    return Math.min(1, Math.max(0, (p - debut) / 0.12))
  }

  const eteinte = (i: number) => isolee !== null && isolee !== i

  return (
    <section
      ref={section}
      className="su-strates"
      aria-labelledby="su-strates-titre"
      data-isolee={isolee ?? 'aucune'}
    >
      <div className="su-strates__collant">
        <header className="su-strates__entete">
          <p className="su-surtitre">01 — L’assemblage</p>
          <h2 id="su-strates-titre" className="su-strates__titre">
            Un site, c’est cinq couches.
          </h2>
          <p className="su-strates__chapo">
            Un constructeur de sites vous en vend une. Nous les faisons toutes
            les cinq, et vous pouvez les ouvrir une par une.
          </p>
        </header>

        <div className="su-strates__corps">
          {/* La colonne de gauche : la place de la pile en volume. Vide,
              c'est une place et non un contenu — tout ce qu'elle montre est
              écrit dans les légendes à côté. */}
          <div ref={ancre} className="su-strates__scene" aria-hidden="true" />

          <ol className="su-strates__legendes">
            {COUCHES.map((c, i) => (
              <li key={c.cle} className="su-strates__legende" data-eteinte={eteinte(i)}>
                <button
                  type="button"
                  className="su-strates__bouton"
                  aria-pressed={isolee === i}
                  onClick={() => basculer(i)}
                  style={{ ['--su-pose' as string]: pose(i) }}
                >
                  <span className="su-strates__rang" aria-hidden="true">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span className="su-strates__nom">{c.nom}</span>
                  <span className="su-strates__texte">{c.legende}</span>
                  <span className="su-strates__technique">{c.technique}</span>
                </button>
              </li>
            ))}
          </ol>

          {/* LA MAQUETTE. Du HTML, pas une image : chaque bloc appartient à
              une couche et se découpe à son tour. */}
          <div className="su-strates__maquette" aria-label="Maquette d’un site en cours d’assemblage" role="img">
            <div
              className="su-maq__barre"
              data-couche="structure"
              data-eteinte={eteinte(0)}
              style={{ ['--su-pose' as string]: pose(0) }}
            >
              <span className="su-maq__pastille" />
              <span className="su-maq__url">votre-entreprise.fr</span>
              <span className="su-maq__ssl">HTTPS</span>
            </div>

            <div
              className="su-maq__entete"
              data-couche="interface"
              data-eteinte={eteinte(1)}
              style={{ ['--su-pose' as string]: pose(1) }}
            >
              <span className="su-maq__logo" />
              <span className="su-maq__nav">
                <i /><i /><i />
              </span>
            </div>

            <div
              className="su-maq__hero"
              data-couche="contenus"
              data-eteinte={eteinte(3)}
              style={{ ['--su-pose' as string]: pose(3) }}
            >
              <span className="su-maq__titre" />
              <span className="su-maq__ligne" />
              <span className="su-maq__ligne su-maq__ligne--courte" />
            </div>

            <div
              className="su-maq__actions"
              data-couche="interactions"
              data-eteinte={eteinte(2)}
              style={{ ['--su-pose' as string]: pose(2) }}
            >
              <span className="su-maq__bouton">Demander un devis</span>
              <span className="su-maq__champ" />
            </div>

            <div
              className="su-maq__fiche"
              data-couche="referencement"
              data-eteinte={eteinte(4)}
              style={{ ['--su-pose' as string]: pose(4) }}
            >
              <span className="su-maq__fiche-titre">votre-entreprise.fr</span>
              <span className="su-maq__fiche-meta">
                &lt;title&gt; · &lt;meta description&gt; · JSON-LD
              </span>
            </div>
          </div>
        </div>

        <p className="sr-only" aria-live="polite">
          {isolee === null
            ? 'Les cinq couches sont visibles.'
            : `Couche isolée : ${COUCHES[isolee].nom}. ${COUCHES[isolee].legende}`}
        </p>
      </div>
    </section>
  )
}
