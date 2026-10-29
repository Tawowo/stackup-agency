'use client'
/**
 * /outils/modele-devis — LE MODÈLE DE DEVIS. Le visiteur remplit des champs, les
 * totaux (HT, TVA, TTC, acompte) se calculent en direct, exacts au centime, et
 * l'aperçu de devis se met à jour. Impression / PDF : seule la feuille sort
 * (@media print). Tout reste dans le navigateur : rien n'est envoyé, rien n'est
 * enregistré. Aucun montant par défaut : les exemples sont des indications grisées.
 */
import { useEffect, useMemo, useRef, useState } from 'react'
import Action from '@/components/ui/Action'
import Plaque from '@/components/ui/Plaque'
import './modele-devis.css'

/* ───────────── Calcul exact : tout en entiers (centimes, millièmes, centièmes de %) ───────────── */

/** « 12,5 » → 1250 (décimales = 2) ; ignore tout caractère non numérique, tronque l'excédent de décimales. */
function lire(brut: string, decimales: number): bigint {
  const s = brut.replace(/\s/g, '').replace(',', '.').replace(/[^0-9.]/g, '')
  const [entier = '', ...reste] = s.split('.')
  const frac = reste.join('').slice(0, decimales).padEnd(decimales, '0')
  return BigInt(`${entier.slice(0, 9) || '0'}${frac}`)
}
/** Division entière arrondie à la moitié supérieure (valeurs positives). */
const arrondi = (n: bigint, d: bigint) => (n + d / 2n) / d

/** Répartit `total` au prorata de `poids` sans perdre un centime (plus forts restes). */
function repartir(total: bigint, poids: bigint[]): bigint[] {
  const somme = poids.reduce((a, b) => a + b, 0n)
  if (somme === 0n || total === 0n) return poids.map(() => 0n)
  const parts = poids.map((p) => (p * total) / somme)
  const restes = poids.map((p, i) => ({ i, r: (p * total) % somme }))
  let manque = total - parts.reduce((a, b) => a + b, 0n)
  restes.sort((a, b) => (a.r === b.r ? a.i - b.i : a.r > b.r ? -1 : 1))
  for (const { i } of restes) {
    if (manque <= 0n) break
    parts[i]! += 1n
    manque -= 1n
  }
  return parts
}

interface Ligne {
  id: number
  designation: string
  qte: string
  unite: string
  prix: string
  tva: string
}
interface Saisie {
  nomEntreprise: string
  adresse: string
  siret: string
  contact: string
  tvaMode: 'applicable' | 'franchise'
  client: string
  adresseClient: string
  objet: string
  numero: string
  date: string
  lignes: Ligne[]
  remiseType: 'aucune' | 'pourcent' | 'montant'
  remiseValeur: string
  acompte: string
  validite: string
  conditions: string
  avantTravaux: boolean
}
interface BaseTaux {
  tauxBp: bigint
  base: bigint
  remise: bigint
  net: bigint
  tva: bigint
}
interface Calcul {
  lignes: { id: number; ht: bigint }[]
  brut: bigint
  remise: bigint
  ht: bigint
  taux: BaseTaux[]
  tva: bigint
  ttc: bigint
  acompte: bigint
  reste: bigint
}

