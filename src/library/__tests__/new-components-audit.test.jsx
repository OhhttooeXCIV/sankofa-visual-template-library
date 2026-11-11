import React from 'react';
import { describe, expect, it, vi } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import { OrderTimeline, Invoice, OfflineSyncStatus, EvidenceTrail, ApprovalCard } from '../index';

describe('OrderTimeline and Invoice', () => {
  it('renders an ordered, accessible order history', () => {
    render(
      <OrderTimeline
        events={[
          { id: 'created', title: 'Order placed', date: '2026-11-11T08:00:00Z', complete: true },
          { id: 'packed', title: 'Packed', date: '2026-11-11T09:00:00Z', complete: false },
        ]}
      />,
    );
    expect(screen.getByRole('list')).toBeInTheDocument();
    expect(screen.getAllByRole('listitem')).toHaveLength(2);
    expect(screen.getByText('Order placed')).toBeInTheDocument();
  });

  it('renders invoice line items, totals, and a print callback', () => {
    const onPrint = vi.fn();
    render(
      <Invoice
        invoiceNumber="INV-1"
        seller="Sankofa"
        customer="Ada Lovelace"
        items={[{ id: 'a', name: 'Workshop', quantity: 2, unitPrice: 100 }]}
        total={200}
        onPrint={onPrint}
      />,
    );
    expect(screen.getByText('INV-1')).toBeInTheDocument();
    expect(screen.getByText('Workshop')).toBeInTheDocument();
    expect(screen.getByText(/200/)).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: /print/i }));
    expect(onPrint).toHaveBeenCalledTimes(1);
  });
});

describe('OfflineSyncStatus', () => {
  it.each([
    ['queued', 'Queued'],
    ['syncing', 'Syncing'],
    ['failed', 'Failed'],
    ['synced', 'Synced'],
  ])('announces %s status', (status, label) => {
    render(<OfflineSyncStatus status={status} pendingCount={status === 'queued' ? 2 : 0} />);
    expect(screen.getByRole('status')).toHaveTextContent(label);
  });

  it('offers retry for failed synchronization', () => {
    const onRetry = vi.fn();
    render(<OfflineSyncStatus status="error" onRetry={onRetry} />);
    expect(screen.getByRole('alert')).toHaveTextContent('Sync failed');
    fireEvent.click(screen.getByRole('button', { name: /retry/i }));
    expect(onRetry).toHaveBeenCalledTimes(1);
  });
});

describe('EvidenceTrail and ApprovalCard', () => {
  it('renders chronological evidence with actor and timestamp', () => {
    render(
      <EvidenceTrail
        entries={[
          { id: '1', actor: 'Reviewer', action: 'Reviewed document', timestamp: '2026-11-11T10:00:00Z' },
        ]}
      />,
    );
    expect(screen.getByRole('list')).toBeInTheDocument();
    expect(screen.getByText('Reviewer')).toBeInTheDocument();
    expect(screen.getByText('Reviewed document')).toBeInTheDocument();
  });

  it('supports approve and reject actions and reflects the pending state', () => {
    const onApprove = vi.fn();
    const onReject = vi.fn();
    const { rerender } = render(
      <ApprovalCard title="Expense report" status="pending" onApprove={onApprove} onReject={onReject} />,
    );
    fireEvent.click(screen.getByRole('button', { name: /approve/i }));
    fireEvent.click(screen.getByRole('button', { name: /reject/i }));
    expect(onApprove).toHaveBeenCalledTimes(1);
    expect(onReject).toHaveBeenCalledTimes(1);
    rerender(<ApprovalCard title="Expense report" status="approved" onApprove={onApprove} onReject={onReject} />);
    expect(screen.getByText(/approved/i)).toBeInTheDocument();
    expect(screen.queryByRole('button', { name: /approve/i })).not.toBeInTheDocument();
  });
});
