/**
 * Sankofa Visual Template Library - Comprehensive Registry
 * Contains live demo props, documentation, usage guides, use cases,
 * other customization options, and zero-friction export code with main.jsx integration.
 */

export const COMPONENT_REGISTRY = [
  {
    id: 'breadcrumbs',
    name: 'Breadcrumbs Navigation',
    category: 'Navigation',
    tagline: 'Accessible hierarchical breadcrumb trail with multiple separators and mobile truncation.',
    explanation: 'Breadcrumbs provides an accessible navigational trail conforming to WAI-ARIA breadcrumb patterns. It allows users to track their location within a hierarchical site structure, with built-in support for multiple separator styles (chevron, slash, bullet), home icon toggling, and overflow truncation on compact viewports.',
    usage: 'Pass an array of items with `label` and optional `href` or custom `icon`. Use the `onNavigate` callback to intercept clicks for client-side routers (React Router, Next.js, or custom hash navigators).',
    useCases: [
      'Multi-level E-commerce category browsing (e.g., Home > Artisanal Pantry > Raw Honeys > Sunflower Creamed).',
      'Documentation hubs and developer knowledge portals.',
      'SaaS dashboard deep nested entity navigation (e.g., Accounts > Subscriptions > Invoices).',
      'Multi-step onboarding wizards and checkout pipelines.'
    ],
    otherOptions: [
      'Change separator style via `separator="chevron" | "slash" | "bullet"`.',
      'Toggle home icon with `showHomeIcon={true | false}`.',
      'Pass custom icons per item object.',
      'Custom styling via `className` prop.'
    ],
    props: [
      { name: 'items', type: 'Array<{ label, href?, icon? }>', default: '[]', required: true, description: 'Hierarchical item list' },
      { name: 'separator', type: "'chevron' | 'slash' | 'bullet'", default: "'chevron'", required: false, description: 'Separator icon/symbol' },
      { name: 'showHomeIcon', type: 'boolean', default: 'true', required: false, description: 'Display home icon on first item' },
      { name: 'onNavigate', type: 'Function(item)', default: 'undefined', required: false, description: 'Intercept link clicks' },
      { name: 'className', type: 'string', default: "''", required: false, description: 'Custom CSS classes' },
    ],
    exportCode: `import React from 'react';
import { Breadcrumbs } from './components/Breadcrumbs';

export default function App() {
  const trail = [
    { label: 'Storefront', href: '/' },
    { label: 'Harvest 2026', href: '/harvest' },
    { label: 'Raw Creamed Honey', href: '/products/creamed' },
  ];

  return (
    <div className="p-8 bg-slate-950 min-h-screen text-slate-100">
      <Breadcrumbs
        items={trail}
        separator="chevron"
        onNavigate={(item) => console.log('Navigating to:', item.href)}
      />
    </div>
  );
}`,
    mainJsxCode: `import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);`,
  },
  {
    id: 'container',
    name: 'Fluid Layout Container',
    category: 'Layout',
    tagline: 'Polymorphic wrapper providing responsive horizontal boundaries and fluid gutters.',
    explanation: 'Container enforces horizontal layout discipline across responsive breakpoints. It supports polymorphic rendering via the `as` prop (e.g., rendering as `<main>`, `<article>`, or `<div>`) and standardizes max-width constraints from narrow reading columns (`sm`) to expansive modern dashboard viewports (`7xl` and `full`).',
    usage: 'Wrap page sections, content blocks, or navbars with `<Container size="7xl">`. Set `gutter={false}` when nesting inside another container or when edge-to-edge bleed is required on mobile.',
    useCases: [
      'Standardizing horizontal margins across hero, feature, and footer sections.',
      'Constraining long-form editorial articles to readable line lengths (`size="md"` or `size="lg"`).',
      'Wide-aspect dashboard grids (`size="2xl"`).',
      'Full-bleed carousel wrappers (`size="full"`).'
    ],
    otherOptions: [
      'Polymorphic element rendering (`as="div" | "section" | "main" | "article"`).',
      'Preset width constraints (`size="sm" | "md" | "lg" | "xl" | "2xl" | "7xl" | "full"`).',
      'Toggle responsive padding gutters with `gutter={true | false}`.'
    ],
    props: [
      { name: 'as', type: 'string', default: "'div'", required: false, description: 'Semantic HTML tag to render' },
      { name: 'size', type: "'sm'|'md'|'lg'|'xl'|'2xl'|'7xl'|'full'", default: "'7xl'", required: false, description: 'Max-width preset' },
      { name: 'gutter', type: 'boolean', default: 'true', required: false, description: 'Apply responsive padding' },
      { name: 'className', type: 'string', default: "''", required: false, description: 'Additional CSS classes' },
    ],
    exportCode: `import React from 'react';
import { Container } from './components/Container';

export default function App() {
  return (
    <Container size="7xl" className="py-12 bg-slate-900 text-white rounded-xl">
      <h1 className="text-3xl font-serif">Sovereign Heritage</h1>
      <p className="mt-2 text-slate-400">Centered content bounded by responsive gutters.</p>
    </Container>
  );
}`,
    mainJsxCode: `import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);`,
  },
  {
    id: 'section',
    name: 'Semantic Section',
    category: 'Layout',
    tagline: 'Vertical rhythm manager with surface theme presets, dividers, and container nesting.',
    explanation: 'Section provides consistent vertical rhythm and semantic structure for landing pages and marketing websites. It offers 5 visual surface presets (transparent, surface, subtle, accent, contrast) and automatically embeds responsive Container boundaries by default.',
    usage: 'Use `<Section variant="accent" spacing="lg">` as the root element for every major block of a landing page (e.g. Hero, Features, Testimonials).',
    useCases: [
      'Landing page sectioning with alternating light/dark or subtle surface backgrounds.',
      'Hero spotlight sections using the `accent` gradient preset.',
      'High-contrast testimonial or CTA bands with `variant="contrast"`.',
      'Clean content dividers using `topDivider` and `bottomDivider`.'
    ],
    otherOptions: [
      'Vertical spacing presets (`spacing="none" | "sm" | "md" | "lg" | "xl"`).',
      'Surface styling (`variant="transparent" | "surface" | "subtle" | "accent" | "contrast"`).',
      'Automatic Container embedding (`withContainer={true | false}`).',
      'Top and bottom divider borders (`topDivider={true}`, `bottomDivider={true}`).'
    ],
    props: [
      { name: 'spacing', type: "'none'|'sm'|'md'|'lg'|'xl'", default: "'lg'", required: false, description: 'Vertical padding preset' },
      { name: 'variant', type: "'transparent'|'surface'|'subtle'|'accent'|'contrast'", default: "'transparent'", required: false, description: 'Background surface theme' },
      { name: 'withContainer', type: 'boolean', default: 'true', required: false, description: 'Automatically wrap children in Container' },
      { name: 'topDivider', type: 'boolean', default: 'false', required: false, description: 'Add top border divider' },
      { name: 'bottomDivider', type: 'boolean', default: 'false', required: false, description: 'Add bottom border divider' },
    ],
    exportCode: `import React from 'react';
import { Section } from './components/Section';

export default function App() {
  return (
    <Section variant="accent" spacing="xl" topDivider bottomDivider>
      <div className="text-center">
        <h2 className="text-4xl font-serif text-white">Ethical Terroir Harvesting</h2>
        <p className="mt-4 text-slate-400 max-w-xl mx-auto">
          Every harvest is verified through DFS194 lab testing and bottled raw.
        </p>
      </div>
    </Section>
  );
}`,
    mainJsxCode: `import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);`,
  },
  {
    id: 'product-card',
    name: 'E-Commerce Product Card',
    category: 'Commerce',
    tagline: 'High-conversion product card with image zoom, ratings, badge ribbons, and stock indicators.',
    explanation: 'ProductCard encapsulates modern luxury e-commerce requirements: subtle hover image zooms, custom badges (e.g. Best Seller, Raw, New), star ratings, currency localization, stock depletion overlays, and quick add-to-cart actions designed to maximize click-throughs.',
    usage: 'Render in a responsive CSS grid (`grid-cols-1 sm:grid-cols-2 lg:grid-cols-4`). Bind `onAddToCart` and `onViewDetails` to update cart state or open a detail drawer.',
    useCases: [
      'Artisanal and luxury food storefronts.',
      'Boutique cosmetic, skincare, and organic goods catalogs.',
      'Direct-to-consumer lifestyle merchandise showcases.',
      'Featured items carousels on homepage landings.'
    ],
    otherOptions: [
      'Configurable currency symbol (`currency="R"` or `"$"`, `"€"`).',
      'Optional strikethrough discount price with `originalPrice`.',
      'Sold-out state toggle with `inStock={false}`.',
      'Custom tag ribbon with `badge="Single Origin"`.'
    ],
    props: [
      { name: 'name', type: 'string', default: '-', required: true, description: 'Product title' },
      { name: 'price', type: 'number', default: '-', required: true, description: 'Current sale price' },
      { name: 'image', type: 'string', default: '-', required: true, description: 'Product image URL' },
      { name: 'subtitle', type: 'string', default: "''", required: false, description: 'Category or origin label' },
      { name: 'originalPrice', type: 'number', default: 'undefined', required: false, description: 'Discount strikethrough price' },
      { name: 'rating', type: 'number', default: '5', required: false, description: 'Star score (1 to 5)' },
      { name: 'reviewCount', type: 'number', default: '0', required: false, description: 'Total review count' },
      { name: 'badge', type: 'string', default: 'undefined', required: false, description: 'Promotional badge text' },
      { name: 'inStock', type: 'boolean', default: 'true', required: false, description: 'Stock availability' },
      { name: 'onAddToCart', type: 'Function(id)', default: 'undefined', required: false, description: 'Add to cart callback' },
    ],
    exportCode: `import React from 'react';
import { ProductCard } from './components/ProductCard';

export default function App() {
  return (
    <div className="max-w-sm mx-auto p-6 bg-slate-950">
      <ProductCard
        id="creamed-375"
        name="Sunflower Creamed Honey (375g)"
        subtitle="Free State Escarpment"
        price={120}
        originalPrice={140}
        currency="R"
        rating={5}
        reviewCount={42}
        badge="Best Seller"
        image="https://images.unsplash.com/photo-1587049352846-4a222e784d38?auto=format&fit=crop&w=600&q=80"
        onAddToCart={(id) => alert('Added ' + id + ' to cart!')}
      />
    </div>
  );
}`,
    mainJsxCode: `import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);`,
  },
  {
    id: 'modal',
    name: 'Accessible Dialog Modal',
    category: 'Overlays & Modals',
    tagline: 'Accessible dialog overlay with backdrop blur, focus management, and keyboard dismissal.',
    explanation: 'Modal provides a fully accessible dialog window following ARIA modal dialog practices. It automatically locks document body scrolling to prevent background bounce, handles the Escape key, dismisses on backdrop clicks, and provides slotted header, body, and footer areas.',
    usage: 'Manage `isOpen` state in your parent component. Pass `onClose` to handle dismissal, and place interactive confirmation actions in the `footer` slot.',
    useCases: [
      'E-commerce quick-view product drawers and Certificate of Analysis inspections.',
      'Confirmation dialogs (e.g. Empty Cart, Delete Account, Submit Order).',
      'Authentication login and signup forms.',
      'Detailed educational glossaries and regulatory breakdown cards.'
    ],
    otherOptions: [
      'Size presets (`size="sm" | "md" | "lg" | "xl" | "2xl" | "full"`).',
      'Optional header title and subtitle description.',
      'Custom action buttons via `footer` slot.',
      'Backdrop click dismiss toggle via `closeOnBackdrop={true | false}`.'
    ],
    props: [
      { name: 'isOpen', type: 'boolean', default: 'false', required: true, description: 'Modal open/closed state' },
      { name: 'onClose', type: 'Function()', default: '-', required: true, description: 'Dismiss callback' },
      { name: 'title', type: 'string', default: 'undefined', required: false, description: 'Dialog heading' },
      { name: 'description', type: 'string', default: 'undefined', required: false, description: 'Dialog subtitle' },
      { name: 'size', type: "'sm'|'md'|'lg'|'xl'|'2xl'|'full'", default: "'lg'", required: false, description: 'Width constraint preset' },
      { name: 'footer', type: 'ReactNode', default: 'undefined', required: false, description: 'Footer button actions' },
    ],
    exportCode: `import React, { useState } from 'react';
import { Modal } from './components/Modal';

export default function App() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="p-12 bg-slate-950 text-white min-h-screen text-center">
      <button
        onClick={() => setIsOpen(true)}
        className="px-6 py-3 rounded-xl bg-amber-500 text-slate-950 font-bold"
      >
        Inspect DFS194 Certificate
      </button>

      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="DFS194 Regulatory Standard"
        description="Provincial Beekeeping Certification & Terroir Verification"
        footer={
          <button
            onClick={() => setIsOpen(false)}
            className="px-4 py-2 bg-slate-800 text-white rounded-lg text-sm"
          >
            Acknowledge & Close
          </button>
        }
      >
        <p className="text-sm text-slate-300 leading-relaxed">
          DFS194 certification guarantees that no industrial sugar adulteration, high-heat pasteurization,
          or antibiotic chemical treatment occurred during harvesting.
        </p>
      </Modal>
    </div>
  );
}`,
    mainJsxCode: `import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);`,
  },
  {
    id: 'image-modal',
    name: 'Image Lightbox Modal',
    category: 'Overlays & Modals',
    tagline: 'High-resolution image lightbox viewer with zoom controls and caption pill.',
    explanation: 'ImageModal renders a distraction-free media viewer for photography, product details, and laboratory certificates. It includes zoom in/out toggling, escape key listener, backdrop dismissal, and caption pills.',
    usage: 'Trigger when a user clicks on harvest photography, product gallery thumbnails, or proof certificates.',
    useCases: [
      'Artisanal harvest photo galleries and terroir origin documentation.',
      'Product zoom inspections showing raw honeycomb texture and crystallization.',
      'High-res Certificate of Analysis and laboratory result inspections.',
      'Portfolio image showcases and case study galleries.'
    ],
    otherOptions: [
      'Zoom toggle with automatic cursor affordance (`cursor-zoom-in` / `cursor-zoom-out`).',
      'Category badge pill displayed above or beside the caption.',
      'Custom caption and attribution copy.'
    ],
    props: [
      { name: 'isOpen', type: 'boolean', default: 'false', required: true, description: 'Visibility state' },
      { name: 'onClose', type: 'Function()', default: '-', required: true, description: 'Dismiss callback' },
      { name: 'src', type: 'string', default: '-', required: true, description: 'High-res image URL' },
      { name: 'alt', type: 'string', default: "'Image preview'", required: false, description: 'Accessible description' },
      { name: 'caption', type: 'string', default: 'undefined', required: false, description: 'Caption text' },
      { name: 'category', type: 'string', default: 'undefined', required: false, description: 'Category pill' },
    ],
    exportCode: `import React, { useState } from 'react';
import { ImageModal } from './components/ImageModal';

export default function App() {
  const [open, setOpen] = useState(false);

  return (
    <div className="p-8 bg-slate-950 text-white">
      <img
        src="https://images.unsplash.com/photo-1587049352846-4a222e784d38?auto=format&fit=crop&w=400&q=80"
        alt="Raw Honey"
        onClick={() => setOpen(true)}
        className="w-48 rounded-xl cursor-pointer hover:opacity-80 transition"
      />
      <ImageModal
        isOpen={open}
        onClose={() => setOpen(false)}
        src="https://images.unsplash.com/photo-1587049352846-4a222e784d38?auto=format&fit=crop&w=1200&q=80"
        caption="Free State Mountain Apiary, Harvest 2026"
        category="Terroir"
      />
    </div>
  );
}`,
    mainJsxCode: `import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);`,
  },
  {
    id: 'video-modal',
    name: 'Video Player Modal',
    category: 'Overlays & Modals',
    tagline: 'Aspect-ratio locked video modal supporting YouTube, Vimeo, and direct MP4/WebM.',
    explanation: 'VideoModal displays video content in an accessible dialog without layout shift. It auto-detects third-party embed URLs (YouTube/Vimeo) vs direct MP4/WebM files, enforces correct aspect ratios (16:9, 9:16, 4:3, 1:1), and automatically stops playback when closed.',
    usage: 'Place on landing pages triggered by "Watch Brand Story" or "Meet the Founder" play buttons.',
    useCases: [
      'Brand documentary and founder origin videos.',
      'Step-by-step culinary recipe and cooking technique tutorials.',
      'Vertical TikTok/Reels format customer testimonial reels (`aspectRatio="9:16"`).',
      'Product unboxing and packaging reveals.'
    ],
    otherOptions: [
      'Aspect ratio presets (`16:9`, `9:16`, `4:3`, `1:1`).',
      'Accessible title label for screen readers.',
      'Esc key dismissal and backdrop click support.'
    ],
    props: [
      { name: 'isOpen', type: 'boolean', default: 'false', required: true, description: 'Active state' },
      { name: 'onClose', type: 'Function()', default: '-', required: true, description: 'Close callback' },
      { name: 'videoUrl', type: 'string', default: '-', required: true, description: 'YouTube/Vimeo or MP4 URL' },
      { name: 'title', type: 'string', default: "'Video Player'", required: false, description: 'Accessible label' },
      { name: 'aspectRatio', type: "'16:9'|'9:16'|'4:3'|'1:1'", default: "'16:9'", required: false, description: 'Aspect ratio constraint' },
    ],
    exportCode: `import React, { useState } from 'react';
import { VideoModal } from './components/VideoModal';

export default function App() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="p-8 bg-slate-950 text-white text-center">
      <button
        onClick={() => setIsOpen(true)}
        className="px-6 py-3 bg-amber-500 text-slate-950 font-bold rounded-xl"
      >
        Watch Apiary Harvest Video
      </button>

      <VideoModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        videoUrl="https://www.youtube.com/embed/dQw4w9WgXcQ"
        title="Artisanal Honey Harvest Film"
      />
    </div>
  );
}`,
    mainJsxCode: `import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);`,
  },
  {
    id: 'toast',
    name: 'Notification Toast',
    category: 'Overlays & Modals',
    tagline: 'Floating feedback notification with countdown timer, 4 status variants, and action buttons.',
    explanation: 'Toast provides instant, non-blocking feedback for asynchronous actions. It features 4 semantic status variants (success, error, warning, info), an animated countdown progress bar, an optional action button, and an accessible ARIA status role.',
    usage: 'Render dynamically via a ToastContext or directly when an action finishes (e.g., "Copied to clipboard", "Added to Cart").',
    useCases: [
      'Order addition feedback ("Added 1x Creamed Honey to Cart").',
      'Clipboard copy confirmation ("Export code copied to clipboard").',
      'Network failure or offline warning indicators.',
      'Form submission status confirmations.'
    ],
    otherOptions: [
      '4 status themes (`variant="success" | "error" | "warning" | "info"`).',
      'Configurable duration (`duration={4000}` or `0` for persistent).',
      'Interactive action CTA (`action={{ label: "Undo", onClick: () => {} }}`).'
    ],
    props: [
      { name: 'id', type: 'string', default: '-', required: true, description: 'Unique identifier' },
      { name: 'title', type: 'string', default: '-', required: true, description: 'Notification heading' },
      { name: 'message', type: 'string', default: 'undefined', required: false, description: 'Detailed message' },
      { name: 'variant', type: "'success'|'error'|'warning'|'info'", default: "'info'", required: false, description: 'Color/icon theme' },
      { name: 'duration', type: 'number', default: '4000', required: false, description: 'Auto-dismiss delay (ms)' },
      { name: 'action', type: '{ label, onClick }', default: 'undefined', required: false, description: 'Action button' },
    ],
    exportCode: `import React, { useState } from 'react';
import { Toast } from './components/Toast';

export default function App() {
  const [showToast, setShowToast] = useState(true);

  return (
    <div className="p-8 bg-slate-950 min-h-screen text-white">
      {showToast && (
        <Toast
          id="cart-toast"
          variant="success"
          title="Item Added to Cart"
          message="Sunflower Creamed Honey (375g) has been added."
          duration={4000}
          onClose={() => setShowToast(false)}
          action={{
            label: 'View Cart',
            onClick: () => console.log('Opening cart...'),
          }}
        />
      )}
    </div>
  );
}`,
    mainJsxCode: `import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);`,
  },
  {
    id: 'impact-tracker',
    name: 'Impact & KPI Tracker',
    category: 'Data & Proof',
    tagline: 'Metric stats showcase with animated icons, growth trends, and responsive columns.',
    explanation: 'ImpactTracker visualizes ESG milestones, community impact statistics, and business achievements. Each card features an icon badge, an emphatic statistic value, growth trend pills, and explanatory descriptions.',
    usage: 'Place on "About Us", "Sustainability", or homepage credibility sections to establish empirical authority.',
    useCases: [
      'ESG and sustainability impact reporting (e.g. Hives Protected, CO2 Offset).',
      'Company growth metrics and milestone counters for investors or partners.',
      'Customer satisfaction figures (e.g. 99.4% On-Time Delivery, 10,000+ Jars Delivered).',
      'Agricultural and fair-trade cooperative metrics.'
    ],
    otherOptions: [
      'Desktop column count (`columns={2 | 3 | 4}`).',
      'Custom icons per stat metric item.',
      'Trend change pills (`change="+18% YoY"`).',
      'Configurable section title and subtitle.'
    ],
    props: [
      { name: 'stats', type: 'Array<{ label, value, change?, icon?, description? }>', default: '[]', required: false, description: 'Metric items' },
      { name: 'title', type: 'string', default: "'Our Measurable Impact'", required: false, description: 'Section title' },
      { name: 'subtitle', type: 'string', default: "'Stewardship & Proof'", required: false, description: 'Subtitle pill' },
      { name: 'columns', type: '2 | 3 | 4', default: '4', required: false, description: 'Grid columns' },
    ],
    exportCode: `import React from 'react';
import { ImpactTracker } from './components/ImpactTracker';

export default function App() {
  return (
    <div className="p-8 bg-slate-950">
      <ImpactTracker
        title="Sovereign Stewardship in Numbers"
        subtitle="Verification & Trust"
        columns={4}
      />
    </div>
  );
}`,
    mainJsxCode: `import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);`,
  },
  {
    id: 'founder-story',
    name: 'Editorial Founder Story',
    category: 'Editorial & Content',
    tagline: 'Luxury editorial narrative block with founder portrait, anchor quote, and credentials.',
    explanation: 'FounderStory delivers authoritative, human-centered brand storytelling. It positions the founder portrait opposite an emphatic pull quote, detailed narrative bio, certification pills, and sign-off signature to foster high consumer trust.',
    usage: 'Use in "Our Story", "About", or homepage brand anchor sections to communicate sovereign origin and philosophy.',
    useCases: [
      'Founder and artisan introductions in boutique or family-owned brands.',
      'Executive leadership profiles on corporate platforms.',
      'Author and creator spotlight sections.',
      'Master craftsman provenance narratives.'
    ],
    otherOptions: [
      'Optional signature image URL or stylized italic font fallback.',
      'Custom list of credentials and milestone highlights.',
      'Custom pull quote and bio text.'
    ],
    props: [
      { name: 'founderName', type: 'string', default: '-', required: true, description: 'Founder/Leader name' },
      { name: 'quote', type: 'string', default: '-', required: true, description: 'Emphatic pull quote' },
      { name: 'bio', type: 'string', default: '-', required: true, description: 'Narrative bio paragraph' },
      { name: 'image', type: 'string', default: '-', required: true, description: 'Portrait image URL' },
      { name: 'title', type: 'string', default: "'Founder'", required: false, description: 'Role or title' },
      { name: 'signatureUrl', type: 'string', default: 'undefined', required: false, description: 'Signature image' },
      { name: 'highlights', type: 'string[]', default: '[]', required: false, description: 'Credential badges' },
    ],
    exportCode: `import React from 'react';
import { FounderStory } from './components/FounderStory';

export default function App() {
  return (
    <div className="max-w-6xl mx-auto p-8 bg-slate-950">
      <FounderStory
        founderName="Mmaphefo & Family"
        title="Founders & Stewards of the Hive"
        quote="We do not rush nature. In every drop lies the patience of the bees."
        bio="Founded on the rugged slopes of the Free State escarpment, we harvest single-origin raw honey without compromise."
        image="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=800&q=80"
        highlights={['DFS194 Certified', '100% Raw', 'Ethical Beekeeping']}
      />
    </div>
  );
}`,
    mainJsxCode: `import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);`,
  },
  {
    id: 'featured-recipes',
    name: 'Featured Recipes Grid',
    category: 'Editorial & Content',
    tagline: 'Culinary showcase cards with prep times, difficulty badges, and view triggers.',
    explanation: 'FeaturedRecipes displays lifestyle recipes and rituals that utilize artisanal products. Each card showcases photography, preparation time, difficulty level, dietary pills, and an action link to view the complete routine.',
    usage: 'Place on lifestyle landing pages or below e-commerce product grids to inspire customer usage and repeat purchases.',
    useCases: [
      'Food & beverage recipe ideas inspiring customer culinary use.',
      'Natural skincare routines and DIY beauty treatment rituals.',
      'Cocktail mixing and mocktail pairing recommendations.',
      'Wellness and immunity tonic preparation guides.'
    ],
    otherOptions: [
      'Custom recipe data array with prep time and difficulty metadata.',
      'Interactive `onSelectRecipe` callback to trigger a recipe drawer or page navigation.',
      'Configurable section title and subtitle.'
    ],
    props: [
      { name: 'recipes', type: 'Array<Recipe>', default: 'defaultRecipes', required: false, description: 'Recipe list' },
      { name: 'title', type: 'string', default: "'Artisanal Kitchen & Rituals'", required: false, description: 'Heading' },
      { name: 'subtitle', type: 'string', default: "'Nourish & Glow'", required: false, description: 'Subtitle' },
      { name: 'onSelectRecipe', type: 'Function(recipe)', default: 'undefined', required: false, description: 'Card click callback' },
    ],
    exportCode: `import React from 'react';
import { FeaturedRecipes } from './components/FeaturedRecipes';

export default function App() {
  return (
    <div className="p-8 bg-slate-950">
      <FeaturedRecipes
        title="Kitchen Rituals with Raw Honey"
        onSelectRecipe={(recipe) => console.log('Opened recipe:', recipe.title)}
      />
    </div>
  );
}`,
    mainJsxCode: `import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);`,
  },
  {
    id: 'featured-reviews',
    name: 'Featured Reviews Carousel/Grid',
    category: 'Data & Proof',
    tagline: 'Social proof card showcase with star scores, verified customer badges, and location metadata.',
    explanation: 'FeaturedReviews builds social proof by highlighting customer feedback. It features star ratings, verified buyer badges, geographic origin (e.g. Sandton, Camps Bay), and quote highlights designed to eliminate purchase hesitations.',
    usage: 'Position right before pricing tables or checkout buttons to reduce checkout abandonment.',
    useCases: [
      'High-ticket product social proof reinforcement.',
      'B2B client testimonials and case study highlights.',
      'Hospitality and travel guest review summaries.',
      'Subscription service customer satisfaction quotes.'
    ],
    otherOptions: [
      'Verified buyer badge toggle per review.',
      'Location and review date formatting.',
      'Custom review objects with star rating (1-5).'
    ],
    props: [
      { name: 'reviews', type: 'Array<Review>', default: 'defaultReviews', required: false, description: 'Customer reviews' },
      { name: 'title', type: 'string', default: "'Words from Our Patrons'", required: false, description: 'Heading' },
      { name: 'subtitle', type: 'string', default: "'Honest Affirmations'", required: false, description: 'Subtitle' },
    ],
    exportCode: `import React from 'react';
import { FeaturedReviews } from './components/FeaturedReviews';

export default function App() {
  return (
    <div className="p-8 bg-slate-950">
      <FeaturedReviews
        title="What Our Patrons Say"
        subtitle="Unfiltered Truth"
      />
    </div>
  );
}`,
    mainJsxCode: `import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);`,
  },
  {
    id: 'featured-gifts',
    name: 'Featured Gifts & Hamper Showcase',
    category: 'Commerce',
    tagline: 'Curated gift bundle cards with packaging breakdown and custom message triggers.',
    explanation: 'FeaturedGifts showcases bundled hampers and corporate gift sets. It presents the product photography alongside a checklist of package inclusions, price breakdown, and an explicit "Gift This" action button.',
    usage: 'Use in seasonal holiday campaigns (Mother\'s Day, Christmas, Corporate Year-End) or wedding registry sections.',
    useCases: [
      'Luxury corporate gifting and year-end client appreciation hampers.',
      'Seasonal holiday gift collections and bundles.',
      'Curated subscription starter boxes.',
      'Wedding and event celebration packages.'
    ],
    otherOptions: [
      'Included items checklist with icon checks.',
      'Custom price tag and promotional ribbon badges.',
      'Interactive `onSelectGift` callback.'
    ],
    props: [
      { name: 'gifts', type: 'Array<Gift>', default: 'defaultGifts', required: false, description: 'Gift bundle list' },
      { name: 'title', type: 'string', default: "'Curated Gift Collections'", required: false, description: 'Heading' },
      { name: 'subtitle', type: 'string', default: "'The Sovereign Offering'", required: false, description: 'Subtitle' },
      { name: 'onSelectGift', type: 'Function(gift)', default: 'undefined', required: false, description: 'CTA callback' },
    ],
    exportCode: `import React from 'react';
import { FeaturedGifts } from './components/FeaturedGifts';

export default function App() {
  return (
    <div className="p-8 bg-slate-950">
      <FeaturedGifts
        onSelectGift={(gift) => alert('Selected gift: ' + gift.name)}
      />
    </div>
  );
}`,
    mainJsxCode: `import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);`,
  },
  {
    id: 'education-hub',
    name: 'Education Hub Section',
    category: 'Editorial & Content',
    tagline: 'Scientific and regulatory knowledge cards with read times and difficulty pills.',
    explanation: 'EducationHubSection elevates brand credibility by educating consumers on empirical testing (e.g. water and flame tests), regulatory standards (DFS194), and biochemical science. It builds brand authority and dismantles counterfeit competition.',
    usage: 'Place on landing pages or knowledge centers to educate buyers on product purity.',
    useCases: [
      'Consumer purity education (how to spot adulterated counterfeit products).',
      'Regulatory and compliance transparency (DFS194, ISO, Organic, Fair-Trade).',
      'Technical product guides and tutorials.',
      'Sustainability and ethical sourcing transparency.'
    ],
    otherOptions: [
      'Custom category pill tags and reading time badges.',
      'Custom topic icons (flasks, certificates, lightbulbs).',
      'Action callback via `onSelectTopic`.'
    ],
    props: [
      { name: 'topics', type: 'Array<Topic>', default: 'defaultTopics', required: false, description: 'Knowledge topics' },
      { name: 'title', type: 'string', default: "'The Beekeeping Knowledge Hub'", required: false, description: 'Heading' },
      { name: 'subtitle', type: 'string', default: "'Empirical Truth'", required: false, description: 'Subtitle' },
      { name: 'onSelectTopic', type: 'Function(topic)', default: 'undefined', required: false, description: 'Topic click callback' },
    ],
    exportCode: `import React from 'react';
import { EducationHubSection } from './components/EducationHubSection';

export default function App() {
  return (
    <div className="p-8 bg-slate-950">
      <EducationHubSection
        onSelectTopic={(topic) => console.log('Selected guide:', topic.title)}
      />
    </div>
  );
}`,
    mainJsxCode: `import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);`,
  },
  {
    id: 'recipes-page',
    name: 'Recipes & Lifestyle Full Page',
    category: 'Pages',
    tagline: 'Complete standalone lifestyle catalog page with category filtering and real-time search.',
    explanation: 'RecipesPage provides a production-ready, full-page catalog layout with responsive search, category filter pills (All, Culinary, Skincare, Wellness), and card grids with prep times and read action triggers.',
    usage: 'Use as a standalone view route (`/recipes` or `/lifestyle`) in single-page apps or multi-page sites.',
    useCases: [
      'Dedicated recipe and culinary inspiration portal.',
      'Holistic skincare and DIY wellness remedy library.',
      'Content marketing hub to drive organic search traffic and product discovery.',
      'Customer ritual and cocktail recipe archive.'
    ],
    otherOptions: [
      'Add custom categories and recipe items.',
      'Hook up to a CMS API or static JSON file.',
      'Trigger modal or route transition via `onReadRecipe`.'
    ],
    props: [
      { name: 'onReadRecipe', type: 'Function(recipeTitle)', default: 'undefined', required: false, description: 'Read recipe action callback' },
    ],
    exportCode: `import React from 'react';
import { RecipesPage } from './components/RecipesPage';

export default function App() {
  return (
    <RecipesPage
      onReadRecipe={(title) => alert('Selected recipe: ' + title)}
    />
  );
}`,
    mainJsxCode: `import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);`,
  },
  {
    id: 'reviews-page',
    name: 'Customer Reviews Full Page',
    category: 'Pages',
    tagline: 'Comprehensive social proof page with rating histogram breakdown and submission CTA.',
    explanation: 'ReviewsPage delivers a complete customer sentiment dashboard. It includes aggregate star scores, percentage distribution histograms, verified customer pills, helpful vote counters, and a "Submit Review" call-to-action button.',
    usage: 'Mount at `/reviews` or `/testimonials` to satisfy high-intent buyers seeking extensive third-party proof.',
    useCases: [
      'Dedicated reviews and verified testimonials page.',
      'Customer feedback collection and rating audit portal.',
      'Trust & safety hub for high-ticket e-commerce items.',
      'Product quality guarantee showcase.'
    ],
    otherOptions: [
      'Filter reviews by star rating.',
      'Wire `onSubmitReview` to open a review submission modal.',
      'Customize rating distribution data.'
    ],
    props: [
      { name: 'onSubmitReview', type: 'Function()', default: 'undefined', required: false, description: 'Submit review callback' },
    ],
    exportCode: `import React from 'react';
import { ReviewsPage } from './components/ReviewsPage';

export default function App() {
  return (
    <ReviewsPage
      onSubmitReview={() => alert('Review submission form triggered!')}
    />
  );
}`,
    mainJsxCode: `import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);`,
  },
  {
    id: 'use-scroll-lock',
    name: 'useScrollLock Custom Hook',
    category: 'Hooks',
    tagline: 'Layout-shift safe body scroll lock hook for modals, sheets, and mobile drawers.',
    explanation: 'useScrollLock solves the classic mobile web issue where opening a modal causes the underlying document body to scroll and bounce. It calculates the browser scrollbar width and applies compensatory right padding to eliminate layout shifts.',
    usage: 'Call `useScrollLock(isModalOpen)` inside any modal, drawer, or bottom sheet component.',
    useCases: [
      'Modal dialogs and image lightbox viewers.',
      'Mobile navigation flyout menus and hamburger drawers.',
      'Bottom sheet drawers on mobile viewports.',
      'Full-screen search or filter overlays.'
    ],
    otherOptions: [
      'Pass boolean active state.',
      'Automatically cleans up inline styles when component unmounts.'
    ],
    props: [
      { name: 'isLocked', type: 'boolean', default: '-', required: true, description: 'True to lock body scroll, false to restore' },
    ],
    exportCode: `import React, { useState } from 'react';
import { useScrollLock } from './hooks/useScrollLock';

export default function ModalExample() {
  const [isOpen, setIsOpen] = useState(false);
  useScrollLock(isOpen);

  return (
    <div>
      <button onClick={() => setIsOpen(true)}>Open Modal</button>
      {isOpen && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center">
          <div className="bg-slate-900 p-6 rounded-xl text-white">
            <h3>Scroll is locked!</h3>
            <button onClick={() => setIsOpen(false)}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
}`,
    mainJsxCode: `import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);`,
  },
];
