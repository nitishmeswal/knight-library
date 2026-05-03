"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/**
 * SceneSection
 * ------------
 * Full-height section with fade-up headline + body, used by every scene
 * template to create scroll chapters above the 3D canvas.
 */
export default function SceneSection({
  chapter,
  title,
  body,
  align = "center",
}: {
  chapter: string;
  title: string;
  body?: string;
  align?: "left" | "center" | "right";
}) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    gsap.registerPlugin(ScrollTrigger);
    const el = ref.current;
    const ctx = gsap.context(() => {
      gsap.from(el.querySelectorAll<HTMLElement>("[data-s]"), {
        y: 60,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        stagger: 0.12,
        scrollTrigger: {
          trigger: el,
          start: "top 75%",
          toggleActions: "play none none reverse",
        },
      });
    }, el);
    return () => ctx.revert();
  }, []);

  const alignCls =
    align === "left"
      ? "items-start text-left"
      : align === "right"
      ? "items-end text-right"
      : "items-center text-center";

  return (
    <section
      ref={ref}
      className={`section flex-col ${alignCls}`}
    >
      <div className="max-w-3xl flex flex-col gap-6" style={{ alignItems: align === "center" ? "center" : "flex-start" }}>
        <p data-s className="eyebrow">
          {chapter}
        </p>
        <h2 data-s className="headline">
          {title}
        </h2>
        {body && (
          <p data-s className="text-lg md:text-xl text-ink/70 max-w-2xl">
            {body}
          </p>
        )}
      </div>
    </section>
  );
}
