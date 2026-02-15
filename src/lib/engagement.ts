/**
 * Engagement scoring and suggestion generation utility.
 */

import { type SentimentResult } from "./sentiment";
import { type ReadabilityResult } from "./readability";

export interface EngagementSuggestion {
  type: "hashtag" | "cta" | "readability" | "emoji" | "shorten";
  title: string;
  description: string;
  icon: string;
}

export interface EngagementResult {
  score: number; // 0-100
  suggestions: EngagementSuggestion[];
}

const CTA_EXAMPLES = [
  "Try adding: 'What do you think? Drop a comment below! 👇'",
  "Try adding: 'Share this with someone who needs to see it! 🔄'",
  "Try adding: 'Save this for later — you'll thank yourself! 🔖'",
  "Try adding: 'Follow for more insights like this! ✨'",
  "Try adding: 'Tag a friend who would love this! 🏷️'",
];

const EMOJI_SUGGESTIONS = [
  "🚀", "💡", "🔥", "✨", "💪", "🎯", "📈", "⭐", "🌟", "👏",
];

export function calculateEngagement(
  text: string,
  sentiment: SentimentResult,
  readability: ReadabilityResult,
  hashtags: string[]
): EngagementResult {
  let score = 50; // Start at neutral
  const suggestions: EngagementSuggestion[] = [];
  const wordCount = (text.match(/\b\w+\b/g) || []).length;

  // Sentiment bonus
  if (sentiment.label === "positive") score += 15;
  else if (sentiment.label === "negative") score -= 10;

  // Readability bonus
  if (readability.readabilityLevel === "easy") score += 10;
  else if (readability.readabilityLevel === "hard") score -= 10;

  // Length bonus (optimal: 50-150 words for social media)
  if (wordCount >= 50 && wordCount <= 150) score += 10;
  else if (wordCount < 20) score -= 15;
  else if (wordCount > 300) score -= 5;

  // Check for existing hashtags
  const hasHashtags = text.includes("#");
  if (hasHashtags) score += 5;

  // Check for existing emojis
  const emojiRegex = /[\u{1F600}-\u{1F64F}\u{1F300}-\u{1F5FF}\u{1F680}-\u{1F6FF}\u{1F1E0}-\u{1F1FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}]/u;
  const hasEmojis = emojiRegex.test(text);
  if (hasEmojis) score += 5;

  // Check for questions (engagement driver)
  const hasQuestion = text.includes("?");
  if (hasQuestion) score += 5;

  // Generate suggestions
  if (!hasHashtags && hashtags.length > 0) {
    suggestions.push({
      type: "hashtag",
      title: "Add Hashtags",
      description: `Boost discoverability with: ${hashtags.slice(0, 3).join(" ")}`,
      icon: "Hash",
    });
  }

  if (!hasQuestion) {
    const cta = CTA_EXAMPLES[Math.floor(Math.random() * CTA_EXAMPLES.length)];
    suggestions.push({
      type: "cta",
      title: "Add a Call-to-Action",
      description: cta,
      icon: "Megaphone",
    });
  }

  if (readability.longSentences.length > 0) {
    suggestions.push({
      type: "shorten",
      title: "Shorten Long Sentences",
      description: `${readability.longSentences.length} sentence(s) exceed 25 words. Break them up for better readability.`,
      icon: "Scissors",
    });
  }

  if (readability.readabilityLevel === "hard") {
    suggestions.push({
      type: "readability",
      title: "Improve Readability",
      description: `Average ${readability.avgWordsPerSentence} words/sentence. Aim for under 15 for social media.`,
      icon: "BookOpen",
    });
  }

  if (!hasEmojis) {
    const suggestedEmojis = EMOJI_SUGGESTIONS.slice(0, 3).join(" ");
    suggestions.push({
      type: "emoji",
      title: "Add Emojis",
      description: `Emojis boost engagement by up to 25%. Try: ${suggestedEmojis}`,
      icon: "Smile",
    });
  }

  // Clamp score
  score = Math.max(0, Math.min(100, score));

  return { score, suggestions };
}
