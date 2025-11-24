
"use client";

import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";

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

const cn = (...classes: Array<string | false | null | undefined>) => classes.filter(Boolean).join(" ");

const base = "opacity-0 translate-y-3 will-change-[opacity,transform]";
const on = "opacity-100 translate-y-0";
const trans = "transition-all duration-700 ease-out motion-reduce:transition-none motion-reduce:transform-none";

const PROJECTS: Project[] = [
  {
    featured: true,
    title: "Real-Time Chat Application",
    description:
      "A modern chat application featuring real-time messaging, image sharing, and live user presence. It offers multiple themes, a fully responsive interface that works seamlessly across all devices, and uses WebSocket technology for instant, smooth communication.",
    tech: ["React", "Node.js", "Socket.io", "MongoDB", "Express 4", "Cloudinary API"],
    image: "/chatyuk_preview.png",
    links: {
      github: "https://github.com/naikoo-cmd/MERN-Realtime-Chat-App",
      live: "https://chatyuk.nicoaramy.com",
    },
  },
  {
    featured: true,
    title: "Blogging Platform with AI Integration",
    description:
      "A personal blog platform that feels like your own playground. You control everything. Write, edit, publish, unpublish. Approve comments so trolls don’t slip in. Full CRUD for posts. And yeah, AI helps you fix your writer’s block so you don’t stare at a blank editor like a lost soul.",
    tech: ["Tailwind CSS,", "JavaScript", "Node.js", "Express", "MongoDB", "OpenAI API", "Cloudinary API"],
    image: "/blog_preview.png",
    links: {
      github: "https://github.com/naikoo-cmd/blog",
      live: "https://blog.nicoaramy.com",
    },
  },
  {
    featured: true,
    title: "E-Commerce Platform (Coming Soon)",
    description:
      "A full-featured e-commerce platform with product management, shopping cart, secure checkout, and admin dashboard. Built with modern technologies for optimal performance and user experience.",
    tech: ["Next.js", "TypeScript", "Tailwind CSS", "MySQL", "Stripe API"],
    image: "#",
    links: {
      github: "https://github.com",
      live: "https://example.com",
    },
  },
];

