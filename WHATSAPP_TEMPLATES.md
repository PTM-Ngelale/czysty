# WhatsApp Utility templates to submit in Meta Business Manager

Submit both at business.facebook.com → WhatsApp Manager → Message Templates → Create Template
(or developers.facebook.com → your app → WhatsApp → Message Templates).

For each: **Category = Utility**, **Language = English (US)**. Approval is usually minutes to a
few hours. Once approved, set the env vars below and they replace the `hello_world` fallback
automatically (see `lib/whatsapp.ts`).

---

## 1. Customer confirmation — `booking_confirmed_customer`

Matches the 5 variables `sendBookingWhatsApp()` sends for the customer
(`lib/whatsapp.ts`: name, amount, job label, scheduled date/window, address line).
Mirrors the "Booking Details" block in the confirmation email.

**Category:** Utility
**Name:** `booking_confirmed_customer`
**Language:** English (US)

**Body:**
```
Hi {{1}}, this is Czysty Cleaners. We've received your payment of {{2}} and your booking is confirmed. Booking: {{3}}. Scheduled: {{4}}. Address: {{5}}. Our team will be in touch shortly to confirm pickup/arrival details.
```

**Sample values for review** (Meta requires an example per variable):
- `{{1}}` → `Adaeze`
- `{{2}}` → `₦25,000`
- `{{3}}` → `Cleaning — 1-Bedroom Apartment`
- `{{4}}` → `Mon, 14 Jul 2026 (9am - 12pm)`
- `{{5}}` → `12 Admiralty Way, Lekki Phase 1, Lagos`

**Footer (optional):** `Czysty Cleaners - Lagos`

No buttons needed — keep it simple for faster approval.

---

## 2. Staff paid-booking alert — `booking_paid_staff_v3`

Matches the 7 variables `sendBookingWhatsApp()` sends for staff
(`lib/whatsapp.ts`: name, amount, job label, scheduled date/window, address, customer phone, tx ref).
Supersedes the earlier 3-variable `booking_paid_staff` template, which is now unused.

**Category:** Utility
**Name:** `booking_paid_staff_v3`
**Language:** English (US)

**Body:**
```
Hi team, a new booking payment has just come in that needs your attention. {{1}} completed payment of {{2}} for {{3}}. This job is currently scheduled for {{4}}, and the service address on file is {{5}}. You can reach the customer directly on {{6}} if you need to confirm any details. For your records, the transaction reference is {{7}}. Thank you for taking care of this booking.
```

**Sample values for review:**
- `{{1}}` → `Adaeze`
- `{{2}}` → `₦25,000`
- `{{3}}` → `Cleaning — 1-Bedroom Apartment`
- `{{4}}` → `Mon, 14 Jul 2026 (9am - 12pm)`
- `{{5}}` → `12 Admiralty Way, Lekki Phase 1, Lagos`
- `{{6}}` → `+2348012345678`
- `{{7}}` → `FLW-123456789`

**Footer (optional):** none needed.

---

## After approval

1. In `.env.local` (and Vercel → Project → Settings → Environment Variables), uncomment/set:
   ```
   WHATSAPP_STAFF_NUMBERS=+2348072133343   # real staff numbers, comma-separated
   WHATSAPP_CUSTOMER_TEMPLATE=booking_confirmed_customer
   WHATSAPP_STAFF_TEMPLATE=booking_paid_staff_v3
   ```
   Status (2026-07-15): both templates are live in Meta (Active — Quality pending) and these
   vars are set in `.env.local`. `+2348072133343` is the real staff number, not a placeholder.
   These vars still need to be added to Vercel's production environment variables.
2. Once you're off the free test number (or have added all real recipients as verified
   testers), remove `WHATSAPP_TEST_OVERRIDE_TO` so sends go to actual customers/staff instead
   of being redirected to one number.
3. Test with a real (small) payment or Flutterwave's test mode to confirm both templates render
   correctly with live data before relying on it.
