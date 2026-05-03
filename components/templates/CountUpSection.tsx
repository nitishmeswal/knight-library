"use client";

import { useGsapScroll } from "@/lib/useGsapScroll";

/**
 * CountUpSection
 * --------------
 * Animated number counters that tick up when the section is in view.
 * Use for stats, KPIs, "by the numbers" credibility blocks.
 */
export default function CountUpSection({
  stats = [
    { label: "Frames per second", value: 60, suffix: "" },
    { label: "Load time", value: 92, suffix: "ms" },
    { label: "User delight", value: 100, suffix: "%" },
  ],
}: {
  stats?: { label: string; value: number; suffix?: string }[];
}) {
  const ref = useGsapScroll(({ el, gsap }) => {
    el.querySelectorAll<HTMLElement>("[data-count]").forEach((node) => {
      const target = parseFloat(node.dataset.count ?? "0");
      const obj = { n: 0 };
      gsap.to(obj, {
        n: target,
        duration: 2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: node,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
        onUpdate: () => {
          node.textContent = Math.round(obj.n).toString();
        },
      });
    });
  });

  return (
    <section
      ref={ref as React.RefObject<HTMLElement>}
      className="section"
    >
      <div className="w-full max-w-5xl">
        <p className="eyebrow mb-3" data-anim="fade-up">
          By the numbers
        </p>
        <h2 className="headline mb-16" data-anim="fade-up">
          Results in motion.
        </h2>
        <div className="grid md:grid-cols-3 gap-10">
          {stats.map((s) => (
            <div key={s.label} className="border-t border-white/15 pt-6">
              <div className="text-6xl md:text-7xl font-semibold tracking-tight">
                <span data-count={s.value}>0</span>
                <span className="text-accent">{s.suffix}</span>
              </div>
              <p className="mt-3 text-ink/70">{s.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
