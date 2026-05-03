"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/**
 * ScrambleHeadingSection
 * ----------------------
 * Text scrambles through random glyphs and locks into the final phrase.
 * Zero plugins required (no ScrambleTextPlugin needed).
 */
export default function ScrambleHeadingSection({
  eyebrow = "Decoding",
  phrase = "Animation is communication.",
}: {
  eyebrow?: string;
  phrase?: string;
}) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    gsap.registerPlugin(ScrollTrigger);
    const el = ref.current;
    const target = el.querySelector<HTMLElement>("[data-scramble]");
    if (!target) return;

    const final = phrase;
    const pool = "!<>-_\\/[]{}—=+*^?#ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    const obj = { p: 0 };
    let frame = 0;

    const render = () => {
      const progress = obj.p;
      const out = final
        .split("")
        .map((ch, i) => {
          if (ch === " ") return " ";
          const revealAt = i / final.length;
          if (progress >= revealAt) return ch;
          return pool[(frame + i) % pool.length];
        })
        .join("");
      target.textContent = out;
      frame++;
    };

    const ticker = gsap.ticker.add(render);

    const tween = gsap.to(obj, {
      p: 1,
      duration: 1.8,
      ease: "power2.out",
      scrollTrigger: {
        trigger: el,
        start: "top 70%",
        toggleActions: "play none none reverse",
      },
      onComplete: () => {
        target.textContent = final;
      },
    });

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
      gsap.ticker.remove(ticker);
    };
  }, [phrase]);

  return (
    <section ref={ref} className="section">
      <div className="text-center max-w-5xl">
        <p className="eyebrow mb-6">{eyebrow}</p>
        <h2
          data-scramble
          className="text-2xl sm:text-4xl md:text-7xl font-semibold tracking-tight font-mono"
        >
          {phrase}
        </h2>
      </div>
    </section>
  );
}
