export const meta = {
  slug: 'guide-accueil-client',
  titre: 'Guide d’accueil client',
  sousTitre: 'Comment se déroule votre projet, de l’appel de départ à la mise en ligne, et ce que nous attendons de vous à chaque étape.',
  description: 'Les étapes du projet expliquées simplement, ce que vous fournissez et quand, qui fait quoi, et comment joindre Mathéo.',
  groupe: 'commercial',
  revue: false,
}

export function corps(ctx) {
  const { prix, euros, s, e } = ctx
  return `
<div class="encart"><p><strong>L’idée en une phrase.</strong> Vous n’avez pas besoin de connaître le web. Vous nous parlez de votre activité, vous voyez votre futur site avant de vous engager, puis nous le fabriquons avec vous, étape par étape, et chaque décision est écrite.</p></div>

<h2>Le déroulé, étape par étape</h2>

<h3>1. L’appel découverte (30 minutes, gratuit)</h3>
<p>Un appel pour faire connaissance : qui vous êtes, ce que vous faites, ce que vous attendez d’un site ou d’un outil. Sans engagement. À la fin, nous savons si nous pouvons vous aider et vous savez comment la suite se passe.</p>

<h3>2. La démo de votre page d’accueil (${euros(prix.demo)})</h3>
<p>Nous réalisons la page d’accueil de votre futur site, à votre image, pour que vous jugiez sur pièce avant de décider. C’est une prestation à part, facturée ${euros(prix.demo)} et non remboursable.</p>

<h3>3. La visio de présentation et de conseil (1 h 30, ${euros(prix.visio)})</h3>
<p>Nous vous présentons la démo, nous échangeons sur vos besoins, nous vous conseillons et nous ajustons le projet ensemble. C’est une prestation à part, facturée ${euros(prix.visio)} et non remboursable.</p>

<h3>4. Le devis et la signature</h3>
<p>Nous écrivons un devis détaillé : ce qui est prévu, le prix exact, le <strong>délai indicatif</strong> et l’échéancier de paiement. Il est valable ${s.mentions.devisValable}. Le projet démarre à la signature du devis et au paiement de l’acompte de <strong>${prix.acompte} %</strong>. Le solde se règle à la livraison, en deux fois, ou en trois fois avec une part à la validation de la maquette. À partir de ${euros(prix.paiement4FoisDes)}, un paiement en quatre fois est possible.</p>

<h3>5. La maquette</h3>
<p>Nous dessinons le site avant de le programmer : l’organisation des pages, les couleurs, les images, la mise en page. Vous la regardez et vous nous dites ce qui vous plaît ou non. <strong>${prix.seriesIncluses} séries de retours complets</strong> sont incluses. Une série, c’est tous vos commentaires envoyés en une fois, de préférence dans un seul message.</p>

<h3>6. Le développement et les rendez-vous de finalisation</h3>
<p>Une fois la maquette validée par écrit, nous fabriquons le site. Pendant ce temps, <strong>${prix.rdvInclus} rendez-vous de finalisation</strong> sont inclus, en visio ou sur place, pour construire les derniers éléments avec vous.</p>

<h3>7. Les contenus</h3>
<p>Vos textes, vos photos et votre logo sont placés dans le site. Si vous préférez ne pas les écrire vous-même, des prestations de rédaction existent et figurent au devis. Ce sont les contenus qui demandent le plus de temps côté client : le tableau plus bas vous dit quoi préparer.</p>

<h3>8. La livraison par lien de prévisualisation</h3>
<p>Nous vous envoyons un lien privé pour parcourir le site terminé, sur ordinateur comme sur téléphone. Vous disposez de <strong>14 jours</strong> pour nous signaler par écrit les réserves éventuelles. Sans réserve écrite dans ce délai, la livraison est considérée comme acceptée et le solde est dû.</p>

<h3>9. La mise en ligne</h3>
<p>Après règlement du solde, nous publions le site à son adresse définitive et nous vérifions que tout fonctionne : formulaire, affichage mobile, pages principales.</p>

<h3>10. Le mois d’ajustements</h3>
<p>Pendant <strong>un mois</strong> après la mise en ligne, les petites modifications comprises dans ce qui était prévu au devis sont gratuites.</p>

<h3>11. L’abonnement (facultatif)</h3>
<p>Ensuite, vous pouvez choisir un abonnement mensuel qui couvre l’hébergement, la sécurité et la maintenance, avec des options à la carte. À partir de <strong>${euros(prix.abonnementMin)} par mois</strong>, <strong>sans engagement</strong>, avec un mois de préavis. Si vous arrêtez, vous gardez votre site et vos fichiers.</p>

<div class="encart"><p><strong>Le calendrier.</strong> Nous ne promettons pas de durée de livraison identique pour tous : chaque projet est différent. Le devis donne un <strong>délai indicatif</strong>. Ce délai est suspendu tant que vous ne nous avez pas fourni ce que nous attendons (contenus, informations, validations). C’est pourquoi vos réponses rapides comptent.</p></div>

<h2>Ce que vous nous fournissez, et quand</h2>
<table>
<tr><th>Quoi</th><th>Détail</th><th>Quand</th></tr>
<tr><td><strong>Votre présentation</strong></td><td>Votre activité, vos clients, ce qui vous distingue, ce que vous voulez que le site fasse (appels, demandes de devis, ventes).</td><td>À l’appel découverte</td></tr>
<tr><td><strong>Votre logo</strong></td><td>Le fichier d’origine si vous l’avez. À défaut, nous partons de ce que vous avez.</td><td>Avant la démo</td></tr>
<tr><td><strong>Vos photos</strong></td><td>Réalisations, atelier, équipe, locaux. Des photos nettes, prises par vous ou par un professionnel. Vous devez en détenir les droits.</td><td>Avant la maquette, au plus tard pendant le développement</td></tr>
<tr><td><strong>Vos textes</strong></td><td>Présentation, services, informations pratiques (adresse, horaires, zone d’intervention). Vous en garantissez l’exactitude et les droits.</td><td>Pendant le développement</td></tr>
<tr><td><strong>Vos retours sur la maquette</strong></td><td>Tous vos commentaires en une fois, par écrit.</td><td>À chaque série de retours</td></tr>
<tr><td><strong>Votre nom de domaine</strong></td><td>Si vous en avez déjà un : l’identifiant du compte ou l’accès chez votre bureau d’enregistrement, pour le faire pointer vers le nouveau site. Sinon, nous en réservons un avec vous.</td><td>Avant la mise en ligne</td></tr>
<tr><td><strong>Vos accès existants</strong></td><td>Ancien site, messagerie, comptes de réseaux sociaux ou outils à relier, si le projet les concerne.</td><td>Selon le projet, avant le développement</td></tr>
<tr><td><strong>Votre validation écrite</strong></td><td>Un e-mail suffit : « la maquette est validée », « le site est accepté ».</td><td>À chaque étape clé</td></tr>
</table>

<h2>Qui fait quoi</h2>
<table>
<tr><th>Stackup Agency</th><th>Vous</th></tr>
<tr><td>Vous écouter, cadrer le projet, vous conseiller</td><td>Expliquer votre activité et vos attentes</td></tr>
<tr><td>Écrire le devis et le délai indicatif</td><td>Relire, poser vos questions, signer et régler l’acompte</td></tr>
<tr><td>Concevoir la maquette et intégrer vos retours</td><td>Regarder la maquette et envoyer vos retours par écrit</td></tr>
<tr><td>Programmer le site et le tester</td><td>Fournir textes, photos et logo, en détenir les droits</td></tr>
<tr><td>Placer vos contenus et les mettre en forme</td><td>Vérifier que vos informations sont exactes</td></tr>
<tr><td>Livrer le lien de prévisualisation et corriger les réserves</td><td>Parcourir le site et signaler vos réserves sous 14 jours</td></tr>
<tr><td>Mettre en ligne et vérifier</td><td>Régler le solde et nous donner l’accès au nom de domaine</td></tr>
<tr><td>Assurer le mois d’ajustements</td><td>Regrouper vos demandes de petites modifications</td></tr>
</table>

<h2>Les bons réflexes</h2>
<ul>
<li><strong>Répondez vite.</strong> Le délai indicatif est suspendu tant que nous attendons un contenu ou une validation. Un projet ne prend du retard que lorsqu’il attend.</li>
<li><strong>Validez tout par écrit.</strong> Un e-mail suffit. Cela protège vos choix comme les nôtres et évite les malentendus.</li>
<li><strong>Regroupez vos retours.</strong> Une série de retours complète vaut mieux que dix petits messages : elle compte comme une seule des ${prix.seriesIncluses} séries incluses.</li>
<li><strong>Préparez vos contenus tôt.</strong> Photos et textes sont ce qui prend le plus de temps à réunir.</li>
<li><strong>Dites-nous si quelque chose vous inquiète.</strong> Un doute exprimé tôt se règle en quelques minutes.</li>
</ul>
<p class="petit">Ce qui dépasse le devis (rendez-vous ou modifications en plus des ${prix.rdvInclus} rendez-vous et des ${prix.seriesIncluses} séries incluses) est facturé ${euros(prix.heure)} l’heure, après votre accord écrit.</p>

<h2>Joindre Mathéo</h2>
<p>${e.exploitant} est votre seul interlocuteur, de la première question à la maintenance.</p>
<ul>
<li>Téléphone : <strong>${s.telephone}</strong></li>
<li>E-mail : <strong>${s.email}</strong></li>
<li>Site : ${s.url}</li>
<li>Adresse : ${e.adresse}</li>
</ul>
<p>Pour toute décision ou modification, l’e-mail reste le meilleur moyen : il laisse une trace des deux côtés. Le téléphone est parfait pour une question rapide.</p>`
}
