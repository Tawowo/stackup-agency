'use client'
/**
 * /contact — une seule page de conversion. Trois plaques (Vous / Votre projet
 * / Comment vous joindre), validation zod côté client et serveur, erreurs
 * annoncées, RGPD explicite. La configuration venue de /tarifs ou de
 * l'accueil est lue et affichée en Fiche. Pendant la saisie, la pile se
 * construit plaque par plaque à chaque champ rempli.
 */
import { useEffect, useMemo, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import { CHAMPS_ORDRE, ContactSchema, OBJETS, type ContactEntree } from '@/lib/contact'
import { deserialiser, lignesFiche, resumer, type Configuration } from '@/lib/configuration'
import { gsap } from '@/lib/gsap'
import { useScene } from '@/webgl/store'
import StackFrame from '@/webgl/StackFrame'
import Action from '@/components/ui/Action'
import Fiche from '@/components/ui/Fiche'
import Plaque from '@/components/ui/Plaque'
import { SITE } from '@/config/site'
import './contact.css'

type Champs = Record<string, string>

export default function Formulaire({ c, projet, objet }: { c: string | null; projet: string; objet: string }) {
  const config: Configuration = useMemo(() => deserialiser(c), [c])
  const [v, setV] = useState<ContactEntree>({
    prenom: '',
    nom: '',
    entreprise: '',
    metier: '',
    objet: (OBJETS as readonly string[]).includes(objet) ? (objet as (typeof OBJETS)[number]) : config.type === 'outil' ? 'Outil sur mesure' : config.type ? 'Site' : ('' as never),
    projet,
    email: '',
    telephone: '',
    preference: 'email',
    rgpd: false as never,
    configuration: resumer(config),
    site_web: '',
  })
  const [erreurs, setErreurs] = useState<Champs>({})
  const [etat, setEtat] = useState<'saisie' | 'envoi' | 'erreur'>('saisie')
  const [message, setMessage] = useState('')
  const router = useRouter()
  const section = useRef<HTMLElement>(null)
  const annonce = useRef<HTMLParagraphElement>(null)

  // Scène : la pile se construit avec les champs valides.
  const remplis = useMemo(() => {
    const r = ContactSchema.safeParse(v)
    if (r.success) return CHAMPS_ORDRE.length
    const fautifs = new Set(r.error.issues.map((i) => String(i.path[0])))
    return CHAMPS_ORDRE.filter((k) => !fautifs.has(k) && (k === 'rgpd' ? v.rgpd === true : String(v[k] ?? '').trim() !== '' || k === 'entreprise' || k === 'metier' || k === 'telephone')).length
  }, [v])
  useEffect(() => {
    const s = useScene.getState()
    s.setMoment('contact')
    s.setNuit(1)
    s.setScrub(false)
    s.setTarget(null)
    s.setPose({ x: 0.1, y: -0.25 })
    s.setProjection(0.5)
    s.setCalme(false)
    if (s.reduced) return
    s.setParams({ champs: remplis })
    s.setLayout('formulaire')
  }, [remplis])

  const maj = (k: keyof ContactEntree, val: string | boolean) => {
    setV((p) => ({ ...p, [k]: val }))
    if (erreurs[k]) setErreurs((e) => ({ ...e, [k]: '' }))
  }
  const valider = (k: keyof ContactEntree) => {
    const r = ContactSchema.safeParse(v)
    if (r.success) return setErreurs((e) => ({ ...e, [k]: '' }))
    const i = r.error.issues.find((x) => x.path[0] === k)
    setErreurs((e) => ({ ...e, [k]: i?.message ?? '' }))
  }

  const envoyer = async (ev: React.FormEvent) => {
    ev.preventDefault()
    const r = ContactSchema.safeParse(v)
    if (!r.success) {
      const e: Champs = {}
      for (const i of r.error.issues) {
        const k = String(i.path[0])
        if (!e[k]) e[k] = i.message
      }
      setErreurs(e)
      const n = Object.keys(e).length
      setMessage(`${n} champ${n > 1 ? 's' : ''} à corriger : ${Object.keys(e).map(libelle).join(', ')}.`)
      ;(section.current?.querySelector(`[name="${Object.keys(e)[0]}"]`) as HTMLElement | null)?.focus()
      return
    }
    setEtat('envoi')
    setMessage('Envoi en cours…')
    try {
      const res = await fetch('/api/contact', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify(r.data) })
      const j = (await res.json()) as { ok: boolean; envoye?: boolean; erreur?: string; champs?: Champs }
      if (res.ok && j.ok) {
        // Le départ : la pile se plie en enveloppe, le logo la scelle, puis elle
        // file au fond de la scène ; la page de confirmation prend le relais.
        const sc = useScene.getState()
        const suite = () => router.push(`/contact/merci?envoye=${j.envoye ? '1' : '0'}`)
        setMessage('Demande envoyée. Elle part.')
        if (sc.reduced) return suite()
        sc.setParams({ retard: 0.5, arc: 0.4 })
        sc.setLayout('enveloppe')
        const f = { v: 0 }
        gsap.to(f, {
          v: 1,
          delay: 1.1,
          duration: 1.1,
          ease: 'power2.in',
          onUpdate: () => useScene.getState().setParams({ fuite: f.v }),
          onComplete: suite,
        })
        return
      }
      if (j.champs) setErreurs(j.champs)
      setEtat('erreur')
      setMessage(j.erreur ?? 'Le formulaire a été refusé. Vérifiez les champs signalés.')
    } catch {
      setEtat('erreur')
      setMessage(`Impossible de joindre le serveur. Écrivez-nous directement à ${SITE.email}.`)
    }
  }

  const champ = (k: keyof ContactEntree, label: string, props: React.InputHTMLAttributes<HTMLInputElement> = {}) => (
    <div className="su-ctc__champ" data-erreur={erreurs[k] ? '1' : '0'}>
      <label htmlFor={`su-ctc-${k}`}>{label}</label>
      <input
        id={`su-ctc-${k}`}
        name={k}
        value={String(v[k] ?? '')}
        onChange={(e) => maj(k, e.target.value)}
        onBlur={() => valider(k)}
        aria-invalid={!!erreurs[k]}
        aria-describedby={erreurs[k] ? `su-ctc-${k}-err` : undefined}
        {...props}
      />
      {erreurs[k] && (
        <p id={`su-ctc-${k}-err`} className="su-ctc__erreur">
          {erreurs[k]}
        </p>
      )}
    </div>
  )

  return (
    <main ref={section} className="su-ctc" data-moment="contact">
      <div className="su-ctc__grille">
        <header className="su-ctc__tete">
          <p className="su-mono su-ctc__etiquette">Contact</p>
          <h1 className="su-display su-ctc__titre">
            Parlons de
            <br />
            votre projet.
          </h1>
          <p className="su-ctc__ligne">Trois plaques à remplir, une réponse personnelle de {SITE.fondateur}. Rien n’est envoyé sans votre accord.</p>
          <div className="su-ctc__scene" aria-hidden="true">
            <StackFrame className="su-ctc__cadre" />
          </div>
          {config.type && <Fiche lignes={lignesFiche(config)} titre="Votre configuration" className="su-ctc__fiche" />}
        </header>

        <form className="su-ctc__form" onSubmit={envoyer} noValidate aria-describedby="su-ctc-annonce">
          <p id="su-ctc-annonce" ref={annonce} className="su-ctc__annonce" role="status" aria-live="polite" data-etat={etat}>
            {message}
          </p>

          <Plaque as="fieldset" className="su-ctc__plaque">
            <legend className="su-mono su-ctc__legende">01 · Vous</legend>
            <div className="su-ctc__deux">
              {champ('prenom', 'Prénom', { autoComplete: 'given-name', required: true })}
              {champ('nom', 'Nom', { autoComplete: 'family-name', required: true })}
              {champ('entreprise', 'Entreprise (facultatif)', { autoComplete: 'organization' })}
              {champ('metier', 'Métier (facultatif)')}
            </div>
          </Plaque>

          <Plaque as="fieldset" className="su-ctc__plaque">
            <legend className="su-mono su-ctc__legende">02 · Votre projet</legend>
            <div className="su-ctc__champ" data-erreur={erreurs.objet ? '1' : '0'}>
              <label htmlFor="su-ctc-objet">Objet</label>
              <select id="su-ctc-objet" name="objet" value={String(v.objet ?? '')} onChange={(e) => maj('objet', e.target.value)} onBlur={() => valider('objet')} aria-invalid={!!erreurs.objet} aria-describedby={erreurs.objet ? 'su-ctc-objet-err' : undefined} required>
                <option value="">Choisir…</option>
                {OBJETS.map((o) => (
                  <option key={o} value={o}>
                    {o}
                  </option>
                ))}
              </select>
              {erreurs.objet && (
                <p id="su-ctc-objet-err" className="su-ctc__erreur">
                  {erreurs.objet}
                </p>
              )}
            </div>
            <div className="su-ctc__champ" data-erreur={erreurs.projet ? '1' : '0'}>
              <label htmlFor="su-ctc-projet">Votre projet, en quelques phrases</label>
              <textarea id="su-ctc-projet" name="projet" rows={5} value={v.projet} onChange={(e) => maj('projet', e.target.value)} onBlur={() => valider('projet')} aria-invalid={!!erreurs.projet} aria-describedby={erreurs.projet ? 'su-ctc-projet-err' : undefined} required />
              {erreurs.projet && (
                <p id="su-ctc-projet-err" className="su-ctc__erreur">
                  {erreurs.projet}
                </p>
              )}
            </div>
            {config.type && <input type="hidden" name="configuration" value={v.configuration} />}
          </Plaque>

          <Plaque as="fieldset" className="su-ctc__plaque">
            <legend className="su-mono su-ctc__legende">03 · Comment vous joindre</legend>
            <div className="su-ctc__deux">
              {champ('email', 'E-mail', { type: 'email', autoComplete: 'email', inputMode: 'email', required: true })}
              {champ('telephone', 'Téléphone (facultatif)', { type: 'tel', autoComplete: 'tel', inputMode: 'tel' })}
            </div>
            <div className="su-ctc__pref" role="radiogroup" aria-label="Préférence de réponse">
              <label>
                <input type="radio" name="preference" checked={v.preference === 'email'} onChange={() => maj('preference', 'email')} /> Par e-mail
              </label>
              <label>
                <input type="radio" name="preference" checked={v.preference === 'telephone'} onChange={() => maj('preference', 'telephone')} /> Par téléphone
              </label>
            </div>
            <div className="su-ctc__rgpd" data-erreur={erreurs.rgpd ? '1' : '0'}>
              <label>
                <input type="checkbox" name="rgpd" checked={v.rgpd === true} onChange={(e) => maj('rgpd', e.target.checked)} aria-invalid={!!erreurs.rgpd} aria-describedby={erreurs.rgpd ? 'su-ctc-rgpd-err' : undefined} required />
                <span>
                  J’accepte que {SITE.nom} conserve ce message et mes coordonnées pour me répondre. Rien d’autre : pas de liste, pas de revente. Je peux demander leur suppression à {SITE.email}.
                </span>
              </label>
              {erreurs.rgpd && (
                <p id="su-ctc-rgpd-err" className="su-ctc__erreur">
                  {erreurs.rgpd}
                </p>
              )}
            </div>
            {/* Pot de miel : invisible, doit rester vide. */}
            <div className="su-ctc__miel" aria-hidden="true">
              <label htmlFor="su-ctc-site">Site web</label>
              <input id="su-ctc-site" name="site_web" tabIndex={-1} autoComplete="off" value={v.site_web} onChange={(e) => maj('site_web', e.target.value)} />
            </div>
          </Plaque>

          <div className="su-ctc__actions">
            <Action type="submit" mot="Envoyer">
              {etat === 'envoi' ? 'Envoi…' : 'Envoyer ma demande'}
            </Action>
            <p className="su-mono su-ctc__note">Réponse personnelle, sous forme de démo quand c’est un site.</p>
          </div>
        </form>
      </div>
    </main>
  )
}

function libelle(k: string): string {
  return (
    { prenom: 'prénom', nom: 'nom', objet: 'objet', projet: 'projet', email: 'e-mail', telephone: 'téléphone', rgpd: 'consentement' } as Record<string, string>
  )[k] ?? k
}
