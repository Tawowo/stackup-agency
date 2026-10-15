export const meta = {
  slug: 'grille-tarifaire',
  titre: 'Grille tarifaire',
  sousTitre: 'Ce que coûtent un site, une boutique et un outil de gestion : des prix « à partir de », pour se repérer avant le devis.',
  description: 'Les prix de départ de chaque offre et de chaque option, calculés à partir de notre grille. Le devis écrit fixe le montant exact.',
  groupe: 'commercial',
  revue: false,
}

const tableau = (ctx, famille, titreCol = 'Prestation') => {
  const lignes = ctx.lignes(famille).filter((l) => l.des > 0)
  if (!lignes.length) return ''
  return `<table><tr><th>${titreCol}</th><th>Ce que cela comprend</th><th class="d">À partir de</th></tr>${lignes
    .map((l) => `<tr><td><strong>${l.libelle}</strong></td><td>${(l.description || '').replace(/\s*:\s*[A-Z]{1,2}\d{1,2}\b/g, '')}</td><td class="d">${ctx.euros(l.des)}${l.unite && !/forfait|inclus|module/i.test(l.unite) ? `<br><span class="petit">${l.unite}</span>` : ''}</td></tr>`)
    .join('')}</table>`
}

export function corps(ctx) {
  const { prix, euros } = ctx
  const f = prix.fourchettes
  const groupesOutil = [...new Set(ctx.lignes('outil').filter((l) => l.code !== 'O00').map((l) => l.groupe))]
  return `
<div class="encart"><p><strong>Comment lire cette grille.</strong> Tous les prix sont des prix « à partir de », nets : ${ctx.s.mentions.tva}. Le prix exact de votre projet est écrit dans un devis, après un appel et, si vous le souhaitez, la démo de votre page d’accueil. Un devis est valable ${ctx.s.mentions.devisValable}.</p></div>

<h2>Les quatre points de départ</h2>
<table><tr><th>Offre</th><th class="d">À partir de</th><th class="d">Fourchette indicative</th></tr>
<tr><td><strong>Site d’une page</strong><br><span class="petit">Accueil sur mesure, formulaire de contact, adaptation mobile, mise en ligne.</span></td><td class="d">${euros(prix.offres['une-page'])}</td><td class="d">${euros(f['une-page'].bas)} – ${euros(f['une-page'].haut)}</td></tr>
<tr><td><strong>Site de plusieurs pages</strong><br><span class="petit">Page d’accueil et plusieurs pages. Les pages au-delà de la ${prix.pleinTarifJusqua}e sont moins chères.</span></td><td class="d">${euros(prix.offres['multi-pages'])}</td><td class="d">${euros(f['multi-pages'].bas)} – ${euros(f['multi-pages'].haut)}</td></tr>
<tr><td><strong>Boutique en ligne</strong><br><span class="petit">Site, panier, paiement par carte, comptes clients, e-mails de commande.</span></td><td class="d">${euros(prix.offres.boutique)}</td><td class="d">${euros(f.boutique.bas)} – ${euros(f.boutique.haut)}</td></tr>
<tr><td><strong>Outil de gestion sur mesure</strong><br><span class="petit">Le socle de l’outil et un premier module. Les autres modules s’ajoutent.</span></td><td class="d">${euros(prix.offres.outil)}</td><td class="d">${euros(f.outil.bas)} – ${euros(f.outil.haut)}</td></tr></table>
<p class="petit">Les fourchettes encadrent le prix d’une configuration minimale ; elles s’élargissent avec les options choisies. Les montants réels se calculent avec l’estimateur en ligne (stackup-agency.fr/tarifs).</p>

<h2>L’allure du site</h2>
<table><tr><th>Niveau</th><th>Ce que cela veut dire</th><th class="d">Page d’accueil à partir de</th><th class="d">Autre page à partir de</th></tr>
${ctx.niveaux.map((n) => `<tr><td><strong>${n.id}</strong></td><td>${n.description}</td><td class="d">${euros(n.accueil)}</td><td class="d">${euros(n.page)}</td></tr>`).join('')}</table>

<h2>Être trouvé sur Google et dans les assistants IA</h2>
<table><tr><th>Niveau</th><th>Objectif</th></tr>
${ctx.portees.map((p) => `<tr><td><strong>${p.id}</strong></td><td>${p.objectif}</td></tr>`).join('')}
${ctx.iaNiveaux.map((p) => `<tr><td><strong>IA — ${p.id}</strong></td><td>${p.objectif}</td></tr>`).join('')}</table>
<p class="petit">Aucun positionnement sur Google et aucune citation par une intelligence artificielle ne peuvent être garantis : ils dépendent de la concurrence, du temps et des moteurs.</p>

<h2>Fonctionnalités du site</h2>
${tableau(ctx, 'fonctionnalite', 'Fonctionnalité')}
<h2>Effets sur mesure</h2>
${tableau(ctx, 'effet', 'Effet')}
<h2>Textes et contenus</h2>
${tableau(ctx, 'contenu', 'Contenu')}
<h2>Boutique en ligne : options</h2>
${tableau(ctx, 'boutique', 'Option')}

<h2>Outil de gestion : les modules</h2>
<p>Le socle de l’outil comprend la connexion sécurisée, la base de données, un tableau de bord et l’export de vos données. Chaque module s’ajoute selon vos besoins.</p>
${groupesOutil
  .map((g) => {
    const l = ctx.lignes('outil').filter((x) => x.groupe === g && x.code !== 'O00')
    return `<h3>${g.replace(/^MODULES\s*—\s*/i, '').replace(/^./, (c) => c.toUpperCase()).toLowerCase().replace(/^./, (c) => c.toUpperCase())}</h3><table><tr><th>Module</th><th>Ce qu’il fait</th><th class="d">À partir de</th></tr>${l
      .map((x) => `<tr><td><strong>${x.libelle}</strong></td><td>${x.description || ''}</td><td class="d">${euros(x.des)}</td></tr>`)
      .join('')}</table>`
  })
  .join('')}
${tableau(ctx, 'outil-option', 'Option de l’outil')}

<h2>Avant et pendant le projet</h2>
<table><tr><th>Étape</th><th>Ce que cela comprend</th><th class="d">Prix</th></tr>
<tr><td><strong>Appel découverte (30 min)</strong></td><td>Comprendre votre activité et ce que vous attendez.</td><td class="d">Gratuit</td></tr>
<tr><td><strong>Démo de votre page d’accueil</strong></td><td>La page d’accueil réalisée à votre image, pour juger sur pièce.</td><td class="d">${euros(prix.demo)}</td></tr>
<tr><td><strong>Visio de conseil (1 h 30)</strong></td><td>Présentation de la démo, échange sur vos besoins, ajustement du projet.</td><td class="d">${euros(prix.visio)}</td></tr>
<tr><td><strong>Rendez-vous de finalisation</strong></td><td>${prix.rdvInclus} rendez-vous inclus dans le devis.</td><td class="d">inclus</td></tr>
<tr><td><strong>Retours sur la maquette</strong></td><td>${prix.seriesIncluses} séries de modifications incluses, puis un mois d’ajustements après la mise en ligne.</td><td class="d">inclus</td></tr>
<tr><td><strong>Au-delà de l’inclus</strong></td><td>Rendez-vous ou modifications supplémentaires.</td><td class="d">${euros(prix.heure)} l’heure</td></tr></table>

<h2>L’abonnement (facultatif)</h2>
<p>Après la mise en ligne, un abonnement mensuel couvre l’hébergement, la sécurité et la maintenance, avec des options à la carte (publications, suivi de la visibilité, rapport mensuel, heures de modifications). Il est <strong>sans engagement</strong>, avec un mois de préavis, et vous gardez votre site et vos fichiers si vous arrêtez. À partir de <strong>${euros(prix.abonnementMin)} par mois</strong> ; le montant exact se compose à la carte dans l’estimateur et figure sur le devis.</p>

<h2>Comment on paie</h2>
<ul><li><strong>${prix.acompte} %</strong> à la signature du devis ; le solde à la livraison, en deux fois ;</li>
<li>ou en trois fois : une part à la signature, une à la validation de la maquette, une à la livraison ;</li>
<li>en quatre fois pour les projets à partir de <strong>${euros(prix.paiement4FoisDes)}</strong>.</li></ul>
<p class="petit">Le détail des conditions figure dans les conditions générales de vente. Les montants de cette grille sont indicatifs : seul le devis signé engage ${ctx.e.identite}.</p>`
}
