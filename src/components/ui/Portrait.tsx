/**
 * PORTRAIT DU FONDATEUR — la photo de face (fond recomposé aux couleurs de la
 * charte) si elle a été fournie, sinon la photo de l'atelier en bichromie navy.
 * Une seule source pour l'accueil, l'à-propos et le contact.
 */
import { PORTRAIT_FACE } from '@/config/portrait'

export default function Portrait({ fond = 'nuit', className = '', priorite = false }: { fond?: 'nuit' | 'ivoire'; className?: string; priorite?: boolean }) {
  const src = PORTRAIT_FACE ? `/images/matheo-reboul-${fond}` : '/images/atelier-nuit'
  const [petit, grand] = PORTRAIT_FACE ? [640, 1080] : [720, 1200]
  const alt = PORTRAIT_FACE ? 'Mathéo Reboul, fondateur de Stackup Agency' : 'Mathéo Reboul à son poste de travail, le soir, devant son code'
  return (
    <img
      className={`su-portrait ${className}`}
      src={`${src}-${grand}.avif`}
      srcSet={`${src}-${petit}.avif ${petit}w, ${src}-${grand}.avif ${grand}w`}
      sizes="(max-width: 767px) 60vw, 34vw"
      alt={alt}
      width={grand}
      height={PORTRAIT_FACE ? Math.round(grand * (4 / 3)) : Math.round(grand * 1.25)}
      loading={priorite ? 'eager' : 'lazy'}
      decoding="async"
    />
  )
}
