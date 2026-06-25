'use client'

import { Star } from 'lucide-react'

const testimonials = [
  {
    quote: 'They came in, cleaned the entire apartment top to bottom, and did our laundry the same day. Everything was spotless and perfectly folded. I won\'t go back to doing it myself.',
    name: 'Chioma A.',
    label: 'Home Cleaning & Laundry',
    initials: 'CA',
  },
  {
    quote: 'My work shirts have never looked this crisp. The dry cleaning is genuinely better than what I used to pay double for elsewhere. Consistent every time.',
    name: 'Tunde B.',
    label: 'Dry Cleaning Customer',
    initials: 'TB',
  },
  {
    quote: 'The WhatsApp booking is so easy. I send a message, they show up, and the office is clean before our clients arrive. Completely stress-free.',
    name: 'Adaeze M.',
    label: 'Office Cleaning Client',
    initials: 'AM',
  },
]

export default function Testimonials() {
  return (
    <section id="reviews" className="relative bg-[#F7F4EF] overflow-hidden py-16 lg:py-36">

      {/* Ghost number */}
      <div className="absolute top-0 right-0 select-none pointer-events-none overflow-hidden" aria-hidden>
        <span
          className="font-display font-extrabold text-czysty-green/[0.07] leading-none block"
          style={{ fontSize: 'clamp(100px, 22vw, 280px)' }}
        >
          06
        </span>
      </div>

      {/* Large decorative quote */}
      <div className="absolute bottom-8 left-4 sm:left-8 select-none pointer-events-none" aria-hidden>
        <span
          className="font-display font-extrabold text-czysty-green/[0.08] leading-none"
          style={{ fontSize: 'clamp(100px, 20vw, 200px)', lineHeight: '1' }}
        >
          &ldquo;
        </span>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 lg:px-14">
        {/* Header */}
        <div className="text-center mb-10 lg:mb-16 reveal">
          <div className="section-tag justify-center">Reviews</div>
          <h2 className="display-heading" style={{ fontSize: 'clamp(1.2rem, 5.5vw, 4rem)', color: '#09100A' }}>
            WHAT OUR{' '}
            <span className="text-czysty-green">CUSTOMERS SAY</span>
          </h2>
        </div>

        {/* Cards */}
        <div className="reveal-stagger grid md:grid-cols-3 gap-px bg-czysty-green/10">
          {testimonials.map((t, i) => (
            <div
              key={t.name}
              className="bg-white hover:bg-czysty-cream/60 transition-colors duration-300 p-5 sm:p-8 flex flex-col group"
            >
              {/* Stars */}
              <div className="flex gap-1 mb-5 sm:mb-6">
                {Array.from({ length: 5 }).map((_, j) => (
                  <Star key={j} className="w-3.5 h-3.5 text-czysty-green" fill="currentColor" />
                ))}
              </div>

              {/* Quote */}
              <blockquote className="font-body text-czysty-black/65 text-[14px] leading-relaxed flex-1 mb-6 sm:mb-8 italic">
                &ldquo;{t.quote}&rdquo;
              </blockquote>

              {/* Attribution */}
              <div className="flex items-center gap-3 pt-4 sm:pt-5 border-t border-czysty-green/10">
                <div className="w-10 h-10 rounded-full bg-czysty-green/12 border border-czysty-green/20 flex items-center justify-center flex-shrink-0">
                  <span className="font-display font-bold text-czysty-green text-[12px]">{t.initials}</span>
                </div>
                <div>
                  <p className="font-body font-semibold text-czysty-black text-[13px]">{t.name}</p>
                  <p className="font-body text-czysty-muted text-[11px] uppercase tracking-wide">{t.label}</p>
                </div>
                <span className="ml-auto font-display font-extrabold text-czysty-green/10 text-4xl leading-none select-none">
                  0{i + 1}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom tag line */}
        <div className="reveal mt-8 sm:mt-10 text-center">
          <p className="font-body text-czysty-muted text-[12px] uppercase tracking-widest">
            Trusted by hundreds of households — Port Harcourt · D-Line · Eliozu · Ozuoba
          </p>
        </div>
      </div>
    </section>
  )
}
