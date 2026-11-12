import React, { useState } from 'react';
import { Button, Card, FeatureCard, SiteFooter, CommandPalette, ActionFeedback, CommerceRouteHero, ProductDetail, ApprovedImage, ExpandableSection, SingleOpenAccordion, LearnerProgressRibbon, DataTableShell, StatusBadge, WorkflowStepper, ExportMenu, InlineFeedback } from '../../library/components';

const products = [{ id: 'one', name: 'Sunflower Creamed Honey', category: 'Commerce', price: 'R120', description: 'A reusable product detail example.', stock: 4 }];

export default function ImportedComponentPreview({ componentId }) {
  const [openItemId, setOpenItemId] = useState('one');
  const [feedback, setFeedback] = useState({ tone: 'success', message: 'Preview state is ready.' });
  const [buttonLoading, setButtonLoading] = useState(false);
  const triggerLoading = () => { setButtonLoading(true); setFeedback({ tone: 'loading', message: 'Processing the configured action…' }); setTimeout(() => { setButtonLoading(false); setFeedback({ tone: 'success', message: 'Action completed.' }); }, 700); };
  switch (componentId) {
    case 'button': return <div className="flex flex-wrap gap-3"><Button onClick={triggerLoading} loading={buttonLoading}>Primary action</Button><Button variant="secondary">Secondary</Button><Button variant="ghost">Ghost</Button><ActionFeedback state={feedback} /></div>;
    case 'card': return <Card eyebrow="Foundation" title="Configurable card" footer={<Button size="sm">Card action</Button>}>Pass children, tone, title, eyebrow, and footer content as parameters.</Card>;
    case 'feature-card': return <div className="grid gap-4 sm:grid-cols-2"><FeatureCard badge="Reusable" title="Feature card" description="A compact value proposition with optional icon and custom surface classes." /><FeatureCard badge="Responsive" title="Tailwind tokens" description="The component adapts to the library’s mobile-first layout system." /></div>;
    case 'site-footer': return <SiteFooter brand="Preview project" groups={[{ label: 'Explore', links: [{ label: 'Home', href: '#' }, { label: 'Components', href: '#' }] }]} legalLinks={[{ label: 'Privacy', href: '#' }, { label: 'Terms', href: '#' }]} />;
    case 'command-palette': return <div className="space-y-4"><p className="text-sm text-slate-400">Press Ctrl/⌘ + K to open the configurable command palette.</p><CommandPalette items={[{ label: 'Open dashboard', href: '#' }, { label: 'View settings', href: '#' }, { label: 'Review reports', href: '#' }]} /></div>;
    case 'action-feedback': return <div className="space-y-3"><ActionFeedback state={feedback} /><div className="flex flex-wrap gap-2"><Button size="sm" onClick={() => setFeedback({ tone: 'success', message: 'Saved successfully.' })}>Success</Button><Button size="sm" variant="secondary" onClick={() => setFeedback({ tone: 'blocked', message: 'This action is blocked.' })}>Blocked</Button><Button size="sm" variant="ghost" onClick={() => setFeedback({ tone: 'error', message: 'Something went wrong.' })}>Error</Button></div></div>;
    case 'commerce-route-hero': return <CommerceRouteHero pageLabel="Products" eyebrow="Curated commerce" title="A clearer route to the right product." description="Responsive route hero with proof points, actions, and a configurable visual slot." primaryAction={{ label: 'Browse products', href: '#' }} secondaryAction={{ label: 'Learn more', href: '#' }} proofPoints={['Responsive', 'Accessible', 'Configurable']} visualTitle="Visual slot" />;
    case 'product-detail': return <ProductDetail product={products[0]} onAddToCart={async () => setFeedback({ tone: 'success', message: 'Product added to cart.' })} />;
    case 'approved-image': return <div className="grid gap-4 sm:grid-cols-2"><ApprovedImage src="https://images.unsplash.com/photo-1587049352846-4a222e784d38?auto=format&fit=crop&w=600&q=80" alt="Honey jar" className="h-48 w-full rounded-2xl object-cover" /><ApprovedImage src="/missing-image.jpg" alt="Fallback example" className="h-48 w-full" /></div>;
    case 'expandable-section': return <ExpandableSection title="Expandable content" description="Native disclosure with a configurable initial state." defaultOpen>Children render only while the section is open.</ExpandableSection>;
    case 'single-open-accordion': return <SingleOpenAccordion openItemId={openItemId} onOpenItemChange={setOpenItemId} items={[{ id: 'one', label: 'First item', content: 'Only one panel is open at a time.' }, { id: 'two', label: 'Second item', content: 'Controlled state makes this easy to integrate with external routing or analytics.' }]} />;
    case 'learner-progress-ribbon': return <LearnerProgressRibbon items={[{ label: 'Start', state: 'completed' }, { label: 'Practice', state: 'active' }, { label: 'Review', state: 'pending' }, { label: 'Complete', state: 'pending' }]} />;
    case 'status-badge': return <div className="flex flex-wrap gap-3"><StatusBadge status="success" /><StatusBadge status="in progress" tone="info" /><StatusBadge status="Needs review" tone="warning" /><StatusBadge status="Blocked" /></div>;
    case 'data-table-shell': return <DataTableShell columns={[{ key: 'name', label: 'Name' }, { key: 'state', label: 'State' }, { key: 'owner', label: 'Owner' }]} rows={[{ id: 1, name: 'Registration', state: 'Ready', owner: 'Amina' }, { id: 2, name: 'Review queue', state: 'In progress', owner: 'Thabo' }]} />;
    case 'workflow-stepper': return <WorkflowStepper current={1} steps={[{ label: 'Discover', description: 'Define the need' }, { label: 'Build', description: 'Compose the surface' }, { label: 'Ship', description: 'Verify and release' }]} />;
    case 'export-menu': return <ExportMenu onExport={(format) => setFeedback({ tone: 'success', message: `${format} export requested.` })} />;
    case 'inline-feedback': return <div className="space-y-3"><InlineFeedback tone="success" title="Changes saved" message="This persistent status can remain beside the action that caused it." /><InlineFeedback tone="warning" title="Review needed" message="Use an inline message when the user needs context before continuing." /></div>;
    case 'toast-notification-system': return <div className="space-y-3"><ActionFeedback state={feedback} /><Button size="sm" onClick={() => setFeedback({ tone: 'success', message: 'A bounded toast was queued.' })}>Trigger notification</Button></div>;
    default: return null;
  }
}
