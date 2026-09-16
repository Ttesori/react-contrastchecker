import { describe, it, expect } from "vitest";
import { checkColors } from "../checkColors";

describe("checkColors", () => {
  it("returns valid: true with classified results when both colors are valid", () => {
    const output = checkColors(["#BBE048", "#0396AA"]);

    expect(output.valid).toBe(true);
    if (output.valid) {
      expect(output.results.length).toBeGreaterThan(0);
      output.results.forEach((result) => {
        expect(result).toHaveProperty("ratio");
        expect(result).toHaveProperty("AA_body");
        expect(result).toHaveProperty("AA_large");
      });
    }
  });

  it("returns valid: false with the color1 error when only the first color is invalid", () => {
    const output = checkColors(["not-a-color", "#0396AA"]);

    expect(output.valid).toBe(false);
    if (!output.valid) {
      expect(output.errors.color1).toBe(
        `"not-a-color" isn't a valid color. Try hex, rgb, or hsl.`,
      );
      expect(output.errors.color2).toBeUndefined();
    }
  });

  it("returns valid: false with the color2 error when only the second color is invalid", () => {
    const output = checkColors(["#BBE048", "not-a-color"]);

    expect(output.valid).toBe(false);
    if (!output.valid) {
      expect(output.errors.color2).toBe(
        `"not-a-color" isn't a valid color. Try hex, rgb, or hsl.`,
      );
      expect(output.errors.color1).toBeUndefined();
    }
  });

  it("returns valid: false with both errors when both colors are invalid", () => {
    const output = checkColors(["not-a-color", "also-not-a-color"]);

    expect(output.valid).toBe(false);
    if (!output.valid) {
      expect(output.errors.color1).toBe(
        `"not-a-color" isn't a valid color. Try hex, rgb, or hsl.`,
      );
      expect(output.errors.color2).toBe(
        `"also-not-a-color" isn't a valid color. Try hex, rgb, or hsl.`,
      );
    }
  });

  it("short-circuits before building or classifying any pairs when validation fails", () => {
    const output = checkColors(["not-a-color", "#0396AA"]);

    expect(output.valid).toBe(false);
    expect(output).not.toHaveProperty("results");
  });
});
