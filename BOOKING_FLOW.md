# BOOKING_FLOW.md — Multi-Step Booking Flow Spec

> Build brief for Claude Code. This documents a multi-step booking flow modeled on the Shaaré booking app (`book.getshaare.com`), to be re-implemented for a **laundry booking site**. **Every step below was verified from screenshots of the live flow** — the field-level detail is what's actually on each screen, not guessed.
>
> **Two deliberate changes from the reference** (per product decision):
> 1. **The "Get Matched" / staff-matching step is removed.** The reference, after checkout, assigned a specific staff member and held a slot for 10 minutes before payment. We do **not** do that.
> 2. **The checkout CTA goes straight to a payment platform (Paystack).** No staff assignment, no reservation/booking-code-then-pay flow. After "Review and checkout", the user pays directly.

---

## 0. Legend

- **[OBSERVED]** — confirmed from a screenshot. Build it this way.
- **[ADAPT]** — laundry-specific replacement for a cleaning concept (see §12 map).
- The reference is a cleaning service; "Sparkler" = the worker. We're building **laundry**, so default UI vocabulary to laundry terms (see §12).

---

## 1. Tech stack

The reference is **Next.js** (asset paths confirm it). Match that.

- **Framework:** Next.js (App Router), TypeScript.
- **State:** one client-side booking store (Zustand or React Context) that persists across steps. Persist to `localStorage` and rehydrate on mount so a refresh mid-flow keeps progress + the running total. The store is the source of truth.
- **Backend/persistence:** Supabase (Postgres) for `bookings`, plus catalog tables (services, add-ons, locations/transport fees).
- **Payments:** **Paystack** (the reference uses Paystack; pricing page confirms it). Final checkout CTA launches Paystack with the total payable. See §10. *(Paystack keys/details to be supplied later — leave them as env vars.)*
- **Routing:** one route per step (§5). Guard each step: if required earlier data is missing, redirect to the first incomplete step.

---

## 2. Layout — the shell every booking step shares

The reference uses a **two-column desktop layout** and a single column on mobile.

**Header (all steps)**
- Left: **back arrow** (`←`) → previous step.
- Center: **logo** + sub-line link "Click here to go to the [main site]" → marketing site.

**Banner strip (all steps)**
- Thin decorative horizontal image band under the header. [OBSERVED — reference uses repeating purple-gloved-hands artwork on light-purple. Swap for a laundry-themed band.]

