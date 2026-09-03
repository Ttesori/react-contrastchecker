import { describe, expect, it } from "vitest";
import Color from "colorjs.io";
import { computeContrastRatio } from "./computeContrastRatio";

describe("computeContrastRatio", () => {
  it("returns 21 for black against white", () => {
    const black = new Color("#000000");
    const white = new Color("#ffffff");

    expect(computeContrastRatio(black, white)).toBeCloseTo(21);
  });

  it("is symmetric regardless of argument order", () => {
    const a = new Color("#336699");
    const b = new Color("#f5f5f5");

    expect(computeContrastRatio(a, b)).toBeCloseTo(computeContrastRatio(b, a));
  });

  it("returns 1 for identical colors", () => {
    const color = new Color("#336699");
    const sameColor = new Color("#336699");

    expect(computeContrastRatio(color, sameColor)).toBeCloseTo(1);
  });
});
