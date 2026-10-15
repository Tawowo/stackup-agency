'use client'
/**
 * « ESTIMEZ VOTRE PROJET » — cinq points de départ, neuf étapes qu'on peut passer,
 * un récapitulatif toujours visible. L'état vit dans l'URL (`?e=`, zod) : on partage,
 * on revient. La chaîne d'assemblage de la Fabrique se construit au fil des choix.
 * Sans JS, toutes les étapes sont présentes à la suite ; avec JS, une à la fois.
 */
import { useCallback, useEffect, useMemo, useRef, useState, useSyncExternalStore } from 'react'
import { calculer } from '@/domain/devis/calcul'
import { ETAT_VIDE, RACCOURCIS, assainir, encoder, type EtatEstimateur } from '@/domain/devis/etat'
import { euros, lignesConfig } from '@/domain/devis/resume'
import type { ConfigDevis } from '@/domain/devis/types'
import { useScene } from '@/webgl/store'
import Action from '@/components/ui/Action'
import { ETAPES } from './donnees'
import { EtapeAccueil, EtapeBoutique, EtapeContenus, EtapeFonctions, EtapeGoogle, EtapeOutil, EtapePages, EtapeProjet, EtapeSuivi } from './etapes'
import Recap from './Recap'
import { resumeEtape } from './resume-etapes'
import './estimateur.css'

const FIN = 10
const abonne = () => () => {}
const monteClient = () => true
const monteServeur = () => false

function applicable(cfg: ConfigDevis, id: number): boolean {
  if (id >= 2 && id <= 6) return cfg.accueil !== 'Aucun'
  if (id === 7) return cfg.boutique.active
  if (id === 8) return cfg.outil.actif
  return true
}

/** Projet → forme sur la chaîne : 0 page, 1 multi, 2 boutique, 3 logiciel ; modules = choix cochés. */
function pourScene(cfg: ConfigDevis) {
  const pages = Object.values(cfg.pages).reduce((a, b) => a + b, 0)
  const type = cfg.outil.actif && cfg.accueil === 'Aucun' ? 3 : cfg.boutique.active ? 2 : pages > 1 ? 1 : 0
  const choix = Object.values(cfg.options).filter((n) => n > 0).length + (cfg.portee !== 'Aucun' ? 1 : 0) + (cfg.ia !== 'Aucune' ? 1 : 0) + (cfg.abonnement.actif ? 1 : 0) + (cfg.outil.actif && cfg.accueil !== 'Aucun' ? 1 : 0)
  const n = Math.min(12, choix)
  return { type, fonctions: (1 << n) - 1 }
}

