/**
 * Keyword extraction and hashtag suggestion utility.
 */

const STOP_WORDS = new Set([
  "the", "a", "an", "and", "or", "but", "in", "on", "at", "to", "for",
  "of", "with", "by", "from", "is", "are", "was", "were", "be", "been",
  "being", "have", "has", "had", "do", "does", "did", "will", "would",
  "could", "should", "may", "might", "shall", "can", "need", "dare",
  "it", "its", "this", "that", "these", "those", "i", "you", "he", "she",
  "we", "they", "me", "him", "her", "us", "them", "my", "your", "his",
  "our", "their", "not", "no", "so", "if", "then", "than", "too", "very",
  "just", "about", "up", "out", "into", "over", "after", "before", "between",
  "under", "above", "all", "each", "every", "both", "few", "more", "most",
  "other", "some", "such", "only", "own", "same", "also", "how", "what",
  "when", "where", "which", "who", "why", "as", "because", "while",
]);

export function extractHashtags(text: string, count = 5): string[] {
  const words = text.toLowerCase().match(/\b[a-z]{3,}\b/g) || [];

  // Count word frequency, excluding stop words
  const freq = new Map<string, number>();
  for (const word of words) {
    if (!STOP_WORDS.has(word)) {
      freq.set(word, (freq.get(word) || 0) + 1);
    }
  }

  // Sort by frequency and take top N
  return Array.from(freq.entries())
    .sort((a, b) => b[1] - a[1])
    .slice(0, count)
    .map(([word]) => `#${word}`);
}
