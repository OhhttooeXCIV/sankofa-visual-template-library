import React from 'react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import App from '../../App';

beforeEach(() => {
  history.replaceState({}, '', '/');
  vi.spyOn(window, 'scrollTo').mockImplementation(() => {});
});

describe('developer onboarding and navigation', () => {
  it('opens the catalogue from Overview', () => {
    render(<App />);
    expect(screen.getByRole('heading', { name: /a shared shelf/i })).toBeInTheDocument();
    fireEvent.click(screen.getByRole('link', { name: 'Components', exact: true }));
    expect(screen.getByRole('heading', { name: 'Components', exact: true })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Components', exact: true })).toHaveAttribute('aria-current', 'page');
  });

  it('documents the implementation and each component inside the app', () => {
    render(<App />);
    fireEvent.click(screen.getByRole('link', { name: 'Documentation', exact: true }));
    expect(screen.getByRole('heading', { name: 'Mobile navigation and offline use' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Apply the pattern in Angular' })).toBeInTheDocument();
    expect(screen.getByText('Component-by-component guidance')).toBeInTheDocument();
    expect(screen.getByText(/stableOperationId/)).toBeInTheDocument();
  });
});
