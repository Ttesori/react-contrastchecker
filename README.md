# Color Contrast Checker

A tool that checks whether two colors meet WCAG accessibility standards, and when they don't, suggests a replacement that does.

## Why this exists

Most contrast checkers stop at pass or fail. If a pairing fails, you're on your own to find something that works, usually by hand-adjusting a color and re-checking it, one guess at a time. This tool does that search for you: enter a foreground and background color, and if the pairing fails, it finds the nearest color that passes by adjusting lightness in OKLCH color space, a perceptually even color space where an equal step in lightness looks like roughly the same amount of change regardless of hue.

The result is meant to teach something too: contrast comes from a difference in _lightness_, not from colors looking different from each other. Two colors can seem completely unrelated and still fail.

## Status

Early development. v1 is in progress: a single color pair in, evaluated against WCAG AA, with a suggested fix when it fails. Not deployed yet.

## Roadmap

- **v1 (current).** One color pair at a time. `#000` and `#fff` are checked automatically alongside whatever's entered. Each pairing is evaluated against WCAG AA (body text, large text, and UI component thresholds), plus an informational APCA value. A failing pairing gets a suggested replacement, found by adjusting lightness in OKLCH. The color logic is a standalone, headless module, built and tested before any interface exists.
- **v2.** No new UI. The core is extended to accept a flat list of up to five brand colors instead of a single pair, with no requirement to assign foreground or background roles. Every pairing is evaluated exhaustively, with a handful of featured suggestions per brand color.
- **v3.** The interface that makes v2's palette logic usable: multi-color input, results for a full palette, and an optional secondary input for testing one specific pairing without gating the automatic results.

## Stack

- **React + Vite** for the interface
- **TypeScript** throughout
- **[Color.js](https://colorjs.io/)** for color parsing, color space conversion, and contrast ratio (WCAG and APCA)
- **Vitest** for testing
- **ESLint** (with `eslint-plugin-jsx-a11y-x`) and **Prettier** for linting and formatting
- **GitHub Actions** for CI: lint, format check, type check, test, and build on every pull request
- **Vercel** for deployment

## Getting started

```bash
npm install
npm run dev       # start the dev server
npm test          # run the test suite
npm run lint      # lint
npx prettier --check .   # check formatting
npx tsc --noEmit  # type check
npm run build     # production build
```

## How it's organized

The color logic lives in `src/core/`, with no dependency on React or the DOM. It's built and tested as a standalone module first; the interface is a consumer of it, not the other way around. This also keeps the door open for porting the core logic to another language later without a rewrite.
