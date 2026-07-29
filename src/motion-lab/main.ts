import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Flip } from 'gsap/Flip';

import { env } from './core/env';
import { webgl } from './core/webgl';
import { scroll } from './core/scroll';
import { cursor } from './core/cursor';
import { background } from './core/background';
import { buildMarkup } from './markup';

import { fluid } from './scenes/fluid';
import { runPreloader } from './scenes/preloader';
import { initHero } from './scenes/hero';
import { initManifesto } from './scenes/manifesto';
import { initGallery } from './scenes/gallery';
import { initNumber } from './scenes/number';
import { initTunnel } from './scenes/tunnel';
import { initGrid } from './scenes/grid';
import { initFinal } from './scenes/final';

gsap.registerPlugin(ScrollTrigger, Flip);

export async function boot(container: HTMLElement): Promise<() => void> {
  env.init();

  container.innerHTML = buildMarkup();

  webgl.init();
  container.insertBefore(webgl.canvas, container.firstChild);

  scroll.init();
  cursor.init();
  fluid.init();

  scroll.stop();

  const assetsReady: Promise<void> = Promise.all([
    document.fonts.ready,
    new Promise<void>((r) => requestAnimationFrame(() => r())),
  ]).then(() => undefined);

  const tickerId = gsap.ticker.add((time, deltaTime) => {
    const dt = Math.min(deltaTime / 1000, 0.05);
    scroll.update(dt);
    cursor.update(dt);
    webgl.render(dt, time);
  });

  initHero();
  initManifesto();
  initGallery();
  initNumber();
  initTunnel();
  initGrid();
  initFinal();

  background.init();

  await document.fonts.ready;
  ScrollTrigger.refresh();

  await runPreloader(assetsReady);
  scroll.start();
  ScrollTrigger.refresh();

  return () => {
    gsap.ticker.remove(tickerId);
    ScrollTrigger.getAll().forEach((t) => t.kill());
    scroll.lenis?.destroy();
    webgl.renderer?.dispose();
    document.documentElement.classList.remove('has-custom-cursor');
    container.innerHTML = '';
  };
}
