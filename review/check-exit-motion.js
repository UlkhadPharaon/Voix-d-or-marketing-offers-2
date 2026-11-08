async (page) => {
  const out = [];
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.setViewportSize({ width: 1440, height: 900 });
  out.push({ reducedMotion: await page.evaluate(() => matchMedia("(prefers-reduced-motion: reduce)").matches) });
  await page.goto("http://127.0.0.1:4173/demarrer", { waitUntil: "networkidle" });
  await page.waitForTimeout(800);

  await page.click('[data-slot="expandable-screen-trigger"]');
  await page.waitForSelector('[data-slot="expandable-screen-overlay"]', { timeout: 5000 });
  await page.waitForTimeout(900);

  await page.click('button[aria-label="Fermer"]');
  for (const atMs of [10, 80, 150, 250, 400, 700, 1500]) {
    await page.waitForTimeout(atMs);
    out.push({ atMs: atMs, ...(await page.evaluate(() => {
      const nodes = Array.from(document.querySelectorAll('[data-slot="expandable-screen-overlay"]'));
      if (nodes.length === 0) return { count: 0 };
      const under = document.elementFromPoint(400, 300);
      return {
        count: nodes.length,
        opacity: Number(getComputedStyle(nodes[0]).opacity).toFixed(3),
        gatePointerEvents: getComputedStyle(nodes[0].querySelector("div")).pointerEvents,
        underInsideOverlay: under ? nodes[0].contains(under) : null,
      };
    })) });
  }
  return out;
}
