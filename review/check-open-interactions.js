async (page) => {
  const out = [];
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("http://127.0.0.1:4173/demarrer", { waitUntil: "networkidle" });
  await page.waitForTimeout(800);

  await page.click('[data-slot="expandable-screen-trigger"]');
  await page.waitForSelector('[data-slot="expandable-screen-overlay"]', { timeout: 5000 });
  await page.waitForTimeout(900);

  // Click a sector option — the wizard should advance to step 2.
  await page.getByText("Boutique & Mode", { exact: true }).click();
  await page.waitForTimeout(700);
  out.push({ step: await page.evaluate(() => {
    const t = document.body.innerText;
    return { step2Visible: /\u00c9TAPE 2\s*\/\s*6/i.test(t), step1Gone: !/QU'EST-CE QUI VOUS P\u00c8SE/i.test(t) || /\u00c9TAPE 2/.test(t) };
  }) });

  // Escape should close + restore scroll.
  await page.keyboard.press("Escape");
  await page.waitForTimeout(500);
  out.push({ afterEscape: await page.evaluate(() => ({
    overlayGone: !document.querySelector('[data-slot="expandable-screen-overlay"]'),
    bodyOverflow: document.body.style.overflow,
    focused: (document.activeElement && (document.activeElement.dataset?.slot || document.activeElement.tagName)) || null,
  })) });
  return out;
}
