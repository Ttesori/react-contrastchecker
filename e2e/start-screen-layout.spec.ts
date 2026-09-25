import { expect, test, type Locator, type Page } from "@playwright/test";
import { INVALID_COLOR_MESSAGE } from "../src/core/parseColor";

type Size = { width: number; fontSize?: number };

const SIZES: Size[] = [
  { width: 320 },
  { width: 375 },
  { width: 768 },
  { width: 1024 },
  { width: 1440 },
  { width: 320, fontSize: 32 },
  { width: 1280, fontSize: 32 },
];

function describeSize({ width, fontSize }: Size) {
  return fontSize ? `${width}px wide at ${fontSize}px text` : `${width}px wide`;
}

// Sets the browser's default font size, the way a user's text-size setting
// does, so rem sizes and em breakpoints both respond. Chromium only.
async function openAtSize(page: Page, { width, fontSize }: Size) {
  await page.setViewportSize({ width, height: 900 });
  if (fontSize) {
    const cdp = await page.context().newCDPSession(page);
    await cdp.send("Page.setFontSizes", { fontSizes: { standard: fontSize } });
  }
  await page.goto("/");
  await page.evaluate(() => document.fonts.ready);
}

async function overlaps(a: Locator, b: Locator) {
  const boxA = await a.boundingBox();
  const boxB = await b.boundingBox();
  if (!boxA || !boxB) {
    throw new Error("Expected both elements to be rendered");
  }
  return !(
    boxA.x + boxA.width <= boxB.x ||
    boxB.x + boxB.width <= boxA.x ||
    boxA.y + boxA.height <= boxB.y ||
    boxB.y + boxB.height <= boxA.y
  );
}

for (const size of SIZES) {
  test(`no horizontal scrolling at ${describeSize(size)}`, async ({ page }) => {
    await openAtSize(page, size);

    const hasHorizontalScroll = await page.evaluate(
      () =>
        document.documentElement.scrollWidth >
        document.documentElement.clientWidth,
    );
    expect(hasHorizontalScroll).toBe(false);
  });

  test(`error bubbles don't overlap other content at ${describeSize(size)}`, async ({
    page,
  }) => {
    await openAtSize(page, size);

    const fields = [1, 2].map((n) => ({
      input: page.getByLabel(`Color ${n} hex value`),
      picker: page.getByLabel(`Color ${n} picker`),
    }));
    await fields[0].input.fill("zz");
    await fields[1].input.fill("qq");
    await fields[1].input.blur();

    const bubbles = page.getByText(INVALID_COLOR_MESSAGE);
    await expect(bubbles).toHaveCount(2);
    await expect(bubbles.nth(0)).toBeVisible();
    await expect(bubbles.nth(1)).toBeVisible();

    const hint = page.getByText("Enter two colors in HEX, RGB, or HSL format.");
    const button = page.getByRole("button", { name: "Check Contrast" });

    for (const [i, other] of [
      [0, 1],
      [1, 0],
    ]) {
      const bubble = bubbles.nth(i);
      const neighbors = {
        "its own input": fields[i].input,
        "the other bubble": bubbles.nth(other),
        "the other input": fields[other].input,
        "the other swatch": fields[other].picker,
        "the format hint": hint,
        "the Check Contrast button": button,
      };

      for (const [name, neighbor] of Object.entries(neighbors)) {
        expect(
          await overlaps(bubble, neighbor),
          `Color ${i + 1}'s bubble overlaps ${name}`,
        ).toBe(false);
      }
    }
  });
}
