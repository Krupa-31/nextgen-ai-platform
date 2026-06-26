/*
 * Home Page — Next-Gen AI Platform Landing Page
 *
 * Design System: "Neural Deep Ocean"
 * Color Palette: Forsythia (#FFC801), Nocturnal (#114C5A), Saffron (#FF9932), Oceanic (#172B36), Arctic Powder (#F1F6F4), Mystic Mint (#D9E8E2)
 * Typography: JetBrains Mono (headers), Inter (body)
 * Layout: Asymmetric bento-grid, diagonal gradient sweeps, glass-border cards
 * Motion: CSS-only transitions, 150-200ms micro-interactions, 300-400ms structural transitions
 * Staggered fade-up entrances triggered by viewport intersection
 */

import { useEffect, useRef, useCallback } from "react";
import { Navbar } from "../components/Navbar";
import { HeroSection } from "../components/HeroSection";
import { FeatureShowcase } from "../components/FeatureShowcase";
import { PricingMatrix } from "../components/PricingMatrix";
import { SocialProof } from "../components/SocialProof";
import { FAQSection } from "../components/FAQSection";
import { CTASection } from "../components/CTASection";
import { Footer } from "../components/Footer";

/* ════════════════════════════════════════════════════════════
   Scroll-triggered animation observer
   Adds 'animate-fade-up' when elements enter viewport
   ════════════════════════════════════════════════════════════ */

function useScrollAnimations() {
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-fade-up");
            observerRef.current?.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
    );

    return () => observerRef.current?.disconnect();
  }, []);

  const observe = useCallback((el: HTMLElement | null) => {
    if (el && observerRef.current) {
      observerRef.current.observe(el);
    }
  }, []);

  return { observe };
}

export default function Home() {
  const { observe } = useScrollAnimations();

  return (
    <div className="min-h-screen bg-[#172B36]">
      <Navbar />
      <HeroSection />
      <SocialProof />

      {/* Features section with scroll animation */}
      <div ref={observe} className="animate-fade-up">
        <FeatureShowcase />
      </div>

      <PricingMatrix />

      {/* FAQ section with scroll animation */}
      <div ref={observe} className="animate-fade-up">
        <FAQSection />
      </div>

      <CTASection />
      <Footer />
    </div>
  );
}
