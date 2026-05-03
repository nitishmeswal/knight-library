import Scene from "@/components/three/Scene";
import ScrollAnimations from "@/components/gsap/ScrollAnimations";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Features from "@/components/sections/Features";
import Showcase from "@/components/sections/Showcase";
import Contact from "@/components/sections/Contact";

export default function Page() {
  return (
    <main className="relative">
      {/* Persistent Three.js stage that reacts to scroll */}
      <div className="three-stage">
        <Scene />
      </div>

      {/* All GSAP ScrollTrigger setup is centralized here */}
      <ScrollAnimations />

      <nav className="fixed top-6 right-6 z-50 flex gap-2 text-sm">
        <a
          href="/catalog"
          className="rounded-full border border-white/15 bg-black/50 backdrop-blur px-4 py-2 hover:bg-white/5"
        >
          Catalog
        </a>
        <a
          href="/templates"
          className="rounded-full border border-white/15 bg-black/50 backdrop-blur px-4 py-2 hover:bg-white/5"
        >
          Sections
        </a>
        <a
          href="/scenes"
          className="rounded-full border border-white/15 bg-black/50 backdrop-blur px-4 py-2 hover:bg-white/5"
        >
          3D Scenes
        </a>
        <a
          href="/lab"
          className="rounded-full bg-accent px-4 py-2 font-medium"
        >
          Lab (beta) →
        </a>
      </nav>

      <div className="content-layer">
        <Hero />
        <About />
        <Features />
        <Showcase />
        <Contact />
      </div>
    </main>
  );
}
