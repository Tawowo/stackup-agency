'use client'
/**
 * LE SIMULATEUR « CLUBS DE TENNIS » — cinq étapes (le club, la formule, les options, l'accompagnement, le paiement)
 * et un récapitulatif recalculé à chaque choix par le moteur pur (src/domain/clubs/simulation.ts), qui ne lit que
 * src/data/offre-clubs/pricing.ts. Version complète (/clubs-de-tennis/simulateur) ou compacte (grande page :
 * licenciés + formule, puis « affiner » dans le simulateur complet). L'état tient dans l'adresse (lien partageable).
 * Champs natifs habillés (ceux de l'estimateur) : clavier et lecteur d'écran sans effort.
 */
import { useEffect, useId, useMemo, useRef, useState } from 'react'
import Link from 'next/link'
import Action from '@/components/ui/Action'
import { CartesRadio, CarteCase, Compteur } from '@/experiences/estimateur/controles'
import { OPTIONS, PRICING, tarif, categorieDe, economiePack, type Formule, type OptionId } from '@/data/offre-clubs/pricing'
import { INCLUS_LOGICIEL, INCLUS_SITE } from '@/data/offre-clubs/inclus'
import { BESOINS_SUR_DEVIS, optionDisponible, simuler, type BesoinId, type EntreeSimulation } from '@/domain/clubs/simulation'
import { ecrireEtat, lireEtat, type Club } from '@/domain/clubs/etat'
import { texteRecap } from '@/domain/clubs/resume'
import { MENTIONS_CLUBS, RACINE_CLUBS } from '@/config/offre-clubs'
import { jetons } from '@/lib/jetons'
import { suivre } from '@/lib/mesure'
import { ROLES_CLUB } from '@/lib/clubs-roles'
import '@/experiences/estimateur/estimateur.css'
import './simulateur.css'

const fr = new Intl.NumberFormat('fr-FR', { minimumFractionDigits: 0, maximumFractionDigits: 2 })
const eur = (n: number) => `${fr.format(n)} €`
const NOMS: Record<Formule, string> = { site: 'Le site du club', logiciel: 'Le logiciel du bureau', pack: 'Site + logiciel' }
const DEPARTEMENTS_REGION = ['Cher', 'Eure-et-Loir', 'Indre', 'Indre-et-Loire', 'Loir-et-Cher', 'Loiret']

const GROUPES_OPTIONS: { id: 'fonctions' | 'visibilite' | 'mise-en-place'; titre: string }[] = [
  { id: 'fonctions', titre: 'Fonctions en plus' },
  { id: 'visibilite', titre: 'Visibilité' },
  { id: 'mise-en-place', titre: 'À la mise en place' },
]

type Demande = 'estimation' | 'devis' | null

