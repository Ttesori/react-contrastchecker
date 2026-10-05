import { describe, it, expect } from "vitest";
import Color from "colorjs.io";
import { classifyPair } from "../classifyPair";
import { meetsThreshold } from "../utils";
import type { ColorPair } from "../types";

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

describe("classifyPair", () => {
  it("marks both thresholds as-is when the pair already passes comfortably", () => {
    // black on white, ratio 21 — the maximum possible, passes everything
    const pair = makePair("#000000", true, "#ffffff", true);
    const result = classifyPair(pair);

    expect(result.AA_body).toEqual({ tier: "as-is" });
    expect(result.AA_large).toEqual({ tier: "as-is" });
  });

  it("passes AA_large as-is but finds a fix for AA_body", () => {
    // #8a8a8a on white, ratio ~3.45 — clears the 3.0 large-text line but not the 4.5 body line
    const pair = makePair("#8a8a8a", true, "#ffffff", true);
    const result = classifyPair(pair);

    expect(result.AA_large).toEqual({ tier: "as-is" });
    expect(result.decision).toEqual({
      side: "foreground",
      direction: "darker",
    });
    expect(result.AA_body.tier).toBe("has-fix");
    if (result.AA_body.tier === "has-fix") {
      expect(result.AA_body.nearestPassing.toString({ format: "hex" })).toBe(
        "#757575",
      );
    }
  });

  it("finds a fix for large text but not for body text on the same pair", () => {
    // your own verified pair from findNearestPassingColor.spec.ts
    const pair = makePair("#BBE048", true, "#0396AA", true);
    const result = classifyPair(pair);

    expect(result.AA_large.tier).toBe("has-fix");
    if (result.AA_large.tier === "has-fix") {
      expect(result.AA_large.nearestPassing.toString({ format: "hex" })).toBe(
        "#d6fd68",
      );
    }

    expect(result.AA_body).toEqual({ tier: "no-fix" });
  });

  it("counts a ratio exactly at a threshold as passing", () => {
    expect(meetsThreshold(4.5, 4.5)).toBe(true);
    expect(meetsThreshold(4.49, 4.5)).toBe(false);
  });
});
