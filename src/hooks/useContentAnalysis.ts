import { useMemo } from "react";
import { analyzeSentiment, type SentimentResult } from "@/lib/sentiment";
import { extractHashtags } from "@/lib/hashtags";
import { analyzeReadability, type ReadabilityResult } from "@/lib/readability";
import { calculateEngagement, type EngagementResult } from "@/lib/engagement";

export interface AnalysisResult {
  wordCount: number;
  sentiment: SentimentResult;
  readability: ReadabilityResult;
  hashtags: string[];
  engagement: EngagementResult;
}

export function useContentAnalysis(text: string): AnalysisResult | null {
  return useMemo(() => {
    if (!text.trim()) return null;

    const wordCount = (text.match(/\b\w+\b/g) || []).length;
    const sentiment = analyzeSentiment(text);
    const readability = analyzeReadability(text);
    const hashtags = extractHashtags(text, 5);
    const engagement = calculateEngagement(text, sentiment, readability, hashtags);

    return { wordCount, sentiment, readability, hashtags, engagement };
  }, [text]);
}
