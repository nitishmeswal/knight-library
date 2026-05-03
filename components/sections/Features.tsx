const items = [
  {
    title: "ScrollTrigger",
    body: "Pin, scrub, and toggle animations with declarative data-attributes.",
  },
  {
    title: "Three.js Stage",
    body: "Persistent canvas reads scroll progress and reacts in useFrame.",
  },
  {
    title: "Composable Presets",
    body: "fade-up, parallax, pin, scale, stagger — extend the map easily.",
  },
];

export default function Features() {
  return (
    <section id="features" className="section">
      <div className="max-w-5xl w-full" data-anim="stagger">
        <p className="eyebrow mb-4" data-stagger-item>
          02 — Features
        </p>
        <h2 className="headline mb-12" data-stagger-item>
          Animation primitives.
        </h2>

        <div className="grid md:grid-cols-3 gap-6">
          {items.map((it) => (
            <div
              key={it.title}
              data-stagger-item
              className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur"
            >
              <h3 className="text-xl font-semibold mb-2">{it.title}</h3>
              <p className="text-ink/70">{it.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
