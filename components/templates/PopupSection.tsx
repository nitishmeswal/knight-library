"use client";

import { useGsapScroll } from "@/lib/useGsapScroll";

/**
 * PopupSection
 * ------------
 * A modal-style card springs in from 0 scale with a slight rotate,
 * then settles. Triggered when the section enters view.
 *
 * Use for: announcements, lead magnets, promotions.
 */
export default function PopupSection({
  eyebrow = "Heads up",
  title = "Limited Time Drop",
  body = "This popup animates in when you scroll to it — great for announcements, promotions, or lead captures.",
  cta = "Claim now",
}: {
  eyebrow?: string;
  title?: string;
  body?: string;
  cta?: string;
}) {
  const ref = useGsapScroll(({ el, gsap }) => {
    const card = el.querySelector<HTMLElement>("[data-popup-card]");
    const overlay = el.querySelector<HTMLElement>("[data-popup-overlay]");
    if (!card || !overlay) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: el,
        start: "top 70%",
        toggleActions: "play none none reverse",
      },
    });

    tl.from(overlay, { opacity: 0, duration: 0.4, ease: "power2.out" })
      .from(
        card,
        {
          scale: 0,
          rotate: -12,
          opacity: 0,
          duration: 0.7,
          ease: "back.out(2)",
        },
        "-=0.2"
      )
      .from(
        card.querySelectorAll("[data-popup-item]"),
        {
          y: 20,
          opacity: 0,
          stagger: 0.08,
          duration: 0.5,
          ease: "power2.out",
        },
        "-=0.3"
      );
  });

  return (
    <section
      ref={ref as React.RefObject<HTMLElement>}
      className="section"
    >
      <div
        data-popup-overlay
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
      />
      <div
        data-popup-card
        className="relative z-10 max-w-md w-full rounded-2xl sm:rounded-3xl bg-white/10 border border-white/15 p-5 sm:p-8 shadow-2xl backdrop-blur-xl mx-4 sm:mx-0"
      >
        <p data-popup-item className="eyebrow mb-3">
          {eyebrow}
        </p>
        <h2 data-popup-item className="text-3xl font-semibold mb-3">
          {title}
        </h2>
        <p data-popup-item className="text-ink/70 mb-6">
          {body}
        </p>
        <button
          data-popup-item
          className="w-full rounded-full bg-accent py-3 font-medium hover:opacity-90 transition"
        >
          {cta}
        </button>
      </div>
    </section>
  );
}
