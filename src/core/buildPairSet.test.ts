// src/core/buildPairSet.test.ts
import { describe, expect, it } from "vitest";
import Color from "colorjs.io";
import { buildPairSet, ColorPair } from "./buildPairSet";

function toHex(color: Color): string {
  return color.toString({ format: "hex" });
}

function isBlackWhitePair(pair: ColorPair): boolean {
  const fg = toHex(pair.foreground.color);
  const bg = toHex(pair.background.color);
  return (fg === "#000" && bg === "#fff") || (fg === "#fff" && bg === "#000");
}

describe("buildPairSet", () => {
  it("injects both neutrals and never pairs them together when neither is user-provided", () => {
    const brand1 = new Color("#336699");
    const brand2 = new Color("#ff6600");

    const pairs = buildPairSet([brand1, brand2]);

    expect(pairs).toHaveLength(10);
    expect(pairs.some(isBlackWhitePair)).toBe(false);
  });

  it("only injects the missing neutral when one is already user-provided", () => {
    const brand = new Color("#336699");
    const white = new Color("#ffffff");

    const pairs = buildPairSet([brand, white]);

    expect(pairs).toHaveLength(6);
  });

  it("pairs black against white when both are genuinely the user's own colors", () => {
    const black = new Color("#000000");
    const white = new Color("#ffffff");

    const pairs = buildPairSet([black, white]);

    expect(pairs).toHaveLength(2);
    expect(pairs.some(isBlackWhitePair)).toBe(true);
  });
});
