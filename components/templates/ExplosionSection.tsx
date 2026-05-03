"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { splitText } from "@/lib/splitText";

/**
 * ExplosionSection
 * ----------------
 * Characters start scattered/exploded and reform into a readable phrase
 * as the user scrolls through the section. Fully scrubbed.
 *
 * Use for: transformation moments, "from chaos to clarity" narratives.
 */
export default function ExplosionSection({
  phrase = "Chaos becomes clarity.",
}: {
  phrase?: string;
}) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    gsap.registerPlugin(ScrollTrigger);
    const el = ref.current;
    const target = el.querySelector<HTMLElement>("[data-explode]");
    if (!target) return;

    const split = splitText(target, "chars");

    const ctx = gsap.context(() => {
      // Randomize initial exploded positions
      split.chars.forEach((c) => {
        gsap.set(c, {
          x: gsap.utils.random(-600, 600),
          y: gsap.utils.random(-400, 400),
          rotate: gsap.utils.random(-270, 270),
          scale: gsap.utils.random(0.3, 2.2),
          opacity: 0,
        });
      });

      gsap.to(split.chars, {
        x: 0,
        y: 0,
        rotate: 0,
        scale: 1,
        opacity: 1,
        ease: "power3.out",
        stagger: { each: 0.01, from: "random" },
        scrollTrigger: {
          trigger: el,
          start: "top top",
          end: "+=120%",
          scrub: 0.6,
          pin: true,
        },
      });
    }, el);

    return () => {
      ctx.revert();
      split.revert();
    };
  }, []);

  return (
    <section ref={ref} className="section">
      <div className="text-center max-w-5xl px-6">
        <p className="eyebrow mb-8">Explosion → Reform</p>
        <h2
          data-explode
          className="text-3xl sm:text-5xl md:text-8xl font-semibold tracking-tight leading-[1.05]"
        >
          {phrase}
        </h2>
      </div>
    </section>
  );
}
