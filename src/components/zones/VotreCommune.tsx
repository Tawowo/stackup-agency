'use client'
/**
 * VOTRE COMMUNE — on tape sa commune, on voit tout de suite que Stackup intervient, à quelle distance (indicative, depuis
 * Savigné-sur-Lathan jusqu'à la ville-centre de la zone) et comment contacter. Aucune page indexable par commune : l'outil
 * mène à la page de la zone. Sans JavaScript, la liste des zones et de leurs communes reste lisible sur la page.
 */
import Link from 'next/link'
import { useId, useState } from 'react'

export interface CommuneZone {
  nom: string
  zone: string
  zoneNom: string
  km: number
  surPlace: boolean
}

const norm = (s: string) => s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim()

export default function VotreCommune({ communes, telephone, lienTel }: { communes: CommuneZone[]; telephone: string; lienTel: string }) {
  const [saisie, setSaisie] = useState('')
  const id = useId()
  const q = norm(saisie)
  const exacte = q ? communes.find((c) => norm(c.nom) === q) : undefined
  const proposees = q && !exacte ? communes.filter((c) => norm(c.nom).includes(q)).slice(0, 6) : []
  return (
    <section className="su-loc__bloc su-loc__bloc--large su-commune" aria-labelledby={`${id}-t`}>
      <h2 id={`${id}-t`} className="su-loc__h2">
        Votre commune
      </h2>
      <p className="su-loc__long">Tapez le nom de votre commune d’Indre-et-Loire : on vous dit tout de suite si Stackup intervient chez vous, à quelle distance de l’atelier, et comment nous joindre.</p>
      <label htmlFor={`${id}-c`} className="su-mono su-commune__label">
        Ma commune
      </label>
      <input
        id={`${id}-c`}
        className="su-commune__champ"
        type="search"
        autoComplete="off"
        placeholder="Par exemple : Bourgueil, Amboise, Azay-le-Rideau…"
        value={saisie}
        onChange={(e) => setSaisie(e.target.value)}
        aria-describedby={`${id}-r`}
      />
      <div id={`${id}-r`} role="status" aria-live="polite" className="su-commune__resultat">
        {proposees.length > 0 && (
          <ul className="su-commune__choix">
            {proposees.map((c) => (
              <li key={c.nom}>
                <button type="button" onClick={() => setSaisie(c.nom)}>
                  {c.nom}
                </button>
              </li>
            ))}
          </ul>
        )}
        {q && !exacte && proposees.length === 0 && (
          <p>
            Cette commune n’est pas dans notre liste d’Indre-et-Loire. Stackup travaille aussi à distance, en visio et par écrit, avec la même démo avant de signer : <Link href="/contact">écrivez-nous</Link> ou appelez le <a href={lienTel}>{telephone}</a>.
          </p>
        )}
        {exacte && (
          <div className="su-commune__carte">
            <p className="su-display su-commune__oui">Oui, Stackup intervient à {exacte.nom}.</p>
            <p>
              {exacte.nom} fait partie de <Link href={`/zones-intervention/${exacte.zone}`}>{exacte.zoneNom}</Link>.{' '}
              {exacte.km <= 5
                ? 'C’est la zone de l’atelier : Mathéo Reboul travaille depuis Savigné-sur-Lathan, dans la même communauté de communes.'
                : `Distance indicative depuis Savigné-sur-Lathan : environ ${exacte.km} km par la route jusqu’au centre de la zone. Rendez-vous ${exacte.surPlace ? 'sur place possible, ou en visio, au choix' : 'en visio, avec un déplacement possible pour une étape clé'}.`}
            </p>
            <p className="su-commune__actions">
              <a href={lienTel}>Appeler le {telephone}</a> · <Link href="/contact?objet=demo">Demander ma démo</Link> · <Link href={`/zones-intervention/${exacte.zone}`}>Voir la zone</Link>
            </p>
          </div>
        )}
      </div>
    </section>
  )
}
