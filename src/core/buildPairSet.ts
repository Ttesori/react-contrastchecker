import Color from "colorjs.io";

type ColorPair = {
  foreground: Color;
  background: Color;
};

function isSameColor(a: Color, b: Color): boolean {
  return a.toString({ format: "hex" }) === b.toString({ format: "hex" });
}
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
        colorResults.push({
          foreground: colorA,
          background: colorB,
        });
        colorResults.push({
          foreground: colorB,
          background: colorA,
        });
      }
    }
  }
  return colorResults;
}
