import Color from "colorjs.io";

export type ParseColorResult =
  { valid: true; color: Color } | { valid: false; error: string };

export const INVALID_COLOR_MESSAGE = "Enter a valid hex, rgb, or hsl color.";

export function parseColor(input: unknown): ParseColorResult {
  if (typeof input !== "string" || input.trim() === "") {
    return { valid: false, error: INVALID_COLOR_MESSAGE };
  }

  try {
    const color = new Color(input.trim());
    color.alpha = 1; // transparency isn't supported; use the opaque color
    return { valid: true, color };
  } catch {
    return { valid: false, error: INVALID_COLOR_MESSAGE };
  }
}
