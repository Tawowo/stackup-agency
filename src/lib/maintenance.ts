/**
 * LA PAGE DE MAINTENANCE.
 *
 * POURQUOI DU HTML ÉCRIT À LA MAIN, ET NON UNE PAGE REACT.
 *
 * La consigne impose un statut HTTP 503 sur TOUTES les routes. C'est ce qui
 * dit à Google « ce site reviendra, ne le déréférence pas » — un 200 sur une
 * page vide ferait exactement l'inverse, et un 404 serait pire encore.
 *
 * Or une page de l'App Router ne peut pas choisir son code de statut : il
 * est décidé par le routeur. Un `NextResponse.rewrite()` depuis le middleware
 * ne le permet pas davantage — le statut vient de la route réécrite. La seule
 * façon de garantir le 503 est que le middleware réponde lui-même, donc avec
 * une chaîne HTML.
 *
 * Cette chaîne est ici, dans un module unique, et nulle part ailleurs : une
 * seconde copie dans une page React divergerait au premier changement.
 *
 * AUCUNE DÉPENDANCE. Pas de feuille de style externe, pas de framework, une
 * seule requête de police. Une page de maintenance qui dépend du reste du
 * site ne sert à rien le jour où le reste du site est en panne.
 */

import { SITE, MAINTENANCE_FIN } from '@/config/site'

/** Encre et ambre de la charte, repris à l'identique. */
const ENCRE = '#060B14'
const AMBRE = '#F69106'

