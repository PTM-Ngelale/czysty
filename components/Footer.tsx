'use client'

import Image from 'next/image'

const navLinks = [
  { href: '#services',      label: 'Services' },
  { href: '#how-it-works',  label: 'How It Works' },
  { href: '#pricing',       label: 'Pricing' },
  { href: '#reviews',       label: 'Reviews' },
  { href: '#contact',       label: 'Contact' },
]

const socials = [
  {
    label: 'Instagram',
    href: 'https://instagram.com/',
    icon: <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>,
  },
  {
    label: 'TikTok',
    href: 'https://tiktok.com/',
    icon: <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V9.01a8.16 8.16 0 004.77 1.52V7.07a4.85 4.85 0 01-1-.38z"/></svg>,
  },
  {
    label: 'WhatsApp',
    href: 'https://wa.me/2340000000000',
    icon: <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>,
  },
]

export default function Footer() {
  return (
    <footer className="relative bg-czysty-black border-t border-czysty-green/10 overflow-hidden">
      {/* Red left accent */}
      <div className="absolute left-0 top-0 bottom-0 w-1 bg-czysty-red/40" />

      {/* Top strip */}
      <div className="border-b border-czysty-green/8 py-4">
        <div className="max-w-7xl mx-auto px-8 lg:px-14">
          {/* Marquee */}
          <div className="overflow-hidden">
            <div className="flex animate-marquee whitespace-nowrap">
              {Array.from({ length: 2 }).map((_, i) => (
                <span key={i} className="flex items-center gap-8 font-body text-[11px] text-czysty-muted/40 uppercase tracking-[0.2em] pr-8">
                  {['Wash & Fold', 'Dry Cleaning', 'Pickup & Delivery', 'Ironing', 'Stain Removal', 'WhatsApp Booking'].map((item) => (
                    <span key={item} className="flex items-center gap-8">
                      <span className="w-1 h-1 rounded-full bg-czysty-green/40 inline-block" />
                      {item}
                    </span>
                  ))}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="max-w-7xl mx-auto px-8 lg:px-14 py-16">
        <div className="grid md:grid-cols-[2fr_1fr_1fr] gap-12">

          {/* Brand */}
          <div>
            <Image src="/images/logo.png" alt="Czysty Cleaners" width={130} height={44} className="object-contain mb-5 opacity-90" />
            <p className="font-body text-czysty-muted text-[13px] leading-relaxed max-w-xs mb-8">
              Professional laundry and dry cleaning with door-to-door service. Clean clothes, every time, without compromise.
            </p>
            <div className="flex items-center gap-3">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="w-8 h-8 border border-czysty-green/20 flex items-center justify-center text-czysty-muted hover:text-czysty-green hover:border-czysty-green/60 transition-all duration-200"
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="font-display font-bold text-czysty-cream uppercase text-[11px] tracking-widest mb-5">Navigation</h4>
            <ul className="space-y-3">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a href={link.href} className="font-body text-czysty-muted text-[13px] hover:text-czysty-light transition-colors duration-200">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact info */}
          <div>
            <h4 className="font-display font-bold text-czysty-cream uppercase text-[11px] tracking-widest mb-5">Contact</h4>
            <ul className="space-y-3">
              <li>
                <p className="font-body text-[10px] text-czysty-muted/50 uppercase tracking-widest mb-0.5">Hours</p>
                <p className="font-body text-czysty-muted text-[13px]">Mon – Sat · 8am – 6pm</p>
              </li>
              <li>
                <p className="font-body text-[10px] text-czysty-muted/50 uppercase tracking-widest mb-0.5">Email</p>
                <p className="font-body text-czysty-muted text-[13px]">hello@czystycleaners.com</p>
              </li>
              <li>
                <p className="font-body text-[10px] text-czysty-muted/50 uppercase tracking-widest mb-0.5">WhatsApp</p>
                <p className="font-body text-czysty-muted text-[13px]">+234 000 000 0000</p>
              </li>
            </ul>
            <a href="#contact" className="czysty-btn czysty-btn-primary mt-6 text-[11px] px-5 py-3 w-full justify-center">
              Book a Pickup
            </a>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-czysty-green/8 mt-12 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="font-body text-czysty-muted/40 text-[11px]">
            © {new Date().getFullYear()} Czysty Cleaners Int&apos;l Ltd. All rights reserved.
          </p>
          <div className="flex items-center gap-1">
            <div className="w-1.5 h-1.5 rounded-full bg-czysty-green" />
            <p className="font-body text-czysty-muted/30 text-[11px]">Built in Lagos</p>
          </div>
        </div>
      </div>
    </footer>
  )
}
