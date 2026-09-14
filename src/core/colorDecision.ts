import Color from "colorjs.io";
import type { ColorPair } from "./types";
import { isSameColor } from "./utils";

type ColorDecision = {
  side: keyof ColorPair; // 'foreground' | 'background'
  direction: "lighter" | "darker";
};

const BLACK = new Color("#000000");
const WHITE = new Color("#ffffff");

export function decideColorMove(pair: ColorPair): ColorDecision {
  const { foreground, background } = pair;

  // If one of the colors is black/white, the direction is easy to figure out
  if (isSameColor(background.color, BLACK)) {
    return { side: "foreground", direction: "lighter" };
  }
  if (isSameColor(background.color, WHITE)) {
    return { side: "foreground", direction: "darker" };
  }
  if (isSameColor(foreground.color, BLACK)) {
    return { side: "background", direction: "lighter" };
  }
  if (isSameColor(foreground.color, WHITE)) {
    return { side: "background", direction: "darker" };
  }

  // Otherwise, return foreground moves and decide whether it goes lighter or darker based on luminance
  return {
    side: "foreground",
    direction:
      foreground.color.luminance > background.color.luminance
        ? "lighter"
        : "darker",
  };
}
