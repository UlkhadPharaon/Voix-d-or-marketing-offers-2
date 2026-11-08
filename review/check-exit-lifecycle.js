async (page) => {
  const out = [];
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("http://127.0.0.1:4173/demarrer", { waitUntil: "networkidle" });
  await page.waitForTimeout(800);

  await page.click('[data-slot="expandable-screen-trigger"]');
  await page.waitForSelector('[data-slot="expandable-screen-overlay"]', { timeout: 5000 });
  await page.waitForTimeout(900);

  await page.click('button[aria-label="Fermer"]');
  for (const delay of [100, 300, 600, 1200, 2500]) {
    await page.waitForTimeout(delay);
    out.push({ atMs: delay, ...(await page.evaluate(() => {
      const nodes = Array.from(document.querySelectorAll('[data-slot="expandable-screen-overlay"]'));
      if (nodes.length === 0) return { count: 0 };
      return {
        count: nodes.length,
        opacity: Number(getComputedStyle(nodes[0]).opacity).toFixed(3),
        pointerEvents: getComputedStyle(nodes[0]).pointerEvents,
        inlineStyle: nodes[0].getAttribute("style"),
      };
    })) });
  }
  return out;
}
