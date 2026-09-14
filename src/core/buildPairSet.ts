import Color from "colorjs.io";
import { isSameColor } from "./utils";
import type { ColorPair } from "./types";

function isInGivenColors(a: Color, givenColors: Color[]): boolean {
  return givenColors.some((color) => isSameColor(a, color));
}

export function buildPairSet(userColors: Color[]): ColorPair[] {
  const workingColors = [...userColors];

  // Check for Black and White
  if (!isInGivenColors(new Color("#000"), workingColors)) {
    workingColors.push(new Color("#000"));
  }
  if (!isInGivenColors(new Color("#fff"), workingColors)) {
    workingColors.push(new Color("#fff"));
  }

  const colorResults = [];

  for (let i = 0; i < workingColors.length; i++) {
    for (let j = i + 1; j < workingColors.length; j++) {
      const colorA = workingColors[i];
      const colorB = workingColors[j];

      const aFromUser = isInGivenColors(colorA, userColors);
      const bFromUser = isInGivenColors(colorB, userColors);

      if (!aFromUser && !bFromUser) {
        //skip
      } else {
        const colorAObj = {
          color: colorA,
          isBrandColor: aFromUser,
        };
        const colorBObj = {
          color: colorB,
          isBrandColor: bFromUser,
        };

        colorResults.push({
          foreground: colorAObj,
          background: colorBObj,
        });

        colorResults.push({
          foreground: colorBObj,
          background: colorAObj,
        });
      }
    }
  }
  return colorResults;
}
