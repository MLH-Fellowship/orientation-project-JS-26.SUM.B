import fs from "fs";
import path from "path";
import nspell from "nspell";
import { findSpellingErrors } from "./spellcheck";

// Build a checker from the bundled English dictionary (Node-side, no fetch).
const dir = path.join(__dirname, "..", "node_modules", "dictionary-en");
const checker = nspell(
  fs.readFileSync(path.join(dir, "index.aff")),
  fs.readFileSync(path.join(dir, "index.dic"))
);

test("returns before/after pairs for misspelled words", () => {
  const result = findSpellingErrors("Hellq there", checker);
  expect(result).toEqual([{ before: "Hellq", after: "Hello" }]);
});

test("returns nothing when the text is spelled correctly", () => {
  expect(findSpellingErrors("Hello there", checker)).toEqual([]);
});
