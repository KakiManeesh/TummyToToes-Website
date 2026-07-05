# UI Design Brief — TummyToToes Photography Studio

> A concise guide to the brand's visual identity and design philosophy. Intended for an AI or designer to redesign the mobile experience while preserving brand essence. Layout creativity is encouraged — only the visual language should remain consistent.

---

## 1. Brand Overview

TummyToToes is a premium newborn, maternity, and family photography studio based in Hyderabad, India. The digital presence should feel like flipping through an elegant editorial photo book — warm, calm, and deeply personal.

**Aesthetic style:** Warm minimalism with editorial sophistication
**Visual tone:** Soft, intimate, unhurried — like a quiet morning with a newborn
**Mood keywords:** Gentle · Elevated · Warm · Intentional · Timeless

The design avoids anything loud, playful, or tech-forward. Every element should recede behind the photography, letting the images breathe.

---

## 2. Color Palette

### Primary Palette

| Role | Colour | Description |
|---|---|---|
| **Background** | `hsl(36, 33%, 96%)` · warm off-white | The dominant canvas — a creamy, warm white that feels softer than pure white |
| **Foreground / Text** | `hsl(24, 5%, 16%)` · dark warm brown | Used for headings, body text, and filled buttons. Not black — a warm charcoal |
| **Accent** | `hsl(33, 35%, 65%)` · muted gold | Highlights, labels, active indicators, focus rings. Conveys quiet luxury |
| **Secondary** | `hsl(27, 26%, 86%)` · warm beige | Subtle section backgrounds, borders, muted surfaces |
| **Muted Text** | `hsl(24, 5%, 35%)` · soft brown | Subdued body text, descriptions, placeholder text |

### Supporting Colours

| Role | Colour |
|---|---|
| Card surface | Pure white `#FFFFFF` |
| Destructive / Error | Warm red `hsl(0, 84%, 60%)` |
| WhatsApp CTA | `#25D366` (brand green) |
| Instagram border gradient | `#833ab4 → #fd1d1d → #fcb045` |

### Dark Mode

The palette inverts: the dark brown becomes the background, the warm white becomes the foreground. The gold accent remains unchanged, serving as a constant thread between modes.

### Key Principles

- **No cold greys.** Every neutral leans warm (brown undertone).
- **Low contrast for surfaces.** Background-to-card contrast is very subtle.
- **High contrast for text.** Foreground on background is always clearly legible.
- **Accent is never dominant.** Gold is used sparingly — labels, borders, dots, focus states.

---

## 3. Typography

### Font Families

| Role | Typeface | Style |
|---|---|---|
| **Display / Headings** | Cormorant Garamond | Elegant serif with calligraphic character. Used at large sizes, light weight. |
| **Body / UI** | Jost | Clean, geometric sans-serif. Used for paragraphs, buttons, labels, navigation. |

Both are loaded from Google Fonts.

### Heading Style

- Large, lightweight serif (Cormorant Garamond, weight 300)
- Generous size scaling — headings are intentionally oversized to create an editorial feel
- Minimal leading (tight line height ~1.1 for hero text)

### Body Text Style

- Clean sans-serif (Jost, weight 400)
- Comfortable reading size with relaxed line height
- Muted colour for descriptions — the text supports, never competes with imagery

### Labels, Buttons & Navigation

- All uppercase
- Wide letter-spacing (0.15em–0.35em)
- Small size — labels are intentionally diminutive and delicate
- Creates a refined, fashion-editorial feel

### Typographic Tone

The typography creates a clear hierarchy:
1. **Serif headlines** — emotional, elegant, set the mood
2. **Sans-serif body** — informative, legible, stays out of the way
3. **Uppercase micro-labels** — structural, editorial, adds sophistication

---

## 4. Visual Layout Principles

These principles define how the design should *feel*, not how it must be built.

- **Photography first.** Images are the hero. They should always be large, prominent, and beautifully framed. Never thumbnail-sized or treated as decoration.
- **Generous whitespace.** Sections breathe. There is always more space than feels "necessary" — this is intentional and communicates calm.
- **Editorial rhythm.** The page flows like a magazine spread: large image, then text, then a pause (whitespace), then the next section. Avoid visual clutter.
- **Soft transitions.** Elements fade in gently as you scroll. Nothing snaps, bounces, or draws attention to itself.
- **Minimal borders and shadows.** Separation is achieved through whitespace and colour, not hard lines.
- **Inverted footer.** The footer uses an inverted colour scheme (dark background, light text) to signal the end of the page and create a sense of closure.
- **Restraint.** If unsure whether to add a visual element, don't. The photography carries the design.

