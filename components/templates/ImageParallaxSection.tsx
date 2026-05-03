"use client";

import { useGsapScroll } from "@/lib/useGsapScroll";

/**
 * ImageParallaxSection
 * --------------------
 * A grid of tiles that drift at different speeds, creating depth.
 * No images required — swap the colored blocks for <img /> when ready.
 */
export default function ImageParallaxSection() {
  const ref = useGsapScroll(({ el, gsap }) => {
    el.querySelectorAll<HTMLElement>("[data-tile]").forEach((tile) => {
      const speed = parseFloat(tile.dataset.speed ?? "0.3");
      gsap.to(tile, {
        yPercent: -speed * 60,
        ease: "none",
        scrollTrigger: {
          trigger: el,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });
    });
  });

  const tiles = [
    { color: "#7c5cff", speed: 0.2, h: 260 },
    { color: "#1f1f2e", speed: 0.6, h: 360 },
    { color: "#e8e8ee", speed: 0.4, h: 220 },
    { color: "#7c5cff", speed: 0.8, h: 300 },
    { color: "#1f1f2e", speed: 0.3, h: 280 },
    { color: "#ff7c5c", speed: 0.5, h: 340 },
  ];

  return (
    <section
      ref={ref as React.RefObject<HTMLElement>}
      className="relative py-40 px-6 md:px-12"
    >
      <div className="mb-16 max-w-4xl">
        <p className="eyebrow mb-3" data-anim="fade-up">
          Parallax Gallery
        </p>
        <h2 className="headline" data-anim="fade-up">
          Depth from motion.
        </h2>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
        {tiles.map((t, i) => (
          <div
            key={i}
            data-tile
            data-speed={t.speed}
            className="rounded-2xl will-change-transform"
            style={{ background: t.color, height: t.h }}
          />
        ))}
      </div>
    </section>
  );
}
