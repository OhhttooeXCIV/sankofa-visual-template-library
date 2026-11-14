import { localTransaction, openLocalDatabase } from './database.js';

const STORE = 'operations';

/**
 * One database per host application and account. Send receives a stable operation ID.
 * Resolve send only after server acknowledgement. The server must deduplicate by ID,
 * including across tabs and retries after a response was lost.
 */
export function createOfflineOutbox({ scope, send }) {
  if (!scope || typeof send !== 'function') throw new TypeError('An account scope and send function are required');
  let database;
  let draining;
  async function run(mode, operation) {
    database ??= openLocalDatabase('sankofa-outbox:' + scope, [STORE]).catch((error) => {
      database = undefined;
      throw error;
    });
    return localTransaction(await database, STORE, mode, operation);
  }

  const list = () => run('readonly', (store) => store.getAll());

  async function enqueue(payload, id = crypto.randomUUID()) {
    const entry = { id, payload, status: 'queued', createdAt: Date.now() };
    try {
      await run('readwrite', (store) => store.add(entry));
    } catch (error) {
      if (error.name !== 'ConstraintError') throw error;
      return run('readonly', (store) => store.get(id));
    }
    return entry;
  }

  async function performDrain() {
    const entries = (await list()).sort((left, right) => left.createdAt - right.createdAt);
    for (const entry of entries) {
      if (entry.status !== 'queued') continue;
      try {
        await send(entry);
      } catch (error) {
        if (!error?.permanent) break;
        await run('readwrite', (store) => store.put({ ...entry, status: 'needs-attention' }));
        continue;
      }
      await run('readwrite', (store) => store.put({
        id: entry.id, status: 'sent', createdAt: entry.createdAt, sentAt: Date.now(),
      }));
    }
    return list();
  }

  function drain() {
    if (!draining) {
      const lockedDrain = navigator.locks
        ? navigator.locks.request('sankofa-outbox:' + scope, performDrain)
        : performDrain();
      draining = lockedDrain.finally(() => { draining = undefined; });
    }
    return draining;
  }

  function start({ onChange = () => {}, onError = () => {} } = {}) {
    let active = true;
    const retry = () => drain().then((entries) => {
      if (active) onChange(entries);
    }).catch((error) => {
      if (active) onError(error);
    });
    const onVisible = () => { if (document.visibilityState === 'visible') retry(); };
    window.addEventListener('online', retry);
    document.addEventListener('visibilitychange', onVisible);
    retry();
    return () => {
      active = false;
      window.removeEventListener('online', retry);
      document.removeEventListener('visibilitychange', onVisible);
    };
  }

  async function retry(id) {
    const entry = await run('readonly', (store) => store.get(id));
    if (entry?.status === 'needs-attention') {
      await run('readwrite', (store) => store.put({ ...entry, status: 'queued' }));
    }
    return drain();
  }

  return { enqueue, list, drain, start, retry, remove: (id) => run('readwrite', (store) => store.delete(id)) };
}
