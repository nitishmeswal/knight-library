import Link from "next/link";
import TiltCard3D from "@/components/lab/bits3d/TiltCard3D";
import FloatingIcon3D from "@/components/lab/bits3d/FloatingIcon3D";
import MagneticButton3D from "@/components/lab/bits3d/MagneticButton3D";

export default function Bits3DPage() {
  return (
    <main className="min-h-screen px-4 sm:px-6 md:px-12 py-16 sm:py-20 max-w-5xl mx-auto">
      <Link href="/lab" className="text-sm text-ink/60 hover:text-ink">
        ← Lab
      </Link>
      <h1 className="headline mt-6 mb-8 sm:mb-12">3D Bits.</h1>

      {/* Tilt card */}
      <section className="mb-20">
        <h3 className="text-2xl font-semibold mb-1">TiltCard3D</h3>
        <p className="text-ink/60 text-sm mb-6">
          CSS 3D tilt with depth layers. Hover the card.
        </p>
        <div className="flex justify-center py-10" style={{ perspective: 1200 }}>
          <TiltCard3D className="w-full max-w-[360px] h-[220px] rounded-2xl sm:rounded-3xl bg-gradient-to-br from-accent/40 to-white/5 border border-white/15 p-6 sm:p-8 relative overflow-hidden">
            <p data-depth="0.1" className="eyebrow">
              Premium card
            </p>
            <h4 data-depth="0.3" className="text-3xl font-semibold mt-2">
              AURORA X1
            </h4>
            <p data-depth="0.5" className="mt-4 text-ink/70">
              Hover to feel the depth.
            </p>
            <div
              data-depth="0.8"
              className="absolute top-4 right-4 w-16 h-16 rounded-full bg-accent/60 blur-xl"
            />
          </TiltCard3D>
        </div>
      </section>

      {/* Floating icon */}
      <section className="mb-20">
        <h3 className="text-2xl font-semibold mb-1">FloatingIcon3D</h3>
        <p className="text-ink/60 text-sm mb-6">
          Self-contained 3D icon for feature badges. Hover to scale.
        </p>
        <div className="flex gap-6 flex-wrap">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="rounded-3xl border border-white/10 bg-white/5 p-4 flex flex-col items-center"
            >
              <FloatingIcon3D size={180} />
              <p className="mt-3 text-sm text-ink/70">Feature {i + 1}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Magnetic button */}
      <section className="mb-20">
        <h3 className="text-2xl font-semibold mb-1">MagneticButton3D</h3>
        <p className="text-ink/60 text-sm mb-6">
          Button with 3D label tilt plus magnetic pull.
        </p>
        <div className="flex justify-center py-20">
          <MagneticButton3D>Launch it →</MagneticButton3D>
        </div>
      </section>
    </main>
  );
}
