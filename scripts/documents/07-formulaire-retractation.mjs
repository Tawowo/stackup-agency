export const meta = {
  slug: 'formulaire-retractation',
  titre: 'Formulaire de rétractation',
  sousTitre: 'Pour renoncer à un contrat signé hors établissement ou à distance, dans les 14 jours.',
  description: 'Note d’information sur le droit de rétractation et modèle officiel de formulaire (annexe de l’article R.221-1 du Code de la consommation).',
  groupe: 'legal',
  revue: true,
}

export function corps(ctx) {
  const { e, s } = ctx
  return `
<div class="encart">
<p><strong>Votre droit en bref.</strong></p>
<ul>
<li><strong>Délai</strong> : 14 jours à compter de la signature du contrat de prestation de services, sans avoir à vous justifier.</li>
<li><strong>Qui peut se rétracter</strong> : tout particulier (consommateur) qui a signé le contrat à distance ou hors établissement (chez lui, par exemple). Un professionnel le peut aussi, pour un contrat signé <em>hors établissement</em>, si son objet sort de son activité principale et s’il emploie 5 salariés au plus (art. L.221-3).</li>
<li><strong>Si la prestation a commencé pendant ces 14 jours</strong>, à votre demande expresse, vous payez la part déjà réalisée, proportionnelle à l’ensemble de la prestation prévue (art. L.221-25). Cette demande se fait par écrit (e-mail ou papier).</li>
<li><strong>Remboursement</strong> : les sommes versées en trop vous sont remboursées sous 14 jours après réception de votre décision, par le même moyen de paiement.</li>
</ul></div>

<h3>Comment l’envoyer</h3>
<p>Remplissez le formulaire ci-dessous et renvoyez-le avant la fin des 14 jours, <strong>par e-mail à ${s.email}</strong> ou <strong>par courrier à ${e.identite}, ${e.adresse}</strong>. Le formulaire est facultatif : toute déclaration claire suffit. Conservez une preuve de l’envoi.</p>

<div style="border:1.5px solid var(--navy);padding:10px 14px;margin-top:8px;break-inside:avoid;line-height:1.35">
<p class="petit" style="margin-bottom:8px"><strong>Modèle de formulaire de rétractation</strong> — à compléter et renvoyer uniquement si vous souhaitez vous rétracter du contrat.</p>
<p>À l’attention de <strong>${e.identite}, ${e.adresse}, ${s.email}</strong> :</p>
<p>Je/Nous (*) vous notifie/notifions (*) par la présente ma/notre (*) rétractation du contrat portant sur la vente du bien (*)/pour la prestation de services (*) ci-dessous :</p>
<p class="ligne-champ" style="margin:5px 0"><span class="champ long" style="min-width:100%"></span></p>
<p class="ligne-champ" style="margin:5px 0">Commandé le (*)/reçu le (*) : <span class="champ"></span></p>
<p class="ligne-champ" style="margin:5px 0">Nom du (des) consommateur(s) : <span class="champ long"></span></p>
<p class="ligne-champ" style="margin:5px 0">Adresse du (des) consommateur(s) : <span class="champ long"></span></p>
<p class="ligne-champ" style="margin:5px 0">Signature du (des) consommateur(s) (uniquement en cas de notification du présent formulaire sur papier) : <span class="champ long"></span></p>
<p class="ligne-champ" style="margin:5px 0">Date : <span class="champ"></span></p>
<p class="petit" style="margin-top:8px">(*) Rayez la mention inutile.</p>
</div>`
}
