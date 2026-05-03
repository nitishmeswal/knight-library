import Link from "next/link";

const scenes = [
  {
    slug: "explode",
    name: "Explode & Reform",
    kind: "Instanced Cube",
    desc: "216 fragments scatter and reassemble into a single cube as you scroll.",
    accent: "#7c5cff",
  },
  {
    slug: "wireframe",
    name: "Wireframe → Solid",
    kind: "Materialization",
    desc: "A blueprint torus knot transitions into a glossy polished solid.",
    accent: "#c9b8ff",
  },
  {
    slug: "liquid",
    name: "Liquid Metal",
    kind: "Displacement",
    desc: "A metallic blob distorted by live noise; scroll cranks amplitude & heat.",
    accent: "#ff5c8a",
  },
  {
    slug: "galaxy",
    name: "Galaxy Spiral",
    kind: "Particles",
    desc: "18,000 additive particles whose spiral tightens with scroll.",
    accent: "#ff7c5c",
  },
  {
    slug: "dna",
    name: "DNA Helix",
    kind: "Instanced Helix",
    desc: "A double-helix that unravels and drops its bonds as you scroll.",
    accent: "#5cffd1",
  },
  {
    slug: "tunnel",
    name: "Tunnel Flythrough",
    kind: "Camera on Curve",
    desc: "Camera flies along a curved 3D tube, driven entirely by scroll.",
    accent: "#7c5cff",
  },
  {
    slug: "crystal",
    name: "Crystal Growth",
    kind: "Staggered Spawn",
    desc: "Translucent icosahedra emerge from a core with delayed hue shifts.",
    accent: "#b8c9ff",
  },
  {
    slug: "orbit",
    name: "Planet Orbit",
    kind: "Orbital Camera",
    desc: "The camera circumnavigates a ringed planet per scroll position.",
    accent: "#4a5cff",
  },
  {
    slug: "text3d",
    name: "3D Text Assemble",
    kind: "Pixel-sampled",
    desc: "A word rasterized into cubes that fly in and compose the glyph.",
    accent: "#ffffff",
  },
  {
    slug: "holo-grid",
    name: "Holographic Grid",
    kind: "Vertex Wave",
    desc: "A wire plane grid that ripples, amplified by scroll progress.",
    accent: "#7c5cff",
  },
  {
    slug: "ribbon",
    name: "Ribbon Flow",
    kind: "Live Tube",
    desc: "Five silk ribbons flowing along helical paths that twist with scroll.",
    accent: "#5cffd1",
  },
  {
    slug: "blackhole",
    name: "Black Hole",
    kind: "Accretion",
    desc: "An accretion disk and particles spiraling into a dark sphere.",
    accent: "#ff9c5c",
  },
  {
    slug: "fractal-tree",
    name: "Fractal Tree",
    kind: "Recursive",
    desc: "Generations of branches grow outward as scroll passes thresholds.",
    accent: "#7cffa8",
  },
  {
    slug: "shattered",
    name: "Shattered Glass",
    kind: "Fracture",
    desc: "320 glass shards explode toward the camera with individual spin.",
    accent: "#c9e0ff",
  },
  {
    slug: "infinity",
    name: "Infinity Mirror",
    kind: "Receding Rings",
    desc: "Forty rings recede into fog; new rings spawn — a true endless tunnel.",
    accent: "#b8c9ff",
  },
  {
    slug: "morph-type",
    name: "Morphing Typography",
    kind: "Pixel Morph",
    desc: "A pool of cubes flowing through CREATE → EVOLVE → SHIP.",
    accent: "#ffffff",
  },
  {
    slug: "ocean",
    name: "Ocean Surface",
    kind: "Vertex Waves",
    desc: "A sunset sea with live waves; camera skims then climbs.",
    accent: "#1a3a6e",
  },
  {
    slug: "domino",
    name: "Domino Cascade",
    kind: "Sequential Fall",
    desc: "60 dominoes fall in a wavefront as the camera trails along.",
    accent: "#7c5cff",
  },
  {
    slug: "neon-city",
    name: "Neon City",
    kind: "Synthwave Flyover",
    desc: "Flight over an infinite grid of neon buildings with shifting hues.",
    accent: "#ff2e87",
  },
  {
    slug: "magnetic",
    name: "Magnetic Field",
    kind: "Dipole Orient",
    desc: "1,400 iron filings align to a rotating magnetic dipole.",
    accent: "#3c8aff",
  },
];

export default function ScenesIndexPage() {
  return (
    <main className="min-h-screen px-6 md:px-12 py-24 max-w-6xl mx-auto">
      <header className="mb-16">
        <p className="eyebrow mb-3">Twenty premium scenes</p>
        <h1 className="headline mb-4">Scroll-driven Three.js.</h1>
        <p className="text-ink/70 text-lg max-w-2xl">
          Each scene is a full-page experience: a persistent Three.js canvas
          behind stacked chapters, every 3D transformation wired to scroll
          progress. Pick one and make it yours.
        </p>
        <div className="mt-6 flex gap-3 text-sm">
          <Link
            href="/"
            className="rounded-full border border-white/15 px-4 py-2 hover:bg-white/5"
          >
            ← Home
          </Link>
          <Link
            href="/templates"
            className="rounded-full border border-white/15 px-4 py-2 hover:bg-white/5"
          >
            Section templates →
          </Link>
        </div>
      </header>

      <div className="grid md:grid-cols-2 gap-5">
        {scenes.map((s, i) => (
          <Link
            key={s.slug}
            href={`/scenes/${s.slug}`}
            className="group relative rounded-3xl border border-white/10 bg-white/5 p-8 overflow-hidden hover:border-accent/40 transition"
          >
            <div
              className="absolute -top-20 -right-20 w-64 h-64 rounded-full blur-3xl opacity-40 group-hover:opacity-70 transition"
              style={{ background: s.accent }}
            />
            <div className="relative">
              <div className="flex items-center justify-between mb-6">
                <span className="text-xs tracking-[0.25em] uppercase text-ink/50">
                  Scene {String(i + 1).padStart(2, "0")}
                </span>
                <span className="text-xs rounded-full border border-white/15 px-3 py-1 text-ink/70">
                  {s.kind}
                </span>
              </div>
              <h3 className="text-3xl font-semibold tracking-tight mb-2">
                {s.name}
              </h3>
              <p className="text-ink/70">{s.desc}</p>
              <p className="mt-6 text-accent text-sm group-hover:translate-x-1 transition">
                Enter scene →
              </p>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}
