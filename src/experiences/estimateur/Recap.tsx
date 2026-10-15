'use client'
/**
 * LE RÉCAPITULATIF — toujours visible : colonne fixe sur ordinateur, barre repliable
 * en bas sur mobile. Une FOURCHETTE de création (jamais le prix exact), l'abonnement
 * estimé, le délai indicatif, le détail par bloc, ce qui est inclus.
 */
import { useEffect, useRef, useState, useSyncExternalStore } from 'react'
import Action from '@/components/ui/Action'
import StackFrame from '@/webgl/StackFrame'
import { calculer } from '@/domain/devis/calcul'
import { inclusCreation, auDela } from '@/domain/devis/inclus'
import { euros, fourchetteBloc } from '@/domain/devis/resume'
import type { ConfigDevis } from '@/domain/devis/types'

const abonne = () => () => {}
const rien = (cfg: ConfigDevis) => cfg.accueil === 'Aucun' && !cfg.outil.actif && !cfg.boutique.active

export default function Recap({ cfg, jeton, vue }: { cfg: ConfigDevis; jeton: string; vue: boolean }) {
  const [ouvert, setOuvert] = useState(false)
  const racine = useRef<HTMLElement>(null)
  // Sur mobile la barre est fixée en bas : on publie sa hauteur pour que les boutons d'étape se posent au-dessus.
  useEffect(() => {
    const el = racine.current
    if (!el) return
    const pose = () => document.documentElement.style.setProperty('--su-est-recap-h', `${el.getBoundingClientRect().height}px`)
    pose()
    const ro = new ResizeObserver(pose)
    ro.observe(el)
    return () => {
      ro.disconnect()
      document.documentElement.style.removeProperty('--su-est-recap-h')
    }
  }, [])
  const monte = useSyncExternalStore(abonne, () => true, () => false)
  const r = calculer(cfg)
  const vide = rien(cfg)
  const blocs = r.blocs.filter((b) => b.montant > 0)
  const abo = r.abonnement.mensuel
  return (
    <aside ref={racine} className="su-est__recap" data-ouvert={ouvert ? '1' : '0'} data-vue={vue ? '1' : '0'} aria-labelledby="su-est-recap-titre">
      <div className="su-est__recap-scene" aria-hidden="true">
        <StackFrame className="su-est__recap-cadre" />
      </div>
      <h3 id="su-est-recap-titre" className="su-mono su-est__recap-titre">
        Votre estimation
      </h3>
      <div className="su-est__recap-haut" aria-live="polite" aria-atomic="true">
        <p className="su-est__recap-ligne">
          <span className="su-est__recap-cle">Création</span>
          {vide ? (
            <span className="su-est__recap-val">à définir</span>
          ) : (
            <span className="su-est__recap-val su-tabular" key={`${r.fourchette.bas}-${r.fourchette.haut}`}>
              <span className="su-est__long">
                entre <b>{euros(r.fourchette.bas)}</b> et <b>{euros(r.fourchette.haut)}</b>
              </span>
              <span className="su-est__court">
                <b>{r.fourchette.bas.toLocaleString('fr-FR')} – {euros(r.fourchette.haut)}</b>
              </span>
            </span>
          )}
        </p>
        <p className="su-est__recap-ligne">
          <span className="su-est__recap-cle">Abonnement</span>
          <span className="su-est__recap-val su-tabular">{abo > 0 ? <><span className="su-est__long">environ <b>{euros(abo)}</b> par mois</span><span className="su-est__court"><b>{euros(abo)}</b> / mois</span></> : 'sans abonnement'}</span>
        </p>
      </div>
      {monte && (
        <button type="button" className="su-est__recap-bascule" aria-expanded={ouvert} aria-controls="su-est-recap-corps" onClick={() => setOuvert((o) => !o)}>
          {ouvert ? 'Replier' : 'Voir le détail'}
        </button>
      )}
      <div id="su-est-recap-corps" className="su-est__recap-corps">
        {!vide && (
          <p className="su-est__recap-ligne su-est__recap-ligne--doux">
            <span className="su-est__recap-cle">Délai indicatif</span>
            <span className="su-est__recap-val su-tabular">
              {r.delaiSemaines.min} à {r.delaiSemaines.max} semaines
            </span>
          </p>
        )}
        <p className="su-est__note">Fourchette indicative : le prix exact est fixé au devis, après la démo. Prix nets, TVA non applicable (art. 293 B du CGI). Le délai dépend aussi de la rapidité de vos retours.</p>
        {blocs.length > 0 && (
          <details className="su-est__depliant su-est__depliant--petit">
            <summary>Détail par bloc</summary>
            <dl className="su-est__detail">
              {blocs.map((b) => {
                const f = fourchetteBloc(r, b.montant)
                return (
                  <div key={b.id}>
                    <dt>{b.libelle}</dt>
                    <dd className="su-tabular">{b.montant < 20 ? 'inclus' : `${f.bas.toLocaleString('fr-FR')} – ${euros(f.haut)}`}</dd>
                  </div>
                )
              })}
            </dl>
          </details>
        )}
        <details className="su-est__depliant su-est__depliant--petit">
          <summary>Ce qui est inclus dans toute création</summary>
          <ul className="su-est__inclus">
            {inclusCreation().map((i) => (
              <li key={i.id}>{i.texte}</li>
            ))}
          </ul>
          {auDela() && <p className="su-est__note">{auDela()}</p>}
        </details>
        <div className="su-est__recap-actions">
          <Action href={`/contact?e=${jeton}&a=appel`}>Réserver mon appel gratuit (30 min)</Action>
          <Action href={`/contact?e=${jeton}&a=demo`} variante="contour">
            Demander ma démo
          </Action>
        </div>
      </div>
    </aside>
  )
}
