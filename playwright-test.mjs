import { webkit } from 'playwright';

(async () => {
  console.log("Launching WebKit (Safari)...");
  const browser = await webkit.launch({ headless: true });
  const context = await browser.newContext({ acceptDownloads: true });
  const page = await context.newPage();

  try {
    console.log("Navigating to http://localhost:5173 ...");
    await page.goto('http://localhost:5173', { waitUntil: 'networkidle' });

    console.log("Looking for DHQC card...");
    await page.getByText('DHQC - Darul Hana Quranic Centre').click();

    console.log("Waiting for form to load...");
    await page.waitForSelector('text=Unit Al-Quran', { timeout: 5000 });

    console.log("Adding Pusat Pemuliaan...");
    await page.getByRole('button', { name: 'Tambah' }).click();

    console.log("Filling values...");
    await page.getByPlaceholder('Masukkan lokasi pusat pemuliaan 2025').fill('Pusat Ujian Safari');
    await page.locator('select').first().selectOption('Kuching');
    
    await page.getByPlaceholder('0.0').fill('15.5');

    console.log("Saving Draft...");
    await page.getByRole('button', { name: 'Simpan Draf' }).click();

    console.log("Waiting for success/saving state to settle...");
    await page.waitForTimeout(2000); // give it time to resolve

    console.log("Exporting PDF...");
    const downloadPromise = page.waitForEvent('download', { timeout: 30000 });
    await page.getByRole('button', { name: 'Export PDF' }).click();
    
    const download = await downloadPromise;
    const path = './test-export.pdf';
    await download.saveAs(path);
    console.log("Downloaded PDF successfully to", path);

  } catch (error) {
    console.error("Test failed:", error);
  } finally {
    await browser.close();
  }
})();
