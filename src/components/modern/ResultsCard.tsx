import { useCallback } from "react";
import { motion } from "framer-motion";
import ScoreBadge from "./ScoreBadge";
import SuggestionList from "./SuggestionList";
import { Copy, Check } from "lucide-react";
import { useState } from "react";

interface ResultsCardProps {
  text: string;
  wordCount: number;
  score: number;
  sentimentLabel: string;
  suggestions: { title: string; description: string }[];
}

export default function ResultsCard({ text, wordCount, score, sentimentLabel, suggestions }: ResultsCardProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(async () => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [text]);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.25 }} className="mx-auto w-full max-w-6xl">
      <div className="grid gap-6 sm:grid-cols-3">
        {/* Left: Extracted text */}
        <div className="sm:col-span-2 rounded-xl border bg-white/60 p-4 shadow-lg">
          <div className="flex items-start justify-between">
            <div>
              <div className="text-sm font-semibold text-foreground">Extracted Text</div>
              <div className="text-xs text-muted-foreground">{wordCount} words</div>
            </div>
            <button onClick={handleCopy} className="inline-flex items-center gap-2 rounded-md bg-white px-3 py-1 text-sm shadow-sm hover:shadow transition-all">
              {copied ? <><Check className="h-4 w-4 text-green-600"/> Copied</> : <><Copy className="h-4 w-4"/> Copy</>}
            </button>
          </div>

          <div className="mt-3 h-64 overflow-auto rounded-md border bg-white p-4 text-sm leading-relaxed text-foreground">
            <pre className="whitespace-pre-wrap">{text}</pre>
          </div>
        </div>

        {/* Right: Metrics */}
        <aside className="rounded-xl border bg-white/60 p-4 shadow-lg">
          <div className="space-y-4">
            <ScoreBadge score={score} />

            <div className="rounded-md border p-3">
              <div className="text-sm font-semibold text-foreground">Sentiment</div>
              <div className={`mt-1 inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs ${sentimentLabel === 'positive' ? 'bg-green-50 text-green-700' : sentimentLabel === 'negative' ? 'bg-rose-50 text-rose-700' : 'bg-gray-50 text-gray-700'}`}>
                {sentimentLabel}
              </div>
            </div>

            <div>
              <div className="text-sm font-semibold text-foreground">Suggestions</div>
              <div className="mt-2">
                <SuggestionList suggestions={suggestions} />
              </div>
            </div>
          </div>
        </aside>
      </div>
    </motion.div>
  );
}
