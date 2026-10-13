'use client'
/**
 * /outils/studio-de-style — LE STUDIO. Une activité, une ambiance, puis la
 * palette, la voix, la mise en page et la finition : l'accueil fictif se
 * recompose à chaque choix (la page se redécoupe quand le contenu change, les
 * couleurs glissent). La fiche de style résume, le bouton l'emporte vers
 * /contact. Contrôles natifs (radios, boutons) : clavier compris. Sans JS, le
 * formulaire part en GET et la page se rend côté serveur avec ces choix.
 */
import { useState, type ReactNode } from 'react'
import Action from '@/components/ui/Action'
import Fiche from '@/components/ui/Fiche'
import { formatAPartirDe, offre } from '@/config/site'
import { AMBIANCES, FINITIONS, MISES, PALETTES, SECTEURS, VOIX, ambianceDe, texteSur, type Choix, type Option } from './studio-donnees'
import './studio.css'

function Groupe({ nom, legende, options, valeur, onChoix, rendu }: { nom: keyof Choix; legende: string; options: Option[]; valeur: string; onChoix: (k: keyof Choix, v: string) => void; rendu?: (id: string) => ReactNode }) {
  return (
    <fieldset className="su-sty__groupe">
      <legend className="su-mono su-sty__legende">{legende}</legend>
      <div className="su-sty__options">
        {options.map((o) => (
          <label key={o.id} className="su-sty__option">
            <input type="radio" name={nom} value={o.id} checked={valeur === o.id} onChange={() => onChoix(nom, o.id)} />
            {rendu?.(o.id)}
            <span>{o.nom}</span>
          </label>
        ))}
      </div>
    </fieldset>
  )
}

