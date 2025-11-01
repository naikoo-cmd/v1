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

export default function ContactSection() {
  const { ref, inView } = useInView<HTMLDivElement>();
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isModalOpen]);

  // Close modal on Escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isModalOpen) {
        setIsModalOpen(false);
      }
    };
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [isModalOpen]);

  const contactMethods = [
    {
      name: "WhatsApp",
      icon: (
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
        </svg>
      ),
      href: "https://wa.me/6282277583706",
      color: "hover:text-[#25D366]",
    },
    {
      name: "Discord",
      icon: (
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
          <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418Z" />
        </svg>
      ),
      href: "https://discord.com/users/naiko44",
      color: "hover:text-[#5865F2]",
    },
    {
      name: "Email",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
          />
        </svg>
      ),
      href: "mailto:aramynico@gmail.com",
      color: "hover:text-[#EA4335]",
    },
  ];

  return (
    <>
      <section id="contact" className="bg-white">
        <div ref={ref} className="mx-auto max-w-3xl px-5 sm:px-6 lg:px-8 py-16 sm:py-24 min-h-screen flex flex-col">
          {/* Main content - centered */}
          <div className="flex-grow flex flex-col items-center justify-center text-center space-y-6">
            {/* Number + Title */}
            <div className={[trans, inView ? on : base, "delay-75"].join(" ")}>
              <p className="font-mono text-sm text-[#69585F] mb-2">04. What&apos;s Next?</p>
              <h3 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#2D2A2E]">Get In Touch</h3>
            </div>

            {/* Description */}
            <p
              className={[
                "max-w-xl text-base sm:text-lg text-[#2D2A2E]/80 leading-relaxed",
                trans,
                inView ? on : base,
                "delay-150",
              ].join(" ")}
            >
              I&apos;m currently open for remote opportunities or collaborations. Whether you have a question, want to
              discuss a project, or just want to say hi, feel free to reach out!
            </p>

            {/* Say Hello Button */}
            <div className={[trans, inView ? on : base, "delay-300"].join(" ")}>
              <button
                onClick={() => setIsModalOpen(true)}
                className={[
                  "group relative px-8 py-4 rounded-md",
                  "bg-transparent border-2 border-[#69585F]",
                  "text-[#69585F] font-medium text-base sm:text-lg",
                  "hover:bg-[#69585F]/5",
                  "focus:outline-none focus:ring-2 focus:ring-[#69585F]/50 focus:ring-offset-2",
                  "transition-all duration-300",
                  "transform hover:-translate-y-0.5 active:translate-y-0",
                ].join(" ")}
              >
                <span className="relative z-10">Say Hello</span>
                <span className="absolute inset-0 rounded-md bg-[#69585F]/10 scale-0 group-hover:scale-100 transition-transform duration-300" />
              </button>
            </div>
          </div>

          {/* Footer */}
          <footer className={["mt-16 text-center", trans, inView ? on : base, "delay-500"].join(" ")}>
            <p className="text-sm text-[#2D2A2E]/60 hover:text-[#2D2A2E] transition-colors duration-200 cursor-default">
              Designed & built by Nico Aramy
            </p>
          </footer>
        </div>
      </section>

      {/* Modal */}
      {isModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn"
          onClick={() => setIsModalOpen(false)}
        >
          <div
            className="relative bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 animate-scaleIn"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 text-[#2D2A2E]/60 hover:text-[#2D2A2E] transition-colors duration-200"
              aria-label="Close modal"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Modal content */}
            <div className="text-center space-y-6">
              <h4 className="text-2xl font-bold text-[#2D2A2E]">Contact me via:</h4>

              {/* Contact methods */}
              <div className="flex justify-center gap-8 pt-4">
                {contactMethods.map((method) => (
                  <a
                    key={method.name}
                    href={method.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={[
                      "group flex flex-col items-center gap-2",
                      "text-[#2D2A2E]/70",
                      method.color,
                      "transition-all duration-300",
                      "transform hover:-translate-y-1",
                    ].join(" ")}
                    aria-label={method.name}
                  >
                    <div className="p-3 rounded-full bg-[#69585F]/5 group-hover:bg-[#69585F]/10 transition-colors duration-300">
                      {method.icon}
                    </div>
                    <span className="text-sm font-medium">{method.name}</span>
                  </a>
                ))}
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
            transform: scale(0.9);
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
