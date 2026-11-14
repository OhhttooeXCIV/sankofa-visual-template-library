import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { expect, it } from 'vitest';
import { ProductCatalogue } from '../components';

it('lets a shopper recover from a search with no results', () => {
  render(<ProductCatalogue products={[{ id: 'honey', name: 'Raw honey' }]} />);
  const search = screen.getByRole('textbox', { name: 'Search products' });
  fireEvent.change(search, { target: { value: 'missing' } });
  expect(screen.getByRole('status')).toHaveTextContent('No products match');
  expect(search).toBeInTheDocument();
  fireEvent.change(search, { target: { value: '' } });
  expect(screen.getByRole('button', { name: 'Raw honey' })).toBeInTheDocument();
});
