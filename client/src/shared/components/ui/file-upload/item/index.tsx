import { FileType } from "../../../../types";
import { Loader2, Image as ImageIcon, XIcon } from "lucide-react";
import { useR2Upload } from "../../../../hooks/use-r2-upload";
import classNames from "classnames";

interface FileUploadInputProps {
  label?: string;
  value: FileType;
  deleteSlide?: (e: any) => void;
  onChange: (file: FileType) => void;
}

const FileUploadListItem = ({
  label,
  value,
  onChange,
  deleteSlide
}: FileUploadInputProps) => {
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
        "w-full relative flex items-center justify-between gap-1 bg-slate-50 p-1 rounded-lg",
        "border border-transparent hover:border-slate-100 transition-colors",
        uploadState.error ? "border-red-300 bg-red-50" : ""
      )}
    >
      <button
        onClick={deleteSlide}
        className="text-xs cursor-pointer z-10 hover:bg-slate-200 p-1 transition-colors rounded-full text-slate-600 hover:text-slate-700"
      >
        <XIcon className="w-3.5 h-3.5" />
      </button>
      <div className="flex items-center gap-1.5 uppercase relative  w-full">
        <div className="flex flex-col gap-0.5 grow">
          <p className="sub-title mx-1">{"اسم الملف"}</p>
          <p className="text-slate-800 text-xs line-clamp-1">{label ?? ""}</p>
        </div>

        <div className="w-9 h-9 border border-slate-200 bg-slate-100 max-h-9 max-w-9 min-h-9 min-w-9 flex items-center justify-center aspect-square rounded-md overflow-hidden">
          {uploadState.isLoading ? (
            <Loader2 className="w-4 h-4 text-blue-500 animate-spin" />
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
        <input
          type="file"
          accept="image/*"
          className="absolute w-full h-full inset-0 opacity-0 cursor-pointer z-10"
          onChange={handleFileChange}
          disabled={uploadState.isLoading}
        />
      </div>
    </div>
  );
};

export default FileUploadListItem;
