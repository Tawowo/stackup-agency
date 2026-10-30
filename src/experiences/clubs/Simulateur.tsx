'use client'
/**
 * LE SIMULATEUR DES CLUBS — cinq étapes sur une seule page (tout est visible, rien n'est masqué), un résumé qui se met à jour en direct,
 * un lien partageable (l'état est dans l'URL), l'impression, l'envoi par e-mail et la demande de devis.
 * Tous les montants viennent de data/offre-clubs/pricing.ts via domain/clubs/calcul.ts : rien n'est écrit en dur ici.
 * Version `compact` pour la grande page : licenciés, formule, estimation, et un lien vers la simulation complète.
 */
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import Link from 'next/link'
import Action from '@/components/ui/Action'
import { suivre } from '@/lib/mesure'
import { PRICING, categorieDe, type OptionClub } from '@/data/offre-clubs/pricing'
import { HORS_CATALOGUE, MENTION_PRIX_INDICATIFS, SITE_INCLUS, LOGICIEL_INCLUS, ABONNEMENT_INCLUS } from '@/data/offre-clubs/inclus'
import { DEMO } from '@/config/offre-clubs'
import { calculer, categoriePour, optionDisponible, prixFormule, heuresIncluses } from '@/domain/clubs/calcul'
import { decoder, encoder } from '@/domain/clubs/etat'
import { eur, eurCents, lignesResume, texteDevis, LIBELLE_FORMULE } from '@/domain/clubs/resume'
import type { Formule, Simulation } from '@/domain/clubs/types'
import './simulateur.css'

const GROUPES: { id: OptionClub['groupe']; titre: string }[] = [
  { id: 'fonction', titre: 'Fonctions en option' },
  { id: 'visibilite', titre: 'Être trouvé sur Internet' },
  { id: 'contenu', titre: 'Pages et contenus' },
  { id: 'service', titre: 'Services' },
]
const DEPARTEMENTS = ['Indre-et-Loire', 'Cher', 'Eure-et-Loir', 'Indre', 'Loir-et-Cher', 'Loiret']

const entier = (v: string, max = 20000) => {
  const n = parseInt(v.replace(/\D/g, ''), 10)
  return Number.isFinite(n) ? Math.min(n, max) : 0
}
const decimal = (v: string, max = 100) => {
  const n = parseFloat(v.replace(',', '.'))
  return Number.isFinite(n) && n > 0 ? Math.min(n, max) : 0
}

