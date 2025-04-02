/// <reference types="jest" />
/// <reference types="@testing-library/jest-dom" />

import '@testing-library/jest-dom';
import { configure } from '@testing-library/react';

// Configure testing-library
configure({ testIdAttribute: 'data-testid' });

// Mock window.matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation((query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

// Mock ResizeObserver
declare global {
  interface Window {
    ResizeObserver: typeof ResizeObserver;
  }
}

class ResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
}

window.ResizeObserver = ResizeObserver;

// Suppress console.error in tests
const originalError = console.error;
beforeAll(() => {
  console.error = (...args: unknown[]) => {
    if (
      typeof args[0] === 'string' &&
      args[0].includes('Warning: ReactDOM.render is no longer supported')
    ) {
      return;
    }
    originalError.call(console, ...args);
  };
});

afterAll(() => {
  console.error = originalError;
}); 