import { describe, expect, it } from "vitest";
import { checkColors } from "../checkColors";
import { summarizeUserPair } from "../summarizeUserPair";

function summarize(color1: string, color2: string) {
  const output = checkColors([color1, color2]);
  if (!output.valid) throw new Error("Expected valid colors");
  return summarizeUserPair(output.results);
}

describe("summarizeUserPair", () => {
  it("suggests no fix when everything already passes", () => {
    const summary = summarize("#222222", "#cccccc"); // ~9.91

    expect(summary.state).toBe("all-pass");
    expect(summary.suggestedFix).toBeNull();
  });

  it("suggests the body-text fix when only large text passes", () => {
    const summary = summarize("#9057AB", "#F5E960"); // ~4.04

    expect(summary.state).toBe("so-close");
    expect(summary.suggestedFix).toBe(summary.bodyFix);
    expect(summary.suggestedFix?.moves).toBe("color1");
    expect(summary.suggestedFix?.ratio).toBeGreaterThanOrEqual(4.5);
  });

  it("suggests the large-text fix between 2:1 and 3:1, moving Color 2 when Color 1 can't move", () => {
    // #222222 can't get any darker, so only Color 2 (lighter) can fix this pair
    const summary = summarize("#222222", "#555555"); // ~2.13

    expect(summary.state).toBe("large-only");
    expect(summary.suggestedFix).toBe(summary.largeFix);
    expect(summary.suggestedFix?.moves).toBe("color2");
    expect(summary.suggestedFix?.ratio).toBeGreaterThanOrEqual(3);
    expect(summary.bodyFix).not.toBeNull();
  });

  it("suggests the large-text fix first below 2:1, keeping the body fix available", () => {
    const summary = summarize("#222222", "#444444"); // ~1.63

    expect(summary.state).toBe("big-change");
    expect(summary.suggestedFix).toBe(summary.largeFix);
    expect(summary.suggestedFix?.ratio).toBeGreaterThanOrEqual(3);
    expect(summary.bodyFix).not.toBeNull();
  });
});
