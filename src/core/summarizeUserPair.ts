import type {
  ColorRole,
  Fix,
  PairClassification,
  PairSummary,
  ResultState,
  ThresholdResult,
} from "./types";
import {
  computeContrastRatio,
  meetsThreshold,
  RATIOS,
  SMALL_FIX_FLOOR,
} from "./utils";

function getState(ratio: number): ResultState {
  if (meetsThreshold(ratio, RATIOS.AA_body)) return "all-pass";
  if (meetsThreshold(ratio, RATIOS.AA_large)) return "so-close";
  if (meetsThreshold(ratio, SMALL_FIX_FLOOR)) return "large-only";
  return "big-change";
}

// Turns one direction's fix into a Fix described in Color 1 / Color 2 terms.
function toFix(
  result: PairClassification,
  threshold: ThresholdResult,
  frontRole: ColorRole,
): Fix | null {
  if (threshold.tier !== "has-fix") return null;

  const { side, direction } = result.decision;
  const anchorSide = side === "foreground" ? "background" : "foreground";
  const backRole: ColorRole = frontRole === "color1" ? "color2" : "color1";

  return {
    moves: side === "foreground" ? frontRole : backRole,
    original: result.pair[side].color,
    suggested: threshold.nearestPassing,
    direction,
    ratio: computeContrastRatio(
      threshold.nearestPassing,
      result.pair[anchorSide].color,
    ),
  };
}

// When both colors can move, suggest the one that changes least.
function smallerChange(a: Fix | null, b: Fix | null): Fix | null {
  if (!a) return b;
  if (!b) return a;
  const changeA = a.original.deltaE(a.suggested, "OK");
  const changeB = b.original.deltaE(b.suggested, "OK");
  return changeA <= changeB ? a : b;
}

export function summarizeUserPair(results: PairClassification[]): PairSummary {
  // buildPairSet lists the user's pair as Color 1 on Color 2, then the reverse.
  const [color1Front, color2Front] = results.filter(
    ({ pair }) => pair.foreground.isBrandColor && pair.background.isBrandColor,
  );
  if (!color1Front || !color2Front) {
    throw new Error("Results are missing the user's color pair");
  }

  const state = getState(color1Front.ratio);
  const bodyFix = smallerChange(
    toFix(color1Front, color1Front.AA_body, "color1"),
    toFix(color2Front, color2Front.AA_body, "color2"),
  );
  const largeFix = smallerChange(
    toFix(color1Front, color1Front.AA_large, "color1"),
    toFix(color2Front, color2Front.AA_large, "color2"),
  );

  const suggestedFix = {
    "all-pass": null,
    "so-close": bodyFix,
    "large-only": largeFix,
    "big-change": bodyFix ?? largeFix,
  }[state];

  return {
    state,
    ratio: color1Front.ratio,
    color1: color1Front.pair.foreground.color,
    color2: color1Front.pair.background.color,
    bodyFix,
    largeFix,
    suggestedFix,
  };
}
