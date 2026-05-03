// This line brings two helpful Playwright tools into this file:
// - test: lets us create a test case
// - expect: lets us check that something happened correctly
const { test, expect } = require('@playwright/test');

// This creates one test.
// The text inside quotes is the test name that will show in the test report.
// async means this test will do actions that take some time, like opening a web page.
test('open a website and verify page title', async ({ page }) => {
  // page is the browser tab Playwright gives us.
  // goto opens the website URL in that browser tab.
  // await means "wait until this step is finished before moving to the next line".
  await page.goto('https://example.com');

  // Check that the title of the page contains the words "Example Domain".
  // The / / around Example Domain create a pattern to match text.
  await expect(page).toHaveTitle(/Example Domain/);

  // Find a heading on the page with the name "Example Domain".
  // Then check that the heading can be seen by the user.
  await expect(page.getByRole('heading', { name: 'Example Domain' })).toBeVisible();
});

// This is a second test. Each test starts fresh with a new browser page.
test('add a todo item', async ({ page }) => {
  // Open the TodoMVC demo app.
  // Because this URL starts with /, Playwright uses the base URL from playwright.config.js.
  await page.goto('/todomvc');

  // Find the input box by the light gray hint text shown inside it.
  // fill types this text into that input box.
  await page.getByPlaceholder('What needs to be done?').fill('Learn Playwright basics');

  // Pretend the user pressed the Enter key on the keyboard.
  // In this app, pressing Enter adds the todo item to the list.
  await page.keyboard.press('Enter');

  // Check that our new todo text is now visible on the page.
  await expect(page.getByText('Learn Playwright basics')).toBeVisible();
});

// This test adds two todo items and then marks the first one as completed.
test('add two todo items and mark one completed', async ({ page }) => {
  // Open the TodoMVC demo app again for this test.
  await page.goto('/todomvc');

  // Type the first todo item into the input box.
  await page.getByPlaceholder('What needs to be done?').fill('Install Playwright');

  // Press Enter so the first todo item gets added.
  await page.keyboard.press('Enter');

  // Type the second todo item into the same input box.
  await page.getByPlaceholder('What needs to be done?').fill('Write first test');

  // Press Enter so the second todo item gets added.
  await page.keyboard.press('Enter');

  // Check that the first todo item appears on the page.
  await expect(page.getByText('Install Playwright')).toBeVisible();

  // Check that the second todo item appears on the page.
  await expect(page.getByText('Write first test')).toBeVisible();

  // Find all checkboxes with the label "Toggle Todo".
  // first() chooses the first checkbox from that list.
  // check() ticks the checkbox, which marks that todo as completed.
  await page.getByLabel('Toggle Todo').first().check();

  // Since one todo is completed, only one todo should still be left active.
  await expect(page.getByText('1 item left')).toBeVisible();
});
