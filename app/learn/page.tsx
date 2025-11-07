"use client";

import Navbar from "@/app/components/Navbar";
import Sidebar from "@/app/components/Sidebar";
import { PreloaderAnimContext } from "@/app/components/PreloaderGate";
import { useEffect, useState } from "react";

export default function Learn() {
  const [mounted, setMounted] = useState(false);
  const [phases, setPhases] = useState({ nav: false, content: false, sidebar: false });

  useEffect(() => {
    // Immediately show navbar and sidebar without preloader
    setMounted(true);
    setPhases({ nav: true, content: true, sidebar: true });
  }, []);

  return (
    <PreloaderAnimContext.Provider value={phases}>
      <div className="relative min-h-screen">
        <div className="pt-16 md:pl-20">
          <Sidebar />

          <main
            className={[
              "container mx-auto px-5 sm:px-6 lg:px-8 py-16 sm:py-24",
              "transition-all duration-700 ease-out",
              mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4",
            ].join(" ")}
          >
            <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-6">Coming soon!</h1>
            <div className="prose prose-sm sm:prose lg:prose-lg max-w-none">
              <p className="text-foreground/80 leading-relaxed">{/* // */}</p>
            </div>
          </main>
        </div>
      </div>
    </PreloaderAnimContext.Provider>
  );
}