function calculer(s: Saisie): Calcul {
  const franchise = s.tvaMode === 'franchise'
  // quantité (millièmes) × prix (dix-millièmes d'euro) : 10^7 par euro, donc ÷ 10^5 pour des centimes
  const ligneHt = s.lignes.map((l) => ({ id: l.id, ht: arrondi(lire(l.qte, 3) * lire(l.prix, 4), 100000n) }))
  const brut = ligneHt.reduce((a, l) => a + l.ht, 0n)

  // Bases par taux de TVA
  const parTaux = new Map<bigint, bigint>()
  s.lignes.forEach((l, i) => {
    const t = franchise ? 0n : lire(l.tva, 2)
    parTaux.set(t, (parTaux.get(t) ?? 0n) + ligneHt[i]!.ht)
  })
  const cles = [...parTaux.keys()].sort((a, b) => (a > b ? -1 : a < b ? 1 : 0))

  // Remise globale HT, répartie sur les taux au prorata (la TVA se calcule sur le net)
  let remise = 0n
  if (s.remiseType === 'pourcent') remise = arrondi(brut * (lire(s.remiseValeur, 2) > 10000n ? 10000n : lire(s.remiseValeur, 2)), 10000n)
  if (s.remiseType === 'montant') remise = lire(s.remiseValeur, 2)
  if (remise > brut) remise = brut
  const remisesParTaux = repartir(remise, cles.map((t) => parTaux.get(t)!))

  const taux: BaseTaux[] = cles.map((t, i) => {
    const base = parTaux.get(t)!
    const net = base - remisesParTaux[i]!
    return { tauxBp: t, base, remise: remisesParTaux[i]!, net, tva: arrondi(net * t, 10000n) }
  })
  const ht = brut - remise
  const tva = franchise ? 0n : taux.reduce((a, t) => a + t.tva, 0n)
  const ttc = ht + tva
  let pct = lire(s.acompte, 2)
  if (pct > 10000n) pct = 10000n
  const acompte = arrondi(ttc * pct, 10000n)
  return { lignes: ligneHt, brut, remise, ht, taux: taux.filter((t) => t.base !== 0n || cles.length === 1), tva, ttc, acompte, reste: ttc - acompte }
}

/* ───────────── Affichage ───────────── */

const euro = new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' })
const argent = (c: bigint) => euro.format(Number(c) / 100)
const nombre = new Intl.NumberFormat('fr-FR', { maximumFractionDigits: 4 })
const pourcent = (bp: bigint) => `${nombre.format(Number(bp) / 100)} %`
const normaliser = (t: string) => t.replace(/[  ]/g, ' ')
const dateFr = (iso: string) => (/^\d{4}-\d{2}-\d{2}$/.test(iso) ? iso.split('-').reverse().join('/') : '')
const rempli = (l: Ligne) => l.designation.trim() !== '' || l.prix.trim() !== ''

const TAUX = [
  { v: '20', l: '20 %' },
  { v: '10', l: '10 %' },
  { v: '5.5', l: '5,5 %' },
  { v: '2.1', l: '2,1 %' },
  { v: '0', l: '0 %' },
]
const MENTION_FRANCHISE = 'TVA non applicable, art. 293 B du CGI'
const MENTION_AVANT = 'Devis reçu avant l’exécution des travaux.'

let compteur = 1
const nouvelleLigne = (): Ligne => ({ id: compteur++, designation: '', qte: '1', unite: '', prix: '', tva: '20' })

const INITIAL: Saisie = {
  nomEntreprise: '',
  adresse: '',
  siret: '',
  contact: '',
  tvaMode: 'applicable',
  client: '',
  adresseClient: '',
  objet: '',
  numero: '',
  date: '',
  lignes: [{ id: 0, designation: '', qte: '1', unite: '', prix: '', tva: '20' }],
  remiseType: 'aucune',
  remiseValeur: '',
  acompte: '',
  validite: '',
  conditions: '',
  avantTravaux: true,
}

/** Une valeur ou, à défaut, un blanc « à compléter » (grisé à l'écran, vide à l'impression). */
function Val({ v }: { v: string }) {
  return v.trim() ? <>{v}</> : <span className="su-mdv__vide">à compléter</span>
}
/** Retours à la ligne conservés sans innerHTML. */
function Lignes({ t }: { t: string }) {
  const l = t.split('\n')
  return (
    <>
      {l.map((x, i) => (
        <span key={i}>
          {i > 0 && <br />}
          {x}
        </span>
      ))}
    </>
  )
}

