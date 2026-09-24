import { expect, test } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("/");
});

test("4-digit hex drops transparency on blur", async ({ page }) => {
  const color1 = page.getByLabel("Color 1 hex value");

  await color1.fill("#abcd");
  await page.keyboard.press("Tab");

  await expect(color1).toHaveValue("#aabbcc");
  await expect(color1).not.toHaveAttribute("aria-invalid");
});

test("8-digit hex drops transparency on blur", async ({ page }) => {
  const color1 = page.getByLabel("Color 1 hex value");

  await color1.fill("#aabbccdd");
  await page.keyboard.press("Tab");

  await expect(color1).toHaveValue("#aabbcc");
  await expect(color1).not.toHaveAttribute("aria-invalid");
});
