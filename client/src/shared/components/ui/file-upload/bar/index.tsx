import { FileType } from "../../../../types";
import { Upload, X, Loader2, Image as ImageIcon } from "lucide-react";
import { useR2Upload } from "../../../../hooks/use-r2-upload";
import classNames from "classnames";

interface FileUploadInputProps {
  label: string;
  value: FileType | undefined;
  onChange: (file: FileType) => void;
}

const FileUploadBar = ({ label, value, onChange }: FileUploadInputProps) => {
  const { uploadState, handleFileChange } = useR2Upload({
    onUpload: onChange,
    maxSizeMB: 5,
    acceptedTypes: ["image/*"],
  });

  // Use URL from R2 upload, fallback to existing value
  const displayImage =
    uploadState.file?.url ||
    value?.url ||
    value?.base64Content; // Fallback for legacy data

  return (
    <div
      className={classNames(
        "w-full flex items-center justify-between",
        uploadState.error ? "border-red-300 bg-red-50" : ""
      )}
    >
      <div className="w-9 h-9 border border-slate-200 bg-slate-100 max-h-9 max-w-9 flex items-center justify-center aspect-square rounded-lg overflow-hidden">
        {uploadState.isLoading ? (
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

        {uploadState.error && (
          <p className="text-xs text-red-500 mt-1">{uploadState.error}</p>
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
          disabled={uploadState.isLoading}
        />
      </div>
    </div>
  );
};

export default FileUploadBar;
