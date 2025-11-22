# Comporta Design 2026 - Landing Page Documentation

## Project Overview

**Comporta Design 2026** is a premium, bilingual (Portuguese/English) landing page for a design and culture event taking place in Comporta, Portugal, between April and May 2026. The website showcases a continuous cycle of design exhibitions, an author cinema program, and celebrates the intersection of design, architecture, culture, and community.

The landing page embodies the essence of Comporta—simplicity, authenticity, and respect for nature—through a clean, sophisticated design with subtle animations and modern interactions.

---

## Tech Stack

### Core Technologies
- **React 19** - Modern UI library with latest features
- **TypeScript** - Type-safe development
- **Vite** - Fast build tool and dev server
- **Tailwind CSS** (CDN) - Utility-first CSS framework for rapid styling

### Additional Libraries
- **@google/genai** - AI-powered chatbot integration
- **React DOM** - DOM rendering and Portal API for modals

### Fonts
- **Inter** - Primary sans-serif font for body text
- **Space Grotesk** - Display font for headings and emphasis

### Hosting & Development
- **Vite Dev Server** - Local development at `http://localhost:3000`
- **ES Modules** - Modern JavaScript module system via importmap

---

## Architecture

### Component Structure

```
App.tsx (Root)
├── Header (Sticky navigation)
├── Hero (Sticky background section)
├── About (Scroll-triggered animations)
├── Exhibitions (Interactive schedule with modal)
├── Cinema (Movie schedule)
├── Venue (Location information)
├── Sponsors (Marquee animation)
├── Contact (Contact form)
├── Organization (Organizer info)
├── Footer (Revealing footer)
└── Chatbot (AI assistant)
```

### State Management
- **Local State** - React `useState` for component-level state
- **Language Context** - Centralized language switching (PT/EN)
- **Modal State** - Portal-based modal rendering for exhibitions

### Content Management
All content is centralized in `constants.ts` with:
- **Type-safe interfaces** for all content structures
- **Bilingual support** via `LocalizedString` type
- **Rich text support** via `ComplexParagraph` type (links, bold text)
- **Exhibitor details** with images, descriptions, and external links

---

## Key Features

### 1. Bilingual Support
- Seamless PT/EN language switching
- All content managed through centralized constants
- Language selector in header with smooth transitions

### 2. Sticky Hero Section
- Hero section remains fixed while content scrolls over it
- Creates an elegant overlapping effect
- Z-index layering: Header (50) > Main (10) > Hero (-10)

### 3. Interactive Exhibitions
- **Hover Effects**: Cards scale and lift on hover with animated arrow
- **Modal System**: 
  - Rendered via React Portal for proper z-index layering
  - "Glassy Rise" animation (slide-up with fade)
  - Rounded corners with overflow handling
  - Sticky close button
  - Scrollbar layout shift prevention
  - Image gallery with 2-column grid
  - External links to websites and catalogs

### 4. Scroll Animations
- **About Section**: 
  - Intersection Observer for scroll-triggered animations
  - Staggered fade-in-up for paragraphs
  - Decorative vertical line and background SVG
  - Bold text support for emphasis
- **Hero Section**: Staggered entrance animations for text and image

### 5. Sponsors Marquee
- Continuous horizontal scroll animation
- Duplicated logos for seamless loop
- Pause on hover
- Large logo display (300x300px)
- Custom CSS animation (40s linear infinite)

### 6. Revealing Footer
- Fixed position at bottom (-z-20)
- Main content has bottom margin to create reveal effect
- Smooth transition as user scrolls

### 7. AI Chatbot
- Powered by Google Gemini AI
- Context-aware responses about the event
- Floating chat interface

---

## Design System

### Color Palette
```css
--soft-black: #111111    /* Primary text and accents */
--light-sand: #F5F2EC    /* Background */
--soft-gray: #E8E8E6     /* Borders and subtle backgrounds */
--medium-gray: #C8C8C8   /* Secondary elements */
```

### Typography
- **Headings**: Space Grotesk (400, 500, 700)
- **Body**: Inter (400, 500, 700)
- **Hierarchy**: 3xl-4xl for main headings, xl-2xl for subheadings

### Animations

#### Custom Keyframes
```javascript
fadeInUp: 0 → translateY(20px) to 1 → translateY(0)
scaleIn: 0 → scale(0.95) to 1 → scale(1)
scroll: translateX(0) to translateX(-50%)
slideUpFade: 0 → translateY(2rem) to 1 → translateY(0)
fadeIn: 0 → 1
```

