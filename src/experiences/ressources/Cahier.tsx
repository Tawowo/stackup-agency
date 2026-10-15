'use client'
/**
 * LE CAHIER DES CHARGES — cinq plaques de questions. Avec JS : une plaque se
 * déplie à la fois (rotateX depuis son arête haute), les plaques faites se
 * replient sur le résumé de leurs réponses ; « Générer » découpe la feuille
 * (clip-path) et propose impression, copie et envoi vers /contact. Sans JS :
 * toutes les questions sont ouvertes et le formulaire part en GET vers la
 * page, qui rend la feuille côté serveur.
 */
import { useRef, useState, useSyncExternalStore } from 'react'
import { flushSync } from 'react-dom'
import type Lenis from 'lenis'
import Action from '@/components/ui/Action'
import Plaque from '@/components/ui/Plaque'
import { calculer } from '@/domain/devis/calcul'
import { decoder } from '@/domain/devis/etat'
import { euros, fourchetteTexte, lignesConfig } from '@/domain/devis/resume'
import { creerPdf, type BlocPdf } from '@/lib/pdf-simple'
import { SITE } from '@/config/site'
import { ETAPES, nbRepondues, objetContact, resume, sections, texte, valeur, versParams, type Question, type Reponses } from './cahier-modele'
import './cahier.css'

const CHEMIN = '/ressources/cahier-des-charges'
const abonnement = () => () => {}

