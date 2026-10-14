'use client'
/**
 * LES ÉTAPES — chacune dit à quoi elle sert en une phrase, parle comme un client,
 * et peut être passée. Les libellés, descriptions et montants viennent de l'Excel.
 */
import { useMemo, useState } from 'react'
import { LIGNES, NIVEAUX, NIVEAUX_IA, PARAMS, PORTEES, MAJORATION_UTILISATEURS } from '@/config/tarifs.generated'
import type { Ligne } from '@/config/tarifs.generated'
import { calculer } from '@/domain/devis/calcul'
import { configDe } from '@/domain/devis/config'
import { euros } from '@/domain/devis/resume'
import type { ConfigDevis } from '@/domain/devis/types'
import ApercuNiveau from './Apercus'
import { CarteCase, CartesRadio, Compteur, Partie } from './controles'
import { IA_PHRASE, METIERS, PHRASE_IA, PHRASE_PORTEE, estMultiple, groupesFonctionnalites, modulesOutil, nettoyer } from './donnees'

export type Maj = (f: (c: ConfigDevis) => ConfigDevis) => void
interface P {
  cfg: ConfigDevis
  maj: Maj
}

const ligne = (code: string) => LIGNES.find((l) => l.code === code)
const qte = (cfg: ConfigDevis, code: string) => cfg.options[code] ?? 0
const poser = (cfg: ConfigDevis, code: string, n: number): ConfigDevis => ({ ...cfg, options: { ...cfg.options, [code]: Math.max(0, n) } })
const niveauxVisibles = NIVEAUX.filter((n) => n.id !== 'Aucun')
const prixAffiche = (l: Ligne) => `${euros(l.prix * PARAMS.coefficient)}${l.unite && !/forfait|inclus/i.test(l.unite) ? ` · ${l.unite}` : ''}`

/** Une ligne du catalogue : case, et nombre si elle se prend plusieurs fois. */
export function LigneChoix({ l, cfg, maj, aideSupp }: P & { l: Ligne; aideSupp?: string }) {
  const n = qte(cfg, l.code)
  return (
    <CarteCase
      checked={n > 0}
      onChange={(v) => maj((c) => poser(c, l.code, v ? 1 : 0))}
      titre={l.libelle}
      phrase={[nettoyer(l.description), aideSupp].filter(Boolean).join(' ') || undefined}
      mention={`dès ${prixAffiche(l)}`}
    >
      {estMultiple(l) && <Compteur compact libelle={`Nombre (${l.unite})`} valeur={n} min={1} max={30} onChange={(v) => maj((c) => poser(c, l.code, v))} />}
    </CarteCase>
  )
}

const prixPlancherNiveau = (id: string) => calculer(configDe({ accueil: id })).total

// ───────── 1. Projet ─────────
export function EtapeProjet({ cfg, maj }: P) {
  return (
    <>
      <p className="su-est__aide">Vous pouvez en cocher plusieurs : un site avec sa boutique, un site et un outil pour gérer votre activité…</p>
      <div className="su-est__grille su-est__grille--3">
        <CarteCase
          checked={cfg.accueil !== 'Aucun'}
          onChange={(v) => maj((c) => (v ? { ...c, accueil: 'Classique' } : { ...c, accueil: 'Aucun', boutique: { ...c.boutique, active: false } }))}
          titre="Un site internet"
          phrase="Pour être présent, rassurer et recevoir des demandes : vitrine, services, réalisations."
        />
        <CarteCase
          checked={cfg.boutique.active}
          onChange={(v) => maj((c) => ({ ...c, accueil: v && c.accueil === 'Aucun' ? 'Classique' : c.accueil, boutique: { ...c.boutique, active: v, produits: v && c.boutique.produits === 0 ? 20 : c.boutique.produits, categories: v && c.boutique.categories === 0 ? 4 : c.boutique.categories } }))}
          titre="Une boutique en ligne"
          phrase="Vendre vos produits sur le site, avec panier et paiement par carte. Elle vient avec un site."
        />
        <CarteCase
          checked={cfg.outil.actif}
          onChange={(v) => maj((c) => ({ ...c, outil: { ...c.outil, actif: v } }))}
          titre="Un outil pour gérer mon activité"
          phrase="Clients, devis, factures, planning… dans un outil à vous, fait pour votre façon de travailler."
        />
      </div>
      {cfg.accueil === 'Aucun' && !cfg.outil.actif && <p className="su-est__alerte">Cochez au moins un projet, ou choisissez un point de départ plus haut.</p>}
    </>
  )
}

