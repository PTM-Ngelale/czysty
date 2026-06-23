'use client'

const washFold = [
  { label: 'Small Bag',  detail: 'Up to 5 kg',  price: '₦2,500',  featured: false },
  { label: 'Medium Bag', detail: 'Up to 10 kg', price: '₦4,500',  featured: true  },
  { label: 'Large Bag',  detail: 'Up to 15 kg', price: '₦6,000',  featured: false },
  { label: 'Bulk',       detail: '15 kg+',      price: 'Custom',  featured: false },
]

const dryClean = [
  { item: 'Suit (2-piece)',   price: '₦3,500' },
  { item: 'Dress',            price: '₦2,500' },
  { item: 'Shirt / Blouse',   price: '₦1,200' },
  { item: 'Duvet / Bedding',  price: '₦5,000' },
  { item: 'Trousers',         price: '₦1,500' },
  { item: 'Jacket / Blazer',  price: '₦2,000' },
]

const addons = [
  { label: 'Ironing',         detail: 'Per item',     price: '₦300' },
  { label: 'Stain Treatment', detail: 'Per garment',  price: '₦500' },
  { label: 'Express (12 hr)', detail: 'Surcharge',    price: '+50%' },
]

function SectionLabel({ color, children }: { color: string; children: string }) {
  return (
    <div className="flex items-center gap-4 mb-8">
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
    <section id="pricing" className="relative bg-white overflow-hidden py-28 lg:py-36">

      {/* Ghost number */}
      <div className="absolute -bottom-4 left-0 select-none pointer-events-none overflow-hidden" aria-hidden>
        <span
          className="font-display font-extrabold text-czysty-green/[0.06] leading-none block"
          style={{ fontSize: 'clamp(140px, 22vw, 280px)' }}
        >
          05
        </span>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-8 lg:px-14">

        {/* Header */}
        <div className="reveal mb-16">
          <div className="section-tag">Pricing</div>
          <h2 className="display-heading" style={{ fontSize: 'clamp(2.2rem, 5vw, 4rem)', color: '#09100A' }}>
            CLEAR PRICING,
            <br />
            <span className="text-czysty-green">NO SURPRISES</span>
          </h2>
        </div>

        {/* Wash & Fold */}
        <div className="reveal mb-14">
          <SectionLabel color="#1A5C28">Wash &amp; Fold — Per Bag</SectionLabel>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {washFold.map((rate) => (
              <div
                key={rate.label}
                className={`relative border p-6 transition-all duration-300 ${
                  rate.featured
                    ? 'border-czysty-green bg-czysty-green pulse-green'
                    : 'border-czysty-green/15 bg-[#F7F4EF] hover:border-czysty-green/35'
                }`}
              >
                {rate.featured && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-czysty-black px-3 py-0.5">
                    <span className="font-body text-czysty-cream text-[10px] font-bold uppercase tracking-widest">Popular</span>
                  </div>
                )}
                <p className={`font-display font-bold uppercase text-[13px] tracking-wide mb-1 ${rate.featured ? 'text-czysty-cream' : 'text-czysty-black'}`}>{rate.label}</p>
                <p className={`font-body text-[11px] mb-5 ${rate.featured ? 'text-czysty-cream/70' : 'text-czysty-muted'}`}>{rate.detail}</p>
                <p className={`font-display font-extrabold ${rate.featured ? 'text-czysty-cream' : 'text-czysty-green'}`} style={{ fontSize: 'clamp(1.6rem, 3vw, 2rem)' }}>
                  {rate.price}
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
                  className={`flex items-center justify-between px-6 py-4 transition-colors duration-200 hover:bg-czysty-cream/60 ${
                    i % 2 === 0 ? 'bg-white' : 'bg-[#F7F4EF]'
                  } ${i < dryClean.length - 1 ? 'border-b border-czysty-red/08' : ''}`}
                >
                  <span className="font-body text-czysty-black/65 text-[14px]">{row.item}</span>
                  <span className="font-display font-bold text-czysty-red text-lg">{row.price}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Add-ons */}
          <div>
            <SectionLabel color="#1A5C28">Add-ons &amp; Extras</SectionLabel>
            <div className="flex flex-col gap-3">
              {addons.map((a) => (
                <div key={a.label} className="flex items-center justify-between border border-czysty-green/15 bg-[#F7F4EF] px-5 py-5 hover:border-czysty-green/35 transition-colors duration-200">
                  <div>
                    <p className="font-display font-bold text-czysty-black uppercase text-[13px] tracking-wide">{a.label}</p>
                    <p className="font-body text-czysty-muted text-[11px] mt-0.5">{a.detail}</p>
                  </div>
                  <span className="font-display font-extrabold text-czysty-green text-xl">{a.price}</span>
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
