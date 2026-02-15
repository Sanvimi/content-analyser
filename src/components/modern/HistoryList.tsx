import { format } from "date-fns";

interface SavedAnalysis {
  id: string;
  text: string;
  summary?: {
    wordCount: number;
    score: number;
    sentiment: string;
  };
  createdAt: string;
}

interface HistoryListProps {
  items: SavedAnalysis[];
  onLoad: (item: SavedAnalysis) => void;
  onDelete: (id: string) => void;
}

export default function HistoryList({ items, onLoad, onDelete }: HistoryListProps) {
  if (!items || items.length === 0) {
    return (
      <div className="rounded-xl border bg-white/60 p-4 text-center text-sm text-muted-foreground">
        No previous analyses yet. Your analyzed files will appear here.
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {items.map((it) => (
        <div key={it.id} className="flex items-center justify-between rounded-lg border bg-white p-3 shadow-sm">
          <div className="min-w-0">
            <div className="flex items-baseline gap-2">
              <div className="text-sm font-semibold text-foreground truncate">Analysis — {format(new Date(it.createdAt), "PPpp")}</div>
              {it.summary && (
                <div className="ml-2 text-xs text-muted-foreground">{it.summary.wordCount} words · score {Math.round(it.summary.score)}</div>
              )}
            </div>
            <div className="mt-1 text-xs text-muted-foreground truncate">{it.text.slice(0, 120)}{it.text.length > 120 ? '…' : ''}</div>
          </div>

          <div className="ml-3 flex items-center gap-2">
            <button onClick={() => onLoad(it)} className="rounded-md bg-indigo-600 px-3 py-1 text-xs font-medium text-white">Open</button>
            <button onClick={() => onDelete(it.id)} className="rounded-md border px-3 py-1 text-xs">Delete</button>
          </div>
        </div>
      ))}
    </div>
  );
}
