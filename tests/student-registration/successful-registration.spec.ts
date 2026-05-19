// spec: specs/student-registration.plan.md
// seed: tests/seed.spec.ts

import { test, expect } from '@playwright/test';

test.describe('Student Registration Form', () => {
  test('Successful student registration with valid data', async ({ page }) => {
    // 1. Navigate to https://demoqa.com/automation-practice-form and wait for the Student Registration Form to load
    await page.goto('https://demoqa.com/automation-practice-form');
    await expect(page.getByRole('heading', { name: 'Practice Form' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Student Registration Form' })).toBeVisible();

    // 2. Enter "noor" in the First Name field and "qa" in the Last Name field
    await page.getByRole('textbox', { name: 'First Name' }).fill('noor');
    await page.getByRole('textbox', { name: 'Last Name' }).fill('qa');
    await expect(page.getByRole('textbox', { name: 'First Name' })).toHaveValue('noor');
    await expect(page.getByRole('textbox', { name: 'Last Name' })).toHaveValue('qa');

    // 3. Enter "n@gmail.com" in the Email field
    await page.getByRole('textbox', { name: 'name@example.com' }).fill('n@gmail.com');
    await expect(page.getByRole('textbox', { name: 'name@example.com' })).toHaveValue('n@gmail.com');

    // 4. Select the Female gender radio button
    await page.getByText('Female', { exact: true }).click();
    await expect(page.getByLabel('Female')).toBeChecked();

    // 5. Enter "3254563246" in the Mobile Number field
    await page.getByRole('textbox', { name: 'Mobile Number' }).fill('3254563246');
    await expect(page.getByRole('textbox', { name: 'Mobile Number' })).toHaveValue('3254563246');

    // 6. Open the Date of Birth picker, select year 2002, month September, and day 24
    await page.locator('#dateOfBirthInput').click();
    await page.selectOption('.react-datepicker__month-select', '8');
    await page.selectOption('.react-datepicker__year-select', '2002');
    await page.locator('.react-datepicker__day--024:not(.react-datepicker__day--outside-month)').click();
    await expect(page.locator('#dateOfBirthInput')).toHaveValue('24 Sep 2002');

    // 7. Leave Subjects empty (do not add any subject chips)
    await expect(page.locator('.subjects-auto-complete__multi-value')).toHaveCount(0);

    // 8. Check the Sports checkbox under Hobbies
    await page.getByText('Sports', { exact: true }).click();
    await expect(page.getByLabel('Sports')).toBeChecked();
    await expect(page.getByLabel('Reading')).not.toBeChecked();
    await expect(page.getByLabel('Music')).not.toBeChecked();

    // 9. Leave Picture empty (do not upload a file)
    await expect(page.locator('#uploadPicture')).toHaveValue('');

    // 10. Enter "Nablus" in the Current Address field
    await page.getByRole('textbox', { name: 'Current Address' }).fill('Nablus');
    await expect(page.getByRole('textbox', { name: 'Current Address' })).toHaveValue('Nablus');

    // 11. Open the State dropdown, select "Uttar Pradesh", then open the City dropdown and select "Agra"
    await page.locator('#state').click();
    await page.getByRole('option', { name: 'Uttar Pradesh' }).click();
    await page.locator('#city').click();
    await page.getByRole('option', { name: 'Agra' }).click();

    // 12. Click the Submit button
    await page.getByRole('button', { name: 'Submit' }).click({ force: true });
    const modal = page.locator('.modal-content');
    await expect(modal).toBeVisible();
    await expect(page.locator('.modal-title')).toHaveText('Thanks for submitting the form');
    await expect(page.getByRole('cell', { name: 'noor qa' })).toBeVisible();
    await expect(page.getByRole('cell', { name: 'n@gmail.com' })).toBeVisible();
    await expect(page.getByRole('cell', { name: 'Female' })).toBeVisible();
    await expect(page.getByRole('cell', { name: '3254563246' })).toBeVisible();
    await expect(page.getByRole('cell', { name: '24 September,2002' })).toBeVisible();
    await expect(page.getByRole('cell', { name: 'Sports' })).toBeVisible();
    await expect(page.getByRole('cell', { name: 'Nablus' })).toBeVisible();
    await expect(page.getByRole('cell', { name: 'Uttar Pradesh Agra' })).toBeVisible();
  });
});