---

## 5. Core UI Components

### Header / Navigation

A fixed top bar that stays transparent over the hero and gains a soft background on scroll. Houses the logo and navigation links. On mobile, navigation collapses into a slide-out drawer from the right side.

**Logo:** A wide, horizontal wordmark image — centred on mobile, left-aligned on desktop.

**Navigation items:** Home, About, Gallery, Packages, Contact, and a "Book a Session" call-to-action.

### Hero Section

A full-screen opening statement. Features a large portrait-oriented photograph alongside the studio's tagline in oversized serif type. A continuous scrolling marquee strip at the bottom lists all photography categories. Two CTAs: "View Gallery" (filled) and "Book a Session" (outlined).

### About Section

A personal introduction to the photographer. Pairs a square portrait image with a warm, conversational text block. Aims to build trust and emotional connection.

### Gallery Section (Home)

A curated preview of five photography categories (Newborn, Maternity, Kids, Fashion, Events). Each panel shows a large cover image, a numbered label, the category title, and a short description. Links to the full gallery page filtered by category.

Ends with a "View Full Gallery" button.

### Package Cards

Three pricing cards on a subtle beige background. One card is visually elevated as the recommended option (slight scale, border accent, stronger shadow). Each card lists: session name, starting price, included features, and an "Enquire Now" button. Cards subtly lift on hover.

### Testimonial Carousel

An auto-rotating quote carousel. Features a decorative oversized quotation mark, the testimonial text in italic serif, and the client's name in uppercase sans-serif. Dot indicators for manual navigation.

### Contact Section

Split into two halves: contact information (phone, email, location with icons, WhatsApp and Instagram social buttons) and a booking enquiry form. The form uses a minimal bottom-border-only input style. Fields: Full Name, Email, Phone, Session Type (dropdown), Preferred Date, Message, and a Submit button.

### Footer

Full-width dark section (inverted colours). Three-column layout: brand name with tagline, quick links, and contact/social information. A thin border divider above the copyright line.

---

## 6. Page Structure

### Home Page

| Order | Section |
|---|---|
| 1 | Header (fixed, transparent → solid on scroll) |
| 2 | Hero (full-screen) |
| 3 | About |
| 4 | Gallery Preview |
| 5 | Packages |
| 6 | Testimonials |
| 7 | Contact |
| 8 | Footer |

All sections on the home page are linked via smooth in-page scrolling.

### Gallery Page

| Order | Section |
|---|---|
| 1 | Page header with "Back Home" button |
| 2 | Category filter tabs |
| 3 | Photo grid (filterable by category) |
| 4 | Lightbox overlay (opens on image click, supports keyboard & arrow navigation) |

Categories: Newborn, Maternity, Kids, Events, Fashion, Wedding.

---

## 7. Mobile Design Goals

The mobile redesign should prioritise experience over fidelity to the desktop layout. Feel free to reimagine section arrangements, component layouts, and interaction patterns.

### Priority Guidelines

- **Vertical scroll flow.** The mobile experience should feel like a single, continuous visual narrative. Avoid horizontal scrolls, carousels, or tabs that interrupt the flow (unless they significantly improve the experience).
- **Large, immersive imagery.** Photography should remain the centrepiece. Images should be full-width or near-full-width, with portrait-oriented aspect ratios that fill the screen.
- **Thumb-friendly interactions.** All tappable elements should be at least 44×44px. CTAs should be easy to reach — prefer bottom-of-screen placement for critical actions.
- **Reduced visual clutter.** Strip non-essential elements on mobile. Prioritise content hierarchy: image → headline → description → CTA.
- **Readable typography.** Body text should be comfortable at mobile sizes. Don't shrink heading sizes too aggressively — the oversized serif headlines are a core part of the brand identity.
- **Breathing room.** Maintain generous spacing between sections, even on mobile. Cramped layouts contradict the brand's calm, unhurried tone.
- **Fast perceived load.** Prioritise above-the-fold content. Consider lazy loading for below-fold images.

### What Can Change

- Section ordering and arrangement
- Grid structures and column counts
- Component internal layouts
- Spacing values — adapt to mobile conventions
- Animation intensity — simplify or remove for performance
- Navigation patterns — bottom sheet, full-screen menu, or other mobile-native patterns
- Gallery interaction model — swipe, grid, stacked cards, or other approaches

### What Must Stay

- The warm, neutral colour palette
- Cormorant Garamond for headings + Jost for body text
- The uppercase letter-spaced label style
- Large, high-quality photography as the visual anchor
- The overall feeling: warm, calm, intimate, elevated
