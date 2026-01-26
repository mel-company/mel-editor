import { useState, useCallback } from 'react';
import { FileType } from '../types';
import { fileToBase64, validateFile } from '../utils/file';

type UseFileUploadOptions = {
    initialValue?: FileType;
    onUpload?: (file: FileType) => void;
    maxSizeMB?: number;
    acceptedTypes?: string[];
};

type FileState = {
    file: FileType | null;
    isLoading: boolean;
    error: string | null;
};

export const useFileUpload = ({
    initialValue,
    onUpload,
    maxSizeMB = 5,
    acceptedTypes = ['image/*'],
}: UseFileUploadOptions) => {
    const [fileState, setFileState] = useState<FileState>({
        file: initialValue || null,
        isLoading: false,
        error: null,
    });

    const processFile = useCallback(async (file: File) => {
        setFileState((prev) => ({ ...prev, isLoading: true, error: null }));

        const validation = validateFile(file, { maxSizeMB, acceptedTypes });
        if (!validation.valid) {
            setFileState((prev) => ({
                ...prev,
                isLoading: false,
                error: validation.error || 'Invalid file',
            }));
            return;
        }

        try {
            const base64 = await fileToBase64(file);
            const newFile: FileType = {
                id: crypto.randomUUID(),
                name: file.name,
                base64Content: base64,
                // Don't save blob URLs as they expire and can't be restored after page reload
                // Use base64Content for persistence instead
            };

            setFileState((prev) => ({
                ...prev,
                file: newFile,
                isLoading: false,
            }));

            if (onUpload) {
                onUpload(newFile);
            }
        } catch (error) {
            console.error("File processing error:", error);
            setFileState((prev) => ({
                ...prev,
                isLoading: false,
                error: 'Failed to process file',
            }));
        }
    }, [maxSizeMB, acceptedTypes, onUpload]);

    const handleFileChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            processFile(file);
        }
    }, [processFile]);

    const handleDrop = useCallback((e: React.DragEvent<HTMLElement>) => {
        e.preventDefault();
        e.stopPropagation();
        const file = e.dataTransfer.files?.[0];
        if (file) {
            processFile(file);
        }
    }, [processFile]);

    const clear = useCallback(() => {
        setFileState({
            file: null,
            isLoading: false,
            error: null,
        });
        // We might want to notify parent about clear?
        // But the current Interface only has onUpload (which implies a file).
        // If we want to support clearing in parent, we might need onClear or similar, 
        // or just call onUpload with a "null" object if the type allowed it, but FileType doesn't seem to allow null easily based on usage.
        // For now, local clear.
    }, []);

    return {
        fileState,
        handleFileChange,
        handleDrop,
        clear,
        setFile: (file: FileType) => setFileState(prev => ({ ...prev, file }))
    };
};
