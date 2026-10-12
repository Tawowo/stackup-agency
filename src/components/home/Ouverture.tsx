'use client'

/**
 * L'OUVERTURE — « le plan habité ».
 *
 * Le reproche fait à la version précédente était double : pas assez
 * imposante, et pas assez professionnelle. Ce sont deux problèmes
 * différents, et ils ont deux réponses différentes.
 *
 * L'IMPOSANT vient de l'échelle. Le mot porteur occupe jusqu'à 17 vw, il
 * est coupé par le bord du cadre, et il n'y a plus qu'une seule chose à
 * regarder au premier écran.
 *
 * Le PROFESSIONNEL vient de la mesure. Une grille de construction est
 * VISIBLE, et toute la composition s'y aligne. Des cotes mesurent le cadre
 * et le bloc de titre — avec les valeurs réelles relevées dans le
 * navigateur, pas des nombres décoratifs. Un ornement qui affiche de faux
 * chiffres sur un site d'agence technique est pire que pas d'ornement : la
 * grille force l'alignement au lieu de le promettre.
 *
 * Ce que ça change par rapport à l'ancien hero :
 *  - une seule hiérarchie, au lieu de trois niveaux typographiques qui se
 *    disputaient l'attention ;
 *  - les cartes de confiance passent en une ligne de données alignée sur la
 *    grille, au lieu de quatre cartes flottantes ;
 *  - les plaques de parallaxe disparaissent : elles ajoutaient du mouvement
 *    sans ajouter de sens.
 *
 * Accessibilité du titre découpé : motif repris de `splitText` d'anime.js v4
 * (lu dans `src/text/split.js`). Un exemplaire masqué porte la phrase
 * entière, et chaque lettre est `aria-hidden`. Mon ancienne version utilisait
 * `aria-label` plus des espaces `sr-only` : fragile, et le copier-coller
 * donnait « faitdécollervotre ».
 */

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import dynamic from 'next/dynamic'
import { ArrowRight } from 'lucide-react'
import { SITE } from '@/config/site'
import BoutonMagnetique from '@/components/ui/BoutonMagnetique'

const Passage = dynamic(() => import('@/components/webgl/Passage'), { ssr: false })

const AMORCE = 'Le site web qui fait'
const MOT = 'décoller'
const CHUTE = 'votre activité.'
const PHRASE = `${AMORCE} ${MOT} ${CHUTE}`

/** Les repères de la ligne de données. Tous vérifiables sur le site. */
const REPERES = [
  { cle: 'delai', valeur: SITE.delais.vitrine, libelle: 'de l’idée à la mise en ligne' },
  { cle: 'prix', valeur: `${SITE.pricing.vitrine} €`, libelle: 'tarif de départ, tout inclus' },
  { cle: 'reponse', valeur: '72 h', libelle: 'délai de réponse annoncé' },
  { cle: 'code', valeur: 'Propriétaire', libelle: 'le code vous appartient' },
] as const

/**
 * Les cotes.
 *
 * Elles affichent les dimensions RÉELLES, relevées après la mise en page et
 * remises à jour au redimensionnement. Le relevé est fait une seule fois par
 * changement de taille, jamais à chaque image : lire la géométrie dans une
 * boucle de défilement déclenche un reflow par image et par composant —
 * constaté en lisant `updateScrollPosition` de curtains.js, qui accumule les
 * deltas précisément pour l'éviter.
 */
function useCotes(cadre: React.RefObject<HTMLElement | null>, bloc: React.RefObject<HTMLElement | null>) {
  const [cotes, setCotes] = useState<{ largeur: number; hauteur: number; titre: number } | null>(
    null,
  )

  useEffect(() => {
    const releve = () => {
      const c = cadre.current
      const b = bloc.current
      if (!c || !b) return
      const rc = c.getBoundingClientRect()
      const rb = b.getBoundingClientRect()
      setCotes({
        largeur: Math.round(rc.width),
        hauteur: Math.round(rc.height),
        titre: Math.round(rb.width),
      })
    }
    releve()
    const vigie = new ResizeObserver(releve)
    if (cadre.current) vigie.observe(cadre.current)
    if (bloc.current) vigie.observe(bloc.current)
    return () => vigie.disconnect()
  }, [cadre, bloc])

  return cotes
}

