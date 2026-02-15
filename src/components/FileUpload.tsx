import { useCallback, useState, useRef } from "react";
import { Upload, FileText, Image, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";

const ACCEPTED_TYPES = [
  "application/pdf",
  "image/jpeg",
  "image/png",
];
const MAX_SIZE = 10 * 1024 * 1024; // 10MB

interface FileUploadProps {
  onFileSelect: (file: File) => void;
  isProcessing: boolean;
}

export function FileUpload({ onFileSelect, isProcessing }: FileUploadProps) {
  const [dragActive, setDragActive] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const validateAndSelect = useCallback(
    (file: File) => {
      if (!ACCEPTED_TYPES.includes(file.type)) {
        toast({
          title: "Invalid file type",
          description: "Please upload a PDF, JPG, or PNG file.",
          variant: "destructive",
        });
        return;
      }
      if (file.size > MAX_SIZE) {
        toast({
          title: "File too large",
          description: "Maximum file size is 10MB.",
          variant: "destructive",
        });
        return;
      }
      setSelectedFile(file);
      onFileSelect(file);
    },
    [onFileSelect]
  );

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") setDragActive(true);
    else if (e.type === "dragleave") setDragActive(false);
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setDragActive(false);
      if (e.dataTransfer.files?.[0]) {
        validateAndSelect(e.dataTransfer.files[0]);
      }
    },
    [validateAndSelect]
  );

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files?.[0]) {
        validateAndSelect(e.target.files[0]);
      }
    },
    [validateAndSelect]
  );

  const clearFile = useCallback(() => {
    setSelectedFile(null);
    if (inputRef.current) inputRef.current.value = "";
  }, []);

  const formatSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  const getFileIcon = (type: string) => {
    if (type === "application/pdf") return <FileText className="h-5 w-5" />;
    return <Image className="h-5 w-5" />;
  };

  return (
    <div className="w-full">
      <div
        className={`relative rounded-xl border-2 border-dashed p-8 text-center transition-all duration-200 ${
          dragActive
            ? "border-primary bg-primary/5 scale-[1.01]"
            : "border-border hover:border-primary/50 hover:bg-muted/50"
        } ${isProcessing ? "pointer-events-none opacity-60" : "cursor-pointer"}`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        onClick={() => !isProcessing && inputRef.current?.click()}
      >
        <input
          ref={inputRef}
          type="file"
          accept=".pdf,.jpg,.jpeg,.png"
          className="hidden"
          onChange={handleChange}
          disabled={isProcessing}
        />

        <div className="flex flex-col items-center gap-3">
          <div className="rounded-full bg-primary/10 p-4">
            <Upload className="h-8 w-8 text-primary" />
          </div>
          <div>
            <p className="text-lg font-semibold text-foreground">
              Drop your file here or click to browse
            </p>
            <p className="mt-1 text-sm text-muted-foreground">
              PDF, JPG, or PNG — up to 10MB
            </p>
          </div>
        </div>
      </div>

      {selectedFile && (
        <div className="mt-3 flex items-center gap-3 rounded-lg border bg-card p-3">
          <div className="rounded-md bg-primary/10 p-2 text-primary">
            {getFileIcon(selectedFile.type)}
          </div>
          <div className="flex-1 min-w-0">
            <p className="truncate text-sm font-medium text-foreground">
              {selectedFile.name}
            </p>
            <p className="text-xs text-muted-foreground">
              {formatSize(selectedFile.size)}
            </p>
          </div>
          {!isProcessing && (
            <Button variant="ghost" size="icon" onClick={(e) => { e.stopPropagation(); clearFile(); }}>
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>
      )}
    </div>
  );
}
