import Link from "next/link";
import Lift3D from "@/components/lab/c23d/Lift3D";
import FlipCard3D from "@/components/lab/c23d/FlipCard3D";

function SampleCard() {
  return (
    <div className="w-full max-w-[360px] rounded-2xl sm:rounded-3xl bg-gradient-to-br from-accent/40 to-white/5 border border-white/15 p-6 sm:p-8 text-ink">
      <p className="eyebrow">Real component</p>
      <h3 className="text-3xl font-semibold mt-2 mb-2">Fully interactive.</h3>
      <p className="text-ink/70 mb-6">
        This card is React. It&apos;s just floating in 3D space.
      </p>
      <button className="rounded-full bg-accent px-5 py-2 text-sm font-medium">
        I still click
      </button>
    </div>
  );
}

function BackFace() {
  return (
    <div className="w-full h-full rounded-2xl sm:rounded-3xl bg-accent p-6 sm:p-8 flex flex-col text-white">
      <p className="eyebrow text-white/80">Back face</p>
      <h3 className="text-3xl font-semibold mt-2 mb-2">Hidden specs.</h3>
      <ul className="text-white/90 space-y-1">
        <li>— Titanium shell</li>
        <li>— Neural haptics</li>
        <li>— 72h battery</li>
      </ul>
    </div>
  );
}

export default function Component23DPage() {
  return (
    <main className="min-h-screen px-4 sm:px-6 md:px-12 py-16 sm:py-20 max-w-5xl mx-auto">
      <Link href="/lab" className="text-sm text-ink/60 hover:text-ink">
        ← Lab
      </Link>
      <div className="inline-flex items-center gap-2 mt-6">
        <span className="text-xs tracking-[0.3em] uppercase text-accent">Beta</span>
        <span className="h-[1px] w-12 bg-accent/50" />
      </div>
      <h1 className="headline mt-3 mb-4">Component → 3D.</h1>
      <p className="text-ink/70 max-w-2xl mb-16">
        Take any React component and render it as a live surface in 3D
        space. Not a screenshot — a real DOM tree. Fully interactive:
        buttons, inputs, links, animations all keep working.
      </p>

      <section className="mb-24">
        <h3 className="text-2xl font-semibold mb-1">Lift3D</h3>
        <p className="text-ink/60 text-sm mb-8">
          Wrap anything. It lifts into 3D with a gentle float. Try clicking
          the button below — it still fires.
        </p>
        <div className="rounded-2xl sm:rounded-3xl border border-white/10 bg-white/5">
          <Lift3D height={520}>
            <SampleCard />
          </Lift3D>
        </div>
      </section>

      <section className="mb-24">
        <h3 className="text-2xl font-semibold mb-1">FlipCard3D</h3>
        <p className="text-ink/60 text-sm mb-8">
          Two React faces on a true 3D flip. Hover the card.
        </p>
        <div className="flex justify-center" style={{ perspective: 1200 }}>
          <div className="w-full max-w-[360px] h-[240px]">
            <FlipCard3D
              trigger="hover"
              front={
                <div className="w-full h-full rounded-3xl bg-gradient-to-br from-accent/40 to-white/5 border border-white/15 p-8">
                  <p className="eyebrow">Front</p>
                  <h4 className="text-3xl font-semibold mt-2">AURORA X1</h4>
                  <p className="text-ink/70 mt-2">Hover me.</p>
                </div>
              }
              back={<BackFace />}
            />
          </div>
        </div>
      </section>

      <section className="rounded-2xl border border-accent/30 bg-accent/10 p-6 text-sm text-ink/80">
        <p>
          <strong>Beta note:</strong> Component-to-3D uses Drei&apos;s{" "}
          <code>Html transform</code> under the hood. Events pass through,
          but very deep portal trees or fixed-position children may need
          manual tweaks. File issues you hit in{" "}
          <code>components/lab/c23d/</code> and we&apos;ll iterate.
        </p>
      </section>
    </main>
  );
}
