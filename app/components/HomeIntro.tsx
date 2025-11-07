"use client";

import React, { memo, useContext, useEffect, useState } from "react";
import { PreloaderAnimContext } from "./PreloaderGate";

function HomeIntroBase() {
  const phases = useContext(PreloaderAnimContext);
  const [show, setShow] = useState(false);

  // Trigger entrance animations after content phase
  useEffect(() => {
    if (!phases.content) return;
    const id = requestAnimationFrame(() => setShow(true));
    return () => cancelAnimationFrame(id);
  }, [phases.content]);

  const base = "opacity-0 translate-y-2 will-change-transform will-change-opacity";
  const on = "opacity-100 translate-y-0";
  const trans = "transition-all duration-500 ease-out motion-reduce:transition-none motion-reduce:transform-none";

  return (
    <section className="relative mx-auto max-w-3xl px-5 min-h-[calc(100vh-4rem)] flex items-center justify-center">
      <div className="w-full text-left">
        <div className="flex flex-col items-start space-y-3 sm:space-y-4">
          <p
            className={["text-sm sm:text-base tracking-wide text-[#FCDDBC]", trans, show ? on : base, "delay-100"].join(
              " "
            )}
          >
            Hi, my name is
          </p>

          <blockquote
            className={["w-full border-l-4 border-foreground/20 pl-4", trans, show ? on : base, "delay-200"].join(" ")}
          >
            <p className="text-4xl sm:text-4xl md:text-5xl font-semibold leading-tight">Nico Aramy.</p>
          </blockquote>

          <h2
            className={[
              "text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-foreground/90",
              trans,
              show ? on : base,
              "delay-300",
            ].join(" ")}
          >
            Code. Create. Ship.
          </h2>

          <p
            className={[
              "text-sm sm:text-base text-foreground/70 leading-relaxed max-w-2xl",
              trans,
              show ? on : base,
              "delay-500",
            ].join(" ")}
          >
            Let's build amazing, responsive websites together! I break down modern tech and clean code so you can create
            powerful digital experiences. Ready to learn? Check out the link below!
          </p>

          {/* CTA Button */}
          <div className={[trans, show ? on : base, "delay-700"].join(" ")}>
            <a
              href="/learn"
              // target="_blank"
              rel="noopener noreferrer"
              className={[
                "inline-flex items-center justify-center",
                "px-6 py-3 sm:px-8 sm:py-4",
                "bg-[#69585F] text-[#FCDDBC]",
                "rounded-lg shadow-md",
                "font-medium text-sm sm:text-base",
                "transition-all duration-300 ease-out",
                "hover:bg-[#5a4a52] hover:shadow-lg hover:-translate-y-0.5",
                "focus:outline-none focus:ring-2 focus:ring-[#FCDDBC]/50 focus:ring-offset-2",
                "active:translate-y-0 active:shadow-md",
              ].join(" ")}
            >
              Build with Me!
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

const HomeIntro = memo(HomeIntroBase);
export default HomeIntro;
