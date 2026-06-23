'use client'

const services = [
  {
    num: '01',
    tag: 'Wash & Fold',
    title: 'Everyday Laundry',
    description: 'Washed, dried, and neatly folded per kg. Fresh and ready to wear.',
    cta: 'See Pricing',
    ctaHref: '#pricing',
    accent: '#1A5C28',
    ctaColor: '#1A5C28',
  },
  {
    num: '02',
    tag: 'Dry Cleaning',
    title: 'Delicate & Formal Wear',
    description: 'Professional dry cleaning for suits, dresses, and delicates — expert care guaranteed.',
    cta: 'See Pricing',
    ctaHref: '#pricing',
    accent: '#8B1A1A',
    ctaColor: '#8B1A1A',
  },
  {
    num: '03',
    tag: 'Pickup & Delivery',
    title: 'Door-to-Door Service',
    description: 'We collect from your door and return clean laundry within 24–48 hours.',
    cta: 'Schedule Pickup',
    ctaHref: '#contact',
    accent: '#1A5C28',
    ctaColor: '#1A5C28',
  },
]

const addons = [
  { tag: 'Ironing', title: 'Press & Iron', description: 'Crisp, wrinkle-free results. Per-item pricing.' },
  { tag: 'Stain Removal', title: 'Specialist Treatment', description: 'Stubborn stains handled with professional targeted solutions.' },
]

export default function Services() {
  return (
    <section id="services" className="relative bg-[#F7F4EF] overflow-hidden py-16 lg:py-36">

      {/* Ghost number */}
      <div className="absolute top-0 left-0 select-none pointer-events-none overflow-hidden" aria-hidden>
        <span
          className="font-display font-extrabold text-czysty-green/[0.06] leading-none block"
          style={{ fontSize: 'clamp(100px, 22vw, 280px)' }}
        >
          02
        </span>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 lg:px-14">

        {/* Header row */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4 mb-10 lg:mb-16 reveal">
          <div>
            <div className="section-tag">Our Services</div>
            <h2 className="display-heading" style={{ fontSize: 'clamp(1.2rem, 5.5vw, 4rem)', color: '#09100A' }}>
              EVERYTHING YOUR
              <br />
              <span className="text-czysty-green">WARDROBE NEEDS</span>
            </h2>
          </div>
          <a href="#pricing" className="czysty-btn czysty-btn-green-outline self-start lg:self-end text-sm px-6 py-3">
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
                  style={{ fontSize: 'clamp(1.1rem, 2.5vw, 1.7rem)' }}
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
            <div key={addon.tag} className="bg-white hover:bg-czysty-cream/50 transition-colors duration-300 px-5 sm:px-8 py-5 sm:py-6 flex items-start gap-5 sm:gap-6">
              <div className="w-px self-stretch bg-czysty-red flex-shrink-0" />
              <div>
                <span className="font-body text-czysty-red/70 text-[10px] font-semibold uppercase tracking-widest block mb-1">{addon.tag}</span>
                <h4 className="font-display font-bold text-czysty-black uppercase text-base mb-1">{addon.title}</h4>
                <p className="font-body text-czysty-black/45 text-[13px]">{addon.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
