"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

/**
 * TestimonialCarouselSection
 * --------------------------
 * Auto-cycling testimonials with GSAP crossfade + slight y-shift.
 * No external carousel library.
 */
export default function TestimonialCarouselSection({
  items = [
    { quote: "The scroll felt like a film.", who: "Ada, Designer" },
    { quote: "Our conversion jumped 38%.", who: "Rhea, PM" },
    { quote: "Customers literally screenshot it.", who: "Leo, Founder" },
  ],
  interval = 3500,
}: {
  items?: { quote: string; who: string }[];
  interval?: number;
}) {
  const [i, setI] = useState(0);
  const quoteRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const t = setInterval(() => {
      setI((x) => (x + 1) % items.length);
    }, interval);
    return () => clearInterval(t);
  }, [items.length, interval]);

  useEffect(() => {
    if (!quoteRef.current) return;
    gsap.fromTo(
      quoteRef.current,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.7, ease: "power3.out" }
    );
  }, [i]);

  return (
    <section className="section">
      <div className="max-w-3xl text-center">
        <p className="eyebrow mb-8">Voices</p>
        <div ref={quoteRef} key={i}>
          <p className="text-3xl md:text-5xl font-semibold tracking-tight leading-snug mb-6">
            &ldquo;{items[i].quote}&rdquo;
          </p>
          <p className="text-ink/60">— {items[i].who}</p>
        </div>
        <div className="mt-10 flex justify-center gap-2">
          {items.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setI(idx)}
              className={`h-1.5 rounded-full transition-all ${
                idx === i ? "w-8 bg-accent" : "w-3 bg-white/20"
              }`}
              aria-label={`Go to ${idx + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
