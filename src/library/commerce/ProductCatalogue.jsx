import React, { useMemo, useState } from 'react';
import { Card } from '../foundations/Card';

export function ProductCatalogue({ products = [], state = 'ready', onSelect = () => {}, onRetry }) {
  const [query, setQuery] = useState(''); const filtered = useMemo(() => products.filter((item) => `${item.name} ${item.category || ''}`.toLowerCase().includes(query.toLowerCase())), [products, query]);
  if (state === 'loading') return <div className="rounded-2xl border border-slate-800 p-8 text-center text-slate-400" aria-busy="true">Loading catalogue…</div>;
  if (state === 'error') return <Card title="Catalogue unavailable"><p>Products could not be loaded.</p>{onRetry && <button className="mt-4 rounded-lg bg-amber-500 px-3 py-2 text-sm font-semibold text-slate-950" onClick={onRetry}>Retry</button>}</Card>;
  if (state === 'empty' || filtered.length === 0) return <Card title="No products found"><p>Try another search or check back later.</p></Card>;
  return <section aria-label="Product catalogue"><div className="mb-4"><label className="text-xs font-semibold text-slate-400">Search products<input value={query} onChange={(event) => setQuery(event.target.value)} className="mt-1 w-full rounded-xl border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-white" /></label></div><div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{filtered.map((product) => <button key={product.id || product.name} type="button" onClick={() => onSelect(product)} className="text-left"><Card title={product.name} eyebrow={product.category}><p>{product.description}</p><strong className="mt-3 block text-amber-300">{product.price}</strong></Card></button>)}</div></section>;
}

export default ProductCatalogue;
