'use client'
/**
 * /outils/checklist-facture-electronique — LA CHECKLIST. Vingt points en cinq
 * blocs, de vraies cases à cocher natives (fieldset/legend par bloc), une barre
 * de progression annoncée en aria-live, la sélection gardée dans le navigateur
 * (localStorage, protégé : la page fonctionne sans). Tout le contenu est dans
 * le HTML rendu côté serveur ; la barre se remplit par transition de largeur.
 */
import { useEffect, useState } from 'react'
import Action from '@/components/ui/Action'
import Plaque from '@/components/ui/Plaque'
import './checklist-facture-electronique.css'

export interface PointChecklist {
  id: string
  titre: string
  explication: string
  lien?: { href: string; nom: string }
}
export interface BlocChecklist {
  id: string
  titre: string
  intro: string
  points: PointChecklist[]
}

const CLE = 'su-checklist-facture-electronique-v1'

function lire(ids: Set<string>): Set<string> {
  try {
    const brut = window.localStorage.getItem(CLE)
    const liste: unknown = brut ? JSON.parse(brut) : []
    return new Set(Array.isArray(liste) ? liste.filter((x): x is string => typeof x === 'string' && ids.has(x)) : [])
  } catch {
    return new Set()
  }
}

function ecrire(coches: Set<string>) {
  try {
    window.localStorage.setItem(CLE, JSON.stringify([...coches]))
  } catch {
    /* stockage indisponible : la liste fonctionne quand même, sans mémoire */
  }
}

function bilan(fait: number, total: number): { titre: string; texte: string } {
  const part = total ? fait / total : 0
  if (fait === 0) return { titre: 'Vous n’avez pas encore commencé.', texte: 'Rien d’anormal : commencez par le premier bloc, il ne demande qu’un peu de lecture. Cochez au fur et à mesure, la liste se souvient de vous sur cet appareil.' }
  if (part < 0.4) return { titre: 'Vous avez posé les premières bases.', texte: 'Les points restants sont une feuille de route. Avancez bloc par bloc, et notez les questions à poser à votre éditeur et à votre comptable.' }
  if (part < 0.8) return { titre: 'Vous êtes à mi-chemin.', texte: 'Regardez les blocs les moins cochés : ce sont ceux qui méritent votre prochaine heure. Un échange avec votre comptable débloque souvent plusieurs points d’un coup.' }
  if (fait < total) return { titre: 'Vous y êtes presque.', texte: 'Il reste quelques points. Relisez-les : ils demandent souvent une réponse d’un tiers (éditeur, fournisseur, comptable). Gardez la liste sous la main.' }
  return { titre: 'Tous les points sont cochés.', texte: 'C’est une bonne préparation, pas une preuve de conformité. Les règles et les dates peuvent évoluer : relisez les sites officiels de temps en temps.' }
}

export default function ChecklistFactureElectronique({ blocs }: { blocs: BlocChecklist[] }) {
  const ids = blocs.flatMap((b) => b.points.map((p) => p.id))
  const total = ids.length
  const [coches, setCoches] = useState<Set<string>>(() => new Set())

  useEffect(() => {
    const retrouvees = lire(new Set(ids))
    // eslint-disable-next-line react-hooks/set-state-in-effect -- lecture du stockage navigateur, impossible côté serveur
    if (retrouvees.size) setCoches(retrouvees)
    // eslint-disable-next-line react-hooks/exhaustive-deps -- les identifiants sont constants pour une page donnée
  }, [])

  const maj = (suivant: Set<string>) => {
    setCoches(suivant)
    ecrire(suivant)
  }
  const basculer = (id: string) => {
    const s = new Set(coches)
    if (s.has(id)) s.delete(id)
    else s.add(id)
    maj(s)
  }

  const fait = coches.size
  const pct = total ? Math.round((fait / total) * 100) : 0
  const b = bilan(fait, total)

  return (
    <div className="su-cfe">
      <div className="su-cfe__progres">
        <div className="su-cfe__progres-tete">
          <p className="su-mono su-cfe__compte">
            <span className="su-display su-cfe__nombre">{fait}</span> / {total} cases cochées
          </p>
          <p className="su-mono su-cfe__pct">{pct} %</p>
        </div>
        <div className="su-cfe__barre" role="progressbar" aria-label="Avancement de la checklist" aria-valuemin={0} aria-valuemax={total} aria-valuenow={fait} aria-valuetext={`${fait} cases cochées sur ${total}`}>
          <span className="su-cfe__remplie" style={{ width: `${pct}%` }} />
        </div>
        <p className="sr-only" aria-live="polite" role="status">
          {fait} case{fait > 1 ? 's' : ''} cochée{fait > 1 ? 's' : ''} sur {total}.
        </p>
      </div>

      <div className="su-cfe__blocs">
        {blocs.map((bloc, n) => (
          <fieldset key={bloc.id} id={bloc.id} className="su-cfe__bloc">
            <legend className="su-cfe__legende">
              <span className="su-mono su-cfe__bloc-num">Bloc {n + 1} sur {blocs.length}</span>
              <span className="su-display su-cfe__bloc-titre">{bloc.titre}</span>
            </legend>
            <p className="su-cfe__intro">{bloc.intro}</p>
            <ul className="su-cfe__points">
              {bloc.points.map((p) => {
                const coche = coches.has(p.id)
                return (
                  <li key={p.id} className="su-cfe__point" data-coche={coche ? '1' : '0'}>
                    <input id={`cfe-${p.id}`} type="checkbox" className="su-cfe__case" checked={coche} onChange={() => basculer(p.id)} aria-describedby={`cfe-${p.id}-aide`} />
                    <div className="su-cfe__corps">
                      <label htmlFor={`cfe-${p.id}`} className="su-cfe__label">
                        {p.titre}
                      </label>
                      <p id={`cfe-${p.id}-aide`} className="su-cfe__explication">
                        {p.explication}
                        {p.lien && (
                          <>
                            {' '}
                            <a href={p.lien.href} target="_blank" rel="noopener noreferrer" className="su-cfe__lien">
                              {p.lien.nom}
                              <span className="sr-only"> (nouvel onglet)</span>
                            </a>
                          </>
                        )}
                      </p>
                    </div>
                  </li>
                )
              })}
            </ul>
          </fieldset>
        ))}
      </div>

      <div className="su-cfe__actions">
        <Action type="button" onClick={() => window.print()}>
          Imprimer ma liste
        </Action>
        <Action type="button" variante="contour" onClick={() => maj(new Set())}>
          Tout décocher
        </Action>
      </div>

      <Plaque variante="encre" className="su-cfe__bilan">
        <h2 className="su-display su-cfe__bilan-titre">{b.titre}</h2>
        <p className="su-cfe__bilan-texte">{b.texte}</p>
        <p className="su-cfe__bilan-note">Cette liste ne remplace pas l’avis de votre comptable. Calendrier et obligations sont à vérifier sur les sites officiels.</p>
      </Plaque>
    </div>
  )
}
