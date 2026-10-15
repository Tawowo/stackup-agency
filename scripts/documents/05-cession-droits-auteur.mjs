export const meta = {
  slug: 'cession-droits-auteur',
  titre: 'Acte de cession de droits d’auteur',
  sousTitre: 'Le document qui fait de vous le propriétaire du code et du design créés pour votre projet, une fois le devis payé en totalité.',
  description: 'Modèle d’acte de cession des droits d’auteur sur le site ou l’outil réalisé : œuvres cédées, droits, étendue, exclusions, portfolio, garanties.',
  groupe: 'contractuel',
  revue: true,
}

export function corps(ctx) {
  const { e, s } = ctx
  return `
<div class="encart"><p><strong>En deux phrases.</strong> Le droit d’auteur protège automatiquement ce qui a été créé (un code, un design, un dessin). Tant qu’il n’est pas cédé par écrit, il reste à son auteur : cet acte écrit transfère à votre entreprise les droits dont vous avez besoin pour utiliser, modifier et faire évoluer votre site ou votre outil comme vous l’entendez.</p></div>

<h2>Entre les soussignés</h2>
<div class="cartes">
<div class="carte"><h3>Le cédant (l’auteur)</h3><p><strong>${e.identite}</strong><br>${e.forme}, représenté par ${e.exploitant}<br>${e.adresse}<br>SIRET : ${e.siret}<br>${s.email}</p></div>
<div class="carte"><h3>Le cessionnaire (le client)</h3>
<p class="ligne-champ">Nom ou raison sociale : <span class="champ"></span></p>
<p class="ligne-champ">Représenté par : <span class="champ"></span></p>
<p class="ligne-champ">Adresse : <span class="champ"></span></p>
<p class="ligne-champ">SIRET (si professionnel) : <span class="champ"></span></p></div>
</div>
<p>Cet acte se rattache au devis n° <span class="champ"></span> du <span class="champ"></span>, signé par les deux parties (le « devis »).</p>

<h2>1. Les œuvres cédées</h2>
<p>Sont cédés, au titre de la réalisation décrite au devis :</p>
<ul>
<li>le <strong>code source</strong> écrit spécialement pour votre projet (pages, composants, styles, scripts, modules de l’outil de gestion) ;</li>
<li>le <strong>design</strong> : maquettes, mise en page, interface, animations et effets conçus pour votre projet ;</li>
<li>les <strong>éléments graphiques créés pour le projet</strong> : illustrations, icônes, visuels et déclinaisons du logo réalisés pour vous par ${e.exploitant}.</li>
</ul>
<p>Ensemble : les « œuvres cédées ».</p>

<h2>2. Les droits cédés</h2>
<p>Le cédant cède au cessionnaire, à titre <strong>exclusif</strong>, les droits patrimoniaux suivants (le Code de la propriété intellectuelle, art. L.131-3, demande de les citer un par un) :</p>
<div class="art"><table><tr><th>Droit</th><th>Ce que cela vous permet</th></tr>
<tr><td><strong>Reproduction</strong></td><td>Copier, enregistrer, sauvegarder, héberger et publier les œuvres sur tout support et chez tout hébergeur.</td></tr>
<tr><td><strong>Représentation</strong></td><td>Afficher et diffuser les œuvres au public, en ligne ou hors ligne (site, outil, supports de communication).</td></tr>
<tr><td><strong>Adaptation</strong></td><td>Modifier, corriger, traduire, compléter et faire évoluer les œuvres, ou les confier à un autre prestataire pour le faire.</td></tr></table></div>

<h2>3. Étendue de la cession</h2>
<ul>
<li><strong>Territoire</strong> : le monde entier.</li>
<li><strong>Durée</strong> : toute la durée légale de protection des droits de propriété intellectuelle, y compris ses prolongations éventuelles.</li>
<li><strong>Destination</strong> : tous usages liés à l’activité du cessionnaire, commerciaux ou non.</li>
</ul>
<p class="petit">Le droit moral de l’auteur (être reconnu comme tel, protéger l’intégrité de l’œuvre) ne peut pas être cédé : il reste attaché à ${e.exploitant}, sans gêner l’usage normal des œuvres par le cessionnaire.</p>

<h2>4. Le prix de la cession</h2>
<p>La cession est consentie en contrepartie du <strong>paiement complet du devis</strong> (acompte, échéances et solde). Elle est comprise dans ce prix : aucune somme supplémentaire n’est due pour elle.</p>
<div class="alerte"><p><strong>Elle ne prend effet qu’à la réception du dernier paiement.</strong> Jusqu’à ce moment, le cessionnaire dispose seulement d’un droit d’usage non exclusif, nécessaire à la prévisualisation, aux tests et à la validation du travail. Le cédant reste propriétaire des œuvres. Une fois le paiement complet reçu, le cédant le confirme par écrit et la cession est acquise sans autre formalité.</p></div>

<h2>5. Ce qui n’est pas cédé</h2>
<p>La cession ne couvre pas les éléments qui appartiennent à d’autres. Ils restent soumis à <strong>leur propre licence</strong>, que le cessionnaire s’engage à respecter :</p>
<ul>
<li>les <strong>composants tiers et logiciels libres</strong> intégrés au projet (frameworks, bibliothèques, modules), sous leurs licences respectives ;</li>
<li>les <strong>polices de caractères</strong> utilisées, sous leur licence d’origine ;</li>
<li>les <strong>banques d’images, d’icônes ou de sons</strong> et tout contenu sous licence : les droits d’usage sont ceux de la licence concernée, et non une propriété ;</li>
<li>les <strong>outils, méthodes et composants génériques</strong> que ${e.exploitant} avait créés avant le projet ou qu’il réutilise d’un projet à l’autre sans y inclure vos contenus : il en conserve la propriété et vous en accorde, pour votre projet, un droit d’usage non exclusif, pour la durée légale de protection ;</li>
<li>les <strong>services tiers</strong> (hébergement, nom de domaine, messagerie, paiement), régis par leurs propres conditions.</li>
</ul>

<h2>6. Portfolio et mention « Réalisé par »</h2>
<ul>
<li>Le cédant peut <strong>montrer la réalisation dans son portfolio</strong> (site, réseaux, supports commerciaux : captures, description du projet), sauf refus écrit du client, qu’il peut exprimer à tout moment. Aucun contenu confidentiel ni donnée personnelle n’est alors montré.</li>
<li>Le site peut porter une discrète mention « <strong>Réalisé par ${e.identite}</strong> ». Le client peut la <strong>faire retirer gratuitement</strong>, sur simple demande écrite à ${s.email}.</li>
</ul>

<h2>7. Garanties</h2>
<ul>
<li><strong>Du cédant</strong> : il garantit, dans la mesure de ce qu’on peut raisonnablement vérifier, que les œuvres créées pour le projet sont <strong>originales</strong> et qu’il ne les a pas copiées sur l’œuvre d’autrui. Il garantit disposer des droits nécessaires pour les céder.</li>
<li><strong>Du client</strong> : les textes, photos, logos, marques et autres éléments qu’il fournit restent sous sa responsabilité. Le cédant <strong>ne garantit pas</strong> l’absence de droits de tiers sur ces éléments fournis par le client ; c’est au client de s’assurer qu’il peut les utiliser et nous les confier.</li>
<li>Le cédant ne peut pas garantir qu’aucun tiers ne revendiquera jamais un droit sur un composant libre ou une licence dont les termes évoluent. Sa responsabilité reste limitée comme le prévoient les conditions générales de vente.</li>
</ul>

<h2>8. Divers</h2>
<p>Cet acte complète le devis et les conditions générales de vente. Toute modification doit être écrite et signée des deux parties. Le droit français s’applique. En cas de désaccord, les parties cherchent d’abord une solution amiable ; à défaut, le tribunal compétent est celui prévu par les conditions générales de vente.</p>

<p>Fait en deux exemplaires, à <span class="champ"></span>, le <span class="champ"></span>.</p>
<div class="sig"><div><b>Le cédant — ${e.identite}</b><span class="petit">Nom, date, mention « Lu et approuvé », signature</span></div><div><b>Le cessionnaire — le client</b><span class="petit">Nom, date, mention « Lu et approuvé », signature</span></div></div>`
}