function texteDevis(s: Saisie, c: Calcul): string {
  const franchise = s.tvaMode === 'franchise'
  const o: string[] = []
  o.push(`DEVIS${s.numero.trim() ? ` n° ${s.numero.trim()}` : ''}${dateFr(s.date) ? ` — ${dateFr(s.date)}` : ''}`, '')
  o.push('ÉMETTEUR', s.nomEntreprise.trim() || '[nom de l’entreprise]')
  if (s.adresse.trim()) o.push(s.adresse.trim())
  o.push(`SIRET : ${s.siret.trim() || '[à compléter]'}`)
  if (s.contact.trim()) o.push(s.contact.trim())
  o.push('', 'CLIENT', s.client.trim() || '[nom du client]')
  if (s.adresseClient.trim()) o.push(s.adresseClient.trim())
  o.push('', `OBJET : ${s.objet.trim() || '[à compléter]'}`, '', 'PRESTATIONS')
  s.lignes.forEach((l, i) => {
    if (!rempli(l)) return
    const qte = l.qte.trim() ? `${l.qte.trim()}${l.unite.trim() ? ` ${l.unite.trim()}` : ''}` : ''
    o.push(`- ${l.designation.trim() || '[désignation]'}${qte ? ` — ${qte}` : ''} × ${l.prix.trim() ? argent(lire(l.prix, 2)) : '[prix]'} HT${franchise ? '' : ` (TVA ${pourcent(lire(l.tva, 2))})`} = ${argent(c.lignes[i]!.ht)} HT`)
  })
  o.push('')
  if (c.remise > 0n) o.push(`Total HT avant remise : ${argent(c.brut)}`, `Remise : −${argent(c.remise)}`)
  o.push(`Total HT : ${argent(c.ht)}`)
  if (franchise) o.push(MENTION_FRANCHISE)
  else {
    c.taux.forEach((t) => o.push(`TVA ${pourcent(t.tauxBp)} sur ${argent(t.net)} : ${argent(t.tva)}`))
    o.push(`Total TVA : ${argent(c.tva)}`)
  }
  o.push(`Total TTC : ${argent(c.ttc)}`)
  if (lire(s.acompte, 2) > 0n) o.push(`Acompte demandé (${pourcent(lire(s.acompte, 2) > 10000n ? 10000n : lire(s.acompte, 2))}) : ${argent(c.acompte)}`, `Reste à payer : ${argent(c.reste)}`)
  o.push('', `Validité : ${s.validite.trim() ? `${s.validite.trim()} jours à compter de la date du devis` : '[à préciser]'}`)
  o.push(`Conditions de paiement : ${s.conditions.trim() || '[à préciser]'}`)
  if (s.avantTravaux) o.push(MENTION_AVANT)
  o.push('', 'Bon pour accord, date et signature du client :')
  return normaliser(o.join('\n'))
}

function Champ({ id, label, children, className = '' }: { id: string; label: string; children: React.ReactNode; className?: string }) {
  return (
    <div className={`su-mdv__champ ${className}`}>
      <label htmlFor={id}>{label}</label>
      {children}
    </div>
  )
}

