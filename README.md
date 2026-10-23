# Sankofa Visual Template Library

An enterprise-grade, standalone React 19 + Tailwind CSS component design system and visual template showcase built for the Sankofa platform ecosystem.

## 🚀 Overview

The **Sankofa Visual Template Library** provides 17 production-grade, white-label, highly customizable UI components, layout primitives, and hooks. Each component is paired with:
1. **Interactive Live Previews** (live prop tweaking, state triggers, modal openers, toast dispatches).
2. **Deep Architectural Explanations** (WAI-ARIA accessibility, layout shift mitigation, mobile bandwidth performance).
3. **Real-World Use Cases** (E-commerce storefronts, SaaS dashboards, mobile PWAs, and editorial branding).
4. **Customization Options & Props API** (prop names, types, default values, and description tables).
5. **Zero-Friction Export Code** (full standalone component code + exact `main.jsx` / `App.jsx` integration snippet).

---

## 📦 Component Inventory (17 Components)

| Component | Category | Purpose |
|---|---|---|
| `Breadcrumbs` | Navigation | Accessible hierarchical trail with custom separators and mobile truncation |
| `Container` | Layout | Polymorphic responsive wrapper with `sm` to `7xl` & `full` width constraints |
| `Section` | Layout | Vertical rhythm manager with 5 surface presets and automatic containers |
| `ProductCard` | Commerce | E-commerce card with image zoom, rating stars, badge ribbons, and stock state |
| `Modal` | Overlays & Modals | Accessible dialog with backdrop blur, focus containment, and ESC dismissal |
| `ImageModal` | Overlays & Modals | High-res image lightbox with zoom toggle, captions, and category pills |
| `VideoModal` | Overlays & Modals | 16:9 aspect-locked player supporting YouTube, Vimeo, and raw HTML5 video |
| `Toast` | Overlays & Modals | Auto-dismissing feedback banner with progress countdown bar and 4 variants |
| `ImpactTracker` | Data & Proof | Metric KPI counters with animated trend pills and responsive grid columns |
| `FounderStory` | Editorial & Content | Luxury editorial block with founder portrait, pull quote, and credentials |
| `FeaturedRecipes` | Editorial & Content | Culinary cards with prep times, difficulty badges, and drawer callbacks |
| `FeaturedReviews` | Data & Proof | Social proof testimonials with star ratings and verified buyer badges |
| `FeaturedGifts` | Commerce | Curated gift hamper spotlight with inclusions list and gift CTA |
| `EducationHubSection` | Editorial & Content | Scientific and regulatory knowledge cards with read times and difficulty pills |
| `RecipesPage` | Pages | Full-page culinary/lifestyle catalog with search and category filter pills |
| `ReviewsPage` | Pages | Full-page review portal with rating histogram breakdown and review submission |
| `useScrollLock` | Hooks | Layout-shift safe body scroll lock hook preventing background scroll bounce |

---

## 🛠️ Quick Start

```bash
# Navigate to the template library
cd c:\Users\thoso\Sankofa_mvp\sankofa-visual-template-library

# Start the interactive development server
npm run dev

# Build for production
npm run build
```

---

## 📋 How to Export Components to Any Project

1. Run the visual library with `npm run dev`.
2. Browse to the component you wish to use.
3. Switch to the **Export Code (Zero Friction)** tab.
4. Click **Copy Component Code** to copy the component into your project's `src/components/` folder.
5. Click **main.jsx Integration Boilerplate** to view the exact imports and wrapper setup.
