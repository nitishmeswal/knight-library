import SceneShell from "@/components/scenes/SceneShell";
import SceneSection from "@/components/scenes/SceneSection";
import LiquidScene from "@/components/scenes/LiquidScene";

export default function Page() {
  return (
    <SceneShell title="Liquid Metal" canvas={<LiquidScene />}>
      <SceneSection
        chapter="Scene 03"
        title="Fluid, not fixed."
        body="A high-resolution icosahedron distorted by live noise. Scroll increases amplitude and warms the surface hue."
      />
      <SceneSection
        chapter="Still water"
        title="Calm surface."
        body="Low distortion, cool hue. The piece begins at rest."
      />
      <SceneSection
        chapter="Agitation"
        title="Motion rises."
        body="Noise amplitude increases. Color temperature climbs."
      />
      <SceneSection chapter="Flame" title="Molten peak." />
    </SceneShell>
  );
}
