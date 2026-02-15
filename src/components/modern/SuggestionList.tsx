import { motion } from "framer-motion";

interface Suggestion {
  title: string;
  description: string;
}

interface SuggestionListProps {
  suggestions: Suggestion[];
}

export default function SuggestionList({ suggestions }: SuggestionListProps) {
  if (!suggestions || suggestions.length === 0) {
    return (
      <div className="rounded-xl border bg-white/60 p-4 text-center text-sm text-muted-foreground">
        No suggestions yet — upload a file to get personalized tips.
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {suggestions.map((s, i) => (
        <motion.div key={i} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }} className="rounded-xl border bg-white/60 p-3 shadow-sm">
          <div className="text-sm font-semibold text-foreground">{s.title}</div>
          <div className="mt-1 text-xs text-muted-foreground">{s.description}</div>
        </motion.div>
      ))}
    </div>
  );
}
