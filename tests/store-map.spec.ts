import {expect, test} from "@playwright/test";

test("the full-screen map opens the AMANE story", async ({page}) => {
  await page.goto("/en");

  await expect(page.getByText("ALL", {exact: true})).toHaveCount(0);
  await expect(page.getByText("KNIVES", {exact: true})).toHaveCount(0);
  await expect(page.getByRole("button", {name: /change language/i})).toHaveCount(0);

  const pin = page.getByRole("button", {name: "Open product: amane Santoku"});
  await expect(pin).toBeVisible();
  await pin.click();

  await expect(page).toHaveURL(/\/en\/products\/amane-santoku$/);
  await expect(page.locator('div[aria-live="polite"]')).toHaveText(/01\s*\/\s*12/);
});

test("AMANE story includes the official seven points", async ({page}) => {
  await page.goto("/en/products/amane-santoku");

  await expect(page.getByText("POINT 01", {exact: true})).toBeAttached();
  await expect(page.getByText("POINT 07", {exact: true})).toBeAttached();
  await expect(page.getByText("SPECIFICATION", {exact: true})).toBeAttached();
  await expect(page.getByText("CARE & ENGRAVING", {exact: true})).toBeAttached();
});

test("the story counter follows the internal scroll rail", async ({page}) => {
  await page.goto("/en/products/amane-santoku");
  const counter = page.locator('div[aria-live="polite"]');
  await expect(counter).toHaveText(/01\s*\/\s*12/);

  await page.getByRole("button", {name: "Go to page 12"}).click();
  await expect(counter).toHaveText(/12\s*\/\s*12/);
});
