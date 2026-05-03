import SceneShell from "@/components/scenes/SceneShell";
import SceneSection from "@/components/scenes/SceneSection";
import HeatDistortScene from "@/components/scenes/HeatDistortScene";

export default function Page() {
  return (
    <SceneShell title="Heat Distortion" canvas={<HeatDistortScene />}>
      <SceneSection
        chapter="Scene"
        title="Cool."
        body="A metallic icosahedron sits pristine — cold and reflective."
      />
      <SceneSection
        chapter="Chapter I"
        title="Melt."
        body="Scroll heats the object — it droops, sags, and flows like lava."
      />
      <SceneSection
        chapter="Chapter II"
        title="Glow."
        body="Color shifts from chrome to molten orange as heat increases."
      />
      <SceneSection chapter="Finale" title="End." />
    </SceneShell>
  );
}
