import React, { useState } from 'react';
import 'fake-indexeddb/auto';
import { afterEach, expect, it, vi } from 'vitest';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { Drawer, Modal, OfflineSaveButton, OfflineSyncStatus } from '../components';
import { createOfflineOutbox } from '../offline/outbox.js';
import { useOfflineCatalogue } from '../../showcase/offline/useOfflineCatalogue';

afterEach(() => vi.unstubAllGlobals());

it('distinguishes device storage from server acknowledgement', () => {
  const toggle = vi.fn();
  const retry = vi.fn();
  const { rerender } = render(<><OfflineSaveButton saved={false} onToggle={toggle} /><OfflineSyncStatus status="queued" pendingCount={2} onRetry={retry} /></>);
  fireEvent.click(screen.getByRole('button', { name: 'Save for offline' }));
  fireEvent.click(screen.getByRole('button', { name: 'Retry sync' }));
  expect(toggle).toHaveBeenCalledOnce();
  expect(retry).toHaveBeenCalledOnce();
  expect(screen.getByRole('status')).toHaveTextContent('Waiting to send (2)');
  rerender(<><OfflineSaveButton saved /><OfflineSyncStatus status="sent" /></>);
  expect(screen.getByRole('button', { name: 'Remove offline copy' })).toHaveAttribute('aria-pressed', 'true');
  expect(screen.getByRole('status')).toHaveTextContent('Sent');
});

it('reports an unavailable worker without claiming a save succeeded', async () => {
  function OfflineHarness() {
    const { toggle, status, saved } = useOfflineCatalogue();
    return <><button onClick={() => toggle({ id: 'button' })}>Save</button><p role="status">{status || saved.length}</p></>;
  }
  render(<OfflineHarness />);
  fireEvent.click(screen.getByRole('button', { name: 'Save' }));
  await waitFor(() => expect(screen.getByRole('status')).toHaveTextContent('Could not save'));
});

it('replays with the same ID after a lost acknowledgement and records one receipt', async () => {
  const accepted = new Set();
  const send = vi.fn(async ({ id }) => {
    if (!accepted.has(id)) {
      accepted.add(id);
      throw new Error('Connection interrupted before acknowledgement');
    }
  });
  const options = { scope: crypto.randomUUID(), send };
  const outbox = createOfflineOutbox(options);
  await outbox.enqueue({ content: 'Example' }, 'submission-1');
  await outbox.enqueue({ content: 'Example' }, 'submission-1');
  expect(await outbox.drain()).toEqual([expect.objectContaining({ id: 'submission-1', status: 'queued' })]);
  const reopened = createOfflineOutbox(options);
  await Promise.all([reopened.drain(), reopened.drain()]);
  expect(send.mock.calls.map(([entry]) => entry.id)).toEqual(['submission-1', 'submission-1']);
  expect(accepted.size).toBe(1);
  expect(await reopened.list()).toEqual([expect.objectContaining({ status: 'sent' })]);
  expect((await reopened.list())[0]).not.toHaveProperty('payload');
});

it('retries on reconnect and keeps queues scoped to an account', async () => {
  const send = vi.fn().mockRejectedValueOnce(new Error('offline')).mockResolvedValue(undefined);
  const outbox = createOfflineOutbox({ scope: crypto.randomUUID(), send });
  const otherAccount = createOfflineOutbox({ scope: crypto.randomUUID(), send });
  await outbox.enqueue({ name: 'A draft' });
  const onChange = vi.fn();
  const stop = outbox.start({ onChange });
  await waitFor(() => expect(onChange).toHaveBeenCalledWith([expect.objectContaining({ status: 'queued' })]));
  window.dispatchEvent(new Event('online'));
  await waitFor(() => expect(onChange).toHaveBeenCalledWith([expect.objectContaining({ status: 'sent' })]));
  expect(await otherAccount.list()).toEqual([]);
  stop();
});

it('allows an explicit retry after a rejected operation', async () => {
  const send = vi.fn().mockRejectedValueOnce({ permanent: true }).mockResolvedValue(undefined);
  const outbox = createOfflineOutbox({ scope: crypto.randomUUID(), send });
  await outbox.enqueue({}, 'retry-me');
  expect(await outbox.drain()).toEqual([expect.objectContaining({ status: 'needs-attention' })]);
  expect(await outbox.retry('retry-me')).toEqual([expect.objectContaining({ status: 'sent' })]);
});

it('contains focus and releases scroll lock after the last overlay closes', () => {
  function Harness() {
    const [modal, setModal] = useState(false);
    const [drawer, setDrawer] = useState(false);
    return <>
      <button onClick={() => setModal(true)}>Open details</button>
      <Modal title="Details" isOpen={modal} onClose={() => setModal(false)}>
        <button onClick={() => setDrawer(true)}>Open filters</button>
      </Modal>
      <Drawer title="Filters" isOpen={drawer} onClose={() => setDrawer(false)}>Filters here</Drawer>
    </>;
  }
  render(<Harness />);
  const trigger = screen.getByRole('button', { name: 'Open details' });
  trigger.focus();
  fireEvent.click(trigger);
  const drawerTrigger = screen.getByRole('button', { name: 'Open filters' });
  drawerTrigger.focus();
  fireEvent.click(drawerTrigger);
  expect(screen.getByRole('button', { name: 'Close drawer' })).toHaveFocus();
  fireEvent.keyDown(document.activeElement, { key: 'Escape' });
  expect(drawerTrigger).toHaveFocus();
  expect(document.body.style.overflow).toBe('hidden');
  fireEvent.keyDown(document.activeElement, { key: 'Escape' });
  expect(trigger).toHaveFocus();
  expect(document.body.style.overflow).toBe('');
});
