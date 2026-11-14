import React from 'react';
import { COMPONENT_REGISTRY } from '../../library/docs/registry';
import { componentGuidance } from '../componentGuidance';
import { routeHref } from '../navigation';

export default function MobileGuide() {
  return <section aria-labelledby="mobile-guide" className="mt-8 space-y-5 rounded-2xl border border-slate-800 bg-slate-900 p-4 sm:p-6">
    <h3 id="mobile-guide" className="text-xl font-semibold">Mobile navigation and offline use</h3>
    <div className="grid gap-4 lg:grid-cols-2">
      <div>
        <h4 className="font-semibold">Find and return to a component</h4>
        <p className="mt-1 text-sm leading-6 text-slate-300">Use Components to search or filter. Opening a result creates a shareable URL. Browser Back restores the list and returns focus to the result. Use arrow keys, Home or End to move between detail tabs. The documentation reading indicator appears on supporting browsers when reduced motion is off.</p>
      </div>
      <div>
        <h4 className="font-semibold">Keep references on your device</h4>
        <p className="mt-1 text-sm leading-6 text-slate-300">Open a component while connected and choose Save for offline. Saved offline holds the overview, props and source examples. Local previews work offline, and remote media previews explain when they need a connection. Removing a copy removes it from this device’s saved list. Clearing browser data also clears saved copies.</p>
      </div>
      <div>
        <h4 className="font-semibold">Integrate in React</h4>
        <p className="mt-1 text-sm leading-6 text-slate-300">Use ResponsiveNavigation in your shell with real route URLs. Pass activeHref so the selected destination exposes aria-current. Include the Sankofa styles and the library source in your Tailwind content paths. Give your main content a focus target and add clearance below fixed navigation. Use OfflineSaveButton for local saves and OfflineSyncStatus for an account-specific outbox.</p>
      </div>
      <div>
        <h4 className="font-semibold">Apply the pattern in Angular</h4>
        <p className="mt-1 text-sm leading-6 text-slate-300">Use RouterLink and RouterLinkActive with ariaCurrentWhenActive="page". Enable router scroll restoration and wait for data before restoring a long list. Keep the IndexedDB outbox in an injected service and start or stop retries with the signed-in account lifecycle.</p>
      </div>
    </div>
    <details className="rounded-xl border border-slate-700 p-3">
      <summary className="cursor-pointer py-2 font-semibold">Offline writes and server acknowledgement</summary>
      <p className="my-2 text-sm leading-6 text-slate-300">Start one outbox per account. Keep the same operation ID across retries and deduplicate it on the server. Resolve the adapter only after acknowledgement. Call the cleanup returned by start on sign-out. Use remove to discard local entries according to your app’s retention policy.</p>
      <pre className="sankofa-scroll-region rounded-lg bg-slate-950 p-3 text-xs" tabIndex={0}><code>{`const outbox = createOfflineOutbox({ scope: accountId, send: sendAndConfirm });
const stop = outbox.start({ onChange: renderQueue, onError: showError });
await outbox.enqueue(payload, stableOperationId);
await outbox.drain();
// Call stop() when leaving the account.`}</code></pre>
    </details>
    <details className="rounded-xl border border-slate-700 p-3">
      <summary className="cursor-pointer py-2 font-semibold">Component-by-component guidance</summary>
      <ul className="mt-2 divide-y divide-slate-700">
        {COMPONENT_REGISTRY.map((entry) => <li key={entry.id} className="py-3 text-sm">
          <a className="font-semibold text-amber-300 underline" href={routeHref({ view: 'library', component: entry.id, tab: 'explanation' })}>{entry.name}</a>
          <p className="mt-1 text-slate-300">{componentGuidance(entry).description}</p>
        </li>)}
      </ul>
    </details>
  </section>;
}
