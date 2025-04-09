// Mock browser globals
global.MutationObserver = class {
  constructor(callback) {}
  disconnect() {}
  observe(element, initObject) {}
};

// Mock fetch API
global.fetch = jest.fn(() =>
  Promise.resolve({
    ok: true,
    json: () => Promise.resolve({}),
  })
);

// Mock window properties
Object.defineProperty(window, 'scrollX', { value: 0 });
Object.defineProperty(window, 'scrollY', { value: 0 });

// Mock console.error to catch and display test errors
const originalConsoleError = console.error;
console.error = (...args) => {
  // Don't show expected test errors in the console output
  if (args[0]?.includes && (
    args[0].includes('Error handling user message') ||
    args[0].includes('Error sending message to API')
  )) {
    return;
  }
  originalConsoleError(...args);
};