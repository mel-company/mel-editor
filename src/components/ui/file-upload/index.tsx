import React, { useState } from 'react'
import { FileType } from '../../../types'
import { Upload, X, Loader2, Image as ImageIcon } from 'lucide-react'
import { useFileUpload } from '../../../hooks/use-file-upload'
import classNames from 'classnames'

interface FileUploadInputProps {
    label: string
    value: FileType
    onChange: (file: FileType) => void
    className?: string
}

const FileUploadInput = ({ label, value, onChange, className }: FileUploadInputProps) => {
    const { fileState, handleFileChange, handleDrop, clear } = useFileUpload({
        initialValue: value,
        onUpload: onChange,
        maxSizeMB: 5,
        acceptedTypes: ['image/*']
    });

    const [isDragging, setIsDragging] = useState(false);

    const onDragOver = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const onDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setIsDragging(false);
    };

    const onDrop = (e: React.DragEvent<HTMLDivElement>) => {
        setIsDragging(false);
        handleDrop(e);
    };

    // Determine the image source (base64 only, as blob URLs expire)
    // Priority: local preview file (if any), then value from props
    const displayImage = fileState.file?.base64Content || value?.base64Content || value?.url;

    return (
        <div className={classNames('flex flex-col gap-2', className)}>
            <div
                className={classNames(
                    'relative w-full border-2 border-dashed rounded-xl p-4 transition-colors',
                    isDragging ? 'border-blue-500 bg-blue-50' : 'border-slate-200 hover:border-blue-400',
                    fileState.error ? 'border-red-300 bg-red-50' : ''
                )}
                onDragOver={onDragOver}
                onDragLeave={onDragLeave}
                onDrop={onDrop}
            >
                <input
                    type="file"
                    accept="image/*"
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                    onChange={handleFileChange}
                    disabled={fileState.isLoading}
                />

                <div className="flex flex-col items-center justify-center gap-2 text-center">
                    {fileState.isLoading ? (
                        <Loader2 className="w-8 h-8 text-blue-500 animate-spin" />
                    ) : displayImage ? (
                        <div className="relative group">
                            <img
                                src={displayImage}
                                alt="Preview"
                                className="h-32 w-auto object-contain rounded-lg border border-slate-200"
                                onError={(e) => {
                                    // Hide image if it fails to load (e.g., expired blob URL)
                                    const target = e.target as HTMLImageElement;
                                    target.style.display = 'none';
                                }}
                            />
                            <button
                                type="button"
                                onClick={(e) => {
                                    e.preventDefault(); // Prevent triggering file input
                                    e.stopPropagation();
                                    clear();
                                    // Optionally notify parent to clear as well if needed, currently we assume onChange handles new valid files.
                                }}
                                className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity z-20"
                            >
                                <X className="w-3 h-3" />
                            </button>
                        </div>
                    ) : (
                        <div className="flex flex-col items-center text-slate-400">
                            <div className="p-3 bg-slate-100 rounded-full mb-2">
                                <Upload className="w-6 h-6 text-slate-500" />
                            </div>
                            <p className="text-sm font-medium text-slate-600">{label}</p>
                            <p className="text-xs text-slate-400">Drag & drop or click to upload</p>
                        </div>
                    )}

                    {fileState.error && (
                        <p className="text-xs text-red-500 mt-1">{fileState.error}</p>
                    )}
                </div>
            </div>
            {/* Removed the extra button as the click-to-upload is now integrated into the drag area */}
        </div>
    )
}

export default FileUploadInput