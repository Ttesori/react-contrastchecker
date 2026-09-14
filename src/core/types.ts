import Color from "colorjs.io";

export type ColorPair = {
  foreground: {
    color: Color;
    isBrandColor: boolean;
  };
  background: {
    color: Color;
    isBrandColor: boolean;
  };
};
