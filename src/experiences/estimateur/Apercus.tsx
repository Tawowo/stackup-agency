/**
 * LES QUATRE APERÇUS — la même page d'artisan, rendue aux quatre niveaux. Ce sont de
 * vraies mini-pages HTML/CSS animées en continu (découpes, masques, plaques en 3D),
 * pas des icônes : on voit ce que le niveau change. Mouvement réduit : image fixe.
 */
import Navigateur from '@/components/maquettes/Navigateur'

function Page() {
  return (
    <>
      <div className="su-ap__nav">
        <b className="su-ap__logo">Aubert</b>
        <i /> <i /> <i />
        <span className="su-ap__cta-mini" />
      </div>
      <div className="su-ap__hero">
        <div className="su-ap__texte">
          <span className="su-ap__t1">Menuiserie sur mesure</span>
          <span className="su-ap__t2">à Tours</span>
          <span className="su-ap__p" />
          <span className="su-ap__p su-ap__p--c" />
          <span className="su-ap__cta" />
        </div>
        <div className="su-ap__photo" />
      </div>
      <div className="su-ap__cartes">
        <span className="su-ap__carte" />
        <span className="su-ap__carte" />
        <span className="su-ap__carte" />
      </div>
    </>
  )
}

export default function ApercuNiveau({ niveau }: { niveau: string }) {
  const id = niveau === 'Animé' ? 'anime' : niveau === 'Signature' ? 'signature' : niveau === 'Immersif' ? 'immersif' : 'classique'
  return (
    <span className="su-ap" data-niveau={id} aria-hidden="true">
      <Navigateur url="menuiserie-aubert.fr" ratio="16 / 10" className="su-ap__nav-fen">
        <div className="su-ap__page">
          {id === 'immersif' ? (
            <>
              <div className="su-ap__scene3d">
                <i className="su-ap__plaque su-ap__plaque--1" />
                <i className="su-ap__plaque su-ap__plaque--2" />
                <i className="su-ap__plaque su-ap__plaque--3" />
                <i className="su-ap__plaque su-ap__plaque--4" />
                <i className="su-ap__plaque su-ap__plaque--5" />
              </div>
              <div className="su-ap__sur3d">
                <span className="su-ap__t1">Menuiserie sur mesure</span>
                <span className="su-ap__t2">à Tours</span>
                <span className="su-ap__cta" />
              </div>
            </>
          ) : (
            <Page />
          )}
          {id === 'signature' && <span className="su-ap__bande">MENUISERIE · SUR MESURE · TOURS · MENUISERIE · SUR MESURE · TOURS ·</span>}
          {(id === 'anime' || id === 'signature') && <span className="su-ap__curseur" />}
        </div>
      </Navigateur>
    </span>
  )
}
