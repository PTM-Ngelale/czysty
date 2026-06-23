# Laundry Website Landing Page — Build Guide

This guide walks you through building a laundry business landing page using the Grit Quad Arena site as a structural template. Every section, component, and styling decision maps directly to patterns already proven in this codebase — you're adapting, not rebuilding.

---

## Project Setup

Clone the Grit Quad repo and rename it, or scaffold a fresh Next.js app:

```bash
npx create-next-app@latest laundry-site --typescript --tailwind --app
```

Copy these files/folders directly — they need minimal changes:

| Source | What to keep |
|---|---|
| `hooks/useScrollReveal.ts` | Unchanged — scroll animations work for any site |
| `components/ScrollRevealProvider.tsx` | Unchanged |
| `app/globals.css` | Keep `.grit-btn` pattern, rename colour variables |
| `tailwind.config.ts` | Rename `grit-*` colours to your brand palette |
| `app/layout.tsx` | Swap fonts and metadata only |

---

## Colour System (Adapt from Grit's Palette)

Grit uses six semantic colour tokens. Replace them with your laundry brand colours in `tailwind.config.ts`:

```ts
// tailwind.config.ts
colors: {
  // Rename grit-* → wash-* (or your brand prefix)
  'wash-black':  '#0F0F0F',   // grit-black  → deep background
  'wash-blue':   '#1A6FB5',   // grit-orange → primary accent (CTA buttons, highlights)
  'wash-cream':  '#F5F0E8',   // grit-white  → light text / off-white backgrounds
  'wash-light':  '#E8F4FD',   // grit-sand   → soft accent (labels, section tags)
  'wash-grey':   '#1C1C1C',   // grit-grey   → card/section backgrounds
  'wash-muted':  '#6B6B6B',   // grit-muted  → secondary text
}
```

Then do a global find-and-replace in all components: `grit-black` → `wash-black`, `grit-orange` → `wash-blue`, etc.

**Colour role reference:**
- `wash-black` — page background, footer, hero overlay
- `wash-blue` — CTA buttons, section accents, numbered highlights
- `wash-cream` — all body text on dark backgrounds
- `wash-light` — section tag labels ("OUR SERVICES"), warm image tones
- `wash-grey` — alternating section backgrounds (cards, service rows)
- `wash-muted` — footnotes, placeholder text

---

## Typography (layout.tsx)

Swap fonts in `app/layout.tsx`. Grit uses **Bebas Neue** (display) + **Inter** (body). For a laundry brand, consider:

| Role | Grit choice | Laundry suggestion |
|---|---|---|
| Display / headings | Bebas Neue (bold, dramatic) | **Syne** or **DM Serif Display** (cleaner, trustworthy) |
| Body / UI | Inter | **Inter** (keep it — universally readable) |

```ts
// app/layout.tsx
import { Syne, Inter } from 'next/font/google'

const syne = Syne({ subsets: ['latin'], weight: ['700', '800'], variable: '--font-display' })
const inter = Inter({ subsets: ['latin'], variable: '--font-body' })
```

Keep the `--font-display` / `--font-body` variable names — Tailwind config and component classes reference these.

Update the `<html>` tag metadata:
```ts
export const metadata = {
  title: 'Wash & Fold — Premium Laundry Service',
  description: 'Professional laundry, dry cleaning, and delivery in [City].',
}
```

---

## Page Structure

The page renders sections in order. Map each Grit section to its laundry equivalent:

| # | Grit Component | Laundry Equivalent | Section ID |
|---|---|---|---|
| 1 | `ScrollRevealProvider` | Keep unchanged | — |
| 2 | `Navbar` | `Navbar` | — |
| 3 | `Hero` | `Hero` | `#home` |
| 4 | `About` | `About` / Trust section | `#about` |
| 5 | `Experiences` | `Services` | `#services` |
| 6 | `HowItWorks` | `HowItWorks` | `#how-it-works` |
| 7 | `Gallery` | `Gallery` / Before-After | `#gallery` |
| 8 | `Pricing` | `Pricing` | `#pricing` |
| 9 | `Testimonials` | `Testimonials` | `#reviews` |
| 10 | `BookingCTA` | `OrderCTA` | — |
| 11 | `Contact` | `Contact` | `#contact` |
| 12 | `Footer` | `Footer` | — |

