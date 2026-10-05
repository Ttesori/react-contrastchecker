import type Color from "colorjs.io";
import type { Fix } from "../core/types";
import { meetsThreshold, RATIOS } from "../core/utils";
import PairPreview from "./PairPreview";
import { formatRatio, toHex } from "./utils/format";
import { ArrowRightIcon, CheckIcon, WarningIcon } from "./utils/icons";
import "../styles/FixSuggestion.css";

type FixSuggestionProps = {
  fix: Fix;
  color1: Color;
  color2: Color;
};

function SwatchWithLabel({ label, color }: { label: string; color: Color }) {
  return (
    <div className="fix-suggestion-swatch">
      <span
        className="fix-suggestion-chip"
        style={{ backgroundColor: toHex(color) }}
      />
      <span className="fix-suggestion-swatch-label">
        <strong>{label}</strong> {toHex(color)}
      </span>
    </div>
  );
}

function FixSuggestion({ fix, color1, color2 }: FixSuggestionProps) {
  const updatedColor1 = fix.moves === "color1" ? fix.suggested : color1;
  const updatedColor2 = fix.moves === "color2" ? fix.suggested : color2;
  const reachesBodyText = meetsThreshold(fix.ratio, RATIOS.AA_body);

  return (
    <div className="fix-suggestion">
      <div className="fix-suggestion-change">
        <h3 className="fix-suggestion-heading">Change This Color</h3>
        <div className="fix-suggestion-swatches">
          <SwatchWithLabel label="Original" color={fix.original} />
          <span className="fix-suggestion-arrow">
            <ArrowRightIcon />
          </span>
          <SwatchWithLabel label="Suggested" color={fix.suggested} />
        </div>
      </div>

      <div className="fix-suggestion-updated">
        <div className="fix-suggestion-updated-header">
          <h3 className="fix-suggestion-heading">Updated Pairing</h3>
          <span>Contrast Ratio {formatRatio(fix.ratio)}</span>
        </div>
        <PairPreview
          first={{ label: "Color 1", color: updatedColor1 }}
          second={{ label: "Color 2", color: updatedColor2 }}
        />
        <p
          className={
            reachesBodyText
              ? "fix-suggestion-result"
              : "fix-suggestion-result fix-suggestion-result-partial"
          }
        >
          <span className="fix-suggestion-result-icon">
            {reachesBodyText ? <CheckIcon /> : <WarningIcon />}
          </span>
          {reachesBodyText
            ? "Works for regular text, large text, and UI elements."
            : "This adjustment works for larger text and UI elements, but body-sized text still needs more contrast."}
        </p>
      </div>
    </div>
  );
}

export default FixSuggestion;
