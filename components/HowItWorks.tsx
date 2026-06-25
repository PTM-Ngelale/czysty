"use client";

import { ArrowRight } from "lucide-react";

const steps = [
  {
    num: "01",
    title: "Book Your Service",
    body: "Book online or message us on WhatsApp. Tell us what you need — laundry, cleaning, or both. We confirm within the hour.",
  },
  {
    num: "02",
    title: "We Show Up",
    body: "Our team arrives at your door on time. For laundry we collect your items; for cleaning we get straight to work.",
  },
  {
    num: "03",
    title: "We Clean",
    body: "Laundry washed, dried, and folded — or your home and office cleaned to a professional standard.",
  },
  {
    num: "04",
    title: "Done Right",
    body: "Fresh laundry delivered back to your door, or a spotless space left behind. Guaranteed results, every time.",
  },
];

export default function HowItWorks() {
  return (
    <section
      id="how-it-works"
      className="relative bg-white overflow-hidden py-16 lg:py-36"
    >
      {/* Ghost number */}
      <div
        className="absolute -bottom-8 right-0 select-none pointer-events-none overflow-hidden"
        aria-hidden
      >
        <span
          className="font-display font-extrabold text-czysty-green/[0.06] leading-none block"
          style={{ fontSize: "clamp(100px, 22vw, 280px)" }}
        >
          03
        </span>
      </div>

      {/* Top accent line */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(26,92,40,0.25) 30%, rgba(139,26,26,0.25) 70%, transparent)",
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 lg:px-14">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10 lg:mb-20 reveal">
          <div>
            <div className="section-tag">The Process</div>
            <h2
              className="display-heading"
              style={{
                fontSize: "clamp(1.2rem, 5.5vw, 4rem)",
                color: "#09100A",
              }}
            >
              HOW IT <span className="text-czysty-green">WORKS</span>
            </h2>
          </div>
          <p className="font-body text-czysty-black/40 text-[13px] sm:max-w-[220px] sm:text-right leading-relaxed">
            Every service starts with a booking and ends with a spotless result.
          </p>
        </div>

        {/* Steps */}
        <div className="reveal-stagger relative">
          {/* Connecting line (desktop) */}
          <div
            className="hidden lg:block absolute top-[28px] left-[calc(12.5%+28px)] right-[calc(12.5%+28px)] h-px"
            style={{
              background:
                "linear-gradient(90deg, rgba(26,92,40,0.4), rgba(26,92,40,0.1))",
            }}
          />

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-6">
            {steps.map((step, i) => (
              <div key={step.num} className="relative flex flex-col">
                {/* Step number circle */}
                <div className="relative flex items-center gap-4 mb-6">
                  <div className="relative z-10 flex-shrink-0 w-14 h-14 rounded-full border border-czysty-green/35 bg-white shadow-sm flex items-center justify-center">
                    <span className="font-display font-extrabold text-czysty-green text-sm">
                      {step.num}
                    </span>
                    <div className="absolute inset-0 rounded-full border border-czysty-green/12 scale-110" />
                  </div>
                  {i < steps.length - 1 && (
                    <div className="hidden sm:block lg:hidden h-px flex-1 bg-czysty-green/15" />
                  )}
                </div>

                <h3 className="font-display font-bold text-czysty-black uppercase text-[15px] tracking-wide mb-3">
                  {step.title}
                </h3>
                <p className="font-body text-czysty-black/50 text-[13px] leading-relaxed">
                  {step.body}
                </p>

                {i === steps.length - 1 && (
                  <div className="mt-4 flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-czysty-red" />
                    <span className="font-body text-czysty-red/60 text-[11px] uppercase tracking-widest">
                      Done
                    </span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="reveal mt-10 sm:mt-16 pt-8 sm:pt-12 border-t border-czysty-green/10 flex flex-col sm:flex-row items-start sm:items-center gap-5 sm:gap-6">
          <div>
            <p className="font-display font-bold text-czysty-black text-lg uppercase">
              Ready to start?
            </p>
            <p className="font-body text-czysty-black/40 text-[13px] mt-1">
              No contract, no commitment. Book your first service today.
            </p>
          </div>
          <a
            href="#booking"
            className="czysty-btn czysty-btn-primary px-8 py-4 text-sm sm:ml-auto w-full sm:w-auto text-center flex items-center justify-center gap-2"
          >
            Start Your First Order <ArrowRight size={14} />
          </a>
        </div>
      </div>
    </section>
  );
}
