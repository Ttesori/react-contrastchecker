const RATIOS = {
  AA_BODY_THRESHOLD: 4.5,
  AA_LARGE_THRESHOLD: 3,
  AA_UI_THRESHOLD: 3,
};

export type ThresholdFlags = {
  AA_body: boolean;
  AA_large: boolean;
  AA_ui: boolean;
};

export function evaluateRatio(ratio: number): ThresholdFlags {
  return {
    AA_body: ratio >= RATIOS.AA_BODY_THRESHOLD,
    AA_large: ratio >= RATIOS.AA_LARGE_THRESHOLD,
    AA_ui: ratio >= RATIOS.AA_UI_THRESHOLD,
  };
}
