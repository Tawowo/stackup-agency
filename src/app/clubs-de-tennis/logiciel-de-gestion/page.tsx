import PageFormule from '@/gabarits/clubs/PageFormule'
import { CLUBS } from '@/config/offre-clubs'
import { metaClubs } from '@/lib/clubs'

const CHEMIN = `${CLUBS}/logiciel-de-gestion`
export const metadata = metaClubs({
  titre: 'Logiciel de gestion de club de tennis pour le bureau',
  description: 'Adhérents, familles, dossiers, paiements HelloAsso, école de tennis, équipes, tournois, bénévoles : le logiciel du bureau, accessible sur téléphone et simple à prendre en main.',
  chemin: CHEMIN,
})

export default function Page() {
  return (
    <PageFormule
      formule="logiciel"
      chemin={CHEMIN}
      etiquette="Formule logiciel"
      titre="Logiciel de gestion de club de tennis : le poste de pilotage du bureau"
      chapo="Adhérents, familles, dossiers, paiements, école de tennis, équipes, tournois : un seul outil, accessible à chaque bénévole selon son rôle, et utilisable sur téléphone."
      intro="Un bureau de bénévoles n’a pas le temps d’apprendre un logiciel compliqué. Celui-ci est construit autour de ce que le bureau fait vraiment, jour après jour, et commence chaque matin par une page : « Ma journée »."
      pourquoi={[
        {
          titre: 'Ma journée : ce qui demande une action aujourd’hui',
          paragraphes: [
            'Chaque membre du bureau ouvre le logiciel sur une page qui lui dit ce qu’il doit faire aujourd’hui : un dossier d’adhésion à valider, une séance à reporter, une convocation à envoyer, un paiement à contrôler. Moins d’oublis, moins de messages « tu as vu que… ? ».',
            'Des automatisations prêtes à l’emploi s’occupent des relances les plus fréquentes, pour que les bénévoles gardent leur énergie pour ce qui compte : faire jouer les adhérents.',
          ],
        },
        {
          titre: 'Des droits pour chaque rôle',
          paragraphes: [
            'Le président, le trésorier, le secrétaire, l’enseignant, le capitaine ou un bénévole n’ont pas besoin de voir les mêmes choses. Chacun reçoit les droits qui correspondent à son rôle : le trésorier voit les paiements, l’enseignant ses groupes, le capitaine ses équipes.',
            'Un journal garde la trace de qui a fait quoi, utile le jour où une question se pose sur un dossier ou un paiement. Les comptes du bureau et des enseignants sont illimités.',
          ],
        },
        {
          titre: 'ADOC reste la référence fédérale, nous nous occupons du reste',
          paragraphes: [
            'ADOC et Ten’Up sont des services de la Fédération française de tennis : ils restent le point de passage pour les licences. Le logiciel permet l’import et l’export des fichiers ADOC, et contrôle les licences manquantes pour que le bureau voie d’un coup d’œil qui joue sans licence à jour.',
            'Aucune connexion directe n’existe avec ADOC : les échanges passent par des fichiers que le club exporte et importe lui-même. C’est volontairement simple, et honnête sur ce qui est fait.',
          ],
        },
      ]}
      faq={[
        { q: 'Le logiciel remplace-t-il ADOC ?', a: 'Non. ADOC et Ten’Up restent les services de référence pour les licences et les démarches fédérales. Le logiciel permet d’importer et d’exporter les fichiers ADOC et s’occupe de la vie du club autour : adhésions, paiements, école de tennis, équipes, communication.' },
        { q: 'Faut-il installer un programme sur nos ordinateurs ?', a: 'Non. Le logiciel fonctionne dans le navigateur, sur ordinateur comme sur téléphone. L’espace membre et parent peut en plus être installé comme une application sur l’écran d’accueil du téléphone.' },
        { q: 'Combien de personnes du bureau peuvent l’utiliser ?', a: 'Les comptes du bureau et des enseignants sont illimités, et les membres aussi dans la limite de la catégorie. Chacun reçoit des droits qui correspondent à son rôle, et un journal garde la trace des actions.' },
        { q: 'Comment reprenez-vous nos adhérents actuels ?', a: 'Par import depuis une source : un export ADOC ou un tableur. Une source supplémentaire est possible en option à {{club:opt-import-source-mep}} €. Une reprise depuis un autre logiciel se chiffre sur devis.' },
        { q: 'Peut-on encaisser les cotisations avec le logiciel ?', a: 'Oui, via HelloAsso : le suivi des paiements est automatique et l’argent va directement sur le compte du club, jamais chez nous. HelloAsso est gratuit pour le club ; avec un autre prestataire de paiement, les frais sont à la charge du club.' },
        { q: 'Et si nous voulons une fonction qui n’existe pas ?', a: 'Un développement propre à un seul club est possible : il est chiffré avant, à {{club:dev-heure}} € de l’heure. Une fonction absente des formules et des options passe en devis sur mesure.' },
      ]}
    />
  )
}
