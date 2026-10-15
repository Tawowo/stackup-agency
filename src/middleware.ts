/**
 * LE MODE MAINTENANCE.
 *
 * Toute requête reçoit la page de maintenance avec un statut 503 tant que
 * `MAINTENANCE_ACTIVE` vaut `true` dans `config/site.ts`. C'est l'unique
 * interrupteur à connaître : il est dans le dépôt, à côté de la date du
 * compte à rebours, et il ne demande aucune manipulation chez l'hébergeur.
 *
 * La variable d'environnement `MAINTENANCE` reste lue, et PASSE DEVANT la
 * constante quand elle est posée : `1` force l'allumage, `0` force
 * l'extinction. Elle sert de sortie de secours — couper la maintenance sans
 * toucher au code — mais elle n'est nécessaire à rien au quotidien.
 *
 * POURQUOI 503 ET NON 200 OU 302.
 *
 * Un 200 sur une page de maintenance dit à Google « voici désormais le
 * contenu de cette URL » : il indexe la page de maintenance à la place du
 * site, et il faut des semaines pour s'en remettre. Un 302 vers une page
 * unique n'est pas mieux. Le 503 — service temporairement indisponible —
 * est le seul statut qui dise « reviens plus tard, ne touche à rien ».
 *
 * `Retry-After` complète le message : il indique quand repasser. Il est
 * CALCULÉ depuis `MAINTENANCE_FIN`, et non écrit en dur — il l'était, à
 * 48 h, avec un commentaire affirmant « comme le compte à rebours ». La
 * première fois que la date a changé, l'affirmation est devenue fausse sans
 * que rien ne le signale. Deux valeurs qui doivent rester égales ne se
 * recopient pas : l'une se déduit de l'autre.
 *
 * OÙ CE FICHIER DOIT VIVRE. Dans `src/`, et non à la racine du dépôt : ce
 * projet range son code applicatif sous `src/`, et Next cherche alors le
 * middleware au même endroit. Posé à la racine, il est ignoré SANS AUCUN
 * avertissement — le build passe, le manifeste `middleware` reste vide, et
 * toutes les routes répondent normalement. Constaté en appelant les routes,
 * pas en relisant le code.
 *
 * POURQUOI LE MIDDLEWARE RÉPOND LUI-MÊME. Une page de l'App Router ne choisit
 * pas son statut, et `NextResponse.rewrite()` ne le permet pas davantage : le
 * statut vient de la route réécrite. Répondre directement est la seule façon
 * de garantir le 503 sur toutes les routes.
 */

import { NextResponse } from 'next/server'
import { pageMaintenance } from '@/lib/maintenance'
import { MAINTENANCE_ACTIVE, MAINTENANCE_FIN } from '@/config/site'

/**
 * Secondes restantes avant la date de fin, pour l'en-tête `Retry-After`.
 *
 * Deux garde-fous : un plancher d'une heure, pour qu'un robot qui passe
 * APRÈS l'échéance — la date dépassée mais le site encore en maintenance —
 * ne reçoive ni zéro ni une valeur négative ; et un plafond d'une semaine,
 * parce qu'une date lointaine inviterait les robots à ne plus revenir
 * pendant des mois.
 */
function retryApres(): number {
  const reste = Math.ceil((new Date(MAINTENANCE_FIN).getTime() - Date.now()) / 1000)
  if (!Number.isFinite(reste)) return 3600
  return Math.min(604800, Math.max(3600, reste))
}

export function middleware() {
  /* L'ordre compte : la variable d'environnement tranche quand elle existe,
     la constante du dépôt décide sinon. Une valeur autre que '0' ou '1' est
     ignorée plutôt qu'interprétée — un `MAINTENANCE=true` mal saisi ne doit
     ni allumer ni éteindre le site par accident. */
  const forcee = process.env.MAINTENANCE
  const actif = forcee === '1' ? true : forcee === '0' ? false : MAINTENANCE_ACTIVE

  if (!actif) return NextResponse.next()

  return new NextResponse(pageMaintenance(), {
    status: 503,
    headers: {
      'Content-Type': 'text/html; charset=utf-8',
      'Retry-After': String(retryApres()),
      /* Aucune mise en cache : sans ça, un CDN garderait la page de
         maintenance après la remise en service, et des visiteurs la
         verraient encore alors que le site est revenu. */
      'Cache-Control': 'no-store, must-revalidate',
    },
  })
}

export const config = {
  /*
   * CE QUI PASSE MALGRÉ LA MAINTENANCE, ET POURQUOI.
   *
   *   _next/        les fichiers du framework ; sans eux, rien ne s'affiche
   *   favicon.ico   l'onglet du navigateur
   *   robots.txt    il doit rester lisible : un robot qui ne peut pas le
   *                 lire se rabat sur ses propres règles
   *   sitemap.xml   idem, et il garde la liste des URL connues de Google
   *
   * Et toute ressource statique reconnaissable à son extension : la page de
   * maintenance affiche le logo, qui est dans `public/`. S'il passait par le
   * middleware, il recevrait du HTML à la place d'une image et la page
   * s'afficherait sans logo — le genre de détail qu'on ne voit qu'en
   * regardant la page, pas en relisant le code.
   */
  matcher: [
    '/((?!_next/|favicon\\.ico|robots\\.txt|sitemap\\.xml|.*\\.(?:png|jpg|jpeg|gif|webp|avif|svg|ico|mp4|webm|woff|woff2|ttf|otf|pdf|txt|xml|json|webmanifest)$).*)',
  ],
}
