
I built the Social Media Content Analyzer as a client-side React + Vite application to meet the assessment requirements within a compact, deployable codebase. The app accepts PDFs and images via drag-and-drop or file picker and performs text extraction using two complementary strategies: PDF parsing with `pdfjs-dist` (preserves extracted text flow and page order) and OCR using `tesseract.js` for scanned images.

Extraction runs in the browser to avoid hosting dependencies; progress and simple error messages are surfaced to the user via loading states and alerts. Extracted text is analyzed by lightweight, deterministic modules: sentiment scoring, readability metrics, hashtag extraction, and a small engagement heuristic that combines signals into human-readable suggestions. Components are modular (`FileUpload`, `TextDisplay`, `AnalysisResults`) to keep UI and logic separated and testable.

For production, I recommend offloading OCR and heavy extraction to a serverless function or managed OCR API for reliability and performance, and adding rate-limiting and file validation server-side. The repository includes clear run/build instructions in `README.md` and the UI supports copying text, re-running analysis, and viewing suggested improvements.


