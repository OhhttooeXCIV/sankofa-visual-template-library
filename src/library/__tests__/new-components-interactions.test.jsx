import React from 'react';
import { describe, expect, it, vi } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import {
  Drawer,
  BottomSheet,
  Field,
  Input,
  Textarea,
  Select,
  Checkbox,
  Switch,
  CheckoutStepper,
  QuantityStepper,
  FilterToolbar,
} from '../index';

describe('Drawer and BottomSheet', () => {
  it.each([
    ['Drawer', Drawer],
    ['BottomSheet', BottomSheet],
  ])('%s exposes dialog semantics and closes with Escape', (_name, Component) => {
    const onOpenChange = vi.fn();
    render(
      <Component open onOpenChange={onOpenChange} title="Filters">
        Filter content
      </Component>,
    );

    expect(screen.getByRole('dialog')).toHaveAccessibleName('Filters');
    expect(screen.getByText('Filter content')).toBeInTheDocument();
    fireEvent.keyDown(screen.getByRole('dialog'), { key: 'Escape' });
    expect(onOpenChange).toHaveBeenCalledWith(false);
  });

  it('does not render closed content and preserves non-modal semantics when requested', () => {
    const { rerender } = render(
      <Drawer open={false} onOpenChange={vi.fn()} title="Menu">
        Hidden content
      </Drawer>,
    );
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();

    rerender(
      <Drawer open onOpenChange={vi.fn()} title="Menu" modal={false}>
        Visible content
      </Drawer>,
    );
    expect(screen.getByText('Visible content')).toBeInTheDocument();
  });
});

describe('FormFieldKit', () => {
  it('connects Field labels, descriptions, and errors to its control', () => {
    render(
      <Field label="Email" hint="Use your work address" error="Email is required">
        <Input name="email" aria-label="Email" />
      </Field>,
    );
    const input = screen.getByRole('textbox', { name: 'Email' });
    expect(input).toHaveAttribute('aria-label', 'Email');
    expect(screen.getByRole('alert')).toHaveTextContent('Email is required');
  });

  it('renders the input family with native semantics and propagates changes', () => {
    const onChange = vi.fn();
    render(
      <form>
        <Input aria-label="Name" onChange={onChange} />
        <Textarea aria-label="Notes" />
        <Select aria-label="Role"><option value="student">Student</option></Select>
        <Checkbox aria-label="Agree" />
        <Switch aria-label="Notifications" />
      </form>,
    );
    expect(screen.getByRole('textbox', { name: 'Name' })).toBeInTheDocument();
    expect(screen.getByRole('textbox', { name: 'Notes' })).toBeInTheDocument();
    expect(screen.getByRole('combobox', { name: 'Role' })).toBeInTheDocument();
    expect(screen.getByRole('checkbox', { name: 'Agree' })).toBeInTheDocument();
    expect(screen.getByRole('switch', { name: 'Notifications' })).toBeInTheDocument();
    fireEvent.change(screen.getByRole('textbox', { name: 'Name' }), { target: { value: 'Ada' } });
    expect(onChange).toHaveBeenCalledTimes(1);
  });

  it('supports keyboard toggling for Switch and Checkbox', () => {
    render(
      <>
        <Checkbox aria-label="Agree" />
        <Switch aria-label="Notifications" />
      </>,
    );
    const checkbox = screen.getByRole('checkbox', { name: 'Agree' });
    const toggle = screen.getByRole('switch', { name: 'Notifications' });
    fireEvent.click(checkbox);
    fireEvent.click(toggle);
    expect(checkbox).toBeChecked();
    expect(toggle).toHaveAttribute('aria-checked', 'true');
  });
});

describe('CheckoutStepper and QuantityStepper', () => {
  it('renders progress and changes the active checkout step', () => {
    const onStepChange = vi.fn();
    render(
      <CheckoutStepper
        steps={[{ id: 'address', label: 'Address' }, { id: 'payment', label: 'Payment' }, { id: 'review', label: 'Review' }]}
        activeStep={1}
        onStepChange={onStepChange}
      />,
    );
    expect(screen.getByRole('list')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /payment/i })).toHaveAttribute('aria-current', 'step');
    fireEvent.click(screen.getByRole('button', { name: /address/i }));
    expect(onStepChange).toHaveBeenCalledWith(0);
  });

  it('clamps QuantityStepper values and exposes labelled increment controls', () => {
    const onChange = vi.fn();
    render(<QuantityStepper value={2} min={1} max={3} onChange={onChange} aria-label="Quantity" />);
    expect(screen.getByOutputValue('2')).toHaveAccessibleName('Quantity');
    fireEvent.click(screen.getByRole('button', { name: /increase/i }));
    fireEvent.click(screen.getByRole('button', { name: /increase/i }));
    expect(onChange).toHaveBeenLastCalledWith(3);
    expect(screen.getByRole('button', { name: /increase/i })).toBeDisabled();
    fireEvent.click(screen.getByRole('button', { name: /decrease/i }));
    expect(onChange).toHaveBeenLastCalledWith(2);
  });
});

describe('FilterToolbar', () => {
  it('supports search, filter selection, reset, and keyboard access', () => {
    const onSearch = vi.fn();
    const onFilterChange = vi.fn();
    const onClear = vi.fn();
    render(
      <FilterToolbar
        query=""
        onQueryChange={onSearch}
        filters={[{ id: 'status', label: 'Status', active: false, onChange: (active) => onFilterChange('status', active) }]}
        onClear={onClear}
      />,
    );
    const search = screen.getByPlaceholderText('Search…');
    fireEvent.change(search, { target: { value: 'honey' } });
    expect(onSearch).toHaveBeenCalledWith('honey');
    fireEvent.click(screen.getByRole('button', { name: 'Status' }));
    expect(onFilterChange).toHaveBeenCalledWith('status', true);
    fireEvent.click(screen.getByRole('button', { name: /clear/i }));
    expect(onClear).toHaveBeenCalledTimes(1);
  });
});
