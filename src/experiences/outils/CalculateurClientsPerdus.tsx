'use client'
/**
 * /outils/calculateur-clients-perdus — un calcul à hypothèses transparentes.
 * Six nombres saisis par le visiteur, une chaîne de multiplications écrite en
 * clair, un ordre de grandeur et une analyse de sensibilité. Tout se passe dans
 * le navigateur : rien n'est envoyé. Aucune valeur par défaut : les champs sont
 * vides, ou remplis par un exemple fictif étiqueté comme tel.
 */
import { useState } from 'react'
import Action from '@/components/ui/Action'
import Plaque from '@/components/ui/Plaque'
import './calculateur-clients-perdus.css'

type Cle = 'recherches' | 'actuelle' | 'potentielle' | 'contact' | 'client' | 'valeur'
type Valeurs = Record<Cle, string>

const VIDE: Valeurs = { recherches: '', actuelle: '', potentielle: '', contact: '', client: '', valeur: '' }
/** Exemple fictif d'un artisan : jamais une statistique, toujours étiqueté. */
const EXEMPLE: Valeurs = { recherches: '300', actuelle: '2', potentielle: '10', contact: '3', client: '30', valeur: '150' }

const CHAMPS: { cle: Cle; label: string; unite: string; aide: string; pct: boolean }[] = [
  {
    cle: 'recherches',
    label: 'Recherches par mois qui concernent votre métier dans votre zone',
    unite: 'par mois',
    aide: 'Par exemple « plombier + votre ville ». Relevez-les dans Google Keyword Planner ou, si vous avez déjà un site, devinez-les à partir des impressions de Search Console. Additionnez les formulations proches.',
    pct: false,
  },
  {
    cle: 'actuelle',
    label: 'Part de ces recherches que vous obtenez aujourd’hui',
    unite: '% des recherches',
    aide: 'Combien de ces recherches finissent par une visite chez vous. Search Console donne vos clics ; sans site, mettez 0.',
    pct: true,
  },
  {
    cle: 'potentielle',
    label: 'Part que vous pourriez raisonnablement obtenir avec un site visible',
    unite: '% des recherches',
    aide: 'C’est votre hypothèse, pas une promesse. Elle doit rester prudente : les concurrents se partagent les mêmes recherches.',
    pct: true,
  },
  {
    cle: 'contact',
    label: 'Part des visiteurs qui vous contactent',
    unite: '% des visiteurs',
    aide: 'Appels, messages, demandes de devis, rapportés au nombre de visites. Votre fiche Google et vos relevés d’appels donnent une première idée.',
    pct: true,
  },
  {
    cle: 'client',
    label: 'Part des contacts qui deviennent clients',
    unite: '% des contacts',
    aide: 'Sur dix demandes, combien aboutissent à une vente ou un chantier ? Vous le savez mieux que n’importe quelle moyenne.',
    pct: true,
  },
  {
    cle: 'valeur',
    label: 'Valeur moyenne d’un client',
    unite: 'euros',
    aide: 'Ce qu’un client vous rapporte en moyenne. Préférez la marge au chiffre d’affaires, et ajoutez les achats suivants seulement s’ils sont réguliers.',
    pct: false,
  },
]

/** Lit un nombre saisi à la française (virgule, espaces). null si vide ou invalide. */
function lire(s: string): number | null {
  const t = s.replace(/\s/g, '').replace(',', '.')
  if (t === '' || !/^\d*\.?\d+$/.test(t)) return null
  return Number(t)
}

interface Entrees {
  R: number
  a: number
  b: number
  c: number
  d: number
  V: number
}

/** La chaîne de calcul : retourne chaque étape, pour l'écrire en clair. */
function calculer({ R, a, b, c, d, V }: Entrees) {
  const actuels = R * (a / 100)
  const possibles = R * (b / 100)
  const supplementaires = Math.max(0, possibles - actuels)
  const contacts = supplementaires * (c / 100)
  const clients = contacts * (d / 100)
  return { actuels, possibles, supplementaires, contacts, clients, manque: clients * V }
}

const nb = (x: number, max = 1) => x.toLocaleString('fr-FR', { maximumFractionDigits: max })
const euros = (x: number) => `${Math.round(x).toLocaleString('fr-FR')} €`
/** Ordre de grandeur : deux chiffres significatifs. */
function arrondi(x: number): number {
  if (x <= 0) return 0
  const e = Math.pow(10, Math.floor(Math.log10(x)) - 1)
  return Math.round(x / e) * e
}

