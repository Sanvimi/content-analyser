interface ScoreBadgeProps {
  score: number; // 0-100
}

export default function ScoreBadge({ score }: ScoreBadgeProps) {
  const color = score >= 75 ? "from-green-400 to-green-600" : score >= 45 ? "from-yellow-400 to-yellow-500" : "from-rose-400 to-rose-600";

  return (
    <div className="flex items-center gap-3">
      <div className={`rounded-full bg-gradient-to-br ${color} p-3 shadow-lg`}> 
        <span className="text-sm font-bold text-white tabular-nums">{Math.round(score)}</span>
      </div>
      <div>
        <div className="text-sm font-semibold text-foreground">Engagement</div>
        <div className="text-xs text-muted-foreground">Score (0–100)</div>
      </div>
    </div>
  );
}
