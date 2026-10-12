/**
 * LE VERDICT — ce qui reste de « la preuve par 3 ».
 *
 * L'ancienne section empilait trois onglets sous le titre « Pourquoi Stackup
 * Agency ? ». Deux des trois ne portaient rien qui ne soit déjà dit ailleurs,
 * et mieux :
 *
 *  - « Code → Site » montrait un bloc de JSX qui fondait en page web. C'est
 *    exactement la phrase du seuil (« une structure devient une interface »)
 *    et exactement la démonstration de l'anatomie, qui ouvre un vrai site en
 *    cinq couches. Trois fois le même propos, dont une version en vignette.
 *  - « 10 jours » déroulait une barre par jour, de J1 à J10. La méthode, plus
 *    bas, déroule le même processus en six étapes avec le contenu réel des
 *    échanges. Deux chronologies concurrentes sur une seule page : le lecteur
 *    doit choisir laquelle croire.
 *
 * Ne survit que le comparateur de prix, parce qu'il est le seul des trois à
 * produire une information que la page ne contient nulle part ailleurs : un
 * rapport, calculé sur des tarifs réels, avec sa fourchette de marché
 * déclarée en légende.
 *
 * Le cadre, lui, change. Le chiffre monumental du comparateur était enfermé
 * dans une carte blanche arrondie, sous une barre d'onglets et un sous-titre
 * répété — trois niveaux de chrome avant d'arriver au seul élément qui compte.
 * Ici il n'y a plus de carte : des filets, une annotation en chasse fixe, et
 * le chiffre.
 *
 * Aucune promesse nouvelle n'est introduite. Le cadrage reprend mot pour mot
 * la position déjà publiée sur la page « à propos ».
 */

import ComparateurPrix from '@/components/home/ComparateurPrix'

export default function Verdict() {
  return (
    <section id="pourquoi" className="su-verdict su-ambiance" aria-labelledby="su-verdict-titre">
      <div className="su-verdict__corps">
        <header className="su-verdict__entete">
          <p className="su-surtitre">07 — Le verdict</p>
          <h2 id="su-verdict-titre" className="su-verdict__titre">
            Le même cahier des charges.
            <br />
            <span className="su-verdict__accent">Deux factures.</span>
          </h2>
          <p className="su-verdict__chapo su-doux">
            Le prix bas n’est pas une concession sur la qualité : c’est le
            projet de l’agence. Choisissez un type de projet — les deux barres
            sont tracées à la même échelle, et la fourchette de marché est
            indiquée sous le graphique.
          </p>
        </header>

        <div className="su-verdict__mesure">
          {/* Pas de mention « TTC » ni « HT » : le site n'en porte aucune sur
              ces tarifs, et je n'en invente pas une ici. */}
          <span className="su-verdict__repere" aria-hidden="true">
            Les deux barres · une seule échelle
          </span>
          <ComparateurPrix />
        </div>
      </div>
    </section>
  )
}
