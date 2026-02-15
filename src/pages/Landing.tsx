import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Sparkles, UploadCloud, FileText, Image } from "lucide-react";
import { motion } from "framer-motion";
import Navbar from "@/components/modern/Navbar";

const Landing = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">

      {/* ================= NAVBAR ================= */}
      <Navbar/>

      {/* ================= HERO ================= */}
      <section className="relative overflow-hidden">
        
        {/* Background glow */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-50 via-white to-indigo-50" />
        <div className="absolute -bottom-32 -left-32 h-96 w-96 bg-blue-200 blur-3xl opacity-30 rounded-full" />
        <div className="absolute -top-32 -right-32 h-96 w-96 bg-indigo-200 blur-3xl opacity-30 rounded-full" />

        <div className="relative mx-auto max-w-7xl px-6 py-24 grid md:grid-cols-2 gap-12 items-center">

          {/* LEFT CONTENT */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-5xl font-extrabold leading-tight text-slate-900">
              Analyze Content,
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
                Boost Engagement.
              </span>
            </h1>

            <p className="mt-6 text-lg text-slate-600 max-w-lg">
              Upload PDFs or scanned images. Extract text using OCR and receive
              smart readability, sentiment, and hashtag suggestions instantly.
            </p>

            <div className="mt-8 flex gap-4">
              <Link to="/app">
                <Button
                  size="lg"
                  className="rounded-full px-8 py-6 text-base bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg hover:shadow-xl hover:scale-105 transition"
                >
                  <UploadCloud className="mr-2 h-5 w-5" />
                  Get Started for Free
                </Button>
              </Link>
            </div>
          </motion.div>

          {/* RIGHT MOCKUP */}
          {/* RIGHT MOCKUP */}
<motion.div
  initial={{ opacity: 0, x: 40 }}
  animate={{ opacity: 1, x: 0 }}
  transition={{ duration: 0.6 }}
  className="relative"
>
  <div className="relative rounded-2xl bg-white shadow-2xl border p-6">

    {/* Floating magnifier */}
    <div className="absolute -left-10 top-16 h-20 w-20 rounded-full bg-blue-600/10 flex items-center justify-center shadow-lg">
      <Sparkles className="h-8 w-8 text-blue-600" />
    </div>

    {/* Header */}
    <div className="mb-4 flex items-center justify-between">
      <div className="h-3 w-24 bg-slate-200 rounded" />
      <div className="flex gap-2">
        <span className="h-2 w-2 rounded-full bg-red-400" />
        <span className="h-2 w-2 rounded-full bg-yellow-400" />
        <span className="h-2 w-2 rounded-full bg-green-400" />
      </div>
    </div>

    {/* Extracted text */}
    <div className="space-y-2">
      <div className="h-3 w-full bg-slate-100 rounded" />
      <div className="h-3 w-5/6 bg-slate-100 rounded" />
      <div className="h-3 w-4/6 bg-slate-100 rounded" />
    </div>

    {/* Analytics */}
    <div className="mt-6 grid grid-cols-2 gap-4">
      <div className="rounded-lg bg-slate-50 p-4">
        <p className="text-xs text-slate-500">Readability</p>
        <p className="text-2xl font-bold text-green-600">85</p>
      </div>
      <div className="rounded-lg bg-slate-50 p-4">
        <p className="text-xs text-slate-500">Sentiment</p>
        <p className="text-2xl font-bold text-blue-600">Positive</p>
      </div>
    </div>

    {/* Hashtags */}
    <div className="mt-6 flex flex-wrap gap-2">
      {["#seo", "#marketing", "#content", "#ai"].map((tag) => (
        <span
          key={tag}
          className="rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-600"
        >
          {tag}
        </span>
      ))}
    </div>
  </div>
</motion.div>

        </div>
      </section>

      {/* ================= FEATURES ================= */}
      <section id="features" className="py-24 bg-white">
        <div className="mx-auto max-w-6xl px-6 grid md:grid-cols-3 gap-8">

          {[
            {
              icon: <FileText className="h-6 w-6 text-blue-600" />,
              title: "PDF Parsing",
              desc: "Extract and preserve structured text from PDFs with formatting.",
            },
            {
              icon: <Image className="h-6 w-6 text-indigo-600" />,
              title: "OCR Extraction",
              desc: "Convert scanned images into editable and analyzable text.",
            },
            {
              icon: <Sparkles className="h-6 w-6 text-pink-600" />,
              title: "Engagement Insights",
              desc: "Get sentiment analysis, readability scores, and hashtag suggestions.",
            },
          ].map((feature, index) => (
            <motion.div
              key={index}
              whileHover={{ y: -6 }}
              className="rounded-2xl border bg-slate-50 p-8 text-center shadow-sm hover:shadow-lg transition"
            >
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-blue-100">
                {feature.icon}
              </div>
              <h3 className="font-semibold text-lg text-slate-900">
                {feature.title}
              </h3>
              <p className="mt-2 text-sm text-slate-600">
                {feature.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ================= CTA ================= */}
      <section className="py-24 bg-gradient-to-r from-blue-50 to-indigo-50 text-center">
        <h2 className="text-3xl font-bold text-slate-900">
          Start Improving Your Content Today
        </h2>
        <div className="mt-6">
          <Link to="/app">
            <Button
              size="lg"
              className="rounded-full px-8 py-6 text-base bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg hover:shadow-xl transition"
            >
              Get Started for Free
            </Button>
          </Link>
        </div>
      </section>

    </div>
  );
};

export default Landing;
