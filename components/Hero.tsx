"use client";

import { Check, ChevronDown } from "lucide-react";

const stats = [
  { v: "2,000+", l: "Loads Completed" },
  { v: "4.9★", l: "Customer Rating" },
  { v: "Wed & Sat", l: "Delivery Days" },
];

export default function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-screen flex flex-col overflow-hidden bg-czysty-black"
    >
      {/* Background video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
        style={{ zIndex: 0 }}
      >
        <source src="/images/bg-video.mp4" type="video/mp4" />
      </video>

      {/* Dark overlay — lets video show through while keeping text readable */}
      <div
        className="absolute inset-0"
        style={{ background: "rgba(2, 40, 17,0.55)", zIndex: 1 }}
      />

      {/* Background layers */}
      <div
        className="absolute inset-0 line-grid opacity-40"
        style={{ zIndex: 2 }}
      />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ zIndex: 2 }}
      >
        <div
          className="absolute top-0 right-0 w-[700px] h-[700px] rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(8, 93, 51,0.13) 0%, transparent 65%)",
          }}
        />
        <div
          className="absolute bottom-0 left-0 w-[500px] h-[500px] rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(201, 237, 209,0.09) 0%, transparent 65%)",
          }}
        />
      </div>

      {/* Left mint accent bar */}
      <div
        className="absolute left-0 top-0 bottom-0 w-1 bg-czysty-light hidden lg:block"
        style={{ zIndex: 3 }}
      />

      {/* Main content */}
      <div className="relative z-10 flex-1 flex flex-col justify-center max-w-7xl w-full mx-auto px-6 lg:px-16 pt-20 lg:pt-24 pb-8 lg:pb-10">
        {/* Tag line */}
        <div className="flex items-center gap-4 mb-6 hero-a">
          <div className="h-px w-10 bg-czysty-light flex-shrink-0" />
          <span className="font-body text-[11px] text-czysty-light tracking-[0.28em] uppercase font-semibold">
            Czysty Cleaners Int&apos;l Ltd
          </span>
        </div>

        {/* Heading */}
        <h1
          className="display-heading"
          style={{
            fontSize: "clamp(1.75rem, 9vw, 8rem)",
            lineHeight: "0.96",
          }}
        >
          <span className="block text-czysty-cream hero-b">LAUNDRY?</span>
          <span className="block text-czysty-light hero-c">CLEANING?</span>
          <span className="block text-czysty-cream hero-d">EASY.</span>
        </h1>

        {/* Description + CTAs */}
        <div className="mt-8 lg:mt-12 hero-e max-w-xl">
          <p className="font-body text-czysty-cream/50 text-[14px] leading-relaxed mb-6">
            Laundry, dry cleaning, home and office cleans — we handle it all and
            come to you.
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <a
              href="/booking"
              className="czysty-btn czysty-btn-primary px-7 py-3.5 text-[13px] whitespace-nowrap text-center"
            >
              Book a Service
            </a>
            <a
              href="#services"
              className="czysty-btn czysty-btn-outline px-7 py-3 text-[13px] whitespace-nowrap text-center flex items-center justify-center gap-1.5"
            >
              See Our Services <ChevronDown size={14} />
            </a>
          </div>
        </div>

        {/* Stat strip */}
        <div className="flex gap-5 sm:gap-10 mt-10 hero-e">
          {stats.map((s) => (
            <div
              key={s.l}
              className="flex-1 max-w-[140px] border-t border-czysty-green/20 pt-3"
            >
              <p className="font-display font-extrabold text-czysty-light text-lg tabular-nums">
                {s.v}
              </p>
              <p className="font-body text-czysty-cream/35 text-[10px] uppercase tracking-widest leading-tight mt-0.5">
                {s.l}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom trust strip */}
      <div className="relative z-10 border-t border-czysty-green/10 bg-czysty-grey/40">
        <div className="max-w-7xl mx-auto px-6 lg:px-16 py-3">
          <div className="flex flex-wrap gap-x-6 gap-y-1.5">
            {[
              "First Pickup Free",
              "Eco-Friendly Products",
              "Home & Office Cleans",
              "Door-to-Door Delivery",
              "WhatsApp Booking",
            ].map((t) => (
              <span
                key={t}
                className="flex items-center gap-1 font-body text-[11px] text-czysty-cream/35 tracking-wide"
              >
                <Check size={10} className="text-czysty-green/60 shrink-0" />
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
