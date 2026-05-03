// Day 2: Locators in Playwright.
// A locator means "how Playwright finds something on the page".
const { test, expect } = require('@playwright/test');

// getByRole finds elements the same way a user or screen reader understands them.
// Good for: headings, links, buttons, checkboxes, textboxes.
test('locator practice - getByRole1', async ({ page }) => {
  // Open the same sample website from Day 1.
  await page.goto('https://example.com');

  // Find the main heading by its role and visible name.
  const heading = page.getByRole('heading', { name: 'Example Domain' });

  // Check that the heading is visible.
  await expect(heading).toBeVisible();

  // Find the link by its role and visible name.
  const learnMoreLink = page.getByRole('link', { name: 'Learn more' });

  // Check that the link is visible.
  await expect(learnMoreLink).toBeVisible();
});

// getByText finds something by the text shown on the page.
// Good for: checking messages, labels, headings, or todo item text.
test('locator practice - getByText', async ({ page }) => {
  // Open the TodoMVC demo app.
  await page.goto('/todomvc');

  // Add one todo item.
  await page.getByPlaceholder('What needs to be done?').fill('Practice getByText');
  await page.keyboard.press('Enter');

  // Find the todo item by the text visible on the page.
  const todoText = page.getByText('Practice getByText');

  // Check that the todo item is visible.
  await expect(todoText).toBeVisible();
});

// getByLabel finds form controls by their label.
// Good for: input boxes, checkboxes, radio buttons, and accessible controls.
test('locator practice - getByLabel', async ({ page }) => {
  // Open the TodoMVC demo app.
  await page.goto('/todomvc');

  // Add two todo items.
  await page.getByPlaceholder('What needs to be done?').fill('Practice getByLabel');
  await page.keyboard.press('Enter');

  await page.getByPlaceholder('What needs to be done?').fill('Keep this active');
  await page.keyboard.press('Enter');

  // Find the first checkbox by its label and tick it.
  await page.getByLabel('Toggle Todo').first().check();

  // Because one item is completed, only one item should be left active.
  await expect(page.getByText('1 item left')).toBeVisible();
});

// CSS selectors find elements using HTML tag names, classes, ids, or attributes.
// Good for: when the page does not have a good role, text, or label.
test('locator practice - CSS selectors', async ({ page }) => {
  // Open the TodoMVC demo app.
  await page.goto('/todomvc');

  // CSS selector .new-todo means:
  // find an element with class="new-todo".
  const todoInput = page.locator('.new-todo');

  // Add the first todo item.
  await todoInput.fill('Practice CSS selectors');
  await page.keyboard.press('Enter');

  // Add the second todo item.
  await todoInput.fill('Count todo list items');
  await page.keyboard.press('Enter');

  // CSS selector .todo-list li means:
  // find all li items inside an element with class="todo-list".
  const todoItems = page.locator('.todo-list li');

  // Check that there are exactly 2 todo items.
  await expect(todoItems).toHaveCount(2);
});
