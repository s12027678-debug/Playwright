// spec: specs/student-registration.plan.md
// seed: tests/seed.spec.ts

import { test, expect } from '@playwright/test';

test.describe('Student Registration Form', () => {
  test('Submit fails when required fields are empty', async ({ page }) => {
    // 1. Navigate to https://demoqa.com/automation-practice-form with a fresh page (no stored form data)
    await page.goto('https://demoqa.com/automation-practice-form');
    await expect(page.getByRole('heading', { name: 'Student Registration Form' })).toBeVisible();
    await expect(page.getByRole('textbox', { name: 'First Name' })).toHaveValue('');
    await expect(page.getByRole('textbox', { name: 'Last Name' })).toHaveValue('');
    await expect(page.getByRole('textbox', { name: 'Mobile Number' })).toHaveValue('');

    // 2. Without filling any fields, click the Submit button
    await page.getByRole('button', { name: 'Submit' }).click();
    await expect(page.locator('.modal-content')).not.toBeVisible();
    await expect(page.getByRole('heading', { name: 'Student Registration Form' })).toBeVisible();
    await expect(page.getByRole('textbox', { name: 'First Name' })).toHaveAttribute('required', '');
    await expect(page.getByRole('textbox', { name: 'Last Name' })).toHaveAttribute('required', '');
    await expect(page.getByRole('textbox', { name: 'Mobile Number' })).toHaveAttribute('required', '');

    // 3. Fill only First Name "noor", Last Name "qa", and Email "n@gmail.com" — leave Gender, Mobile, Date of Birth, State/City, and Address empty — then click Submit
    await page.getByRole('textbox', { name: 'First Name' }).fill('noor');
    await page.getByRole('textbox', { name: 'Last Name' }).fill('qa');
    await page.getByRole('textbox', { name: 'name@example.com' }).fill('n@gmail.com');
    await page.getByRole('button', { name: 'Submit' }).click();
    await expect(page.locator('.modal-content')).not.toBeVisible();
    await expect(page.getByRole('heading', { name: 'Student Registration Form' })).toBeVisible();

    // 4. Complete the form using valid data: First Name "noor", Last Name "qa", Email "n@gmail.com", Gender Female, Mobile "3254563246", Date of Birth 24 September 2002, Hobbies Sports, Address "Nablus", State Uttar Pradesh, City Agra (Subjects and Picture optional/empty)
    await page.getByText('Female', { exact: true }).click();
    await page.getByRole('textbox', { name: 'Mobile Number' }).fill('3254563246');
    await page.locator('#dateOfBirthInput').click();
    await page.selectOption('.react-datepicker__month-select', '8');
    await page.selectOption('.react-datepicker__year-select', '2002');
    await page.locator('.react-datepicker__day--024:not(.react-datepicker__day--outside-month)').click();
    await page.getByText('Sports', { exact: true }).click();
    await page.getByRole('textbox', { name: 'Current Address' }).fill('Nablus');
    await page.locator('#state').click();
    await page.getByRole('option', { name: 'Uttar Pradesh' }).click();
    await page.locator('#city').click();
    await page.getByRole('option', { name: 'Agra' }).click();
    await expect(page.getByRole('textbox', { name: 'First Name' })).toHaveValue('noor');
    await expect(page.getByRole('textbox', { name: 'Last Name' })).toHaveValue('qa');
    await expect(page.getByLabel('Female')).toBeChecked();
    await expect(page.getByRole('textbox', { name: 'Mobile Number' })).toHaveValue('3254563246');

    // 5. Click Submit
    await page.getByRole('button', { name: 'Submit' }).click({ force: true });
    await expect(page.locator('.modal-content')).toBeVisible();
    await expect(page.locator('.modal-title')).toHaveText('Thanks for submitting the form');
    await expect(page.getByRole('cell', { name: 'noor qa' })).toBeVisible();
    await expect(page.getByRole('cell', { name: 'n@gmail.com' })).toBeVisible();
    await expect(page.getByRole('cell', { name: '3254563246' })).toBeVisible();
  });
});
