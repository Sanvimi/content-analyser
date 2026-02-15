/**
 * Rule-based sentiment analysis utility.
 * Scores text on a scale from -1 (negative) to +1 (positive).
 */

const POSITIVE_WORDS = new Set([
  "great", "amazing", "awesome", "excellent", "fantastic", "wonderful", "love",
  "happy", "joy", "beautiful", "brilliant", "outstanding", "perfect", "best",
  "good", "nice", "superb", "incredible", "remarkable", "delightful", "excited",
  "inspiring", "positive", "powerful", "success", "successful", "win", "winning",
  "thankful", "grateful", "celebrate", "achievement", "impressive", "strong",
  "innovative", "creative", "exceptional", "thriving", "passionate", "motivated",
  "confident", "thrilled", "blessed", "proud", "cheerful", "optimistic",
]);

const NEGATIVE_WORDS = new Set([
  "bad", "terrible", "awful", "horrible", "hate", "angry", "sad", "ugly",
  "worst", "poor", "disappointing", "failure", "fail", "weak", "boring",
  "painful", "annoying", "frustrating", "disgusting", "dreadful", "miserable",
  "negative", "problem", "crisis", "disaster", "broken", "toxic", "worried",
  "stressed", "anxious", "afraid", "hopeless", "useless", "pathetic",
  "struggling", "difficult", "unhappy", "depressed", "exhausted", "overwhelmed",
]);

export type SentimentLabel = "positive" | "negative" | "neutral";

export interface SentimentResult {
  score: number; // -1 to 1
  label: SentimentLabel;
  positiveCount: number;
  negativeCount: number;
}

export function analyzeSentiment(text: string): SentimentResult {
  const words = text.toLowerCase().match(/\b[a-z]+\b/g) || [];
  let positiveCount = 0;
  let negativeCount = 0;

  for (const word of words) {
    if (POSITIVE_WORDS.has(word)) positiveCount++;
    if (NEGATIVE_WORDS.has(word)) negativeCount++;
  }

  const total = positiveCount + negativeCount;
  const score = total === 0 ? 0 : (positiveCount - negativeCount) / total;

  let label: SentimentLabel = "neutral";
  if (score > 0.15) label = "positive";
  else if (score < -0.15) label = "negative";

  return { score, label, positiveCount, negativeCount };
}