export default function Cahier({ initiale, genere: genereInitial, jeton = '' }: { initiale: Reponses; genere: boolean; jeton?: string }) {
  // false au rendu serveur et à l'hydratation, true ensuite : le mode « pas à pas » n'existe qu'avec JS.
  const js = useSyncExternalStore(
    abonnement,
    () => true,
    () => false,
  )
  const [r, setR] = useState<Reponses>(initiale)
  const [etape, setEtape] = useState(0)
  const [genere, setGenere] = useState(genereInitial)
  const [tirage, setTirage] = useState(0)
  const [copie, setCopie] = useState(false)
  const racine = useRef<HTMLDivElement>(null)
  const titreFeuille = useRef<HTMLHeadingElement>(null)
  const total = ETAPES.length

  const majTexte = (cle: Question['cle'], v: string) => setR((p) => ({ ...p, [cle]: v }))
  const basculer = (cle: 'objectifs' | 'fonctions', v: string) => setR((p) => ({ ...p, [cle]: p[cle].includes(v) ? p[cle].filter((x) => x !== v) : [...p[cle], v] }))

  const aller = (i: number) => {
    flushSync(() => setEtape(i))
    const el = racine.current?.querySelector<HTMLElement>(`#su-cdc-etape-${i} input, #su-cdc-etape-${i} textarea`)
    el?.focus({ preventScroll: true })
    defiler(racine.current?.querySelector<HTMLElement>(`#su-cdc-etape-${i}`) ?? null)
  }

  const generer = (ev: React.FormEvent) => {
    ev.preventDefault()
    flushSync(() => {
      setGenere(true)
      setTirage((t) => t + 1)
    })
    const p = versParams(r)
    p.set('genere', '1')
    window.history.replaceState(null, '', `${CHEMIN}?${p.toString()}#cahier-feuille`)
    titreFeuille.current?.focus({ preventScroll: true })
    defiler(titreFeuille.current)
  }

  const copier = async () => {
    try {
      await navigator.clipboard.writeText(texte(r))
      setCopie(true)
      setTimeout(() => setCopie(false), 2400)
    } catch {
      setCopie(false)
    }
  }

  const lienContact = `/contact?objet=${encodeURIComponent(objetContact(r))}&projet=${encodeURIComponent(resume(r))}${jeton ? `&e=${encodeURIComponent(jeton)}` : ''}&a=appel`

  // Le PDF du visiteur : ses réponses, et son estimation (fourchette seulement) s'il en a fait une.
  const telechargerPdf = () => {
    const blocs: BlocPdf[] = [{ type: 'titre', texte: 'Cahier des charges — projet web' }, { type: 'texte', texte: `Établi sur ${SITE.url.replace('https://', '')} le ${new Date().toLocaleDateString('fr-FR')}, pour ${SITE.nom} (${SITE.fondateur}).` }]
    for (const s of sections(r)) {
      blocs.push({ type: 'sous-titre', texte: `${s.num}. ${s.titre}` })
      for (const l of s.lignes) blocs.push({ type: 'puce', texte: `${l.cle} : ${l.valeur || '—'}` })
    }
    if (jeton) {
      const e = decoder(jeton)
      const res = calculer(e.cfg)
      blocs.push({ type: 'sous-titre', texte: 'Votre estimation (indicative)' })
      for (const l of lignesConfig(e.cfg, e.metier)) blocs.push({ type: 'puce', texte: `${l.cle} : ${l.valeur}` })
      blocs.push({ type: 'texte', texte: `Création ${fourchetteTexte(res)}${res.abonnement.mensuel > 0 ? `, abonnement environ ${euros(res.abonnement.mensuel)} par mois` : ''}. Le prix exact est fixé au devis. ${SITE.mentions.tva}.` })
    }
    const url = URL.createObjectURL(new Blob([creerPdf(blocs, `${SITE.nom} — ${SITE.telephone}`) as BlobPart], { type: 'application/pdf' }))
    const a = document.createElement('a')
    a.href = url
    a.download = 'cahier-des-charges.pdf'
    a.click()
    setTimeout(() => URL.revokeObjectURL(url), 4000)
  }
  const avance = js ? (genere ? 1 : etape / total) : 0

  return (
    <div ref={racine} className="su-cdc" data-js={js ? '1' : '0'}>
      <form className="su-cdc__form" method="get" action={`${CHEMIN}#cahier-feuille`} onSubmit={generer} aria-labelledby="su-cdc-titre">
        <h2 id="su-cdc-titre" className="su-cdc__h2">
          Le questionnaire
        </h2>
        <input type="hidden" name="genere" value="1" />

        {js && (
          <div className="su-cdc__suivi">
            <p className="su-mono su-cdc__compteur" role="status" aria-live="polite">
              {genere ? 'Cahier généré' : `Étape ${etape + 1} / ${total} · ${ETAPES[etape]!.titre}`}
            </p>
            <svg className="su-cdc__trace" viewBox="0 0 100 2" preserveAspectRatio="none" aria-hidden="true">
              <line x1="0" y1="1" x2="100" y2="1" className="su-cdc__trace-fond" />
              <line x1="0" y1="1" x2="100" y2="1" className="su-cdc__trace-plein" pathLength={1} style={{ strokeDashoffset: 1 - avance }} />
            </svg>
          </div>
        )}

        <ol className="su-cdc__pile">
          {ETAPES.map((e, i) => {
            const n = nbRepondues(r, e)
            const etat = !js ? 'ouverte' : i === etape ? 'active' : n > 0 || i < etape ? 'faite' : 'a-venir'
            const ouverte = etat === 'ouverte' || etat === 'active'
            const resumeEtape = e.questions
              .map((q) => valeur(r, q))
              .filter(Boolean)
              .join(' · ')
            const entete = (
              <>
                <span className="su-mono su-cdc__num">0{i + 1}</span>
                <span className="su-cdc__titre-etape">{e.titre}</span>
                {js && (
                  <span className="su-mono su-cdc__etat">
                    {n}/{e.questions.length}
                  </span>
                )}
              </>
            )
            return (
              <Plaque as="li" key={e.id} id={`su-cdc-etape-${i}`} className="su-cdc__etape" data-etat={etat}>
                <h3 className="su-cdc__tete-etape">
                  {js ? (
                    <button type="button" className="su-cdc__bouton-etape" aria-expanded={ouverte} aria-controls={`su-cdc-corps-${i}`} onClick={() => aller(i)}>
                      {entete}
                    </button>
                  ) : (
                    <span className="su-cdc__bouton-etape">{entete}</span>
                  )}
                </h3>
                {etat === 'faite' && resumeEtape && <p className="su-cdc__resume">{resumeEtape}</p>}
                <div id={`su-cdc-corps-${i}`} className="su-cdc__corps-etape" hidden={!ouverte}>
                  <p className="su-cdc__intro">{e.intro}</p>
                  {e.questions.map((q) => (
                    <Champ key={q.cle} q={q} r={r} onTexte={majTexte} onBascule={basculer} />
                  ))}
                  {js && (
                    <div className="su-cdc__nav">
                      {i > 0 && (
                        <Action variante="contour" onClick={() => aller(i - 1)}>
                          Précédent
                        </Action>
                      )}
                      {i < total - 1 ? (
                        <Action onClick={() => aller(i + 1)}>Suivant : {ETAPES[i + 1]!.titre.toLowerCase()}</Action>
                      ) : (
                        <Action type="submit">Générer le cahier des charges</Action>
                      )}
                    </div>
                  )}
                </div>
              </Plaque>
            )
          })}
        </ol>

        <div className="su-cdc__envoi">
          {js ? (
            etape < total - 1 && (
              <Action type="submit" variante="lien">
                Générer dès maintenant avec ces réponses
              </Action>
            )
          ) : (
            <Action type="submit">Générer le cahier des charges</Action>
          )}
          <p className="su-cdc__note">Rien n’est envoyé : vos réponses restent dans votre navigateur tant que vous ne nous les transmettez pas.</p>
        </div>
      </form>

      {genere && (
        <article key={tirage} id="cahier-feuille" className="su-cdc__feuille" aria-labelledby="su-cdc-feuille-titre">
          <header className="su-cdc__feuille-tete">
            <p className="su-mono su-cdc__feuille-etiquette">Cahier des charges · projet web</p>
            <h2 id="su-cdc-feuille-titre" ref={titreFeuille} tabIndex={-1} className="su-display su-cdc__feuille-titre">
              {r.activite || r.secteur || 'Votre projet'}
            </h2>
            {js && <p className="su-mono su-cdc__feuille-date">Établi le {new Date().toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}</p>}
          </header>
          {sections(r).map((s) => (
            <section key={s.num} className="su-cdc__section">
              <h3 className="su-cdc__section-titre">
                <span className="su-mono">0{s.num}</span> {s.titre}
              </h3>
              <dl className="su-cdc__lignes">
                {s.lignes.map((l) => (
                  <div key={l.cle} className="su-cdc__ligne">
                    <dt>{l.cle}</dt>
                    <dd data-vide={l.valeur ? '0' : '1'}>{l.valeur || 'À préciser'}</dd>
                  </div>
                ))}
              </dl>
            </section>
          ))}
          <footer className="su-cdc__feuille-actions">
            <div className="su-cdc__feuille-boutons">
              <Action href={lienContact} variante="plein">
                Envoyer à Mathéo Reboul
              </Action>
              {js && (
                <Action variante="contour" onClick={telechargerPdf}>
                  Télécharger en PDF
                </Action>
              )}
              {js && (
                <Action variante="lien" onClick={() => window.print()}>
                  Imprimer
                </Action>
              )}
            </div>
            {js ? (
              <Action variante="lien" onClick={copier}>
                {copie ? 'Texte copié' : 'Copier le texte'}
              </Action>
            ) : (
              <p className="su-cdc__note">Pour en faire un PDF : Ctrl + P (ou Cmd + P), puis « Enregistrer au format PDF ».</p>
            )}
            <p className="su-cdc__note" role="status" aria-live="polite">
              {copie ? 'Le cahier est dans votre presse-papiers.' : ''}
            </p>
          </footer>
        </article>
      )}
    </div>
  )
}

