'use client'

/**
 * L'ANATOMIE D'UN SITE.
 *
 * Le mécanisme est délibérément sans rapport avec le reste de la page : ici,
 * aucune particule, aucun canvas, aucun shader. Ce sont de VRAIS éléments
 * HTML empilés dans une perspective 3D, qui se séparent au défilement.
 *
 * Pourquoi ce choix : une agence qui construit des sites doit pouvoir en
 * ouvrir un. Des points lumineux ne montrent rien de ce métier ; des plans
 * portant une vraie interface, si. Au repos les cinq couches se superposent
 * et forment une page finie. En s'écartant, elles révèlent ce qu'il a fallu
 * empiler pour l'obtenir — structure, interface, interactions, contenus,
 * référencement.
 *
 * Trois registres d'interaction, dans cet ordre de priorité :
 *  1. Le DÉFILEMENT écarte et resserre la pile. C'est le registre principal,
 *     il ne demande aucun geste.
 *  2. Le POINTEUR incline la scène. Accessoire, jamais nécessaire.
 *  3. Le CLAVIER et le CLIC isolent une couche par sa légende. Chaque
 *     légende est un vrai bouton : ce qui se survole se tabule aussi.
 *
 * Replis : sans script la pile reste écartée et légendée — on lit les cinq
 * couches et leur contenu. Sous mouvement réduit, aucune inclinaison ni
 * transition ; l'isolement par bouton continue de fonctionner.
 */

