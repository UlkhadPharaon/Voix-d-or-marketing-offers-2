async (page) => {
  const out = [];
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("http://127.0.0.1:4173/demarrer", { waitUntil: "networkidle" });
  await page.waitForTimeout(800);

  await page.click('[data-slot="expandable-screen-trigger"]');
  await page.waitForSelector('[data-slot="expandable-screen-overlay"]', { timeout: 5000 });
  await page.waitForTimeout(900);

  // Close, then immediately probe: overlay should still be exiting but must not catch clicks.
  await page.click('button[aria-label="Fermer"]');
  out.push({ exit: await page.evaluate(() => {
    const ov = document.querySelector('[data-slot="expandable-screen-overlay"]');
    if (!ov) return { gone: true };
    const under = document.elementFromPoint(400, 300);
    return {
      gone: false,
      pointerEvents: getComputedStyle(ov).pointerEvents,
      underTag: under ? under.tagName : null,
      underInsideOverlay: under ? ov.contains(under) : null,
      opacity: under ? Number(getComputedStyle(ov).opacity).toFixed(2) : null,
    };
  }) });

  // Also probe a second time ~120ms into the exit animation (still exiting).
  await page.waitForTimeout(120);
  out.push({ midExit: await page.evaluate(() => {
    const ov = document.querySelector('[data-slot="expandable-screen-overlay"]');
    if (!ov) return { gone: true };
    const under = document.elementFromPoint(400, 300);
    return {
      gone: false,
      pointerEvents: getComputedStyle(ov).pointerEvents,
      underInsideOverlay: under ? ov.contains(under) : null,
    };
  }) });

  await page.waitForTimeout(600);
  out.push({ after: await page.evaluate(() => ({
    overlayGone: !document.querySelector('[data-slot="expandable-screen-overlay"]'),
    focused: (document.activeElement && (document.activeElement.dataset?.slot || document.activeElement.tagName)) || null,
    bodyOverflow: document.body.style.overflow,
  })) });
  return out;
}
