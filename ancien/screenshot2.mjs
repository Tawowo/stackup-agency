import { chromium } from '/opt/node22/lib/node_modules/playwright/index.mjs';
import { mkdirSync } from 'fs';

const BASE = 'http://localhost:3000';
const OUT = '/tmp/claude-0/-home-user-stackup-agency/1c918e2c-c260-504d-a79e-4dc0c5084e7d/scratchpad/shots2';

mkdirSync(OUT, { recursive: true });

const browser = await chromium.launch({
  executablePath: '/opt/pw-browsers/chromium',
  args: ['--no-sandbox', '--disable-setuid-sandbox'],
});

async function shot(name, url, width, scrollY = 0, delay = 0) {
  const page = await browser.newPage();
  await page.setViewportSize({ width, height: 900 });
  try {
    await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 20000 });
    await page.waitForTimeout(1800);
    if (delay > 0) await page.waitForTimeout(delay);
    if (scrollY > 0) {
      await page.evaluate((y) => window.scrollTo(0, y), scrollY);
      await page.waitForTimeout(500);
    }
    await page.screenshot({ path: `${OUT}/${name}.png` });
    console.log(`✓ ${name}`);
  } catch(e) {
    console.error(`✗ ${name}: ${e.message.split('\n')[0]}`);
  }
  await page.close();
}

// HOME — hero + services section + CTA section
await shot('home-hero-desktop', BASE, 1440, 0, 2500);
await shot('home-hero-mobile', BASE, 390, 0, 2500);
await shot('home-services-desktop', BASE, 1440, 900, 500);
await shot('home-cta-desktop', BASE, 1440, 4000, 500);

// Tarifs
await shot('tarifs-desktop', `${BASE}/tarifs`, 1440, 0, 1000);
await shot('tarifs-cards', `${BASE}/tarifs`, 1440, 400, 800);
await shot('tarifs-mobile', `${BASE}/tarifs`, 390, 0, 1000);

// Services hub
await shot('services-desktop', `${BASE}/services`, 1440, 0, 800);
await shot('services-desktop-2', `${BASE}/services`, 1440, 700, 500);

// Réalisations hub
await shot('realisations-desktop', `${BASE}/realisations`, 1440, 0, 800);
await shot('realisations-desktop-2', `${BASE}/realisations`, 1440, 600, 500);

// Blog hub
await shot('blog-desktop', `${BASE}/blog`, 1440, 0, 800);

// À propos
await shot('a-propos-desktop', `${BASE}/a-propos`, 1440, 0, 800);
await shot('a-propos-timeline', `${BASE}/a-propos`, 1440, 500, 500);

// Contact
await shot('contact-desktop', `${BASE}/contact`, 1440, 0, 800);

// Studio de style
await shot('studio-desktop', `${BASE}/outils/studio-de-style`, 1440, 0, 1500);
await shot('studio-gallery', `${BASE}/outils/studio-de-style`, 1440, 2000, 800);
await shot('studio-mobile', `${BASE}/outils/studio-de-style`, 390, 0, 1500);

// 404
await shot('404-desktop', `${BASE}/cette-page-nexiste-pas`, 1440, 0, 800);

// Parrainage
await shot('parrainage-desktop', `${BASE}/parrainage`, 1440, 0, 800);

await browser.close();
console.log('DONE');
