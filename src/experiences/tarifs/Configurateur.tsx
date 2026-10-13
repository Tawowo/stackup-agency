'use client'
/**
 * LE CONFIGURATEUR DE PILE — trois temps (Type, Fonctions, Options) en plaques
 * HTML, au clavier et au tap. À chaque choix la pile se réassemble et le
 * Cadran recalcule « à partir de X € ». Aucune durée. La configuration part
 * vers /contact dans l'URL : aucune ressaisie.
 */
import { useEffect, useMemo, useState } from 'react'
import { useRouter } from 'next/navigation'
import { SITE, formatAPartirDe, type IdOffre } from '@/config/site'
import { CONFIGURATION_VIDE, FONCTIONS, MAINTENANCES, TYPES, estimer, fonctionsPour, normaliser, serialiser, type Configuration } from '@/lib/configuration'
import { useScene } from '@/webgl/store'
import Action from '@/components/ui/Action'
import Cadran from '@/components/ui/Cadran'
import Plaque from '@/components/ui/Plaque'

export default function Configurateur({ initiale }: { initiale: Configuration }) {
  const [c, setC] = useState<Configuration>(initiale)
  const router = useRouter()
  const e = useMemo(() => estimer(c), [c])
  const fonctions = fonctionsPour(c.type)

  // La scène suit la configuration : cadran tant qu'aucun type, puis la forme.
  useEffect(() => {
    const s = useScene.getState()
    if (s.moment !== 'tarifs' || s.reduced) return
    if (!c.type) {
      s.setParams({ aiguille: e.jauge })
      s.setLayout('cadran')
      return
    }
    const masque = FONCTIONS.reduce((m, f, k) => (c.fonctions.includes(f.id) ? m | (1 << k) : m), 0)
    s.setParams({ type: TYPES.indexOf(c.type), fonctions: masque })
    s.setLayout('configurateur')
  }, [c, e.jauge])

  const maj = (p: Partial<Configuration>) => setC((prev) => normaliser({ ...prev, ...p }))
  const toggleFonction = (id: string) => maj({ fonctions: c.fonctions.includes(id) ? c.fonctions.filter((x) => x !== id) : [...c.fonctions, id] })
  const flechesType = (ev: React.KeyboardEvent, k: number) => {
    const n = TYPES.length
    let j = -1
    if (ev.key === 'ArrowRight' || ev.key === 'ArrowDown') j = (k + 1) % n
    if (ev.key === 'ArrowLeft' || ev.key === 'ArrowUp') j = (k - 1 + n) % n
    if (j < 0) return
    ev.preventDefault()
    maj({ type: TYPES[j]! })
    ;(ev.currentTarget.parentElement?.children[j] as HTMLElement | undefined)?.focus()
  }

  const lien = `/contact?c=${encodeURIComponent(serialiser(c))}`
  return (
    <form
      className="su-conf"
      onSubmit={(ev) => {
        ev.preventDefault()
        router.push(lien)
      }}
      aria-labelledby="su-conf-titre"
    >
      <h2 id="su-conf-titre" className="sr-only">
        Configurateur
      </h2>

      <Plaque as="fieldset" className="su-conf__temps" data-temps="1">
        <legend className="su-mono su-conf__legende">01 · Type</legend>
        <div className="su-conf__types" role="radiogroup" aria-label="Type de projet">
          {TYPES.map((t, k) => {
            const o = SITE.offres.find((x) => x.id === t)!
            const actif = c.type === t
            return (
              <button
                key={t}
                type="button"
                role="radio"
                aria-checked={actif}
                tabIndex={actif || (!c.type && k === 0) ? 0 : -1}
                className="su-conf__type"
                data-actif={actif ? '1' : '0'}
                onClick={() => maj({ type: t as IdOffre })}
                onKeyDown={(ev) => flechesType(ev, k)}
              >
                <span className="su-conf__type-nom">{o.nom}</span>
                <span className="su-mono su-conf__type-prix">{formatAPartirDe(o)}</span>
              </button>
            )
          })}
        </div>
      </Plaque>

      <Plaque as="fieldset" className="su-conf__temps" data-temps="2" disabled={!c.type}>
        <legend className="su-mono su-conf__legende">02 · Fonctions</legend>
        {c.type ? (
          <div className="su-conf__cases">
            {fonctions.map((f) => (
              <label key={f.id} className="su-conf__case" data-actif={c.fonctions.includes(f.id) ? '1' : '0'}>
                <input type="checkbox" checked={c.fonctions.includes(f.id)} onChange={() => toggleFonction(f.id)} />
                <span className="su-conf__case-nom">{f.nom}</span>
                <span className="su-conf__case-detail">{f.detail}</span>
              </label>
            ))}
          </div>
        ) : (
          <p className="su-conf__attente">Choisissez d’abord un type : les fonctions qui vont avec apparaîtront ici.</p>
        )}
      </Plaque>

      <Plaque as="fieldset" className="su-conf__temps" data-temps="3" disabled={!c.type}>
        <legend className="su-mono su-conf__legende">03 · Options</legend>
        <div className="su-conf__options">
          <p className="su-conf__option-titre">Nom de domaine</p>
          <p className="su-conf__option-note">{c.type === 'outil' ? 'Selon le projet, inclus dans le devis.' : 'Offert la première année, puis à votre nom.'}</p>
          <p className="su-conf__option-titre">Maintenance</p>
          <div className="su-conf__maint" role="radiogroup" aria-label="Maintenance">
            <label className="su-conf__case" data-actif={!c.maintenance ? '1' : '0'}>
              <input type="radio" name="maintenance" checked={!c.maintenance} onChange={() => maj({ maintenance: null })} />
              <span className="su-conf__case-nom">Sans</span>
              <span className="su-conf__case-detail">Vous gérez, on reste joignable.</span>
            </label>
            {MAINTENANCES.map((m) => {
              const p = SITE.maintenance.find((x) => x.id === m)!
              return (
                <label key={m} className="su-conf__case" data-actif={c.maintenance === m ? '1' : '0'}>
                  <input type="radio" name="maintenance" checked={c.maintenance === m} onChange={() => maj({ maintenance: m })} />
                  <span className="su-conf__case-nom">{p.nom}</span>
                  <span className="su-conf__case-detail su-tabular">{p.prix} €/mois</span>
                </label>
              )
            })}
          </div>
          {c.type !== 'outil' && (
            <>
              <p className="su-conf__option-titre">Rédaction d’articles</p>
              <div className="su-conf__maint" role="radiogroup" aria-label="Rédaction">
                {[
                  { v: 0 as const, nom: 'Sans', detail: 'Vous écrivez.' },
                  { v: 4 as const, nom: 'Pack 4 articles', detail: `${SITE.redaction.pack4} €` },
                  { v: 8 as const, nom: 'Pack 8 articles', detail: `${SITE.redaction.pack8} €` },
                ].map((r) => (
                  <label key={r.v} className="su-conf__case" data-actif={c.redaction === r.v ? '1' : '0'}>
                    <input type="radio" name="redaction" checked={c.redaction === r.v} onChange={() => maj({ redaction: r.v })} />
                    <span className="su-conf__case-nom">{r.nom}</span>
                    <span className="su-conf__case-detail su-tabular">{r.detail}</span>
                  </label>
                ))}
              </div>
            </>
          )}
        </div>
      </Plaque>

      <div className="su-conf__total" aria-live="polite">
        <p className="su-conf__cadran">
          {c.type ? <Cadran valeur={e.ponctuel} prefixe="à partir de" suffixe="€" /> : <span className="su-conf__vide">Choisissez un type pour voir le plancher.</span>}
        </p>
        {e.mensuel > 0 && (
          <p className="su-mono su-conf__mensuel">
            + <span className="su-tabular">{e.mensuel}</span> €/mois de maintenance
          </p>
        )}
        {e.surDevis.length > 0 && <p className="su-conf__surdevis">Précisé au devis : {e.surDevis.map((f) => f.nom).join(', ')}.</p>}
        <div className="su-conf__actions">
          <Action type="submit" mot="Devis">
            Recevoir un devis
          </Action>
          <button type="button" className="su-action su-action--lien" onClick={() => setC({ ...CONFIGURATION_VIDE })}>
            Tout effacer
          </button>
        </div>
      </div>
    </form>
  )
}
