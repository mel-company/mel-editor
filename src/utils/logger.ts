/**
 * Logger utility for development and production environments
 * 
 * In development: All logs are shown
 * In production: Only errors are shown
 */

const isDev = import.meta.env.DEV as boolean;

export const logger = {
    /**
     * Log general information (dev only)
     */
    log: (...args: any[]) => {
        if (isDev) {
            console.log(...args);
        }
    },

    /**
     * Log warnings (dev only)
     */
    warn: (...args: any[]) => {
        if (isDev) {
            console.warn(...args);
        }
    },

    /**
     * Log errors (always shown)
     */
    error: (...args: any[]) => {
        console.error(...args);
    },

    /**
     * Log debug information (dev only)
     */
    debug: (...args: any[]) => {
        if (isDev) {
            console.debug(...args);
        }
    },

    /**
     * Group logs together (dev only)
     */
    group: (label: string) => {
        if (isDev) {
            console.group(label);
        }
    },

    /**
     * End a log group (dev only)
     */
    groupEnd: () => {
        if (isDev) {
            console.groupEnd();
        }
    },
};