#### Animation Classes
- `animate-fade-in-up` - 0.8s ease-out (Hero text)
- `animate-scale-in` - 1s ease-out (Hero image)
- `animate-scroll` - 40s linear infinite (Sponsors)
- `animate-slide-up-fade` - 0.4s cubic-bezier (Modal entrance)
- `animate-backdrop-fade` - 0.3s ease-out (Modal backdrop)

### Spacing & Layout
- **Container**: Max-width 7xl (1280px) with horizontal padding
- **Sections**: Vertical padding 20-32 (responsive)
- **Scroll offset**: 28 units for sticky header compensation

---

## Technical Highlights

### 1. React Portal for Modals
Modals are rendered outside the main DOM hierarchy using `createPortal(element, document.body)`, ensuring proper z-index layering above the sticky header.

### 2. Scrollbar Layout Shift Prevention
When the modal opens and body scroll is disabled:
```javascript
const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
document.body.style.paddingRight = `${scrollbarWidth}px`;
```
This prevents the jarring "shake" effect when the scrollbar disappears.

### 3. Intersection Observer for Scroll Animations
The About section uses the Intersection Observer API to trigger animations when elements enter the viewport:
```javascript
useEffect(() => {
  const observer = new IntersectionObserver(
    (entries) => entries.forEach(entry => {
      if (entry.isIntersecting) setIsVisible(true);
    }),
    { threshold: 0.1 }
  );
  // ...
});
```

### 4. Complex Content Rendering
Support for rich text with links and bold formatting:
```typescript
type ComplexParagraph = {
  type: 'complex';
  content: {
    [key in Language]: (string | { text: string; url?: string; bold?: boolean })[];
  };
};
```

### 5. Smooth Scroll Behavior
Global CSS ensures smooth scrolling:
```css
html { scroll-behavior: smooth; }
```

---

## File Structure

```
ComportaDesign2026/
├── index.html              # Entry point with Tailwind config
├── index.tsx               # React app initialization
├── App.tsx                 # Root component with routing
├── types.ts                # TypeScript type definitions
├── constants.ts            # Centralized content and data
└── components/
    ├── Header.tsx          # Sticky navigation
    ├── Hero.tsx            # Hero section
    ├── About.tsx           # About section with animations
    ├── Exhibitions.tsx     # Exhibition schedule with modal
    ├── Cinema.tsx          # Cinema program
    ├── Venue.tsx           # Venue information
    ├── Sponsors.tsx        # Sponsors marquee
    ├── Contact.tsx         # Contact form
    ├── Organization.tsx    # Organizer info
    ├── Footer.tsx          # Footer
    └── Chatbot.tsx         # AI chatbot
```

---

## Performance Optimizations

1. **CDN-based Tailwind** - No build step for CSS
2. **Font preconnect** - Faster Google Fonts loading
3. **ES Module imports** - Modern, efficient module loading
4. **Minimal dependencies** - Only essential libraries
5. **CSS animations** - Hardware-accelerated transforms
6. **Lazy rendering** - Modals only render when opened

---

## Accessibility Features

- **Semantic HTML** - Proper heading hierarchy, sections, and landmarks
- **ARIA labels** - Screen reader support for interactive elements
- **Keyboard navigation** - All interactive elements are keyboard accessible
- **Focus management** - Modal traps focus when open
- **Alt text** - All images have descriptive alt attributes
- **Color contrast** - WCAG AA compliant color combinations

---

## Browser Compatibility

- **Modern browsers** - Chrome, Firefox, Safari, Edge (latest versions)
- **ES2020+** - Modern JavaScript features
- **CSS Grid & Flexbox** - Modern layout techniques
- **Backdrop filter** - For glassmorphism effects (with fallbacks)

---

## Development Workflow

### Running Locally
```bash
npm install
npm run dev
```
Server runs at `http://localhost:3000`

### Build for Production
```bash
npm run build
```

### Preview Production Build
```bash
npm run preview
```

---

## Future Enhancements

- [ ] Exit animations for modal
- [ ] Image lazy loading
- [ ] Progressive Web App (PWA) support
- [ ] Analytics integration
- [ ] Newsletter signup
- [ ] Social media integration
- [ ] Event calendar integration
- [ ] Ticket booking system

---

## Credits

**Design Philosophy**: Inspired by Comporta's essence—simplicity, authenticity, and respect for nature.

**Event Partners**: Fundação Herdade da Comporta, Tróia Design Hotel, Polestar, Dils, Huître, Home-tec, TUU, CÊ Studio Comporta.

**Cinema Curation**: Francisco Ferreira

---

*Built with care for the Comporta Design 2026 event.*