---

## Section-by-Section Guide

### Navbar

**Grit file:** `components/Navbar.tsx`

Change the `navLinks` array and logo only:

```ts
const navLinks = [
  { href: '#services',    label: 'Services' },
  { href: '#how-it-works', label: 'How It Works' },
  { href: '#pricing',     label: 'Pricing' },
  { href: '#reviews',     label: 'Reviews' },
  { href: '#contact',     label: 'Contact' },
]
```

Replace `images/logo.jpg` with your logo. The mobile hamburger, fixed positioning, and scroll-shadow behaviour are reusable unchanged.

---

### Hero

**Grit file:** `components/Hero.tsx`

Grit's Hero uses a fullscreen background video with a dark overlay, a large display heading, a sub-heading, and two CTA buttons. Replace the copy and media:

```
Background: swap videos/ride-drift.MOV → your laundry/operations video, or use a high-quality
            still image with `bg-cover bg-center` if you don't have video
Heading:    "CLEAN CLOTHES. DELIVERED."  (keep Bebas Neue / font-display, text-8xl)
Sub-copy:   "Same-day pickup and delivery. Professional cleaning you can trust."
CTA 1:      "Schedule a Pickup"  → href="#contact" or /booking
CTA 2:      "See Our Services ↓" → href="#services"
```

The hero's bottom info bar in Grit shows location/activity stats. Replace with trust signals:
```
✓ Same-Day Delivery  |  ✓ Eco-Friendly Detergents  |  ✓ 48-Hr Turnaround
```

---

### About

**Grit file:** `components/About.tsx`

Two-column layout: text left, image right. The three stat boxes (400+ Riders, 3 Activities, Fri & Sat) become laundry trust metrics:

```
Left column — copy:
  Tag:     "WHO WE ARE"
  Heading: "Laundry Done Right, Every Time"
  Body:    2-3 short paragraphs about your service, values, and coverage area

Stats grid (3 boxes):
  Box 1: "2,000+" / "Loads Completed"
  Box 2: "4.9★"   / "Average Rating"
  Box 3: "24 hrs" / "Avg Turnaround"

Right column — image:
  Replace track-shot-1.jpg → a clean photo of your facilities or folded laundry
```

---

### Services (was Experiences)

**Grit file:** `components/Experiences.tsx`

Grit maps over two arrays: `activities` (3 main cards) and `trackModes` (2 smaller cards). For laundry:

**Main service cards (3):**
```ts
const services = [
  {
    tag: 'WASH & FOLD',
    title: 'Everyday Laundry',
    description: 'Washed, dried, and neatly folded. Priced per kg.',
    image: '/images/wash-fold.jpg',
    cta: 'See Pricing',
    ctaHref: '#pricing',
  },
  {
    tag: 'DRY CLEANING',
    title: 'Delicate & Formal Wear',
    description: 'Professional dry cleaning for suits, dresses, and delicates.',
    image: '/images/dry-clean.jpg',
    cta: 'See Pricing',
    ctaHref: '#pricing',
  },
  {
    tag: 'DELIVERY',
    title: 'Pickup & Delivery',
    description: 'We collect from your door and return clean within 24–48 hours.',
    image: '/images/delivery.jpg',
    cta: 'Schedule Pickup',
    ctaHref: '#contact',
  },
]
```

**Add-on cards (2, replaces trackModes):**
```ts
const addons = [
  { tag: 'IRONING', title: 'Press & Iron', description: 'Crisp results, per item pricing.' },
  { tag: 'STAIN REMOVAL', title: 'Specialist Treatment', description: 'Stubborn stains handled with care.' },
]
```

The card layout, image overlays, and hover effects carry over unchanged.

---

### How It Works

**Grit file:** `components/HowItWorks.tsx`

Grit has 4 numbered steps. Replace with the laundry order flow:

