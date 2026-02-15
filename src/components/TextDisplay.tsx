import { Copy, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useState, useCallback } from "react";

interface TextDisplayProps {
  text: string;
}

export function TextDisplay({ text }: TextDisplayProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(async () => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [text]);

  return (
    <div className="rounded-xl border bg-card">
      <div className="flex items-center justify-between border-b px-4 py-3">
        <h3 className="text-sm font-semibold text-foreground">
          Extracted Text
        </h3>
        <Button variant="ghost" size="sm" onClick={handleCopy} className="gap-1.5">
          {copied ? (
            <>
              <Check className="h-3.5 w-3.5 text-success" />
              <span className="text-xs">Copied</span>
            </>
          ) : (
            <>
              <Copy className="h-3.5 w-3.5" />
              <span className="text-xs">Copy</span>
            </>
          )}
        </Button>
      </div>
      <ScrollArea className="h-64">
        <pre className="whitespace-pre-wrap p-4 text-sm leading-relaxed text-foreground font-sans">
          {text}
        </pre>
      </ScrollArea>
    </div>
  );
}
