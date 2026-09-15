import { describe, it, expect } from "vitest";
import Color from "colorjs.io";
import { decideColorMove } from "../colorDecision";
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

describe("decideColorMove", () => {
  it("moves the foreground lighter when the background is black", () => {
    const pair = makePair("#3275b4", true, "#000000", false);
    expect(decideColorMove(pair)).toEqual({
      side: "foreground",
      direction: "lighter",
    });
  });

  it("moves the foreground darker when the background is white", () => {
    const pair = makePair("#3275b4", true, "#ffffff", false);
    expect(decideColorMove(pair)).toEqual({
      side: "foreground",
      direction: "darker",
    });
  });

  it("moves the background lighter when the foreground is black", () => {
    const pair = makePair("#000000", false, "#3275b4", true);
    expect(decideColorMove(pair)).toEqual({
      side: "background",
      direction: "lighter",
    });
  });

  it("moves the background darker when the foreground is white", () => {
    const pair = makePair("#ffffff", false, "#3275b4", true);
    expect(decideColorMove(pair)).toEqual({
      side: "background",
      direction: "darker",
    });
  });

  it("moves the foreground lighter when neither is neutral and foreground is already lighter", () => {
    const pair = makePair("#dddddd", true, "#2266a4", true);
    expect(decideColorMove(pair)).toEqual({
      side: "foreground",
      direction: "lighter",
    });
  });

  it("moves the foreground darker when neither is neutral and foreground is already darker", () => {
    const pair = makePair("#111111", true, "#2266a4", true);
    expect(decideColorMove(pair)).toEqual({
      side: "foreground",
      direction: "darker",
    });
  });
});
