"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

const navLinks = [
  { href: "#services", label: "Services" },
  { href: "#how-it-works", label: "How It Works" },
  { href: "#pricing", label: "Pricing" },
  { href: "#reviews", label: "Reviews" },
  { href: "#contact", label: "Contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-white/96 backdrop-blur-md border-b border-czysty-green/10 shadow-sm"
          : "bg-transparent"
      }`}
    >
      <div
        className="max-w-7xl mx-auto px-6 lg:px-10 h-18 flex items-center justify-between gap-8"
        style={{ height: "72px" }}
      >
        {/* Logo */}
        <a href="#home">
          <Image
            src="/images/logo.png"
            alt="Czysty Cleaners"
            width={140}
            height={48}
            className=""
            priority
          />
        </a>

        {/* Desktop nav */}
        <ul className="hidden md:flex items-center gap-7">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className={`font-body text-[13px] tracking-wide transition-colors duration-200 relative group ${
                  scrolled
                    ? "text-czysty-black/55 hover:text-czysty-black"
                    : "text-czysty-cream/60 hover:text-czysty-cream"
                }`}
              >
                {link.label}
                <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-czysty-green group-hover:w-full transition-all duration-300" />
              </a>
            </li>
          ))}
        </ul>

        {/* CTA */}
        <a
          href="/booking"
          className="hidden md:inline-flex czysty-btn-nav czysty-btn-primary text-[8px] px-2 py-1 "
        >
          Book Pickup
        </a>

        {/* Hamburger */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
          className="md:hidden flex flex-col justify-center gap-[5px] w-8 h-8 p-1"
        >
          <span
            className={`block h-px transition-all duration-300 ${scrolled ? "bg-czysty-black" : "bg-czysty-cream"} ${menuOpen ? "rotate-45 translate-y-[6px]" : ""}`}
          />
          <span
            className={`block h-px transition-all duration-300 ${scrolled ? "bg-czysty-black" : "bg-czysty-cream"} ${menuOpen ? "opacity-0 w-0" : "w-full"}`}
          />
          <span
            className={`block h-px transition-all duration-300 ${scrolled ? "bg-czysty-black" : "bg-czysty-cream"} ${menuOpen ? "-rotate-45 -translate-y-[6px]" : ""}`}
          />
        </button>
      </div>

      {/* Mobile menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-400 ${menuOpen ? "max-h-96" : "max-h-0"}`}
      >
        <div className="bg-white border-t border-czysty-green/10 px-6 py-6 flex flex-col gap-5">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="font-body text-czysty-black/65 hover:text-czysty-black text-sm tracking-wide transition-colors"
            >
              {link.label}
            </a>
          ))}
          <a
            href="/booking"
            onClick={() => setMenuOpen(false)}
            className="czysty-btn czysty-btn-primary mt-2 text-center text-[11px] rounded-full"
          >
            Book Pickup
          </a>
        </div>
      </div>
    </nav>
  );
}
