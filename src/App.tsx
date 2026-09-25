import { useRef, useState, type FormEvent } from "react";
import { flushSync } from "react-dom";
import ColorInput from "./components/ColorInput";
import ResultsView from "./components/ResultsView";
import { checkColors } from "./core/checkColors";
import { normalizeHex } from "./core/utils";
import type { PairClassification } from "./core/types";
import "./styles/App.css";

function App() {
  const [color1, setColor1] = useState("");
  const [color2, setColor2] = useState("");
  const [submitAttempted, setSubmitAttempted] = useState(false);
  const [results, setResults] = useState<PairClassification[] | null>(null);
  const color1Ref = useRef<HTMLInputElement>(null);
  const color2Ref = useRef<HTMLInputElement>(null);

  function handleCheckContrast(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const normalized1 = normalizeHex(color1);
    const normalized2 = normalizeHex(color2);
    setColor1(normalized1);
    setColor2(normalized2);

    const result = checkColors([normalized1, normalized2]);

    if (result.valid) {
      setResults(result.results);
      return;
    }

    setSubmitAttempted(true);
    if (result.errors.color1) {
      color1Ref.current?.focus();
    } else if (result.errors.color2) {
      color2Ref.current?.focus();
    }
  }

  function handleCheckAnother() {
    flushSync(() => {
      setColor1("");
      setColor2("");
      setSubmitAttempted(false);
      setResults(null);
    });
    color1Ref.current?.focus();
  }

  return (
    <div className="app-page">
      <main className="app-card">
        <h1 className="app-brand">ContrastFix</h1>
        {results ? (
          <ResultsView results={results} onCheckAnother={handleCheckAnother} />
        ) : (
          <>
            <p className="app-intro">
              Check whether your brand colors have enough contrast, and find a
              better option when they don&apos;t.
            </p>

            <form className="app-form" onSubmit={handleCheckContrast}>
              <p className="app-format-hint">
                Enter two colors in HEX, RGB, or HSL format.
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

              <button type="submit" className="app-primary-button">
                Check Contrast
              </button>
            </form>
          </>
        )}
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
