'use client'

const mainServices = [
  {
    label:    'Standard Cleaning',
    price:    '₦4,999',
    from:     true,
    detail:   'Professional home cleaning — bedroom, bathroom, kitchen & living areas.',
    featured: false,
  },
  {
    label:    'Deep Cleaning',
    price:    '₦9,999',
    from:     true,
    detail:   'Thorough top-to-bottom clean including hard-to-reach areas and fixtures.',
    featured: true,
  },
  {
    label:    'Wash, Dry & Fold',
    price:    '₦9,999',
    from:     false,
    detail:   'One off payment gives you the power to wash up to 50 items monthly with 1 free pick up.',
    featured: false,
  },
]

const dryClean = [
  { item: 'Corporate Shirt', price: '₦2,150' },
  { item: 'Dress',           price: '₦1,800' },
  { item: 'Duvet',           price: 'from ₦3,500' },
  { item: 'Suit',            price: '₦3,500' },
  { item: 'Senator',         price: '₦3,500' },
]

const addons = [
  { label: 'Ironing Only',   detail: 'Per item',  price: '₦750' },
  { label: 'Express (12 hr)', detail: 'Surcharge', price: '+50%' },
]

function SectionLabel({ color, children }: { color: string; children: string }) {
  return (
    <div className="flex items-center gap-4 mb-6 sm:mb-8">
      <div className="h-px flex-1" style={{ background: `linear-gradient(90deg, transparent, ${color}30)` }} />
      <span className="font-body text-[10px] font-semibold uppercase tracking-[0.25em]" style={{ color: `${color}90` }}>
        {children}
      </span>
      <div className="h-px flex-1" style={{ background: `linear-gradient(90deg, ${color}30, transparent)` }} />
    </div>
  )
}

export default function Pricing() {
  return (
    <section id="pricing" className="relative bg-white overflow-hidden py-16 lg:py-36">

      {/* Ghost number */}
      <div className="absolute -bottom-4 left-0 select-none pointer-events-none overflow-hidden" aria-hidden>
        <span
          className="font-display font-extrabold text-czysty-green/[0.06] leading-none block"
          style={{ fontSize: 'clamp(100px, 22vw, 280px)' }}
        >
          05
        </span>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 lg:px-14">

        {/* Header */}
        <div className="reveal mb-10 lg:mb-16">
          <div className="section-tag">Pricing</div>
          <h2 className="display-heading" style={{ fontSize: 'clamp(1.2rem, 5.5vw, 4rem)', color: '#09100A' }}>
            CLEAR PRICING,
            <br />
            <span className="text-czysty-green">NO SURPRISES</span>
          </h2>
        </div>

        {/* Main services */}
        <div className="reveal mb-8 sm:mb-14">
          <SectionLabel color="#1A5C28">Our Services</SectionLabel>
          <div className="grid sm:grid-cols-3 gap-3">
            {mainServices.map((svc) => (
              <div
                key={svc.label}
                className={`relative border p-5 sm:p-6 transition-all duration-300 ${
                  svc.featured
                    ? 'border-czysty-green bg-czysty-green pulse-green'
                    : 'border-czysty-green/15 bg-[#F7F4EF] hover:border-czysty-green/35'
                }`}
              >
                {svc.featured && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-czysty-black px-3 py-0.5">
                    <span className="font-body text-czysty-cream text-[10px] font-bold uppercase tracking-widest">Popular</span>
                  </div>
                )}
                <p className={`font-display font-bold uppercase text-[13px] tracking-wide mb-2 ${svc.featured ? 'text-czysty-cream' : 'text-czysty-black'}`}>
                  {svc.label}
                </p>
                <p className={`font-body text-[11px] mb-4 sm:mb-5 leading-relaxed ${svc.featured ? 'text-czysty-cream/70' : 'text-czysty-muted'}`}>
                  {svc.detail}
                </p>
                <p className={`font-display font-extrabold ${svc.featured ? 'text-czysty-cream' : 'text-czysty-green'}`} style={{ fontSize: 'clamp(1.4rem, 3vw, 2rem)' }}>
                  {svc.from && <span className={`font-body font-normal text-sm mr-1 ${svc.featured ? 'text-czysty-cream/70' : 'text-czysty-muted'}`}>from</span>}
                  {svc.price}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* 2-col: Dry Clean + Add-ons */}
        <div className="reveal grid lg:grid-cols-[1.4fr_1fr] gap-6">
          {/* Dry Cleaning */}
          <div>
            <SectionLabel color="#8B1A1A">Dry Cleaning — Per Item</SectionLabel>
            <div className="border border-czysty-red/15 overflow-hidden">
              {dryClean.map((row, i) => (
                <div
                  key={row.item}
                  className={`flex items-center justify-between px-4 sm:px-6 py-4 transition-colors duration-200 hover:bg-czysty-cream/60 ${
                    i % 2 === 0 ? 'bg-white' : 'bg-[#F7F4EF]'
                  } ${i < dryClean.length - 1 ? 'border-b border-czysty-red/08' : ''}`}
                >
                  <span className="font-body text-czysty-black/65 text-[13px] sm:text-[14px]">{row.item}</span>
                  <span className="font-display font-bold text-czysty-red text-base sm:text-lg flex-shrink-0 ml-4">{row.price}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Add-ons */}
          <div>
            <SectionLabel color="#1A5C28">Add-ons &amp; Extras</SectionLabel>
            <div className="flex flex-col gap-3">
              {addons.map((a) => (
                <div key={a.label} className="flex items-center justify-between border border-czysty-green/15 bg-[#F7F4EF] px-4 sm:px-5 py-4 sm:py-5 hover:border-czysty-green/35 transition-colors duration-200">
                  <div>
                    <p className="font-display font-bold text-czysty-black uppercase text-[13px] tracking-wide">{a.label}</p>
                    <p className="font-body text-czysty-muted text-[11px] mt-0.5">{a.detail}</p>
                  </div>
                  <span className="font-display font-extrabold text-czysty-green text-lg sm:text-xl flex-shrink-0 ml-4">{a.price}</span>
                </div>
              ))}

              {/* Note */}
              <div className="mt-3 border-l-2 border-czysty-green/25 pl-4 py-1">
                <p className="font-body text-czysty-muted/70 text-[11px] leading-relaxed">
                  All prices subject to change. Contact us for bulk or bespoke quotes.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
