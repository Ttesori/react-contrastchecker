import { describe, expect, it } from "vitest";
import { evaluateRatio } from "./evaluateRatio";

describe("evaluateRatio", () => {
  it("passes all three thresholds when the ratio is well above body text's", () => {
    const flags = evaluateRatio(7);

    expect(flags.AA_body).toBe(true);
    expect(flags.AA_large).toBe(true);
    expect(flags.AA_ui).toBe(true);
  });
});

describe("evaluateRatio", () => {
  it("passes large text and UI but not body", () => {
    const flags = evaluateRatio(4);

    expect(flags.AA_body).toBe(false);
    expect(flags.AA_large).toBe(true);
    expect(flags.AA_ui).toBe(true);
  });
});

describe("evaluateRatio", () => {
  it("fails body text, large text, and UI", () => {
    const flags = evaluateRatio(2.5);

    expect(flags.AA_body).toBe(false);
    expect(flags.AA_large).toBe(false);
    expect(flags.AA_ui).toBe(false);
  });
});

describe("evaluateRatio", () => {
  it("ratio sits exactly on a boundary (3 in this case)", () => {
    const flags = evaluateRatio(3);

    expect(flags.AA_body).toBe(false);
    expect(flags.AA_large).toBe(true);
    expect(flags.AA_ui).toBe(true);
  });
});
