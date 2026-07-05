# UI System Documentation — TummyToToes Photography Studio

> **Purpose:** This file captures every UI-related detail extracted from the codebase so that another AI (or developer) can redesign the application — especially for mobile — while preserving the existing design language.

---

## Table of Contents

1. [Tech Stack](#1-tech-stack)
2. [Design Tokens (Global Design System)](#2-design-tokens-global-design-system)
3. [Typography](#3-typography)
4. [Layout & Spacing System](#4-layout--spacing-system)
5. [Component Library](#5-component-library)
6. [Page Breakdown](#6-page-breakdown)
7. [Navigation System](#7-navigation-system)
8. [Forms](#8-forms)
9. [Animations & Transitions](#9-animations--transitions)
10. [Responsive Rules](#10-responsive-rules)

---

## 1. Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 14 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS 3.4 + CSS custom properties |
| Component Library | shadcn/ui (default style, CVA variants) |
| Primitives | Radix UI |
| Icons | Lucide React |
| Animations | `tailwindcss-animate` plugin + custom CSS keyframes |
| State / Data | React Query (`@tanstack/react-query`) |
| Forms | Native HTML elements (no form library in active use) |
| Image | `next/image` (`fill` layout, `sizes` attribute) |
| Toast | Sonner + shadcn/ui Toaster |
| Utility | `clsx` + `tailwind-merge` (via `cn()` helper in `src/lib/utils.ts`) |

---

## 2. Design Tokens (Global Design System)

All colour tokens are defined as **HSL channel values** (without `hsl()` wrapper) in CSS custom properties inside `src/app/globals.css`, and consumed in Tailwind via `hsl(var(--token))`.

### 2.1 Light Theme (`:root`)

| Token | HSL Value | Resolved Colour | Role |
|---|---|---|---|
| `--background` | `36 33% 96%` | Warm off-white #F5F0EB | Page background |
| `--foreground` | `24 5% 16%` | Dark warm brown #2B2826 | Primary text / dark fills |
| `--card` | `0 0% 100%` | Pure white #FFFFFF | Card surfaces |
| `--card-foreground` | `24 5% 16%` | #2B2826 | Card text |
| `--popover` | `36 33% 96%` | #F5F0EB | Popover background |
| `--popover-foreground` | `24 5% 16%` | #2B2826 | Popover text |
| `--primary` | `24 5% 16%` | #2B2826 | Primary brand colour |
| `--primary-foreground` | `36 33% 96%` | #F5F0EB | Text on primary |
| `--secondary` | `27 26% 86%` | Warm beige #DDD5CB | Secondary surfaces |
| `--secondary-foreground` | `24 5% 16%` | #2B2826 | Text on secondary |
| `--muted` | `27 26% 86%` | #DDD5CB | Muted backgrounds |
| `--muted-foreground` | `24 5% 35%` | #6B6360 | Subdued text |
| `--accent` | `33 35% 65%` | Warm gold #C0A882 | Accent highlights |
| `--accent-foreground` | `24 5% 16%` | #2B2826 | Text on accent |
| `--destructive` | `0 84.2% 60.2%` | Red #EF4444 | Destructive actions |
| `--destructive-foreground` | `210 40% 98%` | Near white #F8FAFC | Text on destructive |
| `--border` | `27 26% 86%` | #DDD5CB | Border colour |
| `--input` | `27 26% 86%` | #DDD5CB | Input border colour |
| `--ring` | `33 35% 65%` | #C0A882 | Focus ring colour |
| `--radius` | `0.75rem` | 12px | Base border radius |

### 2.2 Dark Theme (`.dark`)

| Token | HSL Value | Resolved Colour | Role |
|---|---|---|---|
| `--background` | `24 5% 16%` | #2B2826 | Page background |
| `--foreground` | `36 33% 96%` | #F5F0EB | Primary text |
| `--card` | `24 8% 20%` | #38322E | Card surfaces |
| `--card-foreground` | `36 33% 96%` | #F5F0EB | Card text |
| `--popover` | `24 8% 20%` | #38322E | Popover background |
| `--popover-foreground` | `36 33% 96%` | #F5F0EB | Popover text |
| `--primary` | `36 33% 96%` | #F5F0EB | Primary brand colour (inverted) |
| `--primary-foreground` | `24 5% 16%` | #2B2826 | Text on primary |
| `--secondary` | `24 8% 25%` | #453E39 | Secondary surfaces |
| `--secondary-foreground` | `36 33% 96%` | #F5F0EB | Text on secondary |
| `--muted` | `24 8% 25%` | #453E39 | Muted backgrounds |
| `--muted-foreground` | `27 15% 60%` | #A89888 | Subdued text |
| `--accent` | `33 35% 65%` | #C0A882 | Accent (unchanged) |
| `--accent-foreground` | `36 33% 96%` | #F5F0EB | Text on accent |
| `--destructive` | `0 62.8% 30.6%` | #7F1D1D | Destructive (dark variant) |
| `--destructive-foreground` | `36 33% 96%` | #F5F0EB | Text on destructive |
| `--border` | `24 8% 25%` | #453E39 | Border colour |
| `--input` | `24 8% 25%` | #453E39 | Input border |
| `--ring` | `33 35% 65%` | #C0A882 | Focus ring |

### 2.3 Sidebar Tokens (Light)

| Token | HSL Value |
|---|---|
| `--sidebar-background` | `36 33% 96%` |
| `--sidebar-foreground` | `24 5% 16%` |
| `--sidebar-primary` | `24 5% 16%` |
| `--sidebar-primary-foreground` | `36 33% 96%` |
| `--sidebar-accent` | `27 26% 86%` |
| `--sidebar-accent-foreground` | `24 5% 16%` |
| `--sidebar-border` | `27 26% 86%` |
| `--sidebar-ring` | `33 35% 65%` |

### 2.4 Border Radius Scale

| Token | Value |
|---|---|
| `rounded-lg` | `var(--radius)` → `0.75rem` (12px) |
| `rounded-md` | `calc(var(--radius) - 2px)` → `0.625rem` (10px) |
| `rounded-sm` | `calc(var(--radius) - 4px)` → `0.5rem` (8px) |

### 2.5 Shadows Used in Practice

| Context | Shadow |
|---|---|
| Card (default) | `shadow-sm` (Tailwind default) |
| Featured package card | `shadow-lg` |
| Sheet panel | `shadow-lg` |
| Logo hover | `drop-shadow(0 0 2em #646cffaa)` |

### 2.6 Gradients

| Context | Gradient |
|---|---|
| Instagram button border | `linear-gradient(#fff, #fff) padding-box, linear-gradient(to right, #833ab4, #fd1d1d, #fcb045) border-box` with `border: 2px solid transparent` |

### 2.7 Opacity Usage

| Pattern | Value |
|---|---|
| Text subdued (`text-foreground/80`) | 80% |
| Footer text (`text-background/70`, `/60`, `/50`, `/20`) | 70%, 60%, 50%, 20% |
| Lightbox overlay (`bg-foreground/90`) | 90% |
| Gallery image overlay on hover (`bg-background/30`) | 30% |
| Scrollbar thumb | 55% idle, 78% hover |
| Header backdrop on scroll (`bg-background/95`) | 95% |
| Disabled state | 50% (`disabled:opacity-50`) |
| Sheet overlay | `bg-black/80` → 80% |

### 2.8 Hardcoded Colours (Non-token)

| Colour | Context |
|---|---|
| `#25D366` | WhatsApp button background |
| `#833ab4`, `#fd1d1d`, `#fcb045` | Instagram gradient border |
| `#888` | `.read-the-docs` text (legacy `App.css`) |
| `bg-gray-100`, `text-gray-600`, `text-blue-500`, `text-blue-700` | 404 Not Found page (Tailwind defaults — not branded) |

---

## 3. Typography

### 3.1 Font Families

| Token | Family | Fallback | Google Fonts Weights |
|---|---|---|---|
| `font-heading` | Cormorant Garamond | serif | 300, 400, 500, 600 (+ italic 300, 400) |
| `font-body` | Jost | sans-serif | 300, 400, 500, 600 |

Loaded via Google Fonts `<link>` in `layout.tsx`.

### 3.2 Heading Styles (H1–H6)

All headings use `font-heading` / `Cormorant Garamond`.

| Element | Classes | Responsive Sizes | Weight | Leading |
|---|---|---|---|---|
| **H1 (Hero)** | `font-heading text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-light leading-[1.1] text-foreground` | 30px → 36px → 60px → 72px | 300 (`font-light`) | 1.1 |
| **H1 (Gallery page)** | `font-heading text-3xl sm:text-4xl md:text-5xl font-light text-foreground` | 30px → 36px → 48px | 300 | default |
| **H2 (Section titles)** | `font-heading text-3xl sm:text-4xl md:text-5xl font-light text-foreground` | 30px → 36px → 48px | 300 | default |
| **H3 (Gallery copy)** | `font-heading text-3xl md:text-5xl font-light text-foreground` | 30px → 48px | 300 | default |
| **H3 (Package title)** | `font-heading text-2xl font-normal text-foreground` | 24px | 400 | default |
| **H4 (Footer labels)** | `font-body text-xs uppercase tracking-[0.3em] text-background/60` | 12px | 400 | default |
| **404 H1** | `text-4xl font-bold` | 36px | 700 | default |

### 3.3 Body / Paragraph Styles

| Context | Classes | Size | Weight | Leading | Colour |
|---|---|---|---|---|---|
| About body text | `font-body text-base leading-relaxed text-muted-foreground` | 16px | 400 | relaxed (1.625) | muted |
| Contact description | `font-body text-base text-muted-foreground` | 16px | 400 | default | muted |
| Package feature items | `font-body text-sm text-muted-foreground` | 14px | 400 | default | muted |
| Gallery description | `font-body text-sm md:text-lg text-muted-foreground leading-relaxed` | 14px → 18px | 400 | relaxed | muted |
| Footer body | `font-body text-sm text-background/70 leading-relaxed` | 14px | 400 | relaxed | 70% of bg |
| Contact info items | `font-body text-sm text-muted-foreground` | 14px | 400 | default | muted |
| Testimonial quote | `font-heading text-lg md:text-2xl font-light italic text-foreground leading-relaxed` | 18px → 24px | 300, italic | relaxed | foreground |
| Testimonial name | `font-body text-sm uppercase tracking-[0.2em] text-muted-foreground` | 14px | 400 | default | muted |

### 3.4 Label / Section Tag Styles

| Context | Classes | Properties |
|---|---|---|
| Section label (About, Portfolio, Packages, Contact) | `font-body text-xs uppercase tracking-[0.35em] text-accent` | 12px, uppercase, 0.35em tracking, gold accent |
| Gallery step number | `font-body text-xs uppercase tracking-[0.35em] text-accent` | same as section label |
| Hero sub-tag (categories) | `font-body text-[10px] sm:text-sm uppercase tracking-[0.25em] sm:tracking-[0.35em] text-accent` | 10px → 14px, up to 0.35em |
| Marquee text | `font-body text-[10px] sm:text-xs uppercase tracking-[0.2em] sm:tracking-[0.3em] text-muted-foreground` | 10px → 12px |
| Footer copyright | `font-body text-xs text-background/50` | 12px, 50% opacity |

### 3.5 Button / CTA Text Styles

| Context | Classes |
|---|---|
| Primary CTA (filled) | `font-body text-sm uppercase tracking-[0.15em]` |
| Secondary CTA (outline) | `font-body text-sm uppercase tracking-[0.15em]` |
| Nav link (desktop) | `font-body text-sm uppercase tracking-[0.15em] text-foreground/80` |
| Nav link (mobile sheet) | `font-body text-lg uppercase tracking-[0.15em] text-foreground/80` |
| Category tab (gallery) | `font-body text-sm uppercase tracking-[0.15em]` |

### 3.6 Gallery "View Collection" Link

```
inline-block font-body text-xs uppercase tracking-[0.25em] text-accent
border-b border-accent pb-0.5
opacity-0 → group-hover:opacity-100 (transition-opacity 300ms)
```

---

## 4. Layout & Spacing System

### 4.1 Container

```css
container: {
  center: true,
  padding: "2rem",          /* 32px horizontal padding */
  screens: {
    "2xl": "1400px"          /* max container width at 2xl */
  }
}
```

In practice most sections use: `container mx-auto px-4 md:px-8`.

### 4.2 Breakpoints

| Name | Min-width | Usage |
|---|---|---|
| `sm` | `640px` | Button layout stacking, text sizing |
| `md` | `768px` | Primary desktop breakpoint for layout switches |
| `lg` | `1024px` | Hero heading scaling |
| `2xl` | `1400px` | Container max-width |
| Custom `max-width: 767px` | mobile gallery CSS | Gallery mobile override |
| Custom `min-width: 768px` | desktop scrollbar CSS | Custom scrollbar only on desktop |

**Mobile breakpoint constant:** `MOBILE_BREAKPOINT = 768` (in `use-mobile.tsx` hook)

### 4.3 Section Padding (Vertical)

| Section | Mobile (`py`) | Desktop (`md:py`) |
|---|---|---|
| Hero | `pb-10` / `pt-20` | `md:pb-16` |
| About | `py-12` | `md:py-32` |
| Gallery | `py-14` | `md:py-32` |
| Packages | `py-14` | `md:py-32` |
| Testimonials | `py-14` | `md:py-32` |
| Contact | `py-14` | `md:py-32` |
| Footer | `py-12` | `md:py-16` |
| Gallery page | `py-12` | `md:py-20` |

### 4.4 Grid Patterns

| Section | Mobile Grid | Desktop Grid | Gap |
|---|---|---|---|
| Hero | 1 column, stacked | `md:grid-cols-2` | `gap-6 md:gap-12` |
| About | 1 column, stacked | `md:grid-cols-2` | `gap-8 md:gap-16` |
| Packages | 1 column, stacked | `md:grid-cols-3` | `gap-5 md:gap-6` |
| Contact | 1 column, stacked | `md:grid-cols-2` | `gap-10 md:gap-16` |
| Footer | 1 column, stacked | `md:grid-cols-3` | `gap-8 md:gap-12` |
| Gallery images | 1 column | `sm:grid-cols-3` | `gap-4` |

### 4.5 Max-widths

| Element | Value |
|---|---|
| Container (2xl) | `1400px` |
| Hero image | `max-w-[420px]` |
| Packages grid | `max-w-5xl` (1024px) |
| Testimonials container | `max-w-3xl` (768px) |
| Gallery scroll media/copy | `min(100%, 640px)` |
| Lightbox image | `max-w-4xl` (896px) |

### 4.6 Image Aspect Ratios

| Context | Aspect Ratio |
|---|---|
| Hero image | `3 / 4` (portrait) |
| About image | `1 / 1` (square) |
| Gallery scroll images (desktop) | `4 / 5` |
| Gallery scroll images (mobile) | `3 / 4` |
| Gallery page images | `3 / 4` |
| Lightbox image | free (object-contain, `w-[92vw] h-[80vh]`) |

---

## 5. Component Library

### 5.1 Custom Application Components

#### 5.1.1 Header

- **File:** `src/components/Header.tsx`
- **Props:** None (reads scroll position internally)
- **Visual:** Fixed top bar, transparent on top → `bg-background/95 backdrop-blur-sm border-b` when scrolled > 50px. 3-column grid on mobile (spacer | centered logo | hamburger), flex on desktop (logo left, nav right).
- **Logo:** `next/image`, `h-20 w-72` on mobile, `md:h-16 md:w-56` on desktop. Path: `/Logo/Logo.png`.
- **Key classes:** `fixed top-0 left-0 right-0 z-50 transition-all duration-300`

#### 5.1.2 Hero

- **File:** `src/components/Hero.tsx`
- **Props:** None
- **Visual:** Full-screen height section (`min-h-screen`). Two-column grid on desktop (text left, image right). On mobile, image appears first (via `order-first`), text below. Animated entrance (`animate-fade-up` with staggered delays). Bottom marquee strip with scrolling text.
- **Hero image:** `aspect-[3/4] rounded-2xl overflow-hidden`
- **CTAs:** "View Gallery" (filled) + "Book a Session" (outline). Full width on mobile, auto-width on sm+.

#### 5.1.3 About

- **File:** `src/components/About.tsx`
- **Props:** None
- **Visual:** Two-column grid (image left, text right). IntersectionObserver-driven fade-in (`opacity-0 translate-y-8` → `opacity-100 translate-y-0`, 700ms). Section tag with animated accent line (`w-0` → `w-4`).
- **Image:** `aspect-square rounded-sm`

#### 5.1.4 Gallery (Home Section)

- **File:** `src/components/Gallery.tsx`
- **Props:** None (5 panels defined internally)
- **Visual:** Desktop: scroll-snap vertical gallery with sticky panels, dot indicator on right side. Mobile: vertical stack with `1fr 1fr` grid (image left, text right) for each panel. Each panel has: numbered label, title (links to `/gallery?category=...`), "View Collection →" hover label, description text.
- **Panel data:** `{ src, title, description, alt, category }` — 5 entries: Newborn, Maternity, Kids, Fashion, Events.
- **CTA:** "View Full Gallery" button → `/gallery`

#### 5.1.5 Packages

- **File:** `src/components/Packages.tsx`
- **Props:** None (3 packages defined internally)
- **Visual:** Section with `bg-secondary`. Three pricing cards in a grid. Featured card has `border-t-4 border-accent md:scale-105 shadow-lg`. Cards have hover `-translate-y-1`. Each card: title (heading font), price, feature list with accent dot markers, CTA button.
- **Package data:**
  - Maternity Session — ₹12,000 (4 features)
  - Newborn Session — ₹18,000 (5 features, featured)
  - Events Coverage — ₹25,000 (4 features)

#### 5.1.6 Testimonials

- **File:** `src/components/Testimonials.tsx`
- **Props:** None (3 testimonials defined internally)
- **Visual:** Auto-rotating carousel (4s interval). Centered layout with decorative `"` quote mark. Testimonial text in heading font, italic. Dot navigation indicators. Active dot uses accent colour, inactive uses border colour.

#### 5.1.7 Contact

- **File:** `src/components/Contact.tsx`
- **Props:** None
- **Visual:** Two-column grid (info left, form right). Info column has section tag, heading, description, phone/email/location with Lucide icons. Social buttons: WhatsApp (green `#25D366`) and Instagram (gradient border). Form column detailed in [Forms section](#8-forms).

#### 5.1.8 Footer

- **File:** `src/components/Footer.tsx`
- **Props:** None
- **Visual:** `bg-foreground text-background` (inverted colours). Three-column grid: brand name + tagline, quick links, social/contact. Bottom divider with copyright. Link hover: `/70` → full opacity.

#### 5.1.9 FadeInWhenVisible

- **File:** `src/components/FadeInWhenVisible.tsx`
- **Props:** `children: ReactNode`, `className?: string`, `delay?: number` (stagger ms), `threshold?: number` (default 0.12)
- **Visual:** Wrapper div, fades up 22px on viewport entry. Cubic-bezier ease: `0.25, 0.46, 0.45, 0.94`, 650ms duration. Fires once (disconnects observer).

### 5.2 shadcn/ui Components (Installed)

All located in `src/components/ui/`. Standard shadcn/ui implementations with CVA variants. Only components **actively used** in the app are marked with ✅.

| Component | File | Actively Used | Key Variants |
|---|---|---|---|
| ✅ Button | `button.tsx` | Indirect (CVA defined) | variant: `default`, `destructive`, `outline`, `secondary`, `ghost`, `link`; size: `default` (h-10), `sm` (h-9), `lg` (h-11), `icon` (h-10 w-10) |
| ✅ Sheet | `sheet.tsx` | Header mobile menu | side: `top`, `bottom`, `left`, `right` (default right); overlay: `bg-black/80` |
| ✅ Card | `card.tsx` | Available | `rounded-lg border bg-card shadow-sm`; sub-components: Header, Title, Description, Content, Footer |
| ✅ Input | `input.tsx` | Available | `h-10 rounded-md border-input bg-background`; focus: ring-2 ring-ring |
| ✅ Badge | `badge.tsx` | Available | `rounded-full border px-2.5 py-0.5 text-xs`; variant: `default`, `secondary`, `destructive`, `outline` |
| ✅ Tooltip | `tooltip.tsx` | Providers wrapper | — |
| ✅ Toaster | `toaster.tsx`, `sonner.tsx` | Layout wrapper | — |
| Toast | `toast.tsx`, `use-toast.ts` | Available | variant: `default`, `destructive` |
| Accordion | `accordion.tsx` | Available | — |
| Alert Dialog | `alert-dialog.tsx` | Available | — |
| Alert | `alert.tsx` | Available | variant: `default`, `destructive` |
| Aspect Ratio | `aspect-ratio.tsx` | Available | — |
| Avatar | `avatar.tsx` | Available | — |
| Breadcrumb | `breadcrumb.tsx` | Available | — |
| Calendar | `calendar.tsx` | Available | — |
| Carousel | `carousel.tsx` | Available (Embla) | — |
| Chart | `chart.tsx` | Available (Recharts) | — |
| Checkbox | `checkbox.tsx` | Available | — |
| Collapsible | `collapsible.tsx` | Available | — |
| Command | `command.tsx` | Available (cmdk) | — |
| Context Menu | `context-menu.tsx` | Available | — |
| Dialog | `dialog.tsx` | Available | — |
| Drawer | `drawer.tsx` | Available (vaul) | — |
| Dropdown Menu | `dropdown-menu.tsx` | Available | — |
| Form | `form.tsx` | Available (react-hook-form) | — |
| Hover Card | `hover-card.tsx` | Available | — |
| Input OTP | `input-otp.tsx` | Available | — |
| Label | `label.tsx` | Available | — |
| Menubar | `menubar.tsx` | Available | — |
| Navigation Menu | `navigation-menu.tsx` | Available | — |
| Pagination | `pagination.tsx` | Available | — |
| Popover | `popover.tsx` | Available | — |
| Progress | `progress.tsx` | Available | — |
| Radio Group | `radio-group.tsx` | Available | — |
| Resizable | `resizable.tsx` | Available | — |
| Scroll Area | `scroll-area.tsx` | Available | — |
| Select | `select.tsx` | Available | — |
| Separator | `separator.tsx` | Available | — |
| Sidebar | `sidebar.tsx` | Available | — |
| Skeleton | `skeleton.tsx` | Available | — |
| Slider | `slider.tsx` | Available | — |
| Switch | `switch.tsx` | Available | — |
| Table | `table.tsx` | Available | — |
| Tabs | `tabs.tsx` | Available | — |
| Textarea | `textarea.tsx` | Available | — |
| Toggle | `toggle.tsx` | Available | — |
| Toggle Group | `toggle-group.tsx` | Available | — |

### 5.3 Custom Hooks

| Hook | File | Purpose |
|---|---|---|
| `useIsMobile()` | `src/hooks/use-mobile.tsx` | Returns `boolean` — `true` when viewport < 768px. Uses `matchMedia` listener. |
| `useToast()` | `src/hooks/use-toast.ts` | Re-exports from `@/components/ui/use-toast` |

---

## 6. Page Breakdown

### 6.1 Home Page

- **Route:** `/`
- **File:** `src/app/page.tsx`
- **Layout wrapper:** `min-h-screen bg-background`

**Section order (top to bottom):**

| # | Section | Component | ID |
|---|---|---|---|
| 1 | Header (fixed) | `<Header />` | — |
| 2 | Hero | `<Hero />` | `#home` |
| 3 | About | `<About />` | `#about` |
| 4 | Gallery | `<Gallery />` | `#gallery` |
| 5 | Packages | `<Packages />` | `#packages` |
| 6 | Testimonials | `<Testimonials />` | — |
| 7 | Contact | `<Contact />` | `#contact` |
| 8 | Footer | `<Footer />` | — |

**Layout hierarchy:**
```
<div class="min-h-screen bg-background">
  <Header />                         ← fixed, z-50
  <main>
    <Hero />                          ← min-h-screen, 2-col grid
    <About />                         ← 2-col grid, fade-in on scroll
    <Gallery />                       ← scroll-snap gallery (desktop), vertical stack (mobile)
    <Packages />                      ← bg-secondary, 3-col card grid
    <Testimonials />                  ← centered carousel
    <Contact />                       ← 2-col grid (info + form)
  </main>
  <Footer />                          ← inverted colours, 3-col grid
</div>
```

### 6.2 Gallery Page

- **Route:** `/gallery` (optional query param `?category=Newborn|Maternity|Kids|Events|Fashion|Wedding`)
- **File:** `src/app/gallery/page.tsx`
- **Categories:** `["Newborn", "Maternity", "Kids", "Events", "Fashion", "Wedding"]`
- **Images per category:** 9 placeholder images from picsum.photos (`900×1200`).

**Section order:**

| # | Section | Description |
|---|---|---|
| 1 | Header bar | "Portfolio" label + "Full Gallery" heading (left) + "Back Home" button (right) |
| 2 | Category tabs | Horizontally scrollable on mobile, centered wrap on desktop. Active tab has `border-b-2 border-accent` |
| 3 | Image grid | `grid-cols-1 sm:grid-cols-3 gap-4`. Each image `aspect-[3/4] rounded-sm`. Hover: subtle scale (1.02) + category text overlay |
| 4 | Lightbox | Full-screen overlay (`z-[100] bg-foreground/90`). Close button, left/right chevrons, keyboard nav (Esc, Arrow keys) |

**Layout hierarchy:**
```
<Suspense fallback={loading}>
  <div class="min-h-screen bg-background py-12 md:py-20">
    <div class="container mx-auto">
      Header row (flex)
      Category tabs (horizontal scroll mobile, flex-wrap desktop)
      Image grid (responsive grid)
    </div>
    Lightbox overlay (fixed, conditional)
  </div>
</Suspense>
```

### 6.3 Not Found Page

- **Route:** Any unmatched route
- **File:** `src/app/not-found.tsx`
- **Visual:** Centered `min-h-screen bg-gray-100`. 404 title, description, "Return to Home" link. Uses Tailwind default colours (not branded).

### 6.4 Root Layout

- **File:** `src/app/layout.tsx`
- **Metadata:** Title: "TummyToToes Studio", Description: "Capture your precious moments..."
- **Fonts loaded:** Cormorant Garamond + Jost from Google Fonts
- **Providers:** `QueryClientProvider` → `TooltipProvider` → children + `Toaster` + `Sonner`

---

## 7. Navigation System

### 7.1 Top Navigation (Header)

| Item | Label | Target |
|---|---|---|
| Home | Home | `#home` (smooth scroll) |
| About | About | `#about` (smooth scroll) |
| Gallery | Gallery | `/gallery` (page navigation via Next.js Link) |
| Packages | Packages | `#packages` (smooth scroll) |
| Contact | Contact | `#contact` (smooth scroll) |
| CTA | Book a Session | `#contact` (smooth scroll) |

### 7.2 Desktop Nav

- Standard horizontal flex layout: `hidden md:flex items-center gap-8`
- Text nav links: `font-body text-sm uppercase tracking-[0.15em] text-foreground/80 hover:text-foreground transition-colors`
- CTA button: `border border-foreground text-foreground px-5 py-2 rounded-sm hover:bg-foreground hover:text-background`

### 7.3 Mobile Nav (Sheet Drawer)

- Triggered by hamburger icon (`<Menu />` from Lucide, `h-6 w-6`) in top-right
- Uses shadcn/ui `Sheet` component with `side="right"`, `bg-background w-72 pt-12`
- Links: `font-body text-lg uppercase tracking-[0.15em] text-foreground/80`, `py-3 px-2`
- CTA: full-width outline button at bottom, `mt-4`
- Touch target: all buttons have `min-w-[44px] min-h-[44px]`

### 7.4 Logo

- Path: `/Logo/Logo.png`
- Mobile: `h-20 w-72`, centered (`justify-center`)
- Desktop: `md:h-16 md:w-56`, left-aligned (`md:justify-start`)
- Uses `object-contain`

### 7.5 Footer Navigation

- Quick Links section: Home, About, Gallery, Packages, Contact → all anchor links (`#section`)
- Connect section: email link, phone link, Instagram icon link
- Social icon: SVG Instagram icon `h-6 w-6`

### 7.6 Scroll Behavior

```css
html { scroll-behavior: smooth; }
```

Navigation uses `el.scrollIntoView({ behavior: "smooth" })` for in-page anchors.

---

## 8. Forms

### 8.1 Contact / Booking Enquiry Form

- **Location:** `src/components/Contact.tsx` (within Contact section on home page)
- **Submit action:** POST to `import.meta.env.VITE_GOOGLE_SCRIPT_URL` (Google Apps Script endpoint)

#### Fields

| Field | Label / Placeholder | Type | Required | Input Element |
|---|---|---|---|---|
| Full Name | "Full Name" | `text` | ✅ | `<input>` |
| Email Address | "Email Address" | `email` | ✅ | `<input>` |
| Phone Number | "Phone Number" | `tel` | ❌ | `<input>` |
| Session Type | "Session Type" | `select` | ✅ | `<select>` |
| Preferred Date | "Preferred Date" | `date` | ❌ | `<input>` |
| Your Message | "Your Message" | `textarea` | ❌ | `<textarea rows={4}>` |

#### Select Options (Session Type)

| Value | Label |
|---|---|
| `""` | Session Type (disabled placeholder) |
| `maternity` | Maternity |
| `newborn` | Newborn |
| `event` | Event |

#### Input Styling (shared `inputClass`)

```
w-full bg-transparent border-b border-border py-4
font-body text-sm text-foreground
placeholder:text-muted-foreground
focus:outline-none focus:border-accent transition-colors
```

- No visible border (transparent background, bottom border only)
- Focus state: border changes to accent colour
- Select has `appearance-none` (custom dropdown)
- Textarea has `resize-none`

#### Submit Button

```
w-full bg-foreground text-background
font-body text-sm uppercase tracking-[0.15em]
py-4 rounded-sm
hover:bg-foreground/90 transition-colors
disabled:opacity-50 disabled:cursor-not-allowed
min-h-[52px]
```

Text: "Send Enquiry" → "Sending..." while submitting.

#### Validation

- HTML5 native validation (`required` attribute)
- No client-side JS validation library (no Zod schemas in active use for this form)

#### Success/Error Handling

- Success: `alert()` + form reset
- Error: `alert()` with fallback suggestion (WhatsApp/email)

---

## 9. Animations & Transitions

### 9.1 CSS Keyframe Animations

#### `fade-up`
```css
@keyframes fade-up {
  0%   { opacity: 0; transform: translateY(30px); }
  100% { opacity: 1; transform: translateY(0); }
}
.animate-fade-up { animation: fade-up 0.8s ease-out forwards; }
```
Used in Hero section with stagger delays.

#### `marquee`
```css
@keyframes marquee {
  0%   { transform: translateX(0); }
  100% { transform: translateX(-50%); }
}
.animate-marquee { animation: marquee 30s linear infinite; }
```
Used in Hero bottom strip.

#### `gallery-blink` (scroll-driven)
```css
@keyframes gallery-blink {
  0%, 100% { filter: blur(0.55rem) contrast(1.15); opacity: 0; visibility: hidden; }
  50%      { filter: blur(0) contrast(1); opacity: 1; visibility: visible; }
}
```
Uses `animation-timeline: --gallery-step` (scroll-driven animation, `@supports (animation-timeline: view())`).

#### `accordion-down` / `accordion-up`
```css
accordion-down: { from: height 0, to: height var(--radix-accordion-content-height) } 0.2s ease-out
accordion-up:   { reverse }
```

#### Stagger Delay Utilities
```
.animation-delay-200 { animation-delay: 200ms; }
.animation-delay-400 { animation-delay: 400ms; }
.animation-delay-600 { animation-delay: 600ms; }
```

### 9.2 Transition Patterns

| Context | Transition |
|---|---|
| General colour transitions | `transition-colors` (150ms default) |
| Section fade-in on scroll (About, Packages, Contact) | `transition-all duration-700` on `opacity` + `translate-y` |
| Gallery image reveal | `opacity 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)` |
| Gallery copy reveal | `opacity 0.7s, transform 0.7s` with 120ms delay, same cubic-bezier |
| FadeInWhenVisible | `opacity + transform 0.65s cubic-bezier(0.25, 0.46, 0.45, 0.94)` with configurable delay |
| Package card hover | `transition-transform hover:-translate-y-1 duration-300` |
| Gallery image hover (gallery page) | `transition-transform duration-500 group-hover:scale-[1.02]` |
| Testimonial crossfade | `transition-opacity duration-700` |
| Header scroll state | `transition-all duration-300` |
| Gallery dot indicator position | `transition: transform 220ms ease` |
| Gallery dots hover | `transition: transform 180ms ease, border-color 180ms ease` + `scale(1.1)` |
| Sheet component | `data-[state=closed]:duration-300 data-[state=open]:duration-500` |

### 9.3 IntersectionObserver Usage

| Component | Threshold | Effect |
|---|---|---|
| About | 0.2 | Fade-in + slide-up (once) |
| Packages | 0.2 | Fade-in + slide-up (once) |
| Contact | 0.1 | Fade-in + slide-up (once) |
| FadeInWhenVisible | 0.12 (default) | Fade-in + slide-up (once) |

---

## 10. Responsive Rules

### 10.1 Tailwind Breakpoint Usage Summary

| Breakpoint | Layout Changes |
|---|---|
| **Default (mobile-first)** | Single column, stacked sections, full-width buttons, smaller text, hamburger menu |
| **`sm` (≥ 640px)** | Side-by-side buttons, larger text sizes, 3-column gallery grid |
| **`md` (≥ 768px)** | 2-column/3-column grids, desktop nav, increased padding/gaps, larger headings |
| **`lg` (≥ 1024px)** | Hero heading scales to `text-7xl` |

### 10.2 Custom CSS Media Queries

#### Desktop Scrollbar (≥ 768px)
```css
@media (min-width: 768px) {
  * {
    scrollbar-width: thin;
    scrollbar-color: hsl(var(--foreground) / 0.55) transparent;
  }
  *::-webkit-scrollbar { width: 10px; height: 10px; }
  *::-webkit-scrollbar-button { display: none; }
  *::-webkit-scrollbar-track { background: transparent; }
  *::-webkit-scrollbar-thumb {
    background-color: hsl(var(--foreground) / 0.55);
    border-radius: 999px;
    border: 2px solid transparent;
    background-clip: padding-box;
    min-height: 88px;
  }
  *::-webkit-scrollbar-thumb:hover {
    background-color: hsl(var(--foreground) / 0.78);
  }
}
```

#### Desktop Gallery Scroll (≥ 768px)
```css
@media (min-width: 768px) {
  .gallery-scroll-content {
    grid-template-columns: minmax(0, 1.1fr) minmax(0, 1fr);
    gap: 3rem;
    padding: 2rem;
  }
}
```

#### Mobile Gallery Override (≤ 767px)
```css
@media (max-width: 767px) {
  .gallery-scroll-shell {
    overflow: visible !important;
    height: auto !important;
    scroll-snap-type: none !important;
    padding-right: 0 !important;
    display: flex !important;
    flex-direction: column !important;
    gap: 5rem !important;
  }

  .gallery-scroll-indicator,
  .gallery-scroll-active-dot {
    display: none !important;          /* Hide dot indicator */
  }

  .gallery-scroll-step {
    height: auto !important;
    scroll-snap-align: none !important;
  }

  .gallery-scroll-content {
    position: static !important;
    height: auto !important;
    display: grid !important;
    grid-template-columns: 1fr 1fr !important;  /* Image left, text right */
    align-items: center !important;
    gap: 1.25rem !important;
    padding: 0 !important;
  }

  .gallery-scroll-media {
    width: 100% !important;
  }

  .gallery-scroll-media img {
    aspect-ratio: 3 / 4 !important;
    border-radius: calc(var(--radius) * 0.75) !important;
  }

  .gallery-scroll-copy {
    width: 100% !important;
    align-self: center !important;
    display: flex !important;
    flex-direction: column !important;
    justify-content: center !important;
  }
}
```

### 10.3 Responsive Component Behaviours

| Component | Mobile | Desktop |
|---|---|---|
| **Header** | 3-col grid: spacer/logo/hamburger. Logo centered, larger (`h-20 w-72`). Sheet drawer for nav. | Flex: logo left, nav right. Logo smaller (`h-16 w-56`). Horizontal nav links. |
| **Hero** | Image first (order), text below. Full-width CTAs. Smaller text. | 2-col grid, text left, image right. Inline CTAs. |
| **About** | Stacked: image, then text. Less vertical padding. | 2-col grid side by side. |
| **Gallery (home)** | Vertical stack (`flex column gap-5rem`). Image left + text right per panel (2-col grid). No scroll-snap, no dot indicator. | Scroll-snap vertical gallery with sticky panels, dot navigation, blur transitions. |
| **Gallery (page)** | Category tabs horizontally scrollable. Single-col image grid. | Tabs centered/wrapped. 3-col image grid. |
| **Packages** | Stacked cards, single column. | 3-col grid, featured card slightly scaled up. |
| **Contact** | Stacked: info block, then form. Full-width social buttons. | 2-col grid side by side. Inline social buttons. |
| **Footer** | Stacked, center-aligned text. | 3-col grid, left-aligned text. |

### 10.4 Touch Targets

- Hamburger button: `min-w-[44px] min-h-[44px]` (meets WCAG 2.5.8)
- Mobile nav links: `py-3 px-2` with `text-lg`
- Mobile CTA: `py-3.5`, `w-full`, `min-h-[48px]`
- Social buttons: `min-h-[48px]`
- Contact info links: `min-h-[44px]`
- Testimonial dots: `w-3 h-3` with `p-2 box-content` (effective 28×28px)
- Form submit: `min-h-[52px]`

### 10.5 Mobile-specific Text Sizing

| Element | Mobile | Desktop |
|---|---|---|
| H1 (Hero) | `text-3xl` (30px) | `md:text-6xl lg:text-7xl` (60–72px) |
| H2 (Section) | `text-3xl` (30px) | `md:text-5xl` (48px) |
| Hero subtag | `text-[10px]` | `sm:text-sm` (14px) |
| Marquee | `text-[10px]` | `sm:text-xs` (12px) |
| Gallery desc | `text-sm` (14px) | `md:text-lg` (18px) |
| Nav links | `text-lg` (18px, in sheet) | `text-sm` (14px) |

---

## Appendix A: File Structure Reference

```
src/
├── app/
│   ├── globals.css              ← Global styles, CSS variables, gallery CSS, animations
│   ├── layout.tsx               ← Root layout, metadata, Google Fonts, providers
│   ├── page.tsx                 ← Home page (all sections composed)
│   ├── not-found.tsx            ← 404 page
│   ├── providers.tsx            ← QueryClient + TooltipProvider
│   └── gallery/
│       └── page.tsx             ← Full gallery page with category tabs + lightbox
├── components/
│   ├── Header.tsx               ← Fixed navigation bar
│   ├── Hero.tsx                 ← Hero section with marquee
│   ├── About.tsx                ← About photographer section
│   ├── Gallery.tsx              ← Home page gallery scroll section
│   ├── Packages.tsx             ← Pricing cards section
│   ├── Testimonials.tsx         ← Auto-rotating testimonial carousel
│   ├── Contact.tsx              ← Contact info + booking form
│   ├── Footer.tsx               ← Site footer
│   ├── FadeInWhenVisible.tsx    ← Reusable scroll-triggered fade wrapper
│   └── ui/                     ← 49 shadcn/ui components
├── hooks/
│   ├── use-mobile.tsx           ← Mobile breakpoint hook (768px)
│   └── use-toast.ts             ← Toast re-export
├── lib/
│   └── utils.ts                 ← cn() utility (clsx + tailwind-merge)
├── App.css                      ← Legacy Vite/React CSS (mostly unused)
└── vite-env.d.ts                ← Vite types (legacy)
```

## Appendix B: Gallery Scroll System (Desktop)

The desktop gallery uses a custom scroll-snap system with CSS scroll-driven animations:

```
.gallery-scroll-shell
  ├── height: clamp(24rem, calc(100dvh - 10rem), 48rem)
  ├── overflow-y: auto
  ├── scroll-snap-type: y mandatory
  ├── scroll-timeline-name: --gallery-scroll
  ├── scrollbar-width: none (hidden)
  │
  ├── .gallery-scroll-indicator (sticky, right side)
  │   ├── .gallery-scroll-active-dot (position animated via CSS var --indicator-index)
  │   └── <ol> with <li><button> dots
  │
  └── .gallery-scroll-step (× 5 panels)
      ├── height: same as shell
      ├── scroll-snap-align: start
      ├── view-timeline-name: --gallery-step
      │
      └── .gallery-scroll-content (sticky top:0)
          ├── grid (1fr on mobile, 1.1fr 1fr on desktop)
          ├── .gallery-scroll-media (image)
          └── .gallery-scroll-copy (text)
```

JS sync in `Gallery.tsx`: scroll listener calculates `activeStep = Math.round(scrollTop / clientHeight)`, updates dot indicator via React state → CSS variable `--indicator-index`.

## Appendix C: Design Language Summary

**Overall aesthetic:** Warm, editorial, minimalist photography portfolio. Neutral earth-tone palette (warm whites, beiges, soft browns) with a muted gold accent. Typography-driven design combining an elegant serif display face (Cormorant Garamond) with a clean geometric sans-serif body (Jost). Generous whitespace, subtle fade-in animations on scroll, and restrained use of shadows/borders. Inverted colour scheme for footer. The design conveys calm sophistication suitable for a newborn/maternity photography brand.

**Key design principles:**
- **Warm neutrals:** No cold greys. All neutrals lean warm (27° hue, brown tint)
- **Typography hierarchy:** Headings are large, light-weight serif. Body is clean sans-serif. Labels are uppercase with wide tracking
- **Subtle animation:** Scroll-triggered fade-ups (once only), smooth marquee, scroll-driven gallery blur transitions
- **High image density:** Photography is the hero — images use large, consistent aspect ratios
- **Minimal borders/shadows:** Borders are soft (same as secondary colour). Shadows only on feature cards
- **Uppercase labels:** All button text, nav links, section tags, and CTAs are uppercase with letter-spacing
