"use client";

import { useGsapScroll } from "@/lib/useGsapScroll";

/**
 * ProductRevealSection
 * --------------------
 * A dramatic reveal: the product panel slides up behind a clip-path curtain
 * that retracts while specs stagger in. Pairs well with a 3D product on
 * the Three.js stage whose rotation is driven by --scroll-progress.
 *
 * Use for: hero product launches, feature showcases.
 */
export default function ProductRevealSection({
  label = "Introducing",
  name = "AURORA X1",
  tagline = "A new shape of motion.",
  specs = ["Titanium shell", "72h battery", "Neural haptics"],
}: {
  label?: string;
  name?: string;
  tagline?: string;
  specs?: string[];
}) {
  const ref = useGsapScroll(({ el, gsap }) => {
    const curtain = el.querySelector<HTMLElement>("[data-curtain]");
    const name = el.querySelector<HTMLElement>("[data-name]");
    const tagline = el.querySelector<HTMLElement>("[data-tagline]");
    const specs = el.querySelectorAll<HTMLElement>("[data-spec]");

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: el,
        start: "top 65%",
        toggleActions: "play none none reverse",
      },
    });

    if (curtain) {
      tl.to(curtain, {
        clipPath: "inset(0% 0% 100% 0%)",
        duration: 1.1,
        ease: "power4.inOut",
      });
    }
    if (name) {
      tl.from(
        name,
        { y: 80, opacity: 0, duration: 0.8, ease: "power3.out" },
        "-=0.6"
      );
    }
    if (tagline) {
      tl.from(
        tagline,
        { y: 40, opacity: 0, duration: 0.6, ease: "power2.out" },
        "-=0.5"
      );
    }
    if (specs.length) {
      tl.from(
        specs,
        {
          y: 30,
          opacity: 0,
          stagger: 0.1,
          duration: 0.5,
          ease: "power2.out",
        },
        "-=0.3"
      );
    }
  });

  return (
    <section
      ref={ref as React.RefObject<HTMLElement>}
      className="section overflow-hidden"
    >
      <div
        data-curtain
        className="absolute inset-0 bg-accent"
        style={{ clipPath: "inset(0% 0% 0% 0%)" }}
      />
      <div className="relative z-10 text-center max-w-3xl">
        <p className="eyebrow mb-3">{label}</p>
        <h2 data-name className="headline mb-4">
          {name}
        </h2>
        <p data-tagline className="text-xl text-ink/70 mb-10">
          {tagline}
        </p>
        <ul className="flex flex-wrap justify-center gap-3">
          {specs.map((s) => (
            <li
              key={s}
              data-spec
              className="rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm"
            >
              {s}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