export default function CalculateurClientsPerdus() {
  const [v, setV] = useState<Valeurs>(VIDE)
  const maj = (cle: Cle) => (e: React.ChangeEvent<HTMLInputElement>) => setV((x) => ({ ...x, [cle]: e.target.value }))

  const lus = CHAMPS.map((c) => ({ ...c, n: lire(v[c.cle]), brut: v[c.cle] }))
  const invalide = (c: (typeof lus)[number]) => c.brut.trim() !== '' && (c.n === null || (c.pct && c.n > 100))
  const erreurs = lus.filter(invalide)
  const complet = lus.every((c) => c.n !== null && !invalide(c))
  const exempleActif = CHAMPS.every((c) => v[c.cle] === EXEMPLE[c.cle])

  const n = (k: Cle) => lire(v[k]) ?? 0
  const e: Entrees | null = complet ? { R: n('recherches'), a: n('actuelle'), b: n('potentielle'), c: n('contact'), d: n('client'), V: n('valeur') } : null
  const r = e ? calculer(e) : null
  const ecartNul = e ? e.b <= e.a : false

  const scenarios = e
    ? [
        { nom: 'Vos hypothèses telles quelles', val: calculer(e).manque },
        { nom: 'Part atteignable divisée par deux', val: calculer({ ...e, b: e.b / 2 }).manque },
        { nom: 'Part de visiteurs qui vous contactent divisée par deux', val: calculer({ ...e, c: e.c / 2 }).manque },
        { nom: 'Part de contacts qui deviennent clients divisée par deux', val: calculer({ ...e, d: e.d / 2 }).manque },
        { nom: 'Ces trois parts divisées par deux à la fois', val: calculer({ ...e, b: e.b / 2, c: e.c / 2, d: e.d / 2 }).manque },
      ]
    : []

  return (
    <div className="su-ccp">
      <Plaque as="form" variante="encre" className="su-ccp__form" onSubmit={(ev: React.FormEvent) => ev.preventDefault()} aria-label="Vos hypothèses" noValidate>
        <div className="su-ccp__entete">
          <h2 className="su-display su-ccp__h2">Vos six hypothèses</h2>
          <div className="su-ccp__actions">
            <Action variante="contour" onClick={() => setV(EXEMPLE)}>
              Voir un exemple
            </Action>
            <Action variante="lien" onClick={() => setV(VIDE)}>
              Tout effacer
            </Action>
          </div>
        </div>
        <p className="su-ccp__note" id="su-ccp-note">
          Aucune valeur n’est proposée par défaut : ce sont vos chiffres, pas des statistiques. Le calcul se fait dans votre navigateur, rien n’est envoyé ni conservé.
        </p>
        {exempleActif && (
          <p className="su-mono su-ccp__exemple" role="status">
            Exemple fictif d’un artisan : remplacez chaque valeur par la vôtre.
          </p>
        )}
        <div className="su-ccp__champs">
          {lus.map((c, i) => {
            const id = `su-ccp-${c.cle}`
            const mauvais = invalide(c)
            return (
              <div key={c.cle} className="su-ccp__champ">
                <label htmlFor={id} className="su-ccp__label">
                  <span className="su-mono su-ccp__num">0{i + 1}</span> {c.label}
                </label>
                <div className="su-ccp__saisie">
                  <input
                    id={id}
                    name={c.cle}
                    type="text"
                    inputMode="decimal"
                    autoComplete="off"
                    spellCheck={false}
                    value={c.brut}
                    onChange={maj(c.cle)}
                    className="su-ccp__input"
                    aria-describedby={`${id}-aide${mauvais ? ` ${id}-err` : ''}`}
                    aria-invalid={mauvais || undefined}
                  />
                  <span className="su-mono su-ccp__unite">{c.unite}</span>
                </div>
                <p id={`${id}-aide`} className="su-ccp__aide">
                  {c.aide}
                </p>
                {mauvais && (
                  <p id={`${id}-err`} className="su-ccp__err">
                    {c.pct ? 'Saisissez un nombre entre 0 et 100.' : 'Saisissez un nombre positif, par exemple 150 ou 12,5.'}
                  </p>
                )}
              </div>
            )
          })}
        </div>
      </Plaque>

      <div className="su-ccp__etat" role="status" aria-live="polite" aria-atomic="true">
        {!r && erreurs.length === 0 && <p className="su-ccp__attente">Renseignez les six champs (ou cliquez sur « Voir un exemple ») : le détail du calcul et l’ordre de grandeur apparaissent ici.</p>}
        {!r && erreurs.length > 0 && <p className="su-ccp__attente">Corrigez les champs signalés : le calcul reprendra aussitôt.</p>}
        {r && ecartNul && <p className="su-ccp__attente">Votre part atteignable n’est pas supérieure à votre part actuelle : l’écart est nul, donc aucun manque à gagner dans cette hypothèse.</p>}
        {r && !ecartNul && (
          <p className="su-ccp__phrase">
            Ordre de grandeur : environ <strong>{euros(arrondi(r.manque))}</strong> de manque à gagner potentiel par mois, soit environ {nb(r.clients, 1)} client{r.clients >= 2 ? 's' : ''} par mois que vos hypothèses ne vous font pas encore obtenir.
          </p>
        )}
      </div>

      {r && e && (
        <section className="su-ccp__resultats" aria-labelledby="su-ccp-detail">
          <h2 id="su-ccp-detail" className="su-display su-ccp__h2">
            Le calcul, étape par étape
          </h2>
          <ol className="su-ccp__etapes">
            <li>
              <span className="su-ccp__etape">Visiteurs obtenus aujourd’hui</span>
              <span className="su-mono su-ccp__formule">
                {nb(e.R)} × {nb(e.a)} % = {nb(r.actuels)} par mois
              </span>
            </li>
            <li>
              <span className="su-ccp__etape">Visiteurs avec un site visible</span>
              <span className="su-mono su-ccp__formule">
                {nb(e.R)} × {nb(e.b)} % = {nb(r.possibles)} par mois
              </span>
            </li>
            <li>
              <span className="su-ccp__etape">Visiteurs supplémentaires</span>
              <span className="su-mono su-ccp__formule">
                {nb(r.possibles)} − {nb(r.actuels)} = {nb(r.supplementaires)} par mois
              </span>
            </li>
            <li>
              <span className="su-ccp__etape">Contacts supplémentaires</span>
              <span className="su-mono su-ccp__formule">
                {nb(r.supplementaires)} × {nb(e.c)} % = {nb(r.contacts, 2)} par mois
              </span>
            </li>
            <li>
              <span className="su-ccp__etape">Clients supplémentaires</span>
              <span className="su-mono su-ccp__formule">
                {nb(r.contacts, 2)} × {nb(e.d)} % = {nb(r.clients, 2)} par mois
              </span>
            </li>
            <li>
              <span className="su-ccp__etape">Manque à gagner potentiel</span>
              <span className="su-mono su-ccp__formule">
                {nb(r.clients, 2)} × {euros(e.V)} = {euros(r.manque)} par mois
              </span>
            </li>
          </ol>

          <h2 className="su-display su-ccp__h2">Et si vos hypothèses étaient deux fois trop optimistes ?</h2>
          <div className="su-ccp__tableau" role="region" aria-label="Analyse de sensibilité" tabIndex={0}>
            <table>
              <caption className="sr-only">Résultat mensuel selon l’hypothèse modifiée</caption>
              <thead>
                <tr>
                  <th scope="col">Hypothèse modifiée</th>
                  <th scope="col">Manque à gagner par mois</th>
                </tr>
              </thead>
              <tbody>
                {scenarios.map((s) => (
                  <tr key={s.nom}>
                    <th scope="row">{s.nom}</th>
                    <td className="su-mono">{euros(s.val)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="su-ccp__lecture">
            Le résultat est une multiplication : diviser un taux par deux divise le résultat par deux, et réduire la part atteignable pèse encore plus, parce qu’elle se soustrait à votre part actuelle. Les trois ensemble le divisent par huit ou davantage. Un tel écart est normal : c’est la raison pour laquelle ce chiffre est un ordre de grandeur et non une prévision.
          </p>
        </section>
      )}

      <Plaque variante="encre" className="su-ccp__honnete">
        <p>
          Ce n’est pas une prévision. Le résultat dépend uniquement des hypothèses que vous avez saisies : si elles sont trop généreuses, il l’est aussi. Aucun site ne garantit un nombre de visiteurs, de contacts ou de clients.
        </p>
        <div className="su-ccp__suite">
          <Action href="/outils/audit-site">Mesurer mon site actuel</Action>
          <Action href="/contact" variante="contour">
            En parler ensemble
          </Action>
        </div>
      </Plaque>
    </div>
  )
}
