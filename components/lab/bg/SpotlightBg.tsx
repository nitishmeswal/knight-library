"use client";

import { useEffect, useRef } from "react";

/**
 * SpotlightBg
 * -----------
 * A radial spotlight that follows the cursor. Smooth and GPU-accelerated
 * via CSS custom properties + transform.
 */
export default function SpotlightBg({
  color = "#7c5cff",
  size = 520,
}: {
  color?: string;
  size?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const onMove = (e: MouseEvent) => {
      el.style.setProperty("--x", `${e.clientX}px`);
      el.style.setProperty("--y", `${e.clientY}px`);
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <div
      ref={ref}
      className="fixed inset-0 -z-10 bg-[#05050c] pointer-events-none"
      style={
        {
          background: `radial-gradient(${size}px circle at var(--x,50%) var(--y,50%), ${color}55, transparent 60%), #05050c`,
        } as React.CSSProperties
      }
    />
  );
}
