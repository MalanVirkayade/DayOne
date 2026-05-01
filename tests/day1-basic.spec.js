// Import Playwright's test function and expect assertion function.
const { test, expect } = require('@playwright/test');

// Create one test case with a clear test name.
test('open a website and verify page title', async ({ page }) => {
  // Open the Example website in the browser.
  await page.goto('https://example.com');

  // Verify that the browser page title contains "Example Domain".
  await expect(page).toHaveTitle(/Example Domain/);

  // Find the heading with text "Example Domain" and verify it is visible.
  await expect(page.getByRole('heading', { name: 'Example Domain' })).toBeVisible();
});

// Create another test case for adding a todo item.
test('add a todo item', async ({ page }) => {
  // Open the TodoMVC demo app. The base URL is set in playwright.config.js.
  await page.goto('/todomvc');

  // Find the input box by its placeholder text and type a todo item.
  await page.getByPlaceholder('What needs to be done?').fill('Learn Playwright basics');

  // Press Enter from the keyboard to add the todo item.
  await page.keyboard.press('Enter');

  // Verify that the new todo item text is visible on the page.
  await expect(page.getByText('Learn Playwright basics')).toBeVisible();
});

// Create a test case for adding two todo items and completing one.
test('add two todo items and mark one completed', async ({ page }) => {
  // Open the TodoMVC demo app.
  await page.goto('/todomvc');

  // Find the todo input box and type the first todo item.
  await page.getByPlaceholder('What needs to be done?').fill('Install Playwright');

  // Press Enter to add the first todo item.
  await page.keyboard.press('Enter');

  // Find the todo input box again and type the second todo item.
  await page.getByPlaceholder('What needs to be done?').fill('Write first test');

  // Press Enter to add the second todo item.
  await page.keyboard.press('Enter');

  // Verify that the first todo item is visible.
  await expect(page.getByText('Install Playwright')).toBeVisible();

  // Verify that the second todo item is visible.
  await expect(page.getByText('Write first test')).toBeVisible();

  // Find the first todo checkbox and mark it as completed.
  await page.getByLabel('Toggle Todo').first().check();

  // Verify that only one todo item is still active.
  await expect(page.getByText('1 item left')).toBeVisible();
});
