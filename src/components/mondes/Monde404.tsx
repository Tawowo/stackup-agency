/**
 * LE MONDE DE LA 404 — la vraie chose : une fenêtre de navigateur qui a chargé
 * une adresse qui n'existe pas. La barre d'adresse montre l'URL perdue ; la
 * page est un site dont les blocs sont vides (cadres en pointillé, image
 * cassée, texte manquant) avec, au centre, le « 404 ». Rendu serveur, sans JS.
 */
import Navigateur from '@/components/maquettes/Navigateur'
import { Picto } from '@/components/maquettes/illustrations'
import './mondes.css'

export default function Monde404() {
  return (
    <div className="mw-404" aria-hidden="true">
      <Navigateur url="stackup-agency.fr/cette-page-n-existe-pas" ratio="16 / 10" cadenas={false}>
        <div className="mw-vide">
          <div className="mw-vide__nav">
            <span className="mw-vide__logo" />
            <span className="mw-vide__lien" />
            <span className="mw-vide__lien" />
            <span className="mw-vide__lien" />
          </div>
          <div className="mw-vide__corps">
            <div className="mw-vide__texte">
              <span className="mw-vide__ligne" style={{ width: '70%' }} />
              <span className="mw-vide__ligne" style={{ width: '56%' }} />
              <span className="mw-vide__ligne mw-vide__ligne--fine" style={{ width: '82%' }} />
              <span className="mw-vide__ligne mw-vide__ligne--fine" style={{ width: '64%' }} />
            </div>
            <div className="mw-vide__image">
              <Picto nom="cube" />
            </div>
          </div>
          <p className="mw-vide__chiffre">404</p>
        </div>
      </Navigateur>
    </div>
  )
}
