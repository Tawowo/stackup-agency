'use client'
/** Formulaire d'opposition : une adresse e-mail, envoyée à /api/desinscription. */
import { useId, useState } from 'react'
import Action from '@/components/ui/Action'

export default function Desinscription({ email }: { email: string }) {
  const id = useId()
  const [etat, setEtat] = useState<'repos' | 'en-cours' | 'ok' | 'erreur'>('repos')
  const [erreur, setErreur] = useState('')
  async function envoyer(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const f = new FormData(e.currentTarget)
    setEtat('en-cours')
    try {
      const r = await fetch('/api/desinscription', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ email: String(f.get('email') ?? ''), site_web: String(f.get('site_web') ?? '') }) })
      const j = (await r.json()) as { ok: boolean; erreur?: string; champs?: { email?: string } }
      if (j.ok) setEtat('ok')
      else {
        setEtat('erreur')
        setErreur(j.champs?.email ?? j.erreur ?? 'La demande n’a pas abouti.')
      }
    } catch {
      setEtat('erreur')
      setErreur('La demande n’a pas abouti. Vérifiez votre connexion.')
    }
  }
  if (etat === 'ok') {
    return (
      <p role="status">
        <strong>C’est noté.</strong> Votre adresse est ajoutée à notre liste d’opposition : vous ne recevrez plus d’e-mail de présentation de notre part.
      </p>
    )
  }
  return (
    <form onSubmit={envoyer} noValidate className="su-desinscription">
      <p style={{ display: 'flex', flexDirection: 'column', gap: 6, maxWidth: 480 }}>
        <label htmlFor={`${id}-email`}>
          <strong>Votre adresse e-mail</strong>
        </label>
        <input id={`${id}-email`} name="email" type="email" autoComplete="email" required defaultValue={email} maxLength={200} aria-invalid={etat === 'erreur'} aria-describedby={etat === 'erreur' ? `${id}-err` : undefined} style={{ minHeight: 48, padding: '10px 12px', fontSize: '1rem', border: '1.5px solid #c9c1b0', borderRadius: 4 }} />
      </p>
      <p style={{ position: 'absolute', left: -9999 }} aria-hidden="true">
        <label>
          Ne pas remplir <input type="text" name="site_web" tabIndex={-1} autoComplete="off" />
        </label>
      </p>
      {etat === 'erreur' && (
        <p id={`${id}-err`} role="alert" style={{ color: '#b42318' }}>
          {erreur}
        </p>
      )}
      <p>
        <Action type="submit">{etat === 'en-cours' ? 'Envoi…' : 'Ne plus recevoir d’e-mails'}</Action>
      </p>
    </form>
  )
}