export default function Estimateur({ initial }: { initial: EtatEstimateur }) {
  const [etat, setEtat] = useState<EtatEstimateur>(initial)
  const [depart, setDepart] = useState<string | null>(null)
  const [repartir, setRepartir] = useState(() => Object.values(initial.cfg.pages).filter((n) => n > 0).length > 1)
  const [copie, setCopie] = useState(false)
  const monte = useSyncExternalStore(abonne, monteClient, monteServeur)
  const cadre = useRef<HTMLDivElement>(null)
  const racine = useRef<HTMLElement>(null)
  const [enVue, setEnVue] = useState(false)
  const titreEtape = useRef<HTMLHeadingElement>(null)
  const precedente = useRef(initial.etape)
  const { cfg, etape } = etat
  // Les étapes sans objet pour ce projet sont sautées : la progression s'adapte.
  const actives = ETAPES.filter((e) => applicable(cfg, e.id))
  const rang = actives.findIndex((e) => e.id === etape)
  const position = etape === FIN ? actives.length : rang >= 0 ? rang + 1 : 1
  const nomEtape = etape === FIN ? 'Votre estimation' : (ETAPES.find((e) => e.id === etape)?.titre ?? '')
  const nomCourt = etape === FIN ? 'Votre estimation' : (ETAPES.find((e) => e.id === etape)?.court ?? '')
  const precedentes = actives.filter((e) => e.id < etape)
  const jeton = useMemo(() => encoder(etat), [etat])

  const maj = useCallback((f: (c: ConfigDevis) => ConfigDevis) => setEtat((e) => ({ ...e, cfg: assainir(f(e.cfg)) })), [])
  const aller = useCallback((n: number) => setEtat((e) => ({ ...e, etape: Math.max(1, Math.min(FIN, n)) })), [])
  const pas = (sens: 1 | -1) => {
    let n = etape + sens
    while (n >= 1 && n < FIN && !applicable(cfg, n)) n += sens
    aller(n)
  }

  // La barre du bas (mobile) n'apparaît que pendant l'estimation.
  useEffect(() => {
    const el = racine.current
    if (!el) return
    const io = new IntersectionObserver(([en]) => setEnVue(!!en?.isIntersecting), { threshold: 0.02 })
    io.observe(el)
    return () => io.disconnect()
  }, [])

  // L'adresse suit l'estimation (partageable) sans recharger la page.
  useEffect(() => {
    const t = setTimeout(() => {
      const url = new URL(window.location.href)
      const vide = jeton === encoder(ETAT_VIDE())
      if (vide) url.searchParams.delete('e')
      else url.searchParams.set('e', jeton)
      if (url.href !== window.location.href) window.history.replaceState(window.history.state, '', url)
    }, 300)
    return () => clearTimeout(t)
  }, [jeton])

  // La chaîne d'assemblage suit les choix.
  const sc = useMemo(() => pourScene(cfg), [cfg])
  const total = calculer(cfg).total
  useEffect(() => {
    const s = useScene.getState()
    if (s.moment !== 'tarifs' || s.reduced) return
    const vide = cfg.accueil === 'Aucun' && !cfg.outil.actif && !cfg.boutique.active
    if (vide) {
      s.setParams({ aiguille: 0.1 })
      s.setLayout('cadran')
      return
    }
    s.setParams({ type: sc.type, fonctions: sc.fonctions, aiguille: Math.min(1, total / 6000) })
    s.setLayout('configurateur')
  }, [sc, cfg, total])

  // Changer d'étape : la page remonte au HAUT de l'estimateur et le focus va au titre de l'étape.
  useEffect(() => {
    if (precedente.current === etape) return
    precedente.current = etape
    const el = cadre.current
    if (el) {
      const haut = el.getBoundingClientRect().top
      window.scrollTo({ top: Math.max(0, window.scrollY + haut - 84), behavior: useScene.getState().reduced ? 'auto' : 'smooth' })
    }
    titreEtape.current?.focus({ preventScroll: true })
  }, [etape])

  const choisirDepart = (id: string) => {
    const r = RACCOURCIS.find((x) => x.id === id)!
    const e = r.etat()
    setEtat({ ...e, etape: 1 })
    setRepartir(Object.values(e.cfg.pages).filter((n) => n > 0).length > 1)
    setDepart(id)
  }
  const copier = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href.split('#')[0] + '#estimer')
      setCopie(true)
      setTimeout(() => setCopie(false), 2200)
    } catch {
      setCopie(false)
    }
  }

  const ligneResume = (e: (typeof ETAPES)[number]) => (
    <li key={e.id}>
      <button type="button" className="su-est__resume" onClick={() => aller(e.id)}>
        <span className="su-est__resume-texte">
          <b>{e.court} :</b> {resumeEtape(e.id, cfg, etat.metier)}
        </span>
        <span className="su-est__resume-modifier">Modifier</span>
      </button>
    </li>
  )
  const rendu = (n: number) => {
    switch (n) {
      case 1: return <EtapeProjet cfg={cfg} maj={maj} />
      case 2: return <EtapeAccueil cfg={cfg} maj={maj} />
      case 3: return <EtapePages cfg={cfg} maj={maj} repartir={repartir} setRepartir={setRepartir} />
      case 4: return <EtapeGoogle cfg={cfg} maj={maj} />
      case 5: return <EtapeFonctions cfg={cfg} maj={maj} />
      case 6: return <EtapeContenus cfg={cfg} maj={maj} />
      case 7: return <EtapeBoutique cfg={cfg} maj={maj} />
      case 8: return <EtapeOutil cfg={cfg} maj={maj} metier={etat.metier} setMetier={(m) => setEtat((e) => ({ ...e, metier: m }))} />
      default: return <EtapeSuivi cfg={cfg} maj={maj} />
    }
  }
  const resultat = calculer(cfg)
  const lignes = lignesConfig(cfg, etat.metier)

  return (
    <section id="estimer" ref={racine} className="su-est" data-nuit="1" aria-labelledby="su-est-titre" data-moment="tarifs-estimer">
      <div className="su-est__enveloppe">
        <div className="su-est__colonnes" ref={cadre}>
         <div className="su-est__gauche">
        <header className="su-est__tete" hidden={monte && etape !== 1}>
          <h2 id="su-est-titre" className="su-display su-est__h2">
            Estimez votre projet
          </h2>
          <p className="su-est__intro">
            Quelques questions simples, toutes facultatives. Vous voyez une fourchette de prix se préciser au fur et à mesure ; le prix exact est fixé avec vous, après la démo.
          </p>
        </header>

        <div className="su-est__departs" hidden={monte && etape !== 1}>
          <h3 className="su-est__sous-titre">Par où voulez-vous commencer ?</h3>
          <p className="su-est__aide">Un point de départ remplit tout pour vous. Vous pourrez ensuite tout modifier.</p>
          <ul className="su-est__liste-departs">
            {RACCOURCIS.map((r) => {
              const rr = calculer(r.etat().cfg)
              return (
                <li key={r.id}>
                  <button type="button" className="su-est__depart" data-actif={depart === r.id ? '1' : '0'} aria-pressed={depart === r.id} onClick={() => choisirDepart(r.id)}>
                    <span className="su-est__depart-titre">{r.titre}</span>
                    <span className="su-est__depart-phrase">{r.phrase}</span>
                    <span className="su-mono su-est__mention su-tabular">
                      {euros(rr.fourchette.bas)} – {euros(rr.fourchette.haut)}
                    </span>
                  </button>
                </li>
              )
            })}
          </ul>
          <p className="su-est__annonce" role="status" aria-live="polite">
            {depart ? `Point de départ chargé : « ${RACCOURCIS.find((r) => r.id === depart)!.titre} ». Ajustez ce que vous voulez ci-dessous.` : ''}
          </p>
        </div>

          <div className="su-est__principal">
            {monte && (
              <nav className="su-est__progres" aria-label="Progression de l’estimation">
                <p className="su-est__progres-texte" aria-live="polite">
                  <b>
                    Étape {position} sur {actives.length}
                  </b>{' '}
                  · {nomCourt}
                </p>
                <ol className="su-est__progres-barre" role="list">
                  {actives.map((e, i) => (
                    <li key={e.id} data-etat={e.id === etape ? 'en-cours' : i < position - 1 || etape === FIN ? 'fait' : 'a-venir'}>
                      <button type="button" aria-current={etape === e.id ? 'step' : undefined} onClick={() => aller(e.id)}>
                        <span className="su-est__progres-trait" aria-hidden="true" />
                        <span className="su-est__progres-nom">{e.court}</span>
                        <span className="sr-only">
                          {' '}
                          étape {i + 1} sur {actives.length}
                        </span>
                      </button>
                    </li>
                  ))}
                </ol>
              </nav>
            )}
            {monte && etape !== FIN && precedentes.length > 0 && (
              <div className="su-est__avant">
                {precedentes.length > 2 && (
                  <details>
                    <summary>{precedentes.length - 2 > 1 ? `Voir les ${precedentes.length - 2} choix précédents` : 'Voir le choix précédent'}</summary>
                    <ul>{precedentes.slice(0, -2).map(ligneResume)}</ul>
                  </details>
                )}
                <ul className="su-est__avant-recent">{precedentes.slice(-2).map(ligneResume)}</ul>
              </div>
            )}

            {ETAPES.map((e) => {
              const visible = !monte || etape === e.id
              return (
                <section key={e.id} className="su-est__etape" hidden={!visible} aria-labelledby={`su-est-e${e.id}`}>
                  <h3 id={`su-est-e${e.id}`} ref={etape === e.id ? titreEtape : undefined} tabIndex={-1} className="su-display su-est__etape-titre">
                    {e.titre}
                  </h3>
                  {rendu(e.id)}
                </section>
              )
            })}

            <section className="su-est__etape" hidden={monte && etape !== FIN} aria-labelledby="su-est-fin">
              <h3 id="su-est-fin" ref={etape === FIN ? titreEtape : undefined} tabIndex={-1} className="su-display su-est__etape-titre">
                {nomEtape}
              </h3>
              <p className="su-est__aide">
                {resultat.total > 0 && !(cfg.accueil === 'Aucun' && !cfg.outil.actif)
                  ? `Création entre ${euros(resultat.fourchette.bas)} et ${euros(resultat.fourchette.haut)}${resultat.abonnement.mensuel > 0 ? `, puis environ ${euros(resultat.abonnement.mensuel)} par mois` : ''}. Le prix exact se fixe avec vous\u00a0: un appel d’abord, puis la démo de votre page d’accueil avant de décider.`
                  : 'Choisissez au moins un projet pour voir une fourchette.'}
              </p>
              <dl className="su-est__bilan">
                {lignes.map((l) => (
                  <div key={l.cle}>
                    <dt>{l.cle}</dt>
                    <dd>{l.valeur}</dd>
                  </div>
                ))}
              </dl>
              <div className="su-est__fin-actions">
                <Action href={`/contact?e=${jeton}&a=appel`}>Réserver mon appel gratuit (30 min)</Action>
                <Action href={`/contact?e=${jeton}&a=demo`} variante="contour">
                  Demander ma démo
                </Action>
              </div>
              <p className="su-est__aide">
                <button type="button" className="su-est__lien" onClick={copier}>
                  {copie ? 'Lien copié' : 'Copier le lien de cette estimation'}
                </button>{' '}
                pour la partager ou y revenir.
              </p>
            </section>

            {monte && (
              <div className="su-est__nav">
                <button type="button" className="su-action su-action--lien" onClick={() => pas(-1)} disabled={etape === 1}>
                  Précédent
                </button>
                {etape < FIN && (
                  <>
                    {etape < FIN - 1 && (
                      <button type="button" className="su-action su-action--lien" onClick={() => pas(1)}>
                        Passer cette étape
                      </button>
                    )}
                    <button type="button" className="su-action su-action--plein su-est__suivant" onClick={() => pas(1)}>
                      <span className="su-action__texte">{etape === FIN - 1 ? 'Voir mon estimation' : 'Suivant'}</span>
                    </button>
                  </>
                )}
              </div>
            )}
            <noscript>
              <style>{'.su-est__recap{position:static!important;display:block!important}.su-est__recap-corps{display:block!important}.su-est__recap-scene{display:block!important}'}</style>
              <p className="su-est__aide">L’estimateur demande JavaScript pour calculer. Vous pouvez aussi nous écrire directement : nous établissons l’estimation avec vous.</p>
            </noscript>
          </div>
         </div>
          <Recap cfg={cfg} jeton={jeton} vue={enVue} />
        </div>
      </div>
    </section>
  )
}
