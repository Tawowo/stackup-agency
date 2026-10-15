export const meta = {
  slug: 'politique-confidentialite-cookies',
  titre: 'Politique de confidentialité et cookies',
  sousTitre: 'Quelles données le site stackup-agency.fr recueille, pourquoi, pendant combien de temps, et ce qu’il dépose (ou non) dans votre navigateur.',
  description: 'Politique de confidentialité (RGPD) et politique cookies du site : données du formulaire de contact, de l’estimateur et du parrainage, sous-traitants techniques, droits, CNIL.',
  groupe: 'legal',
  revue: true,
}

export function corps(ctx) {
  const { e, s } = ctx
  return `
<div class="encart"><p><strong>L’essentiel.</strong> Le site ne recueille des données personnelles que lorsque vous nous écrivez (formulaire de contact, estimateur, parrainage). Il ne dépose <strong>aucun cookie</strong>, ne mesure pas l’audience, n’affiche pas de publicité et ne revend rien. Pas de bandeau à accepter : il n’y a rien à vous demander.</p></div>

<h2>Partie 1 — Politique de confidentialité</h2>

<h3>1. Qui est responsable de vos données</h3>
<p>Le responsable du traitement est <strong>${e.identite}</strong> (${e.forme}), ${e.adresse}, SIRET ${e.siret}. Contact pour toute question sur vos données : <a href="mailto:${s.email}">${s.email}</a>. Le responsable du traitement est la personne qui décide pourquoi et comment vos données sont utilisées.</p>

<h3>2. Quelles données, pour quoi, sur quelle base</h3>
<p>Une donnée personnelle est toute information qui permet d’identifier une personne. La <strong>base légale</strong> est la raison que la loi reconnaît pour traiter vos données.</p>
<table><tr><th>Où</th><th>Données recueillies</th><th>Pourquoi</th><th>Base légale</th></tr>
<tr><td><strong>Formulaire de contact</strong></td><td>Prénom, nom, e-mail, objet et description du projet. Facultatifs : entreprise, métier, téléphone. Votre préférence de contact. Votre adresse IP, jointe au message reçu.</td><td>Répondre à votre message, préparer un devis, vous recontacter pour votre projet, vous envoyer un accusé de réception.</td><td>Mesures précontractuelles prises à votre demande (art. 6.1.b RGPD) et intérêt légitime à répondre aux demandes reçues (art. 6.1.f).</td></tr>
<tr><td><strong>Estimateur de prix</strong> (page tarifs)</td><td>Les options que vous composez. Elles restent dans l’adresse de la page et dans votre navigateur ; elles ne nous parviennent que si vous envoyez le formulaire de contact, qui les joint à votre message.</td><td>Vous montrer une fourchette « à partir de » et préparer votre devis.</td><td>Mesures précontractuelles (art. 6.1.b).</td></tr>
<tr><td><strong>Parrainage</strong></td><td>Nom et e-mail du parrain, nom et e-mail du filleul, message facultatif, confirmation par le parrain que le filleul accepte d’être contacté.</td><td>Traiter la recommandation et contacter le filleul.</td><td>Intérêt légitime (art. 6.1.f) ; accord du filleul confirmé par le parrain.</td></tr>
<tr><td><strong>Audit de site</strong> (outil gratuit)</td><td>L’adresse du site à mesurer. Aucune donnée vous concernant n’est demandée.</td><td>Lancer la mesure de vitesse et de qualité du site indiqué.</td><td>Intérêt légitime (art. 6.1.f).</td></tr></table>
<p>Le champ « site web » caché des formulaires sert uniquement à repérer les envois automatiques ; il n’est pas conservé. L’adresse IP sert aussi à limiter le nombre d’envois par période, afin d’empêcher les abus : ce compteur est tenu temporairement par le serveur. Aucune donnée bancaire n’est traitée sur ce site. Pour un parrainage, nous informons le filleul, dès notre premier message, de l’origine de ses données et de ses droits.</p>
<p>Les champs marqués comme obligatoires doivent être remplis pour que nous puissions vous répondre. Vous n’êtes jamais soumis à une décision automatisée, et ce site n’utilise aucune intelligence artificielle pour traiter vos messages.</p>

<h3>3. Combien de temps</h3>
<table><tr><th>Données</th><th>Durée proposée</th></tr>
<tr><td>Messages de contact et demandes de devis sans suite</td><td>3 ans maximum à compter de notre dernier échange</td></tr>
<tr><td>Demandes de parrainage sans suite</td><td>12 mois maximum</td></tr>
<tr><td>Si un contrat est signé</td><td>Pendant la durée du contrat, puis pendant les durées légales de conservation des pièces comptables et contractuelles</td></tr>
<tr><td>Journaux techniques de l’hébergeur (adresses IP, requêtes)</td><td>Selon l’hébergeur, pour la sécurité et le bon fonctionnement du service [durée à compléter après vérification]</td></tr></table>
<p>À l’issue de ces durées, les données sont supprimées ou anonymisées.</p>

<h3>4. Qui reçoit vos données</h3>
<p>Vos données sont traitées par ${e.exploitant}. Elles ne sont ni vendues ni cédées. Elles transitent par des <strong>sous-traitants techniques</strong>, qui n’agissent que sur nos instructions :</p>
<ul>
<li><strong>Vercel Inc.</strong> : hébergement du site et exécution du formulaire ;</li>
<li><strong>Resend</strong> : service d’envoi des e-mails du formulaire (le message qui nous est adressé et l’accusé de réception qui vous est envoyé) ;</li>
<li><strong>OVH SAS</strong> : messagerie professionnelle qui reçoit nos e-mails ;</li>
<li><strong>Google (PageSpeed Insights)</strong> : uniquement pour l’audit de site, à qui est transmise l’adresse du site à mesurer, depuis notre serveur.</li>
</ul>

<h3>5. Transferts hors de l’Union européenne</h3>
<p>Certains de ces prestataires sont des sociétés américaines ou peuvent faire traiter des données hors de l’Union européenne. Nous ne pouvons donc pas vous garantir que vos données restent en Europe. Quand un transfert a lieu, il doit être encadré par les garanties du chapitre V du RGPD (décision d’adéquation ou clauses contractuelles types de la Commission européenne) ; vous pouvez nous demander des précisions à ${s.email}.</p>

<h3>6. Vos droits</h3>
<p>Vous pouvez à tout moment :</p>
<ul>
<li>demander l’<strong>accès</strong> à vos données et en obtenir une copie ;</li>
<li>faire <strong>rectifier</strong> une information inexacte ;</li>
<li>demander l’<strong>effacement</strong> de vos données ;</li>
<li>vous <strong>opposer</strong> à leur utilisation, pour un motif tenant à votre situation ;</li>
<li>demander la <strong>limitation</strong> du traitement ;</li>
<li>demander la <strong>portabilité</strong> : recevoir vos données dans un format courant (ce droit s’applique aux données que vous nous avez fournies).</li>
</ul>
<p><strong>Comment faire.</strong> Écrivez à <a href="mailto:${s.email}">${s.email}</a> en précisant votre demande et l’adresse e-mail utilisée. Nous pouvons vous demander un justificatif d’identité en cas de doute. Nous répondons dans un délai d’un mois, prolongeable en cas de demande complexe, avec information de votre part.</p>
<p><strong>Réclamation.</strong> Si vous estimez que vos droits ne sont pas respectés, vous pouvez saisir la CNIL (Commission nationale de l’informatique et des libertés) , <a href="https://www.cnil.fr">cnil.fr</a>.</p>

<h2>Partie 2 — Politique cookies</h2>

<h3>Qu’est-ce qu’un cookie</h3>
<p>Un cookie est un petit fichier déposé sur votre appareil par un site, qui permet de se souvenir de votre visite. Les autres espaces de stockage du navigateur (stockage local ou de session) suivent les mêmes règles.</p>

<h3>Ce que ce site dépose</h3>
<table><tr><th>Type</th><th>Présent sur le site ?</th></tr>
<tr><td>Cookies de mesure d’audience ou statistiques</td><td><strong>Non</strong></td></tr>
<tr><td>Cookies publicitaires ou de ciblage</td><td><strong>Non</strong></td></tr>
<tr><td>Cookies de réseaux sociaux (boutons, intégrations)</td><td><strong>Non</strong> : les liens vers nos pages de réseaux sociaux sont de simples liens</td></tr>
<tr><td>Cookies de confort (thème, langue, consentement)</td><td><strong>Non</strong></td></tr>
<tr><td>Cookies techniques</td><td><strong>Aucun cookie</strong> n’est déposé par le site</td></tr></table>
<p>Une seule donnée technique peut être gardée dans le <strong>stockage de session</strong> de votre navigateur, sans lien avec votre identité : la clé <code>su-quality</code>, qui retient un niveau de qualité des animations seulement lorsque l’adresse de la page contient le paramètre <code>?quality=</code> (outil de réglage). Elle disparaît à la fermeture de l’onglet. Strictement nécessaire à l’affichage, elle ne demande pas de consentement.</p>
<p>Les polices de caractères sont servies par le site lui-même. Pour adapter les animations à la puissance de votre appareil, le navigateur peut interroger un réseau de diffusion de fichiers publics (unpkg.com) qui fournit une table de performances de cartes graphiques ; comme toute requête web, elle expose votre adresse IP à ce service, sans cookie ni identifiant.</p>

<h3>Gérer vos choix</h3>
<p>Comme le site ne dépose aucun cookie, il n’y a rien à accepter ni à refuser. Si vous le souhaitez, vous pouvez effacer les données de site, ou bloquer le stockage, dans votre navigateur :</p>
<ul>
<li><strong>Chrome</strong> : Paramètres, Confidentialité et sécurité, Cookies et autres données des sites ;</li>
<li><strong>Firefox</strong> : Paramètres, Vie privée et sécurité, Cookies et données de sites ;</li>
<li><strong>Safari</strong> : Réglages, Confidentialité, Gérer les données de sites web ;</li>
<li><strong>Edge</strong> : Paramètres, Cookies et autorisations de site.</li>
</ul>
<p>La navigation privée efface aussi ces données à la fermeture de la fenêtre. Pour toute question : <a href="mailto:${s.email}">${s.email}</a>.</p>

<p class="petit">Cette politique peut évoluer, par exemple si un service est ajouté au site. La version en vigueur est celle indiquée en pied de page ; en cas d’ajout d’un traceur soumis à consentement, un dispositif de recueil du consentement serait mis en place avant tout dépôt.</p>`
}
