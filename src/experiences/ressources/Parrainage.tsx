'use client'
/**
 * LE FORMULAIRE DE PARRAINAGE — deux blocs (vous / votre filleul), validation
 * zod côté client et serveur, erreurs annoncées. Sans JS, le formulaire part
 * en POST classique vers /api/parrainage, qui renvoie ici avec ?merci=1 ou
 * ?erreur=1. La confirmation se découpe (clip-path) à la place du formulaire.
 */
import { useRef, useState, useSyncExternalStore } from 'react'
import { flushSync } from 'react-dom'
import Action from '@/components/ui/Action'
import Plaque from '@/components/ui/Plaque'
import { ParrainageSchema, type ParrainageEntree } from '@/lib/parrainage'
import { SITE } from '@/config/site'

type Champs = Record<string, string>
type Cle = 'parrainNom' | 'parrainEmail' | 'filleulNom' | 'filleulEmail'
const abonnement = () => () => {}

export default function Parrainage({ resultat }: { resultat: 'merci' | 'erreur' | null }) {
  const [v, setV] = useState<ParrainageEntree>({ parrainNom: '', parrainEmail: '', filleulNom: '', filleulEmail: '', message: '', accord: false as never, site_web: '' })
  const [erreurs, setErreurs] = useState<Champs>({})
  const [etat, setEtat] = useState<'saisie' | 'envoi' | 'erreur' | 'merci'>(resultat === 'merci' ? 'merci' : resultat === 'erreur' ? 'erreur' : 'saisie')
  const [message, setMessage] = useState(resultat === 'erreur' ? `La demande n’est pas passée. Vérifiez les champs, ou écrivez-nous à ${SITE.email}.` : '')
  // Sans JS, la validation native du navigateur prend le relais (noValidate seulement une fois hydraté).
  const js = useSyncExternalStore(
    abonnement,
    () => true,
    () => false,
  )
  const form = useRef<HTMLFormElement>(null)
  const merci = useRef<HTMLDivElement>(null)

  const maj = (k: keyof ParrainageEntree, val: string | boolean) => {
    setV((p) => ({ ...p, [k]: val }))
    if (erreurs[k]) setErreurs((e) => ({ ...e, [k]: '' }))
  }

  const envoyer = async (ev: React.FormEvent) => {
    ev.preventDefault()
    const r = ParrainageSchema.safeParse(v)
    if (!r.success) {
      const e: Champs = {}
      for (const i of r.error.issues) {
        const k = String(i.path[0])
        if (!e[k]) e[k] = i.message
      }
      setErreurs(e)
      setEtat('erreur')
      const n = Object.keys(e).length
      setMessage(`${n} champ${n > 1 ? 's' : ''} à corriger.`)
      form.current?.querySelector<HTMLElement>(`[name="${Object.keys(e)[0]}"]`)?.focus()
      return
    }
    setEtat('envoi')
    setMessage('Envoi en cours…')
    try {
      const res = await fetch('/api/parrainage', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify(r.data) })
      const j = (await res.json()) as { ok: boolean; erreur?: string; champs?: Champs }
      if (res.ok && j.ok) {
        flushSync(() => {
          setEtat('merci')
          setMessage('')
        })
        merci.current?.focus()
        return
      }
      if (j.champs) setErreurs(j.champs)
      setEtat('erreur')
      setMessage(j.erreur ?? 'La demande a été refusée. Vérifiez les champs signalés.')
    } catch {
      setEtat('erreur')
      setMessage(`Impossible de joindre le serveur. Écrivez-nous directement à ${SITE.email}.`)
    }
  }

  if (etat === 'merci') {
    return (
      <Plaque className="su-par__merci" ref={merci} tabIndex={-1} role="status">
        <p className="su-mono su-res__etiquette">Parrainage reçu</p>
        <p className="su-res__carte-titre">Merci. La mise en relation est notée.</p>
        <p className="su-res__carte-texte">{SITE.fondateur} vous répond personnellement pour la confirmer, à vous et à votre filleul.</p>
        <Action href="/realisations" variante="lien">
          Voir les démos à montrer à votre filleul
        </Action>
      </Plaque>
    )
  }

  const champ = (k: Cle, label: string, props: React.InputHTMLAttributes<HTMLInputElement>) => (
    <div className="su-par__champ" data-erreur={erreurs[k] ? '1' : '0'}>
      <label htmlFor={`su-par-${k}`}>{label}</label>
      <input
        id={`su-par-${k}`}
        name={k}
        value={String(v[k] ?? '')}
        onChange={(e) => maj(k, e.target.value)}
        aria-invalid={!!erreurs[k]}
        aria-describedby={erreurs[k] ? `su-par-${k}-err` : undefined}
        required
        {...props}
      />
      {erreurs[k] && (
        <p id={`su-par-${k}-err`} className="su-par__erreur">
          {erreurs[k]}
        </p>
      )}
    </div>
  )

  return (
    <Plaque as="form" ref={form} className="su-par__form" method="post" action="/api/parrainage" onSubmit={envoyer} noValidate={js} aria-describedby="su-par-annonce">
      <p id="su-par-annonce" className="su-par__annonce" role="status" aria-live="polite" data-etat={etat}>
        {message}
      </p>
      <div className="su-par__deux">
        <fieldset className="su-par__bloc">
          <legend className="su-mono su-par__legende">01 · Vous, le parrain</legend>
          {champ('parrainNom', 'Votre nom', { autoComplete: 'name' })}
          {champ('parrainEmail', 'Votre e-mail', { type: 'email', autoComplete: 'email', inputMode: 'email' })}
        </fieldset>
        <fieldset className="su-par__bloc">
          <legend className="su-mono su-par__legende">02 · Votre filleul</legend>
          {champ('filleulNom', 'Son nom ou son entreprise', { autoComplete: 'off' })}
          {champ('filleulEmail', 'Son e-mail', { type: 'email', autoComplete: 'off', inputMode: 'email' })}
        </fieldset>
      </div>
      <div className="su-par__champ">
        <label htmlFor="su-par-message">Son projet en quelques mots (facultatif)</label>
        <textarea id="su-par-message" name="message" rows={3} maxLength={2000} value={v.message} onChange={(e) => maj('message', e.target.value)} />
      </div>
      <div className="su-par__accord" data-erreur={erreurs.accord ? '1' : '0'}>
        <label>
          <input type="checkbox" name="accord" checked={v.accord === true} onChange={(e) => maj('accord', e.target.checked)} aria-invalid={!!erreurs.accord} aria-describedby={erreurs.accord ? 'su-par-accord-err' : undefined} required />
          <span>
            Mon filleul est d’accord pour que {SITE.nom} le contacte à ce sujet. Ces coordonnées servent uniquement à traiter ce parrainage ; vous pouvez en demander la suppression à {SITE.email}.
          </span>
        </label>
        {erreurs.accord && (
          <p id="su-par-accord-err" className="su-par__erreur">
            {erreurs.accord}
          </p>
        )}
      </div>
      {/* Pot de miel : invisible, doit rester vide. */}
      <div className="su-par__miel" aria-hidden="true">
        <label htmlFor="su-par-site">Site web</label>
        <input id="su-par-site" name="site_web" tabIndex={-1} autoComplete="off" value={v.site_web} onChange={(e) => maj('site_web', e.target.value)} />
      </div>
      <div className="su-par__actions">
        <Action type="submit">{etat === 'envoi' ? 'Envoi…' : 'Signaler la mise en relation'}</Action>
      </div>
    </Plaque>
  )
}
