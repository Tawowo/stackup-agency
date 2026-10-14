/**
 * LE MONDE DU RÉFÉRENCEMENT LOCAL — une page de résultats de recherche, comme
 * le client la voit : la requête, le bloc « carte » avec trois entreprises, et
 * celle de l'artisan, en tête, avec ses étoiles et son bouton « Appeler ».
 * Entreprises fictives. Rendu serveur ; seule la lueur sur le premier résultat
 * est animée (CSS).
 */
import Navigateur from '@/components/maquettes/Navigateur'
import { Picto } from '@/components/maquettes/illustrations'
import './mondes.css'

const RESULTATS = [
  { nom: 'Menuiserie Aubert', note: '4,9', avis: 86, type: 'Menuisier · Tours', ouvert: 'Ouvert · ferme à 18 h', premier: true },
  { nom: 'Atelier du Chêne', note: '4,6', avis: 41, type: 'Menuisier · Joué-lès-Tours', ouvert: 'Ouvert · ferme à 19 h' },
  { nom: 'Bois & Cie', note: '4,4', avis: 23, type: 'Menuisier · Tours-Nord', ouvert: 'Fermé · ouvre à 8 h' },
]

export default function MondeSerp({ requete = 'menuisier tours' }: { requete?: string }) {
  return (
    <div className="mw-serp" aria-hidden="true">
      <Navigateur url={`recherche?q=${requete.replace(/ /g, '+')}`} ratio="16 / 10.6" cadenas>
        <div className="mw-serp__page">
          <div className="mw-serp__champ">
            <Picto nom="loupe" />
            <span>{requete}</span>
          </div>
          <div className="mw-serp__carte">
            <div className="mw-serp__plan">
              <span className="mw-serp__rue mw-serp__rue--a" />
              <span className="mw-serp__rue mw-serp__rue--b" />
              <span className="mw-serp__rue mw-serp__rue--c" />
              <span className="mw-serp__epingle" style={{ left: '38%', top: '36%' }} data-premier="1" />
              <span className="mw-serp__epingle" style={{ left: '66%', top: '58%' }} />
              <span className="mw-serp__epingle" style={{ left: '24%', top: '70%' }} />
            </div>
            <ul className="mw-serp__liste">
              {RESULTATS.map((r) => (
                <li key={r.nom} data-premier={r.premier ? '1' : '0'}>
                  <b>{r.nom}</b>
                  <span className="mw-serp__note">
                    {r.note} <i aria-hidden="true">★★★★★</i> ({r.avis})
                  </span>
                  <span className="mw-serp__type">{r.type}</span>
                  <span className="mw-serp__ouvert">{r.ouvert}</span>
                  {r.premier && <em>Appeler</em>}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Navigateur>
    </div>
  )
}
