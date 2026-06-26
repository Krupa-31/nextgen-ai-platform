/*
 * FeatureShowcase — Bento-to-Accordion Wrapper with State Persistence
 *
 * Desktop: Bento-grid layout with asymmetric cards
 * Mobile: Fluid accordion list
 * Context Lock: If a bento-node is active on desktop and viewport crosses breakpoint,
 * the corresponding accordion panel opens smoothly.
 *
 * No external UI/animation libraries — pure CSS transitions + Web Animations API.
 * Micro-interactions: 150ms–200ms ease-out
 * Structural transitions: 300ms–400ms ease-in-out
 *
 * Brand colors: Forsythia (#FFC801), Nocturnal (#114C5A), Saffron (#FF9932), Oceanic (#172B36)
 */

import { useState, useEffect, useRef } from "react";
import {
  CubeIcon,
  ChartPieIcon,
  ArrowTrendingUpIcon,
  ArrowPathIcon,
  CogIcon,
  LinkSolidIcon,
  ChevronDownIcon,
} from "./Icons";

interface Feature {
  id: string;
  title: string;
  description: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  colSpan: "1" | "2";
  rowSpan: "1" | "2";
  stat?: string;
  statLabel?: string;
}

const features: Feature[] = [
  {
    id: "secure-guard",
    title: "Secure Guard",
    description:
      "End-to-end encryption with zero-trust architecture. Every data transaction is authenticated, audited, and immutable — built for enterprise compliance.",
    icon: CubeIcon,
    colSpan: "2",
    rowSpan: "1",
  },
  {
    id: "agent-build",
    title: "Agent Build",
    description:
      "Compose autonomous AI agents with drag-and-drop workflows. Natural language triggers, conditional logic gates, and multi-channel actions.",
    icon: CogIcon,
    colSpan: "1",
    rowSpan: "1",
  },
  {
    id: "cloud-scale",
    title: "Cloud Scale",
    description:
      "Auto-scaling infrastructure that adapts to your load patterns. From 100 to 10M events per second with sub-millisecond provisioning.",
    icon: ArrowTrendingUpIcon,
    colSpan: "1",
    rowSpan: "1",
    stat: "∞",
    statLabel: "Scale",
  },
  {
    id: "data-mining",
    title: "Data Mining",
    description:
      "Intelligent pattern discovery across structured and unstructured datasets. Surface insights your team would miss.",
    icon: SearchIcon,
    colSpan: "1",
    rowSpan: "1",
    stat: "4.2B",
    statLabel: "Rows processed",
  },
  {
    id: "pipeline-sync",
    title: "Pipeline Sync",
    description:
      "Real-time synchronization across distributed systems. Changes propagate in under 12ms with conflict-free resolution.",
    icon: ArrowPathIcon,
    colSpan: "1",
    rowSpan: "1",
  },
  {
    id: "integration-hub",
    title: "Integration Hub",
    description:
      "300+ native connectors with universal API compatibility. Connect your entire tech stack in minutes, not months.",
    icon: LinkSolidIcon,
    colSpan: "1",
    rowSpan: "1",
    stat: "300+",
    statLabel: "Connectors",
  },
];

function SearchIcon({ size = 24, className }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" fill="currentColor" className={className}>
      <path d="M12.9 14.32a8 8 0 1 1 1.41-1.41l5.35 5.33l-1.42 1.42l-5.33-5.34zM8 14A6 6 0 1 0 8 2a6 6 0 0 0 0 12z" />
    </svg>
  );
}

