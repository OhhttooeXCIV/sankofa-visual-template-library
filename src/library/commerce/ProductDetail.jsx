import React, { useState } from 'react';
import { Button } from '../foundations/Button';
import { ActionFeedback } from '../feedback/ActionFeedback';

export function ProductDetail({ product, onAddToCart = async () => {} }) {
  const [busy, setBusy] = useState(false); const [feedback, setFeedback] = useState(null); const unavailable = product.stock === 0 || product.available === false;
  const add = async () => { if (unavailable) return setFeedback({ tone: 'blocked', message: 'This product is currently unavailable.' }); setBusy(true); setFeedback({ tone: 'loading', message: 'Adding to cart…' }); try { await onAddToCart(product); setFeedback({ tone: 'success', message: `${product.name} added to cart.` }); } catch { setFeedback({ tone: 'error', message: 'Could not add this product.' }); } finally { setBusy(false); } };
  return <article className="grid gap-6 rounded-3xl border border-slate-800 bg-slate-900/60 p-5 sm:p-8 md:grid-cols-2"><div className="flex min-h-64 items-center justify-center rounded-2xl bg-slate-950 p-5">{product.image ? <img src={product.image} alt={product.name} className="max-h-64 w-full object-contain" /> : <span className="text-sm text-slate-500">Image unavailable</span>}</div><div><p className="text-xs uppercase tracking-widest text-amber-400">{product.category || 'Product detail'}</p><h2 className="mt-2 text-3xl font-serif font-bold text-white">{product.name}</h2><p className="mt-4 text-slate-300">{product.description}</p><p className="mt-5 text-2xl font-semibold text-amber-300">{product.price}</p><Button className="mt-6" loading={busy} disabled={unavailable} onClick={add}>{unavailable ? 'Unavailable' : 'Add to cart'}</Button><ActionFeedback state={feedback} /></div></article>;
}

export default ProductDetail;
