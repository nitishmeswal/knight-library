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
  {
    slug: "explode-reassemble",
    name: "Explode & Reassemble",
    kind: "Particle Reform",
    desc: "300 fragments scatter with glow cracks and magnetically reassemble on scroll.",
    accent: "#ff6030",
  },
  {
    slug: "liquid-metal-morph",
    name: "Liquid Metal Morph",
    kind: "Noise Shader",
    desc: "A chrome blob morphs between organic shapes using procedural noise displacement.",
    accent: "#ff44aa",
  },
  {
    slug: "neon-tunnel",
    name: "Neon Tunnel",
    kind: "Infinite Depth",
    desc: "80 neon rings race past at scroll-controlled speed through infinite tunnel.",
    accent: "#00ccff",
  },
  {
    slug: "floating-ui",
    name: "Floating UI Universe",
    kind: "Glass Cards",
    desc: "60 translucent cards float in zero gravity — scroll zooms through the cosmos.",
    accent: "#7c5cff",
  },
  {
    slug: "time-freeze",
    name: "Time Freeze Explosion",
    kind: "Bullet Time",
    desc: "400 shards frozen mid-explosion — scroll orbits the cinematic debris field.",
    accent: "#ff6830",
  },
  {
    slug: "particle-text",
    name: "Particle Text Reveal",
    kind: "5K Particles",
    desc: "5,000 particles converge to form text, then scatter back into chaos.",
    accent: "#cc88ff",
  },
  {
    slug: "cyberpunk-fly",
    name: "Cyberpunk Flythrough",
    kind: "Synthwave City",
    desc: "400 neon buildings, rain shader, and scroll-controlled flight through Night City.",
    accent: "#ff1a75",
  },
  {
    slug: "wireframe-to-real",
    name: "Wireframe → Realistic",
    kind: "Material Morph",
    desc: "An icosahedron transitions from wireframe blueprint to glossy polished solid.",
    accent: "#c9b8ff",
  },
  {
    slug: "gravity-shift",
    name: "Gravity Shift",
    kind: "Physics Vector",
    desc: "80 objects respond to a rotating gravity vector — pure physics chaos.",
    accent: "#5cff88",
  },
  {
    slug: "data-stream",
    name: "Digital DNA Stream",
    kind: "Double Helix",
    desc: "Two glowing strands twist while 800 data pulses race along the helix.",
    accent: "#00ccff",
  },
  {
    slug: "product-exploded",
    name: "Product Exploded View",
    kind: "Assembly",
    desc: "12 components separate on scroll — classic exploded diagram for portfolios.",
    accent: "#5588cc",
  },
  {
    slug: "cursor-distort",
    name: "Cursor Distortion Field",
    kind: "Ripple Mesh",
    desc: "A metallic plane ripples at cursor position — scroll intensifies distortion.",
    accent: "#7c5cff",
  },
  {
    slug: "planet-creation",
    name: "Planet Creation",
    kind: "Accretion",
    desc: "3,000 dust particles collapse into a planet with atmosphere and glow.",
    accent: "#ffd48a",
  },
  {
    slug: "glass-morph",
    name: "Glass Morphing UI",
    kind: "Refraction",
    desc: "8 transparent glass panels orbit and morph with premium refraction effects.",
    accent: "#c9e0ff",
  },
  {
    slug: "infinite-grid",
    name: "Infinite Grid Landscape",
    kind: "Vertex Wave",
    desc: "A wireframe terrain undulates with increasing amplitude — fabric of spacetime.",
    accent: "#7c5cff",
  },
  {
    slug: "ai-brain",
    name: "AI Brain Visualization",
    kind: "Neural Network",
    desc: "200 nodes and 400 connections pulse with signals — scroll grows intelligence.",
    accent: "#4488ff",
  },
  {
    slug: "portal",
    name: "Portal Transition",
    kind: "Warp Shader",
    desc: "6 concentric rings collapse as scroll warps you through a dimensional portal.",
    accent: "#7c5cff",
  },
  {
    slug: "abstract-sculpture",
    name: "Abstract Sculpture Builder",
    kind: "Staggered Build",
    desc: "50 metallic pieces fly in to build a futuristic spiraling sculpture.",
    accent: "#cc8844",
  },
  {
    slug: "noise-terrain",
    name: "Noise Terrain Evolution",
    kind: "Perlin Noise",
    desc: "Flat terrain erupts into mountains driven by layered noise with wireframe.",
    accent: "#c9b8ff",
  },
  {
    slug: "physics-playground",
    name: "Physics Playground",
    kind: "Force Input",
    desc: "60 balls bounce and scatter — scroll translates directly into physics force.",
    accent: "#ff8844",
  },
  {
    slug: "magnetic-cursor",
    name: "Magnetic Cursor Mesh",
    kind: "Vertex Shader",
    desc: "Object vertices attract toward cursor — distance-based deformation like soft metal.",
    accent: "#8866ff",
  },
  {
    slug: "living-blob",
    name: "Living Blob",
    kind: "Breathing Geo",
    desc: "An organic sphere breathes and pulses — scroll increases stress and chaos.",
    accent: "#44cc88",
  },
  {
    slug: "skull-disintegrate",
    name: "Skull Disintegration",
    kind: "Reform",
    desc: "4,000 particles hold a skull shape — scroll disintegrates and reforms it.",
    accent: "#4488ff",
  },
  {
    slug: "hand-force",
    name: "Hand Force Interaction",
    kind: "Push Physics",
    desc: "Cursor acts as an invisible hand — objects scatter and drift back home.",
    accent: "#55cc88",
  },
  {
    slug: "liquid-glass",
    name: "Liquid Glass Object",
    kind: "Refraction",
    desc: "A glass sphere with high IOR — cursor bends light through the volume.",
    accent: "#e0eeff",
  },
  {
    slug: "neural-pulse",
    name: "Neural Brain Pulse",
    kind: "Signal Flow",
    desc: "300 brain nodes grow and pulse — connections light up as intelligence builds.",
    accent: "#3388ff",
  },
  {
    slug: "morph-identity",
    name: "Morphing Identity",
    kind: "Shape Lerp",
    desc: "3,000 points interpolate between sphere, cube, and torus geometries.",
    accent: "#cc88ff",
  },
  {
    slug: "rope-physics",
    name: "Rope Physics",
    kind: "Tendrils",
    desc: "8 elastic strands follow cursor with secondary motion — lag and elasticity.",
    accent: "#ff5588",
  },
  {
    slug: "soft-body",
    name: "Soft Body Cube",
    kind: "Jelly Physics",
    desc: "A spring-loaded cube jiggles on interaction — cursor creates waves.",
    accent: "#44aaff",
  },
  {
    slug: "shatter-reverse",
    name: "Shattering Glass",
    kind: "Reverse Time",
    desc: "250 glass shards shatter then perfectly reassemble as scroll reverses.",
    accent: "#c9e0ff",
  },
  {
    slug: "surface-ripple",
    name: "Surface Ripple Mesh",
    kind: "Cursor Waves",
    desc: "A metallic plane reacts to cursor like water — waves propagate outward.",
    accent: "#2244aa",
  },
  {
    slug: "particle-skin",
    name: "Particle Skin Object",
    kind: "Shell Break",
    desc: "5,000 particles form a sphere surface that breaks and reforms with noise.",
    accent: "#5588ff",
  },
  {
    slug: "mechanical-eye",
    name: "Mechanical Eye",
    kind: "Tracking",
    desc: "A detailed eye tracks your cursor — scroll zooms into the iris.",
    accent: "#4488cc",
  },
  {
    slug: "magnetized-parts",
    name: "Magnetized Parts",
    kind: "Orbit Pull",
    desc: "40 pieces orbit a core — cursor magnetically pulls parts from orbit.",
    accent: "#7c5cff",
  },
  {
    slug: "heat-distort",
    name: "Heat Distortion",
    kind: "Displacement",
    desc: "A metallic object melts as you scroll — displacement shader creates lava.",
    accent: "#ff4400",
  },
  {
    slug: "fractured-reality",
    name: "Fractured Reality",
    kind: "Glitch Slices",
    desc: "20 horizontal slices offset to create a glitch illusion that grows with scroll.",
    accent: "#8866ff",
  },
  {
    slug: "bone-rig",
    name: "Bone Rigged Mesh",
    kind: "Pose Animation",
    desc: "12 capsule segments form a limb that curls and articulates with scroll.",
    accent: "#cc8866",
  },
  {
    slug: "energy-core",
    name: "Energy Core Sphere",
    kind: "Shell Breach",
    desc: "16 shell plates crack open to reveal a blazing rotating energy core.",
    accent: "#ffaa00",
  },
  {
    slug: "cloth-sim",
    name: "Cloth Simulation",
    kind: "Wind Physics",
    desc: "Fabric reacts to wind and cursor — scroll increases turbulence intensity.",
    accent: "#cc4488",
  },
  {
    slug: "digital-corrupt",
    name: "Digital Corruption",
    kind: "Voxelize",
    desc: "A smooth sphere glitches into voxels and rebuilds into mesh on scroll.",
    accent: "#44ccaa",
  },
];

