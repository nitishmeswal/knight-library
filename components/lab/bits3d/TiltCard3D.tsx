"use client";

import { useRef } from "react";
import gsap from "gsap";

/**
 * TiltCard3D
 * ----------
 * Mouse-reactive 3D tilt card with depth layers. Pure CSS 3D + GSAP —
 * no Canvas needed. Wrap any content; mark inner layers with
 * `data-depth="0.3"` to float at different Z-depths.
 */
export default function TiltCard3D({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    gsap.to(el, {
      rotateY: px * 18,
      rotateX: -py * 18,
      duration: 0.5,
      ease: "power3.out",
      transformPerspective: 900,
    });
    el.querySelectorAll<HTMLElement>("[data-depth]").forEach((layer) => {
      const d = parseFloat(layer.dataset.depth ?? "0.2");
      gsap.to(layer, {
        x: -px * 40 * d,
        y: -py * 40 * d,
        duration: 0.5,
        ease: "power3.out",
      });
    });
  };

  const reset = () => {
    const el = ref.current;
    if (!el) return;
    gsap.to(el, { rotateX: 0, rotateY: 0, duration: 0.7, ease: "power3.out" });
    el.querySelectorAll<HTMLElement>("[data-depth]").forEach((layer) => {
      gsap.to(layer, { x: 0, y: 0, duration: 0.7, ease: "power3.out" });
    });
  };

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={reset}
      className={`relative will-change-transform ${className}`}
      style={{ transformStyle: "preserve-3d" }}
    >
      {children}
    </div>
  );
}
