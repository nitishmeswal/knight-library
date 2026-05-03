export default function Hero() {
  return (
    <section id="hero" className="section">
      <div className="text-center max-w-3xl">
        <p className="eyebrow mb-4" data-anim="fade-up">
          GSAP × Three.js Template
        </p>
        <h1 id="hero-headline" className="headline">
          Scroll. Animate. <span className="text-accent">Render.</span>
        </h1>
        <p className="mt-6 text-ink/70 text-lg" data-anim="fade-up">
          A clean starter for scroll-driven storytelling. Drop your 3D model
          into <code className="text-accent">StageModel.tsx</code> and author
          animations in <code className="text-accent">ScrollAnimations.tsx</code>.
        </p>
      </div>
    </section>
  );
}