// ───────── 2. Accueil ─────────
export function EtapeAccueil({ cfg, maj }: P) {
  if (cfg.accueil === 'Aucun') return <p className="su-est__aide">Cette étape concerne le site : vous n’en avez pas choisi. Passez à la suite.</p>
  return (
    <>
      <p className="su-est__aide">C’est la première chose que voit un visiteur. Chaque carte montre ce que donne le niveau, sur une même page d’artisan. Les autres pages se choisissent à l’étape suivante.</p>
      <CartesRadio
        nom="accueil"
        legende="Allure de la page d’accueil"
        grand
        valeur={cfg.accueil}
        onChange={(v) => maj((c) => ({ ...c, accueil: v }))}
        options={niveauxVisibles.map((n) => ({
          valeur: n.id,
          titre: n.id,
          phrase: n.description,
          apercu: <ApercuNiveau niveau={n.id} />,
          mention: `Site d’une page : dès ${euros(prixPlancherNiveau(n.id))}`,
          detail: n.exemple ? `Exemple : ${n.exemple}.` : undefined,
        }))}
      />
    </>
  )
}

// ───────── 3. Pages ─────────
export function EtapePages({ cfg, maj, repartir, setRepartir }: P & { repartir: boolean; setRepartir: (b: boolean) => void }) {
  const ids = niveauxVisibles.map((n) => n.id)
  const total = ids.reduce((s, id) => s + (cfg.pages[id] ?? 0), 0)
  const niveauUnique = ids.find((id) => (cfg.pages[id] ?? 0) > 0) ?? 'Classique'
  const sansSite = cfg.accueil === 'Aucun'
  const r = useMemo(() => calculer(cfg), [cfg])
  if (sansSite) return <p className="su-est__aide">Pas de site, pas de pages : passez à la suite.</p>
  const fixer = (n: number, id = niveauUnique) => maj((c) => ({ ...c, pages: n > 0 ? { [id]: n } : {} }))
  return (
    <>
      <p className="su-est__aide">Hors page d’accueil et hors mentions légales (incluses). Exemples : Prestations, À propos, Réalisations, Contact, Tarifs…</p>
      {!repartir ? (
        <>
          <Compteur libelle="Combien d’autres pages ?" valeur={total} max={300} maxCurseur={40} onChange={(n) => fixer(n)} unite="pages" />
          <Partie titre="Quelle allure pour ces pages ?" phrase="Le même niveau pour toutes : passez en mode « répartir » pour en mélanger plusieurs.">
            <CartesRadio
              nom="pages"
              legende="Niveau des autres pages"
              valeur={niveauUnique}
              onChange={(v) => fixer(total, v)}
              disabled={total === 0}
              options={niveauxVisibles.map((n) => ({ valeur: n.id, titre: n.id, phrase: n.description, apercu: <ApercuNiveau niveau={n.id} /> }))}
            />
          </Partie>
        </>
      ) : (
        <Partie titre="Répartir les pages par niveau" phrase="Par exemple 10 pages Classique et 3 pages Signature.">
          <div className="su-est__grille su-est__grille--4">
            {niveauxVisibles.map((n) => (
              <Compteur key={n.id} compact libelle={`En ${n.id}`} aide={n.description} valeur={cfg.pages[n.id] ?? 0} max={300} onChange={(v) => maj((c) => ({ ...c, pages: { ...c.pages, [n.id]: v } }))} />
            ))}
          </div>
        </Partie>
      )}
      <label className="su-est__interrupteur">
        <input
          type="checkbox"
          checked={repartir}
          onChange={(e) => {
            setRepartir(e.target.checked)
            if (!e.target.checked) fixer(total)
          }}
        />
        <span>Répartir les pages entre plusieurs niveaux</span>
      </label>
      {total > PARAMS.pleinTarifJusqua && (
        <p className="su-est__astuce">
          Les {PARAMS.pleinTarifJusqua} premières pages sont comptées au tarif plein, ensuite chaque page coûte moins cher (le modèle est déjà fait) : en moyenne {Math.round(r.coefficientDegressivite * 100)} % du tarif sur vos {total} pages.
        </p>
      )}
      <Partie titre="Une page par ville ou par métier ?" phrase="Pour être trouvé à Tours, à Amboise, à Chinon… ou pour présenter chacun de vos métiers : une page par ville ou par métier, construite sur un même modèle (le modèle compte parmi vos pages). Ces pages coûtent peu.">
        <Compteur libelle="Pages par ville ou par métier" valeur={cfg.pagesSerie} max={2000} maxCurseur={60} onChange={(n) => maj((c) => ({ ...c, pagesSerie: n }))} unite="pages" />
      </Partie>
    </>
  )
}

