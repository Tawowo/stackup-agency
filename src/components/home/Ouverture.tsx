'use client'

/**
 * MOMENT 00 — L'OUVERTURE.
 *
 * Spécification : dossier §10.1 et fiche d'animation 11.1 (RÉVÉLATION).
 *
 * L'IDÉE. Le premier écran n'est pas « un titre devant un fond animé » —
 * c'est le schéma le plus répandu des sites techniques, et c'est précisément
 * ce que le commanditaire reproche à la version actuelle. Ici, le logo EST
 * la scène : on le voit exactement tel qu'il est, puis il prend de
 * l'épaisseur et devient la matière première du site.
 *
 * CE QUI EST EN HTML ET CE QUI EST EN 3D.
 *
 * Seul le RUBAN est en 3D. Le lettrage « Stackup AGENCY » reste du HTML
 * (masque alpha dans `LogoMarque`), et le titre aussi. Trois raisons :
 *
 *  - le plus grand élément affiché doit être le titre, pas le canvas, sinon
 *    le LCP attend WebGL (budget 16.3 : ≤ 2,5 s sur mobile throttlé) ;
 *  - du texte dans un canvas n'est ni sélectionnable, ni indexable, ni
 *    lisible par un lecteur d'écran — pour une agence dont le référencement
 *    est un argument de vente, ce serait un contresens ;
 *  - sans WebGL, il n'y a rien à remplacer : le lettrage est déjà là.
 *
 * L'ALIGNEMENT. Une boîte vide (`su-ouv__ancre`) tient la place du ruban
 * dans la grille, à gauche du lettrage. La scène lit sa position par
 * `ResizeObserver` et s'y cale. C'est la seule façon d'aligner un objet 3D
 * au pixel sur une mise en page fluide, et c'est ce qui permet au lettrage
 * de rester du HTML.
 *
 * SANS JAVASCRIPT. Le `LogoMarque` SVG est rendu côté serveur à la taille
 * finale. Si rien ne démarre, on voit le logo complet, le titre, les
 * actions et les quatre cotes : la page est entière.
 */

import { useCallback, useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { SITE } from '@/config/site'
import LogoMarque from '@/components/ui/LogoMarque'
import { useBande, type Offre } from '@/store/bande'

/* ── Le texte ──────────────────────────────────────────────────────────────
   Proposition éditoriale du dossier (§10.1, arbitrage 18.6) : « Votre [mot]
   en 10 jours ouvrés. », le mot porteur cyclant entre les quatre natures de
   projet. Le délai vient de `site.ts`, jamais écrit en dur. */

const MOTS: { mot: string; offre: Offre; delai: string }[] = [
  { mot: 'site', offre: 'vitrine', delai: SITE.delais.vitrine },
  { mot: 'boutique', offre: 'boutique', delai: SITE.delais.ecommerce },
  { mot: 'logiciel', offre: 'gestion', delai: SITE.delais.gestion },
  { mot: 'outil', offre: 'gestion', delai: SITE.delais.gestion },
]

/** Les quatre cotes du bas, toutes tirées de `site.ts`. */
const COTES = [
  { valeur: `${SITE.pricing.vitrine} €`, libelle: 'tout inclus' },
  { valeur: SITE.delais.vitrine, libelle: "de l’idée à la mise en ligne" },
  { valeur: '72 h', libelle: 'délai de réponse' },
  { valeur: '100 %', libelle: 'le code est à vous' },
]

/**
 * Publie la position de la boîte d'ancrage dans le store.
 *
 * La mesure se fait au montage et à chaque redimensionnement, jamais à
 * chaque image : lire la géométrie dans une boucle de défilement déclenche
 * un recalcul de mise en page par trame et par composant.
 */
function useAncrage(ref: React.RefObject<HTMLElement | null>) {
  const setAncrage = useBande((s) => s.setAncrage)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const relever = () => {
      const r = el.getBoundingClientRect()
      setAncrage({
        cx: (r.left + r.width / 2) / window.innerWidth,
        cy: (r.top + r.height / 2) / window.innerHeight,
        hauteur: r.height / window.innerHeight,
      })
    }
    relever()
    const vigie = new ResizeObserver(relever)
    vigie.observe(el)
    window.addEventListener('resize', relever)

    /* La boîte bouge AUSSI au défilement, et il faut la suivre.
       Première version : relevé au seul redimensionnement. Le canvas étant
       fixe, la bande restait collée à l'écran pendant que la page montait —
       et venait chevaucher le titre, vu sur capture à 300 px de défilement.
       Le relevé est donc refait à chaque image où un défilement a eu lieu,
       jamais plus d'une fois par image. */
    let image = 0
    let enAttente = false
    const auDefilement = () => {
      if (enAttente) return
      enAttente = true
      image = requestAnimationFrame(() => {
        enAttente = false
        relever()
      })
    }
    window.addEventListener('scroll', auDefilement, { passive: true })

    return () => {
      cancelAnimationFrame(image)
      vigie.disconnect()
      window.removeEventListener('resize', relever)
      window.removeEventListener('scroll', auDefilement)
      setAncrage(null)
    }
  }, [ref, setAncrage])
}

/**
 * Publie la progression du défilement dans le hero.
 *
 * Elle pilote la bascule de projection, l'épaisseur et la rotation. Écrite
 * dans un `requestAnimationFrame` plutôt que directement dans l'écouteur de
 * défilement : sur un trackpad, l'événement part des dizaines de fois par
 * seconde, et chacun déclencherait une lecture de géométrie.
 */
