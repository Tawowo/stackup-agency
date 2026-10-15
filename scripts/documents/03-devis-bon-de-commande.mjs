export const meta = {
  slug: 'devis-bon-de-commande',
  titre: 'Modèle de devis et bon de commande',
  sousTitre: 'Le devis fixe le prix et le contenu ; le bon de commande lance le projet.',
  description: 'Modèle de devis (prestations, prix, échéancier, délai indicatif) et bon de commande à signer, avec renvoi aux conditions générales de vente et au droit de rétractation.',
  groupe: 'commercial',
  revue: true,
}

const lignes = (n) => Array.from({ length: n }, () => '<tr><td style="height:20px">&nbsp;</td><td class="d">&nbsp;</td><td class="d">&nbsp;</td><td class="d">&nbsp;</td></tr>').join('')

export function corps(ctx) {
  const { e, s, prix, euros } = ctx
  const part = prix.solde / 2
  return `
<div class="cartes">
<div class="carte"><h3>Le prestataire</h3>
<p><strong>${e.identite}</strong><br>${e.forme} · ${e.exploitant}<br>${e.adresse}<br>SIRET : ${e.siret}<br>${s.mentions.tva}<br>${s.email} · ${s.telephone}</p></div>
<div class="carte"><h3>Le client</h3>
<div class="ligne-champ">Nom ou raison sociale : <i class="champ"></i></div>
<div class="ligne-champ">Adresse : <i class="champ long"></i></div>
<div class="ligne-champ">E-mail : <i class="champ"></i> Tél. : <i class="champ" style="min-width:90px"></i></div>
<div class="ligne-champ">SIRET (si pro) : <i class="champ" style="min-width:110px"></i></div>
</div>
</div>
<p><strong>Devis n°</strong> <i class="champ" style="min-width:90px"></i> &nbsp; <strong>Date</strong> <i class="champ" style="min-width:90px"></i> &nbsp; <strong>Projet</strong> <i class="champ" style="min-width:150px"></i> &nbsp; <strong>Valable ${s.mentions.devisValable}</strong> à compter de sa date.</p>

<table><tr><th>Désignation</th><th class="d">Quantité</th><th class="d">Prix unitaire</th><th class="d">Total</th></tr>
${lignes(4)}
<tr><td><strong>Total net à payer</strong> <span class="petit">(${s.mentions.tva})</span></td><td class="d"></td><td class="d"></td><td class="d"><strong>&nbsp;</strong></td></tr></table>
<p class="petit">Seules les prestations écrites ci-dessus sont comprises ; toute demande en plus fait l’objet d’un avenant. ${prix.rdvInclus} rendez-vous et ${prix.seriesIncluses} séries de modifications sur la maquette sont inclus ; au-delà, ${euros(prix.heure)} de l’heure.</p>

<h3>Échéancier de paiement</h3>
<p class="cases"><span></span><strong>En deux fois</strong> : acompte de ${prix.acompte} % à la signature, soit <i class="champ" style="min-width:80px"></i> € ; solde de ${prix.solde} % à la livraison, soit <i class="champ" style="min-width:80px"></i> €.</p>
<p class="cases"><span></span><strong>En trois fois</strong> : ${prix.acompte} % à la signature (<i class="champ" style="min-width:70px"></i> €), ${part} % à la validation de la maquette (<i class="champ" style="min-width:70px"></i> €), ${part} % à la livraison (<i class="champ" style="min-width:70px"></i> €).</p>
<p class="cases"><span></span><strong>En quatre fois</strong> (projets à partir de ${euros(prix.paiement4FoisDes)}) : <i class="champ"></i></p>

<h3>Délai indicatif et règlement</h3>
<p class="petit" style="margin-bottom:3px">Mode de règlement : <i class="champ"></i></p>
<p><i class="champ long"></i> <span class="petit">Indicatif, sans garantie de date ; court à partir du devis signé, de l’acompte encaissé et des éléments reçus, et suspendu tant que vous n’avez pas fourni ce qui est attendu.</span></p>
<p class="cases"><span></span>Abonnement (facultatif) retenu, voir le document « Conditions de l’abonnement » : <i class="champ"></i> €/mois, à partir de ${euros(prix.abonnementMin)}.</p>

<div class="sautpage"></div>
<h2>Bon de commande</h2>
<p>Référence du devis : n° <i class="champ" style="min-width:110px"></i> du <i class="champ" style="min-width:110px"></i> &nbsp; Montant total net : <i class="champ" style="min-width:110px"></i> €</p>
<p>Client : <i class="champ long"></i></p>

<h3>Ce que je confirme</h3>
<p class="cases"><span></span>J’ai lu et j’accepte le devis ci-dessus, avec son échéancier de paiement.</p>
<p class="cases"><span></span>J’ai reçu et j’accepte les <strong>conditions générales de vente</strong> (version ${ctx.doc.version}), disponibles sur ${s.url} et jointes à ce devis. Elles prévalent sur mes propres conditions d’achat.</p>
<p class="cases"><span></span>J’ai bien noté que la commande est ferme à la signature du devis et à l’encaissement de l’acompte.</p>

<h3>Droit de rétractation (particuliers et petits professionnels)</h3>
<p>Si le contrat est conclu à distance ou hors établissement, vous disposez de <strong>14 jours</strong> pour vous rétracter sans motif, à compter de la signature (articles L.221-18 et L.221-3 du Code de la consommation). Le formulaire type de rétractation est joint au devis et disponible sur ${s.url}. Cochez si vous le souhaitez :</p>
<p class="cases"><span></span>Je demande expressément que la prestation commence <strong>avant la fin du délai de rétractation</strong>. Si je me rétracte, je paierai la part du travail déjà réalisé au prorata du devis.</p>
<p class="cases"><span></span>Je <strong>refuse</strong> que la réalisation soit présentée dans le portfolio de ${e.identite}. <em class="petit">(Sans case cochée, elle peut l’être ; la mention « Réalisé par Stackup » est retirable gratuitement sur simple demande.)</em></p>

<h3>Bon pour accord</h3>
<div class="sig">
<div><b>Le client</b>Nom : <i class="champ"></i><br>Fait à <i class="champ" style="min-width:90px"></i>, le <i class="champ" style="min-width:90px"></i><br>Mention manuscrite « Lu et approuvé, bon pour accord » et signature :</div>
<div><b>Le prestataire</b>${e.identite}<br>Fait à <i class="champ" style="min-width:90px"></i>, le <i class="champ" style="min-width:90px"></i><br>Signature :</div></div>

<h3>Acompte (réservé au prestataire)</h3>
<table><tr><th>Montant de l’acompte (${prix.acompte} %)</th><th>Mode de règlement</th><th>Date d’encaissement</th><th>Projet lancé le</th></tr>
<tr><td style="height:30px">&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr></table>
<p class="petit">Les prestations facultatives de démo (${euros(prix.demo)}) et de visio de conseil (${euros(prix.visio)}) sont facturées à part et non remboursables.</p>
`
}