// ───────── 4. Google ─────────
const TITRE_PORTEE: Record<string, string> = {
  Aucun: 'Pas pour l’instant',
  Essentiel: 'Être trouvé par votre nom',
  Local: 'Être trouvé dans votre ville',
  Régional: 'Être trouvé dans tout votre département',
  National: 'Être trouvé partout en France',
}
const TITRE_IA: Record<string, string> = { Aucune: 'Pas pour l’instant', Essentielle: 'Être compris par les IA', Avancée: 'Être cité par les IA' }

export function EtapeGoogle({ cfg, maj }: P) {
  const seo = LIGNES.filter((l) => l.famille === 'seo')
  const concernees = calculer(cfg).pagesReferencees
  if (cfg.accueil === 'Aucun') return <p className="su-est__aide">Cette étape concerne le site : passez à la suite.</p>
  return (
    <>
      <Partie titre="Jusqu’où voulez-vous être trouvé ?" phrase={`Quand quelqu’un cherche votre métier sur Google. Chaque niveau inclut le précédent. Le travail porte sur vos ${concernees} page${concernees > 1 ? 's' : ''}. Aucun positionnement ne peut être garanti : cela dépend de la concurrence, du temps et de Google.`}>
        <CartesRadio
          nom="portee"
          legende="Portée du référencement"
          valeur={cfg.portee}
          onChange={(v) => maj((c) => ({ ...c, portee: v }))}
          options={PORTEES.map((p) => ({ valeur: p.id, titre: TITRE_PORTEE[p.id] ?? p.id, phrase: p.id === 'Aucun' ? 'Le site est en ligne, sans travail de référencement.' : PHRASE_PORTEE[p.id] ?? p.objectif, detail: p.contenu || undefined }))}
          colonnes={5}
        />
      </Partie>
      <Partie titre="Être cité par les intelligences artificielles" phrase={IA_PHRASE}>
        <CartesRadio
          nom="ia"
          legende="Visibilité dans les IA"
          valeur={cfg.ia}
          onChange={(v) => maj((c) => ({ ...c, ia: v }))}
          options={NIVEAUX_IA.map((p) => ({ valeur: p.id, titre: TITRE_IA[p.id] ?? p.id, phrase: p.id === 'Aucune' ? 'Aucun travail spécifique pour les IA.' : PHRASE_IA[p.id] ?? p.objectif, detail: p.contenu || undefined }))}
        />
      </Partie>
      <details className="su-est__depliant">
        <summary>Aller plus loin : des modules de référencement à la carte</summary>
        <div className="su-est__grille su-est__grille--2">
          {seo.map((l) => (
            <LigneChoix key={l.code} l={l} cfg={cfg} maj={maj} />
          ))}
        </div>
      </details>
    </>
  )
}

// ───────── 5. Fonctionnalités et effets ─────────
const sansAccent = (s: string) => s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase()

export function EtapeFonctions({ cfg, maj }: P) {
  const [q, setQ] = useState('')
  const groupes = useMemo(() => groupesFonctionnalites(), [])
  const filtre = sansAccent(q.trim())
  const visibles = groupes
    .map((g) => ({ ...g, lignes: g.lignes.filter((l) => !(l.code === 'E01' && cfg.accueil === 'Immersif')).filter((l) => !filtre || sansAccent(`${l.libelle} ${l.description} ${g.titre}`).includes(filtre)) }))
    .filter((g) => g.lignes.length > 0)
  if (cfg.accueil === 'Aucun') return <p className="su-est__aide">Cette étape concerne le site : passez à la suite.</p>
  return (
    <>
      <p className="su-est__aide">Un simple formulaire de contact est déjà compris. Ajoutez ce qui vous sera utile — vous pouvez tout passer.</p>
      <div className="su-est__recherche">
        <label htmlFor="su-est-recherche">Chercher une fonction (« rendez-vous », « galerie », « avis »…)</label>
        <input id="su-est-recherche" type="search" value={q} onChange={(e) => setQ(e.target.value)} autoComplete="off" />
      </div>
      {visibles.length === 0 && <p className="su-est__aide">Rien ne correspond à « {q} ». Essayez un autre mot.</p>}
      {visibles.map((g) => (
        <Partie key={g.id} titre={g.titre} phrase={g.phrase}>
          <div className="su-est__grille su-est__grille--2">
            {g.lignes.map((l) => (
              <LigneChoix key={l.code} l={l} cfg={cfg} maj={maj} />
            ))}
          </div>
        </Partie>
      ))}
    </>
  )
}

