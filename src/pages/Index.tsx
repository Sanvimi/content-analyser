import { useEffect, useState } from "react";
import Navbar from "@/components/modern/Navbar";
import UploadBox from "@/components/modern/UploadBox";
import HistoryList from "@/components/modern/HistoryList";
import { useTextExtraction } from "@/hooks/useTextExtraction";
import { useContentAnalysis } from "@/hooks/useContentAnalysis";
import { AlertCircle, Copy } from "lucide-react";
import { motion } from "framer-motion";

const Index = () => {
  const { text, isProcessing, progress, error, extractText, reset, setText } =
    useTextExtraction();

  const analysis = useContentAnalysis(text || "");

  type SavedAnalysis = {
    id: string;
    text: string;
    summary?: { wordCount: number; score: number; sentiment: string };
    createdAt: string;
  };

  const STORAGE_KEY = "sma_analyses_v1";
  const [history, setHistory] = useState<SavedAnalysis[]>([]);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setHistory(JSON.parse(raw));
    } catch (e) {
      // ignore
    }
  }, []);

  const persistHistory = (items: SavedAnalysis[]) => {
    setHistory(items);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch (e) {
      // ignore
    }
  };

  const saveCurrentAnalysis = () => {
    if (!text || !analysis) return;
    const item: SavedAnalysis = {
      id: Date.now().toString(),
      text,
      summary: {
        wordCount: analysis.wordCount,
        score: analysis.engagement.score,
        sentiment: analysis.sentiment.label,
      },
      createdAt: new Date().toISOString(),
    };

    const next = [item, ...history].slice(0, 30);
    persistHistory(next);
  };

  const loadAnalysis = (item: SavedAnalysis) => {
    // Load text into extraction hook and allow analysis to recompute
    setText(item.text);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const deleteAnalysis = (id: string) => {
    const next = history.filter((h) => h.id !== id);
    persistHistory(next);
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-slate-50 via-white to-indigo-50">
      <Navbar />

      <main className="mx-auto max-w-7xl px-6 py-16">

        {/* HERO TITLE */}
        <div className="text-center mb-14">
          <h1 className="text-4xl font-extrabold text-slate-900">
            Upload. Analyze.
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
              {" "}Improve.
            </span>
          </h1>
          <p className="mt-3 text-slate-600">
            Extract text from PDFs or scanned images and receive engagement insights instantly.
          </p>
        </div>

        {/* Upload Section */}
        {!text && !isProcessing && (
          <div className="max-w-3xl mx-auto mb-12">
            <UploadBox
              onFileSelect={extractText}
              isProcessing={isProcessing}
              progress={progress}
            />
          </div>
        )}

        {/* Processing */}
        {isProcessing && (
          <div className="max-w-3xl mx-auto text-center py-20">
            <p className="text-slate-600">Processing file... {progress}%</p>
          </div>
        )}

        {/* Error */}
        {error && (
          <div className="max-w-3xl mx-auto bg-red-50 border border-red-200 text-red-700 p-4 rounded-xl flex items-center gap-3">
            <AlertCircle className="h-4 w-4" />
            {error}
          </div>
        )}

        {/* RESULTS DASHBOARD */}
        {text && !isProcessing && analysis && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="grid lg:grid-cols-3 gap-8"
          >
            {/* LEFT SIDE - TEXT */}
            <div className="lg:col-span-2 rounded-3xl bg-white/70 backdrop-blur-xl shadow-xl p-8 border border-white/40">

              <div className="flex justify-between items-center mb-4">
                <div>
                  <h3 className="font-semibold text-slate-900">Extracted Text</h3>
                  <p className="text-sm text-slate-500">
                    {analysis.wordCount} words
                  </p>
                </div>

                <button
                  onClick={() => navigator.clipboard.writeText(text)}
                  className="flex items-center gap-2 text-sm border rounded-lg px-3 py-1 hover:bg-slate-100 transition"
                >
                  <Copy className="h-4 w-4" />
                  Copy
                </button>
              </div>

              <div className="h-80 overflow-y-auto bg-slate-50 rounded-xl p-4 text-sm text-slate-700 whitespace-pre-wrap">
                {text}
              </div>

              <div className="mt-6 text-center">
                <button
                  onClick={() => { saveCurrentAnalysis(); reset(); }}
                  className="rounded-full px-8 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg hover:scale-105 transition"
                >
                  Analyze Another File
                </button>
              </div>
            </div>

            {/* RIGHT SIDE - INSIGHTS */}
            <div className="space-y-6">

              {/* Engagement Score */}
              <div className="rounded-3xl bg-white/70 backdrop-blur-xl shadow-xl p-6 border border-white/40">
                <div className="flex items-center gap-4">
                  <div className="h-16 w-16 rounded-full bg-green-100 flex items-center justify-center text-green-600 text-xl font-bold">
                    {analysis.engagement.score}
                  </div>
                  <div>
                    <p className="font-semibold text-slate-900">
                      Engagement
                    </p>
                    <p className="text-sm text-slate-500">
                      Score (0–100)
                    </p>
                  </div>
                </div>

                <div className="mt-6">
                  <p className="text-sm font-medium text-slate-700">
                    Sentiment
                  </p>
                  <span className="inline-block mt-2 rounded-full bg-green-100 text-green-600 px-3 py-1 text-sm capitalize">
                    {analysis.sentiment.label}
                  </span>
                </div>
              </div>

              {/* Suggestions */}
              <div className="rounded-3xl bg-white/70 backdrop-blur-xl shadow-xl p-6 border border-white/40 space-y-4">
                <h3 className="font-semibold text-slate-900">
                  Suggestions
                </h3>

                {analysis.engagement.suggestions.map((s, index) => (
                  <div
                    key={index}
                    className="rounded-xl bg-slate-50 p-4 border hover:shadow-md transition"
                  >
                    <p className="font-medium text-slate-800">
                      {s.title}
                    </p>
                    <p className="text-sm text-slate-600 mt-1">
                      {s.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </main>
    </div>
  );
};

export default Index;
