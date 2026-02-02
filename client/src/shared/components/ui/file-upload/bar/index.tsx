import { FileType } from "../../../../types";
import { Upload, XIcon, Loader2, Image as ImageIcon } from "lucide-react";
import React from "react";
import { useR2Upload } from "../../../../hooks/use-r2-upload";
import classNames from "classnames";

interface FileUploadInputProps {
  label: string;
  value: FileType | undefined;
  deleteSlide?: (e: React.MouseEvent) => void;
  onChange: (file: FileType) => void;
}

const FileUploadBar = ({ label, onChange, deleteSlide }: FileUploadInputProps) => {
  const { uploadState, handleFileChange } = useR2Upload({
    onUpload: onChange,
    maxSizeMB: 5,
    acceptedTypes: ["image/*"],
  });


  return (
    <div
      className={classNames(
        "w-full flex items-center justify-between p-1 bg-slate-50 rounded-lg",
        uploadState.error ? "border-red-300 bg-red-50" : ""
      )}
    >
      {deleteSlide && (
        <button
          onClick={deleteSlide}
          className="text-xs cursor-pointer z-10 hover:bg-slate-200 p-1 transition-colors rounded-full text-slate-600 hover:text-slate-700"
        >
          <XIcon className="w-3.5 h-3.5" />
        </button>
      )}

      <div className="relative cursor-pointer py-2 px-2.5 hover:bg-blue-50/80 transition-colors active:bg-blue-50 bg-blue-50 text-sm rounded-lg flex items-center gap-1">

        {uploadState.isLoading ? <Loader2 className="w-3 h-3 text-blue-500 animate-spin" /> : <Upload size={14} className="text-blue-600" />}
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