export default function ModeleDevis() {
  const [s, setS] = useState<Saisie>(INITIAL)
  const [message, setMessage] = useState('')
  const dernier = useRef<number | null>(null)
  const c = useMemo(() => calculer(s), [s])
  const nb = s.lignes.length
  useEffect(() => {
    if (dernier.current === null) return
    document.getElementById(`mdv-d-${dernier.current}`)?.focus()
    dernier.current = null
  }, [nb])
  const franchise = s.tvaMode === 'franchise'

  const champ = <K extends keyof Saisie>(k: K) => ({
    value: s[k] as string,
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => setS((p) => ({ ...p, [k]: e.target.value })),
  })
  const modifier = (id: number, k: keyof Ligne, v: string) => setS((p) => ({ ...p, lignes: p.lignes.map((l) => (l.id === id ? { ...l, [k]: v } : l)) }))
  const ajouter = () => {
    const l = nouvelleLigne()
    dernier.current = l.id
    setS((p) => ({ ...p, lignes: [...p.lignes, l] }))
  }
  const supprimer = (id: number) => setS((p) => ({ ...p, lignes: p.lignes.length > 1 ? p.lignes.filter((l) => l.id !== id) : p.lignes }))

  const copier = async () => {
    try {
      await navigator.clipboard.writeText(texteDevis(s, c))
      setMessage('Texte copié dans le presse-papiers.')
    } catch {
      setMessage('Copie impossible depuis ce navigateur : sélectionnez le texte de l’aperçu et copiez-le.')
    }
  }

  const acompteBp = (() => {
    const a = lire(s.acompte, 2)
    return a > 10000n ? 10000n : a
  })()
  const lignesApercu = s.lignes.map((l, i) => ({ l, ht: c.lignes[i]!.ht })).filter((x) => rempli(x.l))

  return (
    <div className="su-mdv">
      <p className="su-mdv__promesse">
        <strong>Tout se passe dans votre navigateur.</strong> Aucune donnée n’est envoyée, ni enregistrée : si vous fermez la page, la saisie disparaît. Pensez à imprimer ou à copier avant de partir.
      </p>

      <form className="su-mdv__saisie" onSubmit={(e) => e.preventDefault()} aria-label="Saisie du devis" autoComplete="off">
        <fieldset className="su-mdv__groupe">
          <legend className="su-display">Votre entreprise</legend>
          <div className="su-mdv__grille">
            <Champ id="mdv-nom" label="Nom ou raison sociale">
              <input id="mdv-nom" type="text" maxLength={120} placeholder="Exemple : Dupont Plomberie" {...champ('nomEntreprise')} />
            </Champ>
            <Champ id="mdv-siret" label="SIRET">
              <input id="mdv-siret" type="text" inputMode="numeric" maxLength={20} placeholder="14 chiffres" {...champ('siret')} />
            </Champ>
            <Champ id="mdv-adresse" label="Adresse" className="su-mdv__champ--large">
              <textarea id="mdv-adresse" rows={2} maxLength={300} placeholder="Rue, code postal, commune" {...champ('adresse')} />
            </Champ>
            <Champ id="mdv-contact" label="Contact (téléphone, e-mail)" className="su-mdv__champ--large">
              <input id="mdv-contact" type="text" maxLength={160} placeholder="Téléphone et e-mail" {...champ('contact')} />
            </Champ>
          </div>
          <fieldset className="su-mdv__radios">
            <legend>Mention de TVA</legend>
            <label>
              <input type="radio" name="mdv-tva" checked={s.tvaMode === 'applicable'} onChange={() => setS((p) => ({ ...p, tvaMode: 'applicable' }))} />
              TVA applicable, avec un taux par ligne
            </label>
            <label>
              <input type="radio" name="mdv-tva" checked={s.tvaMode === 'franchise'} onChange={() => setS((p) => ({ ...p, tvaMode: 'franchise' }))} />
              « {MENTION_FRANCHISE} »
            </label>
          </fieldset>
        </fieldset>

        <fieldset className="su-mdv__groupe">
          <legend className="su-display">Le client et le devis</legend>
          <div className="su-mdv__grille">
            <Champ id="mdv-client" label="Nom du client">
              <input id="mdv-client" type="text" maxLength={120} {...champ('client')} />
            </Champ>
            <Champ id="mdv-adresse-client" label="Adresse du client">
              <textarea id="mdv-adresse-client" rows={2} maxLength={300} {...champ('adresseClient')} />
            </Champ>
            <Champ id="mdv-numero" label="Numéro du devis">
              <input id="mdv-numero" type="text" maxLength={40} placeholder="Exemple : D-001" {...champ('numero')} />
            </Champ>
            <Champ id="mdv-date" label="Date du devis">
              <input id="mdv-date" type="date" {...champ('date')} />
            </Champ>
            <Champ id="mdv-objet" label="Objet du devis" className="su-mdv__champ--large">
              <input id="mdv-objet" type="text" maxLength={200} placeholder="Exemple : remplacement d’un chauffe-eau" {...champ('objet')} />
            </Champ>
          </div>
        </fieldset>

        <fieldset className="su-mdv__groupe">
          <legend className="su-display">Les lignes</legend>
          <ol className="su-mdv__lignes">
            {s.lignes.map((l, i) => (
              <li key={l.id}>
                <fieldset className="su-mdv__ligne">
                  <legend className="su-mono">Ligne {i + 1}</legend>
                  <Champ id={`mdv-d-${l.id}`} label="Désignation" className="su-mdv__l-des">
                    <input id={`mdv-d-${l.id}`} type="text" maxLength={200} placeholder="Exemple : main-d’œuvre" value={l.designation} onChange={(e) => modifier(l.id, 'designation', e.target.value)} />
                  </Champ>
                  <Champ id={`mdv-q-${l.id}`} label="Quantité">
                    <input id={`mdv-q-${l.id}`} type="text" inputMode="decimal" maxLength={9} value={l.qte} onChange={(e) => modifier(l.id, 'qte', e.target.value)} />
                  </Champ>
                  <Champ id={`mdv-u-${l.id}`} label="Unité">
                    <input id={`mdv-u-${l.id}`} type="text" list="mdv-unites" maxLength={20} placeholder="h, m², forfait…" value={l.unite} onChange={(e) => modifier(l.id, 'unite', e.target.value)} />
                  </Champ>
                  <Champ id={`mdv-p-${l.id}`} label="Prix unitaire HT (€)">
                    <input id={`mdv-p-${l.id}`} type="text" inputMode="decimal" maxLength={11} placeholder="0,00" value={l.prix} onChange={(e) => modifier(l.id, 'prix', e.target.value)} />
                  </Champ>
                  {!franchise && (
                    <Champ id={`mdv-t-${l.id}`} label="Taux de TVA">
                      <select id={`mdv-t-${l.id}`} value={l.tva} onChange={(e) => modifier(l.id, 'tva', e.target.value)}>
                        {TAUX.map((t) => (
                          <option key={t.v} value={t.v}>
                            {t.l}
                          </option>
                        ))}
                      </select>
                    </Champ>
                  )}
                  <p className="su-mono su-mdv__l-total">
                    Total HT de la ligne : <strong>{argent(c.lignes[i]!.ht)}</strong>
                  </p>
                  <button type="button" className="su-mdv__retirer" onClick={() => supprimer(l.id)} disabled={s.lignes.length < 2}>
                    Supprimer<span className="sr-only"> la ligne {i + 1}</span>
                  </button>
                </fieldset>
              </li>
            ))}
          </ol>
          <datalist id="mdv-unites">
            <option value="h" />
            <option value="jour" />
            <option value="m²" />
            <option value="ml" />
            <option value="pièce" />
            <option value="forfait" />
          </datalist>
          <Action variante="contour" onClick={ajouter}>
            Ajouter une ligne
          </Action>
        </fieldset>

        <fieldset className="su-mdv__groupe">
          <legend className="su-display">Remise, acompte, conditions</legend>
          <div className="su-mdv__grille">
            <Champ id="mdv-remise-type" label="Remise éventuelle">
              <select id="mdv-remise-type" value={s.remiseType} onChange={(e) => setS((p) => ({ ...p, remiseType: e.target.value as Saisie['remiseType'] }))}>
                <option value="aucune">Aucune remise</option>
                <option value="pourcent">En pourcentage du total HT</option>
                <option value="montant">En montant HT (€)</option>
              </select>
            </Champ>
            {s.remiseType !== 'aucune' && (
              <Champ id="mdv-remise" label={s.remiseType === 'pourcent' ? 'Remise (%)' : 'Remise (€ HT)'}>
                <input id="mdv-remise" type="text" inputMode="decimal" maxLength={11} {...champ('remiseValeur')} />
              </Champ>
            )}
            <Champ id="mdv-acompte" label="Acompte demandé (% du total TTC)">
              <input id="mdv-acompte" type="text" inputMode="decimal" maxLength={6} placeholder="Laisser vide si aucun" {...champ('acompte')} />
            </Champ>
            <Champ id="mdv-validite" label="Durée de validité du devis (en jours)">
              <input id="mdv-validite" type="text" inputMode="numeric" maxLength={4} placeholder="À vous de la fixer" {...champ('validite')} />
            </Champ>
            <Champ id="mdv-conditions" label="Conditions de paiement" className="su-mdv__champ--large">
              <textarea id="mdv-conditions" rows={3} maxLength={600} placeholder="Exemple : solde à réception de la facture, par virement ou chèque." {...champ('conditions')} />
            </Champ>
          </div>
          <label className="su-mdv__case">
            <input type="checkbox" checked={s.avantTravaux} onChange={(e) => setS((p) => ({ ...p, avantTravaux: e.target.checked }))} />
            Ajouter la mention « {MENTION_AVANT.replace(/\.$/, '')} »
          </label>
        </fieldset>
      </form>

      <section className="su-mdv__totaux" aria-labelledby="mdv-totaux">
        <h2 id="mdv-totaux" className="su-display">
          Les totaux, en direct
        </h2>
        <dl>
          {c.remise > 0n && (
            <>
              <div>
                <dt>Total HT avant remise</dt>
                <dd>{argent(c.brut)}</dd>
              </div>
              <div>
                <dt>Remise</dt>
                <dd>−{argent(c.remise)}</dd>
              </div>
            </>
          )}
          <div>
            <dt>Total HT</dt>
            <dd>{argent(c.ht)}</dd>
          </div>
          <div>
            <dt>{franchise ? 'TVA' : 'Total TVA'}</dt>
            <dd>{franchise ? 'non applicable' : argent(c.tva)}</dd>
          </div>
          <div className="su-mdv__ttc">
            <dt>Total TTC</dt>
            <dd>{argent(c.ttc)}</dd>
          </div>
          {acompteBp > 0n && (
            <>
              <div>
                <dt>Acompte ({pourcent(acompteBp)})</dt>
                <dd>{argent(c.acompte)}</dd>
              </div>
              <div>
                <dt>Reste à payer</dt>
                <dd>{argent(c.reste)}</dd>
              </div>
            </>
          )}
        </dl>
        <p className="su-mdv__note">Calcul au centime : chaque ligne est arrondie, la TVA est calculée par taux sur le net après remise, puis additionnée.</p>
      </section>

      <div className="su-mdv__actions">
        <Action onClick={() => window.print()}>Imprimer ou enregistrer en PDF</Action>
        <Action variante="contour" onClick={copier}>
          Copier le texte
        </Action>
        <p className="su-mdv__message" role="status">
          {message}
        </p>
      </div>

      <Plaque variante="ivoire" className="su-mdv__apercu-cadre">
        <h2 className="su-display su-mdv__apercu-titre">Aperçu du devis</h2>
        <article className="su-mdv__apercu" aria-label="Aperçu du devis">
          <header className="su-mdv__a-tete">
            <div>
              <p className="su-mdv__a-nom">
                <Val v={s.nomEntreprise} />
              </p>
              <p>{s.adresse.trim() ? <Lignes t={s.adresse} /> : <span className="su-mdv__vide">adresse à compléter</span>}</p>
              <p>
                SIRET : <Val v={s.siret} />
              </p>
              {s.contact.trim() && <p>{s.contact}</p>}
            </div>
            <div className="su-mdv__a-ref">
              <p className="su-mdv__a-devis">DEVIS{s.numero.trim() ? ` n° ${s.numero.trim()}` : ''}</p>
              <p>Date : {dateFr(s.date) || <span className="su-mdv__vide">à compléter</span>}</p>
              <p>{s.validite.trim() ? `Valable ${s.validite.trim()} jours à compter de cette date` : <span className="su-mdv__vide">durée de validité à préciser</span>}</p>
            </div>
          </header>

          <section className="su-mdv__a-client">
            <p className="su-mdv__a-etiquette">Client</p>
            <p>
              <strong>
                <Val v={s.client} />
              </strong>
            </p>
            {s.adresseClient.trim() && (
              <p>
                <Lignes t={s.adresseClient} />
              </p>
            )}
          </section>

          <p className="su-mdv__a-objet">
            <strong>Objet :</strong> <Val v={s.objet} />
          </p>

          <div className="su-mdv__a-defil">
            <table className="su-mdv__a-table">
              <thead>
                <tr>
                  <th scope="col">Désignation</th>
                  <th scope="col" className="su-mdv__num">
                    Qté
                  </th>
                  <th scope="col">Unité</th>
                  <th scope="col" className="su-mdv__num">
                    PU HT
                  </th>
                  {!franchise && (
                    <th scope="col" className="su-mdv__num">
                      TVA
                    </th>
                  )}
                  <th scope="col" className="su-mdv__num">
                    Total HT
                  </th>
                </tr>
              </thead>
              <tbody>
                {lignesApercu.length === 0 && (
                  <tr>
                    <td colSpan={franchise ? 5 : 6} className="su-mdv__vide-ligne">
                      <span className="su-mdv__vide">Les lignes saisies apparaissent ici.</span>
                    </td>
                  </tr>
                )}
                {lignesApercu.map(({ l, ht }) => (
                  <tr key={l.id}>
                    <td>{l.designation.trim() || <span className="su-mdv__vide">désignation</span>}</td>
                    <td className="su-mdv__num">{l.qte.trim()}</td>
                    <td>{l.unite.trim()}</td>
                    <td className="su-mdv__num">{l.prix.trim() ? argent(lire(l.prix, 2)) : ''}</td>
                    {!franchise && <td className="su-mdv__num">{pourcent(lire(l.tva, 2))}</td>}
                    <td className="su-mdv__num">{argent(ht)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <table className="su-mdv__a-sommes">
            <tbody>
              {c.remise > 0n && (
                <>
                  <tr>
                    <th scope="row">Total HT avant remise</th>
                    <td>{argent(c.brut)}</td>
                  </tr>
                  <tr>
                    <th scope="row">Remise</th>
                    <td>−{argent(c.remise)}</td>
                  </tr>
                </>
              )}
              <tr>
                <th scope="row">Total HT</th>
                <td>{argent(c.ht)}</td>
              </tr>
              {!franchise &&
                c.taux.map((t) => (
                  <tr key={t.tauxBp.toString()}>
                    <th scope="row">
                      TVA {pourcent(t.tauxBp)} sur {argent(t.net)}
                    </th>
                    <td>{argent(t.tva)}</td>
                  </tr>
                ))}
              <tr className="su-mdv__a-ttc">
                <th scope="row">Total TTC</th>
                <td>{argent(c.ttc)}</td>
              </tr>
              {acompteBp > 0n && (
                <>
                  <tr>
                    <th scope="row">Acompte demandé ({pourcent(acompteBp)} du TTC)</th>
                    <td>{argent(c.acompte)}</td>
                  </tr>
                  <tr>
                    <th scope="row">Reste à payer</th>
                    <td>{argent(c.reste)}</td>
                  </tr>
                </>
              )}
            </tbody>
          </table>

          <section className="su-mdv__a-mentions">
            {franchise && <p>{MENTION_FRANCHISE}.</p>}
            <p>
              <strong>Conditions de paiement :</strong> {s.conditions.trim() ? <Lignes t={s.conditions} /> : <span className="su-mdv__vide">à préciser</span>}
            </p>
            {s.avantTravaux && <p>{MENTION_AVANT}</p>}
          </section>

          <section className="su-mdv__a-signature">
            <p>
              <strong>Bon pour accord, date et signature du client</strong>
            </p>
            <p className="su-mdv__a-cadre" aria-hidden="true" />
          </section>
        </article>
        <p className="su-mdv__avertissement">Modèle indicatif, à adapter à votre activité et à votre statut : certaines professions doivent ajouter d’autres mentions. Vérifiez sur service-public.fr.</p>
      </Plaque>
    </div>
  )
}
