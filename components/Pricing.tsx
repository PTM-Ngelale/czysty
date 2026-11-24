'use client'

import { Shirt, ShoppingBasket, Truck, Store, FileText, Clock, BedDouble, CalendarDays, ShieldCheck, Check } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { LAUNDRY_OPTIONS, CLEANING_QUOTE_WHATSAPP_URL, formatNaira } from '@/lib/booking-catalog'

const FEATURE_ICONS: LucideIcon[] = [Shirt, ShoppingBasket, Truck, Store]

function featureIcon(feature: string, i: number): LucideIcon {
  if (/items per month/i.test(feature)) return Shirt
  if (/per batch/i.test(feature)) return ShoppingBasket
  if (/first pick up/i.test(feature)) return Truck
  if (/drop off/i.test(feature)) return Store
  return FEATURE_ICONS[i % FEATURE_ICONS.length]
}

const PLAN_FOOTERS: Record<string, string> = {
  wash: 'Simple. Affordable. Reliable.',
  'wash-iron': 'More Care. More Convenience.',
}

const terms: { Icon: LucideIcon; text: string; strong?: string }[] = [
  { Icon: FileText, text: 'Registrations must be made before drop off.' },
  { Icon: Clock, text: 'Each batch takes between 6–7 days to be prepared.' },
  { Icon: BedDouble, text: 'Duvets come at an extra cost of ₦3,500 per unit.' },
  { Icon: CalendarDays, text: 'Delivery by the company goes out on Wednesdays and Saturdays only.' },
  {
    Icon: ShieldCheck,
    strong: 'No clothing insurance against damage.',
    text: 'The company is not liable for any wear, tear, shrinkage or damage during the laundry process.',
  },
]

const dryClean = [
  { item: 'Corporate Shirt', price: '₦2,150' },
  { item: 'Dress',           price: '₦1,800' },
  { item: 'Suit',            price: '₦3,500' },
  { item: 'Senator',         price: '₦3,500' },
]

export default function Pricing() {
  return (
    <section id="pricing" className="relative bg-czysty-grey overflow-hidden py-16 lg:py-32">
      {/* Soft decorative glow, as on the flyer */}
      <div
        className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(201, 237, 209,0.10) 0%, transparent 65%)' }}
      />

      <div className="relative z-10 max-w-6xl mx-auto px-5 sm:px-8 lg:px-14">
        {/* Header */}
        <div className="reveal mb-10 lg:mb-14">
          <p className="font-body text-czysty-light/80 text-[11px] uppercase tracking-[0.3em] mb-3">
            Convenient. Affordable. Reliable.
          </p>
          <h2 className="display-heading" style={{ fontSize: 'clamp(1.6rem, 6vw, 4.5rem)' }}>
            <span className="text-white">LAUNDRY</span>
            <br />
            <span className="text-czysty-light">SUBSCRIPTION</span>
          </h2>
          <div className="flex flex-wrap gap-x-5 gap-y-1 mt-5">
            {['Wash', 'Dry', 'Iron', 'Fold'].map((w) => (
              <span key={w} className="font-body text-white/80 text-[12px] uppercase tracking-[0.2em]">{w}</span>
            ))}
          </div>
        </div>

        {/* Plans */}
        <div className="reveal grid md:grid-cols-2 gap-4 sm:gap-6 mb-6">
          {LAUNDRY_OPTIONS.map((plan) => (
            <div key={plan.id} className="bg-white rounded-3xl p-6 sm:p-8 flex flex-col">
              <p className="font-display font-extrabold text-czysty-black uppercase leading-none" style={{ fontSize: 'clamp(1.5rem, 3vw, 2.1rem)' }}>
                {plan.planName}
              </p>
              <p className="font-display font-bold text-czysty-black uppercase text-[15px] mt-1">{plan.tagline}</p>

              <div className="rounded-2xl bg-czysty-green text-center py-4 my-6">
                <p className="font-display font-extrabold text-white leading-none" style={{ fontSize: 'clamp(2rem, 5vw, 2.8rem)' }}>
                  {formatNaira(plan.price)}
                </p>
                <p className="font-body text-white/85 text-[11px] uppercase tracking-[0.3em] mt-1.5">per month</p>
              </div>

              <ul className="divide-y divide-czysty-green/10 flex-1">
                {plan.features.map((f, i) => {
                  const Icon = featureIcon(f, i)
                  return (
                    <li key={f} className="flex items-center gap-4 py-3">
                      <Icon size={20} className="text-czysty-black shrink-0" />
                      <span className="font-body text-czysty-black text-[14px]">{f}</span>
                    </li>
                  )
                })}
              </ul>

              <div className="rounded-full bg-czysty-light text-center py-2.5 mt-5 mb-4">
                <span className="font-body italic text-czysty-black text-[14px]">{PLAN_FOOTERS[plan.id]}</span>
              </div>

              <a
                href="/booking"
                className="czysty-btn czysty-btn-primary rounded-full text-center"
              >
                Subscribe Now
              </a>
            </div>
          ))}
        </div>

        {/* Terms & conditions */}
        <div className="reveal bg-white rounded-3xl p-6 sm:p-8 mb-6">
          <p className="font-display font-extrabold text-czysty-black uppercase text-lg mb-5">Terms &amp; Conditions</p>
          <ul className="grid sm:grid-cols-2 gap-x-8 gap-y-4">
            {terms.map(({ Icon, text, strong }) => (
              <li key={text} className="flex items-start gap-3">
                <Icon size={20} className="text-czysty-black shrink-0 mt-0.5" />
                <p className="font-body text-czysty-black/80 text-[13px] leading-relaxed">
                  {strong && <strong className="text-czysty-black block">{strong}</strong>}
                  {text}
                </p>
              </li>
            ))}
          </ul>
        </div>

        {/* Dry cleaning + cleaning quote */}
        <div className="reveal grid lg:grid-cols-[1.4fr_1fr] gap-4 sm:gap-6">
          <div className="bg-white rounded-3xl p-6 sm:p-8">
            <p className="font-display font-extrabold text-czysty-black uppercase text-lg mb-4">Dry Cleaning — Per Item</p>
            <div className="divide-y divide-czysty-green/10">
              {dryClean.map((row) => (
                <div key={row.item} className="flex items-center justify-between py-3">
                  <span className="font-body text-czysty-black/75 text-[14px]">{row.item}</span>
                  <span className="font-display font-bold text-czysty-green text-lg ml-4">{row.price}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-3xl bg-czysty-light p-6 sm:p-8 flex flex-col">
            <p className="font-display font-extrabold text-czysty-black uppercase text-lg mb-2">Home &amp; Office Cleaning</p>
            <p className="font-body text-czysty-black/75 text-[14px] leading-relaxed mb-5 flex-1">
              Every space is different, so we quote each job individually. Send us a message and we&apos;ll get back to you with a price.
            </p>
            <ul className="space-y-1.5 mb-6">
              {['Homes & apartments', 'Offices & shops', 'One-off or recurring'].map((t) => (
                <li key={t} className="flex items-center gap-2 font-body text-czysty-black/80 text-[13px]">
                  <Check size={14} className="text-czysty-green" strokeWidth={2.5} />
                  {t}
                </li>
              ))}
            </ul>
            <a
              href={CLEANING_QUOTE_WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="czysty-btn czysty-btn-primary rounded-full text-center"
            >
              Get a Quote on WhatsApp →
            </a>
          </div>
        </div>

        <p className="font-body text-white/50 text-[11px] text-center mt-8">
          All prices subject to change. Call or WhatsApp 0807 213 3343 · @czystycleaners
        </p>
      </div>
    </section>
  )
}