/** Échappe ce qui part dans le HTML. Court, mais obligatoire. */
function echapper(t: string): string {
  return t
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

export function pageMaintenance(): string {
  const email = echapper(SITE.email)
  const tel = SITE.telephone.trim()
  // Le `tel:` n'accepte ni espace ni ponctuation.
  const telLien = tel.replace(/[^+\d]/g, '')

  return `<!doctype html>
<html lang="fr">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${echapper(SITE.name)} — site en construction</title>
<meta name="description" content="Le site de ${echapper(SITE.name)} est en construction. Une nouvelle version arrive.">
<!-- La page revient : on demande à ne pas être retiré de l'index. -->
<meta name="robots" content="noindex, follow">
<link rel="icon" href="/favicon.ico">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Poppins:wght@600;700&display=swap" rel="stylesheet">
<style>
  *, *::before, *::after { box-sizing: border-box; }
  html, body { margin: 0; padding: 0; }
  body {
    min-height: 100svh;
    background: ${ENCRE};
    color: #fff;
    /* Poppins si elle arrive, une géométrique approchante sinon : la page
       doit être lisible même si la requête de police échoue. */
    font-family: Poppins, 'Century Gothic', ui-sans-serif, system-ui,
                 -apple-system, 'Segoe UI', Roboto, Arial, sans-serif;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    padding: 2rem 1rem 3rem;
    gap: clamp(1.5rem, 4vh, 2.75rem);
    -webkit-font-smoothing: antialiased;
  }
  /* LA PLAQUE BLANCHE EST VOULUE, ET ELLE EST SUBIE.

     « Logo_Stackup-Agency.png » — le fichier officiel demandé — ne contient
     AUCUN pixel transparent : mesuré, 0,0 % de transparence et 90,2 % de
     blanc opaque. « logo-white.png » est d'ailleurs le même fichier, au
     dernier octet près. Posé sur l'encre, il affiche donc forcément son
     fond blanc.

     Plutôt que de laisser un rectangle blanc qui ressemble à un bug, on en
     fait une plaque : marge intérieure, coins arrondis, largeur maîtrisée.
     Elle se lit alors comme un cartouche, ce qui est une décision.

     Pour que le logo flotte directement sur l'encre, il faut un PNG
     détouré — ou la version SVG « LogoMarque » du site, qui a une variante
     claire définie. */
  .plaque {
    background: #fff;
    border-radius: 0.75rem;
    padding: clamp(0.9rem, 2.4vw, 1.5rem) clamp(1.25rem, 3.4vw, 2.25rem);
    display: inline-block;
    line-height: 0;
  }
  .logo {
    width: min(68vw, 21rem);
    height: auto;
    display: block;
  }
  h1 {
    margin: 0;
    font-weight: 700;
    font-size: clamp(1.6rem, 5.2vw, 2.9rem);
    line-height: 1.1;
    letter-spacing: -0.02em;
  }
  .sous {
    margin: 0.6rem 0 0;
    font-weight: 600;
    font-size: clamp(0.95rem, 2.4vw, 1.12rem);
    color: rgba(255, 255, 255, 0.68);
  }
  /* ── Le compte à rebours ──────────────────────────────────────────────
     Chiffres tabulaires : sans eux, la largeur change à chaque seconde et
     toute la ligne tressaute. */
  .rebours {
    display: flex;
    gap: clamp(0.75rem, 3.5vw, 2rem);
    font-variant-numeric: tabular-nums;
    font-feature-settings: 'tnum' 1;
  }
  .case { min-width: 3.4rem; }
  .n {
    display: block;
    font-weight: 700;
    font-size: clamp(2rem, 8.5vw, 3.6rem);
    line-height: 1;
    color: ${AMBRE};
  }
  .u {
    display: block;
    margin-top: 0.4rem;
    font-size: 0.62rem;
    font-weight: 600;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: rgba(255, 255, 255, 0.5);
  }
  .bientot {
    font-weight: 700;
    font-size: clamp(1.5rem, 6vw, 2.6rem);
    color: ${AMBRE};
  }
  /* ── Le contact ────────────────────────────────────────────────────── */
  .contact {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 0.6rem 1.75rem;
    padding-top: clamp(1rem, 3vh, 1.75rem);
    border-top: 1px solid rgba(255, 255, 255, 0.14);
    width: min(90vw, 30rem);
  }
  .contact a {
    color: #fff;
    text-decoration: none;
    font-size: clamp(0.92rem, 2.4vw, 1rem);
    font-weight: 600;
    border-bottom: 1px solid ${AMBRE};
    padding-bottom: 2px;
  }
  .contact a:hover { color: ${AMBRE}; }
  .contact a:focus-visible { outline: 2px solid ${AMBRE}; outline-offset: 4px; }
  /* Mouvement réduit : rien ne clignote ici de toute façon, mais la
     transition de couleur est retirée par principe. */
  @media (prefers-reduced-motion: reduce) { * { transition: none !important; } }
</style>
</head>
<body>
  <div class="plaque">
    <img class="logo" src="/Logo_Stackup-Agency.png" alt="${echapper(SITE.name)}" width="1536" height="383">
  </div>

  <div>
    <h1>Le site est en construction.</h1>
    <p class="sous">Une nouvelle version arrive.</p>
  </div>

  <!-- Sans JavaScript, le compte à rebours n'a pas de sens : on affiche
       d'emblée la mention qui reste vraie dans tous les cas. -->
  <div id="rebours" class="bientot">Très bientôt.</div>

  <div class="contact">
    <a href="mailto:${email}">${email}</a>
    ${tel ? `<a href="tel:${echapper(telLien)}">${echapper(tel)}</a>` : ''}
  </div>

<script>
(function () {
  var fin = new Date('${MAINTENANCE_FIN}').getTime();
  var hote = document.getElementById('rebours');
  if (!hote || isNaN(fin)) return;

  var UNITES = [['jours', 86400], ['heures', 3600], ['minutes', 60], ['secondes', 1]];

  function peindre() {
    var reste = Math.floor((fin - Date.now()) / 1000);

    // Date dépassée : on ne montre ni zéros ni valeurs négatives.
    if (reste <= 0) {
      hote.className = 'bientot';
      hote.textContent = 'Très bientôt.';
      return false;
    }

    var html = '';
    for (var i = 0; i < UNITES.length; i++) {
      var nom = UNITES[i][0], sec = UNITES[i][1];
      var v = Math.floor(reste / sec);
      reste -= v * sec;
      html += '<div class="case"><span class="n">' +
              (v < 10 ? '0' : '') + v +
              '</span><span class="u">' + nom + '</span></div>';
    }
    hote.className = 'rebours';
    hote.innerHTML = html;
    return true;
  }

  if (peindre()) {
    var t = setInterval(function () {
      if (!peindre()) clearInterval(t);
    }, 1000);
  }
})();
</script>
</body>
</html>`
}
