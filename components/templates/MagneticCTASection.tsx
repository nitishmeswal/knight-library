"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

/**
 * MagneticCTASection
 * ------------------
 * A CTA button that is attracted to the cursor — subtle translate based on
 * mouse proximity. Great for final call-to-action sections.
 */
export default function MagneticCTASection({
  label = "Let's build it",
  caption = "One button. All the gravity.",
}: {
  label?: string;
  caption?: string;
}) {
  const btnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const btn = btnRef.current;
    if (!btn) return;
    const strength = 0.35;

    const onMove = (e: MouseEvent) => {
      const rect = btn.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = e.clientX - cx;
      const dy = e.clientY - cy;
      const dist = Math.hypot(dx, dy);
      if (dist < 220) {
        gsap.to(btn, {
          x: dx * strength,
          y: dy * strength,
          duration: 0.4,
          ease: "power3.out",
        });
      } else {
        gsap.to(btn, { x: 0, y: 0, duration: 0.6, ease: "elastic.out(1,0.4)" });
      }
    };

    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <section className="section">
      <div className="text-center">
        <p className="eyebrow mb-6" data-anim="fade-up">
          {caption}
        </p>
        <button
          ref={btnRef}
          className="rounded-full bg-accent px-8 py-4 sm:px-12 sm:py-6 text-lg sm:text-2xl font-medium will-change-transform"
        >
          {label}
        </button>
      </div>
    </section>
  );
}
