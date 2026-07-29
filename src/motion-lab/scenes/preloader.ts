import { gsap } from 'gsap';
import { PRELOADER, EASE } from '../config';
import { env } from '../core/env';
import { clamp } from '../core/utils';

/**
 * Scène 0 — Preloader cinématique.
 * Compteur 0→100 reflétant le VRAI chargement (fonts + 1er frame WebGL),
 * barre en dégradé signature, puis déchirure en colonnes verticales
 * décalées qui révèlent le héro. < 2,5s, skippable au clic.
 *
 * `assetsReady` : promesse résolue quand les assets réels sont prêts.
 * Retourne une promesse résolue quand la déchirure est terminée.
 */
export function runPreloader(assetsReady: Promise<void>): Promise<void> {
  const root = document.getElementById('preloader')!;
  const cols = document.getElementById('preloader-cols')!;
  const countEl = document.getElementById('preloader-count')!;
  const bar = document.getElementById('preloader-bar')!;
  const skip = document.getElementById('preloader-skip')!;

  // Construit les colonnes de la déchirure.
  const n = env.reducedMotion ? 1 : PRELOADER.columns;
  for (let i = 0; i < n; i++) {
    const col = document.createElement('div');
    col.className = 'preloader__col';
    cols.appendChild(col);
  }
  const colEls = Array.from(cols.children) as HTMLElement[];

  return new Promise<void>((resolve) => {
    let done = false;
    let progress = 0;
    let assetsDone = false;
    const start = performance.now();

    assetsReady.then(() => (assetsDone = true));

    const finish = () => {
      if (done) return;
      done = true;
      skip.removeEventListener('click', finish);
      tear();
    };

    // Variante calme : fondu simple, pas de déchirure.
    const tear = () => {
      if (env.reducedMotion) {
        gsap.to(root, {
          autoAlpha: 0,
          duration: 0.5,
          onComplete: () => {
            root.remove();
            resolve();
          },
        });
        return;
      }
      const tl = gsap.timeline({
        onComplete: () => {
          root.remove();
          resolve();
        },
      });
      tl.to('.preloader__inner', { autoAlpha: 0, y: -30, duration: 0.4, ease: EASE.smooth });
      tl.to(
        colEls,
        {
          yPercent: (i) => (i % 2 === 0 ? -100 : 100),
          duration: PRELOADER.tearDuration,
          ease: EASE.reveal,
          stagger: { each: PRELOADER.tearStagger, from: 'center' },
        },
        '-=0.1'
      );
    };

    // Boucle du compteur : suit le vrai chargement, borné par minCount.
    const tick = () => {
      const elapsed = (performance.now() - start) / 1000;
      // Cible : 100% seulement si assets prêts ET durée mini écoulée.
      const timeGate = clamp(elapsed / PRELOADER.minCount);
      const target = assetsDone ? 1 : Math.min(0.9, timeGate * 0.9);
      progress += (target - progress) * 0.08;
      const pct = Math.round(progress * 100);
      countEl.textContent = String(pct);
      bar.style.width = `${pct}%`;

      if (pct >= 100 || (assetsDone && progress > 0.995)) {
        countEl.textContent = '100';
        bar.style.width = '100%';
        finish();
        return;
      }
      requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);

    skip.addEventListener('click', finish);
  });
}
