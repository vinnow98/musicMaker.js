import { hyphenate } from "hyphen/en-us";



export function splitToSyllables(text) {
  return hyphenate(text).then((result) => {
    const words = result.split(" ");
    const syllables = words.flatMap((word) => word.split("\u00AD"));
    return syllables;
  });
}