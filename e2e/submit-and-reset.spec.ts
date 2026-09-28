import { expect, test, type Page } from "@playwright/test";
import { INVALID_COLOR_MESSAGE } from "../src/core/parseColor";

// Results content is a placeholder until the results screen is built, so
// these tests only rely on the input fields, the Check Another Pair button,
// and focus landing on a heading.
function getFields(page: Page) {
  return {
    color1: page.getByLabel("Color 1 hex value"),
    color2: page.getByLabel("Color 2 hex value"),
  };
}

async function expectResultsShown(page: Page) {
  const { color1, color2 } = getFields(page);
  await expect(
    page.getByRole("button", { name: "Check Another Pair" }),
  ).toBeVisible();
  await expect(color1).toHaveCount(0);
  await expect(color2).toHaveCount(0);
  await expect(page.locator(":focus")).toHaveRole("heading");
}

test.beforeEach(async ({ page }) => {
  await page.goto("/");
});

test("clicking Check Contrast with two valid colors shows results", async ({
  page,
}) => {
  const { color1, color2 } = getFields(page);

  await color1.fill("#767676");
  await color2.fill("#ffffff");
  await page.getByRole("button", { name: "Check Contrast" }).click();

  await expectResultsShown(page);
});

test("pressing Enter with two valid colors shows results", async ({ page }) => {
  const { color1, color2 } = getFields(page);

  await color1.fill("#767676");
  await color2.fill("#ffffff");
  await color2.press("Enter");

  await expectResultsShown(page);
});

test("pressing Enter normalizes the input before checking", async ({
  page,
}) => {
  const { color1, color2 } = getFields(page);

  await color1.fill("#767676");
  await color2.fill("abc");
  await color2.press("Enter");

  await expectResultsShown(page);
});

test("pressing Enter with invalid text shows its error and keeps focus", async ({
  page,
}) => {
  const { color1, color2 } = getFields(page);

  await color1.fill("#767676");
  await color2.fill("zz");
  await color2.press("Enter");

  await expect(color2).toBeFocused();
  await expect(color2).toHaveAttribute("aria-invalid", "true");
  await expect(page.getByText(INVALID_COLOR_MESSAGE).nth(1)).toBeVisible();
});

test("Check Another Pair returns to empty fields and focuses Color 1", async ({
  page,
}) => {
  const { color1, color2 } = getFields(page);

  await color1.fill("#767676");
  await color2.fill("#ffffff");
  await color2.press("Enter");
  await page.getByRole("button", { name: "Check Another Pair" }).click();

  await expect(color1).toBeFocused();
  await expect(color1).toHaveValue("");
  await expect(color2).toHaveValue("");
  await expect(color1).not.toHaveAttribute("aria-invalid");
  await expect(color2).not.toHaveAttribute("aria-invalid");
});