export default function ScenesIndexPage() {
  return (
    <main className="min-h-screen px-4 sm:px-6 md:px-12 py-16 sm:py-24 max-w-6xl mx-auto">
      <header className="mb-10 sm:mb-16">
        <p className="eyebrow mb-3">Sixty premium scenes</p>
        <h1 className="headline mb-4">Scroll-driven Three.js.</h1>
        <p className="text-ink/70 text-base sm:text-lg max-w-2xl">
          Each scene is a full-page experience: a persistent Three.js canvas
          behind stacked chapters, every 3D transformation wired to scroll
          progress. Pick one and make it yours.
        </p>
        <div className="mt-6 flex flex-wrap gap-2 sm:gap-3 text-xs sm:text-sm">
          <Link
            href="/"
            className="rounded-full border border-white/15 px-3 py-1.5 sm:px-4 sm:py-2 hover:bg-white/5"
          >
            ← Home
          </Link>
          <Link
            href="/templates"
            className="rounded-full border border-white/15 px-3 py-1.5 sm:px-4 sm:py-2 hover:bg-white/5"
          >
            Section templates →
          </Link>
        </div>
      </header>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
        {scenes.map((s, i) => (
          <Link
            key={s.slug}
            href={`/scenes/${s.slug}`}
            className="group relative rounded-2xl sm:rounded-3xl border border-white/10 bg-white/5 p-5 sm:p-8 overflow-hidden hover:border-accent/40 transition"
          >
            <div
              className="absolute -top-16 -right-16 sm:-top-20 sm:-right-20 w-48 sm:w-64 h-48 sm:h-64 rounded-full blur-3xl opacity-40 group-hover:opacity-70 transition"
              style={{ background: s.accent }}
            />
            <div className="relative">
              <div className="flex items-center justify-between mb-4 sm:mb-6">
                <span className="text-[10px] sm:text-xs tracking-[0.25em] uppercase text-ink/50">
                  Scene {String(i + 1).padStart(2, "0")}
                </span>
                <span className="text-[10px] sm:text-xs rounded-full border border-white/15 px-2 py-0.5 sm:px-3 sm:py-1 text-ink/70">
                  {s.kind}
                </span>
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-semibold tracking-tight mb-2">
                {s.name}
              </h3>
              <p className="text-ink/70 text-sm sm:text-base">{s.desc}</p>
              <p className="mt-4 sm:mt-6 text-accent text-sm group-hover:translate-x-1 transition">
                Enter scene →
              </p>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}
