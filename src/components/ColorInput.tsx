import { useState, type Ref } from "react";
import Color from "colorjs.io";
import { parseColor } from "../core/parseColor";
import { computeContrastRatio } from "../core/utils";
import "../styles/ColorInput.css";

type ColorInputProps = {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  submitAttempted: boolean;
  ref?: Ref<HTMLInputElement>;
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

const SHORT_HEX = /^#([0-9a-f])([0-9a-f])([0-9a-f])$/i;

function normalizeHex(value: string): string {
  return addMissingHash(value).replace(SHORT_HEX, "#$1$1$2$2$3$3");
}

function ColorInput({
  id,
  label,
  value,
  onChange,
  submitAttempted,
  ref,
}: ColorInputProps) {
  const [blurError, setBlurError] = useState<string | null>(null);
  const parseResult = parseColor(value);
  const submitError =
    submitAttempted && !parseResult.valid && value.trim() === ""
      ? parseResult.error
      : null;
  const errorMessage = blurError ?? submitError;
  const errorId = `${id}-error`;

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
        ref={ref}
        id={id}
        type="text"
        className="color-input-text"
        placeholder="#000000"
        value={value}
        aria-invalid={errorMessage !== null || undefined}
        aria-describedby={errorMessage !== null ? errorId : undefined}
        onChange={(event) => {
          const nextValue = event.target.value;
          if (parseColor(nextValue).valid) {
            setBlurError(null);
          }
          onChange(nextValue);
        }}
        onBlur={() => {
          const normalized = normalizeHex(value);
          const result = parseColor(normalized);
          setBlurError(
            !result.valid && normalized.trim() !== "" ? result.error : null,
          );
          onChange(normalized);
        }}
      />
      {errorMessage !== null && (
        <p id={errorId} className="color-input-error">
          {errorMessage}
        </p>
      )}
    </div>
  );
}

export default ColorInput;
