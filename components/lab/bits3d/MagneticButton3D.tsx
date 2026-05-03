"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

/**
 * MagneticButton3D
 * ----------------
 * A button that magnetizes toward the cursor AND tilts in 3D, giving it
 * real weight. Outer wrapper moves; inner label rotates.
 */
export default function MagneticButton3D({
  children,
  onClick,
  className = "",
}: {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
}) {
  const wrap = useRef<HTMLDivElement>(null);
  const label = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = wrap.current;
    const lbl = label.current;
    if (!el || !lbl) return;
    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = e.clientX - cx;
      const dy = e.clientY - cy;
      const dist = Math.hypot(dx, dy);
      if (dist < 200) {
        gsap.to(el, { x: dx * 0.35, y: dy * 0.35, duration: 0.35, ease: "power3.out" });
        gsap.to(lbl, {
          rotateY: dx * 0.15,
          rotateX: -dy * 0.15,
          duration: 0.35,
          ease: "power3.out",
          transformPerspective: 500,
        });
      } else {
        gsap.to(el, { x: 0, y: 0, duration: 0.6, ease: "elastic.out(1,0.4)" });
        gsap.to(lbl, { rotateX: 0, rotateY: 0, duration: 0.6 });
      }
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <div ref={wrap} className="inline-block will-change-transform">
      <button
        onClick={onClick}
        className={`rounded-full bg-accent px-8 py-4 text-lg font-medium ${className}`}
        style={{ transformStyle: "preserve-3d" }}
      >
        <span ref={label} className="inline-block will-change-transform">
          {children}
        </span>
      </button>
    </div>
  );
}
