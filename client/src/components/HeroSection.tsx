/*
 * Hero Section — "Neural Deep Ocean" design system
 * Dark oceanic background with golden bioluminescent accents
 * 3D-effect grid visualization on the right side
 * Bold headline with monospaced font for technical credibility
 *
 * Brand colors: Forsythia (#FFC801), Nocturnal (#114C5A), Saffron (#FF9932), Oceanic (#172B36)
 */

import { useEffect, useState } from "react";

export function HeroSection() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
  }, []);

  const metrics = [
    { value: "12ms", label: "Latency", suffix: "" },
    { value: "10x", label: "Faster", suffix: "Automation" },
    { value: "99.9%", label: "Uptime", suffix: "SLA" },
  ];

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-[#172B36] pt-20">
      {/* Background gradient sweep */}
      <div className="absolute inset-0">
        <div
          className="absolute top-0 right-0 w-[70%] h-full opacity-20"
          style={{
            background: "linear-gradient(135deg, #FFC801 0%, #FF9932 40%, transparent 70%)",
          }}
        />
        <div
          className="absolute bottom-0 left-0 w-[50%] h-[60%] opacity-10"
          style={{
            background: "radial-gradient(ellipse at 30% 80%, #114C5A 0%, transparent 70%)",
          }}
        />
      </div>

      {/* Subtle grid pattern overlay */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(#FFC801 1px, transparent 1px), linear-gradient(90deg, #FFC801 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      <div className="container relative z-10 py-20 lg:py-28">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left content */}
          <div
            className={`transition-all duration-500 ${
              loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#FFC801]/10 border border-[#FFC801]/20 mb-6">
              <span className="w-2 h-2 rounded-full bg-[#FFC801] animate-pulse-dot" />
              <span className="text-[#FFC801] font-mono text-xs tracking-widest uppercase">
                Now Live — v3.0
              </span>
            </div>

            {/* Headline */}
            <h1 className="font-mono text-4xl sm:text-5xl lg:text-6xl font-bold text-[#F1F6F4] leading-[1.1] tracking-tight mb-6">
              Automate at{" "}
              <span className="relative inline-block">
                <span className="relative z-10 bg-gradient-to-r from-[#FFC801] to-[#FF9932] bg-clip-text text-transparent">
                  neural
                </span>
                <span className="absolute bottom-1 left-0 right-0 h-[3px] bg-gradient-to-r from-[#FFC801] to-[#FF9932] rounded-full opacity-60" />
              </span>{" "}
              scale
            </h1>

            {/* Subheadline */}
            <p className="text-[#D9E8E2]/80 text-lg lg:text-xl leading-relaxed mb-8 max-w-lg font-sans">
              The intelligence layer that orchestrates your data pipelines, deploys
              autonomous agents, and scales your automation from prototype to
              production — in minutes.
            </p>

            {/* CTA buttons */}
            <div className="flex flex-wrap gap-4 mb-12">
              <a
                href="#pricing"
                className="group relative inline-flex items-center gap-2 px-7 py-3.5 bg-gradient-to-r from-[#FFC801] to-[#FF9932] text-[#172B36] font-mono font-bold text-sm rounded-lg hover:shadow-xl hover:shadow-[#FFC801]/25 transition-all duration-200 active:scale-95"
              >
                Build a Workflow
                <svg
                  className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </a>
              <a
                href="#features"
                className="inline-flex items-center gap-2 px-7 py-3.5 border border-[#D9E8E2]/20 text-[#F1F6F4] font-mono font-medium text-sm rounded-lg hover:border-[#FFC801]/50 hover:bg-[#FFC801]/5 transition-all duration-200"
              >
                Explore Features
              </a>
            </div>

            {/* Metrics */}
            <div className="flex gap-8 sm:gap-12">
              {metrics.map((m, i) => (
                <div
                  key={m.label}
                  className={`transition-all duration-500 delay-${150 + i * 100}ms ${
                    loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                  }`}
                >
                  <div className="font-mono text-2xl lg:text-3xl font-bold text-[#FFC801]">
                    {m.value}
                  </div>
                  <div className="text-[#D9E8E2]/60 text-xs font-medium tracking-wider uppercase mt-1">
                    {m.label} {m.suffix && <span className="text-[#FF9932]"> · {m.suffix}</span>}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right — 3D Grid Visual */}
          <div
            className={`relative transition-all duration-700 delay-200 ${
              loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <div className="relative rounded-2xl overflow-hidden border border-[#D9E8E2]/10 shadow-2xl shadow-black/40">
              {/* Gradient overlay on image */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#172B36] via-transparent to-transparent z-10 pointer-events-none" />
              <img
                src="/manus-storage/hero-grid-visual_546df91b.png"
                alt="Neural AI network data visualization with 3D grid structure"
                className="w-full h-auto object-cover"
                loading="eager"
              />
              {/* Floating badge on visual */}
              <div className="absolute bottom-6 left-6 right-6 z-20 flex items-center justify-between">
                <div className="flex items-center gap-3 px-4 py-2 bg-[#172B36]/80 backdrop-blur-lg rounded-lg border border-[#D9E8E2]/10">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse-dot" />
                  <span className="text-[#F1F6F4] font-mono text-xs">
                    Live Pipeline · 47 nodes active
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
