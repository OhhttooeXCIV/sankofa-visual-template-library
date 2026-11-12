import React from 'react';
import { describe, expect, it } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { ActionFeedback, Button, ExpandableSection, SingleOpenAccordion } from '../components';

describe('imported reusable components', () => {
  it('supports button loading and disabled semantics', () => {
    render(<Button loading>Save</Button>);
    expect(screen.getByRole('button')).toBeDisabled();
    expect(screen.getByRole('button')).toHaveAttribute('aria-busy', 'true');
    expect(screen.getByText('Loading…')).toBeInTheDocument();
  });

  it('renders feedback as an alert for blocked states', () => {
    render(<ActionFeedback state={{ tone: 'blocked', message: 'Not available' }} />);
    expect(screen.getByRole('alert')).toHaveTextContent('Not available');
  });

  it('supports native expandable content', () => {
    render(<ExpandableSection title="Details">Hidden content</ExpandableSection>);
    expect(screen.getByText('Hidden content')).toBeInTheDocument();
    expect(screen.getByRole('group')).not.toBeInTheDocument();
  });

  it('keeps one accordion panel open', () => {
    function Harness() {
      const [open, setOpen] = React.useState('one');
      return <SingleOpenAccordion openItemId={open} onOpenItemChange={setOpen} items={[{ id: 'one', label: 'One', content: 'One content' }, { id: 'two', label: 'Two', content: 'Two content' }]} />;
    }
    render(<Harness />);
    fireEvent.click(screen.getByText('Two'));
    expect(screen.queryByText('One content')).not.toBeInTheDocument();
    expect(screen.getByText('Two content')).toBeInTheDocument();
  });
});
