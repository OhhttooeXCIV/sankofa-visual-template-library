import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { expect, it, vi } from 'vitest';
import { CommandPalette, DataTableShell } from '../components';

it('opens the command palette by touch and exposes a labelled search', () => {
  render(<CommandPalette triggerLabel="Open commands" items={[{ label: 'Dashboard', href: '/dashboard' }]} />);
  fireEvent.click(screen.getByRole('button', { name: 'Open commands' }));
  expect(screen.getByRole('textbox', { name: 'Search commands' })).toHaveFocus();
  fireEvent.change(screen.getByRole('textbox'), { target: { value: 'missing' } });
  expect(screen.getByRole('status')).toHaveTextContent('No matching commands');
});

it('sorts by an accessible button and retains selection by row identity', () => {
  const select = vi.fn();
  render(<DataTableShell selectable onRowSelect={select} columns={[{ key: 'name', label: 'Name' }]}
    rows={[{ id: 1, name: 'Zulu' }, { id: 2, name: 'Alpha' }]} />);
  fireEvent.click(screen.getByRole('checkbox', { name: 'Select row 1' }));
  fireEvent.click(screen.getByRole('button', { name: 'Name' }));
  expect(screen.getByRole('columnheader', { name: 'Name' })).toHaveAttribute('aria-sort', 'ascending');
  expect(screen.getByRole('checkbox', { name: 'Select row 2' })).toBeChecked();
  expect(select).toHaveBeenCalledOnce();
});
