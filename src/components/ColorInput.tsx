import { useState, type Ref } from "react";
import Color from "colorjs.io";
import { INVALID_COLOR_MESSAGE, parseColor } from "../core/parseColor";
import { getReadableTextColor, normalizeHex } from "../core/utils";
import { PencilIcon } from "./utils/icons";
import "../styles/ColorInput.css";

type ColorInputProps = {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  submitAttempted: boolean;
  ref?: Ref<HTMLInputElement>;
};

function resolveColor(value: string): Color {
  const result = parseColor(value);
  return result.valid ? result.color : new Color("#000000");
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
    submitAttempted && !parseResult.valid ? parseResult.error : null;
  const errorMessage = blurError ?? submitError;
  const errorId = `${id}-error`;

  const resolvedColor = resolveColor(value);
  const swatchHex = resolvedColor
    .toString({ format: "hex", collapse: false })
    .toLowerCase();
  const labelColor = getReadableTextColor(resolvedColor);

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
        <span
          className="color-input-swatch-hint"
          style={{ color: labelColor }}
          aria-hidden="true"
        >
          Click to edit
        </span>
        <span className="color-input-swatch-icon" style={{ color: labelColor }}>
          <PencilIcon />
        </span>
      </div>
      <label htmlFor={id} className="visually-hidden">
        {label} hex value
      </label>
      <div className="color-input-text-wrapper">
        <input
          ref={ref}
          id={id}
          type="text"
          className="color-input-text"
          placeholder="#000000"
          value={value}
          aria-invalid={errorMessage !== null || undefined}
          aria-describedby={errorId}
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
        <p
          id={errorId}
          className={
            errorMessage !== null
              ? "color-input-error"
              : "color-input-error color-input-error-hidden"
          }
        >
          {errorMessage ?? INVALID_COLOR_MESSAGE}
        </p>
      </div>
    </div>
  );
}

export default ColorInput;
