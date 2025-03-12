// Test setup file
import { expect, afterEach } from 'vitest';
import { cleanup } from '@testing-library/react';

// Clean up after each test
afterEach(() => {
  cleanup();
});

// Global error handler for unhandled promise rejections
window.addEventListener('unhandledrejection', (event) => {
  console.error(`UNHANDLED PROMISE REJECTION: ${event.reason}`);
}); 