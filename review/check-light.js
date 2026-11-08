async (page) => {
  const out = [];
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.addInitScript(() => localStorage.setItem("vite-ui-theme", "light"));

  await page.goto("http://127.0.0.1:4173/demarrer", { waitUntil: "networkidle" });
  await page.waitForTimeout(1000);
  out.push({ htmlClass: await page.evaluate(() => document.documentElement.className) });
  await page.screenshot({ path: "review/light-landing-2.png" });

  // Open the expandable overlay
  await page.click('[data-slot="expandable-screen-trigger"]');
  await page.waitForSelector('[data-slot="expandable-screen-overlay"]', { timeout: 5000 });
  await page.waitForTimeout(900);
  out.push({ expanded: await page.evaluate(() => {
    const bgLayer = document.querySelector('[data-slot="expandable-screen-overlay"] > div');
    return {
      htmlClass: document.documentElement.className,
      bgLayerBg: bgLayer ? getComputedStyle(bgLayer).backgroundColor : null,
      bodyOverflow: document.body.style.overflow,
    };
  }) });
  await page.screenshot({ path: "review/light-expanded-2.png" });

  // Exit click-through: close and immediately probe pointer-events + what is under the cursor
  await page.click('button[aria-label="Fermer"]');
  out.push({ exit: await page.evaluate(() => {
    const ov = document.querySelector('[data-slot="expandable-screen-overlay"]');
    if (!ov) return { gone: true };
    return { gone: false, pointerEvents: getComputedStyle(ov).pointerEvents, underCursor: document.elementFromPoint(400, 300)?.tagName };
  }) });
  await page.waitForTimeout(700);
  out.push({ after: await page.evaluate(() => {
    const el = document.activeElement;
    return {
      overlayGone: !document.querySelector('[data-slot="expandable-screen-overlay"]'),
      focused: el ? (el.dataset?.slot || el.tagName) : null,
      bodyOverflow: document.body.style.overflow,
    };
  }) });

  // Legend text-balance on mobile
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("http://127.0.0.1:4173/demarrer", { waitUntil: "networkidle" });
  await page.waitForTimeout(600);
  await page.click('[data-slot="expandable-screen-trigger"]');
  await page.waitForSelector('[data-slot="expandable-screen-overlay"]', { timeout: 5000 });
  await page.waitForTimeout(900);
  out.push({ legend: await page.evaluate(() => {
    const l = Array.from(document.querySelectorAll("legend")).find(x => x.offsetParent !== null);
    if (!l) return null;
    const r = l.getBoundingClientRect();
    return { text: l.textContent && l.textContent.slice(0, 50), textWrap: getComputedStyle(l).textWrap, width: Math.round(r.width), viewport: window.innerWidth };
  }) });
  await page.screenshot({ path: "review/mobile-light-step.png" });
  return out;
}
