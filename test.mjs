import puppeteer from 'puppeteer';

(async () => {
  const browser = await puppeteer.launch({ args: ['--no-sandbox', '--disable-setuid-sandbox'] });
  const page = await browser.newPage();
  
  page.on('response', response => {
    if (response.status() === 404) {
      console.log('404 URL:', response.url());
    }
  });

  try {
    await page.goto('http://localhost:3000', { waitUntil: 'load', timeout: 30000 });
    await new Promise(r => setTimeout(r, 2000));
  } catch (error) {
    console.log('FAILED TO LOAD:', error.message);
  }

  await browser.close();
})();
