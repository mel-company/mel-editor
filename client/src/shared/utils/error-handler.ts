import { logger } from './logger';

/**
 * Error handling utility for consistent error management
 */

export type ErrorHandlerOptions = {
    /** Show user-friendly message (implement with your toast/notification system) */
    showToUser?: boolean;
    /** Custom user-facing message */
    userMessage?: string;
    /** Log to console (uses logger utility) */
    logError?: boolean;
    /** Additional context for debugging */
    context?: Record<string, any>;
};

/**
 * Handle errors consistently across the application
 * @param error - The error object
 * @param options - Configuration options
 */
export const handleError = (
    error: Error | unknown,
    options: ErrorHandlerOptions = {}
): void => {
    const {
        showToUser = false,
        userMessage = 'حدث خطأ ما. يرجى المحاولة مرة أخرى.',
        logError = true,
        context = {},
    } = options;

    // Log error if enabled
    if (logError) {
        logger.error('Error occurred:', {
            message: error instanceof Error ? error.message : String(error),
            stack: error instanceof Error ? error.stack : undefined,
            context,
        });
    }

    // Show to user if enabled (you can integrate with toast/notification library)
    if (showToUser) {
        // TODO: Integrate with your notification system
        // For now, just log to console in dev mode
        logger.warn('User message:', userMessage);
        // Example: toast.error(userMessage);
    }
};

/**
 * Async error handler wrapper
 * Wraps async functions to handle errors automatically
 */
export const withErrorHandler = <T extends (...args: any[]) => Promise<any>>(
    fn: T,
    options: ErrorHandlerOptions = {}
): T => {
    return (async (...args: Parameters<T>) => {
        try {
            return await fn(...args);
        } catch (error) {
            handleError(error, options);
            throw error; // Re-throw to allow caller to handle if needed
        }
    }) as T;
};

/**
 * Handle localStorage quota exceeded errors
 */
export const handleStorageError = (error: unknown): void => {
    if (error instanceof Error && error.name === 'QuotaExceededError') {
        handleError(error, {
            showToUser: true,
            userMessage: 'مساحة التخزين ممتلئة. يرجى حذف بعض البيانات أو تصدير عملك.',
            context: { errorType: 'QuotaExceeded' },
        });
    } else {
        handleError(error, {
            showToUser: true,
            userMessage: 'فشل حفظ البيانات. يرجى المحاولة مرة أخرى.',
        });
    }
};

/**
 * Validate environment variables
 * @throws Error if required variables are missing in production
 */
export const validateEnvVars = (): void => {
    const requiredVars = ['VITE_API_BASE_URL'];
    const isProd = import.meta.env.PROD as boolean;

    if (isProd) {
        const missing = requiredVars.filter(
            (varName) => !import.meta.env[varName]
        );

        if (missing.length > 0) {
            throw new Error(
                `Missing required environment variables in production: ${missing.join(', ')}`
            );
        }
    }
};
