'use client'
/**
 * LES CONTRÔLES DE L'ESTIMATEUR — des champs natifs (radio, case, curseur, nombre)
 * habillés en cartes : clavier et lecteur d'écran gratuits, aucun état caché.
 */
import { useId, type CSSProperties, type ReactNode } from 'react'

export interface OptionCarte<T extends string> {
  valeur: T
  titre: string
  phrase?: string
  /** Aperçu visuel (maquette animée). */
  apercu?: ReactNode
  /** Petite mention (« dès 200 € »). */
  mention?: string
  detail?: string
}

/** Un choix parmi plusieurs : radios natifs en cartes. */
export function CartesRadio<T extends string>({
  nom,
  legende,
  options,
  valeur,
  onChange,
  grand = false,
  colonnes,
  disabled = false,
}: {
  nom: string
  legende: string
  options: OptionCarte<T>[]
  valeur: T
  onChange: (v: T) => void
  grand?: boolean
  colonnes?: number
  disabled?: boolean
}) {
  const uid = useId()
  return (
    <fieldset className="su-est__choix" data-grand={grand ? '1' : '0'} data-cols={colonnes} style={colonnes ? ({ '--cols': colonnes } as CSSProperties) : undefined} disabled={disabled}>
      <legend className="sr-only">{legende}</legend>
      {options.map((o) => {
        const actif = o.valeur === valeur
        return (
          <label key={o.valeur} className="su-est__carte" data-actif={actif ? '1' : '0'}>
            <input type="radio" name={`${uid}-${nom}`} value={o.valeur} checked={actif} onChange={() => onChange(o.valeur)} />
            {o.apercu && <span className="su-est__apercu">{o.apercu}</span>}
            <span className="su-est__carte-titre">{o.titre}</span>
            {o.phrase && <span className="su-est__carte-phrase">{o.phrase}</span>}
            {o.detail && (
              <details className="su-est__plus" onClick={(e) => e.stopPropagation()}>
                <summary>Ce qu’on fait concrètement</summary>
                <span>{o.detail}</span>
              </details>
            )}
            {o.mention && <span className="su-mono su-est__mention">{o.mention}</span>}
          </label>
        )
      })}
    </fieldset>
  )
}

/** Une case à cocher en carte (option qu'on ajoute ou retire). */
export function CarteCase({
  checked,
  onChange,
  titre,
  phrase,
  mention,
  children,
}: {
  checked: boolean
  onChange: (v: boolean) => void
  titre: string
  phrase?: string
  mention?: string
  children?: ReactNode
}) {
  return (
    <div className="su-est__carte su-est__carte--case" data-actif={checked ? '1' : '0'}>
      <label className="su-est__case">
        <input type="checkbox" checked={checked} onChange={(e) => onChange(e.target.checked)} />
        <span className="su-est__coche" aria-hidden="true" />
        <span className="su-est__carte-titre">{titre}</span>
        {phrase && <span className="su-est__carte-phrase">{phrase}</span>}
        {mention && <span className="su-mono su-est__mention">{mention}</span>}
      </label>
      {checked && children}
    </div>
  )
}

/** Un nombre : curseur + saisie au clavier, synchronisés. */
export function Compteur({
  libelle,
  aide,
  valeur,
  onChange,
  min = 0,
  max,
  maxCurseur,
  pas = 1,
  unite,
  compact = false,
}: {
  libelle: string
  aide?: string
  valeur: number
  onChange: (n: number) => void
  min?: number
  max: number
  /** Borne du curseur si plus petite que celle de la saisie. */
  maxCurseur?: number
  pas?: number
  unite?: string
  compact?: boolean
}) {
  const id = useId()
  const borne = (n: number) => Math.min(max, Math.max(min, Math.round(Number.isFinite(n) ? n : min)))
  return (
    <div className="su-est__compteur" data-compact={compact ? '1' : '0'}>
      <label htmlFor={`${id}-n`} className="su-est__compteur-libelle">
        {libelle}
      </label>
      {aide && (
        <p className="su-est__aide" id={`${id}-aide`}>
          {aide}
        </p>
      )}
      <div className="su-est__compteur-ligne">
        {!compact && (
          <input
            type="range"
            className="su-est__curseur"
            min={min}
            max={maxCurseur ?? max}
            step={pas}
            value={Math.min(valeur, maxCurseur ?? max)}
            onChange={(e) => onChange(borne(Number(e.target.value)))}
            aria-label={`${libelle} (curseur)`}
            aria-describedby={aide ? `${id}-aide` : undefined}
          />
        )}
        <span className="su-est__nombre">
          <button type="button" className="su-est__pas" aria-label={`Moins : ${libelle}`} onClick={() => onChange(borne(valeur - pas))} disabled={valeur <= min}>
            −
          </button>
          <input
            id={`${id}-n`}
            className="su-est__saisie su-tabular"
            type="number"
            inputMode="numeric"
            min={min}
            max={max}
            step={pas}
            value={valeur}
            onChange={(e) => onChange(borne(Number(e.target.value)))}
            aria-describedby={aide ? `${id}-aide` : undefined}
          />
          <button type="button" className="su-est__pas" aria-label={`Plus : ${libelle}`} onClick={() => onChange(borne(valeur + pas))} disabled={valeur >= max}>
            +
          </button>
          {unite && <span className="su-est__unite">{unite}</span>}
        </span>
      </div>
    </div>
  )
}

/** Titre de sous-partie d'une étape. */
export function Partie({ titre, phrase, children }: { titre: string; phrase?: string; children: ReactNode }) {
  return (
    <section className="su-est__partie">
      <h4 className="su-est__partie-titre">{titre}</h4>
      {phrase && <p className="su-est__aide">{phrase}</p>}
      {children}
    </section>
  )
}
