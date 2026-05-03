"use client";

import Link from "next/link";
import { useState } from "react";
import BlobCursor from "@/components/lab/cursors/BlobCursor";
import TrailCursor from "@/components/lab/cursors/TrailCursor";
import HaloCursor from "@/components/lab/cursors/HaloCursor";

const options = [
  { id: "blob", name: "Blob", desc: "Large lagging blob. Grows over [data-cursor=\"grow\"]." },
  { id: "trail", name: "Trail", desc: "Chain of shrinking dots following the cursor." },
  { id: "halo", name: "Halo", desc: "Fast dot + lagged ring. Ring boxes on [data-cursor=\"box\"]." },
];

export default function CursorsPage() {
  const [active, setActive] = useState<string | null>("blob");

  return (
    <main className="min-h-screen px-4 sm:px-6 md:px-12 py-16 sm:py-20 max-w-5xl mx-auto">
      <Link href="/lab" className="text-sm text-ink/60 hover:text-ink">
        ← Lab
      </Link>
      <h1 className="headline mt-6 mb-6">Cursors.</h1>
      <p className="text-ink/70 max-w-2xl mb-10">
        Pick one below. Hover the hot-targets to see state changes. Hide
        the native cursor in production via <code className="text-accent">body {"{ cursor: none }"}</code>.
      </p>

      <div className="flex flex-wrap gap-3 mb-12">
        {options.map((o) => (
          <button
            key={o.id}
            onClick={() => setActive(active === o.id ? null : o.id)}
            className={`rounded-full px-5 py-2 text-sm border transition ${
              active === o.id
                ? "bg-accent border-accent"
                : "border-white/15 hover:bg-white/5"
            }`}
          >
            {o.name}
          </button>
        ))}
      </div>

      <section className="rounded-2xl sm:rounded-3xl border border-white/10 bg-white/5 p-5 sm:p-10 min-h-[300px] sm:min-h-[400px] flex flex-col gap-6 sm:gap-8">
        <p className="text-ink/60 text-sm">
          {options.find((o) => o.id === active)?.desc ?? "Pick a cursor above."}
        </p>
        <div className="flex flex-wrap gap-6 items-center">
          <button
            data-cursor="grow"
            className="rounded-full bg-white/10 px-6 py-3 hover:bg-white/15"
          >
            Hoverable (grow)
          </button>
          <a
            data-cursor="box"
            className="rounded-lg border border-white/20 px-6 py-3 hover:bg-white/5"
            href="#"
          >
            Hoverable (box)
          </a>
          <span className="text-ink/50 text-sm">Move around freely.</span>
        </div>
        <div className="mt-auto text-3xl md:text-5xl font-semibold tracking-tight">
          Move your mouse.
        </div>
      </section>

      {active === "blob" && <BlobCursor />}
      {active === "trail" && <TrailCursor />}
      {active === "halo" && <HaloCursor />}
    </main>
  );
}