// ───────── 6. Contenus ─────────
export function EtapeContenus({ cfg, maj }: P) {
  const c01 = ligne('C01')
  const c02 = ligne('C02')
  const redige = qte(cfg, 'C01') + qte(cfg, 'C02') > 0
  const pagesTotal = calculer(cfg).pagesReferencees
  const autres = LIGNES.filter((l) => l.famille === 'contenu' && !['C01', 'C02'].includes(l.code))
  if (cfg.accueil === 'Aucun') return <p className="su-est__aide">Cette étape concerne le site : passez à la suite.</p>
  return (
    <>
      <p className="su-est__aide">Qui écrit les textes de votre site ?</p>
      <CartesRadio
        nom="contenus"
        legende="Qui écrit les textes"
        valeur={redige ? 'stackup' : 'moi'}
        onChange={(v) => maj((c) => (v === 'moi' ? poser(poser(c, 'C01', 0), 'C02', 0) : poser(c, 'C01', Math.max(1, Math.min(pagesTotal, 30)))))}
        options={[
          { valeur: 'moi', titre: 'Je fournis mes textes', phrase: 'Vous nous envoyez vos textes et vos photos ; nous les mettons en page.' },
          { valeur: 'stackup', titre: 'Stackup les rédige', phrase: 'Nous écrivons vos textes à partir d’un échange avec vous.' },
        ]}
      />
      {redige && (
        <div className="su-est__grille su-est__grille--2">
          {c01 && <Compteur libelle="Pages à rédiger" aide={c01.description} valeur={qte(cfg, 'C01')} max={300} maxCurseur={40} onChange={(n) => maj((c) => poser(c, 'C01', n))} />}
          {c02 && <Compteur libelle="Articles de blog à rédiger" aide={c02.description} valeur={qte(cfg, 'C02')} max={100} maxCurseur={20} onChange={(n) => maj((c) => poser(c, 'C02', n))} />}
        </div>
      )}
      {autres.length > 0 && (
        <Partie titre="D’autres coups de main" phrase="Pour partir de ce que vous avez déjà.">
          <div className="su-est__grille su-est__grille--2">
            {autres.map((l) => (
              <LigneChoix key={l.code} l={l} cfg={cfg} maj={maj} />
            ))}
          </div>
        </Partie>
      )}
    </>
  )
}

// ───────── 7. Boutique ─────────
export function EtapeBoutique({ cfg, maj }: P) {
  const b = cfg.boutique
  const opts = LIGNES.filter((l) => l.famille === 'boutique' && !['B00', 'B01', 'B02', 'B03', 'B04'].includes(l.code))
  const imp = ligne('B02')
  if (!b.active) return <p className="su-est__aide">Vous n’avez pas choisi de boutique. Passez à la suite, ou revenez à l’étape 1 pour en ajouter une.</p>
  const maj2 = (p: Partial<ConfigDevis['boutique']>) => maj((c) => ({ ...c, boutique: { ...c.boutique, ...p } }))
  return (
    <>
      <p className="su-est__aide">{ligne('B00')?.description} Tout cela est compris dans la boutique.</p>
      <div className="su-est__grille su-est__grille--2">
        <Compteur libelle="Combien de produits ?" aide="Un produit = une fiche, même si vous en avez 200 en stock." valeur={b.produits} max={10000} maxCurseur={300} onChange={(n) => maj2({ produits: n })} unite="produits" />
        <Compteur libelle="Combien de variantes ?" aide="Une variante = une taille ou une couleur. Un t-shirt en 3 couleurs et 4 tailles = 12 variantes." valeur={b.variantes} max={50000} maxCurseur={500} onChange={(n) => maj2({ variantes: n })} unite="variantes" />
        <Compteur libelle="Combien de catégories ?" aide={`Les ${PARAMS.categoriesBoutiqueIncluses} premières sont comprises.`} valeur={b.categories} max={200} maxCurseur={30} onChange={(n) => maj2({ categories: n })} unite="catégories" />
      </div>
      {imp && (
        <CarteCase checked={b.import} onChange={(v) => maj2({ import: v })} titre="J’ai déjà la liste de mes produits" phrase={imp.description} />
      )}
      <Partie titre="Des options en plus" phrase="Uniquement si elles vous servent.">
        <div className="su-est__grille su-est__grille--2">
          {opts.map((l) => (
            <LigneChoix key={l.code} l={l} cfg={cfg} maj={maj} aideSupp={l.note && /logiciel/i.test(l.note) ? '(à confirmer au devis)' : undefined} />
          ))}
        </div>
      </Partie>
    </>
  )
}

