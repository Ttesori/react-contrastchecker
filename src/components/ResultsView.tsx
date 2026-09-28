import { useEffect, useRef } from "react";
import type { PairClassification } from "../core/types";
import ContrastDetails from "./ContrastDetails";
import PairPreview from "./PairPreview";
import ResultStep from "./ResultStep";
import ResultSummary, { type Outcome } from "./ResultSummary";
import "../styles/ResultsView.css";

type ResultsViewProps = {
  results: PairClassification[];
  onCheckAnother: () => void;
};

const STEP_ONE: Record<Outcome, { heading: string; description: string }> = {
  "all-pass": {
    heading: "Here’s What’s Working",
    description:
      "Your current pair has enough contrast for both larger elements and body-sized text.",
  },
  "some-pass": {
    heading: "Here’s What’s Happening",
    description:
      "Your current pair has enough contrast for larger elements, but body-sized text needs a little more separation.",
  },
  "none-pass": {
    heading: "Here’s What’s Happening",
    description:
      "Your current pair doesn’t have enough contrast for large elements or body text.",
  },
};

function getOutcome(result: PairClassification): Outcome {
  if (result.AA_body.tier === "as-is") return "all-pass";
  if (result.AA_large.tier === "as-is") return "some-pass";
  return "none-pass";
}

const starIcon = (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M12 2.5l2.9 5.9 6.6 1-4.8 4.6 1.1 6.5L12 17.4l-5.8 3.1 1.1-6.5-4.8-4.6 6.6-1z" />
  </svg>
);

function ResultsView({ results, onCheckAnother }: ResultsViewProps) {
  const headingRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    headingRef.current?.focus();
  }, []);

  // Color 1 on Color 2: the first pair where both colors are the user's own.
  const userPair = results.find(
    ({ pair }) => pair.foreground.isBrandColor && pair.background.isBrandColor,
  );
  if (!userPair) return null;

  const outcome = getOutcome(userPair);
  const largeTextMeets = userPair.AA_large.tier === "as-is";

  return (
    <div className="results-view">
      <ResultSummary outcome={outcome} headingRef={headingRef} />

      <ResultStep
        marker={outcome === "all-pass" ? starIcon : 1}
        heading={STEP_ONE[outcome].heading}
        description={STEP_ONE[outcome].description}
      >
        <div className="results-current-pair">
          <PairPreview
            first={{ label: "Color 1", color: userPair.pair.foreground.color }}
            second={{ label: "Color 2", color: userPair.pair.background.color }}
          />
          <ContrastDetails
            ratio={userPair.ratio}
            regularText={outcome === "all-pass"}
            largeText={largeTextMeets}
            uiElements={largeTextMeets}
          />
        </div>
      </ResultStep>

      <div className="results-actions">
        <button
          type="button"
          className="app-primary-button"
          onClick={onCheckAnother}
        >
          Check Another Pair
        </button>
      </div>
    </div>
  );
}

export default ResultsView;
