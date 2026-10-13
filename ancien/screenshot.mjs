import { chromium } from '/opt/node22/lib/node_modules/playwright/index.mjs';
import { mkdirSync } from 'fs';

const BASE = 'http://localhost:3000';
const OUT = '/tmp/claude-0/-home-user-stackup-agency/1c918e2c-c260-504d-a79e-4dc0c5084e7d/scratchpad/shots';

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
    await page.waitForTimeout(1500);
    if (delay > 0) await page.waitForTimeout(delay);
    if (scrollY > 0) {
      await page.evaluate((y) => window.scrollTo(0, y), scrollY);
      await page.waitForTimeout(400);
    }
    await page.screenshot({ path: `${OUT}/${name}.png` });
    console.log(`✓ ${name}`);
  } catch(e) {
    console.error(`✗ ${name}: ${e.message.split('\n')[0]}`);
  }
  await page.close();
}

// HOME hero (reduced delay)
await shot('01-home-desktop-hero', BASE, 1440, 0, 2000);
await browser.close();
console.log('DONE');
