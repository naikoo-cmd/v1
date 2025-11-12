"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";

type Job = {
  company: string;
  role: string;
  period: string;
  location?: string;
  url?: string;
  points: string[];
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

export default function ExperienceSection() {
  const { ref, inView } = useInView<HTMLDivElement>();
  const jobs = useMemo<Job[]>(
    () => [
      {
        company: "'",
        role: "Full‑Stack Developer",
        period: "Jan 2023 — Present",
        location: "WFH",
        points: [
          "Developed and maintained web applications using Laravel (PHP), Next.js/React (JavaScript), Express (Node.js), and databases such as MySQL and MongoDB.",
          "Designed and implemented authentication systems, CRUD functionalities, WebSocket features with Socket.io, and REST API integrations to support scalable application features",
          "Built responsive and accessible user interfaces using Tailwind CSS and DaisyUI, focusing on performance and usability across devices.",
          "Implemented state management with Zustand for efficient and maintainable frontend architecture.",
          "Deployed applications to Linux/Apache servers and cloud platforms like Render, managed environments, and utilized Git for version control and collaborative workflows.",
          "Conducted performance optimization, security validation, and functional testing to ensure stability and efficiency in production.",
          "Collaborated with clients to translate business requirements into technical solutions and deliver projects within deadlines.",
          "Utilized Agile methodologies to manage project tasks, sprints, and continuous integration/continuous deployment (CI/CD) pipelines.",
          "Monitored application performance and user feedback to implement iterative improvements and feature enhancements.",
          "Documented codebases, APIs, and system architectures to facilitate team collaboration and future maintenance.",
          "Stayed updated with emerging web technologies and industry trends to incorporate best practices into development processes.",
        ],
      },
      {
        company: "Paperless Hospital",
        role: "On-site Web Developer",
        period: "Jul-Aug 2025",
        location: "RSUD Muhammad Ali Kasim | Gayo Lues",
        points: [
          "Provided day-to-day technical support for SIMRS (Hospital Information System) users, assisting medical and administrative staff in resolving software, hardware, and access issues to maintain smooth hospital operations.",
          "Developed and implemented new system features tailored to specific hospital workflow needs, improving efficiency in patient management, billing, and reporting processes.",
          "Installed and configured hospital servers, databases, and network systems, ensuring proper system performance, security, and scalability.",
          "Performed regular system maintenance, including data backups, recovery testing, and server monitoring to prevent downtime and data loss.",
          "Created clear and detailed technical documentation for system procedures, updates, and configurations to support internal IT reference and audit requirements.",
          "Provided basic training and guidance for hospital staff to improve user understanding of SIMRS modules and reduce recurring support requests.",
          "Diagnosed and resolved issues in Linux-based environments, managing user permissions, cron jobs, and server performance to keep systems stable and secure.",
          "Collaborated with developers, system administrators, and management to ensure the hospital's information system met regulatory standards and operational goals.",
        ],
      },
      {
        company: "Cendekia",
        role: "IT / Administrative",
        period: "Feb 2022-Jun 2025",
        location: "Aceh",
        points: [
          "Installed, configured, and maintained routers and LAN systems, optimizing network performance and stability for classrooms and offices.",
          "Provided comprehensive technical support for computers, printers, and the school's internal network to ensure smooth daily operations.",
          "Set up and managed Mikrotik hotspot systems using the voucher method, including implementing bandwidth management and user monitoring for better internet efficiency.",
          "Oversaw and maintained digital and physical administrative records, including student enrollment data, staff documentation, and school archives.",
          "Designed and developed a digital student admission system (PPDB) using Google Forms and Spreadsheets, streamlining the registration and data collection process.",
          "Managed and updated Dapodik data for students, teachers, and school infrastructure, ensuring compliance with educational standards and government reporting requirements.",
          "Prepared detailed budgets, managed financial documentation, and created SPJ BOP reports using ARKAS to support the school's operational and financial transparency.",
          "Collaborated with teachers and school management to integrate IT-based solutions for administrative and educational needs.",
        ],
      },
      {
        company: "PT. Armada Banda Jaya",
        role: "Graphics Design",
        period: "Jan 2020-2021",
        location: "Aceh",
        points: [
          "Designed promotional materials such as flyers, billboards, banners, and signage.",
          "Created visual concepts to support marketing and branding campaigns.",
          "Managed advertisement installation and ensured proper display quality.",
          "Documented events and marketing activities for promotional use.",
          "Collaborated with the sales team to develop effective marketing visuals.",
          "Coordinated promotional schedules and materials to boost brand visibility.",
        ],
      },
    ],
    []
  );

  const [active, setActive] = useState(0);

  return (
    <section id="experience" className="bg-[#FCDDBC]">
      <div ref={ref} className="mx-auto max-w-6xl px-5 sm:px-6 lg:px-8 py-16 sm:py-24 min-h-[calc(100vh-4rem)]">
        {/* Title (right-aligned) */}
        <div className={["text-right", trans, inView ? on : base, "delay-75"].join(" ")}>
          <h3 className="text-2xl sm:text-3xl font-semibold text-[#2D2A2E]">
            <span className="font-mono text-[#69585F] mr-3">02.</span> Where I&apos;ve Worked
          </h3>
          <div className="ml-auto mt-2 h-px w-28 bg-[#69585F]/30" />
        </div>

        {/* Content */}
        <div className="mt-8">
          {/* Company list: horizontal scroll on mobile, vertical on desktop */}
          <div className={[trans, inView ? on : base, "delay-150"].join(" ")}>
            {/* Mobile: horizontal scroll */}
            <div className="md:hidden overflow-x-auto pb-2 -mx-5 px-5 scrollbar-hide">
              <ul
                role="tablist"
                aria-label="Workplaces"
                className="flex gap-2 min-w-max"
                style={{ scrollBehavior: "smooth" }}
              >
                {jobs.map((job, i) => {
                  const selected = i === active;
                  return (
                    <li key={job.company}>
                      <button
                        id={`exp-tab-${i}`}
                        role="tab"
                        aria-selected={selected}
                        aria-controls={`exp-panel-${i}`}
                        tabIndex={selected ? 0 : -1}
                        onClick={() => setActive(i)}
                        className={[
                          "group whitespace-nowrap px-4 py-2 rounded-md text-sm font-medium",
                          "transition-all duration-300 focus:outline-none",
                          "focus-visible:ring-2 focus-visible:ring-[#69585F]/40",
                          selected
                            ? "bg-[#69585F] text-[#FCDDBC] shadow-md"
                            : "text-[#2D2A2E]/70 hover:text-[#2D2A2E] hover:bg-[#69585F]/10",
                        ].join(" ")}
                      >
                        {job.company}
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>

            {/* Desktop: two-column layout */}
            <div className="hidden md:grid md:grid-cols-[220px_1fr] gap-10 lg:gap-16 items-start">
              {/* Left: company list (vertical tabs) */}
              <div className="py-2">
                <ul role="tablist" aria-label="Workplaces" className="space-y-1">
                  {jobs.map((job, i) => {
                    const selected = i === active;
                    return (
                      <li key={job.company}>
                        <button
                          id={`exp-tab-${i}`}
                          role="tab"
                          aria-selected={selected}
                          aria-controls={`exp-panel-${i}`}
                          tabIndex={selected ? 0 : -1}
                          onClick={() => setActive(i)}
                          className={[
                            "group w-full text-left px-3 py-2 rounded-md",
                            "transition-all duration-300 focus:outline-none",
                            "focus-visible:ring-2 focus-visible:ring-[#69585F]/40",
                            selected
                              ? "bg-[#69585F]/10 text-[#2D2A2E] font-medium"
                              : "text-[#2D2A2E]/70 hover:text-[#2D2A2E] hover:bg-[#69585F]/10",
                          ].join(" ")}
                        >
                          <span className="relative inline-flex items-center">
                            {/* subtle left indicator */}
                            <span
                              className={[
                                "mr-2 h-4 w-0.5 rounded-full transition-all duration-300",
                                selected
                                  ? "bg-[#69585F] opacity-100"
                                  : "bg-[#69585F]/40 opacity-0 group-hover:opacity-100",
                              ].join(" ")}
                              aria-hidden
                            />
                            {job.company}
                          </span>
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </div>

              {/* Right: details with subtle sidebar divider */}
              <div className="border-l border-[#69585F]/30 pl-10">
                <JobPanel key={active} job={jobs[active]} index={active} inView={inView} />
              </div>
            </div>
          </div>

          {/* Mobile: job description below horizontal tabs */}
          <div className={["md:hidden mt-6", trans, inView ? on : base, "delay-200"].join(" ")}>
            <JobPanel key={active} job={jobs[active]} index={active} inView={inView} />
          </div>
        </div>
      </div>
    </section>
  );
}

function JobPanel({ job, index, inView }: { job: Job; index: number; inView: boolean }) {
  const [show, setShow] = useState(false);

  // Smooth enter on mount/change
  useEffect(() => {
    // Reset animation state
    setShow(false);
    const raf = requestAnimationFrame(() => setShow(true));
    return () => cancelAnimationFrame(raf);
  }, [job]);

  return (
    <div
      id={`exp-panel-${index}`}
      role="tabpanel"
      aria-labelledby={`exp-tab-${index}`}
      className={[trans, show && inView ? on : base, "delay-100"].join(" ")}
    >
      <div className="flex flex-wrap items-baseline gap-x-2">
        <h4 className="text-lg sm:text-xl font-semibold text-[#2D2A2E]">{job.role}</h4>
        <span className="text-[#69585F]">@ {job.company}</span>
      </div>
      <p className="mt-1 text-sm text-[#2D2A2E]/70">{job.period}</p>
      {job.location && <p className="text-sm text-[#2D2A2E]/60">{job.location}</p>}

      <ul className="mt-4 space-y-3">
        {job.points.map((pt, idx) => (
          <li key={idx} className="flex items-start gap-3 text-[#2D2A2E]/90">
            <span className="mt-1 h-1.5 w-1.5 rounded-full bg-[#69585F]/80 shrink-0" aria-hidden />
            <span>{pt}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
