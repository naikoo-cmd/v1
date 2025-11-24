"use client";

import React, { useEffect, useRef, useState } from "react";

// Lightweight intersection observer to stagger animations without touching global code
function useReveal<T extends HTMLElement>(options?: IntersectionObserverInit) {
  const ref = useRef<T | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node || visible) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.2, rootMargin: "0px 0px -10% 0px", ...options }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [options, visible]);

  return { ref, visible };
}

const METRICS = [
  { label: "Average launch window", value: "6 weeks" },
  { label: "Retention uplift", value: "+18%" },
  { label: "Active subscribers managed", value: "24k+" },
];

const PLAYBOOK = [
  "Usage-based billing flows with Stripe + Paddle hand-offs",
  "Multi-tenant architecture starter kit with automated provisioning",
  "Lifecycle emails hooked into billing + product events",
  "Observability dashboard that surfaces churn-risk cohorts",
];

const TRACKS = [
  {
    title: "Product Velocity",
    subtitle: "Design sprints + rapid prototyping",
    copy: "High-fidelity prototypes and validation loops keep founders close to the customer signal while shipping confidently.",
    theme: "from-emerald-400/20 via-transparent to-transparent",
  },
  {
    title: "Revenue Engine",
    subtitle: "Pricing, billing, entitlement tooling",
    copy: "Codifies trial-to-paid journeys, tier upgrades, and feature gating so finance and product ship in sync.",
    theme: "from-cyan-400/20 via-transparent to-transparent",
  },
  {
    title: "Reliability",
    subtitle: "SLOs + incident playbooks",
    copy: "Golden dashboards, chaos drills, and postmortem templates make scale events predictable instead of panic-inducing.",
    theme: "from-indigo-400/20 via-transparent to-transparent",
  },
];

export default function SaasSection() {
  const { ref, visible } = useReveal<HTMLDivElement>();

  return (
    <section
      id="saas"
      className="relative isolate overflow-hidden bg-slate-950 text-white"
      aria-labelledby="saas-heading"
    >
      <div className="absolute inset-0">
        <div className="absolute -top-32 left-20 h-64 w-64 rounded-full bg-cyan-500/20 blur-3xl" />
        <div className="absolute top-10 right-0 h-96 w-96 rounded-full bg-emerald-500/10 blur-[180px]" />
        <div className="absolute bottom-0 left-1/2 h-40 w-[60%] -translate-x-1/2 rounded-[50%] bg-white/5 blur-2xl" />
      </div>
      <div className="pointer-events-none absolute inset-0 z-20 bg-slate-950/20 backdrop-blur-[3px]" />
      <div className="pointer-events-none absolute inset-0 z-30 flex items-center justify-center">
        <p className="text-4xl sm:text-6xl lg:text-7xl font-semibold tracking-[0.4em] text-white/10 uppercase rotate-[-8deg]">
          Coming Soon
        </p>
      </div>

      <div
        ref={ref}
        className={[
          "relative mx-auto max-w-6xl px-5 sm:px-6 lg:px-8 py-20 md:py-28",
          "z-10",
          "transition-all duration-700 ease-out will-change-[opacity,transform]",
          visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6",
        ].join(" ")}
      >
        <div className="text-center">
          <p className="font-mono text-xs tracking-[0.5em] uppercase text-cyan-200">04 // SaaS</p>
          <h2 id="saas-heading" className="mt-6 text-4xl sm:text-5xl font-semibold tracking-tight">
            SaaS Acceleration Lab
          </h2>
          <p className="mx-auto mt-4 max-w-3xl text-base sm:text-lg text-white/70">
            A launchpad for founder-led teams who need polished onboarding, reliable billing, and storytelling dashboards
            without inheriting technical debt.
          </p>
        </div>

        <div className="mt-14 grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="rounded-[32px] border border-white/10 bg-gradient-to-br from-white/5 via-white/0 to-white/5 p-8 shadow-2xl backdrop-blur-lg">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <span className="font-mono text-sm uppercase tracking-[0.4em] text-emerald-200">Playbook</span>
              <span className="inline-flex items-center gap-2 rounded-full border border-white/10 px-4 py-1 text-xs uppercase text-white/70">
                Multi-tenant ready
                <span className="h-2 w-2 rounded-full bg-emerald-300" />
              </span>
            </div>
            <h3 className="mt-6 text-3xl font-semibold">Lifecycle-driven delivery</h3>
            <p className="mt-3 text-white/70">
              Opinionated blueprints covering activation → expansion, so every release ties directly to ARR growth.
            </p>

            <ul className="mt-8 space-y-4 text-white/90">
              {PLAYBOOK.map((item) => (
                <li key={item} className="flex items-start gap-3 border-l border-white/10 pl-4">
                  <span className="mt-1 h-2 w-2 rounded-full bg-cyan-300"></span>
                  <p className="text-sm sm:text-base">{item}</p>
                </li>
              ))}
            </ul>

            <div className="mt-10 grid gap-4 sm:grid-cols-3">
              {METRICS.map((metric) => (
                <div key={metric.label} className="rounded-2xl border border-white/5 bg-white/5 p-4 text-center">
                  <p className="text-xs uppercase tracking-[0.2em] text-white/60">{metric.label}</p>
                  <p className="mt-3 text-2xl font-semibold text-cyan-100">{metric.value}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            {TRACKS.map((track) => (
              <article
                key={track.title}
                className={[
                  "relative overflow-hidden rounded-3xl border border-white/10 bg-slate-900/60 p-6 shadow-xl backdrop-blur",
                ].join(" ")}
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${track.theme} opacity-60`} aria-hidden />
                <div className="relative">
                  <p className="text-sm uppercase tracking-[0.3em] text-white/60">{track.subtitle}</p>
                  <h4 className="mt-2 text-2xl font-semibold">{track.title}</h4>
                  <p className="mt-3 text-white/70">{track.copy}</p>
                </div>
              </article>
            ))}

            <div className="rounded-3xl border border-cyan-400/40 bg-gradient-to-r from-cyan-500/10 to-emerald-500/10 p-6 text-sm text-white/80 shadow-2xl">
              <p className="font-semibold text-cyan-100">Signal → System</p>
              <p className="mt-2">
                Weekly demos plug directly into customer analytics, so stakeholders feel every iteration. The result:
                sharper positioning, cleaner activations, happier finance teams.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

