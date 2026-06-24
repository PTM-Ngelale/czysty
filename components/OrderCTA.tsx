'use client'

export default function OrderCTA() {
  return (
    <section className="relative overflow-hidden bg-czysty-green py-14 lg:py-32">

      {/* Background dot pattern */}
      <div className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: 'radial-gradient(circle, rgba(242,237,228,0.4) 1px, transparent 1px)',
          backgroundSize: '24px 24px',
        }}
      />

      {/* Large ghost text */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden" aria-hidden>
        <span
          className="font-display font-extrabold text-czysty-black/10 leading-none whitespace-nowrap"
          style={{ fontSize: 'clamp(48px, 14vw, 180px)' }}
        >
          CLEAN CLOTHES
        </span>
      </div>

      {/* Left red bar */}
      <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-czysty-red/60" />

      <div className="relative z-10 max-w-5xl mx-auto px-5 sm:px-8 lg:px-14 text-center reveal">
        <p className="font-body text-czysty-cream/60 text-[11px] uppercase tracking-[0.3em] mb-4">
          Ready to get started?
        </p>
        <h2
          className="display-heading text-czysty-cream mb-5 sm:mb-6"
          style={{ fontSize: 'clamp(1.5rem, 7vw, 6rem)' }}
        >
          READY FOR
          <br />
          CLEAN CLOTHES?
        </h2>
        <p className="font-body text-czysty-cream/65 text-sm sm:text-base mb-8 sm:mb-12 max-w-md mx-auto leading-relaxed">
          Book your first pickup in under 60 seconds. No contract, no commitment.
        </p>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3">
          <a href="/booking"
            className="czysty-btn bg-czysty-black text-czysty-cream hover:bg-czysty-grey transition-colors duration-200 px-9 py-4 text-sm border border-czysty-cream/10 text-center">
            Book a Pickup
          </a>
          <a href="tel:+2348072133343"
            className="czysty-btn border-2 border-czysty-cream/70 text-czysty-cream hover:bg-czysty-cream hover:text-czysty-green transition-all duration-200 px-9 py-4 text-sm text-center">
            Call Us
          </a>
          <a href="https://wa.me/2348072133343" target="_blank" rel="noopener noreferrer"
            className="czysty-btn bg-czysty-red text-czysty-cream hover:bg-czysty-red/80 transition-colors duration-200 px-9 py-4 text-sm text-center">
            WhatsApp →
          </a>
        </div>

        {/* Trust row */}
        <div className="mt-8 sm:mt-12 flex flex-wrap justify-center gap-4 sm:gap-6">
          {['No lock-in contracts', 'Same-day available', 'Eco-friendly products'].map((item) => (
            <span key={item} className="flex items-center gap-2 font-body text-czysty-cream/50 text-[12px]">
              <span className="w-1 h-1 rounded-full bg-czysty-cream/40" />
              {item}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
