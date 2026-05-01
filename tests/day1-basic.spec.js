const { test, expect } = require('@playwright/test');

test('open a website and verify page title', async ({ page }) => {
  await page.goto('https://example.com');

  await expect(page).toHaveTitle(/Example Domain/);
  await expect(page.getByRole('heading', { name: 'Example Domain' })).toBeVisible();
});

test('add a todo item', async ({ page }) => {
  await page.goto('/todomvc');

  await page.getByPlaceholder('What needs to be done?').fill('Learn Playwright basics');
  await page.keyboard.press('Enter');

  await expect(page.getByText('Learn Playwright basics')).toBeVisible();
});

test('add two todo items and mark one completed', async ({ page }) => {
  await page.goto('/todomvc');

  await page.getByPlaceholder('What needs to be done?').fill('Install Playwright');
  await page.keyboard.press('Enter');

  await page.getByPlaceholder('What needs to be done?').fill('Write first test');
  await page.keyboard.press('Enter');

  await expect(page.getByText('Install Playwright')).toBeVisible();
  await expect(page.getByText('Write first test')).toBeVisible();

  await page.getByLabel('Toggle Todo').first().check();

  await expect(page.getByText('1 item left')).toBeVisible();
});
