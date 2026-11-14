import React from 'react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { act, fireEvent, render, screen, waitFor } from '@testing-library/react';
import App from '../../App';
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

beforeEach(() => {
  history.replaceState({}, '', '/');
  vi.spyOn(window, 'scrollTo').mockImplementation(() => {});
  Object.defineProperty(window, 'scrollY', { configurable: true, value: 0 });
});

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

  it('opens shared component and tab URLs', () => {
    history.replaceState({}, '', '/?component=button&tab=export');
    render(<App />);
    expect(screen.getByRole('tab', { name: /export code/i })).toHaveAttribute('aria-selected', 'true');
    expect(screen.getByRole('heading', { name: 'Button', exact: true })).toBeInTheDocument();
  });

  it('restores filtered results, scroll and focus on browser Back', async () => {
    render(<App />);
    fireEvent.click(screen.getByRole('link', { name: 'Components', exact: true }));
    fireEvent.change(screen.getByLabelText('Category'), { target: { value: 'Foundations' } });
    fireEvent.change(screen.getByRole('searchbox'), { target: { value: 'button' } });
    await waitFor(() => expect(screen.queryByRole('link', { name: 'Feature Card' })).toBeNull());
    const result = screen.getByRole('link', { name: 'Button', exact: true });
    Object.defineProperty(window, 'scrollY', { configurable: true, value: 120 });
    await act(async () => { fireEvent.click(result); });
    fireEvent.click(screen.getByRole('tab', { name: /overview & use cases/i }));
    expect(window.location.search).toContain('tab=explanation');
    await act(async () => {
      history.back();
      await new Promise((resolve) => window.addEventListener('popstate', resolve, { once: true }));
    });
    expect(screen.getByRole('searchbox')).toHaveValue('button');
    expect(screen.getByLabelText('Category')).toHaveValue('Foundations');
    expect(screen.getByRole('link', { name: 'Button', exact: true })).toHaveFocus();
    expect(window.scrollTo).toHaveBeenLastCalledWith({ top: 120, behavior: 'instant' });
  });
});

describe('ComponentViewer tab switching regressions', () => {
  it('switches the active tab and panel while preserving tab semantics', () => {
    render(<ComponentViewer component={component} />);

    const explanationTab = screen.getByRole('tab', { name: /overview & use cases/i });
    const previewTab = screen.getByRole('tab', { name: /live preview/i });

    expect(previewTab).toHaveAttribute('aria-selected', 'true');
    expect(screen.getByRole('tabpanel')).toHaveAttribute('id', previewTab.getAttribute('aria-controls'));

    previewTab.focus();
    fireEvent.keyDown(previewTab, { key: 'ArrowRight' });
    expect(explanationTab).toHaveFocus();

    expect(explanationTab).toHaveAttribute('aria-selected', 'true');
    expect(previewTab).toHaveAttribute('aria-selected', 'false');
    expect(screen.getByRole('tabpanel')).toHaveAttribute('id', explanationTab.getAttribute('aria-controls'));
    expect(screen.getByText(/this component explains the problem/i)).toBeInTheDocument();
    expect(screen.queryByTestId('live-preview')).not.toBeInTheDocument();
  });
});
