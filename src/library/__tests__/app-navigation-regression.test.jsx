import React from 'react';
import { describe, expect, it, vi } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import App from '../../App';
import { COMPONENT_REGISTRY } from '../../library/docs/registry';
import ComponentViewer from '../../showcase/components/ComponentViewer';

vi.mock('../../showcase/components/LivePreviewContainer', () => ({
  default: ({ componentId }) => <div data-testid="live-preview">Preview: {componentId}</div>,
}));

const component = {
  id: 'regression-component',
  name: 'Regression Component',
  category: 'Foundations',
  tagline: 'A component used to verify viewer navigation.',
  explanation: 'This component explains the problem it solves.',
  usage: 'Import and configure the component.',
  useCases: ['A documented use case'],
  props: [],
  exportCode: 'export function RegressionComponent() {}',
  mainJsxCode: '<RegressionComponent />',
  sourceProject: 'Sankofa Visual Template Library',
  sourcePath: 'src/library/foundations/RegressionComponent.jsx',
  adaptationNotes: 'Portable across projects.',
  dependencies: [],
  responsiveBehavior: 'Adapts to the available width.',
  accessibility: 'Uses semantic controls.',
  previewControls: [],
  testPath: 'src/library/__tests__/app-navigation-regression.test.jsx',
};

describe('App onboarding and navigation regressions', () => {
  it('introduces the library and uses the WebP hero asset on the landing view', () => {
    render(<App />);

    expect(screen.getByRole('heading', { name: /build digital experiences/i })).toBeInTheDocument();
    expect(screen.getByText(/a shared shelf of interface patterns, not a single product/i)).toBeInTheDocument();
    expect(screen.getByText(/an onboarding layer for developers/i)).toBeInTheDocument();
    expect(screen.getByAltText(/sankofa digital gold bird emblem/i)).toHaveAttribute(
      'src',
      '/sankofa-digital-hero.webp',
    );
    expect(screen.getByAltText(/sankofa digital gold bird emblem/i).parentElement).toContainHTML(
      'type="image/webp"',
    );
  });

  it('switches from the introduction to the component library through navigation', () => {
    render(<App />);

    fireEvent.click(screen.getAllByRole('button', { name: 'Browse library' })[0]);

    expect(screen.queryByRole('heading', { name: /build digital experiences/i })).not.toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'All' })).toBeInTheDocument();
    expect(screen.getByText(/interactive playground/i)).toBeInTheDocument();
  });

  it('applies a selected category before entering the library view', () => {
    render(<App />);

    const category = COMPONENT_REGISTRY[0].category;
    const categoryButton = screen.getByRole('button', { name: category, exact: true });

    fireEvent.click(categoryButton);
    fireEvent.click(screen.getAllByRole('button', { name: 'Browse library' })[0]);

    expect(screen.getByText(category)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /browse library/i }).first()).toBeInTheDocument();
  });
});

describe('ComponentViewer tab switching regressions', () => {
  it('switches the active tab and panel while preserving tab semantics', () => {
    render(<ComponentViewer component={component} />);

    const explanationTab = screen.getByRole('tab', { name: /overview & use cases/i });
    const previewTab = screen.getByRole('tab', { name: /live preview/i });

    expect(previewTab).toHaveAttribute('aria-selected', 'true');
    expect(screen.getByRole('tabpanel')).toHaveAttribute('id', 'component-panel-preview');

    fireEvent.click(explanationTab);

    expect(explanationTab).toHaveAttribute('aria-selected', 'true');
    expect(previewTab).toHaveAttribute('aria-selected', 'false');
    expect(screen.getByRole('tabpanel')).toHaveAttribute('id', 'component-panel-explanation');
    expect(screen.getByText(/this component explains the problem/i)).toBeInTheDocument();
    expect(screen.queryByTestId('live-preview')).not.toBeInTheDocument();
  });
});
