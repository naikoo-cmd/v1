"use client";

import React, { useEffect, useRef, useState } from "react";

type Project = {
  title: string;
  description: string;
  tech: string[];
  github?: string;
  external?: string;
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

export default function OtherProjectsSection() {
  const { ref, inView } = useInView<HTMLDivElement>();
  const [visibleCount, setVisibleCount] = useState(6);

  const allProjects: Project[] = [
    {
      title: "Restaurant Ordering System",
      description:
        "A modern restaurant ordering platform with real-time order tracking, payment integration, and admin dashboard for menu management.",
      tech: ["React", "Node.js", "MongoDB", "Socket.io"],
      github: "https://github.com",
      external: "https://example.com",
    },
    {
      title: "Weather Forecast App",
      description:
        "Clean weather application with 7-day forecasts, location search, and interactive weather maps using OpenWeather API.",
      tech: ["Vue.js", "TypeScript", "OpenWeather API", "Chart.js"],
      github: "https://github.com",
    },
    {
      title: "Task Management Tool",
      description:
        "Collaborative task manager with drag-and-drop boards, real-time updates, team assignments, and progress tracking.",
      tech: ["Next.js", "Firebase", "Tailwind CSS", "Framer Motion"],
      external: "https://example.com",
    },
    {
      title: "Portfolio Generator",
      description:
        "Dynamic portfolio builder that generates static sites from JSON configs with customizable themes and responsive layouts.",
      tech: ["Gatsby", "GraphQL", "Styled Components", "Netlify"],
      github: "https://github.com",
      external: "https://example.com",
    },
    {
      title: "Fitness Tracker",
      description:
        "Personal fitness tracking app with workout logs, progress charts, calorie counter, and social sharing features.",
      tech: ["React Native", "Redux", "Node.js", "PostgreSQL"],
      github: "https://github.com",
    },
    {
      title: "Music Player",
      description:
        "Minimalist music player with playlist management, shuffle, repeat modes, and custom audio visualizations.",
      tech: ["JavaScript", "Web Audio API", "CSS3", "LocalStorage"],
      github: "https://github.com",
      external: "https://example.com",
    },
    {
      title: "Recipe Finder",
      description:
        "Search and save recipes by ingredients, dietary preferences, and cooking time with step-by-step instructions.",
      tech: ["Angular", "TypeScript", "Spoonacular API", "RxJS"],
      github: "https://github.com",
    },
    {
      title: "Chat Application",
      description: "Real-time messaging app with group chats, file sharing, emoji support, and end-to-end encryption.",
      tech: ["React", "Socket.io", "Express", "MongoDB"],
      github: "https://github.com",
      external: "https://example.com",
    },
    {
      title: "Expense Tracker",
      description:
        "Budget management tool with category-based tracking, spending insights, recurring transactions, and export features.",
      tech: ["Vue.js", "Vuex", "Chart.js", "Firebase"],
      github: "https://github.com",
    },
  ];

  const visibleProjects = allProjects.slice(0, visibleCount);
  const hasMore = visibleCount < allProjects.length;

  const handleLoadMore = () => {
    setVisibleCount((prev) => Math.min(prev + 3, allProjects.length));
  };

  return (
    <section id="other-projects" className="bg-[#FCDDBC]">
      <div ref={ref} className="mx-auto max-w-6xl px-5 sm:px-6 lg:px-8 py-16 sm:py-24">
        {/* Title */}
        <div className={["text-center", trans, inView ? on : base, "delay-75"].join(" ")}>
          <h3 className="text-2xl sm:text-3xl font-semibold text-[#2D2A2E]">Other Noteworthy Projects</h3>
          <a
            href="/archive"
            className="inline-block mt-3 text-sm text-[#69585F] hover:text-[#2D2A2E] underline-offset-4 hover:underline transition-all duration-200"
          >
            View the project archive
          </a>
        </div>

        {/* Project grid */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {visibleProjects.map((project, idx) => (
            <ProjectCard key={idx} project={project} index={idx} inView={inView} />
          ))}
        </div>

        {/* Load more button */}
        {hasMore && (
          <div className={["mt-12 text-center", trans, inView ? on : base, "delay-300"].join(" ")}>
            <button
              onClick={handleLoadMore}
              className={[
                "px-8 py-3 rounded-md font-medium",
                "bg-[#69585F] text-[#FCDDBC]",
                "hover:bg-[#2D2A2E] hover:shadow-lg",
                "focus:outline-none focus:ring-2 focus:ring-[#69585F]/50 focus:ring-offset-2",
                "transition-all duration-300",
                "transform hover:-translate-y-0.5 active:translate-y-0",
              ].join(" ")}
            >
              Load more
            </button>
          </div>
        )}
      </div>
    </section>
  );
}

function ProjectCard({ project, index, inView }: { project: Project; index: number; inView: boolean }) {
  const [show, setShow] = useState(false);
  const cardRef = useRef<HTMLDivElement | null>(null);

  // Staggered animation on scroll
  useEffect(() => {
    if (!inView) return;
    const timer = setTimeout(() => setShow(true), 100 + index * 50);
    return () => clearTimeout(timer);
  }, [inView, index]);

  return (
    <div
      ref={cardRef}
      className={[
        "group relative bg-white/40 backdrop-blur-sm rounded-lg p-6",
        "ring-1 ring-[#69585F]/20",
        "hover:ring-[#69585F]/40 hover:shadow-xl hover:-translate-y-1",
        "flex flex-col h-full",
        trans,
        show ? on : base,
      ].join(" ")}
    >
      {/* Top bar: folder icon (left) and link icon (right) */}
      <div className="flex items-start justify-between mb-6">
        {/* Folder icon */}
        <svg className="w-10 h-10 text-[#69585F]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
          />
        </svg>

        {/* Link icons (GitHub + External) */}
        <div className="flex gap-3">
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#69585F]/70 hover:text-[#2D2A2E] transition-colors duration-200"
              aria-label="GitHub repository"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
              </svg>
            </a>
          )}
          {project.external && (
            <a
              href={project.external}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#69585F]/70 hover:text-[#2D2A2E] transition-colors duration-200"
              aria-label="External link"
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
      </div>

      {/* Project title */}
      <h4 className="text-lg sm:text-xl font-semibold text-[#2D2A2E] mb-3 group-hover:text-[#69585F] transition-colors duration-200">
        {project.title}
      </h4>

      {/* Description */}
      <p className="text-sm text-[#2D2A2E]/80 leading-relaxed mb-6 flex-grow">{project.description}</p>

      {/* Tech stack */}
      <ul className="flex flex-wrap gap-3 font-mono text-xs text-[#69585F]/80">
        {project.tech.map((tech) => (
          <li key={tech} className="whitespace-nowrap">
            {tech}
          </li>
        ))}
      </ul>
    </div>
  );
}
