import { test, expect } from '@playwright/test';

test('Successful Student Registration Form submission', async ({ page }) => {

  await page.goto('https://demoqa.com/automation-practice-form');

  await page.evaluate(() => {
    document.querySelectorAll('iframe, .adsbygoogle, #fixedban')
      .forEach(el => el.remove());
  });

  await page.locator('#firstName').fill('Igor');
  await page.locator('#lastName').fill('Lantushenko');
  await page.locator('#userEmail').fill('igor@gmail.com');
  await page.getByText('Male', { exact: true }).click();
  await page.locator('#userNumber').fill('9876543210');

  await page.locator('#subjectsInput').fill('Maths');
  await page.getByText('Maths', { exact: true }).click();

  await page.locator('label[for="hobbies-checkbox-1"]').click();
  await page.locator('#currentAddress').fill('Berlin, Germany');

  await page.locator('#state').click();
  await page.getByRole('option', { name: 'NCR' }).click();

  await page.locator('#city').click();
  await page.getByRole('option', { name: 'Delhi' }).click();

  await page.evaluate(() => {
    document.querySelectorAll('iframe, .adsbygoogle, #fixedban')
      .forEach(el => el.remove());
  });

  await page.locator('#submit').scrollIntoViewIfNeeded();
  await page.waitForTimeout(500);

  // Take screenshot BEFORE submit to verify form state
  await page.screenshot({ path: 'debug-before-submit.png', fullPage: true });

  await page.locator('#submit').click({ force: true });
  await page.waitForTimeout(3000);

  // Take screenshot AFTER submit to see what happened
  await page.screenshot({ path: 'debug-after-submit.png', fullPage: true });

  await expect(
    page.getByText('Thanks for submitting the form')
  ).toBeVisible({ timeout: 15000 });

});