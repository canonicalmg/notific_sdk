/**
 * Generate a unique ID
 */
export function generateId(prefix: string = 'notific'): string {
  return `${prefix}-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
}

/**
 * Deep merge two objects
 */
export function deepMerge<T extends object>(target: T, source: Partial<T>): T {
  const result = { ...target };

  if (isObject(target) && isObject(source)) {
    Object.keys(source).forEach(key => {
      if (isObject(source[key as keyof typeof source])) {
        if (!(key in target)) {
          Object.assign(result, { [key]: source[key as keyof typeof source] });
        } else {
          (result as any)[key] = deepMerge(
            (target as any)[key],
            source[key as keyof typeof source] as any
          );
        }
      } else {
        Object.assign(result, { [key]: source[key as keyof typeof source] });
      }
    });
  }

  return result;
}

/**
 * Check if value is an object
 */
function isObject(item: any): boolean {
  return item && typeof item === 'object' && !Array.isArray(item);
}

/**
 * Debounce a function
 */
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: ReturnType<typeof setTimeout> | null = null;

  return function(...args: Parameters<T>): void {
    const later = () => {
      timeout = null;
      func(...args);
    };

    if (timeout !== null) {
      clearTimeout(timeout);
    }
    timeout = setTimeout(later, wait);
  };
}

/**
 * Get the page context information
 */
export function getPageContext(): Record<string, any> {
  return {
    url: window.location.href,
    title: document.title,
    path: window.location.pathname,
    referrer: document.referrer || window.location.origin, // Provide a fallback value
    userAgent: navigator.userAgent,
    screenWidth: window.screen.width,
    screenHeight: window.screen.height,
    viewportWidth: window.innerWidth,
    viewportHeight: window.innerHeight,
    timestamp: Date.now()
  };
}

/**
 * Log a message to the console if debug mode is enabled
 */
export function debugLog(
  enabled: boolean,
  message: string,
  ...data: any[]
): void {
  if (enabled) {
    console.log(`[NotificAI] ${message}`, ...data);
  }
}