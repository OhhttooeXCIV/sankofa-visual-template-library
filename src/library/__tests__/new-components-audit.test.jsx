import React from 'react';
import { render } from '@testing-library/react';
import { expect, it } from 'vitest';
import { COMPONENT_REGISTRY } from '../docs/registry';
import LivePreviewContainer from '../../showcase/components/LivePreviewContainer';

it.each(COMPONENT_REGISTRY.map(({ id }) => [id]))('renders a live example for %s', (id) => {
  const { container } = render(<LivePreviewContainer componentId={id} />);
  expect(container.firstElementChild).toBeTruthy();
  expect(container).not.toHaveTextContent('Select a component from the sidebar');
});
