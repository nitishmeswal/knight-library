import ScrollAnimations from "@/components/gsap/ScrollAnimations";
import {
  PopupSection,
  ProductRevealSection,
  ForeshadowSection,
  HookSection,
  ExplosionSection,
  HorizontalScrollSection,
  MarqueeSection,
  TextRevealSection,
  MagneticCTASection,
  ImageParallaxSection,
  CountUpSection,
  MaskRevealSection,
  StickyCardsSection,
  ScrambleHeadingSection,
  TestimonialCarouselSection,
  ParticleExplosionSection,
  MorphShapeSection,
  FAQAccordionSection,
  FooterCTASection,
} from "@/components/templates";

/**
 * /templates
 * ----------
 * A living gallery of every scroll-animation section template. Scroll from
 * top to bottom to preview each one in context.
 */
export default function TemplatesPage() {
  return (
    <main className="relative">
      <ScrollAnimations />

      <nav className="fixed top-6 left-6 z-50 rounded-full border border-white/15 bg-black/50 backdrop-blur px-5 py-2 text-sm">
        <a href="/" className="text-ink/70 hover:text-ink">
          ← Home
        </a>
        <span className="mx-3 text-ink/30">/</span>
        <span className="text-ink">Templates Gallery</span>
      </nav>

      <HookSection />
      <PopupSection />
      <ForeshadowSection />
      <ProductRevealSection />
      <MaskRevealSection />
      <ExplosionSection />
      <ParticleExplosionSection />
      <MorphShapeSection />
      <HorizontalScrollSection />
      <StickyCardsSection />
      <ImageParallaxSection />
      <TextRevealSection />
      <ScrambleHeadingSection />
      <MarqueeSection />
      <CountUpSection />
      <TestimonialCarouselSection />
      <FAQAccordionSection />
      <MagneticCTASection />
      <FooterCTASection />
    </main>
  );
}
