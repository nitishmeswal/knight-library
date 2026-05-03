import Link from "next/link";
import AuroraBg from "@/components/lab/bg/AuroraBg";
import GridPulseBg from "@/components/lab/bg/GridPulseBg";
import NoiseBg from "@/components/lab/bg/NoiseBg";
import SpotlightBg from "@/components/lab/bg/SpotlightBg";

function Demo({
  name,
  desc,
  children,
}: {
  name: string;
  desc: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mb-12">
      <div className="mb-4">
        <h3 className="text-2xl font-semibold">{name}</h3>
        <p className="text-ink/60 text-sm">{desc}</p>
      </div>
      <div className="relative h-[360px] rounded-3xl border border-white/10 overflow-hidden">
        {children}
      </div>
    </section>
  );
}

export default function BackgroundsPage() {
  return (
    <main className="min-h-screen px-6 md:px-12 py-20 max-w-5xl mx-auto">
      <Link href="/lab" className="text-sm text-ink/60 hover:text-ink">
        ← Lab
      </Link>
      <h1 className="headline mt-6 mb-12">Backgrounds.</h1>

      <Demo
        name="AuroraBg"
        desc="Soft animated aurora blobs. Pure CSS, zero JS."
      >
        <AuroraBg />
        <div className="relative h-full flex items-center justify-center">
          <p className="text-3xl font-semibold">Aurora over content</p>
        </div>
      </Demo>

      <Demo
        name="GridPulseBg"
        desc="Crisp grid with a breathing radial pulse."
      >
        <GridPulseBg />
        <div className="relative h-full flex items-center justify-center">
          <p className="text-3xl font-semibold">Structured calm</p>
        </div>
      </Demo>

      <Demo
        name="NoiseBg"
        desc="Animated canvas2D film grain — adds texture to any surface."
      >
        <NoiseBg opacity={0.12} />
        <div className="relative h-full flex items-center justify-center">
          <p className="text-3xl font-semibold">Organic grain</p>
        </div>
      </Demo>

      <Demo
        name="SpotlightBg"
        desc="A radial spotlight that follows the cursor. Move your mouse."
      >
        <div className="relative h-full">
          <div className="absolute inset-0 bg-[#05050c]">
            <SpotlightBg />
          </div>
          <div className="relative h-full flex items-center justify-center">
            <p className="text-3xl font-semibold">Cursor-lit</p>
          </div>
        </div>
      </Demo>
    </main>
  );
}
