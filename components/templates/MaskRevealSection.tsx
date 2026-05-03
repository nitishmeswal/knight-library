"use client";

import { useGsapScroll } from "@/lib/useGsapScroll";

/**
 * MaskRevealSection
 * -----------------
 * A clip-path curtain slides across the content revealing a heading and
 * an image block underneath. A softer "curtain opens" alternative to
 * ProductRevealSection.
 */
export default function MaskRevealSection({
  eyebrow = "Reveal",
  title = "What was hidden, now shown.",
}: {
  eyebrow?: string;
  title?: string;
}) {
  const ref = useGsapScroll(({ el, gsap }) => {
    const mask = el.querySelector<HTMLElement>("[data-mask]");
    const content = el.querySelector<HTMLElement>("[data-mask-content]");
    if (!mask || !content) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: el,
        start: "top 70%",
        toggleActions: "play none none reverse",
      },
    });

    tl.fromTo(
      mask,
      { clipPath: "inset(0% 0% 0% 0%)" },
      {
        clipPath: "inset(0% 0% 0% 100%)",
        duration: 1.2,
        ease: "power4.inOut",
      }
    ).from(
      content.children,
      {
        y: 40,
        opacity: 0,
        stagger: 0.1,
        duration: 0.8,
        ease: "power3.out",
      },
      "-=0.7"
    );
  });

  return (
    <section
      ref={ref as React.RefObject<HTMLElement>}
      className="section"
    >
      <div className="relative max-w-5xl w-full">
        <div
          data-mask-content
          className="rounded-3xl border border-white/10 bg-gradient-to-br from-accent/30 to-transparent p-12 md:p-20"
        >
          <p className="eyebrow mb-4">{eyebrow}</p>
          <h2 className="headline mb-6">{title}</h2>
          <p className="text-ink/70 text-lg max-w-2xl">
            The mask above wipes away to uncover this block. Perfect for image
            or video reveals.
          </p>
        </div>
        <div
          data-mask
          className="absolute inset-0 bg-accent rounded-3xl"
        />
      </div>
    </section>
  );
}
