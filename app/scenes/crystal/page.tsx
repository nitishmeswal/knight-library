import SceneShell from "@/components/scenes/SceneShell";
import SceneSection from "@/components/scenes/SceneSection";
import CrystalScene from "@/components/scenes/CrystalScene";

export default function Page() {
  return (
    <SceneShell title="Crystal Growth" canvas={<CrystalScene />}>
      <SceneSection
        chapter="Scene 07"
        title="Crystals, forming."
        body="Ninety translucent icosahedra emerge from a dense core, each growing on its own delayed schedule."
      />
      <SceneSection
        chapter="Seed"
        title="Something begins."
        body="A handful of points. Faint color. Slow hue drift."
      />
      <SceneSection
        chapter="Bloom"
        title="The cluster spreads."
        body="New crystals appear outward, rotating into place."
      />
      <SceneSection chapter="Cathedral" title="A full constellation." />
    </SceneShell>
  );
}
