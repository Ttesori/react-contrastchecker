import Color from "colorjs.io";

export function isSameColor(a: Color, b: Color): boolean {
  return a.toString({ format: "hex" }) === b.toString({ format: "hex" });
}

export function computeContrastRatio(colorA: Color, colorB: Color): number {
  return colorA.contrast(colorB, "WCAG21");
}
