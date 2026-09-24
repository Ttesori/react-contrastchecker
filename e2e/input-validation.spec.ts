import { expect, test } from "@playwright/test";
import { INVALID_COLOR_MESSAGE } from "../src/core/parseColor";

const FORMAT_HINT = "Enter colors in HEX, RGB, or HSL format.";
const ERROR_AND_HINT = `${INVALID_COLOR_MESSAGE} ${FORMAT_HINT}`;

test.beforeEach(async ({ page }) => {
  await page.goto("/");
});

test("tabbing through empty fields shows no errors", async ({ page }) => {
  const color1 = page.getByLabel("Color 1 hex value");
  const color2 = page.getByLabel("Color 2 hex value");

  await color1.focus();
  await page.keyboard.press("Tab");
  await page.keyboard.press("Tab");

  await expect(color1).not.toHaveAttribute("aria-invalid");
  await expect(color2).not.toHaveAttribute("aria-invalid");
});

test("invalid input shows an error on blur, not while typing", async ({
  page,
}) => {
  const color1 = page.getByLabel("Color 1 hex value");

  await color1.pressSequentially("zz");
  await expect(color1).not.toHaveAttribute("aria-invalid");

  await page.keyboard.press("Tab");
  await expect(color1).toHaveAttribute("aria-invalid", "true");
  await expect(color1).toHaveAccessibleDescription(ERROR_AND_HINT);
});

test("the error message stays fixed while editing and clears once the value is valid", async ({
  page,
}) => {
  const color1 = page.getByLabel("Color 1 hex value");

  await color1.pressSequentially("zz");
  await page.keyboard.press("Tab");
  await expect(color1).toHaveAccessibleDescription(ERROR_AND_HINT);

  await color1.fill("zzqq");
  await expect(color1).toHaveAccessibleDescription(ERROR_AND_HINT);

  await color1.fill("#123456");
  await expect(color1).not.toHaveAttribute("aria-invalid");
  await expect(color1).toHaveAccessibleDescription(FORMAT_HINT);
});

test("hex input is normalized on blur", async ({ page }) => {
  const color1 = page.getByLabel("Color 1 hex value");

  await color1.fill("abc");
  await page.keyboard.press("Tab");
  await expect(color1).toHaveValue("#aabbcc");

  await color1.fill("#123");
  await page.keyboard.press("Tab");
  await expect(color1).toHaveValue("#112233");
  await expect(color1).not.toHaveAttribute("aria-invalid");
});

test("checking contrast with empty fields shows errors and focuses the first field", async ({
  page,
}) => {
  const color1 = page.getByLabel("Color 1 hex value");
  const color2 = page.getByLabel("Color 2 hex value");

  await page.getByRole("button", { name: "Check Contrast" }).click();

  await expect(color1).toBeFocused();
  await expect(color1).toHaveAccessibleDescription(ERROR_AND_HINT);
  await expect(color2).toHaveAccessibleDescription(ERROR_AND_HINT);
});

test("checking contrast focuses the first invalid field", async ({ page }) => {
  const color1 = page.getByLabel("Color 1 hex value");
  const color2 = page.getByLabel("Color 2 hex value");

  await color1.fill("#123456");
  await color2.fill("zz");
  await page.getByRole("button", { name: "Check Contrast" }).click();

  await expect(color2).toBeFocused();
  await expect(color2).toHaveAttribute("aria-invalid", "true");
  await expect(color1).not.toHaveAttribute("aria-invalid");
});
