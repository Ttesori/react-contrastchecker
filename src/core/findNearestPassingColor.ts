import Color from "colorjs.io";
import type { ColorPair, ColorDecision } from "./types";

export type SearchResult =
  { found: true; newColor: Color } | { found: false; newColor: null };

export function findNearestPassingColor(
  pair: ColorPair,
  decision: ColorDecision,
  targetRatio: number,
): SearchResult {
  // Get colors from pair
  const movingSide: Color = new Color(pair[decision.side].color);
  const anchorSide: Color =
    pair[decision.side === "background" ? "foreground" : "background"].color;

  // Check initial ratio, if too low return false
  if (movingSide.contrast(anchorSide, "WCAG21") < 2) {
    return { found: false, newColor: null };
  }

  const STEP: number = decision.direction === "lighter" ? 0.005 : -0.005; // fixed step size
  const lightness = movingSide.get("oklch.l"); // Current lightness

  let currentColor = new Color(movingSide); // the color we're manipulating

  // Loop through, changing the lightness each time
  for (let i = lightness; i > 0; i += STEP) {
    const prevColor = currentColor.clone(); // Save starting color
    const nextL = prevColor.get("oklch.l") + STEP; // get next lightness value

    // If next L is below zero or greater than 1, it's out of range so return false
    if (nextL < 0 || nextL > 1) {
      return { found: false, newColor: null };
    }

    const newColor = currentColor.clone();
    newColor.set("oklch.l", nextL); // move lightness
    newColor.toGamut({ space: "srgb" }); // gamut map to sRGB
    const currentRatio = newColor.contrast(anchorSide, "WCAG21"); // check new ratio

    // If current ratio is greater than target ratio, return colors
    if (currentRatio >= targetRatio) {
      return {
        found: true,
        newColor: newColor,
      };
    }

    // If we haven't achieved the target ratio, set currentColor to newColor and loop again
    currentColor = newColor.clone();
  }

  // If we finish the loop without finding a match, return false
  return {
    found: false,
    newColor: null,
  };
}
