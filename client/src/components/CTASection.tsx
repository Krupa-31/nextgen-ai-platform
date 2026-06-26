/*
 * CTASection — Final call-to-action before footer
 *
 * Brand colors: Forsythia (#FFC801), Nocturnal (#114C5A), Saffron (#FF9932), Oceanic (#172B36)
 */

import { useEffect, useState } from "react";

export function CTASection() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <section className="relative py-20 lg:py-28 bg-[#172B36] overflow-hidden">
      {/* Diagonal gradient sweep */}
      <div
        className="absolute inset-0"
        style={{
          background: "linear-gradient(135deg, rgba(255,200,1,0.08) 0%, rgba(255,153,50,0.04) 40%, transparent 70%)",
        }}
      />

      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-64 h-64 rounded-full bg-[#FFC801]/5 blur-3xl" />
      <div className="absolute bottom-0 right-0 w-80 h-80 rounded-full bg-[#FF9932]/5 blur-3xl" />

      <div className="container relative z-10 text-center">
        <div
          className={`transition-all duration-500 ${
            mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <h2 className="font-mono text-3xl sm:text-4xl lg:text-5xl font-bold text-[#F1F6F4] tracking-tight mb-4">
            Ready to deploy at{" "}
            <span className="bg-gradient-to-r from-[#FFC801] to-[#FF9932] bg-clip-text text-transparent">
              neural scale
            </span>
            ?
          </h2>
          <p className="text-[#D9E8E2]/60 text-lg max-w-xl mx-auto mb-8 font-sans">
            Join 2,400+ teams already automating their data empire.
            Start free — no credit card required.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button className="group relative inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-[#FFC801] to-[#FF9932] text-[#172B36] font-mono font-bold text-base rounded-lg hover:shadow-2xl hover:shadow-[#FFC801]/25 transition-all duration-200 active:scale-95">
              Start Building Free
              <svg
                className="w-5 h-5 transition-transform duration-200 group-hover:translate-x-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </button>
            <button className="px-8 py-4 border border-[#D9E8E2]/20 text-[#F1F6F4] font-mono font-medium text-base rounded-lg hover:border-[#FFC801]/50 hover:bg-[#FFC801]/5 transition-all duration-200">
              Schedule a Demo
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