// ───────── 8. Outil de gestion ─────────
export function EtapeOutil({ cfg, maj, metier, setMetier }: P & { metier: string; setMetier: (m: string) => void }) {
  const [tous, setTous] = useState(false)
  const groupes = useMemo(() => modulesOutil(), [])
  const options = LIGNES.filter((l) => l.famille === 'outil-option')
  const sel = METIERS.find((m) => m.id === metier)
  if (!cfg.outil.actif) return <p className="su-est__aide">Vous n’avez pas choisi d’outil. Passez à la suite, ou revenez à l’étape 1 pour en ajouter un.</p>
  const filtre = (l: Ligne) => tous || !sel || sel.modules.includes(l.code) || qte(cfg, l.code) > 0
  const majoree = MAJORATION_UTILISATEURS.filter((m) => m.taux > 0)
  return (
    <>
      <p className="su-est__aide">{ligne('O00')?.description} Le tout est compris. Ensuite, vous choisissez les modules dont vous avez besoin.</p>
      <Partie titre="Quel est votre métier ?" phrase="Nous vous montrons d’abord les modules qui servent le plus dans votre métier. Vous pouvez toujours voir tous les modules.">
        <CartesRadio
          nom="metier"
          legende="Votre métier"
          valeur={metier || '—'}
          onChange={(v) => setMetier(v === '—' ? '' : v)}
          options={[{ valeur: '—', titre: 'Autre / je ne sais pas' }, ...METIERS.map((m) => ({ valeur: m.id, titre: m.id.charAt(0).toUpperCase() + m.id.slice(1) }))]}
        />
        {sel && (
          <label className="su-est__interrupteur">
            <input type="checkbox" checked={tous} onChange={(e) => setTous(e.target.checked)} />
            <span>Voir tous les modules, pas seulement ceux de mon métier</span>
          </label>
        )}
      </Partie>
      <Compteur
        libelle="Combien de personnes utiliseront l’outil ?"
        aide={majoree.length ? `Le prix des modules augmente un peu avec le nombre d’utilisateurs : ${majoree.map((m) => `+ ${Math.round(m.taux * 100)} % dès ${m.des} personnes`).join(', ')}.` : undefined}
        valeur={cfg.outil.utilisateurs}
        min={1}
        max={500}
        maxCurseur={40}
        onChange={(n) => maj((c) => ({ ...c, outil: { ...c.outil, utilisateurs: n } }))}
        unite="personnes"
      />
      {groupes.map((g) => {
        const lignes = g.lignes.filter(filtre)
        if (!lignes.length) return null
        return (
          <Partie key={g.titre} titre={g.titre}>
            <div className="su-est__grille su-est__grille--2">
              {lignes.map((l) => (
                <LigneChoix key={l.code} l={l} cfg={cfg} maj={maj} />
              ))}
            </div>
          </Partie>
        )
      })}
      <Partie titre="Des options pour l’outil" phrase="Pour le relier à votre site, l’utiliser sur téléphone ou sans réseau…">
        <div className="su-est__grille su-est__grille--2">
          {options.map((l) => (
            <LigneChoix key={l.code} l={l} cfg={cfg} maj={maj} aideSupp={l.code === 'OP4' ? 'Le coût d’usage de l’IA est en plus : refacturé au réel, et annoncé avant.' : undefined} />
          ))}
        </div>
      </Partie>
    </>
  )
}

