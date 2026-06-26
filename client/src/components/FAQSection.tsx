/*
 * FAQSection — Accordion FAQ with smooth transitions
 *
 * Pattern: Click to expand, one open at a time on mobile, multiple on desktop
 * Transitions: 300ms ease-in-out for height, 150ms ease-out for color/border
 *
 * Brand colors: Forsythia (#FFC801), Nocturnal (#114C5A), Saffron (#FF9932), Oceanic (#172B36)
 */

import { useState, useEffect } from "react";

interface FAQItem {
  question: string;
  answer: string;
}

const faqs: FAQItem[] = [
  {
    question: "What makes NeuralAI different from other automation platforms?",
    answer:
      "NeuralAI combines autonomous AI agents with a neural-scale data processing engine. Unlike traditional workflow builders, our platform uses natural language triggers and learns from your data patterns to optimize pipelines in real time. The result is 10x faster automation deployment with sub-millisecond event processing.",
  },
  {
    question: "How does the pricing matrix work across currencies?",
    answer:
      "Our pricing is computed from a multi-dimensional configuration matrix that accounts for base tier rates, annual discounts (20% for yearly plans), and regional tariff adjustments. You can toggle between INR, USD, and EUR — each with its own localized pricing that reflects regional purchasing power.",
  },
  {
    question: "Can I deploy agents on my own infrastructure?",
    answer:
      "Yes. The Enterprise tier includes an on-premise deployment option with full air-gapped support. Your agents, data, and workflows never leave your infrastructure. We also provide hybrid cloud options where core processing stays on our managed infrastructure while sensitive data remains local.",
  },
  {
    question: "What kind of support do you provide?",
    answer:
      "Support scales with your tier: Starter includes community forums and documentation; Professional adds priority email support with 4-hour SLA; Enterprise gets a dedicated account manager, 24/7 phone support, and custom SLA agreements with guaranteed uptime commitments.",
  },
  {
    question: "Is my data encrypted and secure?",
    answer:
      "Absolutely. We use end-to-end encryption with zero-trust architecture. Every data transaction is authenticated, audited, and immutable. We're SOC 2 Type II certified and compliant with GDPR, HIPAA, and ISO 27001. Our Secure Guard pillar ensures compliance at every layer.",
  },
  {
    question: "How quickly can I go from signup to production?",
    answer:
      "Most teams deploy their first AI agent within 15 minutes of signup. Our no-code workflow builder and natural language interface mean you don't need engineering resources to get started. Full production readiness typically takes 1-2 days for Standard tiers and includes our guided onboarding process.",
  },
];

function ChevronIcon({ open, size = 20 }: { open: boolean; size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`transition-transform duration-300 ease-in-out ${open ? "rotate-180" : ""}`}
    >
      <path d="m19.5 8.25l-7.5 7.5l-7.5-7.5" />
    </svg>
  );
}

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const toggle = (index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  return (
    <section id="faq" className="relative py-20 lg:py-28 bg-[#172B36]">
      {/* Background */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          background: "radial-gradient(ellipse at 50% 50%, #114C5A 0%, transparent 60%)",
        }}
      />

      <div className="container relative z-10 max-w-3xl">
        {/* Section header */}
        <div
          className={`text-center mb-12 lg:mb-16 transition-all duration-500 ${
            mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#114C5A]/50 border border-[#D9E8E2]/10 mb-4">
            <span className="text-[#FFC801] font-mono text-xs tracking-widest uppercase">
              FAQ
            </span>
          </div>
          <h2 className="font-mono text-3xl sm:text-4xl lg:text-5xl font-bold text-[#F1F6F4] tracking-tight mb-4">
            Common <span className="bg-gradient-to-r from-[#FFC801] to-[#FF9932] bg-clip-text text-transparent">questions</span>
          </h2>
          <p className="text-[#D9E8E2]/70 text-lg font-sans">
            Everything you need to know before getting started.
          </p>
        </div>

        {/* FAQ items */}
        <div className="flex flex-col gap-3">
          {faqs.map((faq, i) => {
            const isOpen = openIndex === i;

            return (
              <div
                key={i}
                className={`rounded-xl border transition-all duration-200 ease-out overflow-hidden ${
                  isOpen
                    ? "border-[#FFC801]/30 bg-[#114C5A]/60"
                    : "border-[#D9E8E2]/10 bg-[#114C5A]/30 hover:border-[#D9E8E2]/20"
                }`}
                style={{
                  transitionDelay: mounted ? `${i * 50}ms` : "0ms",
                }}
              >
                <button
                  onClick={() => toggle(i)}
                  className="w-full flex items-center gap-4 p-5 text-left"
                  aria-expanded={isOpen}
                  aria-controls={`faq-answer-${i}`}
                >
                  <div
                    className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 transition-colors duration-200 ${
                      isOpen
                        ? "bg-[#FFC801]/20"
                        : "bg-[#FFC801]/5"
                    }`}
                  >
                    <ChevronIcon
                      open={isOpen}
                      size={16}
                    />
                  </div>
                  <span className="font-mono text-sm font-semibold text-[#F1F6F4] flex-1">
                    {faq.question}
                  </span>
                </button>

                <div
                  className={`transition-all duration-300 ease-in-out ${
                    isOpen ? "max-h-[400px] opacity-100" : "max-h-0 opacity-0"
                  } overflow-hidden`}
                  id={`faq-answer-${i}`}
                >
                  <div className="px-5 pb-5 pt-0">
                    <div className="ml-12">
                      <p className="text-[#D9E8E2]/60 text-sm leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
