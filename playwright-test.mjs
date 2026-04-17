import { chromium } from 'playwright';

(async () => {
  const appUrl = process.env.APP_URL || 'http://127.0.0.1:4173';

  console.log('Launching Chromium...');
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({ acceptDownloads: true });
  const page = await context.newPage();

  try {
    console.log(`Navigating to ${appUrl} ...`);
    await page.goto(appUrl, { waitUntil: 'networkidle' });

    const tutorialDismiss = page.getByRole('button', { name: 'Faham, tutup panduan' });
    if (await tutorialDismiss.isVisible().catch(() => false)) {
      console.log('Closing tutorial modal...');
      await tutorialDismiss.click();
    }

    console.log('Opening BDAKWAH department...');
    await page.getByRole('button', { name: /Bahagian Dakwah BDAKWAH/i }).click();

    console.log('Selecting Unit Al-Quran...');
    await page.getByRole('button', { name: /Unit Al-Quran/i }).click();

    console.log('Waiting for form to load...');
    await page.waitForSelector('text=Tambah Pusat Pemuliaan 2025', { timeout: 10000 });

    console.log('Adding Pusat Pemuliaan...');
    await page.getByRole('button', { name: 'Tambah' }).click();

    console.log('Filling values...');
    await page.getByPlaceholder('Masukkan lokasi pusat pemuliaan 2025').fill('Pusat Ujian Safari');
    await page.locator('select').first().selectOption('Kuching');
    await page.getByPlaceholder('0.0').fill('15.5');

    console.log('Saving draft...');
    await page.getByRole('button', { name: 'Simpan Draf' }).click();

    console.log('Waiting for success state...');
    await page.waitForSelector('text=Data telah berjaya disimpan secara lokal!', { timeout: 10000 });

    console.log('Exporting PDF...');
    const downloadPromise = page.waitForEvent('download', { timeout: 30000 });
    await page.getByRole('button', { name: 'Export PDF' }).click();

    const download = await downloadPromise;
    const path = './test-export.pdf';
    await download.saveAs(path);
    console.log('Downloaded PDF successfully to', path);

  } catch (error) {
    console.error('Test failed:', error);
    process.exitCode = 1;
  } finally {
    await browser.close();
  }
})();
