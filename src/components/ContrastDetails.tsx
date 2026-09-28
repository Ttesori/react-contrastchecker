import "../styles/ContrastDetails.css";

type ContrastDetailsProps = {
  ratio: number;
  regularText: boolean;
  largeText: boolean;
  uiElements: boolean;
};

// Round down so a failing ratio like 4.497 never displays as a passing 4.50.
function formatRatio(ratio: number): string {
  return `${(Math.floor(ratio * 100) / 100).toFixed(2)}:1`;
}

function Result({ meets }: { meets: boolean }) {
  return (
    <span
      className={
        meets ? "contrast-details-meets" : "contrast-details-does-not-meet"
      }
    >
      <svg
        aria-hidden="true"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {meets ? (
          <path d="M20 6 9 17l-5-5" />
        ) : (
          <path d="M18 6 6 18M6 6l12 12" />
        )}
      </svg>
      {meets ? "Meets AA" : "Does Not Meet AA"}
    </span>
  );
}

function ContrastDetails({
  ratio,
  regularText,
  largeText,
  uiElements,
}: ContrastDetailsProps) {
  return (
    <div className="contrast-details">
      <h3 className="contrast-details-heading">Contrast Details</h3>
      <dl className="contrast-details-list">
        <dt>Contrast Ratio</dt>
        <dd>{formatRatio(ratio)}</dd>
        <dt>Regular Text</dt>
        <dd>
          <Result meets={regularText} />
        </dd>
        <dt>Large Text</dt>
        <dd>
          <Result meets={largeText} />
        </dd>
        <dt>UI Elements</dt>
        <dd>
          <Result meets={uiElements} />
        </dd>
      </dl>
    </div>
  );
}

export default ContrastDetails;
