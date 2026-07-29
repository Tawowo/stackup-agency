import { MANIFESTO, GALLERY, NUMBER, TUNNEL, GRID, FINAL } from './config';

/**
 * Génère la structure DOM complète du site (one-page).
 * Le mouvement est ajouté par les scènes ; ici, la scène statique.
 */
export function buildMarkup(): string {
  return /* html */ `
  <div class="preloader" id="preloader">
    <div class="preloader__cols" id="preloader-cols"></div>
    <div class="preloader__inner">
      <div class="preloader__count" id="preloader-count">0</div>
      <div class="preloader__bar"><span id="preloader-bar"></span></div>
    </div>
    <button class="preloader__skip" id="preloader-skip">Passer l'intro</button>
  </div>

  <main id="main" aria-hidden="false">
    <!-- Scène 1 — Héro WebGL -->
    <section class="hero" id="hero" data-scene="hero">
      <h1 class="hero__title" id="hero-title" aria-label="Stackup"></h1>
      <div class="hero__scroll" data-cursor="link">
        <span>Scroll</span>
        <div class="hero__scroll-dot"></div>
      </div>
    </section>

    <!-- Scène 2 — Manifeste épinglé -->
    <section class="manifesto" id="manifesto" data-scene="manifesto">
      <div class="manifesto__stage" id="manifesto-stage">
        ${MANIFESTO.lines
          .map(
            (line, i) =>
              `<p class="manifesto__line" data-line="${i}" aria-label="${line}">${line}</p>`
          )
          .join('')}
      </div>
    </section>

    <!-- Scène 3 — Galerie horizontale WebGL -->
    <section class="gallery" id="gallery" data-scene="gallery">
      <div class="gallery__track" id="gallery-track">
        <div class="gallery__intro">
          <h2>Nos<br />terrains<br />de jeu.</h2>
          <p>Cinq expériences taillées au pixel. Scrollez pour traverser — vite pour les courber, lentement pour les lire.</p>
        </div>
        <div class="gallery__cards" id="gallery-cards">
          ${GALLERY.projects
            .map(
              (p, i) => `
            <article class="gallery__card" data-index="${i}" data-cursor="view" data-cursor-label="Voir">
              <div class="gallery__caption">
                <span class="g-title" aria-label="${p.title}">${p.title}</span>
                <span class="g-tag">${p.tag}</span>
              </div>
            </article>`
            )
            .join('')}
        </div>
      </div>
    </section>

    <!-- Scène 4 — Le chiffre 400 -->
    <section class="number" id="number" data-scene="number">
      <div class="number__stage" id="number-stage">
        <svg class="number__svg" id="number-svg" viewBox="0 0 600 320" role="img"
             aria-label="${NUMBER.value} ${NUMBER.caption}">
          <defs>
            <linearGradient id="numGrad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0" stop-color="var(--navy)" />
              <stop offset="1" stop-color="var(--electric)" />
            </linearGradient>
          </defs>
          <text class="stroke-text" id="stroke-text" x="300" y="240"
                text-anchor="middle" font-family="Inter, sans-serif"
                font-size="300" font-weight="800" letter-spacing="-8"
                fill="none" stroke="var(--light)" stroke-width="2">400</text>
          <text class="fill-text" id="fill-text" x="300" y="240"
                text-anchor="middle" font-family="Inter, sans-serif"
                font-size="300" font-weight="800" letter-spacing="-8"
                fill="url(#numGrad)">400</text>
        </svg>
        <p class="number__caption" id="number-caption">${NUMBER.caption}</p>
      </div>
    </section>

    <!-- Scène 5 — Tunnel de texte -->
    <section class="tunnel" id="tunnel" data-scene="tunnel">
      <div class="tunnel__stack" id="tunnel-stack">
        ${TUNNEL.baseSpeeds
          .map(() => `<div class="tunnel__row" aria-hidden="true"></div>`)
          .join('')}
      </div>
    </section>

    <!-- Scène 6 — Grille magnétique -->
    <section class="grid" id="grid" data-scene="grid">
      <div class="grid__head">
        <h2>Ce qu'on fabrique.</h2>
        <p>Six terrains d'expertise. Approchez le curseur — les cartes vous répondent.</p>
      </div>
      <div class="grid__cards" id="grid-cards">
        ${GRID.services
          .map(
            (s, i) => `
          <article class="grid__card" data-index="${i}" data-cursor="view" data-cursor-label="Ouvrir" tabindex="0">
            <span class="grid__num">0${i + 1}</span>
            <div>
              <h3>${s.title}</h3>
              <p>${s.desc}</p>
            </div>
          </article>`
          )
          .join('')}
      </div>
    </section>
    <div class="grid__backdrop" id="grid-backdrop"></div>

    <!-- Scène 7 — Le final -->
    <section class="final" id="final" data-scene="final">
      <div class="final__inner">
        <h2 class="final__title" id="final-title" aria-label="${FINAL.headline}"></h2>
        <div class="final__cta" id="final-cta">
          <button class="final__btn" id="final-btn" data-cursor="cta" data-cursor-label="Go">
            Parlons-en
          </button>
        </div>
      </div>
      <div class="final__footer">
        <div class="final__marquee" id="final-marquee"></div>
      </div>
    </section>
  </main>
  `;
}
