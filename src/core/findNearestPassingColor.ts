import Color from "colorjs.io";
import type { ColorDecision } from "./colorDecision";
import type { ColorPair } from "./types";

export type CoarseResult = {
  found: boolean;
  bracket: Color[];
};

export function coarsePass(
  pair: ColorPair,
  decision: ColorDecision,
  targetRatio: number,
): CoarseResult {
  // Get colors from pair
  const movingSide: Color = new Color(pair[decision.side].color);
  const anchorSide: Color =
    pair[decision.side === "background" ? "foreground" : "background"].color;

  // Constant for coarse refinement
  const COARSE: number = decision.direction === "lighter" ? 0.05 : -0.05; // fixed coarse step size
  const lightness = movingSide.get("oklch.l");

  let currentColor = new Color(movingSide); // the color we're manipulating

  for (let i = lightness; i > 0; i += COARSE) {
    const prevColor = new Color(currentColor);
    const nextL = prevColor.get("oklch.l") + COARSE;

    if (nextL < 0 || nextL > 1) {
      return { found: false, bracket: [] };
    }

    const newColor = currentColor.set("oklch.l", nextL);

    const currentRatio = newColor.contrast(anchorSide, "WCAG21");
    console.log(newColor.toString({ format: "hex" }), currentRatio);

    if (currentRatio >= targetRatio) {
      return {
        found: true,
        bracket: [prevColor, newColor],
      };
    }
    currentColor = newColor;
  }

  return {
    found: false,
    bracket: [],
  };
}

const testPair: ColorPair = {
  foreground: {
    color: new Color("#666"),
    isBrandColor: true,
  },
  background: {
    color: new Color("#aaa"),
    isBrandColor: true,
  },
};
const testDecision: ColorDecision = {
  side: "foreground",
  direction: "darker",
};

const result = coarsePass(testPair, testDecision, 3);
const resultHexA = result.bracket[0].toString({ format: "hex" });
const startingColor = testPair.foreground.color.toString({ format: "hex" });
const colorBkg = testPair.background.color.toString({ format: "hex" });
console.log(resultHexA, startingColor, colorBkg);
