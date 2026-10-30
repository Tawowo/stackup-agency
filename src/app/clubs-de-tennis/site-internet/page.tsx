import PageFormule from '@/gabarits/clubs/PageFormule'
import { CLUBS } from '@/config/offre-clubs'
import { metaClubs } from '@/lib/clubs'

const CHEMIN = `${CLUBS}/site-internet`
export const metadata = metaClubs({
  titre: 'Site internet de club de tennis, modifiable par le club',
  description: 'Un site haut de gamme aux couleurs du club, rapide sur téléphone, que les bénévoles mettent à jour seuls : adhésion en ligne, agenda, école de tennis, HelloAsso.',
  chemin: CHEMIN,
})

export default function Page() {
  return (
    <PageFormule
      formule="site"
      chemin={CHEMIN}
      etiquette="Formule site"
      titre="Site internet de club de tennis : aux couleurs du club, modifiable par vous"
      chapo="Un site haut de gamme, rapide sur téléphone, que les bénévoles mettent à jour seuls. L’adhésion en ligne et le paiement HelloAsso sont déjà branchés."
      intro="Le site est la première chose qu’une famille regarde quand elle cherche un club : les horaires, les tarifs, l’école de tennis, la façon de s’inscrire. Il doit donner envie, rester à jour sans effort, et se lire parfaitement sur un téléphone."
      pourquoi={[
        {
          titre: 'Un site qui donne envie, et qui s’affiche vite',
          paragraphes: [
            'Vous choisissez parmi deux ou trois thèmes haut de gamme, que nous habillons aux couleurs du club : logo, couleurs, typographies, animations, mode sombre. Ce n’est pas un modèle générique collé sur une page : le site ressemble à votre club.',
            'Il est pensé pour le téléphone d’abord, parce que c’est l’écran de la plupart des parents qui cherchent un club ou une séance. Les pages se chargent vite et restent lisibles en plein soleil comme dans un club-house sombre.',
          ],
        },
        {
          titre: 'Un site que le bureau met à jour seul',
          paragraphes: [
            'Beaucoup de sites de clubs vieillissent parce que personne n’ose y toucher : il faut « le demander à celui qui l’a fait ». Ici, un éditeur permet au club de modifier tous les textes, les images, les liens, les menus et les documents, et de créer de nouvelles pages sans limite.',
            'Vous n’avez pas besoin de connaissances techniques : on modifie le texte comme on le ferait dans un courrier. Les heures d’accompagnement de votre catégorie servent à prendre l’éditeur en main avec le bureau.',
          ],
        },
        {
          titre: 'Un site qui sert vraiment',
          paragraphes: [
            'Le formulaire d’adhésion en ligne accepte les pièces jointes, et le bouton de paiement HelloAsso est prêt. L’agenda peut être abonné depuis un téléphone, la galerie respecte le droit à l’image, et un bandeau d’information urgent permet de prévenir en un instant d’une fermeture des courts.',
            'Si le club propose du padel ou du pickleball, ces sections ont leur place dans le site. Côté référencement, la base est incluse : le club est trouvé quand on tape son nom. Aucune position sur Google ne peut être promise ; pour aller plus loin, deux options de référencement local et régional existent.',
          ],
        },
      ]}
      faq={[
        { q: 'Pouvons-nous garder le nom de domaine de notre club ?', a: 'Le nom de domaine est compris dans l’abonnement. Si le club en possède déjà un, nous le précisons ensemble lors du premier échange pour que les adresses que vos membres connaissent continuent de fonctionner.' },
        { q: 'Peut-on modifier le site sans connaissances techniques ?', a: 'Oui. L’éditeur permet de changer les textes, les images, les liens, les menus et les documents, et de créer de nouvelles pages sans limite. Les heures d’accompagnement de votre catégorie servent à le prendre en main avec le bureau.' },
        { q: 'Combien de pages comprend le site ?', a: 'Jusqu’à 15 pages sont créées à la mise en place, les pages légales étant incluses en plus. Au-delà, chaque page que nous créons est une option à {{club:opt-page-supplementaire-mep}} € par page ; le club peut aussi les créer lui-même, sans limite, avec l’éditeur.' },
        { q: 'Reprenez-vous le contenu de notre ancien site ?', a: 'Oui, en option : {{club:opt-reprise-contenu-mep}} € par page pour reprendre les textes et les images, et {{club:opt-redaction-page-mep}} € par page si vous souhaitez que nous rédigions la page à partir de vos informations. Ces prix sont indicatifs.' },
        { q: 'Le site sera-t-il bien placé sur Google ?', a: 'Le référencement de base est inclus : le club est trouvé quand on tape son nom. Nous ne promettons aucune position. Pour être trouvé dans la commune ou dans tout le département, deux options existent : le référencement local et le référencement régional.' },
        { q: 'Que devient le site si nous arrêtons l’abonnement ?', a: 'Vous recevez l’export complet de vos données, le site reste en ligne un mois après la fin du contrat. Une copie autonome du site, qui fonctionne sans la plateforme, est possible en option à {{club:opt-copie-autonome-mep}} €.' },
      ]}
    />
  )
}
