"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/**
 * ScrollAnimations
 * ----------------
 * Single place to author all scroll-triggered animations.
 *
 * What it does:
 *  1. Registers ScrollTrigger.
 *  2. Writes a global 0..1 `--scroll-progress` CSS var that the
 *     Three.js stage reads (see StageModel.tsx).
 *  3. Provides per-section animations using the
 *     `data-anim` / `data-anim-from` / `data-anim-to` API below.
 *
 * Authoring API (just add attributes to any element):
 *   <h2 data-anim="fade-up">...</h2>
 *   <div data-anim="parallax" data-speed="0.4">...</div>
 *   <section data-anim="pin" data-pin-duration="1.5">...</section>
 *
 * Add new animation kinds in the `presets` map below.
 */
export default function ScrollAnimations() {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // ---------- Global scroll progress (0..1) ----------
      ScrollTrigger.create({
        trigger: document.body,
        start: "top top",
        end: "bottom bottom",
        onUpdate: (self) => {
          document.documentElement.style.setProperty(
            "--scroll-progress",
            self.progress.toFixed(4)
          );
        },
      });

      // ---------- Preset animations ----------
      const presets: Record<string, (el: HTMLElement) => void> = {
        "fade-up": (el) => {
          gsap.from(el, {
            y: 60,
            opacity: 0,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: el,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          });
        },

        "fade-in": (el) => {
          gsap.from(el, {
            opacity: 0,
            duration: 1.2,
            ease: "power2.out",
            scrollTrigger: {
              trigger: el,
              start: "top 90%",
              toggleActions: "play none none reverse",
            },
          });
        },

        parallax: (el) => {
          const speed = parseFloat(el.dataset.speed ?? "0.3");
          gsap.to(el, {
            yPercent: -speed * 100,
            ease: "none",
            scrollTrigger: {
              trigger: el,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          });
        },

        scale: (el) => {
          gsap.from(el, {
            scale: 0.7,
            opacity: 0,
            duration: 1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: el,
              start: "top 80%",
              toggleActions: "play none none reverse",
            },
          });
        },

        pin: (el) => {
          const dur = parseFloat(el.dataset.pinDuration ?? "1");
          ScrollTrigger.create({
            trigger: el,
            start: "top top",
            end: `+=${window.innerHeight * dur}`,
            pin: true,
            pinSpacing: true,
          });
        },

        stagger: (el) => {
          const items = el.querySelectorAll<HTMLElement>("[data-stagger-item]");
          gsap.from(items, {
            y: 40,
            opacity: 0,
            duration: 0.8,
            ease: "power2.out",
            stagger: 0.12,
            scrollTrigger: {
              trigger: el,
              start: "top 80%",
              toggleActions: "play none none reverse",
            },
          });
        },
      };

      document
        .querySelectorAll<HTMLElement>("[data-anim]")
        .forEach((el) => {
          const kind = el.dataset.anim ?? "";
          const fn = presets[kind];
          if (fn) fn(el);
        });

      // ---------- Section-specific timeline example ----------
      // Pinned hero headline that fades & shrinks while scrolling.
      const hero = document.querySelector<HTMLElement>("#hero-headline");
      if (hero) {
        gsap.to(hero, {
          scale: 0.85,
          opacity: 0.2,
          ease: "none",
          scrollTrigger: {
            trigger: "#hero",
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        });
      }
    });

    return () => ctx.revert();
  }, []);

  return null;
}
