import { Hash, Megaphone, Scissors, BookOpen, Smile } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { type EngagementSuggestion } from "@/lib/engagement";

const ICONS: Record<string, React.ElementType> = {
  Hash,
  Megaphone,
  Scissors,
  BookOpen,
  Smile,
};

interface SuggestionsProps {
  suggestions: EngagementSuggestion[];
}

export function Suggestions({ suggestions }: SuggestionsProps) {
  if (suggestions.length === 0) return null;

  return (
    <div className="space-y-3">
      <h3 className="text-sm font-semibold text-foreground">
        Improvement Suggestions
      </h3>
      <div className="grid gap-3 sm:grid-cols-2">
        {suggestions.map((s, i) => {
          const Icon = ICONS[s.icon] || Hash;
          return (
            <Card key={i} className="border bg-card transition-shadow hover:shadow-md">
              <CardContent className="flex gap-3 p-4">
                <div className="shrink-0 rounded-lg bg-primary/10 p-2 text-primary">
                  <Icon className="h-4 w-4" />
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-foreground">{s.title}</p>
                  <p className="mt-0.5 text-xs leading-relaxed text-muted-foreground">
                    {s.description}
                  </p>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
