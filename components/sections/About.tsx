export default function About() {
  return (
    <section id="about" className="section">
      <div className="max-w-4xl">
        <p className="eyebrow mb-4" data-anim="fade-up">
          01 — About
        </p>
        <h2 className="headline mb-6" data-anim="fade-up">
          Built for scroll-first experiences.
        </h2>
        <p
          className="text-ink/70 text-lg leading-relaxed"
          data-anim="fade-up"
        >
          The Three.js canvas is fixed behind the page and listens to a single
          global scroll progress value. That keeps your scene state simple and
          predictable while GSAP handles every DOM-side flourish.
        </p>
      </div>
    </section>
  );
}
