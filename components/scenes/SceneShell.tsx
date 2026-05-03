"use client";

import { usePageScrollProgress } from "@/lib/useScrollProgress";
import Link from "next/link";
import { ReactNode } from "react";

/**
 * SceneShell
 * ----------
 * Wraps every scroll-driven Three.js scene page.
 *  - Mounts the page scroll-progress hook (--scroll-progress).
 *  - Renders the fixed full-screen canvas layer (children = Canvas).
 *  - Puts the DOM content above it.
 *  - Adds a small top-left nav back to the scenes index.
 */
export default function SceneShell({
  canvas,
  children,
  title,
}: {
  canvas: ReactNode;
  children: ReactNode;
  title: string;
}) {
  usePageScrollProgress();

  return (
    <main className="relative">
      <div className="three-stage">{canvas}</div>

      <nav className="fixed top-6 left-6 z-50 flex items-center gap-3 rounded-full border border-white/15 bg-black/50 backdrop-blur px-5 py-2 text-sm">
        <Link href="/scenes" className="text-ink/70 hover:text-ink">
          ← Scenes
        </Link>
        <span className="text-ink/30">/</span>
        <span className="text-ink">{title}</span>
      </nav>

      <div className="content-layer">{children}</div>
    </main>
  );
}
