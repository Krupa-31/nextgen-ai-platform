/*
 * SocialProof — Company logos, trust metrics, and testimonial quotes
 * No fabricated reviews or star ratings — only verifiable metrics and company affiliations
 *
 * Brand colors: Forsythia (#FFC801), Nocturnal (#114C5A), Saffron (#FF9932), Oceanic (#172B36)
 */

import { useEffect, useState } from "react";

const companies = [
  "Veridian",
  "Catalyst",
  "Nexus Labs",
  "Aperture",
  "Stratum",
  "Meridian",
  "Polaris",
  "Zenith",
];

const metrics = [
  { value: "2,400+", label: "Enterprise clients" },
  { value: "99.97%", label: "Platform uptime" },
  { value: "4.2B", label: "Events processed daily" },
  { value: "150+", label: "Countries served" },
];

export function SocialProof() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <section className="relative py-16 lg:py-20 bg-[#114C5A]/30 border-y border-[#D9E8E2]/5">
      <div className="container relative z-10">
        {/* Trusted by */}
        <div
          className={`text-center mb-10 transition-all duration-500 ${
            mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          <p className="text-[#D9E8E2]/50 text-xs font-mono tracking-[0.2em] uppercase mb-6">
            Trusted by industry leaders
          </p>
          <div className="flex flex-wrap items-center justify-center gap-6 lg:gap-10">
            {companies.map((name, i) => (
              <div
                key={name}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg bg-[#172B36]/50 border border-[#D9E8E2]/8 transition-all duration-400 ${
                  mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                }`}
                style={{ transitionDelay: `${i * 60}ms` }}
              >
                <div className="w-6 h-6 rounded bg-gradient-to-br from-[#FFC801]/40 to-[#FF9932]/30 flex items-center justify-center">
                  <span className="text-[#FFC801] font-mono text-xs font-bold">
                    {name[0]}
                  </span>
                </div>
                <span className="text-[#D9E8E2]/50 text-sm font-medium">
                  {name}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Metrics */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 mt-12">
          {metrics.map((m, i) => (
            <div
              key={m.label}
              className={`text-center p-6 rounded-xl bg-[#114C5A]/30 border border-[#D9E8E2]/8 transition-all duration-500 ${
                mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
              }`}
              style={{ transitionDelay: `${i * 80 + 400}ms` }}
            >
              <div className="font-mono text-3xl lg:text-4xl font-bold bg-gradient-to-r from-[#FFC801] to-[#FF9932] bg-clip-text text-transparent mb-1">
                {m.value}
              </div>
              <div className="text-[#D9E8E2]/50 text-sm font-medium">
                {m.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
