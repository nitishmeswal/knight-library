"use client";

import { useGsapScroll } from "@/lib/useGsapScroll";

/**
 * HorizontalScrollSection
 * -----------------------
 * Pins the section and translates a panel track horizontally as the user
 * scrolls vertically. Classic editorial/portfolio pattern.
 */
export default function HorizontalScrollSection({
  panels = [
    { title: "Frame 01", body: "Concept" },
    { title: "Frame 02", body: "Prototype" },
    { title: "Frame 03", body: "Ship" },
    { title: "Frame 04", body: "Iterate" },
  ],
}: {
  panels?: { title: string; body: string }[];
}) {
  const ref = useGsapScroll(({ el, gsap }) => {
    const track = el.querySelector<HTMLElement>("[data-track]");
    if (!track) return;
    const distance = track.scrollWidth - window.innerWidth;

    gsap.to(track, {
      x: -distance,
      ease: "none",
      scrollTrigger: {
        trigger: el,
        start: "top top",
        end: () => `+=${distance}`,
        pin: true,
        scrub: 1,
        invalidateOnRefresh: true,
      },
    });
  });

  return (
    <section
      ref={ref as React.RefObject<HTMLElement>}
      className="relative h-screen overflow-hidden"
    >
      <div
        data-track
        className="flex h-full items-center gap-4 sm:gap-8 px-4 sm:px-12 will-change-transform"
        style={{ width: "max-content" }}
      >
        {panels.map((p, i) => (
          <div
            key={i}
            className="w-[85vw] sm:w-[70vw] h-[60vh] sm:h-[70vh] rounded-2xl sm:rounded-3xl border border-white/10 bg-white/5 p-5 sm:p-10 flex flex-col justify-end backdrop-blur"
          >
            <p className="eyebrow mb-2">{String(i + 1).padStart(2, "0")}</p>
            <h3 className="text-2xl sm:text-4xl md:text-5xl font-semibold mb-2">{p.title}</h3>
            <p className="text-ink/70 text-sm sm:text-lg">{p.body}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
