const { chromium } = require('@playwright/test');
(async () => {
  const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome', args: ['--use-gl=angle','--use-angle=swiftshader','--enable-unsafe-swiftshader'] });
  const p = await b.newPage({ viewport: { width: 1440, height: 900 } });
  await p.goto('http://localhost:3000/?quality=high', { waitUntil: 'networkidle' });
  await p.waitForSelector('html[data-su-ready="1"]', { timeout: 30000 });
  await p.waitForTimeout(800);
  const etat = () => p.evaluate(() => { const s = window.__su.scene.getState(); const u = window.__su.u; const v = u.uStack.value; return JSON.stringify({ frame: s.frame, stack: [v.x, v.y, v.z].map((n) => +n.toFixed(2)), dissolve: +u.uDissolve.value.toFixed(3), solY: +u.uSolY.value.toFixed(2), moment: s.moment, still: s.still, reduced: s.reduced }) });
  await p.evaluate(() => { const el = document.querySelector('[data-moment="02"]'); const y = el.getBoundingClientRect().top + window.scrollY; window.__suLenis?.scrollTo(y, { immediate: true }); window.scrollTo(0, y) });
  await p.waitForTimeout(600);
  console.log('avant settle', await etat());
  await p.evaluate(() => window.__suSettle(150));
  console.log('après settle 150', await etat());
  await p.evaluate(() => window.__suSettle(600));
  console.log('après settle 600', await etat());
  await p.waitForTimeout(1500);
  console.log('après 1,5 s', await etat());
  await b.close();
})();
