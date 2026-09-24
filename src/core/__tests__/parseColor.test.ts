// src/core/parseColor.test.ts
import { describe, expect, it } from "vitest";
import { parseColor } from "../parseColor";

describe("parseColor", () => {
  it("parses a valid hex color", () => {
    const result = parseColor("#ff0000");

    expect(result.valid).toBe(true);
    if (result.valid) {
      expect(result.color.get("srgb.r")).toBeCloseTo(1);
      expect(result.color.get("srgb.g")).toBeCloseTo(0);
      expect(result.color.get("srgb.b")).toBeCloseTo(0);
    }
  });

  it("parses a valid rgb color", () => {
    const result = parseColor("rgb(255, 0, 0)");

    expect(result.valid).toBe(true);
    if (result.valid) {
      expect(result.color.get("srgb.r")).toBeCloseTo(1);
      expect(result.color.get("srgb.g")).toBeCloseTo(0);
      expect(result.color.get("srgb.b")).toBeCloseTo(0);
    }
  });

  it("parses a valid hsl color", () => {
    const result = parseColor("hsl(0, 100%, 50%)");

    expect(result.valid).toBe(true);
    if (result.valid) {
      expect(result.color.get("srgb.r")).toBeCloseTo(1);
      expect(result.color.get("srgb.g")).toBeCloseTo(0);
      expect(result.color.get("srgb.b")).toBeCloseTo(0);
    }
  });

  it("drops transparency from a 4-digit hex color, keeping its channels", () => {
    const result = parseColor("#f008");

    expect(result.valid).toBe(true);
    if (result.valid) {
      expect(result.color.alpha).toBe(1);
      expect(result.color.get("srgb.r")).toBeCloseTo(1);
      expect(result.color.get("srgb.g")).toBeCloseTo(0);
      expect(result.color.get("srgb.b")).toBeCloseTo(0);
    }
  });

  it("drops transparency from an 8-digit hex color", () => {
    const result = parseColor("#ff000080");

    expect(result.valid).toBe(true);
    if (result.valid) {
      expect(result.color.alpha).toBe(1);
    }
  });

  it("drops transparency from an rgba color", () => {
    const result = parseColor("rgba(255, 0, 0, 0.5)");

    expect(result.valid).toBe(true);
    if (result.valid) {
      expect(result.color.alpha).toBe(1);
    }
  });

  it("drops transparency from a space-separated rgb color with alpha", () => {
    const result = parseColor("rgb(255 0 0 / 50%)");

    expect(result.valid).toBe(true);
    if (result.valid) {
      expect(result.color.alpha).toBe(1);
    }
  });

  it("drops transparency from an hsla color", () => {
    const result = parseColor("hsla(0, 100%, 50%, 0.5)");

    expect(result.valid).toBe(true);
    if (result.valid) {
      expect(result.color.alpha).toBe(1);
    }
  });

  it("returns a structured error for an unrecognized color, rather than throwing", () => {
    expect(() => parseColor("not-a-real-color")).not.toThrow();

    const result = parseColor("not-a-real-color");
    expect(result.valid).toBe(false);
    if (!result.valid) {
      expect(result.error.length).toBeGreaterThan(0);
    }
  });

  it("returns a structured error for an empty string", () => {
    const result = parseColor("   ");
    expect(result.valid).toBe(false);
  });

  it("returns a structured error for a non-string input", () => {
    const result = parseColor(42);
    expect(result.valid).toBe(false);
  });
});
