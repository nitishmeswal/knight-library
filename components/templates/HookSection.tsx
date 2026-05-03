"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { splitText } from "@/lib/splitText";

/**
 * HookSection
 * -----------
 * Big attention-grabbing question/statement with per-character reveal.
 * Designed to stop scroll and force engagement.
 *
 * Use for: opening hooks, rhetorical questions, manifestos.
 */
export default function HookSection({
  kicker = "Stop scrolling.",
  hook = "What if your website felt alive?",
  sub = "Motion is the new typography.",
}: {
  kicker?: string;
  hook?: string;
  sub?: string;
}) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    gsap.registerPlugin(ScrollTrigger);
    const el = ref.current;

    const hookEl = el.querySelector<HTMLElement>("[data-hook]");
    const kickerEl = el.querySelector<HTMLElement>("[data-kicker]");
    const subEl = el.querySelector<HTMLElement>("[data-sub]");

    const splits: Array<() => void> = [];

    const ctx = gsap.context(() => {
      if (hookEl) {
        const s = splitText(hookEl, "chars");
        splits.push(s.revert);
        gsap.set(s.chars, { y: "110%", opacity: 0, rotateX: -90 });

        gsap.to(s.chars, {
          y: "0%",
          opacity: 1,
          rotateX: 0,
          duration: 0.8,
          ease: "power4.out",
          stagger: 0.02,
          scrollTrigger: {
            trigger: el,
            start: "top 70%",
            toggleActions: "play none none reverse",
          },
        });
      }

      if (kickerEl) {
        gsap.from(kickerEl, {
          opacity: 0,
          y: -20,
          duration: 0.6,
          ease: "power2.out",
          scrollTrigger: {
            trigger: el,
            start: "top 75%",
            toggleActions: "play none none reverse",
          },
        });
      }

      if (subEl) {
        gsap.from(subEl, {
          opacity: 0,
          y: 20,
          duration: 0.6,
          delay: 0.4,
          ease: "power2.out",
          scrollTrigger: {
            trigger: el,
            start: "top 70%",
            toggleActions: "play none none reverse",
          },
        });
      }
    }, el);

    return () => {
      ctx.revert();
      splits.forEach((r) => r());
    };
  }, []);

  return (
    <section ref={ref} className="section">
      <div className="text-center max-w-4xl">
        <p data-kicker className="eyebrow mb-6">
          {kicker}
        </p>
        <h2
          data-hook
          className="text-3xl sm:text-5xl md:text-8xl font-semibold tracking-tight leading-[1.05]"
          style={{ perspective: 800 }}
        >
          {hook}
        </h2>
        <p data-sub className="mt-8 text-xl text-ink/70">
          {sub}
        </p>
      </div>
    </section>
  );
}
