import Link from 'next/link'
import { encoder } from '@/domain/devis/etat'
import { exemplesAbonnement } from '@/domain/devis/offres'
import { euros } from '@/domain/devis/resume'
import './tarifs-blocs.css'

/** L'abonnement : composé selon les besoins, trois exemples calculés par le moteur. */
export default function AbonnementCompose() {
  return (
    <section className="su-tg su-tg--abo" aria-labelledby="su-abo-t" data-nuit="0">
      <div className="su-tg__enveloppe">
        <h2 id="su-abo-t" className="su-display su-tg__titre">
          Un abonnement composé selon vos besoins
        </h2>
        <p className="su-tg__intro">
          Pas de formule imposée : on retient l’hébergement et la maintenance dont votre site a besoin, puis vous ajoutez ce qui vous sert (publications, suivi de votre visibilité, heures de modifications). Sans engagement, préavis d’un mois, et vous gardez votre site et vos fichiers si vous arrêtez.
        </p>
        <ul className="su-tg__exemples">
          {exemplesAbonnement().map((x) => (
            <li key={x.id} className="su-tg__exemple">
              <h3 className="su-tg__etape-nom">{x.titre}</h3>
              <p className="su-tg__prix su-tabular">
                environ {euros(x.mensuel)}
                <span> par mois</span>
              </p>
              <p className="su-tg__etape-texte">{x.detail}</p>
              <Link className="su-tg__lien" href={`/tarifs?e=${encoder({ cfg: x.config, metier: '', etape: 9 })}#estimer`}>
                Composer le mien
              </Link>
            </li>
          ))}
        </ul>
        <p className="su-tg__note">Exemples indicatifs, calculés avec la même grille que l’estimateur. Prix nets, TVA non applicable (art. 293 B du CGI).</p>
      </div>
    </section>
  )
}
