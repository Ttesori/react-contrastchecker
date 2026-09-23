import Color from "colorjs.io";
import { parseColor } from "../core/parseColor";
import { computeContrastRatio } from "../core/utils";
import "../styles/ColorInput.css";

type ColorInputProps = {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
};

const BLACK = new Color("#000000");
const WHITE = new Color("#ffffff");

function resolveColor(value: string): Color {
  const result = parseColor(value);
  return result.valid ? result.color : new Color("#000000");
}

function getReadableLabelColor(color: Color): string {
  const contrastWithBlack = computeContrastRatio(color, BLACK);
  const contrastWithWhite = computeContrastRatio(color, WHITE);
  return contrastWithWhite > contrastWithBlack ? "#ffffff" : "#000000";
}

function addMissingHash(value: string): string {
  if (value.startsWith("#") || parseColor(value).valid) {
    return value;
  }

  const withHash = `#${value}`;
  return parseColor(withHash).valid ? withHash : value;
}

function ColorInput({ id, label, value, onChange }: ColorInputProps) {
  const resolvedColor = resolveColor(value);
  const swatchHex = resolvedColor
    .toString({ format: "hex", collapse: false })
    .toLowerCase();
  const labelColor = getReadableLabelColor(resolvedColor);

  return (
    <div className="color-input-field">
      <div className="color-input-swatch-wrapper">
        <input
          type="color"
          id={`${id}-picker`}
          aria-label={`${label} picker`}
          className="color-input-swatch"
          value={swatchHex}
          onChange={(event) => onChange(event.target.value)}
        />
        <span
          className="color-input-swatch-label"
          style={{ color: labelColor }}
          aria-hidden="true"
        >
          {label}
        </span>
        <svg
          className="color-input-swatch-icon"
          style={{ color: labelColor }}
          aria-hidden="true"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />
        </svg>
      </div>
      <label htmlFor={id} className="visually-hidden">
        {label} hex value
      </label>
      <input
        id={id}
        type="text"
        className="color-input-text"
        placeholder="#000000"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        onBlur={() => onChange(addMissingHash(value))}
      />
    </div>
  );
}

export default ColorInput;
