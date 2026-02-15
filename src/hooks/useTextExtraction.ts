import { useState, useCallback } from "react";
import * as pdfjsLib from "pdfjs-dist";
import Tesseract from "tesseract.js";

// Configure PDF.js worker
pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.mjs`;

export interface ExtractionState {
  text: string;
  isProcessing: boolean;
  progress: number;
  error: string | null;
}

export function useTextExtraction() {
  const [state, setState] = useState<ExtractionState>({
    text: "",
    isProcessing: false,
    progress: 0,
    error: null,
  });

  const extractFromPDF = useCallback(async (file: File) => {
    setState({ text: "", isProcessing: true, progress: 10, error: null });

    try {
      const arrayBuffer = await file.arrayBuffer();
      const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
      const totalPages = pdf.numPages;
      const pages: string[] = [];

      for (let i = 1; i <= totalPages; i++) {
        const page = await pdf.getPage(i);
        const content = await page.getTextContent();
        const pageText = content.items
          .map((item: any) => item.str)
          .join(" ");
        pages.push(pageText);
        setState((prev) => ({
          ...prev,
          progress: 10 + Math.round((i / totalPages) * 80),
        }));
      }

      const fullText = pages.join("\n\n");
      setState({ text: fullText, isProcessing: false, progress: 100, error: null });
    } catch (err) {
      setState({
        text: "",
        isProcessing: false,
        progress: 0,
        error: "Failed to extract text from PDF. The file may be corrupted or password-protected.",
      });
    }
  }, []);

  const extractFromImage = useCallback(async (file: File) => {
    setState({ text: "", isProcessing: true, progress: 5, error: null });

    try {
      const result = await Tesseract.recognize(file, "eng", {
        logger: (m) => {
          if (m.status === "recognizing text") {
            setState((prev) => ({
              ...prev,
              progress: Math.round(m.progress * 90) + 5,
            }));
          }
        },
      });

      setState({
        text: result.data.text,
        isProcessing: false,
        progress: 100,
        error: null,
      });
    } catch (err) {
      setState({
        text: "",
        isProcessing: false,
        progress: 0,
        error: "Failed to extract text from image. Please try a clearer image.",
      });
    }
  }, []);

  const extractText = useCallback(
    async (file: File) => {
      if (file.type === "application/pdf") {
        await extractFromPDF(file);
      } else if (file.type.startsWith("image/")) {
        await extractFromImage(file);
      } else {
        setState({
          text: "",
          isProcessing: false,
          progress: 0,
          error: "Unsupported file type.",
        });
      }
    },
    [extractFromPDF, extractFromImage]
  );

  const reset = useCallback(() => {
    setState({ text: "", isProcessing: false, progress: 0, error: null });
  }, []);

  // Set text programmatically (used for loading saved analyses)
  const setText = useCallback((text: string) => {
    setState({ text, isProcessing: false, progress: 100, error: null });
  }, []);

  return { ...state, extractText, reset, setText };
}
