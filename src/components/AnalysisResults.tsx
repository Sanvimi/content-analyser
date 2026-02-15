import { EngagementScore } from "./EngagementScore";
import { Suggestions } from "./Suggestions";
import { Badge } from "@/components/ui/badge";
import { type AnalysisResult } from "@/hooks/useContentAnalysis";
import { ThumbsUp, ThumbsDown, Minus, BarChart3, Type } from "lucide-react";

interface AnalysisResultsProps {
  analysis: AnalysisResult;
}

const SENTIMENT_CONFIG = {
  positive: { icon: ThumbsUp, label: "Positive", className: "bg-success/10 text-success border-success/30" },
  negative: { icon: ThumbsDown, label: "Negative", className: "bg-destructive/10 text-destructive border-destructive/30" },
  neutral: { icon: Minus, label: "Neutral", className: "bg-muted text-muted-foreground border-border" },
};

export function AnalysisResults({ analysis }: AnalysisResultsProps) {
  const { wordCount, sentiment, readability, hashtags, engagement } = analysis;
  const sentimentInfo = SENTIMENT_CONFIG[sentiment.label];
  const SentimentIcon = sentimentInfo.icon;

  return (
    <div className="space-y-6">
      <h2 className="text-lg font-bold text-foreground">Content Analysis</h2>

      {/* Top stats row */}
      <div className="grid gap-4 sm:grid-cols-3">
        <EngagementScore score={engagement.score} />

        {/* Word Count */}
        <div className="flex flex-col items-center justify-center rounded-xl border bg-card p-6">
          <Type className="mb-2 h-5 w-5 text-muted-foreground" />
          <span className="text-3xl font-bold text-foreground tabular-nums">{wordCount}</span>
          <span className="mt-1 text-xs text-muted-foreground">Words</span>
        </div>

        {/* Sentiment */}
        <div className="flex flex-col items-center justify-center rounded-xl border bg-card p-6">
          <SentimentIcon className="mb-2 h-5 w-5 text-muted-foreground" />
          <Badge variant="outline" className={`text-sm px-3 py-1 ${sentimentInfo.className}`}>
            {sentimentInfo.label}
          </Badge>
          <span className="mt-2 text-xs text-muted-foreground">Sentiment</span>
        </div>
      </div>

      {/* Readability stat */}
      <div className="flex items-center gap-3 rounded-xl border bg-card p-4">
        <BarChart3 className="h-5 w-5 text-muted-foreground" />
        <div>
          <p className="text-sm font-semibold text-foreground">
            Readability: <span className="capitalize">{readability.readabilityLevel}</span>
          </p>
          <p className="text-xs text-muted-foreground">
            {readability.avgWordsPerSentence} avg words/sentence · {readability.totalSentences} sentences
          </p>
        </div>
      </div>

      {/* Hashtags */}
      {hashtags.length > 0 && (
        <div className="space-y-2">
          <h3 className="text-sm font-semibold text-foreground">Suggested Hashtags</h3>
          <div className="flex flex-wrap gap-2">
            {hashtags.map((tag) => (
              <Badge key={tag} variant="secondary" className="text-xs">
                {tag}
              </Badge>
            ))}
          </div>
        </div>
      )}

      {/* Suggestions */}
      <Suggestions suggestions={engagement.suggestions} />
    </div>
  );
}
