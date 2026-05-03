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
    <main className="min-h-screen px-6 md:px-12 py-24 max-w-6xl mx-auto">
      <header className="mb-16">
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
        <p className="text-ink/70 text-lg max-w-2xl">
          A beta playground for tiny enhancements that make a site feel
          premium. Mix and match — each component is a single file with
          zero setup.
        </p>
        <div className="mt-6 flex gap-3 text-sm">
          <Link
            href="/"
            className="rounded-full border border-white/15 px-4 py-2 hover:bg-white/5"
          >
            ← Home
          </Link>
          <Link
            href="/scenes"
            className="rounded-full border border-white/15 px-4 py-2 hover:bg-white/5"
          >
            3D Scenes
          </Link>
          <Link
            href="/templates"
            className="rounded-full border border-white/15 px-4 py-2 hover:bg-white/5"
          >
            Section templates
          </Link>
        </div>
      </header>

      <div className="grid md:grid-cols-2 gap-5">
        {categories.map((c, i) => (
          <Link
            key={c.slug}
            href={`/lab/${c.slug}`}
            className="group relative rounded-3xl border border-white/10 bg-white/5 p-8 overflow-hidden hover:border-accent/40 transition"
          >
            <div
              className="absolute -top-20 -right-20 w-64 h-64 rounded-full blur-3xl opacity-40 group-hover:opacity-80 transition"
              style={{ background: c.accent }}
            />
            <div className="relative">
              <div className="flex items-center justify-between mb-6">
                <span className="text-xs tracking-[0.25em] uppercase text-ink/50">
                  Category {String(i + 1).padStart(2, "0")}
                </span>
                <span className="text-xs rounded-full border border-white/15 px-3 py-1 text-ink/70">
                  {c.count} components
                </span>
              </div>
              <h3 className="text-3xl font-semibold tracking-tight mb-2">
                {c.name}
              </h3>
              <p className="text-ink/70">{c.desc}</p>
              <p className="mt-6 text-accent text-sm group-hover:translate-x-1 transition">
                Open →
              </p>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}
