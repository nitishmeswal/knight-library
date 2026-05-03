"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

/**
 * BlobCursor
 * ----------
 * Large soft blob that lags behind the cursor. Grows on hover over
 * elements marked with `data-cursor="grow"`.
 */
export default function BlobCursor({
  color = "#7c5cff",
  size = 42,
}: {
  color?: string;
  size?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const xTo = gsap.quickTo(el, "x", { duration: 0.4, ease: "power3.out" });
    const yTo = gsap.quickTo(el, "y", { duration: 0.4, ease: "power3.out" });

    const move = (e: MouseEvent) => {
      xTo(e.clientX - size / 2);
      yTo(e.clientY - size / 2);
    };
    const over = (e: MouseEvent) => {
      const t = e.target as HTMLElement;
      if (t.closest?.('[data-cursor="grow"]')) {
        gsap.to(el, { scale: 2.4, duration: 0.3, ease: "power3.out" });
      } else {
        gsap.to(el, { scale: 1, duration: 0.3 });
      }
    };
    window.addEventListener("mousemove", move);
    window.addEventListener("mouseover", over);
    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseover", over);
    };
  }, [size]);

  return (
    <div
      ref={ref}
      aria-hidden
      className="fixed top-0 left-0 z-[100] pointer-events-none rounded-full mix-blend-difference"
      style={{
        width: size,
        height: size,
        background: color,
        filter: "blur(1px)",
      }}
    />
  );
}
