import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section className="bg-gradient-to-b from-indigo-50 via-white to-white">
      <div className="mx-auto max-w-6xl px-4 py-20">
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="rounded-2xl bg-gradient-to-br from-white/80 to-white/60 shadow-lg p-10"
        >
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="text-3xl font-extrabold leading-tight text-foreground sm:text-4xl">
              Analyze and Improve Your Social Media Content
            </h1>
            <p className="mt-4 text-sm text-muted-foreground">
              Upload PDFs or scanned images to extract text (PDF parsing + OCR), then receive actionable readability, sentiment, hashtag and engagement suggestions.
            </p>

            <div className="mt-6 flex items-center justify-center gap-3">
              <Link to="/app">
                <button className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow hover:shadow-md transition-all">
                  Get Started
                </button>
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
