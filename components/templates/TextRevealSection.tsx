"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { splitText } from "@/lib/splitText";

/**
 * TextRevealSection
 * -----------------
 * Long paragraph reveals word-by-word as the user scrolls through it,
 * going from dim to bright. The "apple.com style" narrative block.
 */
export default function TextRevealSection({
  paragraph = "We build tools that move. Motion is not decoration — it is the clearest way to show intent, to guide attention, and to tell the user what just happened and what could happen next.",
}: {
  paragraph?: string;
}) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    gsap.registerPlugin(ScrollTrigger);
    const el = ref.current;
    const target = el.querySelector<HTMLElement>("[data-reveal]");
    if (!target) return;

    const split = splitText(target, "words");

    const ctx = gsap.context(() => {
      gsap.fromTo(
        split.words,
        { opacity: 0.15 },
        {
          opacity: 1,
          ease: "none",
          stagger: 0.05,
          scrollTrigger: {
            trigger: el,
            start: "top 70%",
            end: "bottom 40%",
            scrub: true,
          },
        }
      );
    }, el);

    return () => {
      ctx.revert();
      split.revert();
    };
  }, []);

  return (
    <section ref={ref} className="section">
      <p
        data-reveal
        className="max-w-4xl text-3xl md:text-5xl font-semibold leading-snug tracking-tight"
      >
        {paragraph}
      </p>
    </section>
  );
}
