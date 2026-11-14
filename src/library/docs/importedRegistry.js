const shared = {
  sourceProject: 'phekong-commerce-platform',
  adaptationNotes: 'Normalized from a source-project implementation to React 19 and Tailwind library tokens.',
  responsiveBehavior: 'Fluid layout with mobile-first stacking and desktop grid/navigation enhancements.',
  accessibility: 'Semantic elements, visible focus states, keyboard-operable controls, and live-region guidance where applicable.',
  dependencies: ['react', 'lucide-react'],
  previewControls: ['default', 'long content', 'empty/loading/error where applicable', 'mobile/desktop viewport'],
  knownLimitations: 'App-specific routing, APIs, authentication, and business data are intentionally excluded.',
};

const pascalCase = (value) => value.split(/[^a-zA-Z0-9]+/).filter(Boolean).map((part) => part[0].toUpperCase() + part.slice(1)).join('');

function exampleUsage(entry) {
  const component = entry.exportName || pascalCase(entry.name);
  const examples = {
    StatusBadge: '<StatusBadge status="success" tone="success" />',
    DataTableShell: `<DataTableShell
  columns={[{ key: 'name', label: 'Name' }, { key: 'status', label: 'Status' }]}
  rows={[{ id: 1, name: 'Example record', status: 'Ready' }]}
  selectable
/>`,
    WorkflowStepper: `<WorkflowStepper
  steps={[{ label: 'Draft' }, { label: 'Review' }, { label: 'Done' }]}
  current={1}
  onStepChange={(index) => console.log('step', index)}
/>`,
    ExportMenu: `<ExportMenu
  formats={['CSV', 'PDF']}
  onExport={(format) => console.log('export', format)}
/>`,
    InlineFeedback: `<InlineFeedback
  tone="success"
  title="Saved successfully"
  message="Your changes are ready for review."
/>`,
    Toast: `<Toast variant="success" message="Export complete" duration={4000} />`,
    Button: `<Button variant="primary" size="md" onClick={() => console.log('clicked')}>
  Save changes
</Button>`,
    Card: `<Card title="Project health" tone="surface">
  <p>All checks are passing.</p>
</Card>`,
    FeatureCard: `<FeatureCard
  title="Offline-ready"
  description="Keep the critical workflow usable when connectivity is limited."
  badge="Recommended"
/>`,
    SiteFooter: `<SiteFooter
  groups={[{ label: 'Resources', links: [{ label: 'Docs', href: '/docs' }] }]}
  legalLinks={[{ label: 'Privacy', href: '/privacy' }]}
/>`,
    CommandPalette: `<CommandPalette
  items={[{ label: 'Open dashboard', href: '/dashboard' }]}
  shortcut="k"
/>`,
    ActionFeedback: `<ActionFeedback state={{ status: 'success', message: 'Saved successfully' }} />`,
    CommerceRouteHero: `<CommerceRouteHero
  title="Build with reusable patterns"
  primaryAction={{ label: 'Get started', href: '/start' }}
  proofPoints={['Accessible', 'Responsive']}
/>`,
    ProductDetail: `<ProductDetail
  product={{ id: 'starter', name: 'Starter kit', price: 299, image: '/product.webp', inStock: true }}
  onAddToCart={(product) => console.log('add to cart', product.id)}
/>`,
    ApprovedImage: `<ApprovedImage
  src="/assets/example.webp"
  alt="Example product"
  fallbackLabel="Product image unavailable"
/>`,
    ExpandableSection: `<ExpandableSection title="Implementation notes" defaultOpen>
  <p>Keep product-specific data outside the component.</p>
</ExpandableSection>`,
    SingleOpenAccordion: `<SingleOpenAccordion
  items={[{ id: 'one', title: 'What does it solve?', content: 'It keeps progressive content accessible.' }]}
  openItemId="one"
  onOpenItemChange={(id) => console.log('open item', id)}
/>`,
    LearnerProgressRibbon: `<LearnerProgressRibbon
  label="Onboarding progress"
  items={[{ label: 'Understand', state: 'complete' }, { label: 'Compose', state: 'active' }, { label: 'Adapt', state: 'pending' }]}
/>`,
  };
  if (examples[component]) return examples[component];
  const required = (entry.props || []).filter((prop) => prop.required).map((prop) => `${prop.name}="Example value"`).join(' ');
  return `<${component} ${required}>\n  <p>Replace this content with your product data.</p>\n</${component}>`;
}