function useProgressionHero(ref: React.RefObject<HTMLElement | null>) {
  const setProgression = useBande((s) => s.setProgression)
  const setEtat = useBande((s) => s.setEtat)
  useEffect(() => {
    setEtat('logo')
    let image = 0
    let enAttente = false
    const calculer = () => {
      enAttente = false
      const el = ref.current
      if (!el) return
      const h = el.offsetHeight || 1
      const p = Math.max(0, Math.min(1, window.scrollY / h))
      setProgression(p)
    }
    const planifier = () => {
      if (enAttente) return
      enAttente = true
      image = requestAnimationFrame(calculer)
    }
    calculer()
    window.addEventListener('scroll', planifier, { passive: true })
    window.addEventListener('resize', planifier)
    return () => {
      cancelAnimationFrame(image)
      window.removeEventListener('scroll', planifier)
      window.removeEventListener('resize', planifier)
    }
  }, [ref, setProgression, setEtat])
}

export default function Ouverture() {
  const section = useRef<HTMLElement>(null)
  const ancre = useRef<HTMLDivElement>(null)
  const [index, setIndex] = useState(0)
  const setOffre = useBande((s) => s.setOffre)
  const repli = useBande((s) => s.repli)

  useAncrage(ancre)
  useProgressionHero(section)

  const courant = MOTS[index]

  const cycler = useCallback(() => {
    setIndex((i) => {
      const suivant = (i + 1) % MOTS.length
      setOffre(MOTS[suivant].offre)
      return suivant
    })
  }, [setOffre])

  return (
    <section
      ref={section}
      className="su-ouv"
      aria-labelledby="su-ouv-titre"
    >
      <div className="su-ouv__grille" aria-hidden="true">
        {Array.from({ length: 12 }, (_, i) => (
          <span key={i} />
        ))}
      </div>

      <div className="su-ouv__corps">
        {/* LA MARQUE.
            Le ruban SVG est affiché tant que la scène n'a pas pris le
            relais ; quand elle est prête, il s'efface en 140 ms et le
            volume prend sa place exactement au même endroit. En repli
            (WebGL absent ou perdu), il reste affiché pour toujours. */}
        <div className="su-ouv__marque" data-repli={repli ? 'oui' : undefined}>
          {/* LA BOÎTE D'ANCRAGE.
              Elle a exactement les proportions du ruban décalqué (145 × 227,
              l'étendue réelle des tracés, pas le viewBox nominal). Elle est
              la place que la bande 3D vient occuper, et elle porte le SVG
              de secours : tant que la scène n'a pas pris le relais — ou si
              elle ne le prend jamais — c'est lui qu'on voit, à la même
              taille et au même endroit. Rien ne saute. */}
          <div ref={ancre} className="su-ouv__ancre">
            <LogoMarque avecTexte={false} taille={0} className="su-ouv__ruban" />
          </div>
          {/* Le lettrage reste du HTML : sélectionnable, indexable, lisible
              par un lecteur d'écran, et présent sans WebGL. */}
          <span className="su-logo__mot su-ouv__lettrage" aria-hidden="true" />
          <span className="sr-only">Stackup Agency</span>
        </div>

        {/* Deux lignes décidées, pas subies (§9.4 : « les titres longs
            cassent à un mot précis, jamais par hasard »). Première
            version : une seule phrase en flux — « en » se retrouvait orphelin
            en fin de première ligne, vu sur capture. */}
        <h1 id="su-ouv-titre" className="su-ouv__titre">
          {/* Les espaces sont de VRAIS espaces, pas des gouttières de flex.
              Première version : `display: flex` avec `gap`. Visuellement
              identique, mais le titre se copiait « Votresiteen 10 jours
              ouvrés » — une gouttière n'est pas un caractère. C'est la
              suite QA qui l'a relevé, pas l'œil. */}
          <span className="su-ouv__ligne">
            <span className="su-ouv__amorce">Votre</span>{' '}
            <button
              type="button"
              className="su-ouv__mot"
              onClick={cycler}
              aria-label={`Nature du projet : ${courant.mot}. Activer pour changer.`}
            >
              {courant.mot}
            </button>
          </span>{' '}
          <span className="su-ouv__ligne su-ouv__chute">en {courant.delai}.</span>
        </h1>

        <div className="su-ouv__colonne">
          <p className="su-ouv__accroche">
            Sites vitrines, boutiques, logiciels de gestion et outils sur
            mesure, conçus et mis en ligne par un atelier de {SITE.address.locality}.
          </p>
          <div className="su-ouv__actions">
            <Link href="/contact?sujet=demo" className="su-action su-action--eclat">
              Voir une démo offerte
              <ArrowRight size={17} aria-hidden="true" />
            </Link>
            <Link href="/configurateur" className="su-action su-action--contour">
              Configurer mon projet
            </Link>
          </div>
        </div>

        <dl className="su-ouv__cotes">
          {COTES.map((c, i) => (
            <div key={c.valeur} style={{ '--i': i } as React.CSSProperties}>
              <dt>{c.valeur}</dt>
              <dd>{c.libelle}</dd>
            </div>
          ))}
        </dl>
      </div>

      <p className="su-ouv__pied" aria-hidden="true">
        <span>00 — Ouverture</span>
        <span className="su-ouv__descendre">
          Descendre<i />
        </span>
      </p>

      {/* L'équivalent textuel de ce que montre la scène. Le canvas est
          `aria-hidden` ; sans cette ligne, un lecteur d'écran ne saurait pas
          qu'il se passe quelque chose. */}
      <p className="sr-only" aria-live="polite">
        Nature de projet sélectionnée : {courant.mot}, livré en {courant.delai}.
      </p>
    </section>
  )
}
