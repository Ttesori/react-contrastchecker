import { useEffect, useRef } from "react";
import type Color from "colorjs.io";
import type { PairClassification } from "../core/types";
import "../styles/ResultsView.css";

type ResultsViewProps = {
  results: PairClassification[];
  onCheckAnother: () => void;
};

function toHex(color: Color): string {
  return color.toString({ format: "hex", collapse: false }).toLowerCase();
}

function describeTier(result: PairClassification["AA_body"]): string {
  switch (result.tier) {
    case "as-is":
      return "Passes";
    case "has-fix":
      return `Fails — suggested fix: ${toHex(result.nearestPassing)}`;
    case "no-fix":
      return "Fails — no fix found";
  }
}

function ResultsView({ results, onCheckAnother }: ResultsViewProps) {
  const headingRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    headingRef.current?.focus();
  }, []);

  const userPair = results.find(
    ({ pair }) => pair.foreground.isBrandColor && pair.background.isBrandColor,
  );

  return (
    <section className="results-view" aria-labelledby="results-heading">
      <h2 id="results-heading" ref={headingRef} tabIndex={-1}>
        Your results
      </h2>

      {userPair && (
        <dl className="results-view-details">
          <dt>Colors</dt>
          <dd>
            {toHex(userPair.pair.foreground.color)} on{" "}
            {toHex(userPair.pair.background.color)}
          </dd>
          <dt>Contrast ratio</dt>
          <dd>{userPair.ratio.toFixed(2)}:1</dd>
          <dt>AA body text</dt>
          <dd>{describeTier(userPair.AA_body)}</dd>
          <dt>AA large text</dt>
          <dd>{describeTier(userPair.AA_large)}</dd>
        </dl>
      )}

      <button
        type="button"
        className="app-primary-button"
        onClick={onCheckAnother}
      >
        Check Another Pair
      </button>
    </section>
  );
}

export default ResultsView;
