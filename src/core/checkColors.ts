import Color from "colorjs.io";
import { parseColor } from "./parseColor";
import { buildPairSet } from "./buildPairSet";
import { classifyPair } from "./classifyPair";
import type { PairClassification } from "./types";
import type { ParseColorResult } from "./parseColor";

type CheckColorsResult =
  | { valid: true; results: PairClassification[] }
  | { valid: false; errors: Record<string, string> };

export function checkColors(colors: string[]): CheckColorsResult {
  const parsedResults: ParseColorResult[] = []; // to hold parsed results
  colors.forEach((colorStr) => parsedResults.push(parseColor(colorStr))); // parse each color

  const errors: Record<string, string> = {}; // to hold errors

  // Step through each result to check for errors
  parsedResults.forEach((parsedResult, i) => {
    if (!parsedResult.valid) {
      const key = "color" + (i + 1);
      errors[key] = parsedResult.error;
    }
  });

  // If there are errors, return them
  if (Object.entries(errors).length > 0) {
    return {
      valid: false,
      errors,
    };
  }
  // If there are no errors, continue

  const validColors: Color[] = []; // to hold valid colors

  // Create array of colors from results
  parsedResults.forEach((result) => {
    if (result.valid) {
      validColors.push(result.color);
    }
  });
  const pairs = buildPairSet(validColors); // get the pair sets from our valid colors

  const results: PairClassification[] = []; // to hold results from classification

  pairs.forEach((pair) => results.push(classifyPair(pair))); // classify each pair

  // return results
  return {
    valid: true,
    results,
  };
}