export default function Simulateur({ compact = false, initial = '' }: { compact?: boolean; initial?: string }) {
  const uid = useId()
  // Niveaux de titres : la page du simulateur n'a que son h1 au-dessus ; la grande page l'insère sous un h2.
  const Titre = compact ? 'h3' : 'h2'
  // L'état de départ vient de l'adresse, lue par la page côté serveur (lien partagé par un autre membre du bureau).
  const [depart] = useState(() => lireEtat(new URLSearchParams(initial)))
  const [club, setClub] = useState<Club>(depart.club)
  const [entree, setEntree] = useState<EntreeSimulation>(depart.entree)
  const [heuresEnPlus, setHeuresEnPlus] = useState(() => Math.max(0, Math.ceil(depart.entree.heuresPrevues - categorieDe(depart.entree.licencies.courante).heures[depart.entree.formule])))
  const [demande, setDemande] = useState<Demande>(null)
  const [copie, setCopie] = useState(false)
  const commence = useRef(false)
  const termine = useRef(false)

  const categorie = categorieDe(entree.licencies.courante)
  const incluses = categorie.heures[entree.formule]
  const complete: EntreeSimulation = useMemo(() => ({ ...entree, heuresPrevues: heuresEnPlus > 0 ? incluses + heuresEnPlus : 0 }), [entree, heuresEnPlus, incluses])
  const r = useMemo(() => simuler(complete), [complete])
  const etat = useMemo(() => ecrireEtat({ club, entree: complete }), [club, complete])
  const lienComplet = `${RACINE_CLUBS}/simulateur?${etat}`

  // L'adresse suit la simulation (lien partageable), sans ajouter d'entrée à l'historique.
  useEffect(() => {
    if (compact) return
    const t = window.setTimeout(() => history.replaceState(null, '', `${location.pathname}?${etat}${location.hash}`), 250)
    return () => window.clearTimeout(t)
  }, [etat, compact])

  const toucher = () => {
    if (commence.current) return
    commence.current = true
    suivre('clubs_simulateur_commence', compact ? 'compact' : 'complet')
  }
  const terminer = (comment: string) => {
    if (termine.current) return
    termine.current = true
    suivre('clubs_simulateur_termine', comment)
  }
  const maj = (p: Partial<EntreeSimulation>) => {
    toucher()
    setEntree((e) => ({ ...e, ...p }))
  }
  const majLicencies = (k: keyof EntreeSimulation['licencies'], v: number | null) => {
    toucher()
    setEntree((e) => ({ ...e, licencies: { ...e.licencies, [k]: v } }))
  }
  const majOption = (id: OptionId, q: number) => {
    toucher()
    setEntree((e) => {
      const options = { ...e.options, [id]: q }
      if (!q) delete options[id]
      if (id === 'assistant-ia' && !q) delete options['commande-vocale']
      return { ...e, options }
    })
  }
  const majBesoin = (id: BesoinId, oui: boolean) => {
    toucher()
    setEntree((e) => ({ ...e, besoins: oui ? [...e.besoins, id] : e.besoins.filter((b) => b !== id) }))
  }

  const nombre = (v: string) => (v.trim() === '' ? null : Math.max(0, Math.min(5000, Math.floor(Number(v)))))

  const etape1 = (
    <section className="cs-etape" aria-labelledby={`${uid}-e1`}>
      <Titre id={`${uid}-e1`} className="cs-etape__titre">
        <span className="su-mono">Étape 1 sur {compact ? 2 : 5}</span> Le club
      </Titre>
      {!compact && (
        <div className="cs-champs cs-champs--3">
          <p className="cs-champ">
            <label htmlFor={`${uid}-nom`}>Nom du club</label>
            <input id={`${uid}-nom`} type="text" autoComplete="organization" value={club.nom} maxLength={80} onChange={(e) => (toucher(), setClub({ ...club, nom: e.target.value }))} />
          </p>
          <p className="cs-champ">
            <label htmlFor={`${uid}-commune`}>Commune</label>
            <input id={`${uid}-commune`} type="text" autoComplete="address-level2" value={club.commune} maxLength={80} onChange={(e) => setClub({ ...club, commune: e.target.value })} />
          </p>
          <p className="cs-champ">
            <label htmlFor={`${uid}-dep`}>Département</label>
            <input id={`${uid}-dep`} type="text" list={`${uid}-deps`} value={club.departement} maxLength={40} onChange={(e) => setClub({ ...club, departement: e.target.value })} />
            <datalist id={`${uid}-deps`}>
              {DEPARTEMENTS_REGION.map((d) => (
                <option key={d} value={d} />
              ))}
            </datalist>
          </p>
        </div>
      )}
      <div className={`cs-champs ${compact ? '' : 'cs-champs--3'}`}>
        <p className="cs-champ">
          <label htmlFor={`${uid}-l0`}>Licenciés de la saison en cours</label>
          <input id={`${uid}-l0`} type="number" inputMode="numeric" min={1} max={5000} required value={entree.licencies.courante} onChange={(e) => majLicencies('courante', nombre(e.target.value) || 1)} aria-describedby={`${uid}-l-aide`} />
        </p>
        {!compact && (
          <>
            <p className="cs-champ">
              <label htmlFor={`${uid}-l1`}>Saison précédente (facultatif)</label>
              <input id={`${uid}-l1`} type="number" inputMode="numeric" min={0} max={5000} value={entree.licencies.precedente ?? ''} onChange={(e) => majLicencies('precedente', nombre(e.target.value))} />
            </p>
            <p className="cs-champ">
              <label htmlFor={`${uid}-l2`}>Il y a deux saisons (facultatif)</label>
              <input id={`${uid}-l2`} type="number" inputMode="numeric" min={0} max={5000} value={entree.licencies.avantDerniere ?? ''} onChange={(e) => majLicencies('avantDerniere', nombre(e.target.value))} />
            </p>
          </>
        )}
      </div>
      <p id={`${uid}-l-aide`} className="su-est__aide">
        Licenciés FFT de la saison en cours, sections tennis, padel et pickleball comprises. Justificatif demandé ensuite : un export ADOC ou le rapport d’assemblée générale avec les trois dernières saisons.
      </p>
      <p className="cs-categorie" role="status">
        Catégorie <strong>{categorie.nom}</strong> ({categorie.max === null ? `${categorie.min} licenciés et plus` : `${categorie.min} à ${categorie.max} licenciés`})
        {!compact && r.moyenneLicencies !== entree.licencies.courante && <> · moyenne des saisons renseignées : {r.moyenneLicencies}</>}
      </p>
      {r.baisse && (
        <p className="su-est__astuce cs-message">
          Votre saison en cours est en dessous de la moyenne des saisons précédentes. Nous vous demanderons un justificatif, une baisse peut tout à fait être réelle : c’est bien la saison en cours qui fixe la catégorie.
        </p>
      )}
    </section>
  )

  const eco = economiePack(categorie)
  const etape2 = (
    <section className="cs-etape" aria-labelledby={`${uid}-e2`}>
      <Titre id={`${uid}-e2`} className="cs-etape__titre">
        <span className="su-mono">Étape 2 sur {compact ? 2 : 5}</span> La formule
      </Titre>
      <CartesRadio<Formule>
        nom="formule"
        legende="La formule"
        valeur={entree.formule}
        onChange={(f) => maj({ formule: f })}
        colonnes={3}
        options={(['pack', 'site', 'logiciel'] as const).map((f) => {
          const t = tarif(categorie, f)
          return {
            valeur: f,
            titre: NOMS[f],
            phrase: f === 'pack' ? `Le site et le logiciel connectés en direct. −${Math.round(PRICING.packDiscount * 100)} % : ${eur(eco.miseEnPlace)} de moins à la mise en place et ${eur(eco.mois)} de moins par mois.` : f === 'site' ? 'Le site du club, que le bureau modifie lui-même, avec l’adhésion en ligne et HelloAsso.' : 'Le logiciel du bureau : adhérents, école de tennis, Challenge, équipes, fichiers ADOC, espace membre et parent.',
            mention: `${eur(t.miseEnPlace)} puis ${eur(t.mois)}/mois`,
            conseil: f === 'pack',
          }
        })}
      />
    </section>
  )

  const etape3 = (
    <section className="cs-etape" aria-labelledby={`${uid}-e3`}>
      <Titre id={`${uid}-e3`} className="cs-etape__titre">
        <span className="su-mono">Étape 3 sur 5</span> Les options
      </Titre>
      <p className="su-est__aide">Toutes facultatives. Une option grisée demande le site, le logiciel ou une autre option : sa condition est indiquée.</p>
      {GROUPES_OPTIONS.map((g) => (
        <fieldset key={g.id} className="cs-groupe">
          <legend className="cs-groupe__titre">{g.titre}</legend>
          <div className="cs-options">
            {OPTIONS.filter((o) => o.simulateur && o.groupe === g.id).map((o) => {
              const dispo = optionDisponible(o.id, entree.formule, entree.options)
              const q = entree.options[o.id] ?? 0
              const prix = o.unite === 'page' ? `${eur(o.miseEnPlace)} par page` : `${eur(o.miseEnPlace)}${o.mois ? ` + ${eur(o.mois)}/mois` : ''}`
              if (!dispo) {
                return (
                  <div key={o.id} className="su-est__carte su-est__carte--case cs-indispo" aria-disabled="true">
                    <p className="su-est__case">
                      <span className="su-est__coche" aria-hidden="true" />
                      <span className="su-est__carte-titre">{o.nom}</span>
                      <span className="su-est__carte-phrase">{o.condition}</span>
                      <span className="su-mono su-est__mention">{prix}</span>
                    </p>
                  </div>
                )
              }
              return (
                <CarteCase key={o.id} checked={q > 0} onChange={(oui) => majOption(o.id, oui ? 1 : 0)} titre={o.nom} phrase={o.description} mention={`${prix}${o.condition && o.requiert === null ? ` · ${o.condition}` : ''}`}>
                  {o.unite === 'page' && (
                    <div className="cs-quantite">
                      <Compteur libelle="Nombre de pages" valeur={q} onChange={(n) => majOption(o.id, Math.max(1, n))} min={1} max={60} compact />
                    </div>
                  )}
                </CarteCase>
              )
            })}
          </div>
        </fieldset>
      ))}
      <fieldset className="cs-groupe">
        <legend className="cs-groupe__titre">Besoins particuliers (sur devis)</legend>
        <p className="su-est__aide">Cochez ce qui vous concerne : nous le chiffrons à part, après un échange.</p>
        <div className="cs-besoins">
          {BESOINS_SUR_DEVIS.map((b) => (
            <label key={b.id} className="cs-besoin">
              <input type="checkbox" checked={entree.besoins.includes(b.id)} onChange={(e) => majBesoin(b.id, e.target.checked)} />
              <span>{b.libelle}</span>
            </label>
          ))}
        </div>
      </fieldset>
    </section>
  )

  const etape4 = (
    <section className="cs-etape" aria-labelledby={`${uid}-e4`}>
      <Titre id={`${uid}-e4`} className="cs-etape__titre">
        <span className="su-mono">Étape 4 sur 5</span> L’accompagnement
      </Titre>
      <p className="su-est__aide">
        {fr.format(incluses)} h d’accompagnement sont incluses avec cette formule et cette catégorie (recueil des demandes, prise en main, formation). Au-delà : {eur(PRICING.heureSupplementaire)} de l’heure, par tranche de 30 minutes, en visio, par téléphone ou au club.
      </p>
      <Compteur libelle="Heures en plus des heures incluses" valeur={heuresEnPlus} onChange={(n) => (toucher(), setHeuresEnPlus(n))} min={0} max={60} maxCurseur={20} unite="h" />
      <CartesRadio<'presentiel' | 'visio'>
        nom="rdv"
        legende="Premier rendez-vous"
        valeur={entree.premierRdv}
        onChange={(v) => maj({ premierRdv: v })}
        options={[
          { valeur: 'presentiel', titre: 'Premier rendez-vous au club', phrase: `Gratuit jusqu’à ${PRICING.premierRdvGratuitKm} km de Savigné-sur-Lathan (Indre-et-Loire).` },
          { valeur: 'visio', titre: 'Premier rendez-vous en visio', phrase: 'Partout en France, sans déplacement.' },
        ]}
      />
      {entree.premierRdv === 'presentiel' && (
        <p className="cs-champ cs-champ--court">
          <label htmlFor={`${uid}-km`}>Distance entre le club et Savigné-sur-Lathan (km, facultatif)</label>
          <input id={`${uid}-km`} type="number" inputMode="numeric" min={0} max={2000} value={entree.distanceKm ?? ''} onChange={(e) => maj({ distanceKm: nombre(e.target.value) })} />
        </p>
      )}
    </section>
  )

  const etape5 = (
    <section className="cs-etape" aria-labelledby={`${uid}-e5`}>
      <Titre id={`${uid}-e5`} className="cs-etape__titre">
        <span className="su-mono">Étape 5 sur 5</span> Le paiement
      </Titre>
      <CartesRadio<'mensuel' | 'annuel'>
        nom="abo"
        legende="Abonnement"
        valeur={entree.abonnement}
        onChange={(v) => maj({ abonnement: v })}
        options={[
          { valeur: 'mensuel', titre: 'Abonnement mensuel', phrase: 'Prélèvement chaque mois (mandat SEPA).' },
          { valeur: 'annuel', titre: `Abonnement annuel : −${Math.round(PRICING.annualDiscount * 100)} %`, phrase: 'Un prélèvement par an, en début de saison.' },
        ]}
      />
      <CartesRadio<'trois-fois' | 'une-fois'>
        nom="mep"
        legende="Mise en place"
        valeur={entree.miseEnPlace}
        onChange={(v) => maj({ miseEnPlace: v })}
        options={[
          { valeur: 'trois-fois', titre: `Mise en place en ${PRICING.installments} fois`, phrase: `Sur les ${PRICING.installments} premiers mois, sans frais.` },
          { valeur: 'une-fois', titre: 'Mise en place en une fois', phrase: 'Au démarrage.' },
        ]}
      />
    </section>
  )

  const inclus = [...(entree.formule !== 'logiciel' ? INCLUS_SITE.slice(0, 5) : []), ...(entree.formule !== 'site' ? INCLUS_LOGICIEL.slice(0, 8) : [])]

  const recap = (
    <div className="cs-recap" id={compact ? undefined : 'recap'} aria-labelledby={`${uid}-recap`} role="region">
      <Titre id={`${uid}-recap`} className="cs-recap__titre">
        {club.nom ? `Estimation pour ${club.nom}` : 'Votre estimation'}
      </Titre>
      <p className="su-mono cs-recap__formule">
        {NOMS[entree.formule]} · catégorie {categorie.nom}
      </p>
      <dl className="cs-chiffres" aria-live="polite">
        <div>
          <dt>Mise en place</dt>
          <dd>
            <strong>{eur(r.miseEnPlace.total)}</strong>
            {r.miseEnPlace.echeances.length > 1 && <small>en {r.miseEnPlace.echeances.length} fois : {r.miseEnPlace.echeances.map(eur).join(' + ')}</small>}
          </dd>
        </div>
        <div>
          <dt>Abonnement</dt>
          <dd>
            {r.abonnement.annuel !== null ? (
              <>
                <strong>{eur(r.abonnement.annuel)}</strong> <span>par an</span>
                <small>soit {eur(r.abonnement.economieAnnuelle)} d’économie sur douze mois</small>
              </>
            ) : (
              <>
                <strong>{eur(r.abonnement.mensuel)}</strong> <span>par mois</span>
              </>
            )}
          </dd>
        </div>
        <div>
          <dt>Par licencié et par an</dt>
          <dd>
            <strong>≈ {eur(r.coutParLicencieAn)}</strong>
            <small>abonnement annuel pour {entree.licencies.courante} licenciés</small>
          </dd>
        </div>
      </dl>
      {!compact && (
        <>
          <table className="cs-mois">
            <caption>Ce que le club paie les 3 premiers mois</caption>
            <thead>
              <tr>
                <th scope="col">Mois</th>
                <th scope="col">Mise en place</th>
                <th scope="col">Abonnement</th>
                <th scope="col">Total</th>
              </tr>
            </thead>
            <tbody>
              {r.troisPremiersMois.map((m) => (
                <tr key={m.mois}>
                  <th scope="row">{m.mois}</th>
                  <td>{eur(m.miseEnPlace)}</td>
                  <td>{eur(m.abonnement)}</td>
                  <td>
                    <strong>{eur(m.total)}</strong>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <dl className="cs-annees">
            <div>
              <dt>Première année</dt>
              <dd>{eur(r.premiereAnnee)}</dd>
            </div>
            <div>
              <dt>Années suivantes</dt>
              <dd>{eur(r.anneesSuivantes)} par an</dd>
            </div>
          </dl>
          {r.lignes.length > 1 && (
            <details className="cs-detail">
              <summary>Le détail ligne par ligne</summary>
              <ul>
                {r.lignes.map((l) => (
                  <li key={l.libelle}>
                    <span>{l.libelle}</span>
                    <span className="su-mono">
                      {eur(l.miseEnPlace)}
                      {l.mois ? ` + ${eur(l.mois)}/mois` : ''}
                    </span>
                  </li>
                ))}
              </ul>
            </details>
          )}
          {r.surDevis.length > 0 && (
            <p className="su-est__alerte cs-message" role="status">
              <strong>Cette combinaison passe en devis sur mesure</strong> : {r.surDevis.join(' ; ')}. Le reste de l’estimation reste valable ; ces points sont chiffrés à part.
            </p>
          )}
          {r.deplacement === 'visio-ou-devis' && (
            <p className="su-est__astuce cs-message">
              Votre club est à plus de {PRICING.premierRdvGratuitKm} km : le premier rendez-vous se fait en visio, ou au club avec une indemnité de déplacement chiffrée sur devis.
            </p>
          )}
          <details className="cs-detail">
            <summary>Ce qui est inclus avec cette formule</summary>
            <ul className="cs-inclus">
              {inclus.map((x) => (
                <li key={jetons(x)}>{jetons(x)}</li>
              ))}
              <li>Hébergement, nom de domaine, sauvegardes quotidiennes, mises à jour, support (réponse sous {PRICING.supportJoursOuvres} jours ouvrés), {categorie.stockageGo} Go de stockage</li>
              <li>
                <Link href={`${RACINE_CLUBS}/tarifs#inclus`}>Tout ce qui est inclus et non inclus</Link>
              </li>
            </ul>
          </details>
        </>
      )}
      <p className="cs-mention">Estimation indicative, devis définitif après un premier échange. {MENTIONS_CLUBS.prix.split('. ')[0]}.</p>
      {compact ? (
        <p className="cs-actions">
          <Action href={lienComplet} onClick={() => terminer('affiner')}>
            Affiner : options, accompagnement, paiement
          </Action>
          <Action href={`${RACINE_CLUBS}/demo`} variante="contour">
            Voir la démo
          </Action>
        </p>
      ) : (
        <div className="cs-actions" id="devis">
          <Action onClick={() => (terminer('email'), setDemande(demande === 'estimation' ? null : 'estimation'))}>Recevoir cette estimation par e-mail</Action>
          <Action variante="contour" onClick={() => (terminer('devis'), setDemande(demande === 'devis' ? null : 'devis'))}>
            Demander un devis
          </Action>
          <p className="cs-actions__liens">
            <Link href={`/contact?a=appel&objet=Club%20de%20tennis&projet=${encodeURIComponent(texteRecap(club, complete, r).slice(0, 2500))}`} onClick={() => terminer('appel')}>
              Réserver un appel
            </Link>
            <Link href={`${RACINE_CLUBS}/demo`}>Voir la démo</Link>
            <button
              type="button"
              className="cs-lien-bouton"
              onClick={async () => {
                terminer('partage')
                try {
                  await navigator.clipboard.writeText(`${location.origin}${lienComplet}`)
                  setCopie(true)
                  window.setTimeout(() => setCopie(false), 2500)
                } catch {
                  window.prompt('Copiez ce lien :', `${location.origin}${lienComplet}`)
                }
              }}
            >
              {copie ? 'Lien copié' : 'Copier le lien de la simulation'}
            </button>
            <button
              type="button"
              className="cs-lien-bouton"
              onClick={() => {
                terminer('impression')
                document.documentElement.dataset.imprimer = 'simulation'
                window.print()
                delete document.documentElement.dataset.imprimer
              }}
            >
              Imprimer ou enregistrer en PDF
            </button>
          </p>
          <p className="sr-only" role="status">
            {copie ? 'Le lien de la simulation est copié.' : ''}
          </p>
          {demande && <FormulaireDemande type={demande} simulation={etat} recap={texteRecap(club, complete, r)} />}
        </div>
      )}
    </div>
  )

  if (compact) {
    return (
      <div className="cs cs--compact" data-moment="clubs-simulateur-compact">
        <div className="su-est__gauche cs-feuille">
          {etape1}
          {etape2}
        </div>
        <aside className="cs-cote">{recap}</aside>
      </div>
    )
  }

  return (
    <div className="cs">
      <form className="su-est__gauche cs-feuille" onSubmit={(e) => e.preventDefault()} aria-label="Simulateur de prix pour un club de tennis">
        {etape1}
        {etape2}
        {etape3}
        {etape4}
        {etape5}
      </form>
      <aside className="cs-cote">{recap}</aside>
      <a className="cs-barre" href="#recap">
        <span className="sr-only">Voir l’estimation : </span>
        <span>
          <b>{eur(r.miseEnPlace.total)}</b> mise en place
        </span>
        <span>
          <b>{r.abonnement.annuel !== null ? eur(r.abonnement.annuel) : eur(r.abonnement.mensuel)}</b> {r.abonnement.annuel !== null ? 'par an' : 'par mois'}
        </span>
        <span className="cs-barre__voir">Voir ↓</span>
      </a>
    </div>
  )
}

/** Recevoir l'estimation par e-mail, ou demander un devis (prérempli avec la simulation). */
function FormulaireDemande({ type, simulation, recap }: { type: 'estimation' | 'devis'; simulation: string; recap: string }) {
  const uid = useId()
  const debut = useRef(0)
  const [envoi, setEnvoi] = useState<'repos' | 'en-cours' | 'ok' | 'erreur'>('repos')
  const [message, setMessage] = useState('')
  const [erreurs, setErreurs] = useState<Record<string, string>>({})
  const titre = type === 'devis' ? 'Demander un devis' : 'Recevoir cette estimation par e-mail'

  useEffect(() => {
    debut.current = Date.now()
    document.getElementById(`${uid}-titre`)?.focus()
  }, [uid])

  async function envoyer(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const f = new FormData(e.currentTarget)
    const corps = {
      type,
      prenom: String(f.get('prenom') ?? ''),
      nom: String(f.get('nom') ?? ''),
      email: String(f.get('email') ?? ''),
      telephone: String(f.get('telephone') ?? ''),
      role: String(f.get('role') ?? ''),
      message: String(f.get('message') ?? ''),
      simulation,
      rgpd: f.get('rgpd') === 'on',
      site_web: String(f.get('site_web') ?? ''),
      duree: Date.now() - debut.current,
    }
    setEnvoi('en-cours')
    try {
      const rep = await fetch('/api/clubs', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify(corps) })
      const j = (await rep.json()) as { ok: boolean; envoye?: boolean; erreur?: string; champs?: Record<string, string> }
      if (j.ok) {
        setEnvoi('ok')
        setErreurs({})
        setMessage(j.envoye === false ? 'Votre demande est bien enregistrée. (L’envoi d’e-mails n’est pas actif sur cette version de prévisualisation.)' : type === 'devis' ? 'Votre demande de devis est partie. Vous recevez le récapitulatif par e-mail, et Mathéo vous recontacte personnellement.' : 'C’est envoyé : le récapitulatif arrive dans votre boîte de réception.')
        if (type === 'devis') suivre('clubs_devis')
      } else {
        setEnvoi('erreur')
        setErreurs(j.champs ?? {})
        setMessage(j.erreur ?? 'Certains champs sont à corriger.')
      }
    } catch {
      setEnvoi('erreur')
      setMessage('L’envoi n’a pas abouti. Vérifiez votre connexion, ou écrivez à contact@stackup-agency.fr.')
    }
  }

  const champ = (nom: string, libelle: string, props: React.InputHTMLAttributes<HTMLInputElement>) => (
    <p className="cs-champ">
      <label htmlFor={`${uid}-${nom}`}>{libelle}</label>
      <input id={`${uid}-${nom}`} name={nom} aria-invalid={!!erreurs[nom]} aria-describedby={erreurs[nom] ? `${uid}-${nom}-err` : undefined} {...props} />
      {erreurs[nom] && (
        <span id={`${uid}-${nom}-err`} className="cs-erreur">
          {erreurs[nom]}
        </span>
      )}
    </p>
  )

  if (envoi === 'ok') {
    return (
      <div className="cs-form cs-form--ok" role="status">
        <p>{message}</p>
      </div>
    )
  }
  return (
    <form className="cs-form" onSubmit={envoyer} noValidate aria-labelledby={`${uid}-titre`}>
      <h3 id={`${uid}-titre`} tabIndex={-1}>
        {titre}
      </h3>
      <div className="cs-champs cs-champs--2">
        {champ('prenom', 'Prénom', { type: 'text', autoComplete: 'given-name', maxLength: 80 })}
        {champ('nom', 'Nom', { type: 'text', autoComplete: 'family-name', maxLength: 80, required: true })}
        {champ('email', 'E-mail', { type: 'email', autoComplete: 'email', maxLength: 200, required: true })}
        {type === 'devis' && champ('telephone', 'Téléphone (facultatif)', { type: 'tel', autoComplete: 'tel', maxLength: 30 })}
        <p className="cs-champ">
          <label htmlFor={`${uid}-role`}>Votre rôle au club (facultatif)</label>
          <select id={`${uid}-role`} name="role" defaultValue="">
            <option value="">—</option>
            {ROLES_CLUB.map((r) => (
              <option key={r} value={r}>
                {r}
              </option>
            ))}
          </select>
        </p>
      </div>
      {type === 'devis' && (
        <p className="cs-champ">
          <label htmlFor={`${uid}-message`}>Votre message (la simulation est jointe)</label>
          <textarea id={`${uid}-message`} name="message" rows={5} maxLength={3000} defaultValue={`Bonjour,\n\nNous souhaitons recevoir un devis pour notre club.\n\n${recap}`.slice(0, 3000)} />
        </p>
      )}
      <p className="cs-pot" aria-hidden="true">
        <label>
          Ne pas remplir <input type="text" name="site_web" tabIndex={-1} autoComplete="off" />
        </label>
      </p>
      <p className="cs-rgpd">
        <input id={`${uid}-rgpd`} type="checkbox" name="rgpd" required aria-invalid={!!erreurs.rgpd} />
        <label htmlFor={`${uid}-rgpd`}>
          J’accepte que Stackup Agency garde ma demande pour y répondre et m’envoyer le récapitulatif. Rien d’autre, aucune revente. <Link href="/politique-confidentialite">Politique de confidentialité</Link>.
        </label>
      </p>
      {erreurs.rgpd && <p className="cs-erreur">{erreurs.rgpd}</p>}
      <p className="cs-form__envoi">
        <Action type="submit">{envoi === 'en-cours' ? 'Envoi…' : type === 'devis' ? 'Envoyer ma demande de devis' : 'Recevoir le récapitulatif'}</Action>
      </p>
      {message && (
        <p className="cs-erreur" role="alert">
          {message}
        </p>
      )}
    </form>
  )
}
