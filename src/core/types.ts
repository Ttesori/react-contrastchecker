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
  AA_body: ThresholdResult;
  AA_large: ThresholdResult;
};

type ThresholdResult =
  | { tier: "as-is" }
  | { tier: "has-fix"; nearestPassing: Color }
  | { tier: "no-fix" };