export function FeatureShowcase() {
  const [activeId, setActiveId] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [mounted, setMounted] = useState(false);
  const wasActiveRef = useRef<string | null>(null);

  // Detect mobile breakpoint
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 1023px)");
    const handle = (e: MediaQueryListEvent) => {
      setIsMobile(e.matches);
      // Context Lock: if resizing to mobile, open the previously active bento item
      if (e.matches && wasActiveRef.current) {
        setActiveId(wasActiveRef.current);
      }
    };
    setIsMobile(mq.matches);
    mq.addEventListener("change", handle);
    return () => mq.removeEventListener("change", handle);
  }, []);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleToggle = (id: string) => {
    setActiveId((prev) => {
      if (!isMobile) {
        wasActiveRef.current = prev === id ? null : id;
        return prev === id ? null : id;
      }
      return prev === id ? null : id;
    });
  };

  return (
    <section id="features" className="relative py-20 lg:py-28 bg-[#172B36]">
      {/* Background subtle gradient */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          background: "radial-gradient(ellipse at 70% 30%, #114C5A 0%, transparent 60%)",
        }}
      />

      <div className="container relative z-10">
        {/* Section header */}
        <div
          className={`mb-16 lg:mb-20 transition-all duration-500 ${
            mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#114C5A]/50 border border-[#D9E8E2]/10 mb-4">
            <span className="text-[#FFC801] font-mono text-xs tracking-widest uppercase">
              Core Capabilities
            </span>
          </div>
          <h2 className="font-mono text-3xl sm:text-4xl lg:text-5xl font-bold text-[#F1F6F4] tracking-tight mb-4">
            Engineered for <span className="bg-gradient-to-r from-[#FFC801] to-[#FF9932] bg-clip-text text-transparent">autonomy</span>
          </h2>
          <p className="text-[#D9E8E2]/70 text-lg max-w-2xl font-sans">
            Six pillars of intelligence, each independently scalable. Together, they form
            the most comprehensive AI automation infrastructure available.
          </p>
        </div>

        {/* DESKTOP: Bento Grid */}
        <div className="hidden lg:grid grid-cols-3 auto-rows-[minmax(200px,auto)] gap-4 lg:gap-5">
          {features.map((feature, i) => {
            const Icon = feature.icon;
            const isActive = activeId === feature.id;
            const gridCol = feature.colSpan === "2" ? "col-span-2" : "";
            const gridRow = feature.rowSpan === "2" ? "row-span-2" : "";

            return (
              <div
                key={feature.id}
                className={`${gridCol} ${gridRow} relative group rounded-xl border transition-all duration-200 ease-out overflow-hidden ${
                  isActive
                    ? "border-[#FFC801]/60 bg-[#114C5A]/80 shadow-lg shadow-[#FFC801]/10"
                    : "border-[#D9E8E2]/10 bg-[#114C5A]/40 hover:border-[#D9E8E2]/25 hover:bg-[#114C5A]/60"
                }`}
                onMouseEnter={() => setActiveId(feature.id)}
                onMouseLeave={() => setActiveId(null)}
                style={{
                  animationDelay: `${i * 50}ms`,
                }}
              >
                {/* Glowing edge on hover */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none"
                  style={{
                    background: "linear-gradient(135deg, rgba(255,200,1,0.05) 0%, transparent 50%)",
                  }}
                />

                {/* Pulsing node indicator */}
                <div className="absolute top-4 right-4">
                  <div className="w-2 h-2 rounded-full bg-[#FFC801] opacity-60 group-hover:animate-pulse-dot" />
                </div>

                <div className="relative z-10 p-6 lg:p-8 h-full flex flex-col">
                  {/* Icon */}
                  <div className="w-10 h-10 rounded-lg bg-[#FFC801]/10 flex items-center justify-center mb-4 group-hover:bg-[#FFC801]/20 transition-colors duration-200">
                    <Icon size={20} className="text-[#FFC801]" />
                  </div>

                  {/* Title */}
                  <h3 className="font-mono text-lg font-bold text-[#F1F6F4] mb-2">
                    {feature.title}
                  </h3>

                  {/* Description */}
                  <p className="text-[#D9E8E2]/60 text-sm leading-relaxed flex-1">
                    {feature.description}
                  </p>

                  {/* Stat (if present) */}
                  {feature.stat && (
                    <div className="mt-4 flex items-baseline gap-2">
                      <span className="font-mono text-2xl font-bold text-[#FFC801]">
                        {feature.stat}
                      </span>
                      <span className="text-[#D9E8E2]/40 text-xs uppercase tracking-wider">
                        {feature.statLabel}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* MOBILE: Accordion */}
        <div className="lg:hidden flex flex-col gap-3">
          {features.map((feature, i) => {
            const Icon = feature.icon;
            const isOpen = activeId === feature.id;

            return (
              <div
                key={feature.id}
                className={`rounded-xl border transition-all duration-200 ease-out overflow-hidden ${
                  isOpen
                    ? "border-[#FFC801]/40 bg-[#114C5A]/80"
                    : "border-[#D9E8E2]/10 bg-[#114C5A]/40"
                }`}
                style={{
                  transitionProperty: "border-color, background-color",
                }}
              >
                <button
                  onClick={() => handleToggle(feature.id)}
                  className="w-full flex items-center gap-4 p-4 text-left"
                  aria-expanded={isOpen}
                  aria-controls={`accordion-${feature.id}`}
                >
                  <div className="w-10 h-10 rounded-lg bg-[#FFC801]/10 flex items-center justify-center shrink-0">
                    <Icon size={20} className="text-[#FFC801]" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-mono text-base font-bold text-[#F1F6F4]">
                      {feature.title}
                    </h3>
                  </div>
                  <ChevronDownIcon
                    size={20}
                    className={`text-[#FFC801] shrink-0 transition-transform duration-300 ease-in-out ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                <div
                  className={`transition-all duration-300 ease-in-out ${
                    isOpen ? "max-h-[400px] opacity-100" : "max-h-0 opacity-0"
                  } overflow-hidden`}
                  id={`accordion-${feature.id}`}
                >
                  <div className="px-4 pb-4 pt-0">
                    <div className="ml-14">
                      <p className="text-[#D9E8E2]/60 text-sm leading-relaxed mb-3">
                        {feature.description}
                      </p>
                      {feature.stat && (
                        <div className="flex items-baseline gap-2">
                          <span className="font-mono text-xl font-bold text-[#FFC801]">
                            {feature.stat}
                          </span>
                          <span className="text-[#D9E8E2]/40 text-xs uppercase tracking-wider">
                            {feature.statLabel}
                          </span>
                        </div>
                      )}
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
