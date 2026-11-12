import React, { useState } from 'react';
import {
  Breadcrumbs,
  Container,
  Section,
  ProductCard,
  Modal,
  ImageModal,
  VideoModal,
  Toast,
  ImpactTracker,
  FounderStory,
  FeaturedRecipes,
  FeaturedReviews,
  FeaturedGifts,
  EducationHubSection,
  RecipesPage,
  ReviewsPage,
  useScrollLock,
} from '../../library/components';
import { Play, Sparkles, Image, Bell, Layers, CheckCircle } from 'lucide-react';
import ImportedComponentPreview from './ImportedComponentPreview';

export const LivePreviewContainer = ({ componentId }) => {
  // Demo states
  const [breadcrumbSeparator, setBreadcrumbSeparator] = useState('chevron');
  const [containerSize, setContainerSize] = useState('7xl');
  const [sectionVariant, setSectionVariant] = useState('accent');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [activeToasts, setActiveToasts] = useState([]);
  const [impactCols, setImpactCols] = useState(4);
  const [productInStock, setProductInStock] = useState(true);
  const [isScrollLocked, setIsScrollLocked] = useState(false);

  // Custom hook test
  useScrollLock(isScrollLocked);

  const importedPreviewIds = ['button', 'card', 'feature-card', 'site-footer', 'command-palette', 'action-feedback', 'commerce-route-hero', 'product-detail', 'approved-image', 'expandable-section', 'single-open-accordion', 'learner-progress-ribbon', 'status-badge', 'workflow-stepper', 'export-menu', 'inline-feedback', 'toast-notification-system', 'data-table-shell'];
  if (importedPreviewIds.includes(componentId)) {
    return <ImportedComponentPreview componentId={componentId} />;
  }

  const addToast = (variant, title, message) => {
    const id = Date.now().toString();
    setActiveToasts((prev) => [...prev, { id, variant, title, message }]);
  };

  const removeToast = (id) => {
    setActiveToasts((prev) => prev.filter((t) => t.id !== id));
  };

  switch (componentId) {
    case 'breadcrumbs':
      return (
        <div className="space-y-6">
          <div className="flex items-center gap-2 pb-4 border-b border-slate-800 text-xs">
            <span className="text-slate-400 font-medium">Separator Style:</span>
            {['chevron', 'slash', 'bullet'].map((sep) => (
              <button
                key={sep}
                onClick={() => setBreadcrumbSeparator(sep)}
                className={`px-2.5 py-1 rounded-lg text-xs capitalize ${
                  breadcrumbSeparator === sep ? 'bg-amber-500 text-slate-950 font-bold' : 'bg-slate-800 text-slate-300'
                }`}
              >
                {sep}
              </button>
            ))}
          </div>

          <div className="p-6 rounded-2xl bg-slate-950 border border-slate-800">
            <Breadcrumbs
              separator={breadcrumbSeparator}
              items={[
                { label: 'Storefront', href: '#' },
                { label: 'Artisanal Pantry', href: '#' },
                { label: 'Raw Honeys', href: '#' },
                { label: 'Sunflower Creamed Honey' },
              ]}
              onNavigate={(item) => alert(`Navigation clicked: ${item.label}`)}
            />
          </div>
        </div>
      );

    case 'container':
      return (
        <div className="space-y-6">
          <div className="flex flex-wrap items-center gap-2 pb-4 border-b border-slate-800 text-xs">
            <span className="text-slate-400 font-medium">Max-Width Constraint:</span>
            {['sm', 'md', 'lg', 'xl', '2xl', '7xl', 'full'].map((sz) => (
              <button
                key={sz}
                onClick={() => setContainerSize(sz)}
                className={`px-2.5 py-1 rounded-lg text-xs font-mono uppercase ${
                  containerSize === sz ? 'bg-amber-500 text-slate-950 font-bold' : 'bg-slate-800 text-slate-300'
                }`}
              >
                {sz}
              </button>
            ))}
          </div>

          <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 overflow-hidden">
            <Container size={containerSize} className="py-8 bg-slate-900 border border-amber-500/30 rounded-xl text-center">
              <span className="text-xs uppercase font-mono tracking-widest text-amber-400 block mb-1">
                Active Size: max-w-{containerSize}
              </span>
              <h3 className="text-xl font-serif text-white">Fluid Boundary Container</h3>
              <p className="text-xs text-slate-400 mt-2 max-w-lg mx-auto">
                Responsive horizontal margins automatically prevent content from stretching inappropriately across ultrawide monitors.
              </p>
            </Container>
          </div>
        </div>
      );

    case 'section':
      return (
        <div className="space-y-6">
          <div className="flex flex-wrap items-center gap-2 pb-4 border-b border-slate-800 text-xs">
            <span className="text-slate-400 font-medium">Surface Preset:</span>
            {['transparent', 'surface', 'subtle', 'accent', 'contrast'].map((v) => (
              <button
                key={v}
                onClick={() => setSectionVariant(v)}
                className={`px-2.5 py-1 rounded-lg text-xs capitalize ${
                  sectionVariant === v ? 'bg-amber-500 text-slate-950 font-bold' : 'bg-slate-800 text-slate-300'
                }`}
              >
                {v}
              </button>
            ))}
          </div>

          <div className="rounded-2xl overflow-hidden border border-slate-800 bg-slate-950">
            <Section variant={sectionVariant} spacing="md" topDivider bottomDivider>
              <div className="text-center py-4">
                <span className="text-xs uppercase font-bold tracking-widest text-amber-400 block mb-1">
                  Preset: {sectionVariant}
                </span>
                <h3 className="text-2xl font-serif text-white">Semantic Section Container</h3>
                <p className="text-xs text-slate-300 mt-2 max-w-md mx-auto">
                  Combines vertical rhythm, container boundary, and surface theme into a unified developer primitive.
                </p>
              </div>
            </Section>
          </div>
        </div>
      );

    case 'product-card':
      return (
        <div className="space-y-6">
          <div className="flex items-center gap-3 pb-4 border-b border-slate-800 text-xs">
            <span className="text-slate-400 font-medium">Availability Toggle:</span>
            <button
              onClick={() => setProductInStock(!productInStock)}
              className={`px-3 py-1 rounded-lg text-xs font-semibold ${
                productInStock ? 'bg-emerald-950 text-emerald-400 border border-emerald-500/40' : 'bg-rose-950 text-rose-400 border border-rose-500/40'
              }`}
            >
              {productInStock ? 'In Stock (Click to toggle sold out)' : 'Sold Out (Click to toggle in stock)'}
            </button>
          </div>

          <div className="max-w-xs mx-auto">
            <ProductCard
              id="sunflower-creamed-375"
              name="Sunflower Creamed Honey (375g)"
              subtitle="Free State Terroir"
              price={120}
              originalPrice={140}
              currency="R"
              image="https://images.unsplash.com/photo-1587049352846-4a222e784d38?auto=format&fit=crop&w=600&q=80"
              rating={5}
              reviewCount={38}
              badge="Best Seller"
              inStock={productInStock}
              onAddToCart={(id) => alert(`Added ${id} to cart!`)}
              onViewDetails={(id) => alert(`View details: ${id}`)}
            />
          </div>
        </div>
      );

    case 'modal':
      return (
        <div className="p-8 text-center space-y-4">
          <p className="text-sm text-slate-400">
            Click the button below to test accessible focus trapping, escape key dismissal, and backdrop blur.
          </p>
          <button
            onClick={() => setIsModalOpen(true)}
            className="px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold transition shadow-lg shadow-amber-500/20"
          >
            Open Interactive Modal
          </button>

          <Modal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            title="DFS194 Regulatory Standard"
            description="Official Provincial Beekeeping Registry & Terroir Verification"
            footer={
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-lg text-xs font-semibold"
              >
                Done
              </button>
            }
          >
            <div className="space-y-3 text-xs leading-relaxed text-slate-300">
              <p>
                DFS194 certification establishes proof of origin across the Free State escarpment. Every batch is cataloged with GPS hive coordinates and undergoes laboratory pollen chromatography.
              </p>
              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                <span className="font-mono text-amber-400">Status: ACTIVE_REGISTRY_DFS194</span>
              </div>
            </div>
          </Modal>
        </div>
      );

    case 'image-modal':
      return (
        <div className="p-8 text-center space-y-4">
          <p className="text-sm text-slate-400">
            Click thumbnail to launch the high-resolution lightbox with zoom controls.
          </p>
          <div className="inline-block relative group cursor-pointer" onClick={() => setIsImageModalOpen(true)}>
            <img
              src="https://images.unsplash.com/photo-1587049352846-4a222e784d38?auto=format&fit=crop&w=400&q=80"
              alt="Raw Honey"
              className="w-48 rounded-2xl border border-slate-700 shadow-xl group-hover:scale-105 transition-transform"
            />
            <div className="absolute inset-0 bg-black/40 rounded-2xl flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              <span className="px-3 py-1 bg-slate-900/90 text-amber-400 text-xs font-semibold rounded-full border border-slate-700 flex items-center gap-1.5">
                <Image size={14} /> Open Lightbox
              </span>
            </div>
          </div>

          <ImageModal
            isOpen={isImageModalOpen}
            onClose={() => setIsImageModalOpen(false)}
            src="https://images.unsplash.com/photo-1587049352846-4a222e784d38?auto=format&fit=crop&w=1400&q=80"
            caption="Raw Crystalline Honeycomb - Harvest 2026"
            category="Terroir Proof"
          />
        </div>
      );

    case 'video-modal':
      return (
        <div className="p-8 text-center space-y-4">
          <p className="text-sm text-slate-400">
            Test the video player dialog with locked 16:9 aspect ratio and automatic pause on close.
          </p>
          <button
            onClick={() => setIsVideoModalOpen(true)}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold transition shadow-lg shadow-amber-500/20"
          >
            <Play size={18} fill="currentColor" />
            <span>Launch Video Player</span>
          </button>

          <VideoModal
            isOpen={isVideoModalOpen}
            onClose={() => setIsVideoModalOpen(false)}
            videoUrl="https://www.youtube.com/embed/dQw4w9WgXcQ"
            title="Apiary Harvest Documentary"
          />
        </div>
      );

    case 'toast':
      return (
        <div className="p-8 space-y-6 text-center">
          <p className="text-sm text-slate-400">
            Click any button below to trigger real-time auto-dismissing toast notifications.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={() => addToast('success', 'Order Saved', 'Complimentary courier applied (Cart > R500)')}
              className="px-4 py-2 rounded-xl text-xs font-semibold bg-emerald-950 text-emerald-400 border border-emerald-500/40 hover:bg-emerald-900 transition"
            >
              Trigger Success Toast
            </button>
            <button
              onClick={() => addToast('error', 'Checkout Interrupted', 'Could not establish connection to WhatsApp API')}
              className="px-4 py-2 rounded-xl text-xs font-semibold bg-rose-950 text-rose-400 border border-rose-500/40 hover:bg-rose-900 transition"
            >
              Trigger Error Toast
            </button>
            <button
              onClick={() => addToast('warning', 'Low Stock Alert', 'Only 4 jars of Cosmos Blossom remain in this batch')}
              className="px-4 py-2 rounded-xl text-xs font-semibold bg-amber-950 text-amber-400 border border-amber-500/40 hover:bg-amber-900 transition"
            >
              Trigger Warning Toast
            </button>
            <button
              onClick={() => addToast('info', 'Batch Updated', 'DFS194 Certificate #4829 has been verified')}
              className="px-4 py-2 rounded-xl text-xs font-semibold bg-sky-950 text-sky-400 border border-sky-500/40 hover:bg-sky-900 transition"
            >
              Trigger Info Toast
            </button>
          </div>

          {/* Floating Toasts Viewport */}
          <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3">
            {activeToasts.map((toast) => (
              <Toast
                key={toast.id}
                id={toast.id}
                variant={toast.variant}
                title={toast.title}
                message={toast.message}
                duration={4000}
                onClose={removeToast}
              />
            ))}
          </div>
        </div>
      );

    case 'impact-tracker':
      return (
        <div className="space-y-6">
          <div className="flex items-center gap-2 pb-4 border-b border-slate-800 text-xs">
            <span className="text-slate-400 font-medium">Desktop Columns:</span>
            {[2, 3, 4].map((cols) => (
              <button
                key={cols}
                onClick={() => setImpactCols(cols)}
                className={`px-3 py-1 rounded-lg text-xs font-mono ${
                  impactCols === cols ? 'bg-amber-500 text-slate-950 font-bold' : 'bg-slate-800 text-slate-300'
                }`}
              >
                {cols} Columns
              </button>
            ))}
          </div>
          <ImpactTracker columns={impactCols} />
        </div>
      );

    case 'founder-story':
      return <FounderStory />;

    case 'featured-recipes':
      return (
        <FeaturedRecipes
          onSelectRecipe={(r) => alert(`Clicked Recipe: ${r.title}`)}
        />
      );

    case 'featured-reviews':
      return <FeaturedReviews />;

    case 'featured-gifts':
      return (
        <FeaturedGifts
          onSelectGift={(g) => alert(`Selected Gift Hamper: ${g.name}`)}
        />
      );

    case 'education-hub':
      return (
        <EducationHubSection
          onSelectTopic={(t) => alert(`Selected Guide: ${t.title}`)}
        />
      );

    case 'recipes-page':
      return (
        <div className="border border-slate-800 rounded-2xl overflow-hidden max-h-[600px] overflow-y-auto">
          <RecipesPage onReadRecipe={(title) => alert(`Read recipe clicked: ${title}`)} />
        </div>
      );

    case 'reviews-page':
      return (
        <div className="border border-slate-800 rounded-2xl overflow-hidden max-h-[600px] overflow-y-auto">
          <ReviewsPage onSubmitReview={() => alert('Submit review modal clicked!')} />
        </div>
      );

    case 'use-scroll-lock':
      return (
        <div className="p-8 text-center space-y-4">
          <p className="text-sm text-slate-400">
            Toggle body scroll locking state. When active, document body scroll is locked and scrollbar width padding is applied to prevent layout shift.
          </p>
          <button
            onClick={() => setIsScrollLocked(!isScrollLocked)}
            className={`px-6 py-3 rounded-xl font-bold transition ${
              isScrollLocked
                ? 'bg-rose-500 text-white shadow-lg shadow-rose-500/20'
                : 'bg-slate-800 text-slate-200 hover:bg-slate-700'
            }`}
          >
            {isScrollLocked ? 'Body Scroll is LOCKED (Click to Unlock)' : 'Body Scroll is UNLOCKED (Click to Lock)'}
          </button>
        </div>
      );

    default:
      return (
        <div className="p-8 text-center text-slate-500 text-xs">
          Select a component from the sidebar to inspect its interactive preview.
        </div>
      );
  }
};

export default LivePreviewContainer;
