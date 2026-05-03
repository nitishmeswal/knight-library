"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { splitText } from "@/lib/splitText";

/**
 * FooterCTASection
 * ----------------
 * A massive last-impression CTA. Giant text wipes up from the bottom with
 * a slight skew. Ends the page with a memorable beat.
 */
export default function FooterCTASection({
  line1 = "Make it",
  line2 = "unforgettable.",
}: {
  line1?: string;
  line2?: string;
}) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    gsap.registerPlugin(ScrollTrigger);
    const el = ref.current;
    const targets = el.querySelectorAll<HTMLElement>("[data-line]");
    const reverts: Array<() => void> = [];

    const ctx = gsap.context(() => {
      targets.forEach((t) => {
        const s = splitText(t, "chars");
        reverts.push(s.revert);
        gsap.set(s.chars, { yPercent: 120, skewY: 8 });
        gsap.to(s.chars, {
          yPercent: 0,
          skewY: 0,
          duration: 1,
          ease: "power4.out",
          stagger: 0.03,
          scrollTrigger: {
            trigger: el,
            start: "top 75%",
            toggleActions: "play none none reverse",
          },
        });
      });
    }, el);

    return () => {
      ctx.revert();
      reverts.forEach((r) => r());
    };
  }, []);

  return (
    <section ref={ref} className="section">
      <div className="text-center overflow-hidden">
        <h2
          data-line
          className="text-7xl md:text-[10rem] font-semibold leading-[0.9] tracking-tight"
        >
          {line1}
        </h2>
        <h2
          data-line
          className="text-7xl md:text-[10rem] font-semibold leading-[0.9] tracking-tight text-accent"
        >
          {line2}
        </h2>
      </div>
    </section>
  );
}
