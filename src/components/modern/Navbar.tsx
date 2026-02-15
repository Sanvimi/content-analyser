import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

export default function Navbar() {
  return (
    <motion.header
      initial={{ y: -10, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.25 }}
      className="border-b bg-white/80 backdrop-blur-md sticky top-0 z-50"
    >
      <div className="mx-auto max-w-7xl px-6 py-5 flex items-center justify-between">
        
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3">
          <div className="rounded-lg bg-gradient-to-tr from-blue-600 to-indigo-600 p-2 shadow">
            <Sparkles className="h-5 w-5 text-white" />
          </div>
          <span className="text-lg font-semibold text-slate-800">
            Content Analyzer
          </span>
        </Link>

        {/* Nav Links */}
        <nav className="hidden md:flex items-center gap-8 text-sm text-slate-600">
          <a href="#features" className="hover:text-slate-900 transition">
            Features
          </a>
          <a href="#pricing" className="hover:text-slate-900 transition">
            Pricing
          </a>
          <a href="#support" className="hover:text-slate-900 transition">
            Support
          </a>
        </nav>

        {/* CTA Button */}
        <Link to="/app">
          <button className="rounded-full px-6 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md hover:shadow-lg transition">
            Get Started
          </button>
        </Link>
      </div>
    </motion.header>
  );
}
