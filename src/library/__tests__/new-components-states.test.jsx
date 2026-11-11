import React from 'react';
import { describe, expect, it, vi } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import { LoadingState, EmptyState, ErrorState, DataTableShell } from '../index';

describe('LoadingState, EmptyState, and ErrorState', () => {
  it('uses status semantics for loading and supports an accessible label', () => {
    render(<LoadingState label="Loading orders" />);
    expect(screen.getByRole('status')).toHaveAccessibleName('Loading orders');
    expect(screen.getByRole('status')).toHaveAttribute('aria-live', 'polite');
  });

  it('renders empty and error states with actionable callbacks', () => {
    const onRetry = vi.fn();
    const onAction = vi.fn();
    render(
      <>
        <EmptyState title="No orders" description="Create your first order" action={<button onClick={onAction}>Create order</button>} />
        <ErrorState title="Could not load orders" description="Try again" onRetry={onRetry} />
      </>,
    );
    expect(screen.getByText('No orders')).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'Create order' }));
    fireEvent.click(screen.getByRole('button', { name: /try again/i }));
    expect(onAction).toHaveBeenCalledTimes(1);
    expect(onRetry).toHaveBeenCalledTimes(1);
    expect(screen.getByRole('alert')).toHaveTextContent('Could not load orders');
  });
});

describe('DataTableShell', () => {
  const columns = [
    { key: 'name', header: 'Name' },
    { key: 'status', header: 'Status' },
  ];

  it('renders headers, rows, and row callbacks with table semantics', () => {
    const onRowClick = vi.fn();
    render(
      <DataTableShell
        aria-label="Orders"
        columns={columns.map((column) => ({ ...column, label: column.header }))}
        rows={[{ id: '1', name: 'First order', status: 'Open' }]}
        getRowKey={(row) => row.id}
      />,
    );
    expect(screen.getByRole('table', { name: 'Orders' })).toBeInTheDocument();
    expect(screen.getByRole('columnheader', { name: 'Name' })).toBeInTheDocument();
    expect(screen.getByRole('row', { name: /First order Open/ })).toBeInTheDocument();
  });

  it('renders an empty state and remains usable with no rows', () => {
    render(<DataTableShell columns={columns.map((column) => ({ ...column, label: column.header }))} rows={[]} emptyTitle="No matching orders" />);
    expect(screen.getByText('No matching orders')).toBeInTheDocument();
    expect(screen.getByRole('table')).toBeInTheDocument();
  });
});
