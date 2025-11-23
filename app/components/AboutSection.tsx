"use client";

import React, { useEffect, useRef, useState } from "react";

function useInView<T extends HTMLElement>(opts?: IntersectionObserverInit) {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || inView) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
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

export default function AboutSection() {
  const { ref, inView } = useInView<HTMLDivElement>();

  return (
    <section id="about" className="bg-[#69585F]">
      <div ref={ref} className="mx-auto max-w-6xl px-5 sm:px-6 lg:px-8 py-16 sm:py-24 min-h-[calc(100vh-4rem)]">
        {/* Title + underline */}
        <div className={[trans, inView ? on : base, "delay-75"].join(" ")}>
          <h3 className="text-2xl sm:text-3xl font-semibold text-white">
            <span className="font-mono text-[#FCDDBC] mr-3">01.</span> About Me
          </h3>
          <div className="mt-2 h-px w-28 bg-white/30" />
        </div>

        {/* Content grid: text left, image right */}
        <div
          className={[
            "mt-8 grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-32 items-start",
            trans,
            inView ? on : base,
            "delay-150",
          ].join(" ")}
        >
          {/* Left: paragraphs */}
          <div className="space-y-6 max-w-3xl">
            <div className="space-y-4">
              <p className={[trans, inView ? on : base, "delay-200 text-white/90 leading-relaxed"].join(" ")}>
                I am a Full-Stack Developer who believes in the power of code to solve real-world problems. My
                background in Computer Engineering and my hands-on experience in a hospital IT department taught me
                resilience and the critical importance of building reliable, efficient systems under pressure.
              </p>
              <p className={[trans, inView ? on : base, "delay-300 text-white/90 leading-relaxed"].join(" ")}>
                I specialize in creating modern web applications using JavaScript technologies like React, Node.js, and
                Express, with a strong focus on clean code and scalable architecture. My journey has also taken me from
                managing Linux servers to applying my technical problem-solving skills in a family business, giving me a
                unique, well-rounded perspective.
              </p>
              <p className={[trans, inView ? on : base, "delay-400 text-white/90 leading-relaxed"].join(" ")}>
                I am a lifelong learner, passionate about building, growing, and contributing to meaningful projects
                that make a difference.
              </p>
            </div>

            <div className={[trans, inView ? on : base, "delay-500"].join(" ")}>
              <h4 className="text-lg font-semibold text-[#FCDDBC] mb-4">Technologies & Stack</h4>
              <h4 className="text-lg font-semibold text-[#FCDDBC] mb-4">Language</h4>
              <div className="grid grid-cols-2 gap-x-8 gap-y-1">
                <div className="group flex items-center space-x-3 text-white/80 hover:text-[#FCDDBC] transition-all duration-300 cursor-pointer hover:translate-x-1">
                  <div className="w-2 h-2 bg-[#FCDDBC] rounded-full opacity-60 group-hover:opacity-100 group-hover:scale-125 transition-all duration-300"></div>
                  <span className="group-hover:font-medium transition-all duration-300">JavaScript</span>
                </div>
                <div className="group flex items-center space-x-3 text-white/80 hover:text-[#FCDDBC] transition-all duration-300 cursor-pointer hover:translate-x-1">
                  <div className="w-2 h-2 bg-[#FCDDBC] rounded-full opacity-60 group-hover:opacity-100 group-hover:scale-125 transition-all duration-300"></div>
                  <span className="group-hover:font-medium transition-all duration-300">TypeScript</span>
                </div>
                <div className="group flex items-center space-x-3 text-white/80 hover:text-[#FCDDBC] transition-all duration-300 cursor-pointer hover:translate-x-1">
                  <div className="w-2 h-2 bg-[#FCDDBC] rounded-full opacity-60 group-hover:opacity-100 group-hover:scale-125 transition-all duration-300"></div>
                  <span className="group-hover:font-medium transition-all duration-300">PHP</span>
                </div>
              </div>

              <br />
              <h4 className="text-lg font-semibold text-[#FCDDBC] mb-4">Frontend Framework / Libraries</h4>

              <div className="grid grid-cols-2 gap-x-8 gap-y-1">
                <div className="group flex items-center space-x-3 text-white/80 hover:text-[#FCDDBC] transition-all duration-300 cursor-pointer hover:translate-x-1">
                  <div className="w-2 h-2 bg-[#FCDDBC] rounded-full opacity-60 group-hover:opacity-100 group-hover:scale-125 transition-all duration-300"></div>
                  <span className="group-hover:font-medium transition-all duration-300">React</span>
                </div>
                <div className="group flex items-center space-x-3 text-white/80 hover:text-[#FCDDBC] transition-all duration-300 cursor-pointer hover:translate-x-1">
                  <div className="w-2 h-2 bg-[#FCDDBC] rounded-full opacity-60 group-hover:opacity-100 group-hover:scale-125 transition-all duration-300"></div>
                  <span className="group-hover:font-medium transition-all duration-300">Next.js</span>
                </div>
                <div className="group flex items-center space-x-3 text-white/80 hover:text-[#FCDDBC] transition-all duration-300 cursor-pointer hover:translate-x-1">
                  <div className="w-2 h-2 bg-[#FCDDBC] rounded-full opacity-60 group-hover:opacity-100 group-hover:scale-125 transition-all duration-300"></div>
                  <span className="group-hover:font-medium transition-all duration-300">Nuxt</span>
                </div>
              </div>

              <h4 className="text-lg font-semibold text-[#FCDDBC] mb-4">Backend Framework / Libraries</h4>

              <div className="grid grid-cols-2 gap-x-8 gap-y-1">
                <div className="group flex items-center space-x-3 text-white/80 hover:text-[#FCDDBC] transition-all duration-300 cursor-pointer hover:translate-x-1">
                  <div className="w-2 h-2 bg-[#FCDDBC] rounded-full opacity-60 group-hover:opacity-100 group-hover:scale-125 transition-all duration-300"></div>
                  <span className="group-hover:font-medium transition-all duration-300">Node.js</span>
                </div>
                <div className="group flex items-center space-x-3 text-white/80 hover:text-[#FCDDBC] transition-all duration-300 cursor-pointer hover:translate-x-1">
                  <div className="w-2 h-2 bg-[#FCDDBC] rounded-full opacity-60 group-hover:opacity-100 group-hover:scale-125 transition-all duration-300"></div>
                  <span className="group-hover:font-medium transition-all duration-300">Laravel</span>
                </div>
              </div>

              <h4 className="text-lg font-semibold text-[#FCDDBC] mb-4">Databases</h4>

              <div className="grid grid-cols-2 gap-x-8 gap-y-1">
                <div className="group flex items-center space-x-3 text-white/80 hover:text-[#FCDDBC] transition-all duration-300 cursor-pointer hover:translate-x-1">
                  <div className="w-2 h-2 bg-[#FCDDBC] rounded-full opacity-60 group-hover:opacity-100 group-hover:scale-125 transition-all duration-300"></div>
                  <span className="group-hover:font-medium transition-all duration-300">MySQL</span>
                </div>
                <div className="group flex items-center space-x-3 text-white/80 hover:text-[#FCDDBC] transition-all duration-300 cursor-pointer hover:translate-x-1">
                  <div className="w-2 h-2 bg-[#FCDDBC] rounded-full opacity-60 group-hover:opacity-100 group-hover:scale-125 transition-all duration-300"></div>
                  <span className="group-hover:font-medium transition-all duration-300">PostgreSQL</span>
                </div>
                <div className="group flex items-center space-x-3 text-white/80 hover:text-[#FCDDBC] transition-all duration-300 cursor-pointer hover:translate-x-1">
                  <div className="w-2 h-2 bg-[#FCDDBC] rounded-full opacity-60 group-hover:opacity-100 group-hover:scale-125 transition-all duration-300"></div>
                  <span className="group-hover:font-medium transition-all duration-300">MongoDB</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right: user image with enhanced frame */}
          <div
            className={[
              "group mx-auto md:mx-0 w-80 sm:w-64 md:w-72 lg:w-90 aspect-square",
              "relative",
              trans,
              inView ? on : base,
              "delay-300",
            ].join(" ")}
          >
            {/* Decorative frame background */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#FCDDBC]/20 via-[#FCDDBC]/10 to-transparent rounded-2xl transform rotate-3 group-hover:rotate-6 transition-transform duration-500"></div>

            {/* Main frame */}
            <div className="relative bg-gradient-to-br from-[#FCDDBC]/30 to-[#FCDDBC]/10 p-4 rounded-2xl shadow-2xl ring-1 ring-white/20 backdrop-blur-sm transform group-hover:scale-[1.02] transition-all duration-500">
              {/* Inner frame */}
              <div className="relative rounded-xl overflow-hidden ring-2 ring-[#FCDDBC]/40 shadow-lg">
                {/* Corner decorations */}
                <div className="absolute top-2 left-2 w-4 h-4 border-t-2 border-l-2 border-[#FCDDBC]/60 rounded-tl-md z-10"></div>
                <div className="absolute top-2 right-2 w-4 h-4 border-t-2 border-r-2 border-[#FCDDBC]/60 rounded-tr-md z-10"></div>
                <div className="absolute bottom-2 left-2 w-4 h-4 border-b-2 border-l-2 border-[#FCDDBC]/60 rounded-bl-md z-10"></div>
                <div className="absolute bottom-2 right-2 w-4 h-4 border-b-2 border-r-2 border-[#FCDDBC]/60 rounded-br-md z-10"></div>

                {/* Image with grayscale -> color on hover */}
                <img
                  src="/nico-aramy.png"
                  alt="Nico Aramy"
                  className={[
                    "h-full w-full object-cover",
                    "filter grayscale brightness-90 contrast-110 group-hover:grayscale-0 group-hover:brightness-100 group-hover:contrast-100",
                    "transition-[filter] duration-700 ease-out",
                  ].join(" ")}
                />

                {/* Subtle overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#69585F]/20 via-transparent to-transparent opacity-60 group-hover:opacity-20 transition-opacity duration-500"></div>
              </div>

              {/* Subtle glow effect */}
              <div className="absolute -inset-1 bg-gradient-to-br from-[#FCDDBC]/20 to-transparent rounded-2xl blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
