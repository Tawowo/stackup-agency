/**
 * LES APPAREILS — ordinateur portable et téléphone en HTML/CSS, avec les VRAIES captures d'écran des
 * réalisations. Chaque capture remplit exactement l'écran (même ratio, ancrage en haut) ; plusieurs
 * captures défilent du haut vers le bas. Une capture absente donne un emplacement neutre.
 */
import type { CSSProperties } from 'react'
import { RATIO_BUREAU, RATIO_MOBILE } from '@/config/captures-ratios'
import type { Ecran } from '@/experiences/galerie/projets'
import './appareils.css'

function Defile({ ecran, ratio, nom, appareil, prioritaire }: { ecran: Ecran; ratio: number; nom: string; appareil: string; prioritaire?: boolean }) {
  const n = ecran.images.length
  const style = { '--ratio': ratio, '--n': n } as CSSProperties
  if (ecran.manquant || n === 0) {
    return (
      <div className="ap-ecran" style={style} role="img" aria-label={`Capture ${appareil} de ${nom} à venir`}>
        <div className="ap-vide">Capture à venir</div>
      </div>
    )
  }
  const suite = [...ecran.images, ecran.images[0]!]
  return (
    <div className="ap-ecran" style={style}>
      <div className="ap-bande" data-n={n} data-anime={n > 1 ? '1' : '0'}>
        {suite.map((im, k) => (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            key={k}
            src={im.fichier}
            width={im.largeur}
            height={im.hauteur}
            alt={k < n ? `${nom}, ${appareil} : ${im.legende}` : ''}
            aria-hidden={k === n ? true : undefined}
            loading={prioritaire && k === 0 ? 'eager' : 'lazy'}
            decoding="async"
            draggable={false}
          />
        ))}
      </div>
    </div>
  )
}

export function Portable({ ecran, nom, prioritaire, className = '' }: { ecran: Ecran; nom: string; prioritaire?: boolean; className?: string }) {
  return (
    <figure className={`ap-portable ${className}`}>
      <div className="ap-portable__couvercle">
        <div className="ap-portable__ecran">
          <Defile ecran={ecran} ratio={RATIO_BUREAU} nom={nom} appareil="ordinateur" prioritaire={prioritaire} />
        </div>
      </div>
      <div className="ap-portable__base" aria-hidden="true" />
    </figure>
  )
}

export function Telephone({ ecran, nom, prioritaire, className = '' }: { ecran: Ecran; nom: string; prioritaire?: boolean; className?: string }) {
  return (
    <figure className={`ap-tel ${className}`}>
      <div className="ap-tel__cadre">
        <div className="ap-tel__verre">
          <span className="ap-tel__ilot" aria-hidden="true" />
          <div className="ap-tel__ecran">
            <Defile ecran={ecran} ratio={RATIO_MOBILE} nom={nom} appareil="téléphone" prioritaire={prioritaire} />
          </div>
        </div>
      </div>
    </figure>
  )
}

/** Ordinateur et téléphone ensemble : le téléphone devant, en bas à droite. */
export function Duo({ projet, prioritaire }: { projet: { nom: string; bureau: Ecran; mobile: Ecran }; prioritaire?: boolean }) {
  return (
    <div className="ap-duo">
      <Portable ecran={projet.bureau} nom={projet.nom} prioritaire={prioritaire} className="ap-duo__portable" />
      <Telephone ecran={projet.mobile} nom={projet.nom} prioritaire={prioritaire} className="ap-duo__tel" />
    </div>
  )
}
