'use client'
/**
 * MOMENT 08 — L'ATELIER (fondateur). Éditorial, nuit = 1.
 * Portrait à venir (placeholder : une plaque ivoire-creuse de même ratio, pas
 * d'image de stock), nom, titre, trois paragraphes courts, trois questions en
 * accordéon. La pile est à l'arrêt, ombre longue.
 */
import { useEffect, useRef } from 'react'
import StackFrame from '@/webgl/StackFrame'
import { initGsap } from '@/lib/gsap'
import { arriverParScroll } from '../arrivee'
import { SITE } from '@/config/site'
import Accordeon from '@/components/editorial/Accordeon'
import './atelier.css'

const QUESTIONS = [
  { q: 'Pourquoi des outils sur mesure plutôt qu’un abonnement ?', r: 'Un abonnement vous loue un outil pensé pour tout le monde. Un outil sur mesure est fait pour votre façon de travailler, il vous appartient, et il ne s’arrête pas le jour où vous cessez de payer.' },
  { q: 'Que se passe-t-il si je veux changer de prestataire ?', r: 'Vous partez avec le code, les données et les accès. Tout est documenté pour qu’un autre développeur puisse reprendre le travail.' },
  { q: 'La démo avant signature, c’est vraiment gratuit ?', r: 'Oui. Une première version de votre site, faite à partir de ce que vous nous avez dit, avant tout engagement. Si elle ne vous parle pas, vous ne devez rien.' },
]

export default function Atelier() {
  const section = useRef<HTMLElement>(null)
  useEffect(() => {
    initGsap()
    const el = section.current
    if (!el) return
    return arriverParScroll(el, { moment: '08', layout: 'logo', pose: { x: 0, y: 0.35 }, projection: 0.5, calme: true })
  }, [])
  return (
    <section ref={section} className="su-ate" data-moment="08" data-nuit="0" data-titre="L’atelier" id="atelier" aria-labelledby="su-ate-titre">
      <div className="su-ate__grille">
        <div className="su-ate__portrait" role="img" aria-label="Portrait de Mathéo Reboul, à venir">
          <div className="su-plaque su-plaque--ivoire su-ate__placeholder">
            <span className="su-mono">Portrait à venir</span>
          </div>
        </div>
        <div className="su-ate__scene" aria-hidden="true">
          <StackFrame className="su-ate__cadre" />
        </div>
        <div className="su-ate__texte">
          <p className="su-mono su-ate__etiquette">08 — L’atelier</p>
          <h2 id="su-ate-titre" className="su-display su-ate__titre">
            {SITE.fondateur}
          </h2>
          <p className="su-mono su-ate__role">Fondateur, développeur</p>
          <div className="su-ate__paragraphes">
            <p>Je fabrique des sites et des outils pour des gens qui ont un métier à faire tourner, pas du temps à perdre dans un logiciel. Sur mesure, parce qu’un artisan et un restaurateur n’ont pas les mêmes journées.</p>
            <p>Des prix justes, écrits avant de commencer, sans abonnement caché : vous savez ce que vous payez, et ce qui vous appartient à la fin.</p>
            <p>La démo avant la vente, parce qu’un site se juge en le voyant. Vous regardez, vous décidez, et seulement ensuite on signe.</p>
          </div>
          <Accordeon questions={QUESTIONS} className="su-ate__faq" />
        </div>
      </div>
    </section>
  )
}
