import React from 'react';
import { render, screen } from '@testing-library/react';
import { ErrorBoundary } from '../ErrorBoundary';

// Component that throws an error
const ThrowError = () => {
  throw new Error('Test error');
};

describe('ErrorBoundary', () => {
  const consoleError = jest.spyOn(console, 'error').mockImplementation(() => {});

  afterAll(() => {
    consoleError.mockRestore();
  });

  it('renders children when there is no error', () => {
    render(
      <ErrorBoundary>
        <div data-testid="child">Test Content</div>
      </ErrorBoundary>
    );

    expect(screen.getByTestId('child')).toBeInTheDocument();
  });

  it('renders error message when there is an error', () => {
    render(
      <ErrorBoundary>
        <ThrowError />
      </ErrorBoundary>
    );

    expect(screen.getByText(/Something went wrong/i)).toBeInTheDocument();
  });

  it('renders custom error message when provided', () => {
    render(
      <ErrorBoundary errorMessage="Custom error message">
        <ThrowError />
      </ErrorBoundary>
    );

    expect(screen.getByText('Custom error message')).toBeInTheDocument();
  });
}); 