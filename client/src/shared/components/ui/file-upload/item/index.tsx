import { FileType } from "../../../../types";
import { Loader2, Image as ImageIcon } from "lucide-react";
import { useFileUpload } from "../../../../hooks/use-file-upload";
import classNames from "classnames";

interface FileUploadInputProps {
  label?: string;
  value: FileType;
  onChange: (file: FileType) => void;
}

const FileUploadListItem = ({
  label,
  value,
  onChange,
}: FileUploadInputProps) => {
  const { fileState, handleFileChange } = useFileUpload({
    initialValue: value,
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
        "w-full relative flex items-center justify-between bg-slate-50 p-1 rounded-lg",
        "border border-transparent hover:border-slate-100 transition-colors",
        fileState.error ? "border-red-300 bg-red-50" : ""
      )}
    >
      <p className="sub-title mx-1">{label || "اسم الملف"}</p>
      <div className="flex items-center gap-1.5 uppercase">
        <p className="text-slate-800">{label || "اسم الملف"}</p>
        <div className="w-9 h-8 border border-slate-200 bg-slate-100 max-h-9 max-w-9 flex items-center justify-center aspect-square rounded-md overflow-hidden">
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
        <input
          type="file"
          accept="image/*"
          className="absolute w-full h-full inset-0 opacity-0 cursor-pointer z-10"
          onChange={handleFileChange}
          disabled={fileState.isLoading}
        />
      </div>
    </div>
  );
};

export default FileUploadListItem;
