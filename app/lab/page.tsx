import Link from "next/link";

const categories = [
  {
    slug: "backgrounds",
    name: "Backgrounds",
    count: 4,
    desc: "Drop-in animated backgrounds: aurora, grid pulse, film noise, and spotlight follow.",
    accent: "#7c5cff",
  },
  {
    slug: "cursors",
    name: "Cursors",
    count: 3,
    desc: "Custom cursor components — blob, dot-trail, halo + dot. GSAP quickTo powered.",
    accent: "#5cffd1",
  },
  {
    slug: "3d-bits",
    name: "3D Bits",
    count: 3,
    desc: "Small 3D primitives you can inline: tilt card, floating 3D icon, magnetic button.",
    accent: "#ff7c5c",
  },
  {
    slug: "component-to-3d",
    name: "Component → 3D",
    count: 2,
    desc: "Lift any React component into 3D space or flip it on two faces. Fully interactive.",
    accent: "#ff5c8a",
  },
];

export default function LabIndexPage() {
  return (
    <main className="min-h-screen px-4 sm:px-6 md:px-12 py-16 sm:py-24 max-w-6xl mx-auto">
      <header className="mb-10 sm:mb-16">
        <div className="inline-flex items-center gap-2 mb-4">
          <span className="text-xs tracking-[0.3em] uppercase text-accent">
            Beta
          </span>
          <span className="h-[1px] w-12 bg-accent/50" />
          <span className="text-xs tracking-[0.25em] uppercase text-ink/50">
            Lab
          </span>
        </div>
        <h1 className="headline mb-4">
          Backgrounds, cursors, 3D bits & more.
        </h1>
        <p className="text-ink/70 text-base sm:text-lg max-w-2xl">
          A beta playground for tiny enhancements that make a site feel
          premium. Mix and match — each component is a single file with
          zero setup.
        </p>
        <div className="mt-6 flex flex-wrap gap-2 sm:gap-3 text-xs sm:text-sm">
          <Link
            href="/"
            className="rounded-full border border-white/15 px-3 py-1.5 sm:px-4 sm:py-2 hover:bg-white/5"
          >
            ← Home
          </Link>
          <Link
            href="/scenes"
            className="rounded-full border border-white/15 px-3 py-1.5 sm:px-4 sm:py-2 hover:bg-white/5"
          >
            3D Scenes
          </Link>
          <Link
            href="/templates"
            className="rounded-full border border-white/15 px-3 py-1.5 sm:px-4 sm:py-2 hover:bg-white/5"
          >
            Section templates
          </Link>
        </div>
      </header>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
        {categories.map((c, i) => (
          <Link
            key={c.slug}
            href={`/lab/${c.slug}`}
            className="group relative rounded-2xl sm:rounded-3xl border border-white/10 bg-white/5 p-5 sm:p-8 overflow-hidden hover:border-accent/40 transition"
          >
            <div
              className="absolute -top-16 -right-16 sm:-top-20 sm:-right-20 w-48 sm:w-64 h-48 sm:h-64 rounded-full blur-3xl opacity-40 group-hover:opacity-80 transition"
              style={{ background: c.accent }}
            />
            <div className="relative">
              <div className="flex items-center justify-between mb-4 sm:mb-6">
                <span className="text-[10px] sm:text-xs tracking-[0.25em] uppercase text-ink/50">
                  Category {String(i + 1).padStart(2, "0")}
                </span>
                <span className="text-[10px] sm:text-xs rounded-full border border-white/15 px-2 py-0.5 sm:px-3 sm:py-1 text-ink/70">
                  {c.count} components
                </span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-semibold tracking-tight mb-2">
                {c.name}
              </h3>
              <p className="text-ink/70 text-sm sm:text-base">{c.desc}</p>
              <p className="mt-4 sm:mt-6 text-accent text-sm group-hover:translate-x-1 transition">
                Open →
              </p>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}
