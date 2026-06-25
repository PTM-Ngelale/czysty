"use client";

import Image from "next/image";
import { Check, ChevronDown } from "lucide-react";

const stats = [
  { v: "2,000+", l: "Loads Completed" },
  { v: "4.9★", l: "Customer Rating" },
  { v: "24 hrs", l: "Avg. Turnaround" },
];

export default function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-screen flex flex-col overflow-hidden bg-czysty-black"
    >
      {/* Background layers */}
      <div className="absolute inset-0 line-grid opacity-60" />
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-0 right-0 w-[700px] h-[700px] rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(26,92,40,0.13) 0%, transparent 65%)",
          }}
        />
        <div
          className="absolute bottom-0 left-0 w-[500px] h-[500px] rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(139,26,26,0.09) 0%, transparent 65%)",
          }}
        />
      </div>

      {/* Left crimson accent bar */}
      <div className="absolute left-0 top-0 bottom-0 w-1 bg-czysty-red hidden lg:block" />

      {/* Main content */}
      <div className="relative z-10 flex-1 flex flex-col justify-center max-w-7xl w-full mx-auto px-6 lg:px-16 pt-20 lg:pt-24 pb-8 lg:pb-10">
        {/* Tag line */}
        <div className="flex items-center gap-4 mb-6 hero-a">
          <div className="h-px w-10 bg-czysty-red flex-shrink-0" />
          <span className="font-body text-[11px] text-czysty-red tracking-[0.28em] uppercase font-semibold">
            Czysty Cleaners Int&apos;l Ltd
          </span>
        </div>

        {/* Split layout */}
        <div className="grid lg:grid-cols-[1fr_380px] gap-8 lg:gap-16 xl:gap-20 items-center">
          {/* Left — heading + CTA */}
          <div>
            <h1
              className="display-heading"
              style={{
                fontSize: "clamp(1.75rem, 9vw, 8rem)",
                lineHeight: "0.96",
              }}
            >
              <span className="block text-czysty-cream hero-b">LAUNDRY?</span>
              <span className="block text-czysty-green  hero-c">CLEANING?</span>
              <span className="block text-czysty-cream hero-d">EASY.</span>
            </h1>

            {/* Mobile image — visible only on small screens */}
            <div
              className="lg:hidden relative mt-5 mb-5 overflow-hidden hero-e"
              style={{ height: "185px" }}
            >
              <Image
                src="/images/main-pose.png"
                alt="Czysty Cleaners professional"
                fill
                className="object-cover object-top"
                priority
              />
              {/* Fade edges into dark bg */}
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(to right, rgba(9,16,10,0.5) 0%, transparent 30%, transparent 70%, rgba(9,16,10,0.5) 100%)",
                }}
              />
              <div
                className="absolute bottom-0 left-0 right-0 h-16"
                style={{
                  background: "linear-gradient(to top, #09100A, transparent)",
                }}
              />
            </div>

            <div className="mt-6 lg:mt-10 hero-e">
              {/* Description — hidden on mobile to save space */}
              <p className="hidden sm:block font-body text-czysty-cream/50 text-[14px] leading-relaxed max-w-sm mb-5">
                Laundry, dry cleaning, home and office cleans — we handle it all
                and come to you.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <a
                  href="#contact"
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

            {/* Mobile stat strip */}
            <div className="lg:hidden flex gap-5 mt-6 hero-e">
              {stats.map((s) => (
                <div
                  key={s.l}
                  className="flex-1 border-t border-czysty-green/20 pt-3"
                >
                  <p className="font-display font-extrabold text-czysty-green text-lg tabular-nums">
                    {s.v}
                  </p>
                  <p className="font-body text-czysty-cream/35 text-[10px] uppercase tracking-widest leading-tight mt-0.5">
                    {s.l}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Right — main-pose image (desktop only) */}
          <div className="hidden lg:block relative hero-e">
            <div
              className="relative overflow-hidden"
              style={{ height: "520px" }}
            >
              <Image
                src="/images/main-pose.png"
                alt="Czysty Cleaners professional"
                fill
                className="object-cover object-top"
                priority
              />
              {/* Bottom fade */}
              <div
                className="absolute bottom-0 left-0 right-0 h-24"
                style={{
                  background: "linear-gradient(to top, #09100A, transparent)",
                }}
              />
              {/* Right edge fade */}
              <div
                className="absolute top-0 right-0 bottom-0 w-16"
                style={{
                  background: "linear-gradient(to left, #09100A, transparent)",
                }}
              />
            </div>

            {/* Stat cards below image */}
            <div className="flex flex-col gap-2 mt-3">
              {stats.map((s) => (
                <div
                  key={s.l}
                  className="flex items-center gap-3 border border-czysty-green/15 bg-czysty-grey/40 px-4 py-2.5"
                >
                  <span className="font-display font-extrabold text-czysty-green text-lg w-20 text-right tabular-nums">
                    {s.v}
                  </span>
                  <span className="h-6 w-px bg-czysty-green/15 flex-shrink-0" />
                  <span className="font-body text-czysty-cream/45 text-[11px] uppercase tracking-widest leading-tight">
                    {s.l}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom trust strip */}
      <div className="relative z-10 border-t border-czysty-green/10 bg-czysty-grey/40">
        <div className="max-w-7xl mx-auto px-6 lg:px-16 py-3">
          <div className="flex flex-wrap gap-x-6 gap-y-1.5">
            {[
              "Same-Day Service",
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
