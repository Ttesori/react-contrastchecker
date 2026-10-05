import { useEffect, useRef } from "react";
import { summarizeUserPair } from "../core/summarizeUserPair";
import type { PairClassification, ResultState } from "../core/types";
import ContrastDetails from "./ContrastDetails";
import PairPreview from "./PairPreview";
import ResultStep from "./ResultStep";
import ResultSummary from "./ResultSummary";
import "../styles/ResultsView.css";

type ResultsViewProps = {
  results: PairClassification[];
  onCheckAnother: () => void;
};

const NEED_MORE_CONTRAST_STEP = {
  heading: "Here’s What’s Happening",
  description:
    "Your current pair doesn’t have enough contrast for large elements or body text.",
};

const STEP_ONE: Record<ResultState, { heading: string; description: string }> =
  {
    "all-pass": {
      heading: "Here’s What’s Working",
      description:
        "Your current pair has enough contrast for both larger elements and body-sized text.",
    },
    "so-close": {
      heading: "Here’s What’s Happening",
      description:
        "Your current pair has enough contrast for larger elements, but body-sized text needs a little more separation.",
    },
    "large-only": NEED_MORE_CONTRAST_STEP,
    "big-change": NEED_MORE_CONTRAST_STEP,
  };

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

  const summary = summarizeUserPair(results);
  const { state } = summary;
  const largeTextMeets = state === "all-pass" || state === "so-close";

  return (
    <div className="results-view">
      <ResultSummary state={state} headingRef={headingRef} />

      <ResultStep
        marker={state === "all-pass" ? starIcon : 1}
        heading={STEP_ONE[state].heading}
        description={STEP_ONE[state].description}
      >
        <div className="results-current-pair">
          <PairPreview
            first={{ label: "Color 1", color: summary.color1 }}
            second={{ label: "Color 2", color: summary.color2 }}
          />
          <ContrastDetails
            ratio={summary.ratio}
            regularText={state === "all-pass"}
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
