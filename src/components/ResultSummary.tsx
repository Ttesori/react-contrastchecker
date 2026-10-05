import type { ReactNode, Ref } from "react";
import type { ResultState } from "../core/types";
import { CheckCircleIcon, CrossCircleIcon, WarningIcon } from "./utils/icons";
import "../styles/ResultSummary.css";

type ResultSummaryProps = {
  state: ResultState;
  headingRef?: Ref<HTMLHeadingElement>;
};

const NEED_MORE_CONTRAST = (
  <>
    Your colors <strong>need more contrast.</strong>
  </>
);

const HEADLINES: Record<ResultState, ReactNode> = {
  "all-pass": (
    <>
      <strong>Great news!</strong> Your colors work for{" "}
      <strong>large text, UI elements</strong>, and{" "}
      <strong>regular text.</strong>
    </>
  ),
  "so-close": (
    <>
      <strong>So close!</strong> Your colors work for{" "}
      <strong>large text</strong> and <strong>UI elements</strong>, but{" "}
      <strong>not</strong> regular text.
    </>
  ),
  "large-only": NEED_MORE_CONTRAST,
  "big-change": NEED_MORE_CONTRAST,
};

const ICONS: Record<ResultState, ReactNode> = {
  "all-pass": <CheckCircleIcon />,
  "so-close": <WarningIcon />,
  "large-only": <CrossCircleIcon />,
  "big-change": <CrossCircleIcon />,
};

function ResultSummary({ state, headingRef }: ResultSummaryProps) {
  return (
    <div className={`result-summary result-summary-${state}`}>
      <span className="result-summary-icon" aria-hidden="true">
        {ICONS[state]}
      </span>
      <h2
        ref={headingRef}
        tabIndex={headingRef ? -1 : undefined}
        className="result-summary-headline"
      >
        {HEADLINES[state]}
      </h2>
    </div>
  );
}

export default ResultSummary;
