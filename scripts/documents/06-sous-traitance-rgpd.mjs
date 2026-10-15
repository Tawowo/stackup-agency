export const meta = {
  slug: 'sous-traitance-rgpd',
  titre: 'Accord de sous-traitance des données personnelles',
  sousTitre: 'À signer quand Stackup Agency accède aux données personnelles de vos clients, adhérents ou salariés pour votre site, votre boutique ou votre outil de gestion.',
  description: 'Accord au titre de l’article 28 du RGPD entre le client (responsable de traitement) et Stackup Agency (sous-traitant).',
  groupe: 'contractuel',
  revue: true,
}

export function corps(ctx) {
  const { e, s } = ctx
  return `
<div class="encart"><p><strong>À quoi sert ce document.</strong> Une donnée personnelle est toute information qui permet d’identifier une personne (nom, e-mail, adresse, commande…). Quand vous confiez ces données à un prestataire qui les manipule pour vous, le RGPD (règlement européen sur la protection des données) impose un contrat écrit : c’est cet accord (article 28). Le <strong>responsable de traitement</strong> décide pourquoi et comment les données sont utilisées : c’est vous. Le <strong>sous-traitant</strong> agit uniquement sur vos instructions : c’est ${e.identite}.</p></div>

<h2>Les parties</h2>
<div class="cartes">
<div class="carte"><h3>Le responsable de traitement (le client)</h3>
<p class="ligne-champ">Nom ou raison sociale : <span class="champ"></span></p>
<p class="ligne-champ">Représenté par : <span class="champ"></span></p>
<p class="ligne-champ">Adresse : <span class="champ"></span></p>
<p class="ligne-champ">SIRET : <span class="champ"></span></p></div>
<div class="carte"><h3>Le sous-traitant</h3><p><strong>${e.identite}</strong><br>${e.forme}, représenté par ${e.exploitant}<br>${e.adresse}<br>SIRET : ${e.siret}<br>Contact données : ${s.email}</p></div>
</div>
<p>Cet accord accompagne le devis n° <span class="champ"></span> du <span class="champ"></span> et les conditions générales de vente de ${e.identite}.</p>

<h2>1. Objet</h2>
<p>Le client confie au sous-traitant, pour la durée du contrat, le traitement de données personnelles dont il est responsable, uniquement dans la mesure nécessaire à la prestation décrite au devis : réalisation, mise en ligne, maintenance et évolution du site, de la boutique ou de l’outil de gestion du client. Cet accord ne s’applique que si le sous-traitant a effectivement accès à ces données.</p>

<h2>2. Nature et finalité du traitement</h2>
<p><strong>Nature des opérations</strong> (cochez) :</p>
<p class="cases"><span></span>Hébergement et stockage &nbsp; <span></span>Consultation et accès pour maintenance ou dépannage &nbsp; <span></span>Sauvegarde &nbsp; <span></span>Migration ou import de données &nbsp; <span></span>Modification, correction &nbsp; <span></span>Suppression &nbsp; <span></span>Autre : <span class="champ" style="min-width:120px"></span></p>
<p><strong>Finalité</strong> : permettre au client d’exploiter son site, sa boutique ou son outil (gestion de ses commandes, de ses clients, de ses rendez-vous, de ses adhérents…). Le sous-traitant n’utilise jamais ces données pour son propre compte.</p>

<h2>3. Données et personnes concernées</h2>
<table><tr><th>Catégories de données (cochez)</th><th>Catégories de personnes (cochez)</th></tr>
<tr><td class="cases"><span></span>Identité (nom, prénom)<br><span></span>Coordonnées (e-mail, téléphone, adresse)<br><span></span>Données de commande et de facturation<br><span></span>Données de connexion (compte, identifiants)<br><span></span>Contenu de messages ou de formulaires<br><span></span>Données de rendez-vous ou d’intervention<br><span></span>Autres : <span class="champ" style="min-width:120px"></span></td>
<td class="cases"><span></span>Clients et prospects du client<br><span></span>Visiteurs du site<br><span></span>Adhérents ou membres<br><span></span>Salariés ou collaborateurs du client<br><span></span>Fournisseurs et partenaires<br><span></span>Autres : <span class="champ" style="min-width:120px"></span></td></tr></table>
<p>Aucune <strong>donnée sensible</strong> (santé, opinions, origine, appartenance syndicale, vie sexuelle, données biométriques ou génétiques) ni donnée de condamnation n’est confiée au sous-traitant, sauf si le client l’indique ici et en convient au préalable par écrit avec lui : <span class="champ"></span></p>

<h2>4. Durée</h2>
<p>L’accord prend effet à sa signature et dure aussi longtemps que le sous-traitant a accès aux données du client (réalisation, puis abonnement de maintenance le cas échéant). Il prend fin avec le contrat, après la restitution ou la suppression des données (article 5.9).</p>

<h2>5. Obligations du sous-traitant</h2>
<div class="art"><h3>5.1 Instructions documentées</h3><p>Le sous-traitant ne traite les données que sur instruction écrite du client (le devis, cet accord, un e-mail du client). Il n’en tire aucun usage propre. S’il estime qu’une instruction viole le RGPD, il en informe aussitôt le client.</p></div>
<div class="art"><h3>5.2 Confidentialité</h3><p>Le sous-traitant garde les données confidentielles et s’interdit de les communiquer, sauf obligation légale ou accord du client. Toute personne autorisée à y accéder y est tenue.</p></div>
<div class="art"><h3>5.3 Sécurité</h3><p>Le sous-traitant met en œuvre des mesures adaptées aux risques (article 32 du RGPD) : accès par identifiants personnels, mots de passe robustes, communications chiffrées (HTTPS), accès limités au strict nécessaire, mises à jour de sécurité, sauvegardes lorsqu’elles font partie de la prestation. Il ne conserve pas de copie des données sur ses propres appareils, sauf nécessité du travail demandé, et seulement le temps utile.</p></div>
<div class="art"><h3>5.4 Sous-traitants ultérieurs</h3><p>Le sous-traitant peut faire appel à d’autres prestataires techniques (par exemple un hébergeur, un service d’envoi d’e-mails ou de paiement) pour réaliser la prestation. Le client donne une <strong>autorisation générale</strong>, à condition que le sous-traitant l’<strong>informe à l’avance</strong> de tout ajout ou remplacement, par écrit, en lui laissant la possibilité de s’y opposer pour un motif légitime. Il impose à chacun les mêmes obligations de protection que dans cet accord et reste responsable à l’égard du client de leur exécution. Les sous-traitants ultérieurs connus à la signature :</p>
<table><tr><th>Prestataire</th><th>Rôle</th><th>Lieu de traitement connu</th></tr>
<tr><td><span class="champ" style="min-width:110px"></span></td><td><span class="champ" style="min-width:110px"></span></td><td><span class="champ" style="min-width:110px"></span></td></tr>
<tr><td><span class="champ" style="min-width:110px"></span></td><td><span class="champ" style="min-width:110px"></span></td><td><span class="champ" style="min-width:110px"></span></td></tr></table>
<p class="petit">Si un prestataire traite des données hors de l’Union européenne, le sous-traitant s’assure que le transfert est encadré par les garanties prévues par le RGPD (chapitre V) et n’y recourt que sur instruction du client.</p></div>
<div class="art"><h3>5.5 Droits des personnes</h3><p>Les personnes concernées peuvent demander l’accès, la rectification, l’effacement, l’opposition, la limitation ou la portabilité de leurs données. Si l’une d’elles s’adresse au sous-traitant, il la renvoie vers le client et lui transmet la demande dans les meilleurs délais, sans y répondre lui-même. Il aide le client, par des moyens techniques adaptés, à répondre dans les délais légaux.</p></div>
<div class="art"><h3>5.6 Notification des violations de données</h3><p>Une violation de données est un incident qui détruit, perd, modifie ou divulgue des données par accident ou par malveillance (piratage, perte d’un appareil, envoi à la mauvaise personne). Le sous-traitant prévient le client par e-mail <strong>dans les meilleurs délais et, sauf impossibilité, dans les 48 heures</strong> après en avoir pris connaissance, avec les informations dont il dispose : nature de l’incident, données et personnes concernées, conséquences probables, mesures prises. Le client décide s’il doit notifier la CNIL (dans les 72 heures) et informer les personnes.</p></div>
<div class="art"><h3>5.7 Assistance</h3><p>Le sous-traitant aide le client, dans la limite de ses moyens et du périmètre de la prestation, à respecter ses obligations de sécurité, d’analyse d’impact et de consultation préalable de la CNIL lorsqu’elles s’imposent.</p></div>
<div class="art"><h3>5.8 Registre</h3><p>Le sous-traitant tient un registre des traitements qu’il effectue pour le compte du client (article 30.2 du RGPD) et le tient à la disposition de la CNIL.</p></div>
<div class="art"><h3>5.9 Sort des données en fin de contrat</h3><p>À la fin du contrat, au choix du client (cochez), le sous-traitant :</p>
<p class="cases"><span></span>restitue les données dans un format courant et lisible, puis les supprime de ses systèmes ; &nbsp; <span></span>les supprime sans restitution (le client les a déjà récupérées).</p>
<p>La suppression est confirmée par écrit sur demande, sauf si la loi impose de conserver certaines données. Les sauvegardes sont effacées selon leur cycle normal de renouvellement.</p></div>
<div class="art"><h3>5.10 Audits</h3><p>Le sous-traitant met à la disposition du client les informations nécessaires pour démontrer le respect de cet accord. Le client peut réaliser, ou faire réaliser par un auditeur tenu au secret, un contrôle, avec un préavis raisonnable, pendant les heures ouvrables, sans perturber l’activité du sous-traitant et à ses propres frais, pas plus d’une fois par an sauf incident avéré.</p></div>

<h2>6. Obligations du client (responsable de traitement)</h2>
<ul>
<li>Il s’assure que le traitement est licite : base légale, information des personnes, durées de conservation, registre de ses propres traitements.</li>
<li>Il fournit au sous-traitant uniquement les données nécessaires et lui donne des instructions claires.</li>
<li>Il répond aux demandes des personnes et décide des suites à donner en cas de violation de données.</li>
<li>Il prévient le sous-traitant de tout changement qui modifie le traitement (nouvelles catégories de données, nouveaux usages).</li>
</ul>

<h2>7. Responsabilité et droit applicable</h2>
<p>Entre les parties, la responsabilité de chacun reste régie par le devis et les conditions générales de vente, dans les limites permises par la loi : cet accord ne limite en rien les droits des personnes concernées. Le droit français s’applique. Pour toute question sur cet accord : ${s.email}.</p>

<p>Fait en deux exemplaires, à <span class="champ"></span>, le <span class="champ"></span>.</p>
<div class="sig"><div><b>Le responsable de traitement — le client</b><span class="petit">Nom, qualité, date, signature</span></div><div><b>Le sous-traitant — ${e.identite}</b><span class="petit">Nom, qualité, date, signature</span></div></div>`
}