export default function Simulateur({ compact = false, initial }: { compact?: boolean; initial?: Record<string, string | undefined> }) {
  const [sim, setSim] = useState<Simulation>(() => decoder(initial ?? {}))
  const debute = useRef(false)
  const termine = useRef(false)
  const [copie, setCopie] = useState(false)
  const res = useMemo(() => calculer(sim), [sim])
  const renseigne = sim.licencies.actuelle > 0
  const requete = useMemo(() => encoder(sim), [sim])

  const maj = useCallback((f: (s: Simulation) => Simulation) => {
    if (!debute.current) {
      debute.current = true
      suivre('clubs_simulateur_commence')
    }
    setSim((s) => f(structuredClone(s)))
  }, [])
  const fin = useCallback(() => {
    if (termine.current) return
    termine.current = true
    suivre('clubs_simulateur_termine')
  }, [])

  // L'état dans l'URL : le lien se partage tel quel.
  useEffect(() => {
    if (compact) return
    const url = `${window.location.pathname}${requete ? `?${requete}` : ''}`
    window.history.replaceState(null, '', url)
  }, [requete, compact])

  const lien = useCallback(() => `${typeof window === 'undefined' ? '' : window.location.origin}/clubs-de-tennis/simulateur${requete ? `?${requete}` : ''}`, [requete])

  const catSuivi = renseigne ? categoriePour(sim.licencies.actuelle) : null
  const refPrix = categorieDe(catSuivi?.id ?? 'mini')

  const radioFormule = (f: Formule, titre: string, texte: string, badge?: string) => {
    const p = prixFormule(refPrix, f)
    return (
      <label className="cs-carte" data-actif={sim.formule === f ? '1' : '0'} key={f}>
        <input type="radio" name="formule" value={f} checked={sim.formule === f} onChange={() => maj((s) => ({ ...s, formule: f }))} />
        <span className="cs-carte__titre">
          {titre}
          {badge && <em className="cs-badge">{badge}</em>}
        </span>
        <span className="cs-carte__texte">{texte}</span>
        <span className="cs-carte__prix">
          {renseigne ? '' : 'à partir de '}
          {eur(p.miseEnPlace)} <small>de mise en place</small> · {eur(p.mensuel)} <small>par mois</small>
        </span>
      </label>
    )
  }

  const formules = (
    <fieldset className="cs-etape cs-cartes">
      <legend>
        <span className="cs-num">2</span> Votre formule
      </legend>
      {radioFormule('pack', 'Site + logiciel', 'Le site de votre club et le logiciel de votre bureau, connectés.', `−${Math.round(PRICING.packDiscount * 100)} %`)}
      {radioFormule('site', 'Site seul', 'La vitrine du club, que vous modifiez vous-même.')}
      {radioFormule('logiciel', 'Logiciel seul', 'La gestion du bureau, des adhérents et de l’école de tennis.')}
    </fieldset>
  )

  const licencies = (
    <fieldset className="cs-etape">
      <legend>
        <span className="cs-num">1</span> Votre club
      </legend>
      {!compact && (
        <div className="cs-grille">
          <label className="cs-champ">
            <span>Nom du club</span>
            <input type="text" autoComplete="organization" maxLength={80} value={sim.club.nom} onChange={(e) => maj((s) => ({ ...s, club: { ...s.club, nom: e.target.value } }))} />
          </label>
          <label className="cs-champ">
            <span>Commune</span>
            <input type="text" autoComplete="address-level2" maxLength={80} value={sim.club.commune} onChange={(e) => maj((s) => ({ ...s, club: { ...s.club, commune: e.target.value } }))} />
          </label>
          <label className="cs-champ">
            <span>Département</span>
            <input type="text" list="cs-departements" maxLength={40} value={sim.club.departement} onChange={(e) => maj((s) => ({ ...s, club: { ...s.club, departement: e.target.value } }))} />
            <datalist id="cs-departements">
              {DEPARTEMENTS.map((d) => (
                <option key={d} value={d} />
              ))}
            </datalist>
          </label>
        </div>
      )}
      <p className="cs-aide">On compte les licenciés FFT de la saison en cours, sections tennis, padel et pickleball comprises.</p>
      <div className="cs-grille">
        <label className="cs-champ">
          <span>Licenciés, saison en cours</span>
          <input type="text" inputMode="numeric" pattern="[0-9]*" aria-describedby="cs-cat" value={sim.licencies.actuelle || ''} placeholder="ex. 220" onChange={(e) => maj((s) => ({ ...s, licencies: { ...s.licencies, actuelle: entier(e.target.value) } }))} />
        </label>
        {!compact && (
          <>
            <label className="cs-champ">
              <span>Saison précédente</span>
              <input type="text" inputMode="numeric" pattern="[0-9]*" value={sim.licencies.precedente || ''} onChange={(e) => maj((s) => ({ ...s, licencies: { ...s.licencies, precedente: entier(e.target.value) } }))} />
            </label>
            <label className="cs-champ">
              <span>Il y a deux saisons</span>
              <input type="text" inputMode="numeric" pattern="[0-9]*" value={sim.licencies.avantPrecedente || ''} onChange={(e) => maj((s) => ({ ...s, licencies: { ...s.licencies, avantPrecedente: entier(e.target.value) } }))} />
            </label>
          </>
        )}
      </div>
      <p className="cs-categorie" id="cs-cat" aria-live="polite">
        {renseigne ? (
          <>
            Catégorie <strong>{res.categorie.nom}</strong> ({res.categorie.licenciesMin}
            {res.categorie.licenciesMax ? ` à ${res.categorie.licenciesMax}` : ' et plus'} licenciés) · {res.stockageGo} Go de stockage
          </>
        ) : (
          'Indiquez le nombre de licenciés pour connaître votre catégorie.'
        )}
      </p>
      {!compact && res.moyenneLicencies !== null && (
        <p className="cs-aide">
          Moyenne des saisons renseignées : {res.moyenneLicencies} licenciés.
          {res.baisseSensible && <strong> Nous vous demanderons un justificatif : une baisse peut tout à fait être réelle, nous en tenons compte avec bienveillance.</strong>}
        </p>
      )}
    </fieldset>
  )

  const options = (
    <fieldset className="cs-etape">
      <legend>
        <span className="cs-num">3</span> Vos options
      </legend>
      <p className="cs-aide">Facultatives. Les options qui dépendent d’une formule se grisent quand elles ne sont pas disponibles.</p>
      {GROUPES.map((g) => (
        <div className="cs-groupe" key={g.id}>
          <p className="cs-h">{g.titre}</p>
          {PRICING.options
            .filter((o) => o.groupe === g.id)
            .map((o) => {
              const sans = { ...sim.options }
              delete sans[o.id]
              const dispo = optionDisponible(o.id, sim.formule, sans)
              const exclu = o.exclusifAvec.find((x) => (sim.options[x] ?? 0) > 0)
              const actif = (sim.options[o.id] ?? 0) > 0
              const bloque = (!dispo.ok || !!exclu) && !actif
              const prix = [o.miseEnPlace !== null ? `${eur(o.miseEnPlace)}${o.unite === 'page' ? ' par page' : ''} de mise en place` : '', o.mensuel ? `${eur(o.mensuel)} par mois` : ''].filter(Boolean).join(' · ')
              return (
                <div className="cs-option" data-bloque={bloque ? '1' : '0'} key={o.id}>
                  <label>
                    <input
                      type="checkbox"
                      checked={actif}
                      disabled={bloque}
                      onChange={(e) =>
                        maj((s) => {
                          const opts = { ...s.options }
                          if (e.target.checked) opts[o.id] = 1
                          else delete opts[o.id]
                          return { ...s, options: opts }
                        })
                      }
                    />
                    <span className="cs-option__nom">{o.nom}</span>
                    <span className="cs-option__prix">{prix}</span>
                  </label>
                  <p className="cs-option__texte">
                    {o.description}
                    {o.condition ? ` ${o.condition}` : ''}
                    {bloque && <strong> {dispo.raison ?? (exclu ? 'Elle exclut une autre option déjà choisie.' : '')}</strong>}
                  </p>
                  {o.unite === 'page' && actif && (
                    <label className="cs-champ cs-champ--petit">
                      <span>Nombre de pages</span>
                      <input type="text" inputMode="numeric" pattern="[0-9]*" value={sim.options[o.id] ?? 1} onChange={(e) => maj((s) => ({ ...s, options: { ...s.options, [o.id]: Math.max(1, entier(e.target.value, o.quantiteMax ?? 100)) } }))} />
                    </label>
                  )}
                </div>
              )
            })}
        </div>
      ))}
    </fieldset>
  )

  const accompagnement = (
    <fieldset className="cs-etape">
      <legend>
        <span className="cs-num">4</span> L’accompagnement
      </legend>
      <p className="cs-aide">
        Votre formule comprend <strong>{res.accompagnement.incluses} h</strong> d’accompagnement ; ensuite {PRICING.heureSupplementaire.prix} € de l’heure, par tranche de {PRICING.heureSupplementaire.trancheMinutes} minutes.
      </p>
      <div className="cs-grille">
        <label className="cs-champ">
          <span>Heures d’accompagnement prévues</span>
          <input type="text" inputMode="decimal" value={sim.accompagnement.heures || ''} placeholder="0" onChange={(e) => maj((s) => ({ ...s, accompagnement: { ...s.accompagnement, heures: decimal(e.target.value) } }))} />
        </label>
        <fieldset className="cs-radios">
          <legend>Premier rendez-vous</legend>
          <label>
            <input type="radio" name="rdv" checked={sim.accompagnement.rdv === 'presentiel'} onChange={() => maj((s) => ({ ...s, accompagnement: { ...s.accompagnement, rdv: 'presentiel' } }))} /> En présentiel
          </label>
          <label>
            <input type="radio" name="rdv" checked={sim.accompagnement.rdv === 'visio'} onChange={() => maj((s) => ({ ...s, accompagnement: { ...s.accompagnement, rdv: 'visio' } }))} /> En visio
          </label>
        </fieldset>
        {sim.accompagnement.rdv === 'presentiel' && (
          <label className="cs-champ">
            <span>Distance du club à Savigné-sur-Lathan (km)</span>
            <input type="text" inputMode="numeric" pattern="[0-9]*" value={sim.accompagnement.distanceKm || ''} placeholder="0" onChange={(e) => maj((s) => ({ ...s, accompagnement: { ...s.accompagnement, distanceKm: entier(e.target.value, 2000) } }))} />
          </label>
        )}
      </div>
      <p className="cs-aide" aria-live="polite">
        {res.deplacement.message}
      </p>
      <div className="cs-groupe">
        <p className="cs-h">Un besoin particulier ?</p>
        <p className="cs-aide">Si l’un de ces besoins vous concerne, la simulation passe en devis sur mesure.</p>
        {HORS_CATALOGUE.map((h) => (
          <label className="cs-case" key={h.id}>
            <input
              type="checkbox"
              checked={sim.horsCatalogue.includes(h.id)}
              onChange={(e) => maj((s) => ({ ...s, horsCatalogue: e.target.checked ? [...s.horsCatalogue, h.id] : s.horsCatalogue.filter((x) => x !== h.id) }))}
            />{' '}
            {h.libelle.charAt(0).toUpperCase() + h.libelle.slice(1)}
          </label>
        ))}
      </div>
    </fieldset>
  )

  const paiement = (
    <fieldset className="cs-etape">
      <legend>
        <span className="cs-num">5</span> Le paiement
      </legend>
      <div className="cs-grille">
        <fieldset className="cs-radios">
          <legend>Abonnement</legend>
          <label>
            <input type="radio" name="abo" checked={sim.paiement.abonnement === 'mensuel'} onChange={() => { fin(); maj((s) => ({ ...s, paiement: { ...s.paiement, abonnement: 'mensuel' } })) }} /> Chaque mois
          </label>
          <label>
            <input type="radio" name="abo" checked={sim.paiement.abonnement === 'annuel'} onChange={() => { fin(); maj((s) => ({ ...s, paiement: { ...s.paiement, abonnement: 'annuel' } })) }} /> À l’année ({Math.round(PRICING.annualDiscount * 100)} % de moins)
          </label>
        </fieldset>
        <fieldset className="cs-radios">
          <legend>Mise en place</legend>
          <label>
            <input type="radio" name="mep" checked={sim.paiement.miseEnPlace === 'une-fois'} onChange={() => { fin(); maj((s) => ({ ...s, paiement: { ...s.paiement, miseEnPlace: 'une-fois' } })) }} /> En une fois
          </label>
          <label>
            <input type="radio" name="mep" checked={sim.paiement.miseEnPlace === 'trois-fois'} onChange={() => { fin(); maj((s) => ({ ...s, paiement: { ...s.paiement, miseEnPlace: 'trois-fois' } })) }} /> En {PRICING.miseEnPlaceEnFois} fois, sans frais
          </label>
        </fieldset>
      </div>
      <p className="cs-aide">Prélèvement automatique (mandat SEPA). Engagement d’une saison ({PRICING.engagementMois} mois), puis reconduction annuelle.</p>
    </fieldset>
  )

  // ── Résultat ──
  const inclus = [...(sim.formule !== 'logiciel' ? SITE_INCLUS : []), ...(sim.formule !== 'site' ? LOGICIEL_INCLUS : [])]
  const resultat = (
    <section className="cs-resultat" aria-labelledby="cs-res-t" id="estimation">
      <h2 id="cs-res-t" className="su-display">
        {renseigne ? `Estimation pour ${sim.club.nom || 'votre club'}` : 'Votre estimation'}
      </h2>
      {!renseigne ? (
        <p className="cs-aide">Indiquez le nombre de licenciés de la saison en cours : l’estimation s’affiche ici, et se met à jour à chaque choix.</p>
      ) : (
        <>
          {res.devis.requis && (
            <div className="cs-devis" role="note">
              <strong>Cette combinaison passe en devis sur mesure.</strong> {res.devis.raisons.join(' ')} L’estimation ci-dessous porte sur ce qui est dans le catalogue.
            </div>
          )}
          {res.avertissements.length > 0 && (
            <ul className="cs-avert">
              {res.avertissements.map((a) => (
                <li key={a}>{a}</li>
              ))}
            </ul>
          )}
          <dl className="cs-chiffres">
            <div>
              <dt>Mise en place</dt>
              <dd>
                {eur(res.miseEnPlace.total)}
                {res.miseEnPlace.echeances.length > 1 && <small> en {res.miseEnPlace.echeances.length} fois : {res.miseEnPlace.echeances.map(eur).join(' + ')}</small>}
              </dd>
            </div>
            <div>
              <dt>Abonnement</dt>
              <dd>
                {sim.paiement.abonnement === 'annuel' ? eur(res.abonnement.annuel) : eur(res.abonnement.mensuel)}
                <small>{sim.paiement.abonnement === 'annuel' ? ` par an, soit ${eurCents(res.abonnement.mensuelEquivalentAnnuel)} par mois` : ' par mois'}</small>
              </dd>
            </div>
            <div>
              <dt>Par licencié et par an</dt>
              <dd>
                {eurCents(res.coutParLicencieAn)}
                <small> d’abonnement</small>
              </dd>
            </div>
          </dl>
          <h3>Ce que vous payez les trois premiers mois</h3>
          <ol className="cs-mois">
            {res.premiersMois.map((m, i) => (
              <li key={i}>
                <span>Mois {i + 1}</span>
                <strong>{eur(m)}</strong>
              </li>
            ))}
          </ol>
          <dl className="cs-chiffres cs-chiffres--ligne">
            <div>
              <dt>Première année</dt>
              <dd>{eur(res.premiereAnnee)}</dd>
            </div>
            <div>
              <dt>Années suivantes</dt>
              <dd>
                {eur(res.anneesSuivantes)} <small>par an</small>
              </dd>
            </div>
          </dl>
          {!compact && (
            <>
              <h3>Le détail</h3>
              <ul className="cs-detail">
                {res.lignes.map((l) => (
                  <li key={l.id}>
                    <span>{l.libelle}</span>
                    <span>
                      {eur(l.miseEnPlace)} · {l.mensuel ? `${eur(l.mensuel)} par mois` : 'sans abonnement'}
                    </span>
                  </li>
                ))}
                {res.miseEnPlace.accompagnementSupp > 0 && (
                  <li>
                    <span>Accompagnement supplémentaire ({res.accompagnement.supplementaires} h)</span>
                    <span>{eur(res.miseEnPlace.accompagnementSupp)}</span>
                  </li>
                )}
              </ul>
              <details className="cs-inclus">
                <summary>Ce qui est inclus avec cette formule</summary>
                <ul>
                  {inclus.map((x) => (
                    <li key={x.titre}>
                      <strong>{x.titre}.</strong> {x.texte}
                    </li>
                  ))}
                </ul>
                <p>
                  <strong>Dans l’abonnement :</strong> {ABONNEMENT_INCLUS.join(' ')}
                </p>
              </details>
            </>
          )}
          <p className="cs-mention">{MENTION_PRIX_INDICATIFS}</p>
        </>
      )}
    </section>
  )

  const [email, setEmail] = useState('')
  const [nom, setNom] = useState('')
  const [accord, setAccord] = useState(false)
  const [pot, setPot] = useState('')
  const [etat, setEtat] = useState<'repos' | 'envoi' | 'ok' | 'ok-local' | 'erreur'>('repos')
  const [message, setMessage] = useState('')

  async function envoyer(e: React.FormEvent) {
    e.preventDefault()
    fin()
    setEtat('envoi')
    setMessage('')
    try {
      const r = await fetch('/api/clubs/estimation', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ email, nom, consentement: accord, simulation: requete, site_web: pot }) })
      const j = (await r.json()) as { ok: boolean; envoye?: boolean; erreur?: string; champs?: Record<string, string> }
      if (r.ok && j.ok) {
        setEtat(j.envoye ? 'ok' : 'ok-local')
        suivre('clubs_estimation_envoyee')
      } else {
        setEtat('erreur')
        setMessage(j.erreur ?? Object.values(j.champs ?? {})[0] ?? 'L’envoi a échoué.')
      }
    } catch {
      setEtat('erreur')
      setMessage('L’envoi a échoué. Réessayez, ou écrivez-nous directement.')
    }
  }

  async function copier() {
    fin()
    try {
      await navigator.clipboard.writeText(lien())
      setCopie(true)
      window.setTimeout(() => setCopie(false), 2500)
    } catch {
      window.prompt('Copiez ce lien :', lien())
    }
  }

  const devisHref = renseigne ? `/contact?objet=${encodeURIComponent(sim.formule === 'site' ? 'Site' : 'Outil sur mesure')}&projet=${encodeURIComponent(texteDevis(sim, res, lien()).slice(0, 2900))}&a=appel` : '/contact?a=appel'

  if (compact) {
    return (
      <div className="cs cs--compact">
        {licencies}
        {formules}
        {resultat}
        <p className="cs-actions">
          <Link className="su-action su-action--plein" href={`/clubs-de-tennis/simulateur${requete ? `?${requete}` : ''}`}>
            <span className="su-action__texte">Affiner la simulation</span>
          </Link>
          <Action href="/contact?a=appel" variante="contour">
            Réserver un appel
          </Action>
        </p>
      </div>
    )
  }

  return (
    <div className="cs">
      <div className="cs-colonnes">
        <form className="cs-form" onSubmit={(e) => e.preventDefault()} noValidate>
          {licencies}
          {formules}
          {options}
          {accompagnement}
          {paiement}
        </form>
        <aside className="cs-cote" aria-label="Estimation">
          {resultat}
          {renseigne && (
            <div className="cs-actions-col">
              <form className="cs-envoi" onSubmit={envoyer}>
                <h3>Recevoir cette estimation par e-mail</h3>
                <label className="cs-champ">
                  <span>Votre adresse e-mail</span>
                  <input type="email" autoComplete="email" required value={email} onChange={(e) => setEmail(e.target.value)} />
                </label>
                <label className="cs-champ">
                  <span>Votre nom (facultatif)</span>
                  <input type="text" autoComplete="name" maxLength={120} value={nom} onChange={(e) => setNom(e.target.value)} />
                </label>
                <input className="cs-pot" type="text" name="site_web" tabIndex={-1} autoComplete="off" aria-hidden="true" value={pot} onChange={(e) => setPot(e.target.value)} />
                <label className="cs-case">
                  <input type="checkbox" required checked={accord} onChange={(e) => setAccord(e.target.checked)} />
                  <span>
                    J’accepte que mon adresse serve à m’envoyer cette estimation et à me répondre (<Link href="/politique-confidentialite">politique de confidentialité</Link>).
                  </span>
                </label>
                <button className="su-action su-action--plein" type="submit" disabled={etat === 'envoi' || !accord || !email}>
                  <span className="su-action__texte">{etat === 'envoi' ? 'Envoi…' : 'Envoyer l’estimation'}</span>
                </button>
                <p role="status" className="cs-statut" data-etat={etat}>
                  {etat === 'ok' && 'Estimation envoyée : vérifiez votre boîte de réception (et les courriers indésirables).'}
                  {etat === 'ok-local' && 'Estimation enregistrée. L’envoi d’e-mails n’est pas activé sur cet environnement.'}
                  {etat === 'erreur' && message}
                </p>
              </form>
              <div className="cs-actions">
                <Action href={devisHref} evt="clubs_devis_demande" onClick={fin}>
                  Demander un devis
                </Action>
                <Action href={`/contact?a=appel&projet=${encodeURIComponent(texteDevis(sim, res, lien()).slice(0, 2900))}`} variante="contour" onClick={fin}>
                  Réserver un appel
                </Action>
                <Action href={DEMO.roles} variante="contour" evt="clubs_clic_demo">
                  Voir la démo
                </Action>
              </div>
              <div className="cs-actions cs-actions--discretes">
                <button type="button" className="cs-lien" onClick={copier}>
                  {copie ? 'Lien copié ✓' : 'Copier le lien de cette simulation'}
                </button>
                <button type="button" className="cs-lien" onClick={() => { fin(); window.print() }}>
                  Imprimer ou enregistrer en PDF
                </button>
              </div>
            </div>
          )}
        </aside>
      </div>
      <div className="cs-barre" aria-hidden={!renseigne}>
        {renseigne ? (
          <a href="#estimation">
            <span>
              {eur(res.miseEnPlace.total)} <small>de mise en place</small>
            </span>
            <span>
              {sim.paiement.abonnement === 'annuel' ? `${eur(res.abonnement.annuel)} par an` : `${eur(res.abonnement.mensuel)} par mois`}
            </span>
            <span className="cs-barre__voir">Voir ↓</span>
          </a>
        ) : (
          <span>Indiquez vos licenciés pour voir l’estimation</span>
        )}
      </div>
      <div className="cs-impression" hidden>
        <ul>
          {lignesResume(sim, res).map((l) => (
            <li key={l.cle}>
              <strong>{l.cle} :</strong> {l.valeur}
            </li>
          ))}
        </ul>
        <p>{LIBELLE_FORMULE[sim.formule]} — {MENTION_PRIX_INDICATIFS}</p>
      </div>
    </div>
  )
}

export { heuresIncluses }
