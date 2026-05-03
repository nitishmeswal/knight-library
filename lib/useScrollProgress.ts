"use client";

import { useEffect } from "react";

/**
 * Writes total page scroll progress (0..1) to a CSS variable on <html>.
 * Three.js scenes read it inside useFrame to drive deterministic animation.
 */
export function usePageScrollProgress(varName = "--scroll-progress") {
  useEffect(() => {
    const root = document.documentElement;
    const update = () => {
      const max = root.scrollHeight - window.innerHeight;
      const p = max > 0 ? window.scrollY / max : 0;
      root.style.setProperty(varName, p.toFixed(4));
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [varName]);
}

/** Read a CSS variable from <html> as a number. Safe on SSR. */
export function readProgressVar(
  varName = "--scroll-progress",
  fallback = 0
): number {
  if (typeof document === "undefined") return fallback;
  const raw = document.documentElement.style.getPropertyValue(varName);
  const n = parseFloat(raw);
  return Number.isFinite(n) ? n : fallback;
}
