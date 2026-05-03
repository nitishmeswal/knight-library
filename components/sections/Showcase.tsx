export default function Showcase() {
  return (
    <section
      id="showcase"
      className="section"
      data-anim="pin"
      data-pin-duration="1.2"
    >
      <div className="max-w-3xl text-center">
        <p className="eyebrow mb-4">03 — Showcase</p>
        <h2 className="headline mb-6" data-anim="scale">
          Pinned scroll moment.
        </h2>
        <p className="text-ink/70 text-lg" data-anim="fade-up">
          This section is pinned via the <code className="text-accent">pin</code> preset.
          The 3D stage behind it keeps rotating because it&apos;s driven by global
          scroll progress.
        </p>
      </div>
    </section>
  );
}
