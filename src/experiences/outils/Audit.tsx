'use client'
/**
 * /outils/audit-site — L'AUDIT. Une adresse, une mesure Google PageSpeed
 * Insights, trois cadrans (performance, accessibilité, SEO) dont l'anneau se
 * trace (stroke-dashoffset) et le chiffre tourne (Cadran), puis les
 * recommandations prioritaires en français. Sans JS, le formulaire part en GET
 * et la page rend la mesure côté serveur : rien n'est masqué par défaut.
 */
import { useRef, useState } from 'react'
import Action from '@/components/ui/Action'
import Cadran from '@/components/ui/Cadran'
import Fiche from '@/components/ui/Fiche'
import Plaque from '@/components/ui/Plaque'
import type { Categorie, ReponseAudit, ResultatAudit } from '@/lib/audit'
import './audit.css'

const VOLETS: { id: Categorie; nom: string; sens: string }[] = [
  { id: 'performance', nom: 'Performance', sens: 'La vitesse perçue sur un téléphone moyen. Une page lente perd des visiteurs avant même de s’afficher.' },
  { id: 'accessibilite', nom: 'Accessibilité', sens: 'Contrastes, tailles, navigation au clavier, textes pour les lecteurs d’écran : un site lisible par tous.' },
  { id: 'seo', nom: 'SEO', sens: 'Les fondations techniques du référencement : titres, descriptions, liens lisibles par Google.' },
]

const niveau = (s: number) => (s >= 90 ? 'Bon' : s >= 50 ? 'À améliorer' : 'Faible')

/** Un cadran : l'anneau se trace jusqu'au score, les seuils 50 et 90 sont cotés. */
function Jauge({ nom, sens, score }: { nom: string; sens: string; score: number | null }) {
  const cran = (v: number) => {
    const a = (v / 100) * 2 * Math.PI - Math.PI / 2
    return { x1: 60 + Math.cos(a) * 44, y1: 60 + Math.sin(a) * 44, x2: 60 + Math.cos(a) * 60, y2: 60 + Math.sin(a) * 60 }
  }
  return (
    <li className="su-aud__jauge">
      <div className="su-aud__anneau">
        <svg viewBox="-4 -4 128 128" aria-hidden="true">
          <circle cx="60" cy="60" r="52" className="su-aud__piste" />
          {score !== null && <circle cx="60" cy="60" r="52" pathLength={100} className="su-aud__arc" style={{ '--score': score } as React.CSSProperties} />}
          <line {...cran(50)} className="su-aud__cran" />
          <line {...cran(90)} className="su-aud__cran" />
        </svg>
        <p className="su-aud__score">{score === null ? <span>—</span> : <Cadran valeur={score} suffixe="/100" />}</p>
      </div>
      <h3 className="su-display su-aud__volet">{nom}</h3>
      <p className="su-mono su-aud__niveau">{score === null ? 'non mesuré' : niveau(score)}</p>
      <p className="su-aud__sens">{sens}</p>
    </li>
  )
}

