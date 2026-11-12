import React from 'react';
import { describe, expect, it } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import App from '../../App';

describe('developer onboarding and navigation', () => {
  it('onboards developers before showing the component workspace', () => {
    render(<App />);

    expect(screen.getByText('A shared shelf of interface patterns, not a single product.')).toBeInTheDocument();
    expect(screen.queryByText('Interactive Playground')).not.toBeInTheDocument();

    fireEvent.click(screen.getAllByRole('button', { name: 'Browse library' })[0]);

    expect(screen.getByText('Interactive Playground')).toBeInTheDocument();
    expect(screen.queryByText('A shared shelf of interface patterns, not a single product.')).not.toBeInTheDocument();
  });

  it('switches component detail tabs and renders the selected panel', () => {
    render(<App />);
    fireEvent.click(screen.getAllByRole('button', { name: 'Browse library' })[0]);

    fireEvent.click(screen.getByRole('tab', { name: /Overview & Use Cases/i }));

    expect(screen.getByRole('tabpanel')).toHaveTextContent('Architectural Explanation & Philosophy');
    expect(screen.queryByText('Interactive Playground')).not.toBeInTheDocument();
  });
});
