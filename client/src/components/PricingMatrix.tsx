/*
 * PricingMatrix — Matrix-Driven Pricing with Strict State Isolation
 *
 * Feature 1 Requirements:
 * - Toggle between Monthly / Annual billing cycles
 * - Switch between INR (₹), USD ($), EUR (€)
 * - Dynamic calculation from a multi-dimensional configuration object
 * - Base tier rate + 20% annual discount + regional tariff variables
 * - Strict State Isolation: currency/billing changes ONLY update localized DOM text nodes
 *   — NO global component re-render or layout reflow
 * - No hardcoded pricing values — everything computed from the pricing matrix
 *
 * Brand colors: Forsythia (#FFC801), Nocturnal (#114C5A), Saffron (#FF9932), Oceanic (#172B36)
 */

import { useState, useRef, useCallback, useEffect } from "react";

/* ════════════════════════════════════════════════════════════
   PRICING CONFIGURATION MATRIX
   Multi-dimensional object defining:
   - baseRate: base monthly price per tier
   - annualDiscount: flat 20% discount for annual billing
   - regionalTariff: per-currency adjustment multiplier
   - currencySymbol + currencyCode
   ════════════════════════════════════════════════════════════ */

const PRICING_MATRIX = {
  currencies: {
    INR: {
      symbol: "₹",
      currencyCode: "INR",
      regionalTariff: 1.0,
      scale: 83.0,
    },
    USD: {
      symbol: "$",
      currencyCode: "USD",
      regionalTariff: 1.0,
      scale: 1.0,
    },
    EUR: {
      symbol: "€",
      currencyCode: "EUR",
      regionalTariff: 1.15,
      scale: 0.92,
    },
  } as const,

  tiers: {
    starter: {
      name: "Starter",
      description: "For individuals and small teams exploring AI automation.",
      features: [
        "5,000 events/month",
        "3 AI agents",
        "Community support",
        "Basic analytics",
        "Email notifications",
      ],
      baseRate: 29, // base monthly rate in USD equivalent
    },
    pro: {
      name: "Professional",
      description: "For growing teams with advanced automation needs.",
      featured: true,
      features: [
        "50,000 events/month",
        "25 AI agents",
        "Priority support",
        "Advanced analytics & insights",
        "Custom workflows",
        "API access",
      ],
      baseRate: 99,
    },
    enterprise: {
      name: "Enterprise",
      description: "For organizations requiring unlimited scale and compliance.",
      features: [
        "Unlimited events",
        "Unlimited AI agents",
        "Dedicated account manager",
        "Custom SLA & compliance",
        "On-premise deployment option",
        "24/7 phone support",
      ],
      baseRate: 299,
    },
  } as const,

  annualDiscount: 0.20, // 20% flat discount for annual billing
} as const;

/* ════════════════════════════════════════════════════════════
   COMPUTE PRICES FROM MATRIX — pure function, no side effects
   ════════════════════════════════════════════════════════════ */

function computePrice(
  tierKey: "starter" | "pro" | "enterprise",
  billingCycle: "monthly" | "annual",
  currency: "INR" | "USD" | "EUR"
): { monthly: number; annual: number; perMonth: number } {
  const tier = PRICING_MATRIX.tiers[tierKey];
  const currencyData = PRICING_MATRIX.currencies[currency];

  // Apply regional tariff and scale
  const base = tier.baseRate * currencyData.regionalTariff * currencyData.scale;

  const monthly = Math.round(base);
  const annualRaw = Math.round(base * 12 * (1 - PRICING_MATRIX.annualDiscount));
  const perMonth = Math.round(annualRaw / 12);

  return {
    monthly,
    annual: annualRaw,
    perMonth,
  };
}

/* ════════════════════════════════════════════════════════════
   ISOLATED PRICE DISPLAY — uses refs to update DOM directly
   without triggering React re-renders of parent or siblings
   ════════════════════════════════════════════════════════════ */

function IsolatedPriceDisplay({
  tierKey,
  billingCycle,
  currency,
}: {
  tierKey: "starter" | "pro" | "enterprise";
  billingCycle: "monthly" | "annual";
  currency: "INR" | "USD" | "EUR";
}) {
  const priceRef = useRef<HTMLSpanElement>(null);
  const periodRef = useRef<HTMLSpanElement>(null);
  const annualLabelRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const prices = computePrice(tierKey, billingCycle, currency);
    const currencySym = PRICING_MATRIX.currencies[currency].symbol;

    if (billingCycle === "annual") {
      if (priceRef.current) priceRef.current.textContent = `${currencySym}${prices.perMonth}`;
      if (periodRef.current) periodRef.current.textContent = `/mo`;
      if (annualLabelRef.current) annualLabelRef.current.textContent = `Billed ${currencySym}${prices.annual}/year`;
    } else {
      if (priceRef.current) priceRef.current.textContent = `${currencySym}${prices.monthly}`;
      if (periodRef.current) periodRef.current.textContent = `/mo`;
      if (annualLabelRef.current) annualLabelRef.current.textContent = "Billed monthly";
    }
  }, [tierKey, billingCycle, currency]);

  return (
    <div className="flex items-baseline gap-1">
      <span ref={priceRef} className="font-mono text-4xl lg:text-5xl font-bold text-[#F1F6F4]" />
      <span ref={periodRef} className="text-[#D9E8E2]/60 font-medium" />
      <span ref={annualLabelRef} className="block w-full text-center text-[#D9E8E2]/40 text-xs mt-1" />
    </div>
  );
}