export default function Studio({ initial }: { initial: Choix }) {
  const [c, setC] = useState(initial)
  const maj = (p: Partial<Choix>) => {
    const suivant = { ...c, ...p }
    setC(suivant)
    // L'URL suit les choix : le style se partage et survit à un rechargement.
    window.history.replaceState(null, '', `?${new URLSearchParams({ ...suivant })}`)
  }
  const s = SECTEURS.find((x) => x.id === c.secteur)!
  const p = PALETTES.find((x) => x.id === c.palette)!
  const v = VOIX.find((x) => x.id === c.voix)!
  const mise = MISES.find((x) => x.id === c.mise)!
  const fin = FINITIONS.find((x) => x.id === c.finition)!
  const amb = ambianceDe(c)
  const o = offre(s.offre)
  const domaine = s.marque.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().replace(/[^a-z0-9]+/g, '-')

  const lignes = [
    { cle: 'Activité', valeur: s.nom },
    { cle: 'Ambiance', valeur: amb?.nom ?? 'Sur mesure' },
    { cle: 'Palette', valeur: `${p.nom} · ${p.primaire} / ${p.accent} / ${p.fond}` },
    { cle: 'Typo', valeur: v.nom },
    { cle: 'Mise en page', valeur: mise.nom },
    { cle: 'Finition', valeur: fin.nom },
    { cle: 'Départ', valeur: `${o.nom}, ${formatAPartirDe(o)}` },
  ]
  const projet = `Je souhaite une démo dans ce style (studio de style) — ${lignes
    .slice(0, -1)
    .map((l) => `${l.cle} : ${l.valeur}`)
    .join(' ; ')}.`
  const style = {
    '--st-fond': p.fond,
    '--st-texte': p.texte,
    '--st-prim': p.primaire,
    '--st-acc': p.accent,
    '--st-sur-prim': texteSur(p.primaire),
    '--st-titre': v.titre,
    '--st-corps': v.corps,
    '--st-graisse': v.graisse,
  } as React.CSSProperties

  return (
    <form className="su-sty" action="/outils/studio-de-style" method="get" onSubmit={(e) => e.preventDefault()}>
      <figure className="su-sty__apercu">
        <div className="su-sty__ecran" style={style} data-mise={c.mise} data-finition={c.finition} role="img" aria-label={`Aperçu fictif de la page d’accueil de « ${s.marque} » : palette ${p.nom}, typographie ${v.nom.toLowerCase()}, mise en page ${mise.nom.toLowerCase()}.`}>
          <div className="su-sty__barre">
            <span />
            <span />
            <span />
            <span className="su-sty__adresse">{domaine}.fr</span>
          </div>
          <div className="su-sty__site" key={`${c.secteur}-${c.mise}`}>
            <div className="su-sty__entete">
              <strong>{s.marque}</strong>
              <span className="su-sty__nav">
                {s.nav.map((n) => (
                  <span key={n}>{n}</span>
                ))}
              </span>
            </div>
            <div className="su-sty__hero">
              <div className="su-sty__texte">
                <p className="su-sty__titre">{s.titre}</p>
                <p className="su-sty__sous">{s.sous}</p>
                <span className="su-sty__btn">{s.cta}</span>
              </div>
              <div className="su-sty__visuel">
                <span />
                <span />
                <span />
              </div>
            </div>
            <ol className="su-sty__items">
              {s.items.map((x, i) => (
                <li key={x}>
                  <span>0{i + 1}</span>
                  {x}
                </li>
              ))}
            </ol>
          </div>
        </div>
        <figcaption className="su-mono su-sty__legende-ap">Maquette fictive · aperçu indicatif</figcaption>
      </figure>

      <div className="su-sty__reglages">
        <Groupe nom="secteur" legende="01 · Votre activité" options={SECTEURS} valeur={c.secteur} onChoix={(k, x) => maj({ [k]: x })} />
        <fieldset className="su-sty__groupe">
          <legend className="su-mono su-sty__legende">02 · Une ambiance, en un geste</legend>
          <div className="su-sty__options">
            {AMBIANCES.map((a) => (
              <button
                key={a.id}
                type="submit"
                name="ambiance"
                value={a.id}
                className="su-sty__option su-sty__ambiance"
                aria-pressed={amb?.id === a.id}
                onClick={(e) => {
                  e.preventDefault()
                  maj({ palette: a.palette, voix: a.voix, mise: a.mise, finition: a.finition })
                }}
              >
                {a.nom}
              </button>
            ))}
          </div>
        </fieldset>
        <Groupe
          nom="palette"
          legende="03 · Palette"
          options={PALETTES}
          valeur={c.palette}
          onChoix={(k, x) => maj({ [k]: x })}
          rendu={(id) => {
            const x = PALETTES.find((y) => y.id === id)!
            return (
              <span className="su-sty__nuancier" aria-hidden="true">
                {[x.fond, x.primaire, x.accent].map((h) => (
                  <i key={h} style={{ background: h }} />
                ))}
              </span>
            )
          }}
        />
        <Groupe
          nom="voix"
          legende="04 · Typographie"
          options={VOIX}
          valeur={c.voix}
          onChoix={(k, x) => maj({ [k]: x })}
          rendu={(id) => {
            const x = VOIX.find((y) => y.id === id)!
            return (
              <span className="su-sty__aa" style={{ fontFamily: x.titre, fontWeight: x.graisse }} aria-hidden="true">
                Aa
              </span>
            )
          }}
        />
        <Groupe nom="mise" legende="05 · Mise en page" options={MISES} valeur={c.mise} onChoix={(k, x) => maj({ [k]: x })} />
        <Groupe nom="finition" legende="06 · Finition" options={FINITIONS} valeur={c.finition} onChoix={(k, x) => maj({ [k]: x })} />
        <noscript>
          <button type="submit" className="su-action su-action--contour">
            <span className="su-action__texte">Mettre à jour l’aperçu</span>
          </button>
        </noscript>
      </div>

      <div className="su-sty__bilan">
        <Fiche titre="Fiche de style" lignes={lignes} className="su-sty__fiche" />
        <p className="su-sty__note">Une base de travail, pas un site fini : la démo reprend ces choix et les ajuste à votre contenu réel.</p>
        <Action href={`/contact?objet=Site&projet=${encodeURIComponent(projet)}`}>Demander une démo dans ce style</Action>
      </div>
    </form>
  )
}
