/**
 * Readability analysis utility.
 * Identifies long sentences, calculates readability metrics.
 */

export interface ReadabilityResult {
  avgWordsPerSentence: number;
  longSentences: string[];
  totalSentences: number;
  readabilityLevel: "easy" | "moderate" | "hard";
}

export function analyzeReadability(text: string): ReadabilityResult {
  const sentences = text
    .split(/[.!?]+/)
    .map((s) => s.trim())
    .filter((s) => s.length > 0);

  const totalSentences = sentences.length;
  const wordCounts = sentences.map(
    (s) => (s.match(/\b\w+\b/g) || []).length
  );
  const totalWords = wordCounts.reduce((a, b) => a + b, 0);
  const avgWordsPerSentence =
    totalSentences > 0 ? totalWords / totalSentences : 0;

  // Flag sentences longer than 25 words
  const longSentences = sentences.filter(
    (s, i) => wordCounts[i] > 25
  );

  let readabilityLevel: "easy" | "moderate" | "hard" = "easy";
  if (avgWordsPerSentence > 20) readabilityLevel = "hard";
  else if (avgWordsPerSentence > 14) readabilityLevel = "moderate";

  return {
    avgWordsPerSentence: Math.round(avgWordsPerSentence * 10) / 10,
    longSentences,
    totalSentences,
    readabilityLevel,
  };
}
