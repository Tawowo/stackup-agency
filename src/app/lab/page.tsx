'use client'

/**
 * LE BANC DE LA BANDE.
 *
 * Cette page n'est pas une vitrine et ne sera jamais livrée au visiteur :
 * elle existe pour produire des CHIFFRES et des captures comparables. Le
 * dossier (17.6 §4) interdit de fabriquer des prototypes isolés sans les
 * intégrer — ce banc n'est pas un prototype, c'est l'instrument qui permet
 * de prouver que l'intégration est correcte.
 *
 * Elle sert à deux vérifications que rien d'autre ne peut faire :
 *
 *  1. LA SUPERPOSITION. À progression 0, ce que la scène affiche doit être
 *     exactement la silhouette du logo. Le banc fige la progression à une
 *     valeur donnée dans l'URL (`?p=0`) et cadre la bande seule sur un fond
 *     uni, pour que `scripts/superposition.mjs` puisse comparer pixel à
 *     pixel avec `public/Logo_Stackup-Agency.png`.
 *
 *  2. LA CADENCE. Le temps de trame moyen et le palier courant sont exposés
 *     sur `window.__SU_LAB`, pour qu'un script les relève sans avoir à lire
 *     une image.
 *
 * `noindex`, hors sitemap.
 */

import { useEffect, useRef, useState } from 'react'
import { useBande } from '@/store/bande'

export default function Lab() {
  const [releve, setReleve] = useState({ tempsTrame: 0, fps: 0, trames: 0 })
  const setProgression = useBande((s) => s.setProgression)
  const setEtat = useBande((s) => s.setEtat)
  const setMouvement = useBande((s) => s.setMouvement)
  const prete = useBande((s) => s.prete)
  const repli = useBande((s) => s.repli)
  const image = useRef(0)

  // La progression vient de l'URL : le script de capture la fixe, la page
  // n'anime rien. Une valeur figée est la seule façon de comparer deux
  // captures prises à des moments différents.
  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const p = Number(params.get('p') ?? '0')
    const fige = params.get('fige') === '1'
    // `nu=1` retire tout le chrome du site (navigation, pied de page,
    // bandeau cookies). Sans ça, la capture de superposition inclut le logo
    // de la barre et le bandeau sombre du bas : leur encre entre dans la
    // boîte englobante et la mesure compare n'importe quoi. C'est l'erreur
    // qu'a donnée la première exécution — 83 % d'écart, dont l'essentiel
    // venait du chrome.
    if (params.get('nu') === '1') document.documentElement.dataset.bancNu = 'oui'
    setEtat('logo')
    setProgression(Number.isFinite(p) ? Math.max(0, Math.min(1, p)) : 0)
    // `fige=1` coupe tout mouvement : indispensable pour que la
    // superposition ne tombe pas sur une image d'inclinaison au pointeur.
    if (fige) setMouvement('aucun')
  }, [setProgression, setEtat, setMouvement])

  // Mesure de cadence sur une fenêtre glissante de 120 trames.
  useEffect(() => {
    let dernier = performance.now()
    const fenetre: number[] = []
    let total = 0
    const boucle = () => {
      image.current = requestAnimationFrame(boucle)
      const maintenant = performance.now()
      const dt = maintenant - dernier
      dernier = maintenant
      total++
      fenetre.push(dt)
      if (fenetre.length > 120) fenetre.shift()
      if (total % 20 === 0) {
        const moyenne = fenetre.reduce((a, v) => a + v, 0) / fenetre.length
        const r = {
          tempsTrame: Math.round(moyenne * 100) / 100,
          fps: Math.round(1000 / moyenne),
          trames: total,
        }
        setReleve(r)
        ;(window as unknown as { __SU_LAB?: unknown }).__SU_LAB = {
          ...r,
          prete: useBande.getState().prete,
          repli: useBande.getState().repli,
          progression: useBande.getState().progression,
        }
      }
    }
    image.current = requestAnimationFrame(boucle)
    return () => cancelAnimationFrame(image.current)
  }, [])

  return (
    <main
      style={{
        minHeight: '100vh',
        // Fond uni et neutre : la superposition compare des silhouettes, pas
        // des arrière-plans. L'ivoire du site conviendrait moins bien — son
        // grain très clair brouille le seuillage.
        background: '#FFFFFF',
        display: 'grid',
        placeItems: 'center',
        position: 'relative',
      }}
    >
      <div
        data-banc="releve"
        style={{
          position: 'fixed',
          top: 8,
          left: 8,
          zIndex: 10,
          fontFamily: 'ui-monospace, monospace',
          fontSize: 11,
          color: '#334155',
          background: 'rgba(255,255,255,.9)',
          padding: '6px 9px',
          borderRadius: 4,
          border: '1px solid #e2e8f0',
          lineHeight: 1.6,
        }}
      >
        banc de la bande
        <br />
        {releve.fps} fps · {releve.tempsTrame} ms · {releve.trames} trames
        <br />
        scène {prete ? 'prête' : 'en attente'} · {repli ? 'REPLI SVG' : 'webgl'}
      </div>
    </main>
  )
}