import { useCallback, useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { SERVICES, SITE } from '@/config/site'

interface Couche {
  cle: string
  titre: string
  role: string
  /**
   * Ce avec quoi la couche est faite.
   *
   * Cette ligne récupère l'information qui n'existait jusqu'ici que dans le
   * bandeau défilant — « Next.js · TypeScript · Mobile-first · SEO natif »,
   * qui était `aria-hidden`, passait à 40 px/s et n'était rattaché à rien.
   * C'était le seul endroit de la page d'accueil où la pile technique était
   * nommée. Supprimer le bandeau sans déplacer ces mots aurait fait perdre
   * une information réelle ; les voici lisibles, et accrochés à la couche
   * qu'ils concernent.
   *
   * Chaque mention est vérifiable dans le dépôt : `next` et `three` sont
   * dans les dépendances, le projet est en TypeScript, `src/app/sitemap.ts`
   * et `src/app/robots.ts` existent, et la page d'accueil émet deux blocs
   * JSON-LD.
   */
  outil: string
  /** Ce que la couche montre, rendu à l'intérieur du plan. */
  rendu: 'structure' | 'interface' | 'interactions' | 'contenus' | 'referencement'
}

const COUCHES: Couche[] = [
  {
    cle: 'structure',
    titre: 'La structure',
    role: 'Le balisage sémantique. Ce que lisent Google et les lecteurs d’écran avant de voir quoi que ce soit.',
    outil: 'HTML sémantique · Next.js App Router',
    rendu: 'structure',
  },
  {
    cle: 'interface',
    titre: 'L’interface',
    role: 'La typographie, les proportions, la couleur. Ce qui donne au site son visage.',
    outil: 'Design sur mesure · mobile d’abord',
    rendu: 'interface',
  },
  {
    cle: 'interactions',
    titre: 'Les interactions',
    role: 'Survol, focus, états d’erreur, navigation au clavier. Ce qui répond quand on s’en sert.',
    outil: 'TypeScript · parcours clavier complet',
    rendu: 'interactions',
  },
  {
    cle: 'contenus',
    titre: 'Les contenus',
    role: 'Vos textes, vos photos, vos offres. Le site n’est un outil que lorsqu’il les porte.',
    outil: 'Contenus structurés · images optimisées',
    rendu: 'contenus',
  },
  {
    cle: 'referencement',
    titre: 'Le référencement',
    role: 'Métadonnées, données structurées, plan du site. Ce qui décide si on vous trouve.',
    outil: 'JSON-LD · sitemap.xml · robots.txt',
    rendu: 'referencement',
  },
]

/* ── Le contenu de chaque plan ──────────────────────────────────────────── */

function PlanStructure() {
  return (
    <div className="su-ana__plan su-ana__plan--structure">
      {[
        { t: 'header', h: 13 },
        { t: 'nav', h: 9 },
        { t: 'h1', h: 17 },
        { t: 'section', h: 26 },
        { t: 'article', h: 20 },
        { t: 'footer', h: 11 },
      ].map((b) => (
        <div key={b.t} className="su-ana__bloc" style={{ height: `${b.h}%` }}>
          <span>&lt;{b.t}&gt;</span>
        </div>
      ))}
    </div>
  )
}

function PlanInterface() {
  return (
    <div className="su-ana__plan su-ana__plan--interface">
      <div className="su-ana__barre">
        <span className="su-ana__marque" />
        <span className="su-ana__menu">
          <i />
          <i />
          <i />
        </span>
      </div>
      <p className="su-ana__titre-maquette">Votre métier,<br />en ligne.</p>
      <span className="su-ana__bouton-maquette" />
      <div className="su-ana__cartes">
        <span />
        <span />
        <span />
      </div>
    </div>
  )
}

function PlanInteractions() {
  return (
    <div className="su-ana__plan su-ana__plan--interactions">
      <span className="su-ana__focus" />
      <span className="su-ana__survol" />
      <span className="su-ana__curseur" />
      <span className="su-ana__etiquette su-ana__etiquette--a">:focus-visible</span>
      <span className="su-ana__etiquette su-ana__etiquette--b">:hover</span>
      <span className="su-ana__etiquette su-ana__etiquette--c">aria-current</span>
    </div>
  )
}

function PlanContenus() {
  // Les intitulés viennent des services réellement proposés : rien n'est
  // inventé pour faire joli.
  const services = SERVICES.slice(0, 4)
  return (
    <div className="su-ana__plan su-ana__plan--contenus">
      {services.map((s) => (
        <div key={s.id} className="su-ana__ligne">
          <span className="su-ana__ligne-titre">{s.titre}</span>
          <span className="su-ana__ligne-prix">
            {s.prix} {s.unite}
          </span>
        </div>
      ))}
      <div className="su-ana__ligne su-ana__ligne--sourde">
        <span className="su-ana__ligne-titre">Délai annoncé</span>
        <span className="su-ana__ligne-prix">{SITE.delais.vitrine}</span>
      </div>
    </div>
  )
}

function PlanReferencement() {
  return (
    <div className="su-ana__plan su-ana__plan--referencement">
      <code className="su-ana__code">
        <span>&lt;title&gt;</span>Agence web Tours — Site en {SITE.delais.vitrine}
        <br />
        <span>&lt;meta name=&quot;description&quot;&gt;</span>
        <br />
        <span>&lt;link rel=&quot;canonical&quot;&gt;</span>
        <br />
        <span>application/ld+json</span> · LocalBusiness
        <br />
        <span>sitemap.xml</span> · robots.txt
      </code>
    </div>
  )
}

const PLANS = {
  structure: PlanStructure,
  interface: PlanInterface,
  interactions: PlanInteractions,
  contenus: PlanContenus,
  referencement: PlanReferencement,
} as const

/* ── La section ─────────────────────────────────────────────────────────── */

export default function Anatomie() {
  const section = useRef<HTMLElement>(null)
  const scene = useRef<HTMLDivElement>(null)
  const [vivant, setVivant] = useState(false)
  const [isolee, setIsolee] = useState<string | null>(null)

  /** Écartement de la pile, 0 (page finie) → 1 (couches séparées). */
  const majEcart = useCallback(() => {
    const el = section.current
    const sc = scene.current
    if (!el || !sc) return
    const r = el.getBoundingClientRect()
    const h = window.innerHeight
    // L'écartement suit l'entrée de la section dans le cadre, puis se
    // referme à la sortie : la page se reconstitue quand on la quitte.
    const brut = (h - r.top) / (h + r.height * 0.55)
    const p = Math.min(Math.max(brut, 0), 1)
    // Courbe en cloche : fermée aux deux bouts, ouverte au milieu.
    const cloche = Math.sin(Math.min(Math.max((p - 0.12) / 0.7, 0), 1) * Math.PI)
    sc.style.setProperty('--ecart', cloche.toFixed(3))
  }, [])

  useEffect(() => {
    const el = section.current
    if (!el) return
    setVivant(true)

    const reduit = window.matchMedia('(prefers-reduced-motion: reduce)')
    let attente = false
    const surDefilement = () => {
      if (attente) return
      attente = true
      requestAnimationFrame(() => {
        attente = false
        majEcart()
      })
    }

    // Inclinaison au pointeur, lissée. Jamais nécessaire à la lecture.
    const cible = { x: 0, y: 0 }
    const lisse = { x: 0, y: 0 }
    let image = 0
    const peindre = () => {
      lisse.x += (cible.x - lisse.x) * 0.08
      lisse.y += (cible.y - lisse.y) * 0.08
      scene.current?.style.setProperty('--inc-x', lisse.y.toFixed(3))
      scene.current?.style.setProperty('--inc-y', lisse.x.toFixed(3))
      image = requestAnimationFrame(peindre)
    }
    const surPointeur = (e: PointerEvent) => {
      if (e.pointerType === 'touch') return
      const r = el.getBoundingClientRect()
      cible.x = ((e.clientX - r.left) / r.width) * 2 - 1
      cible.y = ((e.clientY - r.top) / r.height) * 2 - 1
    }

    window.addEventListener('scroll', surDefilement, { passive: true })
    window.addEventListener('resize', surDefilement)
    majEcart()

    if (!reduit.matches) {
      el.addEventListener('pointermove', surPointeur, { passive: true })
      image = requestAnimationFrame(peindre)
    }

    return () => {
      window.removeEventListener('scroll', surDefilement)
      window.removeEventListener('resize', surDefilement)
      el.removeEventListener('pointermove', surPointeur)
      cancelAnimationFrame(image)
    }
  }, [majEcart])

  return (
    <section
      ref={section}
      id="anatomie"
      className="su-ana su-ambiance"
      data-vivant={vivant ? 'oui' : undefined}
      aria-labelledby="su-ana-titre"
    >
      <div className="su-ana__cadre">
        <header className="su-ana__entete">
          <p className="su-surtitre">03 — Ce qu’il y a dedans</p>
          <h2 id="su-ana-titre" className="su-ana__titre">
            Un site, c’est cinq couches.
            <br />
            <span className="su-doux">On les construit toutes.</span>
          </h2>
        </header>

        <div className="su-ana__corps">
          {/* La scène 3D. Décorative : tout ce qu'elle montre est répété en
              clair dans les légendes, qui sont le vrai contenu. */}
          <div className="su-ana__scene" aria-hidden="true">
            <div
              ref={scene}
              className="su-ana__pile"
              data-isolee={isolee ?? undefined}
            >
              {COUCHES.map((c, i) => {
                const Plan = PLANS[c.rendu]
                return (
                  <div
                    key={c.cle}
                    className="su-ana__couche"
                    data-couche={c.cle}
                    style={{ '--i': i, '--n': COUCHES.length } as React.CSSProperties}
                  >
                    <Plan />
                    <span className="su-ana__repere">{c.titre}</span>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Les légendes. Ce sont de vrais boutons : isoler une couche doit
              marcher au clavier comme à la souris.

              La couche isolée SUIT simplement la légende active — survolée
              ou focalisée. Premier modèle essayé : le clic basculait. Mesuré
              au navigateur, il annulait ce que le focus venait de poser, et
              un clic à la souris ne faisait donc rien du tout. Un seul
              principe vaut mieux que deux qui se contredisent. */}
          <ol
            className="su-ana__legendes"
            onPointerLeave={() => {
              // On ne retire que si le clavier n'a pas la main.
              const actif = document.activeElement
              if (!actif?.classList.contains('su-ana__legende')) setIsolee(null)
            }}
            onKeyDown={(e) => {
              if (e.key === 'Escape') setIsolee(null)
            }}
          >
            {COUCHES.map((c, i) => (
              <li key={c.cle}>
                <button
                  type="button"
                  className="su-ana__legende"
                  aria-pressed={isolee === c.cle}
                  onClick={() => setIsolee(c.cle)}
                  onFocus={() => setIsolee(c.cle)}
                  onPointerEnter={() => setIsolee(c.cle)}
                  style={{ '--i': i } as React.CSSProperties}
                >
                  <span className="su-ana__legende-num" aria-hidden="true">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span className="su-ana__legende-texte">
                    <span className="su-ana__legende-titre">{c.titre}</span>
                    <span className="su-ana__legende-role su-doux">{c.role}</span>
                    <span className="su-ana__legende-outil">{c.outil}</span>
                  </span>
                </button>
              </li>
            ))}
          </ol>
        </div>

        <footer className="su-ana__pied">
          <p className="su-doux">
            Les cinq couches sont comprises dans chaque site, à partir de{' '}
            {SITE.pricing.vitrine} €.
          </p>
          <Link href="/services" className="su-lien-trace">
            Voir le détail des prestations
          </Link>
        </footer>
      </div>
    </section>
  )
}
