export const meta = {
  slug: 'pv-livraison',
  titre: 'Procès-verbal de livraison',
  sousTitre: 'Le document qui constate que votre projet est livré, note les éventuelles réserves et déclenche le solde et le mois d’ajustements.',
  description: 'Procès-verbal à signer à la livraison : éléments remis, conformité, réserves sous 14 jours, réception avec ou sans réserve, et conséquences.',
  groupe: 'contractuel',
  revue: true,
}

export function corps(ctx) {
  const { e, s, prix, euros } = ctx
  const c = (t) => `<p class="cases" style="margin:3px 0"><span></span>${t}</p>`
  return `
<h2>1. Le projet</h2>
<div class="ligne-champ">Client : <i class="champ long"></i> &nbsp; Devis n° <i class="champ" style="min-width:80px"></i> du <i class="champ" style="min-width:80px"></i></div>
<div class="ligne-champ">Projet livré : <i class="champ long"></i> &nbsp; Montant du devis : <i class="champ" style="min-width:80px"></i> €</div>
<div class="ligne-champ">Prestataire : ${e.identite} (SIRET ${e.siret})</div>

<h2>2. Ce qui est livré</h2>
${c('Le site, la boutique ou l’outil, accessible à l’adresse ou par le <strong>lien de prévisualisation</strong> ci-dessous')}
${c('Les accès (administration, hébergement, nom de domaine) et leurs identifiants')}
${c('Le code source et les fichiers du projet (images, polices, documents)')}
${c('Les documents : devis signé, conditions générales de vente, mentions légales et politique de confidentialité mises en place')}
${c('Les consignes d’utilisation ou la remise en main de l’outil')}
${c('Autre : <i class="champ long"></i>')}
<div class="ligne-champ">Lien de prévisualisation : <i class="champ long"></i> &nbsp; Envoyé le <i class="champ" style="min-width:90px"></i></div>

<h2>3. Constat de conformité</h2>
<p>Le client a pu parcourir le projet livré. Il constate qu’il correspond, pour l’essentiel, au contenu écrit dans le devis et à la maquette validée.</p>
${c('Le projet <strong>est conforme</strong> au devis.')}
${c('Le projet est conforme <strong>sous réserve</strong> des points listés ci-dessous.')}

<h2>4. Réserves éventuelles</h2>
<p class="petit">Une réserve est un point qui ne correspond pas au devis. Elle doit être écrite. Le client dispose de <strong>14 jours</strong> à compter de l’envoi du lien de prévisualisation pour la signaler ; le prestataire la corrige ensuite dans un délai raisonnable. Les demandes nouvelles (page ou fonctionnalité en plus) ne sont pas des réserves.</p>
<div class="ligne-champ"><i class="champ" style="min-width:100%"></i></div>
<div class="ligne-champ"><i class="champ" style="min-width:100%"></i></div>
<div class="ligne-champ"><i class="champ" style="min-width:100%"></i></div>

<div class="art"><h2>5. Réception</h2>
${c('Le client <strong>reçoit le projet sans réserve</strong>.')}
${c('Le client <strong>reçoit le projet avec les réserves</strong> du point 4. La réception sera confirmée par écrit quand elles auront été levées.')}
<p class="petit">À défaut de réserve écrite dans les 14 jours suivant l’envoi du lien de prévisualisation, la réception est prononcée tacitement.</p></div>

<h2>6. Ce que cela entraîne</h2>
<ul>
<li><strong>Solde exigible</strong> : le solde de la commande (${prix.solde} % du devis en deux fois, ou la dernière échéance prévue au devis) est dû à la réception.</li>
<li><strong>Mois d’ajustements</strong> : il court à partir de la mise en ligne. Pendant un mois, les petites modifications du périmètre prévu sont gratuites. Au-delà, ${euros(prix.heure)} de l’heure, annoncés avant d’être réalisés, ou l’abonnement si vous en avez un.</li>
<li><strong>Cession des droits</strong> : au paiement complet du prix, le client obtient les droits d’exploitation sur le code et le design (article 11 des conditions générales de vente). Les éléments de tiers restent sous leur licence.</li>
<li><strong>Portfolio</strong> : le prestataire peut présenter la réalisation, sauf refus écrit du client.</li></ul>

<div class="sig">
<div><b>Le client</b>Nom : <i class="champ"></i><br>Fait à <i class="champ" style="min-width:90px"></i>, le <i class="champ" style="min-width:90px"></i><br>Mention « Lu et approuvé » et signature :</div>
<div><b>Le prestataire</b>${e.identite}<br>Fait à <i class="champ" style="min-width:90px"></i>, le <i class="champ" style="min-width:90px"></i><br>Signature :</div></div>
`
}
