"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/**
 * Reusable hook for scoped GSAP contexts tied to a container ref.
 * All animations inside the callback are automatically cleaned up.
 */
export function useGsapScroll(
  build: (ctx: { el: HTMLElement; gsap: typeof gsap }) => void,
  deps: React.DependencyList = []
) {
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!ref.current) return;
    gsap.registerPlugin(ScrollTrigger);
    const el = ref.current;
    const ctx = gsap.context(() => build({ el, gsap }), el);
    return () => ctx.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  return ref;
}