function Champ({ q, r, onTexte, onBascule }: { q: Question; r: Reponses; onTexte: (cle: Question['cle'], v: string) => void; onBascule: (cle: 'objectifs' | 'fonctions', v: string) => void }) {
  const id = `su-cdc-${q.cle}`
  if (q.type === 'multi' || q.type === 'choix') {
    const choisi = (o: string) => (q.type === 'multi' ? r[q.cle].includes(o) : r[q.cle] === o)
    return (
      <fieldset className="su-cdc__groupe">
        <legend className="su-cdc__label">{q.label}</legend>
        <div className="su-cdc__options">
          {q.options.map((o) => (
            <label key={o} className="su-cdc__option">
              <input
                type={q.type === 'multi' ? 'checkbox' : 'radio'}
                name={q.cle}
                value={o}
                checked={choisi(o)}
                onChange={() => (q.type === 'multi' ? onBascule(q.cle, o) : onTexte(q.cle, o))}
              />
              <span>{o}</span>
            </label>
          ))}
        </div>
      </fieldset>
    )
  }
  const props = {
    id,
    name: q.cle,
    value: r[q.cle],
    maxLength: 400,
    'aria-describedby': q.aide ? `${id}-aide` : undefined,
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => onTexte(q.cle, e.target.value),
  }
  return (
    <div className="su-cdc__champ">
      <label htmlFor={id} className="su-cdc__label">
        {q.label}
      </label>
      {q.type === 'long' ? <textarea rows={3} {...props} /> : <input type="text" {...props} />}
      {q.aide && (
        <p id={`${id}-aide`} className="su-cdc__aide">
          {q.aide}
        </p>
      )}
    </div>
  )
}

/** Amène un élément sous la nav : par Lenis s'il tourne, sinon nativement. */
function defiler(el: HTMLElement | null) {
  if (!el) return
  const lenis = (window as unknown as { __suLenis?: Lenis }).__suLenis
  if (lenis) lenis.scrollTo(el, { offset: -110, duration: 1.1 })
  else el.scrollIntoView({ block: 'start' })
}
