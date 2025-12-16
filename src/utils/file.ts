/**
 * Converts a File object to a Base64 string.
 * @param file The file to convert.
 * @returns A promise that resolves with the Base64 string.
 */
export const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = (error) => reject(error);
    });
};

type ValidationOptions = {
    maxSizeMB?: number;
    acceptedTypes?: string[];
};

type ValidationResult = {
    valid: boolean;
    error?: string;
};

/**
 * Validates a file based on size and type.
 * @param file The file to validate.
 * @param options Validation options (maxSizeMB, acceptedTypes).
 * @returns An object indicating validity and an optional error message.
 */
export const validateFile = (file: File, options: ValidationOptions = {}): ValidationResult => {
    const { maxSizeMB = 5, acceptedTypes } = options;

    if (maxSizeMB && file.size > maxSizeMB * 1024 * 1024) {
        return { valid: false, error: `File size exceeds ${maxSizeMB}MB limit.` };
    }

    if (acceptedTypes && acceptedTypes.length > 0) {
        // Create a regex from the accepted types to check MIME types
        // This handles simplified types like 'image/*' or specific like 'image/png'
        const isTypeValid = acceptedTypes.some(type => {
            if (type.endsWith('/*')) {
                const baseType = type.split('/')[0];
                return file.type.startsWith(baseType);
            }
            return file.type === type;
        });

        if (!isTypeValid) {
            return { valid: false, error: `File type ${file.type} is not accepted.` };
        }
    }

    return { valid: true };
};
