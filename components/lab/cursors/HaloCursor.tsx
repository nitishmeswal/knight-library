"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

/**
 * HaloCursor
 * ----------
 * A small inner dot (fast) and a larger outer ring (lagged). The ring
 * squares up over elements marked `data-cursor="box"` — classic editorial.
 */
export default function HaloCursor() {
  const dot = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const d = dot.current,
      r = ring.current;
    if (!d || !r) return;
    const dx = gsap.quickTo(d, "x", { duration: 0.08, ease: "power1.out" });
    const dy = gsap.quickTo(d, "y", { duration: 0.08, ease: "power1.out" });
    const rx = gsap.quickTo(r, "x", { duration: 0.35, ease: "power3.out" });
    const ry = gsap.quickTo(r, "y", { duration: 0.35, ease: "power3.out" });

    const move = (e: MouseEvent) => {
      dx(e.clientX);
      dy(e.clientY);
      rx(e.clientX);
      ry(e.clientY);
    };
    const over = (e: MouseEvent) => {
      const t = e.target as HTMLElement;
      if (t.closest?.('[data-cursor="box"]')) {
        gsap.to(r, { borderRadius: 6, scale: 1.8, duration: 0.3 });
      } else {
        gsap.to(r, { borderRadius: 999, scale: 1, duration: 0.3 });
      }
    };
    window.addEventListener("mousemove", move);
    window.addEventListener("mouseover", over);
    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseover", over);
    };
  }, []);

  return (
    <>
      <div
        ref={dot}
        aria-hidden
        className="fixed top-0 left-0 z-[100] pointer-events-none w-1.5 h-1.5 rounded-full bg-accent"
        style={{ transform: "translate(-50%, -50%)" }}
      />
      <div
        ref={ring}
        aria-hidden
        className="fixed top-0 left-0 z-[100] pointer-events-none w-10 h-10 border border-accent/70 rounded-full"
        style={{ transform: "translate(-50%, -50%)" }}
      />
    </>
  );
}
