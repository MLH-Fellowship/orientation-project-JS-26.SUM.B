import nspell from "nspell";

// Returns a { before, after } pair for every misspelled word found in the text.
export function findSpellingErrors(text, checker) {
  const seen = new Set();
  const corrections = [];
  const words = text.match(/[A-Za-z']+/g) || [];
  for (const word of words) {
    if (seen.has(word) || checker.correct(word)) continue;
    seen.add(word);
    const [suggestion] = checker.suggest(word);
    if (suggestion) {
      corrections.push({ before: word, after: suggestion });
    }
  }
  return corrections;
}

// Loads the English dictionary shipped in /public and builds a checker.
export async function loadChecker() {
  const [aff, dic] = await Promise.all([
    fetch("/dictionaries/en.aff").then((r) => r.text()),
    fetch("/dictionaries/en.dic").then((r) => r.text()),
  ]);
  return nspell(aff, dic);
}
