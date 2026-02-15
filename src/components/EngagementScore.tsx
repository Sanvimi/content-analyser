interface EngagementScoreProps {
  score: number;
}

export function EngagementScore({ score }: EngagementScoreProps) {
  const getColor = () => {
    if (score >= 70) return "text-success border-success/30 bg-success/10";
    if (score >= 40) return "text-warning border-warning/30 bg-warning/10";
    return "text-destructive border-destructive/30 bg-destructive/10";
  };

  const getLabel = () => {
    if (score >= 70) return "Strong";
    if (score >= 40) return "Average";
    return "Needs Work";
  };

  return (
    <div className={`flex flex-col items-center justify-center rounded-xl border-2 p-6 ${getColor()}`}>
      <span className="text-5xl font-bold tabular-nums">{score}</span>
      <span className="mt-1 text-xs font-semibold uppercase tracking-wider">
        {getLabel()}
      </span>
      <span className="mt-0.5 text-[10px] text-muted-foreground">
        Engagement Score
      </span>
    </div>
  );
}