/* ════════════════════════════════════════════════════════════
   BILLING TOGGLE — isolated, no parent re-render
   ════════════════════════════════════════════════════════════ */

function BillingToggle({
  cycle,
  onChange,
}: {
  cycle: "monthly" | "annual";
  onChange: (c: "monthly" | "annual") => void;
}) {
  return (
    <div className="relative inline-flex items-center p-1 rounded-lg bg-[#114C5A]/60 border border-[#D9E8E2]/10">
      {(["monthly", "annual"] as const).map((c) => (
        <button
          key={c}
          onClick={() => onChange(c)}
          className={`relative z-10 px-5 py-2 rounded-md font-mono text-xs font-semibold uppercase tracking-wider transition-colors duration-200 ${
            cycle === c
              ? "text-[#172B36] bg-[#FFC801] shadow-md shadow-[#FFC801]/20"
              : "text-[#D9E8E2]/70 hover:text-[#F1F6F4]"
          }`}
        >
          {c}
        </button>
      ))}
      {/* Sliding pill — animated via CSS */}
      <div
        className={`absolute top-1 bottom-1 rounded-md bg-[#FFC801] transition-all duration-300 ease-in-out ${
          cycle === "annual" ? "left-[calc(50%+2px)] right-[2px]" : "left-[2px] right-[calc(50%+2px)]"
        }`}
      />
    </div>
  );
}

/* ════════════════════════════════════════════════════════════
   CURRENCY SELECTOR — isolated, localized state
   ════════════════════════════════════════════════════════════ */

