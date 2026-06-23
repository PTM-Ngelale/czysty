'use client'

const testimonials = [
  {
    quote: 'They picked up Monday morning and delivered Tuesday evening. Everything was perfectly folded and smelled amazing. I won\'t go back to doing laundry myself.',
    name: 'Chioma A.',
    label: 'Regular Customer',
    initials: 'CA',
  },
  {
    quote: 'My work shirts have never looked this crisp. The dry cleaning is genuinely better than what I used to pay double for elsewhere.',
    name: 'Tunde B.',
    label: 'Dry Cleaning Customer',
    initials: 'TB',
  },
  {
    quote: 'The WhatsApp scheduling is so easy. I send a message, they pick up, and two days later it\'s back at my door. Don\'t even think about laundry anymore.',
    name: 'Adaeze M.',
    label: 'Weekly Subscriber',
    initials: 'AM',
  },
]

export default function Testimonials() {
  return (
    <section id="reviews" className="relative bg-[#F7F4EF] overflow-hidden py-28 lg:py-36">

      {/* Ghost number */}
      <div className="absolute top-0 right-0 select-none pointer-events-none overflow-hidden" aria-hidden>
        <span
          className="font-display font-extrabold text-czysty-green/[0.07] leading-none block"
          style={{ fontSize: 'clamp(140px, 22vw, 280px)' }}
        >
          06
        </span>
      </div>

      {/* Large decorative quote */}
      <div className="absolute bottom-8 left-8 select-none pointer-events-none" aria-hidden>
        <span
          className="font-display font-extrabold text-czysty-green/[0.08] leading-none"
          style={{ fontSize: '200px', lineHeight: '1' }}
        >
          &ldquo;
        </span>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-8 lg:px-14">
        {/* Header */}
        <div className="text-center mb-16 reveal">
          <div className="section-tag justify-center">Reviews</div>
          <h2 className="display-heading" style={{ fontSize: 'clamp(2.2rem, 5vw, 4rem)', color: '#09100A' }}>
            WHAT OUR{' '}
            <span className="text-czysty-green">CUSTOMERS SAY</span>
          </h2>
        </div>

        {/* Cards */}
        <div className="reveal-stagger grid md:grid-cols-3 gap-px bg-czysty-green/10">
          {testimonials.map((t, i) => (
            <div
              key={t.name}
              className="bg-white hover:bg-czysty-cream/60 transition-colors duration-300 p-8 flex flex-col group"
            >
              {/* Stars */}
              <div className="flex gap-1 mb-6">
                {Array.from({ length: 5 }).map((_, j) => (
                  <svg key={j} className="w-3.5 h-3.5 text-czysty-green" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>

              {/* Quote */}
              <blockquote className="font-body text-czysty-black/65 text-[14px] leading-relaxed flex-1 mb-8 italic">
                &ldquo;{t.quote}&rdquo;
              </blockquote>

              {/* Attribution */}
              <div className="flex items-center gap-3 pt-5 border-t border-czysty-green/10">
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
        <div className="reveal mt-10 text-center">
          <p className="font-body text-czysty-muted text-[12px] uppercase tracking-widest">
            Trusted by hundreds of households — Lagos Island · Victoria Island · Lekki · Ikoyi
          </p>
        </div>
      </div>
    </section>
  )
}
