"use client";

import React, { PropsWithChildren, createContext, useCallback, useEffect, useState } from "react";
import Preloader from "./Preloader";

export const PreloaderReadyContext = createContext<boolean>(false);
export type AnimPhases = { nav: boolean; content: boolean; sidebar: boolean };
export const PreloaderAnimContext = createContext<AnimPhases>({ nav: false, content: false, sidebar: false });

type PreloaderGateProps = PropsWithChildren<{}>;

export default function PreloaderGate({ children }: PreloaderGateProps) {
  const [ready, setReady] = useState(false);
  const [phases, setPhases] = useState<AnimPhases>({ nav: false, content: false, sidebar: false });

  const handleFinish = useCallback(() => setReady(true), []);

  // Sequence: nav -> content -> sidebar (desktop)
  useEffect(() => {
    if (!ready) return;
    setPhases({ nav: true, content: false, sidebar: false });
    const id1 = setTimeout(() => setPhases((p) => ({ ...p, content: true })), 150);
    const id2 = setTimeout(() => setPhases((p) => ({ ...p, sidebar: true })), 350);
    return () => {
      clearTimeout(id1);
      clearTimeout(id2);
    };
  }, [ready]);

  return (
    <PreloaderReadyContext.Provider value={ready}>
      <PreloaderAnimContext.Provider value={phases}>
        <div className="relative min-h-screen">
          {!ready && <Preloader onFinish={handleFinish} />}
          <div className={["transition-opacity duration-300", ready ? "opacity-100" : "opacity-0"].join(" ")}>
            {children}
          </div>
        </div>
      </PreloaderAnimContext.Provider>
    </PreloaderReadyContext.Provider>
  );
}
