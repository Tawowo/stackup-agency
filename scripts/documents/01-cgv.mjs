export const meta = {
  slug: 'cgv',
  titre: 'Conditions générales de vente',
  sousTitre: 'Les règles qui s’appliquent à la création de votre site, de votre boutique ou de votre outil de gestion : ce qui est inclus, comment on paie, à qui appartient le travail.',
  description: 'Devis, acompte et échéanciers, rendez-vous et modifications, livraison, propriété du code, rétractation, médiation : les conditions de toute commande de création.',
  groupe: 'legal',
  revue: true,
}

export function corps(ctx) {
  const { e, s, prix, euros } = ctx
  const part = prix.solde / 2
  return `
<div class="encart"><p><strong>L’essentiel.</strong> Le devis écrit fixe le prix exact et le périmètre. ${prix.acompte} % à la signature, le reste à la livraison. ${prix.rdvInclus} rendez-vous et ${prix.seriesIncluses} séries de modifications sur la maquette sont inclus, puis un mois d’ajustements après la mise en ligne. Une fois tout payé, le code et le design du site vous appartiennent. Les mots techniques sont expliqués au fil du texte.</p></div>

<div class="art"><h2>1. Objet et champ d’application</h2>
<p>Ces conditions générales de vente (« CGV ») s’appliquent à toute commande de création passée à ${e.identite} : sites internet, boutiques en ligne, outils de gestion sur mesure et prestations associées. L’abonnement d’hébergement et de maintenance, facultatif, fait l’objet de conditions séparées (« Conditions de l’abonnement »).</p>
<p>Le « client » est la personne ou la structure qui commande. Il peut être un <strong>consommateur</strong> (un particulier qui agit hors de son activité professionnelle) ou un <strong>professionnel</strong> (artisan, commerçant, société, association…). Quelques articles ne concernent que l’un des deux ; le texte le précise. Les CGV applicables sont celles en vigueur à la signature du devis. Elles prévalent sur les conditions d’achat du client.</p></div>

<div class="art"><h2>2. Identité du prestataire</h2>
<table>
<tr><td><strong>Prestataire</strong></td><td>${e.identite}, ${e.forme}</td></tr>
<tr><td><strong>Titulaire</strong></td><td>${e.exploitant}</td></tr>
<tr><td><strong>Adresse</strong></td><td>${e.adresse}</td></tr>
<tr><td><strong>SIREN / SIRET</strong></td><td>${e.siren} / ${e.siret}</td></tr>
<tr><td><strong>Code APE</strong></td><td>${e.ape}</td></tr>
<tr><td><strong>Contact</strong></td><td>${s.email} · ${s.telephone}</td></tr>
<tr><td><strong>TVA</strong></td><td>${s.mentions.tva}</td></tr>
<tr><td><strong>Assurance</strong></td><td>Responsabilité civile professionnelle : ${e.assurance}</td></tr>
</table></div>

<div class="art"><h2>3. Devis et commande</h2>
<p>Tout projet commence par un appel de découverte gratuit, puis par un devis gratuit. Le devis décrit les prestations, le prix, l’échéancier de paiement et un délai indicatif (article 7). Il est valable ${s.mentions.devisValable}.</p>
<p>La commande est <strong>ferme</strong> lorsque vous avez signé le devis (ou confirmé votre accord par e-mail en citant sa référence) <strong>et</strong> que l’acompte a été encaissé. Le travail ne démarre qu’à ce moment-là. Tout ce qui n’est pas écrit au devis (page ou fonctionnalité en plus, par exemple) fait l’objet d’un avenant écrit, accepté par les deux parties avant d’être réalisé.</p></div>

<div class="art"><h2>4. Démo de la page d’accueil et visio de conseil</h2>
<p>Avant de signer, vous pouvez commander deux prestations facultatives, facturées à part :</p>
<ul>
<li><strong>la démo de votre future page d’accueil</strong>, ${euros(prix.demo)} : une page d’accueil réalisée à votre image, pour juger sur pièce ;</li>
<li><strong>la visio de présentation et de conseil</strong> (1 h 30), ${euros(prix.visio)} : présentation de la démo, échange sur vos besoins, conseils, ajustement du projet.</li></ul>
<p>Ces deux prestations sont payables à la commande et <strong>non remboursables</strong>, y compris si vous ne donnez pas suite. Si vous ne signez pas de devis, la démo reste la propriété de ${e.identite} ; elle ne peut être publiée ni réutilisée sans son accord.</p></div>

<div class="art"><h2>5. Prix et paiement</h2>
<p>Les prix sont en euros et nets : ${s.mentions.tva}. Les prix affichés sur le site et dans les documents commerciaux sont toujours des prix « à partir de » : le prix exact est celui du devis signé. À titre d’information, les points de départ actuels sont :</p>
<table><tr><th>Offre</th><th class="d">À partir de</th></tr>
<tr><td>Site d’une page</td><td class="d">${euros(prix.offres['une-page'])}</td></tr>
<tr><td>Site de plusieurs pages</td><td class="d">${euros(prix.offres['multi-pages'])}</td></tr>
<tr><td>Boutique en ligne</td><td class="d">${euros(prix.offres.boutique)}</td></tr>
<tr><td>Outil de gestion sur mesure</td><td class="d">${euros(prix.offres.outil)}</td></tr></table>
<h3>Échéancier</h3>
<ul>
<li><strong>En deux fois :</strong> ${prix.acompte} % du montant du devis à la signature, ${prix.solde} % (le solde) à la livraison.</li>
<li><strong>En trois fois :</strong> ${prix.acompte} % à la signature, ${part} % à la validation de la maquette, ${part} % à la livraison.</li>
<li><strong>En quatre fois :</strong> possible pour les projets à partir de ${euros(prix.paiement4FoisDes)}, selon l’échéancier écrit au devis.</li></ul>
<p>Le mode de règlement (virement, carte ou autre moyen indiqué au devis) et l’échéancier retenu figurent au devis. Chaque facture est payable à réception, sauf date d’échéance différente indiquée sur le devis ou la facture. L’acompte est dû à la signature et conditionne le démarrage du travail.</p></div>

<div class="art"><h2>6. Rendez-vous et modifications inclus</h2>
<ul>
<li><strong>${prix.rdvInclus} rendez-vous de finalisation</strong> (en visio ou sur place) sont inclus dans le devis. Chaque rendez-vous supplémentaire est facturé ${euros(prix.heure)} de l’heure.</li>
<li><strong>${prix.seriesIncluses} séries de modifications sur la maquette</strong> sont incluses avant le développement final. Une série est une demande groupée de retours (textes, couleurs, images, mise en page) dans la limite du design validé. Ajouter une page ou une fonctionnalité n’est pas une modification : c’est un avenant (article 3).</li>
<li>Au-delà, le temps supplémentaire est facturé ${euros(prix.heure)} de l’heure. Il est toujours annoncé avant d’être réalisé.</li></ul></div>

<div class="art"><h2>7. Calendrier</h2>
<p>Le devis indique un <strong>délai indicatif</strong>. Ce n’est pas un engagement de livraison à date fixe. Le délai court à partir de la signature du devis, du paiement de l’acompte et de la réception des éléments nécessaires. Il est <strong>suspendu</strong> tant que vous n’avez pas fourni ce qui est attendu de vous (contenus, informations, accès) ou donné une validation demandée. Si une date se décale, ${e.identite} vous en informe par écrit et propose une nouvelle échéance.</p></div>

<div class="art"><h2>8. Contenus fournis par le client</h2>
<p>Vous fournissez les textes, photos, logos, vidéos et informations dont le projet a besoin, dans un format exploitable. Vous garantissez qu’ils sont exacts et que vous détenez les droits pour les utiliser et les publier. ${e.identite} n’est pas responsable des conséquences de contenus dont vous n’auriez pas les droits. Les mentions légales, la politique de confidentialité et, pour une boutique, les conditions de vente de votre propre activité restent de votre responsabilité ; ${e.identite} vous aide à les mettre en place mais ne se substitue pas à un conseil juridique.</p></div>

<div class="art"><h2>9. Livraison et réception</h2>
<p>La livraison se fait par un <strong>lien de prévisualisation</strong> envoyé par e-mail : vous y voyez le site tel qu’il sera mis en ligne. Vous disposez de <strong>14 jours</strong> à compter de cet envoi pour signaler par écrit (e-mail suffisant) les points qui ne correspondent pas au devis. ${e.identite} les corrige dans un délai raisonnable.</p>
<p>La réception est prononcée : soit par la signature du procès-verbal de livraison, avec ou sans réserve ; soit <strong>tacitement</strong> si aucune réserve écrite n’est reçue dans les 14 jours. Dans les deux cas, le solde devient exigible.</p></div>

<div class="art"><h2>10. Mois d’ajustements après la mise en ligne</h2>
<p>Pendant <strong>un mois</strong> à partir de la mise en ligne, les petites modifications comprises dans le périmètre du devis sont gratuites, et les anomalies imputables à ${e.identite} sont corrigées sans frais. Une demande nouvelle (page ou fonctionnalité en plus) n’en fait pas partie. Passé ce mois, l’abonnement ou un devis prend le relais.</p></div>

<div class="art"><h2>11. Propriété intellectuelle et cession des droits</h2>
<p>Le droit d’auteur protège le code et le design créés pour vous. Une <strong>cession</strong> est le transfert de ces droits.</p>
<ul>
<li>À <strong>paiement complet</strong> du prix, ${e.identite} vous cède les droits d’exploitation du code et du design réalisés pour votre projet : vous pouvez les utiliser, les modifier, les faire évoluer ou les héberger ailleurs. Avant le paiement complet, vous disposez seulement d’un droit d’usage provisoire à des fins de validation.</li>
<li>Les <strong>éléments de tiers</strong> (bibliothèques libres, polices, images ou extensions sous licence) restent soumis à leur licence propre, que vous acceptez.</li>
<li>${e.identite} conserve ses savoir-faire, outils et composants génériques, qu’il peut réutiliser pour d’autres projets.</li></ul>
<p>Un acte de cession détaillé peut vous être remis sur demande.</p></div>

<div class="art"><h2>12. Portfolio et mention « Réalisé par »</h2>
<p>${e.identite} peut présenter la réalisation dans son portfolio et sur ses supports (captures, description, lien), <strong>sauf refus écrit de votre part</strong>, que vous pouvez exprimer à la signature du devis ou plus tard. Une mention « Réalisé par Stackup » peut figurer en pied de page du site ; vous pouvez demander son retrait à tout moment, <strong>gratuitement</strong>.</p></div>

<div class="art"><h2>13. Référencement : aucun résultat garanti</h2>
<p>Un site bien construit aide à être trouvé, mais personne ne maîtrise les moteurs de recherche. ${e.identite} ne garantit <strong>aucun positionnement sur Google</strong> ni aucune <strong>citation par les assistants d’intelligence artificielle</strong>, ni un nombre de visites, de contacts ou de ventes. Ces résultats dépendent de la concurrence, du temps et de décisions de tiers.</p></div>

<div class="art"><h2>14. Responsabilité</h2>
<p>${e.identite} s’engage à réaliser une prestation conforme au devis, avec le soin d’un professionnel. Sa responsabilité est <strong>limitée au montant du devis</strong> concerné, sauf faute lourde ou dolosive, et dans les limites permises par la loi (elle ne peut notamment pas être limitée en cas de dommage corporel). Elle ne couvre pas les dommages indirects (perte de chiffre d’affaires, de clientèle ou de données due à votre propre usage).</p>
<p>${e.identite} n’est pas responsable des <strong>services de tiers</strong> (hébergeur, messagerie, prestataire de paiement, annuaire, réseau social, outils externes), ni d’une modification du site faite par vous ou par un tiers après la livraison. Il est couvert par une assurance de responsabilité civile professionnelle (coordonnées à l’article 2).</p></div>

<div class="art"><h2>15. Force majeure</h2>
<p>Aucune des parties n’est responsable d’un retard ou d’un manquement causé par un événement de force majeure au sens de l’article 1218 du Code civil (événement imprévisible et irrésistible : panne générale des réseaux, catastrophe naturelle, grève, décision administrative, maladie grave…). Les obligations sont suspendues pendant l’événement ; si celui-ci dure plus de deux mois, chaque partie peut résilier la commande par écrit, et le travail déjà réalisé reste dû.</p></div>

<div class="art"><h2>16. Nom de domaine et hébergement</h2>
<p>Le nom de domaine est <strong>offert la première année</strong>. Ensuite, il est inclus dans l’abonnement. Sans abonnement, son renouvellement, comme celui de l’hébergement, est à votre charge, au tarif du prestataire technique. Les conditions de l’abonnement sont décrites dans le document « Conditions de l’abonnement ».</p></div>

<div class="art"><h2>17. Données personnelles</h2>
<p>Les données que vous collectez par votre site (clients, visiteurs, commandes) sont celles de votre activité : <strong>vous en êtes le responsable de traitement</strong> au sens du RGPD. Lorsque ${e.identite} accède à ces données pour vous (hébergement, maintenance, outil de gestion), il agit comme <strong>sous-traitant</strong> (article 28 du RGPD) : il ne les traite que sur vos instructions, en assure la sécurité et la confidentialité, ne les réutilise pas, vous aide à répondre aux demandes de vos personnes concernées et vous les restitue ou les supprime en fin de mission. Un accord de sous-traitance des données est disponible parmi nos documents. Pour ses propres échanges avec vous, ${e.identite} est responsable de traitement ; voir la politique de confidentialité sur ${s.url}.</p></div>

<div class="art"><h2>18. Droit de rétractation (consommateur et petit professionnel)</h2>
<p>Si le contrat est conclu à distance ou hors établissement (par exemple par e-mail, par visio ou à votre domicile), vous disposez de <strong>14 jours</strong> à compter de la signature du devis pour vous rétracter, sans motif (articles L.221-18 et suivants du Code de la consommation). Ce droit s’applique aux consommateurs, et, pour un contrat conclu hors établissement, aussi au professionnel employant cinq salariés au plus lorsque le contrat n’entre pas dans le champ principal de son activité (article L.221-3).</p>
<p>Pour vous rétracter, envoyez-nous le <strong>formulaire type de rétractation</strong> (disponible sur ${s.url}, rubrique des documents, et joint au devis) ou toute déclaration claire à ${s.email}.</p>
<ul>
<li>Si vous demandez expressément que la prestation commence avant la fin des 14 jours, vous devez le faire par écrit sur le devis. Si vous vous rétractez ensuite, vous payez la part du travail déjà fourni jusqu’à votre demande, au prorata du devis (article L.221-25).</li>
<li>Si la prestation est entièrement exécutée avant la fin du délai, avec votre accord préalable exprès et votre renonciation à ce droit, vous ne pouvez plus vous rétracter (article L.221-28).</li></ul></div>

<div class="art"><h2>19. Retard de paiement (clients professionnels)</h2>
<p>Toute somme non payée à son échéance entraîne de plein droit, dès le lendemain, des <strong>pénalités de retard</strong> au taux égal à trois fois le taux d’intérêt légal, ainsi que l’<strong>indemnité forfaitaire pour frais de recouvrement de ${ctx.euros(ctx.prix.indemniteRecouvrement)}</strong> (articles L.441-10 et D.441-5 du Code de commerce), sans qu’un rappel soit nécessaire. Si les frais réels de recouvrement dépassent ce forfait, un complément peut être demandé sur justificatifs. En cas d’impayé, ${e.identite} peut suspendre ses travaux et la mise en ligne jusqu’au règlement.</p></div>

<div class="art"><h2>20. Médiation de la consommation</h2>
<p>En cas de litige avec un consommateur, contactez d’abord ${s.email} : nous cherchons une solution à l’amiable. À défaut, vous pouvez saisir gratuitement le médiateur de la consommation (articles L.612-1 et suivants du Code de la consommation) : ${e.mediateur}.</p></div>

<div class="art"><h2>21. Droit applicable et tribunaux compétents</h2>
<p>Les CGV et les devis sont soumis au <strong>droit français</strong>. Les parties cherchent d’abord une solution amiable. À défaut, le litige relève des tribunaux français compétents : pour un client consommateur, ceux de son domicile ou ceux du lieu d’exécution, à son choix ; pour un client professionnel, ceux du lieu du siège du prestataire (${e.adresse}).</p>
<p class="petit">Version ${ctx.doc.version} du ${ctx.doc.dateVersion}.</p></div>
`
}
