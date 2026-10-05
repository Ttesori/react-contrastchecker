import { useEffect, useRef } from "react";
import { summarizeUserPair } from "../core/summarizeUserPair";
import type {
  ColorRole,
  Fix,
  PairClassification,
  ResultState,
} from "../core/types";
import ContrastDetails from "./ContrastDetails";
import FixSuggestion from "./FixSuggestion";
import PairPreview from "./PairPreview";
import ResultStep from "./ResultStep";
import ResultSummary from "./ResultSummary";
import { StarIcon } from "./utils/icons";
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

const ROLE_LABELS: Record<ColorRole, string> = {
  color1: "Color 1",
  color2: "Color 2",
};

function describeStepTwo(state: ResultState, fix: Fix | null): string {
  if (!fix) {
    return "We couldn’t find a nearby color change that adds enough contrast for this pair.";
  }
  if (state === "large-only") {
    return "A small change can make your colors more usable.";
  }
  if (state === "big-change") {
    return "These colors need a bigger change. Here’s a change that works for large text.";
  }
  const kept = fix.moves === "color1" ? "color2" : "color1";
  return `Keep ${ROLE_LABELS[kept]} and use this nearby ${fix.direction} version of ${ROLE_LABELS[fix.moves]}.`;
}

function ResultsView({ results, onCheckAnother }: ResultsViewProps) {
  const headingRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    headingRef.current?.focus();
  }, []);

  const summary = summarizeUserPair(results);
  const { state } = summary;
  const largeTextMeets = state === "all-pass" || state === "so-close";
  const fix = summary.suggestedFix;

  return (
    <div className="results-view">
      <ResultSummary state={state} headingRef={headingRef} />

      <ResultStep
        marker={state === "all-pass" ? <StarIcon /> : 1}
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

      {state !== "all-pass" && (
        <ResultStep
          marker={2}
          heading="Here’s How To Make It Work"
          description={describeStepTwo(state, fix)}
        >
          {fix && (
            <FixSuggestion
              fix={fix}
              color1={summary.color1}
              color2={summary.color2}
            />
          )}
        </ResultStep>
      )}

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
