'use client'

const items = [
  { category: 'Facility',  ph: '🏭', span: 'lg:col-span-2 lg:row-span-2' },
  { category: 'Results',   ph: '👕', span: '' },
  { category: 'Delivery',  ph: '🚚', span: '' },
  { category: 'Dry Clean', ph: '👔', span: '' },
  { category: 'Ironing',   ph: '🔥', span: '' },
  { category: 'Team',      ph: '👥', span: '' },
]

export default function Gallery() {
  return (
    <section id="gallery" className="relative bg-[#F0EBE2] py-28 lg:py-36 overflow-hidden">

      {/* Ghost number */}
      <div className="absolute top-0 right-0 select-none pointer-events-none overflow-hidden" aria-hidden>
        <span
          className="font-display font-extrabold text-czysty-green/[0.07] leading-none block"
          style={{ fontSize: 'clamp(140px, 22vw, 280px)' }}
        >
          04
        </span>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-8 lg:px-14">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-12 reveal">
          <div>
            <div className="section-tag">Our Work</div>
            <h2 className="display-heading" style={{ fontSize: 'clamp(2.2rem, 5vw, 4rem)', color: '#09100A' }}>
              SEE THE{' '}
              <span className="text-czysty-green">DIFFERENCE</span>
            </h2>
          </div>
          <p className="font-body text-czysty-black/40 text-[13px] max-w-[200px] text-right leading-relaxed">
            A glimpse into our facility and the team behind every load.
          </p>
        </div>

        {/* Grid */}
        <div className="reveal-stagger grid grid-cols-2 lg:grid-cols-3 gap-2" style={{ gridAutoRows: '200px' }}>
          {items.map((item, i) => (
            <div
              key={i}
              className={`group relative overflow-hidden bg-white border border-czysty-green/10 hover:border-czysty-green/35 transition-all duration-500 cursor-pointer shadow-sm ${item.span}`}
            >
              {/* Placeholder content */}
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <div className="text-5xl mb-2 opacity-20">{item.ph}</div>
                <p className="font-body text-[10px] text-czysty-muted/50 text-center px-3">
                  gallery-{i + 1}.jpg
                </p>
              </div>

              {/* Hover overlay */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-400 flex items-end p-5"
                style={{ background: 'linear-gradient(to top, rgba(26,92,40,0.8) 0%, transparent 60%)' }}
              >
                <div>
                  <span className="font-body text-[10px] text-czysty-light/80 uppercase tracking-widest block mb-1">{item.category}</span>
                  <div className="w-8 h-px bg-czysty-light/60" />
                </div>
              </div>

              {/* Category badge */}
              <div className="absolute top-3 left-3 z-10">
                <span className="font-body text-[9px] font-semibold text-czysty-black/60 uppercase tracking-widest bg-white/80 backdrop-blur-sm px-2 py-1 border border-czysty-green/10">
                  {item.category}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
