import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { TUNNEL } from '../config';
import { scroll } from '../core/scroll';
import { env } from '../core/env';
import { clamp, damp, lerp } from '../core/utils';

/**
 * Scène 5 — Le tunnel de texte (vortex typographique).
 * Trois lignes en marquee infini à vitesses différentes, MAIS en
 * perspective 3D : les lignes s'inclinent selon la position de scroll
 * (effet tunnel) et leur vitesse est proportionnelle à la vélocité de
 * scroll — l'utilisateur « conduit » le texte.
 */
export function initTunnel() {
  const section = document.getElementById('tunnel')!;
  const stack = document.getElementById('tunnel-stack')!;
  const rows = Array.from(section.querySelectorAll<HTMLElement>('.tunnel__row'));

  // Remplit chaque ligne de répétitions pour un marquee sans couture.
  rows.forEach((row) => {
    const unit = `${TUNNEL.phrase} `;
    row.innerHTML = '';
    for (let i = 0; i < 12; i++) {
      const span = document.createElement('span');
      span.textContent = unit;
      row.appendChild(span);
    }
  });

  const offsets = rows.map(() => 0);
  const widths = rows.map((row) => {
    const first = row.firstElementChild as HTMLElement;
    return first ? first.offsetWidth : row.scrollWidth / 12;
  });

  let visible = false;
  let tilt = 0; // inclinaison du tunnel selon la position de scroll
  let sectionProgress = 0.5;

  ScrollTrigger.create({
    trigger: section,
    start: 'top bottom',
    end: 'bottom top',
    onToggle: (self) => (visible = self.isActive),
    onUpdate: (self) => (sectionProgress = self.progress),
  });

  // Recalcule les largeurs au resize (police chargée / viewport).
  const remeasure = () => {
    rows.forEach((row, i) => {
      const first = row.firstElementChild as HTMLElement;
      widths[i] = first ? first.offsetWidth : row.scrollWidth / 12;
    });
  };
  window.addEventListener('resize', remeasure, { passive: true });
  ScrollTrigger.addEventListener('refreshInit', remeasure);

  gsap.ticker.add(() => {
    if (!visible) return;
    const dt = Math.min(gsap.ticker.deltaRatio() / 60, 0.05);
    const vel = scroll.velocity;

    rows.forEach((row, i) => {
      const base = TUNNEL.baseSpeeds[i];
      // Vitesse = base + boost proportionnel à la vélocité de scroll.
      const speed = base + vel * TUNNEL.velocityBoost * Math.sign(base || 1);
      offsets[i] -= speed;
      // Wrap infini sur la largeur d'une répétition.
      const wdt = widths[i] || 1;
      if (offsets[i] <= -wdt) offsets[i] += wdt;
      if (offsets[i] >= 0) offsets[i] -= wdt;
      row.style.transform = `translate3d(${offsets[i]}px, 0, 0)`;
    });

    if (env.reducedMotion) return;

    // Inclinaison tunnel : rotateX selon la position dans la section,
    // amplifiée par la vélocité (sensation de « conduire »).
    const targetTilt =
      (sectionProgress - 0.5) * 2 * TUNNEL.maxTilt + clamp(vel, -1, 1) * 10;
    tilt = damp(tilt, targetTilt, 6, dt);
    stack.style.transform = `rotateX(${tilt}deg) rotateZ(${lerp(-2, 2, sectionProgress)}deg)`;
  });
}
