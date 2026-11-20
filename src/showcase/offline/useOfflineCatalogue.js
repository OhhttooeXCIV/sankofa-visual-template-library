import { useEffect, useRef, useState, useSyncExternalStore } from 'react';
import { localTransaction, openLocalDatabase } from '../../library/offline/database.js';

const hasStorage = () => typeof indexedDB !== 'undefined';
const STORE = 'components';
const CACHE_PREFIX = 'sankofa-library:';
let workerReady;
let databasePromise;

function database() {
  databasePromise ??= openLocalDatabase('sankofa-library', [STORE]).catch((error) => {
    databasePromise = undefined;
    throw error;
  });
  return databasePromise;
}

function subscribeOnline(callback) {
  window.addEventListener('online', callback);
  window.addEventListener('offline', callback);
  return () => {
    window.removeEventListener('online', callback);
    window.removeEventListener('offline', callback);
  };
}

export function registerShowcaseWorker() {
  if (!import.meta.env.PROD || !('serviceWorker' in navigator)) return;
  workerReady = navigator.serviceWorker.register('./service-worker.js').then(async (registration) => {
    const worker = registration.active || registration.installing || registration.waiting;
    if (!worker) throw new Error('Offline shell unavailable');
    if (worker.state !== 'activated') {
      await new Promise((resolve, reject) => {
        function onState() {
          if (!['activated', 'redundant'].includes(worker.state)) return;
          worker.removeEventListener('statechange', onState);
          if (worker.state === 'activated') resolve();
          else reject(new Error('Offline shell could not be installed'));
        }
        worker.addEventListener('statechange', onState);
        onState();
      });
    }
    return registration;
  });
  workerReady.catch(() => {});
}

export function useOfflineCatalogue() {
  const online = useSyncExternalStore(subscribeOnline, () => navigator.onLine, () => true);
  const [saved, setSaved] = useState([]);
  const [status, setStatus] = useState('');
  const [busy, setBusy] = useState(false);
  const pending = useRef(false);

  useEffect(() => {
    if (!hasStorage()) return;
    let active = true;
    const refresh = () => database().then((db) => (
      localTransaction(db, STORE, 'readonly', (store) => store.getAll())
    )).then((entries) => {
      if (active) setSaved(entries);
    }).catch(() => {
      if (active) setStatus('Offline storage is unavailable on this device.');
    });
    const channel = typeof BroadcastChannel === 'function' ? new BroadcastChannel(CACHE_PREFIX + STORE) : null;
    channel?.addEventListener('message', refresh);
    refresh();
    return () => {
      active = false;
      channel?.close();
    };
  }, []);

  async function toggle(component) {
    if (pending.current) return;
    pending.current = true;
    setBusy(true);
    setStatus('');
    const removing = saved.some((entry) => entry.id === component.id);
    try {
      if (!removing) {
        if (!workerReady) throw new Error('Open the production build to save offline copies.');
        await workerReady;
      }
      const db = await database();
      if (removing) {
        await localTransaction(db, STORE, 'readwrite', (store) => store.delete(component.id));
        setSaved((entries) => entries.filter((entry) => entry.id !== component.id));
        setStatus('Offline copy removed.');
      } else {
        await localTransaction(db, STORE, 'readwrite', (store) => store.put(component));
        setSaved((entries) => [...entries.filter((entry) => entry.id !== component.id), component]);
        setStatus('Saved on this device.');
      }
      if (typeof BroadcastChannel === 'function') {
        const channel = new BroadcastChannel(CACHE_PREFIX + STORE);
        channel.postMessage('updated');
        channel.close();
      }
    } catch {
      setStatus(removing ? 'Could not remove the offline copy. Try again.' :
        'Could not save an offline copy. Check your connection and device storage, then try again.');
    } finally {
      pending.current = false;
      setBusy(false);
    }
  }

  return { online, saved, busy, status, toggle };
}
