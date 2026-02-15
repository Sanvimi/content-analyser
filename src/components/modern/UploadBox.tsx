import { useCallback, useRef, useState } from "react";
import { UploadCloud, FileText, Image, Loader2 } from "lucide-react";
import { motion } from "framer-motion";

interface UploadBoxProps {
  onFileSelect: (file: File) => void;
  isProcessing?: boolean;
  progress?: number;
}

export default function UploadBox({ onFileSelect, isProcessing = false, progress = 0 }: UploadBoxProps) {
  const [drag, setDrag] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleFiles = useCallback((file?: File) => {
    if (!file) return;
    onFileSelect(file);
  }, [onFileSelect]);

  const onDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDrag(false);
    const f = e.dataTransfer.files?.[0];
    if (f) handleFiles(f);
  }, [handleFiles]);

  const onChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (f) handleFiles(f);
  }, [handleFiles]);

  return (
    <div className="mx-auto w-full max-w-3xl">
      <motion.div
        whileHover={{ scale: isProcessing ? 1 : 1.01 }}
        animate={{ boxShadow: drag ? "0 10px 30px rgba(99,102,241,0.08)" : "0 6px 18px rgba(15,23,42,0.04)" }}
        className={`rounded-xl border-2 border-dashed p-8 transition-colors duration-200 ${drag ? "border-indigo-400 bg-indigo-50/30" : "bg-white/60"}`}
        onDragOver={(e) => { e.preventDefault(); setDrag(true); }}
        onDragLeave={() => setDrag(false)}
        onDrop={onDrop}
        onClick={() => inputRef.current?.click()}
      >
        <input ref={inputRef} type="file" accept=".pdf,.jpg,.jpeg,.png" className="hidden" onChange={onChange} disabled={isProcessing} />

        <div className="flex flex-col items-center gap-4 text-center">
          <div className="rounded-full bg-gradient-to-br from-indigo-50 to-violet-50 p-3">
            {isProcessing ? <Loader2 className="h-7 w-7 animate-spin text-indigo-600" /> : <UploadCloud className="h-7 w-7 text-indigo-600" />}
          </div>

          <div>
            <h3 className="text-lg font-semibold text-foreground">Drop files here or click to upload</h3>
            <p className="mt-1 text-sm text-muted-foreground">PDF, JPG, PNG — max 10MB. Drag over to highlight.</p>
          </div>

          <div className="mt-2 flex items-center gap-2">
            <button
              onClick={(e) => { e.stopPropagation(); inputRef.current?.click(); }}
              disabled={isProcessing}
              className="rounded-md bg-white px-3 py-1 text-sm font-medium shadow-sm hover:shadow transition-all"
            >
              <FileText className="inline-block mr-2 h-4 w-4 text-muted-foreground" />
              Choose file
            </button>
            <button className="rounded-md px-3 py-1 text-sm text-muted-foreground">
              <Image className="inline-block mr-2 h-4 w-4 text-muted-foreground" />
              Image OCR
            </button>
          </div>

          {isProcessing && (
            <div className="mt-4 w-full">
              <div className="h-2 w-full overflow-hidden rounded-full bg-gray-100">
                <div className="h-2 bg-indigo-600 transition-all" style={{ width: `${Math.max(4, progress)}%` }} />
              </div>
              <div className="mt-2 text-xs text-muted-foreground">Processing… {progress}%</div>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
}
