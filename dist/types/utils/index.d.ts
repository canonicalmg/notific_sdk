/**
 * Generate a unique ID
 */
export declare function generateId(prefix?: string): string;
/**
 * Deep merge two objects
 */
export declare function deepMerge<T extends object>(target: T, source: Partial<T>): T;
/**
 * Debounce a function
 */
export declare function debounce<T extends (...args: any[]) => any>(func: T, wait: number): (...args: Parameters<T>) => void;
/**
 * Get the page context information
 */
export declare function getPageContext(): Record<string, any>;
/**
 * Log a message to the console if debug mode is enabled
 */
export declare function debugLog(enabled: boolean, message: string, ...data: any[]): void;
