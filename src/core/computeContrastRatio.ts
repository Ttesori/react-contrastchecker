import Color from "colorjs.io";

export function computeContrastRatio(colorA: Color, colorB: Color): number {
  return colorA.contrast(colorB, "WCAG21");
}
