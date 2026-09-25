import { describe, expect, it } from "vitest";
import { normalizeHex } from "../utils";

describe("normalizeHex", () => {
  it("adds a missing # when that makes a valid hex color", () => {
    expect(normalizeHex("112233")).toBe("#112233");
    expect(normalizeHex("abc")).toBe("#aabbcc");
  });

  it("expands 3-digit hex to 6 digits, keeping case", () => {
    expect(normalizeHex("#123")).toBe("#112233");
    expect(normalizeHex("#ABC")).toBe("#AABBCC");
  });

  it("drops the alpha from 4- and 8-digit hex", () => {
    expect(normalizeHex("#abcd")).toBe("#aabbcc");
    expect(normalizeHex("#aabbccdd")).toBe("#aabbcc");
  });

  it("leaves 6-digit hex, rgb, and hsl unchanged", () => {
    expect(normalizeHex("#112233")).toBe("#112233");
    expect(normalizeHex("rgb(1, 2, 3)")).toBe("rgb(1, 2, 3)");
    expect(normalizeHex("hsl(0, 100%, 50%)")).toBe("hsl(0, 100%, 50%)");
  });

  it("leaves invalid and empty input unchanged", () => {
    expect(normalizeHex("zz")).toBe("zz");
    expect(normalizeHex("")).toBe("");
  });
});
