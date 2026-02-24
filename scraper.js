const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  const seeds = [11, 12, 13, 14, 15, 16, 17, 18, 19, 20];
  let grandTotal = 0;

  for (const seed of seeds) {
    const url = `https://sanand0.github.io/tdsdata/js_table/?seed=${seed}`;
    
    await page.goto(url, { waitUntil: 'networkidle' });
    await page.waitForSelector('table', { timeout: 15000 });

    const sum = await page.evaluate(() => {
      const cells = document.querySelectorAll('table td');
      let total = 0;
      cells.forEach(cell => {
        const val = parseFloat(cell.innerText.trim());
        if (!isNaN(val)) total += val;
      });
      return total;
    });

    console.log(`Seed ${seed}: ${sum}`);
    grandTotal += sum;
  }

  console.log(`Total sum across all seeds: ${grandTotal}`);
  await browser.close();
})();
