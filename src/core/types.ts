import Color from "colorjs.io";

export type ColorPair = {
  foreground: {
    color: Color;
    isBrandColor: boolean;
  };
  background: {
    color: Color;
    isBrandColor: boolean;
  };
};

export type ColorDecision = {
  side: keyof ColorPair; // 'foreground' | 'background'
  direction: "lighter" | "darker";
};

export type PairClassification = {
  ratio: number;
  pair: ColorPair;
  decision: ColorDecision;
  AA_body: ThresholdResult;
  AA_large: ThresholdResult;
};

export type ThresholdResult =
  | { tier: "as-is" }
  | { tier: "has-fix"; nearestPassing: Color }
  | { tier: "no-fix" };

export type ResultState = "all-pass" | "so-close" | "large-only" | "big-change";

export type ColorRole = "color1" | "color2";

export type Fix = {
  moves: ColorRole;
  original: Color;
  suggested: Color;
  direction: ColorDecision["direction"];
  ratio: number;
};

export type PairSummary = {
  state: ResultState;
  ratio: number;
  color1: Color;
  color2: Color;
  bodyFix: Fix | null;
  largeFix: Fix | null;
  suggestedFix: Fix | null;
};
