'use client'

import Image from 'next/image'

const items = [
  { category: 'Facility',   src: '/images/washing-machines.jpeg',   span: 'lg:col-span-2 lg:row-span-2', objectPos: 'object-center' },
  { category: 'Dry Clean',  src: '/images/drycleaned.jpeg',          span: '',                            objectPos: 'object-center' },
  { category: 'Results',    src: '/images/cleaned-sneakers.jpeg',    span: '',                            objectPos: 'object-center' },
  { category: 'Equipment',  src: '/images/washing-machines-2.jpeg',  span: '',                            objectPos: 'object-center' },
  { category: 'Detail',     src: '/images/cleaning.jpeg',            span: '',                            objectPos: 'object-center' },
  { category: 'Team',       src: '/images/pose-with-mop.png',        span: '',                            objectPos: 'object-top' },
]

export default function Gallery() {
  return (
    <section id="gallery" className="relative bg-[#F0EBE2] py-16 lg:py-36 overflow-hidden">

      {/* Ghost number */}
      <div className="absolute top-0 right-0 select-none pointer-events-none overflow-hidden" aria-hidden>
        <span
          className="font-display font-extrabold text-czysty-green/[0.07] leading-none block"
          style={{ fontSize: 'clamp(100px, 22vw, 280px)' }}
        >
          04
        </span>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 lg:px-14">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8 sm:mb-12 reveal">
          <div>
            <div className="section-tag">Our Work</div>
            <h2 className="display-heading" style={{ fontSize: 'clamp(1.2rem, 5.5vw, 4rem)', color: '#09100A' }}>
              SEE THE{' '}
              <span className="text-czysty-green">DIFFERENCE</span>
            </h2>
          </div>
          <p className="font-body text-czysty-black/40 text-[13px] sm:max-w-[200px] sm:text-right leading-relaxed">
            A glimpse into our facility and the team behind every load.
          </p>
        </div>

        {/* Grid */}
        <div className="reveal-stagger grid grid-cols-2 lg:grid-cols-3 gap-2" style={{ gridAutoRows: 'min(200px, 44vw)' }}>
          {items.map((item, i) => (
            <div
              key={i}
              className={`group relative overflow-hidden bg-czysty-cream border border-czysty-green/10 hover:border-czysty-green/35 transition-all duration-500 cursor-pointer shadow-sm ${item.span}`}
            >
              <Image
                src={item.src}
                alt={item.category}
                fill
                className={`object-cover ${item.objectPos} transition-transform duration-700 group-hover:scale-105`}
                sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
              />

              {/* Hover overlay */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-400 flex items-end p-4 sm:p-5"
                style={{ background: 'linear-gradient(to top, rgba(26,92,40,0.8) 0%, transparent 60%)' }}
              >
                <div>
                  <span className="font-body text-[10px] text-czysty-light/80 uppercase tracking-widest block mb-1">{item.category}</span>
                  <div className="w-8 h-px bg-czysty-light/60" />
                </div>
              </div>

              {/* Category badge */}
              <div className="absolute top-2 left-2 sm:top-3 sm:left-3 z-10">
                <span className="font-body text-[9px] font-semibold text-czysty-black/70 uppercase tracking-widest bg-white/80 backdrop-blur-sm px-2 py-1 border border-czysty-green/10">
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
