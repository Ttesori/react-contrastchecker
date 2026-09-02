import Color from "colorjs.io";

export type ParseColorResult =
  { valid: true; color: Color } | { valid: false; error: string };

export function parseColor(input: unknown): ParseColorResult {
  if (typeof input !== "string" || input.trim() === "") {
    return {
      valid: false,
      error: "Enter a color as hex, rgb, or hsl.",
    };
  }

  try {
    const color = new Color(input.trim());
    return { valid: true, color };
  } catch {
    return {
      valid: false,
      error: `"${input}" isn't a valid color. Try hex, rgb, or hsl.`,
    };
  }
}
