import type Color from "colorjs.io";
import { getReadableTextColor } from "../core/utils";
import { toHex } from "./utils/format";
import "../styles/PairPreview.css";

type PairPreviewColor = {
  label: string;
  color: Color;
};

type PairPreviewProps = {
  first: PairPreviewColor;
  second: PairPreviewColor;
};

function PairPreviewHalf({
  swatch,
  sampleColor,
}: {
  swatch: PairPreviewColor;
  sampleColor: Color;
}) {
  const readable = getReadableTextColor(swatch.color);

  return (
    <div
      className="pair-preview-half"
      style={{ backgroundColor: toHex(swatch.color) }}
    >
      <span className="pair-preview-label" style={{ color: readable }}>
        {swatch.label}
      </span>
      <span
        className="pair-preview-sample"
        style={{ color: toHex(sampleColor) }}
        aria-hidden="true"
      >
        Sample
      </span>
      <span className="pair-preview-hex" style={{ color: readable }}>
        {toHex(swatch.color)}
      </span>
    </div>
  );
}

function PairPreview({ first, second }: PairPreviewProps) {
  return (
    <div className="pair-preview">
      <PairPreviewHalf swatch={first} sampleColor={second.color} />
      <PairPreviewHalf swatch={second} sampleColor={first.color} />
    </div>
  );
}

export default PairPreview;