function buildExampleCode(entry) {
  const component = entry.exportName || pascalCase(entry.name);
  return `import React from 'react';
import { ${component} } from './library';

export default function Example() {
  return (
    ${exampleUsage(entry)}
  );
}`;
}

const make = (entry) => ({
  ...shared,
  ...entry,
  props: entry.props || [],
  config: entry.config || {},
  customization: entry.customization || [],
  testPath: `src/library/__tests__/${entry.id}.test.jsx`,
  exportCode: entry.exportCode || buildExampleCode(entry),
  mainJsxCode: entry.mainJsxCode || `import { ${entry.exportName || pascalCase(entry.name)} } from './library';

export default function App() {
  return (
    ${exampleUsage(entry)}
  );
}`,
});

export const IMPORTED_COMPONENT_DESCRIPTORS = [
  make({ id: 'status-badge', name: 'Status Badge', exportName: 'StatusBadge', category: 'Operations & Feedback', sourceProject: 'senatla-ops-internal-automation-solution', sourcePath: 'src/app/components/erp/erp-status-badge.component.ts', tagline: 'Semantic status pill with configurable success, info, warning, danger, and neutral tones.', props: [{ name: 'status', type: 'string', default: '-', required: true }, { name: 'tone', type: 'StatusTone', default: 'auto', required: false }], customization: ['Status-to-tone mapping', 'Indicator visibility', 'Token-based colors'], explanation: 'Generalized from Senatla’s ERP status badge so operational state can be communicated consistently in any product surface.' }),
  make({ id: 'data-table-shell', name: 'Data Table Shell', exportName: 'DataTableShell', category: 'Operations & Feedback', sourceProject: 'senatla-ops-internal-automation-solution', sourcePath: 'src/app/components/erp/erp-data-table.component.ts', tagline: 'Sortable, selectable data table shell with empty-state handling and render hooks.', props: [{ name: 'columns', type: 'Column[]', default: '[]', required: true }, { name: 'rows', type: 'Record[]', default: '[]', required: true }, { name: 'selectable', type: 'boolean', default: 'false', required: false }], customization: ['Column renderers', 'Row selection', 'Empty state copy'] }),
  make({ id: 'workflow-stepper', name: 'Workflow Stepper', exportName: 'WorkflowStepper', category: 'Navigation & Shell', sourceProject: 'senatla-ops-internal-automation-solution', sourcePath: 'src/app/components/erp/erp-workflow-stepper.component.ts', tagline: 'Clickable progress steps for onboarding, setup flows, and multi-stage forms.', props: [{ name: 'steps', type: 'Step[]', default: '[]', required: true }, { name: 'current', type: 'number', default: '0', required: false }, { name: 'onStepChange', type: 'Function(index)', default: 'noop', required: false }], customization: ['Completion state', 'Gated navigation', 'Step descriptions'] }),
  make({ id: 'export-menu', name: 'Export Menu', exportName: 'ExportMenu', category: 'Operations & Feedback', sourceProject: 'senatla-ops-internal-automation-solution', sourcePath: 'src/app/components/erp/erp-export-trigger.component.ts', tagline: 'Accessible export action group for CSV, PDF, XLSX, or custom formats.', props: [{ name: 'formats', type: 'string[]', default: "['CSV','PDF','XLSX']", required: false }, { name: 'busy', type: 'boolean', default: 'false', required: false }, { name: 'onExport', type: 'Function(format)', default: 'noop', required: false }], customization: ['Available formats', 'Busy state', 'Parent-owned export implementation'] }),
  make({ id: 'inline-feedback', name: 'Inline Feedback', exportName: 'InlineFeedback', category: 'Feedback & Overlays', sourceProject: 'senatla-ops-internal-automation-solution', sourcePath: 'src/app/components/ui-feedback.component.ts', tagline: 'Persistent inline status for forms, async actions, and validation outcomes.', props: [{ name: 'tone', type: "'info'|'success'|'warning'|'error'", default: "'info'", required: false }, { name: 'title', type: 'string', default: '-', required: true }, { name: 'message', type: 'string', default: 'undefined', required: false }], customization: ['Tone map', 'Live-region role', 'Message content'] }),
  make({ id: 'toast-notification-system', name: 'Toast Notification System', exportName: 'Toast', category: 'Feedback & Overlays', sourceProject: 'Umk_Commercial', sourcePath: 'web/src/components/common/HttpToastNotification.tsx + web/src/hooks/useHttpToasts.ts', tagline: 'Bounded, typed notifications with severity, dismissal, expiry, and request context.', props: [{ name: 'variant', type: "'success'|'error'|'warning'|'info'", default: "'info'", required: false }, { name: 'message', type: 'string', default: '-', required: true }, { name: 'duration', type: 'number', default: '4000', required: false }], customization: ['Maximum visible items', 'Auto-expiry policy', 'Status-code context'] }),
  make({ id: 'button', name: 'Button', exportName: 'Button', category: 'Foundations', sourcePath: 'src/components/ui/Button.tsx', tagline: 'Accessible action control with variants, sizes, loading, and disabled states.', props: [{ name: 'variant', type: "'primary'|'secondary'|'ghost'", default: "'primary'", required: false }, { name: 'size', type: "'sm'|'md'|'lg'", default: "'md'", required: false }, { name: 'loading', type: 'boolean', default: 'false', required: false }], customization: ['Variant and size tokens', 'Loading/disabled state labels'] }),
  make({ id: 'card', name: 'Card', exportName: 'Card', category: 'Foundations', sourcePath: 'src/components/ui/Card.tsx', tagline: 'Semantic article surface with eyebrow, title, body, footer, and tone.', props: [{ name: 'title', type: 'string', default: '-', required: true }, { name: 'tone', type: "'surface'|'accent'", default: "'surface'", required: false }], customization: ['Surface tone', 'Footer content', 'Additional className'] }),
  make({ id: 'feature-card', name: 'Feature Card', exportName: 'FeatureCard', category: 'Foundations', sourcePath: 'src/components/ui/FeatureCard.tsx', tagline: 'Compact feature/value proposition card with optional badge and icon.', props: [{ name: 'title', type: 'string', default: '-', required: true }, { name: 'description', type: 'string', default: '-', required: true }, { name: 'badge', type: 'string', default: 'undefined', required: false }], customization: ['Badge', 'Optional icon', 'Surface classes'] }),
  make({ id: 'site-footer', name: 'Site Footer', exportName: 'SiteFooter', category: 'Navigation & Shell', sourcePath: 'src/components/shell/SiteFooter.tsx', tagline: 'Responsive grouped navigation footer with configurable legal links.', props: [{ name: 'groups', type: 'Array<FooterGroup>', default: '[]', required: false }, { name: 'legalLinks', type: 'Array<Link>', default: '[]', required: false }], customization: ['Group labels and links', 'Legal footer manifest', 'Brand content'] }),
  make({ id: 'command-palette', name: 'Command Palette', exportName: 'CommandPalette', category: 'Navigation & Shell', sourceProject: 'Sankofa_Edu_Labs_Computer_Mastery', sourcePath: 'src/components/CommandPalette.tsx', tagline: 'Keyboard-triggered searchable action menu with Escape dismissal.', props: [{ name: 'items', type: 'Array<{label,href}>', default: '[]', required: true }, { name: 'shortcut', type: 'string', default: "'k'", required: false }], customization: ['Command item list', 'Keyboard shortcut', 'Placeholder text'] }),
  make({ id: 'action-feedback', name: 'Action Feedback', exportName: 'ActionFeedback', category: 'Feedback & Overlays', sourcePath: 'src/components/ui/ActionFeedback.tsx', tagline: 'Accessible status and alert feedback for loading, success, error, and blocked actions.', props: [{ name: 'state', type: 'FeedbackState|null', default: 'null', required: true }], customization: ['Feedback tone map', 'Message copy', 'Live-region semantics'] }),
  make({ id: 'commerce-route-hero', name: 'Commerce Route Hero', exportName: 'CommerceRouteHero', category: 'Commerce & Content', sourcePath: 'src/components/navigation/CommerceRouteHero.tsx', tagline: 'Responsive commerce route hero with proof points, actions, and visual slot.', props: [{ name: 'title', type: 'string', default: '-', required: true }, { name: 'primaryAction', type: 'LinkAction', default: '-', required: true }, { name: 'proofPoints', type: 'string[]', default: '[]', required: false }], customization: ['Hero tone', 'Proof points', 'Primary/secondary actions'] }),
  make({ id: 'product-detail', name: 'Product Detail', exportName: 'ProductDetail', category: 'Commerce & Content', sourcePath: 'src/components/products/ProductDetail.tsx', tagline: 'Product detail layout with stock semantics, price, image fallback, and add-to-cart feedback.', props: [{ name: 'product', type: 'Product', default: '-', required: true }, { name: 'onAddToCart', type: 'Function(product)', default: 'async noop', required: false }], customization: ['Availability rules', 'Cart callback', 'Image fallback'] }),
  make({ id: 'approved-image', name: 'Approved Image', exportName: 'ApprovedImage', category: 'Commerce & Content', sourcePath: 'src/components/media/ApprovedImage.tsx', tagline: 'Image wrapper with accessible fallback when source loading fails.', props: [{ name: 'src', type: 'string', default: '-', required: true }, { name: 'alt', type: 'string', default: "''", required: false }, { name: 'fallbackLabel', type: 'string', default: "'Image unavailable'", required: false }], customization: ['Fallback label', 'Aspect ratio classes', 'Alt text policy'] }),
  make({ id: 'expandable-section', name: 'Expandable Section', exportName: 'ExpandableSection', category: 'Learning & Interaction', sourceProject: 'Sankofa_Edu_Labs_Computer_Mastery', sourcePath: 'src/components/ExpandableSection.tsx', tagline: 'Native details disclosure for progressive content reveal.', props: [{ name: 'title', type: 'string', default: '-', required: true }, { name: 'defaultOpen', type: 'boolean', default: 'false', required: false }], customization: ['Summary copy', 'Open state', 'Content slot'] }),
  make({ id: 'single-open-accordion', name: 'Single Open Accordion', exportName: 'SingleOpenAccordion', category: 'Learning & Interaction', sourceProject: 'Sankofa_Edu_Labs_Computer_Mastery', sourcePath: 'src/components/SingleOpenAccordion.tsx', tagline: 'Controlled accessible accordion that keeps at most one item open.', props: [{ name: 'items', type: 'AccordionItem[]', default: '[]', required: true }, { name: 'openItemId', type: 'string|null', default: 'null', required: true }, { name: 'onOpenItemChange', type: 'Function(id|null)', default: '-', required: true }], customization: ['Item labels and content', 'Open-state styling', 'Panel transitions'] }),
  make({ id: 'learner-progress-ribbon', name: 'Learner Progress Ribbon', exportName: 'LearnerProgressRibbon', category: 'Learning & Interaction', sourceProject: 'Sankofa_Edu_Labs_Computer_Mastery', sourcePath: 'src/components/LearnerProgressRibbon.tsx', tagline: 'Responsive step progress indicator with pending, active, and completed states.', props: [{ name: 'items', type: 'ProgressItem[]', default: '[]', required: true }, { name: 'label', type: 'string', default: "'Progress'", required: false }], customization: ['Step labels', 'Progress states', 'Section label'] }),
];