export default function WorkSection() {
  const { ref, inView } = useInView<HTMLDivElement>();
  const [lightboxImage, setLightboxImage] = useState<{ src: string; title: string } | null>(null);

  const projects = useMemo(() => PROJECTS, []);

  const openLightbox = useCallback((src: string, title: string) => {
    setLightboxImage({ src, title });
  }, []);

  const closeLightbox = useCallback(() => {
    setLightboxImage(null);
  }, []);

  // Close on Escape key
  useEffect(() => {
    if (!lightboxImage) return;
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeLightbox();
    };
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [lightboxImage]);

  // Prevent body scroll when lightbox is open
  useEffect(() => {
    if (lightboxImage) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [lightboxImage]);

  return (
    <>
      <section id="work" className="bg-[#000000]">
        <div ref={ref} className="mx-auto max-w-6xl px-5 sm:px-6 lg:px-8 py-16 sm:py-24 min-h-screen">
          {/* Title (left-aligned) */}
          <div className={cn(trans, inView ? on : base, "delay-75")}>
            <h3 className="text-2xl sm:text-3xl font-semibold text-white">
              <span className="font-mono text-[#FCDDBC] mr-3">03.</span> Some Things I&apos;ve Built
            </h3>
            <div className="mt-2 h-px w-28 bg-white/30" />
          </div>

          {/* Projects list */}
          <div className="mt-16 space-y-20 lg:space-y-24">
            {projects.map((project, idx) => (
              <ProjectCard
                key={idx}
                project={project}
                index={idx}
                inView={inView}
                reversed={idx % 2 !== 0}
                onImageClick={openLightbox}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox Modal */}
      {lightboxImage && (
        <div
          className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn"
          onClick={closeLightbox}
          role="dialog"
          aria-modal="true"
          aria-labelledby="lightbox-title"
        >
          <div className="relative max-w-[90vw] max-h-[90vh] animate-scaleIn" onClick={(e) => e.stopPropagation()}>
            {/* Close button */}
            <button
              onClick={closeLightbox}
              className="absolute -top-12 right-0 text-white/80 hover:text-white transition-colors duration-200 z-10"
              aria-label="Close lightbox"
            >
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Image title */}
            <p id="lightbox-title" className="absolute -top-12 left-0 text-white/90 font-medium text-sm sm:text-base">
              {lightboxImage.title}
            </p>

            {/* Image */}
            <img
              src={lightboxImage.src}
              alt={lightboxImage.title}
              className="max-w-full max-h-[90vh] w-auto h-auto object-contain rounded-lg shadow-2xl ring-1 ring-white/20"
            />
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
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }

        .animate-scaleIn {
          animation: scaleIn 0.3s ease-out;
        }
      `}</style>
    </>
  );
}

function ProjectCard({
  project,
  index,
  inView,
  reversed,
  onImageClick,
}: {
  project: Project;
  index: number;
  inView: boolean;
  reversed?: boolean;
  onImageClick: (src: string, title: string) => void;
}) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);
  const transitionDelay = useMemo(() => `${150 + index * 100}ms`, [index]);

  // Check if image is already loaded (from cache)
  useEffect(() => {
    const img = imgRef.current;
    if (img?.complete && img.naturalHeight !== 0) {
      setImageLoaded(true);
    }
  }, []);

  return (
    <article
      className={cn(
        "group rounded-3xl border border-white/5 bg-white/[0.02] p-6 sm:p-8 shadow-[0_25px_80px_rgba(0,0,0,0.55)]",
        trans,
        inView ? on : base
      )}
      style={{ transitionDelay }}
    >
      <div className="grid gap-8 lg:grid-cols-2 lg:items-center lg:gap-12">
        {/* Media */}
        <div className={cn("relative order-1", reversed ? "lg:order-2" : "lg:order-1")}>
          <div className="overflow-hidden rounded-2xl bg-[#1B1B1F] ring-1 ring-white/10">
            <button
              onClick={() => onImageClick(project.image, project.title)}
              className="relative block w-full cursor-zoom-in"
              aria-label={`View larger image of ${project.title}`}
            >
              <div
                className={cn(
                  "absolute inset-0 flex items-center justify-center transition-opacity duration-300",
                  imageLoaded ? "opacity-0" : "opacity-100"
                )}
              >
                <svg className="h-14 w-14 text-white/15" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>

              <img
                ref={imgRef}
                src={project.image}
                alt={project.title}
                loading="eager"
                onLoad={() => setImageLoaded(true)}
                onError={() => {
                  setImageLoaded(false);
                  console.error(`Failed to load image: ${project.title}`);
                }}
                className={cn(
                  "aspect-[16/10] w-full object-cover transition-all duration-500",
                  "brightness-[0.9] contrast-110 saturate-[0.95] group-hover:scale-[1.02] group-hover:brightness-100",
                  imageLoaded ? "opacity-100" : "opacity-0"
                )}
              />

              <span className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-tr from-black/40 via-transparent to-white/10 opacity-60 transition-opacity duration-500 group-hover:opacity-30" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div
          className={cn(
            "order-2 flex flex-col gap-5 text-white",
            reversed ? "lg:order-1 lg:text-right lg:items-end" : "lg:order-2 lg:text-left"
          )}
        >
          <div
            className={cn(
              "flex w-full flex-wrap items-center gap-4 text-white/70",
              reversed ? "lg:justify-end" : "lg:justify-start"
            )}
          >
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-[#FCDDBC]/80">
              {project.featured ? "Featured Project" : "Case Study"}
            </p>

            {project.links && (
              <div className={cn("flex items-center gap-4", reversed ? "lg:flex-row-reverse" : "ml-auto")}>
                {project.links.github && (
                  <a
                    href={project.links.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white/70 transition-colors duration-200 hover:text-[#FCDDBC]"
                    aria-label="GitHub repository"
                  >
                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 0C5.373 0 0 5.373 0 12a12 12 0 008.207 11.387c.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.009-.322 3.302 1.23a10.13 10.13 0 013.003-.404 10.13 10.13 0 013.006.404c2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576A12.002 12.002 0 0024 12c0-6.627-5.373-12-12-12z" />
                    </svg>
                  </a>
                )}
                {project.links.live && (
                  <a
                    href={project.links.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white/70 transition-colors duration-200 hover:text-[#FCDDBC]"
                    aria-label="Live demo"
                  >
                    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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

          <div className="max-w-xl">
            <h4 className="text-2xl font-semibold tracking-tight transition-colors duration-300 group-hover:text-[#FCDDBC]">
              {project.title}
            </h4>
            <p className="mt-3 text-sm sm:text-base leading-relaxed text-white/80">{project.description}</p>
          </div>

          <ul
            className={cn(
              "flex flex-wrap gap-3 text-[13px] font-mono text-white/70",
              reversed ? "lg:justify-end" : "lg:justify-start"
            )}
          >
            {project.tech.map((tech) => (
              <li
                key={tech}
                className="rounded-full border border-white/10 px-3 py-1 transition-colors duration-200 hover:border-[#FCDDBC]/40 hover:text-[#FCDDBC]"
              >
                {tech}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </article>
  );
}