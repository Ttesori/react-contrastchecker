import { useRef, useState } from "react";
import ColorInput from "./components/ColorInput";
import { parseColor } from "./core/parseColor";
import "./styles/App.css";

function App() {
  const [color1, setColor1] = useState("");
  const [color2, setColor2] = useState("");
  const [submitAttempted, setSubmitAttempted] = useState(false);
  const color1Ref = useRef<HTMLInputElement>(null);
  const color2Ref = useRef<HTMLInputElement>(null);

  function handleCheckContrast() {
    setSubmitAttempted(true);

    if (!parseColor(color1).valid) {
      color1Ref.current?.focus();
    } else if (!parseColor(color2).valid) {
      color2Ref.current?.focus();
    }
  }

  return (
    <div className="app-page">
      <main className="app-card">
        <h1 className="app-brand">ContrastFix</h1>
        <p className="app-intro">
          Check whether your brand colors have enough contrast, and find a
          better option when they don&apos;t.
        </p>

        <div className="app-color-fields">
          <ColorInput
            id="color1"
            label="Color 1"
            value={color1}
            onChange={setColor1}
            submitAttempted={submitAttempted}
            ref={color1Ref}
          />
          <ColorInput
            id="color2"
            label="Color 2"
            value={color2}
            onChange={setColor2}
            submitAttempted={submitAttempted}
            ref={color2Ref}
          />
        </div>

        <p className="app-format-hint">
          Enter colors in HEX, RGB, or HSL format.
        </p>

        <button
          type="button"
          className="app-primary-button"
          onClick={handleCheckContrast}
        >
          Check Contrast
        </button>
      </main>

      <div className="app-info-panel">
        <div className="app-info-panel-column">
          <h2>How does it work?</h2>
          <p>
            Enter two colors and ContrastFix checks how readable they are
            together.
          </p>
        </div>
        <div className="app-info-panel-column">
          <h2>What does it check?</h2>
          <p>
            Your pair is checked against WCAG AA requirements for regular text,
            large text, and UI elements.
          </p>
        </div>
        <div className="app-info-panel-column">
          <h2>What if they don&apos;t work?</h2>
          <p>
            ContrastFix suggests a nearby adjustment when possible, plus other
            combinations that meet the target.
          </p>
        </div>
      </div>
    </div>
  );
}

export default App;
