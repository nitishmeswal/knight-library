"use client";

import { useGsapScroll } from "@/lib/useGsapScroll";

/**
 * ForeshadowSection
 * -----------------
 * Teases what's coming: blurred/dimmed preview that sharpens as the user
 * scrolls deeper. Uses `scrub` so motion is tied to scroll position.
 *
 * Use for: "coming next" teasers, section transitions, narrative pacing.
 */
export default function ForeshadowSection({
  hint = "What comes next…",
  preview = "A story told in motion.",
}: {
  hint?: string;
  preview?: string;
}) {
  const ref = useGsapScroll(({ el, gsap }) => {
    const target = el.querySelector<HTMLElement>("[data-foreshadow]");
    if (!target) return;

    gsap.fromTo(
      target,
      { filter: "blur(24px)", opacity: 0.25, scale: 1.1 },
      {
        filter: "blur(0px)",
        opacity: 1,
        scale: 1,
        ease: "none",
        scrollTrigger: {
          trigger: el,
          start: "top bottom",
          end: "center center",
          scrub: true,
        },
      }
    );
  });

  return (
    <section
      ref={ref as React.RefObject<HTMLElement>}
      className="section"
    >
      <div className="text-center max-w-3xl">
        <p className="eyebrow mb-6">{hint}</p>
        <h2 data-foreshadow className="headline">
          {preview}
        </h2>
      </div>
    </section>
  );
}