**Progress indicator (all booking steps)**
- A horizontal row of **segmented bars** under the banner. Completed/current segments are filled dark; upcoming are light. One segment advances per step. [OBSERVED counts: service=1, space=2, address=3, schedule=4, extratasks=5, fullpicture=6, contact=7, summary=8, checkout=9.] The reference rendered a few extra trailing segments (for the matching/payment/confirmation steps we're collapsing) — you can drop those so the bar ends at checkout.
- A step with internal sub-steps (extra tasks: `1/2`, `2/2`) does **not** advance the bar between sub-steps.

**Right-hand summary panel (desktop) — the live order summary** [OBSERVED]
A sticky card on the right, visible from the `space` step onward, showing the booking as it's built:
- **Total order cost** — e.g. `₦24,975`
- **Estimated service duration** — e.g. `1 sparkler • ~8 hrs`
- **Personal Information** — name, phone, email
- **Address** — full address + landmark
- **Task** — service name; space description; frequency (e.g. `Once off`); weekday; date; arrival window (e.g. `9am-12pm (Sparkler arrival time)`)
- **Extra Tasks** — e.g. `1x Ironing: Once off`

**Sticky footer (mobile, and present on desktop too) — the running cart** [OBSERVED]
- Left: **"Total amount"** + sub-line **staff count • est. duration** (`1 sparkler • ~8 hrs`).
- Right: **live total** in Naira, thousands-separated (`₦24,975`). While recalculating it shows **"Calculating…"**.
- Below: **Back** (outlined pill) + **Next** (solid accent pill). Next disabled until the step is valid.

**Design tokens [OBSERVED — replace with your brand]**
- Primary CTA / active selection: `#ff5416` (orange).
- Brand dark: `#024751` (deep teal/navy) — logo + headings.
- Buttons are fully **rounded pills**: primary = solid accent + white text; secondary = white fill + outline.
- Currency: `₦`, always thousands-separated.
- Single-select control = **circle radio** (filled w/ check when on).
- Multi-select control = **square checkbox** (filled dark w/ check when on).
- Quantity control = **stepper**: `−  [n]  +`.
- Dropdowns = standard select with chevron.

---

## 3. Booking state model

```ts
type Booking = {
  // intro
  bookingType: 'self' | 'gift';                                  // step: /booking

  // service
  service: {
    cleaningType: 'standard' | 'deep' | 'move_in' | null;        // single-select
    additionalServices: string[];                                // multi-select (standalone-capable add-ons)
  };

  // space
  space: {
    description: string;          // e.g. "1 Bedroom, 1 Bathroom/Toilet, 1 Living Room, 1 Kitchen"
    stainRemovalSupplies: boolean;
  };

  // address
  address: {
    full: string;                 // structured/autocompleted address
    landmark: string;
    accessPermission: 'access_code' | 'call_gate' | 'none';
    transportFee: number;         // derived from area; 0 if free zone
  } | null;

  // schedule
  schedule: {
    preferredStaff: string | null;          // null = "match me to anyone"
    preferredGender: 'male' | 'female' | null;
    date: string;                            // ISO
    arrivalWindow: string;                   // e.g. "9am-12pm"
    frequency: Frequency;                    // see note in §6 step 5
  } | null;

  // extra tasks
  extraTasks: ExtraTaskSelection[];

  // full picture
  fullPicture: {
    pets: boolean;
    notes: string;                // max 500 chars
    additionalStaff: number;      // 0 if none
  };

  // contact
  contact: {
    bookingForSomeoneElse: boolean;
    firstName: string;
    lastName: string;
    phone: string;
    email: string;
  } | null;

  // checkout
  checkout: {
    prepayMonths: 0 | 2 | 3;      // upfront repeat
    insurance: boolean;           // "Premium Insurance"
  };

  totals: {
    noOfBookings: number;         // 1, or 2/3 if prepaying months
    basePrice: number;
    insuranceFee: number;
    discount: number;
    transportFee: number;
    totalPayable: number;
    durationHrs: number;
    staffCount: number;
  };
};

type Frequency =
  | 'once_off'
  | 'weekly' | 'twice_weekly' | 'three_weekly' | 'four_weekly'
  | 'five_weekly' | 'six_weekly' | 'daily';

type ExtraTaskSelection = {
  taskId: string;
  selected: boolean;
  quantity: number;               // e.g. loads
  frequency: 'once_off' | string;
};
```

The right summary panel + footer total recompute from this object on every change.

---

## 4. Operating constraints [OBSERVED]

- Service days: **Mon–Sun**.
- Arrival is booked as a **time window** (e.g. `9am-12pm`) inside the **7am–4pm** daily operating range. [ADAPT to your pickup/delivery windows.]

---

## 5. Route → step map

| # | Route | Step | Progress segment |
|---|-------|------|------------------|
| 1 | `/booking` | Intro (Book for you / Gift / Login) | — |
| 2 | `/booking/service` | Select service + add-ons | 1 |
| 3 | `/booking/space` | Tell us about your space | 2 |
| 4 | `/booking/address` | Tell us where you need us | 3 |
| 5 | `/booking/schedule` | When + preferences | 4 |
| 6 | `/booking/extratasks` | Extra tasks (2 sub-steps) | 5 |
| 7 | `/booking/fullpicture` | Pets / notes / extra staff | 6 |
| 8 | `/booking/contact` | Contact details | 7 |
| 9 | `/booking/summary` | Booking summary | 8 |
| 10 | `/booking/checkout` | Review & checkout → **Paystack** | 9 |
| ~~—~~ | ~~`/booking/matching`~~ | ~~Staff assignment + hold~~ | **REMOVED** |

---

## 6. Step detail (all [OBSERVED])

### Step 1 — `/booking` — Intro
Two large choice cards side by side, each with a dark square arrow button:
- **"Book For You"** — sub: "Sparkle, without the sweat". → starts a normal booking (`bookingType = 'self'`).
- **"Gift A Loved One"** — sub: "Small gift, big relief". → gift flow (`bookingType = 'gift'`). [ADAPT: gift a laundry booking. If you don't want gifting at launch, ship only the first card.]

Below the cards: **"Returning User?"** + a **"Login to your account"** outlined button.

On selecting a card → `/booking/service`.

### Step 2 — `/booking/service` — Select service + add-ons
Heading: **"What service would you like to book?"**

- Sub-label: **"You can only select one type of cleaning"** → **single-select circle radios**:
  - Standard Cleaning
  - Deep Cleaning
  - Move-In Cleaning
- Sub-label: **"Select any additional services with your cleaning or book as a stand-alone"** → **multi-select square checkboxes**:
  - Ironing
  - Laundry

So this screen captures **one** primary service (radio) **plus** any of the standalone-capable add-ons (checkboxes). A user can book an add-on (e.g. Ironing) **without** a cleaning type ("stand-alone").

[ADAPT — laundry] Primary service radios = your laundry service types (Wash & Fold, Wash & Iron, Dry Cleaning, Bulky…). Add-on checkboxes = standalone-capable extras (Ironing Only, etc.). Validation: require at least one of {primary service, add-on}.

### Step 3 — `/booking/space` — Tell us about your space
Heading: **"Tell us about your space"**
- Dropdown **"Tell us about your space"** → preset space configurations, e.g. `1 Bedroom, 1 Bathroom/Toilet, 1 Living Room, 1 Kitchen`. This drives base price + duration.
- Dropdown **"Do you need stain removal supplies?"** → Yes / No.
- **Info callout:** "Your Sparkler will not be coming with any cleaning materials. Please ensure you have the following available: Bowls, Mop, Mop bucket, Packer, Dustbin bag, Scrubbing brush, Rags, Bleach, Floor cleaner or soap, Toilet cleaner, Deep-action cleaning chemicals, Surface cleaner, Air freshener."

[ADAPT — laundry] Replace the space dropdown with your pricing unit (number of loads / bag size / item counts). Replace the materials callout with laundry-relevant notes (e.g. detergent/handling defaults) or drop it.

### Step 4 — `/booking/address` — Tell us where you need us
Heading: **"Tell us where you need us"**
- Field **"Tell us where you want cleaned."** → structured address (looks autocompleted; reference value chains estate • district • area • LGA • city • postcode • country). Use Google Places autocomplete and store the structured result.
- Field **"Nearby landmark or something to look out for."** → free text (e.g. `Chisco, beside mobil`).
- **"Do we need permission to get in?"** → checkboxes (single-choice in practice): `Yes, I'll provide an access code` / `Yes, I'll need to call the gate` / `No`.

Resolve the address area to a **transport-fee zone** (§8) and add the fee to the running total.

[ADAPT — laundry] "Where should we pick up / deliver?" + landmark + access permission. Same transport/delivery-fee zone logic.

### Step 5 — `/booking/schedule` — When + preferences
Heading: **"When would you like us to clean?"**
- Dropdown **"Do you have a preferred sparkler (optional)?"** → default `No, I don't. Match me to any available excellent Sparkler.` (other options would be specific named staff). [ADAPT → preferred attendant; keep "match me to anyone" default.]
- Dropdown **"Do you have a preferred gender for your sparkler?"** → `No, I don't` / Male / Female.
- Dropdown **"Select a booking date."** → e.g. `Tuesday 30 June, 2026`.
- Dropdown **"What time frame should your Sparkler arrive?"** → arrival windows (e.g. `9am-12pm`) within operating hours.

> **Frequency note:** the booking carries a `frequency` (the summary shows `Once off`). It isn't visible in this screenshot's crop and is likely conditional — e.g. shown only for recurring-capable services (Standard) and forced to `once_off` for Move-In. Implement frequency as a conditional field here; default `once_off`.

### Step 6 — `/booking/extratasks` — Extra tasks (two sub-steps)
Two internal sub-steps; the progress bar stays on segment 5 across both. A `1/2` / `2/2` counter sits top-right of the heading.

**Sub-step 1/2 — "Select any extra tasks"**
Multi-select checklist (square checkboxes):
- Wall Cleaning
- Ironing
- Laundry
- Wardrobe Organization

(This is the fuller add-on list; the §2 service step exposes only the standalone-capable subset. Keep selections in sync — anything ticked on the service step is pre-ticked here.)

While the total recomputes the footer shows **"Calculating…"**. Next → sub-step 2/2 (only for ticked tasks).

**Sub-step 2/2 — "Customize your extra tasks"**
One config card per selected task. Observed (Ironing):
- Title: task name (`Ironing`).
- Unit helper: **"1 load = up to 15 regular-sized items."**
- **"How many loads of clothes do you want ironed?"** → stepper `−  1  +` (min 1).
- **"How often do you want your loads of clothes ironed?"** → single-select; default **"Once off"** (circle-check).

Each card adds `quantity × unitPrice × freqMultiplier` to the total. Model add-ons as `{ taskId, unitLabel, unitMax, unitPrice, allowsFrequency }` so cards render generically.

[ADAPT — laundry] Add-ons = Ironing, Stain treatment, Express, Fold & pack, Starch, Softener, etc., each with its own unit + price.

### Step 7 — `/booking/fullpicture` — Help us get the full picture
Heading: **"Help us get the full picture"**
- Dropdown **"Do you have Pets?"** → Yes / No.
- Textarea **"Do you have any notes?"** → free text, **max 500 chars** (live counter, e.g. `3/500`). Helper under it: "Heads up: ONLY supplies paid for at the point of booking will be brought along to your appointment."
- Dropdown **"Do you need an additional Sparkler?"** → drives `staffCount` (and price/duration).

[ADAPT — laundry] Pets question is optional; keep the notes box (special instructions: stains, delicates, detergent prefs); "additional attendant" → drop or repurpose.

### Step 8 — `/booking/contact` — Let us know how to reach you
Heading: **"Let us know how to reach you"**
- Checkbox: **"Check this if you're booking for someone else"** (when on, these become the recipient's details).
- **First name**
- **Last name**
- **Phone number** (NG format)
- **Email address**

Validate email + phone. These feed the summary panel, the confirmation email, and the Paystack customer.

### Step 9 — `/booking/summary` — Booking Summary
Heading: **"Booking Summary"**
- **Info callout (fulfilment conditions):** "• This booking will only be fulfilled if you have running or adequate stored water within the house. • This booking will only be fulfilled if you have all the essential cleaning materials: Broom, Mop, Moping bucket, Packer, Dust bin, Dustbin bags, scrubbing brush, Rags, Buckets, Bowl, Bleach, Floor cleaner and/or soap, Dish soap and sponges, Scouring powder, Deep action stain remover, Glass Cleaner, Cobweb broom, Duster and Air freshener." [ADAPT or remove for laundry.]
- **Personal Information** — name, phone, email.
- **Address** — full address + landmark.
- **Task** — service; space description; frequency (`Once off`); weekday; date; arrival window.
- **Extra Tasks** — e.g. `1x Ironing: Once off`.
- **Additional Details** — the notes from `fullpicture` (e.g. `klk`).
- **"+ Add extra task"** button — jumps back to the extra-tasks step to add more.
- Footer CTA: **"Proceed to Checkout"** → `/booking/checkout`.

### Step 10 — `/booking/checkout` — Review and checkout → Paystack
Heading: **"Review and checkout"**
- Prepay/repeat: "You can pay upfront if you want this booking to repeat for the next 2-3 months. If you would like that, tell us how many months to charge you for." → checkboxes **"Two (2) Months"** / **"Three (3) Months"**. Selecting one sets `noOfBookings` (2 or 3) and multiplies the base accordingly.
- Insurance: **"Insure my booking against damage or missing items (up to ₦500K)"** → checkbox **"Premium Insurance"**. Adds an insurance fee (reference showed **₦1,100** — confirm whether flat or %).
- **Price breakdown** (right-aligned amounts):
  - `No of bookings` — `1` (or 2/3)
  - `Base price` — e.g. `₦24,975`
  - `Insurance` — e.g. `₦1,100`
  - `Discount` — e.g. `₦0`
  - **`Total payable`** — e.g. `₦26,075`
- **Footer CTA — CHANGED:** the reference said **"Get Matched"** (which led to staff assignment). **Replace it with "Proceed to Payment"**, which launches **Paystack** for the **Total payable**. No matching, no slot hold, no booking code. See §10.

> If transport fee applies (non-free zone), add a `Transport` line to this breakdown and include it in Total payable.

---

## 7. ~~Matching / staff assignment~~ — REMOVED

The reference had a `/booking/matching` step after checkout: it assigned a named worker (photo, rating, "Meet {name} — your sparkler!"), reserved the slot, and ran a **10-minute countdown** before a "Make Payment" button. **Do not build this.** Booking goes straight from "Review and checkout" to payment. No reservation timer, no booking-code-then-pay handoff.

---

## 8. Pricing & transport fee

**Base price** is driven by service type + space size + frequency + extra tasks + additional staff. Reference ranges (cleaning): Standard ₦4,500–19,000; Deep ₦19,300–69,100; Move-in ₦45,875–109,000. [ADAPT to your laundry price matrix.]

**Insurance:** optional add-on (reference `₦1,100`, cover "up to ₦500K"). Confirm flat vs %.

**Prepay months:** `Total = basePrice × noOfBookings + insurance − discount (+ transport)`.

**Transport fee** [OBSERVED — free by default; fixed fee for listed zones]. Model as `area → fee` lookup:

| Zone | Fee (₦) |
|------|---------|
| Ajah (Ajah bus stop – Abraham Adesanya) | 1,000 |
| Agege / Egbeda / Ikotun / Abule Egba | 1,000 |
| Iganmu, Ijaora, Orile & environs | 1,000 |
| Ipaja (Iyana-Ipaja – Ayobo) | 1,500 |
| Sangotedo (LBS – Sangotedo) | 1,800 |
| Ago Palace Way (Apple junction, Amuwo…) | 2,000 |
| Festac (Maza Maza through Satellite Town) | 2,000 |
| Magboro (Opic to Magboro bus stop) | 2,000 |
| Ikorodu | 2,300 |
| Iju | 2,300 |
| Apapa – Tican | 2,300 |
| Everywhere else | 0 (free) |

[ADAPT to your pickup/delivery zones.] Recompute totals on every change; reflect in the footer + right summary panel ("Calculating…" while pending).

---

## 9. (reserved)

---

## 10. Checkout — Paystack

The final CTA on `/booking/checkout` ("Proceed to Payment") launches Paystack for the **Total payable**. Accepted methods (per reference): Card, Bank, Bank transfer, USSD, Visa QR, plus international.

**Client**
- Use `@paystack/inline-js` (popup/inline). Start the transaction with: amount in **kobo** (`totalPayable × 100`), customer **email** (from contact step), and a **unique reference** tied to the booking record. Pass `metadata` with the booking id for reconciliation.

**Server (required — never trust the client callback alone)**
1. Create/record the reference server-side so the amount is server-controlled.
2. **Webhook** endpoint: verify `x-paystack-signature` (HMAC-SHA512 of the raw body with your secret key). On `charge.success` → mark booking **paid + confirmed**, send confirmation email.
3. **Verify** fallback: on the client success callback, call Paystack's transaction verify API by reference and confirm `status === 'success'` **and amount matches** before showing the success screen.
4. Keys in env vars: `PAYSTACK_SECRET_KEY` (server only), `NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY` (client). Use test keys in dev. *(Live keys + any Paystack specifics to be provided.)*

**After payment**
- Show a success/confirmation screen and email the booking details.

---

## 11. Build order

1. Shell: header + banner + segmented progress bar + **right summary panel** + sticky footer cart. Wire the store + localStorage + per-step guards.
2. Catalog + pricing in Supabase (services, add-ons w/ units+prices, transport zones).
3. Steps 1–5 (intro → service → space → address → schedule) with live total + summary panel.
4. Step 6 extra tasks — the two-sub-step select→customize pattern (match screenshots closely).
5. Steps 7–9 (fullpicture → contact → summary, incl. "+ Add extra task").
6. Step 10 checkout: prepay-months + insurance + breakdown → Paystack (verify via webhook).

---

## 12. Adaptation map (cleaning → laundry)

| Reference (cleaning) | Laundry equivalent |
|----------------------|--------------------|
| "Sparkler" | Laundry attendant / agent |
| Intro: Book For You / Gift A Loved One | Same split (gift a laundry booking); gift optional at launch |
| Service radios: Standard / Deep / Move-In | Wash & Fold / Wash & Iron / Dry Cleaning / Bulky |
| Service add-ons: Ironing, Laundry | Standalone-capable extras (Ironing Only, etc.) |
| Space dropdown (rooms) | Loads / bag size / item counts |
| "stain removal supplies" + materials callout | Detergent/handling options, or drop |
| Address "where you want cleaned" | Pickup/delivery address |
| Arrival window 9am-12pm (7am–4pm range) | Pickup/delivery windows |
| Extra tasks: Wall Cleaning, Ironing, Laundry, Wardrobe Org | Ironing, Stain treatment, Express, Fold & pack, Starch, Softener |
| "1 load = up to 15 regular-sized items" | Your unit definition (load/kg/bag) |
| fullpicture: Pets / additional Sparkler | Optional; keep the notes box |
| Duration "~8 hrs" | Turnaround "~48 hrs" / pickup+delivery dates |
| Summary "water + materials" callout | Laundry-relevant terms, or remove |
| ~~Get Matched / staff assignment~~ | **Removed — go straight to Paystack** |

Keep the **flow, the right-hand live summary + footer cart, the segmented progress bar, the two-stage extra-tasks pattern, and the Review-and-checkout (prepay months + insurance + breakdown) → Paystack** intact. Swap only the domain vocabulary and the price/units.

---

## 13. Acceptance criteria

- Refresh mid-flow preserves progress, the cart total, and the right summary panel.
- Right summary panel + footer total stay in sync with the store; show "Calculating…" while a recompute is pending; format `₦x,xxx`.
- Service step: exactly one cleaning type (radio) **or** at least one standalone add-on; add-ons ticked here are pre-ticked in the extra-tasks step.
- Extra tasks: only ticked tasks appear in the customize sub-step; bar stays on segment 5 across `1/2`→`2/2`.
- Summary lists service, space, frequency, date/window, extra tasks, and notes, with a working "+ Add extra task".
- Checkout breakdown math: `Total payable = Base × noOfBookings + Insurance − Discount (+ Transport)`.
- **No matching step exists.** "Proceed to Payment" launches Paystack for the exact Total payable; success is confirmed by a signature-verified webhook (not the client callback alone); a confirmation email is sent.
