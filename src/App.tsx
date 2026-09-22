import "./App.css";

function App() {
  return (
    <div className="page">
      <main className="card">
        <h1 className="brand">ContrastFix</h1>
        <p className="intro">
          Check whether your brand colors have enough contrast, and find a
          better option when they don&apos;t.
        </p>

        <div className="color-fields">
          <div className="color-field">
            <label htmlFor="color1" className="color-field-label">
              Color 1
            </label>
            <input
              id="color1"
              type="text"
              className="color-field-input"
              placeholder="#000000"
            />
          </div>
          <div className="color-field">
            <label htmlFor="color2" className="color-field-label">
              Color 2
            </label>
            <input
              id="color2"
              type="text"
              className="color-field-input"
              placeholder="#000000"
            />
          </div>
        </div>

        <button type="button" className="primary-button" disabled>
          Check Contrast
        </button>
      </main>

      <div className="info-panel">
        <div className="info-panel-column">
          <h2>How does it work?</h2>
          <p>
            Enter two colors and ContrastFix checks how readable they are
            together.
          </p>
        </div>
        <div className="info-panel-column">
          <h2>What does it check?</h2>
          <p>
            Your pair is checked against WCAG AA requirements for regular text,
            large text, and UI elements.
          </p>
        </div>
        <div className="info-panel-column">
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