```ts
const steps = [
  { number: '01', title: 'Schedule a Pickup', description: 'Book online or WhatsApp us. Choose your preferred pickup window.' },
  { number: '02', title: 'We Collect',         description: 'Our driver arrives at your door and collects your laundry bag.' },
  { number: '03', title: 'We Clean',           description: 'Your clothes are washed, dried, and folded at our facility.' },
  { number: '04', title: 'Delivered Back',     description: 'Clean laundry returned to your door within 24–48 hours.' },
]
```

The numbered circle connectors, responsive stacking, and dark background are unchanged.

---

### Gallery

**Grit file:** `components/Gallery.tsx`

Grit shows 6 images in a 3×2 grid with hover overlays. Use this for:
- Before/after treatment shots
- Facility interior photos
- Team at work
- Packaged/folded garments

Replace `galleryItems` array:
```ts
const galleryItems = [
  { src: '/images/facility-interior.jpg', alt: 'Our facility', category: 'FACILITY' },
  { src: '/images/folded-clothes.jpg',    alt: 'Folded laundry', category: 'RESULTS' },
  { src: '/images/pickup-driver.jpg',     alt: 'Pickup driver', category: 'DELIVERY' },
  { src: '/images/dry-cleaning.jpg',      alt: 'Dry cleaning rack', category: 'DRY CLEAN' },
  { src: '/images/ironing.jpg',           alt: 'Pressing clothes', category: 'IRONING' },
  { src: '/images/team-photo.jpg',        alt: 'Our team', category: 'TEAM' },
]
```

---

### Pricing

**Grit file:** `components/Pricing.tsx`

Grit's pricing is the most complex component — multiple sub-sections with different layouts. For laundry, simplify to 3 sub-sections:

