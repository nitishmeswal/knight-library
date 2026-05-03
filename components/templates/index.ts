/**
 * Template Registry
 * -----------------
 * All scroll + 3D section templates, centrally exported. Import what you
 * need in any page:
 *
 *   import { HookSection, ExplosionSection } from "@/components/templates";
 */

export { default as PopupSection } from "./PopupSection";
export { default as ProductRevealSection } from "./ProductRevealSection";
export { default as ForeshadowSection } from "./ForeshadowSection";
export { default as HookSection } from "./HookSection";
export { default as ExplosionSection } from "./ExplosionSection";
export { default as HorizontalScrollSection } from "./HorizontalScrollSection";
export { default as MarqueeSection } from "./MarqueeSection";
export { default as TextRevealSection } from "./TextRevealSection";
export { default as MagneticCTASection } from "./MagneticCTASection";
export { default as ImageParallaxSection } from "./ImageParallaxSection";
export { default as CountUpSection } from "./CountUpSection";
export { default as MaskRevealSection } from "./MaskRevealSection";
export { default as StickyCardsSection } from "./StickyCardsSection";
export { default as ScrambleHeadingSection } from "./ScrambleHeadingSection";
export { default as TestimonialCarouselSection } from "./TestimonialCarouselSection";
export { default as ParticleExplosionSection } from "./ParticleExplosionSection";
export { default as MorphShapeSection } from "./MorphShapeSection";
export { default as FAQAccordionSection } from "./FAQAccordionSection";
export { default as FooterCTASection } from "./FooterCTASection";

/**
 * Metadata for auto-generating the /templates gallery.
 */
export const TEMPLATE_CATALOG = [
  { id: "hook", name: "Hook", kind: "Attention", desc: "Char-by-char reveal to stop the scroll." },
  { id: "popup", name: "Popup", kind: "Attention", desc: "Modal-style card springs in on scroll." },
  { id: "foreshadow", name: "Foreshadow", kind: "Narrative", desc: "Blurred teaser sharpens while scrolling." },
  { id: "product-reveal", name: "Product Reveal", kind: "Narrative", desc: "Curtain wipe exposes a product block." },
  { id: "mask-reveal", name: "Mask Reveal", kind: "Narrative", desc: "Clip-path curtain slides across content." },
  { id: "explosion", name: "Explosion → Reform", kind: "Motion", desc: "Scattered chars fly back together." },
  { id: "particle-explosion", name: "Particle Explosion (3D)", kind: "3D", desc: "4k particles collapse into a sphere." },
  { id: "morph", name: "Morph Shape (3D)", kind: "3D", desc: "Sphere ⟷ cube vertex morph." },
  { id: "horizontal-scroll", name: "Horizontal Scroll", kind: "Layout", desc: "Pinned vertical-to-horizontal track." },
  { id: "sticky-cards", name: "Sticky Cards", kind: "Layout", desc: "Stacked cards for process steps." },
  { id: "parallax", name: "Image Parallax", kind: "Layout", desc: "Tile grid with per-item parallax." },
  { id: "text-reveal", name: "Text Reveal", kind: "Typography", desc: "Word-by-word dim → bright on scroll." },
  { id: "scramble", name: "Scramble Heading", kind: "Typography", desc: "Random glyphs decode into final phrase." },
  { id: "marquee", name: "Velocity Marquee", kind: "Typography", desc: "Infinite loop reacting to scroll speed." },
  { id: "count-up", name: "Count Up", kind: "Data", desc: "Animated number counters for stats." },
  { id: "testimonials", name: "Testimonials", kind: "Social", desc: "Auto-cycling quote carousel." },
  { id: "faq", name: "FAQ Accordion", kind: "Info", desc: "Smooth height-animated accordion." },
  { id: "magnetic-cta", name: "Magnetic CTA", kind: "Interaction", desc: "Button pulled toward the cursor." },
  { id: "footer-cta", name: "Footer CTA", kind: "Closer", desc: "Huge skewed text wipe for final impression." },
];
