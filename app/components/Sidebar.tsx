"use client";

import React, { useContext } from "react";
import { PreloaderAnimContext } from "./PreloaderGate";

export default function Sidebar() {
  const phases = useContext(PreloaderAnimContext);
  const visible = phases.sidebar;

  return (
    <aside
      className={[
        // Transparent desktop sidebar (no bg), fixed and vertically centered
        "hidden md:flex fixed left-0 top-1/2 -translate-y-1/2 z-30 w-16 items-start",
        "transition-all duration-500 ease-out",
        visible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-2",
      ].join(" ")}
    >
      <div className="mx-auto flex flex-col items-center gap-4">
        {/* Social icons */}
        <a
          href="https://github.com/naikoo-cmd"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="GitHub"
          className="group text-foreground/70 hover:text-foreground transition"
        >
          <svg
            width="22"
            height="22"
            viewBox="0 0 24 24"
            aria-hidden="true"
            fill="currentColor"
            className="transition-transform duration-200 group-hover:-translate-y-0.5"
          >
            <path d="M12 2C6.48 2 2 6.58 2 12.26c0 4.52 2.87 8.35 6.84 9.7.5.1.68-.22.68-.49 0-.24-.01-.88-.01-1.73-2.78.62-3.37-1.2-3.37-1.2-.45-1.18-1.11-1.49-1.11-1.49-.91-.64.07-.63.07-.63 1.01.07 1.54 1.06 1.54 1.06.9 1.57 2.36 1.12 2.94.86.09-.67.35-1.12.63-1.38-2.22-.26-4.56-1.14-4.56-5.07 0-1.12.39-2.03 1.03-2.75-.1-.26-.45-1.3.1-2.71 0 0 .85-.28 2.78 1.05.81-.23 1.68-.35 2.55-.35.87 0 1.74.12 2.55.35 1.93-1.33 2.78-1.05 2.78-1.05.56 1.41.21 2.45.1 2.71.64.72 1.03 1.63 1.03 2.75 0 3.94-2.34 4.81-4.57 5.07.36.32.69.95.69 1.92 0 1.39-.01 2.51-.01 2.85 0 .27.18.6.69.49A10.03 10.03 0 0 0 22 12.26C22 6.58 17.52 2 12 2z" />
          </svg>
        </a>

        <a
          href="https://instagram.com/nico_aramy"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Instagram"
          className="group text-foreground/70 hover:text-foreground transition"
        >
          <svg
            width="22"
            height="22"
            viewBox="0 0 24 24"
            aria-hidden="true"
            fill="currentColor"
            className="transition-transform duration-200 group-hover:-translate-y-0.5"
          >
            <path d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5zm0 2a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V7a3 3 0 0 0-3-3H7zm5 3.5a5.5 5.5 0 1 1 0 11.001A5.5 5.5 0 0 1 12 7.5zm0 2a3.5 3.5 0 1 0 0 7.001 3.5 3.5 0 0 0 0-7zM17.5 6a1 1 0 1 1 0 2.001 1 1 0 0 1 0-2z" />
          </svg>
        </a>

        <a
          href="https://linkedin.com/in/nico-aramy"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="LinkedIn"
          className="group text-foreground/70 hover:text-foreground transition"
        >
          <svg
            width="22"
            height="22"
            viewBox="0 0 24 24"
            aria-hidden="true"
            fill="currentColor"
            className="transition-transform duration-200 group-hover:-translate-y-0.5"
          >
            <path d="M4.98 3.5C4.98 4.88 3.86 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1s2.48 1.12 2.48 2.5zM.5 8.5h4V24h-4zM8.5 8.5h3.8v2.1h.05c.53-1 1.83-2.1 3.77-2.1 4.03 0 4.78 2.65 4.78 6.1V24h-4v-7.4c0-1.76-.03-4.03-2.46-4.03-2.47 0-2.85 1.93-2.85 3.9V24h-4z" />
          </svg>
        </a>

        {/* Separator */}
        <span className="my-1 h-px w-8 bg-foreground/20" />

        {/* Rotated website text */}
        <span className="mt-10 text-xs tracking-[0.25em] text-foreground/60 rotate-90 origin-center select-none transition-colors duration-200 hover:text-foreground/80">
          nicoaramy.com
        </span>
      </div>
    </aside>
  );
}
