import type { ColorPair, PairClassification } from "./types";
import { computeContrastRatio, RATIOS } from "./utils";
import { decideColorMove } from "./colorDecision";
import { findNearestPassingColor } from "./findNearestPassingColor";

export function classifyPair(pair: ColorPair): PairClassification {
  const ratio = computeContrastRatio(
    pair.foreground.color,
    pair.background.color,
  );
  const decision = decideColorMove(pair);

  const result: PairClassification = {
    ratio,
    pair,
    AA_body: { tier: "no-fix" },
    AA_large: { tier: "no-fix" },
  };

  // Test ratio against our thresholds
  for (const ratioName of Object.keys(RATIOS) as (keyof typeof RATIOS)[]) {
    // If ratio already passes, return as-is
    if (ratio > RATIOS[ratioName]) {
      result[ratioName] = { tier: "as-is" };
    } else {
      // Otherwise search for passing color
      const searchResult = findNearestPassingColor(
        pair,
        decision,
        RATIOS[ratioName],
      );
      if (searchResult.found) {
        result[ratioName] = {
          tier: "has-fix",
          nearestPassing: searchResult.newColor,
        };
      } else {
        // if passing color can't be found, return no fix
        result[ratioName] = { tier: "no-fix" };
      }
    }
  }
  return result;
}
