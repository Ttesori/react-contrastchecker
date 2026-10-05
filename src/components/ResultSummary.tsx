import type { ReactNode, Ref } from "react";
import type { ResultState } from "../core/types";
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

const FAIL_ICON = (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
  >
    <circle cx="12" cy="12" r="10" />
    <path d="M15 9l-6 6M9 9l6 6" />
  </svg>
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
  "all-pass": (
    <svg viewBox="0 0 24 24">
      <circle cx="12" cy="12" r="11" fill="currentColor" />
      <path
        d="M7 12.5l3.2 3.2L17 9"
        fill="none"
        stroke="#ffffff"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ),
  "so-close": (
    <svg viewBox="0 0 24 24">
      <path
        d="M10.3 3.2a2 2 0 0 1 3.4 0l8.6 15a2 2 0 0 1-1.7 3H3.4a2 2 0 0 1-1.7-3z"
        fill="currentColor"
      />
      <path
        d="M12 9v5"
        stroke="#ffffff"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <circle cx="12" cy="17.5" r="1.4" fill="#ffffff" />
    </svg>
  ),
  "large-only": FAIL_ICON,
  "big-change": FAIL_ICON,
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
