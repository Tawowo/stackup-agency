'use client'
/** Confirmation : la pile refermée en logo, la page se termine comme elle a commencé. */
import { useEffect } from 'react'
import StackFrame from '@/webgl/StackFrame'
import { gsap } from '@/lib/gsap'
import { useScene } from '@/webgl/store'
import Action from '@/components/ui/Action'
import { SITE } from '@/config/site'
import './contact.css'

export default function Merci({ envoye }: { envoye: boolean }) {
  useEffect(() => {
    const s = useScene.getState()
    s.setMoment('merci')
    s.setNuit(1)
    s.setScrub(false)
    s.setTarget(null)
    s.setPose({ x: 0, y: 0 })
    s.setProjection(1)
    s.setCalme(false)
    if (!s.reduced) s.setLayout('logo')
    // L'enveloppe est partie au fond : le logo en revient, reformé.
    const f = { v: s.params.fuite }
    const t = gsap.to(f, { v: 0, duration: s.reduced ? 0 : 1.2, ease: 'power3.out', onUpdate: () => useScene.getState().setParams({ fuite: f.v }) })
    return () => {
      t.kill()
      useScene.getState().setParams({ fuite: 0 })
    }
  }, [])
  return (
    <main className="su-merci" data-moment="merci">
      <div className="su-merci__grille">
        <div className="su-merci__scene" aria-hidden="true">
          <StackFrame className="su-merci__cadre" />
        </div>
        <div className="su-merci__texte">
          <p className="su-mono" style={{ color: 'var(--su-texte-doux)', margin: 0 }}>
            Contact · reçu
          </p>
          <h1 className="su-display su-merci__titre">
            C’est parti.
          </h1>
          <p className="su-merci__ligne">
            {envoye
              ? `Votre message est arrivé, et un accusé vient de partir vers votre adresse. ${SITE.fondateur} vous répond personnellement.`
              : `Votre message a bien été reçu. L’envoi d’e-mail n’est pas encore activé sur cet environnement : il est consigné côté serveur. Pour être certain d’être lu, écrivez aussi à ${SITE.email}.`}
          </p>
          <Action href="/" variante="contour" mot="Accueil">
            Retour à l’accueil
          </Action>
        </div>
      </div>
    </main>
  )
}
