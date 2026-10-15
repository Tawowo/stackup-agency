import { LIGNES } from '../../src/config/tarifs.generated.ts'

export const meta = {
  slug: 'conditions-abonnement',
  titre: 'Conditions de l’abonnement',
  sousTitre: 'Hébergement, sécurité, maintenance et suivi de votre site après la mise en ligne : ce qui est inclus, ce qui ne l’est pas, et comment arrêter quand vous voulez.',
  description: 'Abonnement facultatif et sans engagement : contenu, facturation, sauvegardes, nom de domaine, préavis d’un mois, et récupération de votre site et de vos fichiers.',
  groupe: 'contractuel',
  revue: true,
}

export function corps(ctx) {
  const { e, s, prix, euros } = ctx
  // Remise de paiement annuel : lue dans la grille (A19, stockée en fraction).
  const remise = Math.round((LIGNES.find((l) => l.code === 'A19')?.prix ?? 0) * 100)
  return `
<div class="encart"><p><strong>En bref.</strong> L’abonnement est <strong>facultatif</strong> et <strong>sans engagement</strong> : vous l’arrêtez avec un mois de préavis, et vous gardez votre site et vos fichiers. Il commence à partir de <strong>${euros(prix.abonnementMin)} par mois</strong> (prix « à partir de » ; le montant exact est composé selon votre site et écrit au devis).</p></div>

<div class="art"><h2>1. Objet</h2>
<p>Ces conditions décrivent l’abonnement proposé par ${e.identite} (le « prestataire ») après la mise en ligne d’un site, d’une boutique ou d’un outil de gestion. Elles complètent les conditions générales de vente. Elles s’appliquent à partir de la signature du devis ou de l’avenant qui mentionne l’abonnement.</p></div>

<div class="art"><h2>2. Ce que l’abonnement comprend</h2>
<p>L’abonnement se compose de briques choisies avec vous. Le devis liste celles qui s’appliquent à votre projet.</p>
<table><tr><th>Brique</th><th>Ce que cela veut dire</th></tr>
<tr><td><strong>Hébergement</strong></td><td>Serveur, nom de domaine (voir article 6), connexion sécurisée (https) et sauvegardes. Le prix dépend de la nature du projet (site, boutique, outil) et de sa taille.</td></tr>
<tr><td><strong>Sécurité et maintenance</strong></td><td>Mises à jour techniques, surveillance, correction des anomalies, petites retouches. Pour une boutique : vérification des paiements, des commandes et des e-mails. Pour un outil : suivi de la base de données et des modules.</td></tr>
<tr><td><strong>Options à la carte</strong></td><td>Publications ou articles rédigés à partir de vos informations, suivi du référencement et de la visibilité, suivi de la fiche Google Business, rapport mensuel, heures de modifications réservées chaque mois. Elles figurent au devis si vous les choisissez.</td></tr></table></div>

<div class="art"><h2>3. Ce que l’abonnement ne comprend pas</h2>
<ul>
<li>Les <strong>nouvelles pages, fonctionnalités ou refontes</strong> : elles font l’objet d’un devis ou d’un avenant, ou sont prises sur vos heures de modifications si vous en avez réservé.</li>
<li>Les heures de travail au-delà de ce qui est inclus : elles sont facturées ${euros(prix.heure)} de l’heure, annoncées avant d’être réalisées.</li>
<li>La <strong>rédaction de vos contenus</strong> (textes, photos) en dehors des options choisies, et les mentions légales de votre propre activité.</li>
<li>Les <strong>services de tiers</strong> que vous utilisez en plus (messagerie professionnelle, prestataire de paiement, outils externes, extensions payantes) : leurs tarifs et leur disponibilité dépendent de leurs éditeurs.</li>
<li>Les dommages causés par une modification faite par vous ou par un tiers sans l’accord du prestataire, ou par un contenu que vous avez fourni.</li>
<li>Aucun résultat de référencement, de visites ou de ventes n’est garanti, même avec les options de suivi : elles décrivent un travail, pas un classement.</li></ul></div>

<div class="art"><h2>4. Demandes et délais d’intervention</h2>
<p>Vous écrivez à ${s.email}. Le prestataire accuse réception et traite les demandes en jours ouvrés. Les délais sont <strong>indicatifs</strong> : il s’agit d’un engagement de moyens, pas d’un délai garanti. Le prestataire indique, en réponse à votre demande, un délai estimé selon sa nature :</p>
<ul>
<li><strong>site inaccessible ou panne grave</strong> : traité en priorité, dès que la demande est lue ;</li>
<li><strong>anomalie gênante</strong> (formulaire, paiement, page cassée) : traitée avant les modifications courantes ;</li>
<li><strong>modification ou question courante</strong> : traitée dans l’ordre d’arrivée.</li></ul>
<p>Une intervention peut dépendre d’un tiers (hébergeur, prestataire de paiement) ou d’une information que vous devez fournir ; le délai est alors suspendu.</p></div>

<div class="art"><h2>5. Sauvegardes et sécurité</h2>
<p>Des sauvegardes régulières sont réalisées pour pouvoir restaurer votre site en cas de problème. Leur fréquence et leur durée de conservation sont indiquées au devis. Les accès sont protégés et réservés aux personnes qui en ont besoin. Aucun système n’est infaillible : le prestataire met en œuvre les moyens raisonnables pour limiter les risques, sans garantir une disponibilité de 100 %. Des interruptions courtes pour maintenance ou liées à l’hébergeur peuvent survenir. Pour les données personnelles, les règles de l’article 17 des conditions générales de vente (accord de sous-traitance) s’appliquent.</p></div>

<div class="art"><h2>6. Nom de domaine</h2>
<p>Le nom de domaine est <strong>offert la première année</strong>, puis <strong>inclus dans l’abonnement</strong>. Il est enregistré à votre nom ou, à défaut, transféré à votre nom à votre demande. Si vous n’avez pas d’abonnement, son renouvellement, comme celui de l’hébergement, est à votre charge, au tarif du prestataire technique ; pensez à le renouveler avant la date d’expiration pour ne pas perdre votre adresse.</p></div>

<div class="art"><h2>7. Prix, facturation et paiement</h2>
<ul>
<li>L’abonnement est facturé <strong>chaque mois</strong>, ou <strong>chaque année</strong> en une fois avec une remise de ${remise} % sur le total si vous choisissez cette formule.</li>
<li>Les prix sont nets (${s.mentions.tva}). Le prix de départ de l’abonnement est de ${euros(prix.abonnementMin)} par mois ; le montant exact est celui du devis.</li>
<li>Le prestataire peut modifier le prix ou le contenu de l’abonnement en vous prévenant par écrit au moins un mois à l’avance. Vous pouvez alors résilier sans frais avant l’entrée en vigueur du changement.</li>
<li>Les factures sont payables à réception, sauf échéance différente indiquée. Pour les clients professionnels, les pénalités de retard et l’indemnité forfaitaire de recouvrement de l’article 19 des conditions générales de vente s’appliquent.</li></ul></div>

<div class="art"><h2>8. Suspension en cas d’impayé</h2>
<p>Si une facture reste impayée après un rappel écrit resté sans effet pendant 15 jours, le prestataire peut suspendre l’abonnement : le site peut alors être mis hors ligne et les prestations s’interrompent. Le service reprend dès le règlement. Si l’impayé se prolonge, le prestataire peut résilier l’abonnement. Dans tous les cas, vos fichiers vous sont remis selon l’article 10, une fois les sommes dues réglées.</p></div>

<div class="art"><h2>9. Durée, sans engagement, préavis d’un mois</h2>
<p>L’abonnement est conclu <strong>sans durée minimale</strong>. Chacune des parties peut y mettre fin à tout moment, par écrit (un e-mail suffit), avec un <strong>préavis d’un mois</strong>. L’abonnement s’arrête à la fin du préavis ; le mois commencé reste dû, et en cas de paiement annuel, la part de l’année non écoulée est remboursée au prorata, sous déduction de la remise obtenue.</p></div>

<div class="art"><h2>10. Réversibilité : vous gardez votre site et vos fichiers</h2>
<p>À la fin de l’abonnement, vous gardez <strong>votre site et tous vos fichiers</strong>. Sur votre demande, et une fois les sommes dues réglées, le prestataire vous remet, sans frais ni rétention :</p>
<ul>
<li>le code du site et les fichiers (images, textes, documents) ;</li>
<li>pour une boutique ou un outil, un export de vos données dans un format lisible ;</li>
<li>les accès à l’hébergement et au nom de domaine, ou leur transfert vers le prestataire de votre choix ;</li>
<li>les informations utiles pour remettre le site en ligne ailleurs.</li></ul>
<p>La mise en place chez un nouvel hébergeur par le prestataire, si vous la demandez, est facturée à l’heure. Après la remise, le prestataire supprime les copies de vos données conservées pour l’abonnement, sauf obligation légale. Les droits sur le code et le design sont régis par l’article 11 des conditions générales de vente.</p></div>

<div class="art"><h2>11. Responsabilité et droit applicable</h2>
<p>La responsabilité du prestataire est limitée dans les conditions de l’article 14 des conditions générales de vente, et ne couvre pas les services de tiers. Le prestataire est couvert par une assurance de responsabilité civile professionnelle : ${e.assurance}. Pour le consommateur, la médiation de l’article 20 s’applique : ${e.mediateur}. Droit français ; tribunaux compétents selon l’article 21 des conditions générales de vente.</p></div>
`
}