export default function Ouverture() {
  const cadre = useRef<HTMLElement>(null)
  const bloc = useRef<HTMLDivElement>(null)
  const cotes = useCotes(cadre, bloc)

  return (
    <section
      ref={cadre}
      data-scene="ouverture"
      data-nuit="1"
      className="su-plan su-ambiance"
      aria-labelledby="su-plan-titre"
    >
      <Passage />

      {/* La grille de construction. Elle n'est pas un décor : c'est le
          système d'alignement auquel toute la composition obéit, rendu
          visible pour qu'on puisse le vérifier. */}
      <div className="su-plan__grille" aria-hidden="true">
        <span />
        <span />
        <span />
        <span />
        <span />
        <span />
        <span />
        <span />
        <span />
        <span />
        <span />
        <span />
      </div>

      {/* Les cotes du cadre. */}
      {cotes && (
        <div className="su-plan__cotes" aria-hidden="true">
          <span className="su-plan__cote su-plan__cote--haut">
            <i />
            <b>{cotes.largeur}</b>
            <i />
          </span>
          <span className="su-plan__cote su-plan__cote--gauche">
            <i />
            <b>{cotes.hauteur}</b>
            <i />
          </span>
        </div>
      )}

      <div className="su-plan__contenu su-scene-devant">
        <p className="su-plan__repere-haut">
          <span className="su-plan__puce" aria-hidden="true" />
          Agence web — {SITE.address.locality}
          <span className="su-plan__coord" aria-hidden="true">
            47.3941° N · 0.6848° E
          </span>
        </p>

        <div ref={bloc} className="su-plan__bloc">
          {/* Motif anime.js : un exemplaire masqué porte la phrase entière,
              tout le reste est retiré de l'arbre d'accessibilité. */}
          <h1 id="su-plan-titre" className="su-plan__titre">
            <span className="su-plan__titre-lu">{PHRASE}</span>

            <span className="su-plan__amorce" aria-hidden="true">
              {AMORCE}
            </span>
            <span className="su-plan__mot" aria-hidden="true">
              {MOT.split('').map((lettre, i) => (
                <span
                  key={i}
                  className="su-plan__lettre"
                  style={{ '--i': i, '--n': MOT.length } as React.CSSProperties}
                >
                  {lettre}
                </span>
              ))}
            </span>
            <span className="su-plan__chute" aria-hidden="true">
              {CHUTE}
            </span>
          </h1>

          <p className="su-plan__accroche su-doux">
            Sites vitrines, e-commerce et applications sur mesure — conçus,
            développés et mis en ligne en {SITE.delais.vitrine}.
          </p>

          <div className="su-plan__actions">
            <BoutonMagnetique href="/devis" className="su-action su-action--eclat">
              Obtenir mon devis gratuit
              <ArrowRight size={17} aria-hidden="true" />
            </BoutonMagnetique>
            <Link href="/services" className="su-lien-trace">
              Découvrir nos services
            </Link>
          </div>

          {cotes && (
            <span className="su-plan__cote-titre" aria-hidden="true">
              largeur du bloc · {cotes.titre} px
            </span>
          )}
        </div>

        {/* La ligne de données remplace les quatre cartes flottantes :
            alignée sur la grille, elle se lit d'un balayage. */}
        <dl className="su-plan__donnees">
          {REPERES.map((r, i) => (
            <div key={r.cle} style={{ '--i': i } as React.CSSProperties}>
              <dt>{r.valeur}</dt>
              <dd className="su-doux">{r.libelle}</dd>
            </div>
          ))}
        </dl>
      </div>

      <div className="su-plan__pied" aria-hidden="true">
        <span className="su-plan__index">01 — Ouverture</span>
        <span className="su-plan__descendre">
          Descendre
          <i />
        </span>
      </div>
    </section>
  )
}