function Resultats({ r }: { r: ResultatAudit }) {
  const date = new Date(r.mesureLe).toLocaleString('fr-FR', { dateStyle: 'long', timeStyle: 'short' })
  const s = r.scores
  const projet = `Audit automatique de ${r.url} : performance ${s.performance ?? '—'}, accessibilité ${s.accessibilite ?? '—'}, SEO ${s.seo ?? '—'} (sur 100). J’aimerais en parler.`
  return (
    <section className="su-aud__resultats" aria-labelledby="su-aud-res">
      <h2 id="su-aud-res" className="su-display su-aud__h2">
        Mesure de <span className="su-aud__url">{r.url.replace(/^https?:\/\/(www\.)?/, '').replace(/\/$/, '')}</span>
      </h2>
      <p className="su-mono su-aud__quand">
        Google PageSpeed Insights · mobile · {date}
      </p>
      <ul className="su-aud__jauges">
        {VOLETS.map((v) => (
          <Jauge key={v.id} nom={v.nom} sens={v.sens} score={s[v.id]} />
        ))}
      </ul>
      {r.mesures.length > 0 && <Fiche titre="Mesures de laboratoire" className="su-aud__fiche" lignes={r.mesures.map((m) => ({ cle: m.cle, valeur: `${m.valeur} — ${m.libelle}` }))} />}
      <h2 className="su-display su-aud__h2">Ce que Google relève en priorité</h2>
      {r.recommandations.length ? (
        <ol className="su-aud__recos">
          {r.recommandations.map((x, i) => (
            <li key={x.id} className="su-aud__reco" style={{ '--i': i } as React.CSSProperties}>
              <p className="su-mono su-aud__reco-cat">{VOLETS.find((v) => v.id === x.categorie)!.nom}</p>
              <h3 className="su-aud__reco-titre">{x.titre}</h3>
              {x.detail && <p className="su-aud__reco-detail">{x.detail}</p>}
              <p className="su-mono su-aud__reco-pied">
                {x.elements > 0 && <span>{x.elements} élément{x.elements > 1 ? 's' : ''} relevé{x.elements > 1 ? 's' : ''}</span>}
                {x.lien && (
                  <a href={x.lien} target="_blank" rel="noopener noreferrer">
                    Explication de Google<span className="sr-only"> (nouvel onglet)</span>
                  </a>
                )}
              </p>
            </li>
          ))}
        </ol>
      ) : (
        <p className="su-aud__rien">Google ne relève aucun point prioritaire sur ces trois volets pour cette page.</p>
      )}
      <Plaque variante="encre" className="su-aud__suite">
        <p className="su-aud__honnete">
          Ces chiffres sont une mesure automatique de Google, sur une seule page, à un instant donné : ils varient d’une mesure à l’autre et ne disent rien de vos textes ni de votre visibilité réelle. C’est un point de départ, pas un verdict ni une promesse.
        </p>
        <Action href={`/contact?objet=Site&projet=${encodeURIComponent(projet)}`}>Parler de ces résultats</Action>
      </Plaque>
    </section>
  )
}

export default function Audit({ adresse = '', initial = null }: { adresse?: string; initial?: ReponseAudit | null }) {
  const [url, setUrl] = useState(adresse)
  const [enCours, setEnCours] = useState(false)
  const [reponse, setReponse] = useState<ReponseAudit | null>(initial)
  const abandon = useRef<AbortController | null>(null)

  const mesurer = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!url.trim()) return
    abandon.current?.abort()
    const ctrl = new AbortController()
    abandon.current = ctrl
    setEnCours(true)
    setReponse(null)
    try {
      const res = await fetch('/api/audit', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ url: url.trim() }), signal: ctrl.signal })
      const data = (await res.json().catch(() => null)) as ReponseAudit | null
      setReponse(data ?? { ok: false, statut: res.status, erreur: 'Réponse illisible du serveur. Réessayez dans un moment.' })
    } catch (err) {
      if (err instanceof Error && err.name === 'AbortError') return
      setReponse({ ok: false, statut: 0, erreur: 'La connexion a été interrompue. Vérifiez votre réseau et réessayez.' })
    }
    if (abandon.current === ctrl) setEnCours(false)
  }

  return (
    <div className="su-aud">
      <Plaque as="form" variante="encre" className="su-aud__form" action="/outils/audit-site" method="get" onSubmit={mesurer} role="search" aria-label="Mesurer un site">
        <label htmlFor="su-aud-adresse" className="su-mono su-aud__label">
          Adresse du site
        </label>
        <div className="su-aud__ligne">
          <input id="su-aud-adresse" name="url" type="text" inputMode="url" autoComplete="url" spellCheck={false} placeholder="mon-site.fr" required maxLength={500} value={url} onChange={(e) => setUrl(e.target.value)} className="su-aud__champ" aria-describedby="su-aud-note" />
          <Action type="submit">{enCours ? 'Mesure en cours…' : 'Mesurer'}</Action>
        </div>
        <p id="su-aud-note" className="su-aud__note">
          Mesure faite par Google PageSpeed Insights, version mobile. Gratuit, sans inscription ; l’adresse n’est pas conservée.
        </p>
      </Plaque>

      <div className="su-aud__etat" aria-live="polite">
        {enCours && (
          <div className="su-aud__attente">
            <svg viewBox="0 0 48 48" aria-hidden="true">
              <circle cx="24" cy="24" r="20" pathLength={100} className="su-aud__boucle" />
            </svg>
            <p>Google charge la page et la mesure. Cela prend souvent entre 15 et 40 secondes.</p>
          </div>
        )}
        {reponse && !reponse.ok && (
          <p className="su-aud__erreur" role="alert">
            {reponse.erreur}
          </p>
        )}
      </div>
      {reponse?.ok && <Resultats key={`${reponse.resultat.url}-${reponse.resultat.mesureLe}`} r={reponse.resultat} />}
    </div>
  )
}
