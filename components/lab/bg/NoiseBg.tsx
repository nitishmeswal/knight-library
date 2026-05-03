"use client";

import { useEffect, useRef } from "react";

/**
 * NoiseBg
 * -------
 * Animated film-grain generated in canvas2D. Sits behind content at low
 * opacity to add organic texture. 60fps but lightweight thanks to
 * ImageData buffer reuse.
 */
export default function NoiseBg({ opacity = 0.08 }: { opacity?: number }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const c = ref.current;
    if (!c) return;
    const ctx = c.getContext("2d")!;
    const W = 256;
    const H = 256;
    c.width = W;
    c.height = H;
    const img = ctx.createImageData(W, H);
    let raf = 0;

    const draw = () => {
      const d = img.data;
      for (let i = 0; i < d.length; i += 4) {
        const v = (Math.random() * 255) | 0;
        d[i] = v;
        d[i + 1] = v;
        d[i + 2] = v;
        d[i + 3] = 255;
      }
      ctx.putImageData(img, 0, 0);
      raf = requestAnimationFrame(draw);
    };
    draw();
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <div
      className="absolute inset-0 -z-10 bg-[#05050c] pointer-events-none"
      style={{ opacity }}
    >
      <canvas
        ref={ref}
        className="w-full h-full"
        style={{
          imageRendering: "pixelated",
          mixBlendMode: "overlay",
        }}
      />
    </div>
  );
}
