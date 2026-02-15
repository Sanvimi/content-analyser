# Social Media Content Analyzer

This repository contains the Social Media Content Analyzer — a small React + Vite app that lets users upload PDFs or images (scanned documents), extracts the text (PDF parsing + OCR), and provides engagement suggestions and analysis.

Key features
- Document upload: drag-and-drop or file picker for PDF, JPG, JPEG, PNG (max 10MB).
- Text extraction: PDF parsing (pdf.js) that preserves text flow, and OCR for images using `tesseract.js`.
- Content analysis: word count, sentiment, readability, suggested hashtags, and engagement suggestions.
- UX: loading/progress states, basic error handling, copyable extracted text.

Local development

Install dependencies and run the dev server:

```bash
npm install
npm run dev
```

Build for production:

```bash
npm run build
npm run preview
```

Where to look
- Upload UI: `src/components/FileUpload.tsx`
- Extraction logic (PDF/OCR): `src/hooks/useTextExtraction.ts`
- Analysis: `src/hooks/useContentAnalysis.ts` and `src/lib`
- Results and suggestions: `src/components/AnalysisResults.tsx` and `src/components/Suggestions.tsx`

- Landing page: `src/pages/Landing.tsx` (root `/`)

Short assessment deliverables
- Working app url: (host this build on Vercel/Netlify/Render and paste URL)
- GitHub repo: this repository
- Brief write-up: `WRITEUP.md` (200 words max)

Notes
- This project uses `pdfjs-dist` for PDF parsing and `tesseract.js` for OCR — both run client-side so no backend is required.
- For production at scale consider moving OCR to a server or using cloud OCR APIs for performance and reliability.

If you want, I can:
- Add a lightweight deployment workflow (Vercel/Netlify).
- Add sample test files and CI checks.


