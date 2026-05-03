"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

/**
 * TrailCursor
 * -----------
 * A chain of shrinking dots that follow the cursor with increasing lag.
 * Nice for playful/creative sites.
 */
export default function TrailCursor({
  count = 10,
  color = "#7c5cff",
}: {
  count?: number;
  color?: string;
}) {
  const refs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const dots = refs.current.filter(Boolean) as HTMLDivElement[];
    const setters = dots.map((el) => ({
      x: gsap.quickTo(el, "x", { duration: 0.3 + 0.06 * dots.indexOf(el), ease: "power2.out" }),
      y: gsap.quickTo(el, "y", { duration: 0.3 + 0.06 * dots.indexOf(el), ease: "power2.out" }),
    }));

    const onMove = (e: MouseEvent) => {
      setters.forEach((s) => {
        s.x(e.clientX);
        s.y(e.clientY);
      });
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, [count]);

  return (
    <>
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          ref={(el) => {
            refs.current[i] = el;
          }}
          aria-hidden
          className="fixed top-0 left-0 z-[100] pointer-events-none rounded-full"
          style={{
            width: 14 - (i * 10) / count,
            height: 14 - (i * 10) / count,
            background: color,
            opacity: 1 - i / count,
            transform: "translate(-50%, -50%)",
          }}
        />
      ))}
    </>
  );
}