**Sub-section 1 — Wash & Fold (cards, mirrors Grit's `soloRides`):**
```ts
const washFoldRates = [
  { label: 'Small Bag',  detail: 'Up to 5kg',  price: '₦2,500',  featured: false },
  { label: 'Medium Bag', detail: 'Up to 10kg', price: '₦4,500',  featured: true  },
  { label: 'Large Bag',  detail: 'Up to 15kg', price: '₦6,000',  featured: false },
  { label: 'Bulk',       detail: '15kg+',      price: 'Custom',  featured: false },
]
```

**Sub-section 2 — Dry Cleaning (table, mirrors Grit's `groupRates`):**
```ts
const dryCleanRates = [
  { item: 'Suit (2-piece)',  price: '₦3,500' },
  { item: 'Dress',          price: '₦2,500' },
  { item: 'Shirt / Blouse', price: '₦1,200' },
  { item: 'Duvet / Bedding', price: '₦5,000' },
]
```

**Sub-section 3 — Add-ons:**
```ts
const addons = [
  { label: 'Ironing',         detail: 'Per item',    price: '₦300' },
  { label: 'Stain Treatment', detail: 'Per garment', price: '₦500' },
  { label: 'Express (12hr)',  detail: 'Surcharge',   price: '+50%' },
]
```

The featured card highlight (`border-2 border-wash-blue`) and section tags carry over from Grit.

---

### Testimonials

**Grit file:** `components/Testimonials.tsx`

Replace `testimonials` array data only:

```ts
const testimonials = [
  {
    quote: "They picked up Monday morning and delivered Tuesday evening. Everything was perfectly folded and smelled amazing.",
    name: "Chioma A.",
    label: "Regular Customer",
  },
  {
    quote: "My work shirts have never looked this crisp. The dry cleaning is genuinely better than what I used to pay double for elsewhere.",
    name: "Tunde B.",
    label: "Dry Cleaning Customer",
  },
  {
    quote: "The WhatsApp scheduling is so easy. I don't even have to think about laundry anymore.",
    name: "Adaeze M.",
    label: "Weekly Subscriber",
  },
]
```

The 5-star rating display, card borders, and 3-column grid are unchanged.

---

### Order CTA (was BookingCTA)

**Grit file:** `components/BookingCTA.tsx`

Replace copy and button links. Keep the full-width accent-coloured section layout:

```
Heading:  "READY FOR CLEAN CLOTHES?"
Sub-copy: "Book your first pickup in under 60 seconds."

Button 1: "Schedule Pickup Online"  → /booking or #contact
Button 2: "Call Us"                 → tel:+234XXXXXXXXX
Button 3: "WhatsApp"                → https://wa.me/234XXXXXXXXX
```

---

### Contact

**Grit file:** `components/Contact.tsx`

Two-column: contact details left, map right. Update all hardcoded data:

```
Address:  Your business address or service area
Phone:    Your number
Email:    Your support email
Hours:    Mon–Sat: 8am – 6pm
WhatsApp: Your WhatsApp business number

Google Maps iframe: Replace the src URL with your Google Maps embed for your location
```

For a delivery-only service with no walk-in premises, replace the map column with a service area info block or a simple order form.

---

### Footer

**Grit file:** `components/Footer.tsx`

Update three things only:
1. Brand name and tagline
2. `navLinks` array (same as Navbar)
3. Social icons and hrefs (Instagram, TikTok, WhatsApp — swap for your handles)

---

## Images Checklist

Replace Grit's images with your own. Minimum set needed:

| File name (suggested) | Used in | Notes |
|---|---|---|
| `logo.png` | Navbar | Transparent background, ~200×60px |
| `hero-bg.jpg` | Hero | 1920×1080 min, dark/busy scenes work best |
| `facility.jpg` | About | Clean, bright facility interior |
| `wash-fold.jpg` | Services card | Folded laundry, bright lighting |
| `dry-clean.jpg` | Services card | Hanging garments or dry cleaning rack |
| `delivery.jpg` | Services card | Driver or delivery bag |
| `gallery-1.jpg` through `gallery-6.jpg` | Gallery | Mix of facility, results, team |

If you don't have a hero video, use a static image with this Hero class swap:
```tsx
// Replace <video> block with:
<div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('/images/hero-bg.jpg')" }} />
```

---

## API Route (Booking/Contact Form)

Grit handles form submissions at `app/api/booking/route.ts` using Resend for email. For a laundry site:

1. Keep the same Resend setup (`npm install resend`)
2. Change the form fields:
   ```ts
   // Fields to collect:
   name, phone, email, address, serviceType, preferredPickupDate, notes
   ```
3. Update the email template in the route handler
4. Set `RESEND_API_KEY` in your `.env.local`

---

## Countdown Banner (Optional)

**Grit file:** `components/CountdownBanner.tsx`

If you have a launch date or a promo deadline, keep this component and update:
```ts
const EVENT_DATE = new Date('2026-08-01T09:00:00+01:00')  // your launch date
// Update banner copy: "We launch in..." or "50% off until..."
```

Remove the component from `app/page.tsx` if you don't need a countdown.

---

## Quick Start Checklist

- [ ] Scaffold Next.js project or clone Grit repo
- [ ] Copy `hooks/useScrollReveal.ts` and `components/ScrollRevealProvider.tsx`
- [ ] Update `tailwind.config.ts` — rename colour tokens
- [ ] Update `app/globals.css` — rename colour references in `.grit-btn` → `.wash-btn`
- [ ] Update `app/layout.tsx` — swap fonts and metadata
- [ ] Replace images in `public/images/`
- [ ] Update `Navbar.tsx` — nav links and logo
- [ ] Update `Hero.tsx` — heading, sub-copy, CTA links, background media
- [ ] Update `About.tsx` — copy, stats, image
- [ ] Rename `Experiences.tsx` → `Services.tsx` — update services array
- [ ] Update `HowItWorks.tsx` — steps array
- [ ] Update `Gallery.tsx` — galleryItems array and images
- [ ] Update `Pricing.tsx` — pricing arrays and sub-section labels
- [ ] Update `Testimonials.tsx` — testimonials array
- [ ] Rename `BookingCTA.tsx` → `OrderCTA.tsx` — copy and button links
- [ ] Update `Contact.tsx` — address, phone, hours, map embed
- [ ] Update `Footer.tsx` — brand name and social links
- [ ] Wire up `app/api/booking/route.ts` with laundry form fields
- [ ] Test all links, mobile responsiveness, and scroll animations
