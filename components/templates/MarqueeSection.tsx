"use client";

import { useGsapScroll } from "@/lib/useGsapScroll";

/**
 * MarqueeSection
 * --------------
 * Infinite horizontal loop that speeds up/slows down with scroll velocity.
 * Text is duplicated to make the loop seamless.
 */
export default function MarqueeSection({
  text = "SCROLL · MOTION · REVEAL · HOOK · EXPLODE ·",
}: {
  text?: string;
}) {
  const ref = useGsapScroll(({ el, gsap }) => {
    const track = el.querySelector<HTMLElement>("[data-marquee]");
    if (!track) return;

    const loop = gsap.to(track, {
      xPercent: -50,
      duration: 20,
      ease: "none",
      repeat: -1,
    });

    // scroll velocity modulates speed
    gsap.registerPlugin();
    const onScroll = () => {
      const velocity = (window as any).__lastScrollVel ?? 0;
      gsap.to(loop, {
        timeScale: 1 + Math.min(Math.abs(velocity) / 500, 4),
        duration: 0.3,
      });
    };

    let last = window.scrollY;
    let lastT = performance.now();
    const update = () => {
      const now = performance.now();
      const dy = window.scrollY - last;
      const dt = now - lastT || 1;
      (window as any).__lastScrollVel = (dy / dt) * 1000;
      last = window.scrollY;
      lastT = now;
      onScroll();
    };
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  });

  return (
    <section
      ref={ref as React.RefObject<HTMLElement>}
      className="relative h-[40vh] flex items-center overflow-hidden border-y border-white/10"
    >
      <div
        data-marquee
        className="flex whitespace-nowrap text-4xl sm:text-7xl md:text-9xl font-semibold tracking-tight"
        style={{ width: "max-content" }}
      >
        <span className="pr-12">{text}</span>
        <span className="pr-12">{text}</span>
      </div>
    </section>
  );
}
