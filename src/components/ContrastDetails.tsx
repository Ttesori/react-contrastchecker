import { formatRatio } from "./utils/format";
import { CheckIcon, CrossIcon } from "./utils/icons";
import "../styles/ContrastDetails.css";

type ContrastDetailsProps = {
  ratio: number;
  regularText: boolean;
  largeText: boolean;
  uiElements: boolean;
};

function Result({ meets }: { meets: boolean }) {
  return (
    <span
      className={
        meets ? "contrast-details-meets" : "contrast-details-does-not-meet"
      }
    >
      {meets ? <CheckIcon /> : <CrossIcon />}
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
