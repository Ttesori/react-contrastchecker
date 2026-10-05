import type Color from "colorjs.io";

export function toHex(color: Color): string {
  return color.toString({ format: "hex", collapse: false }).toUpperCase();
}

// Round down so a failing ratio like 4.497 never displays as a passing 4.50.
export function formatRatio(ratio: number): string {
  return `${(Math.floor(ratio * 100) / 100).toFixed(2)}:1`;
}
