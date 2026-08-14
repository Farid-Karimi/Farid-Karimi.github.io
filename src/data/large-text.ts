import raw from "./homeLargeText.json";

export interface LargeTextSection {
  lines: string[];
}

export const largeText: LargeTextSection = {
  lines: raw.lines,
};
