/*
 * Navbar — "Neural Deep Ocean" design system
 * Dark background with Forsythia gold accent for logo and active states
 * Uses inline SVG icons only — no external icon libraries
 */

import { useState, useEffect } from "react";
import { BrandLogoIcon, XMarkIcon } from "./Icons";

const navLinks = [
  { label: "Features", href: "#features" },
  { label: "Pricing", href: "#pricing" },
  { label: "Testimonials", href: "#testimonials" },
  { label: "FAQ", href: "#faq" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (href: string) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
    setMobileOpen(false);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#172B36]/90 backdrop-blur-xl border-b border-[#D9E8E2]/10 shadow-lg shadow-black/20"
          : "bg-transparent"
      }`}
    >
      <nav className="container flex items-center justify-between py-4">
        {/* Logo */}
        <a href="#" className="flex items-center gap-3 group" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: "smooth" }); }}>
          <BrandLogoIcon size={36} className="text-[#FFC801] transition-transform duration-300 group-hover:scale-110" />
          <span className="font-mono text-xl font-bold text-[#F1F6F4] tracking-tight">
            <span className="text-[#FFC801]">Neural</span>AI
          </span>
        </a>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <button
              key={link.href}
              onClick={() => scrollTo(link.href)}
              className="text-[#D9E8E2] hover:text-[#FFC801] font-medium text-sm tracking-wide transition-colors duration-200 relative after:absolute after:bottom-[-2px] after:left-0 after:w-0 after:h-[2px] after:bg-[#FFC801] after:transition-all after:duration-200 hover:after:w-full"
            >
              {link.label}
            </button>
          ))}
          <button
            onClick={() => scrollTo("#pricing")}
            className="ml-4 px-5 py-2.5 bg-[#FFC801] text-[#172B36] font-mono font-semibold text-sm rounded-lg hover:bg-[#FF9932] hover:shadow-lg hover:shadow-[#FFC801]/20 transition-all duration-200 active:scale-95"
          >
            Get Started
          </button>
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden text-[#F1F6F4] p-2"
          aria-label="Toggle navigation"
        >
          {mobileOpen ? (
            <XMarkIcon size={24} />
          ) : (
            <svg width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round">
              <path d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </nav>

      {/* Mobile menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          mobileOpen ? "max-h-64 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="container pb-4 flex flex-col gap-3">
          {navLinks.map((link) => (
            <button
              key={link.href}
              onClick={() => scrollTo(link.href)}
              className="text-[#D9E8E2] hover:text-[#FFC801] font-medium text-base tracking-wide transition-colors duration-200 text-left py-2"
            >
              {link.label}
            </button>
          ))}
          <button
            onClick={() => scrollTo("#pricing")}
            className="mt-2 px-5 py-2.5 bg-[#FFC801] text-[#172B36] font-mono font-semibold text-sm rounded-lg hover:bg-[#FF9932] transition-all duration-200 active:scale-95"
          >
            Get Started
          </button>
        </div>
      </div>
    </header>
  );
}
