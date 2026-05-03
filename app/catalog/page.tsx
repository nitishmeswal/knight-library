import { TEMPLATE_CATALOG } from "@/components/templates";

/**
 * /catalog
 * --------
 * Card-based overview of every template with its kind + description.
 */
export default function CatalogPage() {
  const grouped = TEMPLATE_CATALOG.reduce<Record<string, typeof TEMPLATE_CATALOG>>(
    (acc, t) => {
      (acc[t.kind] ||= []).push(t);
      return acc;
    },
    {}
  );

  return (
    <main className="min-h-screen px-6 md:px-12 py-24 max-w-6xl mx-auto">
      <header className="mb-16">
        <p className="eyebrow mb-3">Library</p>
        <h1 className="headline mb-4">Template Catalog</h1>
        <p className="text-ink/70 text-lg max-w-2xl">
          {TEMPLATE_CATALOG.length} ready-to-use scroll & 3D sections. Each one
          is a single self-contained file in{" "}
          <code className="text-accent">components/templates</code>.
        </p>
        <div className="mt-6 flex gap-3 text-sm">
          <a
            href="/"
            className="rounded-full border border-white/15 px-4 py-2 hover:bg-white/5"
          >
            ← Home
          </a>
          <a
            href="/templates"
            className="rounded-full bg-accent px-4 py-2 font-medium"
          >
            View live gallery →
          </a>
        </div>
      </header>

      {Object.entries(grouped).map(([kind, items]) => (
        <section key={kind} className="mb-14">
          <h2 className="text-sm uppercase tracking-[0.2em] text-accent mb-5">
            {kind}
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {items.map((t) => (
              <div
                key={t.id}
                className="rounded-2xl border border-white/10 bg-white/5 p-5 hover:border-accent/40 transition"
              >
                <p className="font-medium text-lg mb-1">{t.name}</p>
                <p className="text-ink/60 text-sm">{t.desc}</p>
              </div>
            ))}
          </div>
        </section>
      ))}
    </main>
  );
}
