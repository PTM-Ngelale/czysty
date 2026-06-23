'use client'

const stats = [
  { value: '2,000+', label: 'Loads Completed', icon: '🧺' },
  { value: '4.9★',   label: 'Average Rating',  icon: '⭐' },
  { value: '24 hrs', label: 'Avg Turnaround',  icon: '⚡' },
]

export default function About() {
  return (
    <section id="about" className="relative bg-white overflow-hidden py-28 lg:py-36">

      {/* Ghost section number */}
      <div className="absolute top-0 right-0 select-none pointer-events-none overflow-hidden" aria-hidden>
        <span
          className="font-display font-extrabold text-czysty-green/[0.06] leading-none block"
          style={{ fontSize: 'clamp(140px, 22vw, 280px)' }}
        >
          01
        </span>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-8 lg:px-14">
        <div className="grid lg:grid-cols-2 gap-20 items-center">

          {/* Left */}
          <div className="reveal-left">
            <div className="section-tag">Who We Are</div>
            <h2 className="display-heading mb-6" style={{ fontSize: 'clamp(2.2rem, 5vw, 4rem)', color: '#09100A' }}>
              LAUNDRY DONE RIGHT,
              <br />
              <span className="text-czysty-green">EVERY TIME</span>
            </h2>

            {/* Pull quote */}
            <div className="border-l-2 border-czysty-red pl-5 mb-7">
              <p className="font-body text-czysty-black/70 text-[15px] leading-relaxed italic">
                &ldquo;We handle your garments as if they were our own.&rdquo;
              </p>
            </div>

            <p className="font-body text-czysty-black/55 text-[15px] leading-relaxed mb-3">
              At Czysty Cleaners, we believe clean clothes shouldn&apos;t be a chore. Our team uses professional-grade equipment and eco-conscious detergents to deliver exceptional results — every single load.
            </p>
            <p className="font-body text-czysty-black/55 text-[15px] leading-relaxed mb-10">
              We serve homes and businesses with flexible pickup windows, WhatsApp scheduling, and door-to-door delivery — because your time matters.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-px bg-czysty-green/12">
              {stats.map((stat) => (
                <div key={stat.label} className="bg-white px-4 py-5 text-center">
                  <p className="font-display font-extrabold text-czysty-green mb-1" style={{ fontSize: 'clamp(1.5rem, 3vw, 2.2rem)' }}>
                    {stat.value}
                  </p>
                  <p className="font-body text-[10px] text-czysty-muted uppercase tracking-widest">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right — image frame */}
          <div className="reveal-right">
            <div className="relative">
              {/* Offset decorative frame */}
              <div className="absolute -top-4 -left-4 right-4 bottom-4 border border-czysty-green/20 pointer-events-none" />

              {/* Image area */}
              <div className="relative aspect-[3/4] overflow-hidden bg-czysty-cream border border-czysty-green/15">
                {/* Placeholder */}
                <div className="absolute inset-0 flex flex-col items-center justify-center text-czysty-muted">
                  <div className="text-7xl mb-4 opacity-20">🏭</div>
                  <p className="font-body text-xs text-center px-6 opacity-40">
                    Add facility photo<br />
                    <code className="text-[11px]">public/images/facility.jpg</code>
                  </p>
                </div>
                {/* Corner accents */}
                <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-czysty-green" />
                <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-czysty-green" />
                <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-czysty-green" />
                <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-czysty-green" />
              </div>

              {/* Floating badge */}
              <div className="absolute -bottom-6 -right-6 bg-czysty-green px-5 py-4 shadow-[0_8px_30px_rgba(26,92,40,0.25)]">
                <p className="font-display font-extrabold text-czysty-cream text-2xl">2,000+</p>
                <p className="font-body text-czysty-cream/70 text-[11px] uppercase tracking-widest mt-0.5">Happy Customers</p>
              </div>

              {/* Red dot accent */}
              <div className="absolute top-5 right-5 w-3 h-3 rounded-full bg-czysty-red" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
