"use client";

import { CLEANING_QUOTE_WHATSAPP_URL } from "@/lib/booking-catalog";

const services = [
  {
    num: "01",
    tag: "Basic Plan",
    title: "Wash & Fold",
    description:
      "₦10,000 per month — 40 items monthly, max 25 items per batch. Self drop off / pick up.",
    cta: "See Pricing",
    ctaHref: "#pricing",
    external: false,
    accent: "#085d33",
    ctaColor: "#085d33",
  },
  {
    num: "02",
    tag: "Corporate Plan",
    title: "Wash, Dry & Iron",
    description:
      "₦20,000 per month — 30 items monthly, max 15 items per batch. Only your first pick up is free.",
    cta: "See Pricing",
    ctaHref: "#pricing",
    external: false,
    accent: "#085d33",
    ctaColor: "#085d33",
  },
  {
    num: "03",
    tag: "Home & Office",
    title: "Space Cleaning",
    description:
      "Full home or office cleans — floors, surfaces, bathrooms, kitchens. Message us on WhatsApp for a quote.",
    cta: "Get a Quote on WhatsApp",
    ctaHref: CLEANING_QUOTE_WHATSAPP_URL,
    external: true,
    accent: "#085d33",
    ctaColor: "#085d33",
  },
];

const addons = [
  {
    tag: "Duvets",
    title: "Extra Care Items",
    description: "Duvets come at an extra cost of ₦3,500 per unit.",
  },
  {
    tag: "Delivery",
    title: "Wednesdays & Saturdays",
    description:
      "Each batch takes 6–7 days. Deliveries go out Wednesdays and Saturdays — your first pick up is free.",
  },
];

export default function Services() {
  return (
    <section
      id="services"
      className="relative bg-[#f1f8f2] overflow-hidden py-16 lg:py-36"
    >
      {/* Ghost number */}
      <div
        className="absolute top-0 left-0 select-none pointer-events-none overflow-hidden"
        aria-hidden
      >
        <span
          className="font-display font-extrabold text-czysty-green/[0.06] leading-none block"
          style={{ fontSize: "clamp(100px, 22vw, 280px)" }}
        >
          02
        </span>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 lg:px-14">
        {/* Header row */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4 mb-10 lg:mb-16 reveal">
          <div>
            <div className="section-tag">Our Services</div>
            <h2
              className="display-heading"
              style={{
                fontSize: "clamp(1.2rem, 5.5vw, 4rem)",
                color: "#022811",
              }}
            >
              CLEAN CLOTHES.
              <br />
              <span className="text-czysty-green">LESS STRESS.</span>
            </h2>
          </div>
          <a
            href="#pricing"
            className="czysty-btn czysty-btn-green-outline self-start lg:self-end text-sm px-6 py-3"
          >
            View Full Pricing →
          </a>
        </div>

        {/* Main service cards */}
        <div className="reveal-stagger grid lg:grid-cols-3 gap-px bg-czysty-green/12 mb-px">
          {services.map((svc) => (
            <div
              key={svc.num}
              className="group relative bg-white flex flex-col overflow-hidden transition-all duration-500 hover:bg-czysty-cream/50"
            >
              {/* Top accent bar */}
              <div
                className="h-0.5 w-0 group-hover:w-full transition-all duration-500"
                style={{ background: svc.accent }}
              />

              <div className="p-5 sm:p-8 flex flex-col flex-1">
                {/* Number + tag row */}
                <div className="flex items-center justify-between mb-6 sm:mb-8">
                  <span
                    className="font-display font-extrabold text-[11px] tracking-widest uppercase"
                    style={{ color: svc.accent }}
                  >
                    {svc.tag}
                  </span>
                  <span
                    className="font-display font-extrabold text-5xl leading-none opacity-[0.08] select-none"
                    style={{ color: svc.accent }}
                  >
                    {svc.num}
                  </span>
                </div>

                {/* Title */}
                <h3
                  className="font-display font-extrabold text-czysty-black uppercase mb-4 leading-tight"
                  style={{ fontSize: "clamp(1.1rem, 2.5vw, 1.7rem)" }}
                >
                  {svc.title}
                </h3>

                <p className="font-body text-czysty-black/50 text-[14px] leading-relaxed flex-1 mb-6 sm:mb-8">
                  {svc.description}
                </p>

                {/* Bottom CTA */}
                <div className="flex items-center gap-3">
                  <div className="h-px flex-1 bg-czysty-green/12 group-hover:bg-czysty-green/30 transition-colors duration-500" />
                  <a
                    href={svc.ctaHref}
                    {...(svc.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                    className="font-body text-[12px] font-semibold uppercase tracking-widest transition-colors duration-200"
                    style={{ color: svc.ctaColor }}
                  >
                    {svc.cta} →
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Add-on strip */}
        <div className="reveal-stagger grid sm:grid-cols-2 gap-px bg-czysty-green/12">
          {addons.map((addon) => (
            <div
              key={addon.tag}
              className="bg-white hover:bg-czysty-cream/50 transition-colors duration-300 px-5 sm:px-8 py-5 sm:py-6 flex items-start gap-5 sm:gap-6"
            >
              <div className="w-px self-stretch bg-czysty-green flex-shrink-0" />
              <div>
                <span className="font-body text-czysty-green/80 text-[10px] font-semibold uppercase tracking-widest block mb-1">
                  {addon.tag}
                </span>
                <h4 className="font-display font-bold text-czysty-black uppercase text-base mb-1">
                  {addon.title}
                </h4>
                <p className="font-body text-czysty-black/45 text-[13px]">
                  {addon.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
