import { useState, useCallback } from 'react';
import { FileType } from '../types';

type UseR2UploadOptions = {
    onUpload?: (file: FileType) => void;
    maxSizeMB?: number;
    acceptedTypes?: string[];
};

type R2UploadState = {
    file: FileType | null;
    isLoading: boolean;
    error: string | null;
    uploadProgress: number;
};

export const useR2Upload = ({
    onUpload,
    maxSizeMB = 5,
    acceptedTypes = ['image/*'],
}: UseR2UploadOptions) => {
    const [uploadState, setUploadState] = useState<R2UploadState>({
        file: null,
        isLoading: false,
        error: null,
        uploadProgress: 0,
    });

    const uploadToR2 = useCallback(async (file: File): Promise<FileType> => {
        return new Promise((resolve, reject) => {
            // Validate file
            if (!acceptedTypes.some(type => {
                if (type.endsWith('/*')) {
                    return file.type.startsWith(type.slice(0, -1));
                }
                return file.type === type;
            })) {
                reject(new Error('Invalid file type'));
                return;
            }

            if (file.size > maxSizeMB * 1024 * 1024) {
                reject(new Error(`File size exceeds ${maxSizeMB}MB limit`));
                return;
            }

            setUploadState(prev => ({ ...prev, isLoading: true, error: null, uploadProgress: 0 }));

            // Upload via server (server handles R2 or local storage)
            const formData = new FormData();
            formData.append('file', file);

            fetch('/api/v1/upload', {
                method: 'POST',
                body: formData,
            })
            .then(response => response.json())
            .then(data => {
                if (data.error) {
                    throw new Error(data.error);
                }
                if (!data.success) {
                    throw new Error('Upload failed');
                }
                return data.fileUrl;
            })
            .then((fileUrl) => {
                const newFile: FileType = {
                    id: crypto.randomUUID(),
                    name: file.name,
                    url: fileUrl,
                    base64Content: undefined, // Don't store base64 for R2 uploads
                };

                setUploadState(prev => ({
                    ...prev,
                    file: newFile,
                    isLoading: false,
                    uploadProgress: 100,
                }));

                if (onUpload) {
                    onUpload(newFile);
                }

                resolve(newFile);
            })
            .catch(error => {
                console.error('R2 Upload error:', error);
                setUploadState(prev => ({
                    ...prev,
                    isLoading: false,
                    error: error.message || 'Upload failed',
                    uploadProgress: 0,
                }));
                reject(error);
            });
        });
    }, [maxSizeMB, acceptedTypes, onUpload]);

    const handleFileChange = useCallback(async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            try {
                await uploadToR2(file);
            } catch (error) {
                // Error is already handled in uploadToR2
            }
        }
    }, [uploadToR2]);

    const handleDrop = useCallback(async (e: React.DragEvent<HTMLElement>) => {
        e.preventDefault();
        e.stopPropagation();
        const file = e.dataTransfer.files?.[0];
        if (file) {
            try {
                await uploadToR2(file);
            } catch (error) {
                // Error is already handled in uploadToR2
            }
        }
    }, [uploadToR2]);

    const clear = useCallback(() => {
        setUploadState({
            file: null,
            isLoading: false,
            error: null,
            uploadProgress: 0,
        });
    }, []);

    return {
        uploadState,
        handleFileChange,
        handleDrop,
        clear,
        uploadToR2,
    };
};
