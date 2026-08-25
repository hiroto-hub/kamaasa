import {expect, test} from "@playwright/test";

test("the full-screen map opens the AMANE story", async ({page}) => {
  await page.goto("/en");

  await expect(page.getByText("ALL", {exact: true})).toHaveCount(0);
  await expect(page.getByText("KNIVES", {exact: true})).toHaveCount(0);
  await expect(page.getByRole("button", {name: /change language/i})).toBeVisible();
  await expect(page.getByText("Cast Iron Pot", {exact: true})).toHaveCount(0);

  const pin = page.getByRole("button", {name: "Open product: amane Santoku"});
  await expect(pin).toBeVisible();
  await pin.click();

  await expect(page).toHaveURL(/\/en\/products\/amane-santoku$/);
  await expect(page.locator('div[aria-live="polite"]')).toHaveText(/01\s*\/\s*07/);
});

test("AMANE story groups the official points and related tools into seven pages", async ({page}) => {
  await page.goto("/en/products/amane-santoku");

  await expect(page.getByText("POINT 01", {exact: true})).toBeAttached();
  await expect(page.getByText("POINT 02", {exact: true})).toBeAttached();
  await expect(page.getByText("POINT 03", {exact: true})).toBeAttached();
  await expect(page.getByText("RELATED PRODUCTS", {exact: true})).toBeAttached();
  await expect(page.getByText("amane Chef knife", {exact: true})).toBeAttached();
  await expect(page.getByText("amane Sujihiki", {exact: true})).toBeAttached();
  await expect(page.getByText("amane Honesuki", {exact: true})).toBeAttached();
  await expect(page.getByText("SPECIFICATION / CARE", {exact: true})).toBeAttached();
});

test("the product story offers an always-visible route back to the map", async ({page}) => {
  await page.goto("/en/products/amane-santoku");

  const mapLink = page.getByRole("link", {
    name: "Back to store map",
    exact: true
  });
  await expect(mapLink).toBeVisible();
  await mapLink.click();

  await expect(page).toHaveURL(/\/en$/);
});

test("the story counter follows the internal scroll rail", async ({page}) => {
  await page.goto("/en/products/amane-santoku");
  const counter = page.locator('div[aria-live="polite"]');
  await expect(counter).toHaveText(/01\s*\/\s*07/);

  await page.getByRole("button", {name: "Go to page 7"}).click();
  await expect(counter).toHaveText(/07\s*\/\s*07/);
});

test("story text rises in sequence when a page becomes active", async ({page}) => {
  await page.goto("/en/products/amane-santoku");

  const secondPage = page.locator('[data-page="2"]');
  const secondTitle = secondPage.getByRole("heading", {
    name: "One knife for meat, fish, and vegetables."
  });

  await expect(secondPage).toHaveAttribute("data-active", "false");
  await expect(secondTitle).toHaveCSS("opacity", "0");

  await page.getByRole("button", {name: "Go to page 2"}).click();

  await expect(secondPage).toHaveAttribute("data-active", "true");
  await expect(secondTitle).toHaveCSS("opacity", "1");
  await expect(secondTitle).toHaveCSS("filter", "blur(0px)");
});

test("related knives link to the English online store", async ({page}) => {
  await page.goto("/en/products/amane-santoku");
  await page.getByRole("button", {name: "Go to page 7"}).click();

  const relatedLink = page.getByRole("link", {
    name: "amane Chef knife — view on the English online store"
  });
  await expect(relatedLink).toHaveAttribute(
    "href",
    "https://kama-asa.co.jp/en-us/products/amane-gyuto?country=US"
  );
  await expect(relatedLink).toHaveAttribute("hreflang", "en-US");
  await expect(relatedLink).toHaveAttribute("target", "_self");
});
