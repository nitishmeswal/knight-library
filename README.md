# GSAP + Three.js Template

A neat Next.js (App Router) starter for **scroll-triggered GSAP animations** layered over a persistent **Three.js / R3F** stage. Built so you can drop in models and decide animations declaratively.

## Stack
- Next.js 14 + TypeScript
- TailwindCSS
- GSAP + ScrollTrigger
- three / @react-three/fiber / @react-three/drei

## Getting started

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Project layout

```
app/
  layout.tsx           Root layout
  page.tsx             Composes Scene + ScrollAnimations + sections
  globals.css          Tailwind + helpers (.section, .three-stage, ...)
components/
  three/
    Scene.tsx          Fixed full-screen R3F canvas
    StageModel.tsx     Your 3D model lives here (placeholder mesh)
  gsap/
    ScrollAnimations.tsx   All scroll animation presets + global progress
  sections/
    Hero.tsx About.tsx Features.tsx Showcase.tsx Contact.tsx
```

## How the two systems talk

`ScrollAnimations.tsx` writes a single CSS variable on `<html>`:

```
--scroll-progress: 0..1   // total page progress
```

`StageModel.tsx` reads it inside `useFrame` and drives rotation, position, scale, etc. This keeps the Three.js scene state simple and 100% scroll-deterministic.

## Authoring animations (DOM)

Add data attributes — no extra wiring needed:

```tsx
<h2 data-anim="fade-up">Hello</h2>
<div data-anim="parallax" data-speed="0.4">...</div>
<section data-anim="pin" data-pin-duration="1.5">...</section>

<div data-anim="stagger">
  <p data-stagger-item>one</p>
  <p data-stagger-item>two</p>
</div>
```

Built-in presets: `fade-up`, `fade-in`, `scale`, `parallax`, `pin`, `stagger`.

Add your own in the `presets` map inside `components/gsap/ScrollAnimations.tsx`.

## Adding a 3D model

1. Drop your `.glb` in `public/models/your-model.glb`.
2. In `components/three/StageModel.tsx`:

```tsx
import { useGLTF } from "@react-three/drei";

export default function StageModel() {
  const { scene } = useGLTF("/models/your-model.glb");
  // animate via --scroll-progress in useFrame as shown in the file
  return <primitive object={scene} />;
}
```

3. Optionally precache: `useGLTF.preload("/models/your-model.glb")`.

## Template library (`components/templates/`)

19 self-contained section templates. Each file is drop-in: import it, pass props, done. See them live at `/templates` or browse metadata at `/catalog`.

**Attention / Hook**
- `HookSection` — char-by-char reveal that stops the scroll.
- `PopupSection` — modal card springs in with a back-ease.

**Narrative / Reveal**
- `ForeshadowSection` — blurred teaser sharpens on scroll.
- `ProductRevealSection` — curtain wipe launches a product block.
- `MaskRevealSection` — clip-path curtain slides across content.

**Motion / 3D**
- `ExplosionSection` — scattered characters fly back together on scrub.
- `ParticleExplosionSection` — 4,000 Three.js particles collapse into a sphere.
- `MorphShapeSection` — vertex morph between sphere and cube.

**Layout**
- `HorizontalScrollSection` — pinned vertical-to-horizontal track.
- `StickyCardsSection` — stacked sticky cards for process steps.
- `ImageParallaxSection` — per-tile parallax grid.

**Typography**
- `TextRevealSection` — word-by-word dim → bright on scrub.
- `ScrambleHeadingSection` — random glyphs decode into the phrase.
- `MarqueeSection` — infinite loop that reacts to scroll velocity.

**Data / Social / Info**
- `CountUpSection` — animated numeric counters.
- `TestimonialCarouselSection` — auto-cycling quote carousel.
- `FAQAccordionSection` — GSAP height-animated accordion.

**Interaction / Closers**
- `MagneticCTASection` — button attracted to the cursor.
- `FooterCTASection` — giant skewed text wipe for the final beat.

### Using a template

```tsx
import { HookSection, ExplosionSection } from "@/components/templates";

export default function Page() {
  return (
    <>
      <HookSection hook="What if your site felt alive?" />
      <ExplosionSection phrase="From chaos to clarity." />
    </>
  );
}
```

Every template accepts props for its copy (no hard-coded strings), and each one imports its own GSAP context — so you can mix and match freely.

## Production tips
- Remove `<OrbitControls />` from `Scene.tsx` (it's dev-only by default).
- Use `scrub: true` ScrollTriggers for buttery scroll-linked motion.
- Prefer one global progress value over many ScrollTriggers driving the canvas.
