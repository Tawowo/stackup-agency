'use client'
/**
 * FICHE SERVICE — /services/[slug]. La forme compilée du service occupe la
 * scène et se tourne au drag (l'objet qu'on achète, vu sous tous les angles) ;
 * les étapes de fabrication s'allument une à une au scroll (scrub pur).
 */
import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import StackFrame from '@/webgl/StackFrame'
import { useScene } from '@/webgl/store'
import { useDragPile } from '@/webgl/useDragPile'
import type { LayoutName } from '@/webgl/layouts'
import { ScrollTrigger, initGsap } from '@/lib/gsap'
import Action from '@/components/ui/Action'
import Cadran from '@/components/ui/Cadran'
import Accordeon from '@/components/editorial/Accordeon'
import type { Service } from '@/data/services'
import './fiche-service.css'

export default function FicheService({ slug, service: s, forme, prix, autres }: { slug: string; service: Service; forme: LayoutName; prix: number; autres: { slug: string; titre: string }[] }) {
  const etapes = useRef<HTMLOListElement>(null)
  const [franchies, setFranchies] = useState(0)
  const bind = useDragPile()
  useEffect(() => {
    initGsap()
    const sc = useScene.getState()
    sc.setMoment(`service-${slug}`)
    sc.setMonde('fabrique')
    sc.setNuit(1)
    sc.setScrub(false)
    sc.setParams({ retard: 0.5, arc: 0.4, flash: 0 })
    sc.setProjection(0.3)
    sc.setPose({ x: 0.08, y: -0.3 })
    if (!sc.reduced) sc.setPair('empile', null)
    // La forme se compile à l'arrivée (une seule fois, à l'ouverture de la page).
    const t = setTimeout(() => {
      if (!useScene.getState().reduced) useScene.getState().setLayout(forme)
    }, 120)
    const ol = etapes.current
    const st = ol
      ? ScrollTrigger.create({
          trigger: ol,
          start: 'top 75%',
          end: 'bottom 45%',
          scrub: true,
          onUpdate: (self) => setFranchies(Math.round(self.progress * s.process.length)),
        })
      : null
    return () => {
      clearTimeout(t)
      st?.kill()
    }
  }, [slug, forme, s.process.length])

  return (
    <article className="su-fsv" data-moment={`service-${slug}`} data-nuit="1">
      <div className="su-fsv__hero">
        <div className="su-fsv__texte">
          <nav className="su-mono su-fsv__ariane" aria-label="Fil d’Ariane">
            <Link href="/services">Services</Link> <span aria-hidden="true">/</span> <span>{s.title}</span>
          </nav>
          <h1 className="su-display su-fsv__titre">{s.title}</h1>
          <p className="su-fsv__sous">{s.subtitle}</p>
          <p className="su-fsv__prix">
            <Cadran valeur={prix} prefixe="à partir de" suffixe="€" className="su-fsv__cadran" />
          </p>
          <div className="su-fsv__actions">
            <Action href={`/contact?objet=${encodeURIComponent(s.title)}`}>{s.cta}</Action>
            <Action href={`/tarifs`} variante="contour">
              Configurer et estimer
            </Action>
          </div>
        </div>
        <div className="su-fsv__scene" {...bind()} role="img" aria-label={`Forme en plaques de l’offre ${s.title} ; faites-la tourner`}>
          <StackFrame className="su-fsv__cadre" />
          <p className="su-mono su-fsv__astuce" aria-hidden="true">
            ← glisser pour tourner →
          </p>
        </div>
      </div>
      <div className="su-fsv__corps">
        <section className="su-fsv__desc">
          {s.description.split(/\n\s*\n/).map((p) => (
            <p key={p.slice(0, 24)}>{p.trim()}</p>
          ))}
        </section>
        <aside className="su-fsv__inclus">
          <h2 className="su-fsv__h2">Inclus</h2>
          <ul>
            {[...s.features, ...s.included].map((f) => (
              <li key={f}>{f}</li>
            ))}
          </ul>
        </aside>
        <section className="su-fsv__process" aria-labelledby="su-fsv-process">
          <h2 id="su-fsv-process" className="su-fsv__h2">
            Comment on le fabrique
          </h2>
          <ol ref={etapes} className="su-fsv__etapes">
            {s.process.map((e, i) => (
              <li key={e.step} data-franchie={i < franchies ? '1' : '0'}>
                <span className="su-mono">{String(i + 1).padStart(2, '0')}</span>
                <strong>{e.step}</strong>
                <span>{e.desc}</span>
              </li>
            ))}
          </ol>
        </section>
        <section className="su-fsv__faq" aria-labelledby="su-fsv-faq">
          <h2 id="su-fsv-faq" className="su-fsv__h2">
            Questions fréquentes
          </h2>
          <Accordeon questions={s.faq.map((f) => ({ q: f.q, r: f.a }))} />
        </section>
      </div>
      <nav className="su-fsv__autres" aria-label="Les autres services">
        {autres.map((a) => (
          <Link key={a.slug} href={`/services/${a.slug}`} className="su-plaque">
            <span className="su-mono">Service</span>
            {a.titre}
          </Link>
        ))}
      </nav>
    </article>
  )
}
