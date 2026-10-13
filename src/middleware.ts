/**
 * LE MODE MAINTENANCE.
 *
 * Quand `MAINTENANCE=1`, toute requête reçoit la page de maintenance avec un
 * statut 503. Sans la variable, ce fichier ne fait rien et le site répond
 * normalement — c'est ce qui permet de rallumer le site depuis le tableau de
 * bord Vercel SANS redéployer : on retire la variable, on relance l'instance,
 * et c'est fini.
 *
 * POURQUOI 503 ET NON 200 OU 302.
 *
 * Un 200 sur une page de maintenance dit à Google « voici désormais le
 * contenu de cette URL » : il indexe la page de maintenance à la place du
 * site, et il faut des semaines pour s'en remettre. Un 302 vers une page
 * unique n'est pas mieux. Le 503 — service temporairement indisponible —
 * est le seul statut qui dise « reviens plus tard, ne touche à rien ».
 *
 * `Retry-After: 172800` (48 h) complète le message : il indique quand
 * repasser. C'est aussi la durée du compte à rebours, et les deux doivent
 * rester cohérents.
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

/** Durée annoncée au robot, en secondes. 48 h, comme le compte à rebours. */
const RETRY_APRES = 172800

export function middleware() {
  if (process.env.MAINTENANCE !== '1') return NextResponse.next()

  return new NextResponse(pageMaintenance(), {
    status: 503,
    headers: {
      'Content-Type': 'text/html; charset=utf-8',
      'Retry-After': String(RETRY_APRES),
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