// ───────── 9. Suivi après la mise en ligne ─────────
const SUIVIS = [
  { id: 'Aucun', code: '', titre: 'Pas de suivi' },
  { id: 'Local', code: 'A14', titre: 'Suivi de votre ville' },
  { id: 'Régional', code: 'A15', titre: 'Suivi de votre région' },
  { id: 'National', code: 'A20', titre: 'Suivi national' },
]

export function EtapeSuivi({ cfg, maj }: P) {
  const a = cfg.abonnement
  const r = calculer(cfg)
  const maj2 = (p: Partial<ConfigDevis['abonnement']>) => maj((c) => ({ ...c, abonnement: { ...c.abonnement, ...p } }))
  const l = (code: string) => ligne(code)
  const suivi = SUIVIS.filter((s) => !s.code || l(s.code))
  return (
    <>
      <p className="su-est__aide">Facultatif. Sans engagement, préavis d’un mois, et vous gardez votre site et vos fichiers si vous arrêtez. L’abonnement se compose à la carte : vous ne payez que ce que vous choisissez.</p>
      <CarteCase
        checked={a.actif}
        onChange={(v) => maj2({ actif: v })}
        titre="Je veux être accompagné après la mise en ligne"
        phrase={a.actif ? `Hébergement, sécurité et maintenance : ${euros(r.abonnement.hebergement + r.abonnement.maintenance)} par mois, avant les options ci-dessous.` : 'Sans abonnement, vous gérez vous-même l’hébergement et le renouvellement du nom de domaine.'}
      />
      {a.actif && (
        <>
          <Partie titre="Du contenu publié pour vous" phrase="Vos réalisations et vos actualités, mises en ligne sans que vous y pensiez.">
            <div className="su-est__grille su-est__grille--2">
              <Compteur libelle="Publications courtes par mois" aide={l('A12')?.description} valeur={a.publications} max={40} maxCurseur={12} onChange={(n) => maj2({ publications: n })} />
              <Compteur libelle="Articles de blog par mois" aide={l('A13')?.description} valeur={a.articles} max={20} maxCurseur={6} onChange={(n) => maj2({ articles: n })} />
            </div>
          </Partie>
          <Partie titre="Suivre votre visibilité" phrase="Des vérifications et des améliorations mois après mois.">
            <CartesRadio
              nom="suivi"
              legende="Suivi du référencement"
              valeur={a.suivi}
              onChange={(v) => maj2({ suivi: v })}
              options={suivi.map((s) => ({ valeur: s.id, titre: s.titre, phrase: s.code ? l(s.code)?.description : 'Vous gardez la main sur le référencement.', mention: s.code ? `dès ${euros((l(s.code)?.prix ?? 0) * PARAMS.coefficient)} par mois` : undefined }))}
            />
            <div className="su-est__grille su-est__grille--2">
              {l('A21') && <CarteCase checked={a.suiviIA} onChange={(v) => maj2({ suiviIA: v })} titre="Suivre ce que disent les IA de vous" phrase={l('A21')!.description} mention={`dès ${euros(l('A21')!.prix * PARAMS.coefficient)} par mois`} />}
              {l('A16') && <CarteCase checked={a.ficheGoogle} onChange={(v) => maj2({ ficheGoogle: v })} titre="Suivre votre fiche Google" phrase={l('A16')!.description} mention={`dès ${euros(l('A16')!.prix * PARAMS.coefficient)} par mois`} />}
              {l('A17') && <CarteCase checked={a.rapport} onChange={(v) => maj2({ rapport: v })} titre="Un rapport mensuel" phrase={l('A17')!.description} mention={`dès ${euros(l('A17')!.prix * PARAMS.coefficient)} par mois`} />}
            </div>
            {l('A22') && <Compteur libelle="Liens vers votre site obtenus par mois" aide={l('A22')!.description} valeur={a.liens} max={20} onChange={(n) => maj2({ liens: n })} />}
          </Partie>
          <Partie titre="Du temps pour vos modifications" phrase={l('A18')?.description}>
            <Compteur libelle="Heures de modifications par mois" valeur={a.heuresModifs} max={40} maxCurseur={10} onChange={(n) => maj2({ heuresModifs: n })} unite="h / mois" />
          </Partie>
          {l('A19') && <CarteCase checked={a.annuel} onChange={(v) => maj2({ annuel: v })} titre="Payer à l’année" phrase={`${Math.round(l('A19')!.prix * 100)} % de moins sur l’abonnement.`} />}
        </>
      )}
    </>
  )
}

