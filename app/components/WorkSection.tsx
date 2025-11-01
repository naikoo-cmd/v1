"use client";

import React, { useEffect, useRef, useState } from "react";
import ComingSoonPlaceholders from "@/app/components/ComingSoonPlaceholders";

type Project = {
  featured: boolean;
  title: string;
  description: string;
  tech: string[];
  image: string;
  links?: {
    github?: string;
    live?: string;
  };
};

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

export default function WorkSection() {
  const { ref, inView } = useInView<HTMLDivElement>();

  const projects: Project[] = [
    {
      featured: true,
      title: "E-Commerce Platform",
      description:
        "A full-featured e-commerce platform with product management, shopping cart, secure checkout, and admin dashboard. Built with modern technologies for optimal performance and user experience.",
      tech: ["Next.js", "TypeScript", "Tailwind CSS", "MySQL", "Stripe API"],
      image: "/placeholder-project.jpg",
      links: {
        github: "https://github.com",
        live: "https://example.com",
      },
    },
    {
      featured: true,
      title: "Hospital Management System",
      description:
        "Comprehensive hospital information system with patient records, appointment scheduling, billing, and reporting modules. Designed for efficiency and compliance with healthcare standards.",
      tech: ["Laravel", "PHP", "MySQL", "Bootstrap", "Chart.js"],
      image: "/placeholder-project.jpg",
      links: {
        github: "https://github.com",
      },
    },
    {
      featured: true,
      title: "Real-Time Chat Application",
      description:
        "A modern chat application with real-time messaging, group chats, file sharing, and user presence indicators. Built with WebSocket technology for instant communication.",
      tech: ["React", "Node.js", "Socket.io", "MongoDB", "Express"],
      image: "/placeholder-project.jpg",
      links: {
        github: "https://github.com",
        live: "https://example.com",
      },
    },
  ];

  return (
    <section id="work" className="bg-[#000000]">
      <div ref={ref} className="mx-auto max-w-6xl px-5 sm:px-6 lg:px-8 py-16 sm:py-24 min-h-screen">
        {/* Title (left-aligned) */}
        <div className={[trans, inView ? on : base, "delay-75"].join(" ")}>
          <h3 className="text-2xl sm:text-3xl font-semibold text-white">
            <span className="font-mono text-[#FCDDBC] mr-3">03.</span> Some Things I&apos;ve Built
          </h3>
          <div className="mt-2 h-px w-28 bg-white/30" />
        </div>

        {/* Projects list */}
        <div className="mt-16 space-y-24">
          {projects.map((project, idx) => (
            <ProjectCard key={idx} project={project} index={idx} inView={inView} reversed={idx % 2 !== 0} />
          ))}
        </div>

        {/* Coming soon image placeholders (interactive popups) */}
        <ComingSoonPlaceholders count={3} />
      </div>
    </section>
  );
}

function ProjectCard({
  project,
  index,
  inView,
  reversed,
}: {
  project: Project;
  index: number;
  inView: boolean;
  reversed?: boolean;
}) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const delay = `delay-${150 + index * 100}`;

  return (
    <div
      className={[
        "group relative grid grid-cols-1 lg:grid-cols-12 gap-6 items-center",
        trans,
        inView ? on : base,
        delay,
      ].join(" ")}
    >
      {/* Image container - spans 7 columns on desktop */}
      <div
        className={[
          "relative lg:col-span-7 rounded-lg overflow-hidden shadow-2xl",
          "ring-1 ring-white/10",
          reversed ? "lg:col-start-6" : "lg:col-start-1",
        ].join(" ")}
      >
        {/* Placeholder or actual image */}
        <div className="relative aspect-video bg-[#2D2A2E] group-hover:scale-105 transition-transform duration-500">
          {/* Placeholder pattern */}
          {!imageLoaded && (
            <div className="absolute inset-0 flex items-center justify-center">
              <svg className="w-24 h-24 text-white/10" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          )}

          {/* Actual image (hidden until loaded) */}
          <img
            src={project.image}
            alt={project.title}
            onLoad={() => setImageLoaded(true)}
            onError={() => setImageLoaded(false)}
            className={[
              "w-full h-full object-cover",
              "filter brightness-75 contrast-110 saturate-90",
              "group-hover:brightness-90 group-hover:saturate-100",
              "transition-all duration-500",
              imageLoaded ? "opacity-100" : "opacity-0",
            ].join(" ")}
          />

          {/* Subtle overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-60 group-hover:opacity-30 transition-opacity duration-500" />
        </div>
      </div>

      {/* Content container - spans 6 columns, overlaps image slightly */}
      <div
        className={[
          "relative lg:col-span-6 space-y-4",
          reversed ? "lg:col-start-1 lg:row-start-1 lg:text-left" : "lg:col-start-7 lg:text-right",
        ].join(" ")}
      >
        {/* Featured label */}
        <p className="font-mono text-xs sm:text-sm text-[#FCDDBC]/80 uppercase tracking-wide">Featured Project</p>

        {/* Project title */}
        <h4 className="text-xl sm:text-2xl font-bold text-white group-hover:text-[#FCDDBC] transition-colors duration-300">
          {project.title}
        </h4>

        {/* Description box - semi-transparent overlay style */}
        <div
          className={[
            "relative z-10 p-5 rounded-md shadow-lg",
            "bg-[#2D2A2E]/95 backdrop-blur-sm",
            "ring-1 ring-white/10",
            "group-hover:bg-[#2D2A2E] group-hover:ring-[#FCDDBC]/20",
            "transition-all duration-300",
          ].join(" ")}
        >
          <p className="text-sm sm:text-base text-white/90 leading-relaxed">{project.description}</p>
        </div>

        {/* Tech stack */}
        <ul
          className={[
            "flex flex-wrap gap-3 font-mono text-xs sm:text-sm text-white/70",
            reversed ? "lg:justify-start" : "lg:justify-end",
          ].join(" ")}
        >
          {project.tech.map((tech) => (
            <li
              key={tech}
              className="hover:text-[#FCDDBC] transition-colors duration-200 cursor-default whitespace-nowrap"
            >
              {tech}
            </li>
          ))}
        </ul>

        {/* Links (optional) */}
        {project.links && (
          <div className={["flex gap-4", reversed ? "lg:justify-start" : "lg:justify-end"].join(" ")}>
            {project.links.github && (
              <a
                href={project.links.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/70 hover:text-[#FCDDBC] transition-colors duration-200"
                aria-label="GitHub repository"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
              </a>
            )}
            {project.links.live && (
              <a
                href={project.links.live}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/70 hover:text-[#FCDDBC] transition-colors duration-200"
                aria-label="Live demo"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                  />
                </svg>
              </a>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
