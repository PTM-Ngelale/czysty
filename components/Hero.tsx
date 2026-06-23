'use client'

export default function Hero() {
  return (
    <section id="home" className="relative min-h-screen flex flex-col overflow-hidden bg-czysty-black">

      {/* Background layers */}
      <div className="absolute inset-0 line-grid opacity-60" />
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[700px] h-[700px] rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(26,92,40,0.13) 0%, transparent 65%)' }} />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(139,26,26,0.09) 0%, transparent 65%)' }} />
      </div>

      {/* Left crimson accent bar */}
      <div className="absolute left-0 top-0 bottom-0 w-1 bg-czysty-red hidden lg:block" />

      {/* Main content — CSS-animated, no IntersectionObserver needed */}
      <div className="relative z-10 flex-1 flex flex-col justify-center max-w-7xl w-full mx-auto px-8 lg:px-16 pt-28 pb-10">

        {/* Tag line */}
        <div className="flex items-center gap-4 mb-8 hero-a">
          <div className="h-px w-12 bg-czysty-red" />
          <span className="font-body text-[11px] text-czysty-red tracking-[0.28em] uppercase font-semibold">
            Czysty Cleaners Int&apos;l Ltd
          </span>
        </div>

        {/* Split: heading left, panel right */}
        <div className="grid lg:grid-cols-[1fr_340px] gap-12 xl:gap-20 items-end">

          {/* Heading */}
          <div>
            <h1 className="display-heading" style={{ fontSize: 'clamp(3.5rem, 8.5vw, 8rem)', lineHeight: '0.92' }}>
              <span className="block text-czysty-cream hero-b">CLEAN</span>
              <span className="block text-czysty-green hero-c">CLOTHES.</span>
              <span className="block text-czysty-cream hero-d">DELIVERED.</span>
            </h1>

            <div className="mt-10 hero-e flex flex-col sm:flex-row items-start sm:items-center gap-6">
              <p className="font-body text-czysty-cream/50 text-[15px] leading-relaxed max-w-xs">
                Same-day pickup and delivery. Professional cleaning — handled with care and returned to your door.
              </p>
              <div className="w-full sm:w-px h-px sm:h-14 bg-czysty-green/20 flex-shrink-0" />
              <div className="flex flex-col gap-3 w-full sm:w-auto">
                <a href="#contact" className="czysty-btn czysty-btn-primary px-8 py-4 text-[13px] whitespace-nowrap">
                  Schedule a Pickup
                </a>
                <a href="#services" className="czysty-btn czysty-btn-outline px-8 py-3 text-[13px] whitespace-nowrap">
                  See Our Services ↓
                </a>
              </div>
            </div>
          </div>

          {/* Right panel */}
          <div className="hidden lg:flex flex-col gap-5 hero-e">
            {/* Rotating badge */}
            <div className="relative w-32 h-32 mx-auto">
              <svg viewBox="0 0 100 100" className="w-full h-full animate-spin-slow">
                <defs>
                  <path id="cp" d="M 50,50 m -36,0 a 36,36 0 1,1 72,0 a 36,36 0 1,1 -72,0" />
                </defs>
                <text fill="rgba(200,230,206,0.5)" fontSize="10" fontFamily="'Inter',sans-serif" fontWeight="600" letterSpacing="3.2">
                  <textPath href="#cp">PROFESSIONAL · RELIABLE · TRUSTED ·&nbsp;</textPath>
                </text>
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-14 h-14 rounded-full border border-czysty-green/30 bg-czysty-black/60 flex items-center justify-center">
                  <span className="font-display font-extrabold text-czysty-green text-[17px]">CC</span>
                </div>
              </div>
            </div>

            {/* Stat cards */}
            {[
              { v: '2,000+', l: 'Loads Completed' },
              { v: '4.9★',   l: 'Customer Rating' },
              { v: '24 hrs', l: 'Avg. Turnaround' },
            ].map((s) => (
              <div key={s.l} className="flex items-center gap-3 border border-czysty-green/15 bg-czysty-grey/40 px-4 py-3">
                <span className="font-display font-extrabold text-czysty-green text-xl w-20 text-right tabular-nums">{s.v}</span>
                <span className="h-8 w-px bg-czysty-green/15 flex-shrink-0" />
                <span className="font-body text-czysty-cream/45 text-[11px] uppercase tracking-widest leading-tight">{s.l}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom trust strip */}
      <div className="relative z-10 border-t border-czysty-green/10 bg-czysty-grey/40">
        <div className="max-w-7xl mx-auto px-8 lg:px-16 py-4">
          <div className="flex flex-wrap gap-x-8 gap-y-2">
            {[
              '✓ Same-Day Pickup',
              '✓ Eco-Friendly Products',
              '✓ 24–48 Hr Turnaround',
              '✓ Door-to-Door Delivery',
              '✓ WhatsApp Booking',
            ].map((t) => (
              <span key={t} className="font-body text-[12px] text-czysty-cream/35 tracking-wide">{t}</span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
