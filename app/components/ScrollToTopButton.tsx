"use client";

import React, { useEffect, useState } from "react";

const base = "opacity-0 translate-y-2 pointer-events-none";
const on = "opacity-100 translate-y-0 pointer-events-auto";
const trans = "transition-all duration-300 ease-in-out";

export default function ScrollToTopButton() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > 240);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <button
      aria-label="Scroll to top"
      onClick={scrollToTop}
      className={[
        "fixed bottom-5 right-5 z-50",
        "h-12 w-12 rounded-full shadow-lg",
        "bg-[#69585F] text-[#FCDDBC]",
        "flex items-center justify-center",
        "hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0",
        "focus:outline-none focus-visible:ring-2 focus-visible:ring-[#69585F]/50",
        trans,
        visible ? on : base,
      ].join(" ")}
    >
      <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor">
        <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
      </svg>
    </button>
  );
}
