import { describe, it, expect } from "vitest";
import Color from "colorjs.io";
import { findNearestPassingColor } from "./findNearestPassingColor";
import type { ColorPair, ColorDecision } from "./types";

function makePair(
  fgHex: string,
  fgIsBrand: boolean,
  bgHex: string,
  bgIsBrand: boolean,
): ColorPair {
  return {
    foreground: { color: new Color(fgHex), isBrandColor: fgIsBrand },
    background: { color: new Color(bgHex), isBrandColor: bgIsBrand },
  };
}

describe("findNearestPassingColor", () => {
  it("returns found: false with no color for a pair below the 2.0 floor, without running the scan", () => {
    const pair = makePair("#777777", true, "#666666", true); // starting ratio ~1.28
    const decision: ColorDecision = {
      side: "foreground",
      direction: "lighter",
    };

    expect(findNearestPassingColor(pair, decision, 3.0)).toEqual({
      found: false,
      newColor: null,
    });
  });

  it("finds a passing color for a normal fix", () => {
    const pair = makePair("#BBE048", true, "#0396AA", true); // starting ratio ~2.33
    const decision: ColorDecision = {
      side: "foreground",
      direction: "lighter",
    };

    const result = findNearestPassingColor(pair, decision, 3.0);

    expect(result.found).toBe(true);
    expect(result.newColor).not.toBeNull();
    expect(result.newColor?.toString({ format: "hex" })).toBe("#d6fd68");
  });

  it("finds a passing color for a fix that needs a large lightness move", () => {
    const pair = makePair("#e87f91", true, "#2266a4", true); // starting ratio ~2.25
    const decision: ColorDecision = {
      side: "foreground",
      direction: "lighter",
    };

    const result = findNearestPassingColor(pair, decision, 4.5);

    expect(result.found).toBe(true);
    expect(result.newColor).not.toBeNull();
    const actualRatio = result.newColor!.contrast(
      pair.background.color,
      "WCAG21",
    );
    expect(actualRatio).toBeGreaterThanOrEqual(4.5);
  });

  it("returns found: false when the target is unreachable in the committed direction", () => {
    const pair = makePair("#BBE048", true, "#0396AA", true);
    const decision: ColorDecision = {
      side: "foreground",
      direction: "lighter",
    };

    expect(findNearestPassingColor(pair, decision, 4.5)).toEqual({
      found: false,
      newColor: null,
    });
  });

  it("is deterministic: same input always produces the same output", () => {
    const pair = makePair("#BBE048", true, "#0396AA", true);
    const decision: ColorDecision = {
      side: "foreground",
      direction: "lighter",
    };

    const first = findNearestPassingColor(pair, decision, 3.0);
    const second = findNearestPassingColor(pair, decision, 3.0);

    expect(first.found).toBe(second.found);
    expect(first.newColor?.toString({ format: "hex" })).toBe(
      second.newColor?.toString({ format: "hex" }),
    );
  });
});
