"use client";

import React, { useEffect, useRef, useState } from "react";

type Placeholder = {
  id: number;
  title: string;
  message: string;
};

function useInView<T extends HTMLElement>(opts?: IntersectionObserverInit) {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || inView) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -10% 0px", ...opts }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [opts, inView]);

  return { ref, inView };
}

const base = "opacity-0 translate-y-3 will-change-[opacity,transform]";
const on = "opacity-100 translate-y-0";
const trans = "transition-all duration-700 ease-out motion-reduce:transition-none motion-reduce:transform-none";

export default function ComingSoonPlaceholders({ count = 3 }: { count?: number }) {
  const { ref, inView } = useInView<HTMLDivElement>();
  const [active, setActive] = useState<Placeholder | null>(null);

  const items: Placeholder[] = Array.from({ length: count }).map((_, i) => ({
    id: i,
    title: `Project ${i + 1}`,
    message: "Coming Soon",
  }));

  // Esc to close
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActive(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // Prevent body scroll while modal open
  useEffect(() => {
    if (active) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [active]);

  return (
    <>
      <div ref={ref} className="mt-14">
        <h5 className={["text-base font-semibold text-[#FCDDBC] lg:text-lg", trans, inView ? on : base].join(" ")}>
          More Screenshots
        </h5>

        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((item, idx) => (
            <button
              key={item.id}
              onClick={() => setActive(item)}
              className={[
                "group relative aspect-video w-full rounded-lg overflow-hidden",
                "bg-[#2D2A2E]/80 ring-1 ring-white/10 shadow-xl",
                "hover:scale-[1.02] hover:ring-[#FCDDBC]/30",
                "focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FCDDBC]/40",
                "transition-all duration-500 ease-in-out",
                trans,
                inView ? on : base,
                `delay-${100 + idx * 75}`,
              ].join(" ")}
              aria-label={`${item.title} placeholder (Coming Soon)`}
            >
              <div className="absolute inset-0 grid place-items-center">
                <span className="font-mono text-sm sm:text-base text-[#FCDDBC] tracking-wide">Coming Soon</span>
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-80 group-hover:opacity-60 transition-opacity duration-500" />
            </button>
          ))}
        </div>
      </div>

      {active && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn"
          onClick={() => setActive(null)}
          aria-modal="true"
          role="dialog"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-sm w-full rounded-2xl bg-white p-8 shadow-2xl animate-scaleIn"
          >
            <button
              aria-label="Close modal"
              onClick={() => setActive(null)}
              className="absolute top-3 right-3 text-[#2D2A2E]/60 hover:text-[#2D2A2E] transition-colors duration-200"
            >
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <div className="text-center space-y-2">
              <h6 className="text-xl font-semibold text-[#2D2A2E]">{active.title}</h6>
              <p className="text-[#2D2A2E]/80">To be added later. {active.message}.</p>
              <div className="pt-2">
                <button
                  onClick={() => setActive(null)}
                  className="px-4 py-2 rounded-md border border-[#69585F]/30 text-[#69585F] hover:bg-[#69585F]/10 transition-colors duration-200"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        @keyframes scaleIn {
          from {
            opacity: 0;
            transform: scale(0.96);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.25s ease-out;
        }
        .animate-scaleIn {
          animation: scaleIn 0.25s ease-out;
        }
      `}</style>
    </>
  );
}