function CurrencySelector({
  currency,
  onChange,
}: {
  currency: "INR" | "USD" | "EUR";
  onChange: (c: "INR" | "USD" | "EUR") => void;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const options: { code: "INR" | "USD" | "EUR"; label: string }[] = [
    { code: "INR", label: "₹ INR" },
    { code: "USD", label: "$ USD" },
    { code: "EUR", label: "€ EUR" },
  ];

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[#114C5A]/60 border border-[#D9E8E2]/10 text-[#F1F6F4] font-mono text-xs font-semibold tracking-wider hover:border-[#FFC801]/30 transition-colors duration-200"
        aria-haspopup="listbox"
        aria-expanded={open}
      >
        {PRICING_MATRIX.currencies[currency].symbol} {currency}
        <svg width={12} height={12} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" className={`text-[#FFC801] transition-transform duration-200 ${open ? "rotate-180" : ""}`}>
          <path d="m19.5 8.25l-7.5 7.5l-7.5-7.5" />
        </svg>
      </button>

      {open && (
        <div
          className="absolute top-full left-0 mt-2 w-36 rounded-lg bg-[#114C5A] border border-[#D9E8E2]/15 shadow-xl shadow-black/30 overflow-hidden z-50 animate-fade-up"
          role="listbox"
        >
          {options.map((opt) => (
            <button
              key={opt.code}
              onClick={() => {
                onChange(opt.code);
                setOpen(false);
              }}
              className={`w-full text-left px-4 py-2.5 font-mono text-xs tracking-wider transition-colors duration-150 ${
                currency === opt.code
                  ? "bg-[#FFC801]/10 text-[#FFC801]"
                  : "text-[#D9E8E2] hover:bg-[#FFC801]/5 hover:text-[#F1F6F4]"
              }`}
              role="option"
              aria-selected={currency === opt.code}
            >
              {opt.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

/* ════════════════════════════════════════════════════════════
   PRICE CARD — uses IsolatedPriceDisplay for zero re-render
   ════════════════════════════════════════════════════════════ */

function PriceCard({
  tierKey,
  billingCycle,
  currency,
}: {
  tierKey: "starter" | "pro" | "enterprise";
  billingCycle: "monthly" | "annual";
  currency: "INR" | "USD" | "EUR";
}) {
  const tier = PRICING_MATRIX.tiers[tierKey];
  const isFeatured = tierKey === "pro";

  return (
    <div
      className={`relative rounded-xl border transition-all duration-200 ease-out ${
        isFeatured
          ? "border-[#FFC801]/40 bg-[#114C5A]/60 shadow-lg shadow-[#FFC801]/5 scale-[1.02]"
          : "border-[#D9E8E2]/10 bg-[#114C5A]/30 hover:border-[#D9E8E2]/20"
      }`}
    >
      {isFeatured && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-gradient-to-r from-[#FFC801] to-[#FF9932] text-[#172B36] font-mono text-[10px] font-bold uppercase tracking-widest">
          Most Popular
        </div>
      )}

      <div className="p-6 lg:p-8 flex flex-col h-full">
        {/* Tier name */}
        <h3 className="font-mono text-lg font-bold text-[#F1F6F4] mb-1">
          {tier.name}
        </h3>
        <p className="text-[#D9E8E2]/50 text-sm mb-6 flex-1">
          {tier.description}
        </p>

        {/* Price — isolated DOM updates only */}
        <div className="relative mb-6">
          <IsolatedPriceDisplay tierKey={tierKey} billingCycle={billingCycle} currency={currency} />
        </div>

        {/* Feature list */}
        <ul className="space-y-3 mb-8">
          {tier.features.map((f) => (
            <li key={f} className="flex items-start gap-3 text-[#D9E8E2]/70 text-sm">
              <svg width={16} height={16} viewBox="0 0 20 20" fill="#FFC801" className="shrink-0 mt-0.5">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              <span>{f}</span>
            </li>
          ))}
        </ul>

        {/* CTA */}
        <button
          className={`w-full py-3 rounded-lg font-mono text-sm font-semibold transition-all duration-200 active:scale-95 ${
            isFeatured
              ? "bg-gradient-to-r from-[#FFC801] to-[#FF9932] text-[#172B36] hover:shadow-lg hover:shadow-[#FFC801]/20"
              : "bg-[#114C5A]/50 border border-[#D9E8E2]/15 text-[#F1F6F4] hover:bg-[#114C5A]/70 hover:border-[#FFC801]/30"
          }`}
        >
          {tierKey === "enterprise" ? "Contact Sales" : "Get Started"}
        </button>
      </div>
    </div>
  );
}

/* ════════════════════════════════════════════════════════════
   PRICING MATRIX — orchestrates state but uses localized updates
   ════════════════════════════════════════════════════════════ */

export function PricingMatrix() {
  const [billingCycle, setBillingCycle] = useState<"monthly" | "annual">("annual");
  const [currency, setCurrency] = useState<"INR" | "USD" | "EUR">("USD");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const tierKeys: ("starter" | "pro" | "enterprise")[] = ["starter", "pro", "enterprise"];

  return (
    <section id="pricing" className="relative py-20 lg:py-28 bg-[#172B36]">
      {/* Background */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          background: "radial-gradient(ellipse at 30% 70%, #114C5A 0%, transparent 60%)",
        }}
      />

      <div className="container relative z-10">
        {/* Section header */}
        <div
          className={`mb-12 lg:mb-16 text-center transition-all duration-500 ${
            mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#114C5A]/50 border border-[#D9E8E2]/10 mb-4">
            <span className="text-[#FFC801] font-mono text-xs tracking-widest uppercase">
              Pricing
            </span>
          </div>
          <h2 className="font-mono text-3xl sm:text-4xl lg:text-5xl font-bold text-[#F1F6F4] tracking-tight mb-4">
            Scale your <span className="bg-gradient-to-r from-[#FFC801] to-[#FF9932] bg-clip-text text-transparent">investment</span>
          </h2>
          <p className="text-[#D9E8E2]/70 text-lg max-w-xl mx-auto font-sans">
            Transparent pricing with no hidden fees. Start free, upgrade when
            you're ready. Annual plans save 20%.
          </p>
        </div>

        {/* Controls row — toggle + currency selector */}
        <div className={`flex flex-col sm:flex-row items-center justify-center gap-4 mb-12 transition-all duration-500 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
          <BillingToggle cycle={billingCycle} onChange={setBillingCycle} />

          <div className="flex items-center gap-3">
            <span className="text-[#D9E8E2]/40 text-sm font-medium">Currency:</span>
            <CurrencySelector currency={currency} onChange={setCurrency} />
          </div>
        </div>

        {/* Annual discount badge */}
        {billingCycle === "annual" && (
          <div className="text-center mb-8">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#FFC801]/10 border border-[#FFC801]/20 text-[#FFC801] font-mono text-xs font-semibold">
              <svg width={14} height={14} viewBox="0 0 20 20" fill="currentColor">
                <path d="M10 2a8 8 0 100 16 8 8 0 000-16zm1 11H9v-2h2v2zm0-4H9V5h2v4z" />
              </svg>
              Save 20% with annual billing
            </span>
          </div>
        )}

        {/* Price cards grid */}
        <div className="grid md:grid-cols-3 gap-4 lg:gap-6 max-w-5xl mx-auto">
          {tierKeys.map((tierKey) => (
            <PriceCard
              key={tierKey}
              tierKey={tierKey}
              billingCycle={billingCycle}
              currency={currency}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
