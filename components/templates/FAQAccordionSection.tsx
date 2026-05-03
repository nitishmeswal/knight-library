"use client";

import { useRef, useState } from "react";
import gsap from "gsap";

/**
 * FAQAccordionSection
 * -------------------
 * Smooth height-animated FAQ using GSAP for the open/close transition.
 */
export default function FAQAccordionSection({
  items = [
    {
      q: "Do I need the paid GSAP plugins?",
      a: "No. Everything in this template works with the free core + ScrollTrigger.",
    },
    {
      q: "Can I swap the Three.js model?",
      a: "Yes — drop a GLB in /public/models and wire it in StageModel.tsx.",
    },
    {
      q: "Is it production-ready?",
      a: "Yes. Remove OrbitControls in Scene.tsx before shipping.",
    },
  ],
}: {
  items?: { q: string; a: string }[];
}) {
  return (
    <section className="section">
      <div className="w-full max-w-3xl">
        <p className="eyebrow mb-3">FAQ</p>
        <h2 className="headline mb-12">Questions, answered.</h2>
        <div className="divide-y divide-white/10 border-y border-white/10">
          {items.map((it, i) => (
            <FAQItem key={i} q={it.q} a={it.a} />
          ))}
        </div>
      </div>
    </section>
  );
}

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  const body = useRef<HTMLDivElement>(null);

  const toggle = () => {
    const el = body.current;
    if (!el) return;
    if (!open) {
      gsap.fromTo(
        el,
        { height: 0, opacity: 0 },
        {
          height: "auto",
          opacity: 1,
          duration: 0.45,
          ease: "power3.out",
        }
      );
    } else {
      gsap.to(el, {
        height: 0,
        opacity: 0,
        duration: 0.35,
        ease: "power3.in",
      });
    }
    setOpen(!open);
  };

  return (
    <div className="py-5">
      <button
        onClick={toggle}
        className="w-full flex items-center justify-between text-left"
      >
        <span className="text-xl md:text-2xl font-medium">{q}</span>
        <span
          className="text-accent text-3xl transition-transform"
          style={{ transform: open ? "rotate(45deg)" : "rotate(0deg)" }}
        >
          +
        </span>
      </button>
      <div ref={body} style={{ height: 0, overflow: "hidden", opacity: 0 }}>
        <p className="text-ink/70 pt-4 max-w-2xl">{a}</p>
      </div>
    </div>
  );
}
