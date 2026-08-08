"use client";

import Image from "next/image";

const navLinks = [
  { href: "#services", label: "Services" },
  { href: "#how-it-works", label: "How It Works" },
  { href: "#pricing", label: "Pricing" },
  { href: "#reviews", label: "Reviews" },
  { href: "#contact", label: "Contact" },
];

const socials = [
  {
    label: "Instagram",
    href: "https://instagram.com/",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        className="w-4 h-4"
        aria-hidden="true"
      >
        <rect x="3" y="3" width="18" height="18" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    label: "TikTok",
    href: "https://tiktok.com/",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="currentColor"
        className="w-4 h-4"
        aria-hidden="true"
      >
        <path d="M19.5 7.1a5.8 5.8 0 0 1-3.4-1.1v7.1a5.9 5.9 0 1 1-5.9-5.9c.4 0 .8 0 1.2.1v3.1a2.9 2.9 0 1 0 1.6 2.6V2.5h3.1c.2 1.6 1.5 3 3.4 3.2v1.4Z" />
      </svg>
    ),
  },
  {
    label: "WhatsApp",
    href: "https://wa.me/2348072133343",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        className="w-4 h-4"
        aria-hidden="true"
      >
        <path
          d="M20 11.5a8 8 0 0 1-11.8 7.1L4 20l1.5-4A8 8 0 1 1 20 11.5Z"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M8.5 8.5c.2-.4.4-.4.7-.4h.5c.2 0 .4.1.5.4l.7 1.5c.1.2.1.4-.1.6l-.5.6c-.1.1-.1.3 0 .5.4.7 1.1 1.4 1.8 1.8.2.1.4.1.5 0l.6-.5c.2-.2.4-.2.6-.1l1.5.7c.3.1.4.3.4.5v.5c0 .3 0 .5-.4.7-.4.2-1 .3-1.5.1-1.2-.4-2.4-1.1-3.4-2.1s-1.7-2.2-2.1-3.4c-.2-.5-.1-1.1.1-1.4Z"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
];

export default function Footer() {
  return (
    <footer className="relative">
      {/* Red left accent */}
      <div className="absolute left-0 top-0 h-full w-px bg-czysty-green/20" />

      {/* Top strip */}
      <div className="border-b border-czysty-green/8 py-4">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-14">
          {/* Marquee */}
          <div className="overflow-hidden">
            <div className="flex animate-marquee whitespace-nowrap">
              {Array.from({ length: 2 }).map((_, i) => (
                <span
                  key={i}
                  className="flex items-center gap-8 font-body text-[11px] text-czysty-muted/40 uppercase tracking-[0.2em] pr-8"
                >
                  {[
                    "Wash & Fold",
                    "Dry Cleaning",
                    "Home Cleaning",
                    "Office Cleaning",
                    "Ironing",
                    "WhatsApp Booking",
                  ].map((item) => (
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
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-14 py-10 sm:py-16">
        <div className="grid md:grid-cols-[2fr_1fr_1fr] gap-8 sm:gap-12">
          {/* Brand */}
          <div>
            <div className="inline-block">
              <Image
                src="/images/logo.png"
                alt="Czysty Cleaners"
                width={130}
                height={44}
              />
            </div>

            <p className="font-body text-czysty-muted text-[13px] leading-relaxed max-w-xs mb-8">
              Professional cleaning services for homes and businesses — laundry,
              dry cleaning, and space cleans. Done right, every time.
            </p>

            {/* Socials */}
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
            <h4 className="font-display font-bold text-czysty-cream uppercase text-[11px] tracking-widest mb-5">
              Navigation
            </h4>

            <ul className="space-y-3">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="font-body text-czysty-muted text-[13px] hover:text-czysty-light transition-colors duration-200"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact info */}
          <div>
            <h4 className="font-display font-bold text-czysty-cream uppercase text-[11px] tracking-widest mb-5">
              Contact
            </h4>

            <ul className="space-y-3">
              <li>
                <p className="font-body text-[10px] text-czysty-muted/50 uppercase tracking-widest mb-0.5">
                  Hours
                </p>
                <p className="font-body text-czysty-muted text-[13px]">
                  Mon – Sat · 8am – 6pm
                </p>
              </li>

              <li>
                <p className="font-body text-[10px] text-czysty-muted/50 uppercase tracking-widest mb-0.5">
                  Email
                </p>
                <p className="font-body text-czysty-muted text-[13px]">
                  info.czysty@gmail.com
                </p>
              </li>

              <li>
                <p className="font-body text-[10px] text-czysty-muted/50 uppercase tracking-widest mb-0.5">
                  WhatsApp
                </p>
                <p className="font-body text-czysty-muted text-[13px]">
                  +234 807 213 3343
                </p>
              </li>
            </ul>

            {/* Book Now */}
            <a
              href="#contact"
              className="czysty-btn czysty-btn-primary mt-6 text-[11px] px-5 py-3 w-full justify-center"
            >
              Book Now
            </a>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-czysty-green/8 mt-10 sm:mt-12 pt-5 sm:pt-6 flex flex-col sm:flex-row items-center justify-between gap-5">
          {/* Copyright */}
          <p className="font-body text-czysty-muted/40 text-[11px] text-center sm:text-left">
            © {new Date().getFullYear()} Czysty Cleaners Int&apos;l Ltd. All
            rights reserved.
          </p>

          {/* Powered By Nanotek */}
          <a
            href="https://nanotekai.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Powered by Nanotek AI"
            className="flex items-center gap-2 rounded-full border border-grit-grey bg-white px-3 py-2 hover:border-grit-orange transition-colors duration-200"
          >
            <span className="font-body text-[11px] uppercase tracking-[0.25em] text-grit-black whitespace-nowrap">
              Powered By:
            </span>

            <div className="relative h-7 w-24 shrink-0">
              <Image
                src="/images/nanotek-logo.png"
                alt="Nanotek AI"
                fill
                sizes="96px"
                className="object-contain"
              />
            </div>
          </a>
        </div>
      </div>
    </footer>
  );
}
