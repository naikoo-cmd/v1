"use client";

import Image from "next/image";
import React, { memo, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { PreloaderAnimContext } from "./PreloaderGate";

type NavItem = { number: string; label: string; href: string };

const NAV_ITEMS: readonly NavItem[] = Object.freeze([
  { number: "01.", label: "About", href: "#about" },
  { number: "02.", label: "Experience", href: "#experience" },
  { number: "03.", label: "Work", href: "#work" },
  { number: "04.", label: "Contact", href: "#contact" },
  { number: "", label: "Resume", href: "/resume" },
] as const);

// Reusable helpers for the Resume button
const isResumeItem = (item: NavItem) => item.label === "Resume" || item.href === "/resume";
const resumeButtonClasses =
  "inline-flex items-center rounded-md border border-foreground/20 px-3 py-1.5 " +
  "text-sm font-medium text-foreground/90 hover:text-foreground " +
  "hover:bg-foreground/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground/20 " +
  "transition-colors transition-transform duration-200 motion-safe:hover:scale-[1.02] motion-safe:active:scale-[0.98]";

interface NavbarProps {
  logoSrc?: string;
  className?: string;
}

function NavbarBase({ logoSrc = "/logo.svg", className = "logo" }: NavbarProps) {
  const [open, setOpen] = useState(false);
  const phases = useContext(PreloaderAnimContext);
  const navVisible = phases.nav;

  const items = useMemo(() => NAV_ITEMS, []);
  const nonResumeItems = useMemo(() => items.filter((i) => !isResumeItem(i)), [items]);
  const resumeItem = useMemo(() => items.find(isResumeItem), [items]);

  const openMenu = useCallback(() => setOpen(true), []);
  const closeMenu = useCallback(() => setOpen(false), []);
  const toggleMenu = useCallback(() => setOpen((s) => !s), []);

  // Smooth-scroll handler for hash links (e.g., #about) with navbar offset
  const handleHashNav = useCallback(
    (href: string, done?: () => void) => (e: React.MouseEvent<HTMLAnchorElement>) => {
      if (!href.startsWith("#")) return;
      e.preventDefault();
      const id = href.slice(1);
      const el = document.getElementById(id);
      if (!el) return;
      const NAV_OFFSET = 64; // h-16
      const y = el.getBoundingClientRect().top + window.pageYOffset - NAV_OFFSET;
      window.scrollTo({ top: y, behavior: "smooth" });
      done?.();
    },
    []
  );

  // Close with Escape key when open
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeMenu();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, closeMenu]);

  // Prevent body scroll when sidebar is open
  useEffect(() => {
    if (!open) return;
    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = overflow;
    };
  }, [open]);

  return (
    <>
      <nav
        className={[
          "fixed inset-x-0 top-0 z-40 h-16",
          // Visual
          "bg-background/70 backdrop-blur border-b border-foreground/10",
          // Layout + animation
          "flex items-center justify-between px-4 sm:px-6",
          "transition-all duration-500 ease-out",
          navVisible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2",
          className,
        ].join(" ")}
        aria-label="Main navigation"
      >
        {/* Left: Logo */}
        <a
          href="/"
          className="flex items-center gap-2 group transition-transform duration-200 motion-safe:hover:scale-105"
          aria-label="Home"
        >
          <Image
            src={logoSrc}
            alt="Logo"
            width={28}
            height={28}
            priority
            className="transition-transform duration-200 motion-safe:group-hover:rotate-12"
          />
          <span className="sr-only">Home</span>
        </a>

        {/* Brand name next to logo - mobile only */}
        <div className="flex items-center gap-3 ml-2 md:hidden">
          <p className="font-poppins text-lg">
            <span style={{ color: "#FCDDBC" }}>Nico</span> <span style={{ color: "#69585F" }}>Aramy</span>
          </p>
        </div>

        {/* Desktop menu */}
        <ul className="hidden md:flex items-center gap-8 text-sm">
          {items.map((item) => (
            <li key={item.href}>
              {isResumeItem(item) ? (
                <a href={item.href} className={resumeButtonClasses}>
                  {item.label}
                </a>
              ) : (
                <a
                  href={item.href}
                  onClick={handleHashNav(item.href)}
                  className="group flex items-center gap-2 text-foreground/80 hover:text-foreground transition"
                >
                  <span className="text-xs font-mono text-foreground/60 group-hover:text-foreground/80">
                    {item.number}
                  </span>
                  <span className="text-sm">{item.label}</span>
                </a>
              )}
            </li>
          ))}
        </ul>

        {/* Mobile hamburger */}
        <button
          type="button"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-controls="navbar-sidebar"
          aria-expanded={open}
          onClick={toggleMenu}
          className="md:hidden inline-flex items-center justify-center rounded-md p-2 text-foreground/80 hover:text-foreground hover:bg-foreground/5 transition"
        >
          {!open ? (
            <svg width="24" height="24" viewBox="0 0 24 24" aria-hidden="true" className="block">
              <path d="M4 6h16M4 12h16M4 18h16" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
            </svg>
          ) : (
            <svg width="24" height="24" viewBox="0 0 24 24" aria-hidden="true" className="block">
              <path d="M6 6l12 12M18 6l-12 12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
            </svg>
          )}
        </button>
      </nav>

      {/* Mobile overlay */}
      <div
        className={[
          "md:hidden fixed inset-0 z-40 bg-black/50 transition-opacity",
          open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none",
        ].join(" ")}
        onClick={closeMenu}
        aria-hidden="true"
      />

      {/* Mobile sidebar */}
      <aside
        id="navbar-sidebar"
        className={[
          "md:hidden fixed right-0 top-0 z-50 h-full w-72 max-w-[85%]",
          "bg-background shadow-xl border-l border-foreground/10",
          "transform transition-transform duration-300 ease-out",
          open ? "translate-x-0" : "translate-x-full",
          "flex flex-col",
        ].join(" ")}
        role="dialog"
        aria-modal="true"
        aria-label="Menu"
      >
        <div className="flex items-center justify-between h-16 px-4 border-b border-foreground/10">
          <a href="/" className="flex items-center gap-2" onClick={closeMenu} aria-label="Home">
            <Image src={logoSrc} alt="Logo" width={28} height={28} />
            <span className="sr-only">Home</span>
          </a>
          <button
            type="button"
            onClick={closeMenu}
            aria-label="Close menu"
            className="inline-flex items-center justify-center rounded-md p-2 text-foreground/80 hover:text-foreground hover:bg-foreground/5 transition"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M6 6l12 12M18 6l-12 12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        {/* Menu items (excluding Resume) */}
        <nav className="flex-1 overflow-y-auto px-4 py-6">
          <ul className="space-y-4">
            {nonResumeItems.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  onClick={handleHashNav(item.href, closeMenu)}
                  className="group flex items-center gap-3 text-foreground/90 hover:text-foreground transition"
                >
                  <span className="text-xs font-mono text-foreground/60 group-hover:text-foreground/80">
                    {item.number}
                  </span>
                  <span className="text-base">{item.label}</span>
                </a>
              </li>
            ))}
          </ul>
          <br />

          {/* Social icons above Resume */}
          <div className="px-4 pt-4">
            <div className="flex items-center gap-5 text-foreground/70">
              <a
                href="https://instagram.com/nico_aramy/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                onClick={closeMenu}
                className="hover:text-foreground transition"
              >
                <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5zm0 2a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V7a3 3 0 0 0-3-3H7zm5 3.5a5.5 5.5 0 1 1 0 11.001A5.5 5.5 0 0 1 12 7.5zm0 2a3.5 3.5 0 1 0 0 7.001 3.5 3.5 0 0 0 0-7zM17.5 6a1 1 0 1 1 0 2.001 1 1 0 0 1 0-2z" />
                </svg>
              </a>
              <a
                href="https://github.com/naikoo-cmd/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                onClick={closeMenu}
                className="hover:text-foreground transition"
              >
                <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M12 2C6.48 2 2 6.58 2 12.26c0 4.52 2.87 8.35 6.84 9.7.5.1.68-.22.68-.49 0-.24-.01-.88-.01-1.73-2.78.62-3.37-1.2-3.37-1.2-.45-1.18-1.11-1.49-1.11-1.49-.91-.64.07-.63.07-.63 1.01.07 1.54 1.06 1.54 1.06.9 1.57 2.36 1.12 2.94.86.09-.67.35-1.12.63-1.38-2.22-.26-4.56-1.14-4.56-5.07 0-1.12.39-2.03 1.03-2.75-.1-.26-.45-1.3.1-2.71 0 0 .85-.28 2.78 1.05.81-.23 1.68-.35 2.55-.35.87 0 1.74.12 2.55.35 1.93-1.33 2.78-1.05 2.78-1.05.56 1.41.21 2.45.1 2.71.64.72 1.03 1.63 1.03 2.75 0 3.94-2.34 4.81-4.57 5.07.36.32.69.95.69 1.92 0 1.39-.01 2.51-.01 2.85 0 .27.18.6.69.49A10.03 10.03 0 0 0 22 12.26C22 6.58 17.52 2 12 2z" />
                </svg>
              </a>
              <a
                href="https://www.linkedin.com/in/nico-aramy/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                onClick={closeMenu}
                className="hover:text-foreground transition"
              >
                <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M4.98 3.5C4.98 4.88 3.86 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1s2.48 1.12 2.48 2.5zM.5 8.5h4V24h-4zM8.5 8.5h3.8v2.1h.05c.53-1 1.83-2.1 3.77-2.1 4.03 0 4.78 2.65 4.78 6.1V24h-4v-7.4c0-1.76-.03-4.03-2.46-4.03-2.47 0-2.85 1.93-2.85 3.9V24h-4z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Top: Resume button */}
          {resumeItem && (
            <div className="px-4 pt-4">
              <a
                href={resumeItem.href}
                onClick={closeMenu}
                className={`${resumeButtonClasses} w-full justify-center py-2`}
              >
                {resumeItem.label}
              </a>
            </div>
          )}
        </nav>

        <div className="h-16" />
      </aside>
    </>
  );
}

const Navbar = memo(NavbarBase);
export default Navbar;
