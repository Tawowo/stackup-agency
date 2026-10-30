'use client'
import { useState } from 'react'
import './simulateur.css'

export default function Desinscription() {
  const [email, setEmail] = useState('')
  const [club, setClub] = useState('')
  const [pot, setPot] = useState('')
  const [etat, setEtat] = useState<'repos' | 'envoi' | 'ok' | 'erreur'>('repos')
  const [message, setMessage] = useState('')
  async function envoyer(e: React.FormEvent) {
    e.preventDefault()
    setEtat('envoi')
    try {
      const r = await fetch('/api/desinscription', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ email, club, site_web: pot }) })
      const j = (await r.json()) as { ok: boolean; erreur?: string; champs?: Record<string, string> }
      if (r.ok && j.ok) setEtat('ok')
      else {
        setEtat('erreur')
        setMessage(j.erreur ?? j.champs?.email ?? 'La demande a échoué.')
      }
    } catch {
      setEtat('erreur')
      setMessage('La demande a échoué. Écrivez-nous directement par e-mail.')
    }
  }
  if (etat === 'ok') return <p role="status" className="cs-categorie">Votre demande est enregistrée : cette adresse ne recevra plus de message de prospection.</p>
  return (
    <form className="cs-envoi" onSubmit={envoyer} style={{ maxWidth: 480 }}>
      <label className="cs-champ">
        <span>Votre adresse e-mail</span>
        <input type="email" autoComplete="email" required value={email} onChange={(e) => setEmail(e.target.value)} />
      </label>
      <label className="cs-champ">
        <span>Nom du club (facultatif)</span>
        <input type="text" maxLength={120} value={club} onChange={(e) => setClub(e.target.value)} />
      </label>
      <input className="cs-pot" type="text" name="site_web" tabIndex={-1} autoComplete="off" aria-hidden="true" value={pot} onChange={(e) => setPot(e.target.value)} />
      <button className="su-action su-action--plein" type="submit" disabled={etat === 'envoi' || !email}>
        <span className="su-action__texte">{etat === 'envoi' ? 'Envoi…' : 'Ne plus recevoir de message'}</span>
      </button>
      <p role="status" className="cs-statut" data-etat={etat}>
        {etat === 'erreur' && message}
      </p>
    </form>
  )
}
