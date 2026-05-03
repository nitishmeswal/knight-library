"use client";

import { useGsapScroll } from "@/lib/useGsapScroll";

/**
 * StickyCardsSection
 * ------------------
 * Cards stack on top of each other, each one pinning briefly before the
 * next takes over. Great for step-by-step process explanations.
 */
export default function StickyCardsSection({
  cards = [
    { title: "Step 01", body: "Define the scroll story." },
    { title: "Step 02", body: "Author motion that guides attention." },
    { title: "Step 03", body: "Ship something that feels alive." },
  ],
}: {
  cards?: { title: string; body: string }[];
}) {
  const ref = useGsapScroll(({ el, gsap }) => {
    el.querySelectorAll<HTMLElement>("[data-sticky-card]").forEach(
      (card, i, arr) => {
        gsap.to(card, {
          scale: 0.9,
          y: -30,
          opacity: i === arr.length - 1 ? 1 : 0.5,
          scrollTrigger: {
            trigger: card,
            start: "top 10%",
            end: "bottom top",
            scrub: true,
          },
        });
      }
    );
  });

  return (
    <section
      ref={ref as React.RefObject<HTMLElement>}
      className="relative py-20 sm:py-40 px-4 sm:px-6 md:px-12"
    >
      <div className="max-w-3xl mx-auto space-y-6">
        <p className="eyebrow mb-3">Process</p>
        <h2 className="headline mb-16">Stacked, sticky, sequenced.</h2>
        <div className="space-y-[10vh]">
          {cards.map((c, i) => (
            <div
              key={i}
              data-sticky-card
              className="sticky top-24 rounded-2xl sm:rounded-3xl border border-white/10 bg-white/5 p-5 sm:p-10 backdrop-blur will-change-transform"
              style={{ zIndex: i + 1 }}
            >
              <p className="eyebrow mb-3">{String(i + 1).padStart(2, "0")}</p>
              <h3 className="text-2xl sm:text-4xl font-semibold mb-3">{c.title}</h3>
              <p className="text-ink/70 text-base sm:text-lg">{c.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
