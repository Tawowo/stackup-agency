/**
 * LE MONDE DES CLUBS — deux fenêtres dessinées en HTML/CSS : le site d'un club fictif et le logiciel de son bureau, côte à côte.
 * Aperçu illustratif (club fictif « Grand Chelem Tennis Club »), jamais une capture : rien n'est annoncé qui n'existe pas.
 * Apparition : découpe (clip-path) en CSS pur ; sans animation sous « réduire les animations ».
 */
import Navigateur from '@/components/maquettes/Navigateur'
import './maquette-clubs.css'

function Site() {
  return (
    <div className="mc mc-site">
      <div className="mc-site__tete">
        <span className="mc-site__logo" />
        <span className="mc-site__nom">Grand Chelem TC</span>
        <span className="mc-site__nav">
          <i /> <i /> <i /> <i />
        </span>
      </div>
      <div className="mc-site__hero">
        <span className="mc-site__titre">Le tennis, toute l’année</span>
        <span className="mc-site__bouton">S’inscrire</span>
      </div>
      <div className="mc-site__cartes">
        {['Actualités', 'Agenda', 'École de tennis'].map((t) => (
          <div className="mc-site__carte" key={t}>
            <b>{t}</b>
            <i />
            <i />
          </div>
        ))}
      </div>
    </div>
  )
}

function Bureau() {
  return (
    <div className="mc mc-bureau">
      <div className="mc-bureau__lateral">
        {['Ma journée', 'Adhérents', 'Dossiers', 'École', 'Équipes', 'Paiements'].map((t, i) => (
          <span key={t} data-actif={i === 0 ? '1' : '0'}>
            {t}
          </span>
        ))}
      </div>
      <div className="mc-bureau__principal">
        <b className="mc-bureau__titre">Ma journée</b>
        <div className="mc-bureau__taches">
          <span data-etat="alerte">Pluie ce soir : 2 séances à reporter</span>
          <span data-etat="attente">Dossiers d’adhésion à valider</span>
          <span data-etat="ok">Paiements HelloAsso reçus</span>
          <span data-etat="attente">Convocation de l’équipe 1 à envoyer</span>
        </div>
        <div className="mc-bureau__tuiles">
          <span>
            <b>Adhérents</b>
            <i />
          </span>
          <span>
            <b>Séances</b>
            <i />
          </span>
          <span>
            <b>Classement</b>
            <i />
          </span>
        </div>
      </div>
    </div>
  )
}

export default function MaquetteClubs({ variante = 'duo' }: { variante?: 'duo' | 'site' | 'bureau' }) {
  return (
    <figure className="mcd" data-variante={variante}>
      <div className="mcd__scene" aria-hidden="true">
        {variante !== 'bureau' && (
          <div className="mcd__site">
            <Navigateur url="grandchelem-tc.fr" ratio="16 / 10">
              <Site />
            </Navigateur>
          </div>
        )}
        {variante !== 'site' && (
          <div className="mcd__bureau">
            <Navigateur url="bureau.grandchelem-tc.fr" ratio="16 / 10">
              <Bureau />
            </Navigateur>
          </div>
        )}
      </div>
      <figcaption className="su-mono mcd__legende">Aperçu illustratif · club fictif</figcaption>
    </figure>
  )
}
