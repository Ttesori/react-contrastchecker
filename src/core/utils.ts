import Color from "colorjs.io";
import { parseColor } from "./parseColor";

export const RATIOS = {
  AA_body: 4.5,
  AA_large: 3.0,
};

export function isSameColor(a: Color, b: Color): boolean {
  return a.toString({ format: "hex" }) === b.toString({ format: "hex" });
}

export function computeContrastRatio(colorA: Color, colorB: Color): number {
  return colorA.contrast(colorB, "WCAG21");
}

function addMissingHash(value: string): string {
  if (value.startsWith("#") || parseColor(value).valid) {
    return value;
  }

  const withHash = `#${value}`;
  return parseColor(withHash).valid ? withHash : value;
}

const SHORT_HEX = /^#([0-9a-f])([0-9a-f])([0-9a-f])[0-9a-f]?$/i;
const HEX_WITH_ALPHA = /^#([0-9a-f]{6})[0-9a-f]{2}$/i;

// Adds a missing "#", expands 3/4-digit hex to 6 digits, and drops hex alpha.
// Anything else is returned unchanged.
export function normalizeHex(value: string): string {
  return addMissingHash(value)
    .replace(SHORT_HEX, "#$1$1$2$2$3$3")
    .replace(HEX_WITH_ALPHA, "#$1");
}
