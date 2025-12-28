import { FileType } from "../../../../types";
import { Upload, X, Loader2, Image as ImageIcon } from "lucide-react";
import { useFileUpload } from "../../../../hooks/use-file-upload";
import classNames from "classnames";

interface FileUploadInputProps {
  label: string;
  value?: FileType | null;
  onChange: (file: FileType) => void;
}

const FileUploadBar = ({ label, value, onChange }: FileUploadInputProps) => {
  const { fileState, handleFileChange } = useFileUpload({
    initialValue: value || null,
    onUpload: onChange,
    maxSizeMB: 5,
    acceptedTypes: ["image/*"],
  });

  // Use base64Content only, as blob URLs expire and can't be restored after page reload
  const displayImage =
    fileState.file?.base64Content ||
    value?.base64Content ||
    value?.url; // Fallback to url only if base64 is not available

  return (
    <div
      className={classNames(
        "w-full flex items-center justify-between",
        fileState.error ? "border-red-300 bg-red-50" : ""
      )}
    >
      <div className="w-9 h-9 border border-slate-200 bg-slate-100 max-h-9 max-w-9 flex items-center justify-center aspect-square rounded-lg overflow-hidden">
        {fileState.isLoading ? (
          <Loader2 className="w-8 h-8 text-blue-500 animate-spin" />
        ) : (
          <>
            {displayImage ? (
              <img
                src={displayImage}
                alt="Preview"
                className="h-full w-full object-cover"
                onError={(e) => {
                  // Hide image if it fails to load (e.g., expired blob URL)
                  const target = e.target as HTMLImageElement;
                  target.style.display = 'none';
                }}
              />
            ) : (
              <ImageIcon strokeWidth={1.5} className="text-slate-500" />
            )}
          </>
        )}

        {fileState.error && (
          <p className="text-xs text-red-500 mt-1">{fileState.error}</p>
        )}
      </div>
      <div className="relative cursor-pointer py-2 px-2.5 hover:bg-blue-50/80 transition-colors active:bg-blue-50 bg-blue-50 text-sm rounded-lg flex items-center gap-1">
        <Upload size={14} className="text-blue-600" />
        <p className="text-xs font-medium text-blue-600">{label}</p>
        <input
          type="file"
          accept="image/*"
          className="absolute inset-0 opacity-0 cursor-pointer z-10"
          onChange={handleFileChange}
          disabled={fileState.isLoading}
        />
      </div>
    </div>
  );
};

export default FileUploadBar;
