import React from 'react';

const labels = {
  saved: 'Saved on this device',
  queued: 'Waiting to send',
  sending: 'Sending',
  sent: 'Sent',
  'needs-attention': 'Needs attention',
};

export function OfflineSyncStatus({ status, pendingCount, onRetry }) {
  return <div className="flex flex-wrap items-center gap-2">
    <p role="status" className="text-sm text-slate-300">
      {labels[status]}{Number.isInteger(pendingCount) && pendingCount > 0 ? ` (${pendingCount})` : ''}
    </p>
    {onRetry && ['queued', 'needs-attention'].includes(status) && (
      <button type="button" onClick={onRetry} className="min-h-11 rounded-lg px-3 text-sm font-semibold text-amber-300">
        Retry sync
      </button>
    )}
  </div>;
}
