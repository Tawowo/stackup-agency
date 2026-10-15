export const meta = {
  slug: 'reglement-parrainage',
  titre: 'Règlement du parrainage',
  sousTitre: 'Quatre formules au choix du parrain, des règles claires, et ce que vous touchez quand vous nous recommandez.',
  description: 'Les quatre formules de parrainage, leurs conditions, un exemple chiffré et les règles générales du programme.',
  groupe: 'contractuel',
  revue: true,
}

export function corps(ctx) {
  const { p, euros, s, e, prix } = ctx
  const a = p.argent
  const c = p.credit
  const ab = p.abonnement
  const pa = p.partage
  const f = p.fidelite

  // Exemple (calculé, jamais écrit à la main) : une création de plusieurs pages avec options, soit trois fois le prix de départ.
  const exemple = prix.offres['multi-pages'] * 3
  const gainArgent = Math.min(a.maximum, Math.max(a.minimum, Math.round((exemple * a.pourcent) / 100)))
  const gainCredit = Math.round((exemple * c.pourcent) / 100)
  const moisOfferts = exemple > ab.seuil2 ? ab.mois2 : exemple > ab.seuil1 ? ab.mois1 : 0
  const gainPartage = Math.round((exemple * pa.parrainPourcent) / 100)
  const remisePartage = Math.round((exemple * pa.filleulPourcent) / 100)
  const nette = exemple - remisePartage

  return `
<div class="encart"><p><strong>En bref.</strong> Vous recommandez ${e.identite} à une personne qui devient cliente : vous êtes remercié. Vous choisissez la formule qui vous convient, parmi quatre. Le programme est proposé par ${e.identite}, ${e.adresse}.</p></div>

<h2>Les quatre formules</h2>
<div class="cartes">
<div class="carte"><h3>1. Récompense en argent</h3><p><strong>${a.pourcent} %</strong> de la création signée par votre filleul, de <strong>${euros(a.minimum)}</strong> à <strong>${euros(a.maximum)}</strong>. Ouverte à tous, clients ou non.</p></div>
<div class="carte"><h3>2. Crédit Stackup</h3><p><strong>${c.pourcent} %</strong> du projet de votre filleul en crédit sur vos propres prestations, valable <strong>${c.moisValidite} mois</strong>.</p></div>
<div class="carte"><h3>3. Mois d’abonnement offerts</h3><p><strong>${ab.mois1} mois</strong> si la création dépasse ${euros(ab.seuil1)}, <strong>${ab.mois2} mois</strong> au-delà de ${euros(ab.seuil2)}. Réservée aux parrains abonnés.</p></div>
<div class="carte"><h3>4. Partage</h3><p><strong>${pa.parrainPourcent} %</strong> pour vous et <strong>${pa.filleulPourcent} %</strong> de remise pour votre filleul sur sa création.</p></div>
</div>
<p><strong>Bonus de fidélité.</strong> Au ${f.filleuls}e filleul signé, ${f.cadeau}, au choix du parrain.</p>

<h2>Les règles à retenir</h2>
<div class="alerte">
<ul>
<li>Le parrain n’est rémunéré <strong>que lorsque le filleul a payé l’intégralité</strong> de sa création.</li>
<li>Le filleul doit être <strong>un nouveau client</strong> de ${e.identite}.</li>
<li><strong>Une seule formule par filleul</strong>, choisie par le parrain.</li>
<li>Les montants sont <strong>calculés hors abonnement</strong>, sur la création signée.</li>
<li>Le <strong>parrainage de soi-même</strong> n’est pas possible.</li>
</ul>
</div>

<h2>Comment parrainer</h2>
<div class="art">
<h3>Article 1. Déclarer un filleul</h3>
<p>Le parrain remplit le formulaire de la page « Parrainage » du site (${s.url}/parrainage) : ses coordonnées, celles du filleul et la formule choisie. Il peut aussi demander à son filleul de citer son nom lors du premier contact. Le parrainage n’est enregistré qu’une fois le formulaire reçu et confirmé par ${e.exploitant}.</p>
</div>
<div class="art">
<h3>Article 2. Choix de la formule</h3>
<p>La formule est choisie <strong>avant la signature du devis du filleul</strong>. Après la signature, elle ne peut plus être changée. À défaut de choix avant cette date, aucune formule ne s’applique tant que le parrain ne l’a pas indiquée par écrit et que ${e.exploitant} ne l’a pas acceptée.</p>
</div>

<h2>Le détail de chaque formule</h2>
<div class="art">
<h3>Article 3. Formule 1, récompense en argent</h3>
<p>Le parrain reçoit <strong>${a.pourcent} %</strong> du montant de la création signée par le filleul. La récompense ne peut pas être inférieure à <strong>${euros(a.minimum)}</strong> ni supérieure à <strong>${euros(a.maximum)}</strong>. Elle est versée par virement lorsque le filleul a payé l’intégralité de sa création. Cette formule est ouverte à toute personne, cliente ou non.</p>
</div>
<div class="art">
<h3>Article 4. Formule 2, Crédit Stackup</h3>
<p>Le parrain reçoit un crédit égal à <strong>${c.pourcent} %</strong> du montant de la création du filleul. Ce crédit s’utilise sur des prestations de ${e.identite} pour le parrain : pages, modules, évolutions. Il est valable <strong>${c.moisValidite} mois</strong> à compter du paiement intégral par le filleul. Il n’est ni remboursable ni échangeable contre de l’argent.</p>
</div>
<div class="art">
<h3>Article 5. Formule 3, mois d’abonnement offerts</h3>
<p>Cette formule est réservée aux parrains ayant un abonnement en cours. Si la création du filleul dépasse <strong>${euros(ab.seuil1)}</strong>, le parrain reçoit <strong>${ab.mois1} mois</strong> d’abonnement offerts. Si elle dépasse <strong>${euros(ab.seuil2)}</strong>, il en reçoit <strong>${ab.mois2}</strong>. Les mois offerts viennent en moins sur les échéances suivantes une fois la création payée en totalité. Ils ne sont pas échangeables contre de l’argent.</p>
</div>
<div class="art">
<h3>Article 6. Formule 4, partage</h3>
<p>Le parrain reçoit <strong>${pa.parrainPourcent} %</strong> du montant de la création du filleul, versés en argent après paiement intégral par le filleul, sans minimum ni maximum. Le filleul bénéficie d’une remise de <strong>${pa.filleulPourcent} %</strong> sur sa création, inscrite au devis.</p>
</div>
<div class="art">
<h3>Article 7. Bonus de fidélité</h3>
<p>Au <strong>${f.filleuls}e filleul signé</strong>, qui a payé l’intégralité de sa création, le parrain choisit une prestation offerte : ${f.cadeau}. Le bonus s’ajoute à la formule choisie pour ce filleul.</p>
</div>

<h2>Un exemple chiffré</h2>
<div class="encart"><p><strong>Exemple, à titre d’illustration uniquement.</strong> Votre filleul signe une création de <strong>${euros(exemple)}</strong> (un site de plusieurs pages avec des options). Ce n’est pas un tarif : le prix de chaque projet est fixé par son devis.</p></div>
<table><tr><th>Formule</th><th>Ce que touche le parrain</th></tr>
<tr><td>1. Récompense en argent</td><td>${a.pourcent} % de ${euros(exemple)}, dans la limite de ${euros(a.minimum)} à ${euros(a.maximum)} : <strong>${euros(gainArgent)}</strong></td></tr>
<tr><td>2. Crédit Stackup</td><td>${c.pourcent} % de ${euros(exemple)} : <strong>${euros(gainCredit)}</strong> de crédit, valable ${c.moisValidite} mois</td></tr>
<tr><td>3. Mois d’abonnement</td><td>${moisOfferts ? `La création dépasse ${euros(exemple > ab.seuil2 ? ab.seuil2 : ab.seuil1)} : <strong>${moisOfferts} mois</strong> offerts` : `La création ne dépasse pas ${euros(ab.seuil1)} : aucun mois offert`}</td></tr>
<tr><td>4. Partage</td><td>Le parrain reçoit <strong>${euros(gainPartage)}</strong> (${pa.parrainPourcent} %) ; le filleul bénéficie de <strong>${euros(remisePartage)}</strong> de remise (${pa.filleulPourcent} %) et règle ${euros(nette)}</td></tr></table>
<p class="petit">Une seule de ces formules s’applique à ce filleul. Les montants sont calculés hors abonnement.</p>

<h2>Dispositions générales</h2>
<div class="art">
<h3>Article 8. Fiscalité</h3>
<p>Le parrain, particulier ou professionnel, reste seul responsable de ses déclarations fiscales et sociales relatives aux sommes ou avantages reçus. ${e.identite} ne conseille pas sur ce point.</p>
</div>
<div class="art">
<h3>Article 9. Modification ou fin du programme</h3>
<p>${e.identite} peut modifier les conditions du programme ou y mettre fin. Les nouvelles conditions sont publiées sur ${s.url}/parrainage. <strong>Elles ne sont jamais rétroactives pour un filleul déjà signé</strong> : les conditions en vigueur à la signature de son devis continuent de s’appliquer.</p>
</div>
<div class="art">
<h3>Article 10. Données personnelles</h3>
<p>Les informations du filleul transmises par le parrain sont utilisées uniquement pour traiter la demande de parrainage et, si le filleul le souhaite, le contacter. Le parrain garantit qu’il a informé son filleul de cette transmission. Les droits d’accès, de rectification et de suppression sont décrits dans la politique de confidentialité (${s.url}/politique-confidentialite).</p>
</div>
<div class="art">
<h3>Article 11. Droit applicable et litiges</h3>
<p>Le présent règlement est soumis au droit français. En cas de difficulté, le parrain contacte d’abord ${e.exploitant} (${s.email}) pour rechercher une solution amiable. Si le parrain est un consommateur, il peut recourir gratuitement au médiateur de la consommation : ${e.mediateur}.</p>
</div>
<p class="petit">Contact : ${s.email} · ${s.telephone}.</p>`
}
